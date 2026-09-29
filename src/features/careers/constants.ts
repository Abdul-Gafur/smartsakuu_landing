/**
 * Non-translatable careers data. All visible copy lives in the `Careers`
 * message namespace; job postings come from `services/jobs.ts`.
 */

export const CAREERS_PATH = "/careers";

export function getJobPath(slug: string) {
  return `${CAREERS_PATH}/${slug}`;
}

/** Company-wide benefits, in display order. */
export const benefits = [
  "remote",
  "schedule",
  "learning",
  "experience",
  "travel",
  "leave",
  "bonus",
  "growth",
] as const;
