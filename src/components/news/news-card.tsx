"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCalendar, FiArrowUpRight } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const excerpt =
    article.metaDescription ||
    article.content?.replace(/<[^>]*>/g, "").slice(0, 120) ||
    "";

  return (
    <motion.article className="article-card group" variants={fadeInUp}>
      <Link
        href={`/news/${article.slug}`}
        className="block"
        aria-label={`Đọc bài viết: ${article.title}`}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {article.thumbnail ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
              <span className="text-zinc-400 dark:text-zinc-600 font-heading text-sm">
                VDCD
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category & Date */}
          <div className="flex items-center gap-3 mb-3">
            {article.category && (
              <span className="category-badge">{article.category}</span>
            )}
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1.5 text-xs text-secondary dark:text-zinc-500">
                <FiCalendar className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-black dark:text-white font-heading tracking-tight mb-2 line-clamp-2 group-hover:text-accent-red transition-colors duration-300">
            {article.title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
              {excerpt}
            </p>
          )}

          {/* Read more */}
          <span className="inline-flex items-center gap-1.5 font-mono-label text-xs font-bold uppercase tracking-widest text-accent-red group-hover:gap-2.5 transition-all duration-300">
            Đọc tiếp
            <FiArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};
