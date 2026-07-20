import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFESSIONS, getProfession, getProfessionLeveling, type ProfTier, type ProfCost } from "@/data/professions";
import { getClass } from "@/lib/classes";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROFESSIONS.map((p) => ({ profession: p.slug }));
}

type Params = Promise<{ profession: string }>;

const TIER_COLOR: Record<ProfTier, string> = {
  S: "text-amber-300",
  A: "text-emerald-300",
  B: "text-sky-300",
  C: "text-zinc-400",
};
const COST_LABEL: Record<ProfCost, string> = {
  cheap: "Cheap to level",
  moderate: "Moderate cost",
  expensive: "Expensive to level",
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { profession } = await params;
  const p = getProfession(profession);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name} Guide TBC Classic — 1–375 Leveling, Benefits & Best Classes`,
    description: `${p.name} in TBC Classic: a 1–375 leveling route with materials, what it provides for PvP and PvE, which classes benefit most, and cost.`,
    path: `/guides/professions/${p.slug}`,
  });
}

export default async function ProfessionPage({ params }: { params: Params }) {
  const { profession } = await params;
  const p = getProfession(profession);
  if (!p) notFound();
  const leveling = getProfessionLeveling(p.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Professions", href: "/guides/professions" },
    { name: p.name, href: `/guides/professions/${p.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.guides}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {p.name} — TBC Classic
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="text-muted">
            PvP <span className={cn("font-mono font-bold", TIER_COLOR[p.pvpValue])}>{p.pvpValue}</span>
          </span>
          <span className="text-muted">
            PvE <span className={cn("font-mono font-bold", TIER_COLOR[p.pveValue])}>{p.pveValue}</span>
          </span>
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
            {COST_LABEL[p.cost]}
          </span>
          {p.gathering && (
            <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-strong uppercase">
              Gathering
            </span>
          )}
        </div>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {p.keyBenefit}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        <section aria-label="What it provides">
          <h2 className="text-xl font-semibold tracking-tight">What it provides</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-strong">
            {p.provides.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8" aria-label="Which classes benefit">
          <h2 className="text-xl font-semibold tracking-tight">Which classes benefit most</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            {p.bestFor.includes("all") ? (
              <>Universally useful — {p.name} is a strong pick on any class.</>
            ) : (
              <>
                Best on{" "}
                {p.bestFor.map((c, i) => {
                  const cls = getClass(c);
                  return (
                    <span key={c}>
                      {i > 0 && ", "}
                      {cls ? (
                        <Link href={`/${cls.slug}`} className="text-accent underline-offset-2 hover:underline">
                          {cls.name}
                        </Link>
                      ) : (
                        c
                      )}
                    </span>
                  );
                })}
                .
              </>
            )}
          </p>
        </section>

        <section className="mt-8" aria-label="Leveling 1 to 375">
          <h2 className="text-xl font-semibold tracking-tight">
            Leveling {p.name} 1–375
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            {p.levelingSummary}
          </p>
          {leveling.length > 0 && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Skill</th>
                    <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                      {p.gathering ? "Gather" : "Craft"}
                    </th>
                    <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                      {p.gathering ? "Where" : "Materials"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leveling.map((step) => (
                    <tr key={step.range} className="border-b border-border bg-surface last:border-b-0 align-top">
                      <td className="px-4 py-3 font-mono whitespace-nowrap tabular-nums text-accent">{step.range}</td>
                      <td className="px-4 py-3 text-foreground">
                        {step.craft}
                        {step.note && (
                          <span className="mt-1 block text-xs leading-relaxed text-muted">{step.note}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs leading-relaxed text-muted-strong">{step.materials}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-2 text-xs text-muted">
            A landmark route, not exact craft counts — mat totals vary with
            skill-up luck. Pair with a live leveling guide for precise numbers.
          </p>
        </section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">Compare professions</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            See how {p.name} stacks up on the{" "}
            <Link href="/guides/professions" className="text-accent underline-offset-2 hover:underline">
              profession tier list
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
