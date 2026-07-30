"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@heroui/react";
import { NewsCard } from "./news-card";
import { fetchArticlesFromApi } from "@/services/article.service";
import { NEWS_CATEGORIES } from "@/data/news.data";
import type { Article } from "@/types";

const ITEMS_PER_PAGE = 9;

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, isActive, onClick }: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-xs font-mono-label font-bold uppercase tracking-wider rounded-full border transition-all duration-300 cursor-pointer ${
      isActive
        ? "filter-chip-active"
        : "border-zinc-200 dark:border-zinc-800 text-secondary dark:text-zinc-400 hover:border-accent-red hover:text-accent-red bg-white dark:bg-zinc-950"
    }`}
    aria-pressed={isActive}
  >
    {label}
  </button>
);

const ArticleSkeletonCard = () => (
  <div className="article-card">
    <Skeleton className="aspect-[16/10] w-full rounded-none" />
    <div className="p-5 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="rounded-md w-16 h-5" />
        <Skeleton className="rounded-md w-24 h-5" />
      </div>
      <Skeleton className="rounded-md w-full h-5" />
      <Skeleton className="rounded-md w-3/4 h-5" />
      <Skeleton className="rounded-md w-full h-12" />
      <Skeleton className="rounded-md w-20 h-4" />
    </div>
  </div>
);

export const NewsGrid = () => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState("Tất cả");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const handleFetch = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const category = activeCategory === "Tất cả" ? undefined : activeCategory;
      const tags = searchQuery || undefined;
      const result = await fetchArticlesFromApi({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        category,
        tags,
      });
      setArticles(result.items);
      setTotalPages(result.totalPages);
    } catch {
      setArticles([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, activeCategory, searchQuery]);

  React.useEffect(() => {
    handleFetch();
  }, [handleFetch]);

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
      className="py-16 md:py-24 scroll-mt-28"
      aria-labelledby="articles-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Tất cả bài viết
          </span>
          <h2
            id="articles-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Tin tức & Bài viết
          </h2>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Search */}
          <div className="relative max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, từ khóa..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-accent-red transition-colors duration-300"
              aria-label="Tìm kiếm bài viết"
            />
          </div>

          {/* Category filter */}
          <div>
            <p className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest mb-3">
              Chuyên mục
            </p>
            <div className="flex flex-wrap gap-2">
              {NEWS_CATEGORIES.map((cat) => (
                <FilterChip
                  key={cat}
                  label={cat}
                  isActive={activeCategory === cat}
                  onClick={() => handleCategoryChange(cat)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono-label text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
            {isLoading ? "Đang tải..." : `${articles.length} bài viết`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-mono-label font-bold text-accent-red uppercase tracking-widest hover:underline cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Article grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleSkeletonCard key={i} />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </motion.div>
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
          <div className="mt-12">
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
