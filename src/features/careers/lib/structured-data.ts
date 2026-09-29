import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo";

import { CAREERS_PATH, getJobPath } from "../constants";
import type { EmploymentType, Job } from "../types";

const schemaEmploymentTypes = {
  fullTime: "FULL_TIME",
  partTime: "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
} satisfies Record<EmploymentType, string>;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function htmlList(items: string[]) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

/** The posting as HTML, which is what `JobPosting.description` expects. */
function describeJob(job: Job) {
  return [
    ...job.overview.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`),
    ...job.responsibilities.map(
      (section) =>
        `<h3>${escapeHtml(section.title)}</h3>${htmlList(section.items)}`,
    ),
    htmlList(job.requirements),
  ].join("");
}

/**
 * schema.org `JobPosting`, so the role can appear in job search results. Like
 * the other helpers here it returns a node for a page's `@graph`.
 */
export function getJobPostingStructuredData(job: Job, pageUrl: string) {
  const siteUrl = getSiteUrl();

  // TODO(seo): add `baseSalary` once a pay range can be published; Google's
  // job search recommends it and shows it in results.
  return {
    "@type": "JobPosting",
    title: job.title,
    description: describeJob(job),
    url: pageUrl,
    identifier: {
      "@type": "PropertyValue",
      name: "SmartSakuu",
      value: job.slug,
    },
    datePosted: job.opensAt,
    ...(job.closesAt && { validThrough: job.closesAt }),
    employmentType: schemaEmploymentTypes[job.employmentType],
    industry: "Education technology",
    occupationalCategory: job.department,
    directApply: false,
    hiringOrganization: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SmartSakuu",
      sameAs: siteUrl,
      logo: `${siteUrl}/apple-icon.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.city,
        addressRegion: job.location.region,
        addressCountry: job.location.countryCode,
      },
    },
    ...(job.workplaceType === "remote" && {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: job.location.country,
      },
    }),
  };
}

/**
 * schema.org `BreadcrumbList` for a careers page: home, careers and, on a job
 * page, the role.
 */
export async function getCareersBreadcrumbs(locale: AppLocale, job?: Job) {
  const t = await getTranslations({ locale, namespace: "Landing" });
  const siteUrl = getSiteUrl();
  const crumbs = [
    { name: t("Common.brandName"), url: `${siteUrl}/${locale}` },
    { name: t("Footer.careers"), url: `${siteUrl}/${locale}${CAREERS_PATH}` },
    ...(job
      ? [
          {
            name: job.title,
            url: `${siteUrl}/${locale}${getJobPath(job.slug)}`,
          },
        ]
      : []),
  ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
