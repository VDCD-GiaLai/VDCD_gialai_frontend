"use client";

import * as React from "react";
import { NewsHero } from "./news-hero";
import { NewsFeatured } from "./news-featured";
import { NewsGrid } from "./news-grid";
import { NewsCta } from "./news-cta";
import { fetchFeaturedArticlesFromApi } from "@/services/article.service";
import type { Article } from "@/types";
import "./news.css";

export const NewsPageContent = () => {
  const [featuredArticle, setFeaturedArticle] = React.useState<Article | null>(
    null,
  );

  React.useEffect(() => {
    const loadFeatured = async () => {
      try {
        const articles = await fetchFeaturedArticlesFromApi(1);
        if (articles.length > 0) {
          setFeaturedArticle(articles[0]);
        }
      } catch {
        // Featured section will simply not render
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      <NewsHero />
      {featuredArticle && <NewsFeatured article={featuredArticle} />}
      <NewsGrid />
      <NewsCta />
    </div>
  );
};
