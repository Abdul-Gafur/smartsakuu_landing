import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { contentLanguageProps } from "../../lib/content-language";
import { formatJobDate, formatJobDateRange } from "../../lib/format-date";
import type { Job } from "../../types";
import { PointList } from "../point-list";
import styles from "./apply-section.module.css";

/** The application timeline, from opening to interviews. */
function KeyDates({ job }: { job: Job }) {
  const t = useTranslations("Careers.Job");
  const format = useFormatter();

  const dates = [
    { term: t("glance.opens"), value: formatJobDate(format, job.opensAt) },
  ];
  if (job.closesAt) {
    dates.push({
      term: t("glance.closes"),
      value: formatJobDate(format, job.closesAt),
    });
  }
  if (job.interviewPeriod) {
    dates.push({
      term: t("glance.interviews"),
      value: formatJobDateRange(format, job.interviewPeriod),
    });
  }

  return (
    <div className={styles.dates}>
      <h3 className={styles.datesTitle}>{t("apply.datesTitle")}</h3>
      <dl className={styles.timeline}>
        {dates.map((date) => (
          <div key={date.term}>
            <dt>{date.term}</dt>
            <dd>{date.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ApplySection({ job }: { job: Job }) {
  const t = useTranslations("Careers.Job.apply");
  const locale = useLocale();
  const language = contentLanguageProps(job.language, locale);

  return (
    <section
      className={styles.section}
      id="apply"
      aria-labelledby="apply-title"
    >
      <div className="wrap">
        <div className={styles.panel}>
          <div className={styles.intro}>
            <span className="label" {...language}>
              {job.title}
            </span>
            <h2 id="apply-title" className={styles.title}>
              {t("title")}
            </h2>
            <a
              className={cn("button", styles.button)}
              href={job.application.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("button")}
              <Icon name="arrow" />
            </a>
          </div>
          {job.application.checklist.length > 0 && (
            <div className={styles.checklist}>
              <h3 className={styles.checklistTitle}>{t("checklistTitle")}</h3>
              <PointList
                items={job.application.checklist}
                marker="solid"
                {...language}
              />
            </div>
          )}
          <KeyDates job={job} />
        </div>
      </div>
    </section>
  );
}
