import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  alt as ogImageAlt,
  size as ogImageSize,
} from "@/app/[locale]/opengraph-image";
import type { AppLocale } from "@/i18n/routing";
import { getLanguageAlternates, openGraphLocales } from "@/lib/seo";

type PageMetadataOptions = {
  locale: AppLocale;
  /** Locale-agnostic path, e.g. `/careers`. */
  pathname: string;
  title: string;
  description: string;
  /**
   * Set when the page's main content exists in one language only, such as a
   * job posting. Every locale's copy of the page then names that language's
   * URL as canonical, and no hreflang alternates are emitted.
   */
  contentLocale?: AppLocale;
};

/**
 * Canonical, hreflang, Open Graph and Twitter metadata for a careers page.
 * Metadata merges shallowly, so the layout's `openGraph` and `twitter` are
 * restated here with this page's values, including the locale's generated
 * `opengraph-image`, which would otherwise be dropped. Social titles add the
 * site name themselves: the layout's title template only applies to `<title>`.
 */
export async function getCareersPageMetadata({
  locale,
  pathname,
  title,
  description,
  contentLocale,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonical = `/${contentLocale ?? locale}${pathname}`;
  const socialTitle = `${title} | ${t("siteName")}`;
  const image = {
    url: `/${locale}/opengraph-image`,
    width: ogImageSize.width,
    height: ogImageSize.height,
    alt: ogImageAlt,
  };

  return {
    title,
    description,
    alternates: contentLocale
      ? { canonical }
      : { canonical, languages: getLanguageAlternates(pathname) },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: t("siteName"),
      title: socialTitle,
      description,
      locale: openGraphLocales[locale],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
