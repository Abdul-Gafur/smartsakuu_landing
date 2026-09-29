import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import { benefits } from "../constants";
import styles from "./benefits-section.module.css";

type BenefitsSectionProps = {
  /** Replaces the default "Why join SmartSakuu" label. */
  label?: string;
  className?: string;
};

/** Company-wide benefits, shared by the careers page and every role. */
export function BenefitsSection({ label, className }: BenefitsSectionProps) {
  const t = useTranslations("Careers.Benefits");

  return (
    <section
      className={cn("section", className)}
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <div className="wrap">
        <div className="section-intro">
          <div>
            <span className="label">{label ?? t("label")}</span>
            <h2 id="benefits-title">{t("title")}</h2>
          </div>
          <p className="body-copy">{t("body")}</p>
        </div>
        <ul className={styles.grid}>
          {benefits.map((benefit) => (
            <li key={benefit}>
              <h3 className={styles.title}>{t(`items.${benefit}.title`)}</h3>
              <p className={styles.body}>{t(`items.${benefit}.body`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
