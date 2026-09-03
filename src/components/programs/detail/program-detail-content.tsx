"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ShareNetwork, Copy, Check } from "@phosphor-icons/react";
import { fetchProgramBySlugFromApi } from "@/services/program.service";
import { formatDate, copyToClipboard } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { APP_ROUTES } from "@/lib/constants";
import type { ProgramDetail } from "@/types";
import "../programs.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ProgramDetailContentProps {
  slug: string;
}

export const ProgramDetailContent = ({ slug }: ProgramDetailContentProps) => {
  const [program, setProgram] = React.useState<ProgramDetail | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProgramBySlugFromApi(slug);
        setProgram(data);
      } catch {
        setProgram(null);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-white dark:bg-zinc-950">
        <LoadingSpinner label="Đang tải chương trình..." />
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-canvas-white dark:bg-zinc-950 px-4">
        <h1 className="text-2xl font-bold font-heading text-on-surface dark:text-white mb-4">
          Chương trình không tồn tại
        </h1>
        <p className="text-secondary dark:text-zinc-400 mb-6">
          Chương trình bạn tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.
        </p>
        <Link
          href={APP_ROUTES.PROGRAMS}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300"
        >
          <ArrowLeft weight="thin" className="w-4 h-4" />
          Quay lại chương trình
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Image */}
      {program.thumbnail && (
        <div className="relative w-full h-[300px] md:h-[450px] lg:h-[520px] overflow-hidden">
          <Image
            src={program.thumbnail}
            alt={program.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Program Content */}
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <motion.div
          className={program.thumbnail ? "-mt-24 relative z-10" : "pt-32"}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href={APP_ROUTES.PROGRAMS}
              className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
            >
              <ArrowLeft weight="thin" className="w-3.5 h-3.5" />
              Quay lại chương trình
            </Link>
          </div>

          {/* Program header card */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-whisper-border dark:border-zinc-800 p-6 md:p-10 mb-8 shadow-sm">
            {/* Field badge */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {program.field?.name && (
                <span className="category-badge">{program.field.name}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white font-heading tracking-tight mb-4 leading-tight">
              {program.title}
            </h1>

            {/* Short description */}
            {program.shortDescription && (
              <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                {program.shortDescription}
              </p>
            )}
          </div>

          {/* Program body */}
          {program.content && (
            <div
              className="program-content mb-10"
              dangerouslySetInnerHTML={{ __html: program.content }}
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
                <ShareNetwork weight="thin" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="share-button"
                aria-label="Sao chép liên kết"
              >
                {isCopied ? (
                  <Check weight="thin" className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy weight="thin" className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {program.relatedArticles && program.relatedArticles.length > 0 && (
            <section className="mb-16" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="font-heading text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight mb-6"
              >
                Bài viết liên quan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {program.relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="program-related-card group block"
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

          {/* Back to programs */}
          <div className="pb-16 text-center">
            <Link
              href={APP_ROUTES.PROGRAMS}
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
            >
              <ArrowLeft weight="thin" className="w-4 h-4" />
              Xem tất cả chương trình
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
