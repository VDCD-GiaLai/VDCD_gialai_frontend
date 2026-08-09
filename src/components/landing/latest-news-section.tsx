"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ArrowRight } from "@phosphor-icons/react";
import { fetchFeaturedArticlesFromApi } from "@/services/article.service";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Article } from "@/types";

/* ── helpers ── */
function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function categoryLabel(c?: string) {
  return c?.toUpperCase() ?? "TIN TỨC";
}

/* ────────────────────────────────────────────────────────
   Sun Group–inspired News Layout
   Row 1: Featured (image left + text right)
   Row 2: CTA block left + 3 article cards right
   ──────────────────────────────────────────────────────── */

export function LatestNewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchFeaturedArticlesFromApi(5).then(setArticles);
  }, []);

  const containerRef = useScrollReveal({
    targets: ".news-reveal",
    options: { y: 24, blur: 4, duration: 0.8, ease: "power3.out" },
  });

  if (articles.length === 0) return null;

  const featured = articles[0];
  const rest = articles.slice(1, 5);

  return (
    <section
      id="latest-news"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-5 md:py-7"
      >
        {/* ── ROW 1: Featured Article (image left + text right) ── */}
        <Link
          href={`/news/${featured.slug}`}
          className="news-reveal group grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-zinc-200 dark:border-zinc-800 pb-5 md:pb-6 mb-5 md:mb-6"
        >
          {/* Image */}
          <div className="relative h-[220px] md:h-[280px] overflow-hidden">
            <OptimizedImage
              src={featured.thumbnail || "/images/placeholder.webp"}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              transformation={[{ width: 1200, quality: 90, format: "auto" }]}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-0 pt-5 lg:pt-0 lg:px-8 xl:px-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold text-accent-red font-mono-label uppercase tracking-widest">
                {categoryLabel(featured.category)}
              </span>
              <span className="text-[10px] text-secondary dark:text-zinc-500">
                ● {fmtDate(featured.publishedAt)}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-snug font-heading line-clamp-3 group-hover:text-accent-red transition-colors duration-300">
              {featured.title}
            </h3>
            {featured.metaDescription && (
              <p className="text-sm text-secondary dark:text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                {featured.metaDescription}
              </p>
            )}
          </div>
        </Link>

        {/* ── ROW 2: CTA block left + article cards grid right ── */}
        <div className="news-reveal grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5 md:gap-6">
          {/* Left: Branding CTA Block */}
          <div className="flex flex-col justify-center lg:border-r border-zinc-200 dark:border-zinc-800 lg:pr-8">
            <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
              VDCD Group
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Tin Tức
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 mt-4 text-accent-red font-mono-label text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Xem tất cả
              <span className="w-5 h-5 border border-accent-red/40 rotate-45 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 -rotate-45 text-accent-red" weight="thin" />
              </span>
            </Link>
          </div>

          {/* Right: Grid of article cards — fills available space */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rest.map((a) => (
              <Link
                key={a.id}
                href={`/news/${a.slug}`}
                className="group flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/2] overflow-hidden mb-2">
                  <OptimizedImage
                    src={a.thumbnail || "/images/placeholder.webp"}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    transformation={[
                      { width: 800, quality: 90, format: "auto" },
                    ]}
                  />
                  {/* Diamond accent badge */}
                  <span className="absolute bottom-2 right-2 w-5 h-5 border border-accent-red/40 rotate-45 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 -rotate-45 text-accent-red" weight="thin" />
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-accent-red font-mono-label uppercase tracking-widest">
                    {categoryLabel(a.category)}
                  </span>
                  <span className="text-[10px] text-secondary dark:text-zinc-500">
                    ● {fmtDate(a.publishedAt)}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xs md:text-sm font-bold text-black dark:text-white leading-snug font-heading line-clamp-2 group-hover:text-accent-red transition-colors duration-300">
                  {a.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
