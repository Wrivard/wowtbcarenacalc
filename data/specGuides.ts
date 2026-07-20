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

  // ─────────────────────────── Rogue / Combat / PvP
  {
    class: "rogue",
    spec: "combat",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Combat is the sustained-pressure arena Rogue. It trades Subtlety's Shadowstep mobility and setup burst for relentless white damage — Adrenaline Rush and Blade Flurry turn any extended fight into a losing race for the enemy healer. It plays like a second melee: park on a target and grind.\n\nIt shines in dampening 2s where the game goes long, but it lacks Sub's ability to force a kill from range or reset with Preparation, so you commit to melee uptime and gear tankier to survive it.",
    strengths: [
      "Best sustained melee pressure of any Rogue spec",
      "Blade Flurry cleave punishes stacked teams",
      "Tankier and more forgiving than Subtlety",
    ],
    weaknesses: [
      "No Shadowstep — kited far more easily",
      "No Preparation reset and weaker kill-setup control",
    ],
    rotationTitle: "Pressure & burst",
    rotation: [
      "Open with Cheap Shot on the kill target, or Garrote a caster to silence.",
      "Keep Slice and Dice up and build combo points with Sinister Strike.",
      "Pop Adrenaline Rush + Blade Flurry + trinket to force healer cooldowns.",
      "Kidney Shot to lock the target during your burst; Blind the healer to protect it.",
      "Evasion + Cloak of Shadows to survive the melee/CC swap onto you.",
    ],
    playstyle:
      "You win the long game, so play patiently: chip pressure, keep Slice and Dice rolling, and save your burst for when the enemy healer is low on mana or out of position. Gear tankier (resilience + stamina) than a Sub Rogue — you're committing to extended melee, and survivability is what makes that commitment pay off.",
    commonMistakes: [
      "Burning Adrenaline Rush into a full-mana, freely-casting healer.",
      "Playing it like Subtlety and expecting a one-shot setup.",
      "Under-gearing resilience for a spec that lives in melee.",
    ],
    faq: [
      { question: "Is Combat viable in arena?", answer: "Yes, but Subtlety is the stronger arena spec. Combat is a sustained-pressure pick that excels in long dampening 2s; it lacks Sub's setup burst and Shadowstep mobility." },
      { question: "Combat Rogue best 2s partner?", answer: "A Holy Paladin or Disc Priest that can keep you healed through extended melee — see the comp guides." },
    ],
  },

  // ─────────────────────────── Rogue / Assassination / PvE
  {
    class: "rogue",
    spec: "assassination",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Assassination (Mutilate) is the poison-and-daggers Rogue spec. In TBC it's a niche raid choice — Combat with swords is the standard raid spec for its higher, more consistent sustained damage — but Mutilate posts strong numbers on fights where you can reliably strike from behind and keep poisons ticking.\n\nIt leans on Cold Blood burst windows and heavy poison damage rather than Combat's Blade Flurry cleave and Adrenaline Rush uptime.",
    strengths: [
      "Strong burst with Cold Blood + Mutilate",
      "Heavy poison damage scales with your uptime",
      "Excellent from-behind single-target output",
    ],
    weaknesses: [
      "Below Combat for overall raid DPS in TBC",
      "Dagger requirement narrows your weapon options",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Open from stealth with a Cheap Shot or Garrote, then keep Slice and Dice up.",
      "Mutilate to build combo points (best behind the target); maintain Deadly Poison stacks.",
      "Cold Blood + Mutilate or a Cold Blood Envenom for burst windows.",
      "Spend combo points on Envenom/Rupture per your gear; never let Slice and Dice drop.",
      "Align Cold Blood and trinkets with Bloodlust.",
    ],
    playstyle:
      "Maximize from-behind uptime for Mutilate and keep both poisons applied. It's a rotation of maintaining Slice and Dice, pooling energy for Cold Blood windows, and dumping combo points efficiently. Choose Assassination only if your loot/comp favors daggers — otherwise Combat is the raid default.",
    commonMistakes: [
      "Bringing Assassination when Combat would parse higher for your raid.",
      "Letting poison stacks or Slice and Dice fall off.",
      "Mutilating from the front and eating parries.",
    ],
    bestProfessions: ["jewelcrafting", "blacksmithing"],
    faq: [
      { question: "Assassination or Combat for TBC raids?", answer: "Combat (swords) is the standard raid Rogue spec for higher sustained DPS. Assassination/Mutilate is a viable but niche dagger alternative." },
      { question: "What's the Rogue hit cap?", answer: "9% (142 rating) for yellow specials from behind — see the stat caps below." },
    ],
  },

  // ─────────────────────────── Rogue / Subtlety / PvE
  {
    class: "rogue",
    spec: "subtlety",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Subtlety is a niche raid spec in TBC — a Hemorrhage-based build that can buff the raid's physical damage on the target and offers strong burst, but it trails Combat for personal sustained DPS. Most Rogues raid Combat; Sub PvE is a situational or utility pick.\n\nIf you run it, you lean on Hemorrhage uptime (a physical-damage debuff), Shadowstep positioning, and Premeditation/Cold Blood burst windows.",
    strengths: [
      "Hemorrhage adds raid physical-damage value",
      "Strong burst with Premeditation + Cold Blood",
      "Shadowstep makes target swaps and repositioning easy",
    ],
    weaknesses: [
      "Lower personal sustained DPS than Combat",
      "Rarely the optimal raid choice outside niche cases",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Open from stealth (Ambush/Garrote), keep Slice and Dice up.",
      "Maintain Hemorrhage on the boss for the physical debuff; build combo points.",
      "Premeditation + Cold Blood for burst windows.",
      "Spend on Eviscerate/Rupture per gear; keep Slice and Dice rolling.",
      "Shadowstep to reposition on swaps without losing uptime.",
    ],
    playstyle:
      "It's about keeping Hemorrhage and Slice and Dice up while pooling for Cold Blood bursts. Only bring Sub to raids for the Hemorrhage debuff value or a specific fight need — otherwise Combat out-parses it comfortably.",
    commonMistakes: [
      "Raiding Subtlety when Combat is the better personal-DPS choice.",
      "Letting Hemorrhage or Slice and Dice drop.",
      "Not capping hit before stacking other stats.",
    ],
    faq: [
      { question: "Should I raid as Subtlety?", answer: "Usually no — Combat is the standard raid Rogue spec. Subtlety PvE is a niche Hemorrhage-utility or burst pick." },
      { question: "Is Subtlety better for PvP or PvE?", answer: "PvP — Subtlety is the premier arena Rogue spec. For raids, Combat is standard." },
    ],
  },

  // ─────────────────────────── Warrior / Arms / PvE
  {
    class: "warrior",
    spec: "arms",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Arms in PvE is primarily a utility DPS spec: its Mortal Strike applies the −50% healing debuff that matters on a handful of encounters, and Arms brings solid two-handed burst. For pure single-target raid DPS, though, Fury (dual-wield) is the standard Warrior raid spec.\n\nBring Arms when a fight wants the Mortal Strike debuff or when you prefer the two-handed playstyle; otherwise Fury parses higher.",
    strengths: [
      "Mortal Strike healing debuff for specific encounters",
      "Strong two-handed burst",
      "Simple, sturdy rotation",
    ],
    weaknesses: [
      "Lower sustained raid DPS than Fury",
      "Rage-starved without steady incoming damage",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Keep Battle Shout up and open in Battle Stance.",
      "Mortal Strike on cooldown (and for the healing debuff where it matters).",
      "Whirlwind on cooldown; Slam in the gaps when rage allows.",
      "Overpower on dodge procs; Execute below 20%.",
      "Pop Recklessness + Death Wish + trinkets with Bloodlust.",
    ],
    playstyle:
      "Weave Slam between Mortal Strike and Whirlwind without clipping your swing timer, and keep Battle Shout up for the raid. Hit-cap first, then stack Strength/AP and crit. Choose Arms for the MS debuff or two-handed preference; Fury is the higher-DPS default.",
    commonMistakes: [
      "Clipping your white swing with a badly-timed Slam.",
      "Bringing Arms for pure DPS when Fury parses higher.",
      "Ignoring the hit cap.",
    ],
    bestProfessions: ["blacksmithing", "jewelcrafting"],
    faq: [
      { question: "Arms or Fury for raiding?", answer: "Fury (dual-wield) is the standard raid DPS spec. Arms is a utility pick for the Mortal Strike healing debuff or the two-handed playstyle." },
      { question: "What's the Warrior hit cap?", answer: "9% (142 rating) for yellow specials; dual-wield white-hit cap is much higher and not worth chasing. See the caps below." },
    ],
  },

  // ─────────────────────────── Warrior / Fury / PvP
  {
    class: "warrior",
    spec: "fury",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Fury PvP is a niche, aggressive alternative to Arms — it hits harder in raw burst thanks to dual-wield and Bloodthirst, but it gives up Mortal Strike's healing debuff, which is the single most valuable thing an arena Warrior brings. That trade-off keeps Arms the standard arena spec.\n\nFury can spike a squishy target fast in a coordinated swap, but without the −50% healing it struggles to close games against a competent healer.",
    strengths: [
      "Higher raw burst than Arms in a swap window",
      "Strong rage generation with dual-wield",
      "Death Wish + Recklessness delete squishies",
    ],
    weaknesses: [
      "No Mortal Strike healing debuff — the big loss",
      "Kited and peeled as hard as any Warrior",
    ],
    rotationTitle: "Burst & pressure",
    rotation: [
      "Charge/Intercept in, Hamstring to stick.",
      "Bloodthirst and Whirlwind on cooldown for pressure.",
      "Death Wish + Recklessness + trinket during a Freedom window or on a CC'd healer.",
      "Execute below 20%; Spell Reflect the key CC.",
      "Intervene to peel for your healer.",
    ],
    playstyle:
      "Commit your burst fully into a swap when the healer can't respond — Fury has no sustained healing-debuff pressure, so it's all about the kill window. Otherwise it plays like Arms: stick, reflect CC, and peel. Prefer Arms unless you specifically want the burst.",
    commonMistakes: [
      "Expecting to grind a healer down without Mortal Strike.",
      "Sending burst into a full-health healer.",
      "Skipping Spell Reflection against casters.",
    ],
    faq: [
      { question: "Fury or Arms for arena?", answer: "Arms — Mortal Strike's −50% healing is the reason arena Warriors are strong. Fury is a burst-focused niche pick." },
      { question: "Is Fury good in 2s?", answer: "It can spike targets fast with a healer enabling it, but the lack of a healing debuff caps its ceiling. Arms is the standard." },
    ],
  },

  // ─────────────────────────── Warrior / Fury / PvE
  {
    class: "warrior",
    spec: "fury",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Fury is the standard raid DPS Warrior in TBC — a dual-wielding, rage-hungry spec that posts top-tier melee numbers when it's fed rage and hit-capped. Bloodthirst, Whirlwind and a Heroic Strike rage dump form a fast, satisfying rotation that scales hard with gear.\n\nYour whole game is white-hit uptime and rage management: the more you swing, the more Bloodthirst and Heroic Strike you get, so hit and expertise matter enormously.",
    strengths: [
      "Top-tier sustained melee raid DPS",
      "Scales extremely well with gear and Bloodlust",
      "Strong cleave with Whirlwind + Cleave",
    ],
    weaknesses: [
      "Very hit/expertise dependent to hit hard",
      "Rage-starved on movement or low gear",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Keep Battle Shout up; stay in Berserker Stance.",
      "Bloodthirst on cooldown, then Whirlwind on cooldown.",
      "Dump excess rage into Heroic Strike (queue it) — never rage-cap.",
      "Execute below 20%; Whirlwind + Cleave on multi-target.",
      "Death Wish + Recklessness + trinkets aligned with Bloodlust.",
    ],
    playstyle:
      "Prioritize Bloodthirst > Whirlwind, and use Heroic Strike to bleed off excess rage without clipping swings. Reach the hit cap and stack expertise before pure AP — a missed or dodged special is huge lost rage and damage. Position behind the boss to avoid parries.",
    commonMistakes: [
      "Rage-capping instead of queuing Heroic Strike.",
      "Not hit/expertise capped, wasting rage on misses/dodges.",
      "Clipping white swings with mistimed specials.",
    ],
    bestProfessions: ["blacksmithing", "jewelcrafting"],
    faq: [
      { question: "Is Fury the best raid DPS Warrior?", answer: "Yes — dual-wield Fury is the standard TBC raid DPS Warrior spec. Arms is a utility pick for the Mortal Strike debuff." },
      { question: "How much hit does Fury need?", answer: "9% (142) for yellow specials, plus expertise to remove dodge; white dual-wield hit is a soft goal. See the caps below." },
    ],
  },

  // ─────────────────────────── Warrior / Protection / PvP
  {
    class: "warrior",
    spec: "protection",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Protection Warrior in PvP is a niche, utility-first build — think flag-carrying in battlegrounds and a tanky, disruptive body in the occasional arena setup. Intervene, Shield Wall, Spell Reflection and high armor make you incredibly hard to kill, but your damage is low, so you win through survivability and peels, not kills.\n\nMost arena Warriors play Arms; Prot is for BG objective play and specific utility comps.",
    strengths: [
      "Extremely durable — Shield Wall, high armor, Last Stand",
      "Great peels: Intervene, Shield Bash, Spell Reflection",
      "Excellent battleground flag carrier",
    ],
    weaknesses: [
      "Very low kill pressure",
      "Rarely optimal in rated arena",
    ],
    rotationTitle: "Disruption & survival",
    rotation: [
      "Intervene to peel for your healer or reach a caster.",
      "Shield Bash / Spell Reflection to shut down casters.",
      "Concussion Blow / Shockwave-style stuns to disrupt.",
      "Shield Wall + Last Stand to survive focus.",
      "Hamstring and body-block to control space.",
    ],
    playstyle:
      "You're a disruptor and a wall, not a damage dealer. Peel relentlessly for your healer, reflect and interrupt casters, and carry objectives in battlegrounds. In arena, only run Prot for a specific utility plan — Arms is the standard.",
    commonMistakes: [
      "Expecting to kill anything solo.",
      "Wasting Spell Reflection off cooldown instead of on the key CC.",
      "Playing Prot in rated arena where Arms is better.",
    ],
    faq: [
      { question: "Is Protection Warrior good in PvP?", answer: "For battleground flag carrying and niche utility, yes. For rated arena, Arms is the standard spec — Prot lacks kill pressure." },
      { question: "Why play Prot in PvP at all?", answer: "Survivability and disruption — Intervene, Spell Reflect, stuns, Shield Wall — plus being the best flag carrier in the game." },
    ],
  },

  // ─────────────────────────── Warrior / Protection / PvE
  {
    class: "warrior",
    spec: "protection",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Protection is the main-tank Warrior spec — the gold-standard tank of TBC. Shield Slam and Revenge drive high threat, Devastate stacks Sunder Armor, and your deep mitigation toolkit (Shield Block, Shield Wall, Last Stand, Spell Reflection) handles every raid tank job from Prince to Illidan.\n\nYour priorities in order: become uncrittable, build enough effective health to survive spikes, then add threat stats so your DPS can go all-out.",
    strengths: [
      "The premier raid tank — top threat and toolkit",
      "Spell Reflection and interrupts add unique utility",
      "Handles every TBC tank assignment",
    ],
    weaknesses: [
      "Gear-gated: must reach crit immunity and EH first",
      "Rage-dependent threat on low incoming damage",
    ],
    rotationTitle: "Threat rotation",
    rotation: [
      "Open with a Shield Slam + Revenge and get Sunder/Devastate stacks up.",
      "Shield Slam on cooldown (your top threat + Shield Block value).",
      "Revenge on proc; Devastate to fill and maintain Sunder Armor.",
      "Heroic Strike / Cleave to dump excess rage; Thunder Clap / Demo Shout for debuffs.",
      "Shield Block on cooldown for uncrushability; Shield Wall / Last Stand for spikes.",
    ],
    playstyle:
      "Get uncrittable (defense/resilience + talents) before you step into a raid, then stack stamina and armor for effective health, then hit/expertise for threat. Keep Shield Block up to avoid crushing blows, and pre-plan Shield Wall/Last Stand for known damage spikes. Face the boss away from the raid.",
    commonMistakes: [
      "Tanking before you're crit-immune.",
      "Chasing avoidance over stamina/armor (effective health) for progression.",
      "Letting Shield Block lapse and eating crushing blows.",
    ],
    bestProfessions: ["blacksmithing", "jewelcrafting"],
    faq: [
      { question: "Is Warrior the best tank in TBC?", answer: "Warriors are the premier raid tank for threat and toolkit; Druids and Paladins fill specific roles (AoE, off-tanking). Prot Warrior tanks every fight." },
      { question: "How do Warriors become uncrittable?", answer: "Through Defense/resilience and talents to remove the boss's crit chance — not a Defense 'cap' number but the effective crit-immunity threshold. See the caps below." },
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
