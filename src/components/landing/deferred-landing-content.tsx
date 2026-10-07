"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { OrganizationInfo } from "@/data/hero.data";

const DigitalPioneerSection = dynamic(
  () =>
    import("@/components/landing/digital-pioneer-section").then(
      (m) => m.DigitalPioneerSection,
    ),
  { ssr: false },
);

const ProgramsSolutionsSection = dynamic(
  () =>
    import("@/components/landing/programs-solutions-section").then(
      (m) => m.ProgramsSolutionsSection,
    ),
  { ssr: false },
);

const FeaturedProjectsSection = dynamic(
  () =>
    import("@/components/landing/featured-projects-section").then(
      (m) => m.FeaturedProjectsSection,
    ),
  { ssr: false },
);

const EcosystemCollaborationSection = dynamic(
  () =>
    import("@/components/landing/ecosystem-collaboration-section").then(
      (m) => m.EcosystemCollaborationSection,
    ),
  { ssr: false },
);

const EcosystemSection = dynamic(
  () =>
    import("@/components/landing/ecosystem-section").then(
      (m) => m.EcosystemSection,
    ),
  { ssr: false },
);

const LatestNewsSection = dynamic(
  () =>
    import("@/components/landing/latest-news-section").then(
      (m) => m.LatestNewsSection,
    ),
  { ssr: false },
);

const PartnersSection = dynamic(
  () =>
    import("@/components/landing/partners-section").then(
      (m) => m.PartnersSection,
    ),
  { ssr: false },
);

const LandingContactSection = dynamic(
  () =>
    import("@/components/landing/landing-contact-section").then(
      (m) => m.LandingContactSection,
    ),
  { ssr: false },
);

const FloatingContactWidget = dynamic(
  () =>
    import("@/components/layout/floating-contact-widget").then(
      (m) => m.FloatingContactWidget,
    ),
  { ssr: false },
);

export function DeferredLandingContent({
  activeOrgInfo,
}: {
  activeOrgInfo?: OrganizationInfo;
}) {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (shouldLoad) return;

    const trigger = () => setShouldLoad(true);

    window.addEventListener("scroll", trigger, { once: true, passive: true });
    window.addEventListener("touchmove", trigger, {
      once: true,
      passive: true,
    });
    window.addEventListener("wheel", trigger, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", trigger, {
      once: true,
      passive: true,
    });

    const timer = setTimeout(trigger, 8000);

    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("touchmove", trigger);
      window.removeEventListener("wheel", trigger);
      window.removeEventListener("keydown", trigger);
      clearTimeout(timer);
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full">
      {shouldLoad ? (
        <>
          <DigitalPioneerSection initialOrgInfo={activeOrgInfo} />
          <div id="about" />
          <ProgramsSolutionsSection />
          <FeaturedProjectsSection />
          <EcosystemCollaborationSection />
          <EcosystemSection />
          <LatestNewsSection />
          <PartnersSection />
          <LandingContactSection />
          <FloatingContactWidget />
        </>
      ) : (
        <div className="min-h-[20vh]" />
      )}
    </div>
  );
}
