import Link from "next/link";
import { Swords } from "lucide-react";

// Site-wide nav. Clear navigation is both an AdSense approval
// requirement and the internal-linking backbone for SEO.

const NAV = [
  { href: "/", label: "Arena Calculator" },
  { href: "/classes", label: "BiS & Talents" },
  { href: "/talent-calculator", label: "Talent Calculator" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-[720px] items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-accent uppercase"
        >
          <Swords className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">TBC Classic</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-muted-strong transition-colors hover:text-foreground sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
