"use client";

import Image from "next/image";
import Link from "next/link";
import { CLASSES } from "@/lib/classes";
import { useConsent } from "@/components/CookieConsent";

const TOOLS = [
  { href: "/arena-points-calculator", label: "Arena Points Calculator" },
  { href: "/classes", label: "BiS Lists" },
  { href: "/talent-calculator", label: "Talent Calculator" },
];

const SITE = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-xs text-muted transition-colors hover:text-foreground"
      >
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const { reopen } = useConsent();
  return (
    <footer className="mt-20 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-[1100px] px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:gap-16">
          {/* Brand */}
          <div className="max-w-[240px]">
            <Link href="/" aria-label="WoW TBC Arena Calculator — home">
              <Image
                src="/images/logo.png"
                alt="WoW TBC Arena Calculator"
                width={112}
                height={90}
                className="h-auto w-[112px]"
              />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Arena points math, live-snapshot BiS lists and talent tools for
              WoW: The Burning Crusade Classic.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <h2 className="text-[11px] font-medium tracking-widest text-muted-strong uppercase">
                Tools
              </h2>
              <ul className="mt-3 space-y-2">
                {TOOLS.map((l) => (
                  <FooterLink key={l.href} {...l} />
                ))}
              </ul>
            </div>
            <div className="col-span-2 order-last sm:order-none">
              <h2 className="text-[11px] font-medium tracking-widest text-muted-strong uppercase">
                Classes
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {CLASSES.map((c) => (
                  <FooterLink key={c.slug} href={`/${c.slug}`} label={c.name} />
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[11px] font-medium tracking-widest text-muted-strong uppercase">
                Site
              </h2>
              <ul className="mt-3 space-y-2">
                {SITE.map((l) => (
                  <FooterLink key={l.href} {...l} />
                ))}
                <li>
                  <button
                    onClick={reopen}
                    className="text-xs text-muted transition-colors hover:text-foreground"
                  >
                    Cookie settings
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
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
          <p>
            Not affiliated with Blizzard Entertainment. World of Warcraft is a
            trademark of Blizzard Entertainment, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
