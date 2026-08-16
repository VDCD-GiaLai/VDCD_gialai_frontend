"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { OrganizationStatsGrid } from "@/components/ui/organization-stats-grid";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";

export function DigitalPioneerSection() {
  const [orgInfo, setOrgInfo] = React.useState<OrganizationInfo | null>(null);

  React.useEffect(() => {
    fetchOrganizationInfoFromApi().then(setOrgInfo);
  }, []);

  const containerRef = useScrollReveal({
    targets: ".pioneer-reveal",
    options: { y: 24, blur: 4, duration: 0.8, ease: "power3.out" },
  });

  return (
    <section
      id="digital-pioneer"
      className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-14"
      >
        {/* ── Top Row: Headline left + Body right ── */}

        {/* ── Bottom Row: 4 Stats Unified Grid ── */}
        <OrganizationStatsGrid
          stats={orgInfo?.stats}
          showDescription={true}
          itemBgClassName="bg-canvas-white dark:bg-zinc-950 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80"
          className="pioneer-reveal mt-8 md:mt-12"
        />
      </div>
    </section>
  );
}
