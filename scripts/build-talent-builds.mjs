// Generates data/builds-generated.json — one recommended talent build
// per spec — from the wowsims/tbc preset builds (the community-standard
// sim presets, in Wowhead digit-string format), plus three hand-authored
// healer builds wowsims has no sim for. Every build is decoded against
// data/talents/<class>.json and validated for legality (61 points, tier
// gating, full-rank prereqs) before being written; a violation fails
// the run.
//
// Run:  node scripts/build-talent-builds.mjs

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const RAW_BASE = "https://raw.githubusercontent.com/wowsims/tbc/master/ui";

// spec → wowsims preset (file, preset name).
const PRESETS = {
  "warrior/arms": ["warrior", "Arms Slam"],
  "warrior/fury": ["warrior", "Fury"],
  "warrior/protection": ["protection_warrior", "Standard"],
  "paladin/protection": ["protection_paladin", "Ardent Defender"],
  "paladin/retribution": ["retribution_paladin", "Ret w/ Kings"],
  "hunter/beast-mastery": ["hunter", "BM"],
  "hunter/marksmanship": ["hunter", "Marksman"],
  "hunter/survival": ["hunter", "Survival"],
  "rogue/combat": ["rogue", "Combat"],
  "rogue/assassination": ["rogue", "Mutilate"],
  // rogue/subtlety: wowsims' only sub-tree preset ("Hemo") is a
  // Combat-dominant 0/40/21 PvE build — wrong tree for a Subtlety spec
  // page. Hand-authored below as the real 0/20/41 Shadowstep build.
  "priest/shadow": ["shadow_priest", "Standard"],
  "shaman/elemental": ["elemental_shaman", "Standard"],
  "shaman/enhancement": ["enhancement_shaman", "Ele Sub"],
  "mage/arcane": ["mage", "Arcane"],
  "mage/fire": ["mage", "Fire"],
  "mage/frost": ["mage", "Deep Frost"],
  "warlock/affliction": ["warlock", "Afflication"], // (sic — upstream typo)
  "warlock/demonology": ["warlock", "Demonologist"],
  "warlock/destruction": ["warlock", "Destruction"],
  "druid/balance": ["balance_druid", "Standard"],
  "druid/feral-cat": ["feral_druid", "Standard"],
  "druid/feral-bear": ["feral_tank_druid", "Standard"],
  "druid/restoration": ["balance_druid", "Resto"],
};

// Hand-authored standard builds for specs wowsims has no sim for.
// Rank maps keyed by talent id (validated against the dataset below).
const HAND_BUILDS = {
  // Subtlety 41 / Combat 20 — the classic TBC Shadowstep/Preparation
  // arena build (Hemorrhage, Premeditation, Cheat Death, Shadowstep),
  // genuinely Subtlety-dominant unlike wowsims' Combat "Hemo" preset.
  "rogue/subtlety": [
    {},
    {
      lightningReflexes: 5,
      deflection: 5,
      precision: 5,
      endurance: 2,
      riposte: 1,
      "improved-sprint": 2,
    },
    {
      opportunity: 5,
      camouflage: 5,
      initiative: 3,
      ghostlyStrike: 1,
      improvedAmbush: 1,
      serratedBlades: 3,
      setup: 2,
      hemorrhage: 1,
      preparation: 1,
      dirtyDeeds: 2,
      "heightened-senses": 1,
      deadliness: 5,
      premeditation: 1,
      "cheat-death": 3,
      "enveloping-shadows": 1,
      sinisterCalling: 5,
      shadowstep: 1,
    },
  ],
  // Holy 41 / Protection 20 — standard raid-healing build with
  // Divine Illumination, Kings and Improved Concentration Aura.
  "paladin/holy": [
    {
      divineStrength: 1,
      divineIntellect: 5,
      "spiritual-focus": 5,
      "healing-light": 3,
      "aura-mastery": 1,
      illumination: 5,
      improvedBlessingOfWisdom: 2,
      divineFavor: 1,
      "sanctified-light": 3,
      holyPower: 5,
      "light-s-grace": 3,
      holyShock: 1,
      holyGuidance: 5,
      divineIllumination: 1,
    },
    {
      improvedDevotionAura: 5,
      precision: 3,
      "guardian-s-favor": 2,
      blessingOfKings: 1,
      anticipation: 5,
      "improved-concentration-aura": 3,
      stoicism: 1,
    },
    {},
  ],
  // Discipline 41 / Holy 20 — Power Infusion + Pain Suppression.
  "priest/discipline": [
    {
      wandSpecialization: 5,
      improvedPowerWordFortitude: 2,
      "improved-power-word-shield": 3,
      innerFocus: 1,
      meditation: 3,
      absolution: 1,
      mentalAgility: 5,
      "improved-inner-fire": 3,
      mentalStrength: 5,
      divineSpirit: 1,
      improvedDivineSpirit: 2,
      forceOfWill: 5,
      powerInfusion: 1,
      enlightenment: 3,
      "pain-suppression": 1,
    },
    {
      holySpecialization: 5,
      divineFury: 5,
      inspiration: 3,
      "blessed-recovery": 2,
      "improved-healing": 3,
      "spell-warding": 2,
    },
    {},
  ],
  // Discipline 20 / Holy 41 — the Circle of Healing raid build.
  "priest/holy": [
    {
      wandSpecialization: 5,
      improvedPowerWordFortitude: 2,
      "improved-power-word-shield": 3,
      innerFocus: 1,
      meditation: 3,
      absolution: 1,
      mentalAgility: 5,
    },
    {
      holySpecialization: 5,
      divineFury: 5,
      inspiration: 3,
      "blessed-recovery": 2,
      "improved-healing": 3,
      "spell-warding": 2,
      spiritOfRedemption: 1,
      spiritualGuidance: 5,
      "spiritual-healing": 5,
      "holy-concentration": 3,
      lightwell: 1,
      "empowered-healing": 5,
      "circle-of-healing": 1,
    },
    {},
  ],
};

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "wowtbcarenacalc-data-build (contact: site owner)" },
  });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.text();
}

async function loadTalents(classSlug) {
  return JSON.parse(
    await readFile(
      path.join(process.cwd(), "data", "talents", `${classSlug}.json`),
      "utf8",
    ),
  );
}

function decode(cls, encoded) {
  const parts = encoded.split("-");
  return cls.trees.map((tree, ti) => {
    const digits = parts[ti] ?? "";
    return tree.talents.map((talent, i) =>
      Math.min(Number(digits[i] ?? 0) || 0, talent.maxRank),
    );
  });
}

function ranksFromMaps(cls, maps) {
  return cls.trees.map((tree, ti) => {
    const map = { ...(maps[ti] ?? {}) };
    const ranks = tree.talents.map((t) => {
      const r = map[t.id] ?? 0;
      delete map[t.id];
      if (r > t.maxRank) throw new Error(`${t.id}: rank ${r} > max ${t.maxRank}`);
      return r;
    });
    const leftover = Object.keys(map);
    if (leftover.length)
      throw new Error(`unknown talent ids in ${cls.class}: ${leftover.join(", ")}`);
    return ranks;
  });
}

function validate(cls, build, key) {
  const total = build.flat().reduce((a, b) => a + b, 0);
  if (total > 61) throw new Error(`${key}: ${total} points > 61`);
  if (total < 55) throw new Error(`${key}: only ${total} points — suspicious`);
  cls.trees.forEach((tree, ti) => {
    const ranks = build[ti];
    tree.talents.forEach((t, i) => {
      if (ranks[i] === 0) return;
      const below = tree.talents.reduce(
        (s, x, j) => (x.row < t.row ? s + ranks[j] : s),
        0,
      );
      if (below < t.requiresPoints)
        throw new Error(`${key}: ${t.id} tier gate violated (${below}/${t.requiresPoints})`);
      if (t.requires) {
        const pi = tree.talents.findIndex((x) => x.id === t.requires.talentId);
        if (ranks[pi] < tree.talents[pi].maxRank)
          throw new Error(`${key}: ${t.id} prereq ${t.requires.talentId} not maxed`);
      }
    });
  });
  return total;
}

function encode(build) {
  return build
    .map((tree) => tree.join("").replace(/0+$/, ""))
    .join("-")
    .replace(/-+$/, "");
}

function summary(build) {
  return build.map((t) => t.reduce((a, b) => a + b, 0)).join("/");
}

async function main() {
  const presetCache = new Map();
  async function presetsFor(file) {
    if (!presetCache.has(file)) {
      const src = await fetchText(`${RAW_BASE}/${file}/presets.ts`);
      const found = {};
      for (const m of src.matchAll(
        /name: '([^']+)',\s*\n\s*data: '([0-9-]+)'/g,
      )) {
        found[m[1]] = m[2];
      }
      presetCache.set(file, found);
    }
    return presetCache.get(file);
  }

  const out = [];
  const today = new Date().toISOString().slice(0, 10);

  for (const [key, [file, presetName]] of Object.entries(PRESETS)) {
    const [classSlug, specSlug] = key.split("/");
    const cls = await loadTalents(classSlug);
    const presets = await presetsFor(file);
    const encoded = presets[presetName];
    if (!encoded)
      throw new Error(`preset "${presetName}" not found in ${file} (${Object.keys(presets).join(", ")})`);
    const build = decode(cls, encoded);
    const total = validate(cls, build, key);
    out.push({
      classSlug,
      specSlug,
      encoded: encode(build),
      summaryLabel: summary(build),
      source: `wowsims "${presetName}" preset`,
      updatedAt: today,
    });
    console.log(`${key}: ${summary(build)} (${total} pts) [wowsims ${presetName}]`);
  }

  for (const [key, maps] of Object.entries(HAND_BUILDS)) {
    const [classSlug, specSlug] = key.split("/");
    const cls = await loadTalents(classSlug);
    const build = ranksFromMaps(cls, maps);
    const total = validate(cls, build, key);
    out.push({
      classSlug,
      specSlug,
      encoded: encode(build),
      summaryLabel: summary(build),
      source: "curated standard build",
      updatedAt: today,
    });
    console.log(`${key}: ${summary(build)} (${total} pts) [hand]`);
  }

  await writeFile(
    path.join(process.cwd(), "data", "builds-generated.json"),
    JSON.stringify(out, null, 1),
  );
  console.log(`data/builds-generated.json: ${out.length} builds`);
}

await main();
