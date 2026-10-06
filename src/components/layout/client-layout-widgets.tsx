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
  return (
    <>
      <FloatingContactWidget />
      <PageTransitionOverlay />
    </>
  );
}
