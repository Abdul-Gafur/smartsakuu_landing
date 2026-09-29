import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";

import { contentLanguageProps } from "../../lib/content-language";
import { formatJobDate, formatJobDateRange } from "../../lib/format-date";
import type { Job } from "../../types";
import styles from "./job-glance.module.css";

/** The role's key facts beside the posting, with a way to apply. */
export function JobGlance({ job }: { job: Job }) {
  const t = useTranslations("Careers.Job");
  const format = useFormatter();
  const locale = useLocale();
  const language = contentLanguageProps(job.language, locale);

  const facts = [
    {
      term: t("glance.department"),
      value: <span {...language}>{job.department}</span>,
    },
    { term: t("glance.location"), value: t("locationFull", job.location) },
    {
      term: t("glance.workplace"),
      value: t(`workplace.${job.workplaceType}`),
    },
    {
      term: t("glance.employment"),
      value: t(`employment.${job.employmentType}`),
    },
    { term: t("glance.opens"), value: formatJobDate(format, job.opensAt) },
    {
      term: t("glance.closes"),
      value: job.closesAt
        ? formatJobDate(format, job.closesAt)
        : t("glance.rolling"),
    },
    ...(job.interviewPeriod
      ? [
          {
            term: t("glance.interviews"),
            value: formatJobDateRange(format, job.interviewPeriod),
          },
        ]
      : []),
  ];

  return (
    <aside className={styles.aside} aria-labelledby="glance-title">
      <div className={styles.card}>
        <h2 id="glance-title" className={styles.title}>
          {t("glance.title")}
        </h2>
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt>{fact.term}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <a className="button" href="#apply">
          {t("apply.jump")}
          <Icon name="arrow" />
        </a>
      </div>
    </aside>
  );
}
