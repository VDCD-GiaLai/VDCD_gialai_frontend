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

  // Related articles fallback if none returned on article object
  let relatedArticles = article.relatedArticles ?? [];
  if (relatedArticles.length === 0) {
    const allArticlesRes = await fetchArticlesFromApi({
      limit: 6,
      category: article.category || undefined,
    });
    relatedArticles = allArticlesRes.items
      .filter((a) => a.id !== article.id && a.slug !== article.slug)
      .slice(0, 3);
  }

  return (
    <ArticleDetailContent article={article} relatedArticles={relatedArticles} />
  );
}
