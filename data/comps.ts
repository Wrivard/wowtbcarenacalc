// Arena comp dataset. Real TBC (Season 2 meta) comps only — no invented
// comps. Specs use the slugs from lib/classes so we can render class
// icons and cross-link to BiS + talent pages. Guides are hand-written in
// the site voice from established TBC arena theory.

export type Bracket = "2s" | "3s" | "5s";
export type Tier = "S" | "A" | "B" | "C";
export type Playstyle = "cleave" | "control" | "sustain" | "burst";
export type Difficulty = 1 | 2 | 3;

export interface CompMember {
  class: string; // lib/classes slug
  spec: string; // lib/classes spec slug
}

export interface CompCounter {
  compId: string;
  howToPlay: string;
}

export interface CompGuide {
  overview: string; // multi-paragraph (split on \n\n at render)
  winCondition: string;
  cooldownTimeline: string;
  positioning: string;
  counters: CompCounter[];
  tips: string[];
  requiredGear: string[];
}

export interface ArenaComp {
  id: string;
  name: string;
  bracket: Bracket;
  members: CompMember[];
  tier: Tier;
  playstyle: Playstyle;
  difficulty: Difficulty;
  strengths: string[];
  weaknesses: string[];
  keyCounters: string[]; // comp ids this loses to
  keyFavors: string[]; // comp ids this beats
  blurb: string;
  guide: CompGuide;
}

export const COMPS: ArenaComp[] = [
  // ---------------------------------------------------------------- 2v2
  {
    id: "rogue-disc-priest-2s",
    name: "Rogue / Disc Priest",
    bracket: "2s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "S",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "Best-in-class kill setup: Cheap Shot → Blind → kill-target Stunlock",
      "Mana Burn ends dampening games against healer comps",
      "Priest dispels and Fear peel almost everything the rogue can't",
    ],
    weaknesses: [
      "Vulnerable to Warrior/Druid until the rogue lands a full setup",
      "A dispelled/UA'd priest under warlock pressure can fold",
    ],
    keyCounters: ["warlock-disc-priest-2s", "resto-druid-warrior-2s"],
    keyFavors: ["frost-mage-disc-priest-2s", "ret-holy-paladin-2s"],
    blurb:
      "The premier 2v2 comp of TBC. The rogue controls the game with stuns and Blind while the priest out-sustains and Mana Burns any healer to zero. If you want the highest 2s ceiling, this is it.",
    guide: {
      overview:
        "Rogue/Priest wins 2s two ways: a hard kill through a Cheap Shot → Blind → stunlock window, or a slow Mana Burn grind that starves the enemy healer. Against double-DPS you race for the kill; against healer comps you settle in and burn mana.\n\nThe rogue's job is to create a clean stun window on the kill target while the priest keeps Power Word: Shield and Renew rolling and dispels every root, poison, and magic snare off the rogue. The priest is never passive — Mana Burn, Fear, and Psychic Scream are as much of the offense as the rogue's daggers.",
      winCondition:
        "Either kill through a full stun→Blind→stun chain before the enemy healer can react, or reduce the enemy healer to zero mana with Mana Burn while your Shield/dispel keep you even.",
      cooldownTimeline:
        "Open from stealth: Cheap Shot the kill target → priest Shields the rogue and starts Mana Burn on the healer. Blind the healer/off-target to extend the kill window → Kidney Shot on the primary. Trinket + Adrenaline Rush during Kidney if the kill is close. If they survive, reset: Vanish, re-stealth, and start the Mana Burn game.",
      positioning:
        "Rogue plays on the kill target; priest hugs a pillar so the rogue can peel for them by LoS and Blind. Never let the priest get caught in the open by a warrior charge or hunter — use the pillar to force the enemy to commit.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay:
            "You cannot out-sustain a Warlock's UA + dispel-punish on your priest. Swap to the warlock, purge/dispel nothing greedily, and try to burst the lock during a Blind on the priest instead of grinding.",
        },
        {
          compId: "resto-druid-warrior-2s",
          howToPlay:
            "The druid cyclones your rogue out of kills and the warrior trains your priest. Blind the druid on the kill attempt and Mana Burn on cooldown — druids have a smaller mana pool than you think.",
        },
      ],
      tips: [
        "Blind is a setup tool, not a panic button — save it to extend a kill window, not to survive.",
        "Mana Burn even when you're going for a kill; chip the healer's mana every spare global.",
        "Pre-Shield the rogue before the opener so the first trade is free.",
        "Re-stealth aggressively; a rogue out of stealth in a losing tempo is just a warrior with less armor.",
      ],
      requiredGear: [
        "Rogue needs 400+ resilience before queuing above 1800",
        "Priest wants a strong Mana Burn wand/weapon and enough resilience to survive a full swap",
      ],
    },
  },
  {
    id: "rogue-holy-paladin-2s",
    name: "Rogue / Holy Paladin",
    bracket: "2s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "A",
    playstyle: "sustain",
    difficulty: 2,
    strengths: [
      "Holy Paladin is the hardest healer to kill in 2s",
      "Freedom keeps the rogue on target through snares",
      "Bubble buys a full reset on a bad opener",
    ],
    weaknesses: [
      "No Mana Burn — loses long dampening games to Priest comps",
      "Paladin has no hard CC, so kills rely entirely on the rogue",
    ],
    keyCounters: ["rogue-disc-priest-2s", "warlock-disc-priest-2s"],
    keyFavors: ["warrior-holy-paladin-2s", "ret-holy-paladin-2s"],
    blurb:
      "Ride the tankiest healer in the bracket. The paladin's Freedom and Blessing of Protection keep the rogue glued to a target while the paladin simply refuses to die. Strong into cleaves, weaker into Mana Burn.",
    guide: {
      overview:
        "This comp wins on healer survivability. A well-played Holy Paladin outlasts almost any single DPS, and Blessing of Freedom means your rogue never gets kited. You grind kills through raw uptime rather than burst.\n\nThe weakness is closing games: with no Mana Burn and no paladin CC, you can't force a healer comp that plays patiently. Prioritize aggressive queues into cleave/DPS teams where your paladin's survivability shines.",
      winCondition:
        "Out-sustain the enemy healer with paladin longevity while the rogue applies constant uninterrupted pressure through Freedom, or catch a squishy DPS in a stunlock.",
      cooldownTimeline:
        "Open with Cheap Shot → paladin Freedoms the rogue and pre-HoTs nothing (paladins don't). Kidney Shot → rogue burns with AR/trinket. If the rogue is trained, Blessing of Protection resets melee threat; if the paladin is trained, bubble + reposition behind a pillar.",
      positioning:
        "Paladin plays los-of-sight around a pillar to force casters to peek; rogue stays on the kill target. Use Freedom proactively before the snare lands, not after.",
      counters: [
        {
          compId: "rogue-disc-priest-2s",
          howToPlay:
            "They Mana Burn you out. You must kill before dampening matters — commit trinket + AR on the first clean Blind and don't play for the long game.",
        },
      ],
      tips: [
        "Freedom is your best offensive cooldown — it guarantees rogue uptime.",
        "Bubble early on a lost opener to force a full reset rather than dying to it.",
        "Cleanse poisons and magic off the rogue so snare/CC never sticks to your kill window.",
      ],
      requiredGear: [
        "Paladin needs deep resilience + mp5 to survive extended trains",
        "Rogue wants Mongoose/whatever weapon setup maximizes uptime damage",
      ],
    },
  },
  {
    id: "warrior-holy-paladin-2s",
    name: "Warrior / Holy Paladin",
    bracket: "2s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "S",
    playstyle: "cleave",
    difficulty: 1,
    strengths: [
      "Highest raw pressure in 2s with Freedom-enabled uptime",
      "Mortal Strike halves enemy healing",
      "Easiest S-tier comp to pilot — very forgiving",
    ],
    weaknesses: [
      "Kited hard by Frost Mage / Hunter until Freedom is up",
      "Loses tempo badly if the paladin gets caught out of LoS",
    ],
    keyCounters: ["frost-mage-disc-priest-2s", "rogue-disc-priest-2s"],
    keyFavors: ["ret-holy-paladin-2s", "warrior-disc-priest-2s"],
    blurb:
      "The beginner-friendly powerhouse. Blessing of Freedom turns the warrior into an un-kiteable Mortal Strike machine, and the paladin is nearly unkillable. If you want a high floor, start here.",
    guide: {
      overview:
        "Warrior/Paladin is the most forgiving S-tier comp in the game. The plan is simple: the paladin keeps Freedom on the warrior, the warrior trains the enemy healer or the squishiest target with Mortal Strike up, and you win the sustain race because your healer barely spends mana.\n\nThe skill is in the paladin's positioning and Freedom timing, not the warrior's rotation. A paladin who never gets kited or CC'd out of LoS makes this comp nearly unbeatable below very high rating.",
      winCondition:
        "Apply constant Mortal Strike pressure (−50% healing) with Freedom uptime until the enemy healer is out of mana or a squishy target dies to a Recklessness/Death Wish burst.",
      cooldownTimeline:
        "Charge → Hamstring → keep Mortal Strike on cooldown. Pop Recklessness + Death Wish + trinket on a Freedom window when the target is low or the healer is CC'd. Paladin Freedoms on cooldown and only bursts heals during your kill attempts.",
      positioning:
        "Warrior sticks to the target; paladin plays a pillar and pre-empts snares with Freedom. Intervene the paladin when a rogue/mage swaps to them.",
      counters: [
        {
          compId: "frost-mage-disc-priest-2s",
          howToPlay:
            "Frost Mage kites the warrior all day. Save Freedom for the Frost Nova/Frostbite chain, Spell Reflect the Polymorph, and force the mage to trinket early with a Fear/Intercept swap.",
        },
      ],
      tips: [
        "Never waste Freedom reactively — read the mage/rogue snare and pre-Freedom.",
        "Spell Reflect is a real cooldown vs casters; use it on Poly and Fear.",
        "Intervene is a peel for your paladin, not just mobility.",
      ],
      requiredGear: [
        "Warrior needs strong resilience and a big two-hander (weapon before armor)",
        "Paladin: resilience + mp5, this comp plays long games",
      ],
    },
  },
  {
    id: "warrior-disc-priest-2s",
    name: "Warrior / Disc Priest",
    bracket: "2s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "A",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Mortal Strike + priest peels create constant kill pressure",
      "Fear/Psychic Scream reset any bad trade",
      "Mana Burn closes out healer teams",
    ],
    weaknesses: [
      "Priest is squishier than a paladin and can be trained down",
      "Warrior kited by casters when Fear is on DR",
    ],
    keyCounters: ["frost-mage-disc-priest-2s", "warlock-disc-priest-2s"],
    keyFavors: ["ret-holy-paladin-2s"],
    blurb:
      "More proactive than Warrior/Paladin — the priest brings Fear, dispels, and Mana Burn so you can both kill through peels and win the long game. Higher ceiling, lower floor.",
    guide: {
      overview:
        "Warrior/Priest trades the paladin's raw survivability for utility: Fear peels, magic dispels, and Mana Burn to close games your Mortal Strike pressure can't finish. It's a stronger comp in the right hands but punishes a priest who gets caught.\n\nYou win by layering Fear on the enemy healer during a Mortal Strike window, then bursting with Recklessness/Death Wish. If the kill doesn't land, Mana Burn keeps you ahead in the attrition game.",
      winCondition:
        "Land a kill during a Fear on the enemy healer with Mortal Strike active, or Mana Burn the healer out over a long game while Fear peels keep your priest safe.",
      cooldownTimeline:
        "Warrior opens pressure; priest Fears the healer as the warrior lines up Recklessness + Death Wish + trinket. Psychic Scream to peel a swap, Mana Burn every spare global. Trinket + reposition if the priest gets trained.",
      positioning:
        "Priest pillars tightly; warrior peels for the priest with Intervene/Fear support. Don't let both of you get feared off the same DR.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay:
            "The warlock's dispel-punish and UA make your priest miserable. Train the warlock through Fear DR and force the pet-less lock into panic Death Coils.",
        },
      ],
      tips: [
        "Track your own Fear DR — don't waste the reset Fear.",
        "Mana Burn is not optional; it's half your win condition.",
        "Reflect Fear/Poly and let the priest dispel the rest.",
      ],
      requiredGear: [
        "Priest needs enough resilience to eat a full swap and live",
        "Warrior: weapon + resilience first",
      ],
    },
  },
  {
    id: "warlock-disc-priest-2s",
    name: "Warlock / Disc Priest",
    bracket: "2s",
    members: [
      { class: "warlock", spec: "affliction" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "S",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Fear-chain lockdown makes the enemy nearly unplayable",
      "Unstable Affliction punishes every dispel",
      "Two Fear sources = permanent control of a target",
    ],
    weaknesses: [
      "High skill floor — a dropped Fear chain can lose the game instantly",
      "Squishy under a coordinated melee swap before Fears land",
    ],
    keyCounters: ["rogue-disc-priest-2s"],
    keyFavors: ["warrior-holy-paladin-2s", "ret-holy-paladin-2s"],
    blurb:
      "'Lockarena.' Double-Fear control makes the enemy team play in slow motion while UA and DoTs tick them down and Mana Burn/dispel keep you ahead. The highest control ceiling in 2s.",
    guide: {
      overview:
        "Warlock/Priest wins by removing the enemy's ability to act. Between the warlock's Fear and the priest's Fear/Psychic Scream you can keep one target locked while DoTs and Unstable Affliction do the killing. Every dispel the enemy attempts on UA silences and damages them.\n\nThis is one of the hardest 2s comps to pilot: your Fear chains must be clean, your DoT spread constant, and your priest must survive the early swap before your control comes online. Reward for mastery is enormous.",
      winCondition:
        "Establish a Fear chain on one target, spread DoTs + Unstable Affliction on the rest, and let ticking damage + dispel punishment kill while the enemy is never free to play.",
      cooldownTimeline:
        "Open: DoT everything, UA the likely dispel target. Fear the kill target; priest Fears/Screams to cover the DR gaps. Death Coil to reset a melee swap. Trinket the first hard CC on the priest, then re-establish control.",
      positioning:
        "Both casters play a pillar and layer LoS so the enemy can't reach both of you. Keep the priest behind the warlock; the lock can self-peel with Fear + Coil.",
      counters: [
        {
          compId: "rogue-disc-priest-2s",
          howToPlay:
            "A rogue can Blind-swap your Fear chains and burst your priest. Pre-Shield, Death Coil the rogue out of the opener, and don't over-commit DoTs before you've survived the first stun window.",
        },
      ],
      tips: [
        "Never dispel greedily — UA is a trap you set for them, not a race you enter.",
        "Keep Fear DR clean between your two Fear sources.",
        "Death Coil is a reset and an interrupt; hold it for the swap, not for damage.",
      ],
      requiredGear: [
        "Warlock needs resilience + stamina to survive the opener before control lands",
        "Priest wants Mana Burn throughput and dispel-resist where available",
      ],
    },
  },
  {
    id: "warlock-holy-paladin-2s",
    name: "Warlock / Holy Paladin",
    bracket: "2s",
    members: [
      { class: "warlock", spec: "affliction" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 2,
    strengths: [
      "Unkillable healer + Fear control is a brutal attrition engine",
      "UA punishes dispels, paladin ignores your mana",
      "Very hard to burst down",
    ],
    weaknesses: [
      "No Mana Burn — slowest kills in the bracket",
      "Loses patience games to double-Fear priest comps",
    ],
    keyCounters: ["warlock-disc-priest-2s", "rogue-disc-priest-2s"],
    keyFavors: ["warrior-holy-paladin-2s"],
    blurb:
      "Fear control plus the tankiest healer alive. You almost never lose your healer, and DoT pressure eventually wins — but without Mana Burn your kills are slow, so patience is the whole game.",
    guide: {
      overview:
        "This comp is a war of attrition you're built to win against DPS-heavy teams: the paladin is nearly unkillable and the warlock's Fear + DoTs grind the enemy down. The lack of Mana Burn means you can't force a patient healer team, so pick your queues.\n\nPlay it slow: full DoT uptime, Fear the kill target, and let the paladin freedom/cleanse the warlock through any peel. Bank cooldowns for when the enemy healer finally dips low on mana.",
      winCondition:
        "Grind the enemy down with permanent DoT + Fear pressure while your paladin refuses to die; close when their healer is low or CC'd.",
      cooldownTimeline:
        "DoT spread → UA the dispeller → Fear the kill target. Paladin Freedoms the lock and cleanses to keep DoTs off. Trinket the first hard swap; bubble to reset a lost opener.",
      positioning:
        "Paladin pillars; warlock plays behind with Fear self-peels. Freedom pre-empts every snare on the lock.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay:
            "They out-control and Mana Burn you. You cannot win a patience game — force early aggression on their squishier priest during your Fear windows.",
        },
      ],
      tips: [
        "Patience wins — don't force kills you can't finish.",
        "Cleanse DoTs off the warlock so a melee swap never sticks.",
        "Fear to peel, then re-DoT; uptime is your damage.",
      ],
      requiredGear: [
        "Paladin: resilience + mp5 for very long games",
        "Warlock: stamina + resilience, survivability over raw power",
      ],
    },
  },
  {
    id: "shadow-priest-rogue-2s",
    name: "Shadow Priest / Rogue",
    bracket: "2s",
    members: [
      { class: "priest", spec: "shadow" },
      { class: "rogue", spec: "subtlety" },
    ],
    tier: "A",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "Enormous burst: rogue stunlock + Shadow Word: Death + Mind Blast",
      "Dispersion/Fear self-peel keeps the priest alive",
      "Vampiric Touch/Embrace sustains the priest's mana and health",
    ],
    weaknesses: [
      "No true healer — loses to any team you can't kill fast",
      "Priest folds if caught without Fear/trinket up",
    ],
    keyCounters: ["warrior-holy-paladin-2s", "rogue-holy-paladin-2s"],
    keyFavors: ["frost-mage-disc-priest-2s"],
    blurb:
      "'Shadow cleave lite.' Two burst dealers with no real healer — you kill fast or you lose. When the rogue's stun lines up with the priest's Shadow burst, almost nothing survives the window.",
    guide: {
      overview:
        "Shadow/Rogue is a glass-cannon burst comp. You have no dedicated healer, so every game is a race: land a Cheap Shot → Kidney window with the priest's Mind Blast + Shadow Word: Death stacked on top, and the target simply dies.\n\nAgainst healer comps you must create the kill before dampening or peels matter. Vampiric Embrace and Fear keep you in games longer than a pure double-DPS should be, but patience is not your friend.",
      winCondition:
        "Combine a rogue stunlock with the Shadow Priest's Mind Blast/SW:D burst to delete a target inside one CC window, before the enemy healer can respond.",
      cooldownTimeline:
        "Rogue opens Cheap Shot → priest Mind Blast + SW:P already ticking. Kidney Shot → priest dumps Mind Blast + Shadow Word: Death + trinket/AR from the rogue. Fear to peel or extend; Dispersion to survive a swap onto the priest.",
      positioning:
        "Priest plays just behind the rogue with Fear ready to self-peel; rogue commits to the kill target. Don't let the priest get opened on without trinket up.",
      counters: [
        {
          compId: "warrior-holy-paladin-2s",
          howToPlay:
            "You can't out-sustain a paladin. Tunnel the warrior instead — a Shadow burst + stun on the warrior forces bubbles and can steal the game before mana matters.",
        },
      ],
      tips: [
        "Vampiric Touch keeps the priest topped on mana — keep it rolling.",
        "SW:D is a burst finisher; watch the self-damage backlash.",
        "Fear early to protect the priest; you have no second healer.",
      ],
      requiredGear: [
        "Priest needs resilience + stamina to survive a swap and enough shadow power to threaten kills",
        "Rogue: standard burst setup, weapon first",
      ],
    },
  },
  {
    id: "frost-mage-disc-priest-2s",
    name: "Frost Mage / Disc Priest",
    bracket: "2s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 2,
    strengths: [
      "Permanent kiting + Polymorph control against melee",
      "Shatter combos delete squishy targets",
      "Mana Burn + Poly locks out healer teams",
    ],
    weaknesses: [
      "Struggles vs other control (double Fear) comps",
      "Both squishy — a lost Nova can mean a dead mage",
    ],
    keyCounters: ["warlock-disc-priest-2s", "rogue-disc-priest-2s"],
    keyFavors: ["warrior-holy-paladin-2s", "warrior-disc-priest-2s"],
    blurb:
      "The anti-melee comp. A Frost Mage kites warriors and rogues into oblivion while Polymorph and Mana Burn dismantle healer teams. Shatter burst finishes anyone who gets caught in a Nova.",
    guide: {
      overview:
        "Frost Mage/Priest wins with control. Against melee you kite endlessly with Frost Nova, Blink, and slows while chipping with Ice Lance/Frostbolt; against casters you Polymorph + Mana Burn to lock them out of the game.\n\nThe burst comes from Shatter: a target frozen by Nova or Frostbite takes a guaranteed-crit Ice Lance + Frostbolt combo. Land that during a Poly on the healer and the kill is instant.",
      winCondition:
        "Kite melee comps until they're out of position, then Shatter-burst a target during a Polymorph on the healer; or Poly + Mana Burn a caster team out of mana.",
      cooldownTimeline:
        "Poly the off-target → Frostbolt the kill target to proc Frostbite → Frost Nova → Shatter combo (Ice Lance + Frostbolt) + Icy Veins + trinket. Blink out of any melee re-engage. Priest Mana Burns and covers with Shield/Fear.",
      positioning:
        "Mage plays the open ground it needs to kite; priest pillars. Keep max distance from melee and never get double-swapped in the open.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay:
            "Fear chains beat your control. Poly the priest, tunnel the warlock, and Ice Block the first Fear so you don't get chained off your kill.",
        },
      ],
      tips: [
        "Frostbite procs enable free Shatters — Frostbolt uptime is your burst setup.",
        "Ice Block resets Fear/DoTs and buys a Poly re-cast.",
        "Blink is a defensive and offensive tool — don't waste it on a snare you can walk out of.",
      ],
      requiredGear: [
        "Mage needs resilience + stamina to survive a caught opener",
        "Priest: Mana Burn throughput + resilience",
      ],
    },
  },
  {
    id: "ret-holy-paladin-2s",
    name: "Ret Paladin / Holy Paladin",
    bracket: "2s",
    members: [
      { class: "paladin", spec: "retribution" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "B",
    playstyle: "burst",
    difficulty: 1,
    strengths: [
      "Huge burst windows with Avenging Wrath + trinket",
      "Freedom + BoP make the Ret impossible to peel or kill",
      "Very easy to pilot",
    ],
    weaknesses: [
      "No hard CC and no Mana Burn — kites and patience beat you",
      "Predictable burst that good teams simply peel/LoS",
    ],
    keyCounters: ["frost-mage-disc-priest-2s", "warlock-disc-priest-2s"],
    keyFavors: [],
    blurb:
      "'Ret/Holy.' All-in burst with unmatched melee uptime — Freedom and Blessing of Protection mean the Ret never gets kited or trained off. Ceiling is capped by no CC, but the floor is very high.",
    guide: {
      overview:
        "Ret/Holy is a burst-and-uptime comp with an unusually high floor. Blessing of Freedom keeps the Ret on target and Blessing of Protection resets any melee train onto him. You look for a single big Avenging Wrath window to force a kill.\n\nThe ceiling is limited: with no hard CC and no Mana Burn, control and kiting comps beat you at higher ratings. But into most ladder teams the raw burst and un-peelable uptime carry.",
      winCondition:
        "Land an Avenging Wrath + trinket + Freedom burst on a target the enemy healer can't out-heal in one window.",
      cooldownTimeline:
        "Ret builds up on the kill target → pop Avenging Wrath + trinket + Freedom → holy paladin bursts heals only to cover the trade. BoP the Ret if he gets trained; bubble the healer to reset a bad opener.",
      positioning:
        "Ret sticks to target; holy paladin pillars. Freedom pre-empts snares so the burst window is never kited out.",
      counters: [
        {
          compId: "frost-mage-disc-priest-2s",
          howToPlay:
            "The mage kites your only damage. Freedom through the Nova chain, tunnel the mage, and force an Ice Block early — you have no way to win a long kite, so all-in fast.",
        },
      ],
      tips: [
        "Freedom is your enabler — the Ret should never be snared during a burst.",
        "Blessing of Protection is a full melee reset; use it, don't hoard it.",
        "You have no CC — commit your burst windows fully, don't half-send.",
      ],
      requiredGear: [
        "Ret: resilience + a big two-hander for burst",
        "Holy paladin: resilience + mp5",
      ],
    },
  },
  {
    id: "resto-druid-warrior-2s",
    name: "Resto Druid / Warrior",
    bracket: "2s",
    members: [
      { class: "druid", spec: "restoration" },
      { class: "warrior", spec: "arms" },
    ],
    tier: "B",
    playstyle: "sustain",
    difficulty: 3,
    strengths: [
      "HoT-based healing is nearly impossible to fully shut down",
      "Cyclone removes a healer from a kill attempt entirely",
      "Warrior Mortal Strike + druid peels create real kill pressure",
    ],
    weaknesses: [
      "Druid has a small mana pool and folds to Mana Burn/heavy swaps",
      "Very high skill floor — bad kiting loses instantly",
    ],
    keyCounters: ["warlock-disc-priest-2s", "rogue-disc-priest-2s"],
    keyFavors: ["ret-holy-paladin-2s"],
    blurb:
      "A mobile, high-skill comp. The druid kites and HoTs while Cyclone locks the enemy healer out of a kill; the warrior applies Mortal Strike pressure. Rewards elite kiting, punishes everything else.",
    guide: {
      overview:
        "Druid/Warrior is a kiting-and-peeling comp built on HoT healing and Cyclone control. The druid stays mobile, rolls Lifebloom/Rejuv on the warrior, and Cyclones the enemy healer out of every kill attempt while the warrior lands Mortal Strike windows.\n\nIt has a high skill floor: the druid's small mana pool means you lose long Mana Burn games, and a druid who gets caught or kites poorly dies fast. But in expert hands the mobility and Cyclone control beat comps that can't force the druid OOM.",
      winCondition:
        "Cyclone the enemy healer during a Mortal Strike burst so the kill target has no healing, while your HoTs and kiting keep you both alive.",
      cooldownTimeline:
        "Warrior opens pressure; druid pre-HoTs and Cyclones the enemy healer as the warrior pops Recklessness + Death Wish + trinket. Barkskin + kite if the druid is swapped; Travel Form to reset spacing.",
      positioning:
        "Druid uses the whole arena to kite; warrior peels for the druid with Intervene/Hamstring. Never let the druid get cornered by melee.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay:
            "They Mana Burn your small pool and DoT through HoTs. You must kill fast — Cyclone the priest and all-in the warrior's burst before your mana runs out.",
        },
      ],
      tips: [
        "Cyclone is your kill-setup CC — save it for the burst, not for peeling.",
        "Watch your mana; you cannot win a long game, so force kills.",
        "Barkskin + LoS to survive swaps; HoTs do the healing while you run.",
      ],
      requiredGear: [
        "Druid needs resilience + as much mana/int as it can carry",
        "Warrior: weapon + resilience, Mortal Strike uptime is the win con",
      ],
    },
  },

  // ---------------------------------------------------------------- 3v3
  {
    id: "rmp-3s",
    name: "RMP (Rogue / Mage / Priest)",
    bracket: "3s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "mage", spec: "frost" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "S",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "The most controlled setup comp in the game — layered CC on the healer",
      "Shatter + rogue burst deletes a target in one window",
      "Priest peels and Mana Burns; near-total board control",
    ],
    weaknesses: [
      "High execution — a dropped CC chain wastes the whole setup",
      "Vulnerable to instant-cast cleaves (warrior/druid, TSG) that ignore your CC",
    ],
    keyCounters: ["tsg-3s", "wld-3s"],
    keyFavors: ["mld-3s", "wmp-3s"],
    blurb:
      "The iconic TBC 3s comp. Sap, Sheep, and Blind chain the enemy healer out of the game while the mage's Shatter combo and the rogue's stunlock delete a DPS. Pure setup, pure control, highest skill ceiling.",
    guide: {
      overview:
        "RMP is the definitive control comp of TBC. You open with layered crowd control — Sap the healer, Sheep a DPS, Blind the third — then burst a target with the mage's Shatter combo stacked on the rogue's stunlock. Everything is a setup for one clean kill window.\n\nThe comp demands perfect CC chains: your Polymorph, Sap, Blind, and Cheap Shot must be sequenced so the enemy healer never gets a cast off during your burst. The priest layers Fear/Mana Burn and peels the melee that come for the mage. It has the highest ceiling and the highest skill floor in the bracket.",
      winCondition:
        "Chain-CC the enemy healer (Sap → Poly/Fear/Blind) so they can't heal during a Shatter + Kidney Shot burst that kills a DPS before the CC breaks.",
      cooldownTimeline:
        "Setup: Sap the healer pre-round. Open → Sheep one DPS, Cheap Shot the kill target. Mage Frostbolt → Frost Nova → Shatter combo (Ice Lance + Frostbolt + Icy Veins) while rogue Kidney Shots and burns AR/trinket. Priest Fears/Mana Burns the healer to extend the lockout. Reset with Vanish/Ice Block/Fear if the kill doesn't land.",
      positioning:
        "Mage and priest play a pillar for LoS; rogue roams to the kill target. Keep the priest peeled from enemy melee so the CC chain never breaks early.",
      counters: [
        {
          compId: "tsg-3s",
          howToPlay:
            "Instant cleave pressure ignores your CC setup and trains your mage/priest. Play defensively, kite with Nova/Blind, and burst only when you've peeled both warriors — don't try to out-tempo them, out-control them.",
        },
      ],
      tips: [
        "Sap the healer before the gates open to start ahead on CC.",
        "Never blow the full CC chain without the burst ready — CC without a kill is wasted.",
        "Ice Block and Vanish are reset buttons; a clean re-open beats forcing a bad kill.",
      ],
      requiredGear: [
        "All three want resilience; the mage and priest need stamina to survive cleave swaps",
        "Rogue needs weapon-first burst; mage needs enough spell power for a lethal Shatter",
      ],
    },
  },
  {
    id: "rls-3s",
    name: "RLS (Rogue / Lock / Shaman)",
    bracket: "3s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "warlock", spec: "affliction" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "S",
    playstyle: "cleave",
    difficulty: 3,
    strengths: [
      "Relentless pressure with no setup required — always doing damage",
      "Fear + rogue CC + purge dismantles healer comps",
      "Earth Shield + Nature's Swiftness make the shaman incredibly sticky",
    ],
    weaknesses: [
      "Shaman has no hard peel besides Frost Shock — vulnerable to trained melee",
      "Loses to comps that can burst the shaman through Earth Shield",
    ],
    keyCounters: ["tsg-3s", "wld-3s"],
    keyFavors: ["rmp-3s", "mld-3s"],
    blurb:
      "The premier pressure comp. Where RMP sets up, RLS just applies — constant DoTs, Fear, and rogue pressure with a Resto Shaman that refuses to die. Trades RMP's control ceiling for a higher floor and better cleave matchups.",
    guide: {
      overview:
        "RLS is a sustained-pressure cleave. Instead of a single scripted kill window, you apply constant damage — warlock DoTs + UA, rogue melee pressure, and Fear control — until a target cracks. The Resto Shaman's Earth Shield, Nature's Swiftness, and Grounding Totem make it one of the stickiest healers in the game.\n\nYou win by never letting up: DoTs on everything, Fear the healer, purge their buffs, and let the rogue burst when the enemy is low. It's more forgiving than RMP because you're always doing damage, and it matches up better into cleave comps that punish RMP's setup.",
      winCondition:
        "Grind constant DoT + rogue pressure while Fear-controlling the enemy healer, then burst a low target with rogue cooldowns + a Fear on the healer.",
      cooldownTimeline:
        "Warlock spreads DoTs + UA immediately; rogue opens Cheap Shot on the kill target. Fear the healer → rogue Kidney + AR/trinket + warlock burst. Shaman keeps Earth Shield on the focused ally, Grounding the key CC, Nature's Swiftness for the clutch heal.",
      positioning:
        "Warlock and shaman play a pillar; rogue roams. Shaman uses Frost Shock/Earthbind to self-peel and Grounds the swap CC.",
      counters: [
        {
          compId: "tsg-3s",
          howToPlay:
            "Double-warrior pressure can burst your shaman through Earth Shield. Peel hard with Fear + rogue stuns on the warriors, and use Nature's Swiftness proactively before the shaman gets low.",
        },
      ],
      tips: [
        "Purge is free tempo — strip Freedom, HoTs, and shields constantly.",
        "Grounding Totem eats the CC that would start a kill on your shaman.",
        "Never dispel UA'd enemies for them — let the punishment stack.",
      ],
      requiredGear: [
        "Shaman needs resilience + mp5 and Earth Shield uptime",
        "Rogue and warlock want resilience + stamina for the pressure trades",
      ],
    },
  },
  {
    id: "wld-3s",
    name: "WLD (Warrior / Lock / Druid)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "warlock", spec: "affliction" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Warrior + warlock pressure with Cyclone control on the enemy healer",
      "Mortal Strike + DoTs make healing hard to keep up with",
      "Druid mobility keeps the comp alive against burst",
    ],
    weaknesses: [
      "Druid folds to Mana Burn and heavy swaps",
      "Less CC on the kill target than setup comps",
    ],
    keyCounters: ["rmp-3s", "wmp-3s"],
    keyFavors: ["tsg-3s", "mld-3s"],
    blurb:
      "Warrior/Lock pressure married to Druid mobility and Cyclone. Constant Mortal Strike + DoT damage while the druid kites and locks the enemy healer out with Cyclone. Strong cleave with real staying power.",
    guide: {
      overview:
        "WLD is a pressure cleave with a mobile healer. The warrior and warlock apply relentless Mortal Strike + DoT damage while the druid kites, HoTs, and Cyclones the enemy healer out of kill windows. It's a strong, flexible comp that punishes immobile healer teams.\n\nThe druid's small mana pool is the liability: against Mana Burn or comps that force the druid to hardcast, you can run out of gas. Play to your pressure and Cyclone control, and force kills before the long game.",
      winCondition:
        "Cyclone the enemy healer during a Mortal Strike + DoT burst so the kill target is unhealed, while the druid's mobility keeps your team topped.",
      cooldownTimeline:
        "Warlock DoTs + UA; warrior trains the kill target with Mortal Strike. Druid Cyclones the enemy healer as the warrior pops Recklessness/Death Wish + trinket and the lock bursts. Barkskin + kite when the druid is swapped.",
      positioning:
        "Druid kites wide; warrior and lock apply pressure. Peel for the druid with Fear + Intervene when melee swaps to it.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay:
            "RMP chain-CCs your druid and bursts you down. Trinket the opener CC on the druid, spread pressure to break their setup, and force the mage to Block early.",
        },
      ],
      tips: [
        "Cyclone the healer for kills, not the DPS — timing beats spamming it.",
        "Purge/Fear to enable the warrior's Mortal Strike windows.",
        "Mind the druid's mana; force kills before a patience game.",
      ],
      requiredGear: [
        "Druid: resilience + mana; warrior: weapon-first",
        "Warlock: stamina + resilience for pressure trades",
      ],
    },
  },
  {
    id: "wmp-3s",
    name: "WMP (Warrior / Mage / Priest)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "mage", spec: "frost" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "A",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "Massive burst: Shatter combo + Mortal Strike in one window",
      "Sheep + Fear + Mana Burn give strong healer control",
      "More forgiving than RMP with similar burst",
    ],
    weaknesses: [
      "Priest squishier than a shaman/paladin under cleave",
      "Kited comps can juke the warrior's uptime",
    ],
    keyCounters: ["rls-3s", "tsg-3s"],
    keyFavors: ["rmp-3s", "mld-3s"],
    blurb:
      "Trade RMP's rogue for a warrior: less CC on the kill target, more raw burst and healing pressure. Shatter + Mortal Strike stacks huge damage while Poly and Mana Burn lock the enemy healer.",
    guide: {
      overview:
        "WMP is a burst comp with strong healer control. The mage sets up a Shatter combo while the warrior lands Mortal Strike, so a single Nova window can stack enormous damage on a target. The priest layers Polymorph/Fear/Mana Burn to keep the enemy healer off the kill.\n\nCompared to RMP it has less lockdown on the kill target (no Sap/Blind/Cheap Shot chain) but higher raw burst and better sustain from the warrior. It's more forgiving to pilot while keeping much of the ceiling.",
      winCondition:
        "Land a Shatter combo + Mortal Strike burst on a target while the enemy healer is Polymorphed/Feared, killing before the CC breaks.",
      cooldownTimeline:
        "Poly the healer → mage Frostbolt → Frost Nova → Shatter combo + Icy Veins while the warrior pops Recklessness/Death Wish + trinket with Mortal Strike up. Priest Mana Burns/Fears to extend the lockout. Reset with Ice Block/Fear.",
      positioning:
        "Mage + priest pillar for LoS; warrior trains the kill target. Peel the priest from enemy melee so the CC chain holds.",
      counters: [
        {
          compId: "rls-3s",
          howToPlay:
            "RLS out-pressures your squishier priest. Poly the rogue on the swap, Mana Burn the shaman, and Spell Reflect the warlock Fear so your priest survives to control.",
        },
      ],
      tips: [
        "Stack the burst — the warrior's Mortal Strike must be up for the Shatter kill.",
        "Sheep the healer, not the DPS, for kill setups.",
        "Spell Reflect Fears/Polys aimed at your team.",
      ],
      requiredGear: [
        "Priest: resilience + Mana Burn throughput",
        "Warrior weapon-first; mage needs a lethal Shatter",
      ],
    },
  },
  {
    id: "mld-3s",
    name: "MLD (Mage / Lock / Druid)",
    bracket: "3s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "warlock", spec: "affliction" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Double caster control: Poly + Fear + Cyclone layered endlessly",
      "DoTs + Shatter give both sustain and burst",
      "Extremely hard for melee to reach anyone",
    ],
    weaknesses: [
      "Very squishy if the control chain drops",
      "Druid mana under pressure is the weak link",
    ],
    keyCounters: ["tsg-3s", "rls-3s"],
    keyFavors: ["rmp-3s", "wmp-3s"],
    blurb:
      "A pure caster-control comp. Polymorph, Fear, and Cyclone layer into near-permanent lockdown while DoTs and Shatter combos kill. Dizzying to play and to play against — a control clinic when piloted well.",
    guide: {
      overview:
        "MLD is double-caster control with a druid healer. Between Polymorph, Fear, and Cyclone you can keep multiple enemies CC'd almost permanently while warlock DoTs and mage Shatter combos do the killing. It's one of the most oppressive control comps against other casters and setup teams.\n\nThe cost is fragility: if your control chain drops or your druid is forced OOM, you have little raw survivability. It demands crisp CC layering and disciplined DoT/kite play.",
      winCondition:
        "Layer Poly + Fear + Cyclone so the enemy team can't act, then kill through DoTs + a Shatter combo on a controlled target.",
      cooldownTimeline:
        "Poly one target, Fear another, DoT everything. Cyclone the enemy healer on the kill attempt → mage Nova + Shatter combo + warlock burst. Druid kites and re-HoTs; Ice Block/Barkskin to reset if control slips.",
      positioning:
        "All three play LoS off a pillar and kite; keep max distance from melee. Cross-peel with Nova/Fear/Cyclone.",
      counters: [
        {
          compId: "tsg-3s",
          howToPlay:
            "Instant cleave ignores your control and trains a caster. Kite relentlessly, Cyclone a warrior, and burst only when you've created space — never stand and trade.",
        },
      ],
      tips: [
        "Layer CC on different DR categories so nothing overlaps.",
        "Cyclone is your reset and your kill-setup — spend it deliberately.",
        "Protect the druid's mana; a dry druid ends the game.",
      ],
      requiredGear: [
        "All three want resilience + stamina; the druid needs mana longevity",
        "Mage needs a lethal Shatter, warlock needs DoT power",
      ],
    },
  },
  {
    id: "lsd-3s",
    name: "LSD (Lock / Shaman / Druid)",
    bracket: "3s",
    members: [
      { class: "warlock", spec: "affliction" },
      { class: "shaman", spec: "elemental" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "sustain",
    difficulty: 3,
    strengths: [
      "Two Fear sources + Cyclone = brutal, endless control",
      "Purge + Fear + DoT attrition wears down any comp",
      "Very hard to kill — druid + shaman off-heals + totems",
    ],
    weaknesses: [
      "Low burst — relies on grinding, loses fast games rarely but slow ones can favor patient teams",
      "Complex CC coordination; punishing to misplay",
    ],
    keyCounters: ["rmp-3s", "wmp-3s"],
    keyFavors: ["tsg-3s", "wld-3s"],
    blurb:
      "A control-attrition comp that got stronger as TBC went on. Elemental Shaman utility + double Fear + Cyclone create relentless control while DoTs grind the enemy out. Wins the long game against almost anyone.",
    guide: {
      overview:
        "LSD is a sustain-control comp built to win long games. The warlock and shaman bring Fear, purge, and totem utility while the druid keeps everyone alive with HoTs and Cyclone. You control the enemy relentlessly and let DoT + Shock damage grind them down.\n\nBurst is your weakness — you rarely delete a target quickly — so you play for tempo and attrition, forcing the enemy healer OOM through Fear pressure and purge while your own healing is nearly impossible to fully break.",
      winCondition:
        "Grind the enemy down with layered Fear/Cyclone control and purge pressure until their healer is out of mana or a target is caught without cover.",
      cooldownTimeline:
        "Spread DoTs + UA, purge key buffs. Fear the healer (rotate warlock/druid Cyclone/shaman Hex-equivalent utility) → Shock + DoT burst on the kill target. Grounding/Tremor totems eat the enemy's CC; Nature's Swiftness for clutch heals.",
      positioning:
        "All three play pillars and totem ranges; kite melee with Earthbind/Frost Shock. Layer LoS so no two members are exposed at once.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay:
            "RMP can burst a target through your sustain in one setup. Tremor/Grounding their CC, trinket the kill-target CC, and pressure the mage/priest so they can't freely set up.",
        },
      ],
      tips: [
        "Purge is constant value — strip every Freedom, shield, and HoT.",
        "Rotate Fear/Cyclone so control never has a gap.",
        "You win long — don't force a fast kill you don't have.",
      ],
      requiredGear: [
        "Shaman + druid need resilience + mp5 for long games",
        "Warlock: stamina + DoT power for the attrition plan",
      ],
    },
  },
  {
    id: "tsg-3s",
    name: "TSG (Warrior / Warrior / Shaman)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "warrior", spec: "fury" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "cleave",
    difficulty: 1,
    strengths: [
      "Overwhelming instant burst that ignores enemy CC setups",
      "Two Mortal Strikes shut down enemy healing",
      "Very simple game plan — train and swap",
    ],
    weaknesses: [
      "Kited and controlled by caster comps (RMP, MLD)",
      "Shaman with no hard peel can be bursted or CC'd off the team",
    ],
    keyCounters: ["rmp-3s", "mld-3s", "lsd-3s"],
    keyFavors: ["rls-3s", "wmp-3s", "wld-3s"],
    blurb:
      "'Double warrior.' The TBC stand-in for melee cleave: two warriors train a target with instant Mortal Strike pressure while a Resto Shaman keeps them up. Ignores CC setups, gets kited by casters. High floor, capped ceiling.",
    guide: {
      overview:
        "TSG is the melee-cleave archetype in TBC 3s: two warriors apply instant, un-setup-able pressure while a Resto Shaman sustains them. Because your damage is all instant melee, you ignore the CC chains that setup comps rely on — you just charge in and train.\n\nThe weakness is range: caster-control comps (RMP, MLD, LSD) kite and CC you out of every kill. Against them you have to peel for your shaman and pick your swaps carefully. Into other cleaves and pressure comps, your raw burst dominates.",
      winCondition:
        "Train a target with double Mortal Strike pressure and coordinated Intercept swaps until it dies, ignoring the enemy's CC setup with instant melee damage.",
      cooldownTimeline:
        "Both warriors charge the kill target → Mortal Strike + Recklessness/Death Wish + trinkets stacked in one window. Intercept-swap to a caster if peeled. Shaman keeps Earth Shield rolling, Grounds the CC, Nature's Swiftness to survive burst.",
      positioning:
        "Warriors stick to the target and cover the shaman; shaman uses Frost Shock/Earthbind and totems to peel. Don't let the shaman get isolated by a caster team.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay:
            "RMP kites and chain-CCs you. Split the warriors to pressure both mage and priest, Spell Reflect the key CC, and peel for the shaman with Intercept/Hamstring on the rogue.",
        },
      ],
      tips: [
        "Spell Reflect is your anti-caster button — reflect Poly/Fear.",
        "Peel for the shaman first; if the shaman lives, you win the trade.",
        "Swap on a bad opener rather than tunneling into a peel.",
      ],
      requiredGear: [
        "Both warriors: weapon + resilience first",
        "Shaman: resilience + mp5 and Earth Shield uptime",
      ],
    },
  },
  {
    id: "php-3s",
    name: "PHP (Paladin / Hunter / Priest)",
    bracket: "3s",
    members: [
      { class: "paladin", spec: "retribution" },
      { class: "hunter", spec: "beast-mastery" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "B",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "Big burst windows: Ret + hunter + pet in one go",
      "Hunter traps + priest CC give real healer control",
      "Freedom keeps the melee un-kiteable",
    ],
    weaknesses: [
      "Predictable burst that control comps peel and reset",
      "Falls off in long games with no Mana Burn from the paladin side",
    ],
    keyCounters: ["rmp-3s", "mld-3s"],
    keyFavors: ["tsg-3s"],
    blurb:
      "A burst-and-control 3s: Ret + Hunter stack a big damage window while the priest and hunter traps lock the enemy healer. Freedom keeps the Ret on target. Strong burst, beatable by patient control.",
    guide: {
      overview:
        "PHP looks for a single coordinated burst window: the Ret's Avenging Wrath, the hunter's cooldowns and pet, and the priest's CC on the enemy healer all at once. Freezing Trap + Fear give you enough healer control to force the kill.\n\nAgainst control comps the burst is predictable and gets peeled/reset, and without Mana Burn you don't win patient games. But into cleave and tempo comps the burst is lethal and the healer control is strong.",
      winCondition:
        "Trap/CC the enemy healer, then stack Ret + hunter + pet burst on a target inside that window to kill before it breaks.",
      cooldownTimeline:
        "Hunter Freezing Trap the healer → priest Fear to cover → Ret Avenging Wrath + trinket + hunter cooldowns + pet on the kill target. Freedom on the Ret; priest peels and Mana Burns. Reset if the trap/Fear is trinketed.",
      positioning:
        "Hunter plays range and traps; Ret sticks to the target with Freedom; priest pillars. Keep the priest safe so the CC chain holds.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay:
            "RMP resets your burst with Ice Block/Vanish and out-controls you. Bait the trinket, then re-trap the healer; pressure the mage so it can't freely set up.",
        },
      ],
      tips: [
        "Trap the healer, not the DPS, for your burst window.",
        "Freedom keeps the Ret on target — pre-empt the snare.",
        "Layer Fear + Trap on separate DR so the lockout holds.",
      ],
      requiredGear: [
        "Ret + hunter: resilience and burst weapons/ranged",
        "Priest: resilience + Mana Burn throughput",
      ],
    },
  },

  // ---------------------------------------------------------------- 5v5
  {
    id: "melee-cleave-5s",
    name: "5s Melee Cleave",
    bracket: "5s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "rogue", spec: "combat" },
      { class: "paladin", spec: "holy" },
      { class: "priest", spec: "discipline" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "cleave",
    difficulty: 1,
    strengths: [
      "Overwhelming single-target burst with double healer backing",
      "Mortal Strike + rogue burst kills through most 5s healing",
      "Simple, high-floor game plan",
    ],
    weaknesses: [
      "Kited and CC'd by caster-control 5s setups",
      "Relies on calling clean swaps to break double/triple healing",
    ],
    keyCounters: ["caster-cleave-5s", "double-healer-control-5s"],
    keyFavors: [],
    blurb:
      "The default competitive 5s archetype: stacked melee burst (warrior + rogue) behind two or three healers. 5s in TBC is less rigid than 2s/3s — think in team archetypes, and melee cleave is the highest-floor one.",
    guide: {
      overview:
        "5s in TBC is far less standardized than 2s/3s, so it's best to think in archetypes rather than fixed comps. Melee cleave is the highest-floor archetype: stack a warrior + rogue for single-target burst behind a double/triple healer core, and simply out-swap the enemy.\n\nYou win by calling clean, fast swaps — CC the enemy healers, train one target with Mortal Strike + rogue burst, and swap the moment a peel lands. The healer core (paladin + priest + shaman) makes you nearly impossible to kill first.",
      winCondition:
        "Call coordinated swaps and burst a single target through the enemy's healing while your double/triple healer core keeps your melee alive.",
      cooldownTimeline:
        "CC the enemy healers (Fear/Sap/Poly from support) → warrior + rogue stack burst + trinkets on the primary → swap on the peel. Healers rotate defensive cooldowns; Nature's Swiftness/bubble to cover the trained ally.",
      positioning:
        "Melee collapse on the kill target; healers spread behind LoS. Peel enemy melee off your casters/healers.",
      counters: [
        {
          compId: "caster-cleave-5s",
          howToPlay:
            "Ranged control kites your melee and CC's your healers. Tunnel a caster, use every gap-closer and Spell Reflect, and force their healers OOM with sustained pressure.",
        },
      ],
      tips: [
        "5s is about swaps and CC on healers — coordinate voice calls.",
        "Two Mortal Strikes or MS + Wound Poison shuts down enemy healing.",
        "Don't over-commit; reset and re-swap rather than tunneling a peel.",
      ],
      requiredGear: [
        "Melee: weapons + resilience first",
        "Healers: resilience + mp5 for long, chaotic games",
      ],
    },
  },
  {
    id: "caster-cleave-5s",
    name: "5s Caster Cleave",
    bracket: "5s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "warlock", spec: "affliction" },
      { class: "priest", spec: "shadow" },
      { class: "paladin", spec: "holy" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Layered ranged control locks the enemy out of the game",
      "AoE + focused caster burst kills through spread healing",
      "Kites melee cleaves indefinitely",
    ],
    weaknesses: [
      "Squishy if the control net breaks",
      "High coordination requirement across five ranged/CC kits",
    ],
    keyCounters: ["double-healer-control-5s"],
    keyFavors: ["melee-cleave-5s"],
    blurb:
      "The ranged-control 5s archetype: stacked casters (mage + lock + shadow priest) layering Poly, Fear, and Cyclone behind a healer core. Kites melee cleave and kills through control — high ceiling, high coordination.",
    guide: {
      overview:
        "Caster cleave is the ranged-control archetype in 5s. You stack Polymorph, Fear, and Cyclone across multiple casters to keep the enemy team perpetually controlled, then focus a target with layered caster burst. It's the natural counter to melee cleave, which it kites and CC's into oblivion.\n\nThe archetype demands heavy coordination — five ranged/CC kits layering control without overlapping DR — but the payoff is a game where the enemy barely gets to play. Protect your casters' positioning and never let the control net drop.",
      winCondition:
        "Blanket the enemy in layered ranged CC, then focus-burst a target through their healing while melee comps are kited and locked down.",
      cooldownTimeline:
        "Open with layered CC (Poly + Fear + Cyclone on different targets) → focus caster burst (Shatter + DoTs + Shadow burst) on the kill target while the enemy healers are CC'd. Kite, re-CC, and repeat; healers cover with Nature's Swiftness/bubble.",
      positioning:
        "All ranged play LoS and spacing off pillars; kite melee wide. Cross-peel with Nova/Fear/Cyclone so no caster is isolated.",
      counters: [
        {
          compId: "double-healer-control-5s",
          howToPlay:
            "Triple-healer control comps out-sustain your burst. You must generate a kill through overlapping CC — coordinate a full lockout on their healers and commit all burst at once.",
        },
      ],
      tips: [
        "Layer CC on separate DR categories to maximize lockdown.",
        "Kite melee — never stand and trade against a cleave.",
        "Commit focus burst only when the enemy healers are controlled.",
      ],
      requiredGear: [
        "All casters: resilience + stamina to survive a broken control net",
        "Healers: resilience + mp5",
      ],
    },
  },
  {
    id: "double-healer-control-5s",
    name: "5s Double-Healer Control",
    bracket: "5s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "mage", spec: "frost" },
      { class: "priest", spec: "discipline" },
      { class: "paladin", spec: "holy" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "sustain",
    difficulty: 2,
    strengths: [
      "Extremely hard to kill with a triple-healer-leaning core",
      "Balanced pressure + CC forces mistakes over time",
      "Wins attrition games almost by default",
    ],
    weaknesses: [
      "Low kill pressure — can time out or lose to hard burst swaps",
      "Passive play punished by decisive cleave swaps",
    ],
    keyCounters: ["melee-cleave-5s"],
    keyFavors: ["caster-cleave-5s"],
    blurb:
      "The attrition archetype: a healer-heavy core with a warrior + mage for pressure and CC. You almost never lose a teammate first and grind the enemy out — but you need a real kill condition to close, not just survive.",
    guide: {
      overview:
        "Double-healer control leans on survivability: a healer-heavy core (paladin + priest + druid tendencies) with a warrior for Mortal Strike pressure and a mage for CC. You're nearly impossible to kill first and you win by out-lasting and out-CCing the enemy.\n\nThe risk is passivity — with modest kill pressure you can time out or get caught by a decisive burst swap. Use the mage's control and the warrior's Mortal Strike to create real kill windows rather than only defending.",
      winCondition:
        "Out-sustain and out-control the enemy until their healers are OOM or a Mortal Strike + CC window lets you finally force a kill.",
      cooldownTimeline:
        "Control the enemy healers with Poly/Fear → warrior Mortal Strike pressure on the kill target → commit a coordinated burst when the enemy healer is CC'd. Rotate healer cooldowns defensively; don't over-extend.",
      positioning:
        "Healers spread behind LoS; warrior + mage create pressure and peel. Keep the core tight enough to cross-heal, spread enough to dodge AoE.",
      counters: [
        {
          compId: "melee-cleave-5s",
          howToPlay:
            "Fast swaps can burst through even your healing if you're passive. Peel aggressively, CC their melee, and don't let them get a free swap on a single healer.",
        },
      ],
      tips: [
        "You need a kill condition — don't just survive, create windows.",
        "CC enemy healers to convert your pressure into a kill.",
        "Watch the clock; passive play risks a timeout loss.",
      ],
      requiredGear: [
        "Healers: resilience + mp5 for very long games",
        "Warrior + mage: resilience, pressure/control tools first",
      ],
    },
  },

  // ---------------------------------------------------------------- added S2 comps
  {
    id: "rogue-druid-2s",
    name: "Rogue / Resto Druid",
    bracket: "2s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "S",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Best-in-class control: Cheap Shot, Kidney Shot, Blind, Sap and Cyclone stack more lockdown than any team can answer",
      "Near-infinite resets — Vanish, Preparation, Cloak of Shadows and rolling HoTs let you walk out of any bad opener",
      "Long games trend in your favor; the Druid outlasts almost every healer while the Rogue chips a target down",
    ],
    weaknesses: [
      "Struggles to close out teams that can also stall forever — drain Warlocks and kiting Mages drag games past your kill windows",
      "Low burst without setup; if the Rogue is peeled off the target, damage evaporates and you win only on attrition",
    ],
    keyCounters: [
      "warlock-druid-2s",
      "mage-druid-2s",
    ],
    keyFavors: [
      "warrior-shaman-2s",
      "ret-shaman-2s",
      "feral-rogue-2s",
    ],
    blurb:
      "The definitive control team of Season 2. A Subtlety Rogue and a Resto Druid don't out-damage anyone — they out-CC, out-reset, and out-last them, chaining stuns and Cyclones until the enemy healer is drier than a Silithus riverbed. Nearly unkillable, endlessly patient, and miserable to play against.",
    guide: {
      overview:
        "Rogue/Druid is the archetypal \"control\" comp: two players who between them can keep an opponent stunned, blinded, sapped, and cycloned for a genuinely absurd fraction of the match. The Rogue supplies the pressure and the burst windows; the Druid supplies immortality via instant HoTs, Cyclone, and a bottomless bag of resets. You rarely win in the opener — you win by forcing the enemy into a long game, denying their healer mana and casts, and eventually opening a stun chain nobody can heal through.\n\nThe skill ceiling is high because the comp is entirely about tempo and target discipline. A Druid who Cyclones on cooldown and keeps HoTs rolling, plus a Rogue who knows when to swap, when to Blind, and when to Vanish-reset, is one of the safest teams in the bracket. Played sloppily it just stalls forever; played well it grinds down everything short of another comp that can also stall to the enrage-free eternity.",
      winCondition:
        "You win by attrition converted into a stun chain. The Rogue trains one target with Hemorrhage/Sinister Strike pressure while the Druid Cyclones the enemy healer off their globals and keeps rolling Lifebloom, Rejuvenation and Regrowth on the Rogue. When the enemy healer is low on mana or caught out of position, the Rogue lands Cheap Shot into Kidney Shot, pops Cold Blood + Eviscerate (or a Cold Blood Ambush from a Vanish), and the Druid hard-Cyclones the healer for the full duration so no cross-heal lands. If the target survives, you reset with Vanish and do it again — you have infinitely more patience than they have mana.",
      cooldownTimeline:
        "Open from stealth with Sap on the off-target, then Cheap Shot the kill target to build the first combo points. Blind is your panic button on an enemy melee peeling the Rogue, or to buy the Druid a drink. Cloak of Shadows sheds a Polymorph, Fear, or a stack of DoTs at will. The Druid pre-HoTs before contact, uses Barkskin under pressure, and saves Nature's Swiftness + Healing Touch for the one heal that has to land now. Around the 60-second mark you'll have Preparation up — bank it to refresh Vanish, Blind, Cold Blood and Evasion for a second, fully-loaded kill attempt. Innervate the Druid the moment mana dips; long games are won by whoever drinks last.",
      positioning:
        "Play the pillars religiously — the Druid stays line-of-sight to the Rogue but broken from enemy casters, forcing sheep and fears to be hard-cast around a corner where you can juke or Cloak them. The Rogue lives on the enemy's back, but peels to the Druid the instant a melee or a Cyclone-worthy caster commits to your healer. Never let the Druid get collapsed on in the open; kite through the pillar so incoming melee eats roots and Cyclone while the Rogue re-stuns. Against casters, the Druid's job is to deny casts with Cyclone and body-block LoS, not to out-heal a train.",
      counters: [
        {
          compId: "warlock-druid-2s",
          howToPlay: "The classic nemesis — they stall as hard as you do and the Felhunter's Spell Lock plus Devour Magic shuts down Cyclone and eats your HoTs. Don't try to out-attrition them; you can't. Force it early: train the Warlock (not the Druid), bait Spell Lock with a fake Cyclone, then hard-Cyclone the Druid off a peel and burst the Warlock through a Kidney Shot with Cold Blood. Cloak of Shadows dumps their entire DoT package and any Fear — use it to reset a stun chain, not defensively. Kill the Warlock or accept a draw.",
        },
        {
          compId: "mage-druid-2s",
          howToPlay: "The Mage kites you into oblivion with Frost Nova, Blink, Ice Block and Polymorph, and every Sheep on the Rogue resets their clock. Stick the Mage relentlessly, Kick and Blind to deny casts, and save Cloak of Shadows to walk out of a Nova or shed a Sheep mid-chain. The Druid must Cyclone the Mage during Ice Block windows so the block is wasted, and pre-emptively HoT through Frostbolt pressure. Open your kill only when the Mage has burned Blink and Block — before that you're just feeding globals.",
        },
      ],
      tips: [
        "Cyclone the healer, not the DPS — a full-duration Cyclone on the enemy healer during your Kidney Shot is what actually secures kills; random Cyclones just reset your own damage.",
        "Save Cloak of Shadows for offense as often as defense: shedding a Polymorph or Fear to keep a stun chain alive wins more games than eating it defensively.",
        "Bank Preparation for a loaded second attempt — refreshing Vanish + Blind + Cold Blood + Evasion at once turns a failed opener into an unavoidable kill window.",
        "Never fight in the open against melee; kite the Druid through a pillar so peelers eat Entangling Roots and lose LoS while the Rogue re-stuns the target.",
      ],
      requiredGear: [
        "Rogue: max Resilience (Vengeful set) with a fast, high-end offhand and a slow mainhand for Cold Blood Eviscerate/Ambush burst; prioritize AP and hit to punch through Resilience in your stun windows.",
        "Druid: stack Resilience and as much +Healing and mana/Spirit as the set allows — you're playing the long game, so mp5, Spirit for out-of-combat drinking, and enough stamina to survive a mace-stun train matter more than raw throughput.",
      ],
    },
  },
  {
    id: "rogue-mage-2s",
    name: "Rogue / Mage (RM)",
    bracket: "2s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "mage", spec: "frost" },
    ],
    tier: "S",
    playstyle: "burst",
    difficulty: 3,
    strengths: [
      "Highest burst ceiling of any 2s double-DPS: a Shatter combo stacked on a stunlock deletes a target in one window",
      "Absurd control layering — Sap, Blind, Polymorph, Kidney Shot, Counterspell, and Kick chain the enemy off the board",
      "Spellsteal rips Power Word: Shield, Blessing of Protection, and Ice Barrier off the kill target before you swing",
    ],
    weaknesses: [
      "No healer — a whiffed opener or an enemy trinket up and you have nothing to fall back on",
      "Druid comps cyclone your setup and simply outlast your mana in a long game",
    ],
    keyCounters: [
      "rogue-druid-2s",
      "warlock-druid-2s",
      "resto-druid-warrior-2s",
    ],
    keyFavors: [
      "frost-mage-disc-priest-2s",
      "mage-holy-paladin-2s",
    ],
    blurb:
      "The purest glass cannon in 2v2. Rogue and mage layer more crowd control than any other pair and cash it in for a single, lethal Shatter-plus-stunlock burst window. When the opener lands the enemy is dead before they trinket; when it whiffs, you have no healer to bail you out.",
    guide: {
      overview:
        "Rogue/Mage is the definitive burst comp of TBC 2s. You do not grind — you set up one perfect kill. Sap the off-target pre-round, open with a Cheap Shot on the kill target, Polymorph or Counterspell the other, and dump a Shatter combo into a rogue stunlock so the target dies inside a Kidney Shot. Every button either enables that window or resets you for a cleaner one.\n\nThe catch is that you have zero healing. There is no Mana Burn grind, no Shield to hide behind, no bubble — your defense is control and LoS. That makes execution everything: the CC chain has to be clean, Spellsteal has to strip the target's cooldown, and the burst has to be pre-loaded before you commit. Land it and the round is over in seconds; fumble it against a comp that can outlast you and you have no plan B.",
      winCondition:
        "Set up one clean kill: Sap/Blind/Polymorph the off-target out of the game, Spellsteal or Counterspell the kill target's defense, then land a Shatter combo (Frost Nova → Ice Lance + Frostbolt under Icy Veins) on top of a Cheap Shot → Kidney Shot stunlock so the target dies before it can trinket and heal.",
      cooldownTimeline:
        "Pre-round: rogue Saps the off-target, mage summons Water Elemental. Open — Cheap Shot the kill target, mage Counterspells or Sheeps the second enemy. Rogue Premeditation → Kidney Shot; mage Frost Nova → Ice Lance + Frostbolt + Spellsteal under Icy Veins for the Shatter crit, rogue burns Adrenaline Rush + trinket. If the target trinkets the Kidney, re-stun with a fresh Cheap Shot off Preparation. Reset with Vanish, Ice Block, Blink, or Cold Snap (fresh Nova/Ice Block) and re-Sap for a second, cleaner opener.",
      positioning:
        "Mage plays tight to a pillar for LoS and a Blink escape lane; rogue roams to the kill target and peels back with Kick, Gouge, and Blind whenever melee dives the mage. Never let the mage get caught in the open — every Frost Nova + Blink should buy distance toward the pillar, and the rogue's stuns double as peels. Keep the Water Elemental's Freeze available as a second Shatter enabler and an emergency root.",
      counters: [
        {
          compId: "rogue-druid-2s",
          howToPlay: "The druid Cyclones your mage out of every burst window and simply out-heals a healerless comp over time. Don't grind — Counterspell and Spellsteal the druid's HoTs, force it out of Cyclone range, and go for a fast kill on the rogue during a Polymorph on the druid. If you can't kill in the first two windows, you're on their clock and lose.",
        },
        {
          compId: "warlock-druid-2s",
          howToPlay: "You can't out-attrition a druid, and the warlock's fears plus instant DoTs shred your no-healer defense. Train the warlock — Kick/Counterspell every heal-relevant cast, Cloak of Shadows the fears, and burst the lock through a Cyclone/Polymorph on the druid. Blanket the druid with your CC so it can't peel while you delete the warlock.",
        },
      ],
      tips: [
        "Sap the off-target before the gates open — a free CC on one enemy is half your setup for free.",
        "Spellsteal is part of the burst, not an afterthought: strip Ice Barrier, PW:S, or Blessing of Protection off the kill target the global before you commit.",
        "Never blow the full CC chain without the mage's burst off cooldown — control without a kill just resets the enemy for free.",
        "Preparation and Cold Snap are your second life — a clean re-open beats forcing a burst into a trinket that's already up.",
      ],
      requiredGear: [
        "Rogue needs weapon-first burst (a fast offhand for Kidney uptime) and 350+ resilience so a swap doesn't delete you before you reset",
        "Mage needs enough spell damage and frost crit for a lethal Shatter, plus stamina/resilience to survive being trained with no healer behind you",
      ],
    },
  },
  {
    id: "warlock-druid-2s",
    name: "Warlock / Resto Druid",
    bracket: "2s",
    members: [
      { class: "warlock", spec: "affliction" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "sustain",
    difficulty: 2,
    strengths: [
      "Bottomless attrition — Soul Link splits damage while Drain Life and Death Coil refund the Warlock's health for free",
      "Fear plus Unstable Affliction locks the enemy healer out of every dispel and cast window",
      "Instant HoTs let the Druid heal on the move forever behind a pillar",
    ],
    weaknesses: [
      "Mana-burn teams starve the Druid before the DoTs ever finish the kill",
      "A single dedicated train on the Druid with no peels can collapse the whole clock",
    ],
    keyCounters: [
      "warlock-disc-priest-2s",
      "rogue-disc-priest-2s",
    ],
    keyFavors: [
      "warrior-shaman-2s",
      "ret-shaman-2s",
      "hunter-druid-2s",
    ],
    blurb:
      "The definitive sustain team of Season 2: an SL/SL Affliction Warlock and a Resto Druid who simply refuse to die. You don't burst anyone down — you blanket the enemy in rot, chain-Fear their healer into oblivion, and win the mana game every single time.",
    guide: {
      overview:
        "Warlock/Druid is the purest attrition comp in the bracket. The Warlock runs the Soul Link / Siphon Life build, sharing every incoming hit with the felhunter and clawing health back through Drain Life, Siphon Life, and Death Coil while Corruption, Curse of Agony, and Unstable Affliction tick on whatever's in front of him. The Druid never has to stand still — Lifebloom, Rejuvenation, and Regrowth keep rolling through pillars while Cyclone and Entangling Roots buy tempo.\n\nThe whole gameplan is a clock. Every Fear on the enemy healer is a free heal gap; every dispel attempt on Unstable Affliction eats a 5-second silence. You are almost never trying to global someone — you're trying to make the other team run out of mana, run out of cooldowns, and run out of patience first. Against most compositions, if the match reaches minute four, you've already won.",
      winCondition:
        "You win on mana and morale, not on a burst window. Open by pre-loading Corruption, Curse of Agony, Siphon Life, and Unstable Affliction across both enemies, then settle into a Fear rotation on their healer — Fear, refresh dots, Fear again, with Death Coil and felhunter Spell Lock (Spell Lock has a 24s cooldown) held to shut down their emergency cast. Curse of Tongues on the healer stretches every one of their casts by 50%. The actual kill usually falls out on its own: with the healer feared or silenced, one uninterrupted Drain Life plus a Corruption/UA/CoA tick spread finishes whichever target you've been rotting. The Druid's job is to keep the Warlock topped and land a clutch Cyclone on the enemy healer during the Fear chain so they can't even trinket-and-heal out.",
      cooldownTimeline:
        "Nothing is spent early. Felhunter Spell Lock is your single most valuable button — save it for the enemy healer's panic cast during your Fear chain, never burn it on the opener. The Druid holds Barkskin and Nature's Swiftness (into an instant Regrowth or Cyclone) for the moment a melee actually commits onto him; Nature's Grasp roots the incoming trainer. The Warlock keeps a Healthstone and Death Coil in the back pocket as a 3-second horror-and-heal reset if he gets swapped to. Innervate goes on the Druid the instant he dips under half mana — in a comp built to outlast, the Innervate that arrives on time is what actually wins the attrition war.",
      positioning:
        "Live on the pillar. The Druid LoS-heals from behind it while the Warlock peeks out just far enough to keep DoTs rolling and land Fears, ducking back the instant a caster tries to hardcast him. Never let both of you get pulled to the same side of the pillar as the enemy — you want the wall between you and their damage at all times. Fear direction matters: always Fear the healer into open ground or into your own line so they eat more DoT time, never toward their DPS. If a melee trains the Druid, kite him around the pillar with Entangling Roots and Nature's Grasp rather than trading a global to peel — every second the enemy spends chasing is a second closer to your win.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay: "This is your worst matchup — a Disc Priest Mana Burns your Druid out of the game before your DoTs can close, and the enemy Warlock out-sustains yours in a straight drain race. Do not try to out-attrition them. Instead collapse on the Priest: Curse of Tongues to cripple his Mana Burn cadence, chain-Fear him relentlessly, and coordinate a hard Cyclone-plus-Fear lockout so your Druid gets clean casts. Force the swap onto the Priest and race his mana pool, because you cannot win the long game against a burn team.",
        },
        {
          compId: "rogue-disc-priest-2s",
          howToPlay: "The Rogue trains your Druid while the Priest dispels your DoTs and burns your mana. Pre-HoT the Druid before every stealth opener and save Nature's Grasp and Nature's Swiftness for the kidney/blind window. Reapply Unstable Affliction constantly so the Priest's dispels eat the 5-second silence, and Fear the Priest off his mana-burn casts. If the Rogue commits fully onto the Druid, Death Coil him and swap all pressure to the exposed Priest.",
        },
      ],
      tips: [
        "Keep Unstable Affliction refreshed on the enemy healer at all times — it's less about the damage and more about punishing every dispel with a 5-second silence.",
        "Never open with felhunter Spell Lock. It's a 24-second cooldown; hold it for the healer's panic heal mid-Fear-chain.",
        "Slap Curse of Tongues on the enemy healer, not just Curse of Agony — a 50% cast slow turns every one of their heals into a Fear window.",
        "Innervate the Druid early rather than late. This comp only loses the mana war if you fall behind on it, so bank the tempo before you're desperate.",
      ],
      requiredGear: [
        "Warlock: prioritize resilience to survive swaps under Soul Link, then max Shadow spell damage (Season 2 shoulders/weapon) so DoTs and Drain Life actually threaten kills; Spell Penetration helps against Shadow resist.",
        "Druid: stack resilience and Stamina to survive trains behind the pillar, then +healing and as much mana/mp5 as you can carry — you must out-last burn teams, so the mana pool is a weapon.",
      ],
    },
  },
  {
    id: "warrior-shaman-2s",
    name: "Warrior / Resto Shaman",
    bracket: "2s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Windfury Totem + Mortal Strike + Bloodlust turn one global into a real delete window",
      "Purge is constant tempo — strips Freedom, Power Word: Shield, and HoTs to crack healer comps open",
      "Resto Shaman is one of the stickiest 2s healers: Earth Shield, Grounding, Tremor, and Nature's Swiftness",
    ],
    weaknesses: [
      "Frost Mages and Hunters kite the warrior while the shaman gets Polymorphed / Mana Burned / kicked out of the game",
      "No Mana Burn of your own, and the shaman's heals are hardcast — a trained, kicked shaman folds without Nature's Swiftness up",
    ],
    keyCounters: [
      "frost-mage-disc-priest-2s",
      "rogue-disc-priest-2s",
      "warlock-disc-priest-2s",
    ],
    keyFavors: [
      "ret-holy-paladin-2s",
      "resto-druid-warrior-2s",
    ],
    blurb:
      "Horde cleave at its most direct: Windfury Totem and Bloodlust turn the arms warrior's Mortal Strike into an instant-kill window while a Resto Shaman refuses to die behind Earth Shield and totems. Purge strips the enemy healer bare between swaps. It trains and swaps rather than kites, so control comps that lock the shaman down are the entire problem to solve.",
    guide: {
      overview:
        "Warrior/Resto Shaman is a no-setup cleave. The warrior applies instant Mortal Strike pressure (−50% healing) while the shaman drops Windfury and Strength of Earth totems, keeps Earth Shield rolling, and Purges the enemy healer's defensives on every spare global. You don't script a kill — you pressure constantly and cash in a Bloodlust window when a Windfury proc lines up with the warrior's cooldowns.\n\nThe catch is range and mana. You have no way to Mana Burn a patient team and no way to catch a kiter who keeps the warrior snared, so a Frost Mage or Hunter that trains your shaman with Poly, Mana Burn, and kicks is your nightmare. Queue this into melee and uptime comps where your burst and Purge dominate, and lean on Grounding/Tremor and Nature's Swiftness to survive the games where the shaman gets hunted.",
      winCondition:
        "Land a Bloodlust-fueled burst — Windfury procs + Mortal Strike (−50% healing) + Recklessness/Death Wish — on a target the enemy healer can't top through the Mortal Strike debuff, while Purge keeps their shields and Freedom stripped so the pressure never resets.",
      cooldownTimeline:
        "Warrior Charges → Hamstring → Mortal Strike on cooldown. Shaman drops Windfury + Strength of Earth totems, Earth Shields the warrior, and Purges the enemy healer's shields/HoTs. On the kill window: Bloodlust → warrior pops Recklessness + Death Wish + trinket with Mortal Strike active and a Windfury proc lined up. If they swap the shaman, Grounding Totem eats the Poly/Fear, Nature's Swiftness + Healing Wave covers the burst, and the warrior peels back with Intercept/Piercing Howl.",
      positioning:
        "Warrior sticks to the kill target; the shaman plays a pillar with totems down and Earth Shield rolling, staying out of melee LoS so it can hardcast Healing Wave safely. When a rogue or mage swaps the shaman, the warrior peels with Intercept, Hamstring, and Piercing Howl while the shaman self-peels with Frost Shock and Earthbind Totem. Never let the shaman get cornered in the open where it can't juke a cast.",
      counters: [
        {
          compId: "frost-mage-disc-priest-2s",
          howToPlay: "The mage kites your warrior all game and the priest Mana Burns the shaman — the worst matchup. Grounding Totem the Polymorph, Spell Reflect the Poly on the warrior, and use Piercing Howl + Intercept to close on the mage. Force an early Ice Block, then Bloodlust and all-in the mage the moment Block drops; you cannot win the long kite.",
        },
        {
          compId: "rogue-disc-priest-2s",
          howToPlay: "The rogue trains your shaman while the priest Blinds and Mana Burns. Trinket the opener stun, Nature's Swiftness through the Kidney, and have the warrior sit on the rogue with Hamstring/Piercing Howl so it can never free-cast a setup. Purge the priest's shield every global and swap the warrior to the priest during a Blind on your shaman.",
        },
      ],
      tips: [
        "Purge is half your offense — strip Blessing of Freedom, Power Word: Shield, and HoTs on every spare global.",
        "Windfury Totem is your burst enabler; keep it and Strength of Earth down, and time the swap around a Windfury proc.",
        "Grounding Totem eats the Polymorph or Fear aimed at your shaman — pre-drop it on the kill attempt and vs caster teams.",
        "Spell Reflect is a real cooldown: bounce Poly and Fear back, and let the shaman Tremor out of Fear chains.",
      ],
      requiredGear: [
        "Warrior: a big two-hander first (Windfury and Mortal Strike scale off weapon damage), then resilience",
        "Shaman: resilience + mp5 with constant Earth Shield uptime for the long games",
      ],
    },
  },
  {
    id: "hunter-druid-2s",
    name: "Hunter / Resto Druid",
    bracket: "2s",
    members: [
      { class: "hunter", spec: "beast-mastery" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Infinite kiting — Frost Trap, Concussive Shot, Wing Clip, and Aspect of the Pack keep melee permanently out of range while you free-cast damage",
      "Mana warfare — Viper Sting on the enemy healer plus Cyclone lockout wins any game that goes long",
      "Layered CC with no DR overlap — Freezing Trap, Cyclone, and Intimidation stack into near-permanent healer control",
    ],
    weaknesses: [
      "Low burst — outside a Bestial Wrath window you lack the raw damage to close a game before your CC chain breaks",
      "Fragile to a swap — if a rogue or two melee stick the hunter, one broken kite can end the round instantly",
    ],
    keyCounters: [
      "rogue-disc-priest-2s",
      "rogue-holy-paladin-2s",
    ],
    keyFavors: [
      "warrior-holy-paladin-2s",
      "ret-holy-paladin-2s",
      "warrior-disc-priest-2s",
    ],
    blurb:
      "Hunter/Druid is the purest kite-and-drain comp in the bracket: a Beast Mastery hunter who never stops moving and a Restoration druid who Cyclones the healer into oblivion. You don't blow teams up — you starve them, chip them, and reset until the mana bar hits zero. It's a control clinic that punishes anyone who can't catch you.",
    guide: {
      overview:
        "Hunter/Druid is a two-man control machine built around one idea: never let the enemy touch you and never let their healer drink. The Beast Mastery hunter is the engine — Aspect of the Hawk uptime, Frost Trap and Concussive Shot to peel any melee, and Viper Sting ticking the opposing healer dry. The Restoration druid is the spine — rolling Rejuvenation and Lifebloom to stay topped through poke, Cyclone to remove the enemy healer during kill windows, and Barkskin plus travel-form mobility so nothing pins her down. Together you form a kite that most comps simply cannot solve.\n\nThe win almost never comes from a clean opener. It comes ten to fifteen Viper ticks later, when the enemy healer is out of mana, their DPS is chipped from Serpent Sting and Arcane Shot, and you finally commit Bestial Wrath. This is a patience comp: you accept that early rounds go long, you trust your HoTs and your traps, and you close only when the resource math is already won. If you're the aggressor here, you're playing it wrong.",
      winCondition:
        "You win on resources and CC, not on a burst gib. Keep Viper Sting rolling on the enemy healer from the opening — every tick is mana they never get back, and Serpent Sting on the kill target adds free pressure. Your druid Cyclones the healer during their drink attempts and during your commit. The kill itself lands in a single Bestial Wrath window: pop The Beast Within for CC immunity, Intimidation-stun the target with your pet, Kill Command plus a Steady Shot into an Aimed Shot, while the druid holds the enemy healer in Cyclone so no heal lands. If they trinket the stun, reset — you have infinite kite time and they don't have infinite mana.",
      cooldownTimeline:
        "Open with Aspect of the Hawk and Viper Sting on the healer while the druid pre-HoTs the hunter. Drop Freezing Trap early to establish CC dominance and bait a trinket; save Frost Trap for when melee actually commits. Bestial Wrath plus The Beast Within is your only true burst window — hold it until the enemy healer is Cycloned or low on mana, roughly the first big lull after their initial cooldowns are spent. Intimidation pairs with the Bestial Wrath swap for the stun. Deterrence and Feign Death are your panic buttons if a rogue or warrior sticks you; the druid holds Barkskin and Nature's Swiftness plus Healing Touch for the moment a swap gets scary. Innervate goes on the druid the instant she dips — never let her run dry before their healer does.",
      positioning:
        "Play the pillars as a two-node kite: hunter on one side maintaining line for shots, druid on the other so a single charge or stealth opener can't reach both of you. Never stand still — Auto Shot and Steady Shot fire fine on the move for a hunter who strafes correctly, and standing still is how rogues and warriors delete you. Keep the enemy melee funneled through your Frost Trap and Concussive Shot so they eat maximum slow. The druid kites in a wide arc using travel form between casts, dropping HoTs on the run and only hardcasting under Barkskin. Force the enemy healer into the open to land Cyclone, and keep a pillar between yourself and any caster trying to CC your hunter.",
      counters: [
        {
          compId: "rogue-disc-priest-2s",
          howToPlay: "This is your hardest game — a rogue that sticks the hunter through a stunlock can end the round before your CC comes online, and the Disc priest dispels Viper Sting and fears off the rogue. Trap on cooldown to break stealth setups, and pre-emptively Freezing Trap the rogue before he can open. Feign Death to drop combat and reset his stun timers, and use Deterrence to survive the burst window. Have the druid Cyclone the priest during the rogue's Cold Blood window so no shield lands, and Hibernate is useless here — instead spend Cyclone and roots to peel the rogue off the hunter. Grind the priest's mana with relentless Viper Sting; if you survive the first two setups, the resource game swings hard your way.",
        },
        {
          compId: "rogue-holy-paladin-2s",
          howToPlay: "The Holy paladin has the mana to outlast a sloppy drain, so this is a discipline test. Viper Sting the paladin every cast and refresh it religiously — a paladin with no mana can't Cleanse your stings or heal the rogue. Keep the rogue slowed and trapped; every second he's in a Freezing Trap or Frost Trap is a second he isn't on your hunter. Bait Blessing of Freedom with an early trap, then land the real Freezing Trap once it's down. Save Cyclone for the paladin's Holy Light casts, and only commit Bestial Wrath once the paladin is CC'd or low. Patience wins — you have more kite than they have mana.",
        },
      ],
      tips: [
        "Refresh Viper Sting before it falls off, not after — a dropped drain hands the enemy healer a full mana regen tick and undoes minutes of work",
        "Freezing Trap does not diminish with Cyclone, so chain them on the healer for near-permanent lockout during your kill window",
        "Never blow Bestial Wrath as an opener; it's your only CC-immune burst, so save it for when the enemy healer is already Cycloned or dry",
        "Keep your pet on the healer with Growl off — pet damage plus Intimidation stun is a huge chunk of your control and pressure, and a dead pet is a dead comp until you can revive",
      ],
      requiredGear: [
        "Hunter: prioritize resilience to survive rogue/warrior swaps, then a high top-end ranged weapon (Crossbow of Relentless Strikes / Sunfury bow) for Aimed and Steady Shot damage; Agility and crit scale your Bestial Wrath window",
        "Druid: stack resilience and stamina to live through swaps, then Intellect and mp5 (Vengeful Gladiator's regalia) so you win the mana war you're built to fight — spellpower is a distant third",
      ],
    },
  },
  {
    id: "hunter-priest-2s",
    name: "Hunter / Disc Priest",
    bracket: "2s",
    members: [
      { class: "hunter", spec: "beast-mastery" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "B",
    playstyle: "control",
    difficulty: 2,
    strengths: [
      "Relentless dual mana pressure — Viper Sting plus Mana Burn drains a healer's pool faster than they can drink or LoS",
      "A real burst window on demand: Bestial Wrath + The Beast Within turns the pet into an unpeelable, CC-immune wrecking ball behind Kill Command",
      "Deep control kit — Freezing Trap, Intimidation stun, Concussive Shot and Psychic Scream let you dictate every opener and reset",
    ],
    weaknesses: [
      "Melee that sticks to the hunter shuts the comp down — deadzone, stuns and Wing Clip pressure gut your damage and mana attrition plan",
      "No hard swap-and-kill burst if the drain plan stalls; a mobile, well-positioned healer can outlast a sloppy Bestial Wrath window",
    ],
    keyCounters: [
      "rogue-disc-priest-2s",
      "warrior-holy-paladin-2s",
    ],
    keyFavors: [
      "warlock-disc-priest-2s",
    ],
    blurb:
      "Hunter/Disc Priest is a patient attrition comp that wins by strangling the enemy healer's mana rather than out-bursting the lobby. The hunter kites at range chipping away with Viper Sting while the priest layers Mana Burn, and when the enemy pool runs dry a single Bestial Wrath window ends the game. It is a control comp that rewards discipline, map awareness, and knowing exactly when to commit your cooldowns.",
    guide: {
      overview:
        "Hunter/Disc Priest is built around two mana taps working in concert. The hunter keeps Aspect of the Viper up during downtime, weaves Viper Sting onto the healer, and uses Concussive Shot, Freezing Trap and pillars to stay at ideal range. The priest is not a passive backline healer here — Discipline's aggressive toolkit does half the offense through Mana Burn spam, offensive Dispel Magic to strip HoTs and shields, and Psychic Scream to peel and reset. Together they turn every game into a resource war the healer usually loses first.\n\nThe payoff is the Beast Mastery burst window. Once the enemy healer is low on mana or caught out of position, the hunter pops Bestial Wrath and The Beast Within to make the pet immune to crowd control, chains Kill Command and Intimidation, and the priest commits Power Infusion and hard casts to close. The comp asks for restraint: throw your burst too early against a full-mana healer and you have nothing left when the real kill window opens.",
      winCondition:
        "You win through mana attrition capped by a burst finish. Maintain Viper Sting uptime on the enemy healer and let the priest Mana Burn between Power Word: Shield and Renew refreshes — the goal is to force the healer to LoS and drink, ceding tempo. When their pool dips or your Freezing Trap lands on the off-target, the hunter commits Bestial Wrath + The Beast Within, opens with Intimidation to stun, and pours Kill Command plus Steady/Arcane Shot into the kill target while the priest adds Power Infusion, Shadow Word: Death and Mana Burn to deny the last-second heal. Against a healer who refuses to burn, patience plus Scare Beast (vs. druids) and repeated traps eventually cracks them.",
      cooldownTimeline:
        "Bestial Wrath and The Beast Within (shared ~2 min) are your only true kill button — never blow it into a fresh healer. Intimidation (1 min) is your on-demand stun to open or interrupt a cast; pair it with the burst. Rapid Fire supplements damage during the window. On the priest, Pain Suppression (3 min) saves your hunter from a melee train, Power Infusion (3 min) is banked for the kill push, and Psychic Scream (baseline, ~30 s) is your emergency peel and reset. Freezing Trap has no cooldown but respects diminishing returns — stagger it with Intimidation and Scream so your CC chain doesn't overlap into resistance.",
      positioning:
        "The hunter lives in the 8–35 yard band and must respect the deadzone — too close and you can't shoot, too far and you fall out of range. Play off pillars so the priest can LoS enemy casters while you keep sightlines to the healer for Viper Sting and shots. Pre-place Freezing Traps in the lanes a melee will path through, and kite attackers through your trap rather than running blind. The priest should never share a pillar with the hunter against melee; stay split so a single charge or blind can't reach both of you, and use Psychic Scream the instant a melee closes the gap on the hunter.",
      counters: [
        {
          compId: "rogue-disc-priest-2s",
          howToPlay: "This is your hardest matchup — the rogue erases your damage in the deadzone and stunlocks the hunter. Play ultra-defensively: pre-trap your own pillar corners, save Psychic Scream for the opener to break the stun chain, and Feign Death to drop combat and reset. The priest should Pain Suppression the hunter through the first stunlock. Keep Aspect of the Viper mana banked, kite the rogue into Freezing Trap, and only Mana Burn the priest when the rogue is trapped or feared — you win the long game if you survive the burst windows.",
        },
        {
          compId: "warrior-holy-paladin-2s",
          howToPlay: "A Holy Paladin has the mana pool to shrug off your drain and the warrior will train your hunter relentlessly. Do not try to out-attrition the paladin's mana directly — instead kite the warrior with Concussive Shot, Wing Clip and traps to deny rage and Mortal Strike uptime, and force the paladin to LoS your Mana Burns. Bank Bestial Wrath for a clean burst on the warrior when Pain Suppression and a Freezing Trap on the paladin let you tunnel him. Scare tactics fail here; win by making the warrior useless, not the healer poor.",
        },
      ],
      tips: [
        "Keep Aspect of the Viper on during any downtime — a mana-starved hunter has no kill window, and the whole comp runs on your resource advantage.",
        "Never open Bestial Wrath into a full-mana healer. It is a finisher, not an opener — earn the window with Viper Sting and Mana Burn first.",
        "Stagger your CC: Intimidation, Freezing Trap and Psychic Scream all feed diminishing returns, so chain them on the same target instead of overlapping and wasting duration.",
        "Use Feign Death aggressively to drop melee combat, reset traps, and dodge incoming casts — it is one of the strongest survival tools you have against a train.",
      ],
      requiredGear: [
        "Hunter: Season 2 Merciless Gladiator's ranged weapon and set for the resilience breakpoint, prioritizing agility and crit for pet-burst spikes; keep a mana pool deep enough to sustain Aspect of the Viper cycling.",
        "Priest: full Merciless Gladiator's Investiture for resilience, then stack spell damage plus mana regen so Mana Burn and hard casts outlast the enemy healer through a long attrition game.",
      ],
    },
  },
  {
    id: "hunter-holy-paladin-2s",
    name: "Hunter / Holy Paladin",
    bracket: "2s",
    members: [
      { class: "hunter", spec: "beast-mastery" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "B",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Aimed Shot's 50% healing debuff plus trap CC lets you force a real kill window on demand.",
      "Holy Paladin is the sturdiest 2s healer alive — Divine Shield, Hand of Protection, and Freedom hard-reset the enemy's whole plan.",
      "Bestial Wrath makes the hunter fear- and CC-immune for a burst window nothing melee can peel.",
    ],
    weaknesses: [
      "No instant Paladin heals and no mobility — a coordinated train on the healer through a bubble can still win the war of attrition.",
      "Kiting casters (Blink, Frost Nova, sheep) shut the hunter out of the dead zone and outlast your limited sustained pressure.",
    ],
    keyCounters: [
      "rogue-mage-2s",
      "mage-druid-2s",
    ],
    keyFavors: [
      "warrior-shaman-2s",
      "ret-shaman-2s",
    ],
    blurb:
      "A patient control comp that wins by attrition and one hard-scripted burst window. The hunter locks the enemy healer out with Freezing Trap, stacks the Aimed Shot healing debuff on the kill target, then dumps Bestial Wrath while the Holy Paladin — the tankiest healer in the bracket — refuses to die. You don't out-damage the meta; you out-position it.",
    guide: {
      overview:
        "Hunter/Holy Paladin is a defensive setup comp built around two truths: the Paladin almost cannot be killed if he plays his cooldowns cleanly, and the hunter carries the single best healing-debuff-plus-CC package in 2s. You survive early, drink when you can, and wait for the trap-into-Aimed-Shot window that turns a even fight into a global kill. Against melee-plus-healer teams you are heavily favored — the hunter kites, Concussive and Wing Clip peel, and the Paladin walls anything that leaks through.\n\nThe ceiling is real but so is the skill floor. Everything hinges on the hunter respecting his dead zone, juggling Freezing Trap without breaking it early, and knowing exactly when Bestial Wrath goes down. The Paladin has to ration mana, pre-Cleanse poisons, and hold Divine Shield / Hand of Protection for the moment a swap actually threatens the kill. Misplay either and the comp's biggest weakness — modest sustained pressure — lets patient teams simply outlast you.",
      winCondition:
        "Land Freezing Trap on the enemy healer (or Scatter Shot into trap if they're loose), then open the kill on the DPS: Aimed Shot for the 50% healing reduction, Bestial Wrath so the hunter is CC-immune, Kill Command and pet Intimidation stun stacked with Multi-Shot and auto crits. The Paladin funnels one big Holy Light into the hunter beforehand so he can commit fully, and Hammer of Justice extends the stun chain on the target. If the healer trinkets the trap, re-trap or Viper Sting them dry — you have all day, they don't. The kill lands inside the trap's duration or you reset and drink.",
      cooldownTimeline:
        "Open defensive: don't blow anything, establish LoS and let the hunter chip with Steady Shot while reading their setup. Your offense starts when Bestial Wrath (2 min) is up AND you have Freezing Trap ready on the healer — never Bestial Wrath into a full-HP healer who's untrapped. Intimidation's stun opens or extends the burst; Rapid Fire can be layered for a hard swap. On defense, Divine Shield and Hand of Protection are your \"oh no\" buttons — bubble to Cleanse yourself out of a stun-lock, Hand of Protection onto the hunter to drop a rogue/warrior mid-swap. Blessing of Freedom pre-emptively vs Frost Nova / Hamstring / Crippling Poison. Trinket the first HoJ or full CC chain on the Paladin, not a throwaway root.",
      positioning:
        "The hunter lives at max range and off the healer's LoS-reset pillar — you want the enemy on ONE side of a pillar so your Paladin can heal around it while the hunter still has a shot. Never let yourself get pushed into the dead zone (8–yard band); step back or Wing Clip / Concussive to re-open range. Freezing Trap goes on your side of a corner so the healer eats it repositioning, not where their DPS can cleave it off. The Paladin plays behind terrain, only peeking to cast, and body-blocks nothing — he kites melee into the hunter's traps and Wing Clips rather than tanking. Keep the hunter and Paladin split enough that no single AoE fear or cleave hits both.",
      counters: [
        {
          compId: "rogue-mage-2s",
          howToPlay: "The mage will kite your hunter with Blink, Frost Nova and Sheep while the rogue trains your Paladin — this is your hardest 2s matchup. Pre-Cleanse and pre-Freedom the Paladin against Nova/poison, and trap the ROGUE on his openers rather than chasing the mage. Save Divine Shield for the Blind-into-Cheap-Shot kill attempt, and Hand of Protection the hunter the instant the rogue swaps to him. Your kill route is Scatter-trap the mage, Aimed Shot the rogue through his Evasion window, and Viper Sting the mage to starve the sheep chain. Patience beats them; greeding a burst into a Blink loses.",
        },
        {
          compId: "mage-druid-2s",
          howToPlay: "A pure attrition trap — the druid HoTs and Cyclones your kills off while the mage kites and drinks. You cannot out-sustain them, so you must manufacture a lockout: Freezing Trap or Scatter the druid, Aimed Shot the mage for the healing debuff, and Bestial Wrath through the Cyclone window on the mage while the druid is CC'd. Viper Sting both to pressure mana since the game goes long. Keep the Paladin topped and never let the mage free-cast Polymorph on the hunter during your go — Bestial Wrath's CC immunity is the whole answer to their control.",
        },
      ],
      tips: [
        "Never Bestial Wrath into an untrapped healer — the window is wasted the second they free-cast a heal. Trap first, then commit.",
        "Layer Aimed Shot's healing debuff onto the target BEFORE the burst, not during — it needs to already be ticking when your damage lands.",
        "Paladin: hold Divine Shield to Cleanse yourself out of a stun-lock, and Hand of Protection the hunter to peel melee mid-swap — don't burn them on the first pressure.",
        "Viper Sting the enemy healer every time you're not actively bursting; against druids and mages the mana war is a legitimate win condition.",
      ],
      requiredGear: [
        "Hunter: Merciless Gladiator's ranged weapon and enough Resilience to survive a swap, then stack Agility/AP and hit the ranged hit cap so Aimed Shot and traps land clean.",
        "Holy Paladin: full Merciless Gladiator's Sanctuary for Resilience and Stamina, then prioritize mana regen and +spell crit/haste — you need to outlast long games, so mp5 and Intellect over raw throughput.",
      ],
    },
  },
  {
    id: "ret-shaman-2s",
    name: "Ret Paladin / Resto Shaman",
    bracket: "2s",
    members: [
      { class: "paladin", spec: "retribution" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "Ludicrous single-global burst when Windfury Totem, Bloodlust, and a trinket line up on a Judgement + Crusader Strike",
      "Grounding Totem and Purge give real answers to caster teams, eating a key CC and stripping shields/HoTs off the kill target",
      "Double dispel coverage: Shaman Purges offensively while the Paladin Cleanses and Blessing of Freedom peels roots and slows",
    ],
    weaknesses: [
      "No Mortal Strike or healing debuff, so any matchup that survives the first burst window can out-heal you indefinitely",
      "The Shaman's cast-time heals fold to sustained interrupts, and the Ret has no gap-closer once kited off the target",
    ],
    keyCounters: [
      "frost-mage-disc-priest-2s",
      "rogue-disc-priest-2s",
      "warlock-disc-priest-2s",
    ],
    keyFavors: [
      "shadow-priest-rogue-2s",
      "warlock-holy-paladin-2s",
    ],
    blurb:
      "A pure burst comp built to delete a target inside one Windfury-and-Bloodlust window before the enemy healer can react. The Ret hits like a truck under Judgement and Crusader Strike, the Shaman pockets him with Earth Shield and Grounding Totem, and the whole game is about landing that one explosive swing. No Mortal Strike means you win in seconds or not at all.",
    guide: {
      overview:
        "Ret Paladin / Resto Shaman is the definitive TBC feast-or-famine burst comp. Everything is engineered around one explosive window: the Shaman drops Windfury Totem, pops Bloodlust, and the Paladin funnels Judgement of Command, Crusader Strike, and a trinket-boosted white swing into a single target while it's locked in Repentance or Hammer of Justice. When it connects, the target is simply gone before their healer finishes a cast.\n\nThe catch is that you have no Mortal Strike and no way to pressure a healer over time, so if the first go dies, you're grinding a losing mana war where the Shaman's cast-time heals get shredded by any competent interrupter. You are a scalpel, not a hammer. Win the setup or reset and try again with better positioning and totems down.",
      winCondition:
        "You win by chaining crowd control into a burst window the enemy healer cannot answer. Open by getting Earth Shield and Windfury Totem down, then set up the kill: Repentance the enemy healer (or Hammer of Justice the DPS), swap onto the free target, and unload Bloodlust + trinket into Judgement of Command and Crusader Strike with Windfury proccing on your swings. Purge the target's absorbs and HoTs right before the burst so nothing eats it. If the healer isn't controlled, HoJ them mid-burst so your damage lands into a target that can't be topped. Everything must resolve inside roughly five seconds — that's your entire kill window.",
      cooldownTimeline:
        "Pre-game: Earth Shield on the Ret, Windfury and Tremor/Grounding totems placed for the opener. First contact: Judgement to apply pressure and force cooldowns, hold Bloodlust. Kill window: Repentance or HoJ the healer, Bloodlust + Windfury Totem + engineering trinket + Crusader Strike + Judgement of Command all inside one window. Keep Blessing of Freedom charged for the Ret to counter roots/slows, and save the Shaman's Nature's Swiftness + Healing Wave for the enemy's return burst. Grounding Totem is on cooldown rotation to eat Polymorph, Fear, or a key shock. If the go fails, disengage, re-drop totems, regen mana, and rebuild.",
      positioning:
        "The Shaman plays around line of sight and totem range, never standing where a caster can free-cast on him — pillar-hug and keep Grounding and Tremor totems within pickup range. The Ret stays glued to the kill target but peels back the instant the Shaman is pressured, using Hammer of Justice and Cleanse to buy heals. Against casters, force them off pillars where Grounding can't be juked; against melee, the Shaman kites through Earthbind and Frost Shock while the Ret trades. Keep the two of you close enough that Bloodlust and Windfury cover the Ret but not so stacked that you both eat AoE fear or a single cross-CC setup.",
      counters: [
        {
          compId: "frost-mage-disc-priest-2s",
          howToPlay: "This is your nightmare matchup: the Mage kites the Ret forever with Frost Nova, Blink, and Polymorph while the Disc Priest interrupts every Shaman heal. Save Blessing of Freedom exclusively for Nova/roots and never waste it early. Use Grounding Totem to eat a Polymorph or Counterspell, Tremor to shrug the Priest's fear, and Purge the Priest's shields relentlessly. Your only real path is a Repentance-into-Bloodlust go on the Priest before they get Inner Focus / trinket up — if you can't kill in that first window, you likely lose the mana war, so play for one perfect setup rather than sustained pressure.",
        },
        {
          compId: "rogue-disc-priest-2s",
          howToPlay: "The Rogue restealths and controls your Shaman with kidney/blind chains while the Priest dispels Blessing of Freedom and peels. Pre-place Tremor for the Priest's fear and keep the Shaman near a pillar so restealth openers are limited. Cleanse and Blessing of Freedom the Shaman off crippling poison and cheap-shot follow-ups, and have the Ret ready to HoJ the Rogue the moment he commits to a burst. Purge the Priest's Power Word: Shield before you go, and time your kill window on the Rogue during a Blind/Vanish desync when the Priest is out of position or low on mana.",
        },
      ],
      tips: [
        "Never blow Bloodlust on a target the enemy healer can freely cast on — land your Repentance or HoJ on the healer first, then burst the now-uncoverable DPS.",
        "Purge is a kill button: strip Power Word: Shield, Earth Shield, and HoTs off the target in the same global you start your burst so nothing absorbs it.",
        "Rotate Grounding Totem proactively to eat the enemy's most dangerous cast (Polymorph, Fear, Counterspell), not reactively after it lands.",
        "Hold the Shaman's Nature's Swiftness + instant Healing Wave for the enemy's counter-burst, and keep Blessing of Freedom on the Ret purely to defeat kiting.",
      ],
      requiredGear: [
        "Ret: Season 2 weapon (highest top-end damage you can get) plus stacked Strength/crit and enough resilience to survive return burst; an on-use damage/haste trinket is core to the kill window.",
        "Shaman: prioritize resilience and Stamina to survive swaps, then +healing and mp5/Intellect for the mana war — Nature's Swiftness and a strong healing weapon/idol are non-negotiable.",
      ],
    },
  },
  {
    id: "rogue-warlock-2s",
    name: "Rogue / Warlock",
    bracket: "2s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "warlock", spec: "affliction" },
    ],
    tier: "B",
    playstyle: "burst",
    difficulty: 3,
    strengths: [
      "Stacked control across every DR — Sap, Cheap Shot, Kidney Shot, Blind, Fear, Death Coil and Howl of Terror let you chain-lock a target from opener to grave.",
      "The Warlock is genuinely tanky: Siphon Life, Drain Life and Death Coil self-heals mean you win long attrition games most double-DPS teams lose.",
      "A clean opener deletes uncoordinated teams in one CC chain before they get a cast off.",
    ],
    weaknesses: [
      "No real burst — outside a Nightfall Shadow Bolt proc you have to tunnel, so a peeled Rogue means zero pressure.",
      "Whiff the opener and the comp stalls hard; a slowed, kited Rogue with a tanky healer across from you is a loss you can't force.",
    ],
    keyCounters: [
      "resto-druid-warrior-2s",
      "rogue-disc-priest-2s",
      "warrior-disc-priest-2s",
    ],
    keyFavors: [
      "rogue-mage-2s",
      "feral-rogue-2s",
    ],
    blurb:
      "Rogue/Warlock is a double-DPS tunnel comp that wins by chaining control across every diminishing-returns bracket while the Warlock's dots bleed a pinned target out. There is no true burst here — outside a lucky Nightfall Shadow Bolt, you kill with relentless pressure, not a single global — so every kill is a CC chain you built by hand. Land the opener and the game is often decided in the first twenty seconds; whiff it and you reset and try again.",
    guide: {
      overview:
        "Rogue/Warlock is the patient cousin of Rogue/Mage. You bring the same double-DPS threat but trade nuke burst for control depth and staying power: the Rogue locks two enemies at once while the Warlock rots the kill target with Unstable Affliction, Corruption, Curse of Agony and Siphon Life. Because you have controls on every DR category — Sap and Blind, Cheap Shot and Kidney Shot, Fear and Death Coil and Howl of Terror — a coordinated pair can run a locked target from full to dead without ever letting them act.\n\nThe flip side is that you have no panic button of raw damage. If the Rogue gets peeled, slowed or kited, your pressure evaporates, because the Warlock alone will not out-DPS a competent healer. That makes the opener everything: dot the whole enemy team, land a clean Sap, and commit your full CC chain on one kill. If you don't own the match inside the first twenty seconds, disengage, reset with Vanish and Preparation, and set up again — this comp punishes greed but rewards a clean second opener.",
      winCondition:
        "Win by turning a full CC chain into a kill before the enemy healer can act. Pre-pot and pre-dot everything with Corruption, Curse of Agony, Siphon Life and Unstable Affliction so damage is already ticking, then Sap the off-target (usually a healer) and open on the kill target. The canonical sequence: Cheap Shot into five combo points, the Warlock lands Death Coil on the target as the Cheap Shot ends, Rogue Garrotes out of stealth or Kidney Shots on the Coil — if they trinket the Coil you full Kidney Shot, if they sit it you Eviscerate. Layer Fear or Howl of Terror on the healer during the stun window, refresh Unstable Affliction so any dispel blows them up, and the target dies inside one uninterrupted lockdown. Against healers you can't burst, the backup plan is attrition: keep dots rolling, Curse of Tongues the healer, and let the tanky Warlock outlast them.",
      cooldownTimeline:
        "Everything hinges on the first stun window, so stack cooldowns there. Rogue opens with Premeditation into Cheap Shot for a five-point Kidney Shot, uses Shadowstep to close and reopen, and holds Preparation to reset Vanish/Cold Blood/Blind for a second full opener if the first stalls. The Warlock pre-casts dots, then dumps Death Coil, Fear and a Nightfall-proc instant Shadow Bolt into the same window; Fel Domination re-summons the Felhunter for a fresh Spell Lock if it died. Save Blind and Cloak of Shadows for the peel war — Cloak eats the enemy's kill setup, Blind resets a healer's tempo. Around the two-minute mark, PvP trinkets and Vanish/Preparation are back; that's your best second kill attempt, so bank them if the opener didn't connect rather than bleeding them on defense.",
      positioning:
        "The Warlock is your weak link — immobile, and dead if the enemy trains it. Keep the Warlock near a pillar at all times so it can LoS incoming casters and pets while it dots and Fears, and never let it get caught in the open against a melee or hunter. The Rogue plays the space between the two enemies, using Kidney Shot on one and Blind or Gouge on the other to peel for the Warlock while the dots do work. Against melee, kite the Rogue's threat to the pillar and let the Warlock use the wall to break line of sight on healers mid-Fear. When you commit the kill, both of you funnel one target into the open away from their healer's line of sight; when you're on defense, collapse back to the pillar and reset.",
      counters: [
        {
          compId: "resto-druid-warrior-2s",
          howToPlay: "This is your hardest wall — the Druid HoT-kites out of your dot pressure while the Warrior Hamstrings, Intercepts and Pummels the Rogue off the kill. Don't tunnel the Warrior; you can't kill him through a peeling Druid. Instead train the Druid: Curse of Exhaustion and Curse of Tongues to slow his casts and kite, Cheap Shot/Kidney into a Warlock Fear to force him out of Bear/HoT range, and Cloak of Shadows to shrug the Warrior's slows so the Rogue can stay on the healer. Bait Cyclone with Cloak up and only fully commit once the Druid is out of position and low on mana. Expect long games — your Warlock's Drain/Siphon self-sustain is what wins them.",
        },
      ],
      tips: [
        "Pre-dot the whole enemy team before you Sap — free pressure that also stops stealth/vanish resets and forces early defensive globals.",
        "Never dispel-bait carelessly: keep Unstable Affliction rolling so any priest or shaman that cleanses your dots eats the UA detonation.",
        "Use Preparation as your reset button, not your panic button — if the first opener stalls, Vanish out, re-Sap, and rebuild the chain rather than feeding damage.",
        "Coordinate the Rogue's Kidney Shot and the Warlock's Death Coil on different DR so your stun window on the kill target is as long as possible before Fear takes over on the healer.",
      ],
      requiredGear: [
        "Rogue: stack Vengeful Gladiator resilience and grab the arena set energy bonus as early as possible; run a fast off-hand dagger with a slow, high-damage main-hand for fat Hemorrhage and Eviscerate hits.",
        "Warlock: prioritize resilience and Stamina to survive being trained, then shadow spell damage; keep mana regen honest and a Felhunter (Spell Lock) or Succubus (Seduction) ready, since you win the attrition games and can't afford to be caught out of mana.",
      ],
    },
  },
  {
    id: "feral-rogue-2s",
    name: "Feral Druid / Rogue",
    bracket: "2s",
    members: [
      { class: "druid", spec: "feral-cat" },
      { class: "rogue", spec: "subtlety" },
    ],
    tier: "B",
    playstyle: "burst",
    difficulty: 3,
    strengths: [
      "Two stealth openers into one overlapping stunlock that almost nothing survives clean",
      "Two independent stun chains — Cheap Shot/Kidney Shot and Pounce/Maim — keep the kill target locked through the whole burst",
      "Feral's Bear-form armor, Barkskin, and Cyclone give a double-DPS comp real defensive and control tools",
    ],
    weaknesses: [
      "No healer and no true Mortal Strike — your poison and bleed pressure is easy to cleanse and out-heal",
      "Bubble, Blessing of Freedom, and priest dispels strip the whole kill setup and leave you with nothing",
    ],
    keyCounters: [
      "warrior-holy-paladin-2s",
      "warlock-disc-priest-2s",
      "rogue-holy-paladin-2s",
    ],
    keyFavors: [
      "warrior-shaman-2s",
      "ret-shaman-2s",
    ],
    blurb:
      "A double-stealth burst comp that wins by never letting the enemy out of a stun. Both players open from the shadows and overlap stuns to delete a target inside one window, before a healer can react. It is one of the highest-skill, most gear-hungry double-DPS comps in the bracket — all ceiling, little forgiveness.",
    guide: {
      overview:
        "Feral/Rogue is a pure kill-setup comp with no healer and no safety net. You win by stacking a Cheap Shot on top of a Pounce and chaining Kidney Shot into Maim so the target spends your entire burst stunned. With Wound Poison and Mangle amplifying the damage, a geared feral and rogue can drop a squishy target inside a single stunlock before their partner even finishes a cast.\n\nThe flip side is that everything rides on that opener. You have no way to out-sustain a patient team, and cleanses, bubbles, and Freedom all unravel your setup. This is a comp that punishes mistakes on the enemy and dies to its own missed globals — gear both players hard, sync every opener on voice, and treat each round as one clean burst attempt rather than a grind.",
      winCondition:
        "Land a synced double-stealth opener on one kill target and hold it stunned from Cheap Shot into Pounce, then extend with Kidney Shot and Maim while the feral and rogue dump Shred, Mangle, and Eviscerate under Wound Poison — the target has to die inside that chain, because you have no healer to win a longer game.",
      cooldownTimeline:
        "Both open from stealth on the same target: rogue Premeditation → Cheap Shot while the feral Ravages and follows with Pounce, overlapping two stuns. Rogue burns energy into a fast Kidney Shot as Cheap Shot fades; feral Maim extends the lock. Pop Tiger's Fury + trinket for the feral's damage window and Adrenaline Rush on the rogue if the kill is close. Cyclone the enemy healer through the burst so they can't cleanse or top the target. If it fails, disengage — Vanish and re-Prowl, Feral Charge and Shadowstep back in — and reset for a fresh clean opener rather than trading in the open.",
      positioning:
        "Both players stack on the kill target; there is no healer to protect, so your positioning is entirely about landing openers and denying the enemy healer. Force fights near pillars so you can LoS the healer's globals during your burst, and use Feral Charge + Shadowstep to re-close after a reset. Keep the feral out of caster line when powershifting to recover energy, and never let the rogue get kited off the target — without uptime, this comp does nothing.",
      counters: [
        {
          compId: "warrior-holy-paladin-2s",
          howToPlay: "You cannot out-last a Holy Paladin — he cleanses your poison and bleeds, Freedoms the warrior onto you, and Bubbles the kill. Your only line is a perfect uninterrupted stunlock on the warrior with Cyclone on the paladin the entire window so he can't cleanse or bubble. Save Blind and Maim to peel the warrior's Intercept/Hamstring off your feral, and commit all cooldowns to one attempt; a slow game is an automatic loss.",
        },
        {
          compId: "warlock-disc-priest-2s",
          howToPlay: "Fear chains, Death Coil, and priest dispels wreck a healer-less burst comp. Tunnel one target and keep stuns rolling so they can't free-cast Fear, Blind the priest on the kill attempt, and Cyclone him so he can't dispel your Wound Poison or shield through the burst. Hold your trinket for the Fear that actually matters, not the first one.",
        },
      ],
      tips: [
        "Sync openers on voice — a Cheap Shot and a Pounce on two different targets wastes your entire setup.",
        "Powershift to refill energy between Shreds so the feral's damage never stalls mid-stunlock.",
        "Keep Wound Poison up before you commit; without the healing debuff, any paladin or priest simply out-heals your burst.",
        "Spend Cyclone on the enemy healer during the kill window, not as a panic peel — it's your only way to lock a healer out of the setup.",
      ],
      requiredGear: [
        "Feral needs deep resilience plus the 4pc PvP / T6 burst pieces and a high-AP weapon — the comp is dead weight until the feral is geared",
        "Rogue wants 400+ resilience and a fast offhand to keep Wound Poison and stun uptime rolling",
      ],
    },
  },
  {
    id: "mage-druid-2s",
    name: "Mage / Resto Druid",
    bracket: "2s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Relentless CC chains — Polymorph, Cyclone, Frost Nova, and roots let you fully lock a healer while the kill target dies",
      "Infinite kite: instant Druid HoTs mean the Mage never stops moving, resetting rogue and warrior openers with Blink and Nova",
      "Ice Block and Cold Snap give two hard resets, so a single bad trade rarely ends the game",
    ],
    weaknesses: [
      "Almost no burst — if a CC chain misfires you cannot force a kill through a healthy healer",
      "Warlock dots and fears shred your Polymorph/Cyclone chains and grind the Mage down through Ice Block",
    ],
    keyCounters: [
      "rogue-druid-2s",
      "warlock-druid-2s",
      "warlock-holy-paladin-2s",
    ],
    keyFavors: [
      "warrior-shaman-2s",
      "ret-druid-2s",
      "warrior-holy-paladin-2s",
    ],
    blurb:
      "A pure control comp: the Frost Mage builds crowd-control chains while the Resto Druid HoTs through everything and drops Cyclones to fill the gaps. You don't out-damage anyone — you out-CC them, opening a window where the Water Elemental and a Nova'd target simply cannot be saved. Every game is a puzzle of Polymorph, Cyclone, and roots.",
    guide: {
      overview:
        "Mage/Druid wins by manufacturing a moment where the enemy healer is locked out and the kill target is frozen. The Druid's instant Lifebloom and Rejuvenation keep the Mage alive without ever standing still, which is what lets the pair kite indefinitely and reset any opener. Nothing about the comp is fast; it's a slow strangle where you trade CC until one clean chain lands.\n\nThe skill ceiling is high because every kill depends on stacking Polymorph, Frost Nova, Cyclone, and Counterspell in the right order against a moving enemy. Misfire one sheep and the whole setup collapses, but land the chain and the target dies through a healer who can't cast. Against melee you are dominant; against a second caster or a warlock's dots, the game turns into a grind you have to win with positioning.",
      winCondition:
        "You win by locking the enemy healer out of a full healing rotation while the kill target is frozen and can't move. The core sequence: Polymorph the healer, Counterspell any attempt to trinket or cast, then Frost Nova the target and burn it with Water Elemental Freeze plus Frostbolt while your Druid Cyclones the second threat. Nature's Swiftness plus an instant Healing Touch covers any burst you take mid-chain. If the healer is a Druid or Paladin who trinkets the first sheep, re-sheep and reset — you have infinite mana relative to their dispel resources, so the second or third clean chain is the one that connects.",
      cooldownTimeline:
        "Open by summoning the Water Elemental before the gates and pre-HoTing the Mage with Lifebloom and Rejuvenation. Save Icy Veins and the Elemental's Freeze for your committed kill window, not for chip damage. Cold Snap is your second Ice Block and second Frost Nova — bank it to break a stunlock or to double up Novas during a kill push. The Druid holds Barkskin for when a swap comes onto them, Innervate for the long grind against healer comps, and Nature's Swiftness as the emergency instant heal that saves the Mage through a rogue's burst. Trinkets come out for the fear or stun that would otherwise break your kill chain — never earlier.",
      positioning:
        "Live on a pillar. The Mage kites in wide arcs so no melee can free-cast on it, using the pillar to LoS the enemy healer's casts and to drop warlock dots and hunter shots. The Druid plays a slightly separate angle so a single charge or Intercept can't reach both of you, staying close enough to instant-heal but far enough that AoE fear or Cyclone can't catch the pair together. When you commit a kill, pull the target around the pillar so their healer loses line of sight at the exact moment you Nova and burst. Never let yourself get cornered — open space is your damage, and the pillar is your reset.",
      counters: [
        {
          compId: "rogue-druid-2s",
          howToPlay: "The Rogue trains your Mage from the opener and never leaves, and their Druid outheals your damage over a long game — so you must not play the long game. Blanket the opener with Ice Block, Blink out of Cheap Shot and Kidney windows, and Frost Nova plus Blink to peel the Rogue whenever he's on you. Your Druid Cyclones and roots the Rogue to buy Blinks and force cooldowns. Force your kill early: Polymorph the enemy Druid, Counterspell the heal, and burst the Rogue while he's rooted and out of cooldowns. If he Vanishes the sheep, reset on the pillar and try again before their Druid recovers mana.",
        },
        {
          compId: "warlock-druid-2s",
          howToPlay: "Unstable Affliction and Curse of Exhaustion make this a grind — you can't dispel the dots and their fear shatters your CC chains. Play tight LoS to force the Warlock to recast dots and to eat his Fears against the pillar. Trinket the fear that would break your kill window, not a random one. Kill the Warlock, never the Druid: Polymorph the Druid, Counterspell the heal, then Nova the Warlock and commit Water Elemental Freeze plus Icy Veins. Keep the Mage topped with instant HoTs so the dot pressure never converts into a kill, and win the war of attrition by out-CCing their dispels.",
        },
      ],
      tips: [
        "Never sit in your own Frost Nova or an Entangling Root — shapeshift out of snares and roots for free with the Druid, and Blink out on the Mage",
        "Stagger your CC: land Polymorph on the healer, then Cyclone the off-target so the two DR categories never overlap and both stay locked",
        "Bank Cold Snap for a second Ice Block or a double Frost Nova during your kill push — it turns one CC window into two",
        "Counterspell the heal, not the damage — locking the enemy healer's school for 8 seconds is what actually secures the kill",
      ],
      requiredGear: [
        "Mage: resilience first to survive the rogue/warrior train through Ice Block, then Merciless Gladiator's Spellblade with enough spell hit to never resist a Polymorph or Frostbolt, then spell damage and crit",
        "Druid: resilience and stamina to survive hard swaps, then +healing and mp5 (Merciless Gladiator's Refuge) so you can win the long CC-grind games without running dry",
      ],
    },
  },
  {
    id: "mage-holy-paladin-2s",
    name: "Mage / Holy Paladin",
    bracket: "2s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "B",
    playstyle: "control",
    difficulty: 2,
    strengths: [
      "Double crowd control — chained Polymorph, Frost Nova, and Counterspell lock out enemies for entire kill windows.",
      "Mana Burn plus the deepest bubble/heal package in the bracket lets you win pure attrition games.",
      "Near-immunity to melee pressure: Blink, Ice Block, Blessing of Freedom, and Hand of Protection reset any train.",
    ],
    weaknesses: [
      "Very low raw damage — with no burst partner you can go minutes without a real kill threat.",
      "Counterspell or a well-timed kick on the Mage collapses the whole control plan.",
    ],
    keyCounters: [
      "rogue-mage-2s",
      "warlock-druid-2s",
      "hunter-holy-paladin-2s",
    ],
    keyFavors: [
      "warrior-holy-paladin-2s",
      "ret-holy-paladin-2s",
      "warrior-disc-priest-2s",
    ],
    blurb:
      "Mage/Holy Paladin is the patient control comp of the 2s bracket: two of the best CC toolkits in the game stapled to the strongest single-target healer. You rarely burst anyone down — instead you kite, Polymorph, and Mana Burn until the enemy healer is out of gas, then delete their partner in one frozen window. It is a grind, not a race.",
    guide: {
      overview:
        "This is a defensive attrition comp built around never losing and slowly starving the enemy team. The Holy Paladin is one of the tankiest healers in TBC — Blessing of Freedom shrugs off snares, Hand of Protection wipes a melee's whole game plan, Divine Shield buys a full mana-drink, and Cleanse strips the dots and poisons that would otherwise pressure you. Behind that wall the Frost Mage layers Polymorph, Frost Nova, Cone of Cold, and Counterspell to keep both enemies out of range and off your Paladin.\n\nWhat you lack is a kill button. There is no Rogue opener, no PoM-Pyro nuke — your damage is a Shatter combo and chip while everything else is on lockdown. That makes Mana Burn your true win condition: every point you burn off the enemy healer is a point closer to a free kill. Against melee you are a nightmare to catch; against burst setup teams and drain comps you are racing a clock you did not set.",
      winCondition:
        "You win one of two ways, and usually both at once. First, keep the enemy healer permanently uncomfortable: Counterspell their casts, Polymorph them off cooldown when your Paladin is topped, and stack Mana Burns whenever you are not needed for CC — burning a healer to zero ends the game with no damage required. Second, when their healer is locked (Poly, Counterspell lockout, or a Hammer of Justice from your Paladin), open a hard swap on the DPS: Frost Nova, Ice Lance, Frostbolt into a Shatter crit, Cone of Cold, second Ice Lance. If the swap does not kill, disengage with Blink and reset to the attrition plan — you are never forced to commit.",
      cooldownTimeline:
        "Open by dropping Blessing of Freedom preemptively if you smell a melee train, and hold Ice Block and Divine Shield as your two hard resets — never both at once. Icy Veins comes out only when the enemy healer is already CC'd and you have a real Shatter window; wasting it into a full-health, full-mana team is throwing your only offense. Hand of Protection is your panic button for the Mage the instant a Rogue or Warrior sticks — it buys a clean Blink and re-CC. Trinket the first Hammer of Justice or Fear that threatens a kill, then bank Divine Shield + drink to refill mana in long games. Manage Water Elemental as a bonus Frost Nova target and extra Mana Burn body when the game goes past the two-minute drain phase.",
      positioning:
        "Play the pillars religiously — the Mage kites in wide arcs around a line-of-sight object so melee eat Frost Nova and casters lose their target mid-cast, while the Paladin heals from just behind the same pillar so no single caster can train both of you. Never let the Paladin get body-pulled into the open; a caught Holy Paladin gets kicked and killed. Keep the Mage and Paladin on opposite sides of the pillar so an enemy has to pick one to pressure, and use Blink to cross gaps rather than run them. In the Blade's Edge bridge and Nagrand's central pillars, force every fight around the LoS and let the enemy waste globals chasing.",
      counters: [
        {
          compId: "rogue-mage-2s",
          howToPlay: "This is your hardest matchup — they out-CC and out-burst you. The Rogue trains your Mage while their Mage kicks and Counterspells your Polymorphs, and a Blind + Sap can lock your Paladin out of a save. Pre-Freedom is useless against a Rogue, so lean on Hand of Protection on the Mage the moment Cheap Shot lands, then Blink and Ice Block to eat the burst. Cleanse Blind off your Paladin instantly, save Divine Shield for their cooldown burst (Adrenaline Rush/Blade Flurry window), and grind their Mage's mana with Mana Burn — Rogue/Mage has no healer, so any sustained damage on the Mage or a single connect on the Rogue after their cooldowns wins the long game.",
        },
        {
          compId: "warlock-druid-2s",
          howToPlay: "A drain-and-outlast nightmare: the Warlock Life Drains and Curse of Tongues your Paladin while the Druid HoTs and cyclones your Mana Burns away. You cannot burn a team that heals through mana of its own, so shift to the kill plan — Counterspell and Polymorph the Druid, then hard-swap the Warlock with a Shatter combo while their healer is locked. Cleanse Curse of Tongues off the Paladin to keep your GCDs fast, spell-reflect nothing (they have instants), and use Ice Block to break Fear chains. Patience loses this one; you need a committed swap kill in a CC window, not the attrition game.",
        },
      ],
      tips: [
        "Never Polymorph the target you are trying to kill — Poly heals 6% max HP per second. Sheep the healer or the off-target, and kill the person who is Frost Nova'd instead.",
        "Bank Counterspell for the enemy healer's cast, not for damage — its lockout is the longest in the game and buys 8-10 seconds of free Mana Burn or a swap.",
        "Cleanse is proactive: strip Curse of Tongues, poisons, and dots off your Paladin the instant they land so your heals and GCDs stay fast.",
        "Hold Ice Block and Divine Shield as separate resets on separate threats — blowing both in the same panic leaves you naked for the next 3 minutes.",
      ],
      requiredGear: [
        "Mage: Vengeful Gladiator's set for max resilience, prioritize spell hit to guarantee Polymorph/Counterspell land, and a high-spellpower weapon (Gladiator's Spellblade) for Shatter burst.",
        "Paladin: stack resilience plus Intellect/mp5 for mana longevity in drain games, with enough spell power on the healing weapon and off-hand to make Flash of Light land hard under pressure.",
      ],
    },
  },
  {
    id: "ret-druid-2s",
    name: "Ret Paladin / Resto Druid",
    bracket: "2s",
    members: [
      { class: "paladin", spec: "retribution" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "sustain",
    difficulty: 2,
    strengths: [
      "Two CC schools stacked — Cyclone/Roots/Bash plus Repentance and Hammer of Justice",
      "HoT healing plus Blessing of Sacrifice/Freedom makes the Ret nearly un-trainable",
      "Rolls melee cleaves that can never kill the protected, kiting druid",
    ],
    weaknesses: [
      "Druid's small mana pool folds to Mana Burn and long games",
      "Repentance breaks on any damage — sloppy CC chains fall apart fast",
    ],
    keyCounters: [
      "warlock-disc-priest-2s",
      "rogue-disc-priest-2s",
      "frost-mage-disc-priest-2s",
    ],
    keyFavors: [
      "ret-holy-paladin-2s",
      "warrior-shaman-2s",
      "warrior-holy-paladin-2s",
    ],
    blurb:
      "'Ret/Druid.' A sustain-and-control comp that wins by outlasting: the druid rolls HoTs and chains Cyclone/Roots/Bash while the Ret adds Repentance and a Hammer of Justice stun. Blessing of Sacrifice and Freedom keep the druid free, and layered CC on the enemy healer eventually forces the kill.",
    guide: {
      overview:
        "Ret/Druid is a sustain comp built on two independent CC schools and a healer that is very hard to fully lock down. The druid keeps Lifebloom/Rejuv rolling on the Ret and stays mobile, while the Ret provides constant Crusader Strike/Judgement pressure plus Repentance and Hammer of Justice. Blessing of Freedom keeps both partners un-snared and Blessing of Sacrifice bleeds threat off the druid when melee trains it, so you rarely lose the healer to a swap.\n\nThe win is patience: stack Cyclone, Roots, Bash, Repentance and Hammer of Justice on the enemy healer until a kill window opens with no counter-heal. The ceiling is capped by mana — the druid has a small pool and loses long Mana Burn games — but against melee and burst teams the layered control and un-peelable healing grind them out.",
      winCondition:
        "Chain-CC the enemy healer off a kill — Cyclone or Repentance the healer while the Ret lands Avenging Wrath + Hammer of Justice on the target, so the burst lands with zero counter-heal.",
      cooldownTimeline:
        "Druid pre-HoTs the Ret and opens control; when a kill window appears, Cyclone the enemy healer, Ret drops Repentance to extend the lockout, then pops Avenging Wrath + trinket + Hammer of Justice on the target. Blessing of Freedom keeps the Ret on target through snares; Blessing of Sacrifice and Barkskin cover the druid if it gets swapped, and Innervate refuels between attempts.",
      positioning:
        "Druid kites wide and uses pillars to break line of sight on casters; the Ret bodyblocks and peels melee off the druid with Hammer of Justice and Repentance. Keep the two partners apart enough that AoE and cleave can't pressure both, and never let the druid get cornered — its survival is the whole game plan.",
      counters: [
        {
          compId: "warlock-disc-priest-2s",
          howToPlay: "Mana Burn on the druid and DoTs through HoTs beat you in a long game, so you cannot grind them. Repentance the priest, Cyclone the felhunter or priest during the burst, and all-in the warlock with Avenging Wrath before your mana runs dry — a fast kill is the only path.",
        },
        {
          compId: "rogue-disc-priest-2s",
          howToPlay: "The rogue trains the druid while the priest Mana Burns and dispels your CC. Blessing of Sacrifice and Freedom to peel the rogue, Bash/Repentance to buy kite time, and swap pressure onto the rogue when he blows cooldowns — force the priest to heal so he can't Burn.",
        },
      ],
      tips: [
        "Layer your CC — Cyclone into Repentance into Hammer of Justice keeps the healer locked far longer than any single school.",
        "Repentance breaks on damage; call it clearly so the Ret doesn't judge the target you just CC'd.",
        "Blessing of Sacrifice is your anti-swap button — use it the moment melee trains the druid.",
        "Watch the druid's mana; you can't win a long Burn game, so commit to kill windows instead of stalling.",
      ],
      requiredGear: [
        "Ret: resilience + a big two-hander so the Avenging Wrath window actually kills",
        "Druid: resilience + all the mana/int it can carry to survive long games",
      ],
    },
  },
  {
    id: "ret-disc-priest-2s",
    name: "Ret Paladin / Disc Priest",
    bracket: "2s",
    members: [
      { class: "paladin", spec: "retribution" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "C",
    playstyle: "burst",
    difficulty: 3,
    strengths: [
      "Explosive Avenging Wrath + Power Infusion burst can global a target",
      "Double CC school — Repentance and Hammer of Justice don't share DR",
      "Priest utility (Fear, Mass Dispel, Mana Burn) buys the burst window",
    ],
    weaknesses: [
      "Ret folds instantly when focused and has no gap-closer beyond Freedom",
      "Kited to death by Druid teams that outlast a single burst",
    ],
    keyCounters: [
      "rogue-druid-2s",
      "warlock-druid-2s",
      "mage-druid-2s",
    ],
    keyFavors: [
      "ret-shaman-2s",
      "warrior-shaman-2s",
    ],
    blurb:
      "A one-shot-window burst comp built around a single perfect setup. The priest Power Infuses the Ret while Repentance locks the healer, then Avenging Wrath, Crusader Strike and a twisted Seal of Command try to delete a target before anyone can react. Feast-or-famine, and it lives and dies by the opening.",
    guide: {
      overview:
        "Ret/Disc is a glass-cannon burst comp. The Ret Paladin is a support-melee that does almost nothing threatening outside of its cooldowns, but during an Avenging Wrath window — amplified by the priest's Power Infusion — a Judgement into Crusader Strike into a twisted Seal of Command/Seal of Blood swing hits like a truck. Everything about the comp is engineered to land one clean burst before the enemy stabilizes.\n\nThe hard part is manufacturing that window. Repentance on the enemy healer is your setup CC, Hammer of Justice locks the kill target, and the priest's Fear, Mass Dispel and Power Word: Shield keep you alive long enough to swing. Miss the opener or let the Ret get kited and the comp has almost no follow-up — you're a squishy melee and a mana-hungry priest grinding a game you're built to end quickly.",
      winCondition:
        "Repentance the enemy healer, blow Avenging Wrath + trinket with the priest's Power Infusion on you, and burst the kill target with Judgement → Crusader Strike → a twisted Seal of Command swing while Hammer of Justice keeps them stunned. The target dies inside that stun or you reset and try to rebuild cooldowns.",
      cooldownTimeline:
        "Open with Repentance on the healer to remove peels, then stack on their DPS. Priest casts Power Infusion on the Ret as you pop Avenging Wrath + on-use trinket; Judgement the seal, Crusader Strike, and time your Seal of Command→Seal of Blood twist to land a double-proc swing, Hammer of Justice layered on top to extend the lockout. If the healer trinkets Repentance early, Fear or Mana Burn them instead and re-burst on the next Avenging Wrath. Priest holds Pain Suppression and Psychic Scream to survive the inevitable return swap.",
      positioning:
        "Play tight to a pillar so the priest can LoS casters and the Ret can close from cover — you have no charge, so you must approach behind terrain. Pre-position on the kill target before committing Repentance so the burst starts the instant CC lands. Keep Blessing of Freedom on the Ret for the snare that's coming, and Blessing of Protection or Divine Shield ready when the enemy swaps onto your priest.",
      counters: [
        {
          compId: "rogue-druid-2s",
          howToPlay: "The Druid kites the Ret with Cyclone and roots while the Rogue chains Cheap Shot/Kidney and Blind onto your priest. Never let the Ret get pulled off the pillar — save Blessing of Freedom for the root chain, Cleanse the roots, and have the priest Mass Dispel the Cyclone off the Ret so you can still burst. Force the Rogue to blow cooldowns on the paladin's bubble, then swap the Druid in a Repentance.",
        },
        {
          compId: "warlock-druid-2s",
          howToPlay: "This is a mana and kiting nightmare: the Druid Cyclones and roots the Ret out of range while the Warlock Fears, dots, and drains your priest's mana with a Felhunter shutting down your dispels. You cannot win the long game, so you must land the opener — Repentance the Druid, Hammer of Justice the Warlock, and blow everything to kill the Warlock before Death Coil and the second Fear come online. Mana Burn the Druid on any reset.",
        },
      ],
      tips: [
        "Repentance breaks on any damage — never open it on a target your priest has a DoT or Prayer of Mending ticking on.",
        "Power Infusion is a burst button, not a mana crutch: sync it with Avenging Wrath every time, don't spend it on healing.",
        "Practice the Seal of Command → Seal of Blood twist on the target dummy until the double-proc is automatic; it's most of your damage.",
        "Save Hammer of Justice for the kill window as a pseudo-interrupt/stun, not to peel early — it and Repentance are your only hard CC.",
      ],
      requiredGear: [
        "Ret: resilience to survive the return swap plus the biggest two-hander you can get — weapon damage drives the whole burst",
        "Priest: resilience and mp5/Intellect — Power Infusion and a long Fear game both cost mana you can't afford to run dry",
      ],
    },
  },
  {
    id: "shatterplay-3s",
    name: "Shatterplay (Mage / Shadow Priest / Druid)",
    bracket: "3s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "priest", spec: "shadow" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Double instant CC — Cyclone plus Psychic Scream — layered on Sheep and Counterspell for total board control",
      "The Shatter combo deletes a target inside one Frost Nova window",
      "Silence + Counterspell locks a healer out of the game while the kill lands",
    ],
    weaknesses: [
      "No hard peel for the priest — trained melee that stick can collapse the setup",
      "Warlock spell-lock and Fear shut down the mage and priest at the worst moments",
    ],
    keyCounters: [
      "rls-3s",
      "tsg-3s",
    ],
    keyFavors: [
      "beastcleave-3s",
      "retcleave-3s",
      "warrior-cleave-3s",
    ],
    blurb:
      "Shadow Priest's flagship comp and the caster answer to RMP. The Shadow Priest sets up with Silence and Mind Blast, the Frost Mage delivers the Shatter combo, and the Resto Druid layers Cyclone for a second hard CC. Pure setup control with two schools of instant crowd control instead of one.",
    guide: {
      overview:
        "Shatterplay is a caster-control setup comp built around the Shatter kill window. The Frost Mage freezes a target with Frost Nova or a Water Elemental's Freeze, then dumps a guaranteed-crit Frostbolt plus Ice Lance while the Shadow Priest stacks Mind Blast, Shadow Word: Death, and Shadow Word: Pain onto the same target. Everything is scripted toward one clean burst window.\n\nWhat separates it from RMP is the second instant CC: the Druid's Cyclone and the priest's Psychic Scream give you two ways to remove the enemy healer without a cast, layered on top of Polymorph, Counterspell, and Silence. You out-control the enemy rather than out-tempo them, chaining CC on the healer so nothing gets healed while the mage and priest delete a DPS.",
      winCondition:
        "Lock the enemy healer out with Silence + Counterspell + Cyclone while the mage freezes the kill target and lands a Shatter combo (Frost Nova → Frostbolt → Ice Lance, all crits) stacked with the priest's Mind Blast and Shadow Word: Death before the CC breaks.",
      cooldownTimeline:
        "Sheep or Cyclone the healer to open. Mage Frostbolts the kill target, drops Frost Nova (or Elemental Freeze), and fires the Shatter combo with Icy Veins up; priest weaves Mind Blast → Shadow Word: Death and refreshes Shadow Word: Pain. Silence and Counterspell shut down the healer's first cast attempt, Cyclone extends the lockout, and Psychic Scream peels anyone on the priest. If the kill stalls, Ice Block / Barkskin / LoS to reset and re-open the CC chain.",
      positioning:
        "Mage and priest hug a pillar for LoS and to bait the enemy into breaking line for their own CC; the druid floats behind them where it can Cyclone and still reach both casters with Rejuvenation and Swiftmend. Keep the priest away from melee — it has no self-peel besides one Psychic Scream, so the druid and mage must Root, Nova, and Cyclone anything that trains it.",
      counters: [
        {
          compId: "rls-3s",
          howToPlay: "The Felhunter's Spell Lock and constant Fear wreck your setup — a locked school kills the Shatter window and a Fear scatters your CC chain. Bait Spell Lock with a fake cast before committing the real combo, save Cyclone for the shaman rather than the rogue, and Nature's Swiftness the druid through the DoT pressure. You need to land your kill fast before UA and rogue burst grind the priest down.",
        },
        {
          compId: "tsg-3s",
          howToPlay: "Two warriors plus a shaman will train your priest and ignore your CC through Berserker Rage and trinkets. Play deep behind the pillar, kite with Frost Nova, Roots, and Cyclone on a warrior, and don't force the burst — peel both warriors off the priest first, then delete the shaman or a warrior in a single Shatter window once they're controlled.",
        },
      ],
      tips: [
        "Fake-cast to bait Counterspell, Spell Lock, and Earth Shock before you commit the real Shatter combo.",
        "Cyclone is your reset button on the healer — chain it into Sheep/Silence so no heal ever lands during the kill.",
        "Save the mage's Water Elemental Freeze as a second Frost Nova to double your Shatter windows.",
        "Never blow the full CC chain without the burst ready — CC without a kill just resets the enemy for free.",
      ],
      requiredGear: [
        "All three need resilience; the priest and mage want stamina to survive cleave swaps, the druid stacks mana/int and mp5 for long games",
        "Mage needs enough spell power for a lethal Shatter; priest wants spell power + spell haste to fit Mind Blast into the window",
      ],
    },
  },
  {
    id: "shadowplay-3s",
    name: "Shadowplay / Drain (Shadow Priest / Lock / Shaman)",
    bracket: "3s",
    members: [
      { class: "priest", spec: "shadow" },
      { class: "warlock", spec: "affliction" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "sustain",
    difficulty: 3,
    strengths: [
      "Relentless spread DoT rot plus Mana Burn drains healers dry — almost nothing survives to dampening",
      "Triple-fear layering (Psychic Scream, Howl of Terror, Fear) locks a target out of the game on demand",
      "Resto shaman's Grounding, Tremor, and Nature's Swiftness make the team nearly impossible to burst or CC-kill",
    ],
    weaknesses: [
      "A locked-down shaman folds fast — Counterspell + Silence chains on him crater your sustain",
      "Low kill pressure into resilience-stacked healers; games that reach a coin-flip Bloodlust window can slip away",
    ],
    keyCounters: [
      "rmp-3s",
      "shatterplay-3s",
    ],
    keyFavors: [
      "warrior-cleave-3s",
      "retcleave-3s",
      "tsg-3s",
    ],
    blurb:
      "Shadowplay is the definitive TBC attrition comp: a Shadow Priest and Affliction Warlock blanket all three enemies in DoTs while Mana Burn bleeds the healer white, and a Resto Shaman makes the trio nearly unkillable. You don't burst anyone down — you fear, drain, and rot until the enemy healer is out of mana and the whole team collapses at once.",
    guide: {
      overview:
        "The game plan is patient and suffocating. The Warlock keeps Corruption, Unstable Affliction, Curse of Agony, and Siphon Life rolling on multiple targets while the Priest layers Shadow Word: Pain and Vampiric Touch, then hammers the enemy healer with Mana Burn between Mind Blast and Mind Flay. Every dispel the healer casts is punished — Unstable Affliction silences on removal, and the sheer DoT volume means they can never fully clean it. Meanwhile the Shaman purges buffs, Earth Shocks casts, and drops totems that neutralize the enemy's own CC and burst attempts.\n\nWin the mana war and the kill falls out for free. As the enemy healer dips toward empty, you tighten fear rotations across separate DR, collapse on a clothie or the healer, and let stacked DoTs plus a Shadow Word: Death finish the job. Bloodlust and trinkets turn that attrition edge into a hard kill window. The whole comp lives or dies on keeping the Shaman free — protect him and you simply cannot be outlasted.",
      winCondition:
        "You win by attrition: keep full DoT coverage (Corruption, Unstable Affliction, Curse of Agony, Siphon Life from the Warlock; Shadow Word: Pain and Vampiric Touch from the Priest) rolling on the enemy healer and a secondary, while the Priest spams Mana Burn to strip the healer's pool faster than they can drink. Once the healer is near empty, chain-fear them out with Psychic Scream, Howl of Terror, and the Warlock's Fear on staggered DR, then dump on your kill target — usually the OOM healer or an exposed clothie — with Mind Blast, Shadow Word: Death, and detonating DoTs to close before anyone can top them.",
      cooldownTimeline:
        "Open by ramping DoTs and applying Curse of Tongues to the healer; drop Mana Tide Totem early to stay ahead in the mana race, and use Shadowfiend to refuel the Priest for sustained Mana Burn. Save the Warlock's Felhunter Spell Lock for the enemy's key heal or a mage's Polymorph, and hold PvP trinkets for the kill-window fear chain rather than the first CC. When the enemy healer is drained, pop Bloodlust plus Power Infusion on the Priest, land the fear layering, and burst — Nature's Swiftness + Healing Wave is your emergency reset if they try to swap onto the Shaman during your go.",
      positioning:
        "Play the pillars and stay spread so a single Shadowfury or AoE fear can't catch all three, and so your own fears land on different targets without overlapping DR. The Shaman sits at max range with line of sight on enemy casters for Earth Shock interrupts and Purge, but behind a pillar edge he can duck for Polymorph and Fear — keep Grounding Totem down for their burst/CC and Tremor Totem up against enemy fear comps. The Priest and Warlock kite melee freely; never let the team get stacked where the enemy can train the Shaman uninterrupted.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "The Mage is the whole problem — Counterspell and shatter combos on your Shaman, Polymorph to reset, and burst that can global a clothie through your DoTs. Pre-drop Grounding Totem for Polymorph and the opener nuke, and keep the Shaman LoS behind a pillar so he can't be Counterspelled and sheeped at once. Spread hard so the Rogue can't cheap-shot into a shatter on the Priest. Trade fears aggressively onto the Mage and Priest to deny their setup, purge Ice Barrier, and grind the game long — RMP's mana and cooldowns run out before yours if you survive the first two burst attempts.",
        },
        {
          compId: "shatterplay-3s",
          howToPlay: "Their Mage provides the same shatter burst threat, and their Shadow Priest mirrors your Mana Burn, so the attrition edge you rely on shrinks. Protect the Shaman with Grounding and Tremor, keep everyone spread against Frost Nova + Shatter setups, and out-tempo their control by fear-chaining their Mage off casts. Purge is huge here — strip Ice Barrier and any Power Infusion. Race their healer's mana with your own Mana Burn while your Warlock's Unstable Affliction punishes every dispel; whoever's healer breaks first loses, so funnel Priest pressure onto their weaker-resilience support.",
        },
      ],
      tips: [
        "Never dispel greedily on their DoTs mid-game — but on your offense, coordinate fears on separate DR (Psychic Scream, then Warlock Fear, then Howl of Terror) so the healer is locked out the entire kill window.",
        "Keep the Warlock's Felhunter parked on the enemy healer for Spell Lock and Devour Magic; a single silenced heal often decides the mana race.",
        "Shaman must Purge on cooldown — stripping Ice Barrier, PW:Shield, or Power Infusion removes far more effective health than a spot heal adds.",
        "Watch enemy healer mana as your primary resource bar; don't force the kill until Mana Burn and drains have them near empty, then commit trinkets and Bloodlust together.",
      ],
      requiredGear: [
        "Priest and Warlock stack Merciless Gladiator resilience with spell damage and the 3% spell hit needed for reliable DoTs/Mana Burn — Gladiator's spellblade/wand offhands for the extra spell power.",
        "Shaman prioritizes resilience plus a deep mana pool and MP5 to win long attrition games, running Merciless Gladiator mail and a healing-weight one-hander/shield over raw spellpower.",
      ],
    },
  },
  {
    id: "jungle-cleave-3s",
    name: "Jungle Cleave (Feral / Hunter / Shaman)",
    bracket: "3s",
    members: [
      { class: "druid", spec: "feral-cat" },
      { class: "hunter", spec: "beast-mastery" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Two mobile, hard-to-peel melee — Feral Charge and pet uptime keep pressure glued to a target through kiting",
      "Bestial Wrath + The Beast Within makes the hunter and pet CC-immune for a guaranteed burst window",
      "Deep, layered CC: Cyclone, Wyvern Sting, Freezing Trap, Scatter Shot and Maim can lock two enemies at once",
    ],
    weaknesses: [
      "No caster interrupt on the roster, so a healer that gets a Grounding-safe cast off can stabilize easily",
      "Shaman is squishy and immobile — trap-and-train the shaman and the whole comp folds",
    ],
    keyCounters: [
      "rmp-3s",
      "lsd-3s",
    ],
    keyFavors: [
      "shatterplay-3s",
      "shadowplay-3s",
    ],
    blurb:
      "Jungle Cleave is the double-melee bruiser of the physical bracket: a Feral cat and a Beast-Mastery hunter chase one target while a Resto Shaman keeps them topped and drops totems to blunt enemy CC. It wins by never letting the kill target breathe — Feral Charge, pet uptime and a stacked burst window mean the pressure simply does not come off. Its identity is relentless, layered melee damage backed by more CC than any pure cleave has a right to.",
    guide: {
      overview:
        "Jungle Cleave is a pressure-cleave built around two of the best sticky melee in TBC. The Feral druid brings Mangle-armor shredding, bleed damage and a full CC kit (Cyclone, Bash, Maim), while the Beast-Mastery hunter layers Kill Command burst, traps and a burst window where he and his pet cannot be crowd-controlled. The Resto Shaman glues it together with Earth Shield, Nature's Swiftness, Grounding and Tremor totems, and enough Purge pressure to strip shields off enemy healers.\n\nThe comp's ceiling is defined by CC layering rather than raw damage. Because neither DPS relies on casting, they keep hitting through most defensive play, and the hunter can peel his own shaman with Scatter Shot, Wyvern Sting and Freezing Trap. The weakness is symmetrical: the roster has no spell interrupt, so a healer left free to hardcast will out-heal a sloppy train. Winning means chaining CC on the enemy healer while the melee dump everything into a soft target.",
      winCondition:
        "Pick a squishy target — enemy healer's DPS partner or a cloth caster — and open the burst window: the hunter pops Bestial Wrath and The Beast Within so he and the pet are CC-immune, syncs Kill Command with the Feral's Mangle into Rake and a big Ferocious Bite, while the shaman keeps Earth Shield rolling and Purges enemy absorbs. The kill comes when the enemy healer is locked out — Wyvern Sting or Freezing Trap the healer, Cyclone the off-peeler, and the two melee delete the target inside a single Bestial Wrath. If the first go stalls, Scatter Shot into a re-trap resets the healer for a second attempt.",
      cooldownTimeline:
        "Round one, land CC on the healer before committing — Freezing Trap or Wyvern Sting buys the clean opener. Then the hunter fires Bestial Wrath + The Beast Within timed with the Feral's Mangle burst and Kill Command for the main damage spike; hold Nature's Swiftness on the shaman purely as an emergency instant Healing Wave, never spent early. Readiness gives the hunter a second Freezing Trap and Scatter Shot to re-chain CC on the healer for the follow-up. Drop Grounding Totem to eat a Polymorph or Fear, Tremor Totem against fear teams, and save Feral Charge to shut a healer's cast the instant your CC drops.",
      positioning:
        "The hunter plays max range and manages his deadzone, kiting melee with Wing Clip, Frost Trap and Aspect of the Cheetah while never dropping pet uptime on the kill target. The Feral stays welded to the target, using Dash and Feral Charge to close gaps and Cower to shed threat swaps. The shaman is the pivot — he hugs a pillar for LOS against casters, keeps Earth Shield on whichever melee is being trained, and pre-drops Grounding and Tremor before the enemy setup lands. Against caster teams, force fights around pillars so their hardcasts eat LOS; against melee, peel for the shaman with Scatter Shot, traps and Maim.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "RMP dismantles a cleave with CC volume: Polymorph and Blind chain the shaman while the mage kites the hunter into his deadzone and the rogue peels the Feral. Beat it by opening on the mage or priest, not the rogue — force early Blink and Ice Block. Grounding Totem their Polymorphs, Tremor is dead weight here so run Grounding, and save Freezing Trap for the priest so the shaman survives the Blind. The hunter must not get trapped in the deadzone: Aspect of the Pack out of Frost Nova range and keep the pet on the mage to pressure Blink.",
        },
        {
          compId: "lsd-3s",
          howToPlay: "LSD (Warlock/Shaman/Druid) outlasts you through fear, drains and dispels — a straight damage race loses. Tremor Totem is mandatory to survive Fear chains, and the shaman must Purge the druid's HoTs and the warlock's shields relentlessly. Train the Resto Shaman or Elemental partner, not the warlock, and Wyvern Sting the druid to stop the cross-heal. The hunter's Viper Sting on the healer and heavy Purge pressure are your real win condition — end the game before your own mana runs dry, because their drain outlasts a slow train.",
        },
      ],
      tips: [
        "Never blow Bestial Wrath without CC on the healer first — an uncontrolled burst just gets healed through and wastes your window.",
        "Grounding Totem is your single best tempo tool: pre-drop it to eat the enemy's key Polymorph, Fear or Cyclone right before your go.",
        "Use the hunter to peel your own shaman — Scatter Shot, Freezing Trap and Wyvern Sting on enemy melee keep the healer alive far longer than out-healing does.",
        "Purge is free value every global the shaman isn't healing: strip Power Word: Shield, Blessing of Protection windows and druid HoTs to make your damage stick.",
      ],
      requiredGear: [
        "Feral wants a high-DPS feral weapon (staff/polearm) for attack power and Merciless Gladiator's pieces for crit; hunter prioritizes a fast Merciless ranged weapon, crit and resilience for reliable Kill Command spikes.",
        "Resto Shaman stacks resilience first, then Intellect/mp5 to survive long CC games — Earth Shield uptime and Mana Tide are what carry attrition fights, so mana longevity beats raw throughput.",
      ],
    },
  },
  {
    id: "rmd-3s",
    name: "RMD (Rogue / Mage / Druid)",
    bracket: "3s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "mage", spec: "frost" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Two full CC schools stacked outside each other's DR — Polymorph, Cyclone, Blind, and Kidney Shot let you lock a healer near-permanently while you burst his partner.",
      "Elite mana longevity and kiting: Innervate, Water Elemental, and Travel Form mean you win the long game against anyone who can't close the fight fast.",
      "Layered peels — Frost Nova, Roots, Cyclone, Cheap Shot, and Kick keep melee off the mage while the rogue dictates the kill.",
    ],
    weaknesses: [
      "No dispel and no fear — you can't strip HoTs, shields, or UA, so dispel-healer comps unravel your entire Cyclone/Poly lock.",
      "The mage is the whole engine; if he gets caught out of position or trained through cooldowns, your damage and control both collapse.",
    ],
    keyCounters: [
      "rmp-3s",
      "rls-3s",
    ],
    keyFavors: [
      "warrior-cleave-3s",
      "retcleave-3s",
      "beastcleave-3s",
    ],
    blurb:
      "RMD is RMP's patient cousin: trade the priest's dispels and shields for a Resto Druid's Cyclone, rolling HoTs, and best-in-class mobility. It's a control comp that suffocates opponents with overlapping crowd control and simply refuses to run out of mana. You don't out-burst the room — you out-last it, then collapse on a kill when the CC finally lines up.",
    guide: {
      overview:
        "RMD wins by turning the arena into a war of attrition it is built to win. The mage and rogue chain crowd control across separate diminishing-return schools — Polymorph, Cyclone, Blind, Sap, and Kidney Shot — so an enemy healer can be locked out of the game for absurdly long stretches while his damage partner gets focused. Between kill attempts, the druid keeps Rejuvenation and Lifebloom ticking, drinks behind pillars, and Innervates back to full, so your resource bar outlasts anything the other team brings.\n\nThe tradeoff versus RMP is real: no Mass Dispel, no fear, no Pain Suppression-tier peel — but you gain a second hard-CC school in Cyclone, far better kiting, and a healer who is genuinely hard to kill through HoTs and Barkskin. Against melee you are a nightmare of Frost Novas, Roots, and Cyclones; against dispel comps you have to grind out kills before your CC gets shattered.",
      winCondition:
        "Land a clean setup and burst one target inside a full CC chain on the healer. The rogue Saps or Blinds the off-target, the mage Sheeps the healer, and the druid Cyclones him the instant Poly breaks or is dispelled, stacking control across DR schools. On the kill target the rogue opens Cheap Shot into a Cold Blood Ambush or Hemorrhage pressure, the mage drops a Frost Nova shatter combo (Frostbolt into Ice Lance), and the druid Roots or Cyclones anyone trying to peel. Kidney Shot extends the window; if the healer is locked and your target is under 40%, that's the kill. If it doesn't die, reset behind a pillar, drink, and go again — you have infinitely more resets than they do.",
      cooldownTimeline:
        "Open only when your CC is up. The rogue leads with Premeditation plus Cheap Shot and holds Cold Blood for the Ambush crit; Preparation later re-arms Blind, Vanish, and Cold Blood for a guaranteed second go. The mage times Icy Veins and the Water Elemental's Freeze with the rogue's stun, keeping Cold Snap to double up Frost Nova or Ice Block under pressure, and Counterspell for the healer's clutch cast. The druid pre-rolls HoTs before committing, saves Nature's Swiftness plus Healing Touch for the enemy burst answer, and Barkskin when trained. Blind plus Cloak of Shadows is your escape valve; Innervate goes on cooldown the moment mana dips so you never lose the attrition race.",
      positioning:
        "Play the pillar, always. The mage and druid stay wrapped around a line-of-sight object so casters can't free-cast on them and melee eat a Frost Nova the moment they commit. The rogue roams to control the enemy healer with Kick and Blind and to punish anyone who steps wide. Keep the druid on the opposite side of the pillar from the enemy's kill pressure so he can HoT, drink, and reset LoS at will. Never let the mage get bridged or cornered — he is the kill target every good team wants, and if he dies the comp is over. When in doubt, back off, re-establish the pillar, and make them come to you.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "The mirror-with-a-priest is your hardest game — their Mass Dispel and dispels shred your Poly and Cyclone, and their fear peels your rogue. Win the CC war on their mage: your rogue shadows him with Kick and Cheap Shot while your mage Counterspells the priest's heal, and force them to blow trinket and dispel early so your real kill attempt lands into a naked healer. Cyclone the priest through fear DR windows and burst their rogue when he's the one caught out. Patience beats them — bait cooldowns, reset, and only commit when their dispel is on cooldown.",
        },
        {
          compId: "rls-3s",
          howToPlay: "Rogue/Warlock/Shaman drains your mana, purges your HoTs, and the Spell Lock plus fear shuts your mage down. Never tunnel — LoS the warlock's Shadow Bolts and Fears religiously and make the shaman waste Purge on decoy HoTs. Train the shaman or the rogue instead of the tanky warlock: Cyclone the shaman off his Grounding/Tremor, and use rogue Blind plus Cloak to dodge the fear-and-drain chain. Bank Innervate to out-sustain their drain, and only open when Spell Lock is down so your kill combo doesn't get kicked mid-cast.",
        },
      ],
      tips: [
        "Stagger your CC across schools — never Cyclone into an existing Poly DR. Sheep first, Cyclone as it breaks, Blind the third, and the healer never plays.",
        "Pre-roll HoTs before every commit so the druid can spend the burst window Cycloning and peeling instead of hard-casting under pressure.",
        "Preparation is a full second kill attempt — treat the first Blind/Cold Blood go as a probe, then re-arm and hit the real one into their spent cooldowns.",
        "Innervate on cooldown, not on empty. Winning the mana war is your actual win condition against anyone you can't burst outright.",
      ],
      requiredGear: [
        "Rogue and mage prioritize resilience to survive the shatter/train meta, with a fast off-hand plus Deadly/Crippling poisons on the rogue and Spellstrike/Spellfire hit-capped burst on the mage.",
        "Druid stacks resilience, +healing, and heavy mana/regen (Mp5 and spirit) to win long games — Nature's Swiftness gear and a PvP trinket to break the stun that kills the comp.",
      ],
    },
  },
  {
    id: "rld-3s",
    name: "RLD (Rogue / Lock / Druid)",
    bracket: "3s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "warlock", spec: "affliction" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "A",
    playstyle: "sustain",
    difficulty: 3,
    strengths: [
      "Layered lockdown — Cheap Shot into Kidney Shot, Blind, and Cyclone chains that keep a healer silenced for whole kill windows",
      "Relentless attrition — Unstable Affliction, Corruption, Curse of Agony, and Siphon Life tick while the Warlock drains both enemies dry",
      "Two resets on demand — Vanish plus Preparation lets the Rogue re-stealth and rerun a clean opener whenever a go stalls",
    ],
    weaknesses: [
      "The Druid is the whole game plan — lose the Rogue's peels and a coordinated swap collapses your only healer fast",
      "Purge and Dispel Magic strip the Warlock's DoTs, letting mana-efficient teams outlast your rot",
    ],
    keyCounters: [
      "rmp-3s",
      "lsd-3s",
    ],
    keyFavors: [
      "warrior-cleave-3s",
      "turbocleave-3s",
      "beastcleave-3s",
    ],
    blurb:
      "RLD is the patient control comp: a Subtlety Rogue dictating tempo, an Affliction Warlock rotting both targets while draining their mana, and a Resto Druid who simply refuses to die. You don't need a 3-second kill — you need one clean Blind-and-Cyclone chain on their healer while the DoTs and drains have already put the enemy team into triage.",
    guide: {
      overview:
        "RLD wins two ways at once, and that duality is its whole identity. The passive plan is attrition — Unstable Affliction, Corruption, Curse of Agony, and Siphon Life spread across both enemies while the Warlock alternates Drain Life and Drain Mana, so even a match with zero kill pressure slowly starves the other healer into an empty bar. The active plan is the setup: the Rogue opens from stealth, forces trinkets with Cheap Shot and Kidney Shot, then the team stacks Blind on the healer and a Cyclone on a peeler to open a clean window on the kill target.\n\nThe Druid is both the anchor and the liability. Superior HoT efficiency, Barkskin, and Nature's Swiftness Healing Touch let it soak enormous pressure, and the Felhunter's Devour Magic plus Spell Lock protects it from magic bursts and interrupts key casts. But every enemy game plan is \\\"train the Druid,\\\" so the Rogue's peels — Blind, Gouge, Kidney Shot on the incoming melee — are as important as its damage. Play it as tempo, not as a race: reset with Vanish, reload with Preparation, and end the game on the go where the enemy healer is both low on mana and locked out of the fight.",
      winCondition:
        "You win by draining the enemy healer to empty and then landing a coordinated lockout, not by out-bursting anyone. Keep full DoT coverage — Unstable Affliction, Corruption, Curse of Agony, Siphon Life — rolling on both enemies so the healer is always triaging, while the Warlock weaves Drain Mana to accelerate the OOM. When their healer is low on mana, call the go: Rogue Cheap Shot to Kidney Shot on the kill target to burn its trinket, Blind on the enemy healer, Cyclone on any off-peeler, and dump Hemorrhage-boosted Ambush damage plus a Death Coil into the stunned target. If it doesn't die, Vanish, re-stealth, and run it again — the drain has only gotten worse for them.",
      cooldownTimeline:
        "Open with a Sap on a DPS to start the match 3v2 and let the Rogue land Premeditation into a clean Cheap Shot. First real go: Kidney Shot forces the target's trinket, immediately chain Blind onto the enemy healer and Cyclone the second peeler so nothing lands during the stun. Save Preparation for the second attempt — it hands you a fresh Vanish, Blind, and Kidney Shot back-to-back. Cloak of Shadows is the Rogue's answer to Polymorph or a magic swap onto it; Nature's Swiftness plus Barkskin are the Druid's panic buttons when a stun lands during pressure. Innervate goes on the Druid the moment it dips, never preemptively.",
      positioning:
        "Play the Druid in a pillar-hugging pocket where it can LoS enemy casters and reset its own casts, with the Warlock a step behind so it can free-cast DoTs and drains without eating melee. The Rogue roams — living on the enemy healer between kill windows, peeling anything that touches your Druid with Gouge and Kidney Shot. Never let the enemy dictate a fight in the open; funnel every go around a pillar so your Blind and Cyclone chains can't be trinket-and-swapped, and so the Druid always has a wall to juke Poly and casted stuns.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "RMP out-controls you on the Druid — chained Polymorph, Blind, and a Sap opener can keep your only healer CC'd through a full Rogue-Mage burst. Pre-DoT the Mage so Ice Block and Blink don't reset your pressure for free, and hold Cloak of Shadows on the Rogue to survive the swap when they train it. Your Druid must play tight to LoS every Polymorph and save Barkskin plus trinket for the Shatter go; the Felhunter's Spell Lock on the Mage's Poly is often the single cast that saves the game. Grind it long — once their Mage and Priest are low on mana your drains win, so don't over-commit an early go into full trinkets.",
        },
        {
          compId: "lsd-3s",
          howToPlay: "LSD is the attrition mirror that beats you at your own game: the Shaman's Purge strips your Unstable Affliction and Corruption while Tremor Totem shrugs off your Fear and Blind chains, and their double-caster drain outlasts your single Warlock. Kill the totems on cooldown and time your Fears between Tremor pulses. Because you can't reliably OOM them, you must convert to a kill — funnel everything onto the Shaman behind a pillar, use the Rogue to Kick and Kidney Shot its heals, and land Cyclone on their Druid to strip its peel during the go. Cheap Shot the Shaman to deny Grounding-immune reactive totem drops and force the fight to end on your setup, not their sustain.",
        },
      ],
      tips: [
        "Lead every go by burning the kill target's trinket with Kidney Shot before you commit Blind and Cyclone — a trinketed stun wastes the whole chain.",
        "Drain Mana is damage in this comp: even outside a go, keep the enemy healer's bar dropping so your next setup lands into an empty pool.",
        "Peel first, DPS second — a Gouge or Kidney Shot on the melee training your Druid is worth more than another Ambush most fights.",
        "Bank Preparation for the second attempt, not the opener; the reset Vanish and Blind are how RLD closes a game the first go couldn't.",
      ],
      requiredGear: [
        "Rogue and Warlock prioritize resilience to survive swaps, then Rogue stacks agility/AP on a fast offhand for Kidney-window burst while the Warlock values spell damage and hit to keep DoTs landing.",
        "Druid maxes resilience and Spirit/mana-per-5 to win the attrition war, leaning on +healing and stamina so it can soak a full train while HoTs and Cyclone carry the control game.",
      ],
    },
  },
  {
    id: "rlp-3s",
    name: "RLP (Rogue / Lock / Priest)",
    bracket: "3s",
    members: [
      { class: "rogue", spec: "subtlety" },
      { class: "warlock", spec: "affliction" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "A",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Relentless spread pressure from Corruption, Curse of Agony, Siphon Life and UA that forces the enemy healer into triage",
      "Double dispel via Felhunter Devour Magic plus Priest, so your Rogue stays unrooted and your healer stays clean",
      "Layered CC — Blind, Kidney Shot, Cheap Shot, Fear and Seduce — chains into unbreakable kill windows",
    ],
    weaknesses: [
      "Lower raw burst than RMP, so a well-topped target can be healed through a sloppy setup",
      "Priest is the linchpin — get him CC-chained or Mana Burned out and the whole comp collapses",
    ],
    keyCounters: [
      "rmp-3s",
      "rmd-3s",
    ],
    keyFavors: [
      "warrior-cleave-3s",
      "retcleave-3s",
      "turbocleave-3s",
    ],
    blurb:
      "RLP trades the mage's burst for a warlock's grinding attrition. It's a control comp that wins by never letting the pressure drop: Rogue lockdown, Warlock DoTs and fear, and a Disc Priest with double dispel keeping the train rolling until the enemy healer runs dry.",
    guide: {
      overview:
        "RLP is the attrition twin of RMP: swap the Frost Mage's spike and Sheep for an Affliction Warlock's DoT grind and Fear, and you get a comp that wins the long game instead of the burst race. The Warlock's Corruption, Curse of Agony, Siphon Life and Unstable Affliction tick on every enemy at once while the Rogue applies pointed pressure, dragging the opposing healer into a mana war he can't win.\n\nThe Felhunter's Devour Magic gives you a second dispel alongside the Priest, which is what makes this comp so aggressive — you can strip roots off your Rogue and cleanse debuffs off your Priest without spending a global on defense. That freedom keeps your Rogue glued to the target far longer than most setup comps manage, and once the enemy healer commits to a big heal, the Rogue's Cold Blood-less but Premeditation-fueled opener converts the opening into a kill.",
      winCondition:
        "You win by attrition converting into a burst window. Keep all three DoTs plus Curse of Agony rolling on the enemy healer and their most fragile DPS so the healer is permanently reactive, then coordinate the kill: Rogue Shadowsteps in with Premeditation into Cheap Shot, the Warlock Fears or Seduces the off-healer/peeler, and the Priest layers Mana Burn to close the healer's escape. Kidney Shot chained off a Hemorrhage-stacked target during a Blind on the healer is the classic finish — with the healer blinded and the peeler feared, even a Warlock's sustained damage plus a Rogue burst kills before anyone can trinket-and-top.",
      cooldownTimeline:
        "Open by spreading DoTs and reading their healer's dispel priority. First real go: Rogue uses Shadowstep + Premeditation + Cheap Shot on the kill target while the Warlock opens with Fear or Succubus Seduce on the enemy healer, Priest follows with Mana Burn. Save Blind for the moment the healer trinkets or tries to peel — Blind on the healer + Kidney Shot on the target is your hardest window. Warlock holds Death Coil as an interrupt/peel and Howl of Terror for when melee collapse on the Priest. Rogue's Preparation resets Blind/Vanish/Sprint for a second setup; Cloak of Shadows saves the Rogue from a Sheep or Cyclone lockout. Priest keeps Pain Suppression and trinket for the enemy's kill attempt on him.",
      positioning:
        "Play pillars religiously — the Priest never takes line of sight from more than one enemy at a time, and the Warlock stays mid-range so Fear and DoTs land while keeping a pillar between himself and enemy casters. The Rogue roams to the far side of the target to bait defensive cooldowns away from the healer. Against melee, kite them into the Warlock's DoTs and Howl of Terror while the Priest LoS-heals; against casters, close distance so your Rogue and Felhunter can interrupt and Spell Lock their heals and CC.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "The mirror-that-outbursts-you. Their Mage Sheeps your Priest and Counterspells the school he needs while Rogue+Mage blow up a target faster than your DoTs matter. Use Cloak of Shadows and Felhunter Spell Lock to protect against the Sheep-on-Priest, pre-dispel Frostbolt slows off your Rogue with Devour Magic, and pool for a fast go on THEIR Priest — force him to trinket the Blind early, then Mana Burn and re-CC. Never let your Priest get caught in the open; win the mana game by making their Mage blow Ice Block and Blink defensively.",
        },
        {
          compId: "rmd-3s",
          howToPlay: "Rogue/Mage/Druid outlasts attrition — the Druid HoTs roll through your DoTs and cyclones your Priest out while Mage burst punishes any peel. Tunnel the Druid: spread DoTs to deny his drink/regen, coordinate Fear + Kidney Shot to pin him out of LoS of his team, and Mana Burn hard since a druid in Cyclone chains can't dispel your Priest. Save Cloak and Devour for the Cyclone/Poly on your Priest, and don't overextend your Rogue where a Blind-less Mage can Blast Wave + Sheep him off the kill.",
        },
      ],
      tips: [
        "Assign dispels: Priest cleanses magic off the Rogue and Warlock, Felhunter Devours the debuff that would peel your kill — don't double-dispel the same target and waste globals.",
        "Reapply Unstable Affliction on anyone who spam-dispels; the silence-on-dispel punishes their healer and buys your kill window.",
        "Blind is your best defensive AND offensive tool — hold it to break a kill on your Priest, or drop it on the healer for the finish, but never waste it on the opener.",
        "Keep DoTs on the enemy healer at all times even when swapping targets; the passive mana drain from him healing through them is half your win condition.",
      ],
      requiredGear: [
        "Rogue and Warlock prioritize resilience to survive enemy setups, then hit/spell hit caps so Blind, DoTs and poisons land; Rogue wants a fast off-hand for Kidney uptime.",
        "Priest stacks resilience and spell power with heavy mana/regen (Warlock Life Tap eases this) to outlast Mana Burn wars; Warlock values Shadow spell power and Felhunter uptime over raw crit.",
      ],
    },
  },
  {
    id: "beastcleave-3s",
    name: "Beastcleave / KFC (Warrior / Hunter / Paladin)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "hunter", spec: "beast-mastery" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "B",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Two overlapping healing debuffs — the warrior's Mortal Strike and the hunter's Aimed Shot each cut incoming healing 50%, giving near-permanent uptime that no single dispel can clear.",
      "Layered swap burst: Death Wish and Recklessness stacked with Bestial Wrath and the pet delete a target inside one Intimidation or Hammer of Justice stun.",
      "Split ranged/melee pressure — the hunter freecasts from max range while the warrior sticks the swap, so a single peel rarely stops both damage threats.",
    ],
    weaknesses: [
      "The hunter lives and dies by deadzone and LoS — Polymorph, Fear, and Frost Nova chains shut BM off and collapse the comp's whole damage output.",
      "Only one healer with no offensive dispel beyond Cleanse; against double-healer control it can't kill through the CC and gets ground out on mana.",
    ],
    keyCounters: [
      "rmp-3s",
      "mld-3s",
    ],
    keyFavors: [
      "rlp-3s",
    ],
    blurb:
      "KFC is TBC's iconic melee cleave: an Arms warrior and a Beast Mastery hunter share two overlapping healing debuffs and dump every cooldown on one target while a Holy Paladin keeps them topped. It wins by making a kill target un-healable, then bursting it down inside a stun. The moment it gets kited and controlled instead of getting to press, it falls apart.",
    guide: {
      overview:
        "Beastcleave/KFC is a pure pressure comp built around the strongest healing-reduction package in the game. Mortal Strike and Aimed Shot apply the same 50% healing debuff, so between the warrior and hunter you keep it glued on the target with no gaps, and none of it is a magic dispel the enemy healer can shrug off. That constant debuff turns every cooldown window into a real kill threat: the paladin only has to survive, not out-heal the entire lobby.\n\nThe skill lives on the hunter and the paladin. The hunter has to manage deadzone, LoS casters, and time Bestial Wrath, Intimidation, and Scatter Shot to both enable the go and peel the return train. The paladin is the only healer, so pillar-hugging, pre-Cleansing, and mana discipline decide long games. Get controlled and you do nothing; get to press your buttons and you kill almost anything with a cloth target.",
      winCondition:
        "Pick the squishiest target — the enemy healer or a cloth DPS — and keep Mortal Strike plus Aimed Shot's healing reduction permanently glued on it. Then open the burst window: warrior Charge/Intercept into Death Wish and Recklessness, hunter pops Bestial Wrath and sends the pet, and the paladin lands an offensive Hammer of Justice on the enemy healer. Layer Intimidation's stun into that window and finish the target before their trinket or a Blessing of Protection comes up. Scatter Shot into Freezing Trap locks the off-healer or second threat out of the go.",
      cooldownTimeline:
        "Opener: hunter Freezing Traps or Scatter Shots the off-target while the warrior Charges, Hamstrings, and lands Mortal Strike; Aimed Shot double-stacks the healing debuff immediately. Hold the real go — Death Wish, Recklessness, Bestial Wrath, and the pet all committed at once — for a clean swap, not the opener, since a telegraphed all-in into a fresh trinket and BoP is wasted. Stagger Intimidation and Hammer of Justice rather than overlapping them so you chain two lockouts back-to-back (watch stun diminishing returns). The paladin holds Blessing of Freedom for Hamstring and Frost Nova and trinkets kidney/fear to keep the team topped through the return.",
      positioning:
        "The hunter plays pillars at max range, staying 8+ yards off the warrior's target so nothing falls into his 5-8 yard deadzone, and using terrain to LoS Polymorph and Fear. The warrior stays glued with Intercept and Charge on every pillar reset, keeping Hamstring up so the target can't kite. The paladin LoS-heals from behind a pillar and never gets caught in the open by a mage or rogue swap. Keep the pet parked on the kill target, and recall it the instant it's about to be kited or CC'd off so Bestial Wrath damage isn't wasted.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "Rogue/Mage/Priest kites and CC-chains you into oblivion — the mage sheeps your hunter and Frost Novas the warrior while blind and fear reset the entire go. Play tight to pillars so Polymorph and Fear eat LoS, save Berserker Rage and Bestial Wrath to break the fears, and force the kill onto the priest: Scatter Shot into Freezing Trap the mage, then train the priest under the double healing debuff before they can sit and drink. The paladin pre-Cleanses sheep off the hunter and holds trinket for the setup stun.",
        },
        {
          compId: "mld-3s",
          howToPlay: "Mage/Lock/Druid is a kite-and-drain nightmare — the druid Cyclones and roots while the mage and lock peel with Frost Nova, Fear, and Howl of Terror. Cleanse and Blessing of Freedom the warrior aggressively so he stays on target, and commit the full burst — Intimidation plus Hammer of Justice plus every cooldown — into the druid or mage in a single window, because if they survive it they reset and drink you out. Don't chase the warlock through his pet, teleports, and portals.",
        },
      ],
      tips: [
        "Never let both Mortal Strike and Aimed Shot drop off the kill target — the entire win condition is that healing debuff, so refresh Aimed Shot even mid-swap.",
        "Stagger Intimidation and Hammer of Justice instead of stacking them; two back-to-back lockouts kill more than one overlapped one, and mind stun diminishing returns.",
        "Hunter: own your deadzone — sit at max range on a pillar so you keep freecasting and never get juked into the 5-8 yard gap where you can't shoot.",
        "Save Death Wish, Recklessness, and Bestial Wrath for a committed hard swap; blowing them into a fresh trinket and a Blessing of Protection throws the game.",
      ],
      requiredGear: [
        "Warrior and hunter prioritize a fast, high-top-end weapon (S2 mace / crossbow) and Attack Power over stacking resilience — you need burst that beats a defensive cooldown — while keeping ~150 resilience to survive the return train.",
        "Paladin stacks resilience plus mana regen (Intensity, mp5) and what Spell Damage the gear allows; as the only healer you must LoS-heal through long games without going OOM.",
      ],
    },
  },
  {
    id: "mlp-3s",
    name: "MLP (Mage / Lock / Priest)",
    bracket: "3s",
    members: [
      { class: "mage", spec: "frost" },
      { class: "warlock", spec: "affliction" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "B",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Double-caster CC: Polymorph + Fear + Psychic Scream layer near-permanent lockdown",
      "Two win conditions — Shatter burst OR Mana Burn the enemy healer dry",
      "Priest dispels, Fear Ward, and Power Word: Shield keep the casters alive under CC",
    ],
    weaknesses: [
      "Priest lacks a druid's mobility — trained melee can pin and kill it",
      "If the CC chain drops the whole squishy backline is exposed",
    ],
    keyCounters: [
      "tsg-3s",
      "rls-3s",
    ],
    keyFavors: [
      "rmp-3s",
      "wmp-3s",
    ],
    blurb:
      "MLP is caster control with a disc priest instead of a druid. Polymorph, Fear, and Psychic Scream chain the enemy into permanent lockdown while the mage's Shatter combo and the priest's Mana Burn give it two independent ways to win. Trades MLD's kiting for harder healer control and a real drain game.",
    guide: {
      overview:
        "MLP is a double-caster control comp built around the disc priest's toolkit. Between Polymorph, the warlock's Fear, and the priest's Psychic Scream you can keep the enemy team acting on your terms while warlock DoTs chip and the mage sets up a Shatter kill. The priest changes the identity versus MLD: Mana Burn turns any healer mirror into a drain war you can simply win, and Dispel Magic, Fear Ward, and Power Word: Shield keep your fragile casters standing through incoming CC.\n\nThe cost is the priest's lack of an escape. A druid kites; a priest gets sat on. If a melee train reaches the priest and your CC chain slips, the backline has little raw survivability. It rewards crisp CC layering across DR categories, disciplined Mana Burn timing, and constant peeling for the healer.",
      winCondition:
        "Layer Polymorph + Fear + Psychic Scream so the enemy can't act, then either land a mage Shatter combo on a controlled target or Mana Burn the enemy healer to empty and grind the team down with warlock DoTs.",
      cooldownTimeline:
        "Sheep one target, warlock Fears another and spreads Corruption + Curse of Agony + Unstable Affliction on everything. On the kill go: mage Frostbolt → Frost Nova → Shatter (Ice Lance + Frostbolt + Icy Veins) on the target while the priest Psychic Screams the incoming melee and the warlock adds Death Coil + Shadowbolt. If no kill, pivot to Mana Burn on the enemy healer, Fear Ward the priest, and reset with Ice Block or a fresh Fear chain.",
      positioning:
        "All three play LoS off a pillar and hold max range from melee; the priest hugs the pillar hardest since it can't kite. Cross-peel with Frost Nova, Fear, and Psychic Scream, and keep the priest's back to the wall so no one can line up a stun from an angle it can't see.",
      counters: [
        {
          compId: "tsg-3s",
          howToPlay: "Instant double-warrior cleave ignores your CC and trains the priest, who can't kite out. Peel relentlessly — Psychic Scream + Frost Nova + Fear on the warriors, Polymorph the healer only when a warrior is already CC'd, and blow Power Word: Shield early. Don't try to out-tempo them; out-control them and burst only once both warriors are peeled off.",
        },
        {
          compId: "rls-3s",
          howToPlay: "Relentless DoT + rogue pressure and Purge on your priest out-paces a slow setup. Never let the priest get dispel-locked or trained — Fear Ward against the rogue's opener, Mana Burn the shaman between peels, and Counterspell/Spell Lock the shaman's heals. Kill the rogue when it commits, or drain the shaman before your priest runs dry.",
        },
      ],
      tips: [
        "Layer CC across DR categories — Poly, Fear, and Scream are separate, so nothing overlaps.",
        "Mana Burn is a full second win condition; if the kill stalls, drain the healer instead of forcing it.",
        "Fear Ward and Dispel Magic on your own casters break the enemy's CC setup — keep them ready.",
        "Protect the priest's position above all — it has no escape, so a pillar and pre-emptive peels are its mobility.",
      ],
      requiredGear: [
        "All three want resilience + stamina; the priest needs mana longevity and Mana Burn to stay ahead in the drain war",
        "Mage needs a lethal Shatter (spell power), warlock needs DoT power, priest prioritizes resilience over throughput",
      ],
    },
  },
  {
    id: "retcleave-3s",
    name: "Retcleave (Warrior / Ret / Shaman)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "paladin", spec: "retribution" },
      { class: "shaman", spec: "restoration" },
    ],
    tier: "B",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "Repentance on the healer plus a stacked Avenging Wrath / Windfury / Bloodlust window kills through most defensives",
      "Two Mortal Strike-style wounds (warrior MS + ret pressure) gut enemy healing before the burst even lands",
      "Blessing of Freedom and Hand of Protection make the melee near-impossible to kite or peel",
    ],
    weaknesses: [
      "Caster-control comps (RMP, MLD, LSD) kite and chain-CC the melee out of every kill window",
      "The Resto Shaman has weak hard peels — once he's isolated and CC'd, the whole comp folds",
    ],
    keyCounters: [
      "rmp-3s",
      "mld-3s",
      "lsd-3s",
    ],
    keyFavors: [
      "wmp-3s",
      "wld-3s",
      "tsg-3s",
    ],
    blurb:
      "Retcleave is TSG's controlling cousin: an Arms Warrior and a Ret Paladin train a target while a Resto Shaman sustains, but the paladin trades a second warrior for Repentance, Hammer of Justice, and Freedom. Less raw instant damage than double-warrior, far more healer lockdown and burst on demand. A high-floor cleave that actually sets up its kills.",
    guide: {
      overview:
        "Retcleave is the melee-cleave archetype built around the Ret Paladin's toolkit. The Warrior and Ret apply instant, un-setup-able melee pressure with Mortal Strike wounds and Judgement/Crusader Strike, while the Resto Shaman keeps Earth Shield rolling and Grounds the incoming CC. Unlike TSG, you don't just train and hope — you use Repentance and Hammer of Justice to take the enemy healer out of the equation, then dump everything.\n\nThe payoff is one of the scariest burst windows in 3s: Repentance the healer, swap both melee to the kill target, and stack Avenging Wrath + Seal of Command procs under a Windfury Totem and Bloodlust. The catch is range — caster-control comps kite you, LoS your melee, and CC the shaman off the team. Into other cleaves and pressure comps your Freedom uptime and healer CC dominate.",
      winCondition:
        "Land a full Repentance on the enemy healer (or Hammer of Justice if Repentance is dispelled), swap both melee onto the kill target, and stack a Mortal Strike wound with Avenging Wrath, Windfury Totem, and Bloodlust so the burst outruns any heal that leaks through the CC.",
      cooldownTimeline:
        "Set the totems (Windfury + Grounding) and open with pressure to force cooldowns. Repentance the healer to start the kill → Warrior Intercept + Mortal Strike + Hamstring on the target, Ret pops Avenging Wrath, both trinket in. Shaman drops Bloodlust as the burst lands. Blessing of Freedom pre-emptively on the Warrior so a snare can't pull him off. If the kill fails, reset with Hand of Protection/Sacrifice, re-position, and rebuild for the next Repentance.",
      positioning:
        "Melee stick to the kill target but never lose sight of the shaman — the Warrior peels casters with Intercept/Hamstring/Spell Reflect and the Ret peels with Hammer of Justice and Freedom. Play the shaman near a pillar so he can LoS Polymorph/Fear and drop totems safely; the moment a caster team collapses on him, the melee must break off and peel rather than tunnel. Force enemies to fight around your Grounding/Tremor totem coverage.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "RMP kites and chain-CCs your melee while sheeping the shaman. Split pressure — send the Warrior on the priest and the Ret on the mage — Spell Reflect the key Polymorph/Fear, and use Repentance on the priest instead of chasing the rogue. Freedom and Tremor Totem are your outs against their snares and Fear; peel the shaman first, kill second.",
        },
        {
          compId: "mld-3s",
          howToPlay: "The mage/druid/lock combo peels you with roots, Cyclone, and Fear and out-ranges your burst. Hard-swap onto the druid during a Repentance on nothing (bait CC first), keep Freedom rolling to beat roots, and Grounding/Tremor the Fears. Purge Ice Barrier and hots relentlessly — if you can pin the druid you win the tempo, but never let the shaman get chained.",
        },
      ],
      tips: [
        "Repentance is your kill-enabler, not a panic button — save it for the healer at the start of your swap, and land it before the melee commits.",
        "Freedom the Warrior pre-emptively so snares and roots can't kite him off the kill target.",
        "Purge on the shaman is real offense — strip Ice Barrier, PW:Shield, and hots before the burst lands.",
        "Against caster comps, peel for your shaman first; a living shaman wins the attrition, a dead one loses the game instantly.",
      ],
      requiredGear: [
        "Warrior and Ret: weapon damage + resilience first — Mortal Strike/Crusader Strike burst scales off the weapon",
        "Shaman: resilience, mp5, and Earth Shield uptime; enough survivability to eat a full caster swap",
      ],
    },
  },
  {
    id: "warrior-cleave-3s",
    name: "Warrior Cleave (Arms / Fury / Paladin)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "warrior", spec: "fury" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "B",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Two Mortal Strike carriers means permanent 50% healing reduction and the highest raw melee burst in the bracket once cooldowns line up",
      "Holy Paladin is the tankiest healer alive — Divine Shield, Blessing of Protection, and Blessing of Freedom make the warriors nearly impossible to peel off a target",
      "Devastating swap potential: Sweeping Strikes plus double Whirlwind cleaves two targets at once, and a landed Hammer of Justice into Repentance removes the enemy healer for a full global chain",
    ],
    weaknesses: [
      "Zero ranged pressure — good kiting teams LOS the Paladin and root/nova the warriors out of range while chipping the immobile healer",
      "If the Paladin gets sheeped, feared, or mana-drained the whole comp stalls, and its damage evaporates the moment the warriors are slowed or blinded",
    ],
    keyCounters: [
      "rmp-3s",
      "lsd-3s",
      "wld-3s",
    ],
    keyFavors: [
      "shatterplay-3s",
      "mlp-3s",
    ],
    blurb:
      "Two warriors, one Mortal Strike debuff that never falls off, and the sturdiest healer in the game standing behind them. Warrior Cleave doesn't out-think anyone — it picks a target, glues both swords to it, and dares the enemy healer to keep up through 50% healing reduction and relentless snares. When the swap lands and the cooldowns pop, people simply die between globals.",
    guide: {
      overview:
        "Warrior Cleave is the purest expression of melee pressure in TBC 3s: an Arms warrior carrying the Mortal Strike healing debuff and Sweeping Strikes, a Fury warrior stacking Bloodthirst and Whirlwind for raw throughput, and a Holy Paladin whose entire job is to keep the two of them alive and free. There is no elaborate setup — the win comes from uptime. Both warriors train a single kill target, Hamstring and Piercing Howl keep it snared, and the Paladin blankets the melee with Blessing of Freedom so nothing short of a full peel or LOS stops the train.\n\nThe comp sits at Tier B because it is brutally linear and hard to kite well, but it lives and dies by whether it can reach the right target. Against squishy caster teams that get caught in the open it is oppressive; against mobile, CC-heavy comps that can lock the Paladin and kite the warriors it grinds out and loses on the clock. Piloting it is about rage management, snare rotation, and knowing the one window per game where you commit Death Wish and Recklessness for the kill.",
      winCondition:
        "Pick the least mobile or worst-positioned target and put both warriors on it with Mortal Strike applied for permanent 50% healing reduction. You win by converting a coordinated burst window into a kill before the enemy healer can out-heal it: Intercept or Charge in, Death Wish plus Recklessness plus trinket on the Arms warrior, Sweeping Strikes into a double Whirlwind for cleave overlap, and a well-timed Hammer of Justice into Repentance on the enemy healer so they cannot cast during the go. Keep the target snared with Hamstring and Piercing Howl, and if the healer LOSes, swap onto whoever they exposed rather than chasing.",
      cooldownTimeline:
        "Open with a Charge/Intercept to close and immediately establish Mortal Strike; do not blow offensive cooldowns until the enemy healer is out of position or CC'd. The real go: Hammer of Justice or Repentance lands on the healer, then both warriors pop Death Wish, Recklessness, and racial/PvP trinket together, Sweeping Strikes plus overlapping Whirlwinds for the cleave, and the Paladin drops Blessing of Freedom so no snare pulls you off. Save Berserker Rage to break the inevitable Fear or Blind mid-go, and hold the Paladin's Divine Shield and Blessing of Protection for when the enemy tries to swap back onto your squishy healer. After the burst, coast on Mortal Strike uptime and rebuild rage while cooldowns recycle.",
      positioning:
        "Both warriors play on top of the kill target while the Holy Paladin hugs a pillar and never stands in open sightlines — the Paladin is the single point of failure, so it should always have a LOS break one step away from casters. Keep the two warriors slightly split so a single Frost Nova, Psychic Scream, or Blast Wave can't lock both, and use Intervene to close gaps or eat an incoming cast. When the enemy tries to reset, funnel their casters away from their pillar with Piercing Howl and Intercept rather than overextending; the moment your Paladin is forced into the open to heal, collapse back and peel for him with Hamstring and Intimidating Shout.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "This is the nightmare matchup — the Mage kites both warriors with Frost Nova, Blink, and Ice Block while the Rogue Blinds and Saps and the Priest peels. Do not chase the Mage into the open; force the fight to a pillar and make the Rogue commit to a swap. Berserker Rage pre-emptively to deny the Blind/Sheep window, Spell Reflect the Polymorph aimed at your Paladin, and have the Paladin trinket Sap early so you are never opened on 2v3. Your only real kill path is catching the Priest or Mage out of position with a Hammer of Justice into Repentance chain and bursting through — grind Mortal Strike pressure so their Mage can't freely drink.",
        },
        {
          compId: "lsd-3s",
          howToPlay: "Warlock/Shaman/Druid drowns you in fear, purge, and cyclone while the Felhunter and Shaman kite and dispel your Paladin's Freedom. Tunnel the Warlock or Shaman — whichever is caught without Nature's Swiftness or LOS — and use Berserker Rage on cooldown to break Fear and Howl of Terror. Spell Reflection is huge here: bounce the Fear back at the Warlock. The Paladin must pre-cleanse the Curse of Tongues and stay out of Shaman purge range; when they Cyclone your kill target, swap the second warrior onto the Druid to force defensive globals. You lose the long game to their drain, so commit your Death Wish window early and hard.",
        },
      ],
      tips: [
        "Never fully commit Death Wish and Recklessness into a healer who still has GCDs free — wait for your Hammer of Justice or Repentance to land so the burst goes unhealed",
        "Rotate Hamstring and Piercing Howl so your kill target is snared 100% of the time; a target that reaches a pillar is a target you lost",
        "Save Berserker Rage as a reactive Fear/Blind break, not an opener — against caster teams it is often your most important button",
        "Spell Reflection the Polymorph, Fear, or Cyclone aimed at your Paladin; keeping the healer casting is worth more than a few extra swings",
      ],
      requiredGear: [
        "Both warriors prioritize weapon damage and hit/expertise to punch through Defense, then Season 2 Merciless resilience — a fast off-hand matters for the Fury warrior's Whirlwind/Bloodthirst throughput",
        "The Holy Paladin stacks resilience and stamina above all to survive swaps, with enough +healing and mana/mp5 (and Intellect) to sustain long games against drain and CC comps",
      ],
    },
  },
  {
    id: "double-healer-warrior-3s",
    name: "Double-Healer Warrior (Warrior / Shaman / Paladin)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "shaman", spec: "restoration" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "B",
    playstyle: "sustain",
    difficulty: 2,
    strengths: [
      "Two healers plus Mana Tide Totem give near-bottomless mana — you win almost any long game on attrition",
      "Constant Mortal Strike uptime keeps a 50% healing debuff glued to the enemy healer while the pair out-heals everything else",
      "Layered defensives — Blessing of Protection, Blessing of Sacrifice, Grounding Totem, and Cleanse/Purge — make your kill target nearly impossible to swap onto",
    ],
    weaknesses: [
      "All damage lives on one Warrior — peel or kite him and your offense goes to zero",
      "Wide open to Curse of Tongues and mana burn, which stretch your one kill window into infinity",
    ],
    keyCounters: [
      "shatterplay-3s",
      "lsd-3s",
      "rmp-3s",
    ],
    keyFavors: [
      "warrior-cleave-3s",
      "retcleave-3s",
      "jungle-cleave-3s",
    ],
    blurb:
      "The purest attrition comp in the bracket: one Arms Warrior grinding a target while a Restoration Shaman and Holy Paladin refuse to let anyone die. You don't out-burst opponents — you out-last them, riding Mortal Strike pressure and two full mana bars until the enemy healer runs dry or panics. Tier B because a single peeled Warrior is a comp with no offense at all.",
    guide: {
      overview:
        "Double-Healer Warrior is a control-and-grind team built around one simple truth: with a Shaman and a Paladin behind him, your Warrior can train the same target forever. Mortal Strike keeps the healing-reduction debuff up, the Shaman Purges shields and HoTs to expose the kill, and the Paladin blankets your side with Blessing of Freedom, Cleanse, and clutch cooldowns. Between Mana Tide Totem, Nature's Swiftness, and two deep mana pools you simply do not lose the endurance war.\n\nThe catch is that every point of damage flows through the Warrior. There is no second threat, no cast to fear or interrupt into a swap. Skilled opponents don't try to out-heal you — they neutralize your one output with slows, roots, Curse of Tongues, blinds, and line of sight, then kill one of your healers at their leisure. Your job is to protect the Warrior's uptime as fiercely as they attack it.",
      winCondition:
        "You win by never running out of mana while the Warrior maintains Mortal Strike uptime on a single kill target — almost always the enemy healer or their softest caster. Drop Windfury and Strength of Earth totems, open with Charge/Intercept, and keep Hamstring and Piercing Howl rolling so the target can't peel off. The Shaman Purges every shield and hot the moment it lands while chipping Earth Shock damage; the Paladin pumps Holy Light and saves Hand of Sacrifice/Divine Shield for defense. When you find your window — Death Wish plus trinket plus an Intercept stun chained into Hammer of Justice — you burst through and the double heals behind you make the trade one-sided. If there's no kill, you just keep grinding; their mana breaks before yours.",
      cooldownTimeline:
        "Pre-game: Blessing of Kings and Might/Wisdom out, then Grounding, Tremor, and Windfury/Strength of Earth totems down before the gates open. Opener: Warrior Charges in, lands Mortal Strike, and holds Death Wish + Recklessness + trinket for the first real stun chain (Intercept into Hammer of Justice). Hold Bloodlust for your committed kill window or to answer the enemy's Bloodlust. Mid-game: refresh totems constantly, drop Mana Tide Totem the instant the Shaman dips below half, and Nature's Swiftness a Healing Wave to save a stunned partner. The Paladin banks Divine Shield, Lay on Hands, Blessing of Protection, and Blessing of Sacrifice — never blow two at once; stagger them so every swap the enemy attempts eats a fresh cooldown.",
      positioning:
        "Play around a single pillar and make the enemy come to you. The Warrior stays welded to the kill target; the Shaman drops totems just inside your LoS but out of the enemy casters' line so Grounding and Tremor survive, and the Paladin hugs the pillar so hostile melee must either break LoS from their own team or eat a Freedom-kited Hamstring chasing him. Never let both healers get caught in the same fear or Blast Wave — spread just enough that one AoE or one Curse of Tongues can't clip your whole backline. If they try to switch onto the Shaman, collapse: peel with Piercing Howl, Grounding their casts, and let the Paladin bubble the Shaman while you reset.",
      counters: [
        {
          compId: "shatterplay-3s",
          howToPlay: "Frost Mage plus Shadow Priest outrange your lone Warrior and drain the Shaman with Mana Burn while Frost Nova and roots strip your uptime. Never chase the Mage into the open — pillar-hug and force him to walk into melee range. Grounding Totem eats Polymorph and Counterspell-bait casts, Tremor handles the Priest's Fear, and the Warrior should Spell Reflect incoming Frostbolts and swap onto the Priest with Intercept whenever the Mage blinks away. Purge the Priest's shields relentlessly and make the Paladin pre-Cleanse Curse of Tongues so your healing stays on tempo.",
        },
        {
          compId: "lsd-3s",
          howToPlay: "Warlock, Elemental Shaman, and Resto Druid will drain your mana and grind you down with Curse of Tongues and Fear while their own Shaman out-ranges you. Train the Druid — he's the linchpin — and keep Mortal Strike glued to him so his Regrowth/Rejuvenation heal for half. Grounding Totem and Spell Reflection turn their Fears back, Tremor Totem breaks the ones that land, and the Paladin must Cleanse Curse of Tongues off the healers on cooldown. Purge the enemy Shaman's Earth Shield and Water Shield to bleed their tempo, and never overextend into the Felhunter's Spell Lock and Devour Magic — bait the interrupt with a Lesser Healing Wave before committing your real cast.",
        },
      ],
      tips: [
        "Assign one dedicated target and commit — Mortal Strike's value comes from uptime, so swapping wastes the debuff and hands the enemy free healing",
        "The Shaman's Purge is half your offense: strip Power Word: Shield, Earth Shield, and HoTs before the Warrior connects, not after",
        "Stagger Paladin cooldowns — Hand of Sacrifice, then Blessing of Protection, then Divine Shield — so every enemy swap attempt burns a different defensive",
        "Track enemy healer mana, not health; against most comps you're playing to drain them dry, so bait cooldowns and keep the pressure honest even when nothing is dying",
      ],
      requiredGear: [
        "Warrior stacks resilience with a high-end Mortal Strike weapon (Gladiator's or a raid 2-hander) plus Hamstring/Piercing Howl-friendly hit; both healers prioritize resilience then large mana pools and +healing to survive burst and win the attrition game",
        "Shaman wants heavy mana regen and Chain Heal throughput while the Paladin builds resilience, mana, and Flash of Light spellpower — mana longevity is the whole comp, so never trade it away for raw output",
      ],
    },
  },
  {
    id: "double-healer-hunter-3s",
    name: "Double-Healer Hunter (Hunter / Priest / Druid)",
    bracket: "3s",
    members: [
      { class: "hunter", spec: "beast-mastery" },
      { class: "priest", spec: "discipline" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "C",
    playstyle: "sustain",
    difficulty: 3,
    strengths: [
      "Two healers plus a trapper — almost impossible to kill in a straight fight",
      "Viper Sting + Mana Burn drain the enemy dry; you win the mana game every time",
      "Layered CC: Freezing Trap, Cyclone, Psychic Scream, and Intimidation lock the whole enemy team",
    ],
    weaknesses: [
      "Low kill pressure — one BM hunter has to earn every kill through walls of healing",
      "Relentless instant cleave (TSG, warrior teams) can train a healer through your peels before mana matters",
    ],
    keyCounters: [
      "tsg-3s",
      "rls-3s",
    ],
    keyFavors: [
      "rmp-3s",
      "mld-3s",
    ],
    blurb:
      "A defensive fortress built to win the long game. Two healers keep everyone standing while the hunter drains mana with Viper Sting and traps the enemy out of every kill window. You don't burst teams down — you starve them out and grind until they crack.",
    guide: {
      overview:
        "Double-Healer Hunter is the ultimate attrition comp. A Disc Priest and Resto Druid make your team nearly unkillable, while the BM hunter chips away with pet damage, Freezing Traps, and Viper Sting mana drain. The enemy has to solve a puzzle: kill through two healers and a trapper, or run out of mana trying.\n\nYour win condition is patience. You layer crowd control — Freezing Trap, Cyclone, Psychic Scream, Intimidation — to deny casts, drain the enemy healer with Viper Sting and Mana Burn, and never take a bad trade. Kills come late, when a target is out of mana and out of cooldowns, and your Bestial Wrath burst finally sticks.",
      winCondition:
        "Starve the enemy healer with Viper Sting and Mana Burn while chaining CC (Freezing Trap on their support, Cyclone on the healer), then convert the mana lead into a kill with Bestial Wrath + Kill Command + Intimidation on a drained, un-peeled target.",
      cooldownTimeline:
        "Open by Freezing Trapping the enemy healer or off-DPS and starting Viper Sting on the healer to bleed mana. Grind the neutral game: priest Mana Burns the healer, druid keeps HoTs rolling and Cyclones incoming CC or the healer at kill windows. When their healer is low on mana, commit: hunter pops Bestial Wrath (The Beast Within), Kill Command and Intimidation stun on the kill target while the druid Cyclones the enemy healer and the priest Psychic Screams their peel. Defensively, cycle Pain Suppression, Barkskin, Nature's Swiftness, pet Intimidation peels, and re-trap any melee training a healer.",
      positioning:
        "The hunter plays maximum range, managing the deadzone and keeping trap and Viper Sting lines open on the enemy healer. Both healers pillar for LoS and stagger so a single swap can't collapse the team. Kite melee with Frost Trap, Wing Clip, Concussive Shot, and Nature's Grasp roots, and always keep a Freezing Trap ready to reset a target that jumps a healer.",
      counters: [
        {
          compId: "tsg-3s",
          howToPlay: "Two warriors plus a shaman generate instant, uninterruptible pressure that can burst a healer through your peels before mana ever matters. Freezing Trap and Intimidation one warrior off the swap, Cyclone the shaman during their Recklessness, and Psychic Scream to break a kill attempt. Keep both healers pillared and don't let a warrior free-cast Mortal Strike on the druid — you must out-peel, not out-last.",
        },
        {
          compId: "rls-3s",
          howToPlay: "RLS applies constant DoT + Fear + rogue pressure and purges your HoTs, so the long game is closer than usual. Trap and Intimidation the rogue off your healers, have the priest dispel UA carefully and Mass Dispel Fear, and use Viper Sting to drain the shaman — if their Resto Shaman runs low, their pressure collapses and you win the attrition race.",
        },
      ],
      tips: [
        "Keep Viper Sting rolling on the enemy healer at all times — the mana drain is your primary win condition, not hunter damage.",
        "Freezing Trap is for peeling and resetting, not just opening; save one for the melee that dives a healer.",
        "Cyclone the enemy healer at your kill windows and to eat incoming CC on your team — timing beats spamming it.",
        "Only commit Bestial Wrath when the enemy healer is drained or locked — a burst into full mana and cooldowns is wasted.",
      ],
      requiredGear: [
        "Hunter: resilience + a high-end ranged weapon and agility for burst; both healers stack resilience and stamina to survive swaps",
        "Priest and druid prioritize mp5 and mana pool — the comp is built to outlast, so raw longevity beats throughput",
      ],
    },
  },
  {
    id: "turbocleave-3s",
    name: "Turbocleave (Warrior / Enhance / Druid)",
    bracket: "3s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "shaman", spec: "enhancement" },
      { class: "druid", spec: "restoration" },
    ],
    tier: "C",
    playstyle: "cleave",
    difficulty: 2,
    strengths: [
      "Windfury + Stormstrike + Mortal Strike stacks a wall of instant melee pressure that few healers can out-heal once Bloodlust drops",
      "Purge and Grounding Totem tear apart Druid and Priest healers who rely on casts, turning their mana against them",
      "No ramp needed: charge in, apply Hamstring and the wound, and you are already at kill pressure from the opener",
    ],
    weaknesses: [
      "Almost no hard CC beyond one Intimidating Shout and Frost Shock, so caster-control comps kite the Warrior out of range for the whole game",
      "Both damage dealers are melee with mediocre mobility once snared or rooted, and neither can peel a train off the Druid",
    ],
    keyCounters: [
      "rmp-3s",
      "mld-3s",
      "lsd-3s",
    ],
    keyFavors: [
      "shatterplay-3s",
    ],
    blurb:
      "Turbocleave is the purest expression of raw melee tempo in Season 2: an Arms Warrior and an Enhancement Shaman glue themselves to one target while a Resto Druid keeps them topped. It has no setup, no CC chains, and no plan B. You simply hit one thing so hard, so fast, that the enemy healer runs out of mana or globals before your Druid does.",
    guide: {
      overview:
        "Turbocleave wins the tempo war and loses the control war. The Shaman's Windfury Totem and Unleashed Rage supercharge both melee, so the Warrior's Mortal Strike and the Shaman's Stormstrike land back-to-back for spike damage that ignores any need for a coordinated CC opener. Against healers who have to stand still and cast, Purge and relentless pressure drown them before your own resources dry up. This is a comp that punishes greed and immobility.\n\nThe flip side is that everything the comp lacks, the good teams have. You bring one fear and a Frost Shock for peel; that is it. Any composition with a Mage, a Warlock, or a kiting Druid can root, sheep, and fear your Warrior into irrelevance while chipping your Druid from range. Turbocleave farms teams that stand and fight and gets kited into oblivion by teams that run. Your whole job is forcing the former fight and denying the latter.",
      winCondition:
        "Pick the enemy healer's most fragile ally or the healer himself and train him from the first global. The Warrior opens with Charge into Hamstring, applies Mortal Strike to cut healing by 50%, and never leaves melee; the Shaman drops Windfury Totem, keeps the target snared with Frost Shock, and weaves Stormstrike plus Earth Shock. When the healer commits to a big cast, the Shaman Purges the resulting HoTs and shields, then both melee pop Bloodlust, Death Wish, and Recklessness together for a burst window no single healer survives. If they LoS, follow with Intercept and Intimidating Shout to reset the train.",
      cooldownTimeline:
        "Open clean: no cooldowns for the first ten seconds while you establish the Mortal Strike wound and a Frost Shock snare so the target cannot simply walk out. Once the healer is forced to hardcast, the Shaman Purges and both melee blow Bloodlust + Death Wish + Recklessness + Windfury on the same target for the kill window. Save Intimidating Shout for the moment the pocket healer starts a clutch cast or to peel a swap off your Druid, and hold the Druid's Nature's Swiftness + Cyclone to counter the enemy's own burst attempt. Shamanistic Rage covers your Shaman when a caster trains him back.",
      positioning:
        "Fight on top of a pillar so your melee can weave line-of-sight against enemy casters while staying in range of your kill target. The Resto Druid plays the far side of that same pillar, HoT-rolling and kiting so a swap onto him costs the enemy several globals to reach; he must never get caught in the open by a Rogue or Mage. The Shaman drops Grounding Totem in the sightline of enemy casters to eat a Polymorph or Fear, and Tremor Totem preemptively where fears will land. Keep both melee stacked on the target but not stacked on each other, so a single Frost Nova or Cyclone cannot lock the whole train at once.",
      counters: [
        {
          compId: "rmp-3s",
          howToPlay: "RMP kites you all day with Frost Nova, Blind, sheep, and Blast Wave while the Priest sits safe behind pillars. Do not chase the Mage across the open — you will eat every root and lose the Warrior to the kite. Instead force the fight onto a pillar, drop Grounding Totem to eat a sheep or Blast Wave, and Tremor Totem for the Blind and Fear. Train the Priest, not the Mage: Mortal Strike him, Purge every Renew and shield, and save Intimidating Shout for his drink or a key Flash Heal cast. If they swap onto your Druid, Nature's Swiftness a Cyclone on the Rogue and body-block with your Shaman.",
        },
        {
          compId: "mld-3s",
          howToPlay: "Mage/Lock/Druid is the nightmare kite: chain roots, Frost Nova, Fear, and a Druid who Cyclones your Warrior out of every burst window while the casters DoT and nuke from max range. You cannot out-attrition them, so you must land a fast kill before their control fully cycles. Pre-drop Tremor and Grounding Totems, wait for the Shaman to have a Grounding up before you commit, then Bloodlust + Death Wish on the Warlock the instant he is snared and out of Fear range. Purge every UA and shield off the Druid, and use Piercing Howl plus Frost Shock to keep at least one caster in melee at all times so they can never all freecast.",
        },
      ],
      tips: [
        "Purge is your win button against Druid and Priest teams: strip Riptide-less HoTs, Renews, and Power Word: Shields before every burst so your damage lands raw.",
        "Stagger Death Wish, Recklessness, Bloodlust, and Windfury procs into a single target on the same global window; spreading them out just gives the healer time to react.",
        "Drop Grounding Totem proactively in the caster's sightline to eat the Polymorph or Fear that starts their kill chain, and refresh it on cooldown.",
        "Keep Frost Shock and Hamstring rolling on the kill target at all times; the moment your snare drops on a caster comp, the Warrior is out of the fight.",
      ],
      requiredGear: [
        "Warrior and Shaman prioritize resilience to survive caster burst, then top-end weapon damage (a slow 2H for the Warrior's Mortal Strike, matched fast/slow mainhand + offhand for Windfury on the Shaman) to maximize spike.",
        "Resto Druid stacks resilience and mana/spirit regen (Innervate uptime is everything) so he can outlast attrition while kiting; +healing is secondary to simply not dying to the swap.",
      ],
    },
  },
  {
    id: "triple-healer-control-5s",
    name: "5s Triple-Healer Control",
    bracket: "5s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "warlock", spec: "affliction" },
      { class: "shaman", spec: "restoration" },
      { class: "paladin", spec: "holy" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "S",
    playstyle: "control",
    difficulty: 3,
    strengths: [
      "Three healers make you functionally unkillable — no S2 burst breaks through Chain Heal, Holy Light, and Flash Heal stacked on one target",
      "Wins every attrition game: Mana Burn, Curse of Tongues, and offensive dispels drain enemy healers dry while your mana pool outlasts theirs",
      "Layered peels and CC (Fear, Hamstring, Frost Shock, Hex, Cyclone-free but Death Coil, Psychic Scream) let you fully lock a single kill target on command",
    ],
    weaknesses: [
      "Zero burst identity — if the enemy also runs a control or double-healer setup, games hit the 45-minute mark and can come down to a single misplay or a mana coinflip",
      "Extremely coordination-heavy: mis-timed CoT, a greedy Bloodlust, or one healer caught out of line-of-sight instantly turns your kill window into a scramble",
    ],
    keyCounters: [
      "caster-cleave-5s",
      "shadowplay-plus-5s",
    ],
    keyFavors: [
      "melee-cleave-5s",
      "dps-zerg-5s",
      "beast-hunter-cleave-5s",
    ],
    blurb:
      "The definitive S2 immortality comp — three healers behind an Arms warrior and Affliction warlock who never stop applying pressure. You don't out-burst anyone; you refuse to die and grind the enemy team into an empty mana bar. Every game is a war of attrition you were built to win.",
    guide: {
      overview:
        "Triple-Healer Control is the purest expression of the TBC 5s meta: stack Resto Shaman, Holy Paladin, and Disc Priest behind a two-DPS core and become impossible to kill. No burst window in Season 2 punches through three stacked healers, so the enemy is forced into a mana war they almost never win. Your job is to survive the first ten minutes, then let attrition, Mana Burn, and offensive dispels do the rest.\n\nThe Arms warrior keeps Mortal Strike on the kill target so no single heal fully patches the wound, while the Affliction warlock blankets all five enemies in DoTs and hangs Curse of Tongues on their primary healer. Together they generate constant, healer-taxing pressure that never lets the other team drink or reset. You win by drought, not by damage.",
      winCondition:
        "You win when the enemy team runs dry or one of their players drifts out of position. Sustain the game past the point where their healers can keep up: warlock DoTs (Corruption, Unstable Affliction, Curse of Agony) tick constantly so nobody drinks, Curse of Tongues slows their main healer's casts by 50%, and your Disc Priest Mana Burns the enemy healer whenever they're clear of your own team. When Bloodlust fires, the warrior pops Recklessness and Death Wish, the warlock swaps to full burst on the MS'd target, and Psychic Scream + Hamstring lock the healer out of range — that single coordinated window is what converts a 40-minute drain into a kill.",
      cooldownTimeline:
        "Open patient: warlock spreads DoTs on all five and lands Curse of Tongues on the enemy healer while the warrior applies Mortal Strike and Hamstring to your primary target. Hold Bloodlust — do not waste it on the opener. Trade defensives early: Shaman drops Grounding Totem for the first big Mana Burn or Polymorph, Paladin saves Divine Shield/Blessing of Protection to peel a trained healer, priest keeps Fear Ward on whichever healer eats Death Coil. Around the mid-game, once the enemy has burned a Bloodlust or a trinket, commit yours: Bloodlust + Recklessness + Death Wish + warlock burst + Psychic Scream on the kill target's healer. If it doesn't kill, reset, re-drop totems, and grind the next window.",
      positioning:
        "Play a tight triangle with clear line-of-sight between all three healers so Chain Heal bounces and cross-heals land — but stagger just enough that a single Psychic Scream or Blast Wave can't catch everyone. Healers hug pillars to break enemy caster LoS and force melee to commit around the corner, where the warrior can Intercept and the warlock can Fear into the open. Keep the warlock at max range with an escape angle for Death Coil + Fear kiting, and never let two healers get line-of-sighted at once. On kill windows, collapse onto the target; the instant it's not converting, peel back to pillars and return to the grind.",
      counters: [
        {
          compId: "caster-cleave-5s",
          howToPlay: "This is your hardest matchup — their double-priest Mana Burn and offensive dispels out-attrition your out-attrition plan, and casters ignore your peels. Force brutal LoS with pillars so their Shadow Bolts and Mana Burns whiff, and make the warlock spam-purge Curse of Tongues off your healers isn't possible, so lean on Grounding Totem and Spell Reflection to eat their key casts. Train their squishiest caster with warrior + warlock so they can't sit back and burn — every second they spend defensive is a Mana Burn they don't cast. Bank Bloodlust for the exact moment one of their priests is out of position.",
        },
        {
          compId: "shadowplay-plus-5s",
          howToPlay: "Shadow priests bring Mana Burn plus Vampiric Touch and offensive dispel, so they can break your immortality by draining you and stripping shields off your priest. Purge and Dispel Magic to remove their Vampiric Embrace/DoTs, keep Fear Ward rolling so their Psychic Scream chains don't set up a burn train, and never let both shadow priests free-cast Mana Burn — the warrior Intercepts and MS-locks one while the warlock Fears the other. Grounding Totem eats Mana Burn; drop it on cooldown. Win by killing one shadow priest in a Bloodlust window before their sustained drain flips the mana race.",
        },
      ],
      tips: [
        "Never open with Bloodlust — it's your one real kill button. Hold it until the enemy has already blown a trinket or their own Lust, then stack it with Recklessness for a genuine window.",
        "Assign one healer (usually Disc Priest) to offensive Mana Burn duty whenever they're safely out of your team's LoS — draining the enemy healer is often worth more than topping a raid bar that's already full.",
        "Keep Curse of Tongues glued to the enemy's primary healer at all times; a 50% cast slow on their main resto is the single biggest reason attrition tilts your way.",
        "Drop Grounding Totem proactively before predictable casts (Polymorph, Mana Burn, Fear) rather than reactively — in a 40-minute game the totem uptime adds up to dozens of eaten spells.",
      ],
      requiredGear: [
        "Healers prioritize max mana pool, MP5, and full resilience — Season 2 Merciless Gladiator's healing sets with Medallion of the Alliance/Horde to break Fear; the game is a mana marathon, so regen beats throughput.",
        "Warrior needs a high-end slow 2H (Merciless Gladiator's Decapitator / Bonegrinder) plus resilience to survive focus, and the warlock stacks resilience, stamina, and Spell Penetration so DoTs and Mana Burn-forcing pressure land through resist gear.",
      ],
    },
  },
  {
    id: "beast-hunter-cleave-5s",
    name: "5s Beast/Hunter Cleave (2347)",
    bracket: "5s",
    members: [
      { class: "hunter", spec: "beast-mastery" },
      { class: "shaman", spec: "elemental" },
      { class: "warlock", spec: "destruction" },
      { class: "priest", spec: "discipline" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "A",
    playstyle: "burst",
    difficulty: 2,
    strengths: [
      "An 18-second Beast Within window makes the hunter fully CC-immune while pumping — nothing short of los or a bubble stops the pet-and-shot burst.",
      "Double healer core (disc priest + holy paladin) means you rarely lose the war of attrition even after the opener trades down.",
      "Bloodlust plus Elemental Mastery Chain Lightning stacks a second ranged nuke on top of the hunter, so two targets melt at once.",
    ],
    weaknesses: [
      "Once Bestial Wrath, Bloodlust, and Elemental Mastery are spent, your damage falls off a cliff and control comps grind you out.",
      "Heavy reliance on a landed kill window — a single Grounding Totem, bubble, or Blessing of Protection on the target resets your whole cooldown investment.",
    ],
    keyCounters: [
      "triple-healer-control-5s",
      "double-healer-control-5s",
    ],
    keyFavors: [
      "melee-cleave-5s",
      "dps-zerg-5s",
    ],
    blurb:
      "Beast/Hunter Cleave is a ranged burst comp built around the hunter's Beast Within window: a CC-immune nuke phase backed by Elemental Shaman and Destro Warlock damage, all propped up by a disc priest and holy paladin. It hits like a truck for eighteen seconds and refuses to die afterward. If the opener doesn't kill, the double-healer backbone lets you reset and go again.",
    guide: {
      overview:
        "This is the ranged answer to the 5s burst meta. Your win is a stacked cooldown dump — Bloodlust, Elemental Mastery Chain Lightning, and Bestial Wrath all landing on one target inside a Shadowfury stun — while The Beast Within makes the hunter immune to every trap, fear, and stun the enemy tries to peel with. Two healers mean you can commit fully on offense without dying to the return burst.\n\nThe comp's identity is patience wrapped around a violent spike. Unlike a zerg, you are not forced to kill in the first ten seconds; the priest and paladin can hold the line indefinitely on mana, so you set up a clean window, force defensive cooldowns out of the enemy healer, and swing again. Your ceiling is decided by how well the shaman lands Purge and Grounding and how disciplined the hunter is with Aimed Shot's healing cut on the kill target.",
      winCondition:
        "Pick a cloth or low-armor target and stack everything at once: Bloodlust, then Elemental Mastery into an instant Chain Lightning crit, Bestial Wrath plus The Beast Within so the hunter is unpeelable, and a warlock Shadowfury to lock the target in place. The hunter opens with Aimed Shot to plant the 50% healing reduction, then Kill Command and Arcane Shot pour on while the pet and Chain Lightning finish it. If the enemy healer tries to top the target, the shaman Purges the shield and the warlock fears or Curse-of-Tongues-slows the cast so the kill lands inside the immunity window.",
      cooldownTimeline:
        "Round start: shaman drops Grounding and Tremor Totems, warlock applies Curse of the Elements. First real go usually comes 15-20 seconds in once the priest has Fear Ward and Power Word: Shield up on the hunter. Fire Bestial Wrath + The Beast Within, Bloodlust, and Elemental Mastery together — this is your one great window every three minutes (Bloodlust) and every two (Bestial Wrath). Aimed Shot's healing debuff refreshes every ten seconds, so keep it rolling on whoever you're pressuring. Hold the warlock's Shadowfury and the paladin's Blessing of Protection as reactive tools for the return burst rather than burning them early.",
      positioning:
        "Play as a ranged wall with the hunter and shaman at max range and the warlock slightly forward to land Fear and Shadowfury. Keep the holy paladin and disc priest split across separate pillars so a single Shadowfury or fear chain can't catch both healers — losing one healer collapses the whole attrition plan. The hunter should abuse pillars to force melee into deadzone range, and the shaman must have line of sight on incoming casts to drop Grounding Totem in the enemy's face. Never let all five group tight; caster and melee cleaves will AoE-fear or Chain Lightning your stack.",
      counters: [
        {
          compId: "triple-healer-control-5s",
          howToPlay: "You cannot out-attrition three healers, so you must win the single window. Force one healer's cooldowns with a fake commit, then go for real on a second healer the instant their Blessing of Protection and bubble are down. Have the shaman Purge Power Word: Shield off the kill target every time before the hunter's Aimed Shot, and Curse of Tongues the paladin so cleanses and heals cast slow. If the first two full windows don't produce a kill, you are on their clock — play for a dampening or mana-starve finish and don't overextend the hunter without Beast Within up.",
        },
        {
          compId: "double-healer-control-5s",
          howToPlay: "They will try to CC the hunter and grind after your Beast Within expires, so timing is everything — only commit when Bestial Wrath, Bloodlust, and a Shadowfury are all available together. Kill the target inside the immunity window or not at all. Have the warlock's Felhunter Spell Lock and Devour Magic ready to counter their control caster, and split your own healers hard so their fear chains and stun setups can't catch both. Between windows, trade Purges and Mana Burn-style pressure isn't available to you, so bank cooldowns and punish the moment a healer is out of position.",
        },
      ],
      tips: [
        "Sync the hunter's Bestial Wrath with the shaman's Elemental Mastery Chain Lightning — one immunity window, two ranged spikes on the same target is what actually secures kills.",
        "Keep Aimed Shot rolling for the 50% healing cut; a kill target that can still be fully healed is a wasted cooldown dump.",
        "Drop Grounding Totem proactively to eat the enemy's Polymorph, Fear, or a key Shadow Bolt — don't hoard it, its cooldown is short.",
        "Split the priest and paladin behind different pillars so no single fear or Shadowfury catches both healers and cracks your attrition game.",
      ],
      requiredGear: [
        "Hunter and casters prioritize resilience to survive the enemy's return burst, with the hunter running a high-crit ranged weapon (Crossbow of Relentless Strikes / Sunfury Bow) to make Aimed Shot and Kill Command hit hard.",
        "Both healers stack mana regen and spell power for the long game — this comp wins attrition, so the priest's and paladin's ability to heal indefinitely matters more than any single big cooldown.",
      ],
    },
  },
  {
    id: "shadowplay-plus-5s",
    name: "5s Shadowplay Plus",
    bracket: "5s",
    members: [
      { class: "priest", spec: "shadow" },
      { class: "shaman", spec: "elemental" },
      { class: "mage", spec: "frost" },
      { class: "warlock", spec: "destruction" },
      { class: "paladin", spec: "holy" },
    ],
    tier: "A",
    playstyle: "burst",
    difficulty: 3,
    strengths: [
      "Stacked instant burst — Elemental Mastery Chain Lightning, Mind Blast and Shadowfury land in one global for kills healers can't outheal",
      "Overlapping lockout — Counterspell, Spell Lock, Priest Silence and Earth Shock chain-silence any healer for 8+ seconds",
      "Two damage schools plus mana burn give it a plan-B win: attrition the healer dry when the burst is peeled",
    ],
    weaknesses: [
      "Five casters with no melee peel bleed hard once a warrior or two rogues sit on the shaman or priest",
      "Loses its whole identity if the Grounding Totem, Frost Nova and Bubble cooldowns are baited out before the go",
    ],
    keyCounters: [
      "melee-cleave-5s",
      "beast-hunter-cleave-5s",
    ],
    keyFavors: [
      "double-healer-control-5s",
      "triple-healer-control-5s",
      "caster-cleave-5s",
    ],
    blurb:
      "Shadowplay Plus takes the shadow priest and elemental shaman core and bolts on a frost mage, destruction warlock and holy paladin for a five-caster wall of ranged burst. It kills through raw instant damage stacked into one global, backed by a silence chain no single healer survives. When the burst is peeled, it simply mana-burns the enemy healer into the floor instead.",
    guide: {
      overview:
        "This is the purest expression of caster cleave in 5s: four ranged damage dealers layering Chain Lightning, Mind Blast, Shadow Bolt and Frostbolt onto one target while the holy paladin keeps the squishy backline alive. The strength is that so much of your damage is instant or near-instant — Elemental Mastery, Ice Lance on a frozen target, Shadow Word: Death, Conflagrate — that a kill can come together faster than a healer can react, especially under a Shadowfury stun.\n\nThe skill floor is high because five casters means five cast bars to protect and five sets of cooldowns to sequence. You win by trading control for control: bait the enemy's defensive globals, land your interrupt chain on their healer, and burst into the opening. Against control teams you have a second gear — sustained mana burn and drain — that turns a stalemate into a mana kill.",
      winCondition:
        "You win by collapsing every instant on one target inside a single control window. The opener is a Shadowfury from the warlock or a Frost Nova plus Polymorph from the mage to lock the enemy healer, then Elemental Mastery Chain Lightning, Mind Blast, Shadow Bolt and an Ice Lance on the primary kill target all inside two globals. Power Infusion from the priest goes on whoever is casting hardest — usually the shaman or warlock. If the healer isn't sheeped, chain Counterspell into Spell Lock into Priest Silence into Earth Shock so they never get a cast off; nobody survives that with the paladin's team-wide burst online. When damage stalls, pivot the shadow priest and warlock to Mana Burn and Drain the enemy healer and take the mana kill.",
      cooldownTimeline:
        "Bloodlust is your kill signal — pop it with Elemental Mastery, Icy Veins and Power Infusion for a stacked go, and only when the enemy's Grounding Totem and the target healer's escape (Divine Shield, Ice Block, trinket) are already spent. Shadowfury and Hammer of Justice are your hard control on the go; save them, don't open blind. Cold Snap gives the mage a second Frost Nova or Ice Block to reset a peel. The paladin holds Divine Shield and a Blessing of Protection for whoever the enemy trains. Reserve the shaman's Nature's Swiftness Chain Heal and the priest's Fear as defensive breathers when a melee comp is on top of you.",
      positioning:
        "Play the pillars: keep the shaman, priest and warlock ranged and staggered so a single Chain Lightning, Blast Wave or intercept can't catch multiples, and never let all five stack for an enemy Shadowfury or Blast Wave. Drop Grounding Totem to eat the first Counterspell or Polymorph aimed at your casters, and Tremor Totem preemptively against fear teams. The mage plays a step forward to land Frost Nova and set up shatter windows, then blinks back behind a pillar. The paladin sits deepest, LoS-ing the enemy's damage while staying in Cleanse and Holy Light range of the front two. Against melee, kite around the pillar rather than trading in the open — every second they spend running is a second you free-cast.",
      counters: [
        {
          compId: "melee-cleave-5s",
          howToPlay: "Two warriors plus a rogue or two will train your shaman and priest and interrupt every heal. Spread hard around pillars, drop Tremor and Grounding early, and use the mage's Frost Nova plus the warlock's Shadowfury as peels rather than opener control. Blessing of Freedom the kited caster, Chain Heal on Nature's Swiftness to survive the first train, and Polymorph one melee out while you burst the other or mana-burn their single healer. Do not try to out-race their damage in the open — win the LoS war and take the kill when they overcommit an Intercept.",
        },
        {
          compId: "beast-hunter-cleave-5s",
          howToPlay: "Pets and hunters give them constant Viper Sting mana drain and pet-driven interrupt pressure on your casters. Purge and Frost Shock the pets, keep the shaman topped since he is the Viper Sting magnet, and use the paladin's Blessing of Freedom to break Wing Clip and Frost Trap kiting. Save Grounding for Scatter Shot and Silencing Shot on your kill setup. Burst a hunter, not a pet — kill one hunter and their damage and mana pressure collapse.",
        },
      ],
      tips: [
        "Assign one caller for the go — burst only lands when Chain Lightning, Mind Blast and Shadow Bolt hit the same target in the same two globals, not spread across three targets.",
        "Bait defensives before Bloodlust: force the trinket, Divine Shield or Ice Block on a fake go, then commit the real one when the target is naked.",
        "Rotate your interrupts, don't stack them — Counterspell, then Spell Lock, then Silence, then Earth Shock keeps a healer locked far longer than dumping all four at once.",
        "Keep Grounding Totem on cooldown for the enemy's key cast (Polymorph, Fear, Counterspell) rather than letting it sit unused.",
      ],
      requiredGear: [
        "Prioritize spell hit to the caster cap and heavy spell damage on the shaman, mage, warlock and priest — the burst only works if it lands; take spell penetration pieces against the enemy paladin's resist auras.",
        "Holy paladin stacks resilience, +healing and mp5 with a fast heal weapon; every caster wants max survivability resilience gear plus a high-spellpower weapon and enough Intellect to fuel long mana-burn games.",
      ],
    },
  },
  {
    id: "dps-zerg-5s",
    name: "5s DPS Zerg",
    bracket: "5s",
    members: [
      { class: "warrior", spec: "arms" },
      { class: "rogue", spec: "subtlety" },
      { class: "mage", spec: "frost" },
      { class: "warlock", spec: "affliction" },
      { class: "priest", spec: "discipline" },
    ],
    tier: "C",
    playstyle: "burst",
    difficulty: 3,
    strengths: [
      "Highest burst ceiling in 5s — four DPS can global a single target through one healer",
      "Mortal Strike + Wound Poison stack the enemy healer out of the game during the swap",
      "Polymorph + Fear + Sap layer enough CC to lock a healer for the whole kill window",
    ],
    weaknesses: [
      "Only one healer — you lose every attrition game against multi-healer cores",
      "One whiffed opener and you're on the back foot with no defensive depth to recover",
    ],
    keyCounters: [
      "triple-healer-control-5s",
      "double-healer-control-5s",
    ],
    keyFavors: [
      "caster-cleave-5s",
    ],
    blurb:
      "The all-in 5s archetype: four DPS (arms warrior, sub rogue, frost mage, SL/SL warlock) stacked behind a single discipline priest. You don't win the long game — you CC the enemy healer, dump every cooldown on one target, and delete them before your lone healer runs dry.",
    guide: {
      overview:
        "DPS Zerg trades the safety of a second healer for raw kill pressure. With arms, subtlety, frost, and affliction all pointed at one target, no 5s healer can out-heal a fully committed opener — so the entire game plan is to manufacture that opener: Sap and Polymorph the enemy's peels, Fear or Spell Lock their healer, and blow the target up inside one Kidney Shot.\n\nThe catch is that a single disc priest cannot win attrition. If the first swap fails you have no fallback core to grind behind — you're playing a coin-flip that lands hard when you execute cleanly and folds fast when the enemy survives the initial burst. That's why it sits in C tier: devastating against greedy or under-coordinated teams, exposed against anything that stacks healing.",
      winCondition:
        "Lock the enemy healer with layered CC, stack Mortal Strike + Wound Poison to gut their healing, and delete one target with the combined burst of warrior, rogue, and mage before your single disc priest is out-attritioned.",
      cooldownTimeline:
        "Set up before you commit: Sap a peeler, Polymorph a secondary healer/DPS, and have the warlock's Felhunter ready to Spell Lock or Fear the enemy healer. On the call, warrior lands Mortal Strike (Mortal Wounds) and rogue opens from stealth with Cheap Shot → Premeditation → Cold Blood, applying Wound Poison so healing is halved twice over. Mage fires a Shatter combo — Frost Nova → Ice Lance/Frostbolt — while the warlock chains Death Coil and Fear to keep the healer offline. Everyone pops trinkets and offensive cooldowns together (Recklessness/Death Wish, Icy Veins, Cold Blood Eviscerate), and Kidney Shot closes the window. If the target lives through all of that, back off, let CC DR reset, and re-set rather than feeding a counter-swap.",
      positioning:
        "Stage the rogue in stealth off to the flank for the Sap and the opener while the warrior, mage, and lock hold LoS on a pillar. Collapse hard onto the kill target the instant the healer is CC'd, but keep the frost mage and priest spaced so a single Fear or AoE can't catch your whole team. The disc priest plays deepest behind LoS — Pain Suppression and Power Word: Shield are your only lifeline, so never let the priest get isolated or trained off the pillar.",
      counters: [
        {
          compId: "triple-healer-control-5s",
          howToPlay: "Three healers simply out-sustain a single burst window — you cannot win attrition. Your only path is a full lockout: Polymorph and Fear two healers on separate DR while Spell Lock and Kidney Shot the third, then commit every cooldown at once on one target. If the kill doesn't land under that lockdown, it isn't coming — reset CC DR and try again rather than trading into their endless healing.",
        },
        {
          compId: "double-healer-control-5s",
          howToPlay: "Their warrior + mage pressure plus two healers grinds your lone priest down over time, so you must kill before the clock favors them. Sap or Poly one healer out of the opener, Wound Poison + Mortal Strike the other, and blow up a target early. Peel their mage off your priest with Counterspell and Spell Lock, and never let the game go long — every minute past the opener swings toward them.",
        },
      ],
      tips: [
        "You have one healer — treat every game as a race and force the kill inside your first fully-loaded opener.",
        "Double the healing debuff: land Mortal Strike and Wound Poison on the target before you dump burst.",
        "Save the warlock's Spell Lock and the mage's Counterspell for the enemy healer's clutch cast, not for pressure.",
        "If the swap fails, disengage and let CC DR reset — re-setting beats tunneling into a counter-swap with no defensive depth.",
      ],
      requiredGear: [
        "Warrior + rogue: hard-hitting weapons first (Merciless 2H / fast off-hand), then resilience — the kill has to land in one opener",
        "Mage, warlock + priest: resilience plus a deep enough mana pool to survive one long game, since your single healer can't win attrition",
      ],
    },
  },
];

// ---- accessors -------------------------------------------------------

export function getComp(id: string): ArenaComp | undefined {
  return COMPS.find((c) => c.id === id);
}

export function getCompBySlug(bracket: string, slug: string): ArenaComp | undefined {
  return COMPS.find((c) => c.bracket === bracket && compSlug(c) === slug);
}

/** URL slug for a comp within its bracket (drops the "-2s"/"-3s"/"-5s" suffix). */
export function compSlug(comp: Pick<ArenaComp, "id">): string {
  return comp.id.replace(/-(2s|3s|5s)$/, "");
}

// The subset of fields a comp card renders (lets CompCard accept a lighter
// shape than the full ArenaComp).
export type CompCardData = Pick<
  ArenaComp,
  "id" | "name" | "bracket" | "tier" | "playstyle" | "difficulty" | "blurb" | "members"
>;

export const TIER_ORDER: Record<Tier, number> = { S: 0, A: 1, B: 2, C: 3 };

export function compsByBracket(bracket: Bracket): ArenaComp[] {
  return COMPS.filter((c) => c.bracket === bracket).sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );
}
