// Resolve a list of Wowhead item ids → merge name/icon/quality into
// data/items.json (so ItemLink can render icons + tooltips). Reuses the
// same tooltip API + cache as build-bis.mjs. Pass ids as args or edit the
// DEFAULT_IDS list.  Run:  node scripts/resolve-items.mjs 2840 2770 ...

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const TOOLTIP_BASE = "https://nether.wowhead.com/tbc/tooltip/item";
const CACHE_DIR = path.join(process.cwd(), ".talent-cache", "items");
const ITEMS_FILE = path.join(process.cwd(), "data", "items.json");
const DELAY_MS = 120;

// Profession-leveling materials (ores, bars, cloth, leather, gems, herbs,
// elemental primals) — the farmable inputs shown in the leveling tables.
const DEFAULT_IDS = [
  // ore + bars
  2770, 2840, 2771, 3576, 2841, 2775, 2842, 2772, 3575, 3858, 3860, 10620,
  12359, 23424, 23445, 23425, 23446, 3859, 6037, 12655,
  // gems
  774, 818, 1210, 1206, 1529, 3864, 7909, 1705, 7971, 12800, 12363, 23112,
  // cloth
  2589, 2592, 4306, 4338, 14047, 21877,
  // leather + hides
  2318, 2319, 4234, 4304, 8170, 21887, 8171, 15417,
  // elemental primals (LW/tailoring/BS end-game)
  22451, 21884, 22452, 22457, 21885, 22456,
  // enchanting mats
  10940, 11083, 11137, 11175, 16204, 22445, 22446, 22447, 22449, 22450,
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "wowtbcarenacalc-data-build (contact: site owner)" },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  const ids = (process.argv.slice(2).map(Number).filter(Boolean));
  const list = ids.length ? ids : DEFAULT_IDS;

  const items = JSON.parse(await readFile(ITEMS_FILE, "utf8"));
  let added = 0;
  for (const id of list) {
    if (items[id]) continue;
    const cacheFile = path.join(CACHE_DIR, `${id}.json`);
    let json;
    if (existsSync(cacheFile)) {
      json = JSON.parse(await readFile(cacheFile, "utf8"));
    } else {
      try {
        json = await fetchJson(`${TOOLTIP_BASE}/${id}`);
      } catch (e) {
        console.warn(`item ${id}: ${e.message}`);
        continue;
      }
      await writeFile(cacheFile, JSON.stringify(json));
      await sleep(DELAY_MS);
    }
    items[id] = { name: json.name, icon: json.icon, quality: json.quality };
    added++;
    console.log(`+ ${id} ${json.name} (${json.icon})`);
  }
  // Preserve the generator's 1-space-indent format.
  await writeFile(ITEMS_FILE, JSON.stringify(items, null, 1));
  console.log(`\nAdded ${added} items → data/items.json (${Object.keys(items).length} total)`);
}

await main();
