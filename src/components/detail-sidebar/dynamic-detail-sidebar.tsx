"use client";

import * as React from "react";
import type { SidebarConfig } from "@/types/sidebar-config";
import {
  DetailSidebar,
  RelatedProgramsWidget,
  FeaturedSolutionsWidget,
  RelatedArticlesWidget,
  RelatedProjectsWidget,
  RelatedSlidesWidget,
  SidebarCtaWidget,
} from "./detail-sidebar-widgets";
import { fetchSolutionsFromApi } from "@/services/solution.service";
import { fetchProgramsFromApi } from "@/services/program.service";
import { fetchArticlesFromApi } from "@/services/article.service";
import { fetchProjectsFromApi } from "@/services/project.service";
import { fetchSlideDetailBlogsFromApi } from "@/services/slide-detail-blog.service";

export interface DynamicDetailSidebarProps {
  /** Explicit or entity sidebarConfig */
  sidebarConfig?: SidebarConfig | null;
  /** Mobile header title */
  defaultMobileTitle?: string;
  /** Fallback widgets rendered when mode is 'auto' or not configured */
  defaultWidgets?: React.ReactNode;
  /** Fallback CTA rendered when mode is 'auto' or not configured */
  defaultCta?: React.ReactNode;
  /** Preloaded contextual items */
  solutions?: any[];
  programs?: any[];
  articles?: any[];
  projects?: any[];
  slides?: any[];
}

export function DynamicDetailSidebar({
  sidebarConfig,
  defaultMobileTitle = "Có thể bạn quan tâm",
  defaultWidgets,
  defaultCta,
  solutions: initialSolutions,
  programs: initialPrograms,
  articles: initialArticles,
  projects: initialProjects,
  slides: initialSlides,
}: DynamicDetailSidebarProps) {
  const isCustomMode =
    sidebarConfig?.mode === "custom" &&
    Array.isArray(sidebarConfig.widgets) &&
    sidebarConfig.widgets.length > 0;

  // Local state for auto-fetching unprovided entity types when in custom mode
  const [fetchedSolutions, setFetchedSolutions] = React.useState<any[]>([]);
  const [fetchedPrograms, setFetchedPrograms] = React.useState<any[]>([]);
  const [fetchedArticles, setFetchedArticles] = React.useState<any[]>([]);
  const [fetchedProjects, setFetchedProjects] = React.useState<any[]>([]);
  const [fetchedSlides, setFetchedSlides] = React.useState<any[]>([]);

  const solutions =
    initialSolutions && initialSolutions.length > 0
      ? initialSolutions
      : fetchedSolutions;
  const programs =
    initialPrograms && initialPrograms.length > 0
      ? initialPrograms
      : fetchedPrograms;
  const articles =
    initialArticles && initialArticles.length > 0
      ? initialArticles
      : fetchedArticles;
  const projects =
    initialProjects && initialProjects.length > 0
      ? initialProjects
      : fetchedProjects;
  const slides =
    initialSlides && initialSlides.length > 0 ? initialSlides : fetchedSlides;

  // Fetch needed entity collections if not provided in props
  React.useEffect(() => {
    if (!isCustomMode || !sidebarConfig?.widgets) return;

    const needsSolutions = sidebarConfig.widgets.some(
      (w) => w.type === "solutions",
    );
    const needsPrograms = sidebarConfig.widgets.some(
      (w) => w.type === "programs",
    );
    const needsArticles = sidebarConfig.widgets.some(
      (w) => w.type === "articles",
    );
    const needsProjects = sidebarConfig.widgets.some(
      (w) => w.type === "projects",
    );
    const needsSlides = sidebarConfig.widgets.some((w) => w.type === "slides");

    if (needsSolutions && solutions.length === 0) {
      fetchSolutionsFromApi(20)
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFetchedSolutions(items);
          }
        })
        .catch(() => {});
    }

    if (needsPrograms && programs.length === 0) {
      fetchProgramsFromApi({ limit: 20 })
        .then((res) => {
          if (res?.items && res.items.length > 0) {
            setFetchedPrograms(res.items);
          }
        })
        .catch(() => {});
    }

    if (needsArticles && articles.length === 0) {
      fetchArticlesFromApi({ limit: 20 })
        .then((res) => {
          if (res?.items && res.items.length > 0) {
            setFetchedArticles(res.items);
          }
        })
        .catch(() => {});
    }

    if (needsProjects && projects.length === 0) {
      fetchProjectsFromApi(20)
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFetchedProjects(items);
          }
        })
        .catch(() => {});
    }

    if (needsSlides && slides.length === 0) {
      fetchSlideDetailBlogsFromApi({ isPublished: true, limit: 20 })
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFetchedSlides(items);
          }
        })
        .catch(() => {});
    }
  }, [
    isCustomMode,
    sidebarConfig,
    solutions.length,
    programs.length,
    articles.length,
    projects.length,
    slides.length,
  ]);

  // Mode Auto or undefined: Render default children and default CTA
  if (!isCustomMode || !sidebarConfig?.widgets) {
    return (
      <DetailSidebar mobileTitle={defaultMobileTitle} cta={defaultCta}>
        {defaultWidgets}
      </DetailSidebar>
    );
  }

  // Mode Custom: Render configured widgets in admin-specified order
  const renderedWidgets = sidebarConfig.widgets.map((w, idx) => {
    const maxItems = w.maxItems || 3;
    const slugs = w.itemSlugs || [];

    if (w.type === "solutions") {
      let filtered = [...solutions];
      if (slugs.length > 0) {
        filtered = slugs
          .map((sl) =>
            filtered.find(
              (s) =>
                s.slug === sl ||
                s.id === sl ||
                s.slug?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      filtered = filtered.slice(0, maxItems);
      return (
        <FeaturedSolutionsWidget
          key={`sol-${idx}`}
          solutions={filtered}
          title={w.title || "Giải pháp nổi bật"}
        />
      );
    }

    if (w.type === "programs") {
      let filtered = [...programs];
      if (slugs.length > 0) {
        filtered = slugs
          .map((sl) =>
            filtered.find(
              (p) =>
                p.slug === sl ||
                p.id === sl ||
                p.slug?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      filtered = filtered.slice(0, maxItems);
      return (
        <RelatedProgramsWidget
          key={`prg-${idx}`}
          programs={filtered}
          title={w.title || "Chương trình nổi bật"}
        />
      );
    }

    if (w.type === "articles") {
      let filtered = [...articles];
      if (slugs.length > 0) {
        filtered = slugs
          .map((sl) =>
            filtered.find(
              (a) =>
                a.slug === sl ||
                a.id === sl ||
                a.slug?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      filtered = filtered.slice(0, maxItems);
      return (
        <RelatedArticlesWidget
          key={`art-${idx}`}
          articles={filtered}
          title={w.title || "Tin tức nổi bật"}
        />
      );
    }

    if (w.type === "projects") {
      let filtered = [...projects];
      if (slugs.length > 0) {
        filtered = slugs
          .map((sl) =>
            filtered.find(
              (p) =>
                p.slug === sl ||
                p.id === sl ||
                p.slug?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      filtered = filtered.slice(0, maxItems);
      return (
        <RelatedProjectsWidget
          key={`proj-${idx}`}
          projects={filtered}
          title={w.title || "Dự án nổi bật"}
        />
      );
    }

    if (w.type === "slides") {
      let filtered = [...slides];
      if (slugs.length > 0) {
        filtered = slugs
          .map((sl) =>
            filtered.find(
              (s) =>
                s.slug === sl ||
                s.id === sl ||
                s.slug?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      filtered = filtered.slice(0, maxItems);
      return (
        <RelatedSlidesWidget
          key={`slide-${idx}`}
          slides={filtered}
          title={w.title || "Bài viết slide nổi bật"}
        />
      );
    }

    return null;
  });

  // Custom CTA resolution
  let ctaNode: React.ReactNode = defaultCta;
  if (sidebarConfig.cta) {
    if (sidebarConfig.cta.enabled === false) {
      ctaNode = null;
    } else {
      ctaNode = (
        <SidebarCtaWidget
          title={sidebarConfig.cta.title || "Bắt đầu chuyển đổi số"}
          description={
            sidebarConfig.cta.description ||
            "Liên hệ đội ngũ VDCD để nhận tư vấn giải pháp phù hợp."
          }
          primaryLabel={sidebarConfig.cta.primaryLabel || "Liên hệ tư vấn"}
          primaryHref={sidebarConfig.cta.primaryHref || "/contact"}
          secondaryLabel={
            sidebarConfig.cta.secondaryLabel || "Khám phá giải pháp"
          }
          secondaryHref={sidebarConfig.cta.secondaryHref}
        />
      );
    }
  }

  const mobileTitle = sidebarConfig.widgets[0]?.title || defaultMobileTitle;

  return (
    <DetailSidebar mobileTitle={mobileTitle} cta={ctaNode}>
      {renderedWidgets}
    </DetailSidebar>
  );
}
