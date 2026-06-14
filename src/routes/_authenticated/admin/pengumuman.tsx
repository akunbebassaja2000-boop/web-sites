import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/crud-manager";

export const Route = createFileRoute("/_authenticated/admin/pengumuman")({
  component: () => (
    <CrudManager
      title="Pengumuman"
      description="Pengumuman penting untuk siswa dan orang tua."
      table="announcements"
      fields={[
        { name: "title", label: "Judul", type: "text", required: true },
        { name: "body", label: "Isi Pengumuman", type: "textarea", required: true },
        { name: "event_date", label: "Tanggal Penting", type: "date" },
        { name: "important", label: "Tandai sebagai PENTING (tampil di banner)", type: "switch" },
      ]}
      columns={[
        { name: "title", label: "Judul" },
        { name: "event_date", label: "Tanggal", format: "date" },
        { name: "important", label: "Penting", format: "boolean" },
      ]}
    />
  ),
});
