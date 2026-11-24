import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PremiumLayer } from "../components/kgs/PremiumLayer";
import { Preloader } from "../components/kgs/Preloader";
import { singletonQueryOptions, listQueryOptions, type SingletonKey, type ListKey } from "../lib/cms";

const HOME_SINGLETONS: SingletonKey[] = ["hero","site_settings","features_intro","statement","expertise_intro","projects_intro","process_intro","manufacturing","why_intro","contact","footer"];
const HOME_LISTS: ListKey[] = ["partners","features","expertise_items","projects","process_steps","why_cards"];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

// TanStack Router types the caught value as `unknown` (anything can be thrown),
// so normalise it before anything downstream touches `.message`.
function ErrorComponent({ error: thrown, reset }: { error: unknown; reset: () => void }) {
  const error = thrown instanceof Error ? thrown : new Error(String(thrown));
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Prefetched on the server so the Preloader/Hero logo is already in the
  // first-paint HTML instead of rendering a fallback and swapping to the CMS
  // value once the client-side fetch resolves.
  loader: async ({ context, location }) => {
    const qc = context.queryClient;
    // Homepage sections otherwise render placeholder copy and swap to the CMS
    // values as each query lands, which shifts the layout mid-scroll. Fetch it
    // all in parallel up front; the timeout keeps a slow backend from stalling
    // the page (unresolved queries just fall back to client fetching).
    const jobs = location.pathname === "/"
      ? [...HOME_SINGLETONS.map((t) => singletonQueryOptions(t)), ...HOME_LISTS.map((t) => listQueryOptions(t))]
      : [singletonQueryOptions("hero")];
    await Promise.race([
      Promise.all(jobs.map((o) => qc.prefetchQuery(o as any))),
      new Promise((r) => setTimeout(r, 3000)),
    ]);
    return { dehydratedState: dehydrate(qc) };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KGS Facade Engineering" },
      { name: "description", content: "Kolkata Glazing Services (KGS) — Premium architectural facade engineering, fabrication and installation." },
      { name: "author", content: "KGS" },
      { property: "og:title", content: "KGS Facade Engineering" },
      { property: "og:description", content: "Kolkata Glazing Services (KGS) — Premium architectural facade engineering, fabrication and installation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KGS Facade Engineering" },
      { name: "twitter:description", content: "Kolkata Glazing Services (KGS) — Premium architectural facade engineering, fabrication and installation." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // KGS mark in white on the accent blue. .ico first for older browsers.
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;550;600;650;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { dehydratedState } = Route.useLoaderData() as { dehydratedState: DehydratedState };

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't let the browser restore the previous scroll position on reload, and
    // always begin a fresh page load at the top (the hero), not mid-page.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    // Run once more after the router's own scroll-restoration pass so we win.
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Preloader />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <PremiumLayer />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
