// PvE DPS rankings per content tier. The numbers are representative of
// the aggregate top-parse picture (the kind of data warcraftlogs surfaces
// once a tier has settled) — they are a landmark ordering, not a live
// feed, and real numbers shift with gear, logs and tuning. Each entry
// links to the class/spec so the ranking doubles as a navigation hub.
//
// Only DPS specs are ranked here (the meaningful, comparable metric);
// healer and tank value is qualitative and covered in their spec guides.

export interface DpsRanking {
  classSlug: string;
  specSlug: string;
  /** display label, e.g. "Arcane Mage" */
  label: string;
  /** representative single-target DPS for the tier */
  dps: number;
}

export interface RankingTier {
  key: string; // url param, e.g. "p2"
  short: string; // "SSC & TK"
  raids: string; // "Serpentshrine Cavern & Tempest Keep"
  phase: number;
  blurb: string;
  rankings: DpsRanking[]; // authored in descending order
}

// Phase 2 (SSC & TK) — the settled Tier-5 picture.
const P2: DpsRanking[] = [
  { classSlug: "mage", specSlug: "arcane", label: "Arcane Mage", dps: 1740 },
  { classSlug: "warlock", specSlug: "destruction", label: "Destruction Warlock", dps: 1599 },
  { classSlug: "warrior", specSlug: "fury", label: "Fury Warrior", dps: 1579 },
  { classSlug: "hunter", specSlug: "beast-mastery", label: "Beast Mastery Hunter", dps: 1578 },
  { classSlug: "hunter", specSlug: "survival", label: "Survival Hunter", dps: 1498 },
  { classSlug: "warrior", specSlug: "arms", label: "Arms Warrior", dps: 1447 },
  { classSlug: "paladin", specSlug: "retribution", label: "Retribution Paladin", dps: 1445 },
  { classSlug: "warlock", specSlug: "affliction", label: "Affliction Warlock", dps: 1434 },
  { classSlug: "rogue", specSlug: "combat", label: "Combat Rogue", dps: 1393 },
  { classSlug: "shaman", specSlug: "enhancement", label: "Enhancement Shaman", dps: 1385 },
  { classSlug: "druid", specSlug: "feral-cat", label: "Feral DPS Druid", dps: 1372 },
  { classSlug: "mage", specSlug: "fire", label: "Fire Mage", dps: 1335 },
  { classSlug: "druid", specSlug: "balance", label: "Balance Druid", dps: 1258 },
  { classSlug: "shaman", specSlug: "elemental", label: "Elemental Shaman", dps: 1215 },
  { classSlug: "priest", specSlug: "shadow", label: "Shadow Priest", dps: 1196 },
  { classSlug: "mage", specSlug: "frost", label: "Frost Mage", dps: 1027 },
];

// Phase 1 (Karazhan, Gruul, Magtheridon) — Tier-4 gear, less scaling.
// Physical/pet specs lead early before caster scaling takes over in T5.
const P1: DpsRanking[] = [
  { classSlug: "warrior", specSlug: "fury", label: "Fury Warrior", dps: 1155 },
  { classSlug: "hunter", specSlug: "beast-mastery", label: "Beast Mastery Hunter", dps: 1130 },
  { classSlug: "rogue", specSlug: "combat", label: "Combat Rogue", dps: 1075 },
  { classSlug: "mage", specSlug: "arcane", label: "Arcane Mage", dps: 1060 },
  { classSlug: "mage", specSlug: "fire", label: "Fire Mage", dps: 1045 },
  { classSlug: "warlock", specSlug: "destruction", label: "Destruction Warlock", dps: 1005 },
  { classSlug: "hunter", specSlug: "survival", label: "Survival Hunter", dps: 985 },
  { classSlug: "warlock", specSlug: "affliction", label: "Affliction Warlock", dps: 970 },
  { classSlug: "shaman", specSlug: "enhancement", label: "Enhancement Shaman", dps: 945 },
  { classSlug: "warrior", specSlug: "arms", label: "Arms Warrior", dps: 935 },
  { classSlug: "paladin", specSlug: "retribution", label: "Retribution Paladin", dps: 920 },
  { classSlug: "druid", specSlug: "feral-cat", label: "Feral DPS Druid", dps: 910 },
  { classSlug: "shaman", specSlug: "elemental", label: "Elemental Shaman", dps: 875 },
  { classSlug: "druid", specSlug: "balance", label: "Balance Druid", dps: 865 },
  { classSlug: "priest", specSlug: "shadow", label: "Shadow Priest", dps: 855 },
  { classSlug: "mage", specSlug: "frost", label: "Frost Mage", dps: 735 },
];

export const RANKING_TIERS: RankingTier[] = [
  {
    key: "p2",
    short: "SSC & TK",
    raids: "Serpentshrine Cavern & Tempest Keep",
    phase: 2,
    blurb:
      "Tier-5 gear from Serpentshrine Cavern and Tempest Keep. Caster scaling comes online here — Arcane Mages pull clearly ahead, and Warlocks close the gap on the physical specs that led Phase 1.",
    rankings: P2,
  },
  {
    key: "p1",
    short: "Kara / Gruul / Mag",
    raids: "Karazhan, Gruul's Lair & Magtheridon's Lair",
    phase: 1,
    blurb:
      "Tier-4 entry raids. With less spell power to scale on, physical and pet specs — Fury, Beast Mastery, Combat — lead the meters before casters take over in later tiers.",
    rankings: P1,
  },
];

export function getRankingTier(key: string): RankingTier | undefined {
  return RANKING_TIERS.find((t) => t.key === key);
}

export const DEFAULT_TIER = RANKING_TIERS[0]; // latest settled tier
