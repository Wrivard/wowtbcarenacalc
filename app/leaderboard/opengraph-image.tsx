import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Live TBC Arena Leaderboard";

export default function Image() {
  return ogCard(
    "Live Arena Leaderboard",
    "TBC Season 2 ladder — 2v2, 3v3, 5v5 & Gladiator cutoffs",
  );
}
