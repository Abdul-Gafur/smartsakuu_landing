import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { CAREERS_PATH } from "@/features/careers/constants";
import { getPathname } from "@/i18n/navigation";
import { localeNames } from "@/i18n/routing";
import { cn } from "@/utils/cn";

import { images, navSections } from "../../constants";
import { DemoTrigger } from "../demo-dialog/demo-trigger";
import { HeaderNav } from "./header-nav";
import { LanguageList, LanguageMenu } from "./language-switcher";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  /**
   * Prepended to the landing section anchors. Leave empty on the landing page;
   * on other pages pass the landing page path (e.g. `/en`).
   */
  anchorBase?: string;
  /** Marks the matching navigation link as the current page. */
  currentPage?: "careers";
};

export function SiteHeader({ anchorBase = "", currentPage }: SiteHeaderProps) {
  const t = useTranslations("Landing");
  const locale = useLocale();

  return (
    <header className={styles.header}>
      <div className={cn("wrap", styles.inner)}>
        <a
          className={styles.brand}
          href={`${anchorBase}#top`}
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
          links={[
            ...navSections.map((section) => ({
              href: `${anchorBase}#${section}`,
              label: t(`Header.nav.${section}`),
            })),
            {
              href: getPathname({ href: CAREERS_PATH, locale }),
              label: t("Header.nav.careers"),
              current: currentPage === "careers",
            },
          ]}
          openLabel={t("Header.openMenu")}
          closeLabel={t("Header.closeMenu")}
          menuFooter={<LanguageList label={t("Header.language.label")} />}
        >
          <div className={styles.actions}>
            <LanguageMenu
              label={t("Header.language.current", {
                language: localeNames[locale],
              })}
            />
            <DemoTrigger className={cn("button", styles.demo)}>
              {t("Common.bookDemo")}
            </DemoTrigger>
          </div>
        </HeaderNav>
      </div>
    </header>
  );
}
