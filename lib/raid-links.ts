// Resolves an item's recorded acquisition source to an internal raid or boss
// guide route.
//
// data/itemSources.ts already knows that 475 BiS items drop in a raid, and
// names the boss for most of them — but it was rendered as dead text. Turning
// it into a link is both the obvious UX affordance ("where does this drop?" →
// the fight) and the site's largest source of contextual internal links: the
// 236 BiS pages point into the 48 boss guides with the boss's own name as
// anchor text.
//
// Only "raid" sources resolve. Dungeons, vendors, crafting and world drops
// have no page here, so they stay plain text rather than linking somewhere
// vaguely related.

import { RAID_ROUTES, BOSS_ROUTES } from "@/data/raidRoutes";
import type { ItemSourceEntry } from "@/data/itemSources";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export interface SourceLink {
  href: string;
  /** Boss or raid name — the anchor text. */
  label: string;
}

/** Internal route for a source entry, or null when we publish no such page. */
export function sourceLink(entry: ItemSourceEntry): SourceLink | null {
  if (entry.type !== "raid") return null;
  const raid = RAID_ROUTES[norm(entry.location)];
  if (!raid) return null;
  if (entry.boss) {
    const boss = BOSS_ROUTES[norm(entry.boss)];
    // Guard the raid match too: Wowhead records a few bosses under a
    // different instance than we file them, and a mismatched pair would
    // produce a 404 route.
    if (boss && boss.raidId === raid.raidId) {
      return {
        href: `/raids/phase-${boss.phase}/${boss.raidId}/${boss.bossId}`,
        label: boss.boss,
      };
    }
  }
  // No boss page (Nightbane, the Opera variants, chest/satchel containers…)
  // — the raid guide is still the right destination.
  return { href: `/raids/phase-${raid.phase}/${raid.raidId}`, label: raid.raid };
}
