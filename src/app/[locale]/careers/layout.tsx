import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { CareersShell } from "@/features/careers/components/careers-shell";
import { routing } from "@/i18n/routing";

export default async function CareersLayout({
  children,
  params,
}: LayoutProps<"/[locale]/careers">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <CareersShell>{children}</CareersShell>;
}
