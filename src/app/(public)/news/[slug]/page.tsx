import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchArticleBySlugFromApi,
  fetchArticlesFromApi,
} from "@/services/article.service";
import { MOCK_ARTICLES } from "@/data/news.data";
import { ArticleDetailContent } from "@/components/news/detail/article-detail-content";
import type { SlideDetailBlogBlock } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Extract the first image URL from content blocks (supports nested sections) */
function findFirstImageInBlocks(
  blocks?: SlideDetailBlogBlock[],
): string | undefined {
  if (!blocks) return undefined;
  for (const block of blocks) {
    if (block.type === "image" && block.url) return block.url;
    if (block.type === "section" && block.children) {
      const found = findFirstImageInBlocks(
        block.children as SlideDetailBlogBlock[],
      );
      if (found) return found;
    }
  }
  return undefined;
}

/* ────────────────────────────────────────────────────────
   Dynamic Metadata
   ──────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlugFromApi(slug);

  if (!article || !article.isPublished) {
    return {
      title: "Bài viết không tồn tại | VDCD Group",
      description: "Không tìm thấy nội dung bài viết.",
    };
  }

  const title = article.metaTitle || `${article.title} | VDCD Group`;
  const description =
    article.metaDescription ||
    article.excerpt ||
    "Thông tin chi tiết, tin tức và giải pháp chuyển đổi số tại VDCD Group";

  const contentBlocks =
    typeof article.content === "object" &&
    article.content &&
    "blocks" in article.content
      ? article.content.blocks
      : undefined;

  const ogImage = article.thumbnail || findFirstImageInBlocks(contentBlocks);

  const keywords = article.tags
    ? article.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt || undefined,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/* ────────────────────────────────────────────────────────
   Static Params
   ──────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return MOCK_ARTICLES.filter((article) => article.isPublished).map(
    (article) => ({
      slug: article.slug,
    }),
  );
}

/* ────────────────────────────────────────────────────────
   Page Component (Server Component)
   ──────────────────────────────────────────────────────── */

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlugFromApi(slug);

  // Không cho phép truy cập bài viết ở bản nháp (draft / unpublished)
  if (!article || !article.isPublished) {
    notFound();
  }

  // Related articles (ensure up to 6 items)
  let relatedArticles = article.relatedArticles ?? [];
  if (relatedArticles.length < 6) {
    const allArticlesRes = await fetchArticlesFromApi({
      limit: 12,
      category: article.category || undefined,
    });
    const existingIds = new Set(
      relatedArticles.map((a) => a.id).concat(article.id),
    );
    let more = allArticlesRes.items.filter(
      (a) => !existingIds.has(a.id) && a.slug !== article.slug,
    );
    if (relatedArticles.length + more.length < 6) {
      const globalArticlesRes = await fetchArticlesFromApi({ limit: 12 });
      const globalMore = globalArticlesRes.items.filter(
        (a) =>
          !existingIds.has(a.id) &&
          !more.some((m) => m.id === a.id) &&
          a.slug !== article.slug,
      );
      more = [...more, ...globalMore];
    }
    relatedArticles = [...relatedArticles, ...more].slice(0, 6);
  }

  return (
    <ArticleDetailContent article={article} relatedArticles={relatedArticles} />
  );
}
