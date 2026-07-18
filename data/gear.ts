// TBC arena vendor gear dataset.
//
// TODO (before promoting the Gear Planner past "beta"):
// Fill from Wowhead TBC Classic S1–S4 arena vendor data — every slot,
// every season, with exact arena point costs and personal/team rating
// requirements. The entries below are representative placeholders with
// realistic S1 (Gladiator) costs so the planner math works end-to-end.

export type GearSlot =
  | "head"
  | "shoulders"
  | "chest"
  | "hands"
  | "legs"
  | "weapon"
  | "offhand";

export type GearSection = "Armor" | "Weapons" | "Off-hand & Shield";

export interface GearItem {
  id: string;
  name: string;
  slot: GearSlot;
  section: GearSection;
  season: 1 | 2 | 3 | 4;
  arenaPointCost: number;
  ratingRequirement: number; // 0 = no rating requirement
}

export const GEAR_ITEMS: GearItem[] = [
  // — Armor (S1 Gladiator set, no rating requirements in S1) —
  {
    id: "s1-head",
    name: "Gladiator's Helm (S1)",
    slot: "head",
    section: "Armor",
    season: 1,
    arenaPointCost: 1875,
    ratingRequirement: 0,
  },
  {
    id: "s1-shoulders",
    name: "Gladiator's Shoulders (S1)",
    slot: "shoulders",
    section: "Armor",
    season: 1,
    arenaPointCost: 1500,
    ratingRequirement: 0,
  },
  {
    id: "s1-chest",
    name: "Gladiator's Chestpiece (S1)",
    slot: "chest",
    section: "Armor",
    season: 1,
    arenaPointCost: 1875,
    ratingRequirement: 0,
  },
  {
    id: "s1-hands",
    name: "Gladiator's Gloves (S1)",
    slot: "hands",
    section: "Armor",
    season: 1,
    arenaPointCost: 1125,
    ratingRequirement: 0,
  },
  {
    id: "s1-legs",
    name: "Gladiator's Leggings (S1)",
    slot: "legs",
    section: "Armor",
    season: 1,
    arenaPointCost: 1875,
    ratingRequirement: 0,
  },
  // — Weapons —
  {
    id: "s1-weapon-2h",
    name: "Gladiator's Two-Hand Weapon (S1)",
    slot: "weapon",
    section: "Weapons",
    season: 1,
    arenaPointCost: 3750,
    ratingRequirement: 0,
  },
  {
    id: "s1-weapon-1h",
    name: "Gladiator's One-Hand Weapon (S1)",
    slot: "weapon",
    section: "Weapons",
    season: 1,
    arenaPointCost: 2625,
    ratingRequirement: 0,
  },
  // — Off-hand & Shield —
  {
    id: "s1-shield",
    name: "Gladiator's Shield Wall (S1)",
    slot: "offhand",
    section: "Off-hand & Shield",
    season: 1,
    arenaPointCost: 2250,
    ratingRequirement: 0,
  },
  {
    id: "s1-offhand",
    name: "Gladiator's Endgame (S1)",
    slot: "offhand",
    section: "Off-hand & Shield",
    season: 1,
    arenaPointCost: 1125,
    ratingRequirement: 0,
  },
];

export const GEAR_SECTIONS: GearSection[] = [
  "Armor",
  "Weapons",
  "Off-hand & Shield",
];
