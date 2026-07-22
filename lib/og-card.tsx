import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Shared 1200×630 social card: kicker + headline + subtitle on the brand
 * dark tone with the accent underline. Used by every section's
 * opengraph-image so shared links show a relevant, branded card. */
export function ogCard(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#00e599",
            fontSize: 24,
            letterSpacing: "0.2em",
          }}
        >
          TBC CLASSIC · ANNIVERSARY
        </div>
        <div
          style={{
            marginTop: 28,
            color: "#ededed",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 960,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 28, color: "#8f8f98", fontSize: 30, maxWidth: 900 }}>
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 60,
            display: "flex",
            width: 260,
            height: 6,
            background: "#00e599",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
