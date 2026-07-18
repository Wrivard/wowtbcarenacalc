// Generates data/bis/<class>-<spec>-pvp.json for every spec present in
// the live arena snapshot, plus data/bis/index.ts (the import registry)
// and data/items.json (item id → name/icon/quality via the Wowhead
// tooltip API, per https://github.com/iamcal/Wowhead-API endpoints).
//
// Source: tbc-bis-guide.com's published PVP_DATA snapshot, itself
// aggregated weekly from the ironforge.pro arena leaderboard (public
// armory data). We reuse only the factual item/usage data; all prose is
// ours (scripts/bis-editorial.mjs). Rate-limited, cached, run manually.
//
// Run:  node scripts/build-bis.mjs

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { EDITORIAL } from "./bis-editorial.mjs";

const SNAPSHOT_URL = "https://tbc-bis-guide.com/js/pvp-data.js?v=20260712";
const TOOLTIP_BASE = "https://nether.wowhead.com/tbc/tooltip/item";

const OUT_DIR = path.join(process.cwd(), "data", "bis");
const CACHE_DIR = path.join(process.cwd(), ".talent-cache", "items");
const DELAY_MS = 120;

// "Class|Spec" in the snapshot → our class/spec slugs.
const SPEC_MAP = {
  "Warrior|Arms": ["warrior", "arms"],
  "Warrior|Fury": ["warrior", "fury"],
  "Warrior|Protection": ["warrior", "protection"],
  "Paladin|Holy": ["paladin", "holy"],
  "Paladin|Retribution": ["paladin", "retribution"],
  "Hunter|Beast Mastery": ["hunter", "beast-mastery"],
  "Hunter|Marksmanship": ["hunter", "marksmanship"],
  "Hunter|Survival": ["hunter", "survival"],
  "Rogue|Subtlety": ["rogue", "subtlety"],
  "Rogue|Combat": ["rogue", "combat"],
  "Priest|Discipline": ["priest", "discipline"],
  "Priest|Holy": ["priest", "holy"],
  "Priest|Shadow": ["priest", "shadow"],
  "Shaman|Elemental": ["shaman", "elemental"],
  "Shaman|Enhancement": ["shaman", "enhancement"],
  "Shaman|Restoration": ["shaman", "restoration"],
  "Mage|Arcane": ["mage", "arcane"],
  "Mage|Frost": ["mage", "frost"],
  "Warlock|Affliction": ["warlock", "affliction"],
  "Warlock|Demonology": ["warlock", "demonology"],
  "Warlock|Destruction": ["warlock", "destruction"],
  "Druid|Balance": ["druid", "balance"],
  "Druid|Feral Combat": ["druid", "feral-cat"],
  "Druid|Restoration": ["druid", "restoration"],
};

const SLOT_NAME = {
  "Main Hand": "MainHand",
  "Off Hand": "OffHand",
};

const CLASS_NAMES = {
  warrior: "Warrior", paladin: "Paladin", hunter: "Hunter", rogue: "Rogue",
  priest: "Priest", shaman: "Shaman", mage: "Mage", warlock: "Warlock",
  druid: "Druid",
};
const SPEC_NAMES = {
  "beast-mastery": "Beast Mastery", "feral-cat": "Feral", "feral-bear": "Feral",
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

function cleanEnchant(name) {
  return name.replace(/^Enchanted:\s*/, "");
}

function buildFaq(clsName, specName, spec, slots, gems) {
  const top = Object.values(slots)
    .map((s) => s.bis)
    .filter((b) => b.usagePct !== undefined)
    .sort((a, b) => b.usagePct - a.usagePct)
    .slice(0, 3);
  const mh = slots.MainHand?.bis;
  const pvpShare = Math.round(
    (Object.values(slots).filter((s) => s.bisIsPvP).length /
      Object.keys(slots).length) *
      100,
  );
  const faq = [];
  faq.push({
    question: `What rating are these ${specName} ${clsName}s?`,
    answer: `This snapshot covers ${spec.playerCount} ${specName} ${clsName}s between ${spec.ratingRange.min} and ${spec.ratingRange.max} rating (average ${spec.ratingRange.avg}) on the TBC Classic arena ladder, refreshed from public leaderboard data.`,
  });
  if (top.length >= 2) {
    faq.push({
      question: `What is the most-used ${specName} ${clsName} PvP gear right now?`,
      answer: `The highest-consensus picks are ${top
        .map((t) => `${t.name} (${t.usagePct}%)`)
        .join(", ")}. Anything above ~70% usage at this rating range is effectively mandatory.`,
    });
  }
  faq.push({
    question: `How much of the ${specName} ${clsName} BiS list is PvP gear vs raid gear?`,
    answer:
      pvpShare >= 60
        ? `${pvpShare}% of the most-used slots are arena/honor items — for ${specName} ${clsName}s the resilience on PvP gear beats raid alternatives almost everywhere. The exceptions are listed as alternatives per slot.`
        : `Only ${pvpShare}% of the most-used slots are PvP items — high-rated ${specName} ${clsName}s flex real raid pieces into this list, so check the per-slot alternatives before spending points on a marginal upgrade.`,
  });
  if (mh) {
    faq.push({
      question: `What weapon do ${specName} ${clsName}s use in arena?`,
      answer: `${mh.name} is the main-hand of choice (${mh.usagePct}% of surveyed players).`,
    });
  }
  if (gems.length >= 2) {
    faq.push({
      question: `What gems do ${specName} ${clsName}s socket for PvP?`,
      answer: `Across all sockets, the most-used gems in this snapshot are ${gems
        .slice(0, 3)
        .map((g) => g.name)
        .join(", ")}. Socket bonuses are usually ignored unless they align with these.`,
    });
  }
  return faq;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(CACHE_DIR, { recursive: true });

  const raw = await fetchText(SNAPSHOT_URL);
  const data = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
  const updatedAt = data.meta.analyzedAt.slice(0, 10);
  const allItemIds = new Set();
  const written = [];

  for (const [key, spec] of Object.entries(data.specs)) {
    const mapped = SPEC_MAP[key];
    if (!mapped) {
      console.warn(`skip unmapped spec ${key}`);
      continue;
    }
    const [classSlug, specSlug] = mapped;
    const editorial = EDITORIAL[`${classSlug}/${specSlug}`];
    if (!editorial) throw new Error(`missing editorial for ${classSlug}/${specSlug}`);

    // Slots: first entry = bis, rest = alternatives.
    const slots = {};
    const gemUsage = new Map();
    const enchants = [];
    for (const [rawSlot, items] of Object.entries(spec.slots)) {
      if (!items.length) continue;
      const slot = SLOT_NAME[rawSlot] ?? rawSlot;
      const [bis, ...alts] = items;
      slots[slot] = {
        slot,
        bisIsPvP: bis.isPvP,
        bis: { itemId: bis.id, name: bis.name, usagePct: bis.popularity },
        alternatives: alts.slice(0, 3).map((a) => ({
          itemId: a.id,
          name: a.name,
          usagePct: a.popularity,
          ...(a.ratingGate
            ? { pveFlexNote: `Seen mostly above ${a.ratingGate} rating.` }
            : a.isPvEFlex
              ? { pveFlexNote: "PvE flex piece." }
              : {}),
        })),
      };
      allItemIds.add(bis.id);
      for (const a of alts.slice(0, 3)) allItemIds.add(a.id);
      for (const g of bis.topGems ?? []) {
        const cur = gemUsage.get(g.id) ?? { id: g.id, name: g.name, usage: 0, slots: 0 };
        cur.usage += g.usage;
        cur.slots += 1;
        gemUsage.set(g.id, cur);
      }
      const topEnchant = (bis.topEnchants ?? [])[0];
      if (topEnchant) {
        enchants.push({
          slot,
          text: cleanEnchant(topEnchant.name),
          note: `${topEnchant.usage}% of surveyed players on this slot.`,
        });
      }
    }

    const gems = [...gemUsage.values()]
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 4)
      .map((g) => ({
        itemId: g.id,
        name: g.name,
        note: `Socketed across ${g.slots} slot${g.slots === 1 ? "" : "s"} in this snapshot.`,
      }));
    for (const g of gems) allItemIds.add(g.itemId);

    const clsName = CLASS_NAMES[classSlug];
    const specName = specDisplay(specSlug);

    const orderedSlotNames = [
      "Head", "Neck", "Shoulders", "Back", "Chest", "Wrist", "Hands",
      "Waist", "Legs", "Feet", "Ring", "Trinket", "MainHand", "OffHand", "Ranged",
    ];
    const orderedSlots = orderedSlotNames
      .filter((s) => slots[s])
      .map((s) => {
        const rest = { ...slots[s] };
        delete rest.bisIsPvP;
        return rest;
      });

    const list = {
      class: classSlug,
      spec: specSlug,
      content: "pvp",
      season: 2,
      ratingRange: [spec.ratingRange.min, spec.ratingRange.max],
      sampleSize: spec.playerCount,
      updatedAt,
      blurb: editorial.blurb,
      statPriorityRationale: editorial.rationale,
      statPriority: editorial.statPriority,
      slots: orderedSlots,
      gems,
      enchants,
      faq: buildFaq(clsName, specName, spec, slots, gems),
    };

    const filename = `${classSlug}-${specSlug}-pvp.json`;
    await writeFile(path.join(OUT_DIR, filename), JSON.stringify(list, null, 1));
    written.push({ classSlug, specSlug, filename });
    console.log(`${filename}: ${orderedSlots.length} slots, n=${spec.playerCount}`);
  }

  // Registry with static imports (typed, tree-shaken by Next).
  const importLines = written
    .map(
      (w, i) =>
        `import list${i} from "@/data/bis/${w.filename}";`,
    )
    .join("\n");
  const entries = written
    .map((w, i) => ` "${w.classSlug}/${w.specSlug}/pvp": list${i} as BisList,`)
    .join("\n");
  await writeFile(
    path.join(OUT_DIR, "index.ts"),
    `// AUTO-GENERATED by scripts/build-bis.mjs — do not edit by hand.\nimport type { BisList } from "@/lib/bis";\n${importLines}\n\nexport const BIS_REGISTRY: Record<string, BisList> = {\n${entries}\n};\n`,
  );

  // Item metadata (name/icon/quality) for server-rendered icons.
  const items = {};
  const ids = [...allItemIds].sort((a, b) => a - b);
  console.log(`resolving ${ids.length} items via Wowhead tooltip API…`);
  for (const id of ids) {
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
    items[id] = {
      name: json.name,
      icon: json.icon,
      quality: json.quality, // 0..5 (wowhead q index)
    };
  }
  await writeFile(
    path.join(process.cwd(), "data", "items.json"),
    JSON.stringify(items, null, 1),
  );
  console.log(`data/items.json: ${Object.keys(items).length} items`);
}

await main();
