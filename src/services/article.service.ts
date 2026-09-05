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

export async function fetchArticlesFromApi(
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
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const payload = body.data ?? body;
      const rawItems: Article[] = payload.data ?? payload.items ?? [];
      const items = rawItems.map((item) => ({
        ...item,
        content: parseArticleContent(item.content),
      }));
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
}

/* ── Fetch single article by slug ──────────────────────── */

export async function fetchArticleBySlugFromApi(
  slug: string,
): Promise<ArticleDetail | null> {
  const getMockDetail = (): ArticleDetail | null => {
    const article = getMockArticleBySlug(slug);
    if (!article || !article.isPublished) return null;

    const relatedArticles = MOCK_ARTICLES.filter(
      (a) =>
        a.isPublished && a.id !== article.id && a.category === article.category,
    )
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        thumbnail: a.thumbnail,
        publishedAt: a.publishedAt,
      }));

    return {
      ...article,
      content: parseArticleContent(article.content),
      relatedArticles,
    };
  };

  return fetchWithFallback<ArticleDetail | null>({
    key: `article_slug_${slug}`,
    useMock: USE_MOCK_DATA,
    fallback: getMockDetail,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
        cache: "no-store",
      });

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

      return {
        ...data,
        isPublished: true,
        content: parseArticleContent(data.content),
        relatedArticles: data.relatedArticles ?? [],
      } as ArticleDetail;
    },
  });
}

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
