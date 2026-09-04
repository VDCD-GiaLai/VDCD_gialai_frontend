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
  const galleryImages: ProjectGalleryImage[] = (bp.images || []).map(
    (img, i) => ({
      src: img.url,
      caption: img.caption || `${bp.title} - Hình ${i + 1}`,
      size: (img.size === "large" ? "large" : "small") as "large" | "small",
    }),
  );

  if (galleryImages.length === 0 && bp.thumbnail) {
    galleryImages.push({
      src: bp.thumbnail,
      caption: bp.title,
      size: "large",
    });
  }

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
    relatedProjects: relatedProjects.length > 0 ? relatedProjects : undefined,
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
