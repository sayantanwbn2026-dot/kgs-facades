import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/kgs/Nav";
import { Footer } from "@/components/kgs/Footer";
import { PageCTA } from "@/components/kgs/PageCTA";
import { supabase } from "@/integrations/supabase/client";
import { resolveAsset } from "@/lib/asset-map";
import { safeUrl } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight, Award, Building2, Calendar, MapPin, Quote } from "lucide-react";

export const Route = createFileRoute("/clients/$slug")({
  component: ClientDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-ink">
      <Nav alwaysSolid />
      <div className="container-kgs pt-40 pb-32 text-center">
        <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-brass">404</div>
        <h1 className="mt-4 display-section">Client not found</h1>
        <Link to="/clients" className="mt-8 inline-flex items-center gap-2 text-brass hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to all clients
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center p-8 text-ink-dim">
      <p>Something went wrong. Please try again.</p>
    </div>
  ),
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Client | KGS Facades` },
      { name: "description", content: `Projects, scope and engineered value delivered by KGS for ${params.slug}.` },
      { property: "og:title", content: `${params.slug} — Client | KGS Facades` },
    ],
  }),
});

type Client = {
  id: string; name: string; slug: string | null;
  logo_url?: string | null; hero_image_url?: string | null;
  tagline?: string | null; description?: string | null; about_long?: string | null;
  sector?: string | null; city?: string | null; website?: string | null;
  established_year?: string | null; partnership_since?: string | null; featured?: boolean | null;
};
type CProject = {
  id: string; client_id: string; name: string; slug?: string | null;
  location?: string | null; year?: string | null; status?: string | null;
  system_description?: string | null; scope?: string | null; area?: string | null;
  kgs_role?: string | null; valuation?: string | null; fee?: string | null;
  description?: string | null; image_url?: string | null; hero_image_url?: string | null;
  gallery_urls?: string | null; testimonial_quote?: string | null;
  testimonial_author?: string | null; testimonial_role?: string | null;
  awards?: string | null; completion_date?: string | null; duration?: string | null;
  sqft_value?: string | null; sort_order?: number | null;
};

function ClientDetail() {
  const { slug } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["client-detail", slug],
    queryFn: async () => {
      const { data: client, error } = await supabase
        .from("clients").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!client) return { client: null, projects: [] as CProject[] };
      const { data: projects } = await supabase
        .from("client_projects").select("*")
        .eq("client_id", (client as any).id)
        .order("sort_order", { ascending: true });
      return { client: client as Client, projects: (projects ?? []) as CProject[] };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-ink">
        <Nav alwaysSolid />
        <div className="container-kgs pt-40 text-ink-mute text-sm">Loading client…</div>
      </div>
    );
  }
  if (!data?.client) throw notFound();

  const { client, projects } = data;
  const totalProjects = projects.length;
  const totalSqft = projects.reduce((sum, p) => sum + (Number(p.sqft_value) || 0), 0);

  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav alwaysSolid />
      <main>
        {/* Hero band */}
        <section className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          {client.hero_image_url ? (
            <>
              <img
                src={resolveAsset(client.hero_image_url)}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/85 to-background" />
            </>
          ) : (
            <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
          )}

          <div className="container-kgs">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase text-ink-mute hover:text-brass transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> All clients
            </Link>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4">
                  {client.logo_url && (
                    <div className="grid place-items-center h-20 w-20 md:h-24 md:w-24 rounded-[var(--radius)] bg-surface border border-line overflow-hidden shrink-0">
                      <img src={resolveAsset(client.logo_url)} alt={client.name} className="h-full w-full object-contain p-3" />
                    </div>
                  )}
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brass flex items-center gap-2">
                      Client Profile
                      {client.featured && <span className="rounded-full bg-brass/15 text-brass px-2 py-0.5 text-[9.5px]">FEATURED</span>}
                    </div>
                    <motion.h1
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="mt-3 display-text text-[clamp(1.85rem,4vw,3.1rem)] leading-[1.02]"
                    >
                      {client.name}
                    </motion.h1>
                    {client.tagline && <p className="mt-3 body-lead text-ink-dim max-w-2xl">{client.tagline}</p>}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-2 text-[13px] font-display">
                {client.sector && <MetaRow icon={<Building2 className="h-3.5 w-3.5" />} k="Sector" v={client.sector} />}
                {client.city && <MetaRow icon={<MapPin className="h-3.5 w-3.5" />} k="HQ" v={client.city} />}
                {client.established_year && <MetaRow icon={<Calendar className="h-3.5 w-3.5" />} k="Established" v={client.established_year} />}
                {client.partnership_since && <MetaRow icon={<Calendar className="h-3.5 w-3.5" />} k="Partner since" v={client.partnership_since} />}
                {client.website && (
                  <a href={safeUrl(client.website)} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-brass hover:underline">
                    Visit website <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-line bg-surface">
          <div className="container-kgs grid grid-cols-3 divide-x divide-line">
            <Stat v={String(totalProjects)} l="Projects with KGS" />
            <Stat v={totalSqft > 0 ? `${(totalSqft / 1000).toFixed(0)}K` : "—"} l="Sqft engineered" suffix={totalSqft > 0 ? "sqft" : undefined} />
            <Stat v={projects.filter((p) => (p.status ?? "").toLowerCase() === "delivered").length.toString()} l="Delivered" />
          </div>
        </section>

        {/* About long */}
        {(client.about_long || client.description) && (
          <section className="py-12 md:py-24">
            <div className="container-kgs grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <span className="eyebrow">About the client</span>
                <h2 className="mt-4 display-section text-[clamp(1.35rem,2.4vw,1.95rem)] leading-tight">
                  A relationship built around the building envelope.
                </h2>
              </div>
              <div className="lg:col-span-8 body-lead whitespace-pre-line">
                {client.about_long || client.description}
              </div>
            </div>
          </section>
        )}

        {/* Projects case studies */}
        <section className="border-t border-line bg-surface-2 py-12 md:py-24">
          <div className="container-kgs space-y-24 md:space-y-32">
            <header className="max-w-3xl">
              <span className="eyebrow">Projects delivered</span>
              <h2 className="mt-4 display-section text-[clamp(1.45rem,2.7vw,2.15rem)] leading-tight">
                Case studies for {client.name}.
              </h2>
            </header>

            {projects.length === 0 && (
              <div className="text-center py-12 text-ink-mute font-mono uppercase tracking-wider text-[12px]">
                Project case studies coming soon.
              </div>
            )}

            {projects.map((p, i) => {
              const gallery = (p.gallery_urls ?? "")
                .split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14"
                  id={p.slug ?? undefined}
                >
                  <div className="lg:col-span-7">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] border border-line bg-surface">
                      {(p.hero_image_url || p.image_url) ? (
                        <img
                          src={resolveAsset((p.hero_image_url || p.image_url)!)}
                          alt={p.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 grid-bg opacity-60" />
                      )}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        {p.status && (
                          <span className="rounded-full bg-background/90 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                            {p.status}
                          </span>
                        )}
                        {p.year && (
                          <span className="rounded-full bg-background/90 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                            {p.year}
                          </span>
                        )}
                      </div>
                    </div>

                    {gallery.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {gallery.slice(0, 6).map((g, gi) => (
                          <div key={gi} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface">
                            <img src={resolveAsset(g)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brass">
                      Project {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-3 display-sub text-[clamp(1.2rem,2.1vw,1.65rem)] leading-tight">
                      {p.name}
                    </h3>
                    {p.system_description && (
                      <p className="mt-2 text-[13.5px] text-ink-dim">{p.system_description}</p>
                    )}
                    {p.description && (
                      <p className="mt-5 body-lead text-[15.5px]">{p.description}</p>
                    )}

                    {p.kgs_role && (
                      <div className="mt-6 rounded-xl border border-line bg-background p-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">KGS Role</div>
                        <div className="mt-1.5 text-[14px] text-ink leading-relaxed">{p.kgs_role}</div>
                      </div>
                    )}

                    <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3.5">
                      {[
                        ["Location", p.location],
                        ["Scope", p.scope],
                        ["Area", p.area],
                        ["Duration", p.duration],
                        ["Completion", p.completion_date],
                        ["Valuation", p.valuation],
                        ["KGS fee", p.fee],
                      ].filter(([, v]) => Boolean(v)).map(([k, v]) => (
                        <div key={k as string} className="border-t border-line pt-2.5">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">{k}</dt>
                          <dd className="mt-1 text-[13.5px] text-ink font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    {p.awards && (
                      <div className="mt-6 flex items-start gap-3 rounded-xl bg-brass-soft/40 border border-brass/20 p-4">
                        <Award className="h-4 w-4 text-brass mt-0.5 shrink-0" />
                        <div className="text-[13px] text-ink leading-relaxed">{p.awards}</div>
                      </div>
                    )}

                    {p.testimonial_quote && (
                      <figure className="mt-8 border-l-2 border-brass pl-5">
                        <Quote className="h-4 w-4 text-brass" />
                        <blockquote className="mt-2 font-display text-[16px] leading-relaxed italic text-ink">
                          "{p.testimonial_quote}"
                        </blockquote>
                        {(p.testimonial_author || p.testimonial_role) && (
                          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                            {p.testimonial_author}
                            {p.testimonial_role && <span className="text-ink/40"> · {p.testimonial_role}</span>}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <PageCTA
          eyebrow="Build with KGS"
          title={`Planning the next project with ${client.name}?`}
          copy="Talk to our engineering team about feasibility, systems and value."
        />
      </main>
      <Footer />
    </div>
  );
}

function MetaRow({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-line py-2.5">
      <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
        {icon} {k}
      </span>
      <span className="text-ink font-medium text-[13px]">{v}</span>
    </div>
  );
}

function Stat({ v, l, suffix }: { v: string; l: string; suffix?: string }) {
  return (
    <div className="px-6 md:px-10 py-10 md:py-14">
      <div className="font-display text-[clamp(1.5rem,2.7vw,2.1rem)] font-medium tracking-tight">
        {v}{suffix && <span className="text-ink-mute text-[0.5em] ml-1.5">{suffix}</span>}
      </div>
      <div className="mt-1.5 text-[12px] md:text-[13px] font-mono uppercase tracking-[0.18em] text-ink-mute">{l}</div>
    </div>
  );
}