import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { CAREERS_PATH } from "@/features/careers/constants";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

import styles from "./not-found-section.module.css";

/** The 404 page: what happened, and the ways back into the site. */
export function NotFoundSection() {
  const t = useTranslations("NotFound");

  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <div className="wrap">
        <span className="label">{t("label")}</span>
        <h1 id="not-found-title" className={styles.title}>
          {t("title")}
        </h1>
        <p className={cn("body-copy", styles.body)}>{t("body")}</p>
        <div className="actions">
          <Link className="button" href="/">
            {t("home")}
            <Icon name="arrow" />
          </Link>
          <Link className="text-link" href={CAREERS_PATH}>
            {t("careers")}
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
