import { motion } from "framer-motion";
import { useSingleton, useList } from "@/lib/cms";

const FALLBACK = [
  {
    n: "01",
    t: "Quality Driven",
    d: "MSME ZED Silver certified processes, third-party mockup testing and a documented quality audit at every stage of fabrication and installation.",
  },
  {
    n: "02",
    t: "Precision Engineered",
    d: "BIM-coordinated detailing, wind-tunnel verified systems and ±0.5mm fabrication tolerances. Every interface engineered, never assumed.",
  },
  {
    n: "03",
    t: "End-to-End Delivery",
    d: "From feasibility study to handover, KGS owns the full chain — design, engineering, fabrication, installation and post-occupancy support.",
  },
];

export function Why() {
  const { data: intro, isLoading: introLoading } = useSingleton<any>("why_intro");
  const { data: rows, isLoading: rowsLoading } = useList<any>("why_cards");
  const cards = rows?.length
    ? rows.map((r, i) => ({
        n: r.number_label || String(i + 1).padStart(2, "0"),
        t: r.title,
        d: r.description,
      }))
    : FALLBACK;

  const eyebrow = intro?.eyebrow || (introLoading ? "06 — Why KGS" : "06 — Why KGS");
  const heading =
    intro?.heading ||
    (introLoading
      ? "Three principles. Held without compromise."
      : "Three principles. Held without compromise.");

  return (
    <section className="relative bg-surface-2 py-12 md:py-24">
      <div className="container-kgs">
        <div className="max-w-3xl mb-7 md:mb-10">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-6 display-section text-balance">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line items-start">
          {cards.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-surface-2 p-8 md:p-10 min-h-[230px] md:min-h-[300px] flex flex-col justify-between hover:bg-surface transition-colors duration-700"
            >
              <div>
                <span className="font-display text-[10px] tracking-[0.3em] text-brass">{c.n}</span>
                <h3 className="mt-6 display-sub text-2xl md:text-[1.95rem]">{c.t}</h3>
              </div>
              <p className="mt-6 body-lead">{c.d}</p>
              <div className="mt-8 h-px w-12 bg-brass transition-all duration-700 group-hover:w-32" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
