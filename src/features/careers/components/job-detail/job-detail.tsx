import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import type { Job, JobSummary } from "../../types";
import { BenefitsSection } from "../benefits-section";
import { JobList } from "../job-list";
import { ApplySection } from "./apply-section";
import { JobContent } from "./job-content";
import styles from "./job-detail.module.css";
import { JobGlance } from "./job-glance";
import { JobHeader } from "./job-header";

type JobDetailProps = {
  job: Job;
  /** Other open roles to suggest below the posting. */
  otherJobs: JobSummary[];
};

/** The layout every job posting uses. */
export function JobDetail({ job, otherJobs }: JobDetailProps) {
  const t = useTranslations("Careers.Job");

  return (
    <>
      <JobHeader job={job} />
      <div className={cn("wrap", styles.layout)}>
        <JobContent job={job} />
        <JobGlance job={job} />
      </div>
      <BenefitsSection
        label={t("sections.benefits")}
        className={styles.benefits}
      />
      <ApplySection job={job} />
      {otherJobs.length > 0 && (
        <section className={styles.more} aria-labelledby="more-title">
          <div className="wrap">
            <h2 id="more-title" className={styles.moreTitle}>
              {t("more.title")}
            </h2>
            <JobList jobs={otherJobs} />
          </div>
        </section>
      )}
    </>
  );
}
