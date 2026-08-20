import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        >
          {/* Architectural grid lines — subtle */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-y-0 left-1/4 w-px bg-white" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
            <div className="absolute inset-y-0 left-3/4 w-px bg-white" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-white" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-white" />
          </div>

          {/* Logo mark + wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="flex items-center gap-5 md:gap-7">
              {/* Mirrored-K monogram */}
              <svg
                viewBox="0 0 84 100"
                role="img"
                aria-label="Kolkata Glazing Services"
                className="h-[68px] w-auto shrink-0 text-white md:h-[92px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <path d="M18 6 L18 94 M18 50 L44 6 M18 50 L44 94" />
                <path d="M66 6 L66 94 M66 50 L40 6 M66 50 L40 94" />
              </svg>

              <span className="h-[68px] w-px shrink-0 bg-white/25 md:h-[92px]" />

              <h1 className="font-display text-[clamp(1.1rem,3.2vw,1.65rem)] font-semibold uppercase leading-[1.08] tracking-[0.12em] text-white">
                <span className="block">Kolkata</span>
                <span className="block">Glazing</span>
                <span className="block">Services</span>
              </h1>
            </div>

            {/* Progress line */}
            <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-white/10 md:w-52">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brass"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40"
            >
              Facade Engineering
            </motion.p>
          </motion.div>

          {/* Corner index */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pointer-events-none absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25"
          >
            KGS · Est. 1998
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
