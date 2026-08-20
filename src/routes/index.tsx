import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SmoothScroll } from "@/components/kgs/SmoothScroll";
import { Nav } from "@/components/kgs/Nav";
import { Hero } from "@/components/kgs/Hero";
import { resolveLandingOrder } from "@/lib/landing-sections";

// Footer is structural (always last); the middle sections come from the
// registry and render in the CMS-defined order.
const Footer = lazy(() => import("@/components/kgs/Footer").then((m) => ({ default: m.Footer })));

const SectionSkeleton = ({ h = "60vh" }: { h?: string }) => (
  <div aria-hidden style={{ minHeight: h }} className="w-full bg-background" />
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KGS — Engineering the Future of Architectural Facades" },
      {
        name: "description",
        content:
          "Kolkata Glazing Services — integrated facade engineering, structural glazing, curtain walls, ACP cladding and premium window systems.",
      },
      { property: "og:title", content: "KGS — Architectural Facade Engineering" },
      {
        property: "og:description",
        content:
          "Integrated facade solutions crafted through design, engineering, fabrication and installation.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  // Section order + visibility is client-editable via the admin "Layout" panel.
  // The fetch tolerates the table not existing yet (before the migration is
  // applied) — on any error we return null and fall back to the default order,
  // so the homepage always renders.
  const { data: settings } = useQuery({
    queryKey: ["cms", "site_settings"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings" as any)
          .select("*")
          .limit(1)
          .maybeSingle();
        return error ? null : data;
      } catch {
        return null;
      }
    },
    staleTime: 30_000,
    retry: false,
  });
  const sections = resolveLandingOrder((settings as any)?.landing_order).filter((s) => s.visible);

  return (
    <main className="bg-background text-ink min-h-screen">
      <SmoothScroll />
      <Nav />
      <Hero />
      {sections.map((s) => {
        const SectionComponent = s.component;
        return (
          <Suspense key={s.key} fallback={<SectionSkeleton h={s.skeletonH} />}>
            <SectionComponent />
          </Suspense>
        );
      })}
      <Suspense fallback={<SectionSkeleton h="30vh" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
