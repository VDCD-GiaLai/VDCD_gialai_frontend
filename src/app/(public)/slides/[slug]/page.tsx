import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchSlideDetailBlogBySlugFromApi,
  fetchSlideDetailBlogsFromApi,
} from "@/services/slide-detail-blog.service";
import { MOCK_SLIDE_DETAIL_BLOGS } from "@/data/slide-detail-blog.data";
import { SlideDetailContent } from "@/components/slides/detail/slide-detail-content";
import type { SlideDetailBlogBlock } from "@/types";

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
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchSlideDetailBlogBySlugFromApi(slug);

  if (!blog || !blog.isPublished) {
    return {
      title: "Bài viết không tồn tại | VDCD Group",
      description: "Không tìm thấy nội dung bài viết chi tiết slide.",
    };
  }

  const title = blog.seoTitle || `${blog.title} | VDCD Group`;
  const description =
    blog.metaDescription ||
    blog.excerpt ||
    "Thông tin chi tiết dự án và công nghệ chuyển đổi số tại VDCD Group";

  // og:image priority: heroImageUrl → first image in content blocks → omit
  const ogImage =
    blog.heroImageUrl || findFirstImageInBlocks(blog.content?.blocks);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
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
  return MOCK_SLIDE_DETAIL_BLOGS.filter((blog) => blog.isPublished).map(
    (blog) => ({
      slug: blog.slug,
    }),
  );
}

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default async function SlideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchSlideDetailBlogBySlugFromApi(slug);

  // Không cho phép truy cập bài viết ở bản nháp (draft / unpublished)
  if (!blog || !blog.isPublished) {
    notFound();
  }

  const allBlogs = await fetchSlideDetailBlogsFromApi({ isPublished: true });
  const relatedBlogs = allBlogs
    .filter(
      (b) => Boolean(b.isPublished) && b.id !== blog.id && b.slug !== blog.slug,
    )
    .slice(0, 2);

  return <SlideDetailContent blog={blog} relatedBlogs={relatedBlogs} />;
}
