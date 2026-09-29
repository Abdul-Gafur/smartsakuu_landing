import type { MetadataRoute } from "next";

import { CAREERS_PATH, getJobPath } from "@/features/careers/constants";
import { getOpenJobs } from "@/features/careers/services/jobs";
import { images } from "@/features/landing/constants";
import { defaultLocale, switcherLocales, type AppLocale } from "@/i18n/routing";
import { getLanguageAlternates, getSiteUrl } from "@/lib/seo";

type SitemapPage = {
  /** Locale-agnostic path. */
  pathname: string;
  /**
   * The only locale whose URL is listed, for pages whose content exists in
   * one language (see `contentLocale` in the careers metadata). Other pages
   * are listed in every published locale with hreflang alternates.
   */
  contentLocale?: AppLocale;
  lastModified?: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
  images?: string[];
};

const landingImages = [images.classroom, images.teacher, images.lessonPlan];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const absolute = (path: string) => `${siteUrl}${path}`;
  const jobs = await getOpenJobs(defaultLocale);

  const pages: SitemapPage[] = [
    {
      pathname: "",
      changeFrequency: "monthly",
      priority: 1,
      images: landingImages.map((image) => image.src),
    },
    {
      pathname: CAREERS_PATH,
      // The listing changes when a role opens; jobs are sorted newest first.
      lastModified: jobs[0]?.opensAt,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...jobs.map((job) => ({
      pathname: getJobPath(job.slug),
      contentLocale: job.language,
      lastModified: job.opensAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return pages.flatMap((page) => {
    const entry = {
      ...(page.lastModified && { lastModified: page.lastModified }),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(page.images && { images: page.images.map(absolute) }),
    };

    if (page.contentLocale) {
      return [
        { url: absolute(`/${page.contentLocale}${page.pathname}`), ...entry },
      ];
    }

    const languages = Object.fromEntries(
      Object.entries(getLanguageAlternates(page.pathname)).map(
        ([lang, path]) => [lang, absolute(path)],
      ),
    );

    return switcherLocales.map((locale) => ({
      url: absolute(`/${locale}${page.pathname}`),
      alternates: { languages },
      ...entry,
    }));
  });
}
