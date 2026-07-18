import Image from "next/image";
import Link from "next/link";

// Site-wide nav. Clear navigation is both an AdSense approval
// requirement and the internal-linking backbone for SEO.

const NAV = [
  { href: "/", label: "Arena Points" },
  { href: "/classes", label: "BiS Lists" },
  { href: "/talent-calculator", label: "Talents" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/mark.png"
            alt=""
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span className="text-sm font-semibold tracking-tight">
            <span className="text-foreground">WoW</span>{" "}
            <span className="text-accent">TBC</span>
            <span className="ml-2 hidden font-mono text-[10px] font-normal tracking-widest text-muted uppercase sm:inline">
              Arena Tools
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-muted-strong transition-colors hover:text-foreground sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
