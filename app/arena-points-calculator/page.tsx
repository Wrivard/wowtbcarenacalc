import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Crosshair, Swords } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { PointsCalculator } from "@/components/calculator/PointsCalculator";
import { RequiredRating } from "@/components/calculator/RequiredRating";
import { GearPlanner } from "@/components/calculator/GearPlanner";
import { RatingsProvider } from "@/components/calculator/ratings-context";
import { AdUnit } from "@/components/AdUnit";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ_ITEMS } from "@/components/seo/StructuredData";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  webApplicationJsonLd,
} from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { BRACKET_MULTIPLIERS, maxPoints, referenceTable } from "@/lib/arena";
import { SITE_URL } from "@/lib/site";

const SLOT_RESULT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT;
const SLOT_INCONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT;

// buildMetadata emits a COMPLETE openGraph/twitter block so this page no
// longer silently inherits the homepage's og:title/og:description. No ogImage
// arg here on purpose — the file-based opengraph-image.tsx supplies og:image.
export const metadata: Metadata = buildMetadata({
  // "Anniversary" earns 50 impressions across 21 queries at average position
  // 10.9 and zero clicks — it ranks on a word it never states. Shortened
  // elsewhere to keep those two terms inside the displayed 60 characters.
  title: "TBC Arena Points Calculator — Anniversary (2v2, 3v3, 5v5)",
  description:
    "Free WoW TBC Classic arena points calculator for the Anniversary realms: enter your 2v2, 3v3 or 5v5 team rating for exact weekly points, required-rating lookup, and a gear planner.",
  path: "/arena-points-calculator",
});

function SectionHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

export default function ArenaCalculatorPage() {
  const table = referenceTable();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena Points Calculator", href: "/arena-points-calculator" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          webApplicationJsonLd(
            "WoW TBC Arena Points Calculator",
            `${SITE_URL}/arena-points-calculator`,
            "Calculates weekly TBC Classic arena points from 2v2, 3v3 and 5v5 team ratings, with required-rating lookup and gear planning.",
          ),
          howToJsonLd(
            "How to use the TBC arena points calculator",
            "Calculate your weekly TBC Classic arena points from your 2v2, 3v3, or 5v5 team rating.",
            [
              {
                name: "Enter your team rating",
                text: "Enter your team rating for any bracket you play — 2v2, 3v3, or 5v5. You don't need all three.",
              },
              {
                name: "Read the per-bracket results",
                text: "Read the per-bracket results. The highlighted card is your highest-earning bracket.",
              },
              {
                name: "Check your weekly total",
                text: "The large number is what you'll actually receive at the weekly reset — points never stack across brackets.",
              },
              {
                name: "Plan backwards from a target",
                text: "Use the required rating lookup to work backwards from a points target, and the gear planner to estimate weeks until your next purchase.",
              },
            ],
          ),
          faqJsonLd([...FAQ_ITEMS]),
        ]}
      />

      <PageHero image={BACKGROUNDS.home}>
        <Breadcrumbs crumbs={crumbs} />
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent uppercase">
          <Swords className="size-3.5" aria-hidden />
          TBC Classic · Anniversary
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          WoW TBC Arena Points Calculator
        </h1>
        <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The fastest way to work out your weekly TBC Classic arena points.
          Enter your 2v2, 3v3, or 5v5 team rating to see exactly how many
          points you&apos;ll earn at the weekly reset — and what rating you
          need to hit your gear targets.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-10">
        {/* Calculator + gear planner share ratings state */}
        <RatingsProvider>
          <section id="calculator" aria-label="Arena points calculator" className="scroll-mt-6">
            <PointsCalculator />
          </section>

          <AdUnit slot={SLOT_RESULT} className="mt-10" />

          <section className="mt-14" aria-labelledby="required-rating">
            <div className="flex items-center gap-2.5">
              <Crosshair className="size-4 text-accent" aria-hidden />
              <SectionHeading id="required-rating">
                Required rating lookup
              </SectionHeading>
            </div>
            <p className="mt-2 mb-5 text-sm leading-relaxed text-muted-strong">
              Working toward a specific purchase? Enter your weekly points
              target and see the team rating you need in each bracket.
            </p>
            <RequiredRating />
          </section>

          <section className="mt-14" aria-labelledby="gear-planner">
            <div className="flex items-center gap-2.5">
              <Calculator className="size-4 text-accent" aria-hidden />
              <SectionHeading id="gear-planner">Gear planner</SectionHeading>
              <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                Beta
              </span>
            </div>
            <p className="mt-2 mb-5 text-sm leading-relaxed text-muted-strong">
              Check the pieces you&apos;re saving for. We&apos;ll total the
              arena point cost and, using your rating above, estimate how many
              weekly resets it takes to afford.
            </p>
            <GearPlanner />
          </section>
        </RatingsProvider>

        {/* ——— Guide content ——— */}

        <article className="mt-20 space-y-14">
          <section aria-labelledby="how-to">
            <SectionHeading id="how-to">How to use the calculator</SectionHeading>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-strong">
              <li>
                Enter your <strong>team rating</strong> for any bracket you
                play — 2v2, 3v3, or 5v5. You don&apos;t need all three.
              </li>
              <li>
                Read the per-bracket results. The highlighted card is your
                highest-earning bracket.
              </li>
              <li>
                The large number is what you&apos;ll actually receive at the
                weekly reset — points never stack across brackets.
              </li>
              <li>
                Use the{" "}
                <a
                  href="#required-rating"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  required rating lookup
                </a>{" "}
                to work backwards from a points target, and the{" "}
                <a
                  href="#gear-planner"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  gear planner
                </a>{" "}
                to estimate weeks until your next purchase.
              </li>
            </ol>
          </section>

          <section aria-labelledby="formula">
            <SectionHeading id="formula">
              The arena points formula, explained
            </SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-muted-strong">
              TBC Classic awards weekly arena points from your team rating{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]">
                r
              </code>{" "}
              using a logistic curve — flat at low ratings, steep through the
              1600–2200 range, then flattening again as it approaches the cap:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-muted-strong">
              {`points = (1176.94 / (1 + 2,500,000 · e^(-0.009r)) + 475) × 1.5`}
            </pre>
            <p className="mt-4 text-sm leading-relaxed text-muted-strong">
              That base value is then scaled by a bracket multiplier:
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-sm text-muted-strong">
              {(
                Object.entries(BRACKET_MULTIPLIERS) as ["2v2" | "3v3" | "5v5", number][]
              ).map(([bracket, mult]) => (
                <li key={bracket} className="flex items-center gap-3">
                  <span className="w-10 text-foreground">{bracket}</span>
                  <span className="text-accent">×{mult.toFixed(2)}</span>
                  <span className="text-xs text-muted">
                    cap ≈ {maxPoints(bracket).toLocaleString("en-US")} pts
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-strong">
              Blizzard never published the server-side constants, so this is
              the community-documented formula. If in-game values diverge, the
              constants live in one file and can be re-tuned in seconds.
            </p>
          </section>

          <section aria-labelledby="eligibility">
            <SectionHeading id="eligibility">
              Requirements &amp; eligibility
            </SectionHeading>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-strong">
              <li>
                <strong>10-game minimum.</strong> You must play at least 10
                rated games in a bracket during the week for that bracket to
                award points.
              </li>
              <li>
                <strong>Weekly reset.</strong> Points land at the reset —
                Tuesday on US realms, Wednesday on EU realms.
              </li>
              <li>
                <strong>Team rating, not personal rating.</strong> The award is
                computed from your team&apos;s rating at reset time.
              </li>
              <li>
                <strong>No stacking.</strong> If you meet the minimum in
                several brackets, you receive points from the single
                highest-earning one — not the sum.
              </li>
            </ul>
          </section>
        </article>

        <AdUnit slot={SLOT_INCONTENT} className="mt-14" />

        <article className="mt-14 space-y-14 pb-4">
          <section aria-labelledby="reference-table">
            <SectionHeading id="reference-table">
              Arena points by rating
            </SectionHeading>
            <p className="mt-2 mb-5 text-sm leading-relaxed text-muted-strong">
              Weekly points at common rating milestones. This table is
              generated from the exact same formula as the calculator above, so
              the two always agree.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="px-4 py-3 text-left text-[11px] font-medium tracking-widest text-muted uppercase">
                      Rating
                    </th>
                    {(["2v2", "3v3", "5v5"] as const).map((b) => (
                      <th
                        key={b}
                        className="px-4 py-3 text-right text-[11px] font-medium tracking-widest text-muted uppercase"
                      >
                        {b}{" "}
                        <span className="text-muted/60">
                          ×{BRACKET_MULTIPLIERS[b].toFixed(2)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono tabular-nums">
                  {table.map((row) => (
                    <tr
                      key={row.rating}
                      className="border-b border-border bg-surface last:border-b-0"
                    >
                      <td className="px-4 py-2.5 text-muted-strong">
                        {row.rating.toLocaleString("en-US")}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {row["2v2"].toLocaleString("en-US")}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        {row["3v3"].toLocaleString("en-US")}
                      </td>
                      <td className="px-4 py-2.5 text-right text-accent">
                        {row["5v5"].toLocaleString("en-US")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="best-bracket">
            <SectionHeading id="best-bracket">
              Which bracket gives the most points?
            </SectionHeading>
            <p className="mt-4 text-sm leading-relaxed text-muted-strong">
              At equal rating, <strong>5v5 always pays the most</strong> — it
              carries the full ×1.00 multiplier, while 3v3 is scaled to ×0.88
              and 2v2 to ×0.76. A 1700-rated 5v5 team out-earns a 1700-rated
              2v2 team by roughly a third.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              In practice, most players find it easier to push rating in 2v2 or
              3v3 than to keep a 5v5 team queueing. Picking a strong pairing
              helps — the{" "}
              <Link
                href="/arena/comps"
                className="text-accent underline-offset-2 hover:underline"
              >
                arena comp tier list
              </Link>{" "}
              ranks the best 2v2 and 3v3 setups, and the live{" "}
              <Link
                href="/leaderboard"
                className="text-accent underline-offset-2 hover:underline"
              >
                arena leaderboard
              </Link>{" "}
              shows what the top teams are actually queueing. Because the curve
              is steep through the mid ratings, a strong 2v2 rating can still
              out-earn a mediocre 5v5 rating — enter both above and the
              calculator will highlight whichever team actually pays more.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              Spending those points? Browse the{" "}
              <Link
                href="/classes"
                className="text-accent underline-offset-2 hover:underline"
              >
                arena PvP BiS lists
              </Link>{" "}
              to see what gladiator-range players buy first for your spec, check
              the{" "}
              <Link
                href="/class-rankings"
                className="text-accent underline-offset-2 hover:underline"
              >
                DPS rankings
              </Link>{" "}
              if you&apos;re still deciding what to main, or read the wider{" "}
              <Link
                href="/pvp"
                className="text-accent underline-offset-2 hover:underline"
              >
                TBC PvP guides
              </Link>{" "}
              for comps, gearing and honor grinds.
            </p>
          </section>

          <section aria-labelledby="faq">
            <SectionHeading id="faq">Frequently asked questions</SectionHeading>
            <div className="mt-5 space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question}>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
