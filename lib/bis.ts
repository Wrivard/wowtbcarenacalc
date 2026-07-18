// BiS dataset access. Lists are keyed off Wowhead item ids — Wowhead's
// tooltip script resolves name/icon/quality client-side, we store only
// ids + usage stats + per-spec editorial content.
//
// Populating paths (both write the same JSON shape):
//   1. Curated (current): hand-filled from public BiS references, item
//      ids resolved via the Wowhead TBC search API. See data/bis/*.json.
//   2. Automated snapshot (future): scripts/scrape-bis.ts pulling the
//      ironforge.pro leaderboard → most-used item per slot per spec.
//      CHECK ironforge.pro's Terms of Service before enabling, and
//      rate-limit politely. Gate behind a cron, not the build.
//
// TODO: fill the remaining spec lists (only specs present in the
// registry below get an indexed BiS page; everything else renders a
// noindex "coming soon" and stays out of the sitemap).

import shamanRestorationPvp from "@/data/bis/shaman-restoration-pvp.json";
import type { Phase } from "@/lib/classes";

export type BisSlotName =
  | "Head" | "Neck" | "Shoulders" | "Back" | "Chest" | "Wrist" | "Hands"
  | "Waist" | "Legs" | "Feet" | "Ring1" | "Ring2" | "Trinket1" | "Trinket2"
  | "MainHand" | "OffHand" | "Ranged";

export interface BisItemRef {
  itemId: number;
  usagePct?: number;
  pveFlexNote?: string;
}

export interface BisSlot {
  slot: BisSlotName;
  bis: BisItemRef;
  alternatives: BisItemRef[];
}

export interface BisFaqItem {
  question: string;
  answer: string;
}

export interface BisList {
  class: string;
  spec: string;
  content: "pvp" | "pve";
  phase?: number; // pve only: 1..5
  season?: number; // pvp only
  ratingRange?: [number, number]; // pvp only
  sampleSize?: number;
  updatedAt: string; // ISO date
  blurb: string; // unique per-spec editorial intro (anti-thin-content)
  statPriorityRationale: string;
  statPriority: string[];
  slots: BisSlot[];
  gems: { itemId: number; note: string }[];
  enchants: { slot: string; text: string; note: string }[];
  faq: BisFaqItem[];
}

const REGISTRY: Record<string, BisList> = {
  "shaman/restoration/pvp": shamanRestorationPvp as BisList,
};

export function getPvpBis(classSlug: string, specSlug: string): BisList | null {
  return REGISTRY[`${classSlug}/${specSlug}/pvp`] ?? null;
}

export function getPveBis(
  classSlug: string,
  specSlug: string,
  phase: Phase,
): BisList | null {
  return REGISTRY[`${classSlug}/${specSlug}/pve/${phase}`] ?? null;
}

/** All filled lists — drives the sitemap (unfilled specs stay out). */
export function filledBisRoutes(): {
  classSlug: string;
  specSlug: string;
  content: "pvp" | "pve";
  phase?: number;
  updatedAt: string;
}[] {
  return Object.values(REGISTRY).map((list) => ({
    classSlug: list.class,
    specSlug: list.spec,
    content: list.content,
    phase: list.phase,
    updatedAt: list.updatedAt,
  }));
}

export function wowheadItemUrl(itemId: number): string {
  return `https://www.wowhead.com/tbc/item=${itemId}`;
}
