"use client";

import * as React from "react";
import { PageHeroBanner } from "@/components/ui/page-hero-banner";
import { ProgramsGrid } from "./programs-grid";
import { ProgramsCta } from "./programs-cta";
import "./programs.css";

export const ProgramsPageContent = () => {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <PageHeroBanner pageKey="programs" />
      <ProgramsGrid />
      <ProgramsCta />
    </div>
  );
};
