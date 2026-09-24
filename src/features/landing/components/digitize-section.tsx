import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { adoptionSteps, schoolProcesses } from "../constants";
import styles from "./digitize-section.module.css";

export function DigitizeSection() {
  const t = useTranslations("Landing.Digitize");

  return (
    <section className="section" id="digitize" aria-labelledby="digitize-title">
      <div className="wrap">
        <div className="section-intro">
          <div>
            <span className="label">{t("label")}</span>
            <h2 id="digitize-title">{t("title")}</h2>
          </div>
          <p className="body-copy">{t("body")}</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.foundation}>
            <p className={styles.lead}>
              {t("foundation.lead")}
              <strong>{t("foundation.emphasis")}</strong>
            </p>
            <p className={styles.processesLabel}>
              {t("foundation.processesLabel")}
            </p>
            <ul className={styles.processes}>
              {schoolProcesses.map((process) => (
                <li key={process}>{t(`foundation.processes.${process}`)}</li>
              ))}
            </ul>
            <p className={styles.record}>{t("foundation.record")}</p>
          </div>
          <div className={styles.start}>
            <h3>{t("start.title")}</h3>
            <p className={cn("body-copy", styles.startBody)}>
              {t("start.body")}
            </p>
            <ol className={styles.steps}>
              {adoptionSteps.map((step) => (
                <li key={step}>{t(`start.steps.${step}`)}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
