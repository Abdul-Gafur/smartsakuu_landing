import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { CareersPage } from "@/features/careers/components/careers-page";
import { CAREERS_PATH } from "@/features/careers/constants";
import { getCareersPageMetadata } from "@/features/careers/lib/metadata";
import { getOpenJobs } from "@/features/careers/services/jobs";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Careers.Metadata" });

  return getCareersPageMetadata({
    locale,
    pathname: CAREERS_PATH,
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: PageProps<"/[locale]/careers">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const jobs = await getOpenJobs(locale);

  return <CareersPage jobs={jobs} />;
}
