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
  key: string; // legacy ?tier= param, e.g. "p2" — kept for back-compat
  /** keyword-rich, stable URL slug for the static page, e.g.
   * "serpentshrine-tempest-keep". This is the canonical routing id. */
  slug: string;
  short: string; // "SSC & TK"
  raids: string; // "Serpentshrine Cavern & Tempest Keep"
  phase: number;
  blurb: string;
  /** Unique <title>/og:title for the tier's static page (≤ ~60 chars). */
  metaTitle: string;
  /** Unique meta description for the tier's static page. */
  metaDescription: string;
  /** Visible H1 for the tier's static page. */
  h1: string;
  /** Hero intro paragraph for the tier's static page. */
  intro: string;
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

// Phase 3 (Black Temple & Mount Hyjal) — Tier-6. Warglaive Rogues spike,
// and caster scaling keeps climbing; Shadow Priests become a raid staple
// as much for buffs as personal parse.
const P3: DpsRanking[] = [
  { classSlug: "rogue", specSlug: "combat", label: "Combat Rogue", dps: 2050 },
  { classSlug: "mage", specSlug: "arcane", label: "Arcane Mage", dps: 2010 },
  { classSlug: "warlock", specSlug: "destruction", label: "Destruction Warlock", dps: 1955 },
  { classSlug: "hunter", specSlug: "beast-mastery", label: "Beast Mastery Hunter", dps: 1875 },
  { classSlug: "warrior", specSlug: "fury", label: "Fury Warrior", dps: 1850 },
  { classSlug: "hunter", specSlug: "survival", label: "Survival Hunter", dps: 1820 },
  { classSlug: "priest", specSlug: "shadow", label: "Shadow Priest", dps: 1800 },
  { classSlug: "warlock", specSlug: "affliction", label: "Affliction Warlock", dps: 1780 },
  { classSlug: "paladin", specSlug: "retribution", label: "Retribution Paladin", dps: 1760 },
  { classSlug: "shaman", specSlug: "enhancement", label: "Enhancement Shaman", dps: 1740 },
  { classSlug: "warrior", specSlug: "arms", label: "Arms Warrior", dps: 1705 },
  { classSlug: "mage", specSlug: "fire", label: "Fire Mage", dps: 1690 },
  { classSlug: "druid", specSlug: "feral-cat", label: "Feral DPS Druid", dps: 1680 },
  { classSlug: "shaman", specSlug: "elemental", label: "Elemental Shaman", dps: 1625 },
  { classSlug: "druid", specSlug: "balance", label: "Balance Druid", dps: 1600 },
  { classSlug: "mage", specSlug: "frost", label: "Frost Mage", dps: 1360 },
];

// Phase 4 (Zul'Aman) — a T6 10-player interim; gear overlaps Black
// Temple, so the ordering tracks Phase 3 with everyone a notch more
// geared. Fights are shorter and add-heavy, which flatters burst/cleave.
const P4: DpsRanking[] = [
  { classSlug: "rogue", specSlug: "combat", label: "Combat Rogue", dps: 2180 },
  { classSlug: "mage", specSlug: "arcane", label: "Arcane Mage", dps: 2130 },
  { classSlug: "warlock", specSlug: "destruction", label: "Destruction Warlock", dps: 2080 },
  { classSlug: "hunter", specSlug: "beast-mastery", label: "Beast Mastery Hunter", dps: 2000 },
  { classSlug: "warrior", specSlug: "fury", label: "Fury Warrior", dps: 1975 },
  { classSlug: "priest", specSlug: "shadow", label: "Shadow Priest", dps: 1940 },
  { classSlug: "hunter", specSlug: "survival", label: "Survival Hunter", dps: 1930 },
  { classSlug: "warlock", specSlug: "affliction", label: "Affliction Warlock", dps: 1900 },
  { classSlug: "shaman", specSlug: "enhancement", label: "Enhancement Shaman", dps: 1885 },
  { classSlug: "paladin", specSlug: "retribution", label: "Retribution Paladin", dps: 1870 },
  { classSlug: "mage", specSlug: "fire", label: "Fire Mage", dps: 1820 },
  { classSlug: "warrior", specSlug: "arms", label: "Arms Warrior", dps: 1800 },
  { classSlug: "druid", specSlug: "feral-cat", label: "Feral DPS Druid", dps: 1790 },
  { classSlug: "shaman", specSlug: "elemental", label: "Elemental Shaman", dps: 1730 },
  { classSlug: "druid", specSlug: "balance", label: "Balance Druid", dps: 1705 },
  { classSlug: "mage", specSlug: "frost", label: "Frost Mage", dps: 1450 },
];

// Phase 5 (Sunwell Plateau) — Tier-6.5, the expansion's ceiling. Full
// scaling: Enhancement Shamans explode with Sunwell gear, casters peak,
// and Warglaive Rogues stay at the very top.
const P5: DpsRanking[] = [
  { classSlug: "rogue", specSlug: "combat", label: "Combat Rogue", dps: 2600 },
  { classSlug: "shaman", specSlug: "enhancement", label: "Enhancement Shaman", dps: 2550 },
  { classSlug: "mage", specSlug: "arcane", label: "Arcane Mage", dps: 2520 },
  { classSlug: "warlock", specSlug: "destruction", label: "Destruction Warlock", dps: 2480 },
  { classSlug: "priest", specSlug: "shadow", label: "Shadow Priest", dps: 2450 },
  { classSlug: "paladin", specSlug: "retribution", label: "Retribution Paladin", dps: 2400 },
  { classSlug: "hunter", specSlug: "beast-mastery", label: "Beast Mastery Hunter", dps: 2380 },
  { classSlug: "warrior", specSlug: "fury", label: "Fury Warrior", dps: 2360 },
  { classSlug: "hunter", specSlug: "survival", label: "Survival Hunter", dps: 2340 },
  { classSlug: "warlock", specSlug: "affliction", label: "Affliction Warlock", dps: 2320 },
  { classSlug: "mage", specSlug: "fire", label: "Fire Mage", dps: 2300 },
  { classSlug: "druid", specSlug: "feral-cat", label: "Feral DPS Druid", dps: 2280 },
  { classSlug: "shaman", specSlug: "elemental", label: "Elemental Shaman", dps: 2240 },
  { classSlug: "warrior", specSlug: "arms", label: "Arms Warrior", dps: 2200 },
  { classSlug: "druid", specSlug: "balance", label: "Balance Druid", dps: 2180 },
  { classSlug: "mage", specSlug: "frost", label: "Frost Mage", dps: 1900 },
];

export const RANKING_TIERS: RankingTier[] = [
  {
    key: "p1",
    slug: "karazhan-gruul-magtheridon",
    short: "Kara / Gruul / Mag",
    raids: "Karazhan, Gruul's Lair & Magtheridon's Lair",
    phase: 1,
    blurb:
      "Tier-4 entry raids. With less spell power to scale on, physical and pet specs — Fury, Beast Mastery, Combat — lead the meters before casters take over in later tiers.",
    metaTitle: "Best Phase 1 DPS — Karazhan & Gruul (TBC Classic)",
    metaDescription:
      "TBC Classic Phase 1 DPS rankings for Karazhan, Gruul's Lair and Magtheridon's Lair. Tier-4 meters favor Fury Warriors, Beast Mastery Hunters and Combat Rogues before casters scale up — ranked with links to every spec guide.",
    h1: "Best Phase 1 DPS — Karazhan, Gruul & Magtheridon",
    intro:
      "The top DPS specs for TBC Classic's Tier-4 raids — Karazhan, Gruul's Lair and Magtheridon's Lair. With little spell power to scale on, physical and pet specs lead the early meters. Click any bar to open that spec's raid guide.",
    rankings: P1,
  },
  {
    key: "p2",
    slug: "serpentshrine-tempest-keep",
    short: "SSC & TK",
    raids: "Serpentshrine Cavern & Tempest Keep",
    phase: 2,
    blurb:
      "Tier-5 gear from Serpentshrine Cavern and Tempest Keep. Caster scaling comes online here — Arcane Mages pull clearly ahead, and Warlocks close the gap on the physical specs that led Phase 1.",
    metaTitle: "Best Phase 2 DPS — SSC & Tempest Keep (TBC)",
    metaDescription:
      "TBC Classic Phase 2 DPS rankings for Serpentshrine Cavern and Tempest Keep. Tier-5 caster scaling puts Arcane Mages clearly ahead while Warlocks close on the physical specs — ranked with links to every spec guide.",
    h1: "Best Serpentshrine & Tempest Keep DPS — Phase 2",
    intro:
      "The top DPS specs for TBC Classic's Tier-5 raids, Serpentshrine Cavern and Tempest Keep. Caster scaling comes online — Arcane Mages pull clearly ahead and Warlocks surge up the meters. Click any bar to open that spec's raid guide.",
    rankings: P2,
  },
  {
    key: "p3",
    slug: "black-temple-hyjal",
    short: "BT & Hyjal",
    raids: "Black Temple & Mount Hyjal",
    phase: 3,
    blurb:
      "Tier-6. The Warglaives of Azzinoth push Combat Rogues to the top, casters keep scaling, and Shadow Priests cement a raid spot — for their party-wide spell-damage return as much as their own parse.",
    metaTitle: "Best Phase 3 DPS — Black Temple & Hyjal (TBC)",
    metaDescription:
      "TBC Classic Phase 3 DPS rankings for Black Temple and Mount Hyjal. Tier-6 Warglaive Combat Rogues top the meters, casters keep scaling and Shadow Priests lock a raid spot — ranked with links to every spec guide.",
    h1: "Best Black Temple & Hyjal DPS — Phase 3",
    intro:
      "The top DPS specs for TBC Classic's Tier-6 raids, Black Temple and Mount Hyjal. The Warglaives of Azzinoth push Combat Rogues to the very top as caster scaling keeps climbing. Click any bar to open that spec's raid guide.",
    rankings: P3,
  },
  {
    key: "p4",
    slug: "zulaman",
    short: "Zul'Aman",
    raids: "Zul'Aman",
    phase: 4,
    blurb:
      "The Phase 4 10-player raid. Its gear overlaps Tier-6, so the ordering tracks Black Temple with everyone slightly better equipped; short, add-heavy fights reward burst and cleave.",
    metaTitle: "Best Zul'Aman DPS — Phase 4 (TBC Classic)",
    metaDescription:
      "TBC Classic Phase 4 DPS rankings for Zul'Aman. The Tier-6 10-player raid tracks Black Temple with slightly better gear; short, add-heavy fights reward burst and cleave — ranked with links to every spec guide.",
    h1: "Best Zul'Aman DPS — Phase 4 TBC Classic",
    intro:
      "The top DPS specs for TBC Classic's Phase 4 raid, Zul'Aman. Its Tier-6 gear tracks Black Temple, and short, add-heavy fights reward burst and cleave. Click any bar to open that spec's raid guide.",
    rankings: P4,
  },
  {
    key: "p5",
    slug: "sunwell-plateau",
    short: "Sunwell",
    raids: "Sunwell Plateau",
    phase: 5,
    blurb:
      "Tier-6.5, the expansion's ceiling. With full Sunwell scaling, Enhancement Shamans surge, casters peak, and Warglaive Rogues stay at the very top of the meters.",
    metaTitle: "Best Sunwell Plateau DPS — TBC Classic",
    metaDescription:
      "TBC Classic Sunwell Plateau (Phase 5) DPS rankings. At the Tier-6.5 ceiling, Warglaive Combat Rogues and Enhancement Shamans surge to the top while casters peak — ranked with links to every spec guide.",
    h1: "Best Sunwell Plateau DPS — TBC Classic",
    intro:
      "The top DPS specs for Sunwell Plateau, TBC Classic's Tier-6.5 ceiling. With full Sunwell scaling, Enhancement Shamans surge, casters peak, and Warglaive Rogues stay at the very top. Click any bar to open that spec's raid guide.",
    rankings: P5,
  },
];

export function getRankingTier(key: string): RankingTier | undefined {
  return RANKING_TIERS.find((t) => t.key === key);
}

export function getRankingTierBySlug(slug: string): RankingTier | undefined {
  return RANKING_TIERS.find((t) => t.slug === slug);
}

// Default view is the endgame tier (Sunwell) — the ceiling players care
// about most; earlier tiers are a tab click away.
export const DEFAULT_TIER =
  RANKING_TIERS[RANKING_TIERS.length - 1];

// Every tier except the default one gets its own static, indexable page at
// /class-rankings/<slug>. The default tier's content lives on the hub
// (/class-rankings) — generating it here too would be duplicate content.
export const NON_DEFAULT_TIERS: RankingTier[] = RANKING_TIERS.filter(
  (t) => t.key !== DEFAULT_TIER.key,
);

// General DPS FAQ for the hub — targets "best dps class in tbc", "does spec
// matter", "caster vs physical" style queries. Answers are phase-aware and
// reflect the settled-tier picture above.
export const RANKINGS_FAQ: { question: string; answer: string }[] = [
  {
    question: "What is the best DPS class in TBC Classic?",
    answer:
      "It depends on the phase. Early in Tier 4 (Karazhan, Gruul, Magtheridon) physical and pet specs lead — Fury Warriors, Beast Mastery Hunters and Combat Rogues. Once caster gear scales in Tier 5, Arcane Mages pull ahead, and by Tier 6 / Sunwell the Warglaive Combat Rogue and Enhancement Shaman top the meters. Arcane Mage is the most consistently strong caster across every tier.",
  },
  {
    question: "Does spec matter for DPS in TBC Classic?",
    answer:
      "Yes, enormously. Within a single class the gap between the raiding spec and the off-spec is often 30% or more — Arcane or Fire Mage far outparse Frost, Combat Rogue beats Assassination on most fights, and Beast Mastery/Survival lead Marksmanship for Hunters. Picking the correct raid spec matters more than min-maxing gear.",
  },
  {
    question: "What is the best DPS for Sunwell Plateau (Phase 5)?",
    answer:
      "At the Tier-6.5 Sunwell ceiling, Warglaive-equipped Combat Rogues and fully-scaled Enhancement Shamans reach the very top, with Arcane Mages, Destruction Warlocks and Shadow Priests close behind. Every top spec is within a tight band, so raid buffs and execution decide the meter more than class.",
  },
  {
    question: "Are caster or physical DPS better in TBC Classic?",
    answer:
      "Physical and pet specs lead early (Tier 4) because there is little spell power to scale on. As raids progress, spell power and hit gear come online, so casters — Arcane Mages, Warlocks, Shadow Priests — scale up and match or pass the physical specs by Tier 5 and 6. A balanced raid brings both.",
  },
];
