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
    keyCounters: ["warlock-disc-priest-2s", "warrior-druid-2s"],
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
          compId: "warrior-druid-2s",
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
];

// ---- accessors -------------------------------------------------------

export function getComp(id: string): ArenaComp | undefined {
  return COMPS.find((c) => c.id === id);
}

export function getCompBySlug(bracket: string, slug: string): ArenaComp | undefined {
  return COMPS.find((c) => c.bracket === bracket && compSlug(c) === slug);
}

/** URL slug for a comp within its bracket (drops the "-2s"/"-3s"/"-5s" suffix). */
export function compSlug(comp: ArenaComp): string {
  return comp.id.replace(/-(2s|3s|5s)$/, "");
}

export const TIER_ORDER: Record<Tier, number> = { S: 0, A: 1, B: 2, C: 3 };

export function compsByBracket(bracket: Bracket): ArenaComp[] {
  return COMPS.filter((c) => c.bracket === bracket).sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );
}
