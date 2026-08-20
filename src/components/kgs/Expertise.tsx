import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import structural from "@/assets/exp-structural.jpg";
import curtain from "@/assets/exp-curtain.jpg";
import spider from "@/assets/exp-spider.jpg";
import acp from "@/assets/exp-acp.jpg";
import windowImg from "@/assets/exp-window.jpg";
import skylight from "@/assets/exp-skylight.jpg";
import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";

const FALLBACK_IMGS = [structural, curtain, spider, acp, windowImg, skylight];
const FALLBACK = [
  {
    n: "01",
    img: structural,
    title: "Structural Glazing",
    desc: "Frameless silicone-bonded systems delivering uninterrupted vision lines and high thermal performance.",
  },
  {
    n: "02",
    img: curtain,
    title: "Curtain Wall Systems",
    desc: "Unitised and stick-built curtain walls engineered for tall building envelopes and wind-load critical exposures.",
  },
  {
    n: "03",
    img: spider,
    title: "Spider Glazing",
    desc: "Point-fixed glazing with stainless steel fittings — transparency at architectural scale.",
  },
  {
    n: "04",
    img: acp,
    title: "ACP Cladding",
    desc: "Aluminium composite cladding fabricated to mm tolerances with PVDF, PE and brushed finishes.",
  },
  {
    n: "05",
    img: windowImg,
    title: "Premium Window Systems",
    desc: "European-grade aluminium and uPVC fenestration. Schüco, Technal and Hindalco platforms.",
  },
  {
    n: "06",
    img: skylight,
    title: "Skylights & Louvers",
    desc: "Daylighting structures and engineered louver screens that modulate light, heat and air.",
  },
];

export function Expertise() {
  const { data: intro, isLoading: introLoading } = useSingleton<any>("expertise_intro");
  const { data: rows, isLoading: rowsLoading } = useList<any>("expertise_items");

  const items = rows?.length
    ? rows.map((r, i) => ({
        n: r.number_label || String(i + 1).padStart(2, "0"),
        title: r.title,
        desc: r.description,
        img: resolveAsset(r.image_url) || FALLBACK_IMGS[i % FALLBACK_IMGS.length],
      }))
    : FALLBACK;

  const eyebrow = intro?.eyebrow || (introLoading ? "02 — Expertise" : "02 — Expertise");
  const heading =
    intro?.heading ||
    (introLoading
      ? "A complete envelope of capabilities."
      : "A complete envelope of capabilities.");
  const description =
    intro?.description ||
    (introLoading
      ? "Six core disciplines, integrated under one roof — from feasibility studies and wind-tunnel analysis to mockup testing, fabrication and final installation."
      : "Six core disciplines, integrated under one roof — from feasibility studies and wind-tunnel analysis to mockup testing, fabrication and final installation.");

  return (
    <section id="expertise" className="relative bg-surface py-12 md:py-24">
      <div className="container-kgs">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-14">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-6 display-section text-balance max-w-[18ch]">{heading}</h2>
          </div>
          <p className="max-w-md body-lead">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {items.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-surface overflow-hidden"
            >
              {/* Mobile: horizontal index card — image thumbnail + text on a solid
                  surface, so the copy is never fighting the busy glass photo. */}
              <Link
                to="/expertise"
                className="md:hidden flex items-stretch gap-4 p-3 active:bg-surface-2 transition-colors"
              >
                <div className="relative w-[104px] shrink-0 aspect-[3/4] overflow-hidden rounded-md bg-surface-2">
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-brass">{it.n}</span>
                  <h3 className="mt-1.5 display-sub text-[1.075rem] leading-tight">{it.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-dim line-clamp-3">
                    {it.desc}
                  </p>
                  <span className="mt-2.5 h-px w-7 bg-brass" />
                </div>
              </Link>

              {/* Desktop: full overlay card with hover reveal. */}
              <Link
                to="/expertise"
                className="hidden md:block relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={1600}
                  className="absolute inset-0 h-full w-full object-cover grayscale-[30%] transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-transparent group-hover:ring-brass transition-all duration-500 z-20 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-10 z-30">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-display text-[10px] tracking-[0.3em] text-brass">
                      {it.n}
                    </span>
                    <span className="h-px bg-brass w-6 transition-all duration-500 group-hover:w-16" />
                  </div>
                  <h3 className="display-sub text-[1.5rem]">{it.title}</h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-out">
                    <p className="overflow-hidden text-sm text-ink-dim/80 leading-relaxed group-hover:pt-4">
                      {it.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
