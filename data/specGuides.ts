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

  // ─────────────────────────── Mage / Arcane / PvP
  {
    class: "mage",
    spec: "arcane",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Arcane PvP is a burst-focused Mage build — Presence of Mind into a big instant Pyroblast or Arcane Blast can delete a target from range, and Arcane Power stacks a huge damage window. It's a glass-cannon alternative to Frost's control, giving up kiting and Ice Barrier uptime for raw damage.\n\nMost arena Mages play Frost for its survivability and Shatter control; Arcane is a niche burst pick that punishes teams which let you free-cast.",
    strengths: [
      "Enormous instant burst (Presence of Mind + Pyroblast)",
      "Arcane Power damage window",
      "Long range pressure",
    ],
    weaknesses: [
      "Far squishier and easier to train than Frost",
      "Weak kiting/control compared to Frost",
    ],
    rotationTitle: "Burst setup",
    rotation: [
      "Polymorph the off-target to isolate the kill.",
      "Counterspell the enemy healer's cast.",
      "Presence of Mind + Arcane Power + trinket → instant Pyroblast / Arcane Blast burst.",
      "Blink and Frost Nova (from talents/utility) to make space; Ice Block to reset.",
      "Follow up with Fireball/Arcane Blast while cooldowns recharge.",
    ],
    playstyle:
      "You live and die by your burst window — set it up with CC on the healer and commit Presence of Mind + Arcane Power together. Between windows you're fragile, so play safe, use Blink and Ice Block well, and don't get caught by melee. Prefer Frost unless your comp specifically wants Arcane's burst.",
    commonMistakes: [
      "Blowing Presence of Mind without CC on the healer.",
      "Playing it as aggressively positioned as Frost — Arcane is squishier.",
      "Wasting Ice Block early instead of saving the reset.",
    ],
    faq: [
      { question: "Arcane or Frost for arena?", answer: "Frost is the standard arena Mage for its control, kiting and Shatter burst. Arcane is a niche high-burst pick that's much squishier." },
      { question: "Is Arcane burst worth the fragility?", answer: "Only into teams that let you free-cast. Against melee pressure, Frost's survivability wins." },
    ],
  },

  // ─────────────────────────── Mage / Arcane / PvE
  {
    class: "mage",
    spec: "arcane",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Arcane is a strong raid Mage spec in TBC, built around a tight Arcane Blast rotation. It brings excellent single-target damage and, via Arcane Brilliance and its raid utility, solid group value — while being more mana-intensive than Fire, so it rewards good mana management and gear.\n\nFire is often the higher-parsing raid mage spec, but Arcane is very competitive and shines with strong spell-power gear and Bloodlust windows.",
    strengths: [
      "Excellent single-target raid DPS",
      "Simple, high-throughput Arcane Blast rotation",
      "Scales hard with spell power",
    ],
    weaknesses: [
      "Mana-hungry — punishes poor management/low gear",
      "Less mobile than Fire's Scorch weaving",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Reach the spell hit cap first (16%, less with talents/Draenei).",
      "Cast Arcane Blast, ramping its stacking buff, then reset as mana dictates.",
      "Use Arcane Missiles / Frostbolt filler to manage mana between Arcane Blast phases.",
      "Pop Arcane Power + trinkets + Icy Veins with Bloodlust.",
      "Use Evocation and a mana gem/potion to stay topped.",
    ],
    playstyle:
      "Manage the Arcane Blast stack against your mana pool — dumping stacks then resetting keeps DPS high without going oom. Line up Arcane Power and Icy Veins with Bloodlust, and plan Evocation windows. Hit-cap before stacking spell power.",
    commonMistakes: [
      "Going oom by holding Arcane Blast stacks too long.",
      "Not hit-capped, wasting casts on misses.",
      "Misaligning cooldowns with Bloodlust.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Arcane or Fire for raiding?", answer: "Both are strong; Fire often parses highest, but Arcane is very competitive single-target and simpler to execute. Frost is a PvP spec." },
      { question: "What's the caster spell hit cap?", answer: "16% (202 rating) for a boss, reduced by talents, Misery, or Draenei Heroic Presence. See the caps below." },
    ],
  },

  // ─────────────────────────── Mage / Fire / PvE
  {
    class: "mage",
    spec: "fire",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Fire is the premier raid DPS Mage spec in TBC on most fights — a crit-scaling powerhouse built on Fireball, Scorch-weaving to keep the Improved Scorch fire-vulnerability debuff up, and big Combustion + Bloodlust burst windows. As raid crit gear ramps, Fire pulls ahead of the pack.\n\nIt's mobile (instant Fire Blast/Scorch) and brings the raid-wide fire-damage debuff, making it both a top parser and a group-DPS enabler.",
    strengths: [
      "Top-tier single-target raid DPS as crit scales",
      "Improved Scorch debuff boosts the whole raid's fire damage",
      "Mobile — Scorch and Fire Blast on the move",
    ],
    weaknesses: [
      "Crit-dependent — weaker in early gear",
      "Must maintain the Scorch debuff (raid coordination)",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Reach the spell hit cap (16%, less with talents/Draenei/Misery).",
      "Keep 5 stacks of Improved Scorch up (assign Scorch duty in the raid).",
      "Spam Fireball as your main nuke; Fire Blast on the move.",
      "Combustion + trinkets + Icy Veins aligned with Bloodlust.",
      "Use a mana gem/Evocation to sustain.",
    ],
    playstyle:
      "Maintain the Scorch debuff (often one mage is assigned to it) and otherwise Fireball non-stop, refreshing Scorch as needed. Fire scales with crit, so stack hit-to-cap then crit heavily. Blow Combustion with Bloodlust for a massive burst window.",
    commonMistakes: [
      "Letting the Improved Scorch debuff drop.",
      "Stacking crit before reaching the hit cap.",
      "Wasting Combustion outside a Bloodlust/trinket window.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Is Fire the best raid Mage spec?", answer: "On most fights, yes — Fire is the top raid DPS Mage spec once crit gear ramps, and it brings the raid fire-damage debuff." },
      { question: "Fire or Arcane?", answer: "Fire usually parses highest with good crit; Arcane is a strong, simpler alternative. Both beat Frost for raiding." },
    ],
  },

  // ─────────────────────────── Mage / Frost / PvE
  {
    class: "mage",
    spec: "frost",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Frost is a niche raid spec in TBC — its damage trails Fire and Arcane, but it brings excellent mana efficiency, Water Elemental utility, and strong performance on fights with adds or where survivability matters. Most raiding mages go Fire or Arcane for single-target; Frost is situational.\n\nIf you bring it, you lean on Frostbolt, the Water Elemental, and Frost's efficiency rather than raw single-target ceiling.",
    strengths: [
      "Excellent mana efficiency",
      "Water Elemental adds sustained damage + utility",
      "Strong on add/AoE-friendly fights",
    ],
    weaknesses: [
      "Lower single-target ceiling than Fire/Arcane",
      "Rarely the optimal raid choice",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Reach the spell hit cap (16%, less with talents/Draenei).",
      "Summon the Water Elemental and keep it on the boss.",
      "Spam Frostbolt as your main nuke.",
      "Icy Veins + trinkets with Bloodlust; use the Elemental's Freeze on adds.",
      "Manage mana with a gem/Evocation (Frost is efficient by default).",
    ],
    playstyle:
      "Keep the Water Elemental active and Frostbolt on the boss. Frost's strength is efficiency and add control, not single-target ceiling — bring it for specific fights, otherwise raid Fire or Arcane. Hit-cap first as with any caster.",
    commonMistakes: [
      "Raiding Frost when Fire/Arcane would parse much higher.",
      "Forgetting to re-summon the Water Elemental.",
      "Ignoring the hit cap.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Should I raid as Frost Mage?", answer: "Usually no — Fire or Arcane parse higher for single target. Frost PvE is a niche efficiency/utility pick. Frost is, however, the best arena Mage spec." },
      { question: "Is Frost better for PvP or PvE?", answer: "PvP — Frost is the premier arena Mage. For raiding, Fire and Arcane are stronger." },
    ],
  },

  // ─────────────────────────── Paladin / Holy / PvP
  {
    class: "paladin",
    spec: "holy",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Holy Paladin is one of the strongest arena healers in TBC. A single, enormous Holy Light backed by Divine Favor and the right talents can top a raid-frame bar in one cast, and your Blessing of Freedom plus bubble make you very hard to lock down or kite. In the popular Retribution/Holy and melee-cleave comps, you are the anchor that outlasts the other healer.\n\nYour game is mana longevity and clutch cooldowns, not throughput variety. You have essentially one big heal, a Flash for topping, and a toolkit of Freedom, Sacrifice, bubble and Hand of Protection that decides whether your partner lives through a swap.",
    strengths: [
      "Huge single-target Holy Light throughput with Divine Favor",
      "Bubble (Divine Shield) is the best panic button in the game",
      "Freedom, Sacrifice and BoP counter slows, DoTs and swaps",
    ],
    weaknesses: [
      "No group heal and no real offensive pressure",
      "Vulnerable to mana burn, Spell Lock and long CC chains on the paladin",
    ],
    rotationTitle: "Healing & cooldown priority",
    rotation: [
      "Keep Blessing of Freedom on whoever is being trained; refresh before it drops.",
      "Cast Holy Light as your main heal; weave Flash of Light only for cheap top-offs.",
      "Divine Favor for a guaranteed-crit Holy Light when your partner is dropping fast.",
      "Hand of Protection / Sacrifice to break a swap or clear a Kidney/Cheap Shot's damage.",
      "Bubble to reset a losing position, then drink or re-position; trinket to break a stun before you die.",
    ],
    playstyle:
      "You win by not dying and not running dry. Pre-Freedom your kill target against melee, LoS casters to bait interrupts, and hold Divine Shield until it genuinely saves the game. Bait the enemy's interrupt with a Flash, then land the real Holy Light. Against caster cleaves, juke Spell Lock/Counterspell before every big cast.",
    commonMistakes: [
      "Bubbling too late (after your partner is already dead).",
      "Facetanking casters instead of using pillars to LoS their interrupts.",
      "Spamming Flash of Light and going out of mana in a long game.",
    ],
    faq: [
      { question: "Is Holy the best Paladin arena spec?", answer: "Yes — Holy is the go-to arena Paladin. Retribution is playable in specific melee comps, but Holy's healing and utility make it far more common." },
      { question: "What comps does Holy Paladin fit?", answer: "Any melee cleave — Ret/Holy, Warrior/Holy, Rogue/Holy — where Freedom and a huge single-target heal keep the pressure partner alive. See the arena comps below." },
      { question: "How do I not get mana-burned out?", answer: "LoS Priests, spread from the Warlock's Felhunter, and don't panic-Flash. Bank Divine Shield to break a burn/CC chain." },
    ],
  },

  // ─────────────────────────── Paladin / Holy / PvE
  {
    class: "paladin",
    spec: "holy",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Holy Paladin is a premier single-target raid healer in TBC. Blessing of Light plus a spammable Holy Light makes you the best tank healer in the game, and Beacon-style throughput isn't needed when your raw Holy Light output is this high. You also carry raid-wide value through Blessings (Kings, Wisdom, Might) and Judgement of Wisdom/Light for mana and healing return.\n\nYour role is narrow but elite: glue a Holy Light to the main tank, manage mana through Illumination and Judgement of Wisdom, and keep your assigned Blessings up on the raid.",
    strengths: [
      "Best-in-slot tank healer — enormous, efficient Holy Light",
      "Raid-wide utility through Blessings and Judgements",
      "Illumination makes crit-heavy healing very mana-efficient",
    ],
    weaknesses: [
      "Poor at raid/AoE healing — single-target focused",
      "Reliant on crit and Judgement of Wisdom for mana",
    ],
    rotationTitle: "Healing priority",
    rotation: [
      "Assign to the main tank; keep a rank-appropriate Holy Light rolling.",
      "Keep Blessing of Light on the tank and your assigned Blessings (Kings/Wisdom/Might) on the raid.",
      "Have a melee keep Judgement of Wisdom up so you regen mana while healing.",
      "Use Divine Favor + Holy Light for a guaranteed clutch crit on a spike.",
      "Downrank Holy Light on lighter damage to save mana; Flash of Light only for fast top-offs.",
    ],
    playstyle:
      "Holy Paladin healing is about efficiency, not variety: crit + Illumination refunds most of your mana, so gear crit and keep Judgement of Wisdom on the boss. Stick to the tank, trust the other healers for raid damage, and pop Divine Illumination + a trinket during heavy phases. Manage Blessing assignments before the pull.",
    commonMistakes: [
      "Trying to raid-heal — that's the Priest/Shaman/Druid's job.",
      "Healing without Judgement of Wisdom up and going oom.",
      "Always casting max-rank Holy Light instead of downranking on light damage.",
    ],
    bestProfessions: ["jewelcrafting", "tailoring"],
    faq: [
      { question: "What makes Holy Paladin the best tank healer?", answer: "A huge, spammable Holy Light plus Blessing of Light and Illumination mana returns let you out-heal any single target more efficiently than other healers." },
      { question: "What's the stat priority?", answer: "Intellect and spell crit (for Illumination) with enough mp5, then healing power. See the stat caps below." },
    ],
  },

  // ─────────────────────────── Paladin / Retribution / PvP
  {
    class: "paladin",
    spec: "retribution",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Retribution Paladin is a burst-melee spec built around one thing: a Repentance into a Hammer of Justice stun, then a Crusader Strike + Judgement + Seal of Command burst that can delete a target. Paired with a Holy Paladin, Ret/Holy is a durable, high-pressure cleave that grinds teams down while being extremely hard to kill (bubble, plate, Blessings).\n\nYour damage is bursty and cooldown-gated rather than sustained, so you play for the kill window: land the stun, blow cooldowns and trinkets, and try to global a target before their healer reacts.",
    strengths: [
      "Big cooldown burst inside a Hammer of Justice stun",
      "Plate + bubble + Blessings make it one of the tankiest DPS in arena",
      "Repentance, Hammer of Justice and Freedom bring control and anti-kite",
    ],
    weaknesses: [
      "Low sustained damage outside of cooldowns",
      "Mana-dependent and easy to kite once cooldowns are down",
    ],
    rotationTitle: "Burst setup",
    rotation: [
      "Repentance the healer (or off-target) to open the kill window.",
      "Hammer of Justice the kill target, then Crusader Strike + Judgement of the Crusader/Command.",
      "Pop Avenging Wrath + trinket for the burst, with Seal of Command up for the extra hits.",
      "Blessing of Freedom to stay on a kiting target; Cleanse yourself of slows/roots.",
      "Divine Shield to survive a swap, then Hand of Protection your partner or bubble-cancel to keep pressure.",
    ],
    playstyle:
      "Play around Avenging Wrath and the stun. You are a setup class: CC the healer, stun the kill target, and dump every cooldown into the window. Between bursts, keep Seal/Judgement pressure and Freedom yourself against kiters. Never waste bubble on chip damage — it's your only escape and your best offensive reset.",
    commonMistakes: [
      "Bursting without a stun or with the healer free to react.",
      "Blowing Avenging Wrath off cooldown instead of syncing it to a kill attempt.",
      "Getting kited to death because you forgot to Freedom yourself.",
    ],
    faq: [
      { question: "Is Retribution viable in TBC arena?", answer: "Yes, in the right comp. Ret/Holy and Ret + melee cleaves are durable and hit hard in a stun; it's less flexible than a Rogue or Warrior but very tanky." },
      { question: "What race is best for Ret PvP?", answer: "Blood Elf (Arcane Torrent silence) on Horde and Human (racials + Every Man for Himself-style trinket use of the PvP trinket) on Alliance — see the best-race guide." },
    ],
  },

  // ─────────────────────────── Paladin / Retribution / PvE
  {
    class: "paladin",
    spec: "retribution",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Retribution Paladin in raids is a hybrid melee DPS whose real value is buff/debuff support: Improved Blessing of Might, Judgement of Wisdom for the raid's mana, Judgement of the Crusader for melee, and Sanctity Aura all boost the group around you. Your personal DPS is middling but your presence lifts the whole melee camp.\n\nYou play a simple seal-twist-adjacent rotation and, above all, keep your Judgements and Blessings maintained on the boss and raid.",
    strengths: [
      "Strong raid support — Blessings, Judgements, Sanctity Aura",
      "Provides mana (Judgement of Wisdom) for the whole raid",
      "Simple, forgiving rotation",
    ],
    weaknesses: [
      "Below-average personal DPS versus pure melee",
      "Brings buff value more than parse value",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Keep Judgement of Wisdom (or Crusader, as assigned) up on the boss at all times.",
      "Seal of Command or Blood; Crusader Strike and Judgement on cooldown.",
      "Maintain Improved Blessing of Might on the melee and your assigned Blessings.",
      "Auto-attack fills the gaps — align damage cooldowns with Bloodlust.",
      "Hit the melee hit cap so your Judgements and Crusader Strikes land.",
    ],
    playstyle:
      "Think of yourself as a walking buff kit with a weapon. Your Judgements and Blessings are worth more than your personal damage, so never let Judgement of Wisdom fall off and keep your Blessing assignments correct. Reach the hit/expertise your Judgements need, then stack Strength and Agility.",
    commonMistakes: [
      "Letting Judgement of Wisdom drop and starving the raid of mana.",
      "Missing Judgements because you're under the hit cap.",
      "Wrong Blessing assignments — coordinate with the other Paladins.",
    ],
    bestProfessions: ["jewelcrafting", "blacksmithing"],
    faq: [
      { question: "Is Ret Paladin good in PvE?", answer: "It's a support-DPS: personal damage is modest, but Judgement of Wisdom, Blessings and Sanctity Aura make the melee group stronger. Brought for utility more than parse." },
      { question: "What's the hit cap for Ret?", answer: "Reach the melee/spell hit your Judgements and Crusader Strike need before stacking Strength/Agility — see the stat caps below." },
    ],
  },

  // ─────────────────────────── Paladin / Protection / PvE
  {
    class: "paladin",
    spec: "protection",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Protection Paladin is the king of AoE tanking in TBC. Consecration, Holy Shield and a Righteous Fury-boosted holy threat aura let you hold threat on many mobs at once — no Warrior or Druid comes close on trash and add-heavy pulls. You also sustain your own mana through Spiritual Attunement (which refunds mana to you whenever you're healed) and Improved Blessing of Sanctuary, easing the strain on your healers, and bring the full Blessing/Aura kit.\n\nYou play a Consecration + Holy Shield + Judgement threat rotation, keeping Righteous Fury up and managing mana (which is your resource) rather than Rage.",
    strengths: [
      "Best AoE threat in the game — multi-target tanking on trash and adds",
      "Self-sustains mana when healed (Spiritual Attunement) and brings Blessings/Auras",
      "Very smooth, mana-fueled threat rotation",
    ],
    weaknesses: [
      "Single-target threat below a Warrior's on some fights",
      "No taunt-adjacent tricks Warriors have; mana-dependent under pressure",
    ],
    rotationTitle: "Threat rotation",
    rotation: [
      "Keep Righteous Fury up; pull with Avenger's Shield onto the pack.",
      "Consecration down and Holy Shield up on cooldown for AoE threat + block.",
      "Judgement (Righteousness) and Seal of Righteousness/Vengeance for threat.",
      "Reach the crit-immunity/defense cap and block values for uncrushability.",
      "Manage mana (your threat resource); use Divine Plea/pots on long fights.",
    ],
    playstyle:
      "Prot Paladin tanking is about AoE threat and uptime: Consecration and Holy Shield rolling, Righteous Fury always on, and Judgement/Seal cycling. Reach crit immunity and enough defense/block to be uncrushable first, then stack stamina and threat stats. Watch mana — it's your Rage — and lean on Spiritual Attunement to sustain it while taking hits.",
    commonMistakes: [
      "Tanking before hitting crit immunity / uncrushable (lethal spike risk).",
      "Letting Consecration or Holy Shield lapse and losing AoE threat.",
      "Running out of mana and dropping threat on long fights.",
    ],
    bestProfessions: ["jewelcrafting", "blacksmithing"],
    faq: [
      { question: "Are Protection Paladins good tanks?", answer: "They're the best AoE/multi-target tanks in TBC and return mana to healers. Warriors still edge them on some single-target fights, but for trash and add-heavy bosses, Prot Paladin is unmatched." },
      { question: "What's the first gearing goal?", answer: "Crit immunity plus enough defense/block to be uncrushable, then stamina and threat. See the stat caps below." },
    ],
  },

  // ─────────────────────────── Hunter / Beast Mastery / PvP
  {
    class: "hunter",
    spec: "beast-mastery",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Beast Mastery is the standard arena Hunter spec. The Beast Within (and Bestial Wrath) makes your pet immune to CC and hit like a truck for a window, giving you a second, uncontrollable source of pressure that a healer can't peel. Between that and your own ranged burst — Aimed Shot, Arcane Shot, and a trap-and-kite game — BM Hunters are a slippery, high-damage class in 2s and 3s.\n\nYour strength is disengaging: Freezing Trap, Scatter Shot, Wing Clip and the raw range let you reset fights, protect your healer, and force the enemy to fight on your terms.",
    strengths: [
      "Bestial Wrath gives an unpeelable, CC-immune pet burst window",
      "Trap + Scatter + kiting is elite disengage and CC",
      "Strong ranged uptime with Steady/Arcane/Aimed Shot",
    ],
    weaknesses: [
      "Dead zone and melee range weakness if trained by a fast melee",
      "Pet can be killed or LoS'd, cutting a big chunk of your pressure",
    ],
    rotationTitle: "Burst & control",
    rotation: [
      "Send the pet + Bestial Wrath (The Beast Within) for the unpeelable burst window.",
      "Aimed Shot → Arcane Shot burst on the kill target inside the pet's window.",
      "Freezing Trap the healer or off-target; Scatter Shot to chain CC or peel a melee off you.",
      "Wing Clip / Concussive Shot and disengage to keep range; never sit in the dead zone.",
      "Deterrence or trinket + trap to reset when trained; Feign Death to drop a cast or reset threat/CC.",
    ],
    playstyle:
      "Create distance and dictate range. Use pillars and traps to reset, then burst with Bestial Wrath when the enemy healer is CC'd or out of position. Protect your pet — it's half your damage — and keep the healer trapped during your kill attempts. Against melee, kite with Wing Clip, Scatter, and Frost Trap rather than trading in the dead zone.",
    commonMistakes: [
      "Bursting into a free healer instead of trapping them first.",
      "Letting the enemy sit in your dead zone (5–8 yards) where you can't shoot.",
      "Losing the pet to cleave or LoS and keeping only half your damage.",
    ],
    faq: [
      { question: "Is Beast Mastery the best Hunter arena spec?", answer: "Yes — Bestial Wrath's CC-immune pet burst and BM's survivability make it the standard arena build over Marksmanship and Survival." },
      { question: "How do I deal with being trained by melee?", answer: "Kite with Frost Trap, Wing Clip, Scatter Shot and disengage around pillars; use Deterrence and the PvP trinket to buy trap resets. Don't fight in the dead zone." },
    ],
  },

  // ─────────────────────────── Hunter / Beast Mastery / PvE
  {
    class: "hunter",
    spec: "beast-mastery",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Beast Mastery is a top raid DPS spec in early TBC. Your pet contributes a large, scaling share of your damage (Ferocious Inspiration also buffs the raid by 3%), and a well-fed exotic pet plus Bestial Wrath windows push BM to the front of the meter on Phase 1–2 content. The rotation is a smooth Steady Shot weave that's easy to sustain for a full fight.\n\nYou live and die by pet uptime and the hit cap: keep the pet alive and attacking, hit-cap yourself, and manage your shot weave without clipping.",
    strengths: [
      "High personal DPS with strong pet scaling in early TBC",
      "Ferocious Inspiration buffs the whole raid's damage",
      "Smooth, sustainable Steady Shot weave",
    ],
    weaknesses: [
      "Pet death or fire/cleave fights hurt a large chunk of your damage",
      "Falls off relative to Survival/MM later as gear scales",
    ],
    rotationTitle: "Shot priority",
    rotation: [
      "Hunter's Mark + keep the pet on the boss with Bestial Wrath on cooldown.",
      "Serpent Sting up, then Steady Shot weaved between auto-shots without clipping.",
      "Arcane Shot on cooldown if mana allows; Kill Command after you land a crit (it's off the GCD).",
      "Reach the ranged hit cap (9%, less with talents/Draenei) before other stats.",
      "Misdirection to the tank on pull; align Bestial Wrath + Rapid Fire with Bloodlust.",
    ],
    playstyle:
      "The whole game is a clean Steady Shot weave and pet uptime. Cap hit first, keep Serpent Sting and Hunter's Mark rolling, and fire Kill Command on cooldown after any of your own critical strikes (it's off the GCD). Position the pet to survive cleaves, and sync Rapid Fire + Bestial Wrath + trinkets with Bloodlust for the big burst window.",
    commonMistakes: [
      "Clipping auto-shots by firing Steady Shot too early.",
      "Not hit-capped, causing missed shots and lost Kill Commands.",
      "Letting the pet die or stand in avoidable damage.",
    ],
    bestProfessions: ["engineering", "leatherworking"],
    faq: [
      { question: "Is BM or Survival better for raiding?", answer: "BM is excellent in early TBC (Phase 1–2); Survival scales better with gear and group crit later. Both are viable — BM is the simpler, front-loaded pick." },
      { question: "What's the ranged hit cap?", answer: "9% (142 hit rating), reduced by talents and the Draenei racial. See the stat caps below." },
    ],
  },

  // ─────────────────────────── Hunter / Marksmanship / PvP
  {
    class: "hunter",
    spec: "marksmanship",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Marksmanship is the burst-focused arena alternative to BM. Aimed Shot's big up-front hit plus Silencing Shot (a 3-second lockout on a caster) give MM a strong kill-and-interrupt game, and Scatter Shot into Aimed Shot can burst a target very quickly. It trades BM's unpeelable pet burst and survivability for higher, more controllable ranged damage.\n\nYou play as a caster-hunter: land Silencing Shot on the enemy healer, set up with Scatter/Trap, and unload Aimed + Arcane in the opening.",
    strengths: [
      "Silencing Shot locks out a caster for 3s — a real interrupt",
      "High controllable burst via Aimed Shot",
      "Strong against caster comps you can silence and trap",
    ],
    weaknesses: [
      "Less survivable than BM; weaker sustained pressure",
      "Very reliant on landing setups (Scatter → Aimed, Silence on cast)",
    ],
    rotationTitle: "Burst & interrupt",
    rotation: [
      "Silencing Shot the healer as they cast to open a kill window.",
      "Scatter Shot the kill target → Aimed Shot → Arcane Shot burst.",
      "Freezing Trap the off-target or re-trap the healer between casts.",
      "Kite with Wing Clip / Concussive / Frost Trap; keep out of the dead zone.",
      "Deterrence + trinket + trap to reset when trained.",
    ],
    playstyle:
      "MM is a timing spec — your damage comes in setup windows, so save Silencing Shot for the healer's important cast and chain your CC to keep them off the field. Kite melee the same as BM, but respect that you're squishier; use range and pillars religiously.",
    commonMistakes: [
      "Wasting Silencing Shot on cooldown instead of on a key heal.",
      "Aimed Shot with no Scatter/Trap setup — it just gets healed.",
      "Playing MM into a comp that trains you when BM would survive better.",
    ],
    faq: [
      { question: "MM or BM for arena?", answer: "BM is the standard for survivability and pet burst; MM is a burst/interrupt pick that shines against caster comps you can Silencing-Shot. Most Hunters play BM." },
      { question: "How useful is Silencing Shot?", answer: "Very — a 3-second caster lockout on a 20-second cooldown is real interrupt utility that BM lacks." },
    ],
  },

  // ─────────────────────────── Hunter / Marksmanship / PvE
  {
    class: "hunter",
    spec: "marksmanship",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Marksmanship is a strong raid spec whose real strength is Trueshot Aura — a raid-wide attack-power buff — on top of solid personal ranged DPS. The rotation centers on Aimed Shot and a Steady Shot weave, and MM scales well without leaning as hard on the pet as BM does, making it reliable on cleave and movement fights.\n\nBring MM for Trueshot Aura and consistent damage; the playstyle is a disciplined shot weave built around not clipping.",
    strengths: [
      "Trueshot Aura buffs the whole raid's attack power",
      "Reliable personal DPS that isn't pet-dependent",
      "Good on movement/cleave fights",
    ],
    weaknesses: [
      "Tighter shot weaving — clipping is punishing",
      "Mana-hungry without good gear/regen",
    ],
    rotationTitle: "Shot priority",
    rotation: [
      "Hunter's Mark + Trueshot Aura up; Serpent Sting on the boss.",
      "Aimed Shot on cooldown, Steady Shot weaved cleanly between autos.",
      "Arcane Shot as a filler when mana allows.",
      "Cap ranged hit (9%, less with talents/Draenei) before stacking Agility/AP.",
      "Misdirection on pull; sync Rapid Fire + trinkets with Bloodlust.",
    ],
    playstyle:
      "MM is a metronome: Aimed on cooldown, Steady between autos, never clip. Keep Serpent Sting and Hunter's Mark up, watch mana (Aspect swaps, Viper if needed), and provide Trueshot Aura for the raid. Line up Rapid Fire and trinkets with Bloodlust for peak burst.",
    commonMistakes: [
      "Clipping auto-shots with a mistimed Steady Shot.",
      "Forgetting Trueshot Aura — a big raid buff you uniquely provide.",
      "Going oom from over-using Arcane Shot without regen.",
    ],
    bestProfessions: ["engineering", "leatherworking"],
    faq: [
      { question: "Why bring Marksmanship?", answer: "Trueshot Aura (raid AP buff) plus reliable, pet-independent DPS. It's a strong all-rounder that shines on cleave and movement fights." },
      { question: "Is MM hard to play well?", answer: "The shot weave is less forgiving than BM's — clipping auto-shots is the main skill check. Get a shot-timing addon and practice the rhythm." },
    ],
  },

  // ─────────────────────────── Hunter / Survival / PvP
  {
    class: "hunter",
    spec: "survival",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Survival is a control-and-utility arena spec. Its talents lean into trapping (Improved Wing Clip, Entrapment, Deterrence, Readiness for a second set of cooldowns) and Expose Weakness-style scaling, giving you a lockdown game more than a burst game. Readiness resetting your traps, Rapid Fire and Deterrence is the signature Survival tool.\n\nYou win by kiting and CC: chain traps and slows, protect your healer, and grind the enemy down while never letting a melee stick to you.",
    strengths: [
      "Readiness resets traps and cooldowns for double disengage/CC",
      "Best kiting and lockdown toolkit of the three specs",
      "Strong utility scaling (Expose Weakness) in a cleave",
    ],
    weaknesses: [
      "Lower raw burst than BM/MM",
      "Relies on landing traps and staying at range to shine",
    ],
    rotationTitle: "Control & kite",
    rotation: [
      "Open with a Freezing Trap on the healer; keep Serpent Sting and Wing Clip pressure.",
      "Scatter Shot → re-trap or burst with Aimed/Arcane on the kill target.",
      "Kite melee with Frost Trap, Wing Clip and Concussive; use the dead zone in reverse.",
      "Readiness to reset traps + Rapid Fire + Deterrence for a second full setup.",
      "Deterrence + trinket + trap to peel when trained.",
    ],
    playstyle:
      "Survival is the disengage master. Use Readiness to double up on traps and Deterrence, chain CC the healer, and slow-kite the melee to death. Your damage is steadier and lower than BM/MM, so the game is about control and outlasting rather than a single burst kill.",
    commonMistakes: [
      "Using Readiness for damage instead of banking it for a trap/Deterrence reset.",
      "Standing still to DPS and letting a melee close the gap.",
      "Wasting traps on cooldown instead of on the healer during a kill attempt.",
    ],
    faq: [
      { question: "Is Survival good in arena?", answer: "It's a control/utility pick rather than a burst spec. BM is the default, but Survival's Readiness + trapping lockdown is strong in kite-heavy comps." },
      { question: "What does Readiness do for me?", answer: "Instantly resets your trap, Rapid Fire, Deterrence and disengage cooldowns — effectively a second full setup in one fight." },
    ],
  },

  // ─────────────────────────── Hunter / Survival / PvE
  {
    class: "hunter",
    spec: "survival",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Survival is the scaling raid spec: Expose Weakness converts your Agility into raid-wide attack power for everyone hitting the target, and the spec's crit/hit talents make it stronger the better your gear (and your group's crit) gets. Later in TBC, Survival often overtakes BM for well-geared Hunters and brings big value to a physical-damage group.\n\nThe rotation is a Steady Shot weave much like MM, but your talents reward crit and group synergy over pet damage.",
    strengths: [
      "Expose Weakness gives the physical group a large AP boost",
      "Scales up with gear and group crit — strong late-TBC",
      "Provides raid utility (traps, Misdirection) alongside DPS",
    ],
    weaknesses: [
      "Weaker in early TBC / low gear than BM",
      "Benefits most in a stacked physical-DPS group",
    ],
    rotationTitle: "Shot priority",
    rotation: [
      "Hunter's Mark + Serpent Sting up; keep the pet on the boss.",
      "Steady Shot weaved between auto-shots without clipping; Arcane Shot as filler.",
      "Maintain uptime so Expose Weakness stays procced for the group.",
      "Cap ranged hit (9%, less with talents/Draenei), then stack Agility for Expose Weakness.",
      "Misdirection on pull; align Rapid Fire + trinkets with Bloodlust.",
    ],
    playstyle:
      "Survival rewards consistency and Agility: keep your shot weave clean so Expose Weakness stays up for the melee group, and stack Agility hard once hit-capped. Place it in a physical-DPS group to maximize the Expose Weakness value. Same no-clip discipline as MM.",
    commonMistakes: [
      "Playing Survival at low gear where BM would out-parse it.",
      "Clipping auto-shots and dropping Expose Weakness uptime.",
      "Stacking the wrong stats — Agility is king for Survival.",
    ],
    bestProfessions: ["engineering", "leatherworking"],
    faq: [
      { question: "When should I go Survival over BM?", answer: "As your gear improves and in a stacked physical-DPS group — Expose Weakness and Survival's crit scaling overtake BM later in TBC." },
      { question: "What stat matters most for Survival?", answer: "Agility, after the hit cap — it drives both your crit and the Expose Weakness AP the whole group gets. See the stat caps below." },
    ],
  },

  // ─────────────────────────── Priest / Discipline / PvP
  {
    class: "priest",
    spec: "discipline",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Discipline is the premier arena healer Priest spec. Pain Suppression (a strong damage-reduction cooldown) plus Power Infusion, a huge shield, and instant Flash Heals let a Disc Priest keep a pressured partner alive through burst that would kill any other healer. In double-DPS and caster cleaves, the Disc Priest is the glue.\n\nYour toolkit is proactive: shield before the swap, dispel the DoT/root that matters, and use Fear/Psychic Scream to buy time. Mana efficiency and juking interrupts are the skills that decide long games.",
    strengths: [
      "Pain Suppression + shields survive burst no other healer can",
      "Power Infusion is a huge offensive cooldown for your partner",
      "Mass Dispel, Fear and Mana Burn bring real utility",
    ],
    weaknesses: [
      "Squishy when focused and out of cooldowns; no self-Freedom vs slows",
      "Interrupt- and mana-burn-vulnerable if you don't juke",
    ],
    rotationTitle: "Healing & cooldown priority",
    rotation: [
      "Pre-shield (Power Word: Shield) the target being trained; keep Weakened Soul in mind.",
      "Instant Flash Heal topping; Greater Heal only when safe from interrupt.",
      "Pain Suppression on your partner (or self) to survive a burst swap.",
      "Fear / Psychic Scream to peel melee; Mass Dispel key magic (Ice Block, DoTs, HoTs).",
      "Power Infusion your DPS for a kill window; trinket + Fear Ward against Fear chains.",
    ],
    playstyle:
      "Play proactively — shield and pre-heal before the damage lands, and bank Pain Suppression for the real swap. Juke interrupts with a fake cast, LoS casters, and don't let a Warlock/Priest mana-burn you dry. Power Infusion is both a throughput and offensive tool: use it to force a kill when the enemy healer is CC'd.",
    commonMistakes: [
      "Holding Pain Suppression too long and losing the partner.",
      "Casting into an obvious interrupt instead of juking first.",
      "Forgetting Fear Ward / trinket against Fear-heavy comps.",
    ],
    faq: [
      { question: "Is Discipline the best PvP Priest spec?", answer: "Yes — Pain Suppression, shields and Power Infusion make Disc the standard arena healing Priest over Holy or Shadow." },
      { question: "How do I avoid getting mana-burned out?", answer: "LoS the burner, spread from Felhunters, don't over-cast, and use Dispersion-style patience — bank cooldowns to survive the burn window." },
    ],
  },

  // ─────────────────────────── Priest / Discipline / PvE
  {
    class: "priest",
    spec: "discipline",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Discipline is a raid-support healer whose signature is Power Infusion — a +20% haste/reduced-mana cooldown you hand to your best caster — and strong, efficient shielding. Disc doesn't top the healing meters like a CoH Priest, but its damage prevention (shields), Pain Suppression on the tank, and Power Infusion value make it a coveted raid slot.\n\nYou play a mix of proactive shielding and single-target topping, and you manage your Power Infusion target and Pain Suppression cooldown as raid tools.",
    strengths: [
      "Power Infusion boosts your top caster/healer's output",
      "Shields prevent damage rather than react to it (efficient)",
      "Pain Suppression is a raid-saving tank cooldown",
    ],
    weaknesses: [
      "Lower raw HPS than Holy (CoH) Priests",
      "Shield-based healing 'loses' to overhealing meters",
    ],
    rotationTitle: "Healing priority",
    rotation: [
      "Keep Power Word: Shield on the tank/incoming-damage targets; mind Weakened Soul.",
      "Renew + Flash Heal for single-target topping; Greater Heal for big tank damage.",
      "Power Infusion your assigned caster/healer on cooldown (or a burn phase).",
      "Pain Suppression the tank through a big hit; Prayer of Mending rolling.",
      "Manage mana with Shadowfiend and Judgement-of-Wisdom-style regen from the group.",
    ],
    playstyle:
      "Disc is proactive: shield before damage, keep Prayer of Mending bouncing, and top with Flash/Greater Heal. Your unique levers are Power Infusion (give it to the highest-value target) and Pain Suppression (bank it for the tank's scary hits). Use Shadowfiend on cooldown to stay topped on mana.",
    commonMistakes: [
      "Not using Power Infusion on cooldown — it's free raid DPS/HPS.",
      "Letting Weakened Soul block a shield when the tank needs it.",
      "Judging yourself on meters — Disc prevents damage that never shows up as healing.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Disc or Holy for raiding?", answer: "Holy (Circle of Healing) posts higher raw HPS; Disc brings Power Infusion, efficient shields and Pain Suppression. Many raids want one of each." },
      { question: "Who should get Power Infusion?", answer: "Your highest-output caster during a burn phase, or a healer during heavy damage. Coordinate the target before the pull." },
    ],
  },

  // ─────────────────────────── Priest / Holy / PvP
  {
    class: "priest",
    spec: "holy",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Holy is the off-meta PvP Priest spec — most arena Priests go Discipline for Pain Suppression, but Holy brings raw throughput and Spirit-based survivability through talents like Spirit of Redemption and Holy Concentration. In battlegrounds and some sustained-pressure comps, Holy's healing output and Guardian Spirit-style topping shine, but it lacks Disc's panic-button damage reduction.\n\nYou play a high-output topping game and lean on Fear, Dispel and positioning to survive rather than a hard cooldown.",
    strengths: [
      "Highest raw single-target healing output of the Priest specs",
      "Holy Concentration mana efficiency during heavy healing",
      "Strong in battlegrounds and sustained-pressure fights",
    ],
    weaknesses: [
      "No Pain Suppression — worse at surviving burst swaps than Disc",
      "Squishy when focused; relies on Fear and LoS to live",
    ],
    rotationTitle: "Healing & control",
    rotation: [
      "Keep the trained partner topped with instant Flash Heal; Renew rolling.",
      "Greater Heal only when safe from interrupt; juke casts against melee.",
      "Fear / Psychic Scream to peel; Mass Dispel key magic (Ice Block, DoTs).",
      "Prayer of Mending pre-cast before the swap for free reactive healing.",
      "Trinket + Fear Ward vs Fear chains; LoS casters to bait interrupts.",
    ],
    playstyle:
      "Without Pain Suppression, Holy survives through output and positioning — pre-heal, LoS, and Fear the melee before you get low. Your throughput is higher than Disc's, so you can out-heal sustained pressure, but you must respect burst by keeping Fear and trinket ready and never getting caught mid-cast.",
    commonMistakes: [
      "Playing Holy into a hard-swap comp where Disc's Pain Suppression is needed.",
      "Getting caught casting Greater Heal into a stun/interrupt.",
      "Wasting Fear early instead of saving it for the kill attempt on you.",
    ],
    faq: [
      { question: "Should I PvP as Holy Priest?", answer: "Discipline is the arena standard for Pain Suppression. Holy is a throughput pick that's fine in battlegrounds and sustained comps but weaker against hard swaps." },
      { question: "How does Holy survive without Pain Suppression?", answer: "Higher raw healing, Fear/Psychic Scream peels, LoS and pre-healing. You prevent deaths with output and positioning rather than a damage-reduction button." },
    ],
  },

  // ─────────────────────────── Priest / Shadow / PvP
  {
    class: "priest",
    spec: "shadow",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Shadow Priest is a pressure-and-utility DPS in arena. Vampiric Touch returns mana to your whole party (huge in a caster comp), Vampiric Embrace heals the team from your damage, and Silence + Psychic Scream + Dispersion give you control and survivability. You rarely land a clean solo kill, but your constant DoT pressure and mana battery make comps like Shadow/Ele or RMP-style caster cleaves tick.\n\nYou spread DoTs, dispel-protect them with sheer volume, and use Silence/Fear/Mana Burn to swing the game while feeding your team mana.",
    strengths: [
      "Vampiric Touch mana return + Vampiric Embrace healing sustain the team",
      "Silence, Psychic Scream, Mana Burn and Dispersion bring strong control/survivability",
      "Constant DoT pressure forces enemy healing",
    ],
    weaknesses: [
      "Low burst — struggles to secure kills without a partner's help",
      "DoTs are dispellable; squishy if trained without Dispersion up",
    ],
    rotationTitle: "Pressure & control",
    rotation: [
      "Apply Shadow Word: Pain, Vampiric Touch and Devouring Plague across targets for pressure + mana.",
      "Mind Blast + Mind Flay on the kill target; Silence their healer's cast.",
      "Psychic Scream to peel melee; Mana Burn a healer low on mana.",
      "Dispersion to survive a train and refill mana; trinket the hard CC.",
      "Vampiric Embrace up so your damage heals the team during the grind.",
    ],
    playstyle:
      "You are a mana battery and pressure engine, not an assassin. Keep DoTs on everything, Silence key heals, and feed your team mana with Vampiric Touch. Use Dispersion proactively when trained — it's your reset button. Coordinate kills with your partner's burst rather than trying to solo a target.",
    commonMistakes: [
      "Saving Dispersion until you're already dead instead of pre-empting the train.",
      "Letting DoTs fall off and losing both pressure and party mana.",
      "Wasting Silence on cooldown instead of on the healer's key cast.",
    ],
    faq: [
      { question: "Can Shadow Priest carry a 2s?", answer: "It's better in 3s/5s as a pressure + mana battery. Low burst makes solo kills hard, but DoT pressure and utility are strong in coordinated comps." },
      { question: "Why is Shadow Priest wanted in caster comps?", answer: "Vampiric Touch refunds mana to the whole party and Vampiric Embrace heals from your damage — it keeps a caster cleave's resources up all game." },
    ],
  },

  // ─────────────────────────── Priest / Shadow / PvE
  {
    class: "priest",
    spec: "shadow",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Shadow Priest is a raid-defining support-DPS in TBC. Vampiric Touch returns mana to the whole caster group (replenishing your Mages and Warlocks), and Misery adds a spell-hit/damage debuff to the boss. Your personal DPS is respectable, but you're brought first and foremost for the mana battery and Misery — a well-played Shadow Priest lets an entire caster camp go all-out.\n\nThe rotation is a strict DoT-and-filler priority: keep everything ticking, hit-cap with Shadow Weaving/Misery in mind, and never clip your DoTs.",
    strengths: [
      "Vampiric Touch fuels the caster group's mana (irreplaceable)",
      "Misery adds spell hit/damage for the whole raid on the boss",
      "Solid, steady personal DPS on top of the utility",
    ],
    weaknesses: [
      "Brought for utility more than top personal parse",
      "Punished by movement — dropped DoTs cost damage and mana return",
    ],
    rotationTitle: "DoT priority",
    rotation: [
      "Open Vampiric Touch first (it powers group mana), then Shadow Word: Pain and Devouring Plague.",
      "Mind Blast on cooldown; Mind Flay as filler between DoT refreshes.",
      "Keep all three DoTs rolling without clipping; maintain Shadow Weaving stacks.",
      "Reach the spell hit cap (accounting for Misery/Shadow Focus and Draenei).",
      "Shadowfiend for personal mana; align trinkets/cooldowns with Bloodlust.",
    ],
    playstyle:
      "Discipline is everything: Vampiric Touch always up (group mana depends on it), all DoTs ticking, Mind Blast on cooldown, Mind Flay filling. Hit-cap first so your DoTs and Mind Blasts land. On movement fights, refresh DoTs before you have to move so uptime — and the raid's mana — doesn't dip.",
    commonMistakes: [
      "Letting Vampiric Touch drop and starving the caster group of mana.",
      "Clipping Mind Flay or refreshing DoTs too early.",
      "Under the spell hit cap, causing missed DoTs and lost Shadow Weaving stacks.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Why is Shadow Priest mandatory in caster groups?", answer: "Vampiric Touch replenishes the group's mana and Misery adds raid spell hit/damage — one Shadow Priest keeps a whole caster camp casting at full tilt." },
      { question: "What's the spell hit cap for Shadow?", answer: "16% base, reduced by Shadow Focus, Misery and the Draenei racial. See the stat caps below for the exact target with talents." },
    ],
  },

  // ─────────────────────────── Shaman / Elemental / PvP
  {
    class: "shaman",
    spec: "elemental",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Elemental Shaman is a burst-caster arena spec built around a Lightning Bolt/Chain Lightning nuke game backed by Elemental Mastery (a guaranteed-crit, instant nuke) and totem utility. Shaman/X comps (notably Shatterplay-style caster cleaves and Shaman/Rogue) lean on your Elemental Mastery burst, Grounding Totem to eat a key cast, and Purge to strip enemy buffs/shields.\n\nYour game is landing an Elemental Mastery-empowered crit in a setup window while using totems (Grounding, Tremor, Earthbind) to control the fight and protect yourself.",
    strengths: [
      "Elemental Mastery gives an instant guaranteed-crit nuke burst",
      "Totems bring unique utility — Grounding, Tremor, Earthbind, Poison/Disease cleanse",
      "Purge strips shields, HoTs and key buffs",
    ],
    weaknesses: [
      "No blink/root-break; very kiteable and vulnerable when trained by melee",
      "Cloth-tier survivability without a peel partner",
    ],
    rotationTitle: "Burst setup",
    rotation: [
      "Drop Grounding Totem to eat a key CC/nuke; Tremor vs Fear teams.",
      "Set up with a partner's CC, then Elemental Mastery + Lightning Bolt for a guaranteed crit.",
      "Chain Lightning for cleave/pressure; Purge the enemy healer's shields/HoTs.",
      "Earthbind / Frost Shock to kite melee; Ghost Wolf + Nature's Swiftness heal to reset.",
      "Grounding + trinket to survive the swap; Stoneclaw/Earth Elemental for extra peels.",
    ],
    playstyle:
      "You're a glass-cannon caster with totem tricks. Bank Elemental Mastery for a guaranteed-crit kill shot when the healer is CC'd, and micro your totems constantly — Grounding a Polymorph/Fear, Tremor a Fear chain, Earthbind a melee. Kite with Frost Shock and Ghost Wolf; you have no blink, so positioning and peels keep you alive.",
    commonMistakes: [
      "Blowing Elemental Mastery on cooldown instead of into a setup.",
      "Ignoring totem micro (Grounding/Tremor) that would win the fight.",
      "Standing in melee range with no peel and getting trained down.",
    ],
    faq: [
      { question: "Is Elemental Shaman good in arena?", answer: "In the right caster comp, yes — Elemental Mastery burst plus totem utility and Purge are strong. It's fragile and kiteable, so it needs a peeling partner." },
      { question: "What does Grounding Totem do for me?", answer: "It absorbs the next harmful spell cast at your team — huge for eating a Polymorph, Fear, or a big nuke during a swap." },
    ],
  },

  // ─────────────────────────── Shaman / Elemental / PvE
  {
    class: "shaman",
    spec: "elemental",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Elemental Shaman is a caster-DPS that doubles as a group buffer. Wrath of Air Totem gives your caster group spell haste, Totem of Wrath adds spell crit/hit, and your Lightning Bolt nuke provides solid personal DPS. You're placed in a caster group to hand out those totems while parsing well yourself.\n\nThe rotation is straightforward — nuke with Lightning Bolt, weave Chain Lightning and Elemental Mastery — with the real skill being totem management and hit-capping.",
    strengths: [
      "Wrath of Air + Totem of Wrath buff the whole caster group",
      "Reliable ranged DPS with Elemental Mastery burst",
      "Bloodlust/Heroism for the raid (Shaman staple)",
    ],
    weaknesses: [
      "Mana-hungry — needs Clearcasting/regen management",
      "Value is tied to being in a caster group",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Drop Totem of Wrath, Wrath of Air, and your fire/mana totems for the group.",
      "Flame Shock for the DoT, then spam Lightning Bolt as your main nuke.",
      "Chain Lightning on cooldown/cleave; Elemental Mastery + trinkets on cooldown.",
      "Reach the spell hit cap (accounting for Totem of Wrath and Draenei).",
      "Bloodlust at the optimal burn window; manage mana with Clearcasting.",
    ],
    playstyle:
      "Keep the right totems down for your caster group and nuke with Lightning Bolt. Use Elemental Mastery + trinkets on cooldown and align them with Bloodlust for the big window. Watch mana — Elemental drinks it fast — and refresh Flame Shock without clipping. Hit-cap before stacking spell power and crit.",
    commonMistakes: [
      "Wrong or missing totems — you owe the group Totem of Wrath + Wrath of Air.",
      "Ignoring the hit cap and losing nukes to misses.",
      "Running dry by not managing Clearcasting/mana totems.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Why bring Elemental Shaman?", answer: "Totem of Wrath and Wrath of Air buff the caster group's crit/hit/haste, plus Bloodlust and solid personal DPS. It's a support-nuke in a caster camp." },
      { question: "What's the spell hit cap?", answer: "16% base, reduced by Totem of Wrath's hit and the Draenei racial. See the stat caps below." },
    ],
  },

  // ─────────────────────────── Shaman / Enhancement / PvP
  {
    class: "shaman",
    spec: "enhancement",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Enhancement Shaman is a burst-melee arena spec with a unique toolkit: Windfury weapon can deliver a massive spike of damage, Nature's Swiftness + instant Shock (or heal) is a clutch cast, and totems bring control. Shaman is one of the few melee that also carries a strong off-heal and Purge, making Enhancement a self-sufficient pressure class in cleaves.\n\nYou play for Windfury burst windows and totem control, sticking to a target with Frost Shock slows while using Nature's Swiftness heals and Grounding Totem to survive.",
    strengths: [
      "Windfury burst can global a target in a good proc window",
      "Nature's Swiftness instant heal + Purge + totems = self-sufficient",
      "Frost Shock and Earthbind Totem keep targets in melee range",
    ],
    weaknesses: [
      "No gap closer or stun — kiteable by ranged with a peel",
      "RNG-dependent burst (Windfury procs)",
    ],
    rotationTitle: "Burst & pressure",
    rotation: [
      "Stick to the target with Frost Shock slows and Earthbind Totem.",
      "Stormstrike + Windfury autos for the burst; Earth Shock to interrupt a cast.",
      "Purge the enemy healer's shields/HoTs; Grounding Totem to eat a key spell.",
      "Nature's Swiftness → instant Healing Wave to survive; Shamanistic Rage vs casters.",
      "Trinket the hard CC; drop Tremor Totem against Fear comps.",
    ],
    playstyle:
      "Enhancement is a pressure-and-utility melee: apply constant Windfury/Stormstrike damage, Purge the healer, and Earth Shock to interrupt. Your Nature's Swiftness heal and Shamanistic Rage make you hard to burst down. The burst is proc-dependent, so keep uptime high and pounce when Windfury lines up during a healer CC.",
    commonMistakes: [
      "Wasting Earth Shock as damage instead of saving it to interrupt a heal.",
      "Forgetting to Purge shields/HoTs off the kill target.",
      "Using Nature's Swiftness offensively when you need it to survive.",
    ],
    faq: [
      { question: "Does Enhancement have burst?", answer: "Yes, but it's Windfury-proc dependent — a good proc window can global a target. Consistent Stormstrike/Frost Shock pressure fills the gaps." },
      { question: "How does Enhancement survive melee/caster pressure?", answer: "Nature's Swiftness instant heals, Shamanistic Rage vs casters, Grounding/Tremor totems and the PvP trinket. It's one of the more self-sufficient melee." },
    ],
  },

  // ─────────────────────────── Shaman / Enhancement / PvE
  {
    class: "shaman",
    spec: "enhancement",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Enhancement Shaman is a melee-DPS support that's mandatory in a melee group for its totems: Windfury Totem massively boosts the group's melee damage, Strength of Earth buffs AP, and Grace of Air adds Agility. Your personal DPS is solid, but the Windfury Totem you bring makes every melee next to you hit harder — a huge raid multiplier.\n\nYou play a Stormstrike/Shock priority with Lava Lash and weave in Flametongue/Windfury weapon, all while keeping the group's totems perfect.",
    strengths: [
      "Windfury Totem is a massive melee-group damage buff",
      "Strength of Earth / Grace of Air round out melee support",
      "Bloodlust/Heroism plus respectable personal DPS",
    ],
    weaknesses: [
      "Value is tied to being in a melee group",
      "Gear- and hit-dependent to reach its damage ceiling",
    ],
    rotationTitle: "Melee priority",
    rotation: [
      "Drop Windfury, Strength of Earth and Grace of Air totems for the melee group.",
      "Stormstrike on cooldown, then Earth Shock/Flame Shock and Lava Lash by priority.",
      "Keep Flametongue or Windfury weapon imbue up; maintain your shock priority.",
      "Reach the melee hit/expertise your specials need before stacking AP/Agility.",
      "Bloodlust at the burn window; align trinkets with it.",
    ],
    playstyle:
      "Your totems come first — Windfury Totem for the group is worth more than a few personal DPS. Keep Stormstrike on cooldown, weave shocks, and maintain your weapon imbue. Hit and expertise matter a lot for Enhancement's yellow hits; cap those, then stack AP and Agility. Sync Bloodlust with the raid's burst.",
    commonMistakes: [
      "Dropping the wrong totems or missing Windfury Totem for the melee.",
      "Under hit/expertise cap, causing missed Stormstrikes.",
      "Letting the weapon imbue (Windfury/Flametongue) lapse.",
    ],
    bestProfessions: ["leatherworking", "jewelcrafting"],
    faq: [
      { question: "Why is Enhancement wanted in raids?", answer: "Windfury Totem is a large melee-group damage buff, on top of Strength of Earth, Grace of Air and Bloodlust. One Enhancement Shaman lifts an entire melee group." },
      { question: "What stats matter for Enhancement?", answer: "Hit and expertise to land specials, then attack power and Agility. See the stat caps below for the exact targets." },
    ],
  },

  // ─────────────────────────── Shaman / Restoration / PvP
  {
    class: "shaman",
    spec: "restoration",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Restoration Shaman is a top-tier arena healer thanks to totem utility and instant-heal potential. Nature's Swiftness + Chain Heal or Healing Wave is a huge instant clutch heal, Grounding Totem eats a key cast, Tremor Totem breaks Fear, and Earthbind slows melee. Resto Shaman anchors caster cleaves and melee comps alike with the best anti-CC totem kit in the game.\n\nYour job is efficient topping plus totem micro: eat the enemy's important spell with Grounding, break Fears with Tremor, and land a Nature's Swiftness heal when your partner is about to die.",
    strengths: [
      "Best anti-CC totems — Grounding, Tremor, Earthbind",
      "Nature's Swiftness instant Chain/Healing Wave saves kills",
      "Purge to strip enemy shields/HoTs; strong mana efficiency",
    ],
    weaknesses: [
      "No mobility escape and no hard damage-reduction cooldown like Pain Suppression",
      "Interrupt-vulnerable; must juke and LoS to keep casting",
    ],
    rotationTitle: "Healing & totem control",
    rotation: [
      "Keep the trained partner up with efficient Lesser Healing Wave; Chain Heal in cleaves.",
      "Grounding Totem to eat a Polymorph/Fear/nuke; Tremor vs Fear teams; Earthbind vs melee.",
      "Nature's Swiftness → instant big heal when your partner is about to die.",
      "Purge the enemy healer's shields/HoTs; Earth Shock/Wind Shear to interrupt a cast.",
      "Trinket the hard CC; re-drop totems after they're killed or expire.",
    ],
    playstyle:
      "Totem micro is what separates good Resto Shamans — Ground the enemy's key cast, Tremor their Fear, Earthbind their melee, every fight. Heal efficiently with Lesser Healing Wave and bank Nature's Swiftness for the clutch. You have no escape, so use pillars and peels to avoid being trained, and juke interrupts before every big cast.",
    commonMistakes: [
      "Not re-dropping Grounding/Tremor after they're consumed or killed.",
      "Saving Nature's Swiftness too long and losing the partner.",
      "Casting into interrupts instead of juking against melee.",
    ],
    faq: [
      { question: "Is Resto Shaman a good arena healer?", answer: "Yes — top-tier. Grounding/Tremor/Earthbind totems, Nature's Swiftness clutch heals and Purge make it one of the best-supported healers in TBC arena." },
      { question: "How do I survive without an escape?", answer: "Positioning and totems — Earthbind and peels to keep melee off, Grounding to eat casts, and the PvP trinket + Nature's Swiftness to break a burst window." },
    ],
  },

  // ─────────────────────────── Shaman / Restoration / PvE
  {
    class: "shaman",
    spec: "restoration",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Restoration Shaman is a premier raid healer built around Chain Heal — a smart, bouncing heal that's absurdly efficient in stacked groups — and, of course, Bloodlust/Heroism. Your Mana Spring/Healing Stream totems, Earth Shield on the tank, and group healing make you a staple in every TBC raid comp.\n\nYou play a Chain Heal-centric healing game, keep Earth Shield rolling on a tank, and manage your totem drops for the raid.",
    strengths: [
      "Chain Heal is the most efficient group heal in the game",
      "Bloodlust/Heroism — a raid-defining cooldown",
      "Earth Shield + totems bring strong tank and raid support",
    ],
    weaknesses: [
      "Chain Heal wants stacked groups to shine",
      "Weaker at pure single-target tank healing than a Paladin",
    ],
    rotationTitle: "Healing priority",
    rotation: [
      "Keep Earth Shield on the main tank; refresh before charges run out.",
      "Chain Heal as your main group heal; Lesser Healing Wave for fast single-target.",
      "Drop Mana Spring / Healing Stream and the raid's assigned totems.",
      "Bloodlust/Heroism at the optimal burn or heavy-damage window.",
      "Manage mana with Water Shield and downranking on light damage.",
    ],
    playstyle:
      "Chain Heal is your bread and butter — position so it bounces to the most hurt targets, and keep Earth Shield on the tank at all times. Provide Bloodlust at the called window and keep your totems relevant. Downrank and use Water Shield to stay efficient across a long fight.",
    commonMistakes: [
      "Letting Earth Shield drop off the tank.",
      "Chain Healing spread targets where it can't bounce efficiently.",
      "Forgetting or mistiming Bloodlust — coordinate it with the raid.",
    ],
    bestProfessions: ["jewelcrafting", "tailoring"],
    faq: [
      { question: "Why is Resto Shaman in every raid?", answer: "Chain Heal efficiency plus Bloodlust/Heroism, Earth Shield and mana totems make it a mandatory raid healer and buffer." },
      { question: "How do I maximize Chain Heal?", answer: "Stand where it can bounce between grouped, injured targets, and assign yourself to a stacked melee/caster group. See the stat caps for the mp5/healing balance." },
    ],
  },

  // ─────────────────────────── Warlock / Affliction / PvP
  {
    class: "warlock",
    spec: "affliction",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Affliction is the premier arena Warlock spec. A full DoT spread (Corruption, Curse of Agony, Unstable Affliction, Siphon Life, Seed) plus the Felhunter's Spell Lock and Devour Magic gives you relentless pressure and one of the best interrupt/dispel pets in the game. Unstable Affliction punishes any dispel with a silence, so your DoTs are extremely hard to remove.\n\nYou win by outlasting: spread DoTs on everything, Fear the melee, drain the healer's mana, and use Death Coil + Howl of Terror to peel while your rot ticks the enemy down.",
    strengths: [
      "Relentless, hard-to-dispel DoT pressure (UA silences dispellers)",
      "Felhunter Spell Lock + Devour Magic — elite interrupt/dispel",
      "Fear, Howl, Death Coil and Curse of Exhaustion = strong control/peels",
    ],
    weaknesses: [
      "Low burst — relies on grinding teams down over time",
      "Vulnerable when trained with pet dead and Fear on DR",
    ],
    rotationTitle: "Pressure & control",
    rotation: [
      "Spread DoTs: Unstable Affliction, Corruption, Curse of Agony, Siphon Life on the kill target.",
      "Fear the melee/off-target; Howl of Terror to peel when trained.",
      "Felhunter Spell Lock the healer's cast; Devour Magic to strip a key buff/HoT.",
      "Death Coil to peel + self-heal; Curse of Exhaustion to kite.",
      "Drain the healer's mana in long games; trinket + Death Coil to break a swap.",
    ],
    playstyle:
      "Affliction is attrition. Keep DoTs on multiple targets, force dispels into UA silences, and manage your Fear DR carefully — Fear is your best defensive and offensive tool. Use the Felhunter to lock the healer during your pressure and to Devour their key buffs. You rarely global anyone; you make them run out of mana and options.",
    commonMistakes: [
      "Letting the Felhunter die and losing Spell Lock/Devour.",
      "Overlapping Fears and wasting Fear DR early.",
      "Forgetting to re-apply UA — the dispel-punish DoT that protects your rot.",
    ],
    faq: [
      { question: "Is Affliction the best PvP Warlock spec?", answer: "Yes — DoT pressure, the Felhunter's Spell Lock, and UA's dispel-punish make Affliction the arena standard over Demonology and Destruction." },
      { question: "Why does Unstable Affliction matter?", answer: "It silences anyone who dispels it, so enemy healers can't cleanly remove your DoTs — making your whole rot much stickier." },
    ],
  },

  // ─────────────────────────── Warlock / Affliction / PvE
  {
    class: "warlock",
    spec: "affliction",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Affliction is a top raid DPS spec in TBC. A rolling DoT rotation — Corruption, Unstable Affliction, Siphon Life, Curse of Agony — plus Shadow Bolt filler produces high sustained damage, and your Curse of the Elements/Shadows or Malediction adds a raid-wide spell-damage debuff. Affliction Warlocks are a fixture of the caster camp for both DPS and that debuff.\n\nThe spec is a discipline game: keep four-plus DoTs ticking without clipping, weave Shadow Bolt, and never let uptime slip.",
    strengths: [
      "High sustained DoT DPS",
      "Malediction/Curse of the Elements = raid spell-damage debuff",
      "Life Tap + Dark Pact self-sufficiency for mana",
    ],
    weaknesses: [
      "Punished hard by movement (dropped DoTs)",
      "DoT juggling is unforgiving at high uptime",
    ],
    rotationTitle: "DoT priority",
    rotation: [
      "Apply your Curse (Elements/Malediction as assigned) and keep it up.",
      "Unstable Affliction, Corruption, Siphon Life, Curse of Agony rolling without clipping.",
      "Shadow Bolt as filler; refresh DoTs on time as they expire.",
      "Reach the spell hit cap (accounting for talents/Draenei/Misery/shadow debuffs).",
      "Life Tap/Dark Pact for mana; align trinkets and cooldowns with Bloodlust.",
    ],
    playstyle:
      "Affliction is a plate-spinning rotation: five things ticking at once, none clipped. Keep your assigned Curse up (Malediction is a big raid buff), refresh DoTs a hair before they fall, and fill with Shadow Bolt. Pre-refresh before movement so your uptime — and DPS — survives. Life Tap to stay full on mana.",
    commonMistakes: [
      "Clipping DoTs by refreshing too early, or letting them fall off entirely.",
      "Forgetting the assigned Curse (a raid-wide debuff you owe the casters).",
      "Under the spell hit cap, missing DoT applications.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Is Affliction good for raiding?", answer: "Yes — high sustained DoT DPS plus the Malediction/Curse of the Elements raid debuff. It's a staple caster-camp spec." },
      { question: "What's the hardest part of the rotation?", answer: "Maintaining 4–5 DoTs at high uptime without clipping, especially on movement fights. A DoT-tracker addon is essential." },
    ],
  },

  // ─────────────────────────── Warlock / Demonology / PvP
  {
    class: "warlock",
    spec: "demonology",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Demonology is the survivability-focused PvP Warlock spec. Soul Link splits incoming damage with your pet, Demonic Aegis boosts your shields and Fel Armor, and Fel Domination lets you instantly re-summon a killed pet. Demo Warlocks are extremely hard to kill — a tanky rot/control class that outlasts through sheer effective health while keeping the Felhunter or Felguard active.\n\nYou play a durable pressure game: Soul Link damage-sharing keeps you up, the Felguard adds an intercept/stun, and you grind the enemy down with DoTs and Fear like an Affliction lock but far tankier.",
    strengths: [
      "Soul Link + Demonic Aegis make you one of the tankiest casters",
      "Fel Domination instantly re-summons a dead pet mid-fight",
      "Felguard adds burst + an intercept/stun the other specs lack",
    ],
    weaknesses: [
      "Lower burst and less dispel-punish than Affliction",
      "Pet-dependent — losing the pet costs Soul Link mitigation",
    ],
    rotationTitle: "Pressure & survival",
    rotation: [
      "Keep Soul Link and Fel Armor up at all times for the damage split.",
      "Spread DoTs (Corruption, Curse of Agony, UA) and pressure with Shadow Bolt.",
      "Felguard Intercept/Cleave the kill target; Felhunter Spell Lock the healer (swap pets to need).",
      "Fear the melee; Death Coil to peel/self-heal; Howl of Terror when trained.",
      "Fel Domination → instant re-summon if the pet dies; trinket the hard swap.",
    ],
    playstyle:
      "Demo trades Affliction's dispel-punish for raw durability. Always keep Soul Link and Fel Armor up (that's your survivability), maintain DoT pressure, and use Fel Domination to never be without a pet. You outlast opponents — they can't burst through Soul Link, and your rot + Fear grinds them down.",
    commonMistakes: [
      "Letting Soul Link or Fel Armor drop and losing your mitigation.",
      "Not using Fel Domination to re-summon a killed pet.",
      "Playing Demo like Affliction and expecting the same dispel-punish pressure.",
    ],
    faq: [
      { question: "Why play Demonology in PvP?", answer: "Survivability — Soul Link, Demonic Aegis and Fel Domination make you extremely tanky, and the Felguard adds burst and a stun. It outlasts where Affliction gets trained down." },
      { question: "Demo or Affliction for arena?", answer: "Affliction is the standard for dispel-punish pressure; Demo is a tankier alternative that trades some pressure for survivability and a Felguard stun." },
    ],
  },

  // ─────────────────────────── Warlock / Demonology / PvE
  {
    class: "warlock",
    spec: "demonology",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Demonology in raids is mostly a leveling/utility spec — for pure raid DPS, Affliction and Destruction parse higher. Its niche is survivability and the Felguard's extra body, and some hybrid Demonology/Destruction (Demonic Sacrifice or Soul Link) builds see play, but a straight Demo raider is uncommon. Bring Affliction or Destruction for a raid DPS slot.\n\nIf you do raid Demo, you lean on a Shadow Bolt/Incinerate filler with your pet's damage and the spec's survivability talents.",
    strengths: [
      "Very survivable via Soul Link",
      "Felguard adds a durable damage pet",
      "Fine for leveling and off-spec utility",
    ],
    weaknesses: [
      "Lower raid DPS than Affliction/Destruction",
      "Rarely the optimal raid choice",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Keep your Curse (Elements as assigned) and Corruption up.",
      "Shadow Bolt as your main filler; maintain the Felguard on the boss.",
      "Reach the spell hit cap before stacking spell power/crit.",
      "Life Tap for mana; align trinkets with Bloodlust.",
      "Consider Affliction/Destruction for a real raid DPS slot.",
    ],
    playstyle:
      "Demo PvE is a survivability/off-spec choice rather than a parse spec. If you bring it, keep your Curse and Corruption up, filler with Shadow Bolt, and let the Felguard add damage. For maximum raid DPS, respec Affliction or Destruction — Demo's value is durability and leveling, not the meter.",
    commonMistakes: [
      "Raiding Demo when Affliction/Destruction would parse much higher.",
      "Ignoring the assigned Curse/Corruption uptime.",
      "Not hit-capped.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Should I raid as Demonology?", answer: "Usually no — Affliction and Destruction do more raid DPS. Demo is best for leveling and survivability off-spec; some hybrid builds exist but pure Demo raiding is rare." },
      { question: "What is Demo actually good at?", answer: "Survivability (Soul Link) and a tanky Felguard — great for solo/leveling and PvP durability more than raid parsing." },
    ],
  },

  // ─────────────────────────── Warlock / Destruction / PvP
  {
    class: "warlock",
    spec: "destruction",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Destruction is the burst Warlock arena spec, best known in the SL/SL and Shadow-cleave hybrids but most explosive as a Shadowburn/Conflagrate finisher. Big Shadow Bolts and Incinerate, plus Shadowfury (an AoE stun) and the Felhunter's Spell Lock, let Destro set up and land real burst kills that Affliction can't. Many Warlocks run a hybrid deep-Destruction or SL/SL build to blend burst with survivability.\n\nYou play for burst windows: Shadowfury stun, then a Shadow Bolt/Conflagrate/Shadowburn sequence to spike a target down while the healer is locked.",
    strengths: [
      "Real burst — Shadow Bolt/Conflagrate/Shadowburn can spike a kill",
      "Shadowfury is an AoE stun to set up burst or peel",
      "Felhunter Spell Lock + Death Coil control on top of damage",
    ],
    weaknesses: [
      "Less sustained/dispel-punish pressure than Affliction",
      "Cast-reliant burst is interrupt-vulnerable",
    ],
    rotationTitle: "Burst setup",
    rotation: [
      "Shadowfury (AoE stun) to open a kill window or peel a melee.",
      "Immolate → Conflagrate + Shadow Bolt burst on the kill target.",
      "Shadowburn as an instant execute/finisher; Death Coil to peel + heal.",
      "Felhunter Spell Lock the healer's cast during your burst.",
      "Fear the off-target; trinket + Death Coil to survive the swap.",
    ],
    playstyle:
      "Destruction is about landing a burst window. Set up with Shadowfury or a partner's CC, lock the healer with Spell Lock, and dump Conflagrate + Shadow Bolt + Shadowburn to spike the kill. You're more interrupt-reliant than Affliction, so juke and use the stun to guarantee your casts land. Many players run SL/SL for durability while keeping this burst.",
    commonMistakes: [
      "Bursting into a free healer instead of Spell Locking first.",
      "Wasting Shadowfury as damage rather than a setup stun.",
      "Getting your cast burst interrupted — juke or stun before committing.",
    ],
    faq: [
      { question: "Is Destruction viable in arena?", answer: "Yes, especially in hybrid/SL builds — it brings real burst and Shadowfury that Affliction lacks. Affliction is more common, but Destro burst wins fast games." },
      { question: "What is SL/SL?", answer: "A Soul Link + Siphon Life hybrid build that blends Destruction-adjacent damage with Demonology survivability — durable and popular for Warlock arena." },
    ],
  },

  // ─────────────────────────── Warlock / Destruction / PvE
  {
    class: "warlock",
    spec: "destruction",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Destruction is a top raid DPS spec built on Shadow Bolt spam with Improved Shadow Bolt (a raid-wide shadow-damage debuff) and Ruin-boosted crits. In a group with a Shadow Priest and other Warlocks, Destruction's ISB debuff plus high Shadow Bolt throughput make it a premier caster parse. It's a simpler rotation than Affliction — cast Shadow Bolt, keep Immolate/Curse up — with a very high ceiling.\n\nYou play a Shadow Bolt-centric rotation, maintain Immolate and your Curse, and keep Improved Shadow Bolt applied for the shadow-caster group.",
    strengths: [
      "High single-target Shadow Bolt DPS",
      "Improved Shadow Bolt debuff boosts the shadow-caster group",
      "Simpler, high-ceiling rotation vs Affliction",
    ],
    weaknesses: [
      "Mana-hungry — leans on Life Tap and regen",
      "Less multi-DoT value than Affliction on cleave",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Apply your Curse (Elements/Doom as assigned) and keep Immolate up.",
      "Shadow Bolt spam as the core nuke, maintaining Improved Shadow Bolt stacks.",
      "Conflagrate if speccing for it (consumes Immolate); otherwise pure Shadow Bolt.",
      "Reach the spell hit cap; Life Tap between casts for mana.",
      "Align trinkets and cooldowns with Bloodlust for the burn window.",
    ],
    playstyle:
      "Destruction is a rhythm of Shadow Bolt with Immolate and your Curse maintained. Your ISB debuff benefits every shadow caster, so keep it up. Manage mana with Life Tap (and a Healthstone/Dark Pact), hit-cap first, then stack spell power and crit. Place yourself in the shadow-caster group to maximize the debuff synergy.",
    commonMistakes: [
      "Letting Immolate or the Curse fall off.",
      "Dropping Improved Shadow Bolt stacks (hurts the whole shadow group).",
      "Running oom by not weaving Life Tap.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Destruction or Affliction for raids?", answer: "Both are top-tier. Destruction offers higher single-target Shadow Bolt DPS and the ISB debuff; Affliction offers multi-DoT sustain and Malediction. Comp and fight decide." },
      { question: "What's Improved Shadow Bolt?", answer: "A debuff your Shadow Bolt crits apply that increases shadow damage the target takes — a buff for every shadow caster hitting that boss." },
    ],
  },

  // ─────────────────────────── Druid / Balance / PvP
  {
    class: "druid",
    spec: "balance",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Balance (Moonkin) is a hybrid caster-and-utility spec in arena. You bring a Cyclone that can't be trinketed cheaply, an off-heal (shift to caster form and Healing Touch/Regrowth), Innervate, and Barkskin plus Moonkin form armor for survivability. Your damage is Wrath/Starfire pressure with a big Starfire crit, but your real value is Cyclone control and being a DPS that can also peel and heal.\n\nYou play a control-caster game: Cyclone the healer or a kill target out of the fight, root melee with Entangling Roots, and swing between DPS and clutch off-heals.",
    strengths: [
      "Cyclone is a premier, hard-to-counter CC on any target",
      "Hybrid utility — off-heals, Innervate, Roots, Barkskin",
      "Instant Moonfire/Faerie Fire pressure while kiting",
    ],
    weaknesses: [
      "Moderate burst; can be trained by melee if roots are on DR",
      "Mana-hungry when doubling as an off-healer",
    ],
    rotationTitle: "Control & pressure",
    rotation: [
      "Cyclone the enemy healer (or a kill target) to remove them from the play.",
      "Entangling Roots + Wrath to kite melee; instant Moonfire for pressure on the move.",
      "Starfire on the kill target when you have a cast window; Faerie Fire to stop stealth/heal armor.",
      "Barkskin when trained; shift to break roots/slows and drop poisons.",
      "Off-heal with Regrowth/Rejuvenation when your partner is low; Innervate to refill.",
    ],
    playstyle:
      "Moonkin is a control DPS. Cyclone is your win condition — chain it on the enemy healer while your partner bursts a now-unhealed target. Kite melee with Roots and instants, use Barkskin + shifting to survive, and swap to healer mode when needed. Manage mana carefully since you both DPS and off-heal.",
    commonMistakes: [
      "Wasting Cyclone on a random target instead of the healer during a kill.",
      "Standing still to cast while a melee trains you (kite with instants + roots).",
      "Going oom by over-healing when you should be pressuring or Innervating.",
    ],
    faq: [
      { question: "Is Balance Druid good in arena?", answer: "It's a solid hybrid control spec — Cyclone, off-heals and Roots make it valuable, though its burst is lower than a pure caster. Strong in coordinated 3s." },
      { question: "Why is Cyclone so strong?", answer: "It fully removes a target from the fight (no damage in or out) and is on a separate DR, letting you chain-CC a healer while your team kills their partner." },
    ],
  },

  // ─────────────────────────── Druid / Balance / PvE
  {
    class: "druid",
    spec: "balance",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Balance Druid is a caster-DPS whose signature raid contribution is Improved Faerie Fire (a spell-hit debuff on the boss) and Moonkin Aura (spell crit for the caster group). Your personal DPS comes from Wrath and Starfire, and while Moonkin doesn't top the meters, the Faerie Fire hit debuff and crit aura earn it a caster-group slot.\n\nYou play a Starfire/Wrath rotation with Moonfire and Faerie Fire maintained, choosing your nuke by movement and mana.",
    strengths: [
      "Improved Faerie Fire = raid spell-hit debuff; Moonkin Aura = group crit",
      "Battle-rez and Innervate utility",
      "Reliable ranged DPS with instant Moonfire on the move",
    ],
    weaknesses: [
      "Below top pure-caster personal DPS",
      "Mana-hungry; leans on Innervate and crit for regen",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Keep Improved Faerie Fire and Moonfire up on the boss; Moonkin Aura active.",
      "Starfire as your main nuke; Wrath when you need faster casts/movement.",
      "Reach the spell hit cap (accounting for talents/Draenei).",
      "Innervate yourself or a healer as assigned; align trinkets with Bloodlust.",
      "Insect Swarm if specced, for extra DoT uptime.",
    ],
    playstyle:
      "Keep Faerie Fire (the raid hit debuff) and Moonfire rolling, then nuke with Starfire. Use instant Moonfire to keep damage up while moving, manage mana with Innervate and crit procs, and provide Moonkin Aura for the caster group. Hit-cap first, then stack spell power and crit.",
    commonMistakes: [
      "Letting Improved Faerie Fire drop — it's a raid-wide hit debuff you provide.",
      "Standing still through movement instead of using instant Moonfire.",
      "Ignoring the hit cap.",
    ],
    bestProfessions: ["tailoring", "jewelcrafting"],
    faq: [
      { question: "Why bring a Balance Druid?", answer: "Improved Faerie Fire (raid spell-hit debuff) and Moonkin Aura (group crit), plus battle-rez and Innervate. It's a utility caster more than a top parser." },
      { question: "Starfire or Wrath?", answer: "Starfire is the higher-damage nuke for stationary casting; Wrath is faster and better on movement. Use instant Moonfire to fill gaps." },
    ],
  },

  // ─────────────────────────── Druid / Feral (Bear) / PvE
  {
    class: "druid",
    spec: "feral-bear",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Feral (Bear) is a main-tank-capable spec in TBC with the highest health pool and armor of any tank, plus strong threat through Mangle and Swipe. Bears excel at raw survivability and AoE threat, and Feral Charge + Bash bring utility, though they lack a Warrior's Shield Block/spell mitigation and a Paladin's seamless AoE holy threat. Well-geared bears tank most of TBC comfortably.\n\nYou play a Mangle-on-cooldown threat rotation with Lacerate stacks and Demoralizing Roar/Faerie Fire maintained, managing Rage and cooldowns like Survival Instincts and Barkskin.",
    strengths: [
      "Highest armor and health pool of any tank",
      "Strong single-target (Mangle) and AoE (Swipe) threat",
      "Feral Charge, Bash and battle-rez utility",
    ],
    weaknesses: [
      "No block and weak vs magic damage; crushable without high avoidance",
      "Can't taunt-swap as flexibly as a Warrior on some mechanics",
    ],
    rotationTitle: "Threat rotation",
    rotation: [
      "Mangle on cooldown as your top threat/priority ability.",
      "Maintain Lacerate stacks; Swipe for AoE threat on multiple targets.",
      "Keep Demoralizing Roar and Faerie Fire (armor/attack debuffs) up.",
      "Reach the crit-immunity cap (defense/resilience-equivalent via Survival of the Fittest).",
      "Barkskin / Survival Instincts on big hits; Enrage for Rage when needed.",
    ],
    playstyle:
      "Bear tanking is about uncrittability and threat: reach the crit-immunity cap first (so you can't be crit-crushed), then stack stamina, agility and armor. Mangle on cooldown, keep Lacerate and your debuffs up, and Swipe for AoE. Use Barkskin and Survival Instincts proactively on known damage spikes. Coordinate battle-rezzes with the raid.",
    commonMistakes: [
      "Tanking before reaching crit immunity (getting crit for lethal spikes).",
      "Missing Mangle on cooldown and losing threat.",
      "Letting Demoralizing Roar/Faerie Fire debuffs drop.",
    ],
    bestProfessions: ["leatherworking", "jewelcrafting"],
    faq: [
      { question: "Are Bears good tanks in TBC?", answer: "Yes — highest health/armor and strong threat make them excellent main and off-tanks. Their weakness is magic damage and no block, but for most fights they're top-tier." },
      { question: "What's the first gearing goal for a Bear?", answer: "Crit immunity (uncrittable) so a boss can't crit-crush you, then stack stamina, agility and armor. See the stat caps below." },
    ],
  },

  // ─────────────────────────── Druid / Feral (Cat) / PvP
  {
    class: "druid",
    spec: "feral-cat",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Feral (Cat) PvP is a hybrid melee-and-utility spec. You bring bleed pressure (Rip, Rake), stealth openers (Pounce stun), and the Druid utility kit — Cyclone, Roots, off-heals, Innervate and shapeshifting to break slows/roots. Feral Druids are slippery: shift out of every root, Travel Form to reposition, and swap between cat damage and caster-form healing.\n\nYou play a shift-heavy game: open from stealth with Pounce, apply bleeds, and constantly shift to stay mobile and unrooted while mixing in Cyclone and off-heals.",
    strengths: [
      "Shapeshifting breaks roots/slows — extremely mobile and slippery",
      "Bleed pressure plus Pounce stun opener from stealth",
      "Full Druid utility — Cyclone, Roots, off-heals, Innervate",
    ],
    weaknesses: [
      "Lower burst than a Rogue; relies on bleeds + sustained pressure",
      "Mana/form juggling is demanding; squishy in caster form",
    ],
    rotationTitle: "Opener & pressure",
    rotation: [
      "Open from stealth with Pounce (stun) → build combo points with Shred/Mangle.",
      "Apply Rip and keep Rake up for bleed pressure; Mangle amplifies bleeds.",
      "Shift out of roots/slows constantly; Travel Form to reposition/chase.",
      "Cyclone the healer or Roots the melee off you/your partner as needed.",
      "Shift to caster form for a clutch Regrowth/Healing Touch; Barkskin + trinket to survive.",
    ],
    playstyle:
      "Feral cat is about relentless pressure and slipperiness. Never sit rooted — shift immediately — and keep bleeds ticking while you mix in Cyclone and Roots for control. You're a hybrid, so read the game: full pressure when you're winning, off-heal and peel when your partner needs it. Manage Rage/Energy and mana across form swaps.",
    commonMistakes: [
      "Sitting in a root/slow instead of shifting out.",
      "Letting bleeds fall off (your main sustained damage).",
      "Over-committing to damage when a Cyclone/off-heal would win the round.",
    ],
    faq: [
      { question: "Is Feral Druid good in arena?", answer: "It's a strong hybrid — mobility, bleeds and Cyclone/off-heal utility make it slippery and useful, though its burst is lower than a Rogue's. Rewards a skilled, shift-heavy player." },
      { question: "Why is shifting so important?", answer: "Shapeshifting removes roots and movement-slows, so a Feral can escape kites and stick to targets better than almost any other melee." },
    ],
  },

  // ─────────────────────────── Druid / Feral (Cat) / PvE
  {
    class: "druid",
    spec: "feral-cat",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Feral (Cat) is a melee-DPS whose signature raid buff is Improved Leader of the Pack (group crit + heal-on-crit) and Mangle (a bleed-damage debuff that boosts the whole melee/bleed group). Your personal DPS is a Shred-and-bleed rotation that rewards positioning behind the boss and tight energy management. Cats bring meaningful melee-group utility alongside solid damage.\n\nYou play an energy-and-combo-point game: keep Mangle and Rip/Savage Roar up, Shred from behind, and manage the Energy/combo economy without dropping bleeds.",
    strengths: [
      "Mangle debuff boosts the bleed/melee group's damage",
      "Leader of the Pack gives the group crit + heal-on-crit",
      "Strong sustained DPS with good positioning",
    ],
    weaknesses: [
      "Behind-the-boss requirement (Shred) hurts on some fights",
      "Demanding Energy/combo/bleed juggling",
    ],
    rotationTitle: "Single-target rotation",
    rotation: [
      "Keep Mangle up (bleed-damage debuff) and Savage Roar active for attack speed.",
      "Shred from behind to build combo points; apply and maintain Rip.",
      "Faerie Fire (Feral) for the armor debuff; keep Leader of the Pack up for the group.",
      "Reach the melee hit/expertise your specials need, then stack Agility/AP.",
      "Manage Energy with pooling; align trinkets and cooldowns with Bloodlust.",
    ],
    playstyle:
      "Cat DPS is an energy and bleed puzzle: Mangle and Rip must stay up, Savage Roar buffs your attack speed, and you Shred from behind to build points. Never clip Rip or let Savage Roar drop. Provide Leader of the Pack and the Mangle debuff for your melee group. Position behind the boss and pool Energy for cooldown windows.",
    commonMistakes: [
      "Letting Rip or Savage Roar fall off (big DPS loss).",
      "Standing in front of the boss where you can't Shred.",
      "Poor Energy pooling — capping Energy or starving your rotation.",
    ],
    bestProfessions: ["leatherworking", "jewelcrafting"],
    faq: [
      { question: "Why bring a Feral Cat?", answer: "The Mangle bleed-damage debuff and Leader of the Pack (group crit + heal-on-crit) buff the whole melee group, on top of solid personal DPS." },
      { question: "Is Cat DPS hard to play?", answer: "It's one of the more demanding melee rotations — Energy pooling plus keeping Mangle, Rip and Savage Roar up from behind the boss. High skill ceiling, rewarding parse." },
    ],
  },

  // ─────────────────────────── Druid / Restoration / PvP
  {
    class: "druid",
    spec: "restoration",
    content: "pvp",
    updatedAt: "2026-07-20",
    overview:
      "Restoration Druid is arguably the best arena healer in TBC. HoTs (Rejuvenation, Lifebloom, Regrowth) heal while you're on the move or being trained, so you keep your team alive even under heavy melee pressure — and shapeshifting breaks roots and slows to stay mobile. Add Cyclone, Roots, Barkskin and Innervate, and the Resto Druid is a mobile, control-rich healer that's extremely hard to kill.\n\nYou play a kiting HoT game: keep rolling HoTs on the trained target, shift out of every root/slow, and juke melee around pillars while Cycloning to peel.",
    strengths: [
      "HoTs heal on the move — thrive under melee train pressure",
      "Shapeshift breaks roots/slows for elite mobility",
      "Cyclone, Roots and Barkskin add control and survivability",
    ],
    weaknesses: [
      "Weak burst healing — a hard swap can outrun HoTs",
      "No Pain Suppression-style hard cooldown; relies on kiting",
    ],
    rotationTitle: "Healing & kiting",
    rotation: [
      "Keep Lifebloom + Rejuvenation rolling on the trained partner; Regrowth for a bigger tick.",
      "Shift out of roots/slows immediately; Travel/cat form to kite melee around pillars.",
      "Cyclone the kill target or a melee to peel; Entangling Roots to create distance.",
      "Barkskin when trained to keep casting; trinket the hard CC.",
      "Innervate to refill mana in long games; pre-HoT before a swap.",
    ],
    playstyle:
      "Resto Druid is a kiting healer — you almost never stand still. Roll HoTs, shift out of every root, and run melee around line-of-sight while your HoTs tick your partner up. Use Cyclone to peel or to CC a healer, and bank Barkskin to keep healing when caught. Your weakness is a coordinated hard swap, so pre-HoT and body-block to survive it.",
    commonMistakes: [
      "Standing still and getting trained instead of kiting with HoTs up.",
      "Letting Lifebloom bloom/drop instead of refreshing the stack.",
      "Getting caught by a hard swap with no HoTs pre-applied.",
    ],
    faq: [
      { question: "Is Resto Druid the best arena healer?", answer: "It's among the very best — HoT-while-moving and shapeshift mobility let it survive melee trains that other healers can't, plus Cyclone control. Weak to hard burst swaps." },
      { question: "How does a Resto Druid survive being trained?", answer: "Rolling HoTs that heal on the move, shifting out of roots/slows, kiting around pillars, Barkskin, and the PvP trinket. It heals while running rather than standing to cast." },
    ],
  },

  // ─────────────────────────── Druid / Restoration / PvE
  {
    class: "druid",
    spec: "restoration",
    content: "pve",
    updatedAt: "2026-07-20",
    overview:
      "Restoration Druid is a premier raid healer specializing in HoT throughput. Rolling Lifebloom stacks and Rejuvenation on tanks and raid make you the most efficient sustained healer for constant damage, and Tree of Life form boosts your healing and gives the group a mana aura. You're the HoT engine of the healing team, complementing a Paladin's direct tank heals and a Priest/Shaman's group healing.\n\nYou play a HoT-maintenance game: keep Lifebloom rolling on the tank, blanket Rejuvenation where damage is going out, and manage mana across a long fight.",
    strengths: [
      "Best-in-slot HoT throughput for sustained/rolling damage",
      "Tree of Life healing bonus + mana aura for the group",
      "Innervate and battle-rez utility",
    ],
    weaknesses: [
      "Weak burst healing — HoTs pre-empt damage rather than react",
      "Lifebloom management is fiddly and mana-intensive",
    ],
    rotationTitle: "Healing priority",
    rotation: [
      "Keep a Lifebloom stack rolling on the main tank; refresh before it blooms (or let it bloom by design).",
      "Blanket Rejuvenation on targets taking sustained damage; Regrowth for a bigger single-target HoT.",
      "Swiftmend to convert a HoT into an instant when someone spikes.",
      "Stay in Tree of Life form for the healing bonus + mana aura.",
      "Innervate yourself or a healer; manage mana across the fight.",
    ],
    playstyle:
      "Resto Druid healing is proactive HoT blanketing. Keep Lifebloom on the tank, pre-HoT before predictable damage, and use Swiftmend for the occasional instant on a spike. You shine on sustained raid damage; let Paladins handle single-target tank spikes and Priests/Shamans handle burst AoE. Watch mana — rolling Lifebloom is expensive.",
    commonMistakes: [
      "Mismanaging the Lifebloom stack (accidental blooms or letting it drop).",
      "Trying to reactively burst-heal spikes (HoTs are proactive — pre-cast them).",
      "Running oom by over-rolling Lifebloom on too many targets.",
    ],
    bestProfessions: ["jewelcrafting", "tailoring"],
    faq: [
      { question: "What's a Resto Druid's raid role?", answer: "The HoT engine — best sustained/rolling healing via Lifebloom and Rejuvenation, plus Tree of Life's healing bonus and mana aura. It complements direct-heal Paladins and burst-AoE Priests/Shamans." },
      { question: "How do I manage Lifebloom?", answer: "Keep a stack on the tank and refresh it before it blooms for efficient rolling healing, or let it bloom intentionally for a burst tick. It's mana-intensive, so don't over-spread it." },
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
