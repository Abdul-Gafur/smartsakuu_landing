import { useTranslations } from "next-intl";
import Image from "next/image";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/utils/cn";

import { images } from "../constants";
import { lineBreaks } from "../lib/rich-text";
import { DemoTrigger } from "./demo-dialog/demo-trigger";
import styles from "./hero.module.css";

export function Hero() {
  const t = useTranslations("Landing");

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={cn("wrap", styles.grid)}>
        <div>
          <h1 id="hero-title" className={styles.title}>
            {t.rich("Hero.title", lineBreaks)}
          </h1>
          <p className={cn("body-copy", styles.intro)}>{t("Hero.body")}</p>
          <div className="actions">
            <DemoTrigger className="button">
              {t("Common.bookDemo")}
              <Icon name="arrow" />
            </DemoTrigger>
            <a className="text-link" href="#record">
              {t("Hero.howItWorks")}
              <Icon name="arrow" />
            </a>
          </div>
          <p className={styles.footnote}>{t("Hero.footnote")}</p>
        </div>
        <div className={styles.collage}>
          <Image
            {...images.classroom}
            className={cn(styles.photo, styles.students)}
            alt={t("Hero.studentsImageAlt")}
            sizes="(max-width: 800px) 320px, 400px"
            loading="eager"
            fetchPriority="high"
          />
          <div className={styles.schoolNote}>
            <small>{t("Hero.schoolNote.eyebrow")}</small>
            <strong>{t.rich("Hero.schoolNote.title", lineBreaks)}</strong>
            <div className={styles.noteBottom}>
              <i aria-hidden="true" />
              {t("Hero.schoolNote.footer")}
            </div>
          </div>
          <Image
            {...images.teacher}
            className={cn(styles.photo, styles.teacher)}
            alt={t("Hero.teacherImageAlt")}
            sizes="(max-width: 800px) 260px, 320px"
            loading="eager"
          />
          <div className={styles.learningNote}>
            <Icon name="spark" />
            <strong>{t.rich("Hero.learningNote.title", lineBreaks)}</strong>
            <p>{t("Hero.learningNote.body")}</p>
          </div>
          <p className={styles.caption}>{t("Hero.caption")}</p>
        </div>
      </div>
    </section>
  );
}
