import { getLocaleDirection, type AppLocale } from "@/i18n/routing";

/**
 * `lang` and `dir` attributes for text written in `contentLocale` shown on a
 * `pageLocale` page, e.g. an English posting on the Arabic site. Nothing is
 * needed when the two match.
 */
export function contentLanguageProps(
  contentLocale: AppLocale,
  pageLocale: AppLocale,
) {
  if (contentLocale === pageLocale) return {};

  return {
    lang: contentLocale,
    dir: getLocaleDirection(contentLocale),
  };
}
