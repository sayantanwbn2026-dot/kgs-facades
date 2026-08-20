import { lazy } from "react";

/**
 * Registry of the re-orderable homepage sections. Hero and Footer are
 * structural (always first / last) and deliberately excluded.
 *
 * The CMS `site_settings.landing_order` stores an array of { key, visible };
 * `resolveLandingOrder` turns that into the concrete render list, tolerating
 * unknown keys (removed sections) and missing keys (newly added sections never
 * silently disappear — they fall to the end, visible).
 */
export type SectionKey =
  | "partners"
  | "features"
  | "statement"
  | "expertise"
  | "projects"
  | "process"
  | "manufacturing"
  | "why"
  | "contact";

export type SectionOrderItem = { key: string; visible?: boolean };

type RegistryEntry = {
  key: SectionKey;
  label: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  skeletonH?: string;
};

export const LANDING_SECTIONS: RegistryEntry[] = [
  {
    key: "partners",
    label: "Material partners strip",
    skeletonH: "30vh",
    component: lazy(() =>
      import("@/components/kgs/Partners").then((m) => ({ default: m.Partners })),
    ),
  },
  {
    key: "features",
    label: "Platform — feature cards",
    component: lazy(() =>
      import("@/components/kgs/Features").then((m) => ({ default: m.Features })),
    ),
  },
  {
    key: "statement",
    label: "Architectural statement",
    component: lazy(() =>
      import("@/components/kgs/Statement").then((m) => ({ default: m.Statement })),
    ),
  },
  {
    key: "expertise",
    label: "Expertise grid",
    component: lazy(() =>
      import("@/components/kgs/Expertise").then((m) => ({ default: m.Expertise })),
    ),
  },
  {
    key: "projects",
    label: "Projects",
    skeletonH: "100vh",
    component: lazy(() =>
      import("@/components/kgs/Projects").then((m) => ({ default: m.Projects })),
    ),
  },
  {
    key: "process",
    label: "Process",
    component: lazy(() => import("@/components/kgs/Process").then((m) => ({ default: m.Process }))),
  },
  {
    key: "manufacturing",
    label: "Manufacturing",
    component: lazy(() =>
      import("@/components/kgs/Manufacturing").then((m) => ({ default: m.Manufacturing })),
    ),
  },
  {
    key: "why",
    label: "Why KGS",
    skeletonH: "40vh",
    component: lazy(() => import("@/components/kgs/Why").then((m) => ({ default: m.Why }))),
  },
  {
    key: "contact",
    label: "Contact",
    component: lazy(() => import("@/components/kgs/Contact").then((m) => ({ default: m.Contact }))),
  },
];

export const SECTION_LABELS: Record<string, string> = Object.fromEntries(
  LANDING_SECTIONS.map((s) => [s.key, s.label]),
);

export const DEFAULT_LANDING_ORDER: SectionOrderItem[] = LANDING_SECTIONS.map((s) => ({
  key: s.key,
  visible: true,
}));

/** Turn the stored order into the concrete, render-ready list. */
export function resolveLandingOrder(stored: SectionOrderItem[] | null | undefined) {
  const registry = new Map(LANDING_SECTIONS.map((s) => [s.key, s]));
  const seen = new Set<string>();
  const out: (RegistryEntry & { visible: boolean })[] = [];

  for (const item of stored ?? []) {
    const reg = registry.get(item.key as SectionKey);
    if (reg && !seen.has(item.key)) {
      seen.add(item.key);
      out.push({ ...reg, visible: item.visible !== false });
    }
  }
  for (const reg of LANDING_SECTIONS) {
    if (!seen.has(reg.key)) out.push({ ...reg, visible: true });
  }
  return out;
}

/** Normalise stored order for the admin editor (order + visibility, no components). */
export function resolveOrderForEditor(
  stored: SectionOrderItem[] | null | undefined,
): { key: SectionKey; label: string; visible: boolean }[] {
  return resolveLandingOrder(stored).map((s) => ({
    key: s.key,
    label: s.label,
    visible: s.visible,
  }));
}
