// Finds the iconic TBC abilities named in a block of guide prose, so the comp
// pages can render their spell icons. Players recognise the icon far faster
// than the words — the whole point of the strip is visual recall.

import { ABILITY_ICONS } from "@/data/abilityIcons";

export interface AbilityRef {
  name: string;
  icon: string;
}

// Longest names first so "Fear Ward" and "Shadow Word: Death" claim their
// span before "Fear"/"Death Coil" can match a substring of it.
const NAMES = Object.keys(ABILITY_ICONS).sort((a, b) => b.length - a.length);
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Distinct abilities mentioned in `text`, in first-appearance order. Each
 * matched span is blanked (kept the same length) before shorter names are
 * tested, so a phrase is attributed once to its most specific ability and a
 * substring name can't double-count it.
 */
export function abilitiesIn(text: string, limit = 12): AbilityRef[] {
  let working = text;
  const hits: { name: string; index: number }[] = [];
  for (const name of NAMES) {
    const re = new RegExp(`\\b${escape(name)}\\b`, "gi");
    const first = re.exec(working);
    if (!first) continue;
    hits.push({ name, index: first.index });
    working = working.replace(
      new RegExp(`\\b${escape(name)}\\b`, "gi"),
      (m) => " ".repeat(m.length),
    );
  }
  return hits
    .sort((a, b) => a.index - b.index)
    .slice(0, limit)
    .map(({ name }) => ({ name, icon: ABILITY_ICONS[name] }));
}
