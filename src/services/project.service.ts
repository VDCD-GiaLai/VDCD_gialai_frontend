import {
  PROJECTS_DATA,
  getProjectById as getLocalProjectById,
  type ProjectEntry,
  type ProjectGalleryImage,
  type RelatedArticle,
  type RelatedProject,
} from "@/data/projects.data";

import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { fetchWithFallback } from "@/lib/client-cache";
import type {
  DocumentContent,
  ContentBlock,
  SectionChildBlock,
  HeroMeta,
} from "@/types";

export interface BackendProject {
  id: string;
  title: string;
  slug: string;
  overview: string;
  thumbnail: string;
  year?: number;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  content?: DocumentContent | string | null;
  heroMeta?: HeroMeta;
  publishedAt?: string;
  createdAt?: string;
  field?: {
    id: string;
    name: string;
    slug: string;
  };
  province?: {
    id: string;
    name: string;
    code: string;
  };
  images?: Array<{
    id: string;
    url: string;
    caption?: string;
    order: number;
    size?: string;
  }>;
  challenge?: string;
  challengeImage?: string;
  services?: string[];
  discipline?: string;
  transformationBefore?: string;
  transformationAfter?: string;
  technicalHighlights?: { label: string; value: string }[];
  nextProjectSlug?: string;
  relatedArticles?: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    publishedAt: string;
  }>;
  relatedProjects?: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    year?: number;
    field?: { id: string; name: string; slug: string };
  }>;
}

export function mapBackendProjectToEntry(bp: BackendProject): ProjectEntry {
  const galleryImages: ProjectGalleryImage[] = (bp.images || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((img, i) => ({
      id: img.id,
      src: img.url,
      url: img.url,
      caption: img.caption || "",
      size: (img.size === "large" ? "large" : "small") as "large" | "small",
      order: img.order ?? i,
    }));

  const relatedArticles: RelatedArticle[] = (bp.relatedArticles || []).map(
    (a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      thumbnail: a.thumbnail || "",
      publishedAt: a.publishedAt,
    }),
  );

  const relatedProjects: RelatedProject[] = (bp.relatedProjects || []).map(
    (p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      thumbnail: p.thumbnail || "",
      year: p.year,
      field: p.field,
    }),
  );

  return {
    id: bp.slug,
    title: bp.title,
    category: bp.field?.name || "Khảo sát & Chuyển đổi số",
    location: bp.province?.name || "Việt Nam",
    year: bp.year ? String(bp.year) : "2024",
    description: bp.metaDescription || bp.overview?.slice(0, 150) || bp.title,
    coverImage:
      bp.thumbnail || galleryImages[0]?.src || "/images/placeholder.webp",
    layout: "landscape-full",
    overview: bp.overview || undefined,
    challenge: bp.challenge || undefined,
    challengeImage: bp.challengeImage || undefined,
    services: bp.services && bp.services.length > 0 ? bp.services : undefined,
    discipline: bp.discipline || bp.field?.name || undefined,
    galleryImages,
    technicalHighlights:
      bp.technicalHighlights && bp.technicalHighlights.length > 0
        ? bp.technicalHighlights
        : undefined,
    transformationBefore: bp.transformationBefore || undefined,
    transformationAfter: bp.transformationAfter || undefined,
    nextProjectSlug: bp.nextProjectSlug || null,
    relatedArticles: relatedArticles.length > 0 ? relatedArticles : undefined,
    thumbnail: bp.thumbnail || undefined,
    metaTitle: bp.metaTitle || undefined,
    metaDescription: bp.metaDescription || undefined,
    content: bp.content || undefined,
    heroMeta: bp.heroMeta || undefined,
    publishedAt: bp.publishedAt || undefined,
    createdAt: bp.createdAt || undefined,
  };
}

/* ──────────────────────────────────────────────────────────
 *  BIDIRECTIONAL MIGRATION & ADAPTER (CONTRACT SECTION 6)
 * ────────────────────────────────────────────────────────── */

/**
 * Chuyển đổi mã HTML legacy thành danh sách paragraph blocks
 */
export function convertHtmlToBlocks(html: string): DocumentContent {
  const blocks: ContentBlock[] = [];
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text) {
      blocks.push({
        id: `par_proj_html_${idx++}`,
        type: "paragraph",
        text,
      });
    }
  }

  if (blocks.length === 0 && html.trim()) {
    blocks.push({
      id: `par_proj_html_raw`,
      type: "paragraph",
      text: html.trim(),
    });
  }

  return {
    version: 1,
    blocks,
  };
}

/**
 * Chuyển đổi nội dung Project bất kỳ hoặc tổng hợp từ ProjectEntry sang DocumentContent chuẩn.
 * Tương thích 100% với:
 * - DocumentContent object chuẩn từ editor
 * - JSON stringify
 * - Legacy HTML
 * - Dữ liệu có sẵn của các dự án hiện tại (overview, challenge, transformation, highlights, gallery)
 */
export function convertProjectContentToDocument(
  project: ProjectEntry,
): DocumentContent {
  const rawContent = project.content;

  // 1. Nếu đã là DocumentContent object hợp lệ và có blocks
  if (
    typeof rawContent === "object" &&
    rawContent !== null &&
    "version" in rawContent &&
    "blocks" in rawContent &&
    Array.isArray((rawContent as DocumentContent).blocks) &&
    (rawContent as DocumentContent).blocks.length > 0
  ) {
    return {
      version: 1,
      blocks: (rawContent as DocumentContent).blocks,
      heroMeta: (rawContent as DocumentContent).heroMeta || project.heroMeta,
    };
  }

  // 2. Nếu là chuỗi JSON được stringify
  if (typeof rawContent === "string") {
    const trimmed = rawContent.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (
          parsed.version &&
          Array.isArray(parsed.blocks) &&
          parsed.blocks.length > 0
        ) {
          return {
            version: 1,
            blocks: parsed.blocks,
            heroMeta: parsed.heroMeta || project.heroMeta,
          };
        }
      } catch {
        // Fallthrough
      }
    }

    // 3. Nếu là chuỗi HTML
    if (trimmed.includes("<") && trimmed.includes(">")) {
      const htmlDoc = convertHtmlToBlocks(trimmed);
      htmlDoc.heroMeta = project.heroMeta;
      return htmlDoc;
    }

    // 4. Nếu là chuỗi text thuần
    if (trimmed.length > 0) {
      return {
        version: 1,
        blocks: [
          {
            id: `par_proj_text_${Date.now()}`,
            type: "paragraph",
            text: trimmed,
          },
        ],
        heroMeta: project.heroMeta,
      };
    }
  }

  // 5. Nếu chưa có blocks trong content, tổng hợp từ các trường cấu trúc của ProjectEntry
  const blocks: ContentBlock[] = [];

  // 5.1. Overview / Tổng quan (nếu khác description)
  if (project.overview && project.overview !== project.description) {
    blocks.push({
      id: "blk-proj-overview",
      type: "paragraph",
      text: project.overview,
    });
  }

  // 5.2. Thách thức dự án (Section "01")
  if (project.challenge || project.challengeImage) {
    const challengeChildren: SectionChildBlock[] = [];
    if (project.challenge) {
      challengeChildren.push({
        id: "blk-proj-challenge-text",
        type: "paragraph",
        text: project.challenge,
      });
    }
    if (project.challengeImage) {
      challengeChildren.push({
        id: "blk-proj-challenge-img",
        type: "image",
        url: project.challengeImage,
        alt: `Khảo sát thực địa - ${project.title}`,
        caption: `Khảo sát thực địa và phân tích hiện trạng công trình: ${project.title}`,
      });
    }

    blocks.push({
      id: "sec-proj-challenge",
      type: "section",
      number: "01",
      title: "Thách thức dự án & Hiện trạng",
      children: challengeChildren,
    });
  }

  // 5.3. Thực tế chuyển đổi số (Section "02")
  if (project.transformationBefore || project.transformationAfter) {
    const transChildren: SectionChildBlock[] = [];
    if (project.transformationBefore) {
      transChildren.push({
        id: "blk-proj-trans-before",
        type: "paragraph",
        text: `<strong>Hiện trạng trước số hóa:</strong> ${project.transformationBefore}`,
      });
    }
    if (project.transformationAfter) {
      transChildren.push({
        id: "blk-proj-trans-after",
        type: "paragraph",
        text: `<strong>Giải pháp công nghệ ứng dụng:</strong> ${project.transformationAfter}`,
      });
    }

    blocks.push({
      id: "sec-proj-transformation",
      type: "section",
      number: "02",
      title: "Chuyển đổi số & Giải pháp công nghệ",
      children: transChildren,
    });
  }

  return {
    version: 1,
    blocks,
    heroMeta: project.heroMeta || {
      placement: "above_title",
      position: "center",
      caption: project.galleryImages?.[0]?.caption || undefined,
    },
  };
}

export async function fetchProjectsFromApi(
  limit = 50,
): Promise<ProjectEntry[]> {
  return fetchWithFallback<ProjectEntry[]>({
    key: `projects_list_${limit}`,
    useMock: USE_MOCK_DATA,
    fallback: () => PROJECTS_DATA.slice(0, limit),
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/projects?limit=${limit}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const items: BackendProject[] = body.data?.data || body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((p) => mapBackendProjectToEntry(p));
      }
      throw new Error("No projects returned");
    },
  });
}

export async function fetchFeaturedProjectsFromApi(
  limit = 6,
): Promise<ProjectEntry[]> {
  return fetchProjectsFromApi(limit);
}

export async function fetchProjectBySlugFromApi(
  slug: string,
): Promise<ProjectEntry | null> {
  return fetchWithFallback<ProjectEntry | null>({
    key: `project_${slug}`,
    useMock: USE_MOCK_DATA,
    fallback: () => getLocalProjectById(slug) || null,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/projects/${slug}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const bp: BackendProject = body.data || body;
      if (bp && bp.slug) {
        return mapBackendProjectToEntry(bp);
      }
      throw new Error(`Project ${slug} not found`);
    },
  });
}

export interface ProjectHeroSlide {
  id: string;
  title: string;
  location: string;
  image: string;
  href: string;
}

export async function fetchProjectHeroSlidesFromApi(): Promise<
  ProjectHeroSlide[]
> {
  const projects = await fetchProjectsFromApi(5);
  if (projects && projects.length > 0) {
    return projects.slice(0, 5).map((p) => ({
      id: p.id,
      title: p.title,
      location: p.location,
      image: p.coverImage,
      href: `/projects/${p.id}`,
    }));
  }
  return [];
}
