// Page header with background art and a dark overlay that fades into
// the page background — keeps text AAA-legible over any artwork.
// The image is a plain CSS background (files are pre-optimized webp),
// so it never causes layout shift.

import { cn } from "@/lib/utils";

export function PageHero({
  image,
  children,
  size = "default",
  contentClassName,
}: {
  image: string;
  children: React.ReactNode;
  size?: "default" | "large";
  contentClassName?: string;
}) {
  return (
    <div className="relative border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/70 to-background"
      />
      <div
        className={cn(
          "relative mx-auto max-w-[720px] px-4",
          size === "large" ? "pt-16 pb-12 sm:pt-24 sm:pb-16" : "pt-10 pb-8 sm:pt-14 sm:pb-10",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
