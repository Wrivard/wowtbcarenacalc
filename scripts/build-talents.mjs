// Generates data/talents/<class>.json from the wowsims/tbc talent dataset.
//
// Sources (cited in the site footer as required):
//   - Structure (rows/cols/maxRank/prereqs/spellIds):
//     https://github.com/wowsims/tbc  →  ui/core/talents/<class>.ts
//   - Names, icon names, rank-1 descriptions:
//     Wowhead tooltip API  https://nether.wowhead.com/tbc/tooltip/spell/<id>
//
// Run:  node scripts/build-talents.mjs [--offline]
//   --offline reuses cached Wowhead responses in scratch (fails on miss).
//
// The output is committed; re-run only when upstream data changes.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const CLASSES = [
  "druid",
  "hunter",
  "mage",
  "paladin",
  "priest",
  "rogue",
  "shaman",
  "warlock",
  "warrior",
];

const RAW_BASE =
  "https://raw.githubusercontent.com/wowsims/tbc/master/ui/core/talents";
const TOOLTIP_BASE = "https://nether.wowhead.com/tbc/tooltip/spell";

const OUT_DIR = path.join(process.cwd(), "data", "talents");
const CACHE_DIR = path.join(process.cwd(), ".talent-cache");

const DELAY_MS = 120; // be polite to Wowhead

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

// Extract the `newTalentsConfig([ ... ])` array literal from a wowsims
// talent file and evaluate it (the literal is plain data w/ comments).
function extractConfig(source) {
  const start = source.indexOf("newTalentsConfig([");
  if (start === -1) throw new Error("newTalentsConfig not found");
  const arrStart = source.indexOf("[", start);
  // Find the matching closing bracket.
  let depth = 0;
  let end = -1;
  for (let i = arrStart; i < source.length; i++) {
    const ch = source[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error("unbalanced brackets");
  const literal = source.slice(arrStart, end + 1);
  return new Function(`return (${literal});`)();
}

// Same rank-expansion logic as wowsims newTalentsConfig().
function expandSpellIds(talent) {
  const ids = [...talent.spellIds];
  let cur = ids[ids.length - 1];
  while (ids.length < talent.maxPoints) {
    cur++;
    ids.push(cur);
  }
  return ids;
}

async function cachedTooltip(spellId) {
  const cacheFile = path.join(CACHE_DIR, `${spellId}.json`);
  if (existsSync(cacheFile)) {
    return JSON.parse(await readFile(cacheFile, "utf8"));
  }
  if (process.argv.includes("--offline")) {
    throw new Error(`offline mode: no cache for spell ${spellId}`);
  }
  const json = JSON.parse(await fetchText(`${TOOLTIP_BASE}/${spellId}`));
  await writeFile(cacheFile, JSON.stringify(json));
  await sleep(DELAY_MS);
  return json;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// The tooltip HTML's last <table> holds the talent description.
function extractDescription(tooltipHtml) {
  const marker = '<div class="q">';
  const idx = tooltipHtml.lastIndexOf(marker);
  if (idx === -1) return "";
  return stripHtml(tooltipHtml.slice(idx));
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function validateTree(cls, tree) {
  const errors = [];
  const byLoc = new Map();
  for (const t of tree.talents) {
    byLoc.set(`${t.row},${t.col}`, t);
    if (t.row < 0 || t.row > 8) errors.push(`${t.id}: bad row ${t.row}`);
    if (t.col < 0 || t.col > 3) errors.push(`${t.id}: bad col ${t.col}`);
    if (t.maxRank < 1 || t.maxRank > 5)
      errors.push(`${t.id}: bad maxRank ${t.maxRank}`);
    if (t.spellIds.length !== t.maxRank)
      errors.push(`${t.id}: spellIds length != maxRank`);
    if (t.requiresPoints !== t.row * 5)
      errors.push(`${t.id}: requiresPoints mismatch`);
  }
  for (const t of tree.talents) {
    if (t.requires && !tree.talents.some((x) => x.id === t.requires.talentId))
      errors.push(`${t.id}: missing prereq ${t.requires.talentId}`);
  }
  const finalRow = Math.max(...tree.talents.map((t) => t.row));
  if (finalRow !== 8)
    errors.push(`deepest row is ${finalRow}, expected 8 (41-point talent)`);
  if (errors.length)
    throw new Error(`${cls}/${tree.treeName}: \n  ${errors.join("\n  ")}`);
}

async function buildClass(cls) {
  const source = await fetchText(`${RAW_BASE}/${cls}.ts`);
  const config = extractConfig(source);
  const trees = [];

  for (const rawTree of config) {
    const talents = [];
    for (const raw of rawTree.talents) {
      const spellIds = expandSpellIds(raw);
      const tooltip = await cachedTooltip(spellIds[0]);
      const name = tooltip.name;
      talents.push({
        id: raw.fieldName ?? slugify(name),
        name,
        icon: tooltip.icon,
        row: raw.location.rowIdx,
        col: raw.location.colIdx,
        maxRank: raw.maxPoints,
        spellIds,
        description: extractDescription(tooltip.tooltip),
        requiresPoints: raw.location.rowIdx * 5,
        ...(raw.prereqLocation
          ? { prereqLocation: raw.prereqLocation }
          : {}),
      });
    }
    // Resolve prereq locations → talent ids (+ required ranks = prereq max).
    for (const t of talents) {
      if (t.prereqLocation) {
        const prereq = talents.find(
          (x) =>
            x.row === t.prereqLocation.rowIdx &&
            x.col === t.prereqLocation.colIdx,
        );
        if (!prereq)
          throw new Error(`${cls}: prereq not found for ${t.id}`);
        t.requires = { talentId: prereq.id, ranks: prereq.maxRank };
        delete t.prereqLocation;
      }
    }
    const tree = {
      class: cls,
      treeName: rawTree.name,
      background: rawTree.backgroundUrl,
      talents,
    };
    validateTree(cls, tree);
    trees.push(tree);
  }

  if (trees.length !== 3)
    throw new Error(`${cls}: expected 3 trees, got ${trees.length}`);

  await writeFile(
    path.join(OUT_DIR, `${cls}.json`),
    JSON.stringify({ class: cls, trees }, null, 1),
  );
  const total = trees.reduce((s, t) => s + t.talents.length, 0);
  console.log(
    `${cls}: ${trees.map((t) => `${t.treeName}(${t.talents.length})`).join(" ")} — ${total} talents`,
  );
}

await mkdir(OUT_DIR, { recursive: true });
await mkdir(CACHE_DIR, { recursive: true });

// Classes sequentially, tooltips are the bottleneck anyway.
for (const cls of CLASSES) {
  await buildClass(cls);
}
console.log("done");
