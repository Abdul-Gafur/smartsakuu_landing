import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { platformPillars } from "../constants";
import styles from "./platform-strip.module.css";

export function PlatformStrip() {
  const t = useTranslations("Landing.Platform");

  return (
    <section className={styles.strip} aria-label={t("label")}>
      <div className={cn("wrap", styles.grid)}>
        {platformPillars.map((pillar) => (
          <article key={pillar}>
            <Icon name={pillar} className={styles.icon} />
            <h2 className={styles.title}>{t(`items.${pillar}.title`)}</h2>
            <p className={styles.body}>{t(`items.${pillar}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
