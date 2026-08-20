import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/kgs/Nav";
import { Footer } from "@/components/kgs/Footer";
import { PageHero } from "@/components/kgs/PageHero";
import heroImg from "@/assets/manufacturing.jpg";
import { PageCTA } from "@/components/kgs/PageCTA";
import { useSingleton, useList } from "@/lib/cms";

const FALLBACK_STEPS = [
  {
    n: "01", t: "Survey", weeks: "Wk 1–2",
    d: "Site assessment, structural review, environmental and wind-load context. Every constraint mapped before a single line is drawn.",
    deliverables: ["Site report", "Wind/seismic data", "Structural compatibility"],
  },
  {
    n: "02", t: "Design", weeks: "Wk 2–5",
    d: "Architectural collaboration on system selection, sight-lines, transparency targets and the material strategy.",
    deliverables: ["Concept facade study", "System options", "Material samples"],
  },
  {
    n: "03", t: "Engineering", weeks: "Wk 4–9",
    d: "BIM-coordinated shop drawings, thermal & structural calculations, mockup specification, performance modelling.",
    deliverables: ["Shop drawings", "Thermal report", "Mockup specification"],
  },
  {
    n: "04", t: "Fabrication", weeks: "Wk 8–16",
    d: "Italian-grade CNC fabrication of profiles, brackets and glazing units to ±0.5mm tolerance, barcoded for traceability.",
    deliverables: ["CNC profiles", "Bracketry", "QA traceability sheets"],
  },
  {
    n: "05", t: "Assembly", weeks: "Wk 14–20",
    d: "Unitised panel assembly under controlled factory conditions. 100% pre-installation quality audit before despatch.",
    deliverables: ["Unitised panels", "Pre-install QA", "Packing & logistics"],
  },
  {
    n: "06", t: "Installation", weeks: "Wk 18+",
    d: "Trained crews execute on-site installation with weather-tight commissioning and structured handover support.",
    deliverables: ["On-site install", "Weather testing", "Handover documentation"],
  },
];

const FALLBACK_PRINCIPLES = [
  { k: "Single chain", v: "One accountable team — design through handover." },
  { k: "Documented", v: "Every interface, calculation and tolerance signed off." },
  { k: "Tested", v: "Wind tunnel, mockup and on-site water testing." },
  { k: "Coordinated", v: "BIM-coordinated with structural and MEP early." },
];

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — KGS Facade Engineering" },
      { name: "description", content: "Six disciplines, one continuous chain — KGS's end-to-end facade engineering process from survey to handover." },
      { property: "og:title", content: "Process — KGS Facade Engineering" },
      { property: "og:description", content: "The KGS facade engineering process: survey, design, engineering, fabrication, assembly, installation." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const { data: page, isLoading: pageLoading } = useSingleton<any>("process_page");
  const { data: stepRows, isLoading: stepsLoading } = useList<any>("process_steps");
  const { data: principleRows, isLoading: principlesLoading } = useList<any>("process_principles");

  const STEPS = stepsLoading || (stepRows && stepRows.length)
    ? (stepRows ?? []).map((r: any) => ({
        n: r.number_label ?? "", t: r.title ?? "", weeks: r.weeks ?? "", d: r.description ?? "",
        deliverables: [r.deliverable1, r.deliverable2, r.deliverable3].filter(Boolean),
      }))
    : FALLBACK_STEPS;
  if (stepsLoading && !STEPS.length) STEPS.push(...FALLBACK_STEPS);
  
  const PRINCIPLES = principlesLoading || (principleRows && principleRows.length)
    ? (principleRows ?? []).map((r: any) => ({ k: r.key ?? "", v: r.value ?? "" }))
    : FALLBACK_PRINCIPLES;
  if (principlesLoading && !PRINCIPLES.length) PRINCIPLES.push(...FALLBACK_PRINCIPLES);

  const crumb = page?.crumb || (pageLoading ? "Process" : "Process");
  const heroEyebrow = page?.hero_eyebrow || (pageLoading ? "04 — Engineering Process" : "04 — Engineering Process");
  const heroTitle = page?.hero_title || (pageLoading ? "Six disciplines." : "Six disciplines.");
  const heroHighlight = page?.hero_highlight || (pageLoading ? "One continuous chain." : "One continuous chain.");
  const heroSubtitle = page?.hero_subtitle || (pageLoading ? "A facade is only as strong as its weakest interface. KGS owns every stage from survey to handover — no handoffs, no gaps, no assumptions." : "A facade is only as strong as its weakest interface. KGS owns every stage from survey to handover — no handoffs, no gaps, no assumptions.");
  
  const timelineEyebrow = page?.timeline_eyebrow || (pageLoading ? "The chain" : "The chain");
  const timelineHeading = page?.timeline_heading || (pageLoading ? "From first survey to final handover." : "From first survey to final handover.");
  const deliverablesEyebrow = page?.deliverables_eyebrow || (pageLoading ? "Deliverables" : "Deliverables");
  const deliverablesHeading = page?.deliverables_heading || (pageLoading ? "What you receive at every stage." : "What you receive at every stage.");
  const ctaTitle = page?.cta_title || (pageLoading ? "Bring us in early. The earlier we engage, the cleaner the envelope." : "Bring us in early. The earlier we engage, the cleaner the envelope.");
  const ctaCopy = page?.cta_copy || (pageLoading ? "The first conversation is a structured briefing — no obligation. We'll outline systems, tolerances and an indicative programme for your project." : "The first conversation is a structured briefing — no obligation. We'll outline systems, tolerances and an indicative programme for your project.");

  return (
    <main className="bg-background text-ink min-h-screen">
      <Nav />
      <PageHero
        image={heroImg}
        crumb={crumb}
        eyebrow={heroEyebrow}
        title={heroTitle}
        highlight={heroHighlight}
        subtitle={heroSubtitle}
      />

      {/* Principles bar */}
      <section className="bg-surface border-y border-line">
        <div className="container-kgs grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {PRINCIPLES.map((p) => (
            <div key={p.k} className="px-6 py-10">
              <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">{p.k}</div>
              <div className="mt-3 font-display text-sm text-ink-dim leading-relaxed">{p.v}</div>
            </div>
          ))}
        </div>
      </section>

      <ProcessTimeline steps={STEPS} eyebrow={timelineEyebrow} heading={timelineHeading} />

      {/* Deliverables matrix */}
      <section className="bg-surface py-12 md:py-24">
        <div className="container-kgs">
          <div className="max-w-2xl mb-8 md:mb-14">
            <span className="eyebrow">{deliverablesEyebrow}</span>
            <h2 className="mt-6 display-section text-balance">
              {deliverablesHeading}
            </h2>
          </div>

          <div className="border-t border-line">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="group grid grid-cols-12 gap-6 items-start border-b border-line py-8 md:py-10 hover:bg-background transition-colors"
              >
                <div className="col-span-2 md:col-span-1 font-display text-[10px] tracking-[0.3em] uppercase text-brass">{s.n}</div>
                <div className="col-span-10 md:col-span-3 display-sub text-xl md:text-2xl">{s.t}</div>
                <div className="col-span-12 md:col-span-3 font-display text-[12px] tracking-[0.2em] uppercase text-ink-mute">{s.weeks}</div>
                <div className="col-span-12 md:col-span-5 flex flex-wrap gap-2">
                  {s.deliverables.map((d: string) => (
                    <span key={d} className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1.5 font-display text-[11px] text-ink-dim">
                      <span className="h-1 w-1 rounded-full bg-brass" />
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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

function ProcessTimeline({ steps, eyebrow, heading }: { steps: typeof FALLBACK_STEPS; eyebrow: string; heading: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = ref.current;
    const line = lineRef.current;
    if (!section || !line) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.5,
          onUpdate: (st) => {
            const idx = Math.min(steps.length - 1, Math.floor(st.progress * steps.length));
            setActiveIdx(idx);
          },
        },
      });
    }, section);
    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section ref={ref} className="relative bg-background py-12 md:py-24">
      <div className="container-kgs">
        <div className="max-w-2xl mb-8 md:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-6 display-section text-balance">
            {heading}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24">
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-line">
            <div ref={lineRef} className="absolute inset-0 bg-brass origin-top scale-y-0" />
          </div>

          {steps.map((s, i) => {
            const left = i % 2 === 0;
            const isActive = i <= activeIdx;
            return (
              <div
                key={s.n}
                className="relative md:col-span-12 grid grid-cols-[40px_1fr] md:grid-cols-12 items-start gap-6 md:gap-10"
              >
                <div className="md:col-start-6 md:col-span-2 flex justify-start md:justify-center relative">
                  <div className={`relative z-10 h-9 w-9 border bg-background flex items-center justify-center transition-colors duration-500 ${isActive ? "border-brass" : "border-line"}`}>
                    <span className={`h-1.5 w-1.5 transition-colors duration-500 ${isActive ? "bg-brass" : "bg-line"}`} />
                  </div>
                </div>

                <div
                  className={[
                    "md:row-start-1",
                    left ? "md:col-start-1 md:col-span-5 md:text-right" : "md:col-start-8 md:col-span-5",
                  ].join(" ")}
                >
                  <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                    Step {s.n} · {s.weeks}
                  </div>
                  <h3 className="mt-3 display-sub text-2xl md:text-[2.1rem] leading-[1.02]">{s.t}</h3>
                  <p className="mt-4 max-w-md md:max-w-none body-lead">{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}