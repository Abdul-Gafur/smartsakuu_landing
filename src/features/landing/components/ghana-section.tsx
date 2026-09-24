import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/utils/cn";

import { ghanaFacts, ghanaPortraits, proofStats } from "../constants";
import styles from "./ghana-section.module.css";

export function GhanaSection() {
  const t = useTranslations("Landing.Ghana");

  return (
    <section
      className={cn("section", styles.section)}
      id="ghana"
      aria-labelledby="ghana-title"
    >
      <div className="wrap">
        <div className={styles.portraits} aria-hidden="true">
          {ghanaPortraits.map((portrait, index) => (
            <Image key={index} {...portrait} alt="" sizes="240px" />
          ))}
        </div>
        <div className={styles.grid}>
          <div>
            <span className="label">{t("label")}</span>
            <h2 id="ghana-title">{t("title")}</h2>
            <dl className={styles.stats}>
              {proofStats.map((stat) => (
                <div key={stat}>
                  <dt>{t(`stats.${stat}.value`)}</dt>
                  <dd>{t(`stats.${stat}.body`)}</dd>
                </div>
              ))}
            </dl>
            <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
            <p className={styles.measure}>{t("measure")}</p>
          </div>
          <div className={styles.local}>
            <h3>{t("local.title")}</h3>
            <p className={styles.localLead}>{t("local.lead")}</p>
            <ul className={styles.facts}>
              {ghanaFacts.map((fact) => (
                <li key={fact}>{t(`facts.${fact}`)}</li>
              ))}
            </ul>
            <p className={styles.localBody}>{t("local.body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
