import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { DemoDialogProvider } from "@/features/landing/components/demo-dialog/demo-dialog-context";
import { DemoRequestDialog } from "@/features/landing/components/demo-dialog/demo-request-dialog";
import { SiteFooter } from "@/features/landing/components/site-footer";
import { SiteHeader } from "@/features/landing/components/site-header/site-header";
import { getPathname } from "@/i18n/navigation";

/**
 * The site header, footer and demo dialog around every careers page. Header
 * and footer section links point back to the landing page.
 */
export function CareersShell({ children }: { children: ReactNode }) {
  const t = useTranslations("Landing.Common");
  const locale = useLocale();
  const home = getPathname({ href: "/", locale });

  return (
    <DemoDialogProvider>
      <a className="skip-link" href="#main">
        {t("skipLink")}
      </a>
      <SiteHeader anchorBase={home} currentPage="careers" />
      <main id="main">{children}</main>
      <SiteFooter anchorBase={home} />
      <DemoRequestDialog />
    </DemoDialogProvider>
  );
}
