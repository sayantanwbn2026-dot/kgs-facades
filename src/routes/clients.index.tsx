import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/kgs/Nav";
import { Footer } from "@/components/kgs/Footer";
import { PageHero } from "@/components/kgs/PageHero";
import heroImg from "@/assets/proj-ecospace.jpg";
import { PageCTA } from "@/components/kgs/PageCTA";
import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/clients/")({
  head: () => ({
    meta: [
      { title: "Clients — KGS Facade Engineering" },
      { name: "description", content: "Developers and institutions who partner with KGS — projects delivered, KGS role, scope and engineered value for each engagement." },
      { property: "og:title", content: "Clients — KGS Facade Engineering" },
      { property: "og:description", content: "Selected client engagements by KGS with project details, role, scope and value." },
    ],
  }),
  component: ClientsPage,
});

type Client = {
  id: string;
  name: string;
  slug?: string | null;
  logo_url?: string | null;
  tagline?: string | null;
  description?: string | null;
  sort_order?: number | null;
  featured?: boolean | null;
  sector?: string | null;
  city?: string | null;
};
type CProject = {
  id: string;
  client_id: string;
  name: string;
  location?: string | null;
  year?: string | null;
  status?: string | null;
  system_description?: string | null;
  scope?: string | null;
  area?: string | null;
  kgs_role?: string | null;
  valuation?: string | null;
  fee?: string | null;
  description?: string | null;
  image_url?: string | null;
  sort_order?: number | null;
};

function ClientsPage() {
  const { data: page, isLoading: pageLoading } = useSingleton<any>("clients_page");
  const { data: clients, isLoading: clientsLoading } = useList<Client>("clients");
  const { data: cProjects, isLoading: cProjectsLoading } = useList<CProject>("client_projects");

  // Featured first, then by sort_order
  const sorted = [...(clients ?? [])].sort((a, b) => {
    const fa = a.featured ? 0 : 1;
    const fb = b.featured ? 0 : 1;
    if (fa !== fb) return fa - fb;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });
  const grouped = sorted.map((c) => ({
    client: c,
    projects: (cProjects ?? [])
      .filter((p) => p.client_id === c.id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
  }));

  const crumb = page?.crumb || (pageLoading ? "Clients" : "Clients");
  const heroEyebrow = page?.hero_eyebrow || (pageLoading ? "Clients & Engagements" : "Clients & Engagements");
  const heroTitle = page?.hero_title || (pageLoading ? "Built with India's most discerning" : "Built with India's most discerning");
  const heroHighlight = page?.hero_highlight || (pageLoading ? "developers." : "developers.");
  const heroSubtitle = page?.hero_subtitle || (pageLoading ? "A selection of the developers and institutions we have partnered with — every engagement engineered end-to-end." : "A selection of the developers and institutions we have partnered with — every engagement engineered end-to-end.");
  
  const stat1Value = page?.stat1_value || (pageLoading ? "40+" : "40+");
  const stat1Label = page?.stat1_label || (pageLoading ? "Developer partners" : "Developer partners");
  const stat2Value = page?.stat2_value || (pageLoading ? "120+" : "120+");
  const stat2Label = page?.stat2_label || (pageLoading ? "Projects delivered" : "Projects delivered");
  const stat3Value = page?.stat3_value || (pageLoading ? "₹ 380 Cr" : "₹ 380 Cr");
  const stat3Label = page?.stat3_label || (pageLoading ? "Engineered value" : "Engineered value");

  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav />
      <main>
        <PageHero
          image={heroImg}
          crumb={crumb}
          eyebrow={heroEyebrow}
          title={heroTitle}
          highlight={heroHighlight}
          subtitle={heroSubtitle}
        />

        {/* Stats strip */}
        <section className="border-y border-line bg-surface">
          <div className="container-kgs grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line">
            {[
              [stat1Value,     stat1Label],
              [stat2Value,    stat2Label],
              [stat3Value, stat3Label],
            ].map(([v, l], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="px-6 md:px-10 py-8 sm:py-10 md:py-14"
              >
                <div className="font-display text-[clamp(1.5rem,2.7vw,2.1rem)] font-medium tracking-tight">{v}</div>
                <div className="mt-1.5 text-[12px] md:text-[13px] font-mono uppercase tracking-[0.18em] text-ink-mute">{l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="relative py-12 md:py-24">
          <div className="container-kgs space-y-24 md:space-y-32">
            {grouped.map(({ client, projects }, idx) => (
              <motion.article
                key={client.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                {/* Client header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-8 border-b border-line">
                  <div className="lg:col-span-7 flex items-center gap-5">
                    <div className="shrink-0 grid place-items-center h-16 w-16 md:h-20 md:w-20 rounded-[var(--radius)] bg-surface border border-line overflow-hidden">
                      {client.logo_url ? (
                        <img
                          src={resolveAsset(client.logo_url)}
                          alt={client.name}
                          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="font-display text-[22px] md:text-[26px] font-semibold text-ink-mute">
                          {client.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-brass flex items-center gap-2">
                        <span>{String(idx + 1).padStart(2, "0")} · Client</span>
                        {client.featured && (
                          <span className="rounded-full bg-brass/15 text-brass px-2 py-0.5 text-[9.5px] tracking-[0.18em]">FEATURED</span>
                        )}
                        {client.sector && <span className="text-ink-mute">· {client.sector}</span>}
                      </div>
                      <h2 className="mt-2 display-section text-[clamp(1.4rem,2.5vw,1.9rem)] leading-[1.05] text-ink group-hover:text-brass transition-colors duration-500">
                        {client.name}
                      </h2>
                      {client.tagline && (
                        <p className="mt-1.5 text-[13.5px] text-ink-dim">{client.tagline}</p>
                      )}
                      {client.slug && (
                        <Link
                          to="/clients/$slug"
                          params={{ slug: client.slug }}
                          className="mt-3 inline-flex items-center gap-1.5 font-display text-[12.5px] font-medium text-brass hover:gap-2.5 transition-all"
                        >
                          View full client profile <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                  {client.description && (
                    <p className="lg:col-span-5 body-lead text-ink-dim max-w-md lg:justify-self-end">
                      {client.description}
                    </p>
                  )}
                </div>

                {/* Projects */}
                {projects.length === 0 ? (
                  <div className="mt-8 text-[13px] text-ink-mute font-mono uppercase tracking-wider">
                    No projects published yet
                  </div>
                ) : (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.55, delay: i * 0.08 }}
                        className="group/card relative rounded-[var(--radius)] border border-line bg-surface hover:border-brass/60 hover:bg-brass-soft/30 transition-all duration-500 overflow-hidden"
                      >
                        {/* Cover */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                          {p.image_url ? (
                            <img
                              src={resolveAsset(p.image_url)}
                              alt={p.name}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover/card:scale-[1.04]"
                            />
                          ) : (
                            <div className="absolute inset-0 grid-bg opacity-60" />
                          )}
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            {p.status && (
                              <span className="rounded-full bg-background/85 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                                {p.status}
                              </span>
                            )}
                            {p.year && (
                              <span className="rounded-full bg-background/85 backdrop-blur px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
                                {p.year}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-7">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-display text-[19px] md:text-[21px] font-semibold tracking-tight text-ink group-hover/card:text-brass transition-colors">
                              {p.name}
                            </h3>
                            {p.location && (
                              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                                {p.location}
                              </span>
                            )}
                          </div>
                          {p.system_description && (
                            <p className="mt-1.5 text-[13px] text-ink-dim">{p.system_description}</p>
                          )}
                          {p.description && (
                            <p className="mt-4 text-[14px] leading-relaxed text-ink-dim">
                              {p.description}
                            </p>
                          )}

                          {p.kgs_role && (
                            <div className="mt-5 rounded-xl border border-line bg-background/60 p-4">
                              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                                KGS Role
                              </div>
                              <div className="mt-1.5 text-[13.5px] text-ink leading-relaxed">{p.kgs_role}</div>
                            </div>
                          )}

                          {/* Spec rows */}
                          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
                            {[
                              ["Scope", p.scope],
                              ["Area", p.area],
                              ["Valuation", p.valuation],
                              ["KGS fee", p.fee],
                            ]
                              .filter(([, v]) => Boolean(v))
                              .map(([k, v]) => (
                                <div key={k as string} className="border-t border-line pt-2.5">
                                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                                    {k}
                                  </dt>
                                  <dd className="mt-1 text-[13.5px] text-ink font-medium">{v}</dd>
                                </div>
                              ))}
                          </dl>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}

            {grouped.length === 0 && (
              <div className="text-center py-20 text-ink-mute font-mono uppercase tracking-wider text-[12px]">
                Client engagements coming soon.
              </div>
            )}
          </div>
        </section>

        <PageCTA
          eyebrow="Next Step"
          title={page?.cta_title ?? (pageLoading ? "Have a project in the pipeline?" : "Have a project in the pipeline?")}
          copy={page?.cta_copy ?? (pageLoading ? "Tell us about the building. We'll come back with a feasibility note within five working days." : "Tell us about the building. We'll come back with a feasibility note within five working days.")}
        />
      </main>
      <Footer />
    </div>
  );
}
