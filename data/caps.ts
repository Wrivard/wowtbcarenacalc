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
        cap: 4,
        unit: "%",
        note: "4% (~50 rating) caps spell misses against same-level players — the raid 16% boss cap does not apply. Hit talents and Misery can cover most of it, so gear little pure hit in arena.",
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
        unit: "expertise",
        note: "26 expertise (≈102 rating) removes a boss's 6.5% dodge — each point of expertise cuts dodge/parry by 0.25%. Parry only happens from the front, so staying behind means you only need to beat dodge.",
      },
    ];
  }
  if (role === "Tank") {
    return [
      {
        stat: "Defense (crit immunity)",
        cap: 490,
        unit: "defense",
        note: "490 defense skill makes you uncrittable by a raid boss (removes the 5.6% crit chance). Resilience or class talents (e.g. a Druid's Survival of the Fittest) substitute for part of it — this is the first tanking goal before any other stat.",
      },
      {
        stat: "Hit Rating",
        cap: 142,
        unit: "rating",
        note: "9% (142 rating) yellow-attack cap. Not a survival stat, but it sharply steadies threat by removing missed taunts and abilities.",
      },
      {
        stat: "Expertise",
        cap: 26,
        unit: "expertise",
        note: "26 expertise (≈102 rating) removes boss dodge; higher values chip at frontal parry to reduce parry-haste. Threat/uptime stat, taken after crit immunity.",
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
