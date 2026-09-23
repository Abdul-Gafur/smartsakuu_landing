import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/utils/cn";

import { images, navSections } from "../../constants";
import { DemoTrigger } from "../demo-dialog/demo-trigger";
import { HeaderNav } from "./header-nav";
import styles from "./site-header.module.css";

export function SiteHeader() {
  const t = useTranslations("Landing");

  return (
    <header className={styles.header}>
      <div className={cn("wrap", styles.inner)}>
        <a
          className={styles.brand}
          href="#top"
          aria-label={t("Common.brandHome")}
        >
          <Image
            {...images.logo}
            alt={t("Common.brandName")}
            sizes="180px"
            loading="eager"
          />
        </a>
        <HeaderNav
          label={t("Header.navLabel")}
          links={navSections.map((section) => ({
            href: `#${section}`,
            label: t(`Header.nav.${section}`),
          }))}
          openLabel={t("Header.openMenu")}
          closeLabel={t("Header.closeMenu")}
        >
          <DemoTrigger className={cn("button", styles.demo)}>
            {t("Common.bookDemo")}
          </DemoTrigger>
        </HeaderNav>
      </div>
    </header>
  );
}
