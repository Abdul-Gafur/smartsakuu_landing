import { useFormatter, useLocale, useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

import { CAREERS_PATH } from "../../constants";
import { contentLanguageProps } from "../../lib/content-language";
import { formatJobDate } from "../../lib/format-date";
import type { Job } from "../../types";
import { JobMeta } from "../job-meta";
import styles from "./job-header.module.css";

export function JobHeader({ job }: { job: Job }) {
  const t = useTranslations("Careers.Job");
  const format = useFormatter();
  const locale = useLocale();
  const language = contentLanguageProps(job.language, locale);

  return (
    <section className={styles.header} aria-labelledby="job-title">
      <div className="wrap">
        <div className={styles.panel}>
          <Link className={styles.back} href={CAREERS_PATH}>
            <Icon name="arrow" />
            {t("back")}
          </Link>
          <span className={cn("label", styles.department)} {...language}>
            {job.department}
          </span>
          <h1 id="job-title" className={styles.title} {...language}>
            {job.title}
          </h1>
          <p className={styles.summary} {...language}>
            {job.summary}
          </p>
          <JobMeta job={job} className={styles.meta} />
          <div className={cn("actions", styles.actions)}>
            <a className="button" href="#apply">
              {t("apply.jump")}
              <Icon name="arrow" />
            </a>
            {job.closesAt && (
              <span className={styles.deadline}>
                {t("closes", { date: formatJobDate(format, job.closesAt) })}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
