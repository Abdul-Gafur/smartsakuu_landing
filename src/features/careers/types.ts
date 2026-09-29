import type { AppLocale } from "@/i18n/routing";

/**
 * The shape of a job opening as the careers pages consume it. It mirrors what
 * a careers API is expected to return, so connecting a backend only means
 * mapping its response onto these types in `services/jobs.ts`.
 */

export const workplaceTypes = ["onsite", "hybrid", "remote"] as const;
export type WorkplaceType = (typeof workplaceTypes)[number];

export const employmentTypes = [
  "fullTime",
  "partTime",
  "contract",
  "internship",
] as const;
export type EmploymentType = (typeof employmentTypes)[number];

export type JobLocation = {
  city: string;
  region: string;
  country: string;
  /** ISO 3166-1 alpha-2 code, used in structured data. */
  countryCode: string;
};

/** An inclusive range of ISO 8601 dates, e.g. an interview week. */
export type DateRange = {
  start: string;
  end: string;
};

/** A titled group of bullet points, such as one area of responsibility. */
export type JobSection = {
  title: string;
  items: string[];
};

/** Where candidates apply: an external application form. */
export type JobApplication = {
  url: string;
  /** What candidates should have ready before opening the form. */
  checklist: string[];
};

export type Job = {
  /** URL segment: `/careers/[slug]`. */
  slug: string;
  title: string;
  /** Display name, e.g. "Sales and Marketing". */
  department: string;
  /** Language the posting is written in, which may differ from the page. */
  language: AppLocale;
  location: JobLocation;
  workplaceType: WorkplaceType;
  employmentType: EmploymentType;
  /** ISO 8601 date applications open, e.g. "2026-09-30". */
  opensAt: string;
  /** ISO 8601 date applications close. Omit when open until filled. */
  closesAt?: string;
  /** When interviews are expected to take place, if scheduled. */
  interviewPeriod?: DateRange;
  /** One or two sentences, shown on the listing and at the top of the role. */
  summary: string;
  overview: string[];
  responsibilities: JobSection[];
  requirements: string[];
  niceToHave?: string[];
  /** What success in the role looks like. */
  outcomes?: string[];
  application: JobApplication;
};

/** The fields the careers listing needs for each role. */
export type JobSummary = Pick<
  Job,
  | "slug"
  | "title"
  | "department"
  | "language"
  | "location"
  | "workplaceType"
  | "employmentType"
  | "opensAt"
  | "closesAt"
  | "summary"
>;
