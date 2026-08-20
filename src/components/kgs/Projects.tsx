import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import loudon from "@/assets/proj-loudon.jpg";
import one10 from "@/assets/proj-one10.jpg";
import aurus from "@/assets/proj-aurus.jpg";
import vyom from "@/assets/proj-vyom.jpg";
import siddha from "@/assets/proj-siddha.jpg";
import ecospace from "@/assets/proj-ecospace.jpg";
import dominion from "@/assets/proj-dominion.jpg";
import park from "@/assets/proj-park.jpg";
import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";
import { safeUrl } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Vertical scroll consumed per pixel of horizontal track travel. 1 = the classic
 * 1:1 pin, which makes this section as tall as the whole track. Lower is faster.
 */
const SCROLL_RATE = 0.45;

const FALLBACK_IMGS = [loudon, one10, aurus, vyom, siddha, ecospace, dominion, park];
const FALLBACK = [
  {
    n: "01",
    name: "7 Loudon Street",
    loc: "Kolkata, IN",
    sys: "Structural Glazing · Curtain Wall",
    img: loudon,
    year: "2022",
    status: "Delivered",
    tag: "Commercial",
  },
  {
    n: "02",
    name: "One 10",
    loc: "Kolkata, IN",
    sys: "Unitised Curtain Wall",
    img: one10,
    year: "2023",
    status: "Delivered",
    tag: "Commercial",
  },
  {
    n: "03",
    name: "PS Aurus",
    loc: "Kolkata, IN",
    sys: "Curtain Wall · ACP",
    img: aurus,
    year: "2021",
    status: "Delivered",
    tag: "Mixed-Use",
  },
  {
    n: "04",
    name: "PS Vyom",
    loc: "Kolkata, IN",
    sys: "Premium Window Systems",
    img: vyom,
    year: "2024",
    status: "In Progress",
    tag: "Residential",
  },
  {
    n: "05",
    name: "Siddha Esplanade",
    loc: "Kolkata, IN",
    sys: "Structural Glazing · Skylights",
    img: siddha,
    year: "2020",
    status: "Delivered",
    tag: "Mixed-Use",
  },
  {
    n: "06",
    name: "Eco Space",
    loc: "Rajarhat, IN",
    sys: "Curtain Wall System",
    img: ecospace,
    year: "2019",
    status: "Delivered",
    tag: "Commercial",
  },
  {
    n: "07",
    name: "The Dominion",
    loc: "Kolkata, IN",
    sys: "Unitised Glazing",
    img: dominion,
    year: "2024",
    status: "In Progress",
    tag: "Commercial",
  },
  {
    n: "08",
    name: "69 Park Street",
    loc: "Kolkata, IN",
    sys: "Frameless Glazing · ACP",
    img: park,
    year: "2023",
    status: "Delivered",
    tag: "Mixed-Use",
  },
];

export function Projects() {
  const { data: intro, isLoading: introLoading } = useSingleton<any>("projects_intro");
  const { data: rows, isLoading: rowsLoading } = useList<any>("projects");
  const projects = rows?.length
    ? rows.map((r, i) => ({
        n: r.number_label || String(i + 1).padStart(2, "0"),
        name: r.name,
        loc: r.location,
        sys: r.system_description,
        img: resolveAsset(r.image_url) || FALLBACK_IMGS[i % FALLBACK_IMGS.length],
        year: r.year,
        status: r.status,
        tag: r.tag || "Commercial",
      }))
    : FALLBACK;

  const eyebrow = intro?.eyebrow || (introLoading ? "03 — Projects" : "03 — Projects");
  const heading =
    intro?.heading ||
    (introLoading
      ? "Selected works across India's most considered buildings."
      : "Selected works across India's most considered buildings.");
  const description =
    intro?.description ||
    (introLoading
      ? "A sample of completed and in-progress engagements spanning commercial towers, mixed-use developments and luxury residences."
      : "A sample of completed and in-progress engagements spanning commercial towers, mixed-use developments and luxury residences.");
  const archiveTitle =
    intro?.archive_title ||
    (introLoading
      ? "100+ delivered\n projects since 2001."
      : "100+ delivered\n projects since 2001.");
  const archiveCtaLabel =
    intro?.archive_cta_label || (introLoading ? "Request portfolio" : "Request portfolio");
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      let killer: (() => void) | undefined;
      const setup = () => {
        const distance = track.scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // Travel the track faster than 1:1 with the scroll. At 1:1 the pin
            // held the viewport for the full width of the track — with the
            // current card count that was ~14 screens of scrolling for this
            // section alone. Card sizes are unchanged; only the rate is.
            end: () => `+=${distance * SCROLL_RATE + 200}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      };

      killer = setup();
      const onResize = () => {
        killer?.();
        killer = setup();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        killer?.();
      };
    });

    return () => mm.revert();
  }, [projects.length]);

  return (
    <section id="projects" className="relative bg-background">
      <div className="container-kgs pt-24 md:pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-6 display-section text-balance max-w-[20ch]">{heading}</h2>
          </div>
          <p className="max-w-md body-lead">{description}</p>
        </div>
      </div>

      {/* Pinned horizontal scroll */}
      <div ref={sectionRef} className="hidden md:block relative h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-10 px-[8vw] will-change-transform"
          style={{ width: "max-content" }}
        >
          {projects.map((p) => (
            <article
              key={p.name}
              className="group relative h-[72vh] w-[58vw] xl:w-[44vw] shrink-0 bg-surface overflow-hidden"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-line" />

              {/* Top meta */}
              <div className="absolute inset-x-0 top-0 p-7 flex justify-between items-start font-display text-[10px] tracking-[0.3em] uppercase text-ink/70 z-10 pointer-events-none">
                <span className="backdrop-blur bg-background/60 px-3 py-1.5 rounded-full">
                  {p.n}
                </span>
                <div className="flex flex-col items-end gap-2">
                  <span className="backdrop-blur bg-background/60 px-3 py-1.5 rounded-full">
                    {p.year}
                  </span>
                  <span className="chip !text-[9px] !py-1 backdrop-blur border-transparent text-ink">
                    {p.tag}
                  </span>
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                  {p.loc} · {p.status}
                </div>
                <h3 className="mt-3 display-sub text-2xl md:text-[2.1rem] leading-none">
                  {p.name}
                </h3>
                <div className="mt-4 h-px w-12 bg-brass transition-all duration-500 group-hover:w-32" />
                <p className="mt-4 font-display text-[11px] md:text-xs tracking-[0.25em] uppercase text-ink-dim/80">
                  {p.sys}
                </p>

                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700">
                  <div className="overflow-hidden">
                    <div className="pt-6 grid grid-cols-3 gap-6 border-t border-line mt-6">
                      <Meta label="Scope" value="Design · Engineering · Install" />
                      <Meta label="Materials" value="Low-E Glass · Aluminium" />
                      <Meta label="Status" value={p.status} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Closing card */}
          <div className="h-[72vh] w-[36vw] shrink-0 flex flex-col items-start justify-center border border-line p-12">
            <span className="eyebrow">Archive</span>
            <p className="mt-6 display-sub text-2xl whitespace-pre-line">{archiveTitle}</p>
            <Link
              to="/projects"
              className="mt-10 inline-flex items-center gap-3 font-display text-[11px] tracking-[0.3em] uppercase text-brass"
            >
              {archiveCtaLabel}
              <span className="h-px w-8 bg-brass" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile horizontal swipe */}
      <div
        className="md:hidden pb-24 overflow-x-auto no-scrollbar snap-x snap-mandatory w-full overscroll-x-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex items-stretch gap-4 px-4 w-max">
          {projects.map((p) => (
            <article
              key={p.name}
              className="relative w-[85vw] min-h-[480px] shrink-0 snap-center overflow-hidden bg-surface rounded-xl flex flex-col justify-end"
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1200}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute top-4 right-4 z-10 chip !text-[9px] !py-1 backdrop-blur bg-background/60 border-transparent text-ink">
                {p.tag}
              </div>
              <div className="relative z-10 p-6 pt-16 mt-auto">
                <div className="font-display text-[10px] tracking-[0.3em] uppercase text-brass">
                  {p.loc}
                </div>
                <h3 className="mt-2 display-sub text-3xl">{p.name}</h3>
                <div className="mt-3 font-display text-[10px] tracking-[0.25em] uppercase text-ink-dim/70">
                  {p.sys}
                </div>
              </div>
            </article>
          ))}
          <div className="w-[85vw] min-h-[480px] shrink-0 snap-center flex flex-col items-start justify-center border border-line rounded-xl p-8 bg-surface">
            <span className="eyebrow">Archive</span>
            <p className="mt-6 display-sub text-2xl whitespace-pre-line">{archiveTitle}</p>
            <Link
              to="/projects"
              className="mt-8 inline-flex items-center gap-2 font-display text-[10px] tracking-[0.3em] uppercase text-brass"
            >
              {archiveCtaLabel} <span className="h-px w-6 bg-brass" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-[9px] tracking-[0.3em] uppercase text-ink/40">{label}</div>
      <div className="mt-2 font-display text-xs text-ink-dim">{value}</div>
    </div>
  );
}
