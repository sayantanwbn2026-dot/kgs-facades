import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSingleton, useList } from "@/lib/cms";

const FALLBACK = [
  { n: "01", t: "Survey",      d: "Site assessment, structural review and environmental analysis. Wind-load and seismic data inform every subsequent decision." },
  { n: "02", t: "Design",      d: "Architectural collaboration on system selection, sight-lines, transparency targets and material strategy." },
  { n: "03", t: "Engineering", d: "Detailed shop drawings, BIM coordination, thermal & structural calculations, mockup specification." },
  { n: "04", t: "Fabrication", d: "Italian-grade CNC fabrication of profiles, brackets and glazing units to ±0.5mm tolerance." },
  { n: "05", t: "Assembly",    d: "Unitised panel assembly under controlled factory conditions. 100% pre-installation quality audit." },
  { n: "06", t: "Installation",d: "Trained crews execute on-site installation with weather-tight commissioning and post-handover support." },
];

export function Process() {
  const { data: intro, isLoading: introLoading } = useSingleton<any>("process_intro");
  const { data: rows, isLoading: rowsLoading } = useList<any>("process_steps");
  const steps = rows?.length
    ? rows.map((r, i) => ({
        n: r.number_label || String(i + 1).padStart(2, "0"),
        t: r.title,
        d: r.description,
      }))
    : FALLBACK;
    
  const eyebrow = intro?.eyebrow || (introLoading ? "04 — Engineering Process" : "04 — Engineering Process");
  const headingMain = intro?.heading_main || (introLoading ? "Six disciplines." : "Six disciplines.");
  const headingAccent = intro?.heading_accent || (introLoading ? "One continuous chain." : "One continuous chain.");
  
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    const line = lineRef.current;
    if (!section || !line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="relative bg-background py-12 md:py-24">
      <div className="container-kgs">
        <div className="max-w-2xl mb-8 md:mb-14">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-6 display-section text-balance">
            {headingMain}<br />
            <span className="text-brass italic">{headingAccent}</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-line">
            <div ref={lineRef} className="absolute inset-0 bg-brass origin-top scale-y-0" />
          </div>

          {steps.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={s.n}
                className={[
                  "relative md:col-span-12 grid grid-cols-[40px_1fr] md:grid-cols-12 items-start gap-6 md:gap-10",
                ].join(" ")}
              >
                {/* Node */}
                <div className="md:col-start-6 md:col-span-2 flex justify-start md:justify-center relative">
                  <div className="relative z-10 h-9 w-9 border border-brass bg-background flex items-center justify-center">
                    <span className="h-1.5 w-1.5 bg-brass" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={[
                    "md:row-start-1",
                    left ? "md:col-start-1 md:col-span-5 md:text-right" : "md:col-start-8 md:col-span-5",
                  ].join(" ")}
                >
                  <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                    Step {s.n}
                  </div>
                  <h3 className="mt-3 display-sub text-2xl md:text-[2.1rem] leading-[1.02]">
                    {s.t}
                  </h3>
                  <p className="mt-4 max-w-md md:max-w-none body-lead">
                    {s.d}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}