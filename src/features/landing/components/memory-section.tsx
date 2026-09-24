import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { memorySteps, memoryTags } from "../constants";
import styles from "./memory-section.module.css";

export function MemorySection() {
  const t = useTranslations("Landing.Memory");

  return (
    <section
      className={cn("section", styles.section)}
      id="memory"
      aria-labelledby="memory-title"
    >
      <div className={cn("wrap", styles.grid)}>
        <div>
          <span className={cn("label", styles.label)}>{t("label")}</span>
          <h2 id="memory-title">{t("title")}</h2>
          <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
          <p className={styles.stepsLabel}>{t("stepsLabel")}</p>
          <ul className={styles.timeline}>
            {memorySteps.map((step) => (
              <li key={step}>
                <b>{t(`steps.${step}`)}</b>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <small className={styles.eyebrow}>{t("example.eyebrow")}</small>
          <h3 className={styles.question}>{t("example.question")}</h3>
          <div className={styles.answer}>
            <p>{t("example.answer")}</p>
            <div className={styles.tags}>
              {memoryTags.map((tag) => (
                <span key={tag}>{t(`example.tags.${tag}`)}</span>
              ))}
            </div>
          </div>
          <p className={styles.note}>{t("example.note")}</p>
        </div>
      </div>
    </section>
  );
}
