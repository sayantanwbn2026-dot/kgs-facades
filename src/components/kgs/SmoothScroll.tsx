import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    // Skip on touch devices — native scrolling is smoother and avoids jank
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // The Projects section pins itself with GSAP ScrollTrigger, which by
    // default reads the native window scroll position on its own rAF loop.
    // Lenis intercepts wheel input and tweens the *visual* scroll separately,
    // so the two were running un-synced — ScrollTrigger recalculating against
    // a scroll position Lenis hadn't actually reached yet on every frame,
    // which is what read as scroll lag/stutter. Driving Lenis off gsap's
    // ticker (instead of a second, independent rAF loop) and feeding every
    // Lenis tick into ScrollTrigger.update puts both on one clock.
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const gsapTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    // Lazy sections and images change the document height after mount. Re-measure
    // Lenis and every ScrollTrigger (the Projects pin) whenever that happens,
    // debounced, so pinned/stacked sections never work from stale offsets.
    let refreshTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 150);
    });
    ro.observe(document.body);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.hash && link.hash.startsWith("#") && link.pathname === window.location.pathname) {
        e.preventDefault();
        lenis.scrollTo(link.hash, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.clearTimeout(refreshTimer);
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(gsapTick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);
  return null;
}