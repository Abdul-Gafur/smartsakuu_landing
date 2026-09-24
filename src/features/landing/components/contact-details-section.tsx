import { useTranslations } from "next-intl";

import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  CONTACT_WHATSAPP_URL,
} from "../constants";
import styles from "./contact-details-section.module.css";

export function ContactDetailsSection() {
  const t = useTranslations("Landing.ContactDetails");

  return (
    <section
      className={styles.section}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <h2 id="contact-title" className={styles.title}>
          {t("title")}
        </h2>
        <address className={styles.list}>
          <p>
            <span className={styles.term}>{t("email")}</span>
            <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>
            <span className={styles.term}>{t("whatsapp")}</span>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
            >
              {CONTACT_WHATSAPP}
            </a>
          </p>
          <p>
            <span className={styles.term}>{t("location")}</span>
            {t("locationValue")}
          </p>
        </address>
      </div>
    </section>
  );
}
