import { OPEN_POSITIONS, DEPARTMENTS } from "@/data/careers.data";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { fetchWithFallback } from "@/lib/client-cache";
import type { JobPosition } from "@/types";

export interface BackendJob {
  id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type: string;
  salaryRange?: string;
  deadline?: string;
  description?: string;
  requirements?: string;
  benefits?: string;
  experience?: string;
  tags?: string[];
  isUrgent?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export interface JobListParams {
  page?: number;
  limit?: number;
  department?: string;
  type?: string;
  location?: string;
  experience?: string;
  search?: string;
}

export interface JobsResponse {
  items: JobPosition[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  departments: string[];
}

export function mapBackendJobToPosition(bj: BackendJob): JobPosition {
  return {
    id: bj.slug || bj.id,
    title: bj.title,
    department: bj.department || "Công nghệ",
    location: bj.location || "TP. Pleiku, Gia Lai",
    employmentType: bj.type || "Toàn thời gian",
    salary: bj.salaryRange || "Thoả thuận",
    postedDate: bj.createdAt ? bj.createdAt.slice(0, 10) : "2026-07-20",
    description: bj.description || "",
    experience: bj.experience || "1 - 3 năm",
    tags:
      Array.isArray(bj.tags) && bj.tags.length > 0
        ? bj.tags
        : ["VDCD", "Gia Lai", "Công nghệ"],
  };
}

export async function fetchJobsFromApi(
  params: JobListParams = {},
): Promise<JobsResponse> {
  const {
    page = 1,
    limit = 20,
    department,
    type,
    location,
    experience,
    search,
  } = params;
  const cacheKey = `jobs_page_${page}_limit_${limit}_dept_${department || "all"}_search_${search || ""}`;

  const getMockResponse = (): JobsResponse => {
    let filtered = [...OPEN_POSITIONS];
    if (department && department !== "Tất cả") {
      filtered = filtered.filter((j) => j.department === department);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      departments: Array.from(DEPARTMENTS),
    };
  };

  return fetchWithFallback<JobsResponse>({
    key: cacheKey,
    useMock: USE_MOCK_DATA,
    fallback: getMockResponse,
    fetcher: async () => {
      const qs = new URLSearchParams();
      qs.set("page", String(page));
      qs.set("limit", String(limit));
      if (department && department !== "Tất cả")
        qs.set("department", department);
      if (type && type !== "Tất cả") qs.set("type", type);
      if (location && location !== "Tất cả") qs.set("location", location);
      if (experience && experience !== "Tất cả")
        qs.set("experience", experience);
      if (search) qs.set("search", search);

      const res = await fetch(`${API_BASE_URL}/jobs?${qs.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const payload = body.data ?? body;
      const rawItems: BackendJob[] = payload.data ?? payload.items ?? [];
      const total: number = payload.total ?? rawItems.length;
      const departments: string[] =
        payload.departments ?? Array.from(DEPARTMENTS);

      if (Array.isArray(rawItems)) {
        return {
          items: rawItems.map(mapBackendJobToPosition),
          total,
          page,
          limit,
          totalPages: payload.totalPages ?? (Math.ceil(total / limit) || 1),
          departments,
        };
      }
      throw new Error("Invalid jobs response format");
    },
  });
}

export async function fetchJobBySlugFromApi(
  slugOrId: string,
): Promise<JobPosition | null> {
  const getMockDetail = (): JobPosition | null => {
    return (
      OPEN_POSITIONS.find((p) => p.id === slugOrId || p.title === slugOrId) ||
      null
    );
  };

  return fetchWithFallback<JobPosition | null>({
    key: `job_${slugOrId}`,
    useMock: USE_MOCK_DATA,
    fallback: getMockDetail,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/jobs/${slugOrId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP error ${res.status}`);
      }

      const body = await res.json();
      const data: BackendJob = body.data ?? body;
      if (data && (data.id || data.slug)) {
        return mapBackendJobToPosition(data);
      }
      throw new Error(`Job ${slugOrId} not found`);
    },
  });
}
