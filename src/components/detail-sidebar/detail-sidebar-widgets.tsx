"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Lightbulb,
  Newspaper,
  Envelope,
  ArrowUpRight,
  Calendar,
} from "@phosphor-icons/react";
import { formatDate } from "@/lib/utils";
import type { Program, Article, SolutionEntityContract } from "@/types";
import type { SolutionItem } from "@/data/solutions.data";

/* ══════════════════════════════════════════════════════════
 *  DETAIL SIDEBAR — 3-mode responsive
 *
 *  Mobile (< sm):    Vertical stack
 *  sm → < 2xl:       3-col card grid + CTA bên dưới
 *  2xl+:             Compact sidebar absolute bên phải
 * ══════════════════════════════════════════════════════════ */

interface DetailSidebarProps {
  /** Widgets nội dung liên quan (programs / solutions / articles) */
  children: React.ReactNode;
  /** CTA widget — luôn nằm dưới cùng, full-width trên sm-2xl */
  cta?: React.ReactNode;
  mobileTitle?: string;
}

export function DetailSidebar({
  children,
  cta,
  mobileTitle = "Có thể bạn quan tâm",
}: DetailSidebarProps) {
  return (
    <aside
      className={[
        /* Mobile + sm-2xl: inline below content */
        "mt-12 pt-8 border-t border-whisper-border dark:border-zinc-800",
        /* 2xl+: absolute in right margin */
        "2xl:mt-0 2xl:pt-0 2xl:border-t-0",
        "2xl:absolute 2xl:top-0 2xl:left-full 2xl:ml-4 2xl:w-[260px]",
      ].join(" ")}
    >
      {/* Section Header (hidden on 2xl) */}
      <div className="flex items-center gap-3 mb-6 2xl:hidden">
        <div className="w-1 h-5 rounded-full bg-[#ca2a30]" />
        <h3 className="font-mono-label text-xs font-bold uppercase tracking-widest text-[#011A42] dark:text-white whitespace-nowrap">
          {mobileTitle}
        </h3>
        <div className="flex-1 h-px bg-whisper-border dark:bg-zinc-800" />
      </div>

      {/* Content widgets */}
      <div className="space-y-5 2xl:space-y-5">{children}</div>

      {/* CTA — full-width on sm-2xl, stacked on 2xl */}
      {cta && <div className="mt-6 2xl:mt-5">{cta}</div>}
    </aside>
  );
}

/* ══════════════════════════════════════════════════════════
 *  COMPACT WIDGET WRAPPER — only visible on 2xl sidebar
 * ══════════════════════════════════════════════════════════ */

interface CompactWidgetProps {
  title: string;
  icon: React.ReactNode;
  viewAllHref?: string;
  viewAllOnClick?: () => void;
  children: React.ReactNode;
}

function CompactWidget({
  title,
  icon,
  viewAllHref,
  viewAllOnClick,
  children,
}: CompactWidgetProps) {
  return (
    <div className="rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden shadow-2xs">
      <div className="flex items-center justify-between px-4 py-3 border-b border-whisper-border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <span className="text-[#ca2a30]">{icon}</span>
          <h4 className="text-[10px] font-bold uppercase tracking-wider font-mono-label text-[#011A42] dark:text-white">
            {title}
          </h4>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-[10px] font-bold uppercase tracking-wider text-[#ca2a30] hover:underline underline-offset-2 font-mono-label"
          >
            Xem thêm
          </Link>
        )}
        {viewAllOnClick && !viewAllHref && (
          <button
            type="button"
            onClick={viewAllOnClick}
            className="text-[10px] font-bold uppercase tracking-wider text-[#ca2a30] hover:underline underline-offset-2 font-mono-label cursor-pointer"
          >
            Xem thêm
          </button>
        )}
      </div>
      <div className="divide-y divide-whisper-border dark:divide-zinc-800">
        {children}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
 *  INLINE CARD — used in the 3-col grid on sm-2xl
 * ══════════════════════════════════════════════════════════ */

interface InlineCardProps {
  href: string;
  thumbnail?: string | null;
  title: string;
  description?: string | null;
  badge?: string | null;
  fallbackIcon: React.ReactNode;
  meta?: string;
}

function InlineCard({
  href,
  thumbnail,
  title,
  description,
  badge,
  fallbackIcon,
  meta,
}: InlineCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden shadow-2xs hover:border-[#ca2a30]/40 hover:shadow-md transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {fallbackIcon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-3.5 space-y-1.5">
        {badge && (
          <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#ca2a30] font-mono-label">
            {badge}
          </span>
        )}
        <h5 className="text-sm font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2 leading-snug">
          {title}
        </h5>
        {description && (
          <p className="text-xs text-[#6C7E96] dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        {meta && (
          <span className="text-[10px] text-[#6C7E96] dark:text-zinc-500 font-mono-label flex items-center gap-1 pt-0.5">
            <Calendar className="w-3 h-3" weight="thin" />
            {meta}
          </span>
        )}
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════
 *  WIDGET 1: Related Programs
 *  sm-2xl: 3-col inline cards  |  2xl: compact sidebar list
 * ══════════════════════════════════════════════════════════ */

interface RelatedProgramsWidgetProps {
  programs: Program[];
  title?: string;
}

export function RelatedProgramsWidget({
  programs,
  title = "Chương trình nổi bật",
}: RelatedProgramsWidgetProps) {
  if (!programs.length) return null;

  return (
    <>
      {/* ── sm-2xl: 3-column card grid ── */}
      <div className="hidden sm:block 2xl:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {programs.slice(0, 3).map((p) => (
            <InlineCard
              key={p.id}
              href={`/programs/${p.slug}`}
              thumbnail={p.thumbnail}
              title={p.title}
              description={p.shortDescription}
              badge={p.field?.name}
              fallbackIcon={
                <Briefcase
                  className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                  weight="thin"
                />
              }
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical card list ── */}
      <div className="sm:hidden space-y-3">
        {programs.slice(0, 3).map((p) => (
          <InlineCard
            key={p.id}
            href={`/programs/${p.slug}`}
            thumbnail={p.thumbnail}
            title={p.title}
            description={p.shortDescription}
            badge={p.field?.name}
            fallbackIcon={
              <Briefcase
                className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                weight="thin"
              />
            }
          />
        ))}
      </div>

      {/* ── 2xl: compact sidebar widget ── */}
      <div className="hidden 2xl:block">
        <CompactWidget
          title={title}
          icon={<Briefcase className="w-3.5 h-3.5" weight="bold" />}
          viewAllHref="/programs"
        >
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/programs/${program.slug}`}
              className="group block hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors duration-200"
            >
              {program.thumbnail ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                  <Image
                    src={program.thumbnail}
                    alt={program.title}
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-zinc-400" weight="thin" />
                </div>
              )}
              <div className="px-3.5 py-2.5">
                <h5 className="text-xs font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2 leading-snug">
                  {program.title}
                </h5>
              </div>
            </Link>
          ))}
        </CompactWidget>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
 *  WIDGET 2: Featured Solutions
 *  sm-2xl: 3-col inline cards  |  2xl: compact sidebar list
 * ══════════════════════════════════════════════════════════ */

interface FeaturedSolutionsWidgetProps {
  solutions: (SolutionItem | SolutionEntityContract)[];
  title?: string;
}

export function FeaturedSolutionsWidget({
  solutions,
  title = "Giải pháp nổi bật",
}: FeaturedSolutionsWidgetProps) {
  if (!solutions.length) return null;

  const openMegaMenu = () => {
    window.dispatchEvent(new CustomEvent("open-mega-menu"));
  };

  const getDesc = (sol: SolutionItem | SolutionEntityContract) =>
    "shortDescription" in sol
      ? sol.shortDescription
      : "description" in sol
        ? (sol as SolutionItem).description
        : null;

  return (
    <>
      {/* ── sm-2xl: 3-column card grid ── */}
      <div className="hidden sm:block 2xl:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {solutions.slice(0, 3).map((sol) => (
            <InlineCard
              key={sol.id}
              href={`/solution/${sol.slug}`}
              thumbnail={sol.thumbnail}
              title={sol.title}
              description={getDesc(sol)}
              fallbackIcon={
                <Lightbulb
                  className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                  weight="thin"
                />
              }
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical card list ── */}
      <div className="sm:hidden space-y-3">
        {solutions.slice(0, 3).map((sol) => (
          <InlineCard
            key={sol.id}
            href={`/solution/${sol.slug}`}
            thumbnail={sol.thumbnail}
            title={sol.title}
            description={getDesc(sol)}
            fallbackIcon={
              <Lightbulb
                className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                weight="thin"
              />
            }
          />
        ))}
      </div>

      {/* ── 2xl: compact sidebar widget ── */}
      <div className="hidden 2xl:block">
        <CompactWidget
          title={title}
          icon={<Lightbulb className="w-3.5 h-3.5" weight="bold" />}
          viewAllOnClick={openMegaMenu}
        >
          {solutions.map((sol) => (
            <Link
              key={sol.id}
              href={`/solution/${sol.slug}`}
              className="group block hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors duration-200"
            >
              {sol.thumbnail ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                  <Image
                    src={sol.thumbnail}
                    alt={sol.title}
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] w-full bg-[#ca2a30]/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-[#ca2a30]" weight="bold" />
                </div>
              )}
              <div className="px-3.5 py-2.5">
                <h5 className="text-xs font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2 leading-snug">
                  {sol.title}
                </h5>
              </div>
            </Link>
          ))}
        </CompactWidget>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
 *  WIDGET 3: Related Articles
 *  sm-2xl: 3-col inline cards  |  2xl: compact sidebar list
 * ══════════════════════════════════════════════════════════ */

interface RelatedArticlesWidgetProps {
  articles: (
    | Article
    | Pick<Article, "id" | "title" | "slug" | "thumbnail" | "publishedAt">
  )[];
  title?: string;
}

export function RelatedArticlesWidget({
  articles,
  title = "Tin tức nổi bật",
}: RelatedArticlesWidgetProps) {
  if (!articles.length) return null;

  return (
    <>
      {/* ── sm-2xl: 3-column card grid ── */}
      <div className="hidden sm:block 2xl:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {articles.slice(0, 3).map((art) => (
            <InlineCard
              key={art.id}
              href={`/news/${art.slug}`}
              thumbnail={art.thumbnail}
              title={art.title}
              meta={art.publishedAt ? formatDate(art.publishedAt) : undefined}
              fallbackIcon={
                <Newspaper
                  className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                  weight="thin"
                />
              }
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical card list ── */}
      <div className="sm:hidden space-y-3">
        {articles.slice(0, 3).map((art) => (
          <InlineCard
            key={art.id}
            href={`/news/${art.slug}`}
            thumbnail={art.thumbnail}
            title={art.title}
            meta={art.publishedAt ? formatDate(art.publishedAt) : undefined}
            fallbackIcon={
              <Newspaper
                className="w-8 h-8 text-zinc-300 dark:text-zinc-600"
                weight="thin"
              />
            }
          />
        ))}
      </div>

      {/* ── 2xl: compact sidebar widget ── */}
      <div className="hidden 2xl:block">
        <CompactWidget
          title={title}
          icon={<Newspaper className="w-3.5 h-3.5" weight="bold" />}
          viewAllHref="/news"
        >
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/news/${art.slug}`}
              className="group block hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors duration-200"
            >
              {art.thumbnail ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                  <Image
                    src={art.thumbnail}
                    alt={art.title}
                    fill
                    sizes="260px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-zinc-400" weight="thin" />
                </div>
              )}
              <div className="px-3.5 py-2.5">
                <h5 className="text-xs font-bold text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2 leading-snug">
                  {art.title}
                </h5>
                {art.publishedAt && (
                  <span className="text-[9px] text-[#6C7E96] dark:text-zinc-500 font-mono-label flex items-center gap-1 mt-0.5">
                    <Calendar className="w-2.5 h-2.5" weight="thin" />
                    {formatDate(art.publishedAt)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </CompactWidget>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
 *  CTA Widget
 * ══════════════════════════════════════════════════════════ */

interface SidebarCtaWidgetProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryOnClick?: () => void;
}

export function SidebarCtaWidget({
  title = "Bắt đầu chuyển đổi số",
  description = "Liên hệ đội ngũ VDCD để nhận tư vấn giải pháp phù hợp.",
  primaryLabel = "Liên hệ tư vấn",
  primaryHref = "/contact",
  secondaryLabel = "Khám phá giải pháp",
  secondaryOnClick,
}: SidebarCtaWidgetProps) {
  const handleSecondary =
    secondaryOnClick ||
    (() => {
      window.dispatchEvent(new CustomEvent("open-mega-menu"));
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={[
        "rounded-xl border border-[#ca2a30]/20 overflow-hidden",
        "bg-gradient-to-br from-[#ca2a30]/5 to-transparent",
        "dark:from-[#ca2a30]/10 dark:to-zinc-900/40",
        /* sm-2xl: horizontal layout */
        "sm:flex sm:items-center sm:gap-6",
        /* 2xl: back to vertical compact */
        "2xl:block",
      ].join(" ")}
    >
      <div className="p-4 sm:p-5 space-y-3 sm:flex-1 2xl:p-4">
        <div className="flex items-center gap-2 text-[#ca2a30] font-mono-label text-[9px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ca2a30] animate-pulse" />
          Kết nối hợp tác
        </div>
        <h4 className="text-sm sm:text-base 2xl:text-sm font-bold font-heading uppercase tracking-tight text-[#011A42] dark:text-white leading-snug">
          {title}
        </h4>
        <p className="text-[10px] sm:text-xs 2xl:text-[10px] text-[#6C7E96] dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="px-4 pb-4 sm:pr-5 sm:pb-5 sm:pl-0 sm:flex-shrink-0 2xl:px-4 2xl:pb-4 flex flex-col sm:flex-col gap-2">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono-label text-[9px] sm:text-[10px] 2xl:text-[9px] font-bold uppercase tracking-widest hover:bg-[#ca2a30] hover:text-white dark:hover:bg-[#ca2a30] dark:hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          <Envelope className="w-3 h-3" weight="thin" />
          {primaryLabel}
        </Link>
        <button
          type="button"
          onClick={handleSecondary}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono-label text-[9px] sm:text-[10px] 2xl:text-[9px] font-bold uppercase tracking-widest hover:border-[#ca2a30] hover:text-[#ca2a30] dark:hover:border-[#ca2a30] dark:hover:text-[#ca2a30] transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          <ArrowUpRight className="w-3 h-3" weight="thin" />
          {secondaryLabel}
        </button>
      </div>
    </motion.div>
  );
}
