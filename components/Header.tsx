import Image from "next/image";
import Link from "next/link";

// Site-wide nav: large centered logo with link groups flanking it.
// Clear navigation is both an AdSense approval requirement and the
// internal-linking backbone for SEO.

const LEFT_NAV = [
  { href: "/", label: "Home" },
  { href: "/classes", label: "BiS Lists" },
];

const RIGHT_NAV = [
  { href: "/talent-calculator", label: "Talents" },
  { href: "/arena-points-calculator", label: "Arena Points" },
];

function NavLinks({
  items,
  align,
}: {
  items: { href: string; label: string }[];
  align: "end" | "start";
}) {
  return (
    <nav
      aria-label={align === "end" ? "Primary" : "Secondary"}
      className={`flex items-center gap-4 sm:gap-8 ${
        align === "end" ? "justify-end" : "justify-start"
      }`}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-xs font-medium tracking-wide text-muted-strong transition-colors hover:text-foreground sm:text-sm"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto grid h-20 max-w-[1100px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:gap-10">
        <NavLinks items={LEFT_NAV} align="end" />
        <Link href="/" aria-label="WoW TBC Arena Calculator — home" className="px-1">
          <Image
            src="/images/logo.png"
            alt="WoW TBC Arena Calculator"
            width={82}
            height={66}
            priority
          />
        </Link>
        <NavLinks items={RIGHT_NAV} align="start" />
      </div>
    </header>
  );
}
