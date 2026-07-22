import { ImageResponse } from "next/og";

export const alt = "WoW TBC Arena Points Calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Arena Points Calculator
        </div>
        <div
          style={{
            marginTop: 28,
            color: "#8f8f98",
            fontSize: 30,
            maxWidth: 860,
          }}
        >
          2v2 · 3v3 · 5v5 — exact weekly points from your team rating
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
    { ...size },
  );
}
