import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import defaultMessages from "@/messages/en.json";
import { deepMerge } from "@/utils/deep-merge";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  if (locale === routing.defaultLocale) {
    return { locale, messages: defaultMessages };
  }

  // English is the source catalog; keys a locale has not translated yet fall
  // back to it instead of rendering missing-message errors.
  const localeMessages = (await import(`../messages/${locale}.json`)).default;

  return { locale, messages: deepMerge(defaultMessages, localeMessages) };
});
