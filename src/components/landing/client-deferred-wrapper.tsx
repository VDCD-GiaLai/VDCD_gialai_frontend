"use client";

import * as React from "react";

export function ClientDeferredWrapper() {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(
    null,
  );

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let idleId: number;

    const loadContent = () => {
      window.removeEventListener("scroll", loadContent);
      window.removeEventListener("touchstart", loadContent);
      window.removeEventListener("touchmove", loadContent);
      window.removeEventListener("wheel", loadContent);
      window.removeEventListener("keydown", loadContent);
      window.removeEventListener("pointerdown", loadContent);
      clearTimeout(timeoutId);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      import("@/components/landing/deferred-landing-content").then((m) => {
        setComponent(() => m.DeferredLandingContent);
      });
    };

    window.addEventListener("scroll", loadContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchstart", loadContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("touchmove", loadContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("wheel", loadContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", loadContent, {
      once: true,
      passive: true,
    });
    window.addEventListener("pointerdown", loadContent, {
      once: true,
      passive: true,
    });

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadContent, { timeout: 3500 });
    } else {
      timeoutId = setTimeout(loadContent, 3500);
    }

    return () => {
      window.removeEventListener("scroll", loadContent);
      window.removeEventListener("touchstart", loadContent);
      window.removeEventListener("touchmove", loadContent);
      window.removeEventListener("wheel", loadContent);
      window.removeEventListener("keydown", loadContent);
      window.removeEventListener("pointerdown", loadContent);
      clearTimeout(timeoutId);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!Component) {
    return <div className="min-h-[20vh]" />;
  }

  return <Component />;
}
