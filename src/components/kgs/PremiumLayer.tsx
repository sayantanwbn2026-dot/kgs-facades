import { useEffect, useState, useMemo } from "react";
import { useRouter, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Search, Command } from "lucide-react";

/**
 * 5 premium UX features bundled into a single overlay layer:
 * 1. Top scroll-progress bar (brass gradient)
 * 2. Cmd/Ctrl+K command palette for navigation
 * 3. Floating back-to-top button (appears after 600px)
 * 4. Page-route fade/slide transitions
 * 5. Subtle cursor spotlight (desktop only, pointer:fine)
 */

const NAV = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Process", to: "/process" },
  { label: "Expertise", to: "/expertise" },
  { label: "Clients", to: "/clients" },
  { label: "About", to: "/about" },
];

export function PremiumLayer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Disable everything on admin surfaces
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <ScrollProgress />
      <CursorSpotlight />
      <BackToTop />
      <CommandPalette />
      <RouteTransition pathname={pathname} />
    </>
  );
}

/* 1) Scroll progress */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 220, damping: 35, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: x, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[100] h-[2px] bg-gradient-to-r from-transparent via-brass to-transparent"
    />
  );
}

/* 2) Cursor spotlight (desktop only) */
function CursorSpotlight() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);
    let raf = 0;
    let next: { x: number; y: number } | null = null;
    const flush = () => { raf = 0; if (next) setPos(next); };
    const onMove = (e: MouseEvent) => {
      next = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  if (!enabled || !pos) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] mix-blend-soft-light"
      style={{
        background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--brass) 22%, transparent), transparent 70%)`,
      }}
    />
  );
}

/* 3) Back to top */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[90] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 backdrop-blur shadow-lg hover:bg-brass hover:text-white transition"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* 4) Route transition overlay */
function RouteTransition({ pathname }: { pathname: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none fixed inset-0 z-[80] bg-background"
        aria-hidden
      />
    </AnimatePresence>
  );
}

/* 5) Command palette (Cmd/Ctrl+K) */
function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return NAV;
    return NAV.filter((n) => n.label.toLowerCase().includes(term) || n.to.includes(term));
  }, [q]);

  return (
    <>
      {/* Floating hint trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden md:inline-flex fixed bottom-6 left-6 z-[90] items-center gap-2 rounded-full border border-line bg-surface/90 backdrop-blur px-3 py-2 text-[11px] font-mono text-ink-dim hover:text-brass hover:border-brass transition shadow-lg"
      >
        <Command className="h-3 w-3" /> K
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] grid place-items-start pt-[14vh] bg-black/50 backdrop-blur-sm px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-line bg-surface shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
                <Search className="h-4 w-4 text-ink-mute" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Jump to a page…"
                  className="flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-mute"
                />
                <span className="font-mono text-[10px] text-ink-mute border border-line rounded px-1.5 py-0.5">ESC</span>
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 && (
                  <div className="px-4 py-6 text-center text-[12.5px] text-ink-mute">No matches</div>
                )}
                {results.map((r) => (
                  <button
                    key={r.to}
                    onClick={() => { setOpen(false); navigate({ to: r.to as any }); }}
                    className="w-full text-left px-4 py-2.5 flex items-center justify-between text-[13.5px] text-ink hover:bg-brass-soft hover:text-brass transition"
                  >
                    <span className="font-medium">{r.label}</span>
                    <span className="font-mono text-[10.5px] text-ink-mute">{r.to}</span>
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-line text-[10.5px] font-mono text-ink-mute flex items-center justify-between">
                <span>Navigate · {router.state.location.pathname}</span>
                <span>⌘K to toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}