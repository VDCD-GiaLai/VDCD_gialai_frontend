"use client";

import * as React from "react";
import { NewsHero } from "./news-hero";
import { NewsFeatured } from "./news-featured";
import { NewsGrid } from "./news-grid";
import { NewsCta } from "./news-cta";
import "./news.css";

export const NewsPageContent = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* 1. Editorial Hero — minimal, no CTA */}
      <NewsHero />

      {/* 2. Featured News — 1 primary + secondary stories */}
      <NewsFeatured />

      {/* 3. News Grid — category nav + search + paginated listing */}
      <NewsGrid />

      {/* 4. Understated editorial CTA */}
      <NewsCta />
    </div>
  );
};
