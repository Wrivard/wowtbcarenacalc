// One-time repair for the duplicated ring/trinket/weapon bug in the BiS
// data. The PvE lists come from tbc-bis-guide.com's Warcraft Logs
// aggregation, which reports the single most-worn item PER slot position —
// so "Ring 1" and "Ring 2" (and "Trinket 1"/"Trinket 2", occasionally
// Main/Off Hand) frequently resolve to the SAME item, which no player can
// actually equip twice.
//
// Fix: for the second slot of each paired group, promote the first
// `alternatives` entry that differs from the first slot's pick. Those
// alternatives are the 2nd/3rd most-worn items in that exact slot from the
// SAME WCL source, so the repair stays source-backed — it's what top
// parsers actually wear in their second ring/trinket, not a guess.
//
// Idempotent: re-running on already-distinct lists changes nothing.
// Any pair that can't be de-duplicated from its own alternatives is left
// untouched and reported for manual sourcing.
//
// Run:  node scripts/repair-bis-duplicates.mjs

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "data", "bis");
// [primary slot, duplicate slot] pairs that must hold DISTINCT items.
const PAIRS = [
  ["Ring1", "Ring2"],
  ["Trinket1", "Trinket2"],
  ["MainHand", "OffHand"],
];

function slotBy(slots, name) {
  return slots.find((s) => s.slot === name);
}

async function main() {
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".json"));
  let changed = 0;
  const edits = [];
  const unfixable = [];

  for (const f of files) {
    const full = path.join(DIR, f);
    const list = JSON.parse(await readFile(full, "utf8"));
    let dirty = false;

    for (const [primaryName, dupName] of PAIRS) {
      const primary = slotBy(list.slots, primaryName);
      const dup = slotBy(list.slots, dupName);
      if (!primary || !dup) continue; // list uses a single Ring/Trinket slot
      if (dup.bis.itemId !== primary.bis.itemId) continue; // already distinct

      const alts = dup.alternatives ?? [];
      const replacement = alts.find((a) => a.itemId !== primary.bis.itemId);
      if (!replacement) {
        unfixable.push(`${f} ${dupName} (=${dup.bis.itemId}, no distinct alt)`);
        continue;
      }
      const oldId = dup.bis.itemId;
      dup.bis = { ...replacement };
      // Drop the promoted item from the alternatives; keep the rest as-is.
      dup.alternatives = alts.filter((a) => a.itemId !== replacement.itemId);
      dirty = true;
      edits.push(
        `${f}: ${dupName} ${oldId} → ${replacement.itemId} (${replacement.name ?? "?"}, ${replacement.usagePct ?? "?"}%)`,
      );
    }

    if (dirty) {
      // Preserve the repo's exact format: 1-space indent, no trailing newline.
      await writeFile(full, JSON.stringify(list, null, 1));
      changed++;
    }
  }

  console.log(`Repaired ${changed} of ${files.length} BiS lists.`);
  console.log(`\n${edits.length} slot fixes:`);
  edits.forEach((e) => console.log("  " + e));
  if (unfixable.length) {
    console.log(`\n⚠ ${unfixable.length} pairs need manual sourcing:`);
    unfixable.forEach((u) => console.log("  " + u));
  }
}

await main();
