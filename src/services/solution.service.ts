import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { ALL_MOCK_SOLUTIONS, type SolutionItem } from "@/data/solutions.data";
import {
  SOLUTION_DETAILS,
  type SolutionDetail as MockSolutionDetail,
} from "@/data/solution/solution-details";
import { fetchWithFallback } from "@/lib/client-cache";
import type {
  SolutionDetail,
  SolutionEntityContract,
  DocumentContent,
  ContentBlock,
  SectionChildBlock,
} from "@/types";

export type { SolutionItem };
export { ALL_MOCK_SOLUTIONS };

/* ──────────────────────────────────────────────────────────
 *  BIDIRECTIONAL MIGRATION STRATEGY (CONTRACT SECTION 6)
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
        id: `par_html_${idx++}`,
        type: "paragraph",
        text,
      });
    }
  }

  if (blocks.length === 0 && html.trim()) {
    blocks.push({
      id: `par_html_raw`,
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
 * Chuyển đổi nội dung Solution bất kỳ sang DocumentContent chuẩn.
 * Tương thích 100% với:
 * - Chuỗi rỗng / NULL
 * - Chuỗi văn bản thuần (19 bản ghi hiện tại trong DB)
 * - Chuỗi HTML legacy
 * - JSON DocumentContent đã chuẩn hóa
 */
export function convertSolutionContentToDocument(
  rawContent: unknown,
): DocumentContent {
  // 1. Nếu rỗng -> Trả về tài liệu trắng chuẩn
  if (!rawContent) {
    return { version: 1, blocks: [] };
  }

  // 2. Nếu đã là DocumentContent object hợp lệ
  if (
    typeof rawContent === "object" &&
    rawContent !== null &&
    "version" in rawContent &&
    "blocks" in rawContent &&
    Array.isArray((rawContent as DocumentContent).blocks)
  ) {
    return rawContent as DocumentContent;
  }

  // 3. Nếu là chuỗi JSON được stringify
  if (typeof rawContent === "string") {
    const trimmed = rawContent.trim();
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.version && Array.isArray(parsed.blocks)) {
          return parsed as DocumentContent;
        }
      } catch {
        // Fallthrough nếu parse JSON lỗi
      }
    }

    // 4. Nếu là đoạn văn bản thuần (Trường hợp 19 Solution hiện tại trong DB)
    if (!trimmed.includes("<") || !trimmed.includes(">")) {
      return {
        version: 1,
        blocks: [
          {
            id: `par_migration_${Date.now()}`,
            type: "paragraph",
            text: trimmed,
          },
        ],
      };
    }

    // 5. Nếu là chuỗi HTML legacy -> Chuyển đổi qua bộ parser html-to-blocks
    return convertHtmlToBlocks(trimmed);
  }

  return { version: 1, blocks: [] };
}

/**
 * Chuyển đổi dữ liệu cấu trúc chi tiết từ SOLUTION_DETAILS sang DocumentContent chuẩn
 */
export function convertSolutionDetailsToDocument(
  detail: MockSolutionDetail,
): DocumentContent {
  const blocks: ContentBlock[] = [];

  if (detail.introText) {
    blocks.push({
      id: "intro-paragraph",
      type: "paragraph",
      text: detail.introText,
    });
  }

  if (detail.sections && detail.sections.length > 0) {
    detail.sections.forEach((sec, idx) => {
      const children: SectionChildBlock[] = [];

      if (sec.description) {
        children.push({
          id: `sec-${idx}-desc`,
          type: "paragraph",
          text: sec.description,
        });
      }

      if (sec.imageUrl) {
        children.push({
          id: `sec-${idx}-img`,
          type: "image",
          url: sec.imageUrl,
          alt: sec.title,
        });
      }

      if (sec.points && sec.points.length > 0) {
        children.push({
          id: `sec-${idx}-list`,
          type: "list",
          listType: "bullet",
          items: sec.points.map((pt, pIdx) => ({
            id: `sec-${idx}-pt-${pIdx}`,
            content: pt,
            children: [],
          })),
        });
      }

      blocks.push({
        id: `section-${idx + 1}`,
        type: "section",
        number: String(idx + 1).padStart(2, "0"),
        title: sec.title.replace(/^\d+\.\s*/, ""),
        children,
      });
    });
  }

  return {
    version: 1,
    blocks,
  };
}

/* ──────────────────────────────────────────────────────────
 *  API FETCHERS
 * ────────────────────────────────────────────────────────── */

export async function fetchSolutionsFromApi(
  limit = 50,
): Promise<SolutionItem[]> {
  return fetchWithFallback<SolutionItem[]>({
    key: `solutions_list_${limit}`,
    useMock: USE_MOCK_DATA,
    fallback: () => ALL_MOCK_SOLUTIONS.slice(0, limit),
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/solutions?limit=${limit}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const items = body.data?.data || body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
      throw new Error("No solutions returned");
    },
  });
}

export async function fetchSolutionBySlugFromApi(
  slug: string,
): Promise<SolutionDetail | null> {
  const getMockDetail = (): SolutionDetail | null => {
    const mockItem = ALL_MOCK_SOLUTIONS.find((s) => s.slug === slug);
    const richDetail = SOLUTION_DETAILS[slug];

    if (!mockItem && !richDetail) return null;

    const contentDoc = richDetail
      ? convertSolutionDetailsToDocument(richDetail)
      : convertSolutionContentToDocument(mockItem?.description);

    return {
      id: mockItem?.id || `sol-${slug}`,
      title: richDetail?.title || mockItem?.title || slug,
      slug: mockItem?.slug || slug,
      shortDescription: richDetail?.introText || mockItem?.description || null,
      thumbnail: richDetail?.imageUrl || mockItem?.thumbnail || null,
      thumbnailFileId: null,
      websiteUrl: mockItem?.websiteUrl || `/solution/${slug}`,
      fieldId: null,
      field: {
        id: "fld-tech",
        name: "Giải pháp Công nghệ Số",
        slug: "cong-nghe-so",
      },
      metaTitle: richDetail?.title || mockItem?.title || null,
      metaDescription: richDetail?.introText || mockItem?.description || null,
      isPublished: mockItem?.isPublished !== false,
      publishedAt: "2025-01-15T00:00:00.000Z",
      createdAt: "2025-01-15T00:00:00.000Z",
      updatedAt: "2025-01-15T00:00:00.000Z",
      content: contentDoc,
      relatedArticles: [],
    };
  };

  return fetchWithFallback<SolutionDetail | null>({
    key: `solution_${slug}`,
    useMock: USE_MOCK_DATA,
    fallback: getMockDetail,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/solutions/${slug}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP error ${res.status}`);
      }
      const body = await res.json();
      const data = body.data || body;
      if (!data || (data.isPublished === false && !USE_MOCK_DATA)) {
        return null;
      }

      let contentDoc = convertSolutionContentToDocument(data.content);
      // Fallback sang cấu trúc phong phú nếu DB chỉ chứa chuỗi text 1 đoạn
      if (contentDoc.blocks.length <= 1 && SOLUTION_DETAILS[slug]) {
        contentDoc = convertSolutionDetailsToDocument(SOLUTION_DETAILS[slug]);
      }

      return {
        id: data.id || `sol-${slug}`,
        title: data.title,
        slug: data.slug || slug,
        shortDescription: data.shortDescription || data.description || null,
        thumbnail: data.thumbnail || null,
        thumbnailFileId: data.thumbnailFileId || null,
        websiteUrl: data.websiteUrl || `/solution/${slug}`,
        fieldId: data.fieldId || null,
        field: data.field || null,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        isPublished: data.isPublished !== false,
        publishedAt: data.publishedAt || null,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || new Date().toISOString(),
        content: contentDoc,
        relatedArticles: data.relatedArticles || [],
      } as SolutionDetail;
    },
  });
}

export async function fetchRelatedSolutionsFromApi(
  currentSlug: string,
  fieldId?: string,
  limit = 2,
): Promise<SolutionEntityContract[]> {
  try {
    const res = await fetchSolutionsFromApi(20);
    return res
      .filter((s) => s.slug !== currentSlug && s.isPublished !== false)
      .slice(0, limit)
      .map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDescription: s.description || null,
        thumbnail: s.thumbnail || null,
        thumbnailFileId: null,
        websiteUrl: s.websiteUrl || `/solution/${s.slug}`,
        fieldId: null,
        field: {
          id: "fld-tech",
          name: "Giải pháp Công nghệ",
          slug: "cong-nghe-so",
        },
        metaTitle: s.title,
        metaDescription: s.description || null,
        isPublished: true,
        publishedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: { version: 1, blocks: [] },
      }));
  } catch {
    return [];
  }
}
