// TBC Classic profession guide data. Value ratings and benefits reflect
// established TBC theory (Drums of Battle, JC figurines, BS extra sockets,
// Engineering PvP utility, Tailoring caster sets, etc.). Ratings are the
// profession's raw endgame value, not a leveling verdict.

export type ProfTier = "S" | "A" | "B" | "C";
export type ProfCost = "cheap" | "moderate" | "expensive";

export interface Profession {
  slug: string;
  name: string;
  pvpValue: ProfTier;
  pveValue: ProfTier;
  bestFor: string[]; // class slugs (or "all")
  keyBenefit: string;
  provides: string[];
  levelingSummary: string;
  cost: ProfCost;
  gathering: boolean;
}

export const PROFESSIONS: Profession[] = [
  {
    slug: "jewelcrafting",
    name: "Jewelcrafting",
    pvpValue: "A",
    pveValue: "S",
    bestFor: ["all"],
    keyBenefit: "JC-only trinkets (Figurines) and special gems that no other profession can equip.",
    provides: [
      "Figurine trinkets (e.g. Nightseye Panther) — strong PvP and PvE trinket slots",
      "JC-only prismatic/statement gems above the quality of normal cuts",
      "Cut gems to gear yourself and sell for gold",
    ],
    levelingSummary:
      "1–375 via prospecting ore (Copper→Adamantite) and crafting the cheapest rings/necks at each tier. Prospecting Fel Iron/Adamantite carries the Outland levels.",
    cost: "moderate",
    gathering: false,
  },
  {
    slug: "engineering",
    name: "Engineering",
    pvpValue: "S",
    pveValue: "B",
    bestFor: ["hunter", "mage", "warlock", "rogue"],
    keyBenefit: "Unmatched PvP utility: grenades (AoE stun), Net-o-Matic, rocket boots, and on-use goggles.",
    provides: [
      "Frost/Fel Iron grenades — a second on-demand stun in arena",
      "Rocket Boots and Net-o-Matic for kiting and peeling",
      "Engineer-only goggles (BiS-adjacent for several specs) and gun/scope",
    ],
    levelingSummary:
      "1–375 through the classic bolt/scope/grenade recipes; Outland leans on Fel Iron/Adamantite parts. Pick Goblin or Gnomish at 200+ for the fun on-use toys.",
    cost: "expensive",
    gathering: false,
  },
  {
    slug: "tailoring",
    name: "Tailoring",
    pvpValue: "B",
    pveValue: "S",
    bestFor: ["mage", "warlock", "priest"],
    keyBenefit: "Cloak embroideries (Spellstrike/Spellthread) and the crafted caster sets — top-tier for spellcasters.",
    provides: [
      "Spellthread leg enchants (spell power) and cloak embroideries",
      "Spellfire / Frozen Shadoweave / Primal Mooncloth crafted caster sets",
      "Netherweave bags to fund your other professions",
    ],
    levelingSummary:
      "1–375 on bolts of cloth (cheap if you gather drops). Netherweave dominates the Outland levels; pick a specialization (Spellfire/Shadoweave/Mooncloth) at 350.",
    cost: "moderate",
    gathering: false,
  },
  {
    slug: "leatherworking",
    name: "Leatherworking",
    pvpValue: "B",
    pveValue: "S",
    bestFor: ["rogue", "druid", "hunter", "shaman"],
    keyBenefit: "Drums of Battle/War — a raid-wide haste cooldown that makes LW valuable to every group, plus Fel armor kits.",
    provides: [
      "Drums of Battle (raid haste) and Drums of War — huge group utility",
      "Fel armor kits (stamina/resilience) and crafted leather/mail BiS pieces",
      "Drums of Restoration for mana-hungry groups",
    ],
    levelingSummary:
      "1–375 on leather from Skinning (pair them). Knothide/Heavy Knothide carry Outland; take a specialization (Dragon/Elemental/Tribal) for the best crafted pieces.",
    cost: "moderate",
    gathering: false,
  },
  {
    slug: "blacksmithing",
    name: "Blacksmithing",
    pvpValue: "A",
    pveValue: "A",
    bestFor: ["warrior", "paladin", "rogue", "shaman"],
    keyBenefit: "Two extra socket slots (gloves + bracers) no one else gets, plus weaponsmith weapons.",
    provides: [
      "Socket Bracer + Socket Gloves — two bonus gem slots (best raw stat gain of any profession)",
      "Weaponsmith specialization weapons (Axe/Mace/Sword)",
      "Crafted plate BiS pieces for tanks and melee",
    ],
    levelingSummary:
      "1–375 on Mining ore (pair them). Fel Iron/Adamantite bars carry Outland; the two extra sockets alone justify it for any plate/weapon user.",
    cost: "expensive",
    gathering: false,
  },
  {
    slug: "enchanting",
    name: "Enchanting",
    pvpValue: "A",
    pveValue: "A",
    bestFor: ["all"],
    keyBenefit: "Ring enchants (spell power / stats / attack power) that only enchanters can apply to their own rings.",
    provides: [
      "Enchant Ring — spell power, +stats, or attack power on both rings",
      "Disenchanting for a steady gold/materials stream",
      "Self-sufficiency on every enchant you need",
    ],
    levelingSummary:
      "1–375 by disenchanting cheap greens and crafting the current-tier ring/rod enchants. The ring enchants pay for themselves at 70.",
    cost: "moderate",
    gathering: false,
  },
  {
    slug: "alchemy",
    name: "Alchemy",
    pvpValue: "A",
    pveValue: "A",
    bestFor: ["all"],
    keyBenefit: "The Alchemist's Stone trinket, flask/potion specialization, and transmute cooldowns for steady gold.",
    provides: [
      "Alchemist's Stone (boosts potion/elixir effect) — a strong utility trinket",
      "Flask/Elixir/Transmute specialization (double procs)",
      "Self-supply of flasks, potions, and combat elixirs",
    ],
    levelingSummary:
      "1–375 on herbs from Herbalism (pair them). Cheap to level and immediately useful — you'll always want your own flasks.",
    cost: "cheap",
    gathering: false,
  },
  {
    slug: "herbalism",
    name: "Herbalism",
    pvpValue: "B",
    pveValue: "C",
    bestFor: ["all"],
    keyBenefit: "Lifeblood — an instant self-heal with a minor haste kicker, plus it funds Alchemy.",
    provides: [
      "Lifeblood (instant heal-over-time, minor haste) — a free extra defensive",
      "Herbs to supply Alchemy or sell",
    ],
    levelingSummary:
      "1–375 by gathering while questing. The cheapest profession to level and the natural partner to Alchemy.",
    cost: "cheap",
    gathering: true,
  },
  {
    slug: "mining",
    name: "Mining",
    pvpValue: "B",
    pveValue: "C",
    bestFor: ["all"],
    keyBenefit: "Toughness — a flat stamina buff, useful survivability for PvP, and it feeds Blacksmithing/JC/Engineering.",
    provides: [
      "Toughness (+stamina) — cheap survivability",
      "Ore/bars to supply Blacksmithing, Jewelcrafting, or Engineering",
    ],
    levelingSummary:
      "1–375 by mining nodes while questing. Pairs with Blacksmithing, Jewelcrafting, or Engineering.",
    cost: "cheap",
    gathering: true,
  },
  {
    slug: "skinning",
    name: "Skinning",
    pvpValue: "C",
    pveValue: "B",
    bestFor: ["rogue", "druid", "hunter", "shaman"],
    keyBenefit: "Master of Anatomy — a flat critical-strike rating buff, and it feeds Leatherworking.",
    provides: [
      "Master of Anatomy (+crit rating) — solid for physical DPS",
      "Leather to supply Leatherworking or sell",
    ],
    levelingSummary:
      "1–375 by skinning kills while questing. The natural partner to Leatherworking.",
    cost: "cheap",
    gathering: true,
  },
  {
    slug: "first-aid",
    name: "First Aid",
    pvpValue: "B",
    pveValue: "C",
    bestFor: ["all"],
    keyBenefit: "Heavy bandages are a free out-of-combat and PvP self-heal — take it on every character.",
    provides: [
      "Heavy Netherweave Bandage — a strong channeled self-heal",
      "Off-GCD healing between fights and in arena resets",
    ],
    levelingSummary:
      "1–375 on cloth you already loot. A secondary skill — it doesn't take a primary slot.",
    cost: "cheap",
    gathering: false,
  },
  {
    slug: "cooking",
    name: "Cooking",
    pvpValue: "B",
    pveValue: "B",
    bestFor: ["all"],
    keyBenefit: "Well Fed food buffs (+stats) that stack with flasks/elixirs — cheap, universal throughput.",
    provides: [
      "Spec-appropriate +stat food (Spicy Crawdad, Blackened Basilisk, etc.)",
      "Stacks with flasks and elixirs for a free stat boost",
    ],
    levelingSummary:
      "1–375 on meat/fish you loot or catch. A secondary skill — take it on every raider.",
    cost: "cheap",
    gathering: false,
  },
];

// ── 1–375 leveling paths ────────────────────────────────────────────
// Tiered landmark route per profession (skill range → what to make/gather
// → main materials). An outline of the classic path, not exact craft
// counts — pair with a live guide for precise recipe numbers.
export interface LevelingStep {
  range: string; // skill range, e.g. "1–75"
  craft: string; // what to make or gather
  materials: string; // main materials / where
  note?: string;
}

export const PROFESSION_LEVELING: Record<string, LevelingStep[]> = {
  alchemy: [
    { range: "1–60", craft: "Minor Healing Potion", materials: "Peacebloom, Silverleaf, Empty Vials" },
    { range: "60–140", craft: "Healing / Lesser Mana Potion, Elixir of Minor Fortitude", materials: "Mageroyal, Briarthorn, Bruiseweed" },
    { range: "140–215", craft: "Greater Healing, Elixir of Fortitude", materials: "Kingsblood, Liferoot, Goldthorn, Fadeleaf" },
    { range: "215–265", craft: "Superior Mana Potion", materials: "Purple Lotus, Sungrass" },
    { range: "265–300", craft: "Major Healing Potion", materials: "Sungrass, Golden Sansam" },
    { range: "300–350", craft: "Volatile Healing Potion, Adept's Elixir", materials: "Felweed, Terocone, Netherbloom" },
    { range: "350–375", craft: "Super Mana/Healing Potion, transmutes", materials: "Ancient Lichen, Netherbloom, Nightmare Vine", note: "Learn Master Alchemist from the Outland trainer at 350." },
  ],
  blacksmithing: [
    { range: "1–65", craft: "Rough Sharpening Stone, Copper gear", materials: "Copper Bars" },
    { range: "65–125", craft: "Bronze bars → Bronze gear, Rough Grinding Stones", materials: "Copper + Tin Bars → Bronze" },
    { range: "125–200", craft: "Iron & Steel gear", materials: "Iron Bars, Steel Bars (Iron + Coal)" },
    { range: "200–260", craft: "Mithril gear (spurs, coif)", materials: "Mithril Bars" },
    { range: "260–300", craft: "Thorium gear (Imperial Plate)", materials: "Thorium Bars" },
    { range: "300–350", craft: "Fel Iron gear", materials: "Fel Iron Bars" },
    { range: "350–375", craft: "Adamantite / Khorium gear", materials: "Adamantite Bars, Felsteel", note: "Take Weaponsmith/Armorsmith and a sub-specialty for BiS crafts." },
  ],
  engineering: [
    { range: "1–50", craft: "Rough Blasting Powder, Handful of Copper Bolts", materials: "Copper Bars" },
    { range: "50–125", craft: "Bronze Tubes, Target Dummies, explosives", materials: "Bronze Bars, Wool Cloth" },
    { range: "125–200", craft: "Mithril tubes & gadgets, Gyrochronatoms", materials: "Mithril Bars" },
    { range: "200–260", craft: "Thorium widgets, Hi-Explosive Bombs", materials: "Thorium Bars" },
    { range: "260–300", craft: "Thorium Grenades, Delicate Copper Wire", materials: "Thorium Bars, Copper" },
    { range: "300–350", craft: "Fel Iron casings & bombs, White Smoke Flare", materials: "Fel Iron Bars" },
    { range: "350–375", craft: "Adamantite/Khorium devices, Felsteel Stabilizers", materials: "Adamantite Bars, Primals", note: "Pick Goblin or Gnomish at 200 for the on-use toys." },
  ],
  enchanting: [
    { range: "1–60", craft: "Enchant Bracer – Minor Health, Runed Copper Rod", materials: "Strange Dust (disenchant greens)" },
    { range: "60–140", craft: "Lesser enchants, Runed Silver Rod", materials: "Soul Dust, Lesser Magic/Astral Essence" },
    { range: "140–200", craft: "Vision Dust enchants", materials: "Vision Dust (disenchant ~30-40 greens)" },
    { range: "200–265", craft: "Illusion Dust enchants, cloak/weapon", materials: "Illusion Dust (~45-55 greens)" },
    { range: "265–300", craft: "Large Brilliant Shard enchants", materials: "Dream/Illusion Dust (~55-60 items)" },
    { range: "300–350", craft: "Arcane Dust enchants (Outland greens)", materials: "Arcane Dust (disenchant 60-67 greens)" },
    { range: "350–375", craft: "Prismatic Shard enchants, ring enchants", materials: "Arcane Dust, Prismatic Shards", note: "Disenchanting your own crafted items is the cheapest fuel." },
  ],
  jewelcrafting: [
    { range: "1–50", craft: "Delicate Copper Wire, Tigerseye/Malachite bands", materials: "Copper Bars, prospected Copper gems" },
    { range: "50–110", craft: "Bronze settings, simple rings/necks", materials: "Bronze Bars, prospected Bronze/Copper gems" },
    { range: "110–170", craft: "Rings & necklaces, prospect Iron", materials: "Iron/Mithril Bars + prospected gems" },
    { range: "170–230", craft: "Prospect Mithril, gem crafts", materials: "Mithril Ore" },
    { range: "230–300", craft: "Prospect Thorium, Citrine/Aquamarine rings", materials: "Thorium Ore" },
    { range: "300–350", craft: "Prospect Fel Iron, cut common gems", materials: "Fel Iron Ore" },
    { range: "350–375", craft: "Prospect Adamantite, cut rare gems", materials: "Adamantite Ore", note: "Prospecting stacks of ore is the fastest (and cheapest) route." },
  ],
  leatherworking: [
    { range: "1–70", craft: "Light Armor Kit, Handstitched pieces", materials: "Light Leather" },
    { range: "70–130", craft: "Embossed / Fine leather gear", materials: "Light + Medium Leather" },
    { range: "130–200", craft: "Heavy & Thick leather gear", materials: "Heavy Leather" },
    { range: "200–260", craft: "Rugged leather gear, Nightscape", materials: "Rugged Leather" },
    { range: "260–300", craft: "Wicked Leather / Rugged Armor Kit", materials: "Rugged Leather, Cured Rugged Hide" },
    { range: "300–350", craft: "Knothide Armor Kit, Knothide gear", materials: "Knothide Leather" },
    { range: "350–375", craft: "Heavy Knothide, Drums of Battle", materials: "Knothide Leather, Primals", note: "Pair with Skinning; take a sub-specialty (Dragon/Elemental/Tribal) at 350." },
  ],
  tailoring: [
    { range: "1–70", craft: "Bolt of Linen Cloth → Linen gear & bags", materials: "Linen Cloth" },
    { range: "70–125", craft: "Wool bolts → Wool gear", materials: "Wool Cloth" },
    { range: "125–200", craft: "Silk bolts → Silk gear", materials: "Silk Cloth" },
    { range: "200–260", craft: "Mageweave bolts → Mageweave gear", materials: "Mageweave Cloth" },
    { range: "260–300", craft: "Runecloth bolts → Runecloth gear & bags", materials: "Runecloth" },
    { range: "300–350", craft: "Bolt of Netherweave, Netherweave Bags", materials: "Netherweave Cloth" },
    { range: "350–375", craft: "Imbued Netherweave, specialization set pieces", materials: "Netherweave Cloth, Primals", note: "Pick Spellfire / Shadoweave / Mooncloth at 350 for the crafted caster set." },
  ],
  herbalism: [
    { range: "1–70", craft: "Gather Silverleaf, Peacebloom, Earthroot", materials: "Starting zones (Elwynn, Durotar, Teldrassil)" },
    { range: "70–150", craft: "Mageroyal, Briarthorn, Bruiseweed, Kingsblood", materials: "10–30 zones (Westfall, Barrens, Redridge)" },
    { range: "150–230", craft: "Goldthorn, Khadgar's Whisker, Liferoot, Sungrass", materials: "30–45 zones (Arathi, STV, Hinterlands)" },
    { range: "230–300", craft: "Golden Sansam, Dreamfoil, Mountain Silversage", materials: "50–60 zones (Un'Goro, Winterspring, Silithus)" },
    { range: "300–375", craft: "Felweed, Dreaming Glory, Terocone, Netherbloom, Ancient Lichen", materials: "Outland (Hellfire → Netherstorm)", note: "Pairs with Alchemy; grab Lifeblood as a bonus self-heal." },
  ],
  mining: [
    { range: "1–65", craft: "Mine Copper", materials: "Starting/10 zones" },
    { range: "65–125", craft: "Mine Tin & Silver", materials: "10–30 zones" },
    { range: "125–175", craft: "Mine Iron & Gold", materials: "30–40 zones (Arathi, Badlands)" },
    { range: "175–250", craft: "Mine Mithril & Truesilver", materials: "40–50 zones (Badlands, Tanaris, Hinterlands)" },
    { range: "250–300", craft: "Mine Thorium", materials: "50–60 zones (Un'Goro, Winterspring, EPL)" },
    { range: "300–375", craft: "Mine Fel Iron, Adamantite, Khorium", materials: "Outland (Hellfire → Netherstorm)", note: "Feeds Blacksmithing, Jewelcrafting and Engineering." },
  ],
  skinning: [
    { range: "1–100", craft: "Skin for Ruined & Light Leather", materials: "Low-level beasts (any starting zone)" },
    { range: "100–150", craft: "Skin for Medium Leather", materials: "20–30 zones" },
    { range: "150–200", craft: "Skin for Heavy Leather", materials: "30–40 zones" },
    { range: "200–300", craft: "Skin for Thick & Rugged Leather", materials: "40–60 zones (Un'Goro, Winterspring)" },
    { range: "300–375", craft: "Skin for Knothide Leather", materials: "Outland beasts (Nagrand is ideal)", note: "Pairs with Leatherworking; take Master of Anatomy for crit." },
  ],
  "first-aid": [
    { range: "1–80", craft: "Linen Bandage → Heavy Linen Bandage", materials: "Linen Cloth" },
    { range: "80–150", craft: "Wool → Heavy Wool Bandage", materials: "Wool Cloth" },
    { range: "150–210", craft: "Silk → Heavy Silk Bandage", materials: "Silk Cloth" },
    { range: "210–260", craft: "Mageweave Bandage", materials: "Mageweave Cloth" },
    { range: "260–300", craft: "Runecloth → Heavy Runecloth Bandage", materials: "Runecloth" },
    { range: "300–375", craft: "Netherweave → Heavy Netherweave Bandage", materials: "Netherweave Cloth", note: "Buy the Master First Aid book (Netherweave) from the Outland trainer." },
  ],
  cooking: [
    { range: "1–80", craft: "Spice Bread, Herb Baked Egg, cooked meats", materials: "Starting-zone meat & eggs" },
    { range: "80–150", craft: "Cooked Crab Claw, Boiled/Longjaw fish", materials: "10–30 zone meat & fish" },
    { range: "150–225", craft: "Curiously Tasty Omelet, Mystery Stew", materials: "30–45 zone meat & fish" },
    { range: "225–300", craft: "Spotted Yellowtail, Runn Tum Tuber Surprise", materials: "50–60 zone fish & meat" },
    { range: "300–375", craft: "Warp Burger, Feltail Delight, Ravager Dog", materials: "Outland meat & fish (Clefthoof, Feltail)", note: "Well-Fed food stacks with flasks — take it on every raider." },
  ],
};

export function getProfessionLeveling(slug: string): LevelingStep[] {
  return PROFESSION_LEVELING[slug] ?? [];
}

export function getProfession(slug: string): Profession | undefined {
  return PROFESSIONS.find((p) => p.slug === slug);
}

/** Top professions for a class + content, best value first (non-gathering). */
export function topProfessions(
  classSlug: string,
  content: "pvp" | "pve",
  limit = 4,
): Profession[] {
  const order = (p: Profession) =>
    PROF_TIER_ORDER[content === "pvp" ? p.pvpValue : p.pveValue];
  return PROFESSIONS.filter(
    (p) => !p.gathering && (p.bestFor.includes("all") || p.bestFor.includes(classSlug)),
  )
    .sort((a, b) => order(a) - order(b))
    .slice(0, limit);
}

export const PROF_TIER_ORDER: Record<ProfTier, number> = { S: 0, A: 1, B: 2, C: 3 };
