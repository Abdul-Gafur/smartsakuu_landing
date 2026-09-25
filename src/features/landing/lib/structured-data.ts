import { getTranslations } from "next-intl/server";

import { defaultLocale, switcherLocales, type AppLocale } from "@/i18n/routing";
import { getSiteUrl, isIndexedLocale } from "@/lib/seo";

import {
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  images,
  schoolProcesses,
} from "../constants";

/**
 * schema.org graph describing SmartSakuu as an organization, its website and
 * its product, so search engines can connect the brand, logo and contacts.
 */
export async function getLandingStructuredData(locale: AppLocale) {
  const [tMeta, tLanding] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "Landing" }),
  ]);

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${isIndexedLocale(locale) ? locale : defaultLocale}`;
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const softwareId = `${siteUrl}/#software`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: tMeta("siteName"),
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/apple-icon.png`,
          width: 180,
          height: 180,
        },
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Wa",
          addressRegion: "Upper West Region",
          addressCountry: "GH",
        },
        areaServed: { "@type": "Country", name: "Ghana" },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: CONTACT_EMAIL,
          telephone: CONTACT_WHATSAPP.replace(/\s/g, ""),
          areaServed: "GH",
          availableLanguage: [...switcherLocales],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: tMeta("siteName"),
        inLanguage: [...switcherLocales],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: tMeta("title"),
        description: tMeta("description"),
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        about: { "@id": softwareId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${images.classroom.src}`,
          width: images.classroom.width,
          height: images.classroom.height,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: tMeta("siteName"),
        url: pageUrl,
        description: tMeta("description"),
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        publisher: { "@id": organizationId },
        featureList: schoolProcesses.map((process) =>
          tLanding(`Digitize.foundation.processes.${process}`),
        ),
        audience: {
          "@type": "EducationalAudience",
          educationalRole: ["administrator", "teacher", "student", "parent"],
        },
      },
    ],
  };
}

/** Serializes JSON-LD for a `<script>` tag without allowing `</script>`. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
