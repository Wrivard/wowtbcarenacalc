// Hand-written editorial layer for the generated PvP BiS pages —
// spec-specific playstyle blurbs, stat priorities and rationales.
// Keyed by "<classSlug>/<specSlug>". This is the anti-thin-content
// layer: every sentence here is written per spec, never templated.

export const EDITORIAL = {
  "warrior/arms": {
    statPriority: ["Resilience", "Stamina", "Attack Power", "Crit Rating", "Hit Rating"],
    rationale:
      "Arms lives inside melee range of everything that wants it dead, so resilience and stamina come before raw damage — a dead warrior deals zero Mortal Strikes. Once you can survive a focus swap, attack power scales your MS/Slam pressure and crit feeds Flurry uptime.",
    blurb:
      "Arms Warrior is the backbone of TBC's most oppressive melee cleaves — Mortal Strike's 50% healing cut is the single strongest debuff in arena, and every healer comp has to answer it. You are the kill target as often as the kill driver, which is why the highest-rated warriors stack PvP set pieces and resilience instead of raid weapons alone. Expect to play with a healer glued to you and win by making the enemy healer's life impossible.",
  },
  "warrior/fury": {
    statPriority: ["Resilience", "Stamina", "Attack Power", "Crit Rating", "Hit Rating"],
    rationale:
      "Fury gives up Mortal Strike's healing debuff for raw output, so the gear has to keep you alive long enough for Rampage windows to matter — resilience first, then attack power to make those windows lethal.",
    blurb:
      "Fury in arena is a niche bruiser pick — you trade the Mortal Strike debuff for dual-wield burst and Rampage sustain. The players making it work at rating run heavy PvP armor and treat it like a stat-check: survive the opener, then out-pressure teams that expected an Arms target dummy.",
  },
  "warrior/protection": {
    statPriority: ["Resilience", "Stamina", "Shield Block Value", "Attack Power"],
    rationale:
      "Protection's value is unkillable disruption, so the list leans almost entirely defensive — the damage was never the point; the endless stuns, silences and intervene peels are.",
    blurb:
      "Protection Warrior is TBC arena's most annoying babysitter — Devastate pressure is minimal, but Concussion Blow, Shield Bash, Spell Reflection and Intervene turn you into a walking peel machine for drain comps. The few protection warriors on the ladder gear almost pure survivability and win through attrition.",
  },
  "paladin/holy": {
    statPriority: ["Resilience", "Bonus Healing", "Intellect", "Stamina", "MP5"],
    rationale:
      "Holy Paladins are the game's most mana-efficient healers but the easiest to train — resilience and stamina keep you standing through rogue/warrior tunnel vision, and Illumination makes intellect worth more than raw MP5.",
    blurb:
      "Holy Paladin brings the biggest single-target heals and Blessing of Protection to arena, at the cost of zero mobility — you will be trained by melee every game, and your gear has to assume it. Top-rated holy paladins run the full Gladiator set with resilience gems long before eking out extra +healing, because a paladin who survives the swap simply doesn't run out of mana.",
  },
  "paladin/retribution": {
    statPriority: ["Resilience", "Stamina", "Attack Power", "Crit Rating", "Spell Damage"],
    rationale:
      "Ret burst arrives in short judgement windows, so the priority is surviving between them — resilience and stamina first, then attack power and crit to make each window count double.",
    blurb:
      "Retribution is TBC's glass-cannon support melee: absurd burst during a Judgement + Crusader Strike window, real utility from blessings and Hammer of Justice, and a tendency to fold when focused. The retail meta answer is heavy PvP gear — the ladder data shows rets stacking resilience to buy the seconds their burst needs.",
  },
  "hunter/beast-mastery": {
    statPriority: ["Resilience", "Attack Power", "Stamina", "Agility", "Intellect"],
    rationale:
      "Beast Mastery's damage rides on the pet and auto-shot scaling, so attack power converts directly into pressure — but hunters are the classic first target of melee cleaves, so resilience still leads.",
    blurb:
      "Beast Mastery brings The Beast Within — 18 seconds of CC immunity on a class the enemy wants to chain-CC — and the best sustained pet pressure in the bracket. Arena BM hunters gear more defensively than their battleground cousins: dead-zone abuse only works if you live long enough to kite into it.",
  },
  "hunter/marksmanship": {
    statPriority: ["Resilience", "Attack Power", "Agility", "Stamina", "Crit Rating"],
    rationale:
      "Marksmanship trades pet safety for Aimed Shot's healing debuff and Silencing Shot — burst-window stats (AP, agility, crit) rank higher than for BM, but resilience still anchors the list.",
    blurb:
      "Marksmanship is the control hunter: Silencing Shot interrupts, Aimed Shot cuts healing, and scatter-trap chains set up kills for your partner. It demands more positioning discipline than BM and rewards it with the most spammable utility kit a physical DPS has in TBC arena.",
  },
  "hunter/survival": {
    statPriority: ["Resilience", "Agility", "Stamina", "Attack Power", "Crit Rating"],
    rationale:
      "Survival scales agility harder than the other trees thanks to Lightning Reflexes and Expose Weakness — which also buffs your whole team's physical damage, so agility jumps ahead of raw AP here.",
    blurb:
      "Survival Hunter is the team-player tree: Expose Weakness turns your agility into your warrior's attack power, Wyvern Sting adds a second CC school, and Readiness doubles your trap count. It shines in physical cleaves where the aura effect multiplies across two DPS.",
  },
  "rogue/subtlety": {
    statPriority: ["Resilience", "Agility", "Stamina", "Attack Power", "Hit Rating"],
    rationale:
      "Subtlety wins with openers and restealths, not sustained damage — agility feeds crit for Cheap Shot ambushes while resilience and stamina let you survive being the squishiest melee in the game once the opener ends.",
    blurb:
      "Subtlety is the defining rogue spec of TBC arena — Shadowstep, Preparation and Cheat Death make it the best opener-and-reset spec in the game. The ladder's most-played spec by a wide margin, it wins through control chains (Cheap Shot → Kidney → Blind) rather than raw damage, and its gear list mixes PvP set pieces with surprising PvE engineering goggles for the opener burst.",
  },
  "rogue/combat": {
    statPriority: ["Resilience", "Stamina", "Attack Power", "Agility", "Hit Rating"],
    rationale:
      "Combat gives up Shadowstep mobility for consistent white damage, so it gears tankier than Subtlety — you are committing to extended melee uptime, and resilience plus stamina is what makes that commitment survivable.",
    blurb:
      "Combat Rogue trades Subtlety's tricks for relentless sustained pressure — Adrenaline Rush and Blade Flurry turn any extended swap into a losing race for the enemy healer. It plays like a second warrior: park on a target, force cooldowns, and grind teams down in 2s dampening games.",
  },
  "priest/discipline": {
    statPriority: ["Resilience", "Bonus Healing", "Stamina", "Intellect", "MP5"],
    rationale:
      "Discipline is the premier 2v2 and 3v3 healer because Pain Suppression and Power Infusion swing entire games — the gear just has to keep you alive and mana-positive through dispel wars, hence resilience and stamina over throughput.",
    blurb:
      "Discipline Priest is the arena healer archetype in TBC: Pain Suppression negates kill windows, Mass Dispel eats Blessing of Protection, and mana burn wins every long game. Top discipline priests gear almost identically — full Mooncloth PvP set, resilience everywhere — because the spec's power is in its buttons, not its numbers.",
  },
  "priest/holy": {
    statPriority: ["Resilience", "Bonus Healing", "Stamina", "Intellect", "MP5"],
    rationale:
      "Holy trades Discipline's defensive cooldowns for bigger raw heals, which means you personally are the weak point — the ladder's holy priests gear even more defensively than disc to compensate for the missing Pain Suppression.",
    blurb:
      "Holy Priest in arena is the throughput gamble: Circle of Healing-era output with none of Discipline's panic buttons. It appears mostly in 5v5, where raw healing per second matters more and a Power Word: Shield rotation across five targets keeps trainable weaknesses hidden.",
  },
  "priest/shadow": {
    statPriority: ["Resilience", "Stamina", "Shadow Damage", "Spell Penetration", "Spell Hit"],
    rationale:
      "Shadow's pressure is dot-based and constant, so spell damage beats crit — but every rogue and warrior queues into you as the free kill, which is why the ladder's shadow priests run more stamina and resilience than any other caster.",
    blurb:
      "Shadow Priest is TBC arena's drain machine: Vampiric Touch mana pressure, Vampiric Embrace healing, Silence and Psychic Scream on rotation. You win by making the game longer while your dots make it shorter for them — and you gear like a tank because everyone knows killing the shadow priest first is the counterplay.",
  },
  "shaman/elemental": {
    statPriority: ["Resilience", "Spell Damage", "Stamina", "Crit Rating", "Spell Penetration"],
    rationale:
      "Elemental burst is front-loaded into Chain Lightning + Lava Burst-less windstorms of Nature damage, so spell damage and crit define your kill windows; spell penetration matters more than usual because Nature resistance totems and paladin auras eat your school.",
    blurb:
      "Elemental Shaman is the burst caster with a toolkit: Wind Shear-era earth shocks, Grounding Totem to eat polymorphs, and instant Chain Lightning procs that delete resilience-light targets. It gears like every caster in TBC — PvP set plus resilience — but leans harder on spell penetration to punch through totem and aura resistance.",
  },
  "shaman/enhancement": {
    statPriority: ["Resilience", "Stamina", "Attack Power", "Agility", "Intellect"],
    rationale:
      "Enhancement's windfury rolls are the biggest RNG burst in the game — the gear's job is to keep you alive long enough to fish for them, so survivability leads and attack power sharpens the payoff.",
    blurb:
      "Enhancement Shaman is arena's lottery melee: one double-Windfury proc can end a game on the spot. Between procs you bring the full totem toolkit — Grounding, Tremor, Earthbind — and shocks for interrupts. Ladder enhancement shamans gear defensively because everyone kites them, and the windfury math works fine off PvP weapons.",
  },
  "shaman/restoration": {
    statPriority: ["Resilience", "Bonus Healing", "Stamina", "Intellect", "MP5"],
    rationale:
      "Resilience comes first because a dead shaman heals nobody — 300+ resil forces enemy teams off you and makes interrupt fishing their only win condition. Bonus healing is your throughput stat and scales every Healing Wave and Chain Heal; stamina is deceptively valuable when you are the kill target.",
    blurb:
      "Restoration Shaman is the premier 5v5 healer of TBC arena and a staple of drain comps, built around Earth Shield uptime, Nature's Swiftness clutch heals, and totem control — Grounding and Tremor win games on their own. The list below reflects what gladiator-range resto shamans actually equip: the PvP set with honor offset pieces, resilience-first, mana problems solved by gear rather than playstyle.",
  },
  "mage/arcane": {
    statPriority: ["Resilience", "Stamina", "Spell Damage", "Spell Penetration", "Intellect"],
    rationale:
      "Arcane's Presence of Mind + Arcane Blast burst needs no crit fishing, so the gear goes to surviving the counter-pressure — mage armor and 300 resilience is what lets you keep casting through a rogue on your back.",
    blurb:
      "Arcane Mage is the control-burst hybrid: POM-Pyro-style instant pressure with better mana economy and Improved Counterspell lockdowns. In arena it lives and dies by positioning — the ladder's arcane mages run heavy stamina builds because their burst windows only matter if they survive to reach them.",
  },
  "mage/frost": {
    statPriority: ["Resilience", "Stamina", "Spell Damage", "Spell Penetration", "Intellect"],
    rationale:
      "Frost is the control tree — Shatter combos provide the kill windows regardless of gear, so the list stacks survivability and spell penetration to make sure Frostbolts land through resistance while you outlast the other team's cooldowns.",
    blurb:
      "Frost Mage is TBC arena's puppet master: Water Elemental Freeze into Shatter, Ice Block to reset swaps, Cold Snap to do it twice. Every comp with a mage wants frost for the control, not the damage — which is exactly why the gear list is stamina and resilience first, damage second.",
  },
  "warlock/affliction": {
    statPriority: ["Resilience", "Stamina", "Spell Damage", "Spell Penetration", "Spell Hit"],
    rationale:
      "Affliction pressure is inevitable rather than bursty, so the entire gear plan is outlasting the enemy's attempts to delete you — TBC warlocks famously stack stamina above all, and the arena data confirms it: SL/SL survivability turns every game into a timer you win.",
    blurb:
      "Affliction (SL/SL) Warlock is the most notorious attrition spec in TBC arena — Siphon Life and Soul Link make you nearly unkillable while dots and Unstable Affliction dismantle healers' mana and patience. You don't have a burst window; you ARE the win condition, one tick at a time.",
  },
  "warlock/demonology": {
    statPriority: ["Resilience", "Stamina", "Spell Damage", "Spell Penetration", "Intellect"],
    rationale:
      "Demonology in arena is Soul Link first and foremost — the felguard soaks damage, you soak the rest, and stamina multiplies the value of every heal your partner lands on you.",
    blurb:
      "Demonology Warlock rides the Felguard: Intercept stuns on demand, Soul Link damage splitting, and enough sustained shadow pressure to matter. It is the bridge between SL/SL's tankiness and Destruction's threat, and its ladder gear list looks like affliction's for a reason — stamina wins warlock games.",
  },
  "warlock/destruction": {
    statPriority: ["Resilience", "Spell Damage", "Stamina", "Crit Rating", "Spell Penetration"],
    rationale:
      "Destruction actually kills people in a window, so it is the one warlock tree where spell damage and crit rank above pure stamina stacking — Shadowfury into Chaos Bolt-era Conflagrate burst rewards throughput.",
    blurb:
      "Destruction is the warlock spec for players who want kill windows instead of attrition: Shadowfury AoE stuns, Backlash instants and Conflagrate burst that resilience barely dents. It gives up SL/SL's immortality, so it appears mostly alongside a dedicated peeling partner.",
  },
  "druid/balance": {
    statPriority: ["Resilience", "Stamina", "Spell Damage", "Spell Penetration", "Intellect"],
    rationale:
      "Balance burst comes from Starfire crits enabled by Nature's Grace, but the spec's real arena value is the hybrid toolkit — the gear stacks survivability so you can keep weaving Cyclones and off-heals between damage windows.",
    blurb:
      "Balance Druid is arena's hybrid wildcard: Cyclone (the game's only undispellable CC), Moonkin armor, instant roots and real off-heals. The boomkins on the ladder win with control and utility, using Starfire burst opportunistically — and their gear list reads like a caster tank's.",
  },
  "druid/feral-cat": {
    statPriority: ["Resilience", "Agility", "Stamina", "Attack Power", "Crit Rating"],
    rationale:
      "Feral gears agility because it double-dips — dodge and crit in cat, armor and threat in bear — and the freedom to flip into bear form is the spec's whole survival plan, making raw stamina slightly less critical than for other melee.",
    blurb:
      "Feral Druid is TBC arena's shapeshifting problem: cat burst with Pounce openers, instant bear form to soak swaps, travel form to kite, and Cyclone whenever you shift out. No other melee can choose to become a tank mid-game — the ladder ferals lean on that flexibility and gear agility to serve both forms.",
  },
  "druid/restoration": {
    statPriority: ["Resilience", "Bonus Healing", "Stamina", "Intellect", "Spirit"],
    rationale:
      "Resto Druid healing is HoT-based and keeps working while you run, which makes you the hardest healer to shut down — the gear leans resilience and stamina because Cyclone and mobility, not throughput, are what win your games.",
    blurb:
      "Restoration Druid is the rating king of TBC 2v2 — Lifebloom stacks tick while you pillar-kite melee forever, and Cyclone turns every dead moment into offense. The playstyle is unique: pre-HoT, run, Cyclone, repeat. Gear-wise the ladder is unambiguous: PvP set, resilience everywhere, and the game becomes literally unlosable against certain comps.",
  },
};
