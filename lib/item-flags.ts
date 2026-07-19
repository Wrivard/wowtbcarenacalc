// Raid-only item flags. These are PvE items with NO resilience that
// historically pollute arena BiS snapshots when the aggregation sample
// includes raid-geared players who also hold a rating. On PvP pages we
// surface a warning badge when one of these appears as the top pick at
// meaningful usage, so readers know to grab the arena set piece instead.
//
// This is a hand-curated allow-list of the well-known offenders (tier
// tokens and their turn-ins, plus a few notorious raid drops), NOT an
// exhaustive raid database. Add IDs here as new pollution cases surface.

const PVE_ONLY_ITEMS = new Set<number>([
  // Rogue T4 — Deathmantle (Karazhan / Gruul / Magtheridon)
  30146, 30149, 30145, 30148, 30144,
  // Rogue T4 off-set — Netherblade (dungeon/badge, no resilience)
  29044, 29045, 29048, 29046,
  // Rogue T5 — Deathmantle successor / Bloodfang pieces
  30214, 30215, 30216, 30217, 30219,
  // Common raid weapons/trinkets seen flexed into PvP lists
  28830, // Dragonspine Trophy
  30450, // Warp-Spring Coil
  29996, // Rod of the Sun King
  32478, // Deathblow X11 Goggles (Engineering, raid-tier)
]);

/** True when an item is a PvE/raid piece with no PvP (resilience) value. */
export function isPveOnly(itemId: number): boolean {
  return PVE_ONLY_ITEMS.has(itemId);
}

/** Usage threshold above which a raid-only top pick warrants a warning. */
export const PVE_ONLY_WARN_PCT = 30;
