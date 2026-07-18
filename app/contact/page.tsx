import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { LegalPage } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the maintainer of ${SITE_NAME}.`,
  alternates: { canonical: "/contact" },
};

const CONTACT_EMAIL = "wrivard@kua.quebec";

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>
        Questions, bug reports, or formula-accuracy findings from in-game
        testing — all welcome. The fastest way to reach the maintainer:
      </p>
      <p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            "TBC Arena Calculator",
          )}`}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm !text-foreground !no-underline transition-colors hover:bg-surface-hover"
        >
          <Mail className="size-4 text-accent" aria-hidden />
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>
        If you&apos;re reporting a calculation discrepancy, please include
        your bracket, team rating at reset, and the points you actually
        received — that&apos;s everything needed to re-tune the constants.
      </p>
    </LegalPage>
  );
}
