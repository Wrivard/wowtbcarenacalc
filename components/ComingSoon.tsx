// Placeholder body for spec/content combos whose dataset isn't curated
// yet. Pages using it are noindex and excluded from the sitemap.

import Link from "next/link";
import { Hourglass } from "lucide-react";

export function ComingSoon({
  title,
  fallbackHref,
  fallbackLabel,
}: {
  title: string;
  fallbackHref: string;
  fallbackLabel: string;
}) {
  return (
    <div className="mt-10 rounded-xl border border-border bg-surface p-8 text-center">
      <Hourglass className="mx-auto size-5 text-muted" aria-hidden />
      <h2 className="mt-3 text-lg font-semibold tracking-tight">
        {title} — coming soon
      </h2>
      <p className="mx-auto mt-2 max-w-[42ch] text-sm leading-relaxed text-muted-strong">
        This list is being curated from live arena and raid data. In the
        meantime:
      </p>
      <Link
        href={fallbackHref}
        className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
      >
        {fallbackLabel}
      </Link>
    </div>
  );
}
