import type { ReactNode } from "react";
import { SiteNavbar } from "./site-navbar";
import { SiteFooter } from "./site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">{eyebrow}</p>
        )}
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
    </section>
  );
}
