// Shared server-rendered listing for the arena-comp SEO landing pages
// (bracket, class, and bracket×class). Unique H1/intro come from lib/comps-seo;
// this renders the hero, cross-facet "browse by" nav for internal linking,
// and the comp-card grid.

import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CompCard } from "@/components/arena/CompBits";
import { JsonLd, breadcrumbJsonLd, type Crumb } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";
import type { ArenaComp } from "@/data/comps";
import { cn } from "@/lib/utils";

export interface RefineGroup {
  label: string;
  links: { href: string; label: string; active?: boolean }[];
}

export function CompCollection({
  crumbs,
  h1,
  intro,
  comps,
  refine = [],
}: {
  crumbs: Crumb[];
  h1: string;
  intro: string;
  comps: ArenaComp[];
  refine?: RefineGroup[];
}) {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {h1}
        </h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {intro}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[880px] px-4 pt-8">
        {refine.length > 0 && (
          <div className="space-y-3 rounded-xl border border-border bg-surface/40 p-4">
            {refine.map((g) => (
              <div key={g.label} className="flex flex-wrap items-center gap-2">
                <span className="w-20 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
                  {g.label}
                </span>
                {g.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={l.active ? "page" : undefined}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                      l.active
                        ? "border-accent/50 bg-accent-faint text-accent"
                        : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-border pt-3">
              <Link
                href="/arena/comps"
                className="text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
              >
                ← All comps &amp; full filters
              </Link>
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-muted">
          {comps.length} comp{comps.length === 1 ? "" : "s"}
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comps.map((c) => (
            <CompCard key={c.id} comp={c} />
          ))}
        </div>
      </main>
    </>
  );
}
