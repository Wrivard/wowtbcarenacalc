import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ComingSoon } from "@/components/ComingSoon";
import { BACKGROUNDS } from "@/lib/backgrounds";

// Leaderboard hub. Live ladder + cron pipeline land in section 3;
// noindex until real data is wired.
export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Arena Leaderboard — Season 2 Gladiator Cutoff",
    description:
      "Live TBC Classic arena ladder for 2v2, 3v3 and 5v5 with the current Gladiator, Duelist, Rival and Challenger rating cutoffs.",
    path: "/leaderboard",
    noindex: true,
  }),
};

export default function LeaderboardHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];
  return (
    <>
      <PageHero image={BACKGROUNDS.leaderboard}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Arena Leaderboard
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The live arena ladder with Gladiator, Duelist, Rival and Challenger
          cutoffs for every bracket, refreshed regularly.
        </p>
      </PageHero>
      <main className="mx-auto max-w-[720px] px-4">
        <ComingSoon
          title="Live arena ladder"
          heading="Leaderboard — coming soon"
          description="The live 2v2 / 3v3 / 5v5 ladder with title cutoffs is being wired to the arena-ladder data feed. In the meantime:"
          fallbackHref="/arena-points-calculator"
          fallbackLabel="Plan your arena points"
        />
      </main>
    </>
  );
}
