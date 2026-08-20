import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Nav } from "@/components/kgs/Nav";
import { Footer } from "@/components/kgs/Footer";
import { PageHero } from "@/components/kgs/PageHero";
import { PageCTA } from "@/components/kgs/PageCTA";
import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";
import statementImg from "@/assets/statement.jpg";
import mfg from "@/assets/manufacturing.jpg";

const FALLBACK_TIMELINE = [
  { y: "2001", t: "Founded in Kolkata",      d: "KGS begins as a specialist glazing contractor for premium residences across eastern India." },
  { y: "2008", t: "Curtain wall capability",  d: "Investment in unitised curtain wall engineering and BIM coordination for commercial towers." },
  { y: "2014", t: "80,000 sqft facility",     d: "New fabrication facility commissioned with Italian-grade CNC and unitised assembly lines." },
  { y: "2018", t: "MSME ZED Silver certified",  d: "Recognised under the Government of India's Zero Defect Zero Effect programme for quality, sustainability and process discipline." },
  { y: "2022", t: "100 projects milestone",   d: "Crossed 100 delivered facade projects spanning 12 cities and 8M+ sqft of envelope." },
  { y: "2026", t: "Pan-India engineering",    d: "Engineering hubs supporting national delivery — Kolkata · Mumbai · Bengaluru · NCR." },
];

const FALLBACK_LEADERSHIP = [
  { name: "Rajiv Agarwal",   role: "Managing Director",   bio: "25+ years in facade engineering. Oversees design integrity across the studio's portfolio." },
  { name: "Aritra Sen",      role: "Head of Engineering", bio: "Structural and BIM lead. Coordinates the technical chain from concept through installation." },
  { name: "Meher Bhatia",    role: "Head of Fabrication", bio: "Runs the 80,000 sqft factory — CNC, unitised assembly, QA traceability." },
  { name: "Ishan Kapoor",    role: "Site Operations",     bio: "Leads installation crews and on-site commissioning across India." },
];

const FALLBACK_CERTIFICATIONS = [
  "MSME ZED Silver — Govt. of India",
  "Schüco Authorised Fabricator",
  "Technal Certified Partner",
  "AAMA / EN mockup-tested",
  "GRIHA / IGBC compliant",
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Kolkata Glazing Services" },
      { name: "description", content: "Kolkata Glazing Services (KGS) — two decades of engineering architectural facades across India. Studio, leadership, milestones and certifications." },
      { property: "og:title", content: "About — Kolkata Glazing Services" },
      { property: "og:description", content: "Two decades of engineering architectural facades across India." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { data: page, isLoading: pageLoading } = useSingleton<any>("about_page");
  const { data: tlRows, isLoading: tlLoading } = useList<any>("about_timeline");
  const { data: ldRows, isLoading: ldLoading } = useList<any>("about_leadership");
  const { data: certRows, isLoading: certLoading } = useList<any>("about_certifications");

  const TIMELINE = tlLoading || (tlRows && tlRows.length)
    ? (tlRows ?? []).map((r: any) => ({ y: r.year, t: r.title, d: r.description }))
    : FALLBACK_TIMELINE;
  if (tlLoading && !TIMELINE.length) TIMELINE.push(...FALLBACK_TIMELINE);
  
  const LEADERSHIP = ldLoading || (ldRows && ldRows.length)
    ? (ldRows ?? []).map((r: any) => ({ name: r.name, role: r.role, bio: r.bio, image_url: r.image_url }))
    : FALLBACK_LEADERSHIP.map((l) => ({ ...l, image_url: "" }));
  if (ldLoading && !LEADERSHIP.length) LEADERSHIP.push(...FALLBACK_LEADERSHIP.map((l) => ({ ...l, image_url: "" })));
  
  const CERTIFICATIONS = certLoading || (certRows && certRows.length)
    ? (certRows ?? []).map((r: any) => r.label)
    : FALLBACK_CERTIFICATIONS;
  if (certLoading && !CERTIFICATIONS.length) CERTIFICATIONS.push(...FALLBACK_CERTIFICATIONS);

  const philosophyImg = page?.philosophy_image_url ? resolveAsset(page.philosophy_image_url) : statementImg;
  const factoryImg = page?.factory_image_url ? resolveAsset(page.factory_image_url) : mfg;

  const crumb = page?.crumb ?? (pageLoading ? "About" : "About");
  const heroEyebrow = page?.hero_eyebrow ?? (pageLoading ? "01 — Studio" : "01 — Studio");
  const heroTitle = page?.hero_title ?? (pageLoading ? "We don't install facades." : "We don't install facades.");
  const heroHighlight = page?.hero_highlight ?? (pageLoading ? "We engineer building identities." : "We engineer building identities.");
  const heroSubtitle = page?.hero_subtitle ?? (pageLoading ? "Two decades of integrated facade practice — design, engineering, fabrication and installation, owned by a single accountable team." : "Two decades of integrated facade practice — design, engineering, fabrication and installation, owned by a single accountable team.");
  
  const philosophyEyebrow = page?.philosophy_eyebrow ?? (pageLoading ? "Philosophy" : "Philosophy");
  const philosophyHeading = page?.philosophy_heading ?? (pageLoading ? "A facade is the most visible expression of a building's intent." : "A facade is the most visible expression of a building's intent.");
  
  const paragraph1 = page?.paragraph1 ?? (pageLoading ? "Founded on the conviction that an envelope must perform as precisely as it appears, KGS has spent over two decades crafting facades that are quietly engineered and confidently composed." : "Founded on the conviction that an envelope must perform as precisely as it appears, KGS has spent over two decades crafting facades that are quietly engineered and confidently composed.");
  const paragraph2 = page?.paragraph2 ?? (pageLoading ? "Our practice fuses structural rigour with material restraint. From concept through final installation, every system passes through a single, integrated chain of accountability — no handoffs, no gaps." : "Our practice fuses structural rigour with material restraint. From concept through final installation, every system passes through a single, integrated chain of accountability — no handoffs, no gaps.");
  const paragraph3 = page?.paragraph3 ?? (pageLoading ? "We work in close collaboration with architects, structural consultants and developers — sharing the same drawings, the same tolerances and, ultimately, the same standards." : "We work in close collaboration with architects, structural consultants and developers — sharing the same drawings, the same tolerances and, ultimately, the same standards.");

  const stat1Value = page?.stat1_value ?? (pageLoading ? 25 : 25);
  const stat1Suffix = page?.stat1_suffix ?? (pageLoading ? "+" : "+");
  const stat1Label = page?.stat1_label ?? (pageLoading ? "Years in practice" : "Years in practice");
  const stat2Value = page?.stat2_value ?? (pageLoading ? 100 : 100);
  const stat2Suffix = page?.stat2_suffix ?? (pageLoading ? "+" : "+");
  const stat2Label = page?.stat2_label ?? (pageLoading ? "Projects delivered" : "Projects delivered");
  const stat3Value = page?.stat3_value ?? (pageLoading ? 80000 : 80000);
  const stat3Suffix = page?.stat3_suffix ?? (pageLoading ? " sqft" : " sqft");
  const stat3Label = page?.stat3_label ?? (pageLoading ? "Factory footprint" : "Factory footprint");
  const stat4Value = page?.stat4_value ?? (pageLoading ? 54 : 54);
  const stat4Suffix = page?.stat4_suffix ?? (pageLoading ? "+" : "+");
  const stat4Label = page?.stat4_label ?? (pageLoading ? "Engineers on staff" : "Engineers on staff");


  const timelineEyebrow = page?.timeline_eyebrow ?? (pageLoading ? "Milestones" : "Milestones");
  const timelineHeading = page?.timeline_heading ?? (pageLoading ? "Two decades. Six chapters." : "Two decades. Six chapters.");
  
  const leadershipEyebrow = page?.leadership_eyebrow ?? (pageLoading ? "Leadership" : "Leadership");
  const leadershipHeading = page?.leadership_heading ?? (pageLoading ? "A senior team, hands on every project." : "A senior team, hands on every project.");
  const leadershipIntro = page?.leadership_intro ?? (pageLoading ? "KGS is led by engineers who came up through the trade. Every project carries direct studio oversight from brief to handover." : "KGS is led by engineers who came up through the trade. Every project carries direct studio oversight from brief to handover.");
  
  const factoryLabel = page?.factory_label ?? (pageLoading ? "Facility" : "Facility");
  const factoryName = page?.factory_name ?? (pageLoading ? "Howrah Industrial Estate" : "Howrah Industrial Estate");
  const certificationsEyebrow = page?.certifications_eyebrow ?? (pageLoading ? "Certifications" : "Certifications");
  const certificationsHeading = page?.certifications_heading ?? (pageLoading ? "Audited, certified, accountable." : "Audited, certified, accountable.");
  const certificationsIntro = page?.certifications_intro ?? (pageLoading ? "KGS systems are independently audited and certified across quality, environmental and system-partner programmes." : "KGS systems are independently audited and certified across quality, environmental and system-partner programmes.");
  
  const ctaTitle = page?.cta_title ?? (pageLoading ? "Start a conversation with the studio." : "Start a conversation with the studio.");
  const ctaCopy = page?.cta_copy ?? (pageLoading ? "Whether you're scoping a feasibility study or briefing a landmark tower — talk to a senior engineer at KGS." : "Whether you're scoping a feasibility study or briefing a landmark tower — talk to a senior engineer at KGS.");

  return (
    <main className="bg-background text-ink min-h-screen">
      <Nav />
      <PageHero
        image={statementImg}
        crumb={crumb}
        eyebrow={heroEyebrow}
        title={heroTitle}
        highlight={heroHighlight}
        subtitle={heroSubtitle}
      />

      {/* Statement */}
      <section className="relative bg-background py-12 md:py-24">
        <div className="container-kgs grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <span className="eyebrow">{philosophyEyebrow}</span>
            <h2 className="mt-6 display-section text-balance">
              {philosophyHeading}
            </h2>

            <div className="mt-10 space-y-7 max-w-xl">
              {[
                paragraph1,
                paragraph2,
                paragraph3,
              ].filter(Boolean).map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                  className="body-lead"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-surface rounded-[var(--radius)]"
          >
            <img src={philosophyImg} alt="KGS facade engineer reviewing drawings" loading="lazy" decoding="async" className="h-full w-full object-cover bg-surface grayscale-[20%]" />
            <div className="absolute inset-0 ring-1 ring-inset ring-line rounded-[var(--radius)]" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="bg-surface border-y border-line">
        <div className="container-kgs grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {[
            { v: stat1Value,    suf: stat1Suffix,      l: stat1Label },
            { v: stat2Value,   suf: stat2Suffix,      l: stat2Label },
            { v: stat3Value, suf: stat3Suffix,  l: stat3Label },
            { v: stat4Value,    suf: stat4Suffix,      l: stat4Label },
          ].map((s) => (
            <div key={s.l} className="px-6 py-12 text-center">
              <div className="display-sub text-2xl md:text-[2.1rem] tabular-nums">
                {inView ? <CountUp end={s.v} duration={1.8} separator="," /> : 0}
                <span className="text-brass">{s.suf}</span>
              </div>
              <div className="mt-2 font-display text-[10px] tracking-[0.3em] uppercase text-ink-mute">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-12 md:py-24">
        <div className="container-kgs">
          <div className="max-w-2xl mb-8 md:mb-14">
            <span className="eyebrow">{timelineEyebrow}</span>
            <h2 className="mt-6 display-section text-balance">
              {timelineHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-20 md:gap-y-16 relative">
            <div aria-hidden className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-line -translate-x-1/2" />
            {TIMELINE.map((m, i) => {
              const left = i % 2 === 0;
              return (
              <motion.div
                key={m.y}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className={`relative border-t border-line pt-6 md:border-t-0 md:pt-0 ${
                  left ? "md:text-right md:pr-12" : "md:mt-32 md:pl-12"
                }`}
              >
                {/* Desktop center dot */}
                <div 
                  className={`hidden md:block absolute top-1.5 w-2 h-2 rounded-full bg-brass ${
                    left ? "-right-[45px]" : "-left-[45px]"
                  }`} 
                />
                
                <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">{m.y}</div>
                <h3 className="mt-3 display-sub text-xl md:text-[1.6rem]">{m.t}</h3>
                <p className={`mt-4 body-lead max-w-md ${left ? "ml-auto" : ""}`}>{m.d}</p>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-surface py-12 md:py-24">
        <div className="container-kgs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
            <div className="lg:col-span-7">
              <span className="eyebrow">{leadershipEyebrow}</span>
              <h2 className="mt-6 display-section text-balance">
                {leadershipHeading}
              </h2>
            </div>
            <p className="lg:col-span-5 self-end body-lead max-w-md">
              {leadershipIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
            {LEADERSHIP.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group relative bg-surface p-8 md:p-10 flex flex-col items-center text-center hover:bg-background transition-colors duration-500"
              >
                <div className="relative aspect-square w-full shrink-0 rounded-[var(--radius)] bg-gradient-to-br from-surface-2 via-brass-soft to-surface-2 ring-1 ring-line overflow-hidden mb-2">
                  {l.image_url ? (
                    <img src={resolveAsset(l.image_url)} alt={l.name} className="absolute inset-0 h-full w-full object-cover bg-surface grayscale-[20%]" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center font-display text-4xl font-semibold text-brass">
                      {l.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                  )}
                </div>
                <div className="mt-6 font-display text-[10px] tracking-[0.3em] uppercase text-brass">{l.role}</div>
                <h3 className="mt-2 display-sub text-xl md:text-2xl">{l.name}</h3>
                <p className="mt-3 text-[13.5px] text-ink-dim leading-relaxed">{l.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory + Certifications */}
      <section className="bg-background py-12 md:py-24">
        <div className="container-kgs grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-6 relative aspect-[4/5] md:aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-line bg-surface"
          >
            <img src={factoryImg} alt="KGS fabrication facility" loading="lazy" decoding="async" className="h-full w-full object-cover bg-surface" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-ink/70 to-transparent">
              <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass-soft/90">{factoryLabel}</div>
              <div className="mt-2 display-sub text-white text-2xl md:text-3xl">{factoryName}</div>
            </div>
          </motion.div>

          <div className="lg:col-span-6">
            <span className="eyebrow">{certificationsEyebrow}</span>
            <h2 className="mt-6 display-section text-balance">
              {certificationsHeading}
            </h2>
            <p className="mt-6 body-lead max-w-md">
              {certificationsIntro}
            </p>

            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="bg-background px-5 py-5 flex items-center gap-3">
                  <span className="grid place-items-center h-6 w-6 rounded-full bg-brass-soft text-brass">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5.5L4 8l4.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-display text-[13.5px] text-ink-dim">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageCTA
        title={ctaTitle}
        copy={ctaCopy}
      />
      <Footer />
    </main>
  );
}