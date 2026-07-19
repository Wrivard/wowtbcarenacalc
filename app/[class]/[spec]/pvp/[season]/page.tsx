import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSpecs, getSpec } from "@/lib/classes";
import {
  LIVE_SEASON,
  PVP_SEASONS,
  SEASON_NAMES,
  getPvpSeasonBis,
  wowheadItemUrl,
  type PvpSeason,
} from "@/lib/bis";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
} from "@/components/seo/JsonLd";
import { BisPageBody } from "@/components/bis/BisPageBody";
import { SpecCrossLinks } from "@/components/SpecCrossLinks";
import { SeasonSwitcher } from "@/components/bis/SeasonSwitcher";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { getItem } from "@/lib/items";

export const dynamicParams = false;

// Only the derived seasons get a /pvp/season-N route; the live season
// (2) lives at /pvp, so it is excluded here.
const DERIVED_SEASONS = PVP_SEASONS.filter((s) => s !== LIVE_SEASON);

export function generateStaticParams() {
  return allSpecs()
    .filter(({ spec }) => spec.pvp)
    .flatMap(({ cls, spec }) =>
      DERIVED_SEASONS.map((s) => ({
        class: cls.slug,
        spec: spec.slug,
        season: `season-${s}`,
      })),
    );
}

type Params = Promise<{ class: string; spec: string; season: string }>;

function parseSeason(raw: string): PvpSeason | null {
  const m = /^season-([134])$/.exec(raw);
  return m ? (Number(m[1]) as PvpSeason) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { class: classSlug, spec: specSlug, season: rawSeason } = await params;
  const found = getSpec(classSlug, specSlug);
  const season = parseSeason(rawSeason);
  if (!found?.spec.pvp || season === null) return {};
  const { cls, spec } = found;
  const list = getPvpSeasonBis(cls.slug, spec.slug, season);
  return {
    title: `${spec.name} ${cls.name} PvP BiS Season ${season} — TBC ${SEASON_NAMES[season]} Arena Gear`,
    description: `${spec.name} ${cls.name} Season ${season} (${SEASON_NAMES[season]}) arena PvP best in slot for TBC Classic — full gear set, gems, enchants and stat priority.`,
    alternates: { canonical: `/${cls.slug}/${spec.slug}/pvp/season-${season}` },
    ...(list ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function PvpSeasonBisPage({ params }: { params: Params }) {
  const { class: classSlug, spec: specSlug, season: rawSeason } = await params;
  const found = getSpec(classSlug, specSlug);
  const season = parseSeason(rawSeason);
  if (!found?.spec.pvp || season === null) notFound();
  const { cls, spec } = found;
  const list = getPvpSeasonBis(cls.slug, spec.slug, season);
  if (!list) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: cls.name, href: `/${cls.slug}` },
    { name: `${spec.name} PvP BiS`, href: `/${cls.slug}/${spec.slug}/pvp` },
    {
      name: `Season ${season}`,
      href: `/${cls.slug}/${spec.slug}/pvp/season-${season}`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          faqJsonLd(list.faq),
          itemListJsonLd(
            `${spec.name} ${cls.name} Season ${season} PvP best in slot (TBC Classic)`,
            list.slots.map((s) => ({
              name: `${s.slot}: ${getItem(s.bis.itemId)?.name ?? s.bis.name ?? `item ${s.bis.itemId}`}`,
              url: wowheadItemUrl(s.bis.itemId),
            })),
          ),
        ]}
      />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {spec.name} {cls.name} PvP BiS — Season {season}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-wider text-muted uppercase">
          <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] text-accent">
            PvP · Arena
          </span>
          <span>{SEASON_NAMES[season]}</span>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {list.blurb}
        </p>
        <SeasonSwitcher
          classSlug={cls.slug}
          specSlug={spec.slug}
          current={season}
        />
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        <BisPageBody list={list} cls={cls} spec={spec} />
        <SpecCrossLinks cls={cls} spec={spec} current="pvp" />
      </main>
    </>
  );
}
