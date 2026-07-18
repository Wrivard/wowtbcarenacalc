// Item metadata resolved at data-build time via the Wowhead tooltip API
// (endpoints documented in github.com/iamcal/Wowhead-API). Lets us
// server-render item icons + quality-colored names — good for SEO and
// zero layout shift — while the Wowhead script still powers hover
// tooltips.

import itemsJson from "@/data/items.json";

export interface ItemMeta {
  name: string;
  icon: string;
  quality: number; // Wowhead quality index (2 uncommon, 3 rare, 4 epic…)
}

const ITEMS = itemsJson as Record<string, ItemMeta>;

export function getItem(itemId: number): ItemMeta | undefined {
  return ITEMS[String(itemId)];
}

// Wowhead quality palette (q2/q3/q4/q5).
export const QUALITY_COLORS: Record<number, string> = {
  0: "#9d9d9d",
  1: "#ffffff",
  2: "#1eff00",
  3: "#0070dd",
  4: "#a335ee",
  5: "#ff8000",
};

export function qualityColor(quality: number | undefined): string {
  return QUALITY_COLORS[quality ?? 1] ?? "#ffffff";
}
