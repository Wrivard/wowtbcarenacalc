// Stat caps, resolved PER SPEC. Each spec's caps were researched against
// authoritative TBC 2.4.3 sources (Wowhead, wowsims, Warcraft Tavern,
// Icy-Veins) rather than derived from a coarse archetype — the archetype
// model missed spec-specific truths (rogue white/poison hit worth chasing,
// prot-paladin avoidance/uncrushable + spell hit, hunter single ranged cap,
// talent hit offsets like Precision / Balance of Power / Surefooted, etc.).
//
// SPEC_CAPS is keyed by `${classSlug}/${specSlug}` and holds the full pvp
// and pve StatCap lists. archetypeCaps() is kept as a graceful fallback for
// any spec not yet in the map. Regenerate SPEC_CAPS from the caps research
// staging file (scratchpad/generate-caps.mjs).
//
// Rating conversions (level 70): 1% melee/ranged hit = 15.77 rating;
// 1% spell hit = 12.62 rating; 1 expertise ≈ 3.94 rating; 1% crit ≈ 22.08;
// 1% haste ≈ 15.77; 1 defense skill ≈ 2.37 rating.

import type { Role } from "@/lib/classes";

export interface StatCap {
  stat: string;
  cap: number; // numeric target; 0 = soft stat / no hard cap (renders "—")
  unit: string; // "rating" | "%" | "expertise" | "defense" | "avoidance"
  note: string;
}

// Per-spec caps (researched). Covers all 28 specs.
const SPEC_CAPS: Record<string, { pvp: StatCap[]; pve: StatCap[] }> = {
  "druid/balance": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — a soft survival target; stack it after damage since moonkin are burst/utility casters, ~350+ is a reasonable arena floor and it blunts enemy crits, crit damage and DoTs." },
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "Same-level players carry a 4% spell miss (~50 rating), but the Balance of Power talent (4%) fully covers it — carry zero hit on PvP gear and never gem it as a moonkin." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No cap; irrelevant in arena — you cast on the move/instants (Moonfire, Wrath weaves) and value burst/resilience over throughput haste." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 202, unit: "rating", note: "16% is the raw cap vs a +3 boss (202 rating); the Balance of Power talent (4%) is mandatory and drops the gear need to 12% (152 rating), and a Totem of Wrath (3%) and/or Draenei Heroic Presence (1%) cut it further — note Improved Faerie Fire does NOT add spell hit (it is melee/ranged hit only in 2.4.3)." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap — a pure throughput stat with diminishing value; there is no GCD or cast-floor cap to chase, take it as it comes on gear behind spell power and hit." },
      { stat: "Spell Crit", cap: 0, unit: "rating", note: "No cap — soft-valued; crit triggers Nature's Grace (faster next cast) so it scales your rotation, but never gate it against a number, it sits behind spell power and the hit cap." },
    ],
  },
  "druid/feral-bear": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — ~350 is an entry point and 490+ is competitive; combined with Survival of the Fittest's 3% it pushes you toward practical crit-immunity vs rogues and cats." },
      { stat: "Crit immunity (uncrittable)", cap: 2.6, unit: "%", note: "Survival of the Fittest 3/3 already removes 3% crit; roughly 67 resilience rating covers the last 2.6% so players can't crit you — highly valuable when peeling in bear form." },
      { stat: "Hit Rating (threat, situational)", cap: 79, unit: "rating", note: "No PvP threat table exists, but 5% (~79 rating) caps yellow special misses vs same-level players if you want Maul/Mangle to land reliably when guarding a partner; not a priority stat." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No arena cap — players dodge/parry far less than a boss and there is no aggro to hold, so never gear expertise for PvP; stack Stamina, Resilience and Agility instead." },
    ],
    pve: [
      { stat: "Crit immunity (uncrittable)", cap: 2.6, unit: "%", note: "THE first goal: a +3 boss has 5.6% crit; Survival of the Fittest 3/3 removes 3%, so cover the remaining 2.6% with Defense/Resilience — 156 defense rating alone, 67 resilience rating alone, or any mix hitting 2.6%." },
      { stat: "Hit Rating", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow special-attack misses vs a +3 boss — a large, steady threat gain (no missed Mangle/Maul/Lacerate); white swings need ~24% and are not chased." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~104 rating) removes the boss's 6.5% dodge; expertise is doubly good for bears since many fights force front-facing, and beyond dodge it also trims parry — a pure threat stat, taken after crit immunity." },
      { stat: "Defense skill", cap: 0, unit: "defense", note: "No hard number beyond what crit immunity needs — leather carries little defense, so bears reach uncrittable mainly through resilience gems/gear rather than the plate-tank 490 defense figure; extra defense only adds minor dodge/miss." },
      { stat: "Armor / Stamina", cap: 0, unit: "rating", note: "No cap — after crit immunity and hit/expertise, stack Stamina (17 HP per point in Dire Bear with Kings) and Agility (crit, dodge, armor); bear armor benefits from Dire Bear's multiplier and is your core mitigation." },
    ],
  },
  "druid/feral-cat": {
    pvp: [
      { stat: "Hit Rating (vs players)", cap: 79, unit: "rating", note: "5% (~79 rating) removes special-attack misses vs same-level players; because cat form swings a single weapon there is NO dual-wield penalty, so this same 5% also caps your white auto-attacks." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target; ~350+ blunts burst crits, but ferals often favor Agility/stamina since Cower and stealth resets matter more than raw resilience." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No hard target in arena — you rarely stay behind a player, and Shred dodges are a minor loss; do not gem or gear expertise for PvP." },
    ],
    pve: [
      { stat: "Hit Rating", cap: 142, unit: "rating", note: "9% caps special-attack (Shred/Mangle/Rake) misses vs a +3 boss; cat form uses ONE weapon (no dual-wield penalty), so this same 9% also caps white swings — there is no deeper 24% white cap to chase. Improved Faerie Fire (+3%) and Draenei (+1%) lower how much you carry on gear." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (6.5% dodge, ≈103 rating) removes a boss's dodge chance from behind; parry never applies while behind, so beating dodge is the whole goal. Reach this second, right after hit." },
      { stat: "Crit / Haste / Armor Pen", cap: 0, unit: "%", note: "No hard caps — after hit and expertise, stack Agility (AP + crit + dodge) and raw AP; crit, haste and armor penetration are pure soft DPS with no ceiling." },
    ],
  },
  "druid/restoration": {
    pvp: [
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap — ~350 is the 2v2 entry point, 490+ competitive; every 39.4 rating removes 1% crit chance and 2% crit damage taken, your #1 survival stat." },
      { stat: "Spell Hit (vs players)", cap: 4, unit: "%", note: "~50 rating (4%) removes the base spell miss vs equal-level players so Cyclone, Entangling Roots and Hibernate reliably land — Resto has no hit talent, so unlike a boomkin this must come from gear; a resisted Cyclone loses games." },
      { stat: "Spell Hit vs spell-resist races", cap: 76, unit: "rating", note: "Blood Elf (all schools) and Tauren/Night Elf (nature) get +2% to resist, pushing the practical Cyclone/Roots cap to 6% (~76 rating); most druids still run little hit and accept occasional resists rather than sacrifice resilience/healing." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No cap and low priority in arena — haste does not speed HoT ticks; a little helps clutch Regrowth/Healing Touch casts and GCD, but resilience and healing power come first." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 0, unit: "rating", note: "No hit needed — direct heals and HoTs cannot miss; the raid 16% boss cap that applies to caster DPS does not apply to a healer. Never gear spell hit for PvE healing." },
      { stat: "Spell Haste", cap: 242, unit: "rating", note: "Soft target ~242 rating (~15%) is the standard Resto haste goal: haste does NOT speed HoT ticks, it lowers the GCD so you can squeeze an extra spell into the rolling-Lifebloom rotation. First useful breakpoint ~113; further Lifebloom-tick breakpoints ~291/315; past 242 return to stacking +healing." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap and low value — HoTs (Rejuvenation, Lifebloom tick, Regrowth's HoT) cannot crit, so only the direct portions of Regrowth/Healing Touch/Swiftmend benefit; take crit incidentally, never prioritize it. Nature's Grace slightly raises its worth." },
      { stat: "Mana regen (mp5 / Spirit)", cap: 0, unit: "rating", note: "No cap — carry enough combat regen to last the fight; Spirit is favored in deep Resto (Intensity gives 30% in-combat regen, and Tree of Life converts 25% of your Spirit into party healing bonus), mp5 for constant while-casting regen. Balance against +healing throughput." },
    ],
  },
  "hunter/beast-mastery": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — a soft target; BM hunters favor Agility/AP burst over heavy resilience, but ~350-490 rating helps survive melee trains and reduces crit/DoT damage taken." },
      { stat: "Hit Rating (vs players)", cap: 79, unit: "rating", note: "5% (~79 rating) caps ALL ranged misses vs same-level players — both auto (white) and Steady/Arcane/Aimed (yellow) shots, since ranged attacks have no dual-wield penalty, so one cap covers everything." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Inert for hunters — ranged attacks cannot be dodged or parried, so expertise does nothing; never gem or gear it." },
    ],
    pve: [
      { stat: "Ranged Hit Rating", cap: 142, unit: "rating", note: "9% (142 rating) caps ranged misses vs a +3-level boss; this single cap covers BOTH auto shots and special shots (no dual-wield penalty), so unlike rogues there is no higher separate white-hit cap to chase." },
      { stat: "Ranged Hit Rating (after raid buffs)", cap: 79, unit: "rating", note: "BM takes no personal hit talent (Surefooted is a Survival talent, Focused Aim is Marksmanship), so it relies on raid buffs: Improved Faerie Fire (+3%) plus a Draenei's Heroic Presence (+1%) drop the gear requirement to ~5% / 79 rating (~126 with Draenei alone)." },
      { stat: "Haste Rating", cap: 0, unit: "rating", note: "No hard cap and no diminishing returns — more haste is always more DPS; per-rotation clip breakpoints exist (e.g. shifting to a 1:1 Steady/Auto rotation near ~1.5s effective weapon speed) but you transition to a faster rotation rather than stop stacking." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Inert for hunters — ranged attacks cannot be dodged or parried, so expertise gives nothing; do not gear it." },
    ],
  },
  "hunter/marksmanship": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target ~350-420 for arena survivability; every point cuts incoming crit chance, crit damage and DoT damage. A ranged glass cannon still wants a resilience floor to survive melee trains." },
      { stat: "Ranged Hit (vs players)", cap: 79, unit: "rating", note: "5% (79 rating) caps both special shots (Aimed/Arcane/Steady) and auto-shot misses against a level-70 player (5% base miss). Ranged attacks can be dodged from the front but NEVER parried, and Marksmanship has no hit talent (Surefooted is a Survival talent), so carry this on gear; Draenei Heroic Presence covers 1%." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Inert for a hunter — ranged attacks are unaffected by expertise. Never gem, enchant or gear it in PvP." },
    ],
    pve: [
      { stat: "Ranged Hit", cap: 142, unit: "rating", note: "9% (142 rating) caps ALL ranged misses vs a +3 boss — because ranged has no dual-wield penalty and can't be parried, the auto-shot (white) and special-shot (yellow) caps converge, so unlike a rogue you never chase a separate deeper white cap. Draenei Heroic Presence (-1%) and a Balance Druid's Improved Faerie Fire (-3%) drop the gear requirement toward ~79; Marksmanship itself has no hit talent." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Inert for ranged attacks — expertise does nothing for a hunter. Do not gem or gear it; it is off-itemized on hunter pieces for a reason." },
      { stat: "Armor Penetration", cap: 0, unit: "rating", note: "No hard cap — soft target is the boss's armor value; ArP is capped in usefulness once combined ArP + external armor debuffs (Sunder/Faerie Fire/Curse of Recklessness) fully strip the target. High-value in later tiers (Sunwell), largely absent before." },
      { stat: "Critical Strike", cap: 0, unit: "rating", note: "No hard cap — pure DPS soft stat (1% = 22.08 rating). Marksmanship values crit highly for burst and for feeding Kill Command; keep stacking Agility/crit after the hit cap." },
      { stat: "Haste", cap: 0, unit: "rating", note: "No hard cap — soft DPS stat (1% = 15.77 rating) that speeds auto-shots. Watch for auto-shot clipping when weaving Steady Shot; there is no rating threshold to hit." },
    ],
  },
  "hunter/survival": {
    pvp: [
      { stat: "Ranged Hit Rating (vs players)", cap: 79, unit: "rating", note: "5% (79 rating) removes ranged-attack misses vs a level-70 player; Survival's Surefooted (3/3, +3% hit) covers most of it, so you only need ~2% (~32 rating) from gear in arena." },
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap — soft target; ~350 is a 2v2 entry point and 490+ is competitive to blunt burst, crit damage and DoT ticks." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Inert for hunters — ranged attacks cannot be dodged or parried, so never gem, enchant or gear expertise." },
      { stat: "Agility", cap: 0, unit: "%", note: "No cap — primary stat; drives crit, ranged attack power and a little dodge for kiting survivability." },
    ],
    pve: [
      { stat: "Ranged Hit Rating", cap: 142, unit: "rating", note: "9% (142 rating) is the true cap to remove all ranged misses vs a +3 boss, but Survival's Surefooted (3/3, +3% hit) means you only carry ~6% (~95 rating) on gear — add Draenei Heroic Presence (+1%) and it drops to ~5% (~79 rating)." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Inert for hunters — ranged auto/Steady/Arcane shots cannot be dodged or parried, so expertise does nothing; ignore it entirely." },
      { stat: "Agility", cap: 0, unit: "%", note: "No cap — highest-value stat; it feeds crit, ranged AP and (via Survival's Expose Weakness) a raid-wide AP buff, so stack it after hit is capped." },
      { stat: "Crit Rating", cap: 0, unit: "%", note: "No hard cap — soft stat; scales Expose Weakness uptime and burst, valued just under agility with no ceiling in raids." },
      { stat: "Haste Rating", cap: 0, unit: "%", note: "No hard cap — soft stat; more ranged haste tightens Auto Shot / Steady Shot weaving but is weighted below hit, agility and crit." },
    ],
  },
  "mage/arcane": {
    pvp: [
      { stat: "Spell Hit (vs players)", cap: 0, unit: "rating", note: "No gear hit needed — Arcane Focus 5/5 gives +10% hit on Arcane spells, far above the 4% (~50 rating) miss cap versus same-level players, so spend zero itemization on hit in arena." },
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap — a soft survival target on your own gear; ~350 is a 2v2 entry point and 490+ is competitive, cutting incoming crit chance, crit damage and DoT damage." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No cap — a soft target that shortens Arcane Blast/Missiles casts toward the 1.0s GCD floor for faster burst windows under Presence of Mind + Arcane Power." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 76, unit: "rating", note: "Only 6% (76 rating) needed from gear to reach the 16% boss cap — Arcane Focus 5/5 already supplies +10% hit on all Arcane spells; a Shadow Priest's Misery (+3%) drops the gear need to ~38 rating and Draenei Heroic Presence (+1%) lowers it further." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No hard cap — arcane's top secondary stat; stack it to compress Arcane Blast casts toward the 1.0s GCD floor, past which added haste is wasted on GCD-locked spells." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — a soft target valued after reaching hit; feeds Arcane Concentration (Clearcasting) procs and raw damage, so take it once hit is satisfied." },
    ],
  },
  "mage/fire": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target. As a cloth caster stack it heavily (~350+ entry, competitive comps run more) to blunt melee/rogue burst; it reduces crit chance, crit damage and DoT damage taken against you." },
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "4% (~50 rating) caps spell misses vs same-level players, but 3/3 Elemental Precision (in virtually every fire build) already grants +3%, so you only need ~1% (~13 rating) from gear — in practice gem/gear zero pure hit in arena and let the talent finish the cap." },
      { stat: "Spell Penetration", cap: 0, unit: "rating", note: "No hard cap — situational soft target. ~130 rating offsets a typical Mark of the Wild / Prayer of Spirit style resistance buff so your Fireballs/Scorch aren't partially resisted; most fire mages skip it and rely on Spell Hit instead." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 202, unit: "rating", note: "16% (202 rating) is the hard cap vs a +3-level boss, but fire is almost always specced 3/3 Elemental Precision (+3% hit), dropping the gear requirement to 13% ≈ 164 rating; a Shadow Priest's Misery (+3%) and Draenei Heroic Presence (+1%) lower it further, so cap this first then stop." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No hard cap — the defining fire stat, not a ceiling. Crits drive Ignite (a stacking 40% DoT) and feed Combustion, so crit scales super-linearly; prioritize it heavily after hit, above raw haste." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap — soft target. Shortens Fireball/Scorch casts; avoid pushing casts below the 1.0s cast floor / 1.5s GCD with raid haste buffs (Bloodlust + Icy Veins) where extra haste is wasted, but you will not approach that from gear alone." },
    ],
  },
  "mage/frost": {
    pvp: [
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "4% (~50 rating) caps spell misses vs same-level players, but Elemental Precision gives Frostbolt +6% hit (a long-standing TBC bug), so your Frostbolt is already over the cap with zero gear hit; only carry ~1% (13 rating) if you also want Ice Lance/Fire Blast capped." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft survival target; frost mages are glassy, so ~300-400+ is the practical arena range to blunt rogue/warrior burst and enemy crit/DoT damage." },
      { stat: "Spell Penetration", cap: 0, unit: "rating", note: "No hard cap — Frostbolt is Frost school, so ~40-80 spell pen helps punch through Mark of the Wild and Frost Resistance auras/totems; more than that has diminishing value in arena." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — soft priority stat; the whole spec is built on Shatter (Winter's Chill + frozen target = big crit multiplier), so crit is your primary burst scaler after hit." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 127, unit: "rating", note: "The 16% boss cap needs 202 rating raw, but Elemental Precision grants Frostbolt +6% hit (the TBC Frostbolt bug), so you only gear 10% = ~127 rating; a single +3% hit buff (Totem of Wrath or Shadow Priest's Misery) drops it to ~89, and stacking that with Inspiring/Heroic Presence (+1%) reaches the cap at ~76 rating." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — high-priority soft stat; frost's damage leans on Ice Shards-boosted crits and Winter's Chill stacking +2% crit on the target, so crit is weighted heavily after the hit cap." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No cap — soft target valued just under hit; shortens Frostbolt's cast to raise DPS and mana efficiency, with no breakpoint to chase." },
      { stat: "Spell Damage", cap: 0, unit: "%", note: "No cap — your main throughput stat; stack +frost/spell damage once hit is capped, ahead of Intellect and mp5." },
    ],
  },
  "paladin/holy": {
    pvp: [
      { stat: "Spell Hit (vs players)", cap: 0, unit: "%", note: "No hit needed — Holy Light, Flash of Light and Holy Shock heals cannot miss; only offensive Holy Shock/Judgement can miss and are not worth gearing hit for." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — as the primary heal target you want as much as you can fit; it cuts your chance to be crit and the damage/mana-drain of crits against you, but Stamina and Intellect usually win the gem/enchant slots first." },
      { stat: "Stamina (survival)", cap: 0, unit: "rating", note: "No cap — effective HP is a holy paladin's main defense against being trained; stack Stamina and Intellect over throughput stats in arena." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No cap and near-worthless — Flash of Light's cast is already at/under the 1.0s GCD floor, so haste rating buys almost nothing; skip it entirely in PvP." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 0, unit: "%", note: "No hit needed — every paladin heal (Holy Light, Flash of Light, Holy Shock heal) auto-hits; never gem, enchant or gear spell hit as a healer." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No practical cap — the GCD floor is 1.0s but reaching it needs ~50% haste, unattainable in S2; a little haste smooths Holy Light spam but Healing Power, Intellect and mp5 all outweigh it." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — crit is doubly valuable via Illumination (refunds mana on crit heals) and Holy Guidance (Intellect adds spell power); stack it freely, but it is a throughput/regen stat, not a capped one." },
      { stat: "Intellect / mp5 (mana longevity)", cap: 0, unit: "rating", note: "No cap — Intellect drives mana pool, crit and Holy Guidance spell power, while mp5 is the paladin's core regen; balance enough to outlast the fight, then pile on Healing Power." },
    ],
  },
  "paladin/protection": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — stack as high as gear allows; resilience (not defense) is what keeps you from being crit/burst-killed by players, and prot's value in arena is the bubble/cleanse/utility, not damage." },
      { stat: "Spell Hit (vs players)", cap: 4, unit: "%", note: "~4% (about 50 rating) removes spell misses vs same-level players for the little holy damage you do (Judgement/Consecration/Exorcism), but prot has near-zero offensive pressure so this is not worth gearing over resilience and stamina." },
    ],
    pve: [
      { stat: "Defense (crit immunity)", cap: 490, unit: "defense", note: "490 defense skill (base ~350 at 70, so +140 skill via ~331 defense rating) removes a +3 boss's 5.6% crit chance and makes you uncrittable — 485 suffices for heroics; paladins have no talent substitute, so this is the very first goal." },
      { stat: "Uncrushable (avoidance)", cap: 102.4, unit: "avoidance", note: "Miss + Dodge + Parry + Block must total 102.4% to push crushing blows (150% damage) off a +3 boss's attack table — Holy Shield's +block chance is the paladin's signature way to reach it, so keep Holy Shield up on any crushing target." },
      { stat: "Spell Hit", cap: 202, unit: "rating", note: "16% (202 rating) hard-caps misses on your holy-damage threat (Consecration, Holy Shield, Judgement, Seal procs, Exorcism) — since paladin threat is overwhelmingly spell-based, this is the single biggest threat lever after you are crit/crush capped." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~103 rating, the 6.5% dodge soft cap) removes boss dodge and is extra valuable for paladins because you often tank from the FRONT (AoE/multi-mob), where parry and block also eat your attacks — expertise reduces those too." },
      { stat: "Hit Rating", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow melee misses (Judgement, Seal of Righteousness/Vengeance procs) — a threat/consistency stat taken after crit immunity and uncrushable, and secondary to Spell Hit for a paladin's holy-heavy threat." },
    ],
  },
  "paladin/retribution": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target; ~350+ blunts the crit-based burst that kills ret, but ret sacrifices little gear here since its own damage comes from Seal/Judgement burst windows." },
      { stat: "Melee Hit (vs players)", cap: 79, unit: "rating", note: "5% (79 rating) caps yellow-special and Judgement/Seal misses vs level-70 players — but the Precision talent gives 3%, so you only need ~2% (~32 rating) from gear. Judgement of Blood/Command and Seal of Blood use the MELEE table, so melee hit (not spell hit) covers almost your whole kit." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No PvP target — players dodge far less than bosses and you strike from all angles; do not gem or gear expertise in arena, favor burst (AP/crit) and resilience instead." },
    ],
    pve: [
      { stat: "Melee Hit", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow-special misses vs a +3 boss and covers Crusader Strike, Hammer of Wrath, and — critically — Judgement of Blood/Command and Seal of Blood, which all use the MELEE hit table. The Precision talent grants 3%, so you typically need only ~6% (~95 rating) from gear." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~103 rating) removes the boss's 6.5% dodge; staying behind the boss makes parry irrelevant. Humans wielding a Sword or Mace need only 21 (~86 rating) via Weapon Expertise. Extremely valuable and rarely capped before Sunwell — never stop stacking it." },
      { stat: "Spell Hit", cap: 0, unit: "rating", note: "No target worth gearing — the 16% raid spell cap does NOT apply to your core kit. Only Consecration, Exorcism, Holy Wrath, and Judgement of Righteousness/Vengeance use spell hit, a minor damage slice; do not sacrifice melee hit/expertise/crit for it." },
      { stat: "Critical Strike", cap: 0, unit: "%", note: "No cap — a top soft-priority stat after hit and expertise, since crit feeds Seal procs, Vengeance, and mana return (Spiritual Attunement/Judgements). Stack it once melee hit is capped." },
    ],
  },
  "priest/discipline": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap and a priest's #1 defensive stat — reduces enemy crit chance, crit damage and DoT damage taken; ~350 is the 2v2 entry point and 400-490+ is competitive, stack it alongside Stamina." },
      { stat: "Spell Hit (vs players)", cap: 38, unit: "rating", note: "~3% (≈38 rating) is the Icy Veins target to reliably land binary offensive spells like Mana Burn and Shadow Word: Death against same-level players; full removal of the 4% base miss needs ~50 rating. Disc has no spell-hit talents (Shadow Focus is a Shadow-tree talent), so this comes off gear — low priority behind Resilience/Stam/healing." },
      { stat: "Spell Penetration", cap: 0, unit: "rating", note: "Situational, no fixed cap — Mana Burn/SW:Pain/SW:Death are Shadow school and get resisted by Shadow Resistance aura, Mark of the Wild, etc.; carry a small pen set only when the enemy comp runs resistance, otherwise skip it." },
      { stat: "Spell Haste", cap: 788, unit: "rating", note: "788.5 rating (50% haste) is the theoretical floor that pushes the GCD to 1.0s — never reached in S2 gear, so treat haste purely as a soft throughput stat for faster clutch heals, not a cap to chase." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — soft value only; bigger Flash Heal/Greater Heal crits and larger Power Word: Shield absorbs (crit scales the shield) help, but Resilience, Stamina and +healing come first in arena." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 0, unit: "rating", note: "Healers need zero hit — heals cannot miss and the 16% boss cap is irrelevant. Never gem or gear spell hit as a disc healer." },
      { stat: "Spell Haste", cap: 788, unit: "rating", note: "788.5 rating (50% haste) is the only true hard cap — it clamps the GCD to its 1.0s floor — but it is unreachable in S2 raid gear, so haste is effectively an uncapped soft throughput/efficiency stat (faster casts = fewer overheals and less mana wasted)." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — disc's #2 stat after +healing (22.08 rating = 1% crit). Crits boost heal output and, if specced Holy Concentration, proc mana-free casting; also enlarges Power Word: Shield absorbs. Stack after Healing Power." },
      { stat: "Mana Regen (mp5 / Spirit / Int)", cap: 0, unit: "rating", note: "No cap — gear only enough combined mp5/Spirit/Intellect to last the specific fight, then convert everything else into Healing Power and crit for throughput." },
    ],
  },
  "priest/holy": {
    pvp: [
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap, but as the #1 focus target a holy priest wants more than DPS do — ~400 is the competitive minimum, 490+ is ideal; reduces enemy crit chance, crit damage and DoT damage taken." },
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "Heals can never miss, but 4% (~50 rating) caps resists on your control/utility spells — Psychic Scream (fear), Mana Burn, Shadow Word: Death and offensive Dispel Magic — against same-level players; low priority and most holy priests carry little or none, but a whiffed Scream or resisted dispel can lose a game." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No cap and rarely gemmed in arena — the value is faster clutch Flash Heals under pressure; resilience, healing power and mana come first." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 0, unit: "rating", note: "Healers need no hit — heals cannot miss or be resisted. Ignore hit entirely and spend those item points on throughput and regen instead." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap; the only reference point is the 1.0s GCD floor at 50% haste (~788 rating), unreachable without Bloodlust/Heroism. It is the strongest raw throughput stat but its value is situational — great when chain-casting, wasted when idle-healing." },
      { stat: "Spell Crit", cap: 0, unit: "rating", note: "No cap. Crits heal for 150%, trigger Inspiration on the target, and feed the Holy Concentration mana-regen proc, so crit doubles as a longevity stat — but healing power and haste are still weighted above it." },
      { stat: "Healing Power", cap: 0, unit: "rating", note: "No cap; aim for roughly 2000 bonus healing as a gearing checkpoint before over-investing in secondary stats." },
      { stat: "MP5 / Spirit", cap: 0, unit: "rating", note: "No cap — carry just enough regen to last the fight. Spirit also fuels Meditation and Spirit-based regen, so it doubles as longevity; stack more only on long or mana-intensive encounters." },
    ],
  },
  "priest/shadow": {
    pvp: [
      { stat: "Spell Hit (vs players)", cap: 0, unit: "rating", note: "No gear hit needed: base spell miss vs a same-level player is only 4%, and Shadow Focus (5/5) already grants 10% shadow hit, so your entire arena shadow rotation is auto-capped — gear 0 hit." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "Soft target, not a hard cap — as a cloth caster take what BiS offers (Spellstrike/Spellfire or PvP set pieces); ~350-490 reduces incoming crit chance, crit damage and DoT damage, but never gem pure Resilience over Stamina/spell power." },
      { stat: "Stamina / survival", cap: 0, unit: "%", note: "No cap — effective survival stat for a squishy shadow priest; prioritize Stamina and Resilience gear pieces over raw spell power in arena." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 76, unit: "rating", note: "16% is the boss (+3) cap, but Shadow Focus (5/5) supplies 10%, so you only need 6% = 76 rating from gear; drop to 5% = 63 rating with a Draenei's Heroic/Inspiring Presence aura in your group. Shadow Focus only covers Shadow spells, which is your whole rotation." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap — high-value stat after the hit cap; stack haste and spell power. (Bloodlust/Heroism and other haste effects stack multiplicatively but never create a hard ceiling.)" },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — feeds Shadowform's damage and, with talents, mana return; a soft priority behind hit and haste, not something to cap." },
    ],
  },
  "rogue/assassination": {
    pvp: [
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap — ~350 is the 2v2 entry point, 490+ is competitive; reduces incoming crit chance, crit damage and DoT/poison damage." },
      { stat: "Hit (specials, vs players)", cap: 79, unit: "rating", note: "5% (79 rating) caps yellow special-attack misses (Mutilate/Ambush/finishers) against same-level players; dual-wield penalty does not apply to specials." },
      { stat: "Poison hit (vs players)", cap: 0, unit: "rating", note: "Soft target — poisons (Deadly/Instant) can still miss ~4% vs a level-70 player; a little hit steadies poison uptime, but resilience and burst pressure outrank pure poison-hit stacking in arena." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No hard cap in PvP — players dodge/parry from agility and defensive racials, so expertise reduces dodged openers/finishers; useful but never gemmed over resilience or agility." },
    ],
    pve: [
      { stat: "Poison hit", cap: 268, unit: "rating", note: "Dominant hit target for Mutilate: poisons are ~30-35% of your damage and cap around 17% (~268 rating, some sources ~315 with buffs); Precision (5%) covers part, leaving ~12%/~189 on gear — keep stacking hit well past the special cap." },
      { stat: "Hit (specials/yellow)", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow special misses vs a +3 boss; Assassination has no Precision in its core tree, but mutilate builds splash 5 pts for Precision (5% hit), dropping the on-gear special need to ~4% (~63 rating)." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~102 rating) removes the boss's 6.5% dodge when attacking from behind (no parry from behind); daggers get no Human weapon-expertise racial, so it must come from gear." },
      { stat: "Hit (white dual-wield)", cap: 442, unit: "rating", note: "White auto-attacks need ~28% (~442 rating) vs a +3 boss to stop missing — impractical, so it is never chased; you accept white misses and gear hit only up to the poison target." },
      { stat: "Agility / AP / Crit / Haste", cap: 0, unit: "%", note: "No hard cap — after poison-hit and 26 expertise, prioritize Agility (AP+crit), then Crit and Haste as soft scaling stats; no haste or crit breakpoint exists." },
    ],
  },
  "rogue/combat": {
    pvp: [
      { stat: "Yellow/Special Hit (vs players)", cap: 79, unit: "rating", note: "5% (79 rating) is the special-attack miss cap vs a level-70 player, but 5/5 Precision (a mandatory Combat talent, +5% hit) already covers it — so Sinister Strike/Eviscerate never miss with zero hit on gear." },
      { stat: "Hit for white swings & poisons", cap: 0, unit: "rating", note: "No hard cap worth itemizing: dual-wield whites still miss 24% and poisons ~4% vs a level-70 player, so a little extra hit helps landing damage and Wound/Deadly poison, but AP/agility/crit come first." },
      { stat: "Expertise (soft)", cap: 0, unit: "expertise", note: "No hard target in arena — a few points trims a player's ~5% dodge/parry, but it is never stacked over agility, AP, or crit." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "Rogues are the aggressor and rarely stack resilience; take what comes on PvP gear for survivability but prioritize AP, agility, crit, and hit for the kill." },
    ],
    pve: [
      { stat: "Yellow/Special Hit (floor)", cap: 142, unit: "rating", note: "9% (142 rating) is the full special-attack miss cap vs a +3 boss, but with 5/5 Precision (+5%) you only need ~4% (~63 rating) on gear — this is the minimum floor, not the real goal for combat." },
      { stat: "White Dual-Wield Hit (real target)", cap: 363, unit: "rating", note: "White swings miss 28% vs a boss; combat rogues DO chase this because auto-attacks plus Combat Potency energy dominate their DPS — ~363 rating white-caps with 5/5 Precision (~300-316 with a Moonkin/Draenei hit aura)." },
      { stat: "Poison Hit", cap: 268, unit: "rating", note: "Poisons (Deadly + off-hand Instant/Wound) miss ~17% vs a +3 boss; hit and Precision reduce it, so hit past the white cap keeps paying off — full poison cap (~268 rating) is only reachable at Sunwell-tier gear." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~102 rating) removes a boss's 6.5% dodge when attacking from behind (parry only happens from the front). Humans with swords/maces get 5 free expertise from Weapon Expertise, needing less on gear." },
    ],
  },
  "rogue/subtlety": {
    pvp: [
      { stat: "Hit Rating (yellow, vs players)", cap: 79, unit: "rating", note: "5% (~79 rating) caps special/opener misses (Ambush, Backstab, Hemorrhage, Sinister Strike) against a same-level player; Subtlety has no hit talents so this all comes from gear." },
      { stat: "Hit Rating (white/dual-wield, vs players)", cap: 379, unit: "rating", note: "24% (~379 rating) is the true dual-wield white-swing cap vs a level-70 player; never gemmed for, but explains why extra hit still adds white/poison damage in duels." },
      { stat: "Poison Hit (vs players)", cap: 79, unit: "rating", note: "Poisons can only miss (never dodged/parried); the same ~5% (79 rating) that caps yellow attacks also reliably lands Crippling/Mind-numbing/Deadly poison on a same-level target." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No hard cap in PvP — attack from behind to negate parry; a few points help beat player dodge on openers, but hit, AP and resilience come first." },
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap — ~350 is the 2v2 entry point, 490+ is competitive; reduces incoming crit chance, crit damage and DoT/poison damage." },
    ],
    pve: [
      { stat: "Hit Rating (yellow/special cap)", cap: 142, unit: "rating", note: "9% (142 rating) removes special-attack (Backstab/Hemo/Sinister Strike/Eviscerate) misses vs a +3 boss; Subtlety lacks Combat's Precision, so the full 9% must come from gear." },
      { stat: "Poison Hit (deep soft cap)", cap: 268, unit: "rating", note: "Poisons benefit from hit up to ~17% (~268 rating) — they can't be dodged, only miss — so hit past 9% keeps improving poison uptime; a real reason top rogues chase deeper hit, though 17% is only reachable at Sunwell gear levels." },
      { stat: "Hit Rating (white dual-wield cap)", cap: 442, unit: "rating", note: "28% (~442 rating) is the point white off-/main-hand swings stop missing vs a +3 boss; never fully gemmed, but each point of hit between 9% and here still adds white DPS, so hit stays valuable well past the yellow cap (raid buffs like Improved Faerie Fire / moonkin lower the effective rating needed)." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~103 rating) removes a boss's 6.5% dodge when attacking from behind; Subtlety has no Weapon Expertise talent, so all 26 comes from gear/racials (Humans with swords/maces/daggers need less)." },
    ],
  },
  "shaman/elemental": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — a soft survival target. In cloth-equivalent mail, stack the Season gear's built-in resilience (~350+ entry, competitive teams push higher) to blunt burst before adding damage." },
      { stat: "Spell Hit (vs players)", cap: 38, unit: "rating", note: "Only 3% (~38 rating) is needed to stop misses on same-level players, and Elemental Precision (3/3) or Nature's Guidance already covers all of it — so a standard arena build carries ZERO hit on gear. The raid 16% cap never applies in PvP." },
      { stat: "Spell Penetration", cap: 0, unit: "rating", note: "No hard cap — soft target ~130-150 to punch Lightning Bolt/Lava Burst through common nature resistance (Mark of the Wild, Aspect, resist gear, shaman totems). Situational, gemmed only if you face heavy resist teams." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No cap — reduces Lightning Bolt cast time so you get shocks/casts off inside kill windows; valuable but secondary to resilience and stamina for staying alive." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 202, unit: "rating", note: "16% is the raw cap vs a +3 boss, but you supply Totem of Wrath (+3%) and take Elemental Precision (+3%) and Nature's Guidance (+3%) — ~9% innate (Draenei Heroic/Inspiring Presence adds +1%), so you only carry ~4% (~51 rating) on gear, far below the coarse 202. Cap it first: misses are your biggest DPS loss." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap — the top DPS stat once hit-capped. Shortens Lightning Bolt casts; the 1.0s GCD floor is effectively unreachable in Season-2 gear, so treat it as an uncapped soft priority." },
      { stat: "Spell Crit", cap: 0, unit: "rating", note: "No cap — high value via Elemental Focus (Clearcasting) and Lightning Overload procs. Stack after haste; roughly on par depending on gear, confirm weights in wowsims/tbc." },
      { stat: "Spell Penetration", cap: 0, unit: "rating", note: "No cap and not needed on most bosses — only a handful of encounters carry nature resistance. Do not gear it as a raw stat priority." },
    ],
  },
  "shaman/enhancement": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — enhancement is a burst spec, so most run little-to-no resilience and lean on kiting/purge; ~350+ only if you want survivability in 3v3/5v5." },
      { stat: "Hit Rating (yellow, vs players)", cap: 79, unit: "rating", note: "5% (79 rating) caps Stormstrike and Shock misses against same-level players; Nature's Guidance (+3%) and Dual Wield Spec talents plus Draenei Heroic Presence usually cover this without gemming hit." },
      { stat: "Hit Rating (white dual-wield, vs players)", cap: 379, unit: "rating", note: "24% (≈379 rating) is the white DW cap vs players — unreachable, but unlike other melee, hit past 5% still adds value because landed white swings drive Windfury procs and Flurry uptime for your burst windows." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No PvP cap, but expertise is valuable against dodge/parry classes (rogues, druids, warriors) so your Stormstrike and white hits are not avoided during a kill attempt." },
    ],
    pve: [
      { stat: "Hit Rating (yellow / special cap)", cap: 142, unit: "rating", note: "9% (142 rating) caps Stormstrike, Windfury and Shock (physical portion) misses vs a +3 boss; Nature's Guidance (+3%) and Draenei Heroic Presence (+1%) reduce how much you carry on gear, so effective gear need is lower." },
      { stat: "Hit Rating (white dual-wield cap)", cap: 442, unit: "rating", note: "28% (≈442 rating) is the white DW miss cap vs a boss — enhancement genuinely keeps stacking hit well past 9% (unlike most melee) because every white swing that lands feeds Windfury procs and Flurry, so hit stays a top DPS stat, not a stat you stop at 142." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (≈103 rating) removes the boss's 6.5% dodge when attacking from behind; enhancement has no expertise talent, and Dual Wield Spec + Nature's Guidance help you reach it, cutting dodged Stormstrikes and white swings." },
      { stat: "Spell Hit (Shocks)", cap: 164, unit: "rating", note: "Earth/Frost Shock are spells and hit the 16% spell cap (~202 rating, reduced ~3% by Nature's Guidance so ≈164 on gear) — but shocks are a tiny share of damage, so this is never a gearing target, only a note." },
    ],
  },
  "shaman/restoration": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — stack as much as gear allows; it cuts enemy crit chance, crit damage and DoT damage (and softens Mana Burn), which is what keeps you alive through kill attempts." },
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "~4% (about 50 rating) covers the base spell miss on your OFFENSIVE casts — Earth/Frost Shock (kick/kite), Purge, Hex and Wind Shear interrupts can miss, so a little hit makes your utility reliable; heals themselves never miss." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap and low priority in arena — resilience and survival come first, but any haste shaves Lesser Healing Wave / Chain Heal cast time so you get a heal off between interrupts and kicks." },
      { stat: "Healing Power / mp5", cap: 0, unit: "rating", note: "Soft targets — enough +healing to make Lesser Healing Wave land hard, plus Water Shield/mp5/Mana Tide for longevity in drawn-out 5v5 and RBG games." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 0, unit: "rating", note: "No hit needed — direct heals cannot miss, so never gem or gear spell hit for raid healing." },
      { stat: "Healing Power", cap: 0, unit: "rating", note: "Primary throughput stat — stack +healing first; it scales Chain Heal, Lesser Healing Wave and Healing Wave and has no cap." },
      { stat: "mp5", cap: 0, unit: "rating", note: "Scale to the fight length — combined with Water Shield, Mana Tide Totem and Mana Spring, take enough mp5 to heal the whole encounter without going dry." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap; the only 'cap' is the 1.0s GCD floor (~780 rating, unreachable outside Bloodlust). Valuable as a secondary — it lowers Chain Heal cast time and Sunwell-geared shamans stack it heavily." },
      { stat: "Spell Crit", cap: 0, unit: "rating", note: "Soft secondary — Tidal Mastery (+2% heal crit) and Improved Water Shield make crit worthwhile for burst healing and instant Water Shield refreshes, but it ranks below +healing and mp5." },
    ],
  },
  "warlock/affliction": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target; reduces incoming crit chance, crit damage and DoT damage. Affliction is durable, but ~350-490 resilience keeps you alive through melee trains while you drain-tank." },
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "4% (~50 rating) caps misses on same-level players and only matters for Shadow Bolt/Nightfall procs — Suppression already makes your DoTs, Fear, Death Coil and drains hit-capped, so gem/gear almost no pure hit in arena." },
      { stat: "Spell Penetration", cap: 0, unit: "rating", note: "No hard cap — the real PvP lever: ~130 counters common Shadow Resistance (Aura, Mark of the Wild, racials, resist gear) so your Corruption/UA/Haunt aren't partially resisted; scale it to what you actually face." },
    ],
    pve: [
      { stat: "Spell Hit (Affliction DoTs, with Suppression 5/5)", cap: 76, unit: "rating", note: "The working cap for your Corruption/UA/Curse/Siphon/Seed: 16% - 10% from Suppression = 6% (~76 rating). With a Shadow Priest's Misery (+3%) your DoTs are effectively hit-capped from talents alone (~38 rating)." },
      { stat: "Spell Hit (Shadow Bolt / Destruction)", cap: 202, unit: "rating", note: "Suppression does NOT cover Shadow Bolt (incl. Nightfall procs), Immolate or Shadowfury — they need the full 16% (202 rating). Misery drops this to 13% (~164). This split is why top afflocks still chase deep hit despite Suppression." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap — highest-value stat after hit; shortens Shadow Bolt/Drain casts and lets you refresh DoTs faster. Bloodlust and Nightfall procs make raw haste rating a strong secondary." },
      { stat: "Spell Crit", cap: 0, unit: "rating", note: "No hard cap — soft target valued below hit and haste; feeds Ruin/Shadow Embrace builds and Nightfall uptime but DoTs (except with certain talents) don't crit, so it scales weaker than for Destruction." },
    ],
  },
  "warlock/demonology": {
    pvp: [
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "4% (~50 rating) removes the base spell miss vs a same-level player, capping Shadow Bolt/Incinerate/Immolate and Fear resists — Demonology has no Suppression, so it needs the full 4% on gear (a Draenei in party covers 1% of it)." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target; ~350+ blunts crit and Corruption/Immolate DoT damage taken, but Soul Link/Fel Domination Demo leans on pet survivability and Master Demonologist over stacking resilience." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No cap — soft stat only; useful to shorten Shadow Bolt casts but ranks below Stamina/Resilience for arena survival." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 202, unit: "rating", note: "16% spell-hit cap vs a +3 raid boss for Shadow Bolt/Incinerate — Demonology has NO hit talents and Suppression is Affliction-only, so it must reach the full cap on gear; a Draenei's Heroic Presence (+1%) is the only external reducer, lowering it to 15% (~189 rating)." },
      { stat: "Spell Haste", cap: 0, unit: "rating", note: "No hard cap — third priority after hit and spell damage; each point shortens Shadow Bolt casts, no breakpoint to chase." },
      { stat: "Spell Crit", cap: 0, unit: "rating", note: "No cap — soft target; scales Ruin/Devastation and (via Demonic Knowledge/Sacrifice builds) pet contribution, taken after hit is capped and alongside spell damage." },
    ],
  },
  "warlock/destruction": {
    pvp: [
      { stat: "Spell Hit (vs players)", cap: 50, unit: "rating", note: "4% (~50 rating) caps spell misses vs a same-level player — the raid 16% cap does not apply. Destruction has NO self-hit talent, so you carry this on gear (a Draenei's aura covers 1%); do not gem past it." },
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft-stack it; ~350 rating is a 2v2 entry point and ~490+ is competitive, cutting incoming crit chance, crit damage and DoT/Immolate damage." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No PvP cap and rarely itemized — burst comes from Shadow Bolt/Conflagrate/Shadowburn nukes, so favor spell power and crit over haste in arena." },
    ],
    pve: [
      { stat: "Spell Hit", cap: 202, unit: "rating", note: "16% (202 rating) hits the 99% cap vs a +3 boss. Destruction has no hit talent (Suppression only aids Affliction spells), so gear ALL of it: a raid Shadow Priest's Misery cuts the need to 13% (~164) and a Draenei's +1% aura to 12% (~151); with both, ~151 rating." },
      { stat: "Spell Crit", cap: 0, unit: "%", note: "No cap — uniquely strong for Destro because Ruin makes crits deal 200% (vs 150%); after hit and spell power, crit is the top scaling stat." },
      { stat: "Spell Haste", cap: 0, unit: "%", note: "No hard cap (1.0s GCD floor at ~50% haste is unreachable in S2). Gains value late as other stats fill in; take after hit, spell power and crit." },
    ],
  },
  "warrior/arms": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — a burst spec that lives on Mortal Strike + Overpower windows; ~350 is the 2v2 entry point and 490+ is competitive to blunt enemy crit and MS pressure." },
      { stat: "Hit Rating (vs players)", cap: 79, unit: "rating", note: "5% (~79 rating) caps yellow special misses (Mortal Strike, Slam, Overpower) against same-level players; a 2H Arms build has no dual-wield white penalty, and Precision (up to 3% in the Fury tree) plus Weapon Mastery's -2% dodge cut how much you carry on gear." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "Optional soft stat in PvP — reduces enemy dodge/parry so your Mortal Strikes land more often; Weapon Mastery already grants 2% innately, so gear/gem it only if you have hit handled and want reliability." },
    ],
    pve: [
      { stat: "Hit Rating", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow special misses vs a +3 boss; because Arms swings a single 2H there is NO dual-wield white cap — white and yellow share the same 9%. Precision (Fury tree) lowers the gear need to 127/110/95 at 1/2/3 points." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (6.5% dodge, ~102 rating) removes all dodge from behind; Weapon Mastery's innate 2% dodge reduction means you only need ~4.5% (~18 expertise / ~71 rating) from gear to fully cover it. Parry only matters if you're tanking from the front." },
      { stat: "Spell Hit / Glancing", cap: 0, unit: "%", note: "No spell hit applies. Glancing blows (~25% of white damage, ~24% chance vs a +3 boss) cannot be removed by any amount of hit or expertise — do not try to 'cap them out.'" },
    ],
  },
  "warrior/fury": {
    pvp: [
      { stat: "Hit Rating (vs players)", cap: 79, unit: "rating", note: "5% (79 rating) caps yellow special-attack misses (Bloodthirst/Whirlwind/Slam) vs same-level players, but 3/3 Precision (a core Fury talent) already supplies 3%, so you only need ~32 rating (2%) on gear." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No hard cap in PvP — players dodge/parry ~5% each, so expertise steadily reduces avoided melee hits; a few points are valuable but never a priority over resilience and Strength." },
      { stat: "Resilience", cap: 490, unit: "rating", note: "No hard cap — soft target; ~350 is the 2v2 entry point and 490+ is competitive, cutting the chance and damage of crits taken (crucial for a spec that lives in melee range)." },
      { stat: "White Hit (dual-wield)", cap: 0, unit: "%", note: "Dual-wield white swings still miss heavily vs players (base 24% before talents); it is not a chased cap in arena, but any hit past the yellow cap keeps Bloodthirst-enabling white damage and Flurry uptime flowing." },
    ],
    pve: [
      { stat: "Hit Rating (yellow cap)", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow special misses vs a +3 boss, but 3/3 Precision covers 3%, so only ~95 rating (6%) is needed on gear — this is the first DPS goal." },
      { stat: "White Hit (dual-wield soft target)", cap: 0, unit: "%", note: "Dual-wield white swings need ~28% total to cap (impractical); because most Fury damage is white, top warriors DO chase hit well past the 9% yellow cap — aim ~11-13% total hit and accept the remaining white misses." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (~103 rating) removes a boss's 6.5% dodge from behind; each point cuts dodge/parry 0.25%. Human/Orc weapon-racial expertise counts toward this — take after the yellow hit cap." },
      { stat: "Weapon Skill", cap: 0, unit: "%", note: "No rating stat — reaching 350 weapon skill (racial expertise weapons or gear) reduces glancing-blow penalty and enemy dodge; relevant only as context for why matching weapon type to your race matters." },
    ],
  },
  "warrior/protection": {
    pvp: [
      { stat: "Resilience", cap: 0, unit: "rating", note: "No hard cap — soft target; stack it (400+) to blunt burst since it cuts crit chance, crit damage and DoT damage taken. Prot is a niche arena flag-carrier/peeler, so survival (Stamina + resilience) outweighs any offensive cap." },
      { stat: "Hit Rating (vs players)", cap: 79, unit: "rating", note: "5% (~79 rating) caps yellow special-attack misses (Devastate, Shield Slam, Revenge) against same-level players; white one-hand misses stay ~5% and are not worth chasing behind a shield." },
      { stat: "Expertise", cap: 0, unit: "expertise", note: "No meaningful target in PvP — players' dodge/parry is low and unpredictable; do not gem or gear expertise as a PvP prot warrior." },
      { stat: "Defense (crit reduction)", cap: 0, unit: "defense", note: "Soft only — defense skill lowers players' crit chance against you, but resilience is the far more efficient PvP crit stat; the 490 raid crit-immunity number does NOT apply against players." },
    ],
    pve: [
      { stat: "Defense (crit immunity)", cap: 490, unit: "defense", note: "490 defense skill (base 350 + 140 skill ≈ 332 defense rating) makes a level-73 boss unable to crit you, removing the lethal 5.6% crit — the single mandatory tanking goal. Warriors have NO crit-immunity talent (unlike Druids/Paladins), so the full 490 must come from gear/enchants/resilience, no shortcuts." },
      { stat: "Uncrushable (avoidance)", cap: 102.4, unit: "avoidance", note: "Miss + Dodge + Parry + Block must total 102.4% to push crushing blows (150% hits) off a level-73 boss's table; since Shield Block adds +75% block for its duration, you only need ~27.4% from miss/dodge/parry/passive block off gear and time Shield Block to stay uncrushable while actively tanking." },
      { stat: "Hit Rating", cap: 142, unit: "rating", note: "9% (142 rating) caps yellow special-attack misses vs a +3 boss — a pure threat/uptime stat (no missed taunts, Shield Slams or Revenges), taken only after crit immunity and uncrushability are secured." },
      { stat: "Expertise", cap: 26, unit: "expertise", note: "26 expertise (6.5% dodge, ≈103 rating) removes the boss's dodge for steadier threat; the hard cap of 56 (14% parry, ≈221 rating) also stops parry-haste but is unreachable in practice — 26 is the real goal." },
      { stat: "Block Value", cap: 0, unit: "rating", note: "No hard cap — soft threat target; Shield Slam scales directly with block value, so ~250+ block value is a common Karazhan-era benchmark once survival stats are met." },
    ],
  },
};

/** A ranged-DPS or healer spec that deals/relies on spell damage/hit. */
function isCasterDps(classSlug: string, role: Role): boolean {
  return role === "Ranged DPS" && classSlug !== "hunter";
}

/** Physical attacker: any melee, plus hunters (ranged physical). */
function isPhysical(classSlug: string, role: Role): boolean {
  return role === "Melee DPS" || classSlug === "hunter";
}

// Coarse archetype fallback — used only if a spec is missing from SPEC_CAPS.
function archetypeCaps(
  classSlug: string,
  role: Role,
  content: "pvp" | "pve",
): StatCap[] {
  if (content === "pvp") {
    const caps: StatCap[] = [
      {
        stat: "Resilience",
        cap: 490,
        unit: "rating",
        note: "No hard cap — ~350 is the 2v2 entry point, 490+ is competitive. Reduces crit chance, crit damage and DoT damage taken.",
      },
    ];
    if (isCasterDps(classSlug, role)) {
      caps.push({
        stat: "Spell Hit (vs players)",
        cap: 4,
        unit: "%",
        note: "4% (~50 rating) caps spell misses against same-level players — the raid 16% boss cap does not apply. Hit talents and Misery can cover most of it, so gear little pure hit in arena.",
      });
    } else if (classSlug === "hunter") {
      caps.push({
        stat: "Hit Rating (vs players)",
        cap: 79,
        unit: "rating",
        note: "5% (~79 rating) caps ranged special-shot misses (Aimed/Arcane Shot) against same-level players. Expertise does nothing for ranged attacks — never gem or gear it as a hunter.",
      });
    } else if (isPhysical(classSlug, role)) {
      caps.push({
        stat: "Hit Rating (vs players)",
        cap: 79,
        unit: "rating",
        note: "5% (~79 rating) caps yellow special-attack misses against same-level players. White dual-wield misses stay high but matter less in arena.",
      });
    }
    return caps;
  }

  if (isCasterDps(classSlug, role)) {
    return [
      {
        stat: "Spell Hit",
        cap: 202,
        unit: "rating",
        note: "16% cap for a raid boss (+3 levels). Draenei Heroic Presence, Shadow Priest's Misery, and hit talents lower how much you need on gear.",
      },
    ];
  }
  if (classSlug === "hunter") {
    return [
      {
        stat: "Ranged Hit Rating",
        cap: 142,
        unit: "rating",
        note: "9% (142 rating) caps ranged special-shot misses against a raid boss (+3 levels). The Draenei hit aura lowers how much you carry on gear. Expertise does nothing for ranged attacks — do not gear it.",
      },
    ];
  }
  if (isPhysical(classSlug, role)) {
    return [
      {
        stat: "Hit Rating",
        cap: 142,
        unit: "rating",
        note: "9% special-attack (yellow) cap when striking a boss from behind.",
      },
      {
        stat: "Expertise",
        cap: 26,
        unit: "expertise",
        note: "26 expertise (≈102 rating) removes a boss's 6.5% dodge — each point of expertise cuts dodge/parry by 0.25%. Parry only happens from the front, so staying behind means you only need to beat dodge.",
      },
    ];
  }
  if (role === "Tank") {
    return [
      {
        stat: "Defense (crit immunity)",
        cap: 490,
        unit: "defense",
        note: "490 defense skill makes you uncrittable by a raid boss (removes the 5.6% crit chance). Resilience or class talents (e.g. a Druid's Survival of the Fittest) substitute for part of it — this is the first tanking goal before any other stat.",
      },
      {
        stat: "Hit Rating",
        cap: 142,
        unit: "rating",
        note: "9% (142 rating) yellow-attack cap. Not a survival stat, but it sharply steadies threat by removing missed taunts and abilities.",
      },
      {
        stat: "Expertise",
        cap: 26,
        unit: "expertise",
        note: "26 expertise (≈102 rating) removes boss dodge; higher values chip at frontal parry to reduce parry-haste. Threat/uptime stat, taken after crit immunity.",
      },
    ];
  }
  // Healer PvE — no hit cap.
  return [
    {
      stat: "Spell Hit",
      cap: 0,
      unit: "rating",
      note: "Healers need no hit — heals cannot miss. Stack +healing, then crit/haste and enough mp5 to last the fight.",
    },
  ];
}

export function getStatCaps(
  classSlug: string,
  specSlug: string,
  role: Role,
  content: "pvp" | "pve",
): StatCap[] {
  const override = SPEC_CAPS[`${classSlug}/${specSlug}`];
  if (override) return override[content];
  return archetypeCaps(classSlug, role, content);
}
