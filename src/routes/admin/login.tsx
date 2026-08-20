import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen bg-background grid place-items-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="grid place-items-center h-8 w-8 rounded-lg bg-brass text-white font-display text-[12px] font-bold">K</span>
            <span className="font-display text-[14px] font-semibold tracking-tight">KGS <span className="text-ink-mute font-normal">/ CMS</span></span>
          </div>
          <h1 className="display-sub text-2xl">Sign in to admin</h1>
          <p className="mt-2 text-[13px] text-ink-dim">Authorized personnel only.</p>
        </div>
        <form onSubmit={submit} className="rounded-2xl border border-line bg-surface p-6 space-y-4">
          <label className="block">
            <span className="block text-[12px] font-medium text-ink mb-1.5">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brass focus:ring-2 focus:ring-brass/15" />
          </label>
          <label className="block">
            <span className="block text-[12px] font-medium text-ink mb-1.5">Password</span>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-line bg-background px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brass focus:ring-2 focus:ring-brass/15" />
          </label>
          <button disabled={busy} className="btn-primary w-full justify-center">
            {busy ? "Working…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}