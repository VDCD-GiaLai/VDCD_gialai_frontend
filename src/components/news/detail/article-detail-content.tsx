"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiTag,
  FiArrowLeft,
  FiShare2,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { fetchArticleBySlugFromApi } from "@/services/article.service";
import { formatDate, copyToClipboard } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { ArticleDetail } from "@/types";
import "../news.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ArticleDetailContentProps {
  slug: string;
}

export const ArticleDetailContent = ({ slug }: ArticleDetailContentProps) => {
  const [article, setArticle] = React.useState<ArticleDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchArticleBySlugFromApi(slug);
        setArticle(data);
      } catch {
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [slug]);

  const handleCopyLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleShareFacebook = () => {
    if (typeof window === "undefined") return;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleShareTwitter = () => {
    if (typeof window === "undefined") return;
    const text = article?.title || "";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-white dark:bg-zinc-950">
        <LoadingSpinner label="Đang tải bài viết..." />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-white dark:bg-zinc-950 px-4">
        <h1 className="text-2xl font-bold font-heading text-on-surface dark:text-white mb-4">
          Bài viết không tồn tại
        </h1>
        <p className="text-secondary dark:text-zinc-400 mb-6">
          Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300"
        >
          <FiArrowLeft className="w-4 h-4" />
          Quay lại tin tức
        </Link>
      </div>
    );
  }

  const tags = article.tags
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Image */}
      {article.thumbnail && (
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[520px] overflow-hidden">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <motion.div
          className={article.thumbnail ? "-mt-24 relative z-10" : "pt-32"}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              Quay lại tin tức
            </Link>
          </div>

          {/* Article header card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-whisper-border dark:border-zinc-800 p-6 md:p-10 mb-8 shadow-sm">
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {article.category && (
                <span className="category-badge">{article.category}</span>
              )}
              {article.publishedAt && (
                <span className="inline-flex items-center gap-1.5 text-xs text-secondary dark:text-zinc-500">
                  <FiCalendar className="w-3.5 h-3.5" />
                  {formatDate(article.publishedAt)}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white font-heading tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 text-[11px] font-mono-label font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 rounded-full"
                  >
                    <FiTag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article body */}
          {article.content && (
            <div
              className="article-content mb-10"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          {/* Share section */}
          <div className="flex items-center gap-4 py-6 border-t border-whisper-border dark:border-zinc-800 mb-10">
            <span className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
              Chia sẻ
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareFacebook}
                className="share-button"
                aria-label="Chia sẻ trên Facebook"
              >
                <FiShare2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleShareTwitter}
                className="share-button"
                aria-label="Chia sẻ trên Twitter"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="share-button"
                aria-label="Sao chép liên kết"
              >
                {isCopied ? (
                  <FiCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FiCopy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Linked entities */}
          {(article.project || article.program || article.solution) && (
            <div className="mb-10 p-5 rounded-xl border border-whisper-border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest block mb-3">
                Liên quan đến
              </span>
              <div className="flex flex-wrap gap-3">
                {article.project && (
                  <Link
                    href={`/projects/${article.project.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-zinc-800 border border-whisper-border dark:border-zinc-700 rounded-lg hover:border-accent-red hover:text-accent-red transition-all duration-300"
                  >
                    Dự án: {article.project.title}
                  </Link>
                )}
                {article.program && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-zinc-800 border border-whisper-border dark:border-zinc-700 rounded-lg">
                    Chương trình: {article.program.title}
                  </span>
                )}
                {article.solution && (
                  <Link
                    href={`/solution/${article.solution.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-zinc-800 border border-whisper-border dark:border-zinc-700 rounded-lg hover:border-accent-red hover:text-accent-red transition-all duration-300"
                  >
                    Giải pháp: {article.solution.title}
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <section className="mb-16" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="font-heading text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight mb-6"
              >
                Bài viết liên quan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {article.relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="related-article-card group block"
                    aria-label={`Đọc: ${related.title}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {related.thumbnail ? (
                        <Image
                          src={related.thumbnail}
                          alt={related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
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
                    <div className="p-4">
                      {related.publishedAt && (
                        <span className="text-xs text-secondary dark:text-zinc-500 mb-2 block">
                          {formatDate(related.publishedAt)}
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-black dark:text-white font-heading tracking-tight line-clamp-2 group-hover:text-accent-red transition-colors duration-300">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to news */}
          <div className="pb-16 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
            >
              <FiArrowLeft className="w-4 h-4" />
              Xem tất cả bài viết
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
