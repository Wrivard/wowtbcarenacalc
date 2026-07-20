// Stat caps by archetype. TBC caps are driven by archetype (physical vs
// caster vs healer vs tank) and content (arena vs raid), NOT by spec — so
// we resolve from (classSlug, role, content) instead of hand-listing all
// 28 specs. This keeps the data correct and maintainable while still
// rendering a spec-appropriate "Stat Caps" table on every BiS page.
//
// Rating conversions (level 70): 1% melee/ranged hit = 15.77 rating;
// 1% spell hit = 12.62 rating; 1 expertise ≈ 3.94 rating.

import type { Role } from "@/lib/classes";

export interface StatCap {
  stat: string;
  cap: number;
  unit: string; // "rating" | "%" | "expertise"
  note: string;
}

/** A ranged-DPS or healer spec that deals/relies on spell damage/hit. */
function isCasterDps(classSlug: string, role: Role): boolean {
  return role === "Ranged DPS" && classSlug !== "hunter";
}

/** Physical attacker: any melee, plus hunters (ranged physical). */
function isPhysical(classSlug: string, role: Role): boolean {
  return role === "Melee DPS" || classSlug === "hunter";
}

export function getStatCaps(
  classSlug: string,
  role: Role,
  content: "pvp" | "pve",
): StatCap[] {
  if (content === "pvp") {
    const caps: StatCap[] = [
      {
        stat: "Resilience",
        cap: 490,
        unit: "rating",
        note: "No hard cap — ~350 is the 2v2 entry point, 490+ is competitive. Reduces crit chance, crit damage and DoT damage taken.",
      },
    ];
    if (isCasterDps(classSlug, role)) {
      caps.push({
        stat: "Spell Hit (vs players)",
        cap: 3,
        unit: "%",
        note: "Only 3% (~38 rating) is needed against players — they are your level, so the raid 16% cap does not apply. Talents/Misery can cover it.",
      });
    } else if (isPhysical(classSlug, role)) {
      caps.push({
        stat: "Hit Rating (vs players)",
        cap: 79,
        unit: "rating",
        note: "5% (~79 rating) caps yellow special-attack misses against same-level players. White dual-wield misses stay high but matter less in arena.",
      });
    }
    return caps;
  }

  // PvE / raid
  if (isCasterDps(classSlug, role)) {
    return [
      {
        stat: "Spell Hit",
        cap: 202,
        unit: "rating",
        note: "16% cap for a raid boss (+3 levels). Draenei Heroic Presence, Shadow Priest's Misery, and hit talents lower how much you need on gear.",
      },
    ];
  }
  if (isPhysical(classSlug, role)) {
    return [
      {
        stat: "Hit Rating",
        cap: 142,
        unit: "rating",
        note: "9% special-attack (yellow) cap when striking a boss from behind. Dual-wield white swings need ~24% and are not worth chasing.",
      },
      {
        stat: "Expertise",
        cap: 26,
        unit: "rating",
        note: "~26 rating removes a boss's dodge from behind (6.5%). Beyond that only parry matters, which you avoid by staying behind.",
      },
    ];
  }
  if (role === "Tank") {
    return [
      {
        stat: "Hit Rating",
        cap: 142,
        unit: "rating",
        note: "9% yellow cap sharply improves threat. You become uncrittable through talents/avoidance in TBC, not a Defense cap.",
      },
      {
        stat: "Expertise",
        cap: 56,
        unit: "expertise",
        note: "Frontal parry/dodge cap for tanks — reduces boss parry-haste risk and steadies threat.",
      },
    ];
  }
  // Healer PvE — no hit cap.
  return [
    {
      stat: "Spell Hit",
      cap: 0,
      unit: "rating",
      note: "Healers need no hit — heals cannot miss. Stack +healing, then crit/haste and enough mp5 to last the fight.",
    },
  ];
}
