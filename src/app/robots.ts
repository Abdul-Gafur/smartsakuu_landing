import type { MetadataRoute } from "next";

import { getSiteUrl, isIndexableDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments stay crawlable so search engines can see their
  // `noindex` tags, but do not advertise a sitemap.
  if (!isIndexableDeployment()) {
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
