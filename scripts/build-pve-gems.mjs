// Fills the `gems` and `enchants` fields of every data/bis/*-pve-*.json,
// which build-pve-bis.mjs leaves empty (the WarcraftLogs snapshot it reads
// carries per-slot ITEMS only — no sockets, no enchants).
//
// Source: the same site the PvE item snapshot comes from
// (tbc-bis-guide.com), whose /js/data.js publishes per-spec, per-phase gem
// and enchant recommendations plus a source catalogue for both. Names and
// effect text are resolved through the Wowhead tooltip API, cached on disk
// like the item pipeline does.
//
// Run:  node scripts/build-pve-gems.mjs

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DATA_URL = "https://tbc-bis-guide.com/js/data.js?v=20260424a";
const SPELL_TOOLTIP = "https://nether.wowhead.com/tbc/tooltip/spell";
const ITEM_TOOLTIP = "https://nether.wowhead.com/tbc/tooltip/item";

const BIS_DIR = path.join(process.cwd(), "data", "bis");
const CACHE_DIR = path.join(process.cwd(), ".talent-cache", "enchants");
const DELAY_MS = 120;

// Their spec keys → ours. They model 25 specs to our 28:
//   - Rogue is a single "Dps" entry; all three of our rogue specs share the
//     same gem/enchant profile in TBC (agility/AP, weapon-skill caps), so
//     they all read from it.
//   - Discipline Priest has no entry; it reads Holy's, which is the same
//     +healing/intellect socket and enchant plan.
// Both fallbacks are recorded in FALLBACK_NOTE so the pages stay honest.
const SPEC_MAP = {
  "warrior/arms": "Warrior|Arms",
  "warrior/fury": "Warrior|Fury",
  "warrior/protection": "Warrior|Protection",
  "paladin/holy": "Paladin|Holy",
  "paladin/protection": "Paladin|Protection",
  "paladin/retribution": "Paladin|Retribution",
  "hunter/beast-mastery": "Hunter|Beast Mastery",
  "hunter/marksmanship": "Hunter|Marksmanship",
  "hunter/survival": "Hunter|Survival",
  "rogue/assassination": "Rogue|Dps",
  "rogue/combat": "Rogue|Dps",
  "rogue/subtlety": "Rogue|Dps",
  "priest/discipline": "Priest|Holy",
  "priest/holy": "Priest|Holy",
  "priest/shadow": "Priest|Shadow",
  "shaman/elemental": "Shaman|Elemental",
  "shaman/enhancement": "Shaman|Enhancement",
  "shaman/restoration": "Shaman|Restoration",
  "mage/arcane": "Mage|Arcane",
  "mage/fire": "Mage|Fire",
  "mage/frost": "Mage|Frost",
  "warlock/affliction": "Warlock|Affliction",
  "warlock/demonology": "Warlock|Demonology",
  "warlock/destruction": "Warlock|Destruction",
  "druid/balance": "Druid|Balance",
  "druid/feral-bear": "Druid|Bear",
  "druid/feral-cat": "Druid|Cat",
  "druid/restoration": "Druid|Restoration",
};

const FALLBACK_NOTE = {
  "rogue/assassination": "Rogue socket/enchant plan (shared across rogue specs).",
  "rogue/combat": "Rogue socket/enchant plan (shared across rogue specs).",
  "rogue/subtlety": "Rogue socket/enchant plan (shared across rogue specs).",
  "priest/discipline": "Shares the Holy Priest socket and enchant plan.",
};

// Their slot labels → the ones our PvP lists already use, so both content
// types render identically.
const SLOT_LABEL = {
  Head: "Head",
  Shoulder: "Shoulders",
  Back: "Back",
  Chest: "Chest",
  Wrist: "Wrist",
  Hands: "Hands",
  Legs: "Legs",
  Feet: "Feet",
  Ring: "Ring",
  "Main Hand": "Main Hand",
  "Off Hand": "Off Hand",
  "Two Hand": "Two-Hand",
  "Main Hand~Off Hand": "Weapon",
  "Shoulder~Legs": "Shoulders / Legs",
  "Ranged/Relic": "Ranged",
};

const SLOT_ORDER = [
  "Head", "Shoulders", "Shoulders / Legs", "Back", "Chest", "Wrist", "Hands",
  "Legs", "Feet", "Ring", "Weapon", "Main Hand", "Off Hand", "Two-Hand",
  "Ranged",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
const specDisplay = (slug) =>
  SPEC_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);

const aOrAn = (word) => (/^[aeiou]/i.test(word) ? "an" : "a");

/** "A, B and C" — Oxford-less, matching the prose elsewhere on the page. */
function listWords(parts) {
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "user-agent": "wowtbcarenacalc-data-build (contact: site owner)" },
  });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.text();
}

/** Cached Wowhead tooltip lookup (spell for enchants, item for gems). */
async function tooltip(kind, id) {
  const file = path.join(CACHE_DIR, `${kind}-${id}.json`);
  if (existsSync(file)) return JSON.parse(await readFile(file, "utf8"));
  const base = kind === "spell" ? SPELL_TOOLTIP : ITEM_TOOLTIP;
  let json;
  try {
    json = JSON.parse(await fetchText(`${base}/${id}`));
  } catch (e) {
    console.warn(`  ${kind} ${id}: ${e.message}`);
    return null;
  }
  await writeFile(file, JSON.stringify(json));
  await sleep(DELAY_MS);
  return json;
}

const strip = (html) =>
  (html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const SEARCH_URL = "https://www.wowhead.com/tbc/search/suggestions-template";

/**
 * Resolve an item-based enhancement (glyph, inscription, leg armor, armor
 * kit, spellthread, scope) to its real item, by exact name.
 *
 * Head and shoulder enchants in TBC are consumable ITEMS with proper icons —
 * the enchant SPELL behind them reports `classic_temp`. Only enchanter-cast
 * formulas ("Enchant Cloak - Dodge") have no item; those keep a slot icon.
 */
async function searchItem(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const file = path.join(CACHE_DIR, `search-${slug}.json`);
  let json;
  if (existsSync(file)) {
    json = JSON.parse(await readFile(file, "utf8"));
  } else {
    try {
      json = JSON.parse(
        await fetchText(`${SEARCH_URL}?q=${encodeURIComponent(name)}`),
      );
    } catch (e) {
      console.warn(`  search "${name}": ${e.message}`);
      return null;
    }
    await writeFile(file, JSON.stringify(json));
    await sleep(DELAY_MS);
  }
  const items = (json.results ?? []).filter((r) => r.type === 3 && r.name);
  const want = name.toLowerCase();
  // Exact first, then a tolerance of two edits: a few TBC spell names carry
  // typos their item does not ("Stabilitzed" vs "Stabilized Eternium Scope").
  const hit =
    items.find((r) => r.name.toLowerCase() === want) ??
    items.find((r) => editDistance(r.name.toLowerCase(), want) <= 2);
  return hit ? { id: hit.id, icon: hit.icon, quality: hit.quality } : null;
}

function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 99;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++)
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    prev = row;
  }
  return prev[b.length];
}

/**
 * Pull the "Permanently adds …" clause out of an enchant tooltip — that is
 * the effect players compare. Falls back to the enchant name when the
 * tooltip is shaped unexpectedly, never to an empty string.
 */
/**
 * Turn an enchant tooltip into the bare stat payload, matching the style the
 * PvP lists already use ("+34 Attack Power and +16 Hit Rating").
 *
 * Tooltips come in several shapes, all of which wrap the payload in chrome:
 *   "Permanently enchant a cloak to give 12 dodge rating."
 *   "Permanently enchant boots to increase Stamina by 12."
 *   "Permanently adds 16 defense rating and 17 dodge rating to a head slot item."
 *   "Permanently adds to a shoulder slot item increased Stamina by 16 …"
 *   "Permanently attach nethercleft leg armor onto pants to increase Stamina by 40 …"
 */
function enchantEffect(tip, fallbackName) {
  const text = strip(tip?.tooltip).replace(/&nbsp;/g, " ");
  const m = /Permanently\b[^.]*\./i.exec(text);
  if (!m) return fallbackName;

  const sentence = m[0].replace(/\.$/, "").replace(/^Permanently\s+/i, "").trim();

  let s = sentence
    // "the Stamina of an item worn on the head, chest … by 10" → "Stamina by 10"
    .replace(/\bof an item worn on[^,]*(?:,[^,]*)*?\s+(by\s+\d+)/i, "$1")
    // "embroiders spellthread into pants, increasing …"
    .replace(/^[\w\s'-]*,\s*increasing\s+/i, "")
    // "adds to a shoulder slot item increased …" → drop the slot clause
    .replace(/\bto (?:a|an|the) [\w\s'-]*?slot item\b/i, " ")
    // "enchant a cloak to give …", "attach X onto pants to increase …"
    .replace(
      /^(?:enchants?|attach|adds?|increases?)\b[\w\s'-]*?\bto (?:give|increase|grant|restore|add)\s+/i,
      "",
    )
    .replace(/^(?:enchants?|adds?|increases?)\s+/i, "")
    .replace(/^(?:a|an|the)\s+/i, "")
    .replace(/\bincreased\s+/gi, "")
    .replace(/\band also increases your\b/gi, "and")
    .replace(/\band also grants\b/gi, "and")
    .replace(/\s+/g, " ")
    .trim();

  // "Stamina by 40 and Agility by 12" → "+40 Stamina and +12 Agility".
  // The stat capture is tempered so it never swallows another "by" clause;
  // a leading "and" is lifted out so the connector stays in front.
  s = s.replace(
    /((?:(?!\bby\b)[A-Za-z])(?:(?!\bby\b)[A-Za-z\s])*?)\s+by\s+(?:up to\s+)?(\d+)/g,
    (_, stat, n) => {
      const lead = /^and\s+/i.test(stat) ? "and " : "";
      return `${lead}+${n} ${stat.replace(/^and\s+/i, "").trim()}`;
    },
  );
  s = s
    .replace(/^(\d+)\b/, "+$1")
    // "+34 attack power and 16 hit rating" → sign the second value too
    .replace(/\band (\d+)\b/g, "and +$1")
    .replace(/\+(\d+)\s+your\s+/g, "+$1 ")
    .replace(/\s+/g, " ")
    .trim();

  // Guard: if normalisation left artefacts (a strayed percent sign, a
  // dangling connector, an unconverted "to" clause) prefer the intact
  // sentence over a mangled fragment — verbose beats wrong.
  const clean =
    s &&
    s.length <= 70 &&
    !/\+\d+\s+(?:and|to|increase)\b/i.test(s) &&
    !/\bto\s+(?:decrease|occasionally|reduce)\b/i.test(s) &&
    !/%(?!\s*$)/.test(s);
  if (clean) return s;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) || fallbackName;
}

function sourceNote(entry) {
  if (!entry) return null;
  const where = [entry.source, entry.sourceLocation]
    .filter(Boolean)
    .join(" — ")
    // NPC titles arrive in angle brackets ("Moroes<Tower Steward>"), which
    // read like markup on the page.
    .replace(/\s*<([^>]+)>/g, " ($1)")
    .replace(/\s+/g, " ")
    .trim();
  if (!where) return null;
  // The "of the Scourge" shoulder enchants come from vanilla Naxxramas, which
  // was removed at TBC launch. Top parsers still wear them because they
  // earned them pre-2.0, so they belong in the list — but anyone reading this
  // in TBC can no longer get one, and the page has to say so.
  if (/Naxxramas/i.test(where))
    return `${where} (legacy vanilla enchant — unobtainable in TBC unless earned pre-2.0)`;
  return where;
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });

  const raw = await fetchText(DATA_URL);
  const DATA = JSON.parse(raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1));
  const bySpec = new Map(
    DATA.specs.map((s) => [`${s.className}|${s.specName}`, s]),
  );
  console.log(`source: ${DATA.specs.length} specs, generated ${DATA.generatedAt}`);

  // Resolve every referenced enchant + gem once, up front.
  const spellIds = new Set();
  const gemIds = new Set();
  for (const s of DATA.specs)
    for (const p of [1, 2, 3, 4, 5]) {
      const ph = s.phases?.[p];
      if (!ph) continue;
      for (const e of ph.enchants ?? []) spellIds.add(e.spellId);
      for (const g of ph.gems ?? []) gemIds.add(g.itemId);
    }
  console.log(`resolving ${spellIds.size} enchants + ${gemIds.size} gems…`);

  const enchantMeta = new Map();
  const enchantItems = new Map();
  for (const id of spellIds) {
    const src = DATA.enchantSources[id];
    const tip = await tooltip("spell", id);
    const name = tip?.name ?? src?.name ?? `Enchant ${id}`;
    // The enchant SPELL's own icon is unusable (39 of 79 share one generic
    // scroll, 19 are the `classic_temp` placeholder). Item-based enhancements
    // — glyphs, inscriptions, leg armors, kits, scopes — carry a real icon on
    // their item, so resolve that; enchanter-cast formulas have no item and
    // fall back to a slot icon in the component (lib/icons.ts).
    const item = /^Enchant\b/i.test(name) ? null : await searchItem(name);
    enchantMeta.set(id, {
      name,
      text: enchantEffect(tip, name),
      source: sourceNote(src),
      ...(item ? { itemId: item.id, icon: item.icon } : {}),
    });
    if (item) enchantItems.set(item.id, item);
  }

  // Gems render through <ItemLink>, which pulls the icon and quality colour
  // from data/items.json — an unregistered gem shows as bare text with no
  // icon, so every gem has to land in that file.
  const items = JSON.parse(
    await readFile(path.join(process.cwd(), "data", "items.json"), "utf8"),
  );
  const gemMeta = new Map();
  let added = 0;
  for (const id of gemIds) {
    const src = DATA.gemSources[id];
    const known = items[String(id)];
    let name = known?.name ?? src?.name;
    if (!known) {
      const tip = await tooltip("item", id);
      if (tip?.name) {
        items[String(id)] = {
          name: tip.name,
          icon: tip.icon,
          quality: tip.quality,
        };
        name = tip.name;
        added++;
      }
    }
    gemMeta.set(id, { name: name ?? `Gem ${id}`, source: sourceNote(src) });
  }
  await writeFile(
    path.join(process.cwd(), "data", "items.json"),
    JSON.stringify(items, null, 1),
  );
  console.log(`data/items.json: +${added} gems (${Object.keys(items).length} total)`);

  // Enchant coverage is uneven per phase; when a phase has no entry for a
  // slot, carry the nearest earlier phase's choice forward (TBC enchants
  // rarely change between tiers) rather than dropping the slot entirely.
  // The source lists 4-5 enchant slots for the early phases and 11 for the
  // late ones, but a Back/Legs/Feet enchant does not change between tiers —
  // it is simply not repeated. So a slot missing at phase N inherits the
  // nearest phase that does specify it, earlier first, then later.
  function enchantsFor(spec, phase) {
    const bySlot = new Map();
    const take = (p) => {
      for (const e of spec.phases?.[p]?.enchants ?? [])
        if (!bySlot.has(e.slot)) bySlot.set(e.slot, e.spellId);
    };
    for (let p = phase; p >= 1; p--) take(p);
    for (let p = phase + 1; p <= 5; p++) take(p);
    return bySlot;
  }

  // Epic gems (quality 4) arrived with patch 2.4 / Sunwell, i.e. phase 5.
  // The source recommends them from phase 3 onward, which is anachronistic
  // for a page headed "Phase 3 — Black Temple": before phase 5, fall back to
  // the newest phase whose list is all rare-or-lower.
  // Meta gems are epic-quality too but drop from Karazhan-era content, so
  // only the coloured gems are gated on the 2.4 availability rule.
  const isEpic = (g) => !g.isMeta && Number(g.quality) >= 4;
  function gemsFor(spec, phase) {
    const at = (p) => spec.phases?.[p]?.gems ?? [];
    const ok = (g) => g.length && (phase >= 5 || !g.some(isEpic));
    for (let p = phase; p >= 1; p--) if (ok(at(p))) return at(p);
    for (let p = phase + 1; p <= 5; p++) if (ok(at(p))) return at(p);
    // Nothing clean anywhere — take the phase's own list minus the epics
    // rather than emitting no gems at all.
    const own = at(phase).filter((g) => !isEpic(g));
    if (own.length) return own;
    for (let p = phase; p >= 1; p--) if (at(p).length) return at(p);
    return [];
  }

  const files = (await readdir(BIS_DIR)).filter((f) => /-pve-\d\.json$/.test(f));
  let written = 0;
  const empty = [];

  for (const file of files) {
    const p = path.join(BIS_DIR, file);
    const list = JSON.parse(await readFile(p, "utf8"));
    const key = `${list.class}/${list.spec}`;
    const spec = bySpec.get(SPEC_MAP[key]);
    if (!spec) {
      console.warn(`no source spec for ${key}`);
      continue;
    }
    const phase = list.phase;
    const shared = FALLBACK_NOTE[key];
    const clsName = CLASS_NAMES[list.class] ?? list.class;
    const specName = specDisplay(list.spec);

    list.gems = gemsFor(spec, phase).map((g) => {
      const meta = gemMeta.get(g.itemId) ?? {};
      const bits = [];
      if (g.isMeta) bits.push("Meta socket");
      if (meta.source) bits.push(meta.source);
      if (shared) bits.push(shared);
      return {
        itemId: Number(g.itemId),
        name: meta.name ?? g.name,
        note: bits.join(". ") + (bits.length ? "." : ""),
      };
    });

    const bySlot = enchantsFor(spec, phase);
    const rows = [];
    for (const [slot, spellId] of bySlot) {
      const label = SLOT_LABEL[slot] ?? slot;
      const meta = enchantMeta.get(spellId);
      if (!meta) continue;
      rows.push({
        slot: label,
        text: meta.text,
        name: meta.name,
        ...(meta.icon ? { icon: meta.icon } : {}),
        ...(meta.itemId ? { itemId: meta.itemId } : {}),
        ...(meta.source ? { source: meta.source } : {}),
        note: meta.source ?? "",
      });
    }
    rows.sort(
      (a, b) =>
        (SLOT_ORDER.indexOf(a.slot) + 1 || 99) -
        (SLOT_ORDER.indexOf(b.slot) + 1 || 99),
    );
    list.enchants = rows;

    // Two extra FAQ entries, built from the gems and enchants just assigned.
    // build-pve-bis.mjs ships 3 questions about the item list; "what gems"
    // and "what enchants" are the next things a player asks, and now the page
    // can answer both from its own data. Regenerated in place, so re-running
    // the build never stacks duplicates.
    const GEN = /^What (?:gems|enchants)\b/i;
    list.faq = (list.faq ?? []).filter((f) => !GEN.test(f.question));

    if (list.gems.length) {
      const meta = list.gems.find((g) => /Meta socket/.test(g.note));
      const coloured = list.gems.filter((g) => g !== meta);
      list.faq.push({
        question: `What gems should ${aOrAn(specName)} ${specName} ${clsName} use in Phase ${phase}?`,
        answer:
          (meta ? `${meta.name} in the meta socket` : "") +
          (meta && coloured.length ? ", then " : "") +
          (coloured.length
            ? `${listWords(coloured.map((g) => g.name))} in the coloured sockets`
            : "") +
          `. ${
            phase >= 5
              ? "Phase 5 is where the epic gems from Sunwell replace their rare equivalents — that swap alone is worth several item levels across a full set."
              : "Epic gems only arrive with patch 2.4 (Sunwell), so these rare-quality cuts are the ceiling for this phase."
          }`,
      });
    }

    if (list.enchants.length) {
      const key = ["Head", "Shoulders", "Legs", "Weapon", "Main Hand"]
        .map((s) => list.enchants.find((e) => e.slot === s))
        .filter(Boolean)
        .slice(0, 4);
      const head = list.enchants.find((e) => e.slot === "Head");
      list.faq.push({
        question: `What enchants does ${aOrAn(specName)} ${specName} ${clsName} need in Phase ${phase}?`,
        answer:
          `${list.enchants.length} slots are worth enchanting. The biggest swings are ${listWords(
            key.map((e) => `${e.name} on ${e.slot.toLowerCase()}`),
          )}.` +
          // Sourced from the row itself rather than asserted: head enchants
          // are usually reputation rewards, but not always (the "of the
          // Scourge" ones are raid drops).
          (head?.source
            ? ` The head and shoulder enchants are consumable items rather than enchanter work — ${head.name} comes from ${head.source}.`
            : " The head and shoulder enchants are consumable items rather than enchanter work."),
      });
    }

    if (!list.gems.length || !list.enchants.length)
      empty.push(`${file} (gems ${list.gems.length}, enchants ${list.enchants.length})`);

    await writeFile(p, JSON.stringify(list, null, 1));
    written++;
  }

  console.log(`wrote ${written} PvE lists`);

  // The PvP lists carry enchants harvested from the armory (effect text +
  // usage %), with no spell id and so no icon or source. Their effect text is
  // the same phrasing this catalogue produces, so match on it and graft the
  // name/icon/source across — the usage % note is kept, it is the PvP list's
  // whole value.
  // Matching is three-tier because the armory phrases the same enchant three
  // different ways: the exact effect ("+12 Agility"), just the enchant's
  // distinctive name ("Mongoose", "Surefooted"), or a reworded effect with
  // the same numbers ("+22 Spell Power and +14 Spell Hit Rating" vs the
  // tooltip's "up to 22 spell damage and healing and 14 spell hit rating").
  // The numeric signature plus the slot is what makes the third tier safe.
  const norm = (s) =>
    (s ?? "").toLowerCase().replace(/[^a-z0-9+]+/g, " ").replace(/\s+/g, " ").trim();
  const nums = (s) => (s ?? "").match(/\d+/g)?.join(",") ?? "";
  const words = (s) =>
    new Set(norm(s).split(" ").filter((w) => w.length > 3 && !/^\d+$/.test(w)));

  const byEffect = new Map();
  const byName = new Map();
  for (const meta of enchantMeta.values()) {
    const k = norm(meta.text);
    if (k && !byEffect.has(k)) byEffect.set(k, meta);
    // "Enchant Weapon - Mongoose" → "mongoose"
    const short = norm(meta.name.replace(/^enchant\s+[\w\s]*?-\s*/i, ""));
    if (short && !byName.has(short)) byName.set(short, meta);
  }
  // Slot-scoped candidates, taken from the assignments just written.
  const bySlot = new Map();
  for (const spec of DATA.specs)
    for (const p of [1, 2, 3, 4, 5])
      for (const e of spec.phases?.[p]?.enchants ?? []) {
        const label = SLOT_LABEL[e.slot] ?? e.slot;
        const meta = enchantMeta.get(e.spellId);
        if (!meta) continue;
        if (!bySlot.has(label)) bySlot.set(label, new Set());
        bySlot.get(label).add(meta);
      }

  function matchEnchant(slot, text) {
    const exact = byEffect.get(norm(text));
    if (exact) return exact;
    const named = byName.get(norm(text));
    if (named) return named;
    const sig = nums(text);
    if (!sig) return null;
    const pool = bySlot.get(slot) ?? new Set(enchantMeta.values());
    const w = words(text);
    let best = null;
    let bestScore = 0;
    for (const meta of pool) {
      if (nums(meta.text) !== sig) continue;
      const mw = words(meta.text);
      const overlap = [...w].filter((x) => mw.has(x)).length;
      if (overlap > bestScore) {
        bestScore = overlap;
        best = meta;
      } else if (!best) best = meta;
    }
    return best;
  }

  const pvpFiles = (await readdir(BIS_DIR)).filter((f) =>
    /-pvp(-s\d)?\.json$/.test(f),
  );
  let matched = 0;
  let total = 0;
  for (const file of pvpFiles) {
    const p = path.join(BIS_DIR, file);
    const list = JSON.parse(await readFile(p, "utf8"));
    let touched = false;
    for (const e of list.enchants ?? []) {
      total++;
      const meta = matchEnchant(e.slot, e.text);
      if (!meta) continue;
      e.name = meta.name;
      if (meta.icon) e.icon = meta.icon;
      else delete e.icon;
      if (meta.itemId) e.itemId = meta.itemId;
      if (meta.source) e.source = meta.source;
      matched++;
      touched = true;
    }
    if (touched) await writeFile(p, JSON.stringify(list, null, 1));
  }
  console.log(`PvP enchants enriched: ${matched}/${total}`);
  if (empty.length) {
    console.warn(`still empty (${empty.length}):`);
    for (const e of empty) console.warn(`  ${e}`);
  }
}

await main();
