import { useSingleton, useList } from "@/lib/cms";
import { resolveAsset } from "@/lib/asset-map";

const FALLBACK_PARTNERS: { name: string; logo_url?: string | null }[] = [
  { name: "Saint-Gobain" }, { name: "Schüco" }, { name: "Guardian" },
  { name: "Technal" }, { name: "Hindalco" }, { name: "Jindal" },
];

export function Partners() {
  const { data: h } = useSingleton<any>("hero");
  const { data: partnerRows } = useList<any>("partners");
  const partners = partnerRows?.length
    ? partnerRows.map((p: any) => ({ name: p.name, logo_url: p.logo_url }))
    : FALLBACK_PARTNERS;

  return (
    <section className="relative w-full border-y border-line bg-surface py-10 md:py-20">
      <div className="container-kgs">
        <div className="text-center">
          <div className="eyebrow justify-center">Material partners</div>
          <h2 className="display-section mt-3 text-[clamp(1.1rem,2.1vw,1.7rem)]">
            {h?.partners_label || "Specified with the world's leading material partners"}
          </h2>
        </div>
        <div
          className="mt-8 md:mt-10 relative overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div className="marquee-track whitespace-nowrap">
            {[...partners, ...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center gap-3 w-[200px] md:w-[240px] h-14 md:h-16 px-4 shrink-0"
              >
                {p.logo_url ? (
                  <img
                    src={resolveAsset(p.logo_url)}
                    alt={p.name}
                    loading="lazy"
                    className="h-7 md:h-9 w-auto max-w-[80px] md:max-w-[96px] object-contain shrink-0"
                  />
                ) : null}
                <span className="font-display text-[14px] md:text-[16px] font-medium text-ink-dim truncate">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}