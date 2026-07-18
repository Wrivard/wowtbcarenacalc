"use client";

// Interactive TBC talent calculator for one class. Build state lives in
// the ?b= query param (compact digit string per tree) so every build is
// a shareable link that round-trips through decode → validate → encode.

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Link2, RotateCcw } from "lucide-react";
import type { ClassTalents } from "@/lib/talents";
import {
  TOTAL_POINTS,
  buildSummary,
  decodeBuild,
  emptyBuild,
  encodeBuild,
  totalPoints,
  treePoints,
  wowheadCalcUrl,
  type BuildState,
} from "@/lib/talents";
import { buildValid, canAddPoint, canRemovePoint } from "@/lib/talent-rules";
import { TalentTreeGrid } from "@/components/talents/TalentTreeGrid";
import { trackEvent } from "@/lib/gtag";
import { cn } from "@/lib/utils";

export function TalentCalculator({
  cls,
  className,
}: {
  cls: ClassTalents;
  className: string; // display name, e.g. "Shaman"
}) {
  const searchParams = useSearchParams();

  // The ?b= param seeds the build (invalid/illegal strings → empty).
  // This component renders client-side only (Suspense boundary around
  // useSearchParams on a static page), so deriving initial state from
  // the URL at render time is hydration-safe.
  const urlBuild = useMemo(() => {
    const encoded = searchParams.get("b");
    if (!encoded) return null;
    const decoded = decodeBuild(cls, encoded);
    return buildValid(decoded, cls.trees) ? decoded : null;
  }, [searchParams, cls]);

  // null = user hasn't touched the build yet → show the URL's build.
  const [userBuild, setUserBuild] = useState<BuildState | null>(null);
  const [copied, setCopied] = useState(false);
  const build = userBuild ?? urlBuild ?? emptyBuild(cls);

  // Reflect user edits in the URL without adding history entries.
  useEffect(() => {
    if (!userBuild) return;
    const encoded = encodeBuild(userBuild);
    const url = new URL(window.location.href);
    if (encoded) url.searchParams.set("b", encoded);
    else url.searchParams.delete("b");
    window.history.replaceState(null, "", url.toString());
  }, [userBuild]);

  const spent = totalPoints(build);
  const remaining = TOTAL_POINTS - spent;

  // Spec label = tree with the most points.
  const specLabel = useMemo(() => {
    const perTree = cls.trees.map((_, i) => treePoints(build, i));
    const max = Math.max(...perTree);
    if (max === 0) return null;
    return cls.trees[perTree.indexOf(max)].treeName;
  }, [build, cls.trees]);

  const mutate = useCallback(
    (treeIndex: number, talentIndex: number, delta: 1 | -1) => {
      setUserBuild((prev) => {
        const base = prev ?? urlBuild ?? emptyBuild(cls);
        const ok =
          delta === 1
            ? canAddPoint(base, cls.trees, treeIndex, talentIndex)
            : canRemovePoint(base, cls.trees, treeIndex, talentIndex);
        if (!ok) return prev;
        const next = base.map((tree) => [...tree]);
        next[treeIndex][talentIndex] += delta;
        return next;
      });
    },
    [cls, urlBuild],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      trackEvent("talent_build_shared", {
        class: cls.class,
        summary: buildSummary(build),
      });
    } catch {
      // Clipboard unavailable (permissions) — the URL bar still has it.
    }
  };

  return (
    <div>
      {/* Counters + actions */}
      <div className="sticky top-12 z-30 -mx-4 mb-6 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-4 font-mono text-sm tabular-nums">
            <span>
              <span className={cn(remaining === 0 ? "text-accent" : "text-foreground")}>
                {remaining}
              </span>
              <span className="text-muted"> / {TOTAL_POINTS} left</span>
            </span>
            <span className="text-muted">{buildSummary(build)}</span>
            {specLabel && (
              <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] tracking-wider text-accent uppercase">
                {specLabel}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              disabled={spent === 0}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden />
              ) : (
                <Link2 className="size-3.5" aria-hidden />
              )}
              {copied ? "Copied" : "Copy build link"}
            </button>
            <a
              href={wowheadCalcUrl(cls.class, build)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded-lg border border-border px-3 py-1.5 text-xs text-muted-strong transition-colors hover:bg-surface-hover",
                spent === 0 && "pointer-events-none opacity-40",
              )}
            >
              Open on Wowhead
            </a>
            <button
              onClick={() => setUserBuild(emptyBuild(cls))}
              disabled={spent === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-strong transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="size-3" aria-hidden />
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="mb-5 text-xs text-muted">
        Click a talent to add a point · right-click to remove ·{" "}
        {className} gets {TOTAL_POINTS} points at level 70 · tier unlocks
        every 5 points in a tree.
      </p>

      {/* Trees: side by side on desktop, horizontally scrollable on mobile */}
      <div className="flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {cls.trees.map((tree, ti) => (
          <div key={tree.treeName} className="shrink-0 snap-start">
            <TalentTreeGrid
              tree={tree}
              ranks={build[ti]}
              interaction={{
                canAdd: (i) => canAddPoint(build, cls.trees, ti, i),
                canRemove: (i) => canRemovePoint(build, cls.trees, ti, i),
                onAdd: (i) => mutate(ti, i, 1),
                onRemove: (i) => mutate(ti, i, -1),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
