"use client";

import * as React from "react";
import { CareersHeroSlider } from "./careers-hero-slider";
import { CareersBenefits } from "./careers-benefits";
import { CareersPositions } from "./careers-positions";
import "./careers.css";

export function CareersPageContent() {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <CareersHeroSlider />
      <CareersBenefits />
      <CareersPositions />
    </div>
  );
}
