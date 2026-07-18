// Talent allocation rules (TBC): 61 points at level 70, tier N (0-based
// row) unlocks at N*5 points spent in that tree, prerequisites must be
// at max rank (matches wowsims' isFull check and Wowhead's calculator).

import type { TalentTree, BuildState } from "@/lib/talents";
import { TOTAL_POINTS, totalPoints, treePoints } from "@/lib/talents";

export function pointsInRowsBelow(
  tree: TalentTree,
  ranks: number[],
  row: number,
): number {
  return tree.talents.reduce(
    (sum, t, i) => (t.row < row ? sum + ranks[i] : sum),
    0,
  );
}

export function canAddPoint(
  build: BuildState,
  trees: TalentTree[],
  treeIndex: number,
  talentIndex: number,
): boolean {
  const tree = trees[treeIndex];
  const ranks = build[treeIndex];
  const talent = tree.talents[talentIndex];
  if (totalPoints(build) >= TOTAL_POINTS) return false;
  if (ranks[talentIndex] >= talent.maxRank) return false;
  if (treePoints(build, treeIndex) < talent.requiresPoints) return false;
  if (talent.requires) {
    const prereqIdx = tree.talents.findIndex(
      (t) => t.id === talent.requires!.talentId,
    );
    if (prereqIdx === -1) return false;
    if (ranks[prereqIdx] < tree.talents[prereqIdx].maxRank) return false;
  }
  return true;
}

/** A tree is valid when every invested talent's tier gate + prereq holds. */
function treeValid(tree: TalentTree, ranks: number[]): boolean {
  for (let i = 0; i < tree.talents.length; i++) {
    if (ranks[i] === 0) continue;
    const talent = tree.talents[i];
    if (pointsInRowsBelow(tree, ranks, talent.row) < talent.requiresPoints)
      return false;
    if (talent.requires) {
      const prereqIdx = tree.talents.findIndex(
        (t) => t.id === talent.requires!.talentId,
      );
      if (
        prereqIdx === -1 ||
        ranks[prereqIdx] < tree.talents[prereqIdx].maxRank
      )
        return false;
    }
  }
  return true;
}

export function canRemovePoint(
  build: BuildState,
  trees: TalentTree[],
  treeIndex: number,
  talentIndex: number,
): boolean {
  const ranks = build[treeIndex];
  if (ranks[talentIndex] === 0) return false;
  const next = [...ranks];
  next[talentIndex] -= 1;
  return treeValid(trees[treeIndex], next);
}

/** Is a whole decoded build legal? Used to sanitize ?b= URL input. */
export function buildValid(build: BuildState, trees: TalentTree[]): boolean {
  if (totalPoints(build) > TOTAL_POINTS) return false;
  return trees.every((tree, ti) => treeValid(tree, build[ti]));
}
