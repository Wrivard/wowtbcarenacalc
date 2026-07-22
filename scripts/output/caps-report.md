# Stat-caps correctness pass — all 28 specs

The caps model was archetype-only (resolved by role, not spec), which produced wrong or incomplete caps. Each spec was researched against TBC 2.4.3 sources (Wowhead, wowsims, Warcraft Tavern, Icy-Veins) and now has an explicit per-spec entry in `data/caps.ts` (SPEC_CAPS). Below: what changed per spec.

## druid/balance

The archetype (caster-dps) model outputs only a flat PvE 202 spell-hit cap and a PvP 4%/50-rating hit line, and omits everything spec-specific. It misses: (1) Balance of Power is 4% spell hit, so the real PvE gear target is 12%/152 rating, not 202; (2) in arena that same 4% fully covers the player spell-miss, so PvP gear-hit need is effectively zero — the archetype's '4%/50 rating' overstates it; (3) it invites the common error that Improved Faerie Fire helps hit — in 2.4.3 IFF only boosts melee/ranged hit on the target, giving the moonkin's spells nothing; (4) Totem of Wrath (3%) and Draenei aura (1%) further reduce the gear requirement; (5) it says nothing about haste/crit being uncapped soft stats.

Sources: <https://www.wowhead.com/tbc/spell=33602/improved-faerie-fire>, <https://www.wowhead.com/tbc/spell=33831/balance-of-power>, <https://www.warcrafttavern.com/tbc/guides/pve-balance-druid-boomkin-dps-stat-priority/>, <https://boosting-ground.com/wow-classic/guides/the-burning-crusade-guides/tbc-balance-druid-dps-guide>, <https://github.com/wowsims/tbc>

## druid/feral-bear

The archetype 'tank' model hard-codes a 490 Defense crit-immunity target, which is WRONG for bears: leather has almost no defense, so feral tanks reach uncrittable through the Survival of the Fittest talent (3% flat) plus only ~2.6% more from Resilience (~67 resilience rating) or Defense (~156 defense rating) — not 490 defense skill. The archetype model also omits the SotF talent entirely, omits that expertise is doubly valuable for bears (front-facing fights reduce parry too), and omits the Stamina/Agility/Armor soft-stacking that actually defines bear gearing after the two threat caps. It also gives no honest PvP entry — bear 'tanking' in arena is peeling in bear form, where resilience + SotF crit-immunity matters but hit/expertise caps do not.

Sources: <https://boosting-ground.com/wow-classic/guides/the-burning-crusade-guides/tbc-feral-druid-tank-overview>, <https://www.icy-veins.com/tbc-classic/feral-druid-tank-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-feral-druid-tank-stat-priority/>, <https://wowwiki-archive.fandom.com/wiki/BC_tanking_equipment_(druid)>

## druid/feral-cat

The melee-physical archetype says white dual-wield swings need ~24% hit and are 'not worth chasing.' That is FALSE for feral cats: in cat form the druid attacks with a single weapon, so there is no dual-wield miss penalty and both white and yellow attacks are fully hit-capped at the same 9% (142) — there is no separate deep white-hit tier like a rogue has. The 9% hit and 26 expertise numbers the archetype gives are otherwise correct, but the reasoning note must be corrected. PvP is also cleaner than the generic 'white misses stay high' line — the single-weapon model means 5% (79) caps everything, and expertise is genuinely dead weight in arena (worth an explicit no-chase entry).

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-feral-druid-dps-stat-priority/>, <https://www.icy-veins.com/tbc-classic/feral-druid-dps-pve-stat-priority>, <https://www.wowhead.com/tbc/guide/classes/druid/feral/dps-stat-priority-attributes-pve>, <https://www.lootxphub.com/tbc-classic-feral-druid-dps-pvp-guide-best-talents-gear-and-arena-strategies/>

## druid/restoration

The coarse healer archetype outputs only "Spell Hit: 0 (heals can't miss)" for PvE and "Resilience: 490" for PvP — technically true but it misses everything spec-specific. For PvE it omits Resto's signature Spell Haste soft cap (~242 rating), a real gearing target that exists because of Lifebloom rolling and is unique among TBC healers, and it fails to flag that Spell Crit is near-worthless because HoTs cannot crit. For PvP its blanket "healers need no hit" is wrong for Resto: Cyclone, Entangling Roots and Hibernate are core arena tools that DO miss, so a ~4% spell-hit target (~50 rating, up to ~76 vs spell-resist races) matters and comes entirely from gear since Resto has no hit talent. The archetype model captures neither the haste breakpoint, the crit caveat, nor the offensive/CC hit need.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-restoration-druid-healing-stat-priority/>, <https://www.icy-veins.com/tbc-classic/restoration-druid-healer-pve-stat-priority>, <https://www.wowhead.com/tbc/guide/classes/druid/healer-stat-priority-attributes-pve>, <https://www.skill-capped.com/wowarticles/tbc/guides/restoration-druid-pvp-guide/>, <https://wowwiki-archive.fandom.com/wiki/Spell_hit>, <https://grokipedia.com/page/Hit_cap_The_Burning_Crusade_Classic>

## hunter/beast-mastery

The archetype model gets the 142 headline number right but its note is wrong for BM specifically: it credits 'Surefooted, a Survival talent, +3% hit' as lowering the gear requirement, but a Beast-Mastery hunter does NOT take Surefooted (it lives in the Survival tree) and BM's own tree has no hit talent at all — so a BM hunter carries the FULL 9% from gear, reduced only by raid buffs (Improved Faerie Fire +3%, Draenei Heroic Presence +1%) down to ~79 rating. The archetype model also omits the hunter-specific insight that the 142 cap uniquely covers both white (auto) and yellow (special) shots at once because ranged has no dual-wield penalty — there is no separate higher white cap like rogues face. Finally it omits Haste as an explicit no-hard-cap soft-scaling stat with rotation clip breakpoints, which is a defining BM gearing consideration.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-beast-mastery-hunter-stat-priority/>, <https://www.icy-veins.com/tbc-classic/beast-mastery-hunter-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-beast-mastery-hunter-rotation-cooldowns-abilities/>, <https://www.icy-veins.com/tbc-classic/beast-mastery-hunter-dps-pve-rotation-cooldowns-abilities>

## hunter/marksmanship

The archetype model's single hunter entry is close but has three spec-level errors/omissions for Marksmanship. (1) Its PvE note credits Surefooted (+3% hit) as a reducer — that is a SURVIVAL talent, not available to a MM build; MM's only in-house reducers are the Draenei aura (1%) and the party's Balance Druid Improved Faerie Fire (3%), both external. (2) It never states the key hunter-specific fact that distinguishes them from rogues: ranged attacks have no dual-wield penalty and cannot be parried, so the white auto-shot cap and the yellow special cap CONVERGE at 9% (142) — there is no separate ~24% white cap to worry about, so 142 truly caps everything. (3) It omits the soft-target DPS stats that actually drive MM gearing after the hit cap (Armor Penetration in later tiers, Crit, Haste) and the honest 'expertise is inert' entry. PvP is essentially correct (79 rating / 5%) but should note ranged is dodgeable-but-not-parryable and that MM carries hit on gear since it has no hit talent.

Sources: <https://www.icy-veins.com/tbc-classic/marksmanship-hunter-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-marksmanship-hunter-stat-priority/>, <https://wowwiki-archive.fandom.com/wiki/Hit>, <https://github.com/wowsims/tbc>

## hunter/survival

The archetype model returns only a single flat 142-rating ranged-hit cap and an Expertise entry it labels 'do not gear.' For Survival specifically: (1) Surefooted (3/3) is a CORE baseline talent, not an optional 'a Survival talent' aside, so the real on-gear hit requirement is ~6% (~95 rating), dropping to ~5% (~79) with Draenei aura — worth stating explicitly since it's easily reached and over-gearing hit wastes budget. (2) Expertise is fully inert (should be cap 0, not a caveated entry implying it half-matters). (3) The archetype omits the soft targets that actually drive Survival gearing — agility (primary, also powers the Expose Weakness raid buff), crit, and haste — none of which have hard caps but all belong in a spec-correct priority table. PvP likewise: Surefooted cuts the 79-rating player cap down to ~32 on gear.

Sources: <https://www.icy-veins.com/tbc-classic/survival-hunter-dps-pve-stat-priority>, <https://forum.warmane.com/showthread.php?t=367815>, <https://barrens.chat/viewtopic.php?t=13084>, <https://dev.gnarlyguides.com/tbc/guides/pve-survival-hunter-guide-tbc-2-4-3/>, <https://www.skill-capped.com/wowarticles/tbc/guides/hunter-pvp-guide/talents/>

## mage/arcane

The archetype (caster-DPS) model shows a flat 202-rating (16%) PvE spell-hit cap and a 4%/~50-rating PvP hit cap, treating arcane like any caster. That is wrong for this spec: Arcane Focus 5/5 grants +10% hit on Arcane spells (Arcane Blast/Missiles/Explosion — the entire arcane kit), so the real PvE gear cap is just 6% = 76 rating (≈38 with Misery), and in PvP the talent alone exceeds the 4% player cap, meaning ZERO hit on gear. The archetype model also omits haste entirely, which is arcane's primary scaling stat (no hard cap, 1.0s GCD floor), and omits crit as a soft post-hit target.

Sources: <https://www.wowhead.com/tbc/spell=12840/arcane-focus>, <https://www.warcrafttavern.com/tbc/guides/pve-arcane-mage-stat-priority/>, <https://www.icy-veins.com/tbc-classic/arcane-mage-dps-pve-stat-priority>, <https://nottoolateforclassic.com/mage/arcane/>

## mage/fire

The archetype model treats fire as generic caster-DPS: flat 202 spell-hit (PvE) and 4%/50-rating spell-hit (PvP), and shows nothing else. That misses three fire-specific realities. (1) Fire is near-universally specced 3/3 Elemental Precision (+3% hit), so the real gear hit cap is 164 rating in raids and effectively ~1%/covered-by-talent in PvP — the 202/50 numbers overstate what you actually gear. (2) Crit is the load-bearing fire stat (Ignite + Combustion) with no hard cap; the archetype model lists no crit guidance at all. (3) Haste is a soft target with a practical floor under raid haste stacking. PvP-side, resilience should read as a heavy soft-stack for a squishy cloth caster, not a generic 490 line.

Sources: <https://www.icy-veins.com/tbc-classic/fire-mage-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-fire-mage-stat-priority/>, <https://www.warcrafttavern.com/tbc/guides/pvp-fire-mage/>, <https://nottoolateforclassic.com/mage/fire/>

## mage/frost

The archetype model shows a flat 202-rating PvE spell-hit cap and a 4% PvP cap, and it ignores Elemental Precision entirely. For frost specifically, EP's +6% Frostbolt hit (the TBC bug present in Classic) means the real PvE gear target is ~127 rating, not 202 — dropping to ~89 with one +3% hit buff (Totem of Wrath / Misery) and ~76 with both a +3% and a +1% (Inspiring/Heroic Presence) buff. In PvP, Frostbolt is already fully hit-capped by EP alone (0 gear hit needed vs the 4%/50 cap), which the coarse model doesn't convey. The archetype set also omits spell penetration (a real Frost-school soft target vs resistances) and the crit-centric Shatter priority that defines the spec.

Sources: <https://www.icy-veins.com/tbc-classic/frost-mage-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-frost-mage-stat-priority/>, <https://www.icy-veins.com/tbc-classic/frost-mage-pvp-guide>, <https://www.skill-capped.com/wowarticles/tbc/guides/frost-mage-pvp-guide/>, <https://github.com/Atlantiss/NetherwingBugtracker/issues/2556>, <https://wowwiki-archive.fandom.com/wiki/Spell_hit>

## paladin/holy

The archetype model collapses this spec to a single line — PvE shows only "Spell Hit 0 / stack +healing", and PvP shows only a generic Resilience 490 entry. That is directionally right (holy paladin truly has no hit cap) but it omits the spec-specific soft targets a player actually tunes: that Stamina/Intellect eHP beats throughput in arena, that spell haste is effectively worthless for both contents because Flash of Light already sits at the GCD floor, and that spell crit is a special case here — it is not just throughput but a mana-return mechanic through Illumination plus a spell-power source through Holy Guidance. It also frames Resilience as a hard 490 target when for a healer it is purely a "fit what you can" soft stat behind Stamina.

Sources: <https://www.wowhead.com/tbc/guide/classes/paladin/holy/healer-stat-priority-attributes-pve>, <https://www.icy-veins.com/tbc-classic/holy-paladin-healer-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-holy-paladin-stat-priority/>, <https://www.iqgaming.org/tbcholypaladin>, <https://www.wowhead.com/tbc/spell=31834/lights-grace>

## paladin/protection

The current archetype-only 'Tank' block outputs just Defense 490, Hit 142, Expertise 26 and misses two paladin-defining caps. (1) It omits AVOIDANCE / uncrushable entirely: prot paladins must reach 102.4% combined Miss+Dodge+Parry+Block (uniquely via Holy Shield's block-chance buff) to eliminate crushing blows — this is the core of the spec's survivability and the archetype model has no concept of it. (2) It omits SPELL HIT (202 rating / 16%): paladin threat is overwhelmingly holy/spell damage (Consecration, Holy Shield, Judgement, Seal procs), so spell hit is a bigger threat lever than melee hit — the generic tank block only lists melee hit. It also fails to note that expertise is worth more to paladins than to other tanks because they frequently tank from the front (AoE grinding), where parry and block also apply, not just dodge.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-protection-paladin-tank-stat-priority/>, <https://www.icy-veins.com/tbc-classic/protection-paladin-tank-pve-stat-priority>, <https://www.wowhead.com/tbc/guide/classes/paladin/tank-stat-priority-attributes-pve>, <https://www.lootxphub.com/tbc-classic-protection-paladin-stat-guide-priority-attributes-and-caps/>

## paladin/retribution

The coarse melee-physical archetype returns only PvE Hit 142 + Expertise 26, and PvP Hit 79 — and mislabels the details for this spec. Corrections: (1) Ret uses a 2H, so the archetype's "dual-wield white ~24%" note is simply wrong — white single-wield sits near the 9% special miss and there is no 24% goal. (2) The archetype omits that Judgement and Seals ride the MELEE hit table, so melee hit (not spell hit) covers ret's whole rotation; a separate "spell hit doesn't apply" clarification is needed to stop players over-gearing spell hit. (3) It ignores the Precision talent (+3% melee hit), which lowers the real gear hit requirement to ~95 rating (PvE) / ~32 rating (PvP). (4) It ignores the Human Weapon Expertise racial that drops the expertise cap to 21 with sword/mace. (5) In PvP the archetype implies expertise still matters; for ret it effectively does not, so a 0/"don't gear it" entry is the honest answer. (6) Adds crit as the explicit soft priority the archetype never surfaces.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-retribution-paladin-stat-priority/>, <https://www.icy-veins.com/tbc-classic/retribution-paladin-dps-pve-stat-priority>, <https://www.wowhead.com/tbc/guide/classes/paladin/retribution/dps-stat-priority-attributes-pve>, <https://www.warcrafttavern.com/tbc/guides/paladin-seals-judgements/>, <https://wowsims.github.io/tbc/retribution_paladin/>, <https://www.icy-veins.com/tbc-classic/retribution-paladin-dps-pve-spell-summary>

## priest/discipline

The coarse healer archetype returns exactly one line in each mode: PvE shows only a single \"no hit needed\" entry, and PvP shows only Resilience. That is wrong-by-omission for disc specifically. PvP misses the ~3% (≈38 rating) offensive spell-hit target that lets Mana Burn / SW:Death / SW:Pain actually land on same-level players (disc has no hit talents to cover it), the situational Spell Penetration need vs resistance auras, and the fact that Resilience has no hard cap (the archetype hard-codes 490 as if it were a cap). PvE keeps the correct \"heals can't miss\" verdict but omits the one genuine hard cap disc has — the 788.5-rating / 50%-haste GCD floor — and omits that crit is disc's explicit #2 stat and haste/mp5 are uncapped soft targets rather than a single flat 'no hit' statement.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-discipline-healing-priest-stat-priority/>, <https://www.icy-veins.com/tbc-classic/discipline-priest-pvp-guide>, <https://www.icy-veins.com/tbc-classic/holy-priest-healer-pve-stat-priority>, <https://www.wowhead.com/tbc/spell=8129/mana-burn>, <https://wowtbc.gg/pvp-class-guides/discipline-priest/>

## priest/holy

The archetype healer model returns a single PvE row ("no hit needed") and, in PvP, only the generic DPS-oriented Resilience row — it is technically correct that holy priests have no hit cap but it hides everything that actually drives holy priest gearing. For PvE it omits the real soft targets: spell haste (with the 1.0s GCD floor at 50% ≈ 788 rating), crit's synergy with Holy Concentration mana regen and Inspiration, the ~2000 healing-power checkpoint, and mp5/Spirit longevity. For PvP it misses two things: healers want a higher resilience target (~400+ competitive) than the DPS note implies, and a holy priest DOES have a small, real spell-hit consideration — heals can't miss, but Psychic Scream, Mana Burn, Shadow Word: Death and offensive Dispel Magic can be resisted, so ~4% (≈50 rating) caps those control/utility spells even though it stays low priority.

Sources: <https://www.wowhead.com/tbc/guide/classes/priest/healer-stat-priority-attributes-pve>, <https://www.wowhead.com/tbc/guide/classes/priest/healer-pvp-arena>, <https://www.warcrafttavern.com/tbc/guides/pve-holy-priest-healing-stat-priority/>, <https://www.icy-veins.com/tbc-classic/holy-priest-healer-pve-stat-priority>

## priest/shadow

The archetype model shows a single PvE cap of 202 rating (flat 16%) and a PvP cap of 4%/~50 rating. Both are wrong for shadow priest. Shadow Focus (5/5) grants 10% shadow spell hit, so the real PvE gear requirement is only 6% = 76 rating (63 with a Draenei aura), not 202 — a ~130-rating overstatement that would make players badly over-gear hit. In PvP the same 10% talent hit fully covers the 4% same-level miss, so a shadow priest needs 0 hit from gear, not the archetype's 4%/50. The model also omits that haste and crit are uncapped priority stats and that Resilience/Stamina, not hit, drive arena itemization for this spec.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-shadow-priest-stat-priority/>, <https://www.icy-veins.com/tbc-classic/shadow-priest-dps-pve-stat-priority>, <https://www.wowhead.com/tbc/spell=15328/shadow-focus>, <https://www.wowhead.com/tbc/guide/classes/priest/shadow/dps-stat-priority-attributes-pve>

## rogue/assassination

The melee-physical archetype outputs only two PvE caps — special Hit 142 and Expertise 26 — and its note claims the white cap is ~24% "not worth chasing." For Assassination this is materially incomplete and partly wrong: (1) it omits the POISON hit cap entirely, which is the single most important hit target for Mutilate because poisons are ~30-35% of damage, so top assassins stack hit far past 142 toward ~17%/~268 rating — the archetype's 142 reads as a stopping point when it is really a floor. (2) The white dual-wield cap for a no-Precision assassin is ~28% (~442 rating), not 24% (24% is the Combat/Precision-adjusted figure). (3) It never mentions Precision, the 5% hit splash that every real Mutilate build takes and which actually sets the on-gear special (~63) and poison (~189) requirements. The 142 special and 26 expertise numbers themselves are correct for the spec. PvP is nearly right (Resilience 490 + 79 yellow cap) but the archetype omits poison-hit relevance and expertise as a soft anti-dodge target.

Sources: <https://www.warcrafttavern.com/tbc/guides/rogue-hit-expertise/>, <https://www.warcrafttavern.com/tbc/guides/rogue-stats/>, <https://www.warcrafttavern.com/tbc/guides/pve-combat-rogue-stat-priority/>, <https://www.icy-veins.com/tbc-classic/rogue-dps-pve-stat-priority>, <https://www.wowhead.com/tbc/spell=2842/poisons>, <https://www.mmo-champion.com/threads/628220-Rogue-Hit-Cap>

## rogue/combat

The coarse melee-physical archetype gives PvE Hit 142 + Expertise 26 and dismisses white hit ("~24%, not worth chasing") — both wrong for combat. (1) The boss dual-wield white cap is 28% (~363 rating), not 24%, and combat rogues genuinely chase deep hit because white swings + Combat Potency energy are the bulk of their damage; the 142 special cap is only a floor. (2) It ignores 5/5 Precision (+5% hit), which lowers the special floor to ~63 rating on gear and shifts real itemization toward the white/poison caps. (3) It omits poison hit entirely (~17%, ~268 rating), a meaningful chunk of rogue damage that rewards hit past the special cap. For PvP it lists a 79-rating yellow cap without noting Precision already covers it, so combat rogues need ~0 gear hit for specials in arena.

Sources: <https://www.icy-veins.com/tbc-classic/rogue-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/rogue-hit-expertise/>, <https://www.warcrafttavern.com/tbc/guides/pve-combat-rogue-stat-priority/>, <https://wowpedia.fandom.com/wiki/Precision_(rogue_talent)>, <https://www.wowsims.com/tbc/rogue/dps/>

## rogue/subtlety

The coarse melee-physical archetype returns only two PvE caps (9%/142 yellow hit + 26 expertise) and dismisses white hit as "not worth chasing" — that is wrong for rogues. It omits: (1) the dual-wield white hit cap (28% / ~442 rating) and the fact that hit between 9% and there still adds real DPS; (2) the poison hit soft cap (~17% / ~268 rating), the specific reason top rogues chase hit far past the yellow cap; (3) that Subtlety, unlike Combat, has NO Precision talent, so the full 9% yellow hit lands on gear rather than being partly free. In PvP the archetype gives 79 rating hit but omits that poisons follow the same 5% and that expertise has no hard cap (attack from behind). The archetype's expertise figure (26 / ~102 rating) is otherwise correct.

Sources: <https://www.warcrafttavern.com/tbc/guides/rogue-hit-expertise/>, <https://www.warcrafttavern.com/tbc/guides/rogue-stats/>, <https://www.icy-veins.com/tbc-classic/rogue-dps-pve-stat-priority>, <https://hitcap.io/tbc/expertise-cap/>, <https://www.icy-veins.com/tbc-classic/protection-warrior-tank-pve-stat-priority>

## shaman/elemental

The archetype model (caster-dps) returns a single flat PvE cap of Spell Hit 202 rating (16%) and a PvP cap of 4% spell hit — both misleading for elemental. It ignores that an elemental shaman self-provides Totem of Wrath (+3%) and specs Elemental Precision (+3%) + Nature's Guidance (+3%), so the true ON-GEAR raid hit requirement is only ~4% (~51 rating), not 202 — elemental is the easiest caster in the game to hit-cap. In PvP those same talents fully cover the ~3% player hit cap, so gear hit is effectively ZERO, not 4%. The archetype model also omits spell haste and spell crit as the real uncapped soft-target priorities after hit, and omits spell penetration as a genuine (situational) PvP stat for shamans.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-elemental-shaman-stat-priority/>, <https://www.icy-veins.com/tbc-classic/elemental-shaman-dps-pve-stat-priority>, <https://www.icy-veins.com/tbc-classic/elemental-shaman-dps-pve-spec-builds-talents>, <https://www.wowhead.com/tbc/guide/classes/shaman/elemental/dps-pvp-arena>, <https://tbc-bis-guide.com/shaman/elemental/pvp>

## shaman/enhancement

The archetype model treats enhancement as generic melee-physical: PvE shows only the 9% (142) yellow cap plus 26 expertise and explicitly says 'dual-wield white swings need ~24% and are not worth chasing.' That is wrong for enhancement — it is the one melee spec where hit past the 9% yellow cap remains a top-tier DPS stat all the way toward the 28% (≈442) white DW cap, because landed white hits directly drive Windfury weapon procs and Flurry uptime. The model also omits the spell-hit note for Shocks. In PvP the archetype shows only the 5% (79) yellow cap and no expertise/white-hit context; enhancement additionally values white hit (Windfury procs) and expertise vs dodge/parry classes, and typically forgoes resilience for burst rather than treating 490 as a target.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-enhancement-shaman-stat-priority/>, <https://www.icy-veins.com/tbc-classic/enhancement-shaman-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/rogue-hit-expertise/>, <https://www.vintageisthenewold.com/faq/what-is-the-hit-cap-for-dual-wield-tbc>, <https://www.wowhead.com/forums/topic/shaman-what-is-the-hit-cap-for-enhancement-spec-36881>, <https://nottoolateforclassic.com/shaman/enhancement/>

## shaman/restoration

The archetype 'healer' model returns a single PvE row (Spell Hit 0 = 'no hit needed'), which is directionally right for raiding but omits the real throughput/longevity soft targets (Healing Power, mp5, Haste, Crit) that define a resto shaman's gearing. More importantly, its PvP branch only ever adds a hit entry for caster-DPS, hunters or physical specs — a Healer role falls through and gets ONLY the Resilience row. That misses the resto shaman's genuine ~4% (~50 rating) spell-hit target for shocks, Purge, Hex and interrupts, which can miss against same-level players, plus the haste and mana-longevity framing that matters in longer arena/RBG games. Net: PvE needs the honest soft-target list, and PvP needs an offensive-utility hit row the coarse model never emits for healers.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-restoration-shaman-stat-priority/>, <https://www.warcrafttavern.com/tbc/guides/the-egregious-tbc-resto-shaman-guide/>, <https://www.icy-veins.com/tbc-classic/restoration-shaman-healer-pve-stat-priority>, <https://www.icy-veins.com/tbc-classic/restoration-shaman-pvp-guide>, <https://www.warcrafttavern.com/tbc/guides/pvp-restoration-shaman/>

## warlock/affliction

The archetype model emits a single flat 202-rating (16%) spell-hit cap for every caster-DPS spec. For affliction that is wrong on both sides: (1) Suppression 5/5 gives 10% reduced resist for Affliction spells, so the DoT/drain/Fear/curse suite — the bulk of affliction damage — is capped at only 6% / ~76 rating (and is effectively free with a Shadow Priest's Misery). (2) The 202 cap still applies, but ONLY to Shadow Bolt/Nightfall procs and other Destruction-school spells, which Suppression does not touch — Misery lowers even that to 164. The model also omits haste (the #1 post-hit stat) and, for PvP, both understates that Suppression already covers affliction spells (so gear ~zero hit) and misses spell penetration, the actual PvP scaling lever against shadow resistance.

Sources: <https://www.wowhead.com/tbc/spell=18178/suppression>, <https://www.warcrafttavern.com/tbc/guides/pve-affliction-warlock-stat-priority/>, <https://www.icy-veins.com/tbc-classic/affliction-warlock-dps-pve-stat-priority>, <https://barrens.chat/viewtopic.php?t=13099>, <https://nottoolateforclassic.com/warlock/affliction/>

## warlock/demonology

The archetype 'caster-dps' model returns only the single 202-rating (16%) spell-hit entry, which is numerically right for Demonology but its NOTE is wrong for TBC: it credits 'Shadow Priest's Misery' and generic 'hit talents' as reducing the hit needed. In patch 2.4.3 Misery is a magic-damage amplifier with NO spell-hit component (that hit debuff is a WotLK change), and Demonology has zero hit talents — Suppression is Affliction-only and does nothing for Shadow Bolt. So Demonology genuinely must gear the full 16%; the only external reducer is Draenei Heroic Presence (+1% -> 189 rating). The archetype model also omits the honest 'no hard cap' soft targets for Spell Haste and Spell Crit (priority 3/4 after hit and spell damage), and on the PvP side it gives a generic 4% (~50 rating) with the same false Suppression/Misery hedge — correct for Demo since it has no DoT-hit talent, but the note should say so explicitly.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-demonology-warlock-stat-priority/>, <https://www.icy-veins.com/tbc-classic/demonology-warlock-dps-pve-stat-priority>, <https://www.wowhead.com/tbc/spell=18178/suppression>, <https://wowwiki-archive.fandom.com/wiki/Spell_hit>, <https://www.warcrafttavern.com/tbc/guides/pve-affliction-warlock-stat-priority/>

## warlock/destruction

The coarse caster-DPS archetype gets the raw numbers (4% PvP, 202 PvE) roughly right but its notes are wrong for Destruction and it omits real soft targets. (1) The PvE note claims 'hit talents can lower how much you need' — FALSE for Destruction: Suppression is an Affliction talent that only reduces resists on Affliction spells (Corruption/Curses), never on Shadow Bolt/Incinerate/Immolate, so a Destro warlock carries the FULL hit amount on gear and needs MORE hit than an Affliction warlock; only external buffs (Misery -3%, Draenei -1%) reduce it. (2) The PvP note similarly over-credits talents; pure Destruction has no Suppression, so the ~50 hit rating is mostly gear-borne. (3) The archetype lists only hit — it misses that Crit is a standout stat for Destruction (Ruin = 200% crits) and that Haste is an uncapped soft target, both worth showing.

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-destruction-warlock-stat-priority/>, <https://www.icy-veins.com/tbc-classic/destruction-warlock-dps-pve-stat-priority>, <https://www.invenglobal.com/articles/14525/guide-destruction-warlock-wow-tbc-classic-talents-gear-rotation>, <https://www.bluetracker.gg/wow/topic/eu-en/1015913266-chance-to-hit-with-spells-spell-hit-rating/>, <https://us.forums.blizzard.com/en/wow/t/whats-the-tbc-spell-hit-rating-cap/2239148>

## warrior/arms

The coarse melee-physical archetype tells an Arms warrior to ignore a 24% dual-wield white cap — but Arms wields a single 2H weapon, so there is no dual-wield penalty at all: white swings hit at the same 9% (142) cap as yellow. The archetype also omits both spec talents that reshape the numbers: Precision (Fury tree, up to 3%) drops the gear hit requirement from 142 to as low as 95, and Weapon Mastery (Arms, -2% dodge) cuts the effective expertise need from 26 (6.5%) to ~18 (4.5%) from gear. On the PvP side the archetype's flat 79-rating hit note is directionally right but misses the same Precision/Weapon Mastery offsets and Arms' identity as a single-2H burst spec (expertise is a legitimate-but-optional PvP reliability stat here, not something the archetype surfaces).

Sources: <https://www.warcrafttavern.com/tbc/guides/pve-arms-warrior-stat-priority/>, <https://www.icy-veins.com/tbc-classic/arms-warrior-dps-pve-stat-priority>, <https://nottoolateforclassic.com/warrior/arms/>, <https://www.wowhead.com/tbc/spell=29592/precision>, <https://www.wowhead.com/tbc/spell=20504/weapon-mastery>, <https://github.com/wowsims/tbc>

## warrior/fury

The coarse melee-physical archetype outputs only two PvE caps (Hit 142, Expertise 26) and one PvP cap (Hit 79), and it ignores talents entirely. For Fury specifically it misses: (1) the 3/3 Precision talent, which is baked into every Fury build and lowers the ON-GEAR hit requirement to ~95 rating (PvE) / ~32 rating (PvP) rather than the raw 142/79; (2) the dual-wield white-hit reality — unlike a 2H Arms warrior, a Fury warrior gets most of its damage from white swings, so hit past the 9% yellow cap keeps paying off and good Fury players chase ~11-13% total hit rather than stopping at 142; the archetype note dismisses white hit as 'not worth chasing,' which is wrong for dual-wield Fury. It also omits weapon-skill/racial-expertise interaction that shapes Fury weapon/race choices.

Sources: <https://www.icy-veins.com/tbc-classic/fury-warrior-dps-pve-stat-priority>, <https://www.warcrafttavern.com/tbc/guides/pve-fury-warrior-stat-priority/>, <https://nottoolateforclassic.com/warrior/fury/>, <https://www.wowhead.com/tbc/spell=29592/precision>

## warrior/protection

The coarse "tank" archetype gives only three caps (Defense 490, Hit 142, Expertise 26) and OMITS avoidance/uncrushability entirely — the defining prot-warrior survival mechanic. This spec adds the 102.4% combined Miss+Dodge+Parry+Block uncrushable target and explains the Shield Block (+75% block) interaction that lets warriors reach it (needing ~27.4% from other sources). It also corrects the crit-immunity note: unlike Druids/Paladins, warriors have NO talent substitute, so the full 490 defense is mandatory off gear. Adds Block Value as a Shield-Slam threat soft target, and sharpens the expertise entry with the real soft (26) vs hard (56) cap split. The PvP side is corrected too: the archetype's generic melee-physical hit note is right at 5%/79, but this flags that expertise is worthless vs players and that resilience — not the 490 defense number — is the PvP crit stat.

Sources: <https://www.icy-veins.com/tbc-classic/protection-warrior-tank-pve-stat-priority>, <https://www.wowhead.com/tbc/guide/classes/warrior/protection/tank-stat-priority-attributes-pve>, <https://www.warcrafttavern.com/tbc/guides/pve-protection-warrior-tank-stat-priority/>, <https://wowwiki-archive.fandom.com/wiki/Uncrushability>, <https://www.curseforge.com/wow/addons/uncrushable-helper-tbc>

