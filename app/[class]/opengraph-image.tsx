import { ImageResponse } from "next/og";
import { CLASSES, getClass } from "@/lib/classes";

// Per-class OG image. Applies (via the file convention) to the class hub
// AND every nested spec/BiS/talent route under /[class]/…, so each class
// gets a distinct social card instead of the shared homepage one.

export const alt = "WoW TBC Classic — class BiS & talents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

export default async function ClassOpenGraphImage({
  params,
}: {
  params: Promise<{ class: string }>;
}) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  const name = cls?.name ?? "TBC Classic";
  const accent = cls?.color ?? "#00e599";

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
            color: accent,
            fontSize: 24,
            letterSpacing: "0.2em",
          }}
        >
          TBC CLASSIC · ARENA & RAID
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#ededed",
            fontSize: 82,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: 24,
            color: "#8f8f98",
            fontSize: 30,
            maxWidth: 900,
          }}
        >
          PvP arena BiS · PvE BiS by phase · talent builds & calculator
        </div>
        <div
          style={{
            marginTop: 56,
            display: "flex",
            width: 260,
            height: 6,
            background: accent,
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
