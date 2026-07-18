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
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4">
        <Link href="/" aria-label="WoW TBC Arena Calculator — home" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="WoW TBC Arena Calculator"
            width={65}
            height={52}
            priority
          />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-muted-strong transition-colors hover:text-foreground sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
