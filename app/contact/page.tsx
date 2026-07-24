import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { ContactForm } from "@/components/ContactForm";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the maintainer of ${SITE_NAME} — report a data issue, a calculation discrepancy, or request a feature.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>
        Questions, bug reports, data discrepancies, or feature requests — all
        welcome. Send a message below and it lands straight in the
        maintainer&apos;s inbox; replies go to the address you give.
      </p>

      <ContactForm />

      <p>
        If you&apos;re reporting a calculation discrepancy, please include your
        bracket, team rating at reset, and the points you actually received —
        that&apos;s everything needed to re-tune the constants. For BiS or
        talent data issues, link the page and describe what looks off.
      </p>
    </LegalPage>
  );
}
