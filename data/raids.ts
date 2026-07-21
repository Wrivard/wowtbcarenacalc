// TBC raid + boss data. Phase → raid → boss. Strategies are hand-written
// in the site voice, role-organized (tank/healer/dps), paraphrased from
// established TBC boss knowledge (WoWWiki / Wowhead). Loot uses Wowhead
// item ids so tooltips + BiS cross-links resolve client-side.
//
// Phase 1 is fully populated; later phases are added over time (the route
// tree and components already support them).

export interface BossPhaseStep {
  name: string;
  description: string;
}

export interface BossLoot {
  itemId: number;
  slot: string;
  type: string; // "Plate", "Trinket", "Weapon", "Token", …
}

export interface Boss {
  id: string;
  name: string;
  raidId: string;
  phase: number;
  role: string; // recommended raid setup, e.g. "2 tanks, 5 healers, 18 dps"
  difficulty: 1 | 2 | 3;
  hasDiagram?: boolean; // render a <BossPositionDiagram>
  loot: BossLoot[];
  strategy: {
    overview: string;
    phases: BossPhaseStep[];
    tankNotes: string;
    healerNotes: string;
    dpsNotes: string;
    hardmodeNotes?: string;
    commonMistakes: string[];
  };
}

export interface Raid {
  id: string;
  name: string;
  phase: number;
  size: number; // 10 or 25
  location: string;
  blurb: string;
}

export const RAIDS: Raid[] = [
  { id: "karazhan", name: "Karazhan", phase: 1, size: 10, location: "Deadwind Pass", blurb: "The 10-player gateway raid of TBC and the most-run instance of the expansion. A long, varied dungeon with puzzle-like encounters, Karazhan gears your whole roster for the 25-player content." },
  { id: "gruuls-lair", name: "Gruul's Lair", phase: 1, size: 25, location: "Blade's Edge Mountains", blurb: "A short two-boss 25-player raid: the multi-add High King Maulgar council, then Gruul the Dragonkiller and his ever-growing Grows. The first real 25-player coordination test." },
  { id: "magtheridons-lair", name: "Magtheridon's Lair", phase: 1, size: 25, location: "Hellfire Citadel", blurb: "A single-boss 25-player raid built around the Hellfire Channelers and a raid-wide click event. Punishing to undergeared groups, trivial once coordinated." },
  { id: "serpentshrine-cavern", name: "Serpentshrine Cavern", phase: 2, size: 25, location: "Coilfang Reservoir, Zangarmarsh", blurb: "The 25-player water raid of Phase 2, home to six bosses culminating in Lady Vashj. A serious step up in coordination — poison management, add control, and the infamous tainted-core relay on Vashj." },
  { id: "tempest-keep", name: "Tempest Keep: The Eye", phase: 2, size: 25, location: "Netherstorm", blurb: "The blood elf fortress raid, four bosses ending with Kael'thas Sunstrider — a five-phase gauntlet against his advisors, their weapons, and Kael himself. The definitive Phase 2 progression check." },
];

export const BOSSES: Boss[] = [
  // ---------------- Karazhan ----------------
  {
    id: "attumen-the-huntsman",
    name: "Attumen the Huntsman",
    raidId: "karazhan",
    phase: 1,
    role: "2 tanks, 2-3 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "The first Karazhan boss, a two-phase fight against the stablemaster Attumen and his mount Midnight. You tank the two separately until Midnight hits 25%, when they merge into a single mounted boss.",
      phases: [
        { name: "Phase 1 — Split", description: "Two tanks pick up Attumen and Midnight and drag them apart. DPS Midnight down toward 25% while avoiding Attumen's cleave." },
        { name: "Phase 2 — Merged", description: "At 25% they mount up and merge. Tank the combined Attumen away from the raid; watch for a random-target Charge and Enrage at low health." },
      ],
      tankNotes:
        "Keep Attumen and Midnight far apart in phase one so cleaves don't hit the raid. In phase two, face the merged boss away from everyone and hold threat through the Enrage.",
      healerNotes:
        "Two-tank healing in phase one is light; save cooldowns for the merged phase where tank damage spikes with the Enrage.",
      dpsNotes:
        "Bring Midnight to just above 25% while Attumen is healthy, then push. Move out of the random Charge target's path.",
      commonMistakes: [
        "Letting Attumen and Midnight overlap so cleaves shred the raid.",
        "Pushing Midnight below 25% before the raid is ready for the merge.",
      ],
    },
  },
  {
    id: "moroes",
    name: "Moroes",
    raidId: "karazhan",
    phase: 1,
    role: "2 tanks, 3 healers, rest dps (CC-heavy)",
    difficulty: 2,
    hasDiagram: true,
    loot: [
      { itemId: 28649, slot: "Ring", type: "Ring" },
    ],
    strategy: {
      overview:
        "A CC check. Moroes brings four random adds — mini-bosses with their own abilities — and you must crowd-control them while burning the boss. He also Vanishes to Garrote a random player and Blinds his tank.",
      phases: [
        { name: "Add control", description: "CC the four adds immediately (Sap, Sheep, Shackle, Trap, Banish where applicable). Kill any that can't be chain-CC'd first." },
        { name: "Boss burn", description: "Tank Moroes and DPS him down. He Vanishes periodically to Garrote a random raider (a heavy DoT) and Gouges/Blinds the tank." },
      ],
      tankNotes:
        "Establish threat through his Vanish → Gouge resets. Keep him still so ranged and healers stay in range; a second tank can hold a non-CC'd add.",
      healerNotes:
        "The random Garrote is a nasty stacking bleed — assign a healer to watch for it and top the garroted player fast. Save cooldowns for when he re-appears on the tank.",
      dpsNotes:
        "Never break CC early. Focus the boss; re-CC adds as they break. Blood Elf/UD Will-of-the-Forsaken/dispels help with the Garrote.",
      commonMistakes: [
        "Losing control of the adds — a loose add plus Moroes wipes the group.",
        "Ignoring the Garrote target until they're dead.",
      ],
    },
  },
  {
    id: "maiden-of-virtue",
    name: "Maiden of Virtue",
    raidId: "karazhan",
    phase: 1,
    role: "1 tank, 3 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "A healing and spacing check. Maiden casts Repentance (a raid-wide stun/incapacitate) and Holy Fire/Holy Ground, so the raid spreads out and healers pre-empt the burst.",
      phases: [
        { name: "Single phase", description: "Tank her in the center or against a wall; raid spreads at range. Heal through Holy Wrath and survive each Repentance." },
      ],
      tankNotes:
        "Position her so melee aren't standing in Holy Ground. Steady threat — this is a healer fight, not a threat fight.",
      healerNotes:
        "Repentance stuns the raid for several seconds — top everyone BEFORE it lands, because you can't heal during it. Holy Fire is a heavy DoT on random targets.",
      dpsNotes:
        "Spread out to minimize Holy Wrath chaining. Melee step out of Holy Ground under the boss.",
      commonMistakes: [
        "Not pre-healing before Repentance and losing players to the stun.",
        "Stacking up so Holy Wrath chains through the raid.",
      ],
    },
  },
  {
    id: "opera-event",
    name: "Opera Event",
    raidId: "karazhan",
    phase: 1,
    role: "Varies by event",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A random one of three shows: Oz (Wizard of Oz — multiple adds), the Big Bad Wolf (Red Riding Hood — a chase mechanic), or Romulo & Julianne (a two-target revive puzzle). You don't know which until you engage.",
      phases: [
        { name: "Oz", description: "Kill the four Oz adds (Dorothee, Tito, Roar, Strawman, Tinhead) then the Crone. CC and focus-fire in order; Cyclone the Crone's tornadoes." },
        { name: "Big Bad Wolf", description: "The Wolf periodically 'Little Red Riding Hood's a random player, forcing them to run while chased. That player kites until it wears off." },
        { name: "Romulo & Julianne", description: "Both must die within ~10 seconds of each other or they revive. Bring them low together, then kill." },
      ],
      tankNotes:
        "Oz: tank the melee adds together. Wolf: hold the single boss, face away. R&J: two tanks, one per lover, kept close for the coordinated kill.",
      healerNotes:
        "Wolf's chased player takes damage while running — spot-heal them. R&J's Julianne heals and casts Powerful Attraction (pulls a player); dispel and reposition.",
      dpsNotes:
        "Oz: follow a kill order and CC. Wolf: the chased target just runs, everyone else DPS. R&J: balance both HP bars for a simultaneous kill.",
      commonMistakes: [
        "R&J: killing one lover too early and letting the other revive it.",
        "Wolf: the chased player running into the raid and spreading damage.",
      ],
    },
  },
  {
    id: "the-curator",
    name: "The Curator",
    raidId: "karazhan",
    phase: 1,
    role: "1 tank, 3 healers, rest dps",
    difficulty: 2,
    loot: [
      { itemId: 30145, slot: "Hands", type: "Tier 4 (Rogue)" },
    ],
    strategy: {
      overview:
        "A burn-and-adds fight. The Curator summons Astral Flare adds and periodically enters Evocation — a channel during which he takes 200% extra damage but is stunned. You manage flares, then unload during Evocation.",
      phases: [
        { name: "Flare management", description: "Astral Flares spawn and fire at random raiders. Ranged/off-tank kill them quickly; they die fast but hit hard." },
        { name: "Evocation", description: "Every ~10 flares he Evocates: no new flares, 200% damage taken, stunned. Burn everything — this is your damage window." },
      ],
      tankNotes:
        "Threat on the boss is easy; the challenge is Hateful Bolt on the second-highest-health target near him — keep melee topped. Face him away from the raid.",
      healerNotes:
        "Astral Flares nuke random players — raid healing is constant. During Evocation, tank damage stops, so triage the flare targets.",
      dpsNotes:
        "Kill flares on spawn, then swap to the boss during Evocation for burst. Save cooldowns for Evocation windows.",
      commonMistakes: [
        "Ignoring flares until they overwhelm the raid.",
        "Not bursting during Evocation and dragging the fight into an Enrage.",
      ],
    },
  },
  {
    id: "terestian-illhoof",
    name: "Terestian Illhoof",
    raidId: "karazhan",
    phase: 1,
    role: "1 tank, 3 healers, rest dps (AoE)",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "An add-and-sacrifice fight. Illhoof's imp Kil'rek buffs him, and he Sacrifices random players into Demon Chains that must be freed by DPS. Imps spawn continuously and need AoE control.",
      phases: [
        { name: "Single phase", description: "Kill Kil'rek to remove the boss's armor buff (it respawns — re-kill it). Free every Sacrificed player fast, and AoE the swarming imps down." },
      ],
      tankNotes:
        "Tank Illhoof and Kil'rek together. Nothing fancy — hold threat while the raid manages sacrifices and imps.",
      healerNotes:
        "A Sacrificed player takes rapid ticking damage and drains the raid's mana — keep them alive until freed. Imp Fireballs add raid damage.",
      dpsNotes:
        "Instantly swap to Demon Chains when someone is Sacrificed. Keep AoE on imps and re-kill Kil'rek each time it respawns.",
      commonMistakes: [
        "Slow reaction to a Sacrifice — the target dies and the mana drain snowballs.",
        "Letting imps stack up uncontrolled.",
      ],
    },
  },
  {
    id: "shade-of-aran",
    name: "Shade of Aran",
    raidId: "karazhan",
    phase: 1,
    role: "1 tank (loose), 3 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The Karazhan mechanics exam. Aran is a mage boss with Flame Wreath (don't move), Blizzard (move out), Arcane Explosion (run away), Frost Nova + Ice Block combo, and a Mass Polymorph. Every mechanic punishes the opposite reaction, so awareness is everything.",
      phases: [
        { name: "Single phase", description: "Spread around Aran. React correctly to each cast: Flame Wreath = freeze, Blizzard/Arcane Explosion = move, Frost Nova = trinket/get away before the Arcane Blast. At 40% he summons Water Elementals and Ice Blocks himself to Pyroblast." },
      ],
      tankNotes:
        "Aran doesn't melee-tank normally — he blinks and casts. 'Tanking' is really about positioning; everyone shares aggro responsibility through the mechanics.",
      healerNotes:
        "Drink when he drinks (he Conjures Water and drinks to full mana — burn him during it or interrupt). Heal through Arcane Explosion and the Elemental phase. Decurse aggressively.",
      dpsNotes:
        "Flame Wreath is the wipe-maker — do NOT move a muscle while it's up. Interrupt his drink if your group can't burst it. Kill Water Elementals at 40%.",
      commonMistakes: [
        "Moving during Flame Wreath and detonating it — the classic Aran wipe.",
        "Not spreading out, so Blizzard and Arcane Explosion hit too many players.",
      ],
    },
  },
  {
    id: "netherspite",
    name: "Netherspite",
    raidId: "karazhan",
    phase: 1,
    role: "2-3 tanks (beam rotation), 3 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "The beam-management fight. Netherspite projects three colored beams (red/tank, green/healer, blue/dps) that players must intercept to gain buffs — but holding a beam too long stacks a debuff, so you rotate players through them.",
      phases: [
        { name: "Beam phase", description: "Assign players to red (threat/health), green (healing done), and blue (damage/mana) beams and rotate them out before the stacking debuff gets lethal." },
        { name: "Banish phase", description: "Netherspite periodically Banishes himself and portals spawn — reposition and reset for the next beam phase." },
      ],
      tankNotes:
        "The red-beam tank holds aggro AND the beam; swap with a second tank before Perseverance stacks too high. Face the boss consistently so beams stay predictable.",
      healerNotes:
        "The green-beam player is healing-boosted but takes a stacking debuff — rotate them and heal the beam-holders through their stacks.",
      dpsNotes:
        "Blue-beam holders do the damage; rotate them out before Void Zone stacks kill them. Discipline in beam rotation is the whole fight.",
      commonMistakes: [
        "Holding a beam too long and dying to the stacking debuff.",
        "Letting a beam go unblocked, which empowers Netherspite.",
      ],
    },
  },
  {
    id: "prince-malchezaar",
    name: "Prince Malchezaar",
    raidId: "karazhan",
    phase: 1,
    role: "1 tank, 3 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [
      { itemId: 28649, slot: "Ring", type: "Ring" },
    ],
    strategy: {
      overview:
        "The Karazhan end boss, a three-phase fight defined by Infernals — flaming meteors that drop random Hellfire zones you must never stand in. As the fight progresses he dual-wields and adds an Enfeeble mechanic that drops players to 1 HP.",
      phases: [
        { name: "Phase 1 (100-60%)", description: "Tank and burn. Infernals begin raining down — move out of their Hellfire pools. Manage floor space." },
        { name: "Phase 2 (60-30%)", description: "He equips axes (more tank damage) and casts Enfeeble: several players drop to 1 HP for a few seconds — do NOT let them take a hit until it fades, then top them instantly." },
        { name: "Phase 3 (<30%)", description: "Amplify Magic and faster Infernals. Burn him down before the floor fills with Hellfire." },
      ],
      tankNotes:
        "Kite the boss subtly to keep clean floor space as Infernals accumulate. Phase 2 axe damage is a healing spike — pop a cooldown.",
      healerNotes:
        "Enfeeble is the killer: the affected players are at 1 HP and any Infernal tick or melee kills them. Heal them the instant Enfeeble expires. Watch the tank in the axe phase.",
      dpsNotes:
        "Positioning over parses — never stand in Hellfire. During Enfeeble, affected players stop moving into danger and wait for the heal.",
      commonMistakes: [
        "Standing in Infernal Hellfire pools (the #1 cause of wipes here).",
        "Enfeebled players taking any damage before the heal lands.",
      ],
    },
  },

  // ---------------- Gruul's Lair ----------------
  {
    id: "high-king-maulgar",
    name: "High King Maulgar",
    raidId: "gruuls-lair",
    phase: 1,
    role: "5 tanks (one per add), 5-6 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "A council fight and the first big 25-player coordination test. Maulgar and four ogre lieutenants pull together — each needs its own tank and a kill order, because their abilities compound while alive.",
      phases: [
        { name: "Add phase", description: "Assign a tank to each: Maulgar, Krosh (mage — needs a Spell Reflect/immune tank for Spellblast), Olm (warlock — summons imps), Kiggler (shaman — Lightning), Blindeye (priest — shields/heals). Kill order typically: Blindeye/Kiggler → Olm → Krosh → Maulgar." },
        { name: "Maulgar solo", description: "With the council dead, tank Maulgar through his Whirlwind and Flurry and burn him down." },
      ],
      tankNotes:
        "Five tanks, five assignments — a warlock or resistance-geared tank takes Krosh. Whoever tanks Maulgar handles his Whirlwind (melee back off). Threat must be solid before DPS commits.",
      healerNotes:
        "Assign healers per tank. Blindeye shields the group — interrupt/kill it early so your DPS isn't wasted. Watch the Krosh tank during Greater Polymorph.",
      dpsNotes:
        "Follow the kill order precisely; splitting DPS across adds prolongs the dangerous phase. Interrupt Blindeye's heals.",
      commonMistakes: [
        "A tank losing an add — a loose ogre in the raid means a wipe.",
        "Killing adds out of order and leaving the most dangerous ones alive longest.",
      ],
    },
  },
  {
    id: "gruul-the-dragonkiller",
    name: "Gruul the Dragonkiller",
    raidId: "gruuls-lair",
    phase: 1,
    role: "1 tank, 5 healers, rest dps",
    difficulty: 2,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "A spacing DPS-race. Gruul stacks Growth (ever-increasing damage and size) throughout the fight, so it's a soft enrage — kill him before the stacks are lethal. His Shatter forces the raid to spread out, or you all die to the chain damage.",
      phases: [
        { name: "Single phase", description: "Tank Gruul in the center; the raid spreads evenly around him at max range. On Shatter, everyone must be spread so Shatter's proximity damage doesn't chain-kill. Cave In drops rock zones to avoid." },
      ],
      tankNotes:
        "Hold threat as Growth ramps your incoming damage. Ground Slam knocks the raid up and inverts controls briefly — reposition after.",
      healerNotes:
        "Growth makes every hit bigger over time — healing demand climbs steadily. Shatter deals damage scaled by how close players are to each other, so spacing IS mitigation.",
      dpsNotes:
        "Spread out before every Shatter — standing together is the #1 wipe cause. Race the Growth soft-enrage; don't waste time.",
      commonMistakes: [
        "Clumping during Shatter and chain-killing the raid.",
        "Slow DPS letting Growth stacks reach unhealable damage.",
      ],
    },
  },

  // ---------------- Magtheridon's Lair ----------------
  {
    id: "magtheridon",
    name: "Magtheridon",
    raidId: "magtheridons-lair",
    phase: 1,
    role: "2 tanks, 5-6 healers, rest dps (5 clickers)",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "A single-boss fight that starts with five Hellfire Channelers you kill first, then Magtheridon himself. The defining mechanic is Blast Nova — a raid-wipe cast that five assigned players must interrupt by clicking Manticron Cubes around the room, which also inflicts Mind Exhaustion.",
      phases: [
        { name: "Channeler phase", description: "Kill the five Hellfire Channelers around the room. They cast Shadow Bolt Volley, Dark Mending (heal — interrupt it), and Burning Abyssal adds. Bring them low together to avoid heals topping them." },
        { name: "Magtheridon phase", description: "Magtheridon unshackles. Tank him while five clickers rotate the Manticron Cubes to interrupt Blast Nova. At 30% he Collapses the ceiling — spread from Debris and finish him." },
      ],
      tankNotes:
        "Off-tank picks up Burning Abyssals in phase one. The main tank holds Magtheridon still and centered so all five cubes stay reachable by their clickers.",
      healerNotes:
        "Cube-clickers take Mind Exhaustion and stacking damage while channeling — keep them up. Cleave/Quake raid damage is constant; the ceiling Collapse at 30% is a burst check.",
      dpsNotes:
        "Clickers MUST reach their cube before Blast Nova completes — a missed click wipes the raid. Everyone else spreads for Debris at 30% and burns.",
      commonMistakes: [
        "A cube-clicker being dead, out of position, or too Mind-Exhausted to click — Blast Nova goes off and wipes the raid.",
        "Standing in Debris during the 30% ceiling collapse.",
      ],
    },
  },

  // ---------------- Serpentshrine Cavern ----------------
  {
    id: "hydross-the-unstable",
    name: "Hydross the Unstable",
    raidId: "serpentshrine-cavern",
    phase: 2,
    role: "2 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A resistance and add-management fight. Hydross toggles between Frost and Nature forms as he's pulled across a line, each swap spawning elemental adds and applying a stacking damage debuff. You need two tanks in the matching resistance sets.",
      phases: [
        { name: "Frost side", description: "Tank Hydross on the frost side (frost-resist tank). At 6 stacks of Mark of Hydross he Enrages — pull him across the line before then." },
        { name: "Nature side", description: "The nature-resist tank taunts as he crosses; nature adds spawn. Alternate sides, killing the spawned Elementals each transition." },
      ],
      tankNotes:
        "Two tanks, each in a resistance set (frost / nature), taunt-swapping at every line cross before the stacking Mark enrages them. Never let one tank hold through 6 stacks.",
      healerNotes:
        "Tank damage spikes with Mark stacks right before each swap. The spawned adds also cleave — keep the off-tank topped through add pickup.",
      dpsNotes:
        "Burn the boss, but stop and AoE the Pure Spawn adds instantly on each transition — a loose add wipes the raid. Watch your own aggro across the taunt swaps.",
      commonMistakes: [
        "Missing the taunt swap and letting a tank enrage at 6 stacks.",
        "Ignoring the elemental adds during a transition.",
      ],
    },
  },
  {
    id: "the-lurker-below",
    name: "The Lurker Below",
    raidId: "serpentshrine-cavern",
    phase: 2,
    role: "2 tanks, 4 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "A positioning fight around a central pool. Lurker alternates a frontal Spout (a rotating water jet that one-shots) with a Whirl, then submerges to spawn adds you handle from platforms.",
      phases: [
        { name: "Above water", description: "Ranged fish him out, then tank on the platform. On Spout, everyone dives into the water to avoid the rotating jet; on Whirl, melee back off." },
        { name: "Submerged", description: "Lurker dives; Coilfang Ambushers and Guardians spawn on the platforms. Tank and kill the adds until he resurfaces." },
      ],
      tankNotes:
        "Main tank holds Lurker on the central platform facing away. Off-tanks grab the adds during the submerge phase from their assigned platforms.",
      healerNotes:
        "Damage is light except add pickup. Position so you're never caught by Spout — dive with the raid.",
      dpsNotes:
        "Spout is a one-shot: jump into the water the instant it starts casting and swim under it. Split to platforms for the add phase.",
      commonMistakes: [
        "Getting clipped by Spout by reacting late — dive early.",
        "Slow add cleanup in the submerge phase.",
      ],
    },
  },
  {
    id: "leotheras-the-blind",
    name: "Leotheras the Blind",
    raidId: "serpentshrine-cavern",
    phase: 2,
    role: "2 tanks + 1 warlock tank, 5 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "A control fight with an inner-demon mechanic. Leotheras alternates human (Whirlwind) and demon (Insidious Whisper — mind control) forms, and periodically spawns Inner Demons that each assigned player must solo-kill or be feared.",
      phases: [
        { name: "Human form", description: "Tank Leotheras; he Whirlwinds for big raid damage — spread and heal through it." },
        { name: "Demon form", description: "A warlock (Soul Link/Fel Armor) tanks the demon via threat wipe mechanics. Inner Demons spawn on random players — each must kill their own demon before it fears them." },
      ],
      tankNotes:
        "Melee tank on human form (spread for Whirlwind). A specced warlock 'tanks' the demon form. Coordinate the form transitions so threat is ready.",
      healerNotes:
        "Whirlwind is heavy raid AoE — pre-HoT and top through it. Watch players fighting their Inner Demon; they take and deal solo damage.",
      dpsNotes:
        "When your Inner Demon spawns, tunnel it down before the timer — a surviving demon mind-controls you. Don't push both forms out of sync.",
      commonMistakes: [
        "A player failing to kill their Inner Demon and getting feared/MC'd into the raid.",
        "Standing stacked during Whirlwind.",
      ],
    },
  },
  {
    id: "fathom-lord-karathress",
    name: "Fathom-Lord Karathress",
    raidId: "serpentshrine-cavern",
    phase: 2,
    role: "4 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A council fight: Karathress plus three advisors (a priest, a hunter, and an enhancement-shaman type), each buffing him as they live. Kill order and add tanking are everything, as Karathress gets stronger with each advisor's death but you remove their abilities.",
      phases: [
        { name: "Advisors", description: "Tank all four apart. Kill order: Sharkkis (hunter — pets/traps) → Tidalvess (shaman — totems, poison) → Caribdis (priest — heals, water spouts). Karathress powers up with each kill." },
        { name: "Karathress solo", description: "With the advisors down, tank the empowered Karathress and burn him." },
      ],
      tankNotes:
        "Four tanks, one per mob. Interrupt/kill Caribdis's heals; move out of totems on Tidalvess. Karathress's tank braces for the power-ups.",
      healerNotes:
        "Spread for the priest's water spouts. Each advisor death spikes Karathress's damage — shift healing to his tank as the fight progresses.",
      dpsNotes:
        "Follow the kill order exactly. Kill Sharkkis's pet, interrupt Caribdis. Save cooldowns for the empowered Karathress phase.",
      commonMistakes: [
        "Killing advisors out of order and leaving the most disruptive alive.",
        "Ignoring totems / water spouts.",
      ],
    },
  },
  {
    id: "morogrim-tidewalker",
    name: "Morogrim Tidewalker",
    raidId: "serpentshrine-cavern",
    phase: 2,
    role: "2 tanks, 5 healers, rest dps (AoE)",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "An add-heavy fight. Morogrim summons Murloc adds (Watery Globules) and periodically swallows a player, who must be freed by killing the boss's stomach adds. Strong AoE and quick reactions carry it.",
      phases: [
        { name: "Single phase", description: "Tank Morogrim; on Tidal Wave (raid knockback + damage) recover fast. He periodically spawns a wave of Murlocs — AoE them down — and Watery Globules that chase and must be killed off targeted players." },
      ],
      tankNotes:
        "Main tank holds Morogrim central; an off-tank grabs Murloc waves for AoE. Reposition after Tidal Wave knockbacks.",
      healerNotes:
        "Tidal Wave hits the whole raid; the swallowed player takes stomach damage until freed. Globule-targeted players take chase damage.",
      dpsNotes:
        "Swap to Murloc waves the instant they spawn — they overwhelm healers if ignored. Kill Globules off whoever they're chasing.",
      commonMistakes: [
        "Slow AoE on Murloc waves, snowballing raid damage.",
        "Not killing Watery Globules chasing casters.",
      ],
    },
  },
  {
    id: "lady-vashj",
    name: "Lady Vashj",
    raidId: "serpentshrine-cavern",
    phase: 2,
    role: "2 tanks, 5-6 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The SSC endboss and one of TBC's signature fights, built around the phase-2 tainted-core relay. Vashj shields herself and can't be damaged until the raid destroys her four elemental generators — by carrying Tainted Cores dropped by Tainted Elementals from pad to pad without getting caught by Enchanted Elementals and Striders.",
      phases: [
        { name: "Phase 1 (100-70%)", description: "Tank and burn Vashj; dodge Static Charge (spread) and Shock Blast (a one-shot on the tank's target — the tank sidesteps or trinkets)." },
        { name: "Phase 2 (shielded)", description: "Vashj shields. Kill Tainted Elementals for Tainted Cores; relay each core to a generator pad while managing Coilfang Striders (haste buff — kill fast) and Enchanted Elementals. Destroy all four generators to end the phase." },
        { name: "Phase 3 (<70%)", description: "Shield down, Vashj resumes casting plus spawns Spore Bats and more Striders. Burn her while managing the adds and Static Charge." },
      ],
      tankNotes:
        "Tank Vashj facing away; Shock Blast targets the tank's current target — position so it doesn't cleave the raid, and use a cooldown/trinket into it. In P2 the tanks help control adds.",
      healerNotes:
        "Static Charge is a chaining shock — spread. P2 is the crunch: Striders' haste buff and Enchanted Elementals pressure the raid while cores relay. P3 adds Spore Bat clouds to heal through.",
      dpsNotes:
        "P2 is the whole fight: pass Tainted Cores hand-to-hand to the pads without dropping them (a dropped core wastes precious time), kill Striders on sight, and destroy all four generators. Discipline in the relay wins the fight.",
      commonMistakes: [
        "Fumbling the Tainted Core relay — dropped or mis-passed cores blow the phase-2 timer.",
        "Letting Coilfang Striders live and haste-buff the adds.",
      ],
    },
  },

  // ---------------- Tempest Keep: The Eye ----------------
  {
    id: "alar",
    name: "Al'ar",
    raidId: "tempest-keep",
    phase: 2,
    role: "2 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A phoenix fight with a platform-hopping first phase and a fiery, add-summoning second. Al'ar has no melee hit but patrols between platforms, and at 0% in phase one it rebirths into phase two rather than dying.",
      phases: [
        { name: "Phase 1", description: "Al'ar hops between platforms in sequence; tanks pick it up at each. Avoid the swooping flame patterns and burn it to 0%, when it revives for phase 2." },
        { name: "Phase 2", description: "Al'ar lands center, casts Flame Patch and Meteor (a knockback + Ember adds). Kill Embers, dodge fire, and burn it down for good." },
      ],
      tankNotes:
        "Tanks rotate picking up Al'ar as it moves platform to platform in P1. In P2 hold it central, away from the fire patches, and grab Ember of Al'ar adds.",
      healerNotes:
        "P1 is light; P2's Meteor knockback + flame patches + Embers is the damage. Spread and top players caught by fire.",
      dpsNotes:
        "Follow it around in P1 without overaggroing the next platform. In P2 kill Embers fast (they explode) and stay out of Flame Patch.",
      commonMistakes: [
        "Standing in flame patterns / patches.",
        "Ignoring Ember adds until they explode.",
      ],
    },
  },
  {
    id: "void-reaver",
    name: "Void Reaver",
    raidId: "tempest-keep",
    phase: 2,
    role: "2 tanks, 4 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "The 'loot reaver' — a simple, forgiving fight and a common first Eye kill. The only real mechanic is Arcane Orb: telegraphed orbs that fall on ranged and must be sidestepped.",
      phases: [
        { name: "Single phase", description: "Tank Void Reaver central; melee stack, ranged spread at max distance. Dodge the Arcane Orbs (they target ranged and deal heavy damage). Knock-away resets threat occasionally — retank fast." },
      ],
      tankNotes:
        "Hold threat through the periodic Knock Away (throws the tank + drops threat). A second tank ready to pick up avoids a loose Reaver.",
      healerNotes:
        "Damage is low and predictable — the only spikes are players who eat an Arcane Orb. Very relaxed healing fight.",
      dpsNotes:
        "Ranged: watch for the orb telegraph and step out of it — it's the only thing that kills you here. Melee just tunnel.",
      commonMistakes: [
        "Ranged standing in an Arcane Orb.",
        "No off-tank ready for the Knock Away threat drop.",
      ],
    },
  },
  {
    id: "high-astromancer-solarian",
    name: "High Astromancer Solarian",
    raidId: "tempest-keep",
    phase: 2,
    role: "2 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A three-phase add and burst fight. Solarian splits into adds, blinks the raid around with Wrath of the Astromancer (a bomb debuff), and transforms into a Void Walker for a hard-hitting final phase.",
      phases: [
        { name: "Caster phase", description: "Tank Solarian; she casts Arcane Missiles and Wrath of the Astromancer — the bombed player runs out so the explosion doesn't hit the raid." },
        { name: "Split phase", description: "Solarian vanishes and spawns Solarium Agents/Priests with her among them — AoE them down and find the real boss." },
        { name: "Void phase (<20%)", description: "She becomes a large Void Walker with heavy melee. Tank and burn." },
      ],
      tankNotes:
        "Hold Solarian in the caster phase; in the void phase her melee spikes hard — cooldown the tank. Pick up adds in the split.",
      healerNotes:
        "Wrath of the Astromancer bomb must be spot-healed and the player must run out. The void phase is a burst check on the tank.",
      dpsNotes:
        "Run out with the bomb debuff. AoE the split adds and swap to the real Solarian when she reappears. Save burst for the void phase.",
      commonMistakes: [
        "Not running out with Wrath of the Astromancer and bombing the raid.",
        "Getting lost in the split phase and letting adds pile up.",
      ],
    },
  },
  {
    id: "kaelthas-sunstrider",
    name: "Kael'thas Sunstrider",
    raidId: "tempest-keep",
    phase: 2,
    role: "3-4 tanks, 6 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The Phase 2 capstone and a five-phase endurance test. You fight Kael's four advisors, then his weapons, then the advisors again, then Kael himself — who Mind-Controls, Gravity Lapses (flings the raid into the air), and hits like a truck. Long, mechanically dense, and unforgiving of a single mistake.",
      phases: [
        { name: "Phase 1 — Advisors", description: "Kill Thaladred (tank kites — he fixates and one-shots the target), Lord Sanguinar, Grand Astromancer Capernian (ranged), and Master Engineer Telonicus one at a time." },
        { name: "Phase 2 — Weapons", description: "Kael summons seven legendary weapons. Tank and destroy them; one (the staff/bow) can be looted and used against him later." },
        { name: "Phase 3 — Advisors return", description: "The four advisors are resurrected together — burn them down again under more pressure." },
        { name: "Phase 4-5 — Kael'thas", description: "Kael engages: Fireball/Flamestrike/Pyroblast, Mind Control on players (off-tank or CC them), and Gravity Lapse — the raid is flung into the air and must fly/fight while Kael nukes. Survive the lapses and burn him." },
      ],
      tankNotes:
        "Thaladred fixates and must be kited, not tanked. Assign a tank per advisor and per weapon. In the Kael phase, off-tanks control Mind-Controlled players; the main tank braces for heavy melee between Gravity Lapses.",
      healerNotes:
        "Every phase is a healing test, but Gravity Lapse is the crux — the raid floats and takes Kael's nukes with limited control. Pre-heal into each lapse and triage the fixate/MC targets throughout.",
      dpsNotes:
        "Respect the kill order in P1/P3. Loot and use the legendary weapon in P2 if your raid uses that strategy. In the Kael phase, stop damage on Mind-Controlled allies and maximize burn windows between Gravity Lapses.",
      commonMistakes: [
        "Tanking Thaladred instead of kiting his fixate.",
        "Losing the raid during Gravity Lapse to Kael's nukes or falling out of position.",
        "Killing a Mind-Controlled player instead of CCing them.",
      ],
    },
  },
];

// ---- accessors -------------------------------------------------------

export const PHASE_RAIDS: Record<number, string[]> = {
  1: ["karazhan", "gruuls-lair", "magtheridons-lair"],
  2: ["serpentshrine-cavern", "tempest-keep"],
  3: ["mount-hyjal", "black-temple"],
  4: ["zulaman"],
  5: ["sunwell-plateau"],
};

export function getRaid(id: string): Raid | undefined {
  return RAIDS.find((r) => r.id === id);
}

export function raidsByPhase(phase: number): Raid[] {
  return RAIDS.filter((r) => r.phase === phase);
}

export function getBoss(id: string): Boss | undefined {
  return BOSSES.find((b) => b.id === id);
}

export function bossesByRaid(raidId: string): Boss[] {
  return BOSSES.filter((b) => b.raidId === raidId);
}

/** Phases that currently have at least one populated raid. */
export function populatedPhases(): number[] {
  return [...new Set(RAIDS.map((r) => r.phase))].sort((a, b) => a - b);
}

// ── Imagery ─────────────────────────────────────────────────────────
// Boss "portrait" icons. Few TBC bosses have a real achievement_boss_*
// icon on the zamimg CDN, so most use a hand-picked ability/spell icon
// that evokes the encounter's signature mechanic (frost for Hydross,
// poison for Vashj, felfire for Kil'jaeden…). Every id below was
// HEAD-verified against the CDN via scripts/resolve-boss-icons.mjs so no
// boss falls back to a generic skull.
const BOSS_SKULL = "inv_misc_bone_skull_02";
const BOSS_ICONS: Record<string, string> = {
  // Karazhan
  "attumen-the-huntsman": "ability_mount_dreadsteed",
  moroes: "spell_shadow_summonvoidwalker",
  "maiden-of-virtue": "spell_holy_holybolt",
  "opera-event": "inv_mask_01",
  "the-curator": "spell_arcane_arcane04",
  "terestian-illhoof": "spell_shadow_summonfelguard",
  "shade-of-aran": "spell_frost_frostbolt02",
  netherspite: "spell_arcane_portalshattrath",
  "prince-malchezaar": "achievement_boss_prince_malchezaar",
  // Gruul's Lair
  "high-king-maulgar": "ability_warrior_savageblow",
  "gruul-the-dragonkiller": "achievement_boss_gruulthedragonkiller",
  // Magtheridon's Lair
  magtheridon: "achievement_boss_magtheridon",
  // Serpentshrine Cavern
  "hydross-the-unstable": "spell_frost_frostbolt02",
  "the-lurker-below": "spell_frost_summonwaterelemental",
  "leotheras-the-blind": "ability_warrior_innerrage",
  "fathom-lord-karathress": "spell_nature_lightning",
  "morogrim-tidewalker": "spell_frost_summonwaterelemental_2",
  "lady-vashj": "achievement_boss_ladyvashj",
  // Tempest Keep
  alar: "spell_fire_fire",
  "void-reaver": "spell_arcane_arcane01",
  "high-astromancer-solarian": "spell_arcane_starfire",
  "kaelthas-sunstrider": "spell_fire_selfdestruct",
  // Mount Hyjal
  "rage-winterchill": "spell_frost_frostnova",
  anetheron: "spell_shadow_carrionswarm",
  kazrogal: "spell_shadow_curseofsargeras",
  azgalor: "spell_shadow_rainoffire",
  archimonde: "spell_arcane_blast",
  // Black Temple
  "high-warlord-najentus": "inv_spear_04",
  supremus: "spell_fire_meteorstorm",
  "shade-of-akama": "spell_shadow_shadowform",
  "teron-gorefiend": "spell_shadow_shadowfiend",
  "gurtogg-bloodboil": "spell_shadow_bloodboil",
  "reliquary-of-souls": "spell_shadow_soulleech_3",
  "mother-shahraz": "spell_shadow_mindshear",
  "illidari-council": "spell_holy_powerinfusion",
  "illidan-stormrage": "achievement_boss_illidan",
  // Zul'Aman
  nalorakk: "ability_druid_maul",
  akilzon: "spell_nature_callstorm",
  janalai: "spell_fire_flamebolt",
  halazzi: "ability_druid_challangingroar",
  "hex-lord-malacrass": "spell_shadow_shadowwordpain",
  zuljin: "achievement_boss_zuljin",
  // Sunwell Plateau
  kalecgos: "inv_misc_head_dragon_blue",
  brutallus: "spell_fire_soulburn",
  felmyst: "spell_fire_felflamering",
  "eredar-twins": "spell_shadow_shadowwordpain",
  muru: "spell_arcane_arcane04",
  kiljaeden: "spell_fire_felfire",
};

export function bossIcon(bossId: string): string {
  return BOSS_ICONS[bossId] ?? BOSS_SKULL;
}

// Per-raid hero art so each raid/boss page looks distinct instead of
// sharing one background. Cycles the available webp art by theme.
const RAID_BG: Record<string, string> = {
  karazhan: "/images/bg-7.webp",
  "gruuls-lair": "/images/bg-1.webp",
  "magtheridons-lair": "/images/bg-4.webp",
  "serpentshrine-cavern": "/images/bg-3.webp",
  "tempest-keep": "/images/bg-6.webp",
  "mount-hyjal": "/images/bg-2.webp",
  "black-temple": "/images/bg-8.webp",
  zulaman: "/images/bg-4.webp",
  "sunwell-plateau": "/images/bg-5.webp",
};

export function raidBackground(raidId: string): string {
  return RAID_BG[raidId] ?? "/images/bg-6.webp";
}
