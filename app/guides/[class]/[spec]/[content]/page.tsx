import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpec } from "@/lib/classes";
import { SPEC_GUIDES, getSpecGuide } from "@/data/specGuides";
import { getProfession, topProfessions } from "@/data/professions";
import { getBestRace } from "@/data/bestRace";
import { macrosForClass } from "@/data/macros";
import { addonsForClass } from "@/data/addons";
import { compsForClass } from "@/lib/interlinks";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { StatCaps } from "@/components/bis/StatCaps";
import { RecommendedTalentBuild } from "@/components/talents/RecommendedTalentBuild";
import { MacroList } from "@/components/guides/MacroList";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { classBackground } from "@/lib/backgrounds";

export const dynamicParams = false;

export function generateStaticParams() {
  return SPEC_GUIDES.map((g) => ({
    class: g.class,
    spec: g.spec,
    content: g.content,
  }));
}

type Params = Promise<{ class: string; spec: string; content: string }>;

function parse(content: string): "pvp" | "pve" | null {
  return content === "pvp" || content === "pve" ? content : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: c, spec: s, content: ct } = await params;
  const content = parse(ct);
  const found = getSpec(c, s);
  const guide = content ? getSpecGuide(c, s, content) : undefined;
  if (!found || !content || !guide) return {};
  const { cls, spec } = found;
  const label = content === "pvp" ? "PvP" : "PvE";
  return buildMetadata({
    title: `${spec.name} ${cls.name} ${label} Guide — TBC Classic ${content === "pvp" ? "Arena" : "Raid"}`,
    description: `${spec.name} ${cls.name} ${label} guide for TBC Classic: rotation, stat priority, BiS, talents, macros, addons, best race and professions. ${guide.overview.slice(0, 80)}`,
    path: `/guides/${cls.slug}/${spec.slug}/${content}`,
    ogImage: `/${cls.slug}/opengraph-image`,
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

export default async function SpecGuidePage({ params }: { params: Params }) {
  const { class: c, spec: s, content: ct } = await params;
  const content = parse(ct);
  const found = getSpec(c, s);
  const guide = content ? getSpecGuide(c, s, content) : undefined;
  if (!found || !content || !guide) notFound();
  const { cls, spec } = found;

  const label = content === "pvp" ? "PvP" : "PvE";
  const bisHref = content === "pvp" ? `/${cls.slug}/${spec.slug}/pvp` : `/${cls.slug}/${spec.slug}/pve/phase-1`;

  const professions = (guide.bestProfessions
    ? guide.bestProfessions.map(getProfession).filter(Boolean)
    : topProfessions(cls.slug, content, 4)) as NonNullable<ReturnType<typeof getProfession>>[];

  const raceRecs = getBestRace(cls.slug)?.recommendations.filter((r) => r.content === content) ?? [];
  const addons = addonsForClass(cls.slug).filter(
    (a) => !a.content || a.content === content || a.content === "both",
  );
  const macros = macrosForClass(cls.slug);
  const comps = content === "pvp" ? compsForClass(cls.slug) : [];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: cls.name, href: `/guides/${cls.slug}` },
    { name: `${spec.name} ${label}`, href: `/guides/${cls.slug}/${spec.slug}/${content}` },
  ];

  const overviewParas = guide.overview.split("\n\n");

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(guide.faq)]} />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <div
          className={`mt-3 font-mono text-[11px] tracking-widest uppercase ${content === "pvp" ? "text-accent" : "text-muted-strong"}`}
        >
          {content === "pvp" ? "PvP · Arena" : "PvE · Raid"} · {spec.role}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {spec.name} {cls.name} {label} Guide
        </h1>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {overviewParas[0]}
        </p>
        {/* Quick PvP/PvE switch when the counterpart guide exists */}
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={bisHref} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-accent-dim">
            {spec.name} {label} BiS →
          </Link>
          <Link href={`/${cls.slug}/${spec.slug}/talents`} className="rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-surface-hover">
            Talent build
          </Link>
        </div>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        {/* Overview cont. + strengths/weaknesses */}
        <Section title="Overview">
          <div className="space-y-3 text-sm leading-relaxed text-muted-strong">
            {overviewParas.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
              <h3 className="text-sm font-semibold text-emerald-300">Strengths</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-strong">
                {guide.strengths.map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-emerald-400">+</span>{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.05] p-4">
              <h3 className="text-sm font-semibold text-rose-300">Weaknesses</h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-strong">
                {guide.weaknesses.map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-rose-400">−</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Stat priority & caps */}
        <Section title={`Stat priority & caps (${content === "pvp" ? "arena" : "raid"})`}>
          <StatCaps classSlug={cls.slug} role={spec.role} content={content} specName={`${spec.name} ${cls.name}`} />
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            Full gear with usage %, gems and enchants is on the{" "}
            <Link href={bisHref} className="text-accent underline-offset-2 hover:underline">
              {spec.name} {cls.name} {label} BiS list
            </Link>
            .
          </p>
        </Section>

        {/* Talent build — the real filled trees, widened on desktop so all
            three trees fit without scrolling (breaks out of the 720 column). */}
        <RecommendedTalentBuild
          classSlug={cls.slug}
          specSlug={spec.slug}
          specName={`${spec.name} ${cls.name}`}
          className="mt-10 lg:-mx-[140px]"
        />

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} className="mt-10" />

        {/* Rotation & playstyle */}
        <Section title={guide.rotationTitle}>
          <ol className="space-y-2.5">
            {guide.rotation.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-faint font-mono text-xs font-semibold text-accent">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-muted-strong">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted-strong">{guide.playstyle}</p>
        </Section>

        {/* Macros */}
        <Section title={`${cls.name} macros`}>
          {macros.length > 0 ? (
            <MacroList macros={macros} />
          ) : (
            <p className="text-sm text-muted">Class macros coming soon.</p>
          )}
        </Section>

        {/* Addons */}
        <Section title={`${label} addons`}>
          <div className="space-y-2">
            {addons.map((a) => (
              <div key={a.name} className="flex flex-wrap items-center gap-x-3 rounded-lg border border-border bg-surface px-4 py-2.5">
                <span className="text-sm font-medium text-foreground">{a.name}</span>
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent underline-offset-2 hover:underline">
                  CurseForge →
                </a>
                <span className="w-full text-xs leading-relaxed text-muted">{a.description}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Full list on the{" "}
            <Link href={`/guides/addons/${cls.slug}`} className="text-accent underline-offset-2 hover:underline">{cls.name} addons page</Link>.
          </p>
        </Section>

        {/* Best race */}
        {raceRecs.length > 0 && (
          <Section title={`Best race (${label})`}>
            <div className="grid gap-3 sm:grid-cols-2">
              {raceRecs.map((r) => (
                <div key={r.faction} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{r.race}</span>
                    <span className={`font-mono text-[10px] tracking-wider uppercase ${r.faction === "horde" ? "text-rose-400" : "text-sky-400"}`}>{r.faction}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-strong">{r.why}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              More on the{" "}
              <Link href={`/guides/best-race/${cls.slug}`} className="text-accent underline-offset-2 hover:underline">best race for {cls.name}</Link> page.
            </p>
          </Section>
        )}

        {/* Best professions */}
        {professions.length > 0 && (
          <Section title={`Best professions (${label})`}>
            <div className="grid gap-2 sm:grid-cols-2">
              {professions.map((p) => (
                <Link key={p.slug} href={`/guides/professions/${p.slug}`} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2.5 transition-colors hover:border-border-strong">
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted">{p.keyBenefit.slice(0, 42)}…</span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        {/* Common mistakes */}
        <Section title="Common mistakes">
          <ul className="space-y-2 text-sm leading-relaxed text-muted-strong">
            {guide.commonMistakes.map((m) => (
              <li key={m} className="flex gap-2"><span className="text-rose-400">✕</span>{m}</li>
            ))}
          </ul>
        </Section>

        {/* Comps (PvP only) */}
        {comps.length > 0 && (
          <Section title="Best arena comps">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {comps.map((cp) => (
                <li key={cp.href}>
                  <Link href={cp.href} className="text-sm text-accent underline-offset-2 hover:underline">{cp.label}</Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* FAQ */}
        <Section title="FAQ">
          <div className="space-y-5">
            {guide.faq.map((f) => (
              <div key={f.question}>
                <h3 className="text-sm font-semibold text-foreground">{f.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">{f.answer}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
