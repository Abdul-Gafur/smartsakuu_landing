import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

import { images } from "@/features/landing/constants";
import { getLocaleDirection, routing } from "@/i18n/routing";

export const alt =
  "SmartSakuu logo beside schoolchildren working on their lessons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const headlineSize = 58;
const footnoteSize = 24;

const colors = {
  navy: "#022c7e",
  muted: "#53627b",
  teal: "#09c6b9",
  paper: "#f4f6fa",
};

async function readPublicImage(src: string, mime: string) {
  const data = await readFile(join(process.cwd(), "public", src));
  return `data:${mime};base64,${data.toString("base64")}`;
}

/** Downloads a Google Font subset that covers only `text`. */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.ok) return response.arrayBuffer();
  }

  throw new Error(`Failed to load the ${family} font for the Open Graph image`);
}

/**
 * Lays text out one word at a time so a trailing full stop can be tucked back
 * against its word: the image renderer skips kerning, which leaves a visible
 * gap before the stop in Plus Jakarta Sans.
 */
function Words({ text, fontSize }: { text: string; fontSize: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: Math.round(fontSize * 0.26),
      }}
    >
      {text.split(/\s+/).map((word, index) => {
        const stop = word.endsWith(".");

        return (
          <div key={index} style={{ display: "flex" }}>
            {stop ? word.slice(0, -1) : word}
            {stop && (
              <span style={{ marginLeft: -Math.round(fontSize * 0.08) }}>
                .
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const fontFamily = "Plus Jakarta Sans";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requestedLocale } = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  // The image renderer cannot shape and order right-to-left text reliably, so
  // those locales get a brand card and rely on the localized og:title instead.
  const showCopy = getLocaleDirection(locale) === "ltr";

  const t = await getTranslations({ locale, namespace: "Landing" });
  const headline = t.raw("Hero.title").split("<br></br>") as string[];
  const footnote = t("Hero.footnote");
  const text = [...headline, footnote].join(" ");

  const [logo, photo, fonts] = await Promise.all([
    readPublicImage(images.logo.src, "image/png"),
    readPublicImage(images.classroom.src, "image/jpeg"),
    showCopy
      ? Promise.all([
          loadGoogleFont(fontFamily, 800, text),
          loadGoogleFont(fontFamily, 500, text),
        ])
      : null,
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: colors.paper,
        fontFamily,
      }}
    >
      {showCopy ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 60px",
          }}
        >
          <img src={logo} alt="" width={294} height={64} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: headlineSize,
              fontWeight: 800,
              lineHeight: 1.12,
              color: colors.navy,
            }}
          >
            {headline.map((line) => (
              <Words key={line} text={line} fontSize={headlineSize} />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: footnoteSize,
              fontWeight: 500,
              color: colors.muted,
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 40,
                height: 6,
                borderRadius: 3,
                background: colors.teal,
              }}
            />
            <div style={{ display: "flex", maxWidth: 560 }}>
              <Words text={footnote} fontSize={footnoteSize} />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <img src={logo} alt="" width={505} height={110} />
          <div
            style={{
              width: 64,
              height: 8,
              borderRadius: 4,
              background: colors.teal,
            }}
          />
        </div>
      )}
      <img
        src={photo}
        alt=""
        width={440}
        height={630}
        style={{ objectFit: "cover" }}
      />
    </div>,
    {
      ...size,
      fonts: fonts
        ? [
            { name: fontFamily, data: fonts[0], weight: 800, style: "normal" },
            { name: fontFamily, data: fonts[1], weight: 500, style: "normal" },
          ]
        : undefined,
    },
  );
}
