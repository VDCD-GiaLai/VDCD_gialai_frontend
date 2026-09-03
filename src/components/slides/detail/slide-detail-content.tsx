"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShareNetwork,
  Copy,
  Check,
} from "@phosphor-icons/react";
import { BlogDetailRenderer } from "./blog-detail-renderer";
import { formatDate, copyToClipboard } from "@/lib/utils";
import type { SlideDetailBlog } from "@/types";
import "./slide-detail.css";

interface SlideDetailContentProps {
  blog: SlideDetailBlog;
  relatedBlogs?: SlideDetailBlog[];
}

export function SlideDetailContent({
  blog,
  relatedBlogs = [],
}: SlideDetailContentProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  // Reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate estimated reading time
  const readingTimeMinutes = React.useMemo(() => {
    const textContent = [
      blog.title,
      blog.excerpt || "",
      ...(blog.content?.blocks || []).map((b) => {
        if (b.type === "paragraph" || b.type === "heading") return b.text;
        if (b.type === "list") return b.items.join(" ");
        if (b.type === "section") return b.title;
        return "";
      }),
    ].join(" ");
    const words = textContent
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [blog]);

  const handleCopyLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleShareFacebook = () => {
    if (typeof window === "undefined") return;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleShareTwitter = () => {
    if (typeof window === "undefined") return;
    const text = blog.title || "";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* ── 1. Reading Progress Bar ── */}
      <motion.div className="reading-progress-bar" style={{ scaleX }} />

      {/* ── 2. Header Container ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-whisper-border dark:border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-[#ca2a30] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" weight="thin" />
            Quay lại Trang chủ
          </Link>

          <div className="flex items-center gap-4 text-xs text-secondary dark:text-zinc-400">
            {blog.createdAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" weight="thin" />
                {formatDate(blog.createdAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" weight="thin" />
              {readingTimeMinutes} phút đọc
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. Visual Content Renderer ── */}
      <main className="w-full pb-12">
        <BlogDetailRenderer blog={blog} />
      </main>

      {/* ── 4. Social Sharing Bar ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-b border-whisper-border dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="font-mono-label text-xs font-bold uppercase tracking-widest text-[#011A42] dark:text-zinc-300">
              Chia sẻ bài viết:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareFacebook}
                className="share-button"
                aria-label="Chia sẻ trên Facebook"
              >
                <ShareNetwork className="w-4 h-4" weight="thin" />
              </button>
              <button
                type="button"
                onClick={handleShareTwitter}
                className="share-button"
                aria-label="Chia sẻ trên Twitter / X"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="share-button"
                aria-label="Sao chép liên kết bài viết"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-emerald-500" weight="bold" />
                ) : (
                  <Copy className="w-4 h-4" weight="thin" />
                )}
              </button>
            </div>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-[#ca2a30] uppercase tracking-wider hover:underline underline-offset-4"
          >
            Xem tất cả dự án & giải pháp
            <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          </Link>
        </div>
      </div>

      {/* ── 5. Related / Next Slides ── */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <h3 className="text-xl font-bold font-heading text-[#011A42] dark:text-white mb-6">
            Dự án & Chuyên đề khác
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedBlogs.map((rel) => (
              <Link
                key={rel.id}
                href={`/slides/${rel.slug}`}
                className="group block p-5 rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-[#ca2a30] transition-all duration-300"
              >
                {rel.subtitle && (
                  <p className="text-[11px] font-semibold uppercase text-[#ca2a30] tracking-wider mb-1.5">
                    {rel.subtitle}
                  </p>
                )}
                <h4 className="text-base font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 mb-2 line-clamp-2">
                  {rel.title}
                </h4>
                {rel.excerpt && (
                  <p className="text-xs text-[#6C7E96] dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
