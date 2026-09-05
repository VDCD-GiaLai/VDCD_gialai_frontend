import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchSolutionBySlugFromApi,
  fetchRelatedSolutionsFromApi,
} from "@/services/solution.service";
import { ALL_MOCK_SOLUTIONS } from "@/data/solutions.data";
import { SolutionDetailContent } from "@/components/solution/detail/solution-detail-content";
import type { ContentBlock } from "@/types";

/** Extract the first image URL from content blocks (supports nested sections) */
function findFirstImageInBlocks(blocks?: ContentBlock[]): string | undefined {
  if (!blocks) return undefined;
  for (const block of blocks) {
    if (block.type === "image" && block.url) return block.url;
    if (block.type === "section" && block.children) {
      const found = findFirstImageInBlocks(block.children as ContentBlock[]);
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
  const solution = await fetchSolutionBySlugFromApi(slug);

  if (!solution || solution.isPublished === false) {
    return {
      title: "Giải pháp không tồn tại | VDCD Group",
      description: "Không tìm thấy nội dung giải pháp công nghệ số.",
    };
  }

  const title = solution.metaTitle || `${solution.title} | VDCD Gia Lai`;
  const description =
    solution.metaDescription ||
    solution.shortDescription ||
    "Giải pháp công nghệ số và chuyển đổi số chuyên sâu tại VDCD Gia Lai";

  const contentBlocks =
    typeof solution.content === "object" ? solution.content?.blocks : undefined;
  const ogImage = solution.thumbnail || findFirstImageInBlocks(contentBlocks);

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
  return ALL_MOCK_SOLUTIONS.filter((s) => s.isPublished !== false).map((s) => ({
    slug: s.slug,
  }));
}

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = await fetchSolutionBySlugFromApi(slug);

  if (!solution || solution.isPublished === false) {
    notFound();
  }

  const relatedSolutions = await fetchRelatedSolutionsFromApi(
    slug,
    solution.field?.id,
    2,
  );

  return (
    <SolutionDetailContent
      solution={solution}
      relatedSolutions={relatedSolutions}
    />
  );
}
