import { createFileRoute } from "@tanstack/react-router";
import { CrudManager } from "@/components/admin/crud-manager";

export const Route = createFileRoute("/_authenticated/admin/agenda")({
  component: () => (
    <CrudManager
      title="Agenda"
      description="Agenda dan kegiatan sekolah."
      table="agenda"
      orderBy="event_date"
      ascending={true}
      fields={[
        { name: "title", label: "Nama Kegiatan", type: "text", required: true },
        { name: "event_date", label: "Tanggal", type: "date", required: true },
        { name: "event_time", label: "Waktu", type: "text", placeholder: "08.00 WIB" },
        { name: "location", label: "Lokasi", type: "text" },
        { name: "description", label: "Deskripsi", type: "textarea" },
      ]}
      columns={[
        { name: "title", label: "Kegiatan" },
        { name: "event_date", label: "Tanggal", format: "date" },
        { name: "event_time", label: "Waktu" },
        { name: "location", label: "Lokasi" },
      ]}
    />
  ),
});
