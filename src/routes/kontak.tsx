import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { PageShell, PageHero } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SCHOOL } from "@/lib/content";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak — SMP Negeri Unggul" },
      { name: "description", content: "Hubungi SMP Negeri Unggul." },
      { property: "og:title", content: "Kontak" },
      { property: "og:description", content: "Alamat dan kontak sekolah." },
    ],
  }),
  component: KontakPage,
});

function KontakPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Hubungi Kami" title="Kontak Sekolah" description="Punya pertanyaan? Tim kami siap membantu." />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, label: "Alamat", value: SCHOOL.address },
            { icon: Phone, label: "Telepon", value: SCHOOL.phone },
            { icon: Mail, label: "Email", value: SCHOOL.email },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-medium text-foreground">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <form className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]" onSubmit={(e) => e.preventDefault()}>
          <h2 className="font-display text-xl font-bold text-foreground">Kirim Pesan</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" placeholder="Nama lengkap" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="email@contoh.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="msg">Pesan</Label>
            <Textarea id="msg" rows={5} placeholder="Tulis pesan Anda..." />
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Kirim Pesan</Button>
        </form>
      </section>
    </PageShell>
  );
}
