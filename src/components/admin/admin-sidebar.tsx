import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  Image as ImageIcon,
  Trophy,
  CalendarDays,
  LogOut,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/berita", label: "Berita", icon: Newspaper },
  { to: "/admin/pengumuman", label: "Pengumuman", icon: Megaphone },
  { to: "/admin/galeri", label: "Galeri", icon: ImageIcon },
  { to: "/admin/prestasi", label: "Prestasi", icon: Trophy },
  { to: "/admin/agenda", label: "Agenda", icon: CalendarDays },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Berhasil keluar");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <Link to="/admin" className="flex items-center gap-2.5 border-b border-border px-6 py-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </span>
        <div>
          <div className="font-display text-sm font-bold leading-tight text-foreground">Admin Panel</div>
          <div className="text-[11px] text-muted-foreground">SMP Negeri 8 Ambon</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-surface hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" /> Lihat Website
        </Link>
        <div className="rounded-lg bg-surface px-3 py-2.5">
          <div className="truncate text-xs font-medium text-foreground">{email ?? "Admin"}</div>
          <div className="text-[11px] text-muted-foreground">Admin Sekolah</div>
        </div>
        <Button variant="ghost" onClick={logout} className="mt-2 w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-4 w-4" /> Keluar
        </Button>
      </div>
    </aside>
  );
}
