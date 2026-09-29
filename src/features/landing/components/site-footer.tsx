import { useTranslations } from "next-intl";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

import { images } from "../constants";
import { lineBreaks } from "../lib/rich-text";
import styles from "./site-footer.module.css";

type SiteFooterProps = {
  /** See `SiteHeader`: the landing page path when rendered on other pages. */
  anchorBase?: string;
};

export function SiteFooter({ anchorBase = "" }: SiteFooterProps) {
  const t = useTranslations("Landing");

  return (
    <footer>
      <div className={cn("wrap", styles.inner)}>
        <a
          className={styles.brand}
          href={`${anchorBase}#top`}
          aria-label={t("Common.brandHome")}
        >
          <Image {...images.logo} alt={t("Common.brandName")} sizes="170px" />
        </a>
        <nav className={styles.links} aria-label={t("Footer.navLabel")}>
          <Link href="/careers">{t("Footer.careers")}</Link>
        </nav>
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
