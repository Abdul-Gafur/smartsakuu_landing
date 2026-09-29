import type { MetadataRoute } from "next";

import messages from "@/messages/en.json";

/** Web app manifest: the name, colors and icons browsers use for the site. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: messages.Metadata.title,
    short_name: messages.Metadata.siteName,
    description: messages.Metadata.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    // Matches `viewport.themeColor` in the locale layout.
    theme_color: "#022c7e",
    icons: [
      { src: "/icon.png", sizes: "96x96", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
