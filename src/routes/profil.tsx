import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { SCHOOL } from "@/lib/content";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: `Profil Sekolah — ${SCHOOL.name}` },
      { name: "description", content: "Visi, misi, dan sejarah singkat SMP Negeri Unggul." },
      { property: "og:title", content: `Profil Sekolah — ${SCHOOL.name}` },
      { property: "og:description", content: "Mengenal lebih dekat sekolah kami." },
    ],
  }),
  component: ProfilPage,
});

function ProfilPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Tentang Kami"
        title="Profil Sekolah"
        description={`Mengenal lebih dekat ${SCHOOL.name} — sejarah, nilai, dan komitmen kami terhadap pendidikan.`}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose max-w-3xl text-base leading-relaxed text-foreground">
          <p>
            {SCHOOL.name} berdiri dengan komitmen untuk mencetak generasi muda Indonesia
            yang siap bersaing di tingkat global tanpa kehilangan jati diri budayanya.
            Sejak awal berdiri, sekolah kami telah meluluskan ribuan siswa yang kini
            berkiprah di berbagai bidang.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Eye, title: "Visi", body: "Menjadi sekolah unggul yang melahirkan generasi berkarakter, cerdas, dan berdaya saing global." },
            { icon: Target, title: "Misi", body: "Menyelenggarakan pendidikan berkualitas yang menyeimbangkan akademik, karakter, dan keterampilan abad 21." },
            { icon: Heart, title: "Nilai", body: "Integritas, kepedulian, kolaborasi, dan semangat belajar sepanjang hayat." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
