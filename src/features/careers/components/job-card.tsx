import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/i18n/navigation";

import { getJobPath } from "../constants";
import { contentLanguageProps } from "../lib/content-language";
import { formatJobDate } from "../lib/format-date";
import type { JobSummary } from "../types";
import styles from "./job-card.module.css";
import { JobMeta } from "./job-meta";

/** One open role in a list, linking to its detail page. */
export function JobCard({ job }: { job: JobSummary }) {
  const t = useTranslations("Careers.Roles");
  const format = useFormatter();
  const locale = useLocale();
  const language = contentLanguageProps(job.language, locale);

  return (
    <Link className={styles.card} href={getJobPath(job.slug)}>
      <div className={styles.body}>
        <span className={styles.department} {...language}>
          {job.department}
        </span>
        <h3 className={styles.title} {...language}>
          {job.title}
        </h3>
        <p className={styles.summary} {...language}>
          {job.summary}
        </p>
        <JobMeta job={job} className={styles.meta} />
      </div>
      <div className={styles.aside}>
        {job.closesAt && (
          <span className={styles.deadline}>
            {t("deadline", { date: formatJobDate(format, job.closesAt) })}
          </span>
        )}
        <span className={styles.view}>
          {t("view")}
          <span className={styles.arrow}>
            <Icon name="arrow" />
          </span>
        </span>
      </div>
    </Link>
  );
}
