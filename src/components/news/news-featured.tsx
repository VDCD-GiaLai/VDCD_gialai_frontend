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

interface NewsFeaturedProps {
  article: Article;
}

export const NewsFeatured = ({ article }: NewsFeaturedProps) => {
  const excerpt =
    article.metaDescription ||
    article.content?.replace(/<[^>]*>/g, "").slice(0, 200) ||
    "";

  return (
    <section className="py-8 md:py-12" aria-labelledby="featured-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Bài viết nổi bật
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Link
            href={`/news/${article.slug}`}
            className="block featured-article-card group"
            aria-label={`Đọc bài viết nổi bật: ${article.title}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
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

              {/* Content */}
              <div className="p-6 md:p-10 flex flex-col justify-center">
                {/* Category & Date */}
                <div className="flex items-center gap-3 mb-4">
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
                <h2
                  id="featured-heading"
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white font-heading tracking-tight mb-4 group-hover:text-accent-red transition-colors duration-300"
                >
                  {article.title}
                </h2>

                {/* Excerpt */}
                {excerpt && (
                  <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {excerpt}
                  </p>
                )}

                {/* Read more */}
                <div className="flex items-center gap-2 font-mono-label text-xs font-bold uppercase tracking-widest text-accent-red group-hover:gap-3 transition-all duration-300">
                  Đọc bài viết
                  <FiArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
