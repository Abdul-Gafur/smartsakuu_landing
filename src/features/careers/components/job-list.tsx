import { useTranslations } from "next-intl";

import type { JobSummary } from "../types";
import { JobCard } from "./job-card";
import styles from "./job-list.module.css";

type JobListProps = {
  jobs: JobSummary[];
  /** See `JobCard`. */
  headingLevel?: "h2" | "h3";
};

/** A list of open roles, or a short note when there are none. */
export function JobList({ jobs, headingLevel }: JobListProps) {
  const t = useTranslations("Careers.Roles.empty");

  if (jobs.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>{t("title")}</p>
        <p className={styles.emptyBody}>{t("body")}</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {jobs.map((job) => (
        <li key={job.slug}>
          <JobCard job={job} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
