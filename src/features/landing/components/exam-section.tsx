import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { examResources } from "../constants";
import styles from "./exam-section.module.css";

export function ExamSection() {
  const t = useTranslations("Landing.Exam");

  return (
    <section className="section" id="exams" aria-labelledby="exams-title">
      <div className={cn("wrap", styles.grid)}>
        <div>
          <span className="label">{t("label")}</span>
          <h2 id="exams-title">{t("title")}</h2>
          <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
        </div>
        <div className={styles.card}>
          <p className={styles.cardLabel}>{t("resourcesLabel")}</p>
          <ul className={styles.resources}>
            {examResources.map((resource) => (
              <li key={resource}>{t(`resources.${resource}`)}</li>
            ))}
          </ul>
          <p className={styles.incentives}>{t("incentives")}</p>
        </div>
      </div>
    </section>
  );
}
