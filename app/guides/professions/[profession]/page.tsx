import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PROFESSIONS,
  getProfession,
  getProfessionLeveling,
  professionPartners,
  professionIcon,
  type ProfTier,
  type ProfCost,
} from "@/data/professions";
import { getClass } from "@/lib/classes";
import { GameIcon } from "@/components/GameIcon";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd, howToJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { ItemLink } from "@/components/ItemLink";
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
    title: `${p.name} Guide TBC Classic — 1–375 Leveling & Benefits`,
    description: `${p.name} in TBC Classic: a 1–375 leveling route with materials, what it provides for PvP and PvE, which classes benefit most, and cost.`,
    path: `/guides/professions/${p.slug}`,
  });
}

export default async function ProfessionPage({ params }: { params: Params }) {
  const { profession } = await params;
  const p = getProfession(profession);
  if (!p) notFound();
  const leveling = getProfessionLeveling(p.slug);
  const partners = professionPartners(p.slug);
  const others = PROFESSIONS.filter((x) => x.slug !== p.slug);

  // Aggregate every tier's material list into one 1–375 shopping list,
  // preserving first-seen order (ores before gems before cloth, etc.).
  const matTotals: { itemId: number; qty: number }[] = [];
  const matIndex = new Map<number, number>();
  for (const step of leveling) {
    for (const m of step.mats ?? []) {
      const at = matIndex.get(m.itemId);
      if (at === undefined) {
        matIndex.set(m.itemId, matTotals.length);
        matTotals.push({ itemId: m.itemId, qty: m.qty });
      } else {
        matTotals[at].qty += m.qty;
      }
    }
  }

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Professions", href: "/guides/professions" },
    { name: p.name, href: `/guides/professions/${p.slug}` },
  ];

  const howToSteps = leveling.map((step) => ({
    name: `Skill ${step.range}`,
    text: step.note ? `${step.craft} — ${step.note}` : step.craft,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          ...(howToSteps.length > 0
            ? [
                howToJsonLd(
                  `Level ${p.name} 1–375 in TBC Classic`,
                  p.levelingSummary,
                  howToSteps,
                ),
              ]
            : []),
        ]}
      />
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

        {partners.length > 0 && (
          <section className="mt-8" aria-label="Partner profession">
            <h2 className="text-xl font-semibold tracking-tight">
              Level {p.name} alongside
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              {p.gathering
                ? `${p.name} feeds the crafting professions below — level one of them together to turn what you gather straight into gear and gold.`
                : `Pair ${p.name} with its gathering profession so your materials come free while you level, instead of buying every stack off the auction house.`}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {partners.map((partner) => (
                <Link
                  key={partner.slug}
                  href={`/guides/professions/${partner.slug}#leveling`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong hover:bg-surface-hover"
                >
                  <GameIcon icon={professionIcon(partner.slug)} alt="" size="medium" className="rounded" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {partner.name}
                    </span>
                    <span className="block text-xs text-muted">
                      1–375 leveling guide
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section id="leveling" className="mt-8 scroll-mt-24" aria-label="Leveling 1 to 375">
          <h2 className="text-xl font-semibold tracking-tight">
            How to level {p.name} 1–375 in TBC Classic
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            {p.levelingSummary}
          </p>

          {matTotals.length > 0 && (
            <div className="mt-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-foreground">
                Total materials (approx.)
              </h3>
              <p className="mt-1 text-xs text-muted-strong">
                The full shopping list to go 1–375 — farm or buy these before
                you start. Totals are a landmark; skill-up luck shifts them.
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-x-5 gap-y-1.5 sm:grid-cols-2">
                {matTotals.map((m) => (
                  <li key={m.itemId} className="flex items-center gap-1.5">
                    <span className="font-mono tabular-nums text-muted">{m.qty}×</span>
                    <ItemLink itemId={m.itemId} iconSize={20} />
                  </li>
                ))}
              </ul>
            </div>
          )}

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
                      <td className="px-4 py-3 text-xs leading-relaxed text-muted-strong">
                        {step.mats && step.mats.length > 0 ? (
                          <ul className="space-y-1.5">
                            {step.mats.map((m) => (
                              <li key={m.itemId} className="flex items-center gap-1.5">
                                <span className="font-mono tabular-nums text-muted">{m.qty}×</span>
                                <ItemLink itemId={m.itemId} iconSize={20} />
                              </li>
                            ))}
                          </ul>
                        ) : (
                          step.materials
                        )}
                      </td>
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

        {/* Every other 1–375 guide, deep-linked to its leveling table. These
            pages were near dead ends — one inbound link each — so this block
            turns the twelve profession guides into a linked cluster. */}
        <nav aria-label="Other profession leveling guides" className="mt-10 border-t border-border pt-8">
          <h2 className="text-[11px] font-medium tracking-widest text-muted uppercase">
            Level another profession (1–375)
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/guides/professions/${o.slug}#leveling`}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:border-border-strong hover:bg-surface-hover"
              >
                <GameIcon icon={professionIcon(o.slug)} alt="" size="small" className="rounded" />
                <span className="truncate text-sm text-muted-strong">{o.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </main>
    </>
  );
}
