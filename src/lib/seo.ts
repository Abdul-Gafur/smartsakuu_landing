import type { AppLocale } from "@/i18n/routing";
import { defaultLocale, switcherLocales } from "@/i18n/routing";

/** The public origin search engines should index: www, over HTTPS. */
const PRODUCTION_SITE_URL = "https://www.smartsakuu.com";

/**
 * Absolute origin used for canonical URLs, sitemaps and structured data.
 * `NEXT_PUBLIC_SITE_URL` overrides it; without it, builds point at the
 * production origin (so previews canonicalize to production) and the dev
 * server at localhost.
 */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : PRODUCTION_SITE_URL);

  return url.replace(/\/+$/, "");
}

/**
 * Whether this deployment may appear in search results. Vercel preview and
 * development deployments set `VERCEL_ENV` and are kept out of the index.
 */
export function isIndexableDeployment(): boolean {
  const deployment = process.env.VERCEL_ENV;
  return !deployment || deployment === "production";
}

/** Whether search engines should index this locale's pages. */
export function isIndexedLocale(locale: AppLocale): boolean {
  return switcherLocales.includes(locale);
}

/** hreflang map for a locale-prefixed path, including `x-default`. */
export function getLanguageAlternates(pathname = ""): Record<string, string> {
  return {
    ...Object.fromEntries(
      switcherLocales.map((locale) => [locale, `/${locale}${pathname}`]),
    ),
    "x-default": `/${defaultLocale}${pathname}`,
  };
}

/** Open Graph expects `language_TERRITORY` locale codes. */
export const openGraphLocales: Record<AppLocale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_AR",
  pt: "pt_PT",
};
