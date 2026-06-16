import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { AGENDA } from "@/lib/content";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — SMP Negeri 8 Ambon" },
      { name: "description", content: "Jadwal kegiatan dan agenda sekolah." },
      { property: "og:title", content: "Agenda Sekolah" },
      { property: "og:description", content: "Jadwal kegiatan terbaru." },
    ],
  }),
  component: AgendaPage,
});

function AgendaPage() {
  const { data } = useQuery({
    queryKey: ["agenda", "public"],
    queryFn: async () => {
      const { data } = await supabase
        .from("agenda")
        .select("id,title,event_date,event_time,location,description")
        .order("event_date", { ascending: true });
      return data ?? [];
    },
  });

  const items = data && data.length > 0
    ? data.map((a) => ({
        id: a.id,
        title: a.title,
        date: new Date(a.event_date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        time: a.event_time ?? "",
        location: a.location ?? "",
      }))
    : AGENDA.map((a, i) => ({ id: String(i), ...a, location: "" }));

  return (
    <PageShell>
      <PageHero eyebrow="Jadwal" title="Agenda Sekolah" description="Kegiatan, rapat, dan acara penting sekolah yang akan datang." />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {items.map((a) => (
            <li key={a.id} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{a.title}</h3>
                <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{a.date}</span>
                  {a.time && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{a.time}</span>}
                  {a.location && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{a.location}</span>}
                </div>
              </div>
              <span className="inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">Akan Datang</span>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
