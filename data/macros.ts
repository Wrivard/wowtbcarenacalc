// Real TBC Classic macros, keyed by class. `spec` is optional (most are
// class-wide). Categories group them in the UI. Codes are exact and use
// TBC-valid macro syntax (focus/arena unit conditionals, /use 13-14 for
// trinket slots).

export type MacroCategory = "focus" | "arena" | "offensive" | "defensive" | "utility";

export interface Macro {
  class: string; // lib/classes slug
  spec?: string;
  category: MacroCategory;
  name: string;
  code: string;
  description: string;
}

export const MACROS: Macro[] = [
  // ---------------- Rogue ----------------
  {
    class: "rogue",
    category: "focus",
    name: "Focus Blind",
    code: "#showtooltip Blind\n/cast [target=focus] Blind",
    description: "Blind your focus (usually the enemy healer) without swapping off your kill target.",
  },
  {
    class: "rogue",
    category: "focus",
    name: "Focus Kick",
    code: "#showtooltip Kick\n/cast [target=focus] Kick",
    description: "Interrupt a focus-target cast while staying on your primary. Pair with a second Kick on your current target.",
  },
  {
    class: "rogue",
    spec: "subtlety",
    category: "offensive",
    name: "Shadowstep Cheap Shot",
    code: "#showtooltip Cheap Shot\n/cast Shadowstep\n/cast Cheap Shot",
    description: "Gap-close with Shadowstep and open the stun in one button — the core Sub kill-setup macro.",
  },
  {
    class: "rogue",
    category: "offensive",
    name: "Burst (Blade Flurry + AR + trinkets)",
    code: "#showtooltip Adrenaline Rush\n/cast Blade Flurry\n/cast Adrenaline Rush\n/use 13\n/use 14",
    description: "Stack Blade Flurry, Adrenaline Rush and both trinkets for a Combat burst window.",
  },

  // ---------------- Mage ----------------
  {
    class: "mage",
    category: "focus",
    name: "Focus Counterspell",
    code: "#showtooltip Counterspell\n/cast [target=focus] Counterspell",
    description: "Lock out a focus caster (enemy healer) without target-swapping.",
  },
  {
    class: "mage",
    category: "focus",
    name: "Focus Polymorph",
    code: "#showtooltip Polymorph\n/cast [target=focus] Polymorph",
    description: "Sheep your focus to control the enemy healer while you burst another target.",
  },
  {
    class: "mage",
    category: "defensive",
    name: "Ice Block toggle",
    code: "#showtooltip Ice Block\n/cancelaura Ice Block\n/cast Ice Block",
    description: "One button to Block and to break Block — cancels the aura if you're already in it.",
  },

  // ---------------- Priest ----------------
  {
    class: "priest",
    category: "focus",
    name: "Focus Mana Burn",
    code: "#showtooltip Mana Burn\n/cast [target=focus] Mana Burn",
    description: "Burn a focus healer's mana while keeping your target for offensive casts.",
  },
  {
    class: "priest",
    spec: "shadow",
    category: "focus",
    name: "Focus Silence",
    code: "#showtooltip Silence\n/cast [target=focus] Silence",
    description: "Silence a focus caster to interrupt and lock them out.",
  },
  {
    class: "priest",
    category: "utility",
    name: "Inner Focus + Greater Heal",
    code: "#showtooltip Greater Heal\n/cast Inner Focus\n/cast Greater Heal",
    description: "Fire a free, guaranteed-crit Greater Heal by stacking Inner Focus in one press.",
  },

  // ---------------- Warrior ----------------
  {
    class: "warrior",
    category: "utility",
    name: "Charge / Intercept",
    code: "#showtooltip\n/cast [stance:1] Charge; [stance:2] Intercept; [stance:3] Intercept",
    description: "One gap-closer button that casts Charge in Battle Stance and Intercept in Berserker/Defensive.",
  },
  {
    class: "warrior",
    category: "focus",
    name: "Focus Pummel",
    code: "#showtooltip Pummel\n/cast [target=focus] Pummel",
    description: "Interrupt a focus caster (needs Berserker Stance) without leaving your target.",
  },
  {
    class: "warrior",
    category: "defensive",
    name: "Spell Reflection",
    code: "#showtooltip Spell Reflection\n/cast [stance:1] Defensive Stance\n/cast Spell Reflection",
    description: "Swap to Defensive Stance and reflect the next spell — great vs Polymorph and Fear.",
  },

  // ---------------- Warlock ----------------
  {
    class: "warlock",
    category: "focus",
    name: "Focus Fear",
    code: "#showtooltip Fear\n/cast [target=focus] Fear",
    description: "Fear your focus to peel or control without swapping your DoT target.",
  },
  {
    class: "warlock",
    category: "focus",
    name: "Focus Spell Lock (Felhunter)",
    code: "#showtooltip Spell Lock\n/cast [target=focus] Spell Lock",
    description: "Interrupt/silence a focus caster with your Felhunter's Spell Lock.",
  },
  {
    class: "warlock",
    category: "defensive",
    name: "Focus Death Coil",
    code: "#showtooltip Death Coil\n/cast [target=focus] Death Coil",
    description: "Fear-horror + heal off a focus melee that's training you — your panic-reset button.",
  },

  // ---------------- Paladin ----------------
  {
    class: "paladin",
    category: "focus",
    name: "Focus Blessing of Freedom",
    code: "#showtooltip Blessing of Freedom\n/cast [target=focus] Blessing of Freedom",
    description: "Freedom your focus (your melee partner) to keep them un-kited during a burst window.",
  },
  {
    class: "paladin",
    category: "focus",
    name: "Focus Blessing of Protection",
    code: "#showtooltip Blessing of Protection\n/cast [target=focus] Blessing of Protection",
    description: "Bubble a focus ally to reset a melee train onto them.",
  },
  {
    class: "paladin",
    category: "utility",
    name: "Focus Cleanse",
    code: "#showtooltip Cleanse\n/cast [target=focus] Cleanse",
    description: "Dispel poison/magic/disease off a focus ally without target-swapping.",
  },

  // ---------------- Shaman ----------------
  {
    class: "shaman",
    category: "focus",
    name: "Focus Purge",
    code: "#showtooltip Purge\n/cast [target=focus] Purge",
    description: "Strip a focus enemy's buffs (Freedom, shields, HoTs) while staying on your target.",
  },
  {
    class: "shaman",
    spec: "restoration",
    category: "defensive",
    name: "Nature's Swiftness + Healing Wave",
    code: "#showtooltip Healing Wave\n/cast Nature's Swiftness\n/cast Healing Wave",
    description: "Instant, full Healing Wave in one press — your emergency answer to a swap.",
  },
  {
    class: "shaman",
    spec: "restoration",
    category: "utility",
    name: "Focus Earth Shield",
    code: "#showtooltip Earth Shield\n/cast [target=focus] Earth Shield",
    description: "Keep Earth Shield rolling on a focus ally (your kill-target teammate) hands-free.",
  },

  // ---------------- Hunter ----------------
  {
    class: "hunter",
    category: "focus",
    name: "Focus Scatter Shot",
    code: "#showtooltip Scatter Shot\n/cast [target=focus] Scatter Shot",
    description: "Scatter a focus target to set up a Freezing Trap or peel without swapping.",
  },
  {
    class: "hunter",
    spec: "marksmanship",
    category: "focus",
    name: "Focus Silencing Shot",
    code: "#showtooltip Silencing Shot\n/cast [target=focus] Silencing Shot",
    description: "Silence a focus caster mid-cast while keeping your damage on your target.",
  },
  {
    class: "hunter",
    category: "arena",
    name: "Pet on arena1",
    code: "/petattack [target=arena1]",
    description: "Send your pet at the first arena enemy — quick-swap your pet's target in 2s/3s.",
  },

  // ---------------- Druid ----------------
  {
    class: "druid",
    category: "focus",
    name: "Focus Cyclone",
    code: "#showtooltip Cyclone\n/cast [target=focus] Cyclone",
    description: "Cyclone a focus enemy (usually their healer) during a kill attempt without leaving your target.",
  },
  {
    class: "druid",
    spec: "restoration",
    category: "defensive",
    name: "Nature's Swiftness + Healing Touch",
    code: "#showtooltip Healing Touch\n/cast Nature's Swiftness\n/cast Healing Touch",
    description: "Instant full Healing Touch — your clutch save against burst.",
  },
  {
    class: "druid",
    category: "utility",
    name: "Focus Innervate",
    code: "#showtooltip Innervate\n/cast [target=focus] Innervate",
    description: "Innervate a focus ally (or yourself with no focus) to refill mana in a long game.",
  },
];

export function macrosForClass(classSlug: string): Macro[] {
  return MACROS.filter((m) => m.class === classSlug);
}
