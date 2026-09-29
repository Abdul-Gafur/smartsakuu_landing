import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

import { contentLanguageProps } from "../../lib/content-language";
import type { Job } from "../../types";
import { PointList } from "../point-list";
import styles from "./job-content.module.css";

type ContentBlockProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

function ContentBlock({ id, title, className, children }: ContentBlockProps) {
  return (
    <section className={cn(styles.block, className)} aria-labelledby={id}>
      <h2 id={id} className={styles.heading}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** The body of a job posting. Optional parts render only when present. */
export function JobContent({ job }: { job: Job }) {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const language = contentLanguageProps(job.language, locale);

  return (
    <article className={styles.content}>
      <ContentBlock id="job-about" title={t("Job.sections.about")}>
        <p className={cn("body-copy", styles.paragraph)}>
          {t("Company.about")}
        </p>
      </ContentBlock>

      <ContentBlock id="job-overview" title={t("Job.sections.overview")}>
        <div className={styles.paragraphs} {...language}>
          {job.overview.map((paragraph) => (
            <p key={paragraph} className={cn("body-copy", styles.paragraph)}>
              {paragraph}
            </p>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock
        id="job-responsibilities"
        title={t("Job.sections.responsibilities")}
      >
        <div className={styles.groups} {...language}>
          {job.responsibilities.map((section) => (
            <div key={section.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{section.title}</h3>
              <PointList items={section.items} />
            </div>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock
        id="job-requirements"
        title={t("Job.sections.requirements")}
      >
        <PointList items={job.requirements} marker="solid" {...language} />
      </ContentBlock>

      {job.niceToHave && job.niceToHave.length > 0 && (
        <ContentBlock
          id="job-nice-to-have"
          title={t("Job.sections.niceToHave")}
        >
          <PointList items={job.niceToHave} {...language} />
          <p className={styles.note}>{t("Job.niceToHaveNote")}</p>
        </ContentBlock>
      )}

      {job.outcomes && job.outcomes.length > 0 && (
        <ContentBlock
          id="job-outcomes"
          title={t("Job.sections.outcomes")}
          className={styles.outcomes}
        >
          <PointList items={job.outcomes} marker="solid" {...language} />
        </ContentBlock>
      )}
    </article>
  );
}
