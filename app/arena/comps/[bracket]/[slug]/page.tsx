import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMPS,
  getComp,
  getCompBySlug,
  compSlug,
  type ArenaComp,
} from "@/data/comps";
import { getSpec } from "@/lib/classes";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import {
  TierBadge,
  DifficultyPips,
  PlaystyleTag,
  CompIcons,
} from "@/components/arena/CompBits";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const dynamicParams = false;

const SEASON = 2;

export function generateStaticParams() {
  return COMPS.map((c) => ({ bracket: c.bracket, slug: compSlug(c) }));
}

type Params = Promise<{ bracket: string; slug: string }>;

function compFaq(comp: ArenaComp) {
  const faq = [
    {
      question: `Is ${comp.name} good in TBC ${comp.bracket} arena?`,
      answer: `${comp.name} is a ${comp.tier}-tier ${comp.bracket} comp in the current TBC Classic (Season ${SEASON}) meta. ${comp.blurb}`,
    },
    {
      question: `How do you win with ${comp.name}?`,
      answer: comp.guide.winCondition,
    },
    {
      question: `What is the ${comp.name} opener / cooldown timeline?`,
      answer: comp.guide.cooldownTimeline,
    },
  ];
  if (comp.guide.requiredGear.length) {
    faq.push({
      question: `What gear does ${comp.name} need before queuing?`,
      answer: comp.guide.requiredGear.join(" "),
    });
  }
  return faq;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket, slug } = await params;
  const comp = getCompBySlug(bracket, slug);
  if (!comp) return {};
  return buildMetadata({
    title: `${comp.name} TBC Arena Guide — Best ${comp.bracket} Comp Season ${SEASON}`,
    description: `${comp.name} ${comp.bracket} arena guide for TBC Classic (${comp.tier} tier): win condition, cooldown timeline, positioning, counters and gear. ${comp.blurb.slice(0, 80)}`,
    path: `/arena/comps/${comp.bracket}/${slug}`,
  });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function CompGuidePage({ params }: { params: Params }) {
  const { bracket, slug } = await params;
  const comp = getCompBySlug(bracket, slug);
  if (!comp) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
    { name: comp.name, href: `/arena/comps/${comp.bracket}/${slug}` },
  ];

  const overviewParas = comp.guide.overview.split("\n\n");

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(compFaq(comp))]} />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-4 flex items-center gap-3">
          <CompIcons comp={comp} size="medium" />
          <TierBadge tier={comp.tier} />
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {comp.name} — TBC Arena {comp.bracket} Guide
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <PlaystyleTag playstyle={comp.playstyle} />
          <span className="flex items-center gap-1.5 text-xs text-muted">
            Difficulty <DifficultyPips difficulty={comp.difficulty} />
          </span>
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
            Season {SEASON}
          </span>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {comp.blurb}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        {/* Overview */}
        <Section title="Overview">
          <div className="space-y-3 text-sm leading-relaxed text-muted-strong">
            {overviewParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-accent/30 bg-accent-faint/40 p-4">
            <h3 className="font-mono text-[11px] tracking-wider text-accent uppercase">
              Win condition
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {comp.guide.winCondition}
            </p>
          </div>
        </Section>

        {/* Strengths / weaknesses */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
            <h2 className="text-sm font-semibold text-emerald-300">Strengths</h2>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-strong">
              {comp.strengths.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-emerald-400">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-4">
            <h2 className="text-sm font-semibold text-rose-300">Weaknesses</h2>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-strong">
              {comp.weaknesses.map((w) => (
                <li key={w} className="flex gap-2">
                  <span className="text-rose-400">−</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} className="mt-10" />

        {/* Cooldown timeline */}
        <Section title="Cooldown timeline">
          <p className="text-sm leading-relaxed text-muted-strong">
            {comp.guide.cooldownTimeline}
          </p>
        </Section>

        {/* Positioning */}
        <Section title="Positioning">
          <p className="text-sm leading-relaxed text-muted-strong">
            {comp.guide.positioning}
          </p>
        </Section>

        {/* Vs the meta */}
        {comp.guide.counters.length > 0 && (
          <Section title="Vs. the meta">
            <div className="overflow-hidden rounded-xl border border-border">
              {comp.guide.counters.map((c) => {
                const target = getComp(c.compId);
                return (
                  <div
                    key={c.compId}
                    className="border-b border-border bg-surface p-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-foreground">
                        vs {target?.name ?? c.compId}
                      </span>
                      {target && (
                        <Link
                          href={`/arena/comps/${target.bracket}/${compSlug(target)}`}
                          className="font-mono text-[10px] tracking-wider text-accent uppercase hover:underline"
                        >
                          Guide →
                        </Link>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                      {c.howToPlay}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Gear requirements */}
        <Section title="Gear requirements">
          <ul className="space-y-2 text-sm leading-relaxed text-muted-strong">
            {comp.guide.requiredGear.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-accent">▸</span>
                {g}
              </li>
            ))}
          </ul>
        </Section>

        {/* Tips */}
        <Section title="Tips">
          <ul className="space-y-2 text-sm leading-relaxed text-muted-strong">
            {comp.guide.tips.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-accent">•</span>
                {t}
              </li>
            ))}
          </ul>
        </Section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        {/* Related BiS + talents per member */}
        <Section title="Gear & talents for this comp">
          <div className="space-y-2">
            {comp.members.map((m, i) => {
              const found = getSpec(m.class, m.spec);
              if (!found) return null;
              const { cls, spec } = found;
              return (
                <div
                  key={`${m.class}-${m.spec}-${i}`}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-border bg-surface px-4 py-2.5"
                >
                  <span className="w-40 shrink-0 text-sm font-medium text-foreground">
                    {spec.name} {cls.name}
                  </span>
                  <Link
                    href={`/${cls.slug}/${spec.slug}/pvp`}
                    className="text-sm text-accent underline-offset-2 hover:underline"
                  >
                    PvP BiS
                  </Link>
                  <Link
                    href={`/${cls.slug}/${spec.slug}/talents`}
                    className="text-sm text-muted-strong underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Talents
                  </Link>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Arena points tie-in */}
        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Plan your arena points
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Gearing this comp? Use the{" "}
            <Link
              href="/arena-points-calculator"
              className="text-accent underline-offset-2 hover:underline"
            >
              arena points calculator
            </Link>{" "}
            to see your weekly points from your team rating and how long each
            piece takes to earn.
          </p>
        </section>
      </main>
    </>
  );
}
