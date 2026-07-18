// Hand-written editorial layer for the generated PvE BiS pages —
// per-spec raid playstyle blurbs, stat priorities and rationales.
// Phase-specific numbers come from the dataset; these words are ours
// and unique per spec (anti-thin-content).

export const PVE_EDITORIAL = {
  "warrior/arms": {
    statPriority: ["Hit Rating (9%)", "Expertise", "Strength", "Crit Rating", "Armor Penetration"],
    rationale:
      "Arms in raids is a support DPS built around keeping Blood Frenzy's 4% physical damage buff active — you cap hit and expertise first because a dodged Mortal Strike is a rage crisis, then stack strength for slam-weave throughput.",
    blurb:
      "Arms Warrior earns its raid spot with Blood Frenzy — a flat 4% physical damage buff for every melee in the group — while slam-weaving between swings for respectable personal numbers. The gear plan chases 2.2%+ weapon-speed two-handers and hit/expertise caps before raw strength.",
  },
  "warrior/fury": {
    statPriority: ["Hit Rating", "Expertise", "Strength", "Crit Rating", "Agility"],
    rationale:
      "Dual-wield fury eats a 24% miss penalty on white swings, so hit rating is worth more to you than to any other melee until deep into the list; after caps, strength and crit feed Flurry and Rampage uptime.",
    blurb:
      "Fury Warrior is TBC's premier melee raid DPS once gear arrives: Whirlwind and Bloodthirst on cooldown, Rampage rolling, heroic-strike rage dumping. The spec scales violently with gear — every phase list below is a meaningful step, and slow off-hands matter almost as much as your main hand.",
  },
  "warrior/protection": {
    statPriority: ["Defense (490)", "Shield Block Value", "Stamina", "Hit Rating", "Expertise"],
    rationale:
      "Uncrittable at 490 defense is non-negotiable; after that, shield block value doubles as threat (Shield Slam) and mitigation, which is why prot warriors gear block value where druids would stack armor.",
    blurb:
      "Protection Warrior is the classic main tank: Shield Slam and Devastate threat, Shield Block smoothing crushes, the full toolkit of last stands and shield walls. The list prioritizes the defense cap, then converts shield block value into both threat and survival at once.",
  },
  "paladin/holy": {
    statPriority: ["Bonus Healing", "Intellect", "Crit Rating", "MP5", "Haste"],
    rationale:
      "Illumination refunds mana on crits, making crit rating a regen stat — holy paladins uniquely value it alongside intellect, and raw +healing scales the Holy Light bombs that define the role.",
    blurb:
      "Holy Paladin is the tank-healing anchor of TBC raids: massive, mana-efficient Holy Lights aimed at one target while beacon-less single-target triage decides progression pulls. Gear is +healing and crit first — Illumination turns every crit into free mana.",
  },
  "paladin/protection": {
    statPriority: ["Defense (490)", "Stamina", "Spell Damage", "Shield Block", "Intellect"],
    rationale:
      "Prot paladin threat is spell-damage-driven (Consecration, Holy Shield), so after the defense cap you gear a caster stat no other tank wants — which is exactly why AoE packs and heroics belong to you.",
    blurb:
      "Protection Paladin is the AoE tank TBC dungeons were built for: Consecration and Holy Shield generate unmatched multi-target threat, and mana returns from Spiritual Attunement keep the engine running. Uncrittable first, stamina second, then spell damage — the stat line that confuses every armory inspection.",
  },
  "paladin/retribution": {
    statPriority: ["Hit Rating", "Expertise", "Strength", "Crit Rating", "Attack Power"],
    rationale:
      "Ret brings Improved Sanctity Aura and windfury-buffed seal twisting — hit and expertise caps protect the twist windows, and strength scales both your seals and the raid buffs you exist to provide.",
    blurb:
      "Retribution Paladin in raids lives on seal twisting — weaving Seal of Command and Blood procs inside a single swing timer — while Sanctity Aura buffs the whole melee group. It is one of TBC's highest-skill-cap rotations, and the gear list rewards it with real scaling.",
  },
  "hunter/beast-mastery": {
    statPriority: ["Hit Rating", "Agility", "Attack Power", "Crit Rating", "Intellect"],
    rationale:
      "BM's damage splits with the pet, but your auto-shot rotation still wants the 9% hit cap first; after that agility outscales raw AP through crit and Expose Weakness synergy in a typical raid comp.",
    blurb:
      "Beast Mastery is the top hunter raid spec of TBC — Serpent's Swiftness haste feeds a relentless auto-shot/steady-shot rotation while the pet contributes a third of your damage. The 1:1.5 macro rhythm is the skill test; the gear below is what the best parsers actually wear doing it.",
  },
  "hunter/marksmanship": {
    statPriority: ["Hit Rating", "Agility", "Attack Power", "Crit Rating", "Intellect"],
    rationale:
      "Marksmanship trades pet damage for Trueshot Aura's raid AP — you gear like BM (hit cap, then agility) but your value is partly the buff, so consistency beats burst in stat choices.",
    blurb:
      "Marksmanship Hunter brings Trueshot Aura — flat attack power for your whole group — at a modest personal DPS cost versus BM. Raids run one for the buff; the list below is tuned for steady-shot uptime and mana longevity across full raid nights.",
  },
  "hunter/survival": {
    statPriority: ["Agility", "Hit Rating", "Attack Power", "Crit Rating", "Stamina"],
    rationale:
      "Expose Weakness converts your agility into attack power for every physical DPS in the raid — survival is the only spec whose primary stat multiplies across ten other players, so agility leads even before the hit cap.",
    blurb:
      "Survival Hunter is a raid multiplier: Expose Weakness procs grant the whole melee/hunter core attack power scaled off your agility. Personal DPS is the lowest of the three trees; the raid total says otherwise, and the gear list stacks agility beyond what any other hunter would.",
  },
  "rogue/assassination": {
    statPriority: ["Hit Rating", "Expertise", "Agility", "Attack Power", "Crit Rating"],
    rationale:
      "Mutilate wants poison uptime and crit-fueled combo generation — after the special-attack hit cap, agility and AP feed both the daggers and the Deadly Poison ticks that make the spec tick.",
    blurb:
      "Assassination (Mutilate) Rogue is the dagger alternative to combat swords: Mutilate spam behind the target, five-stack Deadly Poison maintenance, Cold Blood Eviscerates on cooldown. It asks for strict positioning and rewards it in the right phases with sword-rivaling parses.",
  },
  "rogue/combat": {
    statPriority: ["Hit Rating", "Expertise", "Agility", "Attack Power", "Crit Rating"],
    rationale:
      "Combat's white-damage engine makes weapon-skill consistency king — hit and expertise before everything, because Sinister Strike dodges bleed rage-equivalent energy and break Slice uptime.",
    blurb:
      "Combat Swords is the standard raiding rogue of TBC: Sinister Strike, five-point Slice and Dice forever, Adrenaline Rush + Blade Flurry on cooldown. It is the most gear-forgiving melee spec in the game, and the phase lists below are the reason 'rogue' and 'swords' were synonyms for two years.",
  },
  "rogue/subtlety": {
    statPriority: ["Hit Rating", "Agility", "Attack Power", "Expertise", "Crit Rating"],
    rationale:
      "Hemo builds trade personal white damage for the Hemorrhage debuff feeding the raid's physical damage — agility leads after the hit cap because your finisher crits are where the personal numbers hide.",
    blurb:
      "Subtlety (Hemo) Rogue is the niche raid pick: Hemorrhage's bleed-amplifying debuff buffs every warrior, rogue and feral hitting your target, at a real cost to your own parse. The players running it in top logs are debuff mules by choice — and this list is how they keep the personal damage respectable anyway.",
  },
  "priest/discipline": {
    statPriority: ["Bonus Healing", "Intellect", "MP5", "Spirit", "Crit Rating"],
    rationale:
      "Raid disc is a mana battery and single-target shield bot — Power Infusion on a warlock is worth more than your own casts some fights, so intellect and MP5 rank unusually high next to +healing.",
    blurb:
      "Discipline Priest in PvE is the utility healer: Power Infusion on the top caster every two minutes, Pain Suppression for tank saves, shields that make spike damage disappear. Parses undersell it — the list below keeps your mana deep enough to spend on other people's cooldowns.",
  },
  "priest/holy": {
    statPriority: ["Bonus Healing", "Spirit", "Intellect", "MP5", "Haste"],
    rationale:
      "Circle of Healing costs nothing to aim and everything to sustain — spirit-based regen with Holy Concentration procs is what lets holy priests chain-cast through entire raid-damage phases.",
    blurb:
      "Holy Priest is TBC's raid-healing workhorse: Circle of Healing spam on melee stacks, Prayer of Mending bouncing on cooldown, Renew weaving between. Throughput is never the problem — mana is, and this gear list is built around spirit regen as much as raw +healing.",
  },
  "priest/shadow": {
    statPriority: ["Spell Hit (16%)", "Shadow Damage", "Spell Crit", "Haste", "Intellect"],
    rationale:
      "Shadow's raid value is Vampiric Touch mana for the caster group — you hit-cap first because a resisted VT is a raid-wide regen loss, then stack shadow damage that scales every dot tick and Mind Flay channel.",
    blurb:
      "Shadow Priest is the mana engine of every TBC caster group: Vampiric Touch converts your damage into the warlocks' mana bars, Misery buffs their hit. Your own rotation is dot upkeep plus Mind Flay filler, and the phase lists below balance personal scaling against the buff-bot mandate.",
  },
  "shaman/elemental": {
    statPriority: ["Spell Hit (16%)", "Spell Damage", "Spell Crit", "Intellect", "MP5"],
    rationale:
      "Lightning Bolt is 85% of your casts, so the list is one-dimensional on purpose: cap hit, then stack spell damage — crit follows naturally from Tidal Mastery and feeds Elemental Focus clearcasting.",
    blurb:
      "Elemental Shaman pairs top-tier caster totems (Wrath of Air, Totem of Wrath) with a Lightning Bolt rotation simple enough to never miss a global. You are the caster group's second buff-bot after the shadow priest — and with the gear below, a genuine damage threat on top.",
  },
  "shaman/enhancement": {
    statPriority: ["Hit Rating", "Attack Power", "Agility", "Crit Rating", "Intellect"],
    rationale:
      "Enhancement raids for Windfury Totem and Unleashed Rage — your own dual-wield windfury procs want the hit cap badly, and after it attack power scales both you and (through Unleashed Rage) your whole melee group on every crit.",
    blurb:
      "Enhancement Shaman is the heart of the TBC melee group: Windfury Totem multiplies every warrior's and rogue's output, Unleashed Rage adds AP on your crits, and your own stormstrike-windfury rolls put up real numbers. Melee groups are built around this spec — gear it like it matters.",
  },
  "shaman/restoration": {
    statPriority: ["Bonus Healing", "MP5", "Intellect", "Spirit", "Crit Rating"],
    rationale:
      "Chain Heal is the entire job — +healing scales every bounce, and MP5 is the sustain stat because resto shamans cast more heals per fight than anyone else in the raid.",
    blurb:
      "Restoration Shaman is TBC's raid-healing multiplier: Chain Heal hits three targets per cast and Earth Shield frees a tank healer's globals, while Mana Tide bails out the whole group's healers. The phase lists below are Chain-Heal-first — bounce healing scales harder with +healing than any single-target spell.",
  },
  "mage/arcane": {
    statPriority: ["Spell Hit (16%)", "Spell Damage", "Intellect", "Spell Crit", "MP5"],
    rationale:
      "Arcane Blast stacks burn mana geometrically, so intellect is a throughput stat — your damage ceiling is your mana pool, and the list leans intellect harder than fire or frost ever would.",
    blurb:
      "Arcane Mage in raids is a burn-phase specialist: Arcane Blast stacking with Presence of Mind and evocation weaving, mana management as the actual rotation. It shines on short fights and burst checks — the gear list keeps the pool deep enough to make the burn worth it.",
  },
  "mage/fire": {
    statPriority: ["Spell Hit (16%)", "Spell Damage", "Spell Crit", "Haste", "Intellect"],
    rationale:
      "Fire scales crit double through Ignite rollovers and Combustion — after the hit cap, crit rating is nearly equal in value to raw spell damage, a weighting unique to this spec.",
    blurb:
      "Fire Mage is the scaling monster of TBC casters: Fireball spam with Ignite munching crits into rolling burn damage, Combustion aligning with trinkets for windows that top meters. Weak in blues, terrifying in Sunwell gear — the phase progression below tells that story.",
  },
  "mage/frost": {
    statPriority: ["Spell Hit (16%)", "Spell Damage", "Spell Crit", "Intellect", "Haste"],
    rationale:
      "Deep frost raids on consistency: Empowered Frostbolt and Ice Shards make crit efficient, but the rotation never changes — cap hit, stack damage, and the meters take care of themselves.",
    blurb:
      "Frost Mage is the safe pair of hands in a raid: one button, zero threat problems thanks to Ice Block resets, and Winter's Chill stacking crit chance for every other mage in the group. It gives up fire's ceiling for a floor no other caster matches.",
  },
  "warlock/affliction": {
    statPriority: ["Spell Hit (16%)", "Shadow Damage", "Spell Crit", "Haste", "Intellect"],
    rationale:
      "Five dots plus Malediction's curse amplification means every point of shadow damage ticks a dozen times — hit cap first (a resisted Unstable Affliction is catastrophic), then pure spell damage forever.",
    blurb:
      "Affliction Warlock in raids is dot bookkeeping perfected: Unstable Affliction, Corruption, Siphon Life and Curse of Agony rolling while Shadow Bolts fill — with Malediction amplifying the whole caster raid's damage. It out-scales destruction early and hands over the crown late.",
  },
  "warlock/demonology": {
    statPriority: ["Spell Hit (16%)", "Shadow Damage", "Stamina", "Intellect", "Spell Crit"],
    rationale:
      "Demonic Sacrifice or felguard uptime defines the build's math; either way your spell damage carries a pet multiplier, and Demonic Knowledge converts stamina and intellect into damage — the only DPS caster that scales off stamina.",
    blurb:
      "Demonology Warlock raids for Demonic Knowledge scaling and flexibility: felguard out for personal damage or sacrificed for the shadow bonus depending on the fight. It is the bridge build — competitive numbers plus the option to soulstone-battery utility roles no pure spec covers.",
  },
  "warlock/destruction": {
    statPriority: ["Spell Hit (16%)", "Shadow/Fire Damage", "Spell Crit", "Haste", "Intellect"],
    rationale:
      "Shadow Bolt spam with Improved Shadow Bolt debuff uptime rewards crit unusually well, and by late phases destruction becomes the highest-ceiling caster in the game — the list leans damage-crit over regen because fights end before mana does.",
    blurb:
      "Destruction Warlock is TBC's endgame caster king: Shadow Bolt machine-gunning with the Improved Shadow Bolt debuff feeding every other warlock's damage too. The spec's phase curve is the steepest in the game — mediocre in Karazhan gear, untouchable in Sunwell.",
  },
  "druid/balance": {
    statPriority: ["Spell Hit (16%)", "Spell Damage", "Spell Crit", "Intellect", "Spirit"],
    rationale:
      "Moonkin Aura's 5% spell crit and Improved Faerie Fire justify the raid spot before your own Starfires do — you cap hit, stack damage, and let the aura do the heavy lifting on the meters you don't appear on.",
    blurb:
      "Balance Druid raids for the caster group's sake: Moonkin Aura crit, Faerie Fire hit, innervates and battle-rezzes on demand. Personal damage is honest mid-pack — the phase lists below close the gap while keeping the buff-bot mandate funded with mana.",
  },
  "druid/feral-bear": {
    statPriority: ["Armor", "Stamina", "Defense/Resilience (crit immunity)", "Agility", "Expertise"],
    rationale:
      "Bears can't block crushes, so they win by making hits small: armor cap at 35k+, a health pool warriors can't match, and agility that doubles as dodge and crit — the mitigation math is different from every other tank.",
    blurb:
      "Feral Bear is TBC's stat-stick tank: the biggest health pool and armor total in the game, trading crush-blocking for sheer effective health. Uncrittable via resilience or defense, then armor and stamina forever — with the bonus that your offset pieces are cat DPS gear.",
  },
  "druid/feral-cat": {
    statPriority: ["Hit Rating", "Agility", "Strength", "Expertise", "Crit Rating"],
    rationale:
      "Cat DPS is powershifting — burning mana into Wolfshead energy procs — so agility (crit + dodge for the bear set you also carry) edges strength, and the hit cap protects a rotation with zero rage-style resource insurance.",
    blurb:
      "Feral Cat is the highest-skill melee rotation in TBC: powershifting out of form every few seconds for Wolfshead energy, Mangle and Rip upkeep in between, and an instant off-tank switch nobody else offers. The phase lists double as your bear offset — one gear track, two jobs.",
  },
  "druid/restoration": {
    statPriority: ["Bonus Healing", "Spirit", "Intellect", "MP5", "Haste"],
    rationale:
      "Lifebloom stacks tick off +healing with absurd coefficient efficiency, and the Tree of Life aura converts your spirit into the whole party's healing — two reasons resto druids gear differently from every other healer.",
    blurb:
      "Restoration Druid is TBC's tank-HoT machine: triple-stacked Lifeblooms rolling on two tanks, Rejuvenation blanketing the raid, Swiftmend saves in between. Tree of Life turns your gear into the group's throughput — the phase lists below stack the +healing and spirit that aura wants.",
  },
};
