// The actual recommended talent build, rendered read-only: the three
// filled talent trees (points visible on each talent) plus the key-pick
// notes and a link to open/edit it in the calculator. Used on spec guide
// pages so readers see the real build, not just an "0/5/56" summary.

import Link from "next/link";
import { getTalents } from "@/lib/talents";
import { getResolvedBuild } from "@/lib/talent-build";
import { TalentTreeGrid } from "@/components/talents/TalentTreeGrid";

export function RecommendedTalentBuild({
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
  const talents = getTalents(classSlug);
  const resolved = getResolvedBuild(classSlug, specSlug);
  if (!talents || !resolved) return null;
  const { build, state } = resolved;

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
        <span className="font-mono text-sm font-semibold text-accent">
          {build.summaryLabel}{" "}
          <span className="text-[11px] font-normal tracking-wider text-muted uppercase">
            · {build.category === "pvp" ? "Arena" : "Raid"}
          </span>
        </span>
      </div>

      {build.blurb && (
        <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-muted-strong">
          {build.blurb}
        </p>
      )}

      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
        {talents.trees.map((tree, ti) => (
          <div key={tree.treeName} className="shrink-0 snap-start">
            <TalentTreeGrid tree={tree} ranks={state[ti]} notes={notesByTree[ti]} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/${classSlug}/${specSlug}/talents`}
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-accent-dim"
        >
          Full build breakdown
        </Link>
        <Link
          href={`/talent-calculator/${classSlug}`}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-strong transition-colors hover:text-foreground"
        >
          Open in calculator
        </Link>
      </div>
      <p className="mt-2 text-xs text-muted">
        Points are filled on each tree above — hover a talent for its tooltip;
        highlighted talents are the build&apos;s key picks.
      </p>
    </section>
  );
}
