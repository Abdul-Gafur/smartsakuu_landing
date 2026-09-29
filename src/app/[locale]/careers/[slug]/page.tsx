import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { JobDetail } from "@/features/careers/components/job-detail/job-detail";
import { getJobPath } from "@/features/careers/constants";
import { getCareersPageMetadata } from "@/features/careers/lib/metadata";
import {
  getCareersBreadcrumbs,
  getJobPostingStructuredData,
} from "@/features/careers/lib/structured-data";
import { getJob, getOpenJobs } from "@/features/careers/services/jobs";
import { serializeJsonLd } from "@/features/landing/lib/structured-data";
import { defaultLocale, routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo";

/**
 * Pre-renders every role known at build time. Roles added later (for example
 * by a careers backend) render on their first request.
 */
export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const locale = hasLocale(routing.locales, params.locale)
    ? params.locale
    : defaultLocale;
  const jobs = await getOpenJobs(locale);

  return jobs.map((job) => ({ slug: job.slug }));
}

async function loadJob(
  params: PageProps<"/[locale]/careers/[slug]">["params"],
) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const job = await getJob(locale, slug);

  if (!job) {
    notFound();
  }

  return { locale, job };
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers/[slug]">): Promise<Metadata> {
  const { locale, job } = await loadJob(params);

  return getCareersPageMetadata({
    locale,
    pathname: getJobPath(job.slug),
    title: job.title,
    description: job.summary,
    // The posting is written in one language; other locales only translate
    // the page around it, so they defer to the posting's own locale.
    contentLocale: job.language,
  });
}

export default async function Page({
  params,
}: PageProps<"/[locale]/careers/[slug]">) {
  const { locale, job } = await loadJob(params);

  setRequestLocale(locale);

  const otherJobs = (await getOpenJobs(locale)).filter(
    (other) => other.slug !== job.slug,
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      await getCareersBreadcrumbs(locale, job),
      // Only the canonical copy describes the posting, so job search sees it
      // once.
      ...(locale === job.language
        ? [
            getJobPostingStructuredData(
              job,
              `${getSiteUrl()}/${job.language}${getJobPath(job.slug)}`,
            ),
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <JobDetail job={job} otherJobs={otherJobs} />
    </>
  );
}
