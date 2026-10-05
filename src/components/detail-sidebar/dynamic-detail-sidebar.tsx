"use client";

import * as React from "react";
import { type SidebarConfig, parseSidebarConfig } from "@/types/sidebar-config";
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
  sidebarConfig?: SidebarConfig | Record<string, any> | string | null;
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
  const config = React.useMemo(
    () => parseSidebarConfig(sidebarConfig),
    [sidebarConfig],
  );

  const isCustomMode =
    config?.mode === "custom" &&
    Array.isArray(config.widgets) &&
    config.widgets.length > 0;

  // Local state for auto-fetching unprovided entity types when in custom mode
  const [fetchedSolutions, setFetchedSolutions] = React.useState<any[]>([]);
  const [fetchedPrograms, setFetchedPrograms] = React.useState<any[]>([]);
  const [fetchedArticles, setFetchedArticles] = React.useState<any[]>([]);
  const [fetchedProjects, setFetchedProjects] = React.useState<any[]>([]);
  const [fetchedSlides, setFetchedSlides] = React.useState<any[]>([]);

  // Deduplicate and merge initial contextual items with full fetched collections
  const solutions = React.useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();
    const addItem = (item: any) => {
      if (!item) return;
      const key = String(item.slug || item.id || "");
      if (key && !seen.has(key.toLowerCase())) {
        seen.add(key.toLowerCase());
        list.push(item);
      }
    };
    (initialSolutions || []).forEach(addItem);
    (fetchedSolutions || []).forEach(addItem);
    return list;
  }, [initialSolutions, fetchedSolutions]);

  const programs = React.useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();
    const addItem = (item: any) => {
      if (!item) return;
      const key = String(item.slug || item.id || "");
      if (key && !seen.has(key.toLowerCase())) {
        seen.add(key.toLowerCase());
        list.push(item);
      }
    };
    (initialPrograms || []).forEach(addItem);
    (fetchedPrograms || []).forEach(addItem);
    return list;
  }, [initialPrograms, fetchedPrograms]);

  const articles = React.useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();
    const addItem = (item: any) => {
      if (!item) return;
      const key = String(item.slug || item.id || "");
      if (key && !seen.has(key.toLowerCase())) {
        seen.add(key.toLowerCase());
        list.push(item);
      }
    };
    (initialArticles || []).forEach(addItem);
    (fetchedArticles || []).forEach(addItem);
    return list;
  }, [initialArticles, fetchedArticles]);

  const projects = React.useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();
    const addItem = (item: any) => {
      if (!item) return;
      const key = String(item.slug || item.id || "");
      if (key && !seen.has(key.toLowerCase())) {
        seen.add(key.toLowerCase());
        list.push(item);
      }
    };
    (initialProjects || []).forEach(addItem);
    (fetchedProjects || []).forEach(addItem);
    return list;
  }, [initialProjects, fetchedProjects]);

  const slides = React.useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();
    const addItem = (item: any) => {
      if (!item) return;
      const key = String(item.slug || item.id || "");
      if (key && !seen.has(key.toLowerCase())) {
        seen.add(key.toLowerCase());
        list.push(item);
      }
    };
    (initialSlides || []).forEach(addItem);
    (fetchedSlides || []).forEach(addItem);
    return list;
  }, [initialSlides, fetchedSlides]);

  // Fetch needed entity collections when in custom mode
  React.useEffect(() => {
    if (!isCustomMode || !config?.widgets) return;

    const needsSolutions = config.widgets.some((w) => w.type === "solutions");
    const needsPrograms = config.widgets.some((w) => w.type === "programs");
    const needsArticles = config.widgets.some((w) => w.type === "articles");
    const needsProjects = config.widgets.some((w) => w.type === "projects");
    const needsSlides = config.widgets.some((w) => w.type === "slides");

    if (needsSolutions && fetchedSolutions.length === 0) {
      fetchSolutionsFromApi(50)
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFetchedSolutions(items);
          }
        })
        .catch(() => {});
    }

    if (needsPrograms && fetchedPrograms.length === 0) {
      fetchProgramsFromApi({ limit: 50 })
        .then((res) => {
          if (res?.items && res.items.length > 0) {
            setFetchedPrograms(res.items);
          }
        })
        .catch(() => {});
    }

    if (needsArticles && fetchedArticles.length === 0) {
      fetchArticlesFromApi({ limit: 50 })
        .then((res) => {
          if (res?.items && res.items.length > 0) {
            setFetchedArticles(res.items);
          }
        })
        .catch(() => {});
    }

    if (needsProjects && fetchedProjects.length === 0) {
      fetchProjectsFromApi(50)
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFetchedProjects(items);
          }
        })
        .catch(() => {});
    }

    if (needsSlides && fetchedSlides.length === 0) {
      fetchSlideDetailBlogsFromApi({ isPublished: true, limit: 50 })
        .then((items) => {
          if (Array.isArray(items) && items.length > 0) {
            setFetchedSlides(items);
          }
        })
        .catch(() => {});
    }
  }, [
    isCustomMode,
    config,
    fetchedSolutions.length,
    fetchedPrograms.length,
    fetchedArticles.length,
    fetchedProjects.length,
    fetchedSlides.length,
  ]);

  // Custom CTA resolution (supports both custom mode and auto mode with custom CTA)
  let ctaNode: React.ReactNode = defaultCta;
  if (config?.cta) {
    if (config.cta.enabled === false) {
      ctaNode = null;
    } else {
      ctaNode = (
        <SidebarCtaWidget
          title={config.cta.title || "Bắt đầu chuyển đổi số"}
          description={
            config.cta.description ||
            "Liên hệ đội ngũ VDCD để nhận tư vấn giải pháp phù hợp."
          }
          primaryLabel={config.cta.primaryLabel || "Liên hệ tư vấn"}
          primaryHref={config.cta.primaryHref || "/contact"}
          secondaryLabel={config.cta.secondaryLabel || "Khám phá giải pháp"}
          secondaryHref={config.cta.secondaryHref}
        />
      );
    }
  }

  // Mode Auto or undefined: Render default children and resolved CTA
  if (!isCustomMode || !config?.widgets) {
    return (
      <DetailSidebar mobileTitle={defaultMobileTitle} cta={ctaNode}>
        {defaultWidgets}
      </DetailSidebar>
    );
  }

  // Mode Custom: Render configured widgets in admin-specified order
  const renderedWidgets = config.widgets.map((w, idx) => {
    const maxItems = w.maxItems || 3;
    const slugs = w.itemSlugs || [];

    if (w.type === "solutions") {
      let filtered = [...solutions];
      if (slugs.length > 0) {
        filtered = slugs
          .map((sl) =>
            solutions.find(
              (s) =>
                s.slug === sl ||
                s.id === sl ||
                s.slug?.toLowerCase() === sl?.toLowerCase() ||
                s.id?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      if (filtered.length === 0 && solutions.length > 0) {
        filtered = solutions;
      }
      filtered = filtered.slice(0, maxItems);
      if (filtered.length === 0) return null;
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
            programs.find(
              (p) =>
                p.slug === sl ||
                p.id === sl ||
                p.slug?.toLowerCase() === sl?.toLowerCase() ||
                p.id?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      if (filtered.length === 0 && programs.length > 0) {
        filtered = programs;
      }
      filtered = filtered.slice(0, maxItems);
      if (filtered.length === 0) return null;
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
            articles.find(
              (a) =>
                a.slug === sl ||
                a.id === sl ||
                a.slug?.toLowerCase() === sl?.toLowerCase() ||
                a.id?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      if (filtered.length === 0 && articles.length > 0) {
        filtered = articles;
      }
      filtered = filtered.slice(0, maxItems);
      if (filtered.length === 0) return null;
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
            projects.find(
              (p) =>
                p.slug === sl ||
                p.id === sl ||
                p.slug?.toLowerCase() === sl?.toLowerCase() ||
                p.id?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      if (filtered.length === 0 && projects.length > 0) {
        filtered = projects;
      }
      filtered = filtered.slice(0, maxItems);
      if (filtered.length === 0) return null;
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
            slides.find(
              (s) =>
                s.slug === sl ||
                s.id === sl ||
                s.slideId === sl ||
                s.slide?.id === sl ||
                s.slug?.toLowerCase() === sl?.toLowerCase() ||
                s.id?.toLowerCase() === sl?.toLowerCase() ||
                s.slideId?.toLowerCase() === sl?.toLowerCase() ||
                s.slide?.id?.toLowerCase() === sl?.toLowerCase(),
            ),
          )
          .filter(Boolean);
      }
      if (filtered.length === 0 && slides.length > 0) {
        filtered = slides;
      }
      filtered = filtered.slice(0, maxItems);
      if (filtered.length === 0) return null;
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

  const mobileTitle = config.widgets[0]?.title || defaultMobileTitle;

  return (
    <DetailSidebar mobileTitle={mobileTitle} cta={ctaNode}>
      {renderedWidgets}
    </DetailSidebar>
  );
}
