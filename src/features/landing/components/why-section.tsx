import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/utils/cn";

import {
  UNICEF_SOURCE_URL,
  images,
  impactStats,
  journeySteps,
} from "../constants";
import styles from "./why-section.module.css";

export function WhySection() {
  const t = useTranslations("Landing.Why");

  return (
    <section
      className={cn("section", styles.section)}
      id="why-it-matters"
      aria-labelledby="why-title"
    >
      <div className={cn("wrap", styles.grid)}>
        <div>
          <span className="label">{t("label")}</span>
          <h2 id="why-title">{t("title")}</h2>
          <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
          <div className={styles.impact}>
            {impactStats.map((stat) => (
              <div key={stat}>
                <strong>{t(`stats.${stat}.value`)}</strong>
                <p>{t(`stats.${stat}.body`)}</p>
              </div>
            ))}
          </div>
          <a
            className={styles.source}
            href={UNICEF_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("source")}
          </a>
        </div>
        <figure className={styles.photo}>
          <div className={styles.visual}>
            <Image
              {...images.classroom}
              alt={t("imageAlt")}
              sizes="(max-width: 800px) 100vw, 610px"
            />
            <ol className={styles.steps} aria-label={t("stepsLabel")}>
              {journeySteps.map((step) => (
                <li key={step}>
                  <span>{t(`steps.${step}.label`)}</span>
                  <strong>{t(`steps.${step}.title`)}</strong>
                  <p>{t(`steps.${step}.body`)}</p>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className={styles.caption}>{t("caption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
