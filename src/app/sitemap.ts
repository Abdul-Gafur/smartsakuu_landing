import type { MetadataRoute } from "next";

import { CAREERS_PATH, getJobPath } from "@/features/careers/constants";
import { getOpenJobs } from "@/features/careers/services/jobs";
import { images } from "@/features/landing/constants";
import { defaultLocale, switcherLocales } from "@/i18n/routing";
import { getLanguageAlternates, getSiteUrl } from "@/lib/seo";

type SitemapPage = {
  /** Locale-agnostic path. */
  pathname: string;
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
    { pathname: CAREERS_PATH, changeFrequency: "weekly", priority: 0.7 },
    ...jobs.map((job) => ({
      pathname: getJobPath(job.slug),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];

  return pages.flatMap((page) => {
    const languages = Object.fromEntries(
      Object.entries(getLanguageAlternates(page.pathname)).map(
        ([lang, path]) => [lang, absolute(path)],
      ),
    );

    return switcherLocales.map((locale) => ({
      url: absolute(`/${locale}${page.pathname}`),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
      ...(page.images && { images: page.images.map(absolute) }),
    }));
  });
}
