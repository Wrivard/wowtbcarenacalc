"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Site-wide nav: larger logo on the left, primary links, and a Tools
// dropdown for the two calculators. Clear navigation is both an AdSense
// approval requirement and the internal-linking backbone for SEO.

type NavItem = { href: string; label: string };

const PRIMARY: NavItem[] = [
  { href: "/classes", label: "BiS" },
  { href: "/guides", label: "Guides" },
  { href: "/arena", label: "Arena" },
  { href: "/raids", label: "Raids" },
  { href: "/leaderboard", label: "Leaderboard" },
];

const TOOLS: NavItem[] = [
  { href: "/arena-points-calculator", label: "Arena Points Calculator" },
  { href: "/talent-calculator", label: "Talent Calculator" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/classes") {
    // "BiS" covers the class matrix and every per-spec BiS page.
    return (
      pathname === "/classes" ||
      /^\/[a-z-]+\/[a-z-]+\/(pvp|pve)/.test(pathname) ||
      /^\/(warrior|paladin|hunter|rogue|priest|shaman|mage|warlock|druid)$/.test(
        pathname,
      )
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative text-sm font-medium tracking-wide transition-colors",
        active ? "text-foreground" : "text-muted-strong hover:text-foreground",
      )}
    >
      {item.label}
      {active && (
        <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent" />
      )}
    </Link>
  );
}

function ToolsDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = TOOLS.some((t) => isActive(pathname, t.href));

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors",
          active ? "text-foreground" : "text-muted-strong hover:text-foreground",
        )}
      >
        Tools
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
        {active && (
          <span className="absolute -bottom-1.5 left-0 h-0.5 w-[calc(100%-1rem)] rounded-full bg-accent" />
        )}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-border bg-surface shadow-xl"
        >
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={cn(
                "block px-4 py-2.5 text-sm transition-colors hover:bg-surface-hover",
                isActive(pathname, t.href)
                  ? "text-accent"
                  : "text-muted-strong hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile sheet on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-4 px-4">
        <Link
          href="/"
          aria-label="WoW TBC Arena — home"
          className="shrink-0"
        >
          <Image
            src="/images/logo.png"
            alt="WoW TBC Arena"
            width={50}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {PRIMARY.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(pathname, item.href)}
            />
          ))}
          <ToolsDropdown pathname={pathname} />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-strong transition-colors hover:text-foreground md:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-accent-faint text-accent"
                      : "text-muted-strong hover:bg-surface-hover hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-border pt-2">
              <span className="px-3 text-[11px] font-medium tracking-widest text-muted uppercase">
                Tools
              </span>
            </li>
            {TOOLS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive(pathname, t.href)
                      ? "bg-accent-faint text-accent"
                      : "text-muted-strong hover:bg-surface-hover hover:text-foreground",
                  )}
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
