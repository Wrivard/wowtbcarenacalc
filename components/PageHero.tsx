// Page header with background art and a dark overlay that fades into the page
// background — keeps text legible over any artwork. The art is rendered via
// next/image with `priority` so it's discovered by the preload scanner and
// fetched at high priority (it's the LCP element on most routes), and served
// as a width-appropriate AVIF/WebP srcset. `fill` gives fixed positioning so
// it never causes layout shift.

import Image from "next/image";
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
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
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
