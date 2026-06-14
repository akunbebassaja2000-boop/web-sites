import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/crud-manager";

export const Route = createFileRoute("/_authenticated/admin/berita")({
  component: () => (
    <CrudManager
      title="Berita"
      description="Kelola berita dan artikel sekolah."
      table="news"
      orderBy="published_at"
      defaults={{ published: true, published_at: new Date().toISOString() }}
      fields={[
        { name: "title", label: "Judul", type: "text", required: true },
        { name: "summary", label: "Ringkasan", type: "textarea", required: true },
        { name: "content", label: "Isi Berita", type: "textarea", required: true },
        { name: "image_url", label: "URL Gambar", type: "image", placeholder: "https://..." },
        { name: "published", label: "Tayangkan ke publik", type: "switch" },
      ]}
      columns={[
        { name: "title", label: "Judul" },
        { name: "published_at", label: "Tanggal", format: "date" },
        { name: "published", label: "Tayang", format: "boolean" },
      ]}
    />
  ),
});
