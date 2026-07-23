// Writes the per-phase stat-priority rationales from
// scripts/pve-phase-editorial.mjs into data/bis/<class>-<spec>-pve-<N>.json.
//
// build-pve-bis.mjs reads the same module, so a regenerated snapshot keeps
// the prose; this script exists to revise it without re-running that build
// (which refetches the WarcraftLogs snapshot). Idempotent.
//
// Run:  node scripts/apply-pve-editorial.mjs

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { PVE_PHASE_EDITORIAL } from "./pve-phase-editorial.mjs";
import { PVE_EDITORIAL } from "./pve-editorial.mjs";

const BIS_DIR = path.join(process.cwd(), "data", "bis");
const PHASES = [1, 2, 3, 4, 5];
const MIN_WORDS = 25;
const MAX_WORDS = 90;

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

async function main() {
  const problems = [];
  let written = 0;
  let fellBack = 0;

  for (const key of Object.keys(PVE_EDITORIAL)) {
    const [cls, spec] = key.split("/");
    const byPhase = PVE_PHASE_EDITORIAL[key];

    if (byPhase) {
      const texts = PHASES.map((p) => byPhase[p] ?? "");
      for (let i = 0; i < texts.length; i++)
        for (let j = i + 1; j < texts.length; j++)
          if (texts[i] && texts[i] === texts[j])
            problems.push(`${key}: P${PHASES[i]} and P${PHASES[j]} are identical`);
    }

    for (const phase of PHASES) {
      const file = path.join(BIS_DIR, `${cls}-${spec}-pve-${phase}.json`);
      if (!existsSync(file)) continue;

      // No per-phase text yet → keep the spec-wide rationale rather than
      // blanking the section. Reported, not silent.
      let text = byPhase?.[phase];
      if (!text) {
        text = PVE_EDITORIAL[key]?.rationale ?? "";
        fellBack++;
        problems.push(`${key} P${phase}: no per-phase text, kept spec rationale`);
      } else {
        const n = words(text);
        if (n < MIN_WORDS || n > MAX_WORDS)
          problems.push(`${key} P${phase}: ${n} words (want ${MIN_WORDS}-${MAX_WORDS})`);
      }

      const list = JSON.parse(await readFile(file, "utf8"));
      list.statPriorityRationale = text;
      await writeFile(file, JSON.stringify(list, null, 1));
      written++;
    }
  }

  // Cross-spec duplication — two specs sharing a paragraph is the thin
  // content this split exists to remove.
  const seen = new Map();
  for (const [key, byPhase] of Object.entries(PVE_PHASE_EDITORIAL))
    for (const phase of PHASES) {
      const t = byPhase[phase];
      if (!t) continue;
      if (seen.has(t)) problems.push(`duplicate text: ${key} P${phase} == ${seen.get(t)}`);
      else seen.set(t, `${key} P${phase}`);
    }

  console.log(`wrote ${written} PvE lists (${fellBack} still on the spec-wide rationale)`);
  if (problems.length) {
    console.warn(`\n${problems.length} problem(s):`);
    for (const p of problems) console.warn(`  ${p}`);
    process.exitCode = 1;
  } else {
    console.log("all rationales present, distinct and within length");
  }
}

await main();
