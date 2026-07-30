import type { Metadata } from "next";
import { fetchProgramBySlugFromApi } from "@/services/program.service";
import { ProgramDetailContent } from "@/components/programs/detail/program-detail-content";
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
  const program = await fetchProgramBySlugFromApi(slug);

  if (!program) {
    return { title: "Chương trình không tồn tại | VDCD Group" };
  }

  return {
    title: program.metaTitle || `${program.title} | VDCD Group`,
    description:
      program.metaDescription ||
      program.shortDescription ||
      program.content?.replace(/<[^>]*>/g, "").slice(0, 155) ||
      program.title,
    openGraph: {
      title: program.metaTitle || `${program.title} | VDCD Group`,
      description:
        program.metaDescription || program.shortDescription || program.title,
      type: "article",
      ...(program.thumbnail ? { images: [{ url: program.thumbnail }] } : {}),
    },
  };
}

/* ────────────────────────────────────────────────────────
   Page component
   ──────────────────────────────────────────────────────── */

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await fetchProgramBySlugFromApi(slug);

  if (!program) {
    notFound();
  }

  return <ProgramDetailContent slug={slug} />;
}
