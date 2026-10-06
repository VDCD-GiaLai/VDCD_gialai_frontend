import { cache } from "react";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import {
  MOCK_SLIDE_DETAIL_BLOGS,
  getMockSlideDetailBlogBySlug,
  getMockSlideDetailBlogBySlideId,
} from "@/data/slide-detail-blog.data";
import { fetchWithFallback } from "@/lib/client-cache";
import type { SlideDetailBlog, SlideDetailBlogListParams } from "@/types";
import { parseSidebarConfig } from "@/types/sidebar-config";

/**
 * Fetch a single slide detail blog by its URL slug (or slideId/id fallback)
 * Returns null if not found or if the blog is not published (draft).
 */
export const fetchSlideDetailBlogBySlugFromApi = cache(
  async function fetchSlideDetailBlogBySlugFromApi(
    slug: string,
  ): Promise<SlideDetailBlog | null> {
    const getMock = (): SlideDetailBlog | null => {
      const mock = getMockSlideDetailBlogBySlug(slug);
      return mock && (mock.isPublished ?? true) ? mock : null;
    };

    if (USE_MOCK_DATA) {
      return getMock();
    }

    try {
      // 1. Try direct /:slug endpoint (Standard Backend REST URL)
      let res = await fetch(`${API_BASE_URL}/slide-detail-blogs/${slug}`, {
        next: { revalidate: 60 },
      });

      // 2. Try /slug/:slug endpoint
      if (!res.ok && res.status === 404) {
        res = await fetch(`${API_BASE_URL}/slide-detail-blogs/slug/${slug}`, {
          next: { revalidate: 60 },
        });
      }

      // 3. Try /by-slide/:slideId endpoint
      if (!res.ok && res.status === 404) {
        res = await fetch(
          `${API_BASE_URL}/slide-detail-blogs/by-slide/${slug}`,
          {
            next: { revalidate: 60 },
          },
        );
      }

      // 4. Try /by-slug/:slug endpoint
      if (!res.ok && res.status === 404) {
        res = await fetch(
          `${API_BASE_URL}/slide-detail-blogs/by-slug/${slug}`,
          {
            next: { revalidate: 60 },
          },
        );
      }

      // 5. Try /by-slide-slug/:slug endpoint
      if (!res.ok && res.status === 404) {
        res = await fetch(
          `${API_BASE_URL}/slide-detail-blogs/by-slide-slug/${slug}`,
          {
            next: { revalidate: 60 },
          },
        );
      }

      // If backend returns 404 -> fallback to mock data
      if (res.status === 404) {
        return getMock();
      }

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const body = await res.json();
      const item = body.data ?? body;
      if (!item) return getMock();

      const isPublished =
        item.isPublished !== undefined
          ? Boolean(item.isPublished)
          : item.publishedAt !== undefined
            ? Boolean(item.publishedAt)
            : true;

      // If blog is explicitly draft / unpublished -> do not allow access
      if (!isPublished) {
        return null;
      }

      const sidebarConfig =
        parseSidebarConfig(item.sidebarConfig) ??
        parseSidebarConfig(item.content) ??
        null;

      return {
        ...item,
        sidebarConfig,
        isPublished: true,
      } as SlideDetailBlog;
    } catch (err) {
      console.warn(
        `[SlideDetailBlogService] API error for slug '${slug}':`,
        err,
      );
      return getMock();
    }
  },
);

/**
 * Alias conforming to Integration Doc specification
 */
export const getSlideDetailBlogBySlug = fetchSlideDetailBlogBySlugFromApi;

/**
 * Fetch a slide detail blog specifically by slideId
 */
export const fetchSlideDetailBlogBySlideIdFromApi = cache(
  async function fetchSlideDetailBlogBySlideIdFromApi(
    slideId: string,
  ): Promise<SlideDetailBlog | null> {
    const getMock = (): SlideDetailBlog | null => {
      const mock = getMockSlideDetailBlogBySlideId(slideId);
      return mock && (mock.isPublished ?? true) ? mock : null;
    };

    if (USE_MOCK_DATA) {
      return getMock();
    }

    try {
      const res = await fetch(
        `${API_BASE_URL}/slide-detail-blogs/by-slide/${slideId}`,
        { next: { revalidate: 60 } },
      );

      if (res.status === 404) {
        return getMock();
      }

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const body = await res.json();
      const item = body.data ?? body;
      if (!item) return getMock();

      const isPublished =
        item.isPublished !== undefined
          ? Boolean(item.isPublished)
          : item.publishedAt !== undefined
            ? Boolean(item.publishedAt)
            : true;

      if (!isPublished) {
        return null;
      }

      const sidebarConfig =
        parseSidebarConfig(item.sidebarConfig) ??
        parseSidebarConfig(item.content) ??
        null;

      return {
        ...item,
        sidebarConfig,
        isPublished: true,
      } as SlideDetailBlog;
    } catch (err) {
      console.warn(
        `[SlideDetailBlogService] API error for slideId '${slideId}':`,
        err,
      );
      return getMock();
    }
  },
);

export const getSlideDetailBlogBySlideId = fetchSlideDetailBlogBySlideIdFromApi;

/**
 * Fetch a slide detail blog specifically by blog ID
 */
export const fetchSlideDetailBlogByIdFromApi = cache(
  async function fetchSlideDetailBlogByIdFromApi(
    id: string,
  ): Promise<SlideDetailBlog | null> {
    const getMock = (): SlideDetailBlog | null => {
      const mock =
        getMockSlideDetailBlogBySlug(id) ||
        MOCK_SLIDE_DETAIL_BLOGS.find((b) => b.id === id);
      return mock && (mock.isPublished ?? true) ? mock : null;
    };

    if (USE_MOCK_DATA) {
      return getMock();
    }

    try {
      const res = await fetch(`${API_BASE_URL}/slide-detail-blogs/${id}`, {
        next: { revalidate: 60 },
      });

      if (res.status === 404) {
        return getMock();
      }

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const body = await res.json();
      const item = body.data ?? body;
      if (!item) return getMock();

      const isPublished =
        item.isPublished !== undefined
          ? Boolean(item.isPublished)
          : item.publishedAt !== undefined
            ? Boolean(item.publishedAt)
            : true;

      if (!isPublished) {
        return null;
      }

      const sidebarConfig =
        parseSidebarConfig(item.sidebarConfig) ??
        parseSidebarConfig(item.content) ??
        null;

      return {
        ...item,
        sidebarConfig,
        isPublished: true,
      } as SlideDetailBlog;
    } catch (err) {
      console.warn(`[SlideDetailBlogService] API error for id '${id}':`, err);
      return getMock();
    }
  },
);

/**
 * Fetch all published slide detail blogs with robust tiered fallback
 */
export const fetchSlideDetailBlogsFromApi = cache(
  async function fetchSlideDetailBlogsFromApi(
    params?: SlideDetailBlogListParams,
  ): Promise<SlideDetailBlog[]> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 50;
    const isPublished = params?.isPublished;
    const cacheKey = `slide_detail_blogs_p${page}_l${limit}_pub${isPublished ?? "all"}`;

    const getMockList = (): SlideDetailBlog[] => {
      let items = [...MOCK_SLIDE_DETAIL_BLOGS];
      if (typeof isPublished === "boolean") {
        items = items.filter((b) => (b.isPublished ?? true) === isPublished);
      }
      return items.slice((page - 1) * limit, page * limit);
    };

    return fetchWithFallback<SlideDetailBlog[]>({
      key: cacheKey,
      useMock: USE_MOCK_DATA,
      fallback: getMockList,
      fetcher: async () => {
        const qs = new URLSearchParams();
        if (page) qs.set("page", String(page));
        if (limit) qs.set("limit", String(limit));
        if (typeof isPublished === "boolean") {
          qs.set("isPublished", String(isPublished));
        }

        const url = `${API_BASE_URL}/slide-detail-blogs${qs.toString() ? `?${qs.toString()}` : ""}`;
        const res = await fetch(url, { next: { revalidate: 60 } });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const body = await res.json();
        const payload = body.data ?? body;
        const rawItems: SlideDetailBlog[] = Array.isArray(payload)
          ? payload
          : (payload.data ?? payload.items ?? []);

        if (Array.isArray(rawItems) && rawItems.length > 0) {
          return rawItems
            .map((item) => ({
              ...item,
              isPublished:
                item.isPublished !== undefined
                  ? Boolean(item.isPublished)
                  : item.publishedAt !== undefined
                    ? Boolean(item.publishedAt)
                    : true,
            }))
            .filter((item) => {
              if (typeof isPublished === "boolean") {
                return item.isPublished === isPublished;
              }
              return true;
            });
        }

        throw new Error("No slide detail blogs returned from API");
      },
    });
  },
);
