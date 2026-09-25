import type { MetadataRoute } from "next";

import { images } from "@/features/landing/constants";
import { switcherLocales } from "@/i18n/routing";
import { getLanguageAlternates, getSiteUrl } from "@/lib/seo";

/** Locale-agnostic paths of every indexable page. */
const pages = [""];

const pageImages = [images.classroom, images.teacher, images.lessonPlan];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const absolute = (path: string) => `${siteUrl}${path}`;

  return pages.flatMap((pathname) => {
    const languages = Object.fromEntries(
      Object.entries(getLanguageAlternates(pathname)).map(([lang, path]) => [
        lang,
        absolute(path),
      ]),
    );

    return switcherLocales.map((locale) => ({
      url: absolute(`/${locale}${pathname}`),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages },
      images: pageImages.map((image) => absolute(image.src)),
    }));
  });
}
