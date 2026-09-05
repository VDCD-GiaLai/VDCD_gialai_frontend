import {
  MOCK_PROGRAMS,
  MOCK_OPERATION_FIELDS,
  getMockProgramBySlug,
} from "@/data/programs.data";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { fetchWithFallback } from "@/lib/client-cache";
import type {
  Program,
  ProgramDetail,
  ProgramListParams,
  PaginatedResponse,
  OperationField,
  SlideDetailBlogContent,
} from "@/types";

/**
 * Parses program content if it is encoded as a JSON string
 */
export function parseProgramContent(
  content?: string | SlideDetailBlogContent | null,
): string | SlideDetailBlogContent | null {
  if (!content) return null;
  if (typeof content === "object") return content;
  if (typeof content === "string") {
    const trimmed = content.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (
          parsed &&
          typeof parsed === "object" &&
          (parsed.blocks || parsed.version)
        ) {
          return parsed as SlideDetailBlogContent;
        }
      } catch {
        // Fall back to original string
      }
    }
  }
  return content;
}

/* ── Fetch paginated programs ─────────────────────────── */

export async function fetchProgramsFromApi(
  params: ProgramListParams = {},
): Promise<PaginatedResponse<Program>> {
  const { page = 1, limit = 10, fieldId } = params;
  const cacheKey = `programs_page_${page}_limit_${limit}_field_${fieldId || "all"}`;

  const getMockPaginated = (): PaginatedResponse<Program> => {
    let filtered = [...MOCK_PROGRAMS].filter((p) => p.isPublished !== false);
    if (fieldId) filtered = filtered.filter((p) => p.field?.id === fieldId);
    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  };

  return fetchWithFallback<PaginatedResponse<Program>>({
    key: cacheKey,
    useMock: USE_MOCK_DATA,
    fallback: getMockPaginated,
    fetcher: async () => {
      const qs = new URLSearchParams();
      qs.set("page", String(page));
      qs.set("limit", String(limit));
      if (fieldId) qs.set("fieldId", fieldId);

      const res = await fetch(`${API_BASE_URL}/programs?${qs.toString()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const payload = body.data ?? body;
      const rawItems: Program[] = payload.data ?? payload.items ?? [];
      const total: number = payload.total ?? rawItems.length;

      const items = rawItems.map((item) => ({
        ...item,
        content: parseProgramContent(item.content),
      }));

      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    },
  });
}

/* ── Fetch featured programs (for landing section) ────── */

export async function fetchFeaturedProgramsFromApi(
  limit = 4,
): Promise<Program[]> {
  const res = await fetchProgramsFromApi({ page: 1, limit });
  return res.items.slice(0, limit);
}

/* ── Fetch single program by slug ─────────────────────── */

export async function fetchProgramBySlugFromApi(
  slug: string,
): Promise<ProgramDetail | null> {
  const getMockDetail = (): ProgramDetail | null => {
    const program = getMockProgramBySlug(slug);
    if (!program || program.isPublished === false) return null;
    return { ...program, relatedArticles: [] };
  };

  return fetchWithFallback<ProgramDetail | null>({
    key: `program_${slug}`,
    useMock: USE_MOCK_DATA,
    fallback: getMockDetail,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/programs/${slug}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP error ${res.status}`);
      }

      const body = await res.json();
      const data = body.data ?? body;

      // Do not return unpublished programs on public routes
      if (!data || (data.isPublished === false && !USE_MOCK_DATA)) {
        return null;
      }

      return {
        ...data,
        content: parseProgramContent(data.content),
        relatedArticles: data.relatedArticles ?? [],
      } as ProgramDetail;
    },
  });
}

/* ── Fetch related programs ───────────────────────────── */

export async function fetchRelatedProgramsFromApi(
  currentSlug: string,
  fieldId?: string,
  limit = 2,
): Promise<Program[]> {
  try {
    const res = await fetchProgramsFromApi({
      page: 1,
      limit: 6,
      fieldId,
    });
    return res.items
      .filter((p) => p.slug !== currentSlug && p.isPublished !== false)
      .slice(0, limit);
  } catch {
    return [];
  }
}

// Aliases for seamless usage across components
export const getProgramBySlug = fetchProgramBySlugFromApi;
export const getPrograms = fetchProgramsFromApi;

/* ── Fetch operation fields (for filter chips) ────────── */

export async function fetchOperationFieldsFromApi(): Promise<OperationField[]> {
  return fetchWithFallback<OperationField[]>({
    key: "operation_fields_programs",
    useMock: USE_MOCK_DATA,
    fallback: MOCK_OPERATION_FIELDS,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/operation-fields`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const items: OperationField[] = body.data ?? body;

      if (Array.isArray(items) && items.length > 0) {
        const programSlugs = new Set(MOCK_OPERATION_FIELDS.map((f) => f.slug));
        const filtered = items.filter(
          (f) =>
            programSlugs.has(f.slug) ||
            (f.order !== undefined && f.order >= 10),
        );
        return (filtered.length > 0 ? filtered : items).sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
      }
      throw new Error("No operation fields returned");
    },
  });
}
