import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { NEWS } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/berita")({
  head: () => ({
    meta: [
      { title: "Berita — SMP Negeri 8 Ambon" },
      { name: "description", content: "Berita dan kabar terbaru dari SMP Negeri 8 Ambon." },
      { property: "og:title", content: "Berita Sekolah" },
      { property: "og:description", content: "Ikuti perkembangan terbaru dari sekolah kami." },
    ],
  }),
  component: BeritaPage,
});

function BeritaPage() {
  const { data } = useQuery({
    queryKey: ["news", "public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("news")
        .select("id,title,summary,image_url,published_at")
        .eq("published", true)
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });

  const items = data && data.length > 0
    ? data.map((n) => ({
        id: n.id,
        title: n.title,
        summary: n.summary,
        image: n.image_url ?? "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        date: new Date(n.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      }))
    : NEWS;

  return (
    <PageShell>
      <PageHero eyebrow="Informasi" title="Berita Sekolah" description="Kabar terbaru tentang kegiatan, prestasi, dan pengumuman sekolah." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <article key={n.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-muted-foreground">{n.date}</div>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.summary}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
