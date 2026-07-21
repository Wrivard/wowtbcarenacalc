// Builds data/itemSources.ts from Wowhead's per-item &xml endpoint, whose
// <json> block carries a structured `source` (type) + `sourcemore` (the
// dropping boss / vendor / zone). This is the authoritative acquisition
// data — it also corrects hand-seeded mistakes.
//
// Scope is controlled by argv:
//   node scripts/build-item-sources.mjs pillars   # only the 8 pillar specs
//   node scripts/build-item-sources.mjs all        # every BiS item + alts
//
// Fetches are cached per item under .talent-cache/sources, so re-runs are
// cheap and resumable. Any unmapped zone id is logged so the ZONES table
// can be extended rather than silently emitting "Zone 1234".

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const BIS_DIR = path.join(process.cwd(), "data", "bis");
const CACHE_DIR = path.join(process.cwd(), ".talent-cache", "sources");
const OUT = path.join(process.cwd(), "data", "itemSources.ts");
const DELAY_MS = 110;

const PILLARS = [
  "rogue-subtlety-pvp", "priest-discipline-pvp", "warrior-arms-pvp",
  "mage-frost-pvp", "warlock-affliction-pvp", "druid-restoration-pvp",
  "shaman-restoration-pvp", "paladin-holy-pvp",
];

// TBC zone ids (Wowhead `z`) → readable name, split so a generic "drop"
// (Wowhead source id 2) can be classified raid vs dungeon vs world by zone.
const RAID_ZONES = {
  3457: "Karazhan", 3923: "Gruul's Lair", 3836: "Magtheridon's Lair",
  3607: "Serpentshrine Cavern", 3845: "Tempest Keep: The Eye",
  3606: "Hyjal Summit", 3959: "Black Temple", 3805: "Zul'Aman",
  4075: "Sunwell Plateau",
};
const DUNGEON_ZONES = {
  3562: "Hellfire Ramparts", 3713: "The Blood Furnace", 3714: "The Shattered Halls",
  3717: "The Slave Pens", 3716: "The Underbog", 3715: "The Steamvault",
  3789: "Shadow Labyrinth", 3790: "Sethekk Halls", 3791: "Mana-Tombs",
  3792: "Auchenai Crypts", 3847: "The Botanica", 3848: "The Mechanar",
  3849: "The Arcatraz", 3791.5: "Coilfang", 4076: "Magisters' Terrace",
};
const OPEN_ZONES = {
  3702: "Hellfire Peninsula", 3483: "Hellfire Peninsula", 3518: "Nagrand",
  3519: "Terokkar Forest", 3520: "Shadowmoon Valley", 3521: "Zangarmarsh",
  3522: "Blade's Edge Mountains", 3523: "Netherstorm", 3524: "Azuremyst Isle",
  3525: "Bloodmyst Isle", 3430: "Eversong Woods", 3433: "Ghostlands",
  3487: "Silvermoon City", 3703: "Shattrath City", 4080: "Isle of Quel'Danas",
  1519: "Stormwind City", 1637: "Orgrimmar",
};
function zoneName(z) {
  return RAID_ZONES[z] ?? DUNGEON_ZONES[z] ?? OPEN_ZONES[z] ?? null;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function parseSourceJson(xml) {
  // The <json> CDATA is a JS object literal fragment (no braces): pull it,
  // wrap and JSON-parse.
  const m = xml.match(/<json><!\[CDATA\[(.*?)\]\]><\/json>/s);
  if (!m) return null;
  try {
    return JSON.parse(`{${m[1]}}`);
  } catch {
    return null;
  }
}

async function fetchXml(id) {
  const cacheFile = path.join(CACHE_DIR, `${id}.xml`);
  if (existsSync(cacheFile)) return readFile(cacheFile, "utf8");
  // Wowhead rate-limits bulk access with 403/429 — back off and retry
  // rather than dropping the item.
  let lastErr;
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://www.wowhead.com/tbc/item=${id}&xml`, {
      headers: { "user-agent": "Mozilla/5.0 wowtbcarenacalc-data-build" },
    });
    if (res.ok) {
      const text = await res.text();
      // A valid item always has an <item> node; a 200 error page won't.
      if (text.includes("<item ")) {
        await writeFile(cacheFile, text);
        await sleep(DELAY_MS);
        return text;
      }
      lastErr = new Error("no <item> node");
    } else {
      lastErr = new Error(`${res.status}`);
      if (res.status === 403 || res.status === 429) {
        await sleep(2000 * (attempt + 1)); // 2s, 4s, 6s backoff
        continue;
      }
    }
    break; // non-retryable
  }
  throw lastErr ?? new Error("fetch failed");
}

function toEntry(json, unmappedZones) {
  const typeId = Array.isArray(json.source) ? json.source[0] : undefined;
  const more = Array.isArray(json.sourcemore) ? json.sourcemore[0] : undefined;
  const name = more?.n; // dropping NPC / vendor / quest giver / recipe
  const z = more?.z;
  const zn = z != null ? zoneName(z) : null;
  if (z != null && !zn) unmappedZones.set(z, (unmappedZones.get(z) ?? 0) + 1);

  // Classify. Wowhead source ids: 1 crafted, 2 drop, 4 quest, 5 vendor.
  let type;
  if (typeId === 5 || typeId === 10) type = "vendor";
  else if (typeId === 4) type = "quest";
  else if (typeId === 1 || typeId === 6) type = "crafted";
  else if (typeId === 2) {
    if (z != null && RAID_ZONES[z]) type = "raid";
    else if (z != null && DUNGEON_ZONES[z]) type = "dungeon";
    else type = "world";
  } else type = "world";

  // Only emit a source we're actually confident about — a bare
  // "Vendor — Unknown" is worse than showing nothing (the slot renders no
  // source line when this returns null).
  if (type === "crafted") {
    return { type: "crafted", location: "Crafted" };
  }
  if (type === "raid" || type === "dungeon") {
    if (!zn) return null; // need at least the instance name
    const entry = { type, location: zn };
    if (name) entry.boss = name;
    return entry;
  }
  if (type === "vendor") {
    if (!name && !zn) return null;
    return { type, location: zn ? (name ? `${name} (${zn})` : zn) : name };
  }
  if (type === "quest") {
    if (!name) return null;
    return { type, location: zn ? `${name} (${zn})` : name };
  }
  // world drop
  if (!zn && !name) return null;
  return { type: "world", location: zn ?? name };
}

async function collectIds(scope) {
  const files = (await readdir(BIS_DIR)).filter((f) => f.endsWith(".json"));
  const ids = new Set();
  for (const f of files) {
    if (scope === "pillars" && !PILLARS.some((p) => f.startsWith(p))) continue;
    const d = JSON.parse(await readFile(path.join(BIS_DIR, f), "utf8"));
    for (const s of d.slots ?? []) {
      ids.add(s.bis.itemId);
      for (const a of s.alternatives ?? []) ids.add(a.itemId);
    }
  }
  return [...ids].sort((a, b) => a - b);
}

async function main() {
  const scope = process.argv[2] ?? "pillars";
  await mkdir(CACHE_DIR, { recursive: true });
  const ids = await collectIds(scope);
  console.log(`scope=${scope}: ${ids.length} unique items`);

  const sources = {};
  const unmappedZones = new Map();
  let ok = 0, fail = 0, skip = 0;
  for (const id of ids) {
    try {
      const xml = await fetchXml(id);
      const json = parseSourceJson(xml);
      if (!json || !json.source) { fail++; continue; }
      const entry = toEntry(json, unmappedZones);
      if (!entry) { skip++; continue; }
      sources[id] = [entry];
      ok++;
    } catch (e) {
      console.warn(`  item ${id}: ${e.message}`);
      fail++;
    }
    if ((ok + fail) % 50 === 0) console.log(`  …${ok + fail}/${ids.length}`);
  }
  console.log(`resolved ${ok}, skipped(low-confidence) ${skip}, failed ${fail}`);
  if (unmappedZones.size)
    console.log(`⚠ unmapped zone ids:`, [...unmappedZones.entries()].sort((a,b)=>b[1]-a[1]).slice(0,20));

  // Merge with any existing hand-authored entries: scraped data wins on
  // conflicts (it's authoritative), hand entries fill items not scraped.
  const existing = await readExistingSources();
  const merged = { ...existing, ...sources };
  await writeSourcesFile(merged, scope, ok);
  console.log(`data/itemSources.ts: ${Object.keys(merged).length} items total`);
}

async function readExistingSources() {
  const src = await readFile(OUT, "utf8");
  const m = src.match(/const SOURCES[^=]*=\s*(\{[\s\S]*?\n\});/);
  if (!m) return {};
  try {
    // eslint-disable-next-line no-eval
    return eval(`(${m[1]})`);
  } catch {
    return {};
  }
}

async function writeSourcesFile(sources, scope, count) {
  const ids = Object.keys(sources).map(Number).sort((a, b) => a - b);
  const body = ids
    .map((id) => `  ${id}: ${JSON.stringify(sources[id])},`)
    .join("\n");

  const out = `// Item acquisition sources, keyed by Wowhead item id. Generated by
// scripts/build-item-sources.mjs from Wowhead's &xml \`sourcemore\` data
// (authoritative — it corrects hand-seeded mistakes). Last scope: ${scope}
// (${count} items resolved). Pages render the source on slot-expand.
//
// Re-run: node scripts/build-item-sources.mjs all

export interface ItemSourceEntry {
  type: "raid" | "dungeon" | "vendor" | "crafted" | "pvp" | "world" | "quest";
  location: string;
  boss?: string;
  dropRate?: string;
  currency?: string;
  profession?: string;
}

export interface ItemSource {
  itemId: number;
  sources: ItemSourceEntry[];
}

const SOURCES: Record<number, ItemSourceEntry[]> = {
${body}
};

const TYPE_LABEL: Record<ItemSourceEntry["type"], string> = {
  raid: "Raid",
  dungeon: "Dungeon",
  vendor: "Vendor",
  crafted: "Crafted",
  pvp: "PvP",
  world: "World Drop",
  quest: "Quest",
};

export function getItemSource(itemId: number): ItemSourceEntry[] | null {
  return SOURCES[itemId] ?? null;
}

/** One-line human string, e.g. "Raid — Karazhan (Prince Malchezaar)". */
export function formatItemSource(s: ItemSourceEntry): string {
  const parts = [TYPE_LABEL[s.type], "—", s.location];
  const extra = [s.boss, s.dropRate, s.currency, s.profession].filter(Boolean);
  let str = parts.join(" ");
  if (extra.length) str += \` (\${extra.join(", ")})\`;
  return str;
}
`;
  await writeFile(OUT, out);
}

await main();
