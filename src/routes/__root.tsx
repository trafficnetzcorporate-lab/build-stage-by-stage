import * as React from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { DevPlaceholderBanner } from "@/components/DevPlaceholderBanner";

/**
 * One-shot guard: unregister any stale service worker and purge Cache Storage.
 * Safe in production — this site has no service worker, so the loop runs zero
 * iterations on real visitors. Only fires once per tab via sessionStorage.
 */
function useExorciseStaleCaches() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("__sw_exorcised") === "1") return;
      sessionStorage.setItem("__sw_exorcised", "1");
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — proceed anyway.
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) => regs.forEach((r) => r.unregister().catch(() => {})))
        .catch(() => {});
    }
    if (typeof caches !== "undefined" && caches?.keys) {
      caches
        .keys()
        .then((keys) => keys.forEach((k) => caches.delete(k).catch(() => {})))
        .catch(() => {});
    }
  }, []);
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-navy">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-deep"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const DEV_NO_STORE_META = import.meta.env.DEV
  ? [{ httpEquiv: "Cache-Control", content: "no-store" } as const]
  : [];

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...DEV_NO_STORE_META,
      { title: "Nancy Clarke — New Construction Realtor, St. Lucie County FL" },
      {
        name: "description",
        content:
          "Nancy Clarke is the #1 sales associate for Adams Homes in St. Lucie County, Florida. Partnering with realtors whose buyers want a brand-new Adams Home.",
      },
      { name: "author", content: "Nancy Clarke" },
      { property: "og:title", content: "Nancy Clarke — New Construction Realtor, St. Lucie County FL" },
      {
        property: "og:description",
        content:
          "The #1 Adams Homes sales associate in St. Lucie County. Realtors keep 100% of their buyer-side commission.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nancy Clarke — New Construction Realtor, St. Lucie County FL" },
      { name: "description", content: "#1 Adam's Home Realtor in the Port St. Lucie Area" },
      { property: "og:description", content: "#1 Adam's Home Realtor in the Port St. Lucie Area" },
      { name: "twitter:description", content: "#1 Adam's Home Realtor in the Port St. Lucie Area" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/HSxz4g1v4oPiP0DMmZRXScupiIA2/social-images/social-1777676742016-og-image.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/HSxz4g1v4oPiP0DMmZRXScupiIA2/social-images/social-1777676742016-og-image.webp" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
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
  useExorciseStaleCaches();
  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
      {import.meta.env.DEV ? <DevPlaceholderBanner /> : null}
    </div>
  );
}
