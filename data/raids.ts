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
