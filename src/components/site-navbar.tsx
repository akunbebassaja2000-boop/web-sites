import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, GraduationCap, LogIn } from "lucide-react";
import { NAV, SCHOOL } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-base font-bold leading-tight text-foreground sm:text-lg">
            {SCHOOL.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
              activeProps={{ className: "text-primary bg-primary-soft" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/auth">
              <LogIn className="h-4 w-4" />
              Login Admin
            </Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-primary-soft hover:text-primary"
                activeProps={{ className: "text-primary bg-primary-soft" }}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/auth" onClick={() => setOpen(false)}>
                <LogIn className="h-4 w-4" />
                Login Admin
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
