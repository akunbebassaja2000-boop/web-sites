import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, PageHero } from "@/components/page-shell";
import { GALLERY } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri — SMP Negeri Unggul" },
      { name: "description", content: "Dokumentasi kegiatan sekolah, akademik, dan seni." },
      { property: "og:title", content: "Galeri Sekolah" },
      { property: "og:description", content: "Momen-momen di SMP Negeri Unggul." },
    ],
  }),
  component: GaleriPage,
});

function GaleriPage() {
  const { data } = useQuery({
    queryKey: ["gallery", "public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("gallery")
        .select("id,title,image_url")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  const items = data && data.length > 0
    ? data.map((g) => ({ src: g.image_url, alt: g.title }))
    : GALLERY.concat(GALLERY);

  return (
    <PageShell>
      <PageHero eyebrow="Dokumentasi" title="Galeri Kegiatan" description="Momen kebersamaan, kegiatan akademik dan non-akademik di sekolah." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img src={g.src} alt={g.alt} loading="lazy" className="aspect-square h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
