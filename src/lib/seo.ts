import type { AppLocale } from "@/i18n/routing";
import { defaultLocale, switcherLocales } from "@/i18n/routing";

/** Absolute origin used for canonical URLs, sitemaps and structured data. */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");

  return url.replace(/\/+$/, "");
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
