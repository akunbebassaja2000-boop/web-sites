import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export type Field = {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "image" | "switch";
  placeholder?: string;
  required?: boolean;
};

export type Column = {
  name: string;
  label: string;
  format?: "date" | "boolean" | "image";
};

type Row = Record<string, unknown> & { id: string };

export function CrudManager({
  title,
  description,
  table,
  fields,
  columns,
  orderBy = "created_at",
  ascending = false,
  defaults = {},
}: {
  title: string;
  description?: string;
  table: string;
  fields: Field[];
  columns: Column[];
  orderBy?: string;
  ascending?: boolean;
  defaults?: Record<string, unknown>;
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const { data: rows = [], isLoading } = useQuery({
    queryKey: [table, "list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table as never)
        .select("*")
        .order(orderBy, { ascending });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  function openCreate() {
    const init: Record<string, unknown> = { ...defaults };
    fields.forEach((f) => {
      if (init[f.name] === undefined) init[f.name] = f.type === "switch" ? false : "";
    });
    setForm(init);
    setEditing(null);
    setOpen(true);
  }

  function openEdit(row: Row) {
    const init: Record<string, unknown> = {};
    fields.forEach((f) => {
      const v = row[f.name];
      init[f.name] = v ?? (f.type === "switch" ? false : "");
    });
    setForm(init);
    setEditing(row);
    setOpen(true);
  }

  async function save() {
    setSaving(true);
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const v = form[f.name];
      if (f.type === "switch") payload[f.name] = !!v;
      else if (v === "" || v === undefined) payload[f.name] = f.required ? "" : null;
      else payload[f.name] = v;
    }
    const op = editing
      ? supabase.from(table as never).update(payload as never).eq("id", editing.id)
      : supabase.from(table as never).insert(payload as never);
    const { error } = await op;
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? "Berhasil diperbarui" : "Berhasil ditambahkan");
    setOpen(false);
    qc.invalidateQueries({ queryKey: [table] });
    qc.invalidateQueries({ queryKey: ["admin-counts"] });
  }

  async function confirmDelete() {
    if (!deleting) return;
    const { error } = await supabase.from(table as never).delete().eq("id", deleting.id);
    if (error) return toast.error(error.message);
    toast.success("Berhasil dihapus");
    setDeleting(null);
    qc.invalidateQueries({ queryKey: [table] });
    qc.invalidateQueries({ queryKey: ["admin-counts"] });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 lg:p-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button onClick={openCreate} className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4" /> Tambah
        </Button>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : rows.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">Belum ada data.</p>
            <Button variant="link" onClick={openCreate}>Tambah data pertama</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface text-left text-xs uppercase text-muted-foreground">
                <tr>
                  {columns.map((c) => (
                    <th key={c.name} className="px-4 py-3 font-semibold">{c.label}</th>
                  ))}
                  <th className="px-4 py-3 text-right font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-surface/50">
                    {columns.map((c) => (
                      <td key={c.name} className="px-4 py-3 align-top">{renderCell(row[c.name], c.format)}</td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(row)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setDeleting(row)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${title.toLowerCase()}` : `Tambah ${title.toLowerCase()}`}</DialogTitle>
            <DialogDescription>Isi data di bawah ini.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {fields.map((f) => (
              <FieldInput key={f.name} field={f} value={form[f.name]} onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))} />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={save} disabled={saving} className="bg-primary text-primary-foreground">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus data?</AlertDialogTitle>
            <AlertDialogDescription>Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function renderCell(value: unknown, format?: Column["format"]): React.ReactNode {
  if (value === null || value === undefined || value === "") return <span className="text-muted-foreground">—</span>;
  if (format === "date") {
    return new Date(value as string).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }
  if (format === "boolean") {
    return value ? (
      <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">Ya</span>
    ) : (
      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Tidak</span>
    );
  }
  if (format === "image") {
    return <img src={value as string} alt="" className="h-12 w-16 rounded-md object-cover" />;
  }
  const str = String(value);
  return <span className="line-clamp-2 max-w-md text-foreground">{str}</span>;
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <Label>{field.label}{field.required && " *"}</Label>
        <Textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          rows={4}
        />
      </div>
    );
  }
  if (field.type === "switch") {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border p-3">
        <Label className="cursor-pointer">{field.label}</Label>
        <Switch checked={!!value} onCheckedChange={onChange} />
      </div>
    );
  }
  if (field.type === "image") {
    return (
      <div className="space-y-2">
        <Label>{field.label}{field.required && " *"}</Label>
        <Input
          type="url"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder ?? "https://..."}
          required={field.required}
        />
        {typeof value === "string" && value.startsWith("http") ? (
          <img src={value} alt="Preview" className="h-32 w-full rounded-lg border border-border object-cover" />
        ) : null}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <Label>{field.label}{field.required && " *"}</Label>
      <Input
        type={field.type === "date" ? "date" : "text"}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
      />
    </div>
  );
}
