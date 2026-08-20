import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSingleton } from "@/lib/cms";
import { resolveOrderForEditor, type SectionKey } from "@/lib/landing-sections";
import { ArrowUp, ArrowDown, Eye, EyeOff, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/layout")({ component: LayoutEditor });

type Item = { key: SectionKey; label: string; visible: boolean };

function LayoutEditor() {
  const { data: settings, isLoading } = useSingleton<any>("site_settings");
  const qc = useQueryClient();
  const [items, setItems] = useState<Item[]>([]);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setItems(resolveOrderForEditor(settings?.landing_order));
  }, [settings]);

  const move = (i: number, dir: -1 | 1) => {
    setItems((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setDirty(true);
  };

  const toggle = (i: number) => {
    setItems((prev) => prev.map((it, k) => (k === i ? { ...it, visible: !it.visible } : it)));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    const payload = items.map((it) => ({ key: it.key, visible: it.visible }));
    try {
      const { error } = settings?.id
        ? await supabase
            .from("site_settings" as any)
            .update({ landing_order: payload })
            .eq("id", settings.id)
        : await supabase
            .from("site_settings" as any)
            .insert({ singleton: true, landing_order: payload });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["cms", "site_settings"] });
      toast.success("Layout saved");
      setDirty(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Couldn't save layout");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="display-sub text-[32px]">Layout &amp; order</h1>
        <p className="mt-2 body-lead">
          Drag the order of your homepage sections, or hide any you don't need. The hero and footer
          stay fixed at the top and bottom.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <FixedRow label="Hero" position="Always first" />
        <div className="divide-y divide-line border-y border-line">
          {isLoading && items.length === 0 ? (
            <div className="px-4 py-6 text-[13px] text-ink-mute">Loading…</div>
          ) : (
            items.map((it, i) => (
              <div
                key={it.key}
                className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${
                  it.visible ? "" : "opacity-55"
                }`}
              >
                <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-ink-mute">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-[14px] font-medium text-ink">
                    {it.label}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                    {it.visible ? "Visible" : "Hidden"}
                  </div>
                </div>
                <button
                  onClick={() => toggle(i)}
                  title={it.visible ? "Hide section" : "Show section"}
                  aria-label={it.visible ? "Hide section" : "Show section"}
                  className="grid h-9 w-9 place-items-center rounded-md text-ink-dim transition hover:bg-surface-2 hover:text-ink"
                >
                  {it.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <div className="flex flex-col">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="grid h-6 w-9 place-items-center rounded text-ink-dim transition hover:bg-surface-2 hover:text-brass disabled:opacity-25"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    aria-label="Move down"
                    className="grid h-6 w-9 place-items-center rounded text-ink-dim transition hover:bg-surface-2 hover:text-brass disabled:opacity-25"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <FixedRow label="Footer" position="Always last" />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving || !dirty}
          className="btn-primary disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save layout"}
        </button>
        {dirty && <span className="text-[12.5px] text-ink-mute">You have unsaved changes.</span>}
      </div>
    </div>
  );
}

function FixedRow({ label, position }: { label: string; position: string }) {
  return (
    <div className="flex items-center gap-3 bg-surface-2/40 px-4 py-3">
      <span className="w-6 shrink-0 text-center font-mono text-[11px] text-ink-mute">—</span>
      <div className="flex-1">
        <div className="font-display text-[14px] font-medium text-ink-dim">{label}</div>
        <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">
          {position}
        </div>
      </div>
      <Lock className="h-3.5 w-3.5 text-ink-mute opacity-50" aria-label="Fixed position" />
    </div>
  );
}
