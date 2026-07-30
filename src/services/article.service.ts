import { MOCK_ARTICLES, getMockArticleBySlug } from "@/data/news.data";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
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

  if (USE_MOCK_DATA) {
    let filtered = [...MOCK_ARTICLES];
    if (category) filtered = filtered.filter((a) => a.category === category);
    if (tags)
      filtered = filtered.filter((a) =>
        a.tags?.toLowerCase().includes(tags.toLowerCase()),
      );
    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  try {
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
  } catch (err) {
    console.warn("Articles API fetch failed, fallback to mock data:", err);
    const total = MOCK_ARTICLES.length;
    const items = MOCK_ARTICLES.slice((page - 1) * limit, page * limit);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}

/* ── Fetch single article by slug ──────────────────────── */

export async function fetchArticleBySlugFromApi(
  slug: string,
): Promise<ArticleDetail | null> {
  if (USE_MOCK_DATA) {
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
  }

  try {
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
  } catch (err) {
    console.warn(
      `Article fetch for '${slug}' failed, fallback to mock data:`,
      err,
    );
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
  }
}

/* ── Fetch featured / latest articles (shortcut) ──────── */

export async function fetchFeaturedArticlesFromApi(
  limit = 6,
): Promise<Article[]> {
  const result = await fetchArticlesFromApi({ page: 1, limit });
  return result.items;
}
