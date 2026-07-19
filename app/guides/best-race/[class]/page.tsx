import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { getBestRace, type RaceRec } from "@/data/bestRace";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { classBackground } from "@/lib/backgrounds";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.filter((c) => getBestRace(c.slug)).map((c) => ({ class: c.slug }));
}

type Params = Promise<{ class: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls || !getBestRace(classSlug)) return {};
  return buildMetadata({
    title: `Best Race for ${cls.name} in TBC Classic — PvP & PvE`,
    description: `The best race for a ${cls.name} in TBC Classic, by faction and content: which racials matter most for ${cls.name} arena PvP and raid PvE, with alternatives.`,
    path: `/guides/best-race/${cls.slug}`,
    ogImage: `/${cls.slug}/opengraph-image`,
  });
}

function RaceCard({ rec, title }: { rec: RaceRec | undefined; title: string }) {
  if (!rec) return null;
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
          {title}
        </span>
        <span
          className={
            rec.faction === "horde"
              ? "font-mono text-[10px] tracking-wider text-rose-400 uppercase"
              : "font-mono text-[10px] tracking-wider text-sky-400 uppercase"
          }
        >
          {rec.faction}
        </span>
      </div>
      <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">
        {rec.race}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">{rec.why}</p>
      {rec.alternatives.length > 0 && (
        <ul className="mt-3 space-y-1 border-t border-border pt-3 text-xs leading-relaxed text-muted">
          {rec.alternatives.map((a) => (
            <li key={a.race}>
              <span className="font-medium text-muted-strong">{a.race}:</span>{" "}
              {a.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function BestRacePage({ params }: { params: Params }) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  const data = getBestRace(classSlug);
  if (!cls || !data) notFound();

  const pick = (faction: "horde" | "alliance", content: "pvp" | "pve") =>
    data.recommendations.find((r) => r.faction === faction && r.content === content);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Best Race", href: "/guides" },
    { name: cls.name, href: `/guides/best-race/${cls.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Best Race for {cls.name} — TBC Classic
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The strongest race for a {cls.name} depends on faction and whether
          you focus arena PvP or raid PvE. Here are the picks that matter, with
          alternatives.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        <section aria-label="PvP races">
          <h2 className="text-lg font-semibold tracking-tight">
            {cls.name} PvP (arena)
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <RaceCard rec={pick("horde", "pvp")} title="PvP · Horde" />
            <RaceCard rec={pick("alliance", "pvp")} title="PvP · Alliance" />
          </div>
        </section>

        <section className="mt-8" aria-label="PvE races">
          <h2 className="text-lg font-semibold tracking-tight">
            {cls.name} PvE (raid)
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <RaceCard rec={pick("horde", "pve")} title="PvE · Horde" />
            <RaceCard rec={pick("alliance", "pve")} title="PvE · Alliance" />
          </div>
        </section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">
            {cls.name} gear & talents
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Picked your race? Line up the rest:{" "}
            <Link href={`/${cls.slug}`} className="text-accent underline-offset-2 hover:underline">
              {cls.name} BiS &amp; talents
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
