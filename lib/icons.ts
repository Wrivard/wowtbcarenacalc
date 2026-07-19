// Class + spec icon helpers. Class icons are the standard zamimg
// classicon_* set; spec icons are derived from the spec's talent tree —
// the 41-point capstone talent's icon — so they always come from real
// data instead of hand-typed icon names.

import { getTalents } from "@/lib/talents";
import type { SpecDef } from "@/lib/classes";

export function classIconName(classSlug: string): string {
  return `classicon_${classSlug}`;
}

export function specIconName(classSlug: string, spec: SpecDef): string {
  const talents = getTalents(classSlug);
  const tree = talents?.trees[spec.treeIndex];
  const capstone = tree?.talents.find((t) => t.row === 8);
  return capstone?.icon ?? classIconName(classSlug);
}
