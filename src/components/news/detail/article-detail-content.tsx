"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  ShareNetwork,
  Copy,
  Check,
  Tag,
  Briefcase,
  Lightbulb,
  SquaresFour,
} from "@phosphor-icons/react";
import { formatDate, copyToClipboard } from "@/lib/utils";
import type {
  Article,
  ArticleDetail,
  SlideDetailBlogBlock,
  SlideDetailBlogContent,
} from "@/types";
import { CtaBlockRenderer } from "@/components/content-blocks/cta-block-renderer";
import "@/components/slides/detail/slide-detail.css";
import "../news.css";

interface ArticleDetailContentProps {
  article: Article;
  relatedArticles?: ArticleDetail["relatedArticles"] | Article[];
}

export function ArticleDetailContent({
  article,
  relatedArticles = [],
}: ArticleDetailContentProps) {
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
    const raw = article.content;
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
          // fallback to HTML string
        }
      }
      return { parsedContent: null, legacyHtml: raw };
    }
    return { parsedContent: null, legacyHtml: null };
  }, [article.content]);

  const heroMeta = parsedContent?.heroMeta;
  const heroPlacement = heroMeta?.placement ?? "above_title";
  const heroPosition = heroMeta?.position ?? "center";
  const heroCaption = heroMeta?.caption ?? "";
  const blocks: SlideDetailBlogBlock[] = React.useMemo(
    () => parsedContent?.blocks ?? [],
    [parsedContent],
  );

  // ── 3. Calculate Reading Time ──
  const readingTimeMinutes = React.useMemo(() => {
    let textContent = [
      article.title,
      article.subtitle || "",
      article.excerpt || "",
    ].join(" ");

    if (blocks.length > 0) {
      const blockText = blocks
        .map((b) => {
          if (
            b.type === "paragraph" ||
            b.type === "heading" ||
            b.type === "quote"
          )
            return b.text;
          if (b.type === "highlight") return `${b.title || ""} ${b.text}`;
          if (b.type === "list")
            return b.items
              .map((i) => (typeof i === "object" ? i.content : i))
              .join(" ");
          if (b.type === "section") return b.title;
          return "";
        })
        .join(" ");
      textContent += " " + blockText;
    } else if (legacyHtml) {
      textContent += " " + legacyHtml;
    }

    const words = textContent
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [article.title, article.subtitle, article.excerpt, blocks, legacyHtml]);

  // ── 4. Tags List ──
  const tagList = React.useMemo(() => {
    if (!article.tags) return [];
    return article.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [article.tags]);

  // ── 5. Social Share Handlers ──
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
    const text = article.title || "";
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // ── 6. Hero Subcomponents ──
  const renderHeroHeader = () => (
    <header className="space-y-2 mb-4" key="hero-header">
      {article.subtitle && (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#ca2a30]">
          {article.subtitle}
        </p>
      )}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#011A42] dark:text-white font-heading">
        {article.title}
      </h1>
    </header>
  );

  const renderHeroExcerpt = () =>
    article.excerpt ? (
      <p
        className="text-base sm:text-lg leading-relaxed text-[#6C7E96] dark:text-zinc-400 font-normal my-4"
        key="hero-excerpt"
      >
        {article.excerpt}
      </p>
    ) : null;

  const renderHeroMedia = () =>
    article.thumbnail ? (
      <figure
        className="my-6 overflow-hidden rounded-xl slide-blog-figure"
        key="hero-media"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.thumbnail}
          alt={article.title || "Ảnh bài viết"}
          className="w-full max-h-[480px] object-cover rounded-xl"
          style={{ objectPosition: heroPosition }}
          loading="eager"
        />
        {heroCaption && (
          <figcaption className="mt-3 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400">
            {heroCaption}
          </figcaption>
        )}
      </figure>
    ) : null;

  // ── 7. Block Stream Renderer ──
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
            case "heading":
              return block.level === 2 ? (
                <h2 className="slide-blog-heading-2 mt-8 mb-4">{block.text}</h2>
              ) : (
                <h3 className="slide-blog-heading-3 mt-6 mb-3">{block.text}</h3>
              );

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
                    alt={block.alt || "Hình ảnh minh hoạ"}
                    className="w-full rounded-lg object-cover"
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
                  {block.items.map((item, idx) => (
                    <li
                      key={typeof item === "object" && item.id ? item.id : idx}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof item === "object" ? item.content : item,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );

            case "section":
              return (
                <section className="my-8 slide-blog-section">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="slide-blog-section__badge">
                      {block.number}
                    </span>
                    <h3 className="slide-blog-section__title">{block.title}</h3>
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
                  {block.author && (
                    <p className="slide-blog-quote__author">— {block.author}</p>
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
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* ── 1. Reading Progress Bar ── */}
      <motion.div className="reading-progress-bar" style={{ scaleX }} />

      {/* ── 2. Top Header & Breadcrumbs ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-whisper-border dark:border-zinc-800">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs font-mono-label font-bold uppercase tracking-widest text-secondary dark:text-zinc-400"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#ca2a30] transition-colors duration-200"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="opacity-50">/</li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-[#ca2a30] transition-colors duration-200"
                >
                  Tin tức
                </Link>
              </li>
              {article.category && (
                <>
                  <li className="opacity-50">/</li>
                  <li className="text-[#011A42] dark:text-zinc-200 line-clamp-1 max-w-[200px]">
                    {article.category}
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Meta Bar: Category Badge + Date + Reading Time */}
          <div className="flex items-center gap-3 text-xs text-secondary dark:text-zinc-400">
            {article.category && (
              <span className="inline-flex items-center rounded-full bg-[#ca2a30]/10 px-2.5 py-0.5 font-semibold text-[#ca2a30]">
                {article.category}
              </span>
            )}
            {article.publishedAt && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" weight="thin" />
                {formatDate(article.publishedAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" weight="thin" />
              {readingTimeMinutes} phút đọc
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. Visual Content Renderer ── */}
      <main className="w-full pb-12">
        <article className="slide-detail-article px-4 sm:px-6 py-6">
          {/* Hero Layout Switcher */}
          {heroPlacement === "above_title" && (
            <>
              {renderHeroMedia()}
              {renderHeroHeader()}
              {renderHeroExcerpt()}
            </>
          )}

          {heroPlacement === "between_title_desc" && (
            <>
              {renderHeroHeader()}
              {renderHeroMedia()}
              {renderHeroExcerpt()}
            </>
          )}

          {heroPlacement === "below_desc" && (
            <>
              {renderHeroHeader()}
              {renderHeroExcerpt()}
              {renderHeroMedia()}
            </>
          )}

          {/* Block Stream Renderer */}
          {blocks.length > 0 ? (
            <div className="mt-8 space-y-6">
              {blocks.map((block) => renderBlock(block))}
            </div>
          ) : legacyHtml ? (
            <div
              className="mt-8 slide-blog-paragraph space-y-4"
              dangerouslySetInnerHTML={{ __html: legacyHtml }}
            />
          ) : null}

          {/* ── Linked Entities (Project / Program / Solution) ── */}
          {(article.project || article.program || article.solution) && (
            <section className="mt-12 pt-8 border-t border-whisper-border dark:border-zinc-800">
              <h4 className="font-mono-label text-xs font-bold uppercase tracking-widest text-[#6C7E96] dark:text-zinc-400 mb-4">
                Nội dung liên quan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {article.project && (
                  <Link
                    href={`/projects/${article.project.slug || article.project.id}`}
                    className="group p-4 rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-[#ca2a30] transition-all duration-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Briefcase
                        className="w-3.5 h-3.5 text-[#ca2a30]"
                        weight="bold"
                      />
                      <span className="text-[11px] font-bold text-[#ca2a30] uppercase tracking-wider font-mono-label">
                        Dự án
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2">
                      {article.project.title}
                    </p>
                  </Link>
                )}

                {article.program && (
                  <Link
                    href={`/programs/${article.program.slug || article.program.id}`}
                    className="group p-4 rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-[#ca2a30] transition-all duration-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <SquaresFour
                        className="w-3.5 h-3.5 text-[#ca2a30]"
                        weight="bold"
                      />
                      <span className="text-[11px] font-bold text-[#ca2a30] uppercase tracking-wider font-mono-label">
                        Chương trình
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2">
                      {article.program.title}
                    </p>
                  </Link>
                )}

                {article.solution && (
                  <Link
                    href={`/solution/${article.solution.slug || article.solution.id}`}
                    className="group p-4 rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-[#ca2a30] transition-all duration-300 shadow-2xs"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Lightbulb
                        className="w-3.5 h-3.5 text-[#ca2a30]"
                        weight="bold"
                      />
                      <span className="text-[11px] font-bold text-[#ca2a30] uppercase tracking-wider font-mono-label">
                        Giải pháp
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2">
                      {article.solution.title}
                    </p>
                  </Link>
                )}
              </div>
            </section>
          )}

          {/* ── Tags Cloud ── */}
          {tagList.length > 0 && (
            <div className="mt-8 pt-6 border-t border-whisper-border dark:border-zinc-800 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C7E96] dark:text-zinc-400 mr-1">
                <Tag className="w-3.5 h-3.5" weight="thin" />
                Thẻ:
              </span>
              {tagList.map((tag) => (
                <Link
                  key={tag}
                  href={`/news?tags=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-[#ca2a30]/10 hover:text-[#ca2a30] transition-colors duration-200 font-mono-label font-medium"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </article>
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
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-[#ca2a30] uppercase tracking-wider hover:underline underline-offset-4"
          >
            Xem tất cả tin tức & sự kiện
            <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          </Link>
        </div>
      </div>

      {/* ── 5. Related Articles ── */}
      {relatedArticles.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <h3 className="text-xl font-bold font-heading text-[#011A42] dark:text-white mb-6">
            Bài viết liên quan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="group block p-4 rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:border-[#ca2a30] transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-3 bg-zinc-100 dark:bg-zinc-800">
                  {rel.thumbnail ? (
                    <Image
                      src={rel.thumbnail}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-zinc-400 dark:text-zinc-600 font-heading text-xs">
                        VDCD
                      </span>
                    </div>
                  )}
                </div>

                {rel.publishedAt && (
                  <p className="text-[11px] text-secondary dark:text-zinc-500 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" weight="thin" />
                    {formatDate(rel.publishedAt)}
                  </p>
                )}

                <h4 className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2">
                  {rel.title}
                </h4>

                {"excerpt" in rel && rel.excerpt && (
                  <p className="text-xs text-[#6C7E96] dark:text-zinc-400 line-clamp-2 leading-relaxed mt-1">
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
