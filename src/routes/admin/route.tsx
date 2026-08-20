import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SIDEBAR_GROUPS, SCHEMAS } from "@/lib/cms-schemas";
import { LogOut, Search } from "lucide-react";
import { Toaster } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminLayout,
  head: () => ({ meta: [{ title: "KGS — Admin" }, { name: "robots", content: "noindex" }] }),
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "auth" | "noadmin" | "ok">("loading");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!active) return;
      if (!sess.session) { setStatus("auth"); return; }
      const { data } = await supabase.from("user_roles" as any)
        .select("role").eq("user_id", sess.session.user.id).eq("role","admin").maybeSingle();
      if (!active) return;
      setStatus(data ? "ok" : "noadmin");
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      if (!sess) setStatus("auth");
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (status === "auth" && pathname !== "/admin/login") navigate({ to: "/admin/login" });
  }, [status, navigate, pathname]);

  // Login route is always accessible
  if (pathname === "/admin/login") return (<><Toaster richColors position="top-right" /><Outlet /></>);

  if (status === "loading") {
    return <div className="min-h-screen grid place-items-center text-ink-mute text-sm">Loading…</div>;
  }
  if (status === "auth") {
    return <div className="min-h-screen grid place-items-center text-ink-mute text-sm">Redirecting…</div>;
  }
  if (status === "noadmin") {
    return (
      <div className="min-h-screen grid place-items-center p-8">
        <div className="max-w-md text-center space-y-4">
          <h1 className="display-sub text-2xl">Not authorized</h1>
          <p className="body-lead">Your account is signed in but is not an admin.</p>
          <button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }} className="btn-primary">Sign out</button>
        </div>
      </div>
    );
  }

  const active = pathname.split("/")[2] ?? "";
  const q = filter.trim().toLowerCase();
  const filteredGroups = q
    ? SIDEBAR_GROUPS
        .map((g) => ({
          ...g,
          items: g.items.filter((k) => {
            const s = SCHEMAS[k];
            return (
              s.title.toLowerCase().includes(q) ||
              g.label.toLowerCase().includes(q) ||
              k.toLowerCase().includes(q)
            );
          }),
        }))
        .filter((g) => g.items.length > 0)
    : SIDEBAR_GROUPS;

  return (
    <div className="min-h-screen bg-background text-ink flex">
      <Toaster richColors position="top-right" />
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 shrink-0 border-r border-line bg-surface flex-col">
        <div className="px-6 py-6 border-b border-line flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <span className="grid place-items-center h-7 w-7 rounded-lg bg-brass text-white font-display text-[11px] font-bold">K</span>
            <span className="font-display text-[13px] font-semibold tracking-tight">KGS <span className="text-ink-mute font-normal">/ CMS</span></span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          <div className="px-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-mute" />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search sections…"
                className="w-full rounded-md border border-line bg-background pl-8 pr-2 py-1.5 text-[12.5px] text-ink outline-none focus:border-brass focus:ring-2 focus:ring-brass/15 transition"
              />
            </div>
          </div>
          <div>
            <div className="px-3 mb-1.5 font-mono text-[10px] tracking-wider uppercase text-ink-mute">Site</div>
            <Link to="/admin/layout"
              className={`block px-3 py-1.5 rounded-md text-[13px] font-semibold tracking-tight transition ${active === "layout" ? "bg-brass-soft text-brass" : "text-ink hover:bg-surface-2"}`}>
              ⌗ Layout &amp; order
            </Link>
            <Link to="/admin/enquiries"
              className={`block px-3 py-1.5 rounded-md text-[13px] font-semibold tracking-tight transition ${active === "enquiries" ? "bg-brass-soft text-brass" : "text-ink hover:bg-surface-2"}`}>
              ✉ Enquiries
            </Link>
          </div>
          {filteredGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-1.5 font-mono text-[10px] tracking-wider uppercase text-ink-mute">{group.label}</div>
              {group.items.map((k) => {
                const s = SCHEMAS[k];
                return (
                  <Link key={k} to="/admin/$section" params={{ section: k }}
                    className={`block px-3 py-1.5 rounded-md text-[13px] font-medium tracking-tight transition ${active === k ? "bg-brass-soft text-brass" : "text-ink-dim hover:text-ink hover:bg-surface-2"}`}>
                    {s.title.replace(/^.* — /, "") || s.title}
                  </Link>
                );
              })}
            </div>
          ))}
          {filteredGroups.length === 0 && (
            <div className="px-3 text-[12px] text-ink-mute">No sections match "{filter}".</div>
          )}
        </nav>
        <div className="px-3 py-3 border-t border-line space-y-1">
          <Link to="/" className="block px-3 py-1.5 rounded-md text-[12.5px] text-ink-dim hover:text-ink hover:bg-surface-2">↗ View site</Link>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }}
            className="w-full text-left px-3 py-1.5 rounded-md text-[12.5px] text-ink-dim hover:text-ink hover:bg-surface-2 inline-flex items-center gap-2">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 md:py-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
}