import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { getLocaleDirection, routing, switcherLocales } from "@/i18n/routing";
import {
  getLanguageAlternates,
  getSiteUrl,
  isIndexedLocale,
  openGraphLocales,
} from "@/lib/seo";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
});

export const viewport: Viewport = {
  themeColor: "#022c7e",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const indexed = isIndexedLocale(locale);
  // Untranslated locales render the default copy, so they point search
  // engines at the default locale instead of competing with it.
  const canonical = `/${indexed ? locale : routing.defaultLocale}`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    applicationName: t("siteName"),
    creator: t("siteName"),
    publisher: t("siteName"),
    category: "education",
    openGraph: {
      type: "website",
      url: canonical,
      siteName: t("siteName"),
      title: t("title"),
      description: t("description"),
      locale: openGraphLocales[locale],
      alternateLocale: switcherLocales
        .filter((alternate) => alternate !== locale)
        .map((alternate) => openGraphLocales[alternate]),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical,
      languages: getLanguageAlternates(),
    },
    robots: indexed
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={getLocaleDirection(locale)}
      className={plusJakartaSans.variable}
      // Keeps in-page anchor scrolling smooth without animating route changes.
      data-scroll-behavior="smooth"
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
