import { motion } from "framer-motion";
import statementImg from "@/assets/statement.jpg";
import { useSingleton } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";

export function Statement() {
  const { data: s, isLoading } = useSingleton<any>("statement");
  const metas = [
    {
      k: s?.meta1_key ?? (isLoading ? "MSME ZED" : "MSME ZED"),
      v: s?.meta1_value ?? (isLoading ? "Silver Certified" : "Silver Certified"),
    },
    {
      k: s?.meta2_key ?? (isLoading ? "Region" : "Region"),
      v: s?.meta2_value ?? (isLoading ? "Pan-India" : "Pan-India"),
    },
    {
      k: s?.meta3_key ?? (isLoading ? "Capability" : "Capability"),
      v: s?.meta3_value ?? (isLoading ? "End-to-End" : "End-to-End"),
    },
    {
      k: s?.meta4_key ?? (isLoading ? "Tier" : "Tier"),
      v: s?.meta4_value ?? (isLoading ? "Landmark Grade" : "Landmark Grade"),
    },
  ];
  const paragraphs = [
    s?.paragraph1 ||
      (isLoading
        ? "Founded on the conviction that a facade is the most visible expression of a building's intent — Kolkata Glazing Services has spent over two decades crafting envelopes that perform as precisely as they appear."
        : "Founded on the conviction that a facade is the most visible expression of a building's intent — Kolkata Glazing Services has spent over two decades crafting envelopes that perform as precisely as they appear."),
    s?.paragraph2 ||
      (isLoading
        ? "Our practice fuses structural rigour with material restraint. From concept through final installation, every system passes through a single, integrated chain of accountability."
        : "Our practice fuses structural rigour with material restraint. From concept through final installation, every system passes through a single, integrated chain of accountability."),
  ];
  // Bold the company brand wherever it appears in body copy
  const renderWithBrand = (text: string) => {
    const parts = text.split(/(Kolkata Glazing Services|KGS)/g);
    return parts.map((part, i) =>
      part === "Kolkata Glazing Services" || part === "KGS" ? (
        <strong key={i} className="font-bold text-ink">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };
  const imgSrc = resolveAsset(s?.image_url) || statementImg;
  return (
    <section id="about" className="relative bg-background py-12 md:py-24">
      <div className="container-kgs grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="eyebrow"
          >
            {s?.eyebrow || "01 — Architectural Statement"}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 display-section text-balance"
          >
            {s?.heading_main || "We don't install facades."}{" "}
            <span className="text-brass italic">
              {s?.heading_accent || "We engineer building identities."}
            </span>
          </motion.h2>

          <div className="mt-10 grid grid-cols-2 gap-8 max-w-md">
            {metas.map((m) => (
              <div key={m.k} className="border-t border-line pt-3">
                <div className="font-display text-[10px] tracking-[0.3em] uppercase text-ink/40">
                  {m.k}
                </div>
                <div className="mt-2 font-display text-sm text-ink-dim">{m.v}</div>
              </div>
            ))}
          </div>

          {/* Body copy sits under the spec grid rather than beside the image —
              it fills the column the grid leaves short instead of running past it. */}
          <div className="mt-10 space-y-5 max-w-[62ch]">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
                className="body-lead"
              >
                {renderWithBrand(p)}
              </motion.p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] lg:h-full lg:aspect-auto overflow-hidden bg-surface"
          >
            <img
              src={imgSrc}
              alt="KGS facade engineer reviewing project blueprint"
              loading="lazy"
              decoding="async"
              width={1280}
              height={1600}
              className="h-full w-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-line" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
