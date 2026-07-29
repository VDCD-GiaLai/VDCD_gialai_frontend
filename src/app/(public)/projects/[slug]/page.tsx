import type { Metadata } from "next";
import { PROJECTS_DATA, getProjectById } from "@/data/projects.data";
import { fetchProjectBySlugFromApi } from "@/services/project.service";
import { ProjectDetailContent } from "@/components/projects/detail/project-detail-content";
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
  const project =
    (await fetchProjectBySlugFromApi(slug)) || getProjectById(slug);

  if (!project) {
    return { title: "Dự án không tồn tại | VDCD Group" };
  }

  return {
    title: `${project.title} | Dự án VDCD Group`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      project.location,
      "VDCD",
      "Giám sát công trình",
    ],
    openGraph: {
      title: `${project.title} | Dự án VDCD Group`,
      description: project.description,
      type: "article",
      images: [{ url: project.coverImage }],
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

  return <ProjectDetailContent slug={slug} />;
}
