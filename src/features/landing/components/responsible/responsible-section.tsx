import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { principles, reviewSteps } from "../../constants";
import { PrinciplesDeck } from "./principles-deck";
import styles from "./responsible-section.module.css";

export function ResponsibleSection() {
  const t = useTranslations("Landing.Responsible");

  return (
    <section
      className={cn("section", styles.section)}
      id="responsible-ai"
      aria-labelledby="responsible-title"
    >
      <div className={cn("wrap", styles.stage)}>
        <div className={styles.intro}>
          <span className={cn("label", styles.label)}>{t("label")}</span>
          <h2 id="responsible-title">{t("title")}</h2>
          <p className={cn("body-copy", styles.body)}>{t("body")}</p>
          <div className={styles.flow} aria-label={t("flowLabel")}>
            {reviewSteps.map((step) => (
              <span key={step}>{t(`flow.${step}`)}</span>
            ))}
          </div>
        </div>
        <PrinciplesDeck>
          {principles.map((principle) => (
            <article key={principle}>
              <h3>{t(`principles.${principle}.title`)}</h3>
              <p>{t(`principles.${principle}.body`)}</p>
            </article>
          ))}
        </PrinciplesDeck>
      </div>
    </section>
  );
}
