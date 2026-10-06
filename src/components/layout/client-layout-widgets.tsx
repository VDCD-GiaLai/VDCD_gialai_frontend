"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const FloatingContactWidget = dynamic(
  () =>
    import("@/components/layout/floating-contact-widget").then(
      (m) => m.FloatingContactWidget,
    ),
  { ssr: false },
);

const PageTransitionOverlay = dynamic(
  () =>
    import("@/components/layout/page-transition-overlay").then(
      (m) => m.PageTransitionOverlay,
    ),
  { ssr: false },
);

export function ClientLayoutWidgets() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout: 4000,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setReady(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!ready) return null;

  return (
    <>
      <FloatingContactWidget />
      <PageTransitionOverlay />
    </>
  );
}
