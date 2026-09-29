import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { CONTACT_EMAIL } from "@/features/landing/constants";

import styles from "./general-application.module.css";

/** An invitation to get in touch when no open role fits. */
export function GeneralApplication() {
  const t = useTranslations("Careers.General");
  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    t("emailSubject"),
  )}`;

  return (
    <section className={styles.section} aria-labelledby="general-title">
      <div className="wrap">
        <div className={styles.panel}>
          <div className={styles.copy}>
            <h2 id="general-title" className={styles.title}>
              {t("title")}
            </h2>
            <p className={styles.body}>{t("body")}</p>
          </div>
          <a className="button" href={href}>
            {t("cta")}
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
