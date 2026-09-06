"use client";

import * as React from "react";
import NextLink from "next/link";
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
  MapPin,
} from "@phosphor-icons/react";
import { formatDate, copyToClipboard } from "@/lib/utils";
import { getProjectById, type ProjectEntry } from "@/data/projects.data";
import {
  fetchProjectBySlugFromApi,
  fetchProjectsFromApi,
  convertProjectContentToDocument,
} from "@/services/project.service";
import { useTransitionStore } from "@/store/transition-store";
import type {
  ContentBlock,
  DocumentContent,
  ListItem,
  ListStyleConfig,
  ListType,
  ListStyle,
  HeroMeta,
} from "@/types";
import { CtaBlockRenderer } from "@/components/content-blocks/cta-block-renderer";
import { CommonCtaSection } from "@/components/ui/common-cta-section";
import { ProjectDetailGallery } from "./project-detail-gallery";
import "@/components/slides/detail/slide-detail.css";
import "./project-detail.css";

interface ProjectDetailContentProps {
  slug: string;
  initialProject?: ProjectEntry | null;
}

export function ProjectDetailContent({
  slug,
  initialProject,
}: ProjectDetailContentProps) {
  const [project, setProject] = React.useState<ProjectEntry | null>(
    initialProject || getProjectById(slug) || null,
  );
  const [relatedProjects, setRelatedProjects] = React.useState<ProjectEntry[]>(
    [],
  );
  const [isCopied, setIsCopied] = React.useState(false);

  const { isTransitioning, endTransition } = useTransitionStore();

  /* Signal the transition overlay to fade out after mount */
  React.useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        endTransition();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, endTransition]);

  /* Fetch project details if not provided or to ensure freshest data */
  React.useEffect(() => {
    fetchProjectBySlugFromApi(slug).then((data) => {
      if (data) {
        setProject(data);
      }
    });

    fetchProjectsFromApi(4).then((allProjects) => {
      const filtered = allProjects.filter((p) => p.id !== slug).slice(0, 3);
      setRelatedProjects(filtered);
    });
  }, [slug]);

  // ── 1. Reading Progress Bar ──
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ── 2. Canonical Block Document Adapter ──
  const documentContent: DocumentContent = React.useMemo(() => {
    if (!project) return { version: 1, blocks: [] };
    return convertProjectContentToDocument(project);
  }, [project]);

  const blocks: ContentBlock[] = documentContent.blocks;
  const heroMeta: HeroMeta = documentContent.heroMeta ||
    project?.heroMeta || {
      placement: "above_title",
      position: "center",
      caption: project?.galleryImages?.[0]?.caption || undefined,
    };

  const heroPosition = heroMeta.position || "center";
  const heroCaption = heroMeta.caption;

  // ── 3. Calculate Reading Time ──
  const readingTimeMinutes = React.useMemo(() => {
    if (!project) return 1;
    let textContent = [
      project.title,
      project.description || "",
      project.overview || "",
      project.category || "",
    ].join(" ");

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
  }, [project, blocks]);

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
    const text = project?.title || "";
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
                    className="rounded border-zinc-300 dark:border-zinc-700 text-[#ca2a30] focus:ring-[#ca2a30]"
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
                      alt={block.alt || project?.title || "Hình ảnh dự án"}
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

  if (!project) return null;

  const coverImage =
    project.coverImage || project.thumbnail || "/images/placeholder.webp";

  return (
    <article className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-[#ca2a30] selection:text-white pt-24 pb-20">
      {/* ── 1. Reading Progress Bar ── */}
      <motion.div className="reading-progress-bar" style={{ scaleX }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* ── 2. Top Navigation & Breadcrumbs ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-zinc-800">
          <nav
            aria-label="Breadcrumb"
            className="text-xs font-mono-label font-bold uppercase tracking-widest text-secondary dark:text-zinc-400"
          >
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <NextLink
                  href="/"
                  className="hover:text-[#ca2a30] transition-colors"
                >
                  Trang chủ
                </NextLink>
              </li>
              <li>/</li>
              <li>
                <NextLink
                  href="/projects"
                  className="hover:text-[#ca2a30] transition-colors"
                >
                  Dự án
                </NextLink>
              </li>
              {project.category && (
                <>
                  <li>/</li>
                  <li className="text-zinc-600 dark:text-zinc-300 line-clamp-1 max-w-[200px]">
                    {project.category}
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="flex items-center gap-4 text-xs text-secondary dark:text-zinc-400 font-mono-label">
            {(project.publishedAt || project.createdAt) && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" weight="thin" />
                {formatDate(project.publishedAt || project.createdAt!)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" weight="thin" />
              {readingTimeMinutes} phút đọc
            </span>
          </div>
        </div>

        {/* ── 3. Header: Badges Row (Exact match to Admin Tab Đọc Bài) ── */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          {project.category && (
            <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400 border border-red-100/80 dark:border-red-900/40 font-mono-label">
              {project.category}
            </span>
          )}
          {project.location && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100/90 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700 font-mono-label">
              <span>📍</span>
              <span>{project.location}</span>
            </span>
          )}
          {project.year && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100/90 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700 font-mono-label">
              <span>🗓️</span>
              <span>{project.year}</span>
            </span>
          )}
        </div>

        {/* ── 4. Main Title H1 ── */}
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#011A42] dark:text-white tracking-tight leading-[1.2] mb-3 font-heading">
          {project.title}
        </h1>

        {/* ── 5. Project Description / Overview Subtitle ── */}
        {project.description && (
          <p className="text-base sm:text-lg text-[#6C7E96] dark:text-zinc-400 leading-relaxed mb-6 font-normal">
            {project.description}
          </p>
        )}

        {/* ── 6. Project Cover Image (Hero Image) ── */}
        <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 shadow-xs mb-8">
          <Image
            src={coverImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            style={{ objectPosition: heroPosition }}
          />
          {heroCaption && (
            <figcaption className="p-3 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400 border-t border-whisper-border dark:border-zinc-800">
              {heroCaption}
            </figcaption>
          )}
        </figure>

        {/* ── 7. Divider ── */}
        <div className="my-8 border-t border-slate-100 dark:border-zinc-800" />

        {/* ── 8. THÔNG SỐ DỰ ÁN & DỊCH VỤ (Exact match to Admin Tab Đọc Bài) ── */}
        <section aria-label="Thông số dự án & dịch vụ" className="mb-10">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#6C7E96] dark:text-zinc-400 mb-4 font-mono-label">
            THÔNG SỐ DỰ ÁN & DỊCH VỤ
          </h2>

          {/* 3-column Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-slate-200/80 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900/40 shadow-2xs">
              <div className="text-xs text-[#6C7E96] dark:text-zinc-400 mb-1">
                Chuyên môn
              </div>
              <div className="text-sm sm:text-base font-bold text-[#011A42] dark:text-white">
                {project.discipline ||
                  project.category ||
                  "Trắc địa & Quy hoạch"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900/40 shadow-2xs">
              <div className="text-xs text-[#6C7E96] dark:text-zinc-400 mb-1">
                Địa điểm triển khai
              </div>
              <div className="text-sm sm:text-base font-bold text-[#011A42] dark:text-white">
                {project.location || "Việt Nam"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900/40 shadow-2xs">
              <div className="text-xs text-[#6C7E96] dark:text-zinc-400 mb-1">
                Năm thực hiện
              </div>
              <div className="text-sm sm:text-base font-bold text-[#011A42] dark:text-white">
                {project.year || "2024"}
              </div>
            </div>
          </div>

          {/* Dịch vụ cung cấp (Chips with checkmark) */}
          {project.services && project.services.length > 0 && (
            <div className="mb-6">
              <p className="text-xs sm:text-sm text-[#6C7E96] dark:text-zinc-400 mb-2.5">
                Dịch vụ cung cấp:
              </p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-xs sm:text-sm font-medium text-[#011A42] dark:text-zinc-200 shadow-2xs"
                  >
                    <span className="text-[#011A42] dark:text-zinc-300 font-bold">
                      ✓
                    </span>
                    <span>{service}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Điểm nhấn kỹ thuật (3-col Cards with Red Value) */}
          {project.technicalHighlights &&
            project.technicalHighlights.length > 0 && (
              <div className="mb-8">
                <p className="text-xs sm:text-sm text-[#6C7E96] dark:text-zinc-400 mb-2.5">
                  Điểm nhấn kỹ thuật:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {project.technicalHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200/80 dark:border-zinc-800 p-3.5 sm:p-4 bg-white dark:bg-zinc-900/40 shadow-2xs"
                    >
                      <div className="text-xs text-[#6C7E96] dark:text-zinc-400 mb-1">
                        {highlight.label}
                      </div>
                      <div className="text-sm sm:text-base font-bold text-[#ca2a30]">
                        {highlight.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </section>

        {/* ── 9. Content Blocks Stream (Challenge, Transformation, Gallery, etc.) ── */}
        {blocks.length > 0 && (
          <main className="w-full pb-12">
            <div className="space-y-6">
              {blocks.map((block) => renderBlock(block))}
            </div>
          </main>
        )}

        {/* ── 9.5. Project Gallery (Synchronized with Admin Visual Editor) ── */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mb-12">
            <ProjectDetailGallery galleryImages={project.galleryImages} />
          </div>
        )}

        {/* ── 10. Social Sharing Bar ── */}
        <div className="pt-4 pb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="font-mono-label text-xs font-bold uppercase tracking-widest text-[#011A42] dark:text-zinc-300">
                Chia sẻ dự án:
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
                  aria-label="Sao chép liên kết dự án"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-500" weight="bold" />
                  ) : (
                    <Copy className="w-4 h-4" weight="thin" />
                  )}
                </button>
              </div>
            </div>

            <NextLink
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-[#ca2a30] uppercase tracking-wider hover:underline underline-offset-4"
            >
              Xem tất cả dự án
              <ArrowRight className="w-3.5 h-3.5" weight="bold" />
            </NextLink>
          </div>
        </div>

        {/* ── 11. Related Projects ── */}
        {relatedProjects.length > 0 && (
          <section className="pb-16" aria-labelledby="related-projects-heading">
            <div className="flex items-center justify-between mb-6">
              <h3
                id="related-projects-heading"
                className="text-xl font-bold font-heading uppercase text-[#011A42] dark:text-white"
              >
                Dự án liên quan
              </h3>
              <NextLink
                href="/projects"
                className="text-xs font-mono-label font-bold uppercase tracking-wider text-[#ca2a30] hover:underline"
              >
                Xem thêm
              </NextLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <NextLink
                  key={rel.id}
                  href={`/projects/${rel.id}`}
                  className="group block rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden hover:border-[#ca2a30] transition-all duration-300 shadow-2xs"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <Image
                      src={
                        rel.coverImage ||
                        rel.thumbnail ||
                        "/images/placeholder.webp"
                      }
                      alt={rel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    {rel.category && (
                      <p className="text-[11px] font-bold uppercase text-[#ca2a30] tracking-wider mb-1.5 font-mono-label">
                        {rel.category}
                      </p>
                    )}
                    <h4 className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 mb-2 line-clamp-2 uppercase font-heading">
                      {rel.title}
                    </h4>
                    {rel.location && (
                      <span className="text-[11px] text-[#6C7E96] dark:text-zinc-400 font-mono-label flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#ca2a30]" />
                        {rel.location}
                      </span>
                    )}
                  </div>
                </NextLink>
              ))}
            </div>
          </section>
        )}

        {/* ── 12. Related Articles ── */}
        {project.relatedArticles && project.relatedArticles.length > 0 && (
          <section className="pb-16" aria-labelledby="related-articles-heading">
            <h3
              id="related-articles-heading"
              className="text-xl font-bold font-heading uppercase text-[#011A42] dark:text-white mb-6"
            >
              Tin tức & Hoạt động liên quan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {project.relatedArticles.map((art) => (
                <NextLink
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
                </NextLink>
              ))}
            </div>
          </section>
        )}

        {/* ── 13. Back To Projects Navigation Button ── */}
        <div className="pb-12 text-center">
          <NextLink
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-[#ca2a30] hover:text-[#ca2a30] transition-all duration-300"
          >
            <ArrowLeft weight="thin" className="w-4 h-4" />
            Quay lại danh sách dự án
          </NextLink>
        </div>
      </div>

      {/* ── 14. Unified CTA Section ── */}
      <CommonCtaSection
        badge="Triển khai thực tế"
        title="BẠN CẦN GIẢI PHÁP TƯƠNG TỰ CHO CÔNG TRÌNH CỦA MÌNH?"
        description="Đội ngũ kỹ sư và chuyên gia công nghệ VDCD sẵn sàng khảo sát thực địa và tư vấn phương án tối ưu."
        primaryButton={{
          label: "Liên hệ tư vấn dự án",
          href: "/contact",
          icon: "envelope",
        }}
        secondaryButton={{
          label: "Xem các dự án khác",
          href: "/projects",
          icon: "arrow-right",
        }}
      />
    </article>
  );
}
