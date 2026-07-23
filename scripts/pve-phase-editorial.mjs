// Per-phase stat-priority rationales for the PvE BiS pages. The spec-wide
// playstyle line lives in scripts/pve-editorial.mjs; these five explain what
// each raid tier's gear budget changes — P1 fights the hit/expertise caps,
// P5 has epic gems and trivial caps — because the stat ORDER holds across
// phases even though what it costs you does not.
//
// Consumed by build-pve-bis.mjs and by apply-pve-editorial.mjs, which
// refreshes the prose into data/bis without refetching the logs snapshot.

export const PVE_PHASE_EDITORIAL = {
  "druid/balance": {
    1:
      "With Karazhan-level itemization you're scraping for hit — Ivory Idol of the Moongoddess and Spellstrike Pants only get you partway there, so badge and dungeon trinkets fill the gaps the raid can't. Every point of damage past the cap is precious because so little of it exists at this stage.",
    2:
      "Belt of Blasting and the Nordrassil pieces put hit and damage on the same items, so the cap stops eating your whole itemization budget the way it did in Karazhan. With caps easier to clear, you can finally chase raw spell damage on rings and trinkets instead of settling.",
    3:
      "Nordrassil Wrath-Mantle and Headpiece sit near 90% pick rate because T6 lets you hit cap without giving up a single damage slot. With hit solved by tier alone, crit becomes the stat that separates a good Balance druid from a great one this phase.",
    4:
      "Zul'Aman is a small tier, so Thunderheart pieces and Bracers of Nimble Thought at 91-94% pick rate are patching weak slots rather than defining the set. Caps are trivial by now, which means the list is basically a badge-gear shopping trip for spell damage.",
    5:
      "Thunderheart's matching bands, cord and footwraps all land at 94% because Sunwell itemizes hit and damage together across the whole set. Epic gems like Runed Crimson Spinel let you stack spell damage freely once the cap stops costing you a socket.",
  },
  "druid/feral-bear": {
    1:
      "Mantle and Breastplate of Malorne carry the set at 79% because Karazhan-tier armor and stamina are hard-won — you're still chasing the 35k armor cap with whatever mitigation pieces the early raid offers. Agility and expertise are luxuries you can't yet afford to prioritize.",
    2:
      "The Nordrassil Feral set sweeps the slots at 79-87% because SSC/TK finally gives bears enough stamina and armor headroom to stop treating every piece as a cap patch. You start picking gear for the health pool instead of just to survive crushes.",
    3:
      "Vindicator's Dragonhide Bracers hit 91% pick rate on the back of T6 itemization, and with armor and stamina comfortably covered, agility's dodge and crit contribution finally moves the needle on threat and survival alike.",
    4:
      "Zul'Aman's Thunderheart Pauldrons and Belt of One-Hundred Deaths patch specific slots rather than rebuild the set, since Vindicator's Bracers from the prior tier are still your best-in-slot at 96%. It's a tier of filling holes, not chasing caps.",
    5:
      "Thunderheart Wristguards, Treads and Waistguard all sit around 88-92% because Sunwell's itemization is deep enough that armor and stamina stop being scarce, letting Great Lionseye and Steady Seaspray Emerald push agility as a real scaling stat again.",
  },
  "druid/feral-cat": {
    1:
      "Wolfshead Helm and Everbloom Idol both clear 95% pick rate because Karazhan gives you almost no other way to reach the hit cap that keeps your powershifting rotation from whiffing. Agility items like Terestian's Stranglestaff are the exception, not the rule, this early.",
    2:
      "With Wolfshead Helm still anchoring the set at 98%, SSC/TK opens up agility itemization on pieces like Edgewalker Longboots, so once hit is covered you're finally gearing the shift-fueling stats instead of just patching the cap.",
    3:
      "Wolfshead Helm's pick rate climbs to 99% even in Black Temple because nothing in T6 replaces its hit, but Vindicator's Dragonhide Bracers show agility itemization is catching up everywhere else, so you can build around the helm instead of despite it.",
    4:
      "Thunderheart Leggings, Pauldrons and Gauntlets all land at 97-99% because Zul'Aman's badge and set pieces finally out-itemize Wolfshead Helm's hit contribution across multiple slots, spreading the cap requirement instead of concentrating it in one item.",
    5:
      "Thunderheart Wristguards and Treads carry Sunwell gearing at 89-91% while hit stops being a single-item problem, so Bold Crimson Spinel and Steady Seaspray Emerald let you gem straight agility without worrying about falling off the cap.",
  },
  "druid/restoration": {
    1:
      "Idol of the Emerald Queen dominates at 94% because Karazhan gives resto druids almost nothing else that boosts Lifebloom's coefficient, and Forestlord Striders' 69% pick rate shows how thin the bonus-healing options are at this stage.",
    2:
      "Idol of the Emerald Queen's pick rate drops to 67% as Grove-Bands of Remulos and Nordrassil Life-Mantle spread bonus healing across more slots, so SSC/TK stops forcing Lifebloom uptime through one idol and starts rewarding whole-set itemization.",
    3:
      "Nordrassil Chestguard and Life-Mantle lead at 75-85% because T6 set bonuses finally out-value single stacked-stat pieces, letting spirit's contribution to the Tree of Life aura scale the whole raid's healing rather than just your own.",
    4:
      "Botanist's Gloves of Growth topping out at just 70% shows Zul'Aman patching gaps rather than replacing your T6 core — this is badge gear filling in bonus healing where the small raid tier doesn't offer an upgrade.",
    5:
      "Thunderheart Belt, Bracers and Boots all sit at 86-87% because Sunwell itemizes bonus healing and spirit together across the set, so gearing up stops being about chasing one standout item and becomes filling out a coherent kit.",
  },
  "hunter/beast-mastery": {
    1:
      "With hit and expertise eating most of your budget, Karazhan-tier picks like Beast Lord Mantle and Beast Lord Handguards are chosen for hit first, agility second — there's little room left to chase crit, so the list stays cap-driven and pet-neutral throughput waits.",
    2:
      "SSC/TK gear like Rift Stalker Gauntlets and Belt of Deep Shadow lets you clear hit without gutting agility, so Wicked Flame Spessarite slots start earning their keep and the set bonuses on the Rift Stalker pieces tip item choices as much as raw stats do.",
    3:
      "By Black Temple, Rift Stalker Hauberk and Helm keep you capped without sacrifice, so crit rating finally competes for itemization weight — the list stops being a hit-cap checklist and starts rewarding whichever piece stacks agility and crit together.",
    4:
      "Zul'Aman's Gronnstalker's set patches weak slots rather than replacing your core kit, so Gronnstalker's Gloves and Spaulders slide in purely for agility and crit while badge gear fills whatever hit gaps the small tier doesn't cover.",
    5:
      "Sunwell's Gronnstalker's Bracers and Belt come with room to run Bold Crimson Spinel and Wicked Pyrestone instead of pure hit gems, since caps are trivial by now — agility and crit finally scale as hard as the priority order always implied.",
  },
  "hunter/marksmanship": {
    1:
      "Karazhan-era picks like Beast Lord Mantle and Sunfury Bow of the Phoenix go almost entirely toward the hit cap, leaving Trueshot Aura's raid AP as your main value-add while your own agility and crit budget stays thin.",
    2:
      "Rift Stalker Gauntlets and Mantle from SSC/TK clear hit with less sacrifice, so agility starts pulling its weight in the list and your personal damage catches up to what Trueshot was already contributing for the raid.",
    3:
      "With Rift Stalker Mantle and Hauberk comfortably capping hit in Black Temple gear, crit rating gets real itemization weight for the first time, and the priority stops being a hit checklist propped up by the aura's raid value.",
    4:
      "Zul'Aman's Gronnstalker's Gloves patch the slots that still lag, letting agility and crit carry more of the list while Trueshot's contribution stays constant and badge gear covers whatever the small tier's chestguard and spaulders don't.",
    5:
      "Sunwell's Gronnstalker's Bracers and Belt run Bold Crimson Spinel over pure hit gems since the cap is trivial now, so agility and crit finally set the pace and your own numbers matter as much as the buff you bring.",
  },
  "hunter/survival": {
    1:
      "Beast Lord Mantle and Helm push agility hard in Karazhan gear because Expose Weakness rewards it across the raid before hit even matters, and the tight budget means Jagged Talasite slots go to agility rather than stamina padding.",
    2:
      "Rift Stalker Mantle and Belt of Deep Shadow from SSC/TK ease the hit cap enough that Shifting Nightseye and Glinting Noble Topaz start filling gem slots for agility and crit, letting Expose Weakness scale further without gear tradeoffs.",
    3:
      "Telonicus' Pendant of Mayhem alongside Rift Stalker Hauberk in Black Temple gear keeps you capped comfortably, so crit rating finally earns real weight in the list instead of losing every slot fight to hit.",
    4:
      "Zul'Aman's Gronnstalker's Gloves and Spaulders round out agility-heavy slots the small tier doesn't fully replace, with badge pieces covering hit so Expose Weakness keeps multiplying across the raid without a stat-budget hit.",
    5:
      "Sunwell's Gronnstalker's Bracers and Boots free you to run Bold Crimson Spinel and Steady Seaspray Emerald over hit gems, so agility's raid-wide multiplier through Expose Weakness finally runs at full strength.",
  },
  "mage/arcane": {
    1:
      "Spellfire Robe, Gloves, and Belt in Karazhan-tier gear go toward clearing the 16% hit cap first, so Chaotic Skyfire Diamond and Veiled Noble Topaz slots lean hit and spell damage while intellect's mana-pool payoff waits for a bigger budget.",
    2:
      "Tirisfal set pieces like Leggings of Tirisfal and Mantle of Tirisfal ease hit past the cap and add set bonuses that reshape slot choices, freeing intellect to start paying off through the geometric mana cost of stacked Arcane Blasts.",
    3:
      "With Robes of Tirisfal and Mantle of Tirisfal comfortably capped in Black Temple gear, intellect gets to dominate the list the way Arcane Blast's mana curve always wanted, since spell damage and crit no longer have to compete for a scarce budget.",
    4:
      "Zul'Aman's Mantle of Tirisfal and Cowl of Tirisfal patch the slots the raid's small size doesn't fully cover, keeping intellect's mana-pool advantage intact while badge gear fills in whatever hit or spell damage the tier leaves short.",
    5:
      "Bracers, Belt, and Boots of the Tempest in Sunwell gear run Sparkling Empyrean Sapphire instead of hit gems, so intellect keeps stretching your Arcane Blast mana pool while spell damage and crit ride along on a budget that no longer forces tradeoffs.",
  },
  "mage/fire": {
    1:
      "Karazhan's budget forces trade-offs: Spellfire Robe, Gloves and Belt all sit near 91-92% because the set bonus is the only way to close the hit gap without gutting damage. Every piece still fights the 16% cap, so crit rating from badge and dungeon drops has to wait its turn behind raw spell damage.",
    2:
      "With hit easier to fill from SSC/TK drops, Ruby Drape of the Mysticant and Belt of Blasting push past 50% adoption purely on damage-and-crit rolls rather than cap-filling. Itemization finally lets you chase Ignite rollovers instead of just reaching 16%, and the crit/damage tradeoff starts to matter slot by slot.",
    3:
      "T6 comfort shows in the numbers: Belt of Blasting jumps to 81% and Boots of Blasting to 63%, both pure damage-and-crit pieces with no hit tax attached. Once Black Temple and Hyjal gear covers the cap on its own, every remaining upgrade decision is a straight damage-vs-crit call, not a cap patch.",
    4:
      "Zul'Aman's Tempest set dominates adoption — Gloves of the Tempest at 98%, Bracers of Nimble Thought at 95% — because a small tier can't outgear T6 on raw stats, only on efficient hit-and-crit rolls badge gear doesn't match. You're filling the two or three slots ZA actually improves, not rebuilding the set.",
    5:
      "Sunwell's Tempest pieces cluster tight at 92-93% across bracers, belt and boots, and the epic gem lineup shifts to Runed Crimson Spinel and Forceful Seaspray Emerald for the crit-and-damage combo that finally outweighs pure hit gems. Caps are trivial here, so crit rating earns its near-parity with spell damage in full.",
  },
  "mage/frost": {
    1:
      "Spellstrike Pants lead at 77% because Karazhan-tier frost has to chase hit before anything else — Sapphiron's Wing Bone and Frozen Shadoweave Shoulders follow close behind as damage patches once the cap eats most of your itemization budget. Haste sits last since Empowered Frostbolt's rotation doesn't reward it yet at this gear level.",
    2:
      "Belt of Blasting overtakes at 53% as SSC/TK opens up hit sources beyond a single BiS piece, letting Ruby Drape of the Mysticant and Icon of the Silver Crescent compete on pure spell damage instead of cap-filling. The list stops being a scramble to 16% and starts rewarding straight intellect-and-damage stacking.",
    3:
      "Belt of Blasting climbs to 77% and Leggings of Tirisfal to 72%, both chosen for damage and intellect now that Black Temple and Hyjal gear covers hit without dedicated pieces. Ice Shards keeps crit efficient regardless, so the freed budget goes straight into the stats Deep Frost actually scales on.",
    4:
      "Zul'Aman's Tempest set claims the top slots — Gloves at 94%, Bracers of Nimble Thought at 93% — because a small tier patches the one or two weak pieces T6 left behind rather than replacing the set wholesale. Robes of the Tempest at 90% shows the same pattern: efficient stats, not raw upgrades.",
    5:
      "Bracers, Belt and Boots of the Tempest all sit at 92% in Sunwell, and the epic gem shift to Runed Crimson Spinel and Forceful Seaspray Emerald means the cap is no longer a design constraint at all. Consistency was always Deep Frost's promise, and here the itemization finally has nothing left to compensate for.",
  },
  "paladin/holy": {
    1:
      "Justicar Diadem tops out at 71% because Karazhan's caster plate is thin and Illumination punishes any slot that skimps on intellect or crit — Legplates of the Innocent and Girdle of Truth trail behind as the only other pieces that don't force a healing-stat sacrifice. Badge gear fills what the raid can't.",
    2:
      "Boots of Courage Unending jumps to 86% as SSC/TK finally offers a healing-caster boot slot worth wearing, with Crystalforge Pauldrons and Aegis of the Vindicator close behind once set bonuses start deciding equips rather than raw stat count. Illumination's crit refund gets easier to lean on with more crit on the table.",
    3:
      "Crystalforge Chestpiece leads at 84% alongside Boots of Courage Unending at 80%, both T6-adjacent pieces that stack bonus healing without forcing you off crit. Glorious Gauntlets of Crestfall at 78% rounds out a list where the Crystalforge set bonus, not raw stat scarcity, decides the gloves slot.",
    4:
      "Lightbringer Chestpiece and Leggings post 87% and 82%, showing Zul'Aman patching the two heaviest healing slots rather than replacing a T6 base. With bonus healing already strong from Black Temple and Hyjal, ZA's job is topping up MP5 and crit where the prior tier left gaps.",
    5:
      "Lightbringer Belt and Treads tie at 79% while the gem list swaps in Delicate Crimson Spinel for crit efficiency now that mana regen is no longer the constraint it was in Karazhan. Sunwell's small additions round out a kit where Illumination's crit refund can finally be pushed harder than raw MP5.",
  },
  "paladin/protection": {
    1:
      "Justicar Shoulderguards, Faceguard and Chestguard all cluster near 71-73% because Karazhan barely offers enough plate to hit 490 defense, let alone fund the spell damage that drives Consecration threat — stamina and defense eat most of the budget before Holy Shield ever gets a real upgrade.",
    2:
      "Crystalforge Legguards and Handguards climb to 85-86% as SSC/TK finally supplies defense-capped pieces with spell damage attached, freeing set-bonus slots to matter instead of just plugging the cap. Justicar Chestguard's 83% shows the caster-stat chase is no longer fighting the defense number for every slot.",
    3:
      "The Darkener's Grasp hits 88% and Libram of Repentance 68%, both spell-damage-forward picks now that Black Temple and Hyjal gear clears 490 defense without dedicated slots. Consecration and Holy Shield threat finally scale off gear chosen for damage, not cap math, which is why AoE-heavy fights favor this kit.",
    4:
      "Lightbringer Handguards top 98% and Chestguard 97%, Zul'Aman's set sweeping adoption because it patches the exact spell-damage slots T6 left thin rather than competing on stamina. A small tier can't out-tank Black Temple, but it can out-threat it in the two or three pieces it actually upgrades.",
    5:
      "Lightbringer Wristguards lead at 91% with Waistguard and Handguards close behind, and Solid Empyrean Sapphire joins the gem lineup for pure spell damage now that defense and stamina are trivial to clear. Sunwell gear finally lets you gem for threat across the board instead of patching survivability.",
  },
  "paladin/retribution": {
    1:
      "With Libram of Avengement leading the wishlist and Justicar Crown pulled from Kara badges, you spend most of your budget just reaching the hit and expertise caps that protect your seal twist - strength and crit wait in line while Lionheart Champion covers the raw stat gap Kara/Gruul/Mag gear leaves open.",
    2:
      "SSC/TK itemization loosens up: Furious Gizmatic Goggles and Bladespire Warbands compete on strength instead of pure caps, so once Libram of Avengement locks your twist rotation in at 98%, the rest of the list starts rewarding raid damage over just clearing the hit table.",
    3:
      "T6 comfort shows in the gem list holding steady from P2 while Gloves of the Searing Grip climbs to 87% - hit and expertise are handled early now, so Shoulderpads of the Stranger and raw strength itemization are what actually separates a good Black Temple parse.",
    4:
      "Zul'Aman is a patch tier here: Libram of Avengement holds firm at 98%, but Bindings of Lightning Reflexes tying Shoulderpads of the Stranger at 92% shows badge and boss loot converging, so the priority order barely moves - it just fills remaining strength and crit slots.",
    5:
      "Sunwell flips the wishlist entirely - Lightbringer Bands and Lightbringer Girdle both sit at 94% and Teardrop Crimson Spinel joins your sockets, meaning strength and crit finally scale hard once hit and expertise stop being a fight, the first phase where secondary stats decide your parse.",
  },
  "priest/discipline": {
    1:
      "Primal Mooncloth pieces dominating the belt and shoulder slots at 66-67% tell you the story: Kara/Gruul/Mag itemization is thin, so you take whatever pushes intellect and MP5 forward and lean on Power Infusion timing to matter more than raw throughput this early.",
    2:
      "Gloves of the Avatar and Mantle of the Avatar jumping to 83-88% mark SSC/TK as where the Avatar set starts deciding slots outright, letting bonus healing and intellect climb together instead of MP5 alone carrying your mana game.",
    3:
      "Black Temple pushes the Avatar set past 90% across gloves, mantle, and vestments, and with only Insightful Earthstorm Diamond left on the gem list, itemization is dense enough that bonus healing finally leads without MP5 propping up every choice.",
    4:
      "Zul'Aman shifts the wishlist off the Avatar set toward Boots of the Divine Light at 81%, showing badge gear stepping in ahead of the raid tier - a small patch phase where intellect and MP5 fill whatever the loot table missed.",
    5:
      "Wand of Cleansing Light topping the Sunwell list at 85% alongside Delicate Crimson Spinel and Infused Shadowsong Amethyst in your sockets shows epic gems taking over where MP5 used to carry - bonus healing and intellect scale freely now that mana is a solved problem.",
  },
  "priest/holy": {
    1:
      "Primal Mooncloth sweeping the belt, shoulder, and robe slots at 74-79% is the Kara/Gruul/Mag story - spirit-fed regen through Holy Concentration procs matters more than raw throughput when the loot pool is this shallow, so you take the set bonus over almost anything else.",
    2:
      "Gloves and Mantle of the Avatar landing at 83-84% mark SSC/TK as the phase where the Avatar set bonus starts outranking individual stat upgrades, letting bonus healing and spirit finally separate from each other instead of moving together on every piece.",
    3:
      "Black Temple pushes Gloves of the Avatar to 93% and trims the gem list to Insightful Earthstorm Diamond alone - regen is comfortable enough now that bonus healing and spirit stop being cap-driven and start being about raw output per cast.",
    4:
      "Zul'Aman's Boots of the Divine Light leading at 88% over any Avatar piece shows this tier patching gaps rather than replacing your T6 core - a small addition that fills spirit and MP5 holes badge gear left behind.",
    5:
      "Wand of Cleansing Light at 88% and Delicate Crimson Spinel through Radiant Seaspray Emerald filling your sockets show Sunwell's epic gems doing the regen work Holy Concentration used to carry alone, freeing bonus healing to lead without spirit dragging every pick.",
  },
  "priest/shadow": {
    1:
      "Frozen Shadoweave sweeping shoulders, robe, and boots at 94-95% is the whole Kara/Gruul/Mag story - the set bonus is so far ahead of anything else available that you build around it first and worry about shadow damage scaling second.",
    2:
      "Orb of the Soul-Eater hitting 98% in SSC/TK marks the point where a single trinket does more for your Mind Flay uptime than a full tier's worth of hit gear, letting shadow damage and crit finally compete once the 16% hit floor stops eating every upgrade.",
    3:
      "Black Temple's Ritssyn's Lost Pendant climbing to 81% alongside Orb of the Soul-Eater shows the hit table is a solved problem by now, so shadow damage and haste from trinkets are doing the work that used to belong to raw hit rating.",
    4:
      "Zul'Aman flips the wishlist to Bracers of Nimble Thought at 99% and Shroud of Absolution at 97%, showing badge gear from this tier outpacing the raid's own drops - a stat-stacking patch phase rather than a new itemization ceiling.",
    5:
      "Sunwell's Absolution set sweeping bracers, cord, and treads at 92-93% alongside Mystical Skyfire Diamond in your gems means hit is trivial to clear now, so shadow damage and haste scale freely off epic gem sockets instead of fighting the cap.",
  },
  "rogue/assassination": {
    1:
      "Karazhan-tier trinkets like Malchazeen and Choker of Vile Intent are how you scrape toward the hit and expertise caps at all, so agility and AP take a back seat to whatever badge or dungeon piece actually closes the gap — crit rating waits its turn.",
    2:
      "With Edgewalker Longboots and Deathmantle pieces flowing out of Serpentshrine and Tempest Keep, hit and expertise stop eating every itemization roll, so agility and AP finally show up on upgrades instead of just caps.",
    3:
      "T6's Deathmantle Legguards and Drape of the Dark Reavers carry enough raw agility and AP that caps are a formality by Black Temple, so crit rating stops being an afterthought and starts moving your Mutilate and Deadly Poison numbers directly.",
    4:
      "Zul'Aman's Slayer's set dominates the picks — Handguards, Shoulderpads, and Chestguard all above 89% — because a small tier patches your weak slots while badge gear covers whatever it doesn't, keeping the same hit-first order cheap to satisfy.",
    5:
      "Sunwell's Great Lionseye and Rigid Lionseye gems push agility itemization further than any prior phase, and with Slayer's Boots, Bracers, and Belt all near 90%, caps are trivial — the list rewards raw agility and AP stacking above all.",
  },
  "rogue/combat": {
    1:
      "Latro's Shifting Sword and Netherblade Facemask are doing cap duty here — Karazhan-tier gear barely gets you to weapon-skill consistency, so hit and expertise chew through your slots before agility or crit rating get a look.",
    2:
      "Deathmantle Handguards at 97% and Edgewalker Longboots at 96% signal SSC/TK itemization opening up — set bonuses now decide slots, and once hit and expertise are covered, agility and AP move the needle on Slice uptime damage.",
    3:
      "The Arcanite Steam-Pistol joining Edgewalker Longboots and Drape of the Dark Reavers in Black Temple shows T6's budget comfortably clears both caps, so agility and AP carry real weight and crit rating stops being a rounding error.",
    4:
      "Zul'Aman's Slayer's Handguards hit 99% adoption because this tier patches gaps rather than replacing your kit — badge gear still does the heavy lifting on hit and expertise while the raid contributes the last few percentage points.",
    5:
      "Sunwell's Glinting Pyrestone and Rigid Lionseye gems, paired with Slayer's Bracers and Gloves of Immortal Dusk both at 97%, mean caps are a non-issue — the list finally rewards stacking agility and AP for Sinister Strike's white-damage engine.",
  },
  "rogue/subtlety": {
    1:
      "Netherblade Facemask and Choker of Vile Intent lead the Karazhan picks because reaching the hit cap eats your early slots, leaving agility scraps for the Hemorrhage debuff and finisher crits that carry your personal parse.",
    2:
      "Edgewalker Longboots at 86% and Drape of the Dark Reavers show SSC/TK gear finally supplying agility without sacrificing hit, so your finisher crit numbers stop being incidental and start scaling with real itemization.",
    3:
      "Deathmantle Legguards and the Arcanite Steam-Pistol round out a Black Temple set where caps are a given, letting agility and AP stack freely while expertise and crit rating fill out whatever's left in the budget.",
    4:
      "Slayer's Shoulderpads and Chestguard both sit at 94-95% adoption in Zul'Aman because this tier's job is filling gaps in an already-capped kit, not rewriting your priority — badge pieces still cover the caps.",
    5:
      "With Slayer's Bracers, Belt, and Boots clustered at 88-90% and Great Lionseye gems available, Sunwell removes any cap tension entirely, so agility and AP stacking drives your finisher-crit damage more than any prior phase.",
  },
  "shaman/elemental": {
    1:
      "Totem of the Void at 96% adoption tells the story — Karazhan-tier trinkets are what get you to the 16% hit cap, so Netherstrike pieces fill the rest while spell damage stays scarce and crit rating waits behind it.",
    2:
      "Belt of Blasting and a near-universal Totem of the Void show SSC/TK still leaning on a handful of pieces to hold the hit cap, but spell damage itemization opens up enough that Lightning Bolt output starts scaling past cap maintenance.",
    3:
      "Belt of Blasting at 89% and Brute Cloak of the Ogre-Magi in Black Temple mean the hit cap is comfortable by T6, so spell damage stacks freely and crit rating — fed by Tidal Mastery — finally pulls its weight in the priority.",
    4:
      "Skyshatter Gauntlets and Headguard both clear 97% because Zul'Aman's small tier is patching weak slots around an already-solid Karazhan-through-Hyjal base, with badge gear still doing real work alongside the raid drops.",
    5:
      "Skyshatter Bands, Cord, and Treads clustering at 89% with Forceful Seaspray Emerald gems available shows Sunwell trivializing the hit cap, letting spell damage and crit rating drive Lightning Bolt scaling without any cap tax.",
  },
  "shaman/enhancement": {
    1:
      "Karazhan-tier weapons and badge trinkets like Choker of Vile Intent get you to the hit cap, but only barely, so Totem of the Astral Winds ends up carrying more of your agility and attack power budget than any raid drop does at 94% adoption.",
    2:
      "Cataclysm Gauntlets and Legplates push past 80% adoption because the set bonuses start deciding item choices outright, and with hit easier to hold from SSC and TK pieces you finally itemize attack power and agility instead of just chasing the cap.",
    3:
      "Totem of the Astral Winds sits at 100% because T6's Cataclysm Chestplate and Legplates finally let you treat hit and expertise as solved problems, freeing every remaining slot to stack pure attack power and agility instead of patching caps.",
    4:
      "Zul'Aman is a small tier, so Stonebreaker's Totem headlines a list built mostly from badge gear like Belt of One-Hundred Deaths and Midnight Chestguard, patching whatever slots the raid itself doesn't upgrade rather than replacing your T6 core.",
    5:
      "Skyshatter Girdle and Greaves round out a kit where Stonebreaker's Totem is still your best trinket, and epic gems like Teardrop Crimson Spinel and Shifting Shadowsong Amethyst let you push agility and crit hard now that hit and expertise cost nothing.",
  },
  "shaman/restoration": {
    1:
      "Cyclone Headdress and Heart-Flame Leggings sit well under 75% adoption because Karazhan's healing gear is thin, and Totem of Healing Rains has to do most of the bonus healing work a full raid kit would otherwise spread across several slots.",
    2:
      "Totem of Healing Rains jumps to 95% once Girdle of Fallen Stars and Aegis of the Vindicator open up spirit and bonus healing options SSC and TK provide, letting you finally chase MP5 past the bare sustain floor Karazhan forced on you.",
    3:
      "Cataclysm Chestguard's bonus healing and Girdle of Fallen Stars's spirit both compete with Totem of Healing Rains for slot priority in T6, and with mana sustain no longer a struggle you can weight bonus healing more aggressively than in earlier tiers.",
    4:
      "Skyshatter Helmet and Leggings post 94% and 83% because Zul'Aman's healing gear is concentrated in a handful of pieces, so Totem of Healing Rains at 97% and two or three Skyshatter items do most of the work the raid provides.",
    5:
      "Skyshatter Boots and Belt overtake the totem at 88-89% as Sunwell's gear pushes bonus healing higher than any prior tier, and Quick Lionseye alongside Delicate Crimson Spinel lets you gem for crit without sacrificing the intellect this deep in the expansion.",
  },
  "warlock/affliction": {
    1:
      "Spellstrike Pants and Frozen Shadoweave Boots barely clear 80% adoption because Karazhan-tier itemization is sparse for the 16% hit cap, forcing you toward crafted sets and Voidheart Crown just to stop Unstable Affliction from resisting on cooldown.",
    2:
      "Voidheart Mantle and Belt of Blasting headline SSC/TK because the set finally lets you hold hit cap without crafted gear, so shadow damage on pieces like Voidheart Gloves starts outweighing raw hit for the first time this expansion.",
    3:
      "Belt of Blasting hits 98% and Boots of Blasting joins it because T6 gear holds the hit cap comfortably, letting the list shift almost entirely toward stacking shadow damage instead of patching resist chances the way Karazhan gear did.",
    4:
      "Bracers of Nimble Thought and Hood and Gloves of the Malefic all clear 95% because Zul'Aman barely touches this spec's gear, so badge items fill in shadow damage and haste the raid itself doesn't offer this tier.",
    5:
      "Bracers, Belt, and Boots of the Malefic sit at 92-94% while Forceful Seaspray Emerald and Glowing Shadowsong Amethyst push haste and shadow damage through epic gems, since Sunwell trivializes the hit cap and lets every socket chase raw output.",
  },
  "warlock/demonology": {
    1:
      "Spellstrike Pants and Girdle of Ruination stay under 85% because Karazhan offers little stamina itemization, so you're stitching together hit and shadow damage from crafted gear while Demonic Knowledge's stamina scaling waits for better slots to open up.",
    2:
      "Belt of Blasting and Leggings of the Corruptor land in the 65-74% range because SSC/TK gear finally carries meaningful stamina alongside shadow damage, letting Demonic Knowledge convert more of your budget into damage than Karazhan's thin itemization allowed.",
    3:
      "Belt of Blasting reaches 92% and Leggings of the Corruptor 86% as T6 stamina itemization matures, pushing The Sun King's Talisman into the mix and letting Demonic Knowledge's conversion carry more weight than in any prior tier.",
    4:
      "Bracers of Nimble Thought lead at 91% while Gloves and Hood of the Malefic fill in behind them, since Zul'Aman offers little stamina gear and badge items end up doing more for Demonic Knowledge's conversion than the raid does.",
    5:
      "Bracers and Belt of the Malefic both sit at 88% as Sunwell's Runed Crimson Spinel and Glowing Shadowsong Amethyst let you gem stamina and shadow damage together, with the 16% hit cap now trivial enough to socket almost entirely for output.",
  },
  "warlock/destruction": {
    1:
      "Karazhan-tier trinkets barely exist for you yet, so hit stays glued to gear you can't swap out — Voidheart pieces carry the set while you chase 16% before anything else counts. With Spellstrike Pants leading parses at 87%, crit and haste are luxuries; missing a Shadow Bolt against Attumen's timers costs more than a slightly slower cast.",
    2:
      "Belt of Blasting topping SSC/TK lists at 92% signals the shift — hit is now backed by dedicated damage pieces instead of leftover Kara gear, freeing crit and haste to matter again. Runed Living Ruby entering the gem list shows itemization finally supporting more than pure hit-capping.",
    3:
      "Hyjal and Black Temple push Belt of Blasting to 97%, meaning hit is a solved problem by now and the list is doing real work below it — Vestments of the Sea-Witch at 79% shows set bonuses competing with raw stats, letting crit and haste decide the last few slots.",
    4:
      "Zul'Aman's small drop table barely touches destro itemization, so Malefic badge pieces near-sweep the list at 98-99% — this is a patch tier where token-fallback gear does more for your crit and haste than the raid boss loot does.",
    5:
      "Sunwell's Malefic set clusters at 91% across bracers, belt and boots, and the arrival of Forceful Seaspray Emerald and Runed Crimson Spinel means gemming finally chases crit and haste directly instead of hit — the cap stopped being a fight by this point.",
  },
  "warrior/arms": {
    1:
      "Warbringer Battle-Helm at 86% is nearly the only real hit source in Karazhan, so the 9% cap swallows your head slot outright — Girdle of the Endless Pit and Bladespire Warbands trail behind because strength pieces lose to raw hit availability this early in the tier.",
    2:
      "Pendant of the Perilous leading SSC/TK at just 75% shows hit spreading across more slots instead of locking one mandatory piece, which finally lets Vengeance Wrap's strength profile compete for a slot instead of sitting on the bench.",
    3:
      "Destroyer Battle-Helm at 71% and Warboots of Obliteration at 66% put hit and strength on comparable footing in Black Temple gear, so armor penetration finally earns a look on trinkets instead of being crowded out by cap chasing.",
    4:
      "Onslaught Shoulderblades at 86% and Onslaught Breastplate at 83% dominate Zul'Aman parses because the tier's set patches the exact strength and hit gaps T5/T6 left open — Blood Frenzy uptime gets easier to hold with a full Onslaught frame.",
    5:
      "Onslaught Bracers, Treads and Belt all sit at 92-93% in Sunwell, so the set is essentially locked before you touch a boss — Inscribed Pyrestone and Steady Seaspray Emerald let you gem past caps into pure strength and crit for slam damage.",
  },
  "warrior/fury": {
    1:
      "Dragonmaw topping Karazhan parses at 93% tells you the hit-heavy weapon is non-negotiable before anything else — with a 24% white-swing miss penalty looming, Warbringer Battle-Helm at 88% is chasing the same cap, not competing with it for a slot.",
    2:
      "Dragonstrike jumping to 97% in SSC/TK shows the weapon slot fully solved, so Pendant of the Perilous at 76% is where the real fight for strength and crit against hit now happens instead of the main hand.",
    3:
      "With Dragonstrike still at 93% in Black Temple, Warboots of Obliteration at 71% and Destroyer Battle-Helm at 68% show strength and crit finally pulling weight below the weapon, feeding Flurry uptime instead of just closing the hit gap.",
    4:
      "Onslaught Shoulderblades at 96% and Onslaught Breastplate at 92% make Zul'Aman a near-mandatory strength and crit patch — the set fills gaps T5/T6 weapons left in Rampage uptime more than any raid boss drop does.",
    5:
      "Onslaught Bracers, Belt and Treads clustering at 94-95% in Sunwell mean the set is locked fast, and Teardrop Crimson Spinel plus Inscribed Pyrestone push gemming straight into strength and crit for Flurry-fed burst.",
  },
  "warrior/protection": {
    1:
      "Dragonmaw at only 53% and Warbringer Greathelm at 44% show how thin the Karazhan pool is for you — hitting 490 defense eats whatever's available, leaving shield block value scraps for Shield Slam threat until better gear exists.",
    2:
      "Dragonstrike and Serpentshrine Shuriken both clearing 64%+ in SSC/TK mean block value finally has dedicated pieces to chase instead of riding leftover defense gear, so Shield Slam threat starts scaling the way it's meant to.",
    3:
      "Vindicator's Plate Bracers at 75% leading Black Temple parses shows defense is comfortably behind you by now — block value on Destroyer Chestguard and Legguards is doing double duty for threat and mitigation exactly as the spec intends.",
    4:
      "Dory's Embrace at 73% and Gauntlets of Enforcement at 69% show Zul'Aman patching hit and expertise gaps T5/T6 tanking gear left open, rather than adding meaningful block value — this tier is about rounding out the kit, not defining it.",
    5:
      "Onslaught Boots and Waistguard barely clearing 50-57% in Sunwell shows the set isn't a lock for tanks the way it is for DPS — Solid Empyrean Sapphire and Rigid Lionseye let you gem stamina and block value freely with caps long since trivial.",
  },
};
