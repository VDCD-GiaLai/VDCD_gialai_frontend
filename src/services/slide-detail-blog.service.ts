import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import {
  MOCK_SLIDE_DETAIL_BLOGS,
  getMockSlideDetailBlogBySlug,
  getMockSlideDetailBlogBySlideId,
} from "@/data/slide-detail-blog.data";
import type { SlideDetailBlog, SlideDetailBlogListParams } from "@/types";

/**
 * Fetch a single slide detail blog by its URL slug (or slideId/id fallback)
 * Returns null if not found or if the blog is not published (draft).
 */
export async function fetchSlideDetailBlogBySlugFromApi(
  slug: string,
): Promise<SlideDetailBlog | null> {
  if (USE_MOCK_DATA) {
    const mock = getMockSlideDetailBlogBySlug(slug);
    return mock && mock.isPublished ? mock : null;
  }

  try {
    // 1. Try direct /:slug endpoint (Standard Backend REST URL)
    let res = await fetch(`${API_BASE_URL}/slide-detail-blogs/${slug}`, {
      cache: "no-store",
    });

    // 2. Try /slug/:slug endpoint
    if (!res.ok && res.status === 404) {
      res = await fetch(`${API_BASE_URL}/slide-detail-blogs/slug/${slug}`, {
        cache: "no-store",
      });
    }

    // 3. Try /by-slide/:slideId endpoint
    if (!res.ok && res.status === 404) {
      res = await fetch(`${API_BASE_URL}/slide-detail-blogs/by-slide/${slug}`, {
        cache: "no-store",
      });
    }

    // 4. Try /by-slug/:slug endpoint
    if (!res.ok && res.status === 404) {
      res = await fetch(`${API_BASE_URL}/slide-detail-blogs/by-slug/${slug}`, {
        cache: "no-store",
      });
    }

    // 5. Try /by-slide-slug/:slug endpoint
    if (!res.ok && res.status === 404) {
      res = await fetch(
        `${API_BASE_URL}/slide-detail-blogs/by-slide-slug/${slug}`,
        {
          cache: "no-store",
        },
      );
    }

    // If backend returns 404 -> blog does not exist or is unpublished
    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const body = await res.json();
    const item = body.data ?? body;
    if (!item) return null;

    const isPublished =
      item.isPublished !== undefined
        ? Boolean(item.isPublished)
        : Boolean(item.publishedAt);

    // If blog is draft / unpublished -> do not allow access
    if (!isPublished) {
      return null;
    }

    return {
      ...item,
      isPublished: true,
    } as SlideDetailBlog;
  } catch (err) {
    console.warn(`[SlideDetailBlogService] API error for slug '${slug}':`, err);
    // Only if network error/offline: fallback to mock only if mock is published
    const mock = getMockSlideDetailBlogBySlug(slug);
    return mock && mock.isPublished ? mock : null;
  }
}

/**
 * Alias conforming to Integration Doc specification
 */
export const getSlideDetailBlogBySlug = fetchSlideDetailBlogBySlugFromApi;
export const getSlideDetailBlogBySlideId = fetchSlideDetailBlogBySlideIdFromApi;

/**
 * Fetch a slide detail blog specifically by slideId
 */
export async function fetchSlideDetailBlogBySlideIdFromApi(
  slideId: string,
): Promise<SlideDetailBlog | null> {
  if (USE_MOCK_DATA) {
    const mock = getMockSlideDetailBlogBySlideId(slideId);
    return mock && mock.isPublished ? mock : null;
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/slide-detail-blogs/by-slide/${slideId}`,
      { cache: "no-store" },
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const body = await res.json();
    const item = body.data ?? body;
    if (!item) return null;

    const isPublished =
      item.isPublished !== undefined
        ? Boolean(item.isPublished)
        : Boolean(item.publishedAt);

    if (!isPublished) {
      return null;
    }

    return {
      ...item,
      isPublished: true,
    } as SlideDetailBlog;
  } catch (err) {
    console.warn(
      `[SlideDetailBlogService] API error for slideId '${slideId}':`,
      err,
    );
    const mock = getMockSlideDetailBlogBySlideId(slideId);
    return mock && mock.isPublished ? mock : null;
  }
}

/**
 * Fetch a slide detail blog specifically by blog ID
 */
export async function fetchSlideDetailBlogByIdFromApi(
  id: string,
): Promise<SlideDetailBlog | null> {
  if (USE_MOCK_DATA) {
    const mock = getMockSlideDetailBlogBySlug(id);
    return mock && mock.isPublished ? mock : null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/slide-detail-blogs/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const body = await res.json();
    const item = body.data ?? body;
    if (!item) return null;

    const isPublished =
      item.isPublished !== undefined
        ? Boolean(item.isPublished)
        : Boolean(item.publishedAt);

    if (!isPublished) {
      return null;
    }

    return {
      ...item,
      isPublished: true,
    } as SlideDetailBlog;
  } catch (err) {
    console.warn(`[SlideDetailBlogService] API error for id '${id}':`, err);
    return null;
  }
}

/**
 * Fetch all published slide detail blogs
 */
export async function fetchSlideDetailBlogsFromApi(
  params?: SlideDetailBlogListParams,
): Promise<SlideDetailBlog[]> {
  if (USE_MOCK_DATA) {
    if (typeof params?.isPublished === "boolean") {
      return MOCK_SLIDE_DETAIL_BLOGS.filter(
        (b) => Boolean(b.isPublished) === params.isPublished,
      );
    }
    return MOCK_SLIDE_DETAIL_BLOGS;
  }

  try {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.limit) qs.set("limit", String(params.limit));
    if (typeof params?.isPublished === "boolean") {
      qs.set("isPublished", String(params.isPublished));
    }

    const url = `${API_BASE_URL}/slide-detail-blogs${qs.toString() ? `?${qs.toString()}` : ""}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`HTTP error ${res.status}`);
    }

    const body = await res.json();
    const payload = body.data ?? body;
    const rawItems: SlideDetailBlog[] = Array.isArray(payload)
      ? payload
      : (payload.data ?? payload.items ?? []);

    return rawItems
      .map((item) => ({
        ...item,
        isPublished:
          item.isPublished !== undefined
            ? Boolean(item.isPublished)
            : Boolean(item.publishedAt),
      }))
      .filter((item) => {
        if (typeof params?.isPublished === "boolean") {
          return item.isPublished === params.isPublished;
        }
        return true;
      });
  } catch (err) {
    console.warn(`[SlideDetailBlogService] Error fetching slide blogs:`, err);
    if (typeof params?.isPublished === "boolean") {
      return MOCK_SLIDE_DETAIL_BLOGS.filter(
        (b) => Boolean(b.isPublished) === params.isPublished,
      );
    }
    return MOCK_SLIDE_DETAIL_BLOGS;
  }
}
