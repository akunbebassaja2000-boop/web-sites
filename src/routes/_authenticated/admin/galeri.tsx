import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/crud-manager";

export const Route = createFileRoute("/_authenticated/admin/galeri")({
  component: () => (
    <CrudManager
      title="Galeri"
      description="Foto kegiatan sekolah."
      table="gallery"
      fields={[
        { name: "title", label: "Judul Foto", type: "text", required: true },
        { name: "image_url", label: "URL Gambar", type: "image", required: true },
        { name: "description", label: "Deskripsi", type: "textarea" },
      ]}
      columns={[
        { name: "image_url", label: "Foto", format: "image" },
        { name: "title", label: "Judul" },
        { name: "created_at", label: "Ditambahkan", format: "date" },
      ]}
    />
  ),
});
