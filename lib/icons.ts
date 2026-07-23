// Class + spec icon helpers. Class icons are the standard zamimg
// classicon_* set; spec icons are derived from the spec's talent tree —
// the 41-point capstone talent's icon — so they always come from real
// data instead of hand-typed icon names.

import { getTalents } from "@/lib/talents";
import type { SpecDef } from "@/lib/classes";

export function classIconName(classSlug: string): string {
  return `classicon_${classSlug}`;
}

export function specIconName(classSlug: string, spec: SpecDef): string {
  const talents = getTalents(classSlug);
  const tree = talents?.trees[spec.treeIndex];
  const capstone = tree?.talents.find((t) => t.row === 8);
  return capstone?.icon ?? classIconName(classSlug);
}

// Equipment-slot icons for the enchants table (zamimg names, HEAD-verified).
// The enchant formulas' own spell icons are useless here: 39 of the 79 TBC
// enchants share one generic scroll icon and 19 more resolve to the
// `classic_temp` placeholder, which renders blank. The slot is the useful
// anchor anyway — the enchant's name is already spelled out beside it.
const ENCHANT_SLOT_ICONS: Record<string, string> = {
  Head: "inv_helmet_24",
  Shoulders: "inv_shoulder_25",
  "Shoulders / Legs": "inv_shoulder_25",
  Back: "inv_misc_cape_18",
  Chest: "inv_chest_chain_05",
  Wrist: "inv_bracer_07",
  Hands: "inv_gauntlets_28",
  Legs: "inv_pants_mail_15",
  Feet: "inv_boots_chain_05",
  Ring: "inv_jewelry_ring_38",
  Weapon: "inv_sword_39",
  "Main Hand": "inv_sword_39",
  "Off Hand": "inv_shield_31",
  "Two-Hand": "inv_axe_09",
  Ranged: "inv_weapon_bow_07",
};

export function enchantSlotIcon(slot: string): string | undefined {
  return ENCHANT_SLOT_ICONS[slot];
}
