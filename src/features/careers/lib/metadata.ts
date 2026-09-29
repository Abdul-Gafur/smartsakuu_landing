import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  alt as ogImageAlt,
  size as ogImageSize,
} from "@/app/[locale]/opengraph-image";
import { defaultLocale, type AppLocale } from "@/i18n/routing";
import {
  getLanguageAlternates,
  isIndexedLocale,
  openGraphLocales,
} from "@/lib/seo";

type PageMetadataOptions = {
  locale: AppLocale;
  /** Locale-agnostic path, e.g. `/careers`. */
  pathname: string;
  title: string;
  description: string;
};

/**
 * Canonical, hreflang, Open Graph and Twitter metadata for a careers page.
 * Metadata merges shallowly, so the layout's `openGraph` and `twitter` are
 * restated here with this page's values, including the locale's generated
 * `opengraph-image`, which would otherwise be dropped.
 */
export async function getCareersPageMetadata({
  locale,
  pathname,
  title,
  description,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const canonical = `/${isIndexedLocale(locale) ? locale : defaultLocale}${pathname}`;
  const image = {
    url: `/${locale}/opengraph-image`,
    width: ogImageSize.width,
    height: ogImageSize.height,
    alt: ogImageAlt,
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: t("siteName"),
      title,
      description,
      locale: openGraphLocales[locale],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
