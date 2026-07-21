// Verify every boss "portrait" icon referenced by data/raids.ts actually
// exists on the zamimg CDN, so no boss silently falls back to a skull.
// The CDN rejects HEAD, so we GET with a browser User-Agent. Run:
//   node scripts/resolve-boss-icons.mjs
// Exits non-zero (and lists them) if any icon 404s — keep this green
// whenever you add a boss to BOSS_ICONS.

const BASE = "https://wow.zamimg.com/images/wow/icons/large";

// Keep in sync with BOSS_ICONS in data/raids.ts.
const BOSS_ICONS = {
  "attumen-the-huntsman": "ability_mount_dreadsteed",
  moroes: "spell_shadow_summonvoidwalker",
  "maiden-of-virtue": "spell_holy_holybolt",
  "opera-event": "inv_mask_01",
  "the-curator": "spell_arcane_arcane04",
  "terestian-illhoof": "spell_shadow_summonfelguard",
  "shade-of-aran": "spell_frost_frostbolt02",
  netherspite: "spell_arcane_portalshattrath",
  "prince-malchezaar": "achievement_boss_prince_malchezaar",
  "high-king-maulgar": "ability_warrior_savageblow",
  "gruul-the-dragonkiller": "achievement_boss_gruulthedragonkiller",
  magtheridon: "achievement_boss_magtheridon",
  "hydross-the-unstable": "spell_frost_frostbolt02",
  "the-lurker-below": "spell_frost_summonwaterelemental",
  "leotheras-the-blind": "ability_warrior_innerrage",
  "fathom-lord-karathress": "spell_nature_lightning",
  "morogrim-tidewalker": "spell_frost_summonwaterelemental_2",
  "lady-vashj": "achievement_boss_ladyvashj",
  alar: "spell_fire_fire",
  "void-reaver": "spell_arcane_arcane01",
  "high-astromancer-solarian": "spell_arcane_starfire",
  "kaelthas-sunstrider": "spell_fire_selfdestruct",
  "rage-winterchill": "spell_frost_frostnova",
  anetheron: "spell_shadow_carrionswarm",
  kazrogal: "spell_shadow_curseofsargeras",
  azgalor: "spell_shadow_rainoffire",
  archimonde: "spell_arcane_blast",
  "high-warlord-najentus": "inv_spear_04",
  supremus: "spell_fire_meteorstorm",
  "shade-of-akama": "spell_shadow_shadowform",
  "teron-gorefiend": "spell_shadow_shadowfiend",
  "gurtogg-bloodboil": "spell_shadow_bloodboil",
  "reliquary-of-souls": "spell_shadow_soulleech_3",
  "mother-shahraz": "spell_shadow_mindshear",
  "illidari-council": "spell_holy_powerinfusion",
  "illidan-stormrage": "achievement_boss_illidan",
  nalorakk: "ability_druid_maul",
  akilzon: "spell_nature_callstorm",
  janalai: "spell_fire_flamebolt",
  halazzi: "ability_druid_challangingroar",
  "hex-lord-malacrass": "spell_shadow_shadowwordpain",
  zuljin: "achievement_boss_zuljin",
  kalecgos: "inv_misc_head_dragon_blue",
  brutallus: "spell_fire_soulburn",
  felmyst: "spell_fire_felflamering",
  "eredar-twins": "spell_shadow_shadowwordpain",
  muru: "spell_arcane_arcane04",
  kiljaeden: "spell_fire_felfire",
};

async function ok(icon) {
  try {
    const r = await fetch(`${BASE}/${icon}.jpg`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    return r.status === 200;
  } catch {
    return false;
  }
}

const missing = [];
for (const [id, icon] of Object.entries(BOSS_ICONS)) {
  if (!(await ok(icon))) missing.push(`${id} => ${icon}`);
}

if (missing.length) {
  console.error(`✗ ${missing.length} boss icon(s) 404 on the CDN:`);
  missing.forEach((m) => console.error("  ", m));
  process.exit(1);
}
console.log(`✓ all ${Object.keys(BOSS_ICONS).length} boss icons resolve`);
