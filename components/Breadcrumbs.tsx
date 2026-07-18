// Visible breadcrumbs; pair with breadcrumbJsonLd for the schema copy.

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/components/seo/JsonLd";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={c.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3" aria-hidden />}
            {last ? (
              <span aria-current="page" className="text-muted-strong">
                {c.name}
              </span>
            ) : (
              <Link
                href={c.href}
                className="transition-colors hover:text-foreground"
              >
                {c.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
