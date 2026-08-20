import { useQuery, useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ------------ Section keys (single source of truth) ------------ */
export const SINGLETONS = [
  "hero", "features_intro", "statement", "expertise_intro", "projects_intro",
  "process_intro", "manufacturing", "why_intro", "contact", "footer",
  "projects_page", "process_page", "expertise_page", "about_page", "clients_page",
  "site_settings",
] as const;

export const LISTS = [
  "partners", "features", "expertise_items", "projects",
  "process_steps", "why_cards",
  "process_principles", "expertise_compare",
  "about_timeline", "about_leadership", "about_certifications",
  "clients", "client_projects",
] as const;

export type SingletonKey = (typeof SINGLETONS)[number];
export type ListKey = (typeof LISTS)[number];
export type AnyKey = SingletonKey | ListKey;

/* ------------ Reads ------------ */
export function useSingleton<T = any>(table: SingletonKey) {
  return useQuery({
    queryKey: ["cms", table],
    queryFn: async (): Promise<T | null> => {
      const { data, error } = await supabase.from(table as any).select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as T | null;
    },
    staleTime: 30_000,
  });
}

export function useList<T = any>(table: ListKey) {
  return useQuery({
    queryKey: ["cms", table],
    queryFn: async (): Promise<T[]> => {
      const { data, error } = await supabase
        .from(table as any)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data as T[]) ?? [];
    },
    staleTime: 30_000,
  });
}

/* ------------ Mutations ------------ */
export function useUpdateSingleton(table: SingletonKey) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, any> }) => {
      const { error } = await supabase.from(table as any).update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cms", table] });
      toast.success("Saved");
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save"),
  });
}

export function useUpsertListItem(table: ListKey) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Record<string, any>) => {
      const { error } = row.id
        ? await supabase.from(table as any).update(row).eq("id", row.id)
        : await supabase.from(table as any).insert(row);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["cms", table] }); toast.success("Saved"); },
    onError: (e: any) => toast.error(e.message ?? "Failed to save"),
  });
}

export function useDeleteListItem(table: ListKey) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["cms", table] }); toast.success("Deleted"); },
    onError: (e: any) => toast.error(e.message ?? "Failed to delete"),
  });
}

/* ------------ Prefetch helper for SSR (optional) ------------ */
export async function prefetchAll(qc: QueryClient) {
  await Promise.all([
    ...SINGLETONS.map((t) =>
      qc.prefetchQuery({
        queryKey: ["cms", t],
        queryFn: async () => (await supabase.from(t as any).select("*").limit(1).maybeSingle()).data,
      }),
    ),
    ...LISTS.map((t) =>
      qc.prefetchQuery({
        queryKey: ["cms", t],
        queryFn: async () => (await supabase.from(t as any).select("*").order("sort_order")).data ?? [],
      }),
    ),
  ]);
}