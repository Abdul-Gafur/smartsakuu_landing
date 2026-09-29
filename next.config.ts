import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // One canonical host: the bare domain redirects to www, the origin in
      // `src/lib/seo.ts`. Trailing slashes are already removed by default.
      {
        source: "/:path*",
        has: [{ type: "host", value: "smartsakuu.com" }],
        destination: "https://www.smartsakuu.com/:path*",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
