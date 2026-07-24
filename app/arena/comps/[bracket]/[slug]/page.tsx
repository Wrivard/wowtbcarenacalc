import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMPS,
  COMPS_UPDATED,
  getComp,
  getCompBySlug,
  compSlug,
  compShortName,
  siblingComps,
  type ArenaComp,
} from "@/data/comps";
import { BRACKET_LABEL, facetPath } from "@/lib/comps-seo";
import { getSpec, getClass } from "@/lib/classes";
import { specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import {
  TierBadge,
  DifficultyPips,
  PlaystyleTag,
  CompIcons,
} from "@/components/arena/CompBits";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { abilitiesIn } from "@/lib/abilities";

export const dynamicParams = false;

const SEASON = 2;

export function generateStaticParams() {
  return COMPS.map((c) => ({ bracket: c.bracket, slug: compSlug(c) }));
}

type Params = Promise<{ bracket: string; slug: string }>;

/** Comp guide FAQ. Rendered on the page AND emitted as JSON-LD — FAQ schema
 *  for answers a visitor can't see is against Google's guidelines, and these
 *  answers were previously structured-data only. */
function compFaq(comp: ArenaComp, bracketLabel: string) {
  const faq = [
    {
      question: `Is ${comp.name} good in TBC ${bracketLabel} arena?`,
      answer: `${comp.name} is a ${comp.tier}-tier ${bracketLabel} comp in the current TBC Classic (Season ${SEASON}) meta. ${comp.blurb}`,
    },
    {
      question: `How do you win with ${comp.name}?`,
      answer: comp.guide.winCondition,
    },
    {
      question: `What is the ${comp.name} opener / cooldown timeline?`,
      answer: comp.guide.cooldownTimeline,
    },
    {
      question: `How hard is ${comp.name} to play?`,
      answer: `${DIFFICULTY_WORD[comp.difficulty]} — it plays as a ${comp.playstyle} comp. ${comp.guide.positioning}`,
    },
  ];
  if (comp.guide.requiredGear.length) {
    faq.push({
      question: `What gear does ${comp.name} need before queuing?`,
      answer: comp.guide.requiredGear.join(" "),
    });
  }
  const beaten = comp.keyCounters.map((id) => getComp(id)?.name).filter(Boolean);
  if (beaten.length) {
    faq.push({
      question: `What counters ${comp.name}?`,
      answer: `${comp.name}'s hardest matchups in ${bracketLabel} are ${beaten.join(" and ")}. ${comp.weaknesses[0] ?? ""}`,
    });
  }
  return faq;
}

const DIFFICULTY_WORD: Record<number, string> = {
  1: "Beginner-friendly",
  2: "Moderate — it rewards practice but forgives some mistakes",
  3: "Hard — it demands tight coordination and clean cooldown usage",
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket, slug } = await params;
  const comp = getCompBySlug(bracket, slug);
  if (!comp) return {};
  // Both bracket forms in the metadata: most players search the in-game term
  // ("5s"), some the "5v5" form. The URL/in-game form leads, the long form
  // follows so a search for either matches.
  const b = BRACKET_LABEL[comp.bracket];
  return buildMetadata({
    title: `${compShortName(comp)} ${comp.bracket} Comp Guide — TBC ${b} Arena (${comp.tier} Tier)`,
    description: `${comp.name} ${comp.bracket} (${b}) arena comp guide for TBC Classic Season ${SEASON}: win condition, opener and cooldown timeline, positioning, counters and required gear. ${comp.blurb}`,
    path: `/arena/comps/${comp.bracket}/${slug}`,
    ogType: "article",
    modifiedTime: COMPS_UPDATED,
  });
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10" aria-labelledby={id}>
      <h2 id={id} className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Flat list of internal links, the pattern used by SpecCrossLinks. */
function LinkRow({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="text-sm text-muted-strong transition-colors hover:text-foreground"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Linked comp names for the keyFavors / keyCounters id lists, which the
 *  guide previously carried in data but never rendered. */
function MatchupList({ ids, empty }: { ids: string[]; empty: string }) {
  const comps = ids.map(getComp).filter(Boolean) as ArenaComp[];
  if (!comps.length) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <ul className="space-y-1.5">
      {comps.map((c) => (
        <li key={c.id} className="flex items-center gap-2 text-sm">
          <CompIcons comp={c} size="small" />
          <Link
            href={`/arena/comps/${c.bracket}/${compSlug(c)}`}
            className="text-muted-strong underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >
            {c.name}
          </Link>
          <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
            {c.tier} tier
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function CompGuidePage({ params }: { params: Params }) {
  const { bracket, slug } = await params;
  const comp = getCompBySlug(bracket, slug);
  if (!comp) notFound();

  const b = BRACKET_LABEL[comp.bracket];
  const path = `/arena/comps/${comp.bracket}/${slug}`;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
    // The bracket tier list is a real level between the hub and a comp —
    // and it's the page built to rank for "best 5v5 comps".
    { name: b, href: facetPath(comp.bracket) },
    { name: comp.name, href: path },
  ];

  const overviewParas = comp.guide.overview.split("\n\n");
  const faq = compFaq(comp, b);
  const siblings = siblingComps(comp);
  // Signature abilities named across the game plan — rendered as spell icons
  // players recognise on sight, so the win condition reads at a glance.
  const abilities = abilitiesIn(
    [comp.guide.overview, comp.guide.winCondition, comp.guide.cooldownTimeline].join(" "),
  );

  // Distinct classes in the comp, for the class-facet links.
  const classSlugs = [...new Set(comp.members.map((m) => m.class))];
  const facetLinks = [
    { href: facetPath(comp.bracket), label: `All ${b} comps` },
    ...classSlugs.map((cs) => ({
      href: facetPath(comp.bracket, [cs]),
      label: `Best ${getClass(cs)?.name ?? cs} ${b} comps`,
    })),
    ...(classSlugs.length >= 2
      ? [
          {
            href: facetPath(undefined, classSlugs.slice(0, 2)),
            label: `${classSlugs
              .slice(0, 2)
              .map((cs) => getClass(cs)?.name ?? cs)
              .join(" & ")} comps in every bracket`,
          },
        ]
      : []),
    { href: "/arena-points-calculator", label: `${b} arena points calculator` },
  ];

  const updated = new Date(COMPS_UPDATED).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd(
            `${comp.name} — TBC ${b} Arena Comp Guide`,
            comp.blurb,
            path,
            { section: "Arena", techArticle: true, dateModified: COMPS_UPDATED },
          ),
          faqJsonLd(faq),
        ]}
      />
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-4 flex items-center gap-3">
          <CompIcons comp={comp} size="medium" />
          <TierBadge tier={comp.tier} />
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {comp.name} — TBC {comp.bracket} ({b}) Arena Comp Guide
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <PlaystyleTag playstyle={comp.playstyle} />
          <span className="flex items-center gap-1.5 text-xs text-muted">
            Difficulty <DifficultyPips difficulty={comp.difficulty} />
          </span>
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
            {comp.bracket} · Season {SEASON}
          </span>
          <span className="font-mono text-[11px] tracking-wider text-accent uppercase">
            Updated {updated}
          </span>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {comp.blurb}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        {/* Roster up front: who plays what, and the gear/talent door for each
            slot. Previously this only existed at the very bottom. */}
        <section className="mt-8" aria-labelledby="comp-roster">
          <h2 id="comp-roster" className="text-xl font-semibold tracking-tight text-foreground">
            {comp.name} team setup
          </h2>
          <div className="mt-3 grid gap-2">
            {comp.members.map((m, i) => {
              const found = getSpec(m.class, m.spec);
              if (!found) return null;
              const { cls, spec } = found;
              return (
                <div
                  key={`${m.class}-${m.spec}-${i}`}
                  className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border border-border bg-surface px-4 py-2.5"
                >
                  <GameIcon icon={specIconName(cls.slug, spec)} alt="" size="medium" />
                  <span className="min-w-0 flex-1">
                    <Link
                      href={`/${cls.slug}/${spec.slug}`}
                      className="text-sm font-medium underline-offset-2 hover:underline"
                      style={{ color: cls.color }}
                    >
                      {spec.name} {cls.name}
                    </Link>
                    <span className="ml-2 font-mono text-[10px] tracking-widest text-muted uppercase">
                      {spec.role}
                    </span>
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
                  <Link
                    href={`/guides/best-race/${cls.slug}`}
                    className="text-sm text-muted-strong underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Best race
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Overview */}
        <Section title={`${comp.name} overview`} id="overview">
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
          {abilities.length > 0 && (
            <div className="mt-4">
              <h3 className="font-mono text-[11px] tracking-wider text-muted uppercase">
                Key abilities in this game plan
              </h3>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {abilities.map((a) => (
                  <li
                    key={a.name}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-surface py-1 pr-2.5 pl-1"
                  >
                    <GameIcon icon={a.icon} alt="" size="small" className="size-5" />
                    <span className="text-xs font-medium text-muted-strong">{a.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
        <Section title={`${comp.name} opener & cooldown timeline`} id="cooldowns">
          <p className="text-sm leading-relaxed text-muted-strong">
            {comp.guide.cooldownTimeline}
          </p>
        </Section>

        {/* Positioning */}
        <Section title={`${comp.name} positioning`} id="positioning">
          <p className="text-sm leading-relaxed text-muted-strong">
            {comp.guide.positioning}
          </p>
        </Section>

        {/* Matchup summary — these two id lists lived in the data unused. */}
        <Section title={`What ${comp.name} beats and loses to`} id="matchups">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
              <h3 className="text-sm font-semibold text-emerald-300">
                Favoured into
              </h3>
              <div className="mt-2">
                <MatchupList
                  ids={comp.keyFavors}
                  empty={`No standout free matchups — ${comp.name} plays every game on its own terms.`}
                />
              </div>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-4">
              <h3 className="text-sm font-semibold text-rose-300">
                Hardest matchups
              </h3>
              <div className="mt-2">
                <MatchupList
                  ids={comp.keyCounters}
                  empty={`No hard counter in the current ${b} meta.`}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Vs the meta */}
        {comp.guide.counters.length > 0 && (
          <Section title={`How to play ${comp.name} against the meta`} id="vs-meta">
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
                          {target.name} guide →
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
        <Section title={`${comp.name} gear requirements`} id="gear">
          <ul className="space-y-2 text-sm leading-relaxed text-muted-strong">
            {comp.guide.requiredGear.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-accent">▸</span>
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-strong">
            Every slot for each member is listed on their PvP best-in-slot page
            above, with ladder usage percentages, gems and enchants. Use the{" "}
            <Link
              href="/arena-points-calculator"
              className="text-accent underline-offset-2 hover:underline"
            >
              arena points calculator
            </Link>{" "}
            to work out how many resets each piece costs at your team rating.
          </p>
        </Section>

        {/* Tips */}
        <Section title={`${comp.name} tips`} id="tips">
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

        {/* FAQ — visible, matching the faqJsonLd emitted above. */}
        <Section title={`${comp.name} FAQ`} id="faq">
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.question}>
                <h3 className="text-sm font-semibold text-foreground">
                  {f.question}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Other comps in the bracket */}
        {siblings.length > 0 && (
          <Section title={`Other ${b} comps`} id="more-comps">
            <ul className="space-y-1.5">
              {siblings.map((c) => (
                <li key={c.id} className="flex items-center gap-2 text-sm">
                  <CompIcons comp={c} size="small" />
                  <Link
                    href={`/arena/comps/${c.bracket}/${compSlug(c)}`}
                    className="text-muted-strong underline-offset-2 transition-colors hover:text-foreground hover:underline"
                  >
                    {c.name}
                  </Link>
                  <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                    {c.tier} tier · {c.playstyle}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <nav aria-label="Related" className="mt-12 border-t border-border pt-8">
          <h2 className="text-[11px] font-medium tracking-widest text-muted uppercase">
            Related
          </h2>
          <div className="mt-3">
            <LinkRow links={facetLinks} />
          </div>
        </nav>
      </main>
    </>
  );
}
