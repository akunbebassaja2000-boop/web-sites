import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Megaphone, Trophy, Calendar, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { SCHOOL, STATS, ANNOUNCEMENTS, NEWS, ACHIEVEMENTS, GALLERY } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-school.jpg";
import principalImage from "@/assets/principal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SMP Negeri Unggul — Sekolah Modern, Berkarakter, Berprestasi" },
      { name: "description", content: "Website resmi SMP Negeri Unggul. Membentuk generasi berkarakter, berprestasi dan berwawasan global." },
      { property: "og:title", content: "SMP Negeri Unggul" },
      { property: "og:description", content: "Sekolah menengah pertama modern, terpercaya, dan berprestasi." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: dbAnnouncements } = useQuery({
    queryKey: ["announcements", "important"],
    queryFn: async () => {
      const { data } = await supabase
        .from("announcements")
        .select("id,title,body,event_date")
        .eq("important", true)
        .order("created_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });
  const { data: dbNews } = useQuery({
    queryKey: ["news", "home"],
    queryFn: async () => {
      const { data } = await supabase
        .from("news")
        .select("id,title,summary,image_url,published_at")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });
  const { data: dbAchievements } = useQuery({
    queryKey: ["achievements", "home"],
    queryFn: async () => {
      const { data } = await supabase
        .from("achievements")
        .select("id,title,category,year")
        .order("year", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });
  const { data: dbGallery } = useQuery({
    queryKey: ["gallery", "home"],
    queryFn: async () => {
      const { data } = await supabase
        .from("gallery")
        .select("id,title,image_url")
        .order("created_at", { ascending: false })
        .limit(6);
      return data ?? [];
    },
  });

  const announcements = dbAnnouncements && dbAnnouncements.length > 0
    ? dbAnnouncements.map((a) => ({
        title: a.title,
        body: a.body,
        date: a.event_date ? new Date(a.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "",
      }))
    : ANNOUNCEMENTS;
  const news = dbNews && dbNews.length > 0
    ? dbNews.map((n) => ({
        id: n.id,
        title: n.title,
        summary: n.summary,
        image: n.image_url ?? "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        date: new Date(n.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      }))
    : NEWS;
  const achievements = dbAchievements && dbAchievements.length > 0 ? dbAchievements : ACHIEVEMENTS.map((a, i) => ({ id: String(i), ...a }));
  const gallery = dbGallery && dbGallery.length > 0
    ? dbGallery.map((g) => ({ src: g.image_url, alt: g.title }))
    : GALLERY;

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Gedung sekolah"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/85" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-center px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            Sekolah Menengah Pertama
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {SCHOOL.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-secondary">{SCHOOL.name.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
            {SCHOOL.motto}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/profil">
                Profil Sekolah <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
              <Link to="/berita">Lihat Berita Terbaru</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <div className="font-display text-4xl font-extrabold text-primary sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMBUTAN KEPALA SEKOLAH */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-secondary/40" />
            <img
              src={principalImage}
              alt="Kepala Sekolah"
              width={800}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-card)]"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Sambutan" title="Pesan dari Kepala Sekolah" />
            <Quote className="mt-6 h-8 w-8 text-secondary" />
            <p className="mt-3 text-lg leading-relaxed text-foreground">
              Selamat datang di {SCHOOL.name}. Kami berkomitmen membentuk peserta didik yang
              cerdas secara akademik, kuat dalam karakter, dan siap menghadapi tantangan global.
              Setiap siswa adalah bintang yang memiliki potensi luar biasa untuk dikembangkan.
            </p>
            <div className="mt-6">
              <div className="font-display text-base font-semibold text-foreground">Drs. Ahmad Hidayat, M.Pd.</div>
              <div className="text-sm text-muted-foreground">Kepala Sekolah</div>
            </div>
          </div>
        </div>
      </section>

      {/* PENGUMUMAN */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {announcements.map((a) => (
            <div
              key={a.title}
              className="flex flex-col gap-5 rounded-2xl border-l-4 border-secondary bg-secondary-soft p-6 sm:flex-row sm:items-center sm:p-8"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <Megaphone className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                  Pengumuman Penting
                </div>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-secondary" />
                {a.date}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BERITA TERBARU */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Berita Terbaru"
              title="Kabar dari Sekolah Kami"
              description="Ikuti cerita, pencapaian, dan kegiatan terbaru dari lingkungan sekolah."
            />
            <Button asChild variant="ghost" className="text-primary hover:text-primary">
              <Link to="/berita">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <article
                key={n.id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-muted-foreground">{n.date}</div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.summary}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Prestasi Siswa"
            title="Pencapaian Membanggakan"
            description="Siswa kami terus menorehkan prestasi di berbagai bidang akademik maupun non-akademik."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary-soft text-secondary">
                  <Trophy className="h-7 w-7" />
                </div>
                <div className="mt-4 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                  {a.category}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-foreground">{a.title}</h3>
                <div className="mt-1 text-sm text-muted-foreground">Tahun {a.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Galeri Kegiatan"
              title="Momen di Sekolah Kami"
              description="Dokumentasi keseharian, kegiatan akademik, seni, dan kebersamaan."
            />
            <Button asChild variant="ghost" className="text-primary hover:text-primary">
              <Link to="/galeri">
                Lihat Galeri <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${i === 0 ? "row-span-2 sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
