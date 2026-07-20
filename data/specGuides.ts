// Per-spec PvP / PvE guides. The written layer (overview, rotation,
// playstyle, mistakes, FAQ) lives here; the guide page assembles it with
// the data-driven layers (stat caps, BiS links, talent build, macros,
// addons, best race, best professions). Guide PAGES are generated ONLY
// for specs authored here, so no thin auto-generated pages ship — new
// specs are added over time.

export interface SpecGuide {
  class: string;
  spec: string;
  content: "pvp" | "pve";
  updatedAt: string;
  overview: string; // paragraphs split on \n\n
  strengths: string[];
  weaknesses: string[];
  rotationTitle: string;
  rotation: string[]; // ordered opener / priority
  playstyle: string;
  commonMistakes: string[];
  /** Optional override of the auto-derived best professions (slugs). */
  bestProfessions?: string[];
  faq: { question: string; answer: string }[];
}

export const SPEC_GUIDES: SpecGuide[] = [
  // ─────────────────────────── Rogue / Subtlety / PvP
  {
    class: "rogue",
    spec: "subtlety",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Subtlety is the premier arena Rogue spec in TBC. Shadowstep gives you the burst mobility to reach any target through a pillar, and Preparation resets Vanish, Sprint, Cold Blood and Evasion for a second full setup. You are the kill-setup class: Cheap Shot into a Cold Blood + Ambush burst wins games in a single stun window.\n\nYour value is control as much as damage. Blind, Kidney Shot, Sap and Gouge let you take the enemy healer out of the equation while your partner bursts, and Cloak of Shadows plus trinket give you two answers to the CC that would otherwise ruin your opener.",
    strengths: [
      "Highest single-target setup burst in the bracket (Cold Blood + Ambush/Eviscerate in a stun)",
      "Shadowstep mobility and Preparation double-CDs",
      "Deep control kit — Blind, Kidney, Sap, Gouge",
    ],
    weaknesses: [
      "Squishy if you get caught out of stealth with cooldowns down",
      "Struggles into teams that can peel your setup (double Fear, Frost Mage)",
    ],
    rotationTitle: "Opener & kill setup",
    rotation: [
      "Open from stealth with Cheap Shot on the kill target (or Garrote a caster to silence).",
      "Build to 5 combo points, then Cold Blood + Ambush or a Cold Blood Eviscerate for the burst.",
      "Kidney Shot to extend the stun; Blind the healer/off-target to protect the kill window.",
      "If the kill doesn't land: Vanish → re-stealth → Preparation to reset Vanish/Sprint/Cold Blood and go again.",
      "Cloak of Shadows to wipe DoTs/magic and trinket the hard CC that interrupts your setup.",
    ],
    playstyle:
      "Play around your cooldowns: with Cold Blood + Preparation up you have two lethal windows, so bait a trinket with the first and kill with the second. Between setups, apply pressure with Hemorrhage and peel for your partner with Blind and Gouge. Never sit in the open with Vanish and trinket both down.",
    commonMistakes: [
      "Blowing Cold Blood without a stun on the target (the crit gets healed).",
      "Using Blind to survive instead of to protect a kill.",
      "Wasting Preparation early instead of banking it for the real kill attempt.",
    ],
    faq: [
      { question: "Is Subtlety or Combat better for arena?", answer: "Subtlety. Shadowstep, Preparation and Cold Blood give it the burst and mobility arena rewards; Combat is a sustained-pressure spec that lacks the setup control." },
      { question: "How much resilience does Subtlety need?", answer: "Aim for ~350+ before queuing 2s and work toward the full Merciless Gladiator set. See the BiS list for the current arena gear and caps." },
      { question: "What's the best race for a PvP Subtlety Rogue?", answer: "Undead (Will of the Forsaken) on Horde and Human (weapon skill + Perception) on Alliance — see the best-race guide." },
    ],
  },

  // ─────────────────────────── Rogue / Combat / PvE
  {
    class: "rogue",
    spec: "combat",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Combat is the raiding Rogue spec in TBC. Blade Flurry, Adrenaline Rush and high sustained white damage make it a top melee DPS on any fight where you can stay on the boss. Swords or maces (via a Human's weapon-skill racial or Combat's own hit talents) drive a fast, energy-efficient Sinister Strike rotation.\n\nUnlike PvP, your job is pure uptime damage: hit the cap, keep Slice and Dice rolling, and pool energy for your cooldowns. Positioning behind the boss to avoid parries is the difference between a good and a great parse.",
    strengths: [
      "Top-tier sustained single-target melee DPS",
      "Blade Flurry cleave on two-target fights",
      "Simple, high-uptime rotation once hit-capped",
    ],
    weaknesses: [
      "Loses damage to any movement or downtime",
      "Reliant on hitting the hit cap before other stats scale",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Open with a stealth Ambush or Garrote, then keep Slice and Dice up at all times.",
      "Sinister Strike to build combo points; refresh Slice and Dice, then spend on Rupture/Eviscerate per your gear.",
      "Pool energy before Adrenaline Rush; pop AR + Blade Flurry + trinkets together on cooldown.",
      "Use Blade Flurry on two-target windows for free cleave.",
      "Always attack from behind to avoid parries and enable Backstab-adjacent positioning.",
    ],
    playstyle:
      "It's a uptime-and-cooldown game: reach the hit cap first, then stack Agility/AP. Align Adrenaline Rush and Blade Flurry with Bloodlust and trinket procs for peak burst, and never clip Slice and Dice. Keep Wound Poison or the raid's assigned poison as called.",
    commonMistakes: [
      "Not hit-capped — a missed special is your biggest DPS loss.",
      "Standing in front of the boss and eating parries.",
      "Letting Slice and Dice drop.",
    ],
    bestProfessions: ["jewelcrafting", "blacksmithing"],
    faq: [
      { question: "What's the hit cap for a raiding Rogue?", answer: "9% (142 hit rating) for yellow specials from behind; white dual-wield needs far more and isn't worth chasing. See the stat caps below." },
      { question: "Combat or Assassination for raids?", answer: "Combat is the standard raid spec for its sustained damage and Blade Flurry cleave; Assassination/Mutilate is a niche alternative." },
    ],
  },

  // ─────────────────────────── Mage / Frost / PvP
  {
    class: "mage",
    spec: "frost",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Frost is the arena Mage spec and the game's premier kiting and control class. Permanent slows, Frost Nova, Blink and Ice Block let you dictate every engagement, while the Shatter combo — a guaranteed-crit Ice Lance + Frostbolt on a frozen target — deletes squishy players in a Polymorph window.\n\nAgainst melee you win by never being touched; against casters you win with Polymorph, Counterspell and Mana Burn-style attrition alongside your partner. Ice Block is the best defensive in the game, wiping DoTs, Fear and burst on demand.",
    strengths: [
      "Unmatched kiting and control vs melee",
      "Shatter burst deletes targets in a freeze",
      "Ice Block + Blink give elite survivability",
    ],
    weaknesses: [
      "Squishy if a Nova is trinketed and you're caught",
      "Struggles into double-caster control (double Fear)",
    ],
    rotationTitle: "Control & Shatter combo",
    rotation: [
      "Polymorph the off-target (usually the enemy healer) to isolate the kill.",
      "Frostbolt the kill target to proc Frostbite, or hard-cast Frost Nova to root.",
      "Shatter combo on the frozen target: Ice Lance + Frostbolt (both guaranteed crits) + Icy Veins + trinket.",
      "Blink out of melee re-engages; Cone of Cold / Frost Nova to re-kite.",
      "Ice Block to reset Fear, DoTs, or a lost position, then re-Polymorph and go again.",
    ],
    playstyle:
      "Keep Frostbolt uptime on your target so Frostbite procs enable free Shatters. Manage Polymorph on the healer with clean DR, and hold Ice Block for the moment it saves the game rather than pressing it early. Distance is your armor — never stand still next to a melee.",
    commonMistakes: [
      "Blinking on cooldown instead of saving it for the melee re-engage.",
      "Shattering without Icy Veins/trinket when you had a kill window.",
      "Letting Polymorph DR reset by re-sheeping too early.",
    ],
    faq: [
      { question: "Is Frost the best Mage spec for arena?", answer: "Yes — the control, kiting and Shatter burst make Frost the standard arena Mage. Fire/Arcane are PvE specs." },
      { question: "What comps is Frost Mage good in?", answer: "Frost Mage / Disc Priest in 2s and RMP (Rogue / Mage / Priest) in 3s — see the arena comp guides linked below." },
    ],
  },

  // ─────────────────────────── Warrior / Arms / PvP
  {
    class: "warrior",
    spec: "arms",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Arms is the arena Warrior spec, built around Mortal Strike — a hard-hitting strike that also cuts the target's healing by 50%. With a healer keeping Blessing of Freedom or peels on you, an Arms Warrior is relentless, un-kiteable pressure that forces cooldowns and grinds teams down.\n\nYour ceiling is defined by your partner's ability to keep you on target. Spell Reflection, Intervene and Hamstring make you more than a damage stick — you peel, you reflect CC, and you control space for your healer.",
    strengths: [
      "Mortal Strike's −50% healing is a permanent pressure debuff",
      "Huge burst with Recklessness + Death Wish",
      "Spell Reflect and Intervene add real utility",
    ],
    weaknesses: [
      "Kited hard by casters when Freedom/Intervene are down",
      "Depends heavily on the healer keeping you mobile",
    ],
    rotationTitle: "Pressure & burst",
    rotation: [
      "Charge/Intercept in, Hamstring to stick, and keep Mortal Strike on cooldown for the healing debuff.",
      "Pop Recklessness + Death Wish + trinket during a Freedom window or when the healer is CC'd.",
      "Overpower on dodge procs; Execute below 20%.",
      "Spell Reflection the key CC (Polymorph, Fear); Intervene to peel for your healer.",
      "Pummel/Shield Bash to interrupt heals when Mortal Strike isn't enough.",
    ],
    playstyle:
      "Read the enemy: pre-Spell-Reflect the Polymorph, and time your burst for when the enemy healer is out of position or CC'd. Keep Mortal Strike rolling above all else — the healing debuff is worth more than any single big hit. Peel for your healer when the pressure swaps to them.",
    commonMistakes: [
      "Bursting into a full-health, freely-casting healer.",
      "Never using Spell Reflection as an anti-caster tool.",
      "Letting Mortal Strike fall off the kill target.",
    ],
    faq: [
      { question: "Arms or Fury for PvP?", answer: "Arms — Mortal Strike's healing reduction and the burst from Recklessness/Death Wish define arena Warrior play. Fury is a PvE spec." },
      { question: "Best 2s comp for an Arms Warrior?", answer: "Warrior / Holy Paladin (very high floor) and Warrior / Disc Priest — see the comp guides below." },
    ],
  },

  // ─────────────────────────── Priest / Holy / PvE
  {
    class: "priest",
    spec: "holy",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Holy is the raid-healing Priest spec in TBC, a throughput-and-efficiency workhorse. Circle of Healing (with the tier bonus) makes it a premier group healer, while Prayer of Mending, Renew and Greater Heal cover tank and spot healing. Spirit-based regen and the right consumables let you heal long fights without going dry.\n\nUnlike Discipline's arena utility, PvE Holy is about assignment discipline: heal your target, keep Prayer of Mending bouncing, and pre-empt raid damage with instant HoTs before it lands.",
    strengths: [
      "Strong group healing with Circle of Healing + Prayer of Mending",
      "Excellent throughput-per-mana on sustained fights",
      "Flexible between tank and raid assignments",
    ],
    weaknesses: [
      "Less burst-single-target than a Paladin on a tank",
      "Relies on Spirit regen and good mana management",
    ],
    rotationTitle: "Healing priority",
    rotation: [
      "Keep Prayer of Mending on cooldown, bouncing on whoever takes damage.",
      "Renew the tank and anyone taking predictable ticking damage ahead of time.",
      "Circle of Healing for group damage; Greater Heal / Flash Heal for tank spikes.",
      "Use Inner Focus + Greater Heal for a free, guaranteed-crit clutch heal.",
      "Weave Shadowfiend / potions to keep mana up on long fights.",
    ],
    playstyle:
      "Anticipate, don't react: pre-HoT before the mechanic, and save Inner Focus for a real spike. Watch your assignment but keep Prayer of Mending and Circle of Healing doing free group healing. Manage mana across the whole fight rather than dumping early.",
    commonMistakes: [
      "Letting Prayer of Mending sit off cooldown.",
      "Reactive-only healing instead of pre-HoTing predictable damage.",
      "Running dry by over-healing the opening of a fight.",
    ],
    bestProfessions: ["tailoring", "alchemy"],
    faq: [
      { question: "Holy or Discipline for raid healing?", answer: "Holy — Circle of Healing and Prayer of Mending give it the group-healing throughput raids want. Discipline is the arena/PvP spec." },
      { question: "Do Holy Priests need Spell Hit?", answer: "No — heals can't miss. Stack +healing, then crit/haste and enough mp5/Spirit to last the fight. See the stat caps below." },
    ],
  },
];

const KEY = (c: string, s: string, ct: string) => `${c}/${s}/${ct}`;
const MAP = new Map(SPEC_GUIDES.map((g) => [KEY(g.class, g.spec, g.content), g]));

export function getSpecGuide(
  classSlug: string,
  specSlug: string,
  content: "pvp" | "pve",
): SpecGuide | undefined {
  return MAP.get(KEY(classSlug, specSlug, content));
}

export function hasSpecGuide(
  classSlug: string,
  specSlug: string,
  content: "pvp" | "pve",
): boolean {
  return MAP.has(KEY(classSlug, specSlug, content));
}

/** Authored guides for a class (for the class guide hub). */
export function specGuidesForClass(classSlug: string): SpecGuide[] {
  return SPEC_GUIDES.filter((g) => g.class === classSlug);
}
