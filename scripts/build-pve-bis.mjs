// Generates data/bis/<class>-<spec>-pve-<phase>.json for every spec ×
// phase from the WarcraftLogs top-parser gear snapshot published by
// tbc-bis-guide.com (aggregated public logs data). Also regenerates
// data/bis/index.ts (scanning every list in data/bis) and extends
// data/items.json via the Wowhead tooltip API.
//
// Prose comes from scripts/pve-editorial.mjs (ours, per spec); the
// phase-specific opening sentence and FAQs are generated from each
// phase's own numbers so no two pages read the same.
//
// Run:  node scripts/build-pve-bis.mjs

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { PVE_EDITORIAL } from "./pve-editorial.mjs";

const SNAPSHOT_URL = "https://tbc-bis-guide.com/js/wcl-data.js?v=20260522b";
const TOOLTIP_BASE = "https://nether.wowhead.com/tbc/tooltip/item";

const OUT_DIR = path.join(process.cwd(), "data", "bis");
const CACHE_DIR = path.join(process.cwd(), ".talent-cache", "items");
const DELAY_MS = 120;

const SPEC_MAP = {
  "Warrior|Arms": ["warrior", "arms"],
  "Warrior|Fury": ["warrior", "fury"],
  "Warrior|Protection": ["warrior", "protection"],
  "Paladin|Holy": ["paladin", "holy"],
  "Paladin|Protection": ["paladin", "protection"],
  "Paladin|Retribution": ["paladin", "retribution"],
  "Hunter|Beast Mastery": ["hunter", "beast-mastery"],
  "Hunter|Marksmanship": ["hunter", "marksmanship"],
  "Hunter|Survival": ["hunter", "survival"],
  "Rogue|Assassination": ["rogue", "assassination"],
  "Rogue|Combat": ["rogue", "combat"],
  "Rogue|Subtlety": ["rogue", "subtlety"],
  "Priest|Discipline": ["priest", "discipline"],
  "Priest|Holy": ["priest", "holy"],
  "Priest|Shadow": ["priest", "shadow"],
  "Shaman|Elemental": ["shaman", "elemental"],
  "Shaman|Enhancement": ["shaman", "enhancement"],
  "Shaman|Restoration": ["shaman", "restoration"],
  "Mage|Arcane": ["mage", "arcane"],
  "Mage|Fire": ["mage", "fire"],
  "Mage|Frost": ["mage", "frost"],
  "Warlock|Affliction": ["warlock", "affliction"],
  "Warlock|Demonology": ["warlock", "demonology"],
  "Warlock|Destruction": ["warlock", "destruction"],
  "Druid|Balance": ["druid", "balance"],
  "Druid|Feral": ["druid", "feral-cat"],
  "Druid|Guardian": ["druid", "feral-bear"],
  "Druid|Restoration": ["druid", "restoration"],
};

const SLOT_NAME = {
  Wrists: "Wrist",
  "Ring 1": "Ring1",
  "Ring 2": "Ring2",
  "Trinket 1": "Trinket1",
  "Trinket 2": "Trinket2",
  "Main Hand": "MainHand",
  "Off Hand": "OffHand",
};

const ORDERED_SLOTS = [
  "Head", "Neck", "Shoulders", "Back", "Chest", "Wrist", "Hands", "Waist",
  "Legs", "Feet", "Ring1", "Ring2", "Trinket1", "Trinket2", "MainHand",
  "OffHand", "Ranged",
];

const PHASE_RAIDS = {
  1: "Karazhan, Gruul's Lair and Magtheridon",
  2: "Serpentshrine Cavern and Tempest Keep",
  3: "Black Temple and Mount Hyjal",
  4: "Zul'Aman",
  5: "Sunwell Plateau",
};

const CLASS_NAMES = {
  warrior: "Warrior", paladin: "Paladin", hunter: "Hunter", rogue: "Rogue",
  priest: "Priest", shaman: "Shaman", mage: "Mage", warlock: "Warlock",
  druid: "Druid",
};
const SPEC_NAMES = {
  "beast-mastery": "Beast Mastery",
  "feral-cat": "Feral (Cat)",
  "feral-bear": "Feral (Bear)",
};
function specDisplay(slug) {
  return SPEC_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "wowtbcarenacalc-data-build (contact: site owner)" },
  });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.text();
}

const METRIC_LABEL = { dps: "DPS parses", hps: "healing parses", krsi: "tank survival scores" };

function buildFaq(clsName, specName, phase, spec, slots) {
  const top = ORDERED_SLOTS.map((s) => slots[s]?.bis)
    .filter((b) => b?.usagePct !== undefined)
    .sort((a, b) => b.usagePct - a.usagePct)
    .slice(0, 3);
  const metric = METRIC_LABEL[spec.metric] ?? "parses";
  const faq = [
    {
      question: `Where does ${specName} ${clsName} Phase ${phase} BiS come from?`,
      answer: `From the gear worn by ${spec.totalPlayers} top-ranked ${specName} ${clsName} ${metric} on Warcraft Logs during Phase ${phase} (${PHASE_RAIDS[phase]}), aggregated per slot — what high parsers actually equip, not a spreadsheet ideal.`,
    },
  ];
  if (top.length >= 2) {
    faq.push({
      question: `What are the highest-consensus ${specName} ${clsName} items in Phase ${phase}?`,
      answer: `${top.map((t) => `${t.name} (${t.usagePct}%)`).join(", ")}. When an item sits above ~70% among top parsers, treat it as the priority drop to chase.`,
    });
  }
  faq.push({
    question: `Should I follow this list exactly for Phase ${phase}?`,
    answer: `Use it as a loot-priority guide, not a checklist — expand each slot's alternatives, because second-choice items are often within a few percent and drop from entirely different bosses in ${PHASE_RAIDS[phase]}.`,
  });
  return faq;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const raw = await fetchText(SNAPSHOT_URL);
  const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
  const updatedAt = data.meta.scrapedAt.slice(0, 10);
  const newItemIds = new Set();

  for (const [phase, specs] of Object.entries(data.phases)) {
    for (const [key, spec] of Object.entries(specs)) {
      const mapped = SPEC_MAP[key];
      if (!mapped) {
        console.warn(`skip unmapped ${key}`);
        continue;
      }
      const [classSlug, specSlug] = mapped;
      const editorial = PVE_EDITORIAL[`${classSlug}/${specSlug}`];
      if (!editorial)
        throw new Error(`missing pve editorial for ${classSlug}/${specSlug}`);

      const slots = {};
      for (const [rawSlot, items] of Object.entries(spec.slots)) {
        if (!items.length) continue;
        const slot = SLOT_NAME[rawSlot] ?? rawSlot;
        const [bis, ...alts] = items;
        slots[slot] = {
          slot,
          bis: { itemId: bis.id, name: bis.name, usagePct: bis.popularity },
          alternatives: alts.slice(0, 3).map((a) => ({
            itemId: a.id,
            name: a.name,
            usagePct: a.popularity,
          })),
        };
        newItemIds.add(bis.id);
        for (const a of alts.slice(0, 3)) newItemIds.add(a.id);
      }

      const clsName = CLASS_NAMES[classSlug];
      const specName = specDisplay(specSlug);
      const orderedSlots = ORDERED_SLOTS.filter((s) => slots[s]).map(
        (s) => slots[s],
      );
      const topPick = orderedSlots
        .map((s) => s.bis)
        .sort((a, b) => (b.usagePct ?? 0) - (a.usagePct ?? 0))[0];
      const metric = METRIC_LABEL[spec.metric] ?? "parses";

      const list = {
        class: classSlug,
        spec: specSlug,
        content: "pve",
        phase: Number(phase),
        sampleSize: spec.totalPlayers,
        updatedAt,
        blurb: `${editorial.blurb} This Phase ${phase} snapshot aggregates ${spec.totalPlayers} top ${metric} from ${PHASE_RAIDS[phase]}${topPick ? `; the highest-consensus pick is ${topPick.name} at ${topPick.usagePct}% usage` : ""}.`,
        statPriorityRationale: editorial.rationale,
        statPriority: editorial.statPriority,
        slots: orderedSlots,
        gems: [],
        enchants: [],
        faq: buildFaq(clsName, specName, Number(phase), spec, slots),
      };

      await writeFile(
        path.join(OUT_DIR, `${classSlug}-${specSlug}-pve-${phase}.json`),
        JSON.stringify(list, null, 1),
      );
    }
    console.log(`phase ${phase}: done`);
  }

  // Regenerate the registry by scanning every list file.
  const files = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".json"));
  const imports = [];
  const entries = [];
  for (let i = 0; i < files.length; i++) {
    const content = JSON.parse(
      await readFile(path.join(OUT_DIR, files[i]), "utf8"),
    );
    const key =
      content.content === "pvp"
        ? `${content.class}/${content.spec}/pvp`
        : `${content.class}/${content.spec}/pve/${content.phase}`;
    imports.push(`import list${i} from "@/data/bis/${files[i]}";`);
    entries.push(` "${key}": list${i} as BisList,`);
  }
  await writeFile(
    path.join(OUT_DIR, "index.ts"),
    `// AUTO-GENERATED by scripts/build-pve-bis.mjs — do not edit by hand.\nimport type { BisList } from "@/lib/bis";\n${imports.join("\n")}\n\nexport const BIS_REGISTRY: Record<string, BisList> = {\n${entries.join("\n")}\n};\n`,
  );
  console.log(`registry: ${files.length} lists`);

  // Extend data/items.json with any unseen items.
  const itemsPath = path.join(process.cwd(), "data", "items.json");
  const items = existsSync(itemsPath)
    ? JSON.parse(await readFile(itemsPath, "utf8"))
    : {};
  const missing = [...newItemIds].filter((id) => !items[String(id)]);
  console.log(`resolving ${missing.length} new items via Wowhead…`);
  for (const id of missing.sort((a, b) => a - b)) {
    const cacheFile = path.join(CACHE_DIR, `${id}.json`);
    let json;
    if (existsSync(cacheFile)) {
      json = JSON.parse(await readFile(cacheFile, "utf8"));
    } else {
      try {
        json = JSON.parse(await fetchText(`${TOOLTIP_BASE}/${id}`));
      } catch (e) {
        console.warn(`item ${id}: ${e.message}`);
        continue;
      }
      await writeFile(cacheFile, JSON.stringify(json));
      await sleep(DELAY_MS);
    }
    items[id] = { name: json.name, icon: json.icon, quality: json.quality };
  }
  await writeFile(itemsPath, JSON.stringify(items, null, 1));
  console.log(`data/items.json: ${Object.keys(items).length} items total`);
}

await main();
