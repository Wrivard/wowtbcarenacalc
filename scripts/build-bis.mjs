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

// The armory snapshot buckets BOTH ring positions (and both trinket
// positions) into ONE list, because it aggregates per item, not per finger.
// A character wears two of each, which is why the percentages inside these
// buckets routinely sum past 100 — they count slot occurrences, not players.
//
// Mapping that bucket to a single row shipped every PvP list with one ring
// and one trinket while the PvE lists, whose source reports each position
// separately, shipped two. Half the character was missing. Split the bucket
// back into the two positions it describes.
const PAIRED_SLOTS = {
  Ring: ["Ring1", "Ring2"],
  Trinket: ["Trinket1", "Trinket2"],
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

/**
 * The snapshot's `popularity` is userCount / playerCount, which the paired
 * buckets can push past 100: the feral cat ring bucket reports The 2 Ring
 * with 19 users against a 14-player sample, i.e. 136%. More users than
 * players is not a share of anything, so cap it — the page's caption
 * promises "share of surveyed players equipping this item", and above 100
 * the number stops being one.
 *
 * The uncapped value still drives the double-equip test in the slot loop,
 * which reads the raw entry rather than this.
 */
const usageShare = (pct) => (pct > 100 ? 100 : pct);

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
      // Raid-piece guard (bug 0c): the upstream snapshot is meant to be
      // sampled from arena-ACTIVE players (1800+ rating AND recent arena
      // games). When raid-loggers leak into the sample, a no-resilience
      // tier piece (isPvP === false) can top a slot. On a PvP page that is
      // always wrong — a resilience piece beats a raid piece for the top
      // slot regardless of raw popularity. So if the most-popular pick is
      // a PvE item and any resilience alternative exists, promote the
      // highest-usage PvP alternative to BiS and demote the raid piece.
      const ranked = [...items];
      if (ranked[0] && ranked[0].isPvP === false) {
        const bestPvpIdx = ranked.findIndex((it) => it.isPvP === true);
        if (bestPvpIdx > 0) {
          const [pvpPick] = ranked.splice(bestPvpIdx, 1);
          ranked.unshift(pvpPick);
        }
      }
      const targets = PAIRED_SLOTS[slot] ?? [slot];
      for (let pos = 0; pos < targets.length; pos++) {
        // Past 100% in a two-position bucket means the average player wears
        // more than one copy, so the same item is the honest pick for both
        // fingers. Anything at or below that takes the next entry down.
        const pick = ranked[0].popularity > 100 ? ranked[0] : ranked[pos];
        if (!pick) break;
        // The source cannot say which finger an item sat on, so both rows
        // offer the same remaining pool minus their own pick.
        const alts = ranked.filter((a) => a !== pick).slice(0, 3);
        slots[targets[pos]] = {
          slot: targets[pos],
          bisIsPvP: pick.isPvP,
          bis: {
            itemId: pick.id,
            name: pick.name,
            usagePct: usageShare(pick.popularity),
          },
          alternatives: alts.map((a) => ({
            itemId: a.id,
            name: a.name,
            usagePct: usageShare(a.popularity),
            ...(a.ratingGate
              ? { pveFlexNote: `Seen mostly above ${a.ratingGate} rating.` }
              : a.isPvEFlex
                ? { pveFlexNote: "PvE flex piece." }
                : {}),
          })),
        };
        allItemIds.add(pick.id);
        for (const a of alts) allItemIds.add(a.id);
      }
      // Gems and enchants are harvested from the bucket's top pick and keyed
      // on the bucket's own label ("Ring"), not the split positions — one
      // ring enchant covers both fingers.
      const bis = ranked[0];
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
      "Waist", "Legs", "Feet", "Ring1", "Ring2", "Trinket1", "Trinket2",
      "MainHand", "OffHand", "Ranged",
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
  //
  // Merged, not replaced: data/items.json is shared with the PvE lists, the
  // season pages, the gems and the enchant reagents. Writing only this
  // build's ids used to silently drop two thirds of the catalogue, and every
  // item that lost its entry fell back to bare text with no icon.
  const itemsPath = path.join(process.cwd(), "data", "items.json");
  const items = existsSync(itemsPath)
    ? JSON.parse(await readFile(itemsPath, "utf8"))
    : {};
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
  await writeFile(itemsPath, JSON.stringify(items, null, 1));
  console.log(`data/items.json: ${Object.keys(items).length} items`);
}

await main();
