import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import type { JobSummary } from "../types";
import { JobList } from "./job-list";
import styles from "./open-roles-section.module.css";

/** The top of the careers page: who we are, then every open role. */
export function OpenRolesSection({ jobs }: { jobs: JobSummary[] }) {
  const t = useTranslations("Careers");

  return (
    <section
      className={styles.section}
      id="roles"
      aria-labelledby="careers-title"
    >
      <div className="wrap">
        <div className={cn("section-intro", styles.intro)}>
          <div>
            <span className="label">{t("Roles.label")}</span>
            <h1 id="careers-title" className={styles.title}>
              {t("Roles.title")}
            </h1>
          </div>
          <div className={styles.copy}>
            <p className="body-copy">{t("Company.about")}</p>
            <p className="body-copy">{t("Roles.body")}</p>
          </div>
        </div>
        <p className={styles.count}>
          {t("Roles.count", { count: jobs.length })}
        </p>
        {/* The roles sit directly under the page's h1. */}
        <JobList jobs={jobs} headingLevel="h2" />
      </div>
    </section>
  );
}
