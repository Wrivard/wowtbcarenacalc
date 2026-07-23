import type { Metadata } from "next";
import Link from "next/link";
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
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
} from "@/components/seo/JsonLd";
import { BisPageBody } from "@/components/bis/BisPageBody";
import { ComingSoon } from "@/components/ComingSoon";
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
  return buildMetadata({
    title: `${spec.name} ${cls.name} PvP BiS Season ${season} — TBC ${SEASON_NAMES[season]}`,
    description: `${spec.name} ${cls.name} Season ${season} (${SEASON_NAMES[season]}) arena PvP best in slot for TBC Classic — full gear set, rating requirements, gems, enchants and stat priority.`,
    path: `/${cls.slug}/${spec.slug}/pvp/season-${season}`,
    ogImage: `/${cls.slug}/opengraph-image`,
    noindex: !list,
  });
}

export default async function PvpSeasonBisPage({ params }: { params: Params }) {
  const { class: classSlug, spec: specSlug, season: rawSeason } = await params;
  const found = getSpec(classSlug, specSlug);
  const season = parseSeason(rawSeason);
  if (!found?.spec.pvp || season === null) notFound();
  const { cls, spec } = found;
  const list = getPvpSeasonBis(cls.slug, spec.slug, season);

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
          ...(list
            ? [
                articleJsonLd(
                  `${spec.name} ${cls.name} PvP BiS — TBC Season ${season} (${SEASON_NAMES[season]})`,
                  list.blurb,
                  `/${cls.slug}/${spec.slug}/pvp/season-${season}`,
                  {
                    section: "PvP",
                    techArticle: true,
                    dateModified: list.updatedAt,
                    image: `/${cls.slug}/opengraph-image`,
                  },
                ),
                faqJsonLd(list.faq),
                itemListJsonLd(
                  `${spec.name} ${cls.name} Season ${season} PvP best in slot (TBC Classic)`,
                  list.slots.map((s) => ({
                    name: `${s.slot}: ${getItem(s.bis.itemId)?.name ?? s.bis.name ?? `item ${s.bis.itemId}`}`,
                    url: wowheadItemUrl(s.bis.itemId),
                  })),
                ),
              ]
            : []),
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
          {list && (
            <span className="text-accent">
              Updated{" "}
              {new Date(list.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        {list && (
          <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
            {list.blurb}
          </p>
        )}
        <SeasonSwitcher
          classSlug={cls.slug}
          specSlug={spec.slug}
          current={season}
        />
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        {list && (
          // Replaces the blurb's old dead-end sentence ("see the current-season
          // list") with a real link carrying descriptive anchor text.
          <p className="mt-8 rounded-xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted-strong">
            This Season {season} set is mapped from the live Season {LIVE_SEASON}{" "}
            ladder. For live usage percentages and the full stat reasoning, see
            the{" "}
            <Link
              href={`/${cls.slug}/${spec.slug}/pvp`}
              className="text-accent underline-offset-2 hover:underline"
            >
              {spec.name} {cls.name} arena BiS
            </Link>
            .
          </p>
        )}
        {list ? (
          <BisPageBody list={list} cls={cls} spec={spec} />
        ) : (
          <ComingSoon
            title={`${spec.name} ${cls.name} Season ${season} BiS`}
            heading={`Season ${season} — coming when the season opens`}
            description={`TBC Anniversary is currently in Season 2. The ${SEASON_NAMES[season]} (Season ${season}) arena set and BiS list will be published the moment Season ${season} goes live. Until then:`}
            fallbackHref={`/${cls.slug}/${spec.slug}/pvp`}
            fallbackLabel={`See the live ${spec.name} ${cls.name} arena BiS`}
          />
        )}
        <SpecCrossLinks cls={cls} spec={spec} current="pvp" />
      </main>
    </>
  );
}
