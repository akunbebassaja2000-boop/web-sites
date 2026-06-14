import { Link } from "@tanstack/react-router";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { NAV, SCHOOL } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-bold text-foreground">{SCHOOL.shortName}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {SCHOOL.motto}
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Tautan Cepat</h4>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Kontak</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {SCHOOL.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {SCHOOL.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {SCHOOL.email}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground">Ikuti Kami</h4>
            <div className="mt-4 flex gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Social media"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SCHOOL.name}. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
