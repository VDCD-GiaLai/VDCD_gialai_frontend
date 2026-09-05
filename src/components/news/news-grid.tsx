"use client";

import * as React from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import { MagnifyingGlass, Calendar } from "@phosphor-icons/react";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@heroui/react";
import { fetchArticlesFromApi } from "@/services/article.service";
import { NEWS_CATEGORIES } from "@/data/news.data";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

const ITEMS_PER_PAGE = 9;

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ────────────────────────────────────────────────────────
   Card A — Vertical card (image top, text below)
   Used: 1st row (3-col grid), last rows
   ──────────────────────────────────────────────────────── */

interface VerticalCardProps {
  article: Article;
  priority?: boolean;
}

const VerticalCard = ({ article, priority = false }: VerticalCardProps) => {
  const excerpt =
    article.excerpt ||
    article.metaDescription ||
    (typeof article.content === "string"
      ? article.content.replace(/<[^>]*>/g, "").slice(0, 100)
      : "") ||
    "";

  return (
    <motion.article className="article-card group" variants={fadeInUp}>
      <Link
        href={`/news/${article.slug}`}
        className="block h-full"
        aria-label={`Đọc bài viết: ${article.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.thumbnail ? (
            <OptimizedImage
              src={article.thumbnail}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading={priority ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center">
              <span className="text-zinc-400 dark:text-zinc-600 font-heading text-sm">
                VDCD
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            {article.category && (
              <span className="category-badge">{article.category}</span>
            )}
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1 text-[11px] text-secondary dark:text-zinc-500">
                <Calendar weight="thin" className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-bold text-black dark:text-white font-heading tracking-tight leading-snug line-clamp-2 group-hover:text-accent-red transition-colors duration-300 mb-1.5">
            {article.title}
          </h3>
          {excerpt && (
            <p className="text-secondary dark:text-zinc-400 text-[13px] leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

/* ────────────────────────────────────────────────────────
   Card B — Wide horizontal card (image left 40%, text right)
   Used: 2nd row, spans full width
   ──────────────────────────────────────────────────────── */

interface WideCardProps {
  article: Article;
}

const WideCard = ({ article }: WideCardProps) => {
  const excerpt =
    article.excerpt ||
    article.metaDescription ||
    (typeof article.content === "string"
      ? article.content.replace(/<[^>]*>/g, "").slice(0, 200)
      : "") ||
    "";

  return (
    <motion.article className="news-wide-card group" variants={fadeInUp}>
      <Link
        href={`/news/${article.slug}`}
        className="block"
        aria-label={`Đọc bài viết: ${article.title}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[220px] overflow-hidden">
            {article.thumbnail ? (
              <OptimizedImage
                src={article.thumbnail}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-600 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full min-h-[180px] bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center">
                <span className="text-zinc-400 dark:text-zinc-600 font-heading text-lg">
                  VDCD
                </span>
              </div>
            )}
          </div>
          <div className="p-5 md:p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              {article.category && (
                <span className="category-badge">{article.category}</span>
              )}
              {article.publishedAt && (
                <span className="inline-flex items-center gap-1 text-[11px] text-secondary dark:text-zinc-500">
                  <Calendar weight="thin" className="w-3 h-3" />
                  {formatDate(article.publishedAt)}
                </span>
              )}
            </div>
            <h3 className="text-base md:text-lg font-bold text-black dark:text-white font-heading tracking-tight leading-snug line-clamp-2 group-hover:text-accent-red transition-colors duration-300 mb-2">
              {article.title}
            </h3>
            {excerpt && (
              <p className="text-secondary dark:text-zinc-400 text-[13px] leading-relaxed line-clamp-2">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

/* ────────────────────────────────────────────────────────
   Card C — Text-only minimal row (for list density)
   Used: sidebar or compact list
   ──────────────────────────────────────────────────────── */

interface TextRowProps {
  article: Article;
}

const TextRow = ({ article }: TextRowProps) => (
  <motion.article className="group" variants={fadeInUp}>
    <Link
      href={`/news/${article.slug}`}
      className="news-text-row block"
      aria-label={`Đọc bài viết: ${article.title}`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          {article.category && (
            <span className="category-badge text-[9px]">
              {article.category}
            </span>
          )}
          {article.publishedAt && (
            <span className="text-[11px] text-secondary dark:text-zinc-500">
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>
        <h3 className="text-[14px] font-bold text-black dark:text-white font-heading tracking-tight leading-snug line-clamp-2 group-hover:text-accent-red transition-colors duration-300">
          {article.title}
        </h3>
      </div>
    </Link>
  </motion.article>
);

/* ────────────────────────────────────────────────────────
   Skeleton loaders
   ──────────────────────────────────────────────────────── */

const VerticalSkeleton = () => (
  <div className="article-card">
    <Skeleton className="aspect-[16/10] w-full rounded-none" />
    <div className="p-5 space-y-2">
      <div className="flex gap-2">
        <Skeleton className="rounded-sm w-14 h-3.5" />
        <Skeleton className="rounded-sm w-20 h-3.5" />
      </div>
      <Skeleton className="rounded-sm w-full h-4" />
      <Skeleton className="rounded-sm w-3/4 h-4" />
      <Skeleton className="rounded-sm w-full h-8" />
    </div>
  </div>
);

const WideSkeleton = () => (
  <div className="news-wide-card">
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
      <Skeleton className="aspect-[16/10] md:min-h-[220px] w-full rounded-none" />
      <div className="p-5 md:p-6 space-y-2 flex flex-col justify-center">
        <div className="flex gap-2">
          <Skeleton className="rounded-sm w-14 h-3.5" />
          <Skeleton className="rounded-sm w-20 h-3.5" />
        </div>
        <Skeleton className="rounded-sm w-full h-5" />
        <Skeleton className="rounded-sm w-2/3 h-5" />
        <Skeleton className="rounded-sm w-full h-8" />
      </div>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────
   Mixed Editorial Layout
   Row 1: 3 vertical cards
   Row 2: 1 wide horizontal card (full-width)
   Row 3: 2 vertical cards + stacked text rows
   Remaining: 3-col vertical cards
   ──────────────────────────────────────────────────────── */

interface EditorialLayoutProps {
  articles: Article[];
}

const EditorialLayout = ({ articles }: EditorialLayoutProps) => {
  if (articles.length === 0) return null;

  /* Slice articles into layout groups */
  const row1 = articles.slice(0, 3); // 3 vertical cards
  const row2 = articles[3]; // 1 wide card
  const row3Cards = articles.slice(4, 6); // 2 vertical cards
  const row3TextRows = articles.slice(6, 9); // up to 3 text rows
  const remaining = articles.slice(9); // rest as vertical cards

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="space-y-6"
    >
      {/* Row 1 — 3-column vertical cards */}
      {row1.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {row1.map((a) => (
            <VerticalCard key={a.id} article={a} priority />
          ))}
        </div>
      )}

      {/* Row 2 — Wide horizontal card (different layout family) */}
      {row2 && <WideCard article={row2} />}

      {/* Row 3 — Mixed: 2 vertical cards left + text rows right */}
      {(row3Cards.length > 0 || row3TextRows.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-6">
          {row3Cards.map((a) => (
            <VerticalCard key={a.id} article={a} />
          ))}
          {row3TextRows.length > 0 && (
            <div className="flex flex-col divide-y divide-zinc-200/50 dark:divide-zinc-800/40 border border-zinc-200/40 dark:border-zinc-800/30 bg-zinc-50/50 dark:bg-zinc-900/20">
              {row3TextRows.map((a) => (
                <TextRow key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Remaining — standard 3-col grid */}
      {remaining.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remaining.map((a) => (
            <VerticalCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────
   Main Component
   ──────────────────────────────────────────────────────── */

export const NewsGrid = () => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState("Tất cả");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let ignore = false;
    const doFetch = async () => {
      setIsLoading(true);
      try {
        const category =
          activeCategory === "Tất cả" ? undefined : activeCategory;
        const tags = searchQuery || undefined;
        const result = await fetchArticlesFromApi({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          category,
          tags,
        });
        if (!ignore) {
          setArticles(result.items);
          setTotalPages(result.totalPages);
        }
      } catch {
        if (!ignore) {
          setArticles([]);
          setTotalPages(1);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      ignore = true;
    };
  }, [currentPage, activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("Tất cả");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== "" || activeCategory !== "Tất cả";

  return (
    <section
      id="articles"
      className="scroll-mt-28"
      aria-labelledby="articles-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Toolbar: category tabs + search */}
        <motion.div
          className="pt-10 md:pt-14 pb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <nav className="news-category-nav" aria-label="Chuyên mục tin tức">
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`news-category-tab ${
                    activeCategory === cat ? "news-category-tab--active" : ""
                  }`}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="relative flex-shrink-0">
              <MagnifyingGlass
                weight="thin"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary dark:text-zinc-500"
              />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="news-search-input"
                aria-label="Tìm kiếm bài viết"
              />
            </div>
          </div>

          <hr className="news-divider mt-5" />
        </motion.div>

        {/* Results count + clear */}
        <div className="flex items-center justify-between mb-6">
          <p
            id="articles-heading"
            className="font-mono-label text-[11px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest"
          >
            {isLoading ? "Đang tải..." : `${articles.length} bài viết`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[11px] font-mono-label font-bold text-accent-red uppercase tracking-widest hover:underline cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <VerticalSkeleton key={`v-${i}`} />
              ))}
            </div>
            <WideSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <VerticalSkeleton key={`v2-${i}`} />
              ))}
            </div>
          </div>
        ) : articles.length > 0 ? (
          <EditorialLayout articles={articles} />
        ) : (
          <EmptyState
            title="Không tìm thấy bài viết"
            description="Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem thêm bài viết."
            actionLabel="Xóa bộ lọc"
            onAction={handleClearFilters}
          />
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-12 pb-4">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
            />
          </div>
        )}
      </div>
    </section>
  );
};
