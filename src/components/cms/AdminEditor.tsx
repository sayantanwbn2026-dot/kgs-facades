import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUpdateSingleton, useUpsertListItem, useDeleteListItem,
  type SingletonKey, type ListKey } from "@/lib/cms";
import type { SectionSchema } from "@/lib/cms-schemas";
import { AdminField } from "./AdminField";
import { Trash2, Plus } from "lucide-react";

export function AdminEditor({ schema }: { schema: SectionSchema }) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="display-sub text-[28px]">{schema.title}</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-dim max-w-2xl">{schema.description}</p>
      </header>
      {schema.kind === "singleton"
        ? <SingletonEditor schema={schema as any} />
        : <ListSectionEditor schema={schema as any} />}
    </div>
  );
}

/* ---------- Singleton ---------- */
function SingletonEditor({ schema }: { schema: SectionSchema & { kind: "singleton" } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["cms", schema.table],
    queryFn: async () => (await supabase.from(schema.table as any).select("*").limit(1).maybeSingle()).data,
  });
  const update = useUpdateSingleton(schema.table as SingletonKey);
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !data) return <Card>Loading…</Card>;

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {schema.fields.map((f) => (
          <div key={f.name} className={f.type === "textarea" || f.type === "image" ? "md:col-span-2" : ""}>
            <AdminField field={f} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => update.mutate({ id: form.id, patch: Object.fromEntries(schema.fields.map(f => [f.name, form[f.name]])) })}
          disabled={update.isPending}
          className="btn-primary !py-2.5 !px-5 !text-[13px]"
        >
          {update.isPending ? "Saving…" : "Save changes"}
        </button>
        <button onClick={() => setForm(data)} className="btn-ghost !py-2.5 !px-5 !text-[13px]">Reset</button>
      </div>
    </Card>
  );
}

/* ---------- List ---------- */
function ListSectionEditor({ schema }: { schema: SectionSchema & { kind: "list" } }) {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["cms", schema.table],
    queryFn: async () => (await supabase.from(schema.table as any).select("*").order("sort_order")).data ?? [],
  });
  const upsert = useUpsertListItem(schema.table as ListKey);
  const remove = useDeleteListItem(schema.table as ListKey);

  if (isLoading) return <Card>Loading…</Card>;

  return (
    <div className="space-y-4">
      {(rows as any[]).map((row) => (
        <ListItemCard key={row.id} schema={schema} row={row} onSave={(r) => upsert.mutate(r)} onDelete={() => remove.mutate(row.id)} />
      ))}
      <button
        onClick={() => {
          const blank: any = { sort_order: (rows as any[]).length + 1 };
          schema.fields.forEach((f) => {
            if (f.name in blank) return;
            if (f.type === "number") blank[f.name] = 0;
            else if (f.type === "select") blank[f.name] = null;
            else if (f.type === "boolean") blank[f.name] = false;
            else blank[f.name] = "";
          });
          upsert.mutate(blank);
        }}
        className="w-full rounded-2xl border-2 border-dashed border-line hover:border-brass hover:bg-brass-soft transition p-6 text-[13px] font-medium text-ink-dim hover:text-brass inline-flex items-center justify-center gap-2"
      >
        <Plus className="h-4 w-4" /> Add item
      </button>
    </div>
  );
}

function ListItemCard({ schema, row, onSave, onDelete }: {
  schema: SectionSchema & { kind: "list" }; row: any;
  onSave: (r: any) => void; onDelete: () => void;
}) {
  const [form, setForm] = useState<any>(row);
  const [open, setOpen] = useState(false);
  useEffect(() => setForm(row), [row]);

  return (
    <Card padding={false}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-2/50 transition">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10.5px] text-ink-mute">{String(row.sort_order ?? "").padStart(2, "0")}</span>
          <span className="font-display text-[14px] font-medium text-ink">{schema.itemLabel(row) || "Untitled"}</span>
        </div>
        <span className="text-[11px] font-mono text-ink-mute">{open ? "Close" : "Edit"}</span>
      </button>
      {open && (
        <div className="border-t border-line p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schema.fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" || f.type === "image" ? "md:col-span-2" : ""}>
                <AdminField field={f} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button onClick={onDelete} className="inline-flex items-center gap-2 text-[12.5px] font-medium text-red-600 hover:text-red-700">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
            <div className="flex items-center gap-2">
              <button onClick={() => setForm(row)} className="btn-ghost !py-2 !px-4 !text-[12.5px]">Reset</button>
              <button onClick={() => onSave(form)} className="btn-primary !py-2 !px-4 !text-[12.5px]">Save</button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function Card({ children, padding = true }: { children: React.ReactNode; padding?: boolean }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface ${padding ? "p-6 md:p-7" : ""}`}>{children}</div>
  );
}