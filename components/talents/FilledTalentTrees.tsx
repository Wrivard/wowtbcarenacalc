// The recommended build rendered as the three actual filled talent trees
// (read-only), for embedding on pages other than the talents page — e.g.
// BiS pages, where players expect to see the whole tree, not just a
// "0/5/56" summary. Returns null when the spec has no curated build.

import Link from "next/link";
import { getBuild } from "@/data/builds";
import { getTalents } from "@/lib/talents";
import { resolveBuildState } from "@/lib/talent-build";
import { TalentTreeGrid } from "@/components/talents/TalentTreeGrid";

export function FilledTalentTrees({
  classSlug,
  specSlug,
  specName,
  className,
}: {
  classSlug: string;
  specSlug: string;
  specName: string;
  className?: string;
}) {
  const build = getBuild(classSlug, specSlug);
  const talents = getTalents(classSlug);
  if (!build || !talents) return null;

  const state = resolveBuildState(classSlug, build);
  if (!state) return null;

  const notesByTree: Record<string, string>[] = talents.trees.map((_, ti) =>
    Object.fromEntries(
      (build.notes ?? [])
        .filter((n) => n.treeIndex === ti)
        .map((n) => [n.talentId, n.note]),
    ),
  );

  return (
    <section className={className} aria-label={`${specName} talent build`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Recommended talent build
        </h2>
        <span className="font-mono text-sm font-semibold tracking-tight text-accent">
          {build.summaryLabel}
          <span className="ml-2 text-[11px] tracking-wider text-muted uppercase">
            {build.category === "pvp" ? "Arena" : "Raid"} build
          </span>
        </span>
      </div>

      {/* Horizontal snap-scroll row so the three trees fit any container
          width (BiS pages use a narrow reading column). */}
      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-3">
        {talents.trees.map((tree, ti) => (
          <div key={tree.treeName} className="shrink-0 snap-start">
            <TalentTreeGrid tree={tree} ranks={state[ti]} notes={notesByTree[ti]} />
          </div>
        ))}
      </div>
      <p className="mt-1 text-xs text-muted">
        The filled build — grey talents are untaken. Scroll to see all three
        trees; hover any talent for its tooltip.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/${classSlug}/${specSlug}/talents`}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-accent-dim"
        >
          Full talent build &amp; reasoning
        </Link>
        <Link
          href={`/talent-calculator/${classSlug}`}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-strong transition-colors hover:text-foreground"
        >
          Open in calculator
        </Link>
      </div>
    </section>
  );
}
