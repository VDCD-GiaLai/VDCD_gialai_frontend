import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS_DATA, getProjectById } from "@/data/projects.data";
import { fetchProjectBySlugFromApi } from "@/services/project.service";
import { ProjectDetailContent } from "@/components/projects/detail/project-detail-content";
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
   Dynamic metadata
   ──────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project =
    (await fetchProjectBySlugFromApi(slug)) || getProjectById(slug);

  if (!project) {
    return { title: "Dự án không tồn tại | VDCD Group" };
  }

  const title = project.metaTitle || `${project.title} | Dự án VDCD Group`;
  const description =
    project.metaDescription ||
    project.description ||
    project.overview ||
    "Chi tiết dự án chuyển đổi số công trình tại VDCD Group";

  const contentBlocks =
    typeof project.content === "object" ? project.content?.blocks : undefined;
  const ogImage =
    project.coverImage ||
    project.thumbnail ||
    findFirstImageInBlocks(contentBlocks);

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category,
      project.location,
      "VDCD",
      "Giám sát công trình",
      "Chuyển đổi số",
    ],
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
   Static params for all known projects
   ──────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return PROJECTS_DATA.map((p) => ({ slug: p.id }));
}

/* ────────────────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────────────────── */

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project =
    (await fetchProjectBySlugFromApi(slug)) || getProjectById(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent slug={slug} initialProject={project} />;
}
