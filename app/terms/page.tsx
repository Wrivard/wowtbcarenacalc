import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="July 18, 2026">
      <p>
        By using {SITE_NAME}, you agree to these terms. If you do not agree,
        simply don&apos;t use the Site — no account is required and nothing is
        stored about you.
      </p>

      <h2>What this tool is</h2>
      <p>
        The Site provides calculators and planning tools for World of
        Warcraft: The Burning Crusade Classic arena points. It is provided
        free of charge, &quot;as is&quot;, without warranty of any kind.
      </p>

      <h2>Accuracy</h2>
      <p>
        Calculations are based on the community-documented arena points
        formula. Blizzard has never published its exact server-side
        implementation, so results are estimates and may differ slightly from
        in-game values. Do not make irreversible in-game decisions based
        solely on this tool.
      </p>

      <h2>Intellectual property</h2>
      <p>
        World of Warcraft, The Burning Crusade, and all related names and
        marks are trademarks or registered trademarks of Blizzard
        Entertainment, Inc. This Site is an unofficial fan-made tool and is{" "}
        <strong>not affiliated with, endorsed, or sponsored by Blizzard
        Entertainment</strong>.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, the Site operator is not
        liable for any damages arising from your use of the Site, including
        (but not limited to) misspent arena points.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated from time to time; the &quot;last
        updated&quot; date above reflects the current revision. Continued use
        after changes constitutes acceptance.
      </p>
    </LegalPage>
  );
}
