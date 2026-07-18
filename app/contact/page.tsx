import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { LegalPage } from "@/components/LegalPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the maintainer of ${SITE_NAME}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>
        Questions, bug reports, data discrepancies, or feature requests —
        all welcome. The best way to reach the maintainer is by opening an
        issue on the project&apos;s GitHub:
      </p>
      <p>
        <a
          href="https://github.com/Wrivard/wowtbcarenacalc/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm !text-foreground !no-underline transition-colors hover:bg-surface-hover"
        >
          <MessageSquare className="size-4 text-accent" aria-hidden />
          github.com/Wrivard/wowtbcarenacalc
        </a>
      </p>
      <p>
        If you&apos;re reporting a calculation discrepancy, please include
        your bracket, team rating at reset, and the points you actually
        received — that&apos;s everything needed to re-tune the constants.
        For BiS or talent data issues, link the page and describe what
        looks off.
      </p>
    </LegalPage>
  );
}
