// Per-season stat-priority rationales for the derived arena-season pages
// (/[class]/[spec]/pvp/season-N). The live Season 2 list keeps its own
// rationale in scripts/bis-editorial.mjs; these three explain what each OTHER
// season changes — the resilience budget and the rating gates — because the
// stat ORDER itself does not move between seasons, only what it buys you.
//
// Consumed by build-pvp-seasons.mjs and by apply-season-editorial.mjs, which
// refreshes the prose into data/bis without re-running the season build.

export const SEASON_EDITORIAL = {
  "druid/balance": {
    1:
      "Resilience is scarcer here than it will ever be again — an opener kills through what little you carry, so every point of it and every point of Stamina buys you the seconds to react. Nothing gates you: Gladiator's Salvation and the Kodohide pieces cost arena points alone, and dungeon or crafted gear covers Wrist and Waist until the honor offsets exist.",
    3:
      "Resilience scales up sharply here, and the practical effect is that you survive a swap long enough to hard-cast instead of playing instant-only all match. The gates: 1850 team rating for Vengeful Gladiator's Salvation, 2000 for the Wyrmhide Spaulders — below those, Season 2 pieces stay live in the same slots. Vindicator's Kodohide Bracers and Belt need honor only.",
    4:
      "The highest resilience budget of the expansion arrives with the tightest gates: Brutal Gladiator's Salvation at 1950 rating, the Wyrmhide Spaulders at 2200, several pieces checking personal rating as well as team rating. The Season 3 set is honor-bought now, so it becomes your floor — spend arena points on the gated slots your rating actually reaches instead of banking for shoulders you will not qualify for.",
  },
  "druid/feral-cat": {
    1:
      "Resilience is scarcer here than in any later season, so no slot gets traded for a higher-agility dungeon drop — Gladiator's Dragonhide Tunic beats anything with fatter stats. Wrist stays a hole until Veteran's Dragonhide Bracers unlock; fill it with crafted leather and gem stamina, since an opener still kills through what resilience you have. Nothing is rating-gated, so only your point total limits you.",
    3:
      "The resilience pool jumps enough that a full swap no longer opens you inside one stun, so the agility on Vindicator's Dragonhide Bracers is worth more than it was a season ago. Miss 2000 rating and Vengeful Gladiator's Dragonhide Spaulders stay locked — wear the Merciless shoulders rather than a raid piece carrying no resilience. The weapon slot waits on 1850, and Merciless Gladiator's Maul covers it until then.",
    4:
      "The biggest resilience budget of the expansion is what lets Nordrassil Feral-Kilt keep the leg slot — that's the one place trading resilience for agility pays, and only because every other piece covers it. The rest is reach: Guardian's Dragonhide Bracers and Boots ask for honor alone, while the Brutal shoulders sit behind 2200 and the weapon behind 1950. Vengeful pieces hold those slots until you get there.",
  },
  "druid/restoration": {
    1:
      "The Gladiator's set carries the thinnest resilience of the expansion, so what you buy blunts a burst window rather than surviving it outright — take every point, then let stamina cover the rest. Neck, wrist, belt, boots and ring are still dungeon and craft fillers early on, so those slots are where you pick up +healing. Nothing is rating-gated, so points are the only limiter.",
    3:
      "Vengeful Gladiator's Kodohide gear jumps the resilience budget far enough that swaps you used to die through now only cost you the time it takes to shift and run. Only two pieces are gated — the weapon at 1850, the shoulders at 2000 — so the Vindicator's neck, bracers, belt, boots and ring go on regardless, and last season's Merciless shoulders hold that slot until you clear 2000.",
    4:
      "Brutal Gladiator's pieces hold the most resilience in the expansion, which is why the question stops being which stat and starts being which gates you clear — 1950 for the weapon, 2200 for the shoulders, and personal rating checks on top of team rating. Below those numbers, buy the Guardian's neck, bracers, belt, boots and ring with honor and fill the gated slots with your Season 3 Vengeful set.",
  },
  "hunter/beast-mastery": {
    1:
      "Nothing in the Gladiator's set is rating-locked, so the only limit is points — and until it is finished, stopgaps like General's Chain Bracers are all that stands between a cleave and the thinnest resilience budget of the expansion. Attack power comes free off stat sticks such as Twinblade of the Phoenix, so the real trade only bites on armor slots.",
    3:
      "Resilience scales hard enough here that a full swap no longer deletes you through the set, so it keeps the top slot even though every Vengeful piece also hands you more attack power than its Merciless counterpart. Vindicator's Chain Bracers, Girdle and Sabatons carry no gate — buy those first and bank arena points for the 1850-rating weapon and the 2000-rating spaulders.",
    4:
      "Guardian's Chain Bracers, Girdle and Sabatons cost honor and marks alone, so even a fresh hunter opens with more resilience than a Merciless-geared one ever carried — it still leads, there is simply less scrambling for it. What decides your list now is reach: clear 1950 for the weapon before chasing the 2200 spaulders, and note that several pieces check personal rating too.",
  },
  "hunter/marksmanship": {
    1:
      "Gladiator's Chain Helm carries the thinnest resilience budget of any set in the expansion, so a coordinated swap lands close to raw and one burst window ends you if you drift out of position. Nothing is rating-locked here, so buy the arena pieces in slot order and let Rift Stalker Hauberk and Thalassian Wildercloak cover what your points have not reached.",
    3:
      "Vengeful Gladiator's Chain Spaulders sit behind 2000 team rating and the Cleaver behind 1850 — below those numbers your Merciless pieces stay in, and they cost you nothing but item level. Everything else in the set is rating-free and carries a far larger resilience budget than Season 2 did, which is what lets you hold a global for Aimed Shot instead of spending it escaping.",
    4:
      "Brutal Gladiator's Chain Spaulders sit behind 2200 rating and the Cleaver behind 1950, with personal rating checked alongside team rating. Plan around what you can actually reach: Guardian's Chain Bracers, Girdle and Sabatons cost honor only, and last season's Vengeful set is the floor underneath them. Resilience is dense enough on every Brutal slot that missing one gated piece costs less than it would have two seasons ago.",
  },
  "hunter/survival": {
    1:
      "Nothing is gated, so the whole set is reachable on points alone — but the resilience on Gladiator's Chain Helm and its siblings is the thinnest in the expansion, and a coordinated swap still opens you up. Stack resilience and stamina first while your bracers, belt and boots are still dungeon and craft placeholders; agility scaling pays off once the set is closed.",
    3:
      "Vindicator's bracers, girdle and sabatons carry real resilience with no rating attached, so the defensive floor is set before you ever queue. Push team rating to 1850 for the Vengeful Gladiator's Cleaver and 2000 for the shoulders; until then keep Merciless pieces in those slots rather than dropping to a lower-resilience item for a few points of attack power.",
    4:
      "Guardian's Chain Bracers, Girdle and Sabatons are the honor floor — buy those first, since the resilience budget here is the highest in the expansion and the offset slots close the gap cheaply. Above that floor everything becomes a rating problem: 1950 for the Brutal Gladiator's Cleaver, 2200 for the shoulders, with personal rating checked on several pieces too.",
  },
  "mage/arcane": {
    1:
      "Resilience leads the list but there is barely any of it on offer — the Gladiator's Silk Cowl and Gladiator's Spellblade cost points alone, and everything between them is Marshal's and General's honor filler. Stamina does the real work: an opener eats the whole pool anyway, so raw health is what buys you time to reach Ice Block.",
    3:
      "A swap onto you stops being an instant loss once the bigger resilience budget lands, so stamina now sits behind it rather than propping it up. Buy toward the 1850-rating Vengeful Gladiator's Spellblade before the 2000-rating shoulders — the Season 2 amice keeps your four-piece intact while you climb — and let honor-bought Vindicator's Silk Cuffs and Belt fill the rest.",
    4:
      "The honor floor now hands you a full previous-season kit, so resilience is close to solved before you spend an arena point and the ordering only decides which gated piece to chase. Take the 1950-rating Brutal Gladiator's Spellblade over the 2200 amice — the weapon is where spell damage actually lands — and leave Guardian's Silk Footguards and Belt to cover whatever the personal-rating checks lock out.",
  },
  "mage/frost": {
    1:
      "Resilience leads because there is so little of it — the Gladiator's Silk Raiment and its +15 Resilience chest enchant are most of what stands between you and a coordinated opener, and nothing in the set is gated behind rating. Stamina matters as much as spell damage while half your offset slots are still dungeon and crafted filler waiting on the honor vendor.",
    3:
      "The Vengeful pieces carry far more resilience per slot, so a swap you used to Ice Block out of becomes something you can hold cooldowns through. Only the Spellblade at 1850 and the Silk Amice at 2000 are gated — keep your Merciless pieces in those two slots and buy the rating-free Vindicator's Silk Cuffs and Belt first for the stamina.",
    4:
      "Resilience per piece peaks here, which is why spell damage stays third even though everyone hits harder — the Brutal Gladiator's Silk Amice at 2200 and the Spellblade at 1950 are the only two upgrades most teams have to chase. Everything else is Guardian's honor gear or last season's set, and several pieces check personal rating too, so plan your points around the gates you can actually clear.",
  },
  "paladin/holy": {
    1:
      "Nothing is rating-locked, so your resilience total tracks how fast you farm points — Gladiator's Ornamented Chestguard before any +healing upgrade. Budgets this small blunt burst rather than stop it, which is why stamina buys the global you need to answer a stun. Wrist and waist have no arena piece yet; dungeon and crafted fills carry those slots.",
    3:
      "The Vengeful weapon needs 1850 and the shoulders 2000; everything else is rating-free, so the resilience-heavy body pieces land first and the two gated slots come last. That larger per-piece budget is what lets you eat a full swap and still cast — Merciless Gladiator's Ornamented Spaulders hold the shoulder slot until 2000, and Vindicator's Ornamented Bracers cost honor only.",
    4:
      "Gates decide this list more than stat weights do: Brutal Gladiator's Salvation checks 1950, the shoulders 2200, and several pieces read personal rating on top of team rating. Last season's Vengeful gear is the honor floor now, so put arena points into the highest-resilience slot you can actually unlock and let Guardian's Ornamented Bracers cover the rest.",
  },
  "paladin/retribution": {
    1:
      "Nobody has resilience yet, so opening trades end games outright — take every point the Gladiator's Scaled pieces carry and lean on stamina while your offset slots are still dungeon and crafted leftovers. Nothing is rating-locked, so finishing the set is the fastest survivability you can buy; attack power waits until the plate is on.",
    3:
      "The resilience on Vengeful plate is a real step up — enough that you live through a swap that would have killed you a season ago, which is what finally makes stacking attack power and crit worth it. Shoulders sit behind 2000 team rating and the weapon behind 1850, so keep Merciless shoulders and Vindicator's Scaled Belt until your team clears those numbers.",
    4:
      "Everyone you meet carries a full resilience budget now, so fights run long enough that stamina and sustained attack power decide them rather than a single swing. Guardian's Scaled Greaves and last season's Vengeful plate form the floor you can gear with no rating check; spend arena points only on the Brutal slots you actually clear — 1950 for the weapon, 2200 for shoulders.",
  },
  "priest/discipline": {
    1:
      "Resilience is scarcer here than it will ever be again, so the first Gladiator's Mooncloth pieces you buy — Robe, then Leggings — beat any healing upgrade they replace. Until the honor offsets unlock, dungeon and crafted fillers hold the neck, wrist and waist; take stamina over intellect there, because these games end inside a burst window, not on a mana bar.",
    3:
      "The resilience on Vengeful Gladiator's Mooncloth now blunts a full swap instead of merely delaying it, which is why the 2000-rating Mantle is the piece worth chasing first. Miss it and the Vindicator's honor line — Pendant of Salvation, Mooncloth Cuffs, Mooncloth Belt — carries the same stat shape with no gate, keeping bonus healing and stamina intact while you climb toward the 1850 weapon.",
    4:
      "Resilience per arena point peaks here, so the big slots come first — Brutal Gladiator's Mooncloth Robe and Leggings — while the 2200 Mantle and 1950 weapon wait for a rating you can actually hold. Guardian's Mooncloth Belt, Cuffs and Band of Salvation cover the offsets on honor alone, so what a gate costs you is resilience, never healing.",
  },
  "priest/holy": {
    1:
      "A full Gladiator's set carries so little resilience that a coordinated swap kills through it anyway, which pushes stamina up hard against intellect — dying with mana left is the standard loss here. Neck, wrist and belt sit on dungeon and crafted pieces until the honor offsets unlock, so take flat healing on those and worry about regen later.",
    3:
      "Enough resilience is on the table now that surviving a swap stops being a coin flip, and bonus healing pulls further ahead — you live long enough for the big heals to land. The Vengeful Gladiator's Mooncloth Mantle sits behind 2000 and the weapon behind 1850, so below those numbers you keep Merciless shoulders and spend points on the rating-free slots first.",
    4:
      "With the largest resilience pool of the expansion behind you, intellect and MP5 finally earn their keep — games go long enough that running dry loses them. Brutal Gladiator's Salvation needs 1950 and the shoulders 2200, with personal rating checked on several pieces on top, so the honor Guardian's cuffs, belt and pendant hold your floor while you chase whichever gated pieces your rating clears.",
  },
  "priest/shadow": {
    1:
      "The thinnest resilience budget of the expansion means stamina does most of the surviving — burst windows cut through what little mitigation Gladiator's Satin gear provides, and raw health is what buys your team the extra global. Take the set robe over Frozen Shadoweave Robe even at a damage loss, and plug the offset slots with dungeon and craft pieces until the honor versions unlock.",
    3:
      "Resilience jumps hard enough this season that a swap no longer burns through you before Vampiric Embrace pays out, so the offset slots can afford spell penetration again. Vindicator's Dreadweave pieces need only honor; the gates are 1850 for Vengeful Gladiator's Gavel and 2000 for the mantle, and Merciless gear covers both slots until you get there.",
    4:
      "Everyone is swimming in resilience by now, so the ordering only bites where the gates do: Brutal Gladiator's Gavel checks 1950 and the Satin Mantle 2200, with personal rating checked on top of team rating. Spend your first points on the pieces you can actually buy, hold Vengeful gear in the gated slots, and let Guardian's honor offsets carry neck, wrist, waist, feet and ring.",
  },
  "rogue/combat": {
    1:
      "Resilience is thin enough here that stamina carries most of your survivability — there is not enough of it in the game yet to blunt a full burst window, so raw health buys the seconds you need to answer. Nothing is rating-gated, so the buy order is simply Gladiator's Leather pieces first, with dungeon and honor offsets filling whatever slots are still empty.",
    3:
      "The resilience budget jumps sharply, and once you can eat an opener the match becomes the long grind this spec wants — attack power and agility finally pay off over a full minute instead of being erased in the first ten seconds. The Vengeful weapon wants 1850 and the spaulders 2000, so keep Merciless Gladiator's Leather Spaulders on until you clear it.",
    4:
      "With the deepest resilience pool of the expansion on both sides, damage that lands matters less than damage that keeps landing, which is why hit rating stays on the list at all and why Guardian's Leather Bracers beat any gated piece you cannot actually buy. Shop by rating: 1950 for the Brutal weapon, 2200 for the spaulders, Vengeful gear off the honor vendor for everything out of reach.",
  },
  "rogue/subtlety": {
    1:
      "Resilience is scarcer here than anywhere else in the expansion, so stamina does work it never has to do later — the Gladiator's Leather Tunic plus a big health pool is what carries you through a burst window that resilience cannot blunt. Buy the set pieces before chasing agility, and let Marshal's Leather Bracers hold the offset slots nothing else fills yet.",
    3:
      "The resilience on Vengeful pieces is a real step up — enough that a swap onto you no longer ends before Vanish comes back, which makes agility pay more than another stamina point. Clear the 1850 gate for the weapon first; the 2000-rating Vengeful Gladiator's Leather Spaulders can wait behind Merciless shoulders, and Vindicator's Leather Bracers cover the honor slots meanwhile.",
    4:
      "Every target now carries more resilience than you did two seasons ago, so the opener alone stops finishing people and agility has to pay for the follow-up chain — the resilience floor arrives free with honor-bought Vengeful pieces anyway. Take the 1950-rating Brutal Gladiator's Slicer before the 2200 shoulders; weapon damage beats one gated set piece.",
  },
  "shaman/elemental": {
    1:
      "Resilience leads because the Gladiator's set carries the thinnest budget the game ever shipped, and nobody across from you has much either — targets fold before the second cast lands. Stamina climbs while your wrist, waist and feet are still dungeon fillers with no PvP stats on them. Spend everything else on spell damage; penetration is the last thing to chase in a pool this shallow.",
    3:
      "The resilience jump on Vengeful pieces changes what a swap actually takes off you, which keeps it first — but only two slots are gated, the gavel at 1850 and the spaulders at 2000, and Merciless Gladiator's Mail Spaulders cover that shoulder gap at no rating. Everything else, Vindicator's offsets included, is bought outright, so push spell damage through those slots first.",
    4:
      "Brutal pieces carry the largest resilience budget of the expansion, so the order holds even when half your set is not Brutal yet — the gavel checks 1950 and the spaulders 2200, with personal rating counted as well. Guardian's Mail Bracers, Girdle and Sabatons cost honor only; fill those, then aim arena points at whichever gated slot adds the most spell damage.",
  },
  "shaman/enhancement": {
    1:
      "Nobody has enough resilience yet, so stamina does the work the Gladiator's Linked set can't — one burst window kills you outright at these health pools. Nothing is gated, so buy the set in slot order and plug the holes with Marshal's Linked Bracers and dungeon pieces instead of chasing attack power early.",
    3:
      "The resilience on Vengeful Gladiator's Linked Armor is a real step up — swaps that used to finish you now leave room to shock and totem out. The Spaulders check 2000 team rating and the weapon 1850, so what you actually equip depends on where your team lands. Take the rating-free Vindicator's offsets first; they raise your floor immediately.",
    4:
      "Gearing is an arithmetic problem now: Brutal Gladiator's Linked Spaulders require 2200 and the weapon 1950, with personal rating checked alongside team rating, so most players field a mixed set. Fill every ungated slot with Guardian's honor pieces before spending on a gated one — a complete honor floor beats two Brutal pieces and gaps everywhere else.",
  },
  "shaman/restoration": {
    1:
      "Nothing here is rating-gated, so your resilience ceiling is set by how fast you bank points — buy Gladiator's Ringmail Armor and the helm first, because burst still punches straight through the thin totals everyone is running. Until the Veteran's offsets unlock, dungeon and crafted pieces carry your bonus healing, and stamina outranks intellect while games end inside a burst window rather than on a mana bar.",
    3:
      "The Vengeful weapon sits behind 1850 team rating and the spaulders behind 2000; below those, keep Merciless Gladiator's Salvation and Mail Spaulders rather than dropping to a lower-resilience piece for raw healing. Every other slot is honor-bought through the Vindicator's offsets, so the resilience floor climbs high enough that surviving a swap stops being the whole game and throughput starts paying again.",
    4:
      "Weapon gates at 1950 and shoulders at 2200, with personal rating checked on top, so buy in order: Brutal Gladiator's Ringmail Helm and Armor early, spaulders whenever you get there. Vengeful pieces on honor cover anything your rating cannot reach, and with resilience at its expansion peak the ungated slots go to healing — Girdle of Fallen Stars still beats Guardian's Ringmail Girdle.",
  },
  "warlock/affliction": {
    1:
      "Resilience pools are the thinnest they ever get, so Gladiator's Dreadweave Robe blunts a swap rather than stopping it and raw stamina is what actually buys you the extra Fear. Nothing here is rating-gated — every piece comes from points alone — so plug the empty slots with honor and dungeon gear before you chase spell damage.",
    3:
      "The resilience budget jumps far enough that Vengeful Gladiator's Dreadweave Robe holds through a swap the old set folded to, which is what makes the 2000-rating shoulders sting: wear Merciless Gladiator's Dreadweave Mantle until you clear the gate. Vindicator's offsets carry no requirement at all, so bank honor and take that stamina immediately.",
    4:
      "Every gated slot becomes its own decision — Brutal Gladiator's Spellblade at 1950 and the mantle at 2200 are what you plan a whole season around, and several pieces check personal rating on top of team rating. Underneath those lines the Guardian's offsets cost only honor, and stacking them keeps the health pool your dots need.",
  },
  "warlock/demonology": {
    1:
      "Almost nothing outside the Gladiator's set carries resilience yet — the Dreadweave Robe and its four set-mates are the whole budget, and the dungeon and crafted fillers standing in for the honor offsets bring none at all. Pick those fillers for Stamina, because a deeper pool is the only thing that stretches a burst window long enough for your partner to answer.",
    3:
      "The resilience budget jumps far enough that a swap onto you no longer resolves inside two globals, so the rating-free Vindicator's cuffs, belt and boots do real work instead of just padding health. Clear 1850 for the Vengeful Spellblade before anything else; if 2000 shoulders stay out of reach, the Merciless mantle holds the set bonus in the meantime.",
    4:
      "Opponents now sit on the deepest resilience pool of the expansion, so Spell Damage stops being a rounding error even though it still ranks under Stamina — a Brutal Spellblade at 1950 beats another handful of health. Check the gate before you save: the 2200 mantle reads personal rating too, and the Vengeful set is the honor floor under every slot you cannot reach.",
  },
  "warlock/destruction": {
    1:
      "Resilience leads the order, but the Season 1 budget is thin enough that it only blunts an opening burst rather than stopping it, and the ladder you are shooting at is just as exposed. Wrist, belt and ring are still dungeon and crafted fillers this early, so stack spell damage there and let Gladiator's Spellblade set your ceiling.",
    3:
      "The resilience jump means a single Conflagrate crit no longer closes a match, so flat spell damage outranks chasing crit rating — you need the whole chain to land, not one lucky roll. Until 1850 opens the weapon and 2000 opens the shoulders, take the rating-free Vindicator's Dreadweave Cuffs and Vindicator's Band of Dominance and keep Season 2 in the gated slots.",
    4:
      "Guardian's honor gear puts a floor under your resilience before you spend an arena point, so the priority is really a question of which gated pieces you can reach. If 1950 for the Brutal Gladiator's Spellblade is out of range, bank points on Brutal Gladiator's Dreadweave Leggings — spell damage on a slot you can claim beats waiting on 2200 shoulders.",
  },
  "warrior/arms": {
    1:
      "Nobody has a full set yet, so the resilience on Gladiator's Plate Helm and Chestpiece does work no other gear can replace — burst windows still take people from full to dead. Stamina matters just as much while mitigation is this thin. Fill the gaps with Marshal's and dungeon offsets, and gem for crit only once the set pieces are in.",
    3:
      "The Vengeful pieces carry enough resilience that a swap you used to lose is now survivable, which is why the rating-free slots come first: Vindicator's Plate Bracers, Belt, Greaves and Pendant of Triumph all stack it for honor alone. Keep Merciless shoulders on until you hit 2000 rather than dropping resilience for a raid piece — attack power is the cheapest stat to add later.",
    4:
      "Resilience is at its expansion peak, so the question is not what to stack but what you can reach: Guardian's Plate Belt, Bracers and Greaves cost honor only, while Brutal Gladiator's Plate Shoulders sit behind 2200 and the Brutal weapon behind 1950. Below those gates, Vengeful pieces keep more resilience on you than any raid drop, and attack power stays the stat you buy last.",
  },
  "warrior/fury": {
    1:
      "Nothing is rating-gated yet, so your resilience total is simply whatever the Gladiator's set hands you — there is no spare budget anywhere, and an opener punches clean through what you have. Stack stamina alongside it so the first swap cannot finish you, and let dungeon and craft fillers hold the offset slots for attack power until the honor pieces unlock.",
    3:
      "The Vengeful Gladiator's Cleaver is gated at 1850 team rating and the shoulders at 2000, so the resilience you can actually field depends on where your team finishes the week. Below those gates, fill with Vindicator's honor plate rather than dropping to a lower-resilience raid piece — the deeper pool this season is what buys you a second offensive after surviving the first swap.",
    4:
      "Resilience comes cheapest from Guardian's honor plate, so build that floor before spending points and treat the Brutal Gladiator's Cleaver at 1950 and the shoulders at 2200 as the only pieces your rating truly decides. Several slots check personal rating as well as team, so weight attack power onto the ungated ones — Dragonstrike, Red Belt of Battle — instead of waiting on a gate you will not clear.",
  },
  "warrior/protection": {
    1:
      "Resilience is at its thinnest across the whole expansion, so swaps kill through it rather than around it — the stamina on plate you already tank in, Iron Gauntlets of the Maiden and Vambraces of Courage, is what keeps you standing. Nothing is gated, so buy Gladiator's Plate Chestpiece and Helm first and let Shield Block Value fill in behind them.",
    3:
      "The resilience budget jumps enough that a coordinated swap no longer beats your health pool before your cooldowns come back around. Only the Vengeful weapon at 1850 and the shoulders at 2000 are gated, so take Vengeful Gladiator's Plate Chestpiece and Helm on points alone and leave Merciless Gladiator's Plate Shoulders in the slot until the rating lands.",
    4:
      "The honor floor covers resilience and stamina outright — Guardian's Plate Greaves and Guardian's Plate Bracers are bought with time, not rating, so nobody arrives soft. What the order decides now is where that rating goes: the Brutal weapon at 1950, shoulders at 2200, and several slots checking personal rating alongside team rating before they will sell to you.",
  },
};
