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

    const trigger = () => setReady(true);

    window.addEventListener("scroll", trigger, { once: true, passive: true });
    window.addEventListener("pointerdown", trigger, {
      once: true,
      passive: true,
    });

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(trigger, {
        timeout: 2000,
      });
      return () => {
        window.cancelIdleCallback(id);
        window.removeEventListener("scroll", trigger);
        window.removeEventListener("pointerdown", trigger);
      };
    } else {
      const timer = setTimeout(trigger, 1200);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", trigger);
        window.removeEventListener("pointerdown", trigger);
      };
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
