import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchProgramBySlugFromApi,
  fetchRelatedProgramsFromApi,
} from "@/services/program.service";
import { MOCK_PROGRAMS } from "@/data/programs.data";
import { ProgramDetailContent } from "@/components/programs/detail/program-detail-content";
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
  const program = await fetchProgramBySlugFromApi(slug);

  if (!program || program.isPublished === false) {
    return {
      title: "Chương trình không tồn tại | VDCD Group",
      description: "Không tìm thấy nội dung chương trình đổi mới sáng tạo.",
    };
  }

  const title = program.metaTitle || `${program.title} | VDCD Gia Lai`;
  const description =
    program.metaDescription ||
    program.shortDescription ||
    "Chương trình chiến lược chuyển đổi số và đổi mới sáng tạo tại VDCD Group";

  const contentBlocks =
    typeof program.content === "object" ? program.content?.blocks : undefined;
  const ogImage = program.thumbnail || findFirstImageInBlocks(contentBlocks);

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
  return MOCK_PROGRAMS.filter((p) => p.isPublished !== false).map((p) => ({
    slug: p.slug,
  }));
}

/* ────────────────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────────────────── */

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await fetchProgramBySlugFromApi(slug);

  if (!program || program.isPublished === false) {
    notFound();
  }

  const relatedPrograms = await fetchRelatedProgramsFromApi(
    slug,
    program.field?.id,
    2,
  );

  return (
    <ProgramDetailContent program={program} relatedPrograms={relatedPrograms} />
  );
}
