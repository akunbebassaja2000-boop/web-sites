import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/crud-manager";

export const Route = createFileRoute("/_authenticated/admin/prestasi")({
  component: () => (
    <CrudManager
      title="Prestasi"
      description="Prestasi akademik dan non-akademik siswa."
      table="achievements"
      fields={[
        { name: "title", label: "Judul Prestasi", type: "text", required: true },
        { name: "category", label: "Kategori", type: "text", placeholder: "Akademik, Olahraga, Seni, dll", required: true },
        { name: "year", label: "Tahun", type: "text", placeholder: "2026", required: true },
        { name: "description", label: "Deskripsi", type: "textarea" },
      ]}
      columns={[
        { name: "title", label: "Judul" },
        { name: "category", label: "Kategori" },
        { name: "year", label: "Tahun" },
      ]}
    />
  ),
});
