import { useTranslations } from "next-intl";

import { NotFoundSection } from "@/features/landing/components/not-found-section";
import { SiteShell } from "@/features/landing/components/site-shell";

/**
 * Shown for unknown paths under a locale (see `[...rest]`) and wherever a page
 * calls `notFound()`, such as a role that is no longer open. It still returns
 * a 404 status, which also adds `noindex`.
 */
export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <SiteShell>
      <title>{t("metaTitle")}</title>
      <NotFoundSection />
    </SiteShell>
  );
}
