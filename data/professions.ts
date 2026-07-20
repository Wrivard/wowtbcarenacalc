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
