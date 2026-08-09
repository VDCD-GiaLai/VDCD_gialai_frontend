"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { FiArrowRight } from "react-icons/fi";
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
   COMPONENT
   ──────────────────────────────────────────────────────── */

export function LatestNewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchFeaturedArticlesFromApi(3).then(setArticles);
  }, []);

  const containerRef = useScrollReveal({
    targets: ".news-reveal",
    options: { y: 24, blur: 4, duration: 0.8, ease: "power3.out" },
  });

  if (articles.length === 0) return null;

  const featured = articles[0];
  const side = articles.slice(1, 3);

  return (
    <section
      id="latest-news"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16"
      >
        {/* Header row */}
        <div className="news-reveal flex items-end justify-between mb-8 md:mb-12">
          <div>
            <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
              VDCD Group
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white font-heading">
              Tin tức và sự kiện
            </h2>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 text-accent-red font-mono-label text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Xem tất cả <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid: featured left + 2 stacked right */}
        <div className="news-reveal grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {/* Featured — tall card */}
          <Link
            href={`/news/${featured.slug}`}
            className="group relative overflow-hidden h-[360px] md:h-[460px] block"
          >
            <OptimizedImage
              src={featured.thumbnail || "/images/placeholder.webp"}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              transformation={[{ width: 800, quality: 80, format: "auto" }]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block text-[10px] font-bold text-accent-red font-mono-label uppercase tracking-widest mb-2">
                {categoryLabel(featured.category)}
              </span>
              <span className="text-[10px] text-zinc-400 ml-3">
                ● {fmtDate(featured.publishedAt)}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white leading-snug font-heading mt-1 line-clamp-2 group-hover:text-accent-red/90 transition-colors">
                {featured.title}
              </h3>
              {featured.metaDescription && (
                <p className="text-xs text-zinc-300 leading-relaxed mt-2 line-clamp-2 hidden md:block">
                  {featured.metaDescription}
                </p>
              )}
            </div>
          </Link>

          {/* Right stack */}
          <div className="flex flex-col gap-5 md:gap-6">
            {side.map((a) => (
              <Link
                key={a.id}
                href={`/news/${a.slug}`}
                className="group flex gap-4 md:gap-5 h-auto md:h-[217px] overflow-hidden border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40 hover:border-accent-red/20 transition-colors"
              >
                {/* Thumb */}
                <div className="relative w-[140px] md:w-[220px] shrink-0 overflow-hidden">
                  <OptimizedImage
                    src={a.thumbnail || "/images/placeholder.webp"}
                    alt={a.title}
                    fill
                    sizes="220px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    transformation={[
                      { width: 400, quality: 80, format: "auto" },
                    ]}
                  />
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center py-4 pr-4 md:py-5 md:pr-6 min-w-0">
                  <span className="text-[10px] font-bold text-accent-red font-mono-label uppercase tracking-widest">
                    {categoryLabel(a.category)}
                  </span>
                  <span className="text-[10px] text-secondary dark:text-zinc-500 mt-0.5">
                    ● {fmtDate(a.publishedAt)}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-black dark:text-white leading-snug font-heading mt-2 line-clamp-2 group-hover:text-accent-red transition-colors">
                    {a.title}
                  </h3>
                  {a.metaDescription && (
                    <p className="text-xs text-secondary dark:text-zinc-400 leading-relaxed mt-1.5 line-clamp-2 hidden md:block">
                      {a.metaDescription}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-accent-red font-mono-label text-xs font-bold uppercase tracking-widest"
          >
            Xem tất cả <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
