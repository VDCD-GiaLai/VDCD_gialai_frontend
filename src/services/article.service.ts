import { MOCK_ARTICLES, getMockArticleBySlug } from "@/data/news.data";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { fetchWithFallback } from "@/lib/client-cache";
import type {
  Article,
  ArticleDetail,
  ArticleListParams,
  PaginatedResponse,
} from "@/types";

/* ── Fetch paginated articles ──────────────────────────── */

export async function fetchArticlesFromApi(
  params: ArticleListParams = {},
): Promise<PaginatedResponse<Article>> {
  const { page = 1, limit = 10, category, tags } = params;
  const cacheKey = `articles_page_${page}_limit_${limit}_cat_${category || "all"}_tag_${tags || "all"}`;

  const getMockPaginated = (): PaginatedResponse<Article> => {
    let filtered = [...MOCK_ARTICLES];
    if (category) filtered = filtered.filter((a) => a.category === category);
    if (tags)
      filtered = filtered.filter((a) =>
        a.tags?.toLowerCase().includes(tags.toLowerCase()),
      );
    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
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
      if (category) qs.set("category", category);
      if (tags) qs.set("tags", tags);

      const res = await fetch(`${API_BASE_URL}/articles?${qs.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const payload = body.data ?? body;
      const items: Article[] = payload.data ?? payload.items ?? [];
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
    if (!article) return null;
    const relatedArticles = MOCK_ARTICLES.filter(
      (a) => a.category === article.category && a.id !== article.id,
    )
      .slice(0, 3)
      .map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        thumbnail: a.thumbnail,
        publishedAt: a.publishedAt,
      }));
    return { ...article, relatedArticles };
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

      return {
        ...data,
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
