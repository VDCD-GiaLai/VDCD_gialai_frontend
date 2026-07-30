import type { Metadata } from "next";
import { fetchArticleBySlugFromApi } from "@/services/article.service";
import { ArticleDetailContent } from "@/components/news/detail/article-detail-content";
import { notFound } from "next/navigation";

/* ────────────────────────────────────────────────────────
   Dynamic metadata
   ──────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlugFromApi(slug);

  if (!article) {
    return { title: "Bài viết không tồn tại | VDCD Group" };
  }

  return {
    title: article.metaTitle || `${article.title} | VDCD Group`,
    description:
      article.metaDescription ||
      article.content?.replace(/<[^>]*>/g, "").slice(0, 155) ||
      article.title,
    keywords: article.tags?.split(",").map((t) => t.trim()) || [],
    openGraph: {
      title: article.metaTitle || `${article.title} | VDCD Group`,
      description:
        article.metaDescription ||
        article.content?.replace(/<[^>]*>/g, "").slice(0, 155) ||
        article.title,
      type: "article",
      ...(article.thumbnail ? { images: [{ url: article.thumbnail }] } : {}),
    },
  };
}

/* ────────────────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────────────────── */

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticleBySlugFromApi(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailContent slug={slug} />;
}
