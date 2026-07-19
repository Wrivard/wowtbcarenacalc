import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ComingSoon } from "@/components/ComingSoon";
import { BACKGROUNDS } from "@/lib/backgrounds";

// Arena hub. Real comp browser + leaderboard tie-in land in section 2/3;
// noindex until then so we don't publish a thin page.
export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Arena — Comps, Tier List & Leaderboard",
    description:
      "TBC Classic arena hub: the best 2v2, 3v3 and 5v5 comps, a meta tier list, and the live Gladiator-cutoff leaderboard.",
    path: "/arena",
    noindex: true,
  }),
};

export default function ArenaHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
  ];
  return (
    <>
      <PageHero image={BACKGROUNDS.arena}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Arena
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The best arena comps for every bracket, a live meta tier list, and
          the current Gladiator cutoff by rating.
        </p>
      </PageHero>
      <main className="mx-auto max-w-[720px] px-4">
        <ComingSoon
          title="Arena comps & tier list"
          heading="Arena comps — coming soon"
          description="The comp browser (2v2 / 3v3 / 5v5, filterable by class and tier) and per-comp strategy guides are being written. In the meantime:"
          fallbackHref="/classes"
          fallbackLabel="Browse PvP BiS by class"
        />
      </main>
    </>
  );
}
