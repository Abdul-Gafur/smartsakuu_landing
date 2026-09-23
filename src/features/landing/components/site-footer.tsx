import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/utils/cn";

import { images } from "../constants";
import { lineBreaks } from "../lib/rich-text";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  const t = useTranslations("Landing");

  return (
    <footer>
      <div className={cn("wrap", styles.inner)}>
        <a
          className={styles.brand}
          href="#top"
          aria-label={t("Common.brandHome")}
        >
          <Image {...images.logo} alt={t("Common.brandName")} sizes="170px" />
        </a>
        <p className={styles.tagline}>
          {t.rich("Footer.tagline", {
            ...lineBreaks,
            // A string, so ICU doesn't format it as "2,026".
            year: String(new Date().getFullYear()),
          })}
        </p>
      </div>
    </footer>
  );
}
