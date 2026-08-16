"use client";

import React from "react";
import { OrganizationStatsGrid } from "@/components/ui/organization-stats-grid";
import type { OrganizationStats } from "@/services/hero.service";

interface EcosystemNetworkProps {
  stats?: OrganizationStats | null;
}

export function EcosystemNetwork({ stats }: EcosystemNetworkProps) {
  return (
    <section className="space-y-8 select-none">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
          NĂNG LỰC & MẠNG LƯỚI HỆ SINH THÁI
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
          Năng Lực Quy Mô & Mạng Lưới Toàn Quốc
        </h2>
      </div>

      {/* Grid Stats with 1px border lines */}
      <OrganizationStatsGrid stats={stats} showDescription={true} />
    </section>
  );
}
