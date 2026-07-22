// The one filterable arena-comp browser, shared by the hub (/arena/comps)
// and every SEO facet page (/arena/comps/[bracket], /class/[class],
// /[bracket]/class/[class]). BRACKET and CLASS live in the URL PATH — each
// combination is its own indexable page with a unique title/H1 and a
// self-canonical — while TIER / STYLE / DIFF / SORT are query-param
// refinements that carry across facet navigation and canonicalize back to the
// facet path. One filter bar: the Bracket/Class rows ARE the links into the
// facet pages, so there is no separate "browse by" block to duplicate them.
//
// These pages render on demand (they read the refinement query); the work is
// just filtering an in-memory list, so SSR is cheap and the HTML is fully
// crawlable with correct per-facet metadata.

import Link from "next/link";
import {
  COMPS,
  TIER_ORDER,
  type ArenaComp,
  type Bracket,
  type Tier,
  type Playstyle,
} from "@/data/comps";
import { CLASSES, getClass } from "@/lib/classes";
import { BRACKETS, BRACKET_LABEL, facetPath, facetCopy } from "@/lib/comps-seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CompCard } from "@/components/arena/CompBits";
import { JsonLd, breadcrumbJsonLd, type Crumb } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { cn } from "@/lib/utils";

const TIERS: Tier[] = ["S", "A", "B", "C"];
const PLAYSTYLES: Playstyle[] = ["cleave", "control", "sustain", "burst"];
const DIFFS = ["1", "2", "3"] as const;
const SORTS = ["tier", "difficulty", "name"] as const;

export interface CompQuery {
  tier?: string;
  playstyle?: string;
  difficulty?: string;
  sort?: string;
}

/** Extract the query-refinement filters from a route's searchParams. */
export function queryFrom(
  sp: Record<string, string | string[] | undefined>,
): CompQuery {
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;
  return {
    tier: first(sp.tier),
    playstyle: first(sp.playstyle),
    difficulty: first(sp.difficulty),
    sort: first(sp.sort),
  };
}

function qsOf(query: CompQuery): string {
  const s = Object.entries(query)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join("&");
  return s ? `?${s}` : "";
}

function PillRow({
  label,
  options,
  activeValue,
  hrefFor,
  scroll = false,
  cap = false,
}: {
  label: string;
  options: { value: string; label: string }[];
  activeValue: string | undefined;
  hrefFor: (value: string) => string;
  scroll?: boolean;
  cap?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
        {label}
      </span>
      {options.map((o) => (
        <Link
          key={o.value}
          href={hrefFor(o.value)}
          scroll={scroll}
          aria-current={activeValue === o.value ? "true" : undefined}
          className={cn(
            "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
            cap && "capitalize",
            activeValue === o.value
              ? "border-accent/50 bg-accent-faint text-accent"
              : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
          )}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}

export function CompBrowser({
  bracket,
  classSlug,
  query,
}: {
  bracket?: Bracket;
  classSlug?: string;
  query: CompQuery;
}) {
  const copy = facetCopy(bracket, classSlug);
  const path = facetPath(bracket, classSlug);
  const qs = qsOf(query);

  let comps: ArenaComp[] = COMPS.filter((c) => {
    if (bracket && c.bracket !== bracket) return false;
    if (classSlug && !c.members.some((m) => m.class === classSlug)) return false;
    if (query.tier && c.tier !== query.tier) return false;
    if (query.playstyle && c.playstyle !== query.playstyle) return false;
    if (query.difficulty && String(c.difficulty) !== query.difficulty) return false;
    return true;
  });
  const sort = query.sort ?? "tier";
  comps = [...comps].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "difficulty") return a.difficulty - b.difficulty;
    return TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name);
  });

  // Bracket/Class navigate to facet PATHS (carry the query refinements);
  // Tier/Style/Diff/Sort toggle the query on the current path.
  const bracketHref = (b: string) =>
    facetPath(b === bracket ? undefined : (b as Bracket), classSlug) + qs;
  const classHref = (slug: string) =>
    facetPath(bracket, slug === classSlug ? undefined : slug) + qs;
  const queryHref = (key: keyof CompQuery, value: string) => {
    const next: CompQuery = { ...query };
    if (next[key] === value) delete next[key];
    else next[key] = value;
    return path + qsOf(next);
  };
  const sortHref = (s: string) =>
    path + qsOf({ ...query, sort: s === "tier" ? undefined : s });

  const anyActive = Boolean(
    bracket || classSlug || query.tier || query.playstyle || query.difficulty ||
      (query.sort && query.sort !== "tier"),
  );

  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
  ];
  if (bracket) crumbs.push({ name: BRACKET_LABEL[bracket], href: facetPath(bracket) });
  if (classSlug)
    crumbs.push({
      name: getClass(classSlug)?.name ?? classSlug,
      href: facetPath(bracket, classSlug),
    });

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {copy.h1}
        </h1>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {copy.intro}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[880px] px-4 pt-8">
        <div className="space-y-3 rounded-xl border border-border bg-surface/40 p-4">
          <PillRow
            label="Bracket"
            activeValue={bracket}
            hrefFor={bracketHref}
            options={BRACKETS.map((b) => ({ value: b, label: b }))}
          />
          <PillRow
            label="Class"
            activeValue={classSlug}
            hrefFor={classHref}
            options={CLASSES.map((c) => ({ value: c.slug, label: c.name }))}
          />
          <div className="border-t border-border pt-3">
            <PillRow
              label="Tier"
              activeValue={query.tier}
              hrefFor={(v) => queryHref("tier", v)}
              options={TIERS.map((t) => ({ value: t, label: t }))}
            />
          </div>
          <PillRow
            label="Style"
            activeValue={query.playstyle}
            hrefFor={(v) => queryHref("playstyle", v)}
            cap
            options={PLAYSTYLES.map((p) => ({ value: p, label: p }))}
          />
          <PillRow
            label="Diff"
            activeValue={query.difficulty}
            hrefFor={(v) => queryHref("difficulty", v)}
            options={DIFFS.map((d) => ({ value: d, label: d }))}
          />
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
              Sort
            </span>
            {SORTS.map((s) => (
              <Link
                key={s}
                href={sortHref(s)}
                scroll={false}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                  sort === s
                    ? "border-accent/50 bg-accent-faint text-accent"
                    : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
                )}
              >
                {s}
              </Link>
            ))}
            {anyActive && (
              <Link
                href="/arena/comps"
                className="ml-auto text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
              >
                Clear all
              </Link>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-muted">
          {comps.length} comp{comps.length === 1 ? "" : "s"}
        </p>

        {comps.length > 0 ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comps.map((c) => (
              <CompCard key={c.id} comp={c} />
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-xl border border-border bg-surface p-6 text-center text-sm text-muted">
            No comps match these filters.{" "}
            <Link href={path} className="text-accent hover:underline">
              Reset refinements
            </Link>
            .
          </p>
        )}
      </main>
    </>
  );
}
