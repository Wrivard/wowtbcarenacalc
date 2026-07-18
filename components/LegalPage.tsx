// Shared shell for legal/info pages: consistent width, typography, and
// a back link to the calculator.

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-[720px] px-4 pt-14 sm:pt-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Back to calculator
      </Link>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      {updated && (
        <p className="mt-2 font-mono text-xs text-muted">
          Last updated: {updated}
        </p>
      )}
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-strong [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_a]:text-accent [&_a]:underline-offset-2 hover:[&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:text-foreground">
        {children}
      </div>
    </main>
  );
}
