import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "TBC Classic Raid Guides";

export default function Image() {
  return ogCard(
    "TBC Raid BiS & Guides",
    "Karazhan to Sunwell — boss strategies, roles & loot",
  );
}
