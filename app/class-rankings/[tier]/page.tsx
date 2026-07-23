import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  NON_DEFAULT_TIERS,
  getRankingTierBySlug,
  type RankingTier,
} from "@/data/rankings";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import {
  JsonLd,
  breadcrumbJsonLd,
  itemListJsonLd,
  faqJsonLd,
} from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";
import {
  TierTabs,
  RankingBars,
  Methodology,
  ReadTheGuides,
  FaqSection,
} from "@/app/class-rankings/page";

// Only the non-default tiers get their own page; anything else 404s. The
// default tier (Sunwell) lives on the hub /class-rankings, so it is
// deliberately NOT generated here — duplicating it would be duplicate content.
export const dynamicParams = false;

// ISR — same static landmark data as the hub; revalidate cheaply.
export const revalidate = 3600;

export function generateStaticParams() {
  return NON_DEFAULT_TIERS.map((t) => ({ tier: t.slug }));
}

type Params = Promise<{ tier: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tier: slug } = await params;
  const tier = getRankingTierBySlug(slug);
  if (!tier) return {};
  // No ogImage: the parent segment's opengraph-image.tsx cascades to this
  // child route and supplies a proper 1200×630 card (same as the hub).
  return buildMetadata({
    title: tier.metaTitle,
    description: tier.metaDescription,
    path: `/class-rankings/${tier.slug}`,
  });
}

// A small, tier-specific FAQ so each page ships unique structured data
// (rather than repeating the hub's general FAQ). Answers are derived from the
// tier's own ranking data, so they can never drift from the bars above.
function tierFaq(tier: RankingTier): { question: string; answer: string }[] {
  const [r0, r1, r2] = tier.rankings;
  return [
    {
      question: `What is the best DPS spec in ${tier.raids}?`,
      answer: `${r0.label} leads TBC Classic's Phase ${tier.phase} meters at roughly ${r0.dps.toLocaleString()} DPS, followed by ${r1.label} and ${r2.label}. All ${tier.rankings.length} DPS specs are ranked above with links to each spec's raid guide.`,
    },
    {
      question: `Does the DPS ranking change from earlier TBC phases?`,
      answer:
        "Yes. Physical and pet specs lead the Tier-4 meters because there is little spell power to scale on, then casters climb as spell power and hit gear come online in Tier 5 and 6. Each phase page reflects the settled-tier picture for that gear level.",
    },
    {
      question: "Does spec choice matter for DPS in TBC Classic?",
      answer:
        "Enormously. Within a class the gap between the raiding spec and the off-spec is often 30% or more — picking the correct raid spec matters more than min-maxing gear. Every spec above links to a full PvE guide with rotation, talents and BiS.",
    },
  ];
}

export default async function RankingTierPage({ params }: { params: Params }) {
  const { tier: slug } = await params;
  const tier = getRankingTierBySlug(slug);
  if (!tier) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "DPS Rankings", href: "/class-rankings" },
    { name: tier.short, href: `/class-rankings/${tier.slug}` },
  ];

  const listItems = tier.rankings.map((r) => ({
    name: `${r.label} — ${r.dps} DPS`,
    url: `${SITE_URL}/guides/${r.classSlug}/${r.specSlug}/pve`,
  }));

  const faq = tierFaq(tier);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(
            `Best ${tier.raids} DPS — TBC Classic Phase ${tier.phase}`,
            listItems,
          ),
          faqJsonLd(faq),
        ]}
      />
      <PageHero image={BACKGROUNDS.raids}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {tier.h1}
        </h1>
        <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          {tier.intro}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[820px] px-4 pt-8">
        <TierTabs active={tier.key} />

        <section className="mt-6" aria-label={`${tier.short} DPS rankings`}>
          <h2 className="text-xl font-semibold tracking-tight">
            Phase {tier.phase} — {tier.raids}
          </h2>
          <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-muted-strong">
            {tier.blurb}
          </p>
          <RankingBars tier={tier} />
        </section>

        <Methodology />

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        <ReadTheGuides />

        <FaqSection faq={faq} />
      </main>
    </>
  );
}
