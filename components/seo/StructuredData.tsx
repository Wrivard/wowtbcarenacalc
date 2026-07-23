// JSON-LD structured data: WebApplication + FAQPage.
// Rendered server-side into the page head area; content must stay in
// sync with the visible FAQ copy on the page.

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const FAQ_ITEMS = [
  {
    question: "How many arena points do I get per week in TBC Classic?",
    answer:
      "Your weekly arena points depend on your team rating and bracket. At 1500 rating you earn roughly 850–1,100 points depending on bracket; at 2000+ you approach the bracket's cap. Enter your rating in the calculator above for the exact number.",
  },
  {
    question: "Does this calculator use the official Blizzard formula?",
    answer:
      "It uses the community-documented TBC arena points formula with the standard bracket multipliers (2v2 ×0.76, 3v3 ×0.88, 5v5 ×1.00). Blizzard has never published the exact server-side constants, so small differences from in-game values are possible. All constants are kept in one place so the calculator can be re-tuned quickly if live values diverge.",
  },
  {
    question: "Do arena points stack across brackets?",
    answer:
      "No. You are awarded points from your single highest-earning eligible bracket only. Playing all three brackets does not add the totals together.",
  },
  {
    question: "What rating do I need to earn 1,000 arena points per week?",
    answer:
      "Roughly 1,455 team rating in 5v5, 1,510 in 3v3, or 1,565 in 2v2. Use the Required Rating lookup on this page to get the exact rating for any points target in any bracket.",
  },
  {
    question: "How long does it take to buy a full gear set with arena points?",
    answer:
      "A full 5-piece arena set costs around 8,250 arena points, plus about 3,750 for a main weapon. At ~1,000 points per week that is roughly 12 weeks for everything; higher-rated teams shave several weeks off. Use the gear planner to estimate your own timeline.",
  },
  {
    question: "Does my personal rating affect the points I earn?",
    answer:
      "Weekly point awards are based on team rating, not personal rating. Personal rating matters for purchasing certain high-end items in later seasons, which carry a rating requirement.",
  },
  {
    question: "When do arena points get awarded?",
    answer:
      "Points are awarded at the weekly reset: Tuesday for US realms and Wednesday for EU realms. You must have played at least 10 rated games in a bracket that week for it to count.",
  },
  {
    question: "Does this arena points calculator work for TBC Anniversary realms?",
    answer:
      "Yes. The TBC Anniversary (fresh Classic) realms use the same weekly arena points formula and the same bracket multipliers — 2v2 ×0.76, 3v3 ×0.88, 5v5 ×1.00 — as original Burning Crusade. Enter your team rating and the weekly total shown here applies directly on Anniversary realms.",
  },
  {
    question: "How many weeks does it take to earn a full Vengeful Gladiator set?",
    answer:
      "A full five-piece arena armor set costs about 8,250 arena points, with a weapon on top. At roughly 1,000 points per week (around 1,500 team rating) that is about 8–9 weeks for the armor and 12+ weeks once you add a weapon. A higher rating shaves weeks off — use the gear planner above for your exact timeline.",
  },
  {
    question: "Do I need to win arena games to earn points?",
    answer:
      "Points are calculated from your team rating at the weekly reset, and rating comes from your win/loss record, so winning does raise your payout — but there is no per-win bonus. You need at least 10 rated games in a bracket that week; after that, the rating-based total shown in the calculator is what you receive.",
  },
] as const;

export function StructuredData() {
  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
