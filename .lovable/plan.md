
# Rencana: Website SMP Modern (Frontend Only)

Tahap ini fokus **frontend saja** sesuai permintaan. Backend (auth, database, dashboard admin) akan dibangun setelah frontend disetujui.

## Design System

- **Warna**: Primary `#1D4ED8` (biru), Secondary `#F59E0B` (emas), Success `#10B981`, Danger `#EF4444`, Background `#FFFFFF`, Surface `#F8FAFC`, Text `#0F172A` / `#64748B`
- **Font**: Poppins (heading), Inter (body) — dimuat via `<link>` di `__root.tsx`
- Token semua didefinisikan di `src/styles.css` (Tailwind v4 `@theme`), tidak ada warna hardcoded di komponen
- Style: modern, bersih, banyak whitespace, card dengan rounded + soft shadow, accent emas untuk CTA & highlight (mirip referensi gambar yang dilampirkan)

## Halaman & Route

Multi-route (bukan single page anchor) untuk SEO yang baik:

```text
src/routes/
  __root.tsx           → load font, meta dasar
  index.tsx            → Homepage
  profil.tsx           → Profil sekolah
  berita.tsx           → List berita
  galeri.tsx           → Galeri kegiatan
  prestasi.tsx         → Prestasi siswa
  agenda.tsx           → Agenda sekolah
  kontak.tsx           → Kontak + map placeholder
```

Setiap route punya `head()` sendiri (title + meta description unik).

## Struktur Homepage (`index.tsx`)

Mengikuti wireframe yang diminta:

1. **Navbar** — logo + menu (Beranda, Profil, Berita, Galeri, Prestasi, Agenda, Kontak) + tombol "Login Admin" (emas) di kanan. Sticky, responsive (hamburger di mobile).
2. **Hero** — foto sekolah fullscreen (placeholder image dulu), overlay gelap, judul besar "SMP NEGERI UNGGUL", motto, tombol "Profil Sekolah" (emas) + "Pelajari Lebih Lanjut" (outline).
3. **Statistik** — 4 kartu angka besar: 500 Siswa, 35 Guru, Akreditasi A, +50 Prestasi.
4. **Sambutan Kepala Sekolah** — foto kiri, kutipan + nama/jabatan kanan.
5. **Pengumuman Penting** — banner highlight (background biru muda/emas tipis) dengan icon 📢, judul + tanggal + tombol "Lihat Semua".
6. **Berita Terbaru** — 3 card berita (foto, judul, ringkasan, "Baca Selengkapnya"). Tombol "Lihat Semua Berita".
7. **Prestasi Siswa** — 3 card prestasi dengan badge emas.
8. **Galeri Kegiatan** — grid 6–8 foto (masonry / uniform), tombol "Lihat Galeri".
9. **Footer** — info sekolah, alamat, kontak, sosial media, link cepat, copyright.

## Komponen Reusable

`src/components/`:
- `site-navbar.tsx`, `site-footer.tsx`
- `section-heading.tsx` (eyebrow emas + judul biru, mirip referensi)
- `stat-card.tsx`, `news-card.tsx`, `achievement-card.tsx`, `announcement-banner.tsx`
- Shadcn `Button`, `Card`, `Badge` (sudah ada)

## Konten Placeholder

Data dummy hard-coded di file `src/lib/content.ts` (array berita, prestasi, statistik, dst). Mudah diganti saat backend dipasang nanti.

## Yang BELUM dibuat di tahap ini

- Dashboard Admin (`/admin/*`)
- Authentication (NextAuth/Lovable Cloud)
- Database (Prisma/Postgres) — catatan: di Lovable kita pakai **Lovable Cloud** (bukan Next.js + Prisma + NextAuth), karena stack project ini **TanStack Start**, bukan Next.js. Akan dijelaskan saat masuk tahap backend.
- Upload gambar real (sementara pakai placeholder Unsplash)

## Catatan Stack

Project ini menggunakan **TanStack Start + React + Tailwind v4 + Shadcn**, bukan Next.js. Hasil akhir tetap memenuhi semua kebutuhan yang kamu sebut (SSR, routing, dll). Untuk backend nanti, ekuivalennya:
- Next.js API routes → TanStack server functions
- NextAuth + Prisma + Postgres + Supabase Storage → **Lovable Cloud** (semua-in-one)

Setujui plan ini, lalu aku langsung bangun frontend-nya.
