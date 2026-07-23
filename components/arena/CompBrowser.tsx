// The one filterable arena-comp browser, shared by the hub (/arena/comps)
// and every SEO facet page (/arena/comps/[bracket], /class/[class],
// /[bracket]/class/[class]). BRACKET and CLASS live in the URL PATH — each
// combination is its own indexable page with a unique title/H1 and a
// self-canonical — while TIER / STYLE / DIFF / SORT are query-param
// refinements that carry across facet navigation and canonicalize back to the
// facet path. One filter bar: the Bracket/Class rows ARE the links into the
// facet pages, so there is no separate "browse by" block to duplicate them.
//
// The Class row is multi-select: ticking a second (or third) class opens the
// combo facet /class/rogue-shaman, an AND-filtered page that ranks on its own.
// Classes that wouldn't form a real page (no comp fields them together, or the
// set is already at MAX_COMBO_SIZE) render disabled so every link is crawlable.
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
import { CLASSES } from "@/lib/classes";
import {
  BRACKETS,
  BRACKET_LABEL,
  MAX_COMBO_SIZE,
  facetPath,
  facetCopy,
  classLabel,
  compsFor,
} from "@/lib/comps-seo";
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
  activeValues,
  disabledValues,
  hrefFor,
  scroll = false,
  cap = false,
}: {
  label: string;
  options: { value: string; label: string }[];
  /** Single-select highlight. Ignored when `activeValues` is provided. */
  activeValue?: string | undefined;
  /** Multi-select highlight — a pill is active when its value is in the set. */
  activeValues?: Set<string>;
  /** Values rendered non-interactive (would lead to an empty/non-existent page). */
  disabledValues?: Set<string>;
  hrefFor: (value: string) => string;
  scroll?: boolean;
  cap?: boolean;
}) {
  const isActive = (value: string) =>
    activeValues ? activeValues.has(value) : activeValue === value;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
        {label}
      </span>
      {options.map((o) => {
        const active = isActive(o.value);
        if (disabledValues?.has(o.value)) {
          return (
            <span
              key={o.value}
              aria-disabled="true"
              className={cn(
                "cursor-not-allowed rounded-lg border border-border/60 bg-surface/40 px-2.5 py-1 text-xs font-medium text-muted/50",
                cap && "capitalize",
              )}
            >
              {o.label}
            </span>
          );
        }
        return (
          <Link
            key={o.value}
            href={hrefFor(o.value)}
            scroll={scroll}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
              cap && "capitalize",
              active
                ? "border-accent/50 bg-accent-faint text-accent"
                : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
            )}
          >
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}

export function CompBrowser({
  bracket,
  classSlugs,
  query,
}: {
  bracket?: Bracket;
  classSlugs?: string[];
  query: CompQuery;
}) {
  const classSet = classSlugs ?? [];
  const copy = facetCopy(bracket, classSet);
  const path = facetPath(bracket, classSet);
  const qs = qsOf(query);

  let comps: ArenaComp[] = COMPS.filter((c) => {
    if (bracket && c.bracket !== bracket) return false;
    if (
      classSet.length &&
      !classSet.every((cs) => c.members.some((m) => m.class === cs))
    )
      return false;
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
    facetPath(b === bracket ? undefined : (b as Bracket), classSet) + qs;
  // Ticking a class adds it to (or removes it from) the class set, opening the
  // single-class or combo facet for the resulting sorted set.
  const toggleClass = (slug: string) =>
    (classSet.includes(slug)
      ? classSet.filter((s) => s !== slug)
      : [...classSet, slug]
    ).sort();
  const classHref = (slug: string) => facetPath(bracket, toggleClass(slug)) + qs;
  // Disable any class that isn't selected and can't extend the set into a real
  // page — either the set would exceed MAX_COMBO_SIZE or no comp fields them
  // all together in the current bracket scope.
  const classActive = new Set(classSet);
  const classDisabled = new Set<string>();
  for (const c of CLASSES) {
    if (classActive.has(c.slug)) continue;
    const next = [...classSet, c.slug];
    if (
      next.length > MAX_COMBO_SIZE ||
      compsFor({ bracket, classSlugs: next }).length === 0
    )
      classDisabled.add(c.slug);
  }
  const queryHref = (key: keyof CompQuery, value: string) => {
    const next: CompQuery = { ...query };
    if (next[key] === value) delete next[key];
    else next[key] = value;
    return path + qsOf(next);
  };
  const sortHref = (s: string) =>
    path + qsOf({ ...query, sort: s === "tier" ? undefined : s });

  const refined = Boolean(
    query.tier || query.playstyle || query.difficulty,
  );
  const anyActive = Boolean(
    bracket || classSet.length || refined || (query.sort && query.sort !== "tier"),
  );

  // Escape hatch for an empty result set. Refinements come off first; past
  // that the facet itself has no comps (the bracket row can walk you into a
  // class set no comp fields in that bracket), so widen the path instead —
  // linking back to `path` would be a dead end.
  const empty: { href: string; label: string } = refined
    ? { href: path, label: "Reset refinements" }
    : bracket && classSet.length
      ? {
          href: facetPath(undefined, classSet) + qs,
          label: `See ${classLabel(classSet)} comps in every bracket`,
        }
      : classSet.length > 1
        ? {
            href: facetPath(bracket, classSet.slice(0, -1)) + qs,
            label: `See ${classLabel(classSet.slice(0, -1))} comps`,
          }
        : { href: "/arena/comps", label: "Browse every comp" };

  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
  ];
  if (bracket) crumbs.push({ name: BRACKET_LABEL[bracket], href: facetPath(bracket) });
  if (classSet.length)
    crumbs.push({
      name: classLabel(classSet),
      href: facetPath(bracket, classSet),
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
            activeValues={classActive}
            disabledValues={classDisabled}
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
          <div className="mt-6 rounded-xl border border-border bg-surface p-6 text-center">
            <p className="text-sm text-muted-strong">
              No comps match these filters.
            </p>
            <p className="mt-1.5 text-sm text-muted">
              {classSet.length > 1
                ? `No TBC ${bracket ? BRACKET_LABEL[bracket] + " " : ""}comp fields ${classLabel(classSet)} together.`
                : "Try widening the selection."}{" "}
              <Link href={empty.href} className="text-accent hover:underline">
                {empty.label}
              </Link>
              .
            </p>
          </div>
        )}
      </main>
    </>
  );
}
