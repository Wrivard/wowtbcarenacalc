// Resolve a stored RecommendedBuild (id→rank maps OR an encoded digit
// string) into a BuildState (ranks per talent, per tree) for read-only
// rendering. Shared by the /talents page and the in-guide talent build.
// Typos in a curated build fail loudly at page build (never silently).

import { getTalents, decodeBuild, type BuildState } from "@/lib/talents";
import { getBuild, type RecommendedBuild } from "@/data/builds";

/** Resolve id→rank maps into BuildState, failing loudly on unknown ids. */
export function resolveRanks(
  classSlug: string,
  ranksByTree: Record<string, number>[],
): BuildState {
  const talents = getTalents(classSlug);
  if (!talents) throw new Error(`no talents for ${classSlug}`);
  return talents.trees.map((tree, ti) => {
    const map = ranksByTree[ti] ?? {};
    const claimed = new Set(Object.keys(map));
    const ranks = tree.talents.map((t) => {
      claimed.delete(t.id);
      return Math.min(map[t.id] ?? 0, t.maxRank);
    });
    if (claimed.size > 0)
      throw new Error(
        `build for ${classSlug} references unknown talents: ${[...claimed].join(", ")}`,
      );
    return ranks;
  });
}

/** Resolve a whole build to BuildState (or null if the class has no data). */
export function resolveBuildState(
  classSlug: string,
  build: RecommendedBuild,
): BuildState | null {
  const talents = getTalents(classSlug);
  if (!talents) return null;
  return build.ranks
    ? resolveRanks(classSlug, build.ranks)
    : decodeBuild(talents, build.encoded!);
}

/** Convenience: the recommended build + its resolved state for a spec. */
export function getResolvedBuild(classSlug: string, specSlug: string) {
  const build = getBuild(classSlug, specSlug);
  if (!build) return null;
  const state = resolveBuildState(classSlug, build);
  if (!state) return null;
  return { build, state };
}
