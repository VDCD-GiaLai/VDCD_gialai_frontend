import { cache } from "react";
import { MOCK_ARTICLES, getMockArticleBySlug } from "@/data/news.data";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { fetchWithFallback } from "@/lib/client-cache";
import type {
  Article,
  ArticleDetail,
  ArticleListParams,
  PaginatedResponse,
  SlideDetailBlogContent,
} from "@/types";
import { parseSidebarConfig } from "@/types/sidebar-config";

/**
 * Normalizes article slug by stripping leading/trailing slashes and whitespace.
 * Fixes 404 issues when database records have trailing slashes (e.g. "slug/").
 */
export function normalizeArticleSlug(slug?: string | null): string {
  if (!slug) return "";
  try {
    return decodeURIComponent(slug)
      .trim()
      .replace(/^\/+|\/+$/g, "");
  } catch {
    return slug.trim().replace(/^\/+|\/+$/g, "");
  }
}

/**
 * Parses article content if it is encoded as a JSON string
 */
function parseArticleContent(
  content?: string | SlideDetailBlogContent | null,
): string | SlideDetailBlogContent | null {
  if (!content) return null;
  if (typeof content === "object") return content;
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (
          parsed &&
          typeof parsed === "object" &&
          (parsed.blocks || parsed.version)
        ) {
          return parsed as SlideDetailBlogContent;
        }
      } catch {
        // Fall back to original string
      }
    }
  }
  return content;
}

/* ── Fetch paginated articles ──────────────────────────── */

export const fetchArticlesFromApi = cache(async function fetchArticlesFromApi(
  params: ArticleListParams = {},
): Promise<PaginatedResponse<Article>> {
  const { page = 1, limit = 10, category, tags } = params;
  const cacheKey = `articles_page_${page}_limit_${limit}_cat_${category || "all"}_tag_${tags || "all"}`;

  const getMockPaginated = (): PaginatedResponse<Article> => {
    let filtered = MOCK_ARTICLES.filter((a) => a.isPublished);
    if (category && category !== "Tất cả") {
      filtered = filtered.filter((a) => a.category === category);
    }
    if (tags) {
      filtered = filtered.filter((a) =>
        a.tags?.toLowerCase().includes(tags.toLowerCase()),
      );
    }
    const total = filtered.length;
    const items = filtered
      .slice((page - 1) * limit, page * limit)
      .map((item) => ({
        ...item,
        content: parseArticleContent(item.content),
      }));
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  };

  return fetchWithFallback<PaginatedResponse<Article>>({
    key: cacheKey,
    useMock: USE_MOCK_DATA,
    fallback: getMockPaginated,
    fetcher: async () => {
      const qs = new URLSearchParams();
      qs.set("page", String(page));
      qs.set("limit", String(limit));
      if (category && category !== "Tất cả") qs.set("category", category);
      if (tags) qs.set("tags", tags);

      const res = await fetch(`${API_BASE_URL}/articles?${qs.toString()}`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const payload = body.data ?? body;
      const rawItems: Article[] = payload.data ?? payload.items ?? [];
      const items = rawItems.map((item) => ({
        ...item,
        slug: normalizeArticleSlug(item.slug) || item.slug,
        content: parseArticleContent(item.content),
      }));
      if (items.some((i) => typeof i.order === "number" && i.order > 0)) {
        items.sort((a, b) => {
          const orderA =
            typeof a.order === "number" && a.order > 0
              ? a.order
              : Number.MAX_SAFE_INTEGER;
          const orderB =
            typeof b.order === "number" && b.order > 0
              ? b.order
              : Number.MAX_SAFE_INTEGER;
          return orderA - orderB;
        });
      }
      const total: number = payload.total ?? items.length;

      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    },
  });
});

/* ── Fetch single article by slug ──────────────────────── */

export const fetchArticleBySlugFromApi = cache(
  async function fetchArticleBySlugFromApi(
    slug: string,
  ): Promise<ArticleDetail | null> {
    const cleanSlug = normalizeArticleSlug(slug) || slug;

    const getMockDetail = (): ArticleDetail | null => {
      const article =
        getMockArticleBySlug(cleanSlug) ?? getMockArticleBySlug(slug);
      if (!article || !article.isPublished) return null;

      const relatedArticles = MOCK_ARTICLES.filter(
        (a) =>
          a.isPublished &&
          a.id !== article.id &&
          a.category === article.category,
      )
        .slice(0, 3)
        .map((a) => ({
          id: a.id,
          title: a.title,
          slug: normalizeArticleSlug(a.slug) || a.slug,
          thumbnail: a.thumbnail,
          publishedAt: a.publishedAt,
        }));

      return {
        ...article,
        slug: normalizeArticleSlug(article.slug) || article.slug,
        content: parseArticleContent(article.content),
        relatedArticles,
      };
    };

    return fetchWithFallback<ArticleDetail | null>({
      key: `article_slug_${cleanSlug}`,
      useMock: USE_MOCK_DATA,
      fallback: getMockDetail,
      fetcher: async () => {
        let res = await fetch(
          `${API_BASE_URL}/articles/${encodeURIComponent(cleanSlug)}`,
          {
            next: { revalidate: 60 },
          },
        );

        // Fallback for articles whose DB slug contains a trailing/leading slash
        // (e.g., "ai-drone-challenge-2026-san-choi-uav-sinh-vien-fpt-quy-nhon/")
        if (res.status === 404) {
          try {
            const listRes = await fetch(
              `${API_BASE_URL}/articles?page=1&limit=100`,
              {
                next: { revalidate: 60 },
              },
            );
            if (listRes.ok) {
              const listBody = await listRes.json();
              const listPayload = listBody.data ?? listBody;
              const rawItems: Article[] =
                listPayload.data ?? listPayload.items ?? [];
              const matched = rawItems.find(
                (item) =>
                  normalizeArticleSlug(item.slug) === cleanSlug ||
                  item.id === cleanSlug,
              );
              if (matched?.id) {
                res = await fetch(
                  `${API_BASE_URL}/articles/${encodeURIComponent(matched.id)}`,
                  {
                    next: { revalidate: 60 },
                  },
                );
              }
            }
          } catch {
            // Ignore fallback error and let 404 handle below
          }
        }

        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error(`HTTP error ${res.status}`);
        }

        const body = await res.json();
        const data = body.data ?? body;
        if (!data) return null;

        // Ensure unpublished draft articles return null (404)
        const isPublished =
          data.isPublished !== undefined
            ? Boolean(data.isPublished)
            : Boolean(data.publishedAt);

        if (!isPublished) {
          return null;
        }

        const parsedContent = parseArticleContent(data.content);
        const sidebarConfig =
          parseSidebarConfig(data.sidebarConfig) ??
          parseSidebarConfig(parsedContent) ??
          parseSidebarConfig(data.content) ??
          null;

        const relatedArticles = Array.isArray(data.relatedArticles)
          ? data.relatedArticles.map((rel: Article) => ({
              ...rel,
              slug: normalizeArticleSlug(rel.slug) || rel.slug,
            }))
          : [];

        return {
          ...data,
          slug: normalizeArticleSlug(data.slug) || data.slug,
          isPublished: true,
          content: parsedContent,
          sidebarConfig,
          relatedArticles,
        } as ArticleDetail;
      },
    });
  },
);

/* ── Fetch featured / latest articles (shortcut) ──────── */

export async function fetchFeaturedArticlesFromApi(
  limit = 6,
): Promise<Article[]> {
  const result = await fetchArticlesFromApi({ page: 1, limit });
  return result.items;
}

/* ── Standard Integration Aliases ──────────────────────── */
export const getArticleBySlug = fetchArticleBySlugFromApi;
export const getArticles = fetchArticlesFromApi;
