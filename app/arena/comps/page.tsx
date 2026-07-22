import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  COMPS,
  TIER_ORDER,
  type ArenaComp,
  type Bracket,
  type Tier,
  type Playstyle,
} from "@/data/comps";
import { CLASSES } from "@/lib/classes";
import { BRACKETS as SEO_BRACKETS, BRACKET_LABEL } from "@/lib/comps-seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { CompCard } from "@/components/arena/CompBits";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Arena Comp Tier List — Best 2v2, 3v3 & 5v5 Comps",
    description:
      "Filterable TBC Classic arena comp tier list: the best 2s, 3s and 5s comps by tier, playstyle, class and difficulty — RMP, RLS, Warrior/Paladin and more.",
    path: "/arena/comps",
  }),
};

type SP = Promise<Record<string, string | string[] | undefined>>;

const BRACKETS: Bracket[] = ["2s", "3s", "5s"];
const TIERS: Tier[] = ["S", "A", "B", "C"];
const PLAYSTYLES: Playstyle[] = ["cleave", "control", "sustain", "burst"];
const DIFFS = ["1", "2", "3"] as const;
const SORTS = ["tier", "difficulty", "name"] as const;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

/** Build a querystring with one key toggled (same value clears it). */
function toggleHref(
  params: Record<string, string | undefined>,
  key: string,
  value: string,
): string {
  const next = { ...params };
  if (next[key] === value) delete next[key];
  else next[key] = value;
  const qs = Object.entries(next)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join("&");
  return qs ? `/arena/comps?${qs}` : "/arena/comps";
}

function FilterRow({
  label,
  options,
  paramKey,
  active,
  params,
}: {
  label: string;
  options: { value: string; label: string }[];
  paramKey: string;
  active: string | undefined;
  params: Record<string, string | undefined>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
        {label}
      </span>
      {options.map((o) => (
        <Link
          key={o.value}
          href={toggleHref(params, paramKey, o.value)}
          scroll={false}
          className={cn(
            "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
            active === o.value
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

export default async function CompsBrowser({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const params = {
    bracket: first(sp.bracket),
    tier: first(sp.tier),
    playstyle: first(sp.playstyle),
    class: first(sp.class),
    difficulty: first(sp.difficulty),
    sort: first(sp.sort),
  };

  let comps: ArenaComp[] = COMPS.filter((c) => {
    if (params.bracket && c.bracket !== params.bracket) return false;
    if (params.tier && c.tier !== params.tier) return false;
    if (params.playstyle && c.playstyle !== params.playstyle) return false;
    if (params.difficulty && String(c.difficulty) !== params.difficulty) return false;
    if (params.class && !c.members.some((m) => m.class === params.class)) return false;
    return true;
  });

  const sort = params.sort ?? "tier";
  comps = [...comps].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "difficulty") return a.difficulty - b.difficulty;
    return TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name);
  });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Arena Comp Tier List
        </h1>
        <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The viable 2v2, 3v3 and 5v5 comps for TBC Classic arena, ranked by
          tier. Filter by bracket, playstyle, class or difficulty — every view
          is shareable by URL.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[880px] px-4 pt-8">
        {/* Filter bar */}
        <div className="space-y-3 rounded-xl border border-border bg-surface/40 p-4">
          <FilterRow
            label="Bracket"
            paramKey="bracket"
            active={params.bracket}
            params={params}
            options={BRACKETS.map((b) => ({ value: b, label: b }))}
          />
          <FilterRow
            label="Tier"
            paramKey="tier"
            active={params.tier}
            params={params}
            options={TIERS.map((t) => ({ value: t, label: t }))}
          />
          <FilterRow
            label="Style"
            paramKey="playstyle"
            active={params.playstyle}
            params={params}
            options={PLAYSTYLES.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))}
          />
          <FilterRow
            label="Diff"
            paramKey="difficulty"
            active={params.difficulty}
            params={params}
            options={DIFFS.map((d) => ({ value: d, label: d }))}
          />
          <FilterRow
            label="Class"
            paramKey="class"
            active={params.class}
            params={params}
            options={CLASSES.map((c) => ({ value: c.slug, label: c.name }))}
          />
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
              Sort
            </span>
            {SORTS.map((s) => (
              <Link
                key={s}
                href={toggleHref({ ...params, sort: undefined }, "sort", s)}
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
            {(params.bracket || params.tier || params.playstyle || params.class || params.difficulty) && (
              <Link
                href="/arena/comps"
                className="ml-auto text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
              >
                Clear filters
              </Link>
            )}
          </div>
        </div>

        {/* Dedicated landing pages per bracket/class — each ranks on its own
            (e.g. "best shaman 2v2 comps") and links the hub into them. */}
        <nav aria-label="Browse comps by bracket or class" className="mt-4 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
              Guides
            </span>
            {SEO_BRACKETS.map((b) => (
              <Link
                key={b}
                href={`/arena/comps/${b}`}
                className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-strong transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                Best {BRACKET_LABEL[b]} comps
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-wider text-muted uppercase">
              By class
            </span>
            {CLASSES.map((c) => (
              <Link
                key={c.slug}
                href={`/arena/comps/class/${c.slug}`}
                className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-strong transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </nav>

        <p className="mt-6 text-xs text-muted">
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
            <Link href="/arena/comps" className="text-accent hover:underline">
              Clear filters
            </Link>
            .
          </p>
        )}
      </main>
    </>
  );
}
