import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "TBC Arena Comp Tier List";

export default function Image() {
  return ogCard(
    "Arena Comp Tier List",
    "Best 2v2, 3v3 & 5v5 comps for TBC Classic, ranked",
  );
}
