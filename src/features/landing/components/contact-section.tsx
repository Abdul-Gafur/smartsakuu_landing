import { useTranslations } from "next-intl";
import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { CONTACT_EMAIL, images } from "../constants";
import styles from "./contact-section.module.css";
import { DemoTrigger } from "./demo-dialog/demo-trigger";

export function ContactSection() {
  const t = useTranslations("Landing");
  const demoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    t("Contact.demoEmailSubject"),
  )}`;

  return (
    <section className={styles.section} id="demo" aria-labelledby="demo-title">
      <div className="wrap">
        <div className={styles.banner}>
          <div className={styles.copy}>
            <span className={cn("label", styles.label)}>
              {t("Contact.label")}
            </span>
            <h2 id="demo-title" className={styles.title}>
              {t("Contact.title")}
            </h2>
            <p className={styles.body}>{t("Contact.body")}</p>
            <div className={cn("actions", styles.actions)}>
              <DemoTrigger className={cn("button", styles.cta)} href={demoHref}>
                {t("Common.bookDemo")}
                <Icon name="arrow" />
              </DemoTrigger>
              <a
                className={cn("button", "button-secondary", styles.cta)}
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {t("Contact.talk")}
              </a>
            </div>
          </div>
          <div className={styles.photo}>
            <Image
              {...images.classroom}
              alt={t("Contact.imageAlt")}
              sizes="(max-width: 1220px) 100vw, 1220px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
