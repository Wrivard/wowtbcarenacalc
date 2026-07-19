// Best race per class for TBC Classic, split by faction × content. Only
// includes race/class combos that actually exist in TBC. Racial notes are
// factual (Will of the Forsaken, Berserking, Blood Fury, Stoneform, etc.).

export interface RaceRec {
  faction: "horde" | "alliance";
  content: "pvp" | "pve";
  race: string;
  why: string;
  alternatives: { race: string; note: string }[];
}

export interface BestRace {
  class: string; // lib/classes slug
  recommendations: RaceRec[];
}

export const BEST_RACES: Record<string, BestRace> = {
  warrior: {
    class: "warrior",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Orc", why: "Hardiness (stun-resist) and Blood Fury make Orc the premier PvP warrior — surviving stuns is worth more than any other racial in arena.", alternatives: [{ race: "Tauren", note: "War Stomp is a free AoE stun setup and +5% health." }] },
      { faction: "horde", content: "pve", race: "Orc", why: "Blood Fury (attack power on demand) plus the axe expertise bonus give Orc the top Horde PvE damage.", alternatives: [{ race: "Troll", note: "Berserking is strong burst haste; Tauren for extra health." }] },
      { faction: "alliance", content: "pvp", race: "Human", why: "Weapon-skill racials act like free expertise, and Perception helps vs rogues. The strongest Alliance PvP warrior.", alternatives: [{ race: "Dwarf", note: "Stoneform removes bleeds/poisons and adds armor — a real defensive cooldown." }] },
      { faction: "alliance", content: "pve", race: "Human", why: "Mace/sword specialization gives free weapon skill (effective hit/expertise) for top Alliance threat and DPS.", alternatives: [{ race: "Draenei", note: "Heroic Presence adds +1% hit to the whole party — great raid utility." }] },
    ],
  },
  paladin: {
    class: "paladin",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Blood Elf", why: "Blood Elf is the only Horde paladin. Arcane Torrent is a free AoE silence — excellent against casters and interrupt setups.", alternatives: [] },
      { faction: "horde", content: "pve", race: "Blood Elf", why: "Only option, and Arcane Torrent's mana return actually helps Holy/Ret longevity.", alternatives: [] },
      { faction: "alliance", content: "pvp", race: "Human", why: "The Human Spirit and Perception plus weapon skill make Human the best Ret/Holy PvP paladin.", alternatives: [{ race: "Dwarf", note: "Stoneform is a strong defensive for a melee-facing paladin." }] },
      { faction: "alliance", content: "pve", race: "Draenei", why: "Heroic Presence gives the raid +1% hit and Gift of the Naaru is a free heal — the best raid-utility paladin.", alternatives: [{ race: "Human", note: "Spirit/weapon-skill racials for a Ret leaning DPS." }] },
    ],
  },
  hunter: {
    class: "hunter",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Orc", why: "Hardiness stun-resist keeps you kiting, and Blood Fury + Command (pet damage) boost your burst. Best Horde PvP hunter.", alternatives: [{ race: "Troll", note: "Berserking for burst; Beast Slaying vs beast pets." }] },
      { faction: "horde", content: "pve", race: "Troll", why: "Berserking is the best DPS racial for a hunter and Bow specialization adds crit — top Horde PvE.", alternatives: [{ race: "Orc", note: "Blood Fury + pet-damage Command for a strong all-round option." }] },
      { faction: "alliance", content: "pvp", race: "Night Elf", why: "Shadowmeld resets fights and drops targeting; Quickness adds dodge for the inevitable melee train.", alternatives: [{ race: "Dwarf", note: "Stoneform clears bleeds/poisons and Gun specialization adds crit." }] },
      { faction: "alliance", content: "pve", race: "Draenei", why: "Heroic Presence's +1% party hit and your own hit make Draenei the best raid-utility Alliance hunter.", alternatives: [{ race: "Dwarf", note: "Gun specialization crit if your BiS ranged is a gun." }] },
    ],
  },
  rogue: {
    class: "rogue",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Undead", why: "Will of the Forsaken breaks Fear, Sleep and Charm on demand — the single best PvP racial in the game for a rogue.", alternatives: [{ race: "Orc", note: "Hardiness stun-resist + Blood Fury for a more aggressive setup." }] },
      { faction: "horde", content: "pve", race: "Orc", why: "Blood Fury and dagger/sword expertise (axe spec) give Orc the top Horde PvE rogue damage.", alternatives: [{ race: "Troll", note: "Berserking burst haste is very close and great with cooldowns." }] },
      { faction: "alliance", content: "pvp", race: "Human", why: "Weapon-skill racials (free expertise) plus Perception vs stealth make Human the strongest Alliance PvP rogue.", alternatives: [{ race: "Dwarf", note: "Stoneform removes bleeds/poisons — a strong defensive." }, { race: "Gnome", note: "Escape Artist for snare-heavy matchups." }] },
      { faction: "alliance", content: "pve", race: "Human", why: "Sword/mace specialization is effectively free weapon skill for top Alliance PvE DPS.", alternatives: [{ race: "Night Elf", note: "Slightly behind, but Shadowmeld has niche uses." }] },
    ],
  },
  priest: {
    class: "priest",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Undead", why: "Will of the Forsaken is a hard counter to Fear/Sleep/Charm — mandatory for a PvP priest surviving lock/priest control.", alternatives: [{ race: "Blood Elf", note: "Arcane Torrent silence for aggressive Shadow play." }] },
      { faction: "horde", content: "pve", race: "Troll", why: "Berserking haste boosts both healing throughput and Shadow DPS — the best Horde PvE priest racial.", alternatives: [{ race: "Blood Elf", note: "Arcane Torrent mana return for Shadow." }] },
      { faction: "alliance", content: "pvp", race: "Dwarf", why: "Fear Ward and Stoneform (removes bleed/poison/disease) are excellent defensive utility for an arena priest.", alternatives: [{ race: "Draenei", note: "Gift of the Naaru is a free instant heal-over-time." }] },
      { faction: "alliance", content: "pve", race: "Draenei", why: "Heroic Presence gives Shadow priests and the raid +1% hit, and Gift of the Naaru adds healing utility.", alternatives: [{ race: "Dwarf", note: "Fear Ward is huge raid utility on fights with fear." }] },
    ],
  },
  shaman: {
    class: "shaman",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Orc", why: "Hardiness stun-resist keeps Enhancement in melee and protects your casts; Blood Fury adds burst. Best PvP shaman.", alternatives: [{ race: "Tauren", note: "War Stomp AoE stun + extra health for a control-leaning build." }] },
      { faction: "horde", content: "pve", race: "Orc", why: "Blood Fury boosts both spell and attack power, making Orc the top Enhancement/Elemental raider.", alternatives: [{ race: "Draenei", note: "Alliance-only in TBC — Horde shamans are Orc/Tauren/Troll." }] },
      { faction: "alliance", content: "pvp", race: "Draenei", why: "Draenei is the only Alliance shaman. Gift of the Naaru is a free heal and Heroic Presence adds hit.", alternatives: [] },
      { faction: "alliance", content: "pve", race: "Draenei", why: "Only option — and Heroic Presence's +1% party hit is genuinely strong raid utility.", alternatives: [] },
    ],
  },
  mage: {
    class: "mage",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Undead", why: "Will of the Forsaken breaks Fear/Sleep and is the best defensive racial for a PvP mage. Blood Elf silence is the aggressive alternative.", alternatives: [{ race: "Blood Elf", note: "Arcane Torrent AoE silence + mana return." }] },
      { faction: "horde", content: "pve", race: "Troll", why: "Berserking is the strongest DPS racial for a mage, scaling directly with your cast speed.", alternatives: [{ race: "Blood Elf", note: "Arcane Torrent mana return helps long fights." }] },
      { faction: "alliance", content: "pvp", race: "Gnome", why: "Escape Artist frees you from roots/snares to reset kiting, and Expansive Mind adds mana. The best Alliance PvP mage.", alternatives: [{ race: "Draenei", note: "Gift of the Naaru heal for extra survivability." }] },
      { faction: "alliance", content: "pve", race: "Draenei", why: "Heroic Presence's +1% party hit is strong raid utility; Gnome's Expansive Mind is the DPS-selfish alternative.", alternatives: [{ race: "Gnome", note: "Expansive Mind +5% mana and Arcane resistance." }] },
    ],
  },
  warlock: {
    class: "warlock",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Undead", why: "Will of the Forsaken breaks Fear/Sleep/Charm — vital in the Fear-heavy warlock mirror and vs priests. The best PvP warlock.", alternatives: [{ race: "Orc", note: "Hardiness + Blood Fury + pet-damage Command for aggressive play." }] },
      { faction: "horde", content: "pve", race: "Orc", why: "Blood Fury (spell power) and Command (+pet damage) give Orc the top Horde PvE warlock output.", alternatives: [{ race: "Blood Elf", note: "Arcane Torrent mana return for long fights." }] },
      { faction: "alliance", content: "pvp", race: "Gnome", why: "Escape Artist breaks snares to keep you kiting and casting; Expansive Mind adds mana. Best Alliance PvP warlock.", alternatives: [{ race: "Human", note: "The Human Spirit and Perception for a spirit-leaning build." }] },
      { faction: "alliance", content: "pve", race: "Gnome", why: "Expansive Mind (+5% mana) and the Engineering synergy make Gnome the best Alliance PvE warlock.", alternatives: [{ race: "Human", note: "The Human Spirit for regen-focused specs." }] },
    ],
  },
  druid: {
    class: "druid",
    recommendations: [
      { faction: "horde", content: "pvp", race: "Tauren", why: "Tauren is the only Horde druid. War Stomp is a free AoE stun that sets up kills or peels, and +5% health helps survivability.", alternatives: [] },
      { faction: "horde", content: "pve", race: "Tauren", why: "Only option — War Stomp has niche PvE uses and Endurance (+5% health) is pure survivability.", alternatives: [] },
      { faction: "alliance", content: "pvp", race: "Night Elf", why: "Night Elf is the only Alliance druid. Shadowmeld combos with prowl/kiting and Quickness adds +2% dodge.", alternatives: [] },
      { faction: "alliance", content: "pve", race: "Night Elf", why: "Only option — Quickness (+2% dodge) helps Feral tanking and Shadowmeld has occasional raid utility.", alternatives: [] },
    ],
  },
};

export function getBestRace(classSlug: string): BestRace | undefined {
  return BEST_RACES[classSlug];
}
