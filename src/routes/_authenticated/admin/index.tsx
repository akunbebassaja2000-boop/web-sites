import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Newspaper, Megaphone, Image as ImageIcon, Trophy, CalendarDays, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: DashboardIndex,
});

const STATS: { table: string; label: string; icon: LucideIcon; color: string }[] = [
  { table: "news", label: "Total Berita", icon: Newspaper, color: "bg-primary text-primary-foreground" },
  { table: "announcements", label: "Total Pengumuman", icon: Megaphone, color: "bg-secondary text-secondary-foreground" },
  { table: "gallery", label: "Total Foto", icon: ImageIcon, color: "bg-success text-success-foreground" },
  { table: "achievements", label: "Total Prestasi", icon: Trophy, color: "bg-secondary text-secondary-foreground" },
  { table: "agenda", label: "Total Agenda", icon: CalendarDays, color: "bg-primary text-primary-foreground" },
];

function DashboardIndex() {
  const { data: counts } = useQuery({
    queryKey: ["admin-counts"],
    queryFn: async () => {
      const results = await Promise.all(
        STATS.map(async (s) => {
          const { count } = await supabase.from(s.table as never).select("*", { count: "exact", head: true });
          return { table: s.table, count: count ?? 0 };
        }),
      );
      return Object.fromEntries(results.map((r) => [r.table, r.count]));
    },
  });

  const { data: recentNews } = useQuery({
    queryKey: ["admin-recent-news"],
    queryFn: async () => {
      const { data } = await supabase
        .from("news")
        .select("id,title,published_at,published")
        .order("published_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan konten website sekolah.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STATS.map((s) => (
          <div key={s.table} className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className={`grid h-11 w-11 place-items-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-3xl font-bold text-foreground">{counts?.[s.table] ?? "—"}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h2 className="font-display text-lg font-bold text-foreground">Berita Terbaru</h2>
        <div className="mt-4 divide-y divide-border">
          {(recentNews ?? []).length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Belum ada berita. Tambahkan di menu Berita.</p>
          ) : (
            recentNews?.map((n) => (
              <div key={n.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <div className="font-medium text-foreground">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(n.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${n.published ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                  {n.published ? "Tayang" : "Draft"}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
