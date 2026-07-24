import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  PROFESSIONS,
  PROF_TIER_ORDER,
  type Profession,
  type ProfTier,
} from "@/data/professions";
import { getClass } from "@/lib/classes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Best Professions in TBC Classic — PvP & PvE Tier List",
    description:
      "TBC Classic profession tier list for PvP and PvE: which professions give the best raid and arena benefits (Jewelcrafting, Engineering, Blacksmithing, Tailoring, Leatherworking and more) and which classes want them.",
    path: "/guides/professions",
  }),
};

const TIER_COLOR: Record<ProfTier, string> = {
  S: "text-amber-300",
  A: "text-emerald-300",
  B: "text-sky-300",
  C: "text-zinc-400",
};

function TierCell({ tier }: { tier: ProfTier }) {
  return (
    <span className={cn("font-mono text-sm font-bold", TIER_COLOR[tier])}>
      {tier}
    </span>
  );
}

type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ProfessionsHub({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const sort = (Array.isArray(sp.sort) ? sp.sort[0] : sp.sort) ?? "pve";

  const rows: Profession[] = [...PROFESSIONS].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "pvp")
      return PROF_TIER_ORDER[a.pvpValue] - PROF_TIER_ORDER[b.pvpValue];
    return PROF_TIER_ORDER[a.pveValue] - PROF_TIER_ORDER[b.pveValue];
  });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Professions", href: "/guides/professions" },
  ];

  const SORTS: { key: string; label: string }[] = [
    { key: "pve", label: "PvE value" },
    { key: "pvp", label: "PvP value" },
    { key: "name", label: "Name" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.guides}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Best Professions in TBC Classic
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Every profession ranked for PvP and PvE, with the classes that want
          it most and its key endgame benefit. Most raiders run two of
          Jewelcrafting, Blacksmithing, Leatherworking, Tailoring, Enchanting
          or Alchemy.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[820px] px-4 pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
            Sort
          </span>
          {SORTS.map((s) => (
            <Link
              key={s.key}
              href={s.key === "pve" ? "/guides/professions" : `/guides/professions?sort=${s.key}`}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                sort === s.key
                  ? "border-accent/50 bg-accent-faint text-accent"
                  : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Profession</th>
                <th className="px-3 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">PvP</th>
                <th className="px-3 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">PvE</th>
                <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Best for</th>
                <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Key benefit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.slug} className="border-b border-border bg-surface last:border-b-0 align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/guides/professions/${p.slug}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {p.name}
                    </Link>
                    <Link
                      href={`/guides/professions/${p.slug}#leveling`}
                      className="mt-0.5 block text-xs text-muted transition-colors hover:text-accent"
                    >
                      1–375 leveling →
                    </Link>
                  </td>
                  <td className="px-3 py-3"><TierCell tier={p.pvpValue} /></td>
                  <td className="px-3 py-3"><TierCell tier={p.pveValue} /></td>
                  <td className="px-4 py-3 text-xs text-muted-strong">
                    {p.bestFor.includes("all")
                      ? "All classes"
                      : p.bestFor.map((c) => getClass(c)?.name ?? c).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-muted">
                    {p.keyBenefit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
