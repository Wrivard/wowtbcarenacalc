"use client";

import Link from "next/link";
import { useConsent } from "@/components/CookieConsent";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const { reopen } = useConsent();
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={reopen}
            className="text-xs text-muted transition-colors hover:text-foreground"
          >
            Cookie settings
          </button>
        </nav>
        <div className="space-y-1 text-xs text-muted sm:text-right">
          <p>
            Item &amp; spell data from{" "}
            <a
              href="https://www.wowhead.com/tbc"
              rel="noopener noreferrer"
              target="_blank"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Wowhead
            </a>
            . Talent data from{" "}
            <a
              href="https://github.com/wowsims/tbc"
              rel="noopener noreferrer"
              target="_blank"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              wowsims
            </a>{" "}
            / Wowhead.
          </p>
          <p>Not affiliated with Blizzard Entertainment.</p>
        </div>
      </div>
    </footer>
  );
}
