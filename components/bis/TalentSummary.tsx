// Compact talent-build summary for BiS pages: the "x/y/z" label + a
// point-distribution bar + links to the full talent page and calculator.
// Deliberately does NOT render the interactive tree (too heavy for a BiS
// page) — just enough to orient the reader, then link out.

import Link from "next/link";
import { getBuild } from "@/data/builds";

const TREE_COLORS = ["bg-accent", "bg-sky-500", "bg-fuchsia-500"];

export function TalentSummary({
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
  if (!build) return null;

  const parts = build.summaryLabel.split("/").map((n) => parseInt(n, 10));
  const total = parts.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);

  return (
    <section className={className} aria-label={`${specName} talent build`}>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        Recommended talent build
      </h2>
      <div className="mt-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-lg font-semibold tracking-tight text-foreground">
            {build.summaryLabel}
          </span>
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
            {build.category === "pvp" ? "Arena" : "Raid"} build
          </span>
        </div>

        {total > 0 && (
          <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-background">
            {parts.map((p, i) =>
              p > 0 ? (
                <div
                  key={i}
                  className={TREE_COLORS[i] ?? "bg-muted"}
                  style={{ width: `${(p / total) * 100}%` }}
                  title={`Tree ${i + 1}: ${p} points`}
                />
              ) : null,
            )}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/${classSlug}/${specSlug}/talents`}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-accent-dim"
          >
            Full talent build
          </Link>
          <Link
            href={`/talent-calculator/${classSlug}`}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-strong transition-colors hover:text-foreground"
          >
            Open in calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
