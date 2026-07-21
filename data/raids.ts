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
  { id: "mount-hyjal", name: "Mount Hyjal", phase: 3, size: 25, location: "Caverns of Time, Tanaris", blurb: "The Battle for Mount Hyjal — a five-boss survival raid where you defend Nordrassil against wave after wave of the Legion's undead and demons, base by base, culminating in Archimonde himself. Trash management matters as much as the bosses." },
  { id: "black-temple", name: "Black Temple", phase: 3, size: 25, location: "Shadowmoon Valley", blurb: "Illidan's fortress and the flagship raid of Phase 3: nine bosses of dense, varied mechanics ending in the Betrayer, Illidan Stormrage. The gear and coordination check that defines a serious TBC guild." },
  { id: "zulaman", name: "Zul'Aman", phase: 4, size: 10, location: "Ghostlands", blurb: "A fast, hard-hitting 10-player raid with four animal-god bosses, a timed bear-mount run, and the troll warlord Zul'jin. Tuned as a challenging alternative to Karazhan-tier 10s — tight, aggressive, and rewarding." },
  { id: "sunwell-plateau", name: "Sunwell Plateau", phase: 5, size: 25, location: "Isle of Quel'Danas", blurb: "The final raid of TBC and its ultimate test: six bosses of unforgiving mechanics — Kalecgos, Brutallus, Felmyst, the Eredar Twins, M'uru, and Kil'jaeden — the end of the Sunwell and of the expansion itself." },
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

  // ---------------- Mount Hyjal ----------------
  {
    id: "rage-winterchill",
    name: "Rage Winterchill",
    raidId: "mount-hyjal",
    phase: 3,
    role: "1-2 tanks, 5 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "The first Hyjal boss, a lich reached after clearing the first wave of Anetheron's undead trash. A single-phase fight defined by two debuffs — Death and Decay under the raid and Icebolt, which roots a random player in a frost tomb.",
      phases: [
        { name: "Single phase", description: "Tank Winterchill in place; move out of Death and Decay pools, dispel/heal Icebolt targets, and burn him before Frost Armor and Chill Nova whittle the raid." },
      ],
      tankNotes:
        "Hold Winterchill still so the raid always knows where Death and Decay will land. His melee is light — this is a raid-damage fight, not a tank check.",
      healerNotes:
        "Icebolt roots a random player and hits hard while they're tombed — keep them topped until it breaks. Chill Nova is periodic raid AoE; keep everyone above the Death and Decay tick.",
      dpsNotes:
        "Step out of Death and Decay the instant it drops and keep DPS uptime high — he ramps up as the fight drags. Ranged help clear stray undead adds from the wave.",
      commonMistakes: [
        "Standing in Death and Decay chasing uptime.",
        "Ignoring an Icebolt target until they die tombed.",
      ],
    },
  },
  {
    id: "anetheron",
    name: "Anetheron",
    raidId: "mount-hyjal",
    phase: 3,
    role: "2 tanks, 5-6 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A dreadlord fight built around Carrion Swarm and Sleep. Anetheron periodically Sleeps random players and drains the raid with Carrion Swarm, while Infernals rain down and must be tanked or offed before they rampage.",
      phases: [
        { name: "Single phase", description: "Tank Anetheron centrally; assign someone to dispel Sleep, keep the raid spread from Carrion Swarm's cone, and pick up the Infernals that fall throughout the fight." },
      ],
      tankNotes:
        "Face Anetheron away from the raid so Carrion Swarm only hits the front. Have an off-tank ready to grab Infernals the moment they land — a loose Infernal shreds the casters.",
      healerNotes:
        "Sleep takes healers and players out of the fight — dispel it fast (priests especially). Carrion Swarm is a big frontal drain; pre-heal into it and top the Infernal tank.",
      dpsNotes:
        "Stay out of the Carrion Swarm cone, wake dispels aside. Swap to Infernals if your raid kills them, otherwise tunnel Anetheron and out-race the Infernal accumulation.",
      commonMistakes: [
        "Standing in front for Carrion Swarm.",
        "Letting an Infernal run free into the healers.",
      ],
    },
  },
  {
    id: "kazrogal",
    name: "Kaz'rogal",
    raidId: "mount-hyjal",
    phase: 3,
    role: "2 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A mana-burn race. Kaz'rogal's Mark of Kaz'rogal drains mana from every player carrying it, and when a marked player hits zero mana it detonates for heavy raid damage. The fight is a hard enrage against your mana pool — burn him before too many marks pop.",
      phases: [
        { name: "Single phase", description: "Tank Kaz'rogal and burn as fast as possible. The Mark spreads faster over time; healers and casters manage mana so their detonations don't chain-wipe the raid near the end." },
      ],
      tankNotes:
        "Straightforward threat and positioning — hold him still. War Stomp interrupts and knocks back periodically, so re-establish quickly. The clock, not his melee, is the threat.",
      healerNotes:
        "This is a mana fight. Space out heals, use every regen cooldown, and be aware that a marked player draining to zero explodes — stagger who runs dry so detonations don't overlap.",
      dpsNotes:
        "Pure burn check. Bloodlust/Heroism early or on a planned window, pop trinkets, and beat the escalating Mark drain. Mana users blow detonations deliberately spread out.",
      commonMistakes: [
        "Slow DPS letting the Mark drain outpace your kill.",
        "Multiple players hitting zero mana at once and chaining detonations.",
      ],
    },
  },
  {
    id: "azgalor",
    name: "Azgalor",
    raidId: "mount-hyjal",
    phase: 3,
    role: "2 tanks, 5-6 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "The fourth Hyjal boss and the last before Archimonde. Azgalor's signature is Doom — a Rain of Fire debuff that, when it expires, spawns a Lesser Doomguard that must be tanked and killed. Manage the Doomguards while healing through Howl of Azgalor's silence.",
      phases: [
        { name: "Single phase", description: "Tank Azgalor central; assign a Doomguard tank for the adds Doom spawns. Cleanse/heal Doom targets, out-range Rain of Fire, and burn Azgalor before Doomguards pile up." },
      ],
      tankNotes:
        "Main-tank holds Azgalor still through Howl of Azgalor (a raid silence + damage). A dedicated off-tank picks up every Lesser Doomguard — they hit hard and enrage if ignored.",
      healerNotes:
        "Doom can't be dispelled off in time on most setups — heal the target and prepare for the Doomguard. Howl silences and hurts the raid; stagger heals so a silence window doesn't drop the tank.",
      dpsNotes:
        "Kill Lesser Doomguards fast when they spawn, then back to Azgalor. Stay out of Rain of Fire. Balance add cleanup against boss DPS so you beat the Doomguard accumulation.",
      commonMistakes: [
        "Leaving a Lesser Doomguard untanked to maul the raid.",
        "Standing in Rain of Fire or getting caught silenced with the tank low.",
      ],
    },
  },
  {
    id: "archimonde",
    name: "Archimonde",
    raidId: "mount-hyjal",
    phase: 3,
    role: "1-2 tanks, 6 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The Hyjal endboss and a pure execution fight — no adds, just a checklist of mechanics that each one-shot. Air Burst flings players into the air (fatal without a Tear of the Goddess to soften the landing), Doomfire chases the raid, Grip of the Legion is a magic DoT, and Fear turns the raid into a hazard. One mistake wipes the raid.",
      phases: [
        { name: "Single phase", description: "Everyone carries Tears of the Goddess for Air Burst. Spread wide for Air Burst and Fear, kite Doomfire away from the raid, cleanse Grip of the Legion, and burn Archimonde over a long, disciplined DPS check." },
      ],
      tankNotes:
        "Tank Archimonde in place facing away. His melee is manageable — your real job is not dying to Air Burst yourself. Keep the Tear trinket keybound and use it every throw.",
      healerNotes:
        "Cleanse Grip of the Legion immediately (it ramps), keep Air Burst targets alive on the way down, and watch for Fear scattering players into Doomfire. Unstoppable Funeral Pyre (Doomfire) plus Fear is the classic wipe combo.",
      dpsNotes:
        "Use a Tear of the Goddess on every Air Burst — pressing it late means death. Stay spread, move Doomfire away from the group, and keep steady damage; Archimonde soft-enrages, so no wasted globals.",
      commonMistakes: [
        "Forgetting to use Tears of the Goddess on Air Burst and dying to fall damage.",
        "Kiting Doomfire into the raid or getting Feared into it.",
        "Letting Grip of the Legion tick unclensed.",
      ],
    },
  },

  // ---------------- Black Temple ----------------
  {
    id: "high-warlord-najentus",
    name: "High Warlord Naj'entus",
    raidId: "black-temple",
    phase: 3,
    role: "1-2 tanks, 4-5 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "The Black Temple opener, a naga warlord with a hard mechanic gate. Naj'entus periodically shields himself (Tidal Shield) and impales players on Impaling Spines — the raid must free the impaled players with the dropped spines, and use a spine to break his shield before Hurl Damage detonates.",
      phases: [
        { name: "Single phase", description: "Tank Naj'entus; when a player is impaled, someone loots the Naj'entus Spine and clicks the impaled ally to free them. When he shields, hurl a spine at him to shatter it before the raid-wide Tidal Burst goes off." },
      ],
      tankNotes:
        "Simple threat hold — face him away from the raid. Needle Spine (the AoE spine barrage) hits the whole raid, so this is more a coordination fight than a tank-damage one.",
      healerNotes:
        "Impaled players take a heavy bleed until freed — keep them up until a spine removes it. The whole raid takes Needle Spine damage on a timer; steady raid healing throughout.",
      dpsNotes:
        "Assign spine-clickers: free impaled players fast, and break Tidal Shield with a spine every time it goes up — a missed shield break wipes the raid via Tidal Burst. Otherwise burn him down.",
      commonMistakes: [
        "Not breaking Tidal Shield in time — Tidal Burst wipes the raid.",
        "Leaving impaled players unfreed to bleed out.",
      ],
    },
  },
  {
    id: "supremus",
    name: "Supremus",
    raidId: "black-temple",
    phase: 3,
    role: "2 tanks, 4-5 healers, rest dps",
    difficulty: 1,
    loot: [],
    strategy: {
      overview:
        "A two-phase abyssal that alternates between a normal tank-and-spank and a chase phase. In the fixate phase Supremus stops tanking and hunts a random player at reduced speed while Molten Flames erupt from the ground — the whole raid kites him in a wide arc.",
      phases: [
        { name: "Tank phase", description: "Tank Supremus normally; avoid the Molten Flame gouts that spawn under players. Molten Punch hits the melee." },
        { name: "Fixate phase", description: "Supremus targets a random player and slowly chases them; that player and the raid run away in a big circle while Volcanic Geysers erupt. He reverts to tanking after ~10s." },
      ],
      tankNotes:
        "In the tank phase hold threat and dodge Molten Flames. In the fixate phase you're just another runner — pick him back up the instant he reverts to tanking.",
      healerNotes:
        "Keep the fixated player alive as they kite. Damage is mostly self-inflicted (standing in fire), so a clean raid makes for an easy fight — punish is real for anyone caught by a Geyser.",
      dpsNotes:
        "Melee: mind Molten Punch and the flames. In the fixate phase everyone runs with the target and keeps DPS from range when possible. Don't crowd the chased player.",
      commonMistakes: [
        "Standing in Molten Flame / Volcanic Geyser eruptions.",
        "Crowding the fixated player so the whole group can't escape the flames.",
      ],
    },
  },
  {
    id: "shade-of-akama",
    name: "Shade of Akama",
    raidId: "black-temple",
    phase: 3,
    role: "2-3 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "An add-control fight, not a boss tank-and-spank. The Shade is channeled-immune until you clear the Ashtongue attackers rushing Akama — Channelers heal the Shade, Defenders and Rogues and Spiritbinders swarm Akama. Free Akama and he helps you finish the Shade.",
      phases: [
        { name: "Defend Akama", description: "As the Shade approaches Akama, waves of Ashtongue adds spawn. Interrupt/kill the Channelers first (they empower the Shade), tank the Defenders, and CC/kill the rest before they overwhelm Akama." },
        { name: "Kill the Shade", description: "Once the Channelers are down the Shade becomes attackable and charges — tank and burn it while Akama fights alongside you." },
      ],
      tankNotes:
        "Tanks pick up the Defenders and the Shade when it activates. The Shade moves fast toward Akama — grab it quickly. This is a crowd-control and pickup fight more than a threat one.",
      healerNotes:
        "Keep Akama and the add tanks alive through the wave. Sorcerers and Spiritbinders heal enemies — mark and kill them fast. Once the Shade is active it's a short burn.",
      dpsNotes:
        "Priority is Channelers (they buff the Shade) and enemy healers. Assign CC to the Rogues/Defenders. When the Shade activates, everyone swaps and burns it before the next wave.",
      commonMistakes: [
        "Not killing/interrupting Channelers, leaving the Shade empowered.",
        "Letting adds overrun Akama.",
      ],
    },
  },
  {
    id: "teron-gorefiend",
    name: "Teron Gorefiend",
    raidId: "black-temple",
    phase: 3,
    role: "1-2 tanks, 5 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A fight decided by an individual mechanic: Shadow of Death. Teron periodically kills a random player, who then becomes a Vengeful Spirit and must use their ghost abilities to destroy the four Constructs that spawn — if the ghosts fail, the Constructs enrage the raid. Everyone needs to know the ghost rotation.",
      phases: [
        { name: "Single phase", description: "Tank Teron and burn; each Shadow of Death turns a player into a ghost who must kill the Constructs with Spirit abilities before their timer ends and they die for real. Manage Incinerate and Crushing Shadows on the raid throughout." },
      ],
      tankNotes:
        "Standard threat and positioning; face him away for Incinerate. The tank can be a Shadow of Death target too, so a second tank should be ready to cover a ghost window.",
      healerNotes:
        "Crushing Shadows hits random players hard, and Incinerate is a frontal. The tricky part: your healers can become ghosts — coverage must survive one or two healers being out as spirits.",
      dpsNotes:
        "Learn the Vengeful Spirit rotation cold: use the ghost's abilities to kill your assigned Constructs. A player who fumbles the ghost phase both dies and lets Constructs live — the number one wipe cause here.",
      commonMistakes: [
        "Players not knowing the Vengeful Spirit abilities and failing the Constructs.",
        "Standing in front for Incinerate.",
      ],
    },
  },
  {
    id: "gurtogg-bloodboil",
    name: "Gurtogg Bloodboil",
    raidId: "black-temple",
    phase: 3,
    role: "2-3 tanks, 6 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "A tank-swap and aggro-shuffle fight. Gurtogg alternates between a normal tank phase and Fel Rage — where he fixates a random non-tank player, buffs them enormously, and beats on them while the raid heals through it. Bloodboil, an accumulating raid DoT on the farthest players, forces constant repositioning.",
      phases: [
        { name: "Tank phase", description: "Tanks hold Gurtogg; the raid manages Bloodboil (hits the five farthest players — rotate who's out) and Acidic Wound on the tank." },
        { name: "Fel Rage phase", description: "Gurtogg fixates a random player, buffing their health/damage massively and attacking only them for ~30s. Healers pour into that player; the rest keep DPS and Bloodboil rotation going." },
      ],
      tankNotes:
        "During Fel Rage the boss ignores the tank entirely — reposition and be ready to retake threat when it ends. Acidic Wound stacks a bleed on the active tank, so tank swaps keep it manageable.",
      healerNotes:
        "Fel Rage is the crux: the fixated player (often a healer or DPS) becomes the 'tank' and must be kept alive under huge incoming damage. Coordinate cooldowns per Fel Rage. Bloodboil needs a healthy positioning rotation.",
      dpsNotes:
        "Manage your distance so Bloodboil spreads across the raid rather than the same five players. Keep DPS up through Fel Rage. If you're the Fel Rage target, use personal cooldowns and trust the healers.",
      commonMistakes: [
        "Not enough healing funneled onto the Fel Rage target.",
        "Poor Bloodboil rotation stacking the DoT on too few players.",
      ],
    },
  },
  {
    id: "reliquary-of-souls",
    name: "Reliquary of Souls",
    raidId: "black-temple",
    phase: 3,
    role: "2 tanks, 5-6 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "A three-phase fight against the three Essences of the Reliquary, back to back with no break. Essence of Suffering is a threat/aura tank check, Essence of Desire punishes healing and damage with Spirit Shock and Rune Shield, and Essence of Anger is a burn against a Soul Drain enrage.",
      phases: [
        { name: "Essence of Suffering", description: "Frenzy and Aura of Suffering pressure the tank and raid; Fixate targets a random player who must run. A DPS-race-lite phase into phase two." },
        { name: "Essence of Desire", description: "Deaden (reduces healing), Spirit Shock (interrupts + damages casters/healers), and Rune Shield reflect. Rune Shield means the raid must stop DPS when it's up. The hardest phase." },
        { name: "Essence of Anger", description: "Soul Scream and Spite; a Seethe/Soul Drain soft-enrage. Pure burn — kill it before it wipes the raid." },
      ],
      tankNotes:
        "Suffering hits the tank hard under Frenzy — cooldowns and a possible swap. Desire and Anger are less about the tank and more about raid execution; hold them steady and centered.",
      healerNotes:
        "Desire is a healer's nightmare: Deaden cuts your throughput, Spirit Shock interrupts and damages you, and you must pre-position for both. There's no mana break between essences, so plan regen across all three.",
      dpsNotes:
        "In Desire, stop attacking when Rune Shield is up (it reflects). Interrupt/avoid Spirit Shock. In Anger, unload everything — it's a straight burn against the enrage.",
      commonMistakes: [
        "DPSing through Desire's Rune Shield and killing yourselves.",
        "Running out of mana before Anger because there's no break between phases.",
      ],
    },
  },
  {
    id: "mother-shahraz",
    name: "Mother Shahraz",
    raidId: "black-temple",
    phase: 3,
    role: "2 tanks, 6 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "A resistance-gear and positioning fight. Shahraz teleports random players and blasts them with Fatal Attraction if they're near each other, and hits the raid with rotating Prismatic (shadow/fire/etc.) beams. The classic strategy stacks the whole raid in one spot with shadow-resistance gear.",
      phases: [
        { name: "Single phase", description: "Tank Shahraz; the raid stacks tightly (shadow resist helps) to share the Prismatic beam damage evenly. When Fatal Attraction teleports players, they immediately spread apart to avoid the lethal proximity explosion, then restack." },
      ],
      tankNotes:
        "Tank swap on Saber Lash — it splits between the two closest players, so two tanks stand together to share it. Otherwise straightforward positioning.",
      healerNotes:
        "The Prismatic Aura beams are constant raid damage — this is a heavy, sustained raid-heal fight, eased massively by shadow-resistance gear. Fatal Attraction players take a burst if they don't spread.",
      dpsNotes:
        "Stack where assigned to distribute the beams. The instant Fatal Attraction hits you, run away from the other affected players, then return to the stack. Positioning discipline is the whole fight.",
      commonMistakes: [
        "Fatal Attraction targets not spreading and exploding on each other.",
        "Bringing no shadow resistance and out-damaging the healers with beam damage.",
      ],
    },
  },
  {
    id: "illidari-council",
    name: "Illidari Council",
    raidId: "black-temple",
    phase: 3,
    role: "3-4 tanks, 6 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "A four-boss council fight — Gathios the Shatterer, High Nethermancer Zerevor, Lady Malande, and Veras Darkshadow — that share a health pool but each bring their own kit. They must die within seconds of each other, so DPS is balanced across all four while each is tanked and controlled separately.",
      phases: [
        { name: "Single phase", description: "Tank each council member apart: Gathios (paladin — interrupt Consecration/Blessing, kill his seals), Zerevor (mage — Blizzard/Flamestrike/Arcane, needs interrupts and a Spellsteal target), Malande (priest — heals the council, interrupt Heal and dodge Reflective Shield), Veras (rogue — vanishes and Envenoms a target). Bring all four low together and finish within moments." },
      ],
      tankNotes:
        "One tank per member, kept far apart so abilities don't bleed across the raid. Gathios buffs the council — tank him where the raid can help strip/interrupt. Hold all four cleanly for a long fight.",
      healerNotes:
        "Malande heals the council and shields herself (Reflective Shield punishes DPS) — interrupt her Heals. Veras poisons a random player with Deadly Poison stacks; Zerevor's Arcane Explosion and Malande's Reflective Shield add raid damage. Steady, distributed healing across four tanks.",
      dpsNotes:
        "Balance damage so all four hit low together — a single member dropping early wipes you (they empower on death / must die near-simultaneously). Interrupt Zerevor and Malande, avoid Reflective Shield, and burn in a coordinated final push.",
      commonMistakes: [
        "Unbalanced DPS — one member dies too early.",
        "Not interrupting Malande's heals or eating Reflective Shield.",
      ],
    },
  },
  {
    id: "illidan-stormrage",
    name: "Illidan Stormrage",
    raidId: "black-temple",
    phase: 3,
    role: "3-4 tanks, 6 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The Betrayer, and the climactic fight of Phase 3. A five-phase gauntlet: tank Illidan, then survive the Flames of Azzinoth (two glaive elementals tanked by warlocks/hunters), then a demon-form phase with Shadow Demons and Flame Bursts, and a final push. Every phase has a mechanic that wipes a careless raid.",
      phases: [
        { name: "Phase 1", description: "Tank Illidan; dodge Parasitic Shadowfiend (spreads on contact — infected players spread out) and Draw Soul. Push to 65%." },
        { name: "Phase 2 — Flames of Azzinoth", description: "Illidan drops his warglaives, spawning two Flames of Azzinoth. Two ranged tanks (warlock/hunter) hold them apart, out of their Blaze trails, while the raid kills both before Illidan re-engages." },
        { name: "Phase 3", description: "Illidan returns; more Parasitic Shadowfiends and Agonizing Flames. Push to 30%." },
        { name: "Phase 4 — Demon Form", description: "Illidan transforms; Shadow Demons root and drain random players (kill them instantly), Flame Burst is raid AoE. Force him out of demon form before Demon enrage." },
        { name: "Phase 5", description: "Maiev appears; Illidan is tanked and burned to death while dodging Cage Traps and the earlier mechanics recurring." },
      ],
      tankNotes:
        "Main tank holds Illidan and faces him away (Flame Buffet / Shear on the tank — Shear must be healed or blocked). Two dedicated Flame of Azzinoth tanks (ranged) kite the elementals along the walls, never standing in Blaze. Demon form needs a tank ready for the transition.",
      healerNotes:
        "Shear hits the tank for a huge chunk — spot it and top instantly. Flames phase and demon-form Flame Burst are heavy raid damage; Parasitic Shadowfiends drain players. Long fight — manage mana across five phases.",
      dpsNotes:
        "Spread when Parasitic hits you. In the Flames phase, kill both Flames of Azzinoth roughly together before Illidan returns. In demon form, kill Shadow Demons the instant they spawn (they one-shot rooted players) and push him out of demon form. Respect every phase transition.",
      commonMistakes: [
        "Standing in Blaze or letting a Flame of Azzinoth reach its tank's melee.",
        "Not killing Shadow Demons instantly in demon form.",
        "Spreading Parasitic Shadowfiend by clumping up.",
      ],
    },
  },

  // ---------------- Zul'Aman ----------------
  {
    id: "nalorakk",
    name: "Nalorakk",
    raidId: "zulaman",
    phase: 4,
    role: "2 tanks, 3 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "The Bear Avatar and the first timed-chest boss. Nalorakk shifts between troll form (Brutal Swipe cleave, Mangle tank-swap) and bear form (Lacerating Slash bleed, Surge — a charge at a random player). Reached after a gauntlet of Amani'shi trash that pressures the timed bear-mount run.",
      phases: [
        { name: "Troll form", description: "Tank Nalorakk with the melee behind him; swap tanks on Mangle stacks and avoid Brutal Swipe cleave to the front." },
        { name: "Bear form", description: "He shifts to bear: heavy Lacerating Slash bleed on the tank and Surge, a charge that hits whoever it lands on hard. Keep the raid out of the charge path." },
      ],
      tankNotes:
        "Tank-swap on Mangle (a stacking debuff that amplifies damage taken). In bear form the Lacerating Slash bleed is brutal — swap or cooldown through it. Keep him faced away for Brutal Swipe.",
      healerNotes:
        "Bear form hits far harder than troll form — pre-heal the swaps and the bleed. Surge can spike a random player; keep the raid topped. A short but sharp tank-damage fight.",
      dpsNotes:
        "Stay behind him in troll form to dodge Brutal Swipe. Watch for Surge (the charge) and don't stand where it lands. Burn through the form shifts — the timer for the bear mounts is ticking.",
      commonMistakes: [
        "Missing the tank swap on Mangle.",
        "Standing in front for Brutal Swipe or in the path of Surge.",
      ],
    },
  },
  {
    id: "akilzon",
    name: "Akil'zon",
    raidId: "zulaman",
    phase: 4,
    role: "1-2 tanks, 3 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "The Eagle boss, a fight built around one big raid-stack mechanic. Akil'zon casts Electrical Storm — lifting a random player into a cyclone while the rest of the raid must stack tightly under them to share the storm's damage. Mishandle the stack and the raid dies.",
      phases: [
        { name: "Single phase", description: "Tank Akil'zon; manage Static Disruption (a chaining shock — stay spread normally) but on Electrical Storm the whole raid instantly stacks under the lifted player to split the AoE, then spreads again. Kill the Soaring Eagle adds." },
      ],
      tankNotes:
        "Simple threat hold. Your job during Electrical Storm is the same as everyone's — get into the stack. Pick up the Soaring Eagles if they path to the healers.",
      healerNotes:
        "Electrical Storm is the whole fight: if the raid stacks correctly the damage is survivable, if not it's a wipe. The lifted player takes damage in the cyclone — keep them alive. Static Disruption chains between close players outside the storm.",
      dpsNotes:
        "Spread for Static Disruption, but the instant Electrical Storm casts, collapse onto the marked spot under the lifted player. Kill Soaring Eagle adds fast. Precision on the stack timing is everything.",
      commonMistakes: [
        "Not stacking tightly enough on Electrical Storm — the raid takes lethal unsplit damage.",
        "Standing too close during normal phases and chaining Static Disruption.",
      ],
    },
  },
  {
    id: "janalai",
    name: "Jan'alai",
    raidId: "zulaman",
    phase: 4,
    role: "2 tanks, 3 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "The Dragonhawk boss, an add-management and bomb-dodging fight. Jan'alai hatches Dragonhawk Eggs into Hatchlings on two platforms, rains Flame Bombs across a grid the raid must sidestep, and at 35% splits into two Amani'shi Fire Casters via Enrage.",
      phases: [
        { name: "Main phase", description: "Tank Jan'alai center. Control the egg hatching — either hatch one side deliberately and AoE the Hatchlings, or race him down. Dodge Fire Bombs (they detonate in a pattern) and heal through Fireball Barrage." },
        { name: "Enrage (35%)", description: "Jan'alai summons two Hatchers and enrages; all remaining eggs hatch. Burn him while AoEing the flood of Hatchlings." },
      ],
      tankNotes:
        "Hold Jan'alai central and steady. If your strategy hatches a platform, an off-tank/AoE grabs the Hatchlings. The bombs, not his melee, are the danger — keep him where the raid has room to dodge.",
      healerNotes:
        "Fireball Barrage and the bomb detonations are the raid damage. The 35% enrage with mass hatchlings is the crunch — save cooldowns for it. Keep the Hatchling-AoE group topped.",
      dpsNotes:
        "Move off Fire Bombs before they detonate (they cover half the room in a checker pattern). AoE Hatchlings when they hatch, then back to the boss. Plan the egg strategy so you don't get overwhelmed at the 35% enrage.",
      commonMistakes: [
        "Standing on a Fire Bomb tile when it detonates.",
        "Letting too many eggs hatch at once and drowning in Hatchlings.",
      ],
    },
  },
  {
    id: "halazzi",
    name: "Halazzi",
    raidId: "zulaman",
    phase: 4,
    role: "2 tanks, 3 healers, rest dps",
    difficulty: 2,
    loot: [],
    strategy: {
      overview:
        "The Lynx boss, a split-and-burn fight. Halazzi repeatedly separates into a troll and a Lynx Spirit that must be tanked apart and brought low together; at 25% they merge permanently for a final Enrage-driven burn. Totems and a Flame Shock-like Saber Lash punctuate the fight.",
      phases: [
        { name: "Split phases", description: "Halazzi splits into the Lynx Spirit (off-tanked) and himself. Bring both to low health together; when the Lynx is defeated they rejoin. He drops a Totem (Corrupted Lightning) to kill and casts Saber Lash on the tank." },
        { name: "Merged (25%)", description: "Below 25% Halazzi stays whole and enrages — Frenzy and heavy melee. Pure burn to the finish." },
      ],
      tankNotes:
        "Two tanks: one on Halazzi, one on the Lynx Spirit during splits, kept apart. Saber Lash splits between the two closest, so stack tanks on Halazzi. The 25% Frenzy phase spikes tank damage — cooldown it.",
      healerNotes:
        "Manage the split-phase two-target healing, kill the Corrupted Lightning Totem fast (it hurts), and brace for the 25% enrage. Flame Shock / Lightning damage adds up across the phases.",
      dpsNotes:
        "Balance damage so Halazzi and the Lynx hit low together during splits. Kill totems on sight. Below 25% unload everything through the Frenzy — it's a race against his enrage.",
      commonMistakes: [
        "Unbalanced DPS in the split phase leaving one half too healthy.",
        "Ignoring the Corrupted Lightning Totem.",
      ],
    },
  },
  {
    id: "hex-lord-malacrass",
    name: "Hex Lord Malacrass",
    raidId: "zulaman",
    phase: 4,
    role: "2-3 tanks, 3-4 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "The penultimate boss, flanked by four random adds drawn from a pool of troll champions — each with its own class kit, so the fight changes every attempt. Malacrass himself Drains Power (a huge self-buff over time) and steals a random raid member's abilities, making him a soft-enrage you must beat before his stolen spells and stacking buff overwhelm you.",
      phases: [
        { name: "Adds phase", description: "Malacrass spawns with four of his eight possible add companions (healer, mage, rogue, hunter, etc.). CC and kill the adds by priority — enemy healers first — while off-tanks hold them apart from the boss." },
        { name: "Malacrass burn", description: "With adds down, focus Malacrass. He casts the spells of whichever classes he stole from and Drains Power stacks a growing damage buff — burn him before it snowballs." },
      ],
      tankNotes:
        "One tank on Malacrass, off-tanks on the adds kept separated. Which adds spawn changes the tank/CC assignments every pull — adapt the marking each attempt. Drain Power makes his melee scarier over time.",
      healerNotes:
        "The add composition dictates the healing — an enemy healer or caster set is far harder than melee adds. Malacrass mirrors a raid member's abilities and Drains Power into a soft enrage; cooldowns for the late burn.",
      dpsNotes:
        "Kill the adds by priority (heals/casters first), respecting CC. Then tunnel Malacrass and beat the Drain Power stacks. Because the adds are randomized, keep flexible kill-order and CC plans.",
      commonMistakes: [
        "Not adapting CC/kill order to the randomized add set.",
        "Dragging the fight out until Drain Power stacks too high.",
      ],
    },
  },
  {
    id: "zuljin",
    name: "Zul'jin",
    raidId: "zulaman",
    phase: 4,
    role: "2 tanks, 3-4 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "The Zul'Aman endboss, a five-phase fight where Zul'jin takes on the aspect of each animal god you've fought. After a troll phase he cycles through Bear, Eagle, Lynx, and Dragonhawk forms, each with a distinct mechanic — a checklist of everything the raid learned, back to back.",
      phases: [
        { name: "Troll phase", description: "Grievous Throw (a bleed that must be healed to full to remove) and Whirlwind. Push to trigger the first transformation." },
        { name: "Bear (Lynx?) phases", description: "Bear: Creeping Paralysis and Overpower on the tank. Eagle: a spinning Zap and a Cyclone that pushes players around a claustrophobic room. Lynx: Claw Rage — a berserk on a random player the tank must peel. Dragonhawk: Flame Whirl and Flame Breath, with Pillars of Fire erupting under the raid." },
        { name: "Final", description: "The last aspect ends in a burn as his abilities overlap — survive the accumulating mechanics and finish him." },
      ],
      tankNotes:
        "Grievous Throw (troll) must be healed off before it kills. Bear's Overpower and Lynx's Claw Rage demand tank attention and peels. Reposition each phase — the Dragonhawk's Pillars of Fire and Eagle's Cyclone reshape the room.",
      healerNotes:
        "Grievous Throw won't stop bleeding until the target is healed to full — prioritize it. Each aspect adds a new raid-damage source (Flame breath, Zap, Pillars). Long, escalating fight — pace mana across all phases.",
      dpsNotes:
        "Dodge the phase-specific hazards: Cyclone (Eagle), Pillars of Fire (Dragonhawk), and Claw Rage's target (Lynx). Keep steady damage through every transformation and push him through the aspects before the mechanics pile up.",
      commonMistakes: [
        "Not healing Grievous Throw to full and letting it bleed a player out.",
        "Standing in Pillars of Fire or getting shoved by Cyclone into the raid.",
      ],
    },
  },

  // ---------------- Sunwell Plateau ----------------
  {
    id: "kalecgos",
    name: "Kalecgos",
    raidId: "sunwell-plateau",
    phase: 5,
    role: "3 tanks, 5-6 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "The Sunwell opener, a two-realm fight. The blue dragon Kalecgos is corrupted by the demon Sathrovarr; the raid splits between the physical room (fighting Kalecgos's body) and the Spectral Realm (fighting Sathrovarr), teleporting between them via the Spectral Blast debuff. Both must die close together.",
      phases: [
        { name: "Two realms", description: "Most of the raid DPS Kalecgos's dragon body in the real room, avoiding Arcane Buffet and the wing-buffet knockback. Players hit by Spectral Blast phase into the Spectral Realm to fight Sathrovarr, who heals off Kalecgos — the two bosses share a corruption link, so balance their health." },
      ],
      tankNotes:
        "One tank on Kalecgos in the real room, one (or a rotation) on Sathrovarr in the Spectral Realm, plus coverage for Kalec's dragon form in the realm. Position Kalecgos so the tail/wing buffet doesn't fling the raid off. Curse of Boundless Agony forces players into the realm on a timer.",
      healerNotes:
        "Split healing across both realms — the Spectral Realm group can't be reached from outside, so healers must be phased in on both sides. Arcane Buffet ramps raid damage the longer Kalec lives; keep both tank groups covered.",
      dpsNotes:
        "Balance damage so Kalecgos and Sathrovarr die within seconds of each other (Sathrovarr heals Kalec via Corrupting Strike). When Spectral Blast phases you, kill Sathrovarr in the realm, then return. Don't over-DPS one side.",
      commonMistakes: [
        "Killing one boss too far ahead of the other — the survivor heals back up.",
        "No healer phased into the Spectral Realm to cover that group.",
      ],
    },
  },
  {
    id: "brutallus",
    name: "Brutallus",
    raidId: "sunwell-plateau",
    phase: 5,
    role: "2 tanks, 5-6 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "A pure DPS-and-healing gear check with almost no movement — the definitive Sunwell 'do you out-gear the enrage' wall. Brutallus applies Burn, a spreading fire debuff, and Meteor Slash, a frontal that splits among those in front and stacks a debuff amplifying further Meteor Slash damage. Beat his hard enrage timer or wipe.",
      phases: [
        { name: "Single phase", description: "Tank-swap Brutallus on Meteor Slash stacks. Melee stack behind for cleave healing; anyone who gets Burn runs out and passes it to a clean player, then rejoins. Burn him down before the ~6-minute enrage." },
      ],
      tankNotes:
        "Two tanks swap on Meteor Slash — its stacking debuff makes each subsequent hit worse, so alternate who eats it. Stampeding Roar and heavy melee mean the tank takes serious punishment; keep both tanks topped.",
      healerNotes:
        "This is the healing check of Sunwell. Meteor Slash splits among the front group (stack them to share it), Burn is constant spreading damage, and tank damage is relentless. Every healer at full uptime and mana efficiency — there is no downtime.",
      dpsNotes:
        "It's an enrage race — maximum uptime, Bloodlust/Heroism on cooldown or a planned window, no wasted globals. When you take Burn, step out and pass it to someone clean immediately, then get back on the boss. Positioning is simple; the DPS bar is the whole fight.",
      commonMistakes: [
        "Spreading Burn poorly and multiplying the healing load.",
        "Missing the Meteor Slash tank swap and spiking a tank dead.",
        "Simply not enough DPS to beat the enrage.",
      ],
    },
  },
  {
    id: "felmyst",
    name: "Felmyst",
    raidId: "sunwell-plateau",
    phase: 5,
    role: "2 tanks, 5-6 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "The dragon that rises from Brutallus's corpse. A ground-and-air fight: on the ground Felmyst breathes Gas Clouds and casts Corrosion and Encapsulate; in the air she strafes the room with a deadly Fog of Corruption breath that mind-controls anyone it touches, forcing the raid to run a precise path to dodge it.",
      phases: [
        { name: "Ground phase", description: "Tank Felmyst; face her away for the Gas Nova / Corrosion (a tank armor-shred). Encapsulate traps a random player in a bubble the raid must kill them out of — quickly, without cleaving the trapped ally." },
        { name: "Air phase", description: "Felmyst takes off and sweeps a Fog of Corruption breath across the room. Anyone the fog touches is mind-controlled (Demonic Vapor). The raid runs a rehearsed route to stay ahead of the breath until she lands." },
      ],
      tankNotes:
        "Corrosion shreds tank armor — swap or cooldown as it stacks. Reposition Felmyst so her breath and Gas Clouds don't corner the raid. The air phase is a raid-movement mechanic; just survive and re-establish threat on landing.",
      healerNotes:
        "Encapsulate and Corrosion pressure individuals and the tank; the air-phase breath will MC anyone caught, so healing the aftermath (and surviving misdodges) matters. Heal-through the Gas Cloud damage on the ground.",
      dpsNotes:
        "Kill Encapsulated players out of the bubble fast but don't cleave them to death. In the air phase, follow the assigned route exactly — one player touched by the Fog of Corruption becomes an MC'd threat. Dodge Gas Clouds on the ground.",
      commonMistakes: [
        "Getting clipped by the Fog of Corruption breath and being mind-controlled.",
        "Mishandling Encapsulate — either not freeing the player or cleaving them down.",
      ],
    },
  },
  {
    id: "eredar-twins",
    name: "Eredar Twins",
    raidId: "sunwell-plateau",
    phase: 5,
    role: "2-3 tanks, 6 healers, rest dps",
    difficulty: 3,
    loot: [],
    strategy: {
      overview:
        "Lady Sacrolash and Grand Warlock Alythess — a shared-health-pool council fight of shadow and fire. The two sisters must die within ~15 seconds of each other or the survivor casts Dark Touched / Flame Touched empowerment. The raid juggles their opposing shadow and fire mechanics simultaneously.",
      phases: [
        { name: "Single phase", description: "Tank Alythess (fire — Blaze under the tank, Conflagration, Flame Sear on the raid) and Sacrolash (shadow — Shadow Nova, Confounding Blow, Shadowfury) apart. Manage Shadow/Flame Touched debuffs (they amplify damage from the opposite school) and bring both twins low together for a simultaneous kill." },
      ],
      tankNotes:
        "One tank per twin, separated. Alythess's Blaze pools fire under her tank — reposition constantly. Confounding Blow can daze Sacrolash's tank; have coverage. Two-tank the twins and keep them apart so their auras don't stack on the raid.",
      healerNotes:
        "Flame Sear and Shadow Nova are constant, opposing raid AoE; the Touched debuffs mean a shadow-hit player takes extra fire damage and vice versa — a nasty compounding heal check. Pyrogenics and Conflagration add spikes. Heavy, sustained raid healing.",
      dpsNotes:
        "Balance DPS so both twins hit low together — kill them within the ~15s window or the survivor empowers. Watch your Shadow/Flame Touched debuff and avoid the opposite-school damage while it's up. Dodge Blaze and Shadow Nova.",
      commonMistakes: [
        "Killing one twin too early and letting the other empower.",
        "Ignoring the Touched debuffs and eating amplified opposite-school damage.",
      ],
    },
  },
  {
    id: "muru",
    name: "M'uru",
    raidId: "sunwell-plateau",
    phase: 5,
    role: "3-4 tanks, 6-7 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The infamous Sunwell add fight, widely considered the hardest encounter in TBC before nerfs. Phase one is a relentless add-management gauntlet — Void Sentinels, Shadowsword adds, and Dark Fiends pour out while M'uru pulses Negative Energy — and phase two is a burn against Entropius amid Black Holes and Darkness.",
      phases: [
        { name: "Phase 1 — M'uru", description: "M'uru is tanked over the center pumping Negative Energy into the raid. Constant adds: Void Sentinels (off-tanked), Shadowsword Berserkers/Fury Mages/Marshals (tanked and CC'd), and Dark Fiends that must be killed with an ability (not just damaged) before they reach and drain the healers." },
        { name: "Phase 2 — Entropius", description: "At the transition M'uru becomes Entropius. Burn him while dodging Darkness (void zones) and the Black Holes that pull and damage — the DPS payoff after surviving the add storm." },
      ],
      tankNotes:
        "A tank ballet: main tank on M'uru/Entropius, off-tanks on rotating Void Sentinels and the Shadowsword humanoids, kept apart and controlled. Positioning M'uru centrally lets the raid reach every add spawn. Phase two demands quick pickup of Entropius amid the void zones.",
      healerNotes:
        "The add pressure is really a healing test — Negative Energy is constant raid drain, Dark Fiends silence/drain healers if they reach the back, and the Berserkers hit hard. Assign Dark Fiend killers near the healers. Phase two adds Darkness damage on top.",
      dpsNotes:
        "Ruthless target priority: interrupt Fury Mages, kill Dark Fiends with an ability before they reach healers, burn Void Sentinels on the off-tanks, and respect CC on the Shadowswords — all while chipping M'uru. In phase two, dodge Black Holes/Darkness and unload on Entropius.",
      commonMistakes: [
        "Letting Dark Fiends reach and drain the healers.",
        "Losing control of the Shadowsword adds or a Void Sentinel.",
        "Standing in Black Holes / Darkness in phase two.",
      ],
    },
  },
  {
    id: "kiljaeden",
    name: "Kil'jaeden",
    raidId: "sunwell-plateau",
    phase: 5,
    role: "2-3 tanks, 7 healers, rest dps",
    difficulty: 3,
    hasDiagram: true,
    loot: [],
    strategy: {
      overview:
        "The Deceiver himself — the final boss of The Burning Crusade. A long, four-phase platform fight assisted by Kalecgos and the blood elf Anveena. The raid dodges Shield Orbs, Fire Blooms, and Flame Darts, uses Orbs of the Blue Flight to fly during Darkness of a Thousand Souls, and survives Armageddon while burning KJ down.",
      phases: [
        { name: "Phase 1-2", description: "Kil'jaeden rises partway. Dodge Shield Orbs (they patrol and blast), spread for Fire Bloom (a spreading burn), and avoid Soul Flay on the tank. Kalecgos empowers the raid via Anveena as phases progress." },
        { name: "Phase 3 — Darkness", description: "Darkness of a Thousand Souls is a channeled raid-wide nuke — grab an Orb of the Blue Flight to fly into the air and out of range, or die. Sinister Reflections (mirror-image adds) spawn and must be killed." },
        { name: "Phase 4 — Armageddon", description: "Kil'jaeden fully emerges and rains Armageddon meteors across the platform, marked by targeting circles the raid must vacate. Final burn while surviving overlapping mechanics and the meteor storm." },
      ],
      tankNotes:
        "Tank Kil'jaeden at the platform edge, faced out; Soul Flay and his melee pressure the tank between mechanics. Sinister Reflections need pickup. The real challenge is the tank surviving the same Orbs/Fire/Armageddon everyone dodges while holding threat.",
      healerNotes:
        "Every phase layers raid damage: Fire Bloom, Flame Dart, Shield Orb blasts, and the Darkness nuke (mitigated by flying on an Orb). Armageddon meteors punish anyone slow to move. A seven-healer marathon — mana and cooldown discipline across a very long fight.",
      dpsNotes:
        "Dodge Shield Orbs, spread for Fire Bloom, and in phase three grab an Orb of the Blue Flight to fly out of Darkness of a Thousand Souls. Kill Sinister Reflections, clear Armageddon circles instantly, and keep steady damage — KJ soft-enrages, so the burn must be efficient across all four phases.",
      commonMistakes: [
        "Not grabbing a Blue Flight Orb and dying to Darkness of a Thousand Souls.",
        "Standing in an Armageddon meteor circle.",
        "Getting caught by a Shield Orb blast or clumping for Fire Bloom.",
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

// Real boss "portrait" banners (128×64 webp, in /public/images/bosses).
// Most bosses have one; the few that don't fall back to bossIcon(). Kept
// as an explicit set so the value is known without a filesystem read.
const BOSS_IMAGES = new Set<string>([
  "akilzon", "alar", "anetheron", "archimonde", "attumen-the-huntsman",
  "azgalor", "brutallus", "eredar-twins", "fathom-lord-karathress",
  "felmyst", "gruul-the-dragonkiller", "gurtogg-bloodboil", "halazzi",
  "hex-lord-malacrass", "high-astromancer-solarian", "high-king-maulgar",
  "high-warlord-najentus", "hydross-the-unstable", "illidan-stormrage",
  "janalai", "kaelthas-sunstrider", "kalecgos", "kazrogal", "kiljaeden",
  "lady-vashj", "leotheras-the-blind", "magtheridon", "maiden-of-virtue",
  "moroes", "morogrim-tidewalker", "mother-shahraz", "muru", "nalorakk",
  "netherspite", "prince-malchezaar", "rage-winterchill", "shade-of-akama",
  "shade-of-aran", "supremus", "terestian-illhoof", "teron-gorefiend",
  "the-curator", "the-lurker-below", "void-reaver", "zuljin",
]);

/** Local boss portrait banner if we have one, else null (use bossIcon). */
export function bossImage(bossId: string): string | null {
  return BOSS_IMAGES.has(bossId) ? `/images/bosses/${bossId}.webp` : null;
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
