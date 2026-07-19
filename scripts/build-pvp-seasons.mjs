// Generates per-season PvP gear pages (Seasons 1, 3, 4) for every spec
// by translating the current live ladder snapshot (Season 2 items) into
// each season's equivalents:
//
//   - Arena set/weapon items swap their Gladiator prefix
//     (Gladiator's → Merciless → Vengeful → Brutal).
//   - Honor offset items swap family (Veteran's → Vindicator's →
//     Guardian's).
//   - Every derived name is RESOLVED against a local copy of the
//     wowsims/tbc item database (assets/wowsims-item-tooltips.csv, 30k
//     items) — no invented ids, no rate-limited endpoints. A name that
//     doesn't exist in that season keeps the original item with a note.
//   - PvE flex items carry over unchanged (they don't rotate by season).
//
// Usage percentages are dropped on derived lists (they belong to the
// live snapshot); blurbs and FAQs are generated per season + spec from
// the actual transformed items and the season's known rating rules.
//
// Also regenerates data/bis/index.ts (scanning every list) and extends
// data/items.json from the same local database.
//
// Refresh the DB with:
//   curl -sL https://raw.githubusercontent.com/wowsims/tbc/master/assets/item_data/all_item_tooltips.csv -o assets/wowsims-item-tooltips.csv
//
// Run:  node scripts/build-pvp-seasons.mjs

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "data", "bis");
const DB_CSV = path.join(process.cwd(), "assets", "wowsims-item-tooltips.csv");

const TARGET_SEASONS = [1, 3, 4];

const SEASON_META = {
  1: {
    setPrefix: "Gladiator's",
    honorFamily: null,
    label: "Season 1",
    ratingNote:
      "Season 1 has no rating requirements — every piece is purchasable with points alone, which is why it remains the catch-up set all expansion.",
  },
  3: {
    setPrefix: "Vengeful Gladiator's",
    honorFamily: "Vindicator's",
    label: "Season 3",
    ratingNote:
      "Season 3 introduces rating requirements: the Vengeful weapon needs 1850 team rating and the shoulders need 2000. Everything else is rating-free.",
  },
  4: {
    setPrefix: "Brutal Gladiator's",
    honorFamily: "Guardian's",
    label: "Season 4",
    ratingNote:
      "Season 4 has the strictest gates in TBC: the Brutal weapon requires 1950 rating, shoulders 2200, and several pieces check personal rating as well as team rating.",
  },
};

const GLAD_PREFIX = /^(?:Merciless |Vengeful |Brutal )?Gladiator's /;
const HONOR_FAMILIES = ["Veteran's", "Vindicator's", "Guardian's"];

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

// ——— local item database (name → id, id → meta) ———
const byNameLower = new Map();
const metaById = new Map();

async function loadDb() {
  const raw = (await readFile(DB_CSV, "utf8")).split(/\r?\n/);
  for (let i = 1; i < raw.length; i++) {
    const line = raw[i];
    if (!line) continue;
    const c1 = line.indexOf(",");
    const c2 = line.indexOf(",", c1 + 1);
    const id = Number(line.slice(0, c1));
    try {
      const o = JSON.parse(line.slice(c2 + 1));
      if (!o.name) continue;
      byNameLower.set(o.name.toLowerCase(), id);
      metaById.set(id, { name: o.name, icon: o.icon, quality: o.quality });
    } catch {
      // skip unparseable row
    }
  }
  console.log(`db: ${metaById.size} items`);
}

function findByName(name) {
  const id = byNameLower.get(name.toLowerCase());
  return id ? { id, ...metaById.get(id) } : null;
}

/** Translate one item ref to a target season. Returns {itemId, name, note?}. */
function translate(ref, season) {
  const meta = SEASON_META[season];
  const name = ref.name;
  if (!name) return { itemId: ref.itemId };

  if (GLAD_PREFIX.test(name)) {
    const target = name.replace(GLAD_PREFIX, `${meta.setPrefix} `);
    if (target !== name) {
      const hit = findByName(target);
      if (hit) return { itemId: hit.id, name: hit.name };
      return {
        itemId: ref.itemId,
        name,
        pveFlexNote: `No ${meta.label} equivalent — current-season item shown.`,
      };
    }
    return { itemId: ref.itemId, name };
  }

  const family = HONOR_FAMILIES.find((f) => name.startsWith(`${f} `));
  if (family) {
    if (!meta.honorFamily) {
      return {
        itemId: ref.itemId,
        name,
        pveFlexNote:
          "Honor offset from a later patch — in early Season 1 use dungeon/craft pieces until it unlocks.",
      };
    }
    if (family === meta.honorFamily) return { itemId: ref.itemId, name };
    const target = name.replace(`${family} `, `${meta.honorFamily} `);
    const hit = findByName(target);
    if (hit) return { itemId: hit.id, name: hit.name };
    return {
      itemId: ref.itemId,
      name,
      pveFlexNote: `No ${meta.honorFamily} equivalent — current item shown.`,
    };
  }

  // PvE flex / neutral item: unchanged across seasons.
  return { itemId: ref.itemId, name };
}

function buildBlurb(clsName, specName, season, setPieces, honorPieces) {
  const meta = SEASON_META[season];
  const setList = setPieces.slice(0, 3).join(", ");
  return (
    `${meta.label} arena gear for ${specName} ${clsName}: the ${meta.setPrefix} set` +
    (setList ? ` (${setList}…)` : "") +
    (honorPieces.length
      ? `, backed by ${meta.honorFamily ?? "honor"} offset pieces from the honor vendor`
      : "") +
    `. ${meta.ratingNote} The slot-by-slot list below translates what the current arena ladder's top ${specName} ${clsName}s equip into their ${meta.label} equivalents — same slot logic, this season's items. For playstyle, stat reasoning and live usage percentages, see the current-season list.`
  );
}

function buildFaq(clsName, specName, season, setPieces, honorPieces) {
  const meta = SEASON_META[season];
  const faq = [
    {
      question: `What is the ${meta.label} arena set for ${specName} ${clsName}?`,
      answer: setPieces.length
        ? `The ${meta.setPrefix} pieces: ${setPieces.join(", ")}. The 2-piece and 4-piece set bonuses carry over between seasons, so partial upgrades never break your bonus.`
        : `The ${meta.setPrefix} set for this class — see the slot list above for each piece.`,
    },
    {
      question: `What are the rating requirements in ${meta.label}?`,
      answer: meta.ratingNote,
    },
    {
      question: `How many arena points does full ${meta.label} gear cost?`,
      answer:
        "The five set pieces total roughly 8,250 arena points (helm/chest/legs 1,875 each, shoulders 1,500, gloves 1,125) plus about 3,750 for a main weapon. Use the arena points calculator to turn your weekly rating into a purchase timeline.",
    },
  ];
  if (honorPieces.length) {
    faq.push({
      question: `Which honor pieces complement the ${meta.label} set?`,
      answer: `${honorPieces.join(", ")} — bought with honor and battleground marks, no arena rating needed.`,
    });
  }
  return faq;
}

async function main() {
  await loadDb();

  const files = (await readdir(OUT_DIR)).filter(
    (f) => f.endsWith("-pvp.json") && !f.includes("-pvp-s"),
  );
  const newItemIds = new Set();
  let unresolved = 0;

  for (const file of files) {
    const src = JSON.parse(await readFile(path.join(OUT_DIR, file), "utf8"));
    const clsName = CLASS_NAMES[src.class];
    const specName = specDisplay(src.spec);

    for (const season of TARGET_SEASONS) {
      const slots = [];
      const setPieces = [];
      const honorPieces = [];
      for (const slot of src.slots) {
        const bis = translate(slot.bis, season);
        if (bis.pveFlexNote?.startsWith("No ")) unresolved++;
        const alternatives = [];
        for (const alt of slot.alternatives) {
          const t = translate(alt, season);
          if (
            t.itemId !== bis.itemId &&
            !alternatives.some((a) => a.itemId === t.itemId)
          ) {
            alternatives.push({
              ...t,
              ...(alt.pveFlexNote && !t.pveFlexNote
                ? { pveFlexNote: alt.pveFlexNote }
                : {}),
            });
          }
        }
        slots.push({ slot: slot.slot, bis, alternatives });
        newItemIds.add(bis.itemId);
        for (const a of alternatives) newItemIds.add(a.itemId);
        if (bis.name?.startsWith(SEASON_META[season].setPrefix))
          setPieces.push(bis.name);
        const fam = SEASON_META[season].honorFamily;
        if (fam && bis.name?.startsWith(fam)) honorPieces.push(bis.name);
      }

      const list = {
        class: src.class,
        spec: src.spec,
        content: "pvp",
        season,
        seasonPage: true,
        updatedAt: src.updatedAt,
        blurb: buildBlurb(clsName, specName, season, setPieces, honorPieces),
        statPriorityRationale: "",
        statPriority: src.statPriority,
        slots,
        gems: src.gems.map((g) => ({ ...g })),
        enchants: src.enchants.map((e) => ({ ...e })),
        faq: buildFaq(clsName, specName, season, setPieces, honorPieces),
      };

      const outName = file.replace("-pvp.json", `-pvp-s${season}.json`);
      await writeFile(path.join(OUT_DIR, outName), JSON.stringify(list, null, 1));
    }
    console.log(`${file}: seasons ${TARGET_SEASONS.join(",")} written`);
  }
  console.log(`unresolved fallbacks: ${unresolved}`);

  // Regenerate the registry.
  const all = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".json"));
  const imports = [];
  const entries = [];
  for (let i = 0; i < all.length; i++) {
    const content = JSON.parse(await readFile(path.join(OUT_DIR, all[i]), "utf8"));
    const key =
      content.content === "pvp"
        ? content.seasonPage
          ? `${content.class}/${content.spec}/pvp/s${content.season}`
          : `${content.class}/${content.spec}/pvp`
        : `${content.class}/${content.spec}/pve/${content.phase}`;
    imports.push(`import list${i} from "@/data/bis/${all[i]}";`);
    entries.push(` "${key}": list${i} as BisList,`);
  }
  await writeFile(
    path.join(OUT_DIR, "index.ts"),
    `// AUTO-GENERATED by scripts/build-pvp-seasons.mjs — do not edit by hand.\nimport type { BisList } from "@/lib/bis";\n${imports.join("\n")}\n\nexport const BIS_REGISTRY: Record<string, BisList> = {\n${entries.join("\n")}\n};\n`,
  );
  console.log(`registry: ${all.length} lists`);

  // Extend item metadata from the same local DB.
  const itemsPath = path.join(process.cwd(), "data", "items.json");
  const items = JSON.parse(await readFile(itemsPath, "utf8"));
  let added = 0;
  for (const id of newItemIds) {
    if (items[String(id)]) continue;
    const meta = metaById.get(id);
    if (meta) {
      items[id] = { name: meta.name, icon: meta.icon, quality: meta.quality };
      added++;
    }
  }
  await writeFile(itemsPath, JSON.stringify(items, null, 1));
  console.log(`data/items.json: +${added}, ${Object.keys(items).length} total`);
}

await main();
