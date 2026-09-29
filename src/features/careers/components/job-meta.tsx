import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import type { JobSummary } from "../types";
import styles from "./job-meta.module.css";

type JobMetaProps = {
  job: Pick<JobSummary, "location" | "workplaceType" | "employmentType">;
  className?: string;
};

/** Location, work arrangement and employment type as a row of chips. */
export function JobMeta({ job, className }: JobMetaProps) {
  const t = useTranslations("Careers.Job");

  return (
    <ul className={cn(styles.meta, className)}>
      <li>{t("locationShort", job.location)}</li>
      <li>{t(`workplace.${job.workplaceType}`)}</li>
      <li>{t(`employment.${job.employmentType}`)}</li>
    </ul>
  );
}
