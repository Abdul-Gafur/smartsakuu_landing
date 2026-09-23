import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl items-center px-6 py-16 sm:px-10">
      <div className="space-y-3">
        <p className="text-sm font-medium text-neutral-500">{t("status")}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-prose text-base leading-7 text-neutral-600">
          {t("description")}
        </p>
      </div>
    </main>
  );
}
