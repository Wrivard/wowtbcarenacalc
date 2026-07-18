import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE_NAME} — why this tool exists and how the numbers are computed.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About">
      <p>
        {SITE_NAME} exists because planning arena gear in TBC Classic means
        answering the same three questions every week: <em>how many points
        will my team earn, what rating do I need for the next piece, and how
        many weeks until I can afford it?</em> This site answers all three in
        one place, instantly, on any device.
      </p>

      <h2>How the numbers are computed</h2>
      <p>
        Everything runs client-side from a single implementation of the
        community-documented arena points formula — the calculator, the
        inverse rating lookup, and the reference table all read from the same
        constants, so they can never disagree with each other. When the
        community refines the constants against live in-game values, updating
        one file updates everything.
      </p>

      <h2>Who runs this</h2>
      <p>
        A solo developer and long-time WoW player. The site is supported by
        unobtrusive ads; there is no paywall, no account, and no data
        collection beyond the optional analytics described in the{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Feedback</h2>
      <p>
        Spotted a discrepancy with in-game values, or want a feature? Use the{" "}
        <Link href="/contact">contact page</Link> — formula-accuracy reports are
        especially welcome.
      </p>
    </LegalPage>
  );
}
