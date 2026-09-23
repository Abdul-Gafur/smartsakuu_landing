import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "ar", "pt"] as const;
export const defaultLocale = "en" as const;

export type AppLocale = (typeof locales)[number];
export type LocaleDirection = "ltr" | "rtl";

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
