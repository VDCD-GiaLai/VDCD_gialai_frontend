"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import { fetchFeaturedArticlesFromApi } from "@/services/article.service";
import type { Article } from "@/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Primary Featured Card ─────────────────────────────── */

interface PrimaryCardProps {
  article: Article;
}

const PrimaryCard = ({ article }: PrimaryCardProps) => {
  const excerpt =
    article.metaDescription ||
    article.content?.replace(/<[^>]*>/g, "").slice(0, 180) ||
    "";

  return (
    <Link
      href={`/news/${article.slug}`}
      className="news-featured-primary group block"
      aria-label={`Đọc bài viết nổi bật: ${article.title}`}
    >
      {/* Image */}
      <div className="news-featured-primary__image">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="w-full h-full min-h-[260px] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
            <span className="text-zinc-400 dark:text-zinc-600 font-heading text-2xl">
              VDCD
            </span>
          </div>
        )}
      </div>

      {/* Overlay for desktop (text on image) */}
      <div className="news-featured-primary__overlay" />

      {/* Content */}
      <div className="news-featured-primary__content">
        <div className="flex items-center gap-3 mb-3">
          {article.category && (
            <span className="category-badge">{article.category}</span>
          )}
          {article.publishedAt && (
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 lg:text-zinc-300">
              <FiCalendar className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>
        <h2
          id="featured-heading"
          className="text-lg md:text-xl lg:text-2xl font-bold text-black lg:text-white dark:text-white font-heading tracking-tight mb-2 group-hover:text-accent-red lg:group-hover:text-accent-red transition-colors duration-300 line-clamp-3"
        >
          {article.title}
        </h2>
        {excerpt && (
          <p className="hidden lg:block text-zinc-300 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mt-2">
            {excerpt}
          </p>
        )}
      </div>
    </Link>
  );
};

/* ── Sidebar Item ──────────────────────────────────────── */

interface SidebarItemProps {
  article: Article;
}

const SidebarItem = ({ article }: SidebarItemProps) => (
  <Link
    href={`/news/${article.slug}`}
    className="news-featured-sidebar__item group"
    aria-label={`Đọc bài viết: ${article.title}`}
  >
    {/* Thumbnail */}
    <div className="news-featured-sidebar__thumb">
      {article.thumbnail ? (
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          sizes="160px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
          <span className="text-zinc-400 dark:text-zinc-600 text-[10px] font-heading">
            VDCD
          </span>
        </div>
      )}
    </div>

    {/* Text */}
    <div className="flex flex-col justify-center min-w-0">
      <div className="flex items-center gap-2 mb-1.5">
        {article.category && (
          <span className="category-badge text-[9px]">{article.category}</span>
        )}
        {article.publishedAt && (
          <span className="text-[11px] text-secondary dark:text-zinc-500 whitespace-nowrap">
            {formatDate(article.publishedAt)}
          </span>
        )}
      </div>
      <h3 className="text-sm font-bold text-black dark:text-white font-heading tracking-tight line-clamp-3 group-hover:text-accent-red transition-colors duration-300">
        {article.title}
      </h3>
    </div>
  </Link>
);

/* ── Main Featured Component ───────────────────────────── */

export const NewsFeatured = () => {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchFeaturedArticlesFromApi(4);
        setArticles(data);
      } catch {
        // Featured section will simply not render
      } finally {
        setIsLoading(false);
      }
    };
    loadFeatured();
  }, []);

  if (isLoading || articles.length === 0) return null;

  const primary = articles[0];
  const secondary = articles.slice(1, 4);

  return (
    <section
      className="news-featured-section"
      aria-labelledby="featured-heading"
    >
      <motion.div
        className="mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <span className="font-mono-label text-[11px] font-bold text-accent-red tracking-widest uppercase block mb-1">
          Bài viết nổi bật
        </span>
        <hr className="news-divider mt-4" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="news-featured-grid border border-zinc-200/40 dark:border-zinc-800/30">
          {/* Primary story */}
          <PrimaryCard article={primary} />

          {/* Secondary stories sidebar */}
          {secondary.length > 0 && (
            <div className="news-featured-sidebar">
              {secondary.map((article) => (
                <SidebarItem key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
