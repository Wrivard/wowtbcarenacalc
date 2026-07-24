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
import { GameIcon } from "@/components/GameIcon";
import { classBackground } from "@/lib/backgrounds";
import { specIconName } from "@/lib/icons";

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

        {/* Race is the first decision a player makes, so this page is often
            the entry point to the whole class — but it used to end with a
            single link to the class hub. Search Console had it at 106
            impressions and zero clicks: a dead end at position 20. The spec
            grid below is the payoff the query is actually reaching for. */}
        <section className="mt-10" aria-labelledby="next-steps">
          <h2 id="next-steps" className="text-xl font-semibold tracking-tight">
            Next: gear and spec your {cls.name}
          </h2>
          <p className="mt-1.5 text-sm text-muted-strong">
            Race is locked in at character creation — everything below you can
            change any time.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {cls.specs.map((spec) => (
              <li key={spec.slug}>
                <Link
                  href={`/${cls.slug}/${spec.slug}`}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong"
                >
                  <GameIcon
                    icon={specIconName(cls.slug, spec)}
                    alt={`${spec.name} ${cls.name}`}
                    size="small"
                    className="size-7 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {spec.name} {cls.name}
                    </span>
                    <span className="block text-xs text-muted">
                      BiS, talents &amp; guide
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href={`/guides/addons/${cls.slug}`} className="text-sm text-muted-strong transition-colors hover:text-foreground">
                {cls.name} addons &amp; macros
              </Link>
            </li>
            <li>
              <Link href={`/talent-calculator/${cls.slug}`} className="text-sm text-muted-strong transition-colors hover:text-foreground">
                {cls.name} talent calculator
              </Link>
            </li>
            <li>
              <Link href="/guides/professions" className="text-sm text-muted-strong transition-colors hover:text-foreground">
                Profession guides
              </Link>
            </li>
            <li>
              <Link href="/class-rankings" className="text-sm text-muted-strong transition-colors hover:text-foreground">
                TBC class tier list
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
