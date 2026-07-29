import {
  PROJECTS_DATA,
  getProjectById as getLocalProjectById,
  type ProjectEntry,
  type ProjectGalleryImage,
} from "@/data/projects.data";

import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";

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
  }>;
}

export function mapBackendProjectToEntry(
  bp: BackendProject,
  allProjects: BackendProject[] = [],
): ProjectEntry {
  const galleryImages: ProjectGalleryImage[] = (bp.images || []).map(
    (img, i) => ({
      src: img.url,
      caption: img.caption || `${bp.title} - Hình ${i + 1}`,
      size: i % 3 === 0 ? "large" : "small",
    }),
  );

  if (galleryImages.length === 0 && bp.thumbnail) {
    galleryImages.push({
      src: bp.thumbnail,
      caption: bp.title,
      size: "large",
    });
  }

  // Find next project slug for navigation
  let nextProjectId: string | null = null;
  if (allProjects.length > 0) {
    const currIdx = allProjects.findIndex((p) => p.slug === bp.slug);
    if (currIdx >= 0 && currIdx < allProjects.length - 1) {
      nextProjectId = allProjects[currIdx + 1].slug;
    } else if (allProjects.length > 1) {
      nextProjectId = allProjects[0].slug;
    }
  }

  return {
    id: bp.slug,
    title: bp.title,
    category: bp.field?.name || "Khảo sát & Chuyển đổi số",
    location: bp.province?.name || "Việt Nam",
    year: bp.year ? String(bp.year) : "2024",
    description: bp.metaDescription || bp.overview?.slice(0, 150) || bp.title,
    coverImage:
      bp.thumbnail || galleryImages[0]?.src || "/images/placeholder.jpg",
    layout: "landscape-full",
    detail: {
      challenge: bp.overview || bp.metaDescription || bp.title,
      services: [
        bp.field?.name || "Chuyển đổi số công trình",
        "Khảo sát địa hình 2D & 3D",
        "Giám sát tiến độ AutoTimelapse",
      ],
      discipline: bp.field?.name || "Khảo sát & Giám sát số",
      journeyStages: [
        {
          number: "01",
          title: "Khảo sát",
          titleEn: "Capture",
          description:
            "Thu thập dữ liệu hiện trường bằng thiết bị drone & công nghệ đo đạc chuyên dụng.",
          detail: "Dữ liệu đo đạc chính xác cao",
          image: bp.thumbnail || galleryImages[0]?.src || "",
        },
        {
          number: "02",
          title: "Mô hình hóa",
          titleEn: "Model",
          description: "Xử lý dữ liệu và dựng bản đồ 2D/3D số hóa công trình.",
          detail: "Số hóa dữ liệu công trình",
          image: galleryImages[1]?.src || bp.thumbnail || "",
        },
      ],
      galleryImages,
      technicalHighlights: [
        { label: "Dự án", value: bp.title },
        { label: "Địa điểm", value: bp.province?.name || "Việt Nam" },
        { label: "Lĩnh vực", value: bp.field?.name || "Kỹ thuật công trình" },
        { label: "Năm thực hiện", value: String(bp.year || 2024) },
      ],
      transformationBefore: galleryImages[0]?.src || bp.thumbnail || "",
      transformationAfter:
        galleryImages[1]?.src || galleryImages[0]?.src || bp.thumbnail || "",
      nextProjectId,
    },
  };
}

export async function fetchProjectsFromApi(
  limit = 50,
): Promise<ProjectEntry[]> {
  if (USE_MOCK_DATA) {
    return PROJECTS_DATA.slice(0, limit);
  }
  try {
    const res = await fetch(`${API_BASE_URL}/projects?limit=${limit}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const body = await res.json();
    const items: BackendProject[] = body.data?.data || body.data || body;
    if (Array.isArray(items) && items.length > 0) {
      return items.map((p) => mapBackendProjectToEntry(p, items));
    }
  } catch (err) {
    console.warn("API fetch failed, fallback to local dataset:", err);
  }
  return PROJECTS_DATA.slice(0, limit);
}

export async function fetchFeaturedProjectsFromApi(
  limit = 6,
): Promise<ProjectEntry[]> {
  return fetchProjectsFromApi(limit);
}

export async function fetchProjectBySlugFromApi(
  slug: string,
): Promise<ProjectEntry | null> {
  if (USE_MOCK_DATA) {
    return getLocalProjectById(slug) || null;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const body = await res.json();
      const bp: BackendProject = body.data || body;
      if (bp && bp.slug) {
        return mapBackendProjectToEntry(bp);
      }
    }
  } catch (err) {
    console.warn(
      `API fetch for slug '${slug}' failed, fallback to local data:`,
      err,
    );
  }
  return getLocalProjectById(slug) || null;
}
