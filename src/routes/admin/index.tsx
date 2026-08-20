import { createFileRoute, Link } from "@tanstack/react-router";
import { SIDEBAR_GROUPS, SCHEMAS } from "@/lib/cms-schemas";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="display-sub text-[32px]">Content</h1>
        <p className="mt-2 body-lead">Every section of your homepage, editable field by field. Changes go live the moment you save.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SIDEBAR_GROUPS.flatMap((g) => g.items).map((k) => {
          const s = SCHEMAS[k];
          return (
            <Link key={k} to="/admin/$section" params={{ section: k }}
              className="group rounded-2xl border border-line bg-surface p-5 hover:border-brass hover:bg-brass-soft/40 transition">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink-mute">{s.kind === "singleton" ? "Section" : "List"}</div>
              <div className="mt-2 font-display text-[15px] font-semibold tracking-tight text-ink group-hover:text-brass transition">{s.title}</div>
              <div className="mt-1.5 text-[12.5px] text-ink-dim leading-snug">{s.description}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}