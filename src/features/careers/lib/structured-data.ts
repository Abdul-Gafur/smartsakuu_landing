import { getSiteUrl } from "@/lib/seo";

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

/** schema.org `JobPosting`, so the role can appear in job search results. */
export function getJobPostingStructuredData(job: Job, pageUrl: string) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: describeJob(job),
    url: pageUrl,
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
