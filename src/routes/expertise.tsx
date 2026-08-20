import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "@/components/kgs/Nav";
import { Footer } from "@/components/kgs/Footer";
import { PageHero } from "@/components/kgs/PageHero";
import { PageCTA } from "@/components/kgs/PageCTA";
import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";
import structural from "@/assets/exp-structural.jpg";
import curtain from "@/assets/exp-curtain.jpg";
import spider from "@/assets/exp-spider.jpg";
import acp from "@/assets/exp-acp.jpg";
import windowImg from "@/assets/exp-window.jpg";
import skylight from "@/assets/exp-skylight.jpg";

type Cap = { n: string; img: string; title: string; short: string; body: string; specs: { k: string; v: string }[] };
const FALLBACK_CAPS: Cap[] = [
  {
    n: "01", img: structural, title: "Structural Glazing",
    short: "Frameless silicone-bonded systems for uninterrupted vision lines.",
    body: "Two-sided and four-sided silicone-bonded systems engineered for high-rise wind loads. Edge details and deflection are coordinated with the primary structure from concept stage.",
    specs: [
      { k: "Glass thickness", v: "8 — 19mm + IGU" },
      { k: "Wind capacity",   v: "Up to 3.5 kPa" },
      { k: "U-value",         v: "1.1 W/m²K (IGU)" },
      { k: "Tolerance",       v: "±0.5mm fabrication" },
    ],
  },
  {
    n: "02", img: curtain, title: "Curtain Wall Systems",
    short: "Unitised and stick-built envelopes engineered for tall buildings.",
    body: "Schüco and Technal-grade unitised systems for fast envelope close-in, plus stick-built systems where geometry demands flexibility. All systems are mockup-tested to AAMA / EN standards.",
    specs: [
      { k: "System type",   v: "Unitised · Stick · Hybrid" },
      { k: "Floor cycle",   v: "1 floor / 7 days" },
      { k: "Air infiltration", v: "≤ 0.3 L/s·m²" },
      { k: "Acoustics",     v: "Rw 38 — 45 dB" },
    ],
  },
  {
    n: "03", img: spider, title: "Spider Glazing",
    short: "Point-fixed transparency at architectural scale.",
    body: "316-grade stainless fittings, rotule details and tension-rod cable nets. Designed for lobbies, atriums and signature retail facades where minimal interruption is essential.",
    specs: [
      { k: "Fitting grade", v: "AISI 316" },
      { k: "Glass",         v: "Toughened + heat-soaked" },
      { k: "Span",          v: "Up to 14m unsupported" },
      { k: "Load",          v: "Wind / seismic engineered" },
    ],
  },
  {
    n: "04", img: acp, title: "ACP Cladding",
    short: "Aluminium composite cladding fabricated to mm tolerances.",
    body: "PVDF, PE and brushed finishes; FR-grade cores per IS 14021. Tray-style and route-and-return details, fabricated in-house with disciplined finish-batch matching.",
    specs: [
      { k: "Finish",      v: "PVDF · PE · Brushed" },
      { k: "Core",        v: "FR / Standard" },
      { k: "Panel size",  v: "Up to 1500 × 4000mm" },
      { k: "Joint",       v: "Open / Sealed" },
    ],
  },
  {
    n: "05", img: windowImg, title: "Premium Window Systems",
    short: "European-grade aluminium and uPVC fenestration.",
    body: "Schüco, Technal and Hindalco platforms — sliding, tilt-turn, casement and pivot systems with engineered hardware and tested gaskets for performance-critical residences.",
    specs: [
      { k: "Platforms",  v: "Schüco · Technal · Hindalco" },
      { k: "Types",      v: "Slide · Tilt-Turn · Pivot" },
      { k: "U-value",    v: "Down to 0.8 W/m²K" },
      { k: "Sound",      v: "Up to 42 dB Rw" },
    ],
  },
  {
    n: "06", img: skylight, title: "Skylights & Louvers",
    short: "Daylighting and modulated solar control structures.",
    body: "Pyramid, vault and free-form skylights with engineered drainage. External louver systems — aluminium, terracotta and timber — that modulate light, heat and air for the local climate.",
    specs: [
      { k: "Forms",       v: "Pyramid · Vault · Free-form" },
      { k: "Glass",       v: "Laminated low-iron" },
      { k: "Louvers",     v: "Aluminium · Terracotta · Timber" },
      { k: "Drainage",    v: "Integrated gutters" },
    ],
  },
];

const COMPARE_HEADS = ["Capability", "Glass", "Tolerance", "Use case"];
const FALLBACK_COMPARE_ROWS = [
  ["Structural Glazing", "8–19mm IGU", "±0.5mm", "Towers · Lobbies"],
  ["Unitised Curtain Wall", "IGU + spandrel", "±0.8mm", "High-rise commercial"],
  ["Spider Glazing", "Toughened HS", "±1.0mm", "Atrium · Retail"],
  ["ACP Cladding", "—", "±0.5mm", "Soffits · Facades"],
  ["Window Systems", "Double / Triple", "±0.5mm", "Residences · Hotels"],
  ["Skylights & Louvers", "Laminated low-iron", "±0.8mm", "Roofs · Courts"],
];

export const Route = createFileRoute("/expertise")({
  head: () => ({
    meta: [
      { title: "Expertise — KGS Facade Engineering" },
      { name: "description", content: "Six core facade disciplines — structural glazing, curtain walls, spider glazing, ACP, window systems and skylights — engineered end-to-end by KGS." },
      { property: "og:title", content: "Expertise — KGS Facade Engineering" },
      { property: "og:description", content: "Six facade disciplines engineered end-to-end by KGS." },
    ],
  }),
  component: ExpertisePage,
});

function ExpertisePage() {
  const { data: page, isLoading: pageLoading } = useSingleton<any>("expertise_page");
  const { data: items, isLoading: itemsLoading } = useList<any>("expertise_items");
  const { data: compare, isLoading: compareLoading } = useList<any>("expertise_compare");

  const CAPS: Cap[] = itemsLoading || (items && items.length)
    ? (items ?? []).map((r: any) => ({
        n: r.number_label ?? "",
        img: resolveAsset(r.image_url),
        title: r.title ?? "",
        short: r.short_description || r.description || "",
        body: r.body || r.description || "",
        specs: [1,2,3,4].map((i) => ({ k: r[`spec${i}_key`], v: r[`spec${i}_value`] })).filter((s) => s.k || s.v),
      }))
    : FALLBACK_CAPS;
  if (itemsLoading && !CAPS.length) CAPS.push(...FALLBACK_CAPS);
  
  const COMPARE_ROWS = compareLoading || (compare && compare.length)
    ? (compare ?? []).map((r: any) => [r.capability, r.glass, r.tolerance, r.use_case])
    : FALLBACK_COMPARE_ROWS;
  if (compareLoading && !COMPARE_ROWS.length) COMPARE_ROWS.push(...FALLBACK_COMPARE_ROWS);

  const [active, setActive] = useState(0);
  const cap = CAPS[Math.min(active, CAPS.length - 1)];
  
  const crumb = page?.crumb || (pageLoading ? "Expertise" : "Expertise");
  const heroEyebrow = page?.hero_eyebrow || (pageLoading ? "02 — Capabilities" : "02 — Capabilities");
  const heroTitle = page?.hero_title || (pageLoading ? "A complete envelope" : "A complete envelope");
  const heroHighlight = page?.hero_highlight || (pageLoading ? "of facade disciplines." : "of facade disciplines.");
  const heroSubtitle = page?.hero_subtitle || (pageLoading ? "From feasibility and wind-tunnel analysis to mockup, fabrication and installation — six core systems, integrated under one roof." : "From feasibility and wind-tunnel analysis to mockup, fabrication and installation — six core systems, integrated under one roof.");
  
  const tabsEyebrow = page?.tabs_eyebrow || (pageLoading ? "Disciplines" : "Disciplines");
  const tabsHeading = page?.tabs_heading || (pageLoading ? "Pick a capability —" : "Pick a capability —");
  const tabsHeadingAccent = page?.tabs_heading_accent || (pageLoading ? "see the spec." : "see the spec.");
  
  const matrixEyebrow = page?.matrix_eyebrow || (pageLoading ? "Specification matrix" : "Specification matrix");
  const matrixHeading = page?.matrix_heading || (pageLoading ? "Compare systems side by side." : "Compare systems side by side.");
  const ctaTitle = page?.cta_title || (pageLoading ? "Not sure which system fits your envelope?" : "Not sure which system fits your envelope?");
  const ctaCopy = page?.cta_copy || (pageLoading ? "Tell us the building type and constraints. We'll return with shortlisted systems, indicative tolerances and a comparative performance note." : "Tell us the building type and constraints. We'll return with shortlisted systems, indicative tolerances and a comparative performance note.");

  return (
    <main className="bg-background text-ink min-h-screen">
      <Nav />
      <PageHero
        image={curtain}
        crumb={crumb}
        eyebrow={heroEyebrow}
        title={heroTitle}
        highlight={heroHighlight}
        subtitle={heroSubtitle}
      />

      {/* Interactive split: tabs + visual */}
      <section className="bg-background pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="container-kgs">
          {/* Full-width header so the tab list and the visual below start on the
              same line, instead of the image floating up beside the heading. */}
          <div className="max-w-2xl">
            <span className="eyebrow">{tabsEyebrow}</span>
            <h2 className="mt-5 display-section">
              {tabsHeading}<br />
              <span className="shimmer-text">{tabsHeadingAccent}</span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Tabs */}
            <div className="lg:col-span-5">
              <div className="flex flex-col">
                {CAPS.map((c, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={c.title}
                      onClick={() => setActive(i)}
                      className={`group relative text-left border-t border-line px-4 -mx-4 rounded-[var(--radius)] py-5 transition-colors ${isActive ? "text-ink bg-brass/5" : "text-ink-dim hover:text-ink hover:bg-surface-2"}`}
                    >
                      <div className="flex items-center gap-5">
                        <span className={`font-display text-[10px] tracking-[0.3em] transition-colors ${isActive ? "text-brass" : "text-ink/40"}`}>
                          {c.n}
                        </span>
                        <span className={`h-px transition-all duration-500 ${isActive ? "w-12 bg-brass" : "w-6 bg-line"}`} />
                        <span className="display-sub text-xl md:text-2xl flex-1">{c.title}</span>
                        <span className={`font-display text-lg transition-transform duration-500 ${isActive ? "rotate-45 text-brass" : "text-ink/40"}`}>+</span>
                      </div>
                    </button>
                  );
                })}
                <div className="border-t border-line" />
              </div>
            </div>

            {/* Visual + spec */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative aspect-[4/5] md:aspect-[5/4] overflow-hidden rounded-[var(--radius)] border border-line bg-surface">
                    <img src={cap.img} alt={cap.title} className="absolute inset-0 h-full w-full object-cover bg-surface" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass-soft/90">{cap.n} · System</div>
                      <div className="mt-2 display-sub text-white text-2xl md:text-3xl">{cap.title}</div>
                    </div>
                  </div>

                  <p className="mt-8 body-lead max-w-xl">{cap.body}</p>

                  <div className="mt-8 grid grid-cols-2 gap-px bg-line border border-line">
                    {cap.specs.map((s) => (
                      <div key={s.k} className="bg-background p-5 md:p-6">
                        <div className="font-display text-[10px] tracking-[0.3em] uppercase text-ink/40">{s.k}</div>
                        <div className="mt-2 display-sub text-base md:text-lg">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison matrix */}
      <section className="bg-surface py-12 md:py-24">
        <div className="container-kgs">
          <div className="max-w-2xl mb-8 md:mb-14">
            <span className="eyebrow">{matrixEyebrow}</span>
            <h2 className="mt-6 display-section text-balance">
              {matrixHeading}
            </h2>
          </div>

          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full min-w-[720px] border-t border-line">
              <thead>
                <tr className="border-b border-line">
                  {COMPARE_HEADS.map((h) => (
                    <th key={h} className="text-left py-5 px-4 font-display text-[10px] tracking-[0.3em] uppercase text-brass">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="border-b border-line group hover:bg-background transition-colors"
                  >
                    {row.map((cell, j) => (
                      <td key={j} className={`py-5 px-4 ${j === 0 ? "display-sub text-base md:text-lg" : "font-display text-sm text-ink-dim"}`}>
                        {cell}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
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