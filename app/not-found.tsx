import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — WoW TBC" },
  description: "That page doesn't exist. Jump back into the TBC Classic hub.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/pvp", label: "PvP Arena BiS" },
  { href: "/pve", label: "PvE Raid BiS" },
  { href: "/arena/comps", label: "Arena Comps" },
  { href: "/raids", label: "Raid Guides" },
  { href: "/class-rankings", label: "Class Rankings" },
  { href: "/talent-calculator", label: "Talent Calculator" },
  { href: "/guides", label: "Guides" },
];

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[640px] flex-col items-center px-4 py-24 text-center">
      <p className="font-mono text-sm tracking-widest text-accent uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-strong">
        The page you&apos;re looking for moved or never existed. Here&apos;s the
        way back into the TBC Classic hub:
      </p>
      <nav aria-label="Popular pages" className="mt-6 flex flex-wrap justify-center gap-2">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted-strong transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
