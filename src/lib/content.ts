import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const SCHOOL = {
  name: "SMP Negeri Unggul",
  shortName: "SMPN Unggul",
  motto: "Membentuk Generasi Berkarakter, Berprestasi dan Berwawasan Global",
  address: "Jl. Pendidikan No. 1, Jakarta Selatan 12345",
  phone: "(021) 1234-5678",
  email: "info@smpnunggul.sch.id",
};

export const NAV = [
  { label: "Beranda", to: "/" },
  { label: "Profil", to: "/profil" },
  { label: "Berita", to: "/berita" },
  { label: "Galeri", to: "/galeri" },
  { label: "Prestasi", to: "/prestasi" },
  { label: "Agenda", to: "/agenda" },
  { label: "Kontak", to: "/kontak" },
] as const;

export const STATS = [
  { value: "500+", label: "Siswa Aktif" },
  { value: "35", label: "Guru & Staf" },
  { value: "A", label: "Akreditasi" },
  { value: "50+", label: "Prestasi" },
];

export const ANNOUNCEMENTS = [
  {
    title: "Jadwal Ujian Semester Genap Tahun Ajaran 2025/2026",
    date: "15 Juni 2026",
    body: "Ujian semester genap akan dilaksanakan mulai 15 Juni 2026. Silakan unduh jadwal lengkap di halaman pengumuman.",
  },
];

export const NEWS = [
  {
    id: 1,
    image: news1,
    title: "Program Belajar Aktif Tingkatkan Minat Membaca Siswa",
    summary: "Inisiatif perpustakaan digital dan literasi pagi mendorong siswa lebih antusias membaca setiap hari.",
    date: "10 Juni 2026",
  },
  {
    id: 2,
    image: news2,
    title: "Tim Sains Raih Juara 1 Olimpiade Tingkat Provinsi",
    summary: "Lima siswa terbaik membawa pulang trofi pertama dalam ajang olimpiade sains tingkat provinsi tahun ini.",
    date: "5 Juni 2026",
  },
  {
    id: 3,
    image: news3,
    title: "Pekan Olahraga Sekolah: Solidaritas dan Sportivitas",
    summary: "Lebih dari 200 siswa berpartisipasi dalam turnamen futsal, basket, dan voli antar kelas.",
    date: "28 Mei 2026",
  },
];

export const ACHIEVEMENTS = [
  { title: "Juara 1 Olimpiade Sains Provinsi", year: "2026", category: "Akademik" },
  { title: "Medali Emas Lomba Karya Tulis Nasional", year: "2025", category: "Literasi" },
  { title: "Juara Umum Pekan Seni Pelajar", year: "2025", category: "Seni & Budaya" },
];

export const GALLERY = [
  { src: g1, alt: "Perpustakaan sekolah" },
  { src: g2, alt: "Laboratorium sains" },
  { src: g3, alt: "Upacara bendera" },
  { src: g4, alt: "Kelas seni" },
  { src: g5, alt: "Laboratorium komputer" },
  { src: g6, alt: "Pertunjukan tari" },
];

export const AGENDA = [
  { title: "Penerimaan Rapor Tengah Semester", date: "20 Juni 2026", time: "08.00 WIB" },
  { title: "Rapat Komite Sekolah", date: "25 Juni 2026", time: "13.00 WIB" },
  { title: "Pentas Seni Akhir Tahun", date: "5 Juli 2026", time: "18.30 WIB" },
];
