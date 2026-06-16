import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { ACHIEVEMENTS } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/prestasi")({
  head: () => ({
    meta: [
      { title: "Prestasi — SMP Negeri 8 Ambon" },
      { name: "description", content: "Daftar prestasi siswa dan sekolah." },
      { property: "og:title", content: "Prestasi Siswa" },
      { property: "og:description", content: "Capaian akademik dan non-akademik." },
    ],
  }),
  component: PrestasiPage,
});

function PrestasiPage() {
  const { data } = useQuery({
    queryKey: ["achievements", "public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("achievements")
        .select("id,title,category,year,description")
        .order("year", { ascending: false });
      return data ?? [];
    },
  });

  const items = data && data.length > 0 ? data : ACHIEVEMENTS.map((a, i) => ({ id: String(i), ...a, description: null }));

  return (
    <PageShell>
      <PageHero eyebrow="Capaian" title="Prestasi Siswa" description="Penghargaan dan capaian membanggakan dari siswa-siswi kami." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <div key={a.id} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary-soft text-secondary">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="mt-4 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                {a.category}
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">{a.title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">Tahun {a.year}</div>
              {a.description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.description}</p>}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
