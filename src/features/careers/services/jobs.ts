import { cache } from "react";

import type { AppLocale } from "@/i18n/routing";

import { jobs } from "../data/jobs";
import type { Job, JobSummary } from "../types";

/*
 * The careers pages read job postings only through these functions. They
 * currently serve the local postings in `data/jobs.ts`; to connect a backend,
 * replace their bodies with API requests (passing `locale` if the API returns
 * translated postings) and map the responses onto the `Job` type. The pages,
 * metadata, structured data and sitemap need no changes.
 *
 * `cache` deduplicates calls made while rendering one request, such as a page
 * and its `generateMetadata` asking for the same role.
 */

function toSummary(job: Job): JobSummary {
  const {
    slug,
    title,
    department,
    language,
    location,
    workplaceType,
    employmentType,
    opensAt,
    closesAt,
    summary,
  } = job;

  return {
    slug,
    title,
    department,
    language,
    location,
    workplaceType,
    employmentType,
    opensAt,
    closesAt,
    summary,
  };
}

/** Open roles, most recently opened first. */
export const getOpenJobs = cache(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (locale: AppLocale): Promise<JobSummary[]> =>
    jobs.toSorted((a, b) => b.opensAt.localeCompare(a.opensAt)).map(toSummary),
);

/** One role by its slug, or `null` when there is no such open role. */
export const getJob = cache(
  async (locale: AppLocale, slug: string): Promise<Job | null> =>
    jobs.find((job) => job.slug === slug) ?? null,
);
