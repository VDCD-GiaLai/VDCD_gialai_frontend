"use client";

import * as React from "react";
import { CareersHero } from "./careers-hero";
import { CareersStats } from "./careers-stats";
import { CareersBenefits } from "./careers-benefits";
import { CareersPositions } from "./careers-positions";
import { CareersProcess } from "./careers-process";
import { CareersEnvironment } from "./careers-environment";
import { CareersFaq } from "./careers-faq";
import { CareersCta } from "./careers-cta";
import "./careers.css";

export function CareersPageContent() {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <CareersHero />
      <CareersStats />
      <CareersBenefits />
      <CareersPositions />
      <CareersProcess />
      <CareersEnvironment />
      <CareersFaq />
      <CareersCta />
    </div>
  );
}
