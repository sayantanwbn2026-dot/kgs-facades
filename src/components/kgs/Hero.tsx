import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useSingleton } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";
import heroBg from "@/assets/hero-facade.jpg";

export function Hero() {
  const { ref: statsRef, inView: statsIn } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { data: h, isLoading } = useSingleton<any>("hero");

  const stat1 = h?.stat1_value ?? (isLoading ? 25 : 25);
  const stat2 = h?.stat2_value ?? (isLoading ? 100 : 100);
  const stat3 = h?.stat3_value ?? (isLoading ? 54 : 54);

  const stats = [
    { v: stat1, suf: h?.stat1_suffix ?? "+", l: h?.stat1_label ?? "Years experience" },
    { v: stat2, suf: h?.stat2_suffix ?? "+", l: h?.stat2_label ?? "Projects delivered" },
    { v: stat3, suf: h?.stat3_suffix ?? "+", l: h?.stat3_label ?? "Engineers on staff" },
  ];

  // Optional CMS-uploaded logo — falls back to the built-in monogram when empty.
  const logoUrl = resolveAsset(h?.logo_url);

  const [bgLoaded, setBgLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setBgLoaded(true), 400);
    return () => clearTimeout(t);
  }, []);

  const ease = [0.22, 1, 0.36, 1] as const;
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: bgLoaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden min-h-[100svh] flex flex-col text-white"
    >
      {/* Background photograph — full bleed */}
      <div
        className={`absolute inset-0 -z-20 overflow-hidden transition-opacity duration-[1200ms] ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={resolveAsset((h as any)?.background_image_url) || heroBg}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          onLoad={() => setBgLoaded(true)}
          onError={() => setBgLoaded(true)}
          className={`h-full w-full object-cover ${bgLoaded ? "hero-breathe" : ""}`}
        />
      </div>

      {/* Two scrims: a soft cap for nav legibility, a deeper foot for the content */}
      <div className="absolute inset-x-0 top-0 h-48 -z-10 bg-gradient-to-b from-ink/55 via-ink/20 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/88 via-ink/28 via-42% to-transparent" />

      <div className="container-kgs relative flex flex-1 flex-col justify-end pt-24 md:pt-28 pb-7 md:pb-12">
        <div className="flex flex-col items-start gap-6 md:gap-8">
          {/* Left — logo lockup: mark │ divider │ three-line wordmark */}
          <motion.div {...rise(0.2)} className="flex items-center gap-4 md:gap-6">
            {/* Logo mark — CMS-uploaded logo if present, else the built-in
                mirrored-K monogram in architectural line-work. */}
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Kolkata Glazing Services"
                loading="eager"
                decoding="async"
                className="h-[72px] w-auto shrink-0 object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:h-[100px]"
              />
            ) : (
              <svg
                viewBox="0 0 84 100"
                role="img"
                aria-label="Kolkata Glazing Services"
                className="h-[72px] w-auto shrink-0 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] md:h-[100px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <path d="M18 6 L18 94 M18 50 L44 6 M18 50 L44 94" />
                <path d="M66 6 L66 94 M66 50 L40 6 M66 50 L40 94" />
              </svg>
            )}

            {/* Divider */}
            <span className="h-[72px] w-px shrink-0 bg-white/30 md:h-[100px]" />

            {/* Wordmark — three stacked lines */}
            <h1 className="font-display text-[clamp(1.35rem,4.6vw,2.1rem)] font-semibold uppercase leading-[1.06] tracking-[0.1em] text-white">
              <span className="block">Kolkata</span>
              <span className="block">Glazing</span>
              <span className="block">Services</span>
            </h1>
          </motion.div>

          {/* Right — stat rail, sharing the lockup's foot line */}
          <motion.div ref={statsRef} {...rise(0.5)} className="flex items-start shrink-0">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={
                  i === 0 ? "pr-5 md:pr-8" : "px-5 md:px-8 border-l border-white/20 last:pr-0"
                }
              >
                <div className="font-display text-[clamp(1.5rem,2.9vw,2.3rem)] font-medium tracking-[-0.045em] text-white tabular-nums leading-none">
                  {statsIn && bgLoaded ? <CountUp end={s.v} duration={1.8} delay={0.7} /> : 0}
                  <span className="text-brass-soft">{s.suf}</span>
                </div>
                <div className="mt-2.5 font-mono text-[9.5px] uppercase tracking-[0.11em] leading-tight text-white/50 max-w-[11ch] md:text-[10.5px]">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={bgLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <span className="block h-8 w-px overflow-hidden bg-white/15">
          <span className="scroll-line-anim block h-full w-full origin-top bg-white/70" />
        </span>
      </motion.div>
    </section>
  );
}
