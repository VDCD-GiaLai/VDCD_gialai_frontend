"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShareNetwork,
  Copy,
  Check,
  Briefcase,
  Lightbulb,
} from "@phosphor-icons/react";
import { formatDate, copyToClipboard } from "@/lib/utils";
import type {
  SolutionDetail,
  SolutionEntityContract,
  ContentBlock,
  DocumentContent,
  ListItem,
  ListStyleConfig,
  ListType,
  ListStyle,
} from "@/types";
import { CtaBlockRenderer } from "@/components/content-blocks/cta-block-renderer";
import "@/components/slides/detail/slide-detail.css";
import "@/components/programs/programs.css";

interface SolutionDetailContentProps {
  solution: SolutionDetail;
  relatedSolutions?: SolutionEntityContract[];
}

export function SolutionDetailContent({
  solution,
  relatedSolutions = [],
}: SolutionDetailContentProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  // ── 1. Reading Progress Bar ──
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ── 2. Content Blocks ──
  const blocks: ContentBlock[] = React.useMemo(() => {
    if (!solution.content) return [];
    if (
      typeof solution.content === "object" &&
      Array.isArray(solution.content.blocks)
    ) {
      return solution.content.blocks;
    }
    return [];
  }, [solution.content]);

  // ── 3. Calculate Reading Time ──
  const readingTimeMinutes = React.useMemo(() => {
    let textContent = [solution.title, solution.shortDescription || ""].join(
      " ",
    );

    const extractText = (blockList: ContentBlock[]): string => {
      return blockList
        .map((b) => {
          if (
            b.type === "paragraph" ||
            b.type === "heading" ||
            b.type === "quote"
          ) {
            return b.text || "";
          }
          if (b.type === "highlight") {
            return `${b.title || ""} ${b.text || ""}`;
          }
          if (b.type === "list" || b.type === "ordered_list") {
            const getItemsText = (items: (ListItem | string)[]): string => {
              return items
                .map((i) => {
                  if (typeof i === "string") return i;
                  return `${i.content} ${i.children?.length ? getItemsText(i.children) : ""}`;
                })
                .join(" ");
            };
            return getItemsText(b.items);
          }
          if (b.type === "section") {
            return `${b.title} ${extractText(b.children || [])}`;
          }
          return "";
        })
        .join(" ");
    };

    if (blocks.length > 0) {
      textContent += " " + extractText(blocks);
    }

    const words = textContent
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [solution, blocks]);

  // ── 4. Social Sharing Handlers ──
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
    const text = solution.title || "";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // ── 5. Recursive List Tree Renderer (Section 4.3) ──
  const renderListTree = (
    items: (ListItem | string)[],
    depth = 0,
    config?: ListStyleConfig,
    listType: ListType = "bullet",
    listStyle?: ListStyle,
  ): React.ReactNode => {
    const isOrdered =
      listType === "ordered" ||
      listStyle === "decimal" ||
      listStyle === "lower-alpha" ||
      listStyle === "upper-alpha" ||
      listStyle === "lower-roman" ||
      listStyle === "upper-roman";

    const Tag = isOrdered ? "ol" : "ul";

    const getMarkerClass = (d: number): string => {
      if (listType === "checklist") return "list-none";
      if (isOrdered) {
        if (d === 0) return "list-decimal";
        if (d === 1) return "list-[lower-alpha]";
        return "list-[lower-roman]";
      }
      if (d === 0) return "list-disc";
      if (d === 1) return "list-[circle]";
      return "list-[square]";
    };

    return (
      <Tag
        className={`space-y-2 my-2 ${depth === 0 ? "pl-5" : "pl-6"} ${getMarkerClass(depth)} text-base leading-relaxed text-[#2D3748] dark:text-zinc-300`}
      >
        {items.map((item, idx) => {
          if (typeof item === "string") {
            return (
              <li key={idx} className="my-1.5">
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            );
          }

          return (
            <li key={item.id || idx} className="my-1.5">
              {listType === "checklist" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.checked ?? false}
                    readOnly
                    className="rounded border-zinc-300 dark:border-zinc-700 text-accent-red focus:ring-accent-red"
                  />
                  <span dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
              )}
              {item.children && item.children.length > 0 && (
                <div style={{ paddingLeft: `${config?.indentation ?? 24}px` }}>
                  {renderListTree(
                    item.children,
                    depth + 1,
                    config,
                    listType,
                    listStyle,
                  )}
                </div>
              )}
            </li>
          );
        })}
      </Tag>
    );
  };

  // ── 6. Block Dispatcher (Renderer Contract Section 4) ──
  const renderBlock = (block: ContentBlock): React.ReactNode => {
    const spacingStyle: React.CSSProperties = {
      marginTop:
        typeof block.spacing?.marginTop === "number"
          ? `${block.spacing.marginTop}px`
          : undefined,
      marginBottom:
        typeof block.spacing?.marginBottom === "number"
          ? `${block.spacing.marginBottom}px`
          : undefined,
    };

    return (
      <div key={block.id} style={spacingStyle} className="w-full">
        {(() => {
          switch (block.type) {
            case "heading": {
              const Tag = `h${block.level || 2}` as
                "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
              const headingClasses: Record<number, string> = {
                1: "font-heading font-bold text-2xl sm:text-3xl text-[#011A42] dark:text-white uppercase tracking-tight mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800",
                2: "slide-blog-heading-2 mt-8 mb-4 uppercase",
                3: "slide-blog-heading-3 mt-6 mb-3 uppercase",
                4: "font-heading font-semibold text-lg text-[#011A42] dark:text-white mt-5 mb-2.5",
                5: "font-heading font-semibold text-base text-[#011A42] dark:text-white mt-4 mb-2",
                6: "font-heading font-semibold text-sm text-[#011A42] dark:text-white mt-4 mb-2",
              };
              const headingStyle: React.CSSProperties = {
                fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
              };

              return (
                <Tag
                  className={headingClasses[block.level] || headingClasses[2]}
                  style={headingStyle}
                >
                  {block.text}
                </Tag>
              );
            }

            case "paragraph": {
              const pStyle: React.CSSProperties = {
                fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
              };
              return (
                <p
                  className="slide-blog-paragraph mb-4"
                  style={pStyle}
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );
            }

            case "image":
              return block.url ? (
                <figure className="blog-preview-image my-6">
                  <div className="overflow-hidden rounded-xl border border-whisper-border dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={block.url}
                      alt={block.alt || "Hình ảnh giải pháp"}
                      className="w-full object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                  {/* Chỉ render nếu có caption (Section 4.2) */}
                  {block.caption && (
                    <figcaption className="mt-2.5 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null;

            case "list":
            case "ordered_list":
              return renderListTree(
                block.items,
                0,
                block.style,
                block.type === "ordered_list"
                  ? "ordered"
                  : block.listType || "bullet",
                block.listStyle,
              );

            case "section":
              return (
                <section className="my-8 slide-blog-section">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="slide-blog-section__badge">
                      {block.number}
                    </span>
                    <h3 className="slide-blog-section__title uppercase">
                      {block.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {block.children.map((child) => renderBlock(child))}
                  </div>
                </section>
              );

            case "quote":
              return (
                <blockquote className="slide-blog-quote">
                  <p
                    className="slide-blog-quote__text"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                  {(block.author || block.citation) && (
                    <footer className="slide-blog-quote__author">
                      — {block.author}{" "}
                      {block.citation && (
                        <cite className="font-normal italic">
                          ({block.citation})
                        </cite>
                      )}
                    </footer>
                  )}
                </blockquote>
              );

            case "highlight":
              return (
                <aside className="slide-blog-highlight">
                  {block.title && (
                    <h4 className="slide-blog-highlight__title">
                      {block.title}
                    </h4>
                  )}
                  <p
                    className="slide-blog-highlight__text"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                </aside>
              );

            case "cta":
              return <CtaBlockRenderer block={block} />;

            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <article className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-accent-red selection:text-white pt-24 pb-20">
      {/* ── 1. Reading Progress Bar ── */}
      <motion.div className="reading-progress-bar" style={{ scaleX }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* ── 2. Top Navigation & Breadcrumbs ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-whisper-border dark:border-zinc-800">
          <nav
            aria-label="Breadcrumb"
            className="text-xs font-mono-label font-bold uppercase tracking-widest text-secondary dark:text-zinc-400"
          >
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent-red transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/solution"
                  className="hover:text-accent-red transition-colors"
                >
                  Giải pháp
                </Link>
              </li>
              {solution.field && (
                <>
                  <li>/</li>
                  <li className="text-zinc-600 dark:text-zinc-300">
                    {solution.field.name}
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="flex items-center gap-4 text-xs text-secondary dark:text-zinc-400">
            {(solution.publishedAt || solution.createdAt) && (
              <span className="inline-flex items-center gap-1.5 font-mono-label">
                <Calendar className="w-3.5 h-3.5" weight="thin" />
                {formatDate(solution.publishedAt || solution.createdAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-mono-label">
              <Clock className="w-3.5 h-3.5" weight="thin" />
              {readingTimeMinutes} phút đọc
            </span>
          </div>
        </div>

        {/* ── 3. Solution Hero Header ── */}
        <header className="space-y-4 mb-8">
          {solution.field?.name && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ca2a30]/10 px-3.5 py-1 text-xs font-bold text-[#ca2a30] uppercase tracking-wider font-mono-label">
              <Briefcase className="w-3.5 h-3.5" weight="bold" />
              <span>{solution.field.name}</span>
            </div>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#011A42] dark:text-white leading-[1.15]">
            {solution.title}
          </h1>

          {solution.shortDescription && (
            <p className="text-base sm:text-lg leading-relaxed text-[#6C7E96] dark:text-zinc-400 font-normal">
              {solution.shortDescription}
            </p>
          )}

          {/* Hero Thumbnail */}
          {solution.thumbnail && (
            <figure className="my-6 overflow-hidden rounded-2xl shadow-md border border-whisper-border dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={solution.thumbnail}
                  alt={solution.title}
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </figure>
          )}
        </header>

        {/* ── 4. Main Body Stream (Block Document Model) ── */}
        <main className="w-full pb-12">
          {blocks.length > 0 ? (
            <div className="space-y-6">
              {blocks.map((block) => renderBlock(block))}
            </div>
          ) : (
            <div className="py-12 text-center text-secondary dark:text-zinc-400 font-mono-label text-sm">
              Nội dung giải pháp đang được hoàn thiện.
            </div>
          )}
        </main>

        {/* ── 5. Social Sharing Bar ── */}
        <div className="pt-8 pb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-b border-whisper-border dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs font-bold uppercase tracking-widest text-[#011A42] dark:text-zinc-300">
                Chia sẻ giải pháp:
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
                  aria-label="Sao chép liên kết giải pháp"
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
              href="/solution"
              className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-[#ca2a30] uppercase tracking-wider hover:underline underline-offset-4"
            >
              Tất cả giải pháp
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </Link>
          </div>
        </div>

        {/* ── 6. Related Solutions ── */}
        {relatedSolutions.length > 0 && (
          <section
            className="pb-16"
            aria-labelledby="related-solutions-heading"
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                id="related-solutions-heading"
                className="text-xl font-bold font-heading uppercase text-[#011A42] dark:text-white"
              >
                Giải pháp liên quan
              </h3>
              <Link
                href="/solution"
                className="text-xs font-mono-label font-bold uppercase tracking-wider text-[#ca2a30] hover:underline"
              >
                Xem thêm
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedSolutions.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/solution/${rel.slug}`}
                  className="group block rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden hover:border-[#ca2a30] transition-all duration-300 shadow-2xs"
                >
                  {rel.thumbnail && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                      <Image
                        src={rel.thumbnail}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {rel.field?.name && (
                      <p className="text-[11px] font-bold uppercase text-[#ca2a30] tracking-wider mb-2 font-mono-label">
                        {rel.field.name}
                      </p>
                    )}
                    <h4 className="text-base font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 mb-2 line-clamp-2 uppercase font-heading">
                      {rel.title}
                    </h4>
                    {rel.shortDescription && (
                      <p className="text-xs text-[#6C7E96] dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {rel.shortDescription}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 7. Related Articles ── */}
        {solution.relatedArticles && solution.relatedArticles.length > 0 && (
          <section className="pb-16" aria-labelledby="related-articles-heading">
            <h3
              id="related-articles-heading"
              className="text-xl font-bold font-heading uppercase text-[#011A42] dark:text-white mb-6"
            >
              Tin tức & Hoạt động liên quan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {solution.relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/news/${art.slug}`}
                  className="group block rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden hover:border-[#ca2a30] transition-all duration-300 shadow-2xs"
                >
                  {art.thumbnail && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                      <Image
                        src={art.thumbnail}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {art.publishedAt && (
                      <span className="text-[11px] font-mono-label text-[#6C7E96] dark:text-zinc-400 block mb-1.5">
                        {formatDate(art.publishedAt)}
                      </span>
                    )}
                    <h4 className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2">
                      {art.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 8. Back To Solutions Bottom Button ── */}
        <div className="pb-12 text-center">
          <Link
            href="/solution"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-[#ca2a30] hover:text-[#ca2a30] transition-all duration-300"
          >
            <ArrowLeft weight="thin" className="w-4 h-4" />
            Quay lại danh sách giải pháp
          </Link>
        </div>
      </div>
    </article>
  );
}
