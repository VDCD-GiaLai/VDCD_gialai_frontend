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
import { APP_ROUTES } from "@/lib/constants";
import type {
  ProgramDetail,
  Program,
  SlideDetailBlogBlock,
  SlideDetailBlogContent,
  ListItemObject,
} from "@/types";
import { CtaBlockRenderer } from "@/components/content-blocks/cta-block-renderer";
import "@/components/slides/detail/slide-detail.css";
import "../programs.css";

interface ProgramDetailContentProps {
  program: ProgramDetail;
  relatedPrograms?: Program[];
}

export function ProgramDetailContent({
  program,
  relatedPrograms = [],
}: ProgramDetailContentProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  // ── 1. Reading Progress Bar ──
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ── 2. Parse & Normalize Content ──
  const { parsedContent, legacyHtml } = React.useMemo(() => {
    const raw = program.content;
    if (!raw) {
      return { parsedContent: null, legacyHtml: null };
    }
    if (typeof raw === "object" && "blocks" in raw) {
      return { parsedContent: raw as SlideDetailBlogContent, legacyHtml: null };
    }
    if (typeof raw === "string") {
      const trimmed = raw.trim();
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (
            parsed &&
            typeof parsed === "object" &&
            (parsed.blocks || parsed.version)
          ) {
            return {
              parsedContent: parsed as SlideDetailBlogContent,
              legacyHtml: null,
            };
          }
        } catch {
          // Fall back to raw string
        }
      }
      return { parsedContent: null, legacyHtml: raw };
    }
    return { parsedContent: null, legacyHtml: null };
  }, [program.content]);

  const blocks: SlideDetailBlogBlock[] = React.useMemo(
    () => parsedContent?.blocks ?? [],
    [parsedContent],
  );

  // ── 3. Calculate Reading Time ──
  const readingTimeMinutes = React.useMemo(() => {
    let textContent = [program.title, program.shortDescription || ""].join(" ");

    if (blocks.length > 0) {
      const extractText = (blockList: SlideDetailBlogBlock[]): string => {
        return blockList
          .map((b) => {
            if (
              b.type === "paragraph" ||
              b.type === "heading" ||
              b.type === "quote"
            ) {
              return b.text;
            }
            if (b.type === "highlight") return `${b.title || ""} ${b.text}`;
            if (b.type === "list") {
              return b.items
                .map((i) => (typeof i === "object" ? i.content : i))
                .join(" ");
            }
            if (b.type === "section") {
              return `${b.title} ${extractText(b.children || [])}`;
            }
            return "";
          })
          .join(" ");
      };
      textContent += " " + extractText(blocks);
    } else if (legacyHtml) {
      textContent += " " + legacyHtml;
    }

    const words = textContent
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [program, blocks, legacyHtml]);

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
    const text = program.title || "";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // ── 5. Recursive List Item Renderer ──
  const renderListItem = (
    item: string | ListItemObject,
    index: number,
  ): React.ReactNode => {
    if (typeof item === "string") {
      return (
        <li key={index}>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      );
    }

    return (
      <li key={item.id || index}>
        <span dangerouslySetInnerHTML={{ __html: item.content }} />
        {item.children && item.children.length > 0 && (
          <ul className="pl-4 mt-2 space-y-1.5 list-circle">
            {item.children.map((sub, subIdx) => renderListItem(sub, subIdx))}
          </ul>
        )}
      </li>
    );
  };

  // ── 6. Block Dispatcher ──
  const renderBlock = (block: SlideDetailBlogBlock): React.ReactNode => {
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

              return (
                <Tag
                  className={headingClasses[block.level] || headingClasses[2]}
                >
                  {block.text}
                </Tag>
              );
            }

            case "paragraph":
              return (
                <p
                  className="slide-blog-paragraph mb-4"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );

            case "image":
              return block.url ? (
                <figure className="my-6 slide-blog-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={block.alt || "Hình ảnh chương trình"}
                    className="w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  {block.caption && (
                    <figcaption className="mt-2.5 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null;

            case "list":
              return (
                <ul className="slide-blog-list space-y-2 my-4 pl-2 text-base leading-relaxed">
                  {block.items.map((item, idx) => renderListItem(item, idx))}
                </ul>
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
                  href={APP_ROUTES.PROGRAMS}
                  className="hover:text-accent-red transition-colors"
                >
                  Chương trình
                </Link>
              </li>
              {program.field && (
                <>
                  <li>/</li>
                  <li className="text-zinc-600 dark:text-zinc-300">
                    {program.field.name}
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="flex items-center gap-4 text-xs text-secondary dark:text-zinc-400">
            {(program.publishedAt || program.createdAt) && (
              <span className="inline-flex items-center gap-1.5 font-mono-label">
                <Calendar className="w-3.5 h-3.5" weight="thin" />
                {formatDate(program.publishedAt || program.createdAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 font-mono-label">
              <Clock className="w-3.5 h-3.5" weight="thin" />
              {readingTimeMinutes} phút đọc
            </span>
          </div>
        </div>

        {/* ── 3. Program Hero Header ── */}
        <header className="space-y-4 mb-8">
          {program.field?.name && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ca2a30]/10 px-3.5 py-1 text-xs font-bold text-[#ca2a30] uppercase tracking-wider font-mono-label">
              <Briefcase className="w-3.5 h-3.5" weight="bold" />
              <span>{program.field.name}</span>
            </div>
          )}

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#011A42] dark:text-white leading-[1.15]">
            {program.title}
          </h1>

          {program.shortDescription && (
            <p className="text-base sm:text-lg leading-relaxed text-[#6C7E96] dark:text-zinc-400 font-normal">
              {program.shortDescription}
            </p>
          )}

          {/* Hero Thumbnail */}
          {program.thumbnail && (
            <figure className="my-6 overflow-hidden rounded-2xl shadow-md border border-whisper-border dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={program.thumbnail}
                  alt={program.title}
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </figure>
          )}
        </header>

        {/* ── 4. Main Body Stream ── */}
        <main className="w-full pb-12">
          {blocks.length > 0 ? (
            <div className="space-y-6">
              {blocks.map((block) => renderBlock(block))}
            </div>
          ) : legacyHtml ? (
            <div
              className="slide-blog-paragraph space-y-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: legacyHtml }}
            />
          ) : null}
        </main>

        {/* ── 5. Social Sharing Bar ── */}
        <div className="pt-8 pb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-b border-whisper-border dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs font-bold uppercase tracking-widest text-[#011A42] dark:text-zinc-300">
                Chia sẻ chương trình:
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
                  aria-label="Sao chép liên kết chương trình"
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
              href={APP_ROUTES.PROGRAMS}
              className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-[#ca2a30] uppercase tracking-wider hover:underline underline-offset-4"
            >
              Tất cả chương trình
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </Link>
          </div>
        </div>

        {/* ── 6. Related Programs ── */}
        {relatedPrograms.length > 0 && (
          <section className="pb-16" aria-labelledby="related-programs-heading">
            <div className="flex items-center justify-between mb-6">
              <h3
                id="related-programs-heading"
                className="text-xl font-bold font-heading uppercase text-[#011A42] dark:text-white"
              >
                Chương trình liên quan
              </h3>
              <Link
                href={APP_ROUTES.PROGRAMS}
                className="text-xs font-mono-label font-bold uppercase tracking-wider text-[#ca2a30] hover:underline"
              >
                Xem thêm
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPrograms.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/programs/${rel.slug}`}
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
        {program.relatedArticles && program.relatedArticles.length > 0 && (
          <section className="pb-16" aria-labelledby="related-articles-heading">
            <h3
              id="related-articles-heading"
              className="text-xl font-bold font-heading uppercase text-[#011A42] dark:text-white mb-6"
            >
              Tin tức & Hoạt động liên quan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {program.relatedArticles.map((art) => (
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

        {/* ── 8. Back To Programs Bottom Button ── */}
        <div className="pb-12 text-center">
          <Link
            href={APP_ROUTES.PROGRAMS}
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-[#ca2a30] hover:text-[#ca2a30] transition-all duration-300"
          >
            <ArrowLeft weight="thin" className="w-4 h-4" />
            Quay lại danh sách chương trình
          </Link>
        </div>
      </div>
    </article>
  );
}
