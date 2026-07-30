"use client";

import * as React from "react";
import { ProgramsHero } from "./programs-hero";
import { ProgramsGrid } from "./programs-grid";
import { ProgramsCta } from "./programs-cta";
import "./programs.css";

export const ProgramsPageContent = () => {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <ProgramsHero />
      <ProgramsGrid />
      <ProgramsCta />
    </div>
  );
};
