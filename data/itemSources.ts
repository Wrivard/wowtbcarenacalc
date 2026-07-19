// Item acquisition sources, keyed by Wowhead item id. Drives the
// "How to get" line on each BiS slot expand. This is a curated, growing
// seed (not every item in every list yet) — pages render the source only
// when present, so partial coverage degrades gracefully. Add entries as
// they are verified against Wowhead; never guess a drop source.

export interface ItemSourceEntry {
  type: "raid" | "dungeon" | "vendor" | "crafted" | "pvp" | "world" | "quest";
  location: string;
  boss?: string;
  dropRate?: string;
  currency?: string;
  profession?: string;
}

export interface ItemSource {
  itemId: number;
  sources: ItemSourceEntry[];
}

const SOURCES: Record<number, ItemSourceEntry[]> = {
  // Merciless Gladiator's Leather (Season 2 arena set) — arena/honor vendors.
  31999: [{ type: "pvp", location: "Arena / Honor vendor (Area 52, Netherstorm)", currency: "Honor + Battleground marks" }],
  31998: [{ type: "pvp", location: "Arena / Honor vendor (Area 52, Netherstorm)", currency: "Honor + Battleground marks" }],
  32002: [{ type: "pvp", location: "Arena / Honor vendor (Area 52, Netherstorm)", currency: "Honor + Battleground marks" }],
  32001: [{ type: "pvp", location: "Arena vendor (Area 52, Netherstorm)", currency: "Arena points (rating required)" }],
  32000: [{ type: "pvp", location: "Arena vendor (Area 52, Netherstorm)", currency: "Arena points (rating required)" }],
  32027: [{ type: "pvp", location: "Arena vendor (Area 52, Netherstorm)", currency: "Arena points (rating required)" }],
  32052: [{ type: "pvp", location: "Arena vendor (Area 52, Netherstorm)", currency: "Arena points (rating required)" }],
  32054: [{ type: "pvp", location: "Arena vendor (Area 52, Netherstorm)", currency: "Arena points (rating required)" }],
  // Season 1 arena set (Gladiator's Leather).
  25832: [{ type: "pvp", location: "Honor vendor (Area 52, Netherstorm)", currency: "Honor + Battleground marks" }],
  25834: [{ type: "pvp", location: "Honor vendor (Area 52, Netherstorm)", currency: "Honor + Battleground marks" }],

  // Crafted.
  30040: [{ type: "crafted", location: "Leatherworking", profession: "Leatherworking 365" }],

  // Vendor (Badges of Justice, Shattrath — G'eras).
  29383: [{ type: "vendor", location: "Shattrath City (G'eras)", currency: "41 Badges of Justice" }],

  // Raid drops.
  28649: [{ type: "raid", location: "Karazhan", boss: "Prince Malchezaar" }],

  // Heroic dungeon drops.
  29381: [{ type: "dungeon", location: "Sethekk Halls (Heroic)", boss: "Talon King Ikiss" }],
  30450: [{ type: "dungeon", location: "The Botanica", boss: "Warp Splinter" }],

  // Raid pieces flagged as PvE flex on PvP lists.
  30146: [{ type: "raid", location: "Karazhan / Gruul's Lair (Tier 4 token turn-in)", boss: "Prince Malchezaar / Gruul" }],
  30149: [{ type: "raid", location: "Magtheridon's Lair (Tier 4 token turn-in)", boss: "Magtheridon" }],
  30145: [{ type: "raid", location: "Karazhan (Tier 4 token turn-in)", boss: "The Curator" }],
  30148: [{ type: "raid", location: "Gruul's Lair (Tier 4 token turn-in)", boss: "Gruul the Dragonkiller" }],
};

const TYPE_LABEL: Record<ItemSourceEntry["type"], string> = {
  raid: "Raid",
  dungeon: "Dungeon",
  vendor: "Vendor",
  crafted: "Crafted",
  pvp: "PvP",
  world: "World Drop",
  quest: "Quest",
};

export function getItemSource(itemId: number): ItemSourceEntry[] | null {
  return SOURCES[itemId] ?? null;
}

/** One-line human string, e.g. "Raid — Karazhan (Prince Malchezaar)". */
export function formatItemSource(s: ItemSourceEntry): string {
  const parts = [TYPE_LABEL[s.type], "—", s.location];
  const extra = [s.boss, s.dropRate, s.currency, s.profession].filter(Boolean);
  let str = parts.join(" ");
  if (extra.length) str += ` (${extra.join(", ")})`;
  return str;
}
