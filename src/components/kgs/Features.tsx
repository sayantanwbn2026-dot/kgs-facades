import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSingleton, useList } from "@/lib/cms";

/* ------------------------------------------------------------- */
/* 5 premium "platform" features — bento grid with live mini-UIs */
/* ------------------------------------------------------------- */

export function Features() {
  const { data: intro, isLoading: introLoading } = useSingleton<any>("features_intro");
  const { data: rows, isLoading: rowsLoading } = useList<any>("features");

  const byKind = (k: string) => rows?.find((r) => r.visual_kind === k);
  const f = (k: string, fb: { tag: string; title: string; desc: string }) => {
    const r = byKind(k);
    return {
      tag: r?.tag || fb.tag,
      title: r?.title || fb.title,
      desc: r?.description || fb.desc,
    };
  };

  const wind = f("wind", {
    tag: "01 / Simulation",
    title: "Wind-Load & Thermal Simulation",
    desc: "CFD-validated facade systems modelled against site-specific wind regimes and solar load — before a single bracket is fabricated.",
  });
  const bim = f("bim", {
    tag: "02 / BIM",
    title: "Live BIM Co-ordination",
    desc: "Federated Revit/Tekla models, clash-checked weekly with consultants.",
  });
  const gau = f("gauge", {
    tag: "03 / Quality",
    title: "±0.5 mm Fabrication Tolerance",
    desc: "CNC-machined aluminium with documented audit logs across every batch.",
  });
  const en = f("energy", {
    tag: "04 / Performance",
    title: "Energy Performance Modelling",
    desc: "U-value, SHGC and visible light transmission tuned to your envelope — independently verified against IGBC and LEED targets.",
  });

  const eyebrow = intro?.eyebrow || (introLoading ? "The Platform" : "The Platform");
  const heading =
    intro?.heading ||
    (introLoading
      ? "Four capabilities that make us a different kind of facade partner."
      : "Four capabilities that make us a different kind of facade partner.");
  const description =
    intro?.description ||
    (introLoading
      ? "From wind-load simulation to verified energy performance, every project runs on the same engineered system — visible to you in real time."
      : "From wind-load simulation to verified energy performance, every project runs on the same engineered system — visible to you in real time.");

  return (
    <section id="platform" className="relative bg-background py-12 md:py-24">
      <div className="container-kgs">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-6 display-section text-balance">{heading}</h2>
          <p className="mt-6 text-[15.5px] leading-[1.6] text-ink-dim max-w-xl">{description}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <FeatureCard className="md:col-span-2 lg:col-span-4 min-h-[230px] md:min-h-[300px]" tag={wind.tag}>
            <WindSim />
            <FeatureMeta title={wind.title} desc={wind.desc} />
          </FeatureCard>

          <FeatureCard className="md:col-span-1 lg:col-span-2 min-h-[230px] md:min-h-[300px]" tag={bim.tag}>
            <BIMVisual />
            <FeatureMeta title={bim.title} desc={bim.desc} />
          </FeatureCard>

          <FeatureCard className="md:col-span-1 lg:col-span-2 min-h-[230px] md:min-h-[300px]" tag={gau.tag}>
            <ToleranceGauge />
            <FeatureMeta title={gau.title} desc={gau.desc} />
          </FeatureCard>

          <FeatureCard className="md:col-span-2 lg:col-span-4 min-h-[230px] md:min-h-[300px]" tag={en.tag}>
            <EnergyChart />
            <FeatureMeta title={en.title} desc={en.desc} />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Shell ------------------------------ */

function FeatureCard({
  children,
  className = "",
  tag,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  tag: string;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "group relative overflow-hidden rounded-[var(--radius)] border border-line bg-surface",
        "transition-all duration-500 hover:border-line-2 hover:-translate-y-0.5",
        "hover:shadow-[0_24px_60px_-30px_rgba(1,65,153,0.35)]",
        wide ? "flex flex-col md:flex-row" : "flex flex-col",
        className,
      ].join(" ")}
      style={{
        backgroundImage:
          "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--brass) 8%, transparent), transparent 60%)",
      }}
    >
      <div className="absolute top-4 left-4 z-10 chip !text-[10.5px] !py-1 !pl-1.5 !pr-2 bg-background/80 backdrop-blur border border-line text-ink-mute">
        <span className="chip-dot !bg-brass" />
        <span className="font-mono">{tag}</span>
      </div>
      {children}
    </motion.div>
  );
}

function FeatureMeta({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 md:p-7 mt-auto">
      <h3 className="font-display text-[18px] md:text-[19px] font-semibold tracking-tight text-ink leading-tight">
        {title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-dim">{desc}</p>
    </div>
  );
}

/* ----------------------- Feature 1: Wind sim ---------------------- */

function WindSim() {
  return (
    <div className="relative flex-1 mt-12 mx-3 mb-0 rounded-[var(--radius)] bg-gradient-to-b from-surface-2 to-surface border border-line overflow-hidden">
      <svg viewBox="0 0 600 260" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--brass)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--brass)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* building silhouette */}
        <rect x="270" y="40" width="80" height="220" fill="var(--ink)" opacity="0.06" />
        <rect
          x="270"
          y="40"
          width="80"
          height="220"
          fill="none"
          stroke="var(--brass)"
          strokeOpacity="0.25"
        />
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1="270"
            x2="350"
            y1={50 + i * 15}
            y2={50 + i * 15}
            stroke="var(--brass)"
            strokeOpacity="0.12"
          />
        ))}
        {/* wind streamlines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${30 + i * 24} C 120 ${30 + i * 24 - 10}, 220 ${30 + i * 24 + (i - 4) * 6}, 270 ${50 + i * 22}`}
            fill="none"
            stroke="var(--brass)"
            strokeOpacity={0.35 - i * 0.02}
            strokeWidth="1"
            strokeDasharray="3 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-28"
              dur={`${2 + i * 0.15}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
        {/* leeward */}
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M350 ${50 + i * 22} C 420 ${50 + i * 22 + (i - 4) * 8}, 520 ${30 + i * 24}, 600 ${30 + i * 24}`}
            fill="none"
            stroke="var(--brass)"
            strokeOpacity={0.2}
            strokeWidth="1"
            strokeDasharray="2 5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-32"
              dur={`${2.4 + i * 0.12}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
        <rect width="600" height="260" fill="url(#b)" />
      </svg>
      <div className="absolute top-4 right-4 grid grid-cols-2 gap-2">
        <Stat label="Cp max" value="0.84" />
        <Stat label="Wind" value="42 m/s" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-background/85 backdrop-blur border border-line px-2.5 py-1.5">
      <div className="font-mono text-[9.5px] text-ink-mute uppercase tracking-wide">{label}</div>
      <div className="font-display text-[13px] font-semibold text-ink">{value}</div>
    </div>
  );
}

/* ----------------------- Feature 2: BIM ---------------------- */

function BIMVisual() {
  return (
    <div className="relative flex-1 mt-12 mx-3 mb-0 rounded-[var(--radius)] bg-gradient-to-b from-surface-2 to-surface border border-line overflow-hidden grid place-items-center">
      <svg viewBox="0 0 200 200" className="w-[78%] h-auto float-soft">
        <g transform="translate(100 100)">
          {[0, 1, 2].map((d) => (
            <g key={d} transform={`rotate(${d * 30}) skewX(-20)`}>
              {Array.from({ length: 6 }).map((_, i) =>
                Array.from({ length: 4 }).map((__, j) => (
                  <rect
                    key={`${i}-${j}`}
                    x={-60 + j * 30}
                    y={-60 + i * 22}
                    width="28"
                    height="20"
                    fill="none"
                    stroke="var(--brass)"
                    strokeOpacity={d === 1 ? 0.55 : 0.18}
                    strokeWidth={d === 1 ? 1.2 : 0.8}
                  />
                )),
              )}
            </g>
          ))}
        </g>
      </svg>
      <div className="absolute bottom-3 left-3 chip !text-[10px] !py-1 bg-background/80 border border-line text-ink-mute">
        <span className="chip-dot" />
        IFC · Revit · Tekla
      </div>
    </div>
  );
}

/* ----------------------- Feature 3: Tolerance gauge ---------------------- */

function ToleranceGauge() {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setVal(0.42), 350);
    return () => clearTimeout(t);
  }, []);
  // arc geometry
  const R = 70;
  const C = 2 * Math.PI * R;
  const ratio = Math.min(val / 0.5, 1);
  return (
    <div className="relative flex-1 mt-12 mx-3 mb-0 rounded-[var(--radius)] bg-gradient-to-b from-surface-2 to-surface border border-line grid place-items-center">
      <svg viewBox="-100 -100 200 110" className="w-[80%]">
        <path
          d={describeArc(0, 0, R, -90, 90)}
          fill="none"
          stroke="var(--line)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d={describeArc(0, 0, R, -90, 90)}
          fill="none"
          stroke="var(--brass)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C / 2}
          strokeDashoffset={(C / 2) * (1 - ratio)}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)" }}
        />
        <text
          x="0"
          y="-10"
          textAnchor="middle"
          className="font-display"
          fontSize="22"
          fontWeight="600"
          fill="var(--ink)"
        >
          ±{val.toFixed(2)}
        </text>
        <text x="0" y="8" textAnchor="middle" fontSize="7" fill="var(--ink-mute)" letterSpacing="1">
          MM ACTUAL
        </text>
      </svg>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-ink-mute">
        <span>Spec ±0.50</span>
        <span className="text-brass font-medium">Pass</span>
      </div>
    </div>
  );
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function describeArc(cx: number, cy: number, r: number, startA: number, endA: number) {
  const start = polarToCartesian(cx, cy, r, endA);
  const end = polarToCartesian(cx, cy, r, startA);
  const large = endA - startA <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, large, 0, end.x, end.y].join(" ");
}

/* ----------------------- Feature 5: Energy chart ---------------------- */

function EnergyChart() {
  const bars = [62, 48, 71, 55, 80, 64, 88, 72, 90, 66, 78, 92];
  return (
    <div className="relative flex-1 mt-12 mx-3 mb-0 rounded-[var(--radius)] bg-gradient-to-b from-surface-2 to-surface border border-line p-5">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="text-[11px] font-mono text-ink-mute">U-VALUE · W/m²K</div>
          <div className="font-display text-[22px] font-semibold tracking-tight text-ink">
            1.28 <span className="text-ink-mute text-[14px] font-medium">target 1.40</span>
          </div>
        </div>
        <div className="flex gap-2">
          {["Solar", "Thermal", "Acoustic"].map((t, i) => (
            <span
              key={t}
              className={`text-[10.5px] font-medium px-2 py-1 rounded-full border ${i === 0 ? "bg-brass text-white border-brass" : "text-ink-dim border-line"}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="h-32 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: h / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom" }}
            className="flex-1 h-full rounded-t-md bg-gradient-to-t from-brass/70 to-brass relative"
          >
            <span className="absolute -top-1 left-0 right-0 h-px bg-brass-glow opacity-60" />
          </motion.span>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9.5px] text-ink-mute">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
        <span>Dec</span>
      </div>
    </div>
  );
}
