import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/utils/cn";

import { ghanaFacts, ghanaPortraits } from "../constants";
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
            <h2 id="ghana-title">{t("title")}</h2>
            <p className={cn("body-copy", styles.intro)}>{t("body")}</p>
          </div>
          <div className={styles.facts}>
            {ghanaFacts.map((fact) => (
              <article key={fact}>
                <h3>{t(`facts.${fact}.title`)}</h3>
                <p>{t(`facts.${fact}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
