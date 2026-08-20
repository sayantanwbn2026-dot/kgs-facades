import { useState } from "react";
import { uploadMedia } from "@/lib/cms-storage";
import { resolveAsset } from "@/lib/asset-map";
import type { FieldDef } from "@/lib/cms-schemas";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif", "image/svg+xml"];
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB

function isValidImageUrl(v: string) {
  if (!v) return true;
  if (v.startsWith("/src/assets/") || v.startsWith("data:image/")) return true;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch { return false; }
}

export function AdminField({
  field, value, onChange,
}: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const [busy, setBusy] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Select field — dynamic options loaded from a Supabase table
  if (field.type === "select") {
    return <SelectField field={field} value={value} onChange={onChange} />;
  }

  if (field.type === "boolean") {
    return (
      <Wrap field={field}>
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-line text-brass focus:ring-brass/30"
          />
          <span className="text-[13px] text-ink-dim">{value ? "Enabled" : "Disabled"}</span>
        </label>
      </Wrap>
    );
  }

  if (field.type === "textarea") {
    return (
      <Wrap field={field}>
        <textarea
          rows={field.rows ?? 3}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-brass focus:ring-2 focus:ring-brass/15 transition resize-y"
        />
      </Wrap>
    );
  }

  if (field.type === "number") {
    return (
      <Wrap field={field}>
        <input type="number" step="any" value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className={inputCls} />
      </Wrap>
    );
  }

  if (field.type === "image") {
    return (
      <Wrap field={field}>
        <div className="flex items-start gap-4">
          {value && !imgError && (
            <img src={resolveAsset(value)} alt=""
              onLoad={() => setImgError(false)}
              onError={() => setImgError(true)}
              className="h-20 w-20 rounded-lg object-cover border border-line shrink-0" />
          )}
          {value && imgError && (
            <div className="h-20 w-20 rounded-lg border border-red-300 bg-red-50 shrink-0 grid place-items-center text-[10px] text-red-600 font-mono text-center px-1">
              Image failed to load
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input value={value ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                onChange(v);
                setImgError(false);
                setUrlError(isValidImageUrl(v) ? null : "Enter a valid http(s) URL or upload a file.");
              }}
              placeholder={field.dims ? `Paste image URL or upload — recommended ${field.dims}` : "Paste an image URL or upload below"}
              className={inputCls + (urlError ? " !border-red-400 focus:!ring-red-200" : "")} />
            {urlError && <div className="text-[11.5px] text-red-600">{urlError}</div>}
            <label className="inline-flex items-center gap-2 text-[12px] font-medium text-brass cursor-pointer hover:underline">
              {busy ? "Uploading…" : "Upload image"}
              <input type="file" accept="image/*" className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]; if (!file) return;
                  // Validate MIME type
                  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                    toast.error(`Unsupported file type "${file.type || "unknown"}". Allowed: JPG, PNG, WebP, AVIF, GIF, SVG.`);
                    e.target.value = "";
                    return;
                  }
                  if (file.size > MAX_IMAGE_BYTES) {
                    toast.error(`File too large — max 10 MB (this file is ${(file.size / 1024 / 1024).toFixed(1)} MB).`);
                    e.target.value = "";
                    return;
                  }
                  if (file.size === 0) {
                    toast.error("File is empty.");
                    e.target.value = "";
                    return;
                  }
                  try {
                    setBusy(true);
                    const url = await uploadMedia(file);
                    onChange(url);
                    setImgError(false);
                    setUrlError(null);
                    toast.success("Uploaded");
                  }
                  catch (err: any) { toast.error(err.message ?? "Upload failed"); }
                  finally { setBusy(false); }
                }} />
            </label>
            {field.dims && (
              <div className="text-[11.5px] text-ink-mute">
                Recommended dimensions: <span className="font-mono text-ink-dim">{field.dims}</span>
                <span className="ml-2 text-ink-mute">· Max 10 MB · JPG, PNG, WebP, AVIF, SVG</span>
              </div>
            )}
          </div>
        </div>
      </Wrap>
    );
  }

  // text / url
  return (
    <Wrap field={field}>
      <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </Wrap>
  );
}

function SelectField({ field, value, onChange }: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const src = field.optionsFrom;
  const { data: options = [] } = useQuery({
    queryKey: ["cms-select", src?.table, src?.labelField, src?.valueField],
    queryFn: async () => {
      if (!src) return [];
      const { data, error } = await supabase
        .from(src.table as any)
        .select(`${src.valueField}, ${src.labelField}`)
        .order(src.labelField, { ascending: true });
      if (error) throw error;
      return (data ?? []) as any[];
    },
    enabled: !!src,
    staleTime: 30_000,
  });
  return (
    <Wrap field={field}>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className={inputCls}
      >
        <option value="">— Select —</option>
        {options.map((o: any) => (
          <option key={o[src!.valueField]} value={o[src!.valueField]}>
            {o[src!.labelField]}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-brass focus:ring-2 focus:ring-brass/15 transition";

function Wrap({ field, children }: { field: FieldDef; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-medium text-ink tracking-tight">{field.label}</label>
      {children}
      {field.help && <div className="text-[11.5px] text-ink-mute">{field.help}</div>}
    </div>
  );
}