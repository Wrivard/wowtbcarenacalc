// Integrity guard for the BiS data. Exits non-zero if any list has a
// structural defect, so the ring/trinket-duplication class of bug can't
// silently regress after a data regeneration.
//
// Checks every data/bis/*.json for:
//   - identical items in a paired slot group (Ring1/2, Trinket1/2, MH/OH)
//   - the same item id appearing in two different BiS slots
//   - an item listed among its own slot's alternatives
//
// Run:  node scripts/audit-bis.mjs   (exit 0 = clean, 1 = defects found)

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "data", "bis");
const PAIRS = [
  ["Ring1", "Ring2"],
  ["Trinket1", "Trinket2"],
  ["MainHand", "OffHand"],
];

async function main() {
  const files = (await readdir(DIR)).filter((f) => f.endsWith(".json"));
  const defects = [];

  for (const f of files) {
    const list = JSON.parse(await readFile(path.join(DIR, f), "utf8"));
    const slots = list.slots ?? [];
    const by = (n) => slots.find((s) => s.slot === n);

    for (const [a, b] of PAIRS) {
      const A = by(a);
      const B = by(b);
      if (A && B && A.bis.itemId === B.bis.itemId)
        defects.push(`${f}: ${a} and ${b} are the same item (${A.bis.itemId})`);
    }

    const seen = new Map();
    for (const s of slots) {
      if (seen.has(s.bis.itemId))
        defects.push(
          `${f}: item ${s.bis.itemId} used in both ${seen.get(s.bis.itemId)} and ${s.slot}`,
        );
      seen.set(s.bis.itemId, s.slot);
      if ((s.alternatives ?? []).some((alt) => alt.itemId === s.bis.itemId))
        defects.push(`${f}: ${s.slot} lists its BiS item ${s.bis.itemId} as its own alternative`);
    }
  }

  if (defects.length === 0) {
    console.log(`✓ ${files.length} BiS lists clean — no structural defects.`);
    process.exit(0);
  }
  console.error(`✗ ${defects.length} defects across ${files.length} lists:`);
  defects.forEach((d) => console.error("  " + d));
  process.exit(1);
}

await main();
