import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "ar", "pt"] as const;
export const defaultLocale = "en" as const;

export type AppLocale = (typeof locales)[number];
export type LocaleDirection = "ltr" | "rtl";

/** Each language's name in that language, as shown in the language switcher. */
export const localeNames: Record<AppLocale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  pt: "Português",
};

/**
 * Locales offered in the language switcher. Portuguese stays out until its
 * catalog is translated, because `/pt` still renders the English copy.
 */
export const switcherLocales: readonly AppLocale[] = ["en", "fr", "ar"];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
  localeCookie: {
    name: "NEXT_LOCALE",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  },
});

export function getLocaleDirection(locale: AppLocale): LocaleDirection {
  return locale === "ar" ? "rtl" : "ltr";
}
