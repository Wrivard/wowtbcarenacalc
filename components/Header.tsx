"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLASSES } from "@/lib/classes";
import { GameIcon } from "@/components/GameIcon";

// Inlined (not imported from lib/icons) so the client bundle doesn't pull
// in the 9 talent JSON files that lib/icons → lib/talents depends on.
const classIconName = (slug: string) => `classicon_${slug}`;

// Site-wide nav. Two-door model (PvP / PvE) is kept as the primary axis,
// with a Classes mega-menu (class → spec) added for direct class access
// and a Rankings link. Clear navigation is both an AdSense requirement
// and the internal-linking backbone for SEO.

type NavItem = { href: string; label: string };

const PRIMARY: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/pvp", label: "PvP" },
  { href: "/pve", label: "PvE" },
  // Classes mega-menu is injected between here and the rest.
  { href: "/class-rankings", label: "Rankings" },
  { href: "/guides", label: "Guides" },
];

const TOOLS: NavItem[] = [
  { href: "/arena-points-calculator", label: "Arena Points Calculator" },
  { href: "/talent-calculator", label: "Talent Calculator" },
];

const CLASS_SLUGS = new Set(CLASSES.map((c) => c.slug));

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/pvp") {
    return (
      pathname === "/pvp" ||
      pathname.startsWith("/pvp/") ||
      pathname === "/arena" ||
      pathname.startsWith("/arena/") ||
      pathname === "/leaderboard" ||
      /^\/[a-z-]+\/[a-z-]+\/pvp/.test(pathname)
    );
  }
  if (href === "/pve") {
    return (
      pathname === "/pve" ||
      pathname.startsWith("/pve/") ||
      pathname === "/raids" ||
      pathname.startsWith("/raids/") ||
      /^\/[a-z-]+\/[a-z-]+\/pve/.test(pathname)
    );
  }
  if (href === "/guides") {
    // Guides hub covers professions/addons/best-race/class guides.
    return pathname === "/guides" || pathname.startsWith("/guides/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Classes-mega is active on any /[class] or /[class]/[spec]/... route.
function classesActive(pathname: string): boolean {
  const seg = pathname.split("/")[1];
  return CLASS_SLUGS.has(seg);
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

function ClassesMega({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = classesActive(pathname);

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
        Classes
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
          className="absolute left-1/2 z-50 mt-3 w-[min(92vw,720px)] -translate-x-1/2 rounded-xl border border-border bg-surface p-4 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
            {CLASSES.map((cls) => (
              <div key={cls.slug}>
                <Link
                  href={`/${cls.slug}`}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <GameIcon icon={classIconName(cls.slug)} alt="" size="small" />
                  <span
                    className="text-sm font-semibold tracking-tight"
                    style={{ color: cls.color }}
                  >
                    {cls.name}
                  </span>
                </Link>
                <ul className="mt-1.5 space-y-0.5 pl-1">
                  {cls.specs.map((spec) => (
                    <li key={spec.slug}>
                      <Link
                        href={`/${cls.slug}/${spec.slug}`}
                        onClick={() => setOpen(false)}
                        className="block text-[13px] text-muted-strong transition-colors hover:text-foreground"
                      >
                        {spec.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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
  const [mobileClasses, setMobileClasses] = useState(false);
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileClasses(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4">
        <Link href="/" aria-label="WoW TBC Arena — home" className="shrink-0">
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
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <NavLink item={PRIMARY[0]} active={isActive(pathname, "/")} />
          <NavLink item={PRIMARY[1]} active={isActive(pathname, "/pvp")} />
          <NavLink item={PRIMARY[2]} active={isActive(pathname, "/pve")} />
          <ClassesMega pathname={pathname} />
          <NavLink item={PRIMARY[3]} active={isActive(pathname, "/class-rankings")} />
          <NavLink item={PRIMARY[4]} active={isActive(pathname, "/guides")} />
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
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMobile}
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

            {/* Classes accordion */}
            <li>
              <button
                type="button"
                onClick={() => setMobileClasses((v) => !v)}
                aria-expanded={mobileClasses}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  classesActive(pathname)
                    ? "bg-accent-faint text-accent"
                    : "text-muted-strong hover:bg-surface-hover hover:text-foreground",
                )}
              >
                Classes
                <ChevronDown
                  className={cn("size-4 transition-transform", mobileClasses && "rotate-180")}
                  aria-hidden
                />
              </button>
              {mobileClasses && (
                <ul className="mt-1 space-y-0.5 pl-3">
                  {CLASSES.map((cls) => (
                    <li key={cls.slug}>
                      <Link
                        href={`/${cls.slug}`}
                        onClick={closeMobile}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
                        style={{ color: cls.color }}
                      >
                        <GameIcon icon={classIconName(cls.slug)} alt="" size="small" />
                        {cls.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="mt-1 border-t border-border pt-2">
              <span className="px-3 text-[11px] font-medium tracking-widest text-muted uppercase">
                Tools
              </span>
            </li>
            {TOOLS.map((t) => (
              <li key={t.href}>
                <Link
                  href={t.href}
                  onClick={closeMobile}
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
