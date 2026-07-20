// "What to buy first" — an ordered acquisition checklist per archetype.
// Resolved from (classSlug, role, content) like the stat caps, so every
// BiS page gets a spec-appropriate priority list without hand-authoring
// 28 specs. High-value for "what gear to get first tbc <spec>" searches.

import type { Role } from "@/lib/classes";

export interface GearStep {
  step: number;
  label: string;
  reason: string;
}

function isCasterDps(classSlug: string, role: Role): boolean {
  return role === "Ranged DPS" && classSlug !== "hunter";
}

export function getGearPriority(
  classSlug: string,
  role: Role,
  content: "pvp" | "pve",
): GearStep[] {
  if (content === "pvp") {
    const weapon =
      isCasterDps(classSlug, role) || role === "Healer"
        ? "Main-hand + off-hand (spell power)"
        : "Weapon(s)";
    const steps: string[][] = [
      [weapon, "The single biggest jump in pressure or throughput per arena point. Buy your weapon before any armor slot."],
      ["PvP trinket (Medallion of the Horde/Alliance)", "Non-negotiable. A CC-break trinket wins more games than any stat piece — grab it the moment you can."],
      ["Set shoulders, chest, legs (resilience core)", "The high-resilience, high-armor slots. These three set the survivability floor that lets your team play the long game."],
      ["Rings, neck, cloak, bracers with resilience", "Fill the off-slots with resilience pieces next; a raid piece here gets you globalled in dampening."],
      ["Gems & enchants (resilience + primary stat)", "Do this last, tuned to your set. Cheap, high-impact, and easy to redo when you swap pieces."],
    ];
    return steps.map(([label, reason], i) => ({ step: i + 1, label, reason }));
  }

  // PvE / raid
  let steps: string[][];
  if (role === "Healer") {
    steps = [
      ["Spell-power weapon + off-hand", "Your biggest throughput slot. A strong healing weapon carries every heal you cast."],
      ["Reach a comfortable mana/mp5 baseline", "Enough regen to last the fight before you push raw throughput — an OOM healer heals nothing."],
      ["Tier set bonuses (2pc / 4pc)", "TBC healer set bonuses are strong; completing them often beats higher item-level off-pieces."],
      ["Trinkets (throughput + regen)", "On-use and proc trinkets close the gap in burst-healing windows."],
      ["Remaining slots, then gems & enchants", "Fill the rest, then tune sockets and enchants for +healing and regen."],
    ];
  } else if (role === "Tank") {
    steps = [
      ["Become uncrittable", "Reach the effective crit-immunity floor via defense/resilience and talents first — nothing else matters if a boss can crit you."],
      ["Stamina & armor (effective health)", "The pool your healers work with. Prioritize survivability before threat."],
      ["Threat stats (hit, expertise, AP)", "Once safe, add hit/expertise to hold aggro so your DPS can go all-out."],
      ["Tier set bonuses", "Round out avoidance and threat set bonuses."],
      ["Avoidance trinkets, then gems & enchants", "Situational survival cooldowns and stamina/threat tuning last."],
    ];
  } else if (isCasterDps(classSlug, role)) {
    steps = [
      ["Reach the spell hit cap", "Hit-capped pieces first — a miss is 100% lost damage. Prioritize any upgrade that closes the gap to 16% (less with talents/Draenei)."],
      ["Spell-power weapon + off-hand", "Your largest single spell-power source after hit is handled."],
      ["Tier set bonuses (2pc / 4pc)", "Caster set bonuses drive a big chunk of throughput this expansion."],
      ["Trinkets (spell-power / on-use)", "Proc and on-use trinkets add burst during cooldown windows."],
      ["Remaining slots, then gems & enchants", "Fill the rest, then socket for spell power once hit is satisfied."],
    ];
  } else {
    // physical melee / hunter
    steps = [
      ["Reach the hit cap (9% yellow)", "Hit-capped pieces first — special attacks that miss cost you the most damage. Then top up expertise to remove dodge."],
      ["Weapon(s)", "Your biggest raw-DPS slot. For dual-wield, the main-hand matters most for special attacks."],
      ["Tier set bonuses (2pc / 4pc)", "Melee/ranged set bonuses are worth completing over marginal item-level gains."],
      ["Trinkets (proc / on-use AP)", "Burst trinkets align with cooldowns for peak damage."],
      ["Remaining slots, then gems & enchants", "Fill the rest, then socket for your primary stat once hit/expertise are set."],
    ];
  }
  return steps.map(([label, reason], i) => ({ step: i + 1, label, reason }));
}
