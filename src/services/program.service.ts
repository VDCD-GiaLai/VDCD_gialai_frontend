import {
  MOCK_PROGRAMS,
  MOCK_OPERATION_FIELDS,
  getMockProgramBySlug,
} from "@/data/programs.data";
import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import type {
  Program,
  ProgramDetail,
  ProgramListParams,
  PaginatedResponse,
  OperationField,
} from "@/types";

/* ── Fetch paginated programs ─────────────────────────── */

export async function fetchProgramsFromApi(
  params: ProgramListParams = {},
): Promise<PaginatedResponse<Program>> {
  const { page = 1, limit = 10, fieldId } = params;

  if (USE_MOCK_DATA) {
    let filtered = [...MOCK_PROGRAMS];
    if (fieldId) filtered = filtered.filter((p) => p.field?.id === fieldId);
    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  try {
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
    const items: Program[] = payload.data ?? payload.items ?? [];
    const total: number = payload.total ?? items.length;

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.warn("Programs API fetch failed, fallback to mock data:", err);
    let filtered = [...MOCK_PROGRAMS];
    if (fieldId) filtered = filtered.filter((p) => p.field?.id === fieldId);
    const total = filtered.length;
    const items = filtered.slice((page - 1) * limit, page * limit);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}

/* ── Fetch single program by slug ─────────────────────── */

export async function fetchProgramBySlugFromApi(
  slug: string,
): Promise<ProgramDetail | null> {
  if (USE_MOCK_DATA) {
    const program = getMockProgramBySlug(slug);
    if (!program) return null;
    return { ...program, relatedArticles: [] };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/programs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error ${res.status}`);
    }

    const body = await res.json();
    const data = body.data ?? body;

    return {
      ...data,
      relatedArticles: data.relatedArticles ?? [],
    } as ProgramDetail;
  } catch (err) {
    console.warn(
      `Program fetch for '${slug}' failed, fallback to mock data:`,
      err,
    );
    const program = getMockProgramBySlug(slug);
    if (!program) return null;
    return { ...program, relatedArticles: [] };
  }
}

/* ── Fetch operation fields (for filter chips) ────────── */

export async function fetchOperationFieldsFromApi(): Promise<OperationField[]> {
  if (USE_MOCK_DATA) {
    return MOCK_OPERATION_FIELDS;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/operation-fields`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const body = await res.json();
    const items: OperationField[] = body.data ?? body;

    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
  } catch (err) {
    console.warn(
      "Operation fields API fetch failed, fallback to mock data:",
      err,
    );
  }

  return MOCK_OPERATION_FIELDS;
}

/* ── Fetch featured / latest programs (shortcut) ──────── */

export async function fetchFeaturedProgramsFromApi(
  limit = 6,
): Promise<Program[]> {
  const result = await fetchProgramsFromApi({ page: 1, limit });
  return result.items;
}
