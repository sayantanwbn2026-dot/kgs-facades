import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import mfg from "@/assets/manufacturing.jpg";
import { useSingleton } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";

export function Manufacturing() {
  const { data: m, isLoading } = useSingleton<any>("manufacturing");
  const caps = [
    m?.capability1 || (isLoading ? "Advanced CNC Cutting Systems" : "Advanced CNC Cutting Systems"),
    m?.capability2 || (isLoading ? "Italian Fabrication Equipment" : "Italian Fabrication Equipment"),
    m?.capability3 || (isLoading ? "Precision Assembly Lines" : "Precision Assembly Lines"),
    m?.capability4 || (isLoading ? "In-house Quality Control" : "In-house Quality Control"),
  ];

  const stat1v = m?.stat1_value ?? (isLoading ? 80000 : 80000);
  const stat2v = m?.stat2_value ?? (isLoading ? 0.5 : 0.5);
  const stat3v = m?.stat3_value ?? (isLoading ? 12 : 12);
  const stat4v = m?.stat4_value ?? (isLoading ? 100 : 100);

  const stats = [
    { v: stat1v, suf: m?.stat1_suffix ?? " sqft", l: m?.stat1_label ?? "Factory Footprint", dec: m?.stat1_decimals ?? 0 },
    { v: stat2v, suf: m?.stat2_suffix ?? " mm", l: m?.stat2_label ?? "Fabrication Tolerance", dec: m?.stat2_decimals ?? 1 },
    { v: stat3v, suf: m?.stat3_suffix ?? "+", l: m?.stat3_label ?? "CNC Stations", dec: m?.stat3_decimals ?? 0 },
    { v: stat4v, suf: m?.stat4_suffix ?? "%", l: m?.stat4_label ?? "Pre-Install QA", dec: m?.stat4_decimals ?? 0 },
  ];

  const eyebrow = m?.eyebrow || (isLoading ? "05 — Manufacturing" : "05 — Manufacturing");
  const heading = m?.heading || (isLoading ? "An 80,000 sqft facility engineered for tolerance." : "An 80,000 sqft facility engineered for tolerance.");
  const description =
    m?.description ||
    (isLoading
      ? "European fabrication equipment paired with disciplined process control. Every panel is measured, audited and barcoded before it leaves the floor."
      : "European fabrication equipment paired with disciplined process control. Every panel is measured, audited and barcoded before it leaves the floor.");

  const imgSrc = resolveAsset(m?.image_url) || mfg;
  const { ref: statsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="relative bg-surface py-12 md:py-28">
      <div className="container-kgs">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-5 md:mt-6 display-section text-balance">{heading}</h2>
          <p className="mt-5 md:mt-6 body-lead max-w-xl">{description}</p>
        </div>

        {/* One cinematic image — replaces the old faded parallax backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 md:mt-14 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[var(--radius)] border border-line bg-background"
        >
          <img
            src={imgSrc}
            alt="KGS fabrication facility"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
          {/* Capabilities float on the image foot on larger screens */}
          <div className="absolute inset-x-0 bottom-0 hidden md:flex flex-wrap gap-x-8 gap-y-2 p-7 text-white/90">
            {caps.map((c, i) => (
              <span key={c} className="inline-flex items-center gap-2.5 font-display text-[13px]">
                <span className="font-mono text-[10px] text-brass-soft">0{i + 1}</span>
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Capabilities as a plain list on mobile, where overlaying them would crowd the photo */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 md:hidden">
          {caps.map((c, i) => (
            <span key={c} className="inline-flex items-center gap-2.5 font-display text-[13px] text-ink-dim">
              <span className="font-mono text-[10px] text-brass">0{i + 1}</span>
              {c}
            </span>
          ))}
        </div>

        {/* Stat row — light and divided, no heavy boxes */}
        <div
          ref={statsRef}
          className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-line"
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={[
                "py-6 md:py-8",
                // vertical rules between columns, no rule before the first in a row
                i % 2 !== 0 ? "border-l border-line pl-5 md:pl-0" : "",
                "md:border-l md:first:border-l-0 md:pl-8 md:first:pl-0",
                // horizontal rule between the two mobile rows
                i < 2 ? "border-b border-line md:border-b-0" : "",
              ].join(" ")}
            >
              <div className="display-sub text-[1.9rem] md:text-[2.4rem] tabular-nums leading-none">
                {inView ? <CountUp end={s.v} duration={1.8} decimals={s.dec ?? 0} separator="," /> : 0}
                <span className="text-brass">{s.suf}</span>
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
