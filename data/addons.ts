// TBC Classic addon recommendations. `classes` undefined = universal.
// URLs point at each addon's CurseForge page (stable slugs). Per-class
// pages show the universal essentials plus anything tagged for that class.

export interface Addon {
  name: string;
  description: string;
  url: string;
  classes?: string[]; // lib/classes slugs; undefined = universal
  content?: "pvp" | "pve" | "both";
  isEssential: boolean;
}

const CF = (slug: string) => `https://www.curseforge.com/wow/addons/${slug}`;

export const ADDONS: Addon[] = [
  // ---- Universal essentials ----
  {
    name: "Deadly Boss Mods (DBM)",
    description: "Raid boss timers, warnings and pull counters. Non-negotiable for raiding — it calls out every mechanic before it happens.",
    url: CF("deadly-boss-mods"),
    content: "pve",
    isEssential: true,
  },
  {
    name: "WeakAuras 2",
    description: "The most powerful custom-alert framework in WoW. Track buffs, procs, cooldowns and combo points with visual auras — import strings do the setup for you.",
    url: CF("weakauras-2"),
    content: "both",
    isEssential: true,
  },
  {
    name: "Bagnon",
    description: "Merges every bag (and your bank) into one searchable window. A quality-of-life staple on every character.",
    url: CF("bagnon"),
    content: "both",
    isEssential: true,
  },
  {
    name: "Details! Damage Meter",
    description: "Detailed damage, healing and threat meters with deep breakdowns. Lighter and more informative than the classic Recount.",
    url: CF("details"),
    content: "pve",
    isEssential: true,
  },
  {
    name: "Bartender4",
    description: "Full action-bar replacement — reposition, resize and hide bars, and set up the layout you actually want for your rotation.",
    url: CF("bartender4"),
    content: "both",
    isEssential: true,
  },
  {
    name: "OmniCC",
    description: "Cooldown-count text on every ability and item. Essential for tracking your rotation and defensive timings at a glance.",
    url: CF("omnicc"),
    content: "both",
    isEssential: true,
  },
  {
    name: "Quartz",
    description: "A clean, modular cast bar with latency display and swing timers — helps you time interrupts and Spell Reflects.",
    url: CF("quartz"),
    content: "both",
    isEssential: false,
  },
  {
    name: "Prat 3.0",
    description: "Chat overhaul: tabs, timestamps, copy-paste, and cleaner formatting. Small but you'll never play without it again.",
    url: CF("prat-3-0"),
    content: "both",
    isEssential: false,
  },
  {
    name: "Postal",
    description: "Bulk mail handling — open all, take all attachments, and mass-send. A must for anyone using professions or an auction alt.",
    url: CF("postal"),
    content: "both",
    isEssential: false,
  },
  {
    name: "GTFO",
    description: "An audio alarm when you stand in something that's hurting you. Simple, and it saves lives in raids.",
    url: CF("gtfo"),
    content: "pve",
    isEssential: false,
  },

  // ---- PvP / arena ----
  {
    name: "Gladius",
    description: "Arena enemy unit frames with trinket, DR and cast tracking. The single most important arena addon — you cannot play seriously without enemy frames.",
    url: CF("gladius"),
    content: "pvp",
    isEssential: true,
  },
  {
    name: "OmniBar",
    description: "Tracks enemy cooldowns (trinkets, interrupts, defensives) so you always know what the other team has available.",
    url: CF("omnibar"),
    content: "pvp",
    isEssential: false,
  },

  // ---- Healer-focused ----
  {
    name: "VuhDo",
    description: "Click-cast healing frames with HoT tracking, debuff highlighting and range indicators. The go-to raid/arena healing addon.",
    url: CF("vuhdo"),
    classes: ["paladin", "priest", "shaman", "druid"],
    content: "both",
    isEssential: true,
  },
  {
    name: "Grid2",
    description: "Compact, information-dense raid frames — a lighter alternative to VuhDo for healers who prefer minimalist layouts.",
    url: CF("grid2"),
    classes: ["paladin", "priest", "shaman", "druid"],
    content: "pve",
    isEssential: false,
  },

  // ---- Class utility ----
  {
    name: "ClassicCastbars",
    description: "Adds cast bars to enemy players and NPCs — critical for timing kicks, Counterspells and Spell Reflects.",
    url: CF("classiccastbars"),
    classes: ["warrior", "rogue", "mage", "shaman", "paladin"],
    content: "both",
    isEssential: false,
  },
];

/** Addons for a given class: class-tagged ones + universal essentials. */
export function addonsForClass(classSlug: string): Addon[] {
  return ADDONS.filter(
    (a) => (a.classes && a.classes.includes(classSlug)) || (!a.classes && a.isEssential),
  );
}

export function universalAddons(): Addon[] {
  return ADDONS.filter((a) => !a.classes);
}
