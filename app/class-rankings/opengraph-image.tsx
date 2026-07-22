import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "TBC Class Tier Rankings";

export default function Image() {
  return ogCard(
    "Class Tier Rankings",
    "Best TBC Classic PvE & PvP specs, ranked by phase",
  );
}
