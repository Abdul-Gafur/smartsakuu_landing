import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { getPathname } from "@/i18n/navigation";

import { DemoDialogProvider } from "./demo-dialog/demo-dialog-context";
import { DemoRequestDialog } from "./demo-dialog/demo-request-dialog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header/site-header";

/**
 * The site header, footer and demo dialog around pages other than the landing
 * page, such as careers and the 404 page. Header and footer section links
 * point back to the landing page.
 */
export function SiteShell({ children }: { children: ReactNode }) {
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
