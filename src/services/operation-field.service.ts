import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import {
  MOCK_OPERATION_FIELDS,
  type OperationFieldItem,
} from "@/data/operation-fields.data";
import { fetchWithFallback } from "@/lib/client-cache";

export type { OperationFieldItem };
export { MOCK_OPERATION_FIELDS };

export async function fetchOperationFieldsFromApi(): Promise<
  OperationFieldItem[]
> {
  return fetchWithFallback<OperationFieldItem[]>({
    key: "operation_fields",
    useMock: USE_MOCK_DATA,
    fallback: MOCK_OPERATION_FIELDS,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/operation-fields`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        const aboutSlugs = new Set(MOCK_OPERATION_FIELDS.map((f) => f.slug));
        const filtered = items.filter(
          (f) =>
            aboutSlugs.has(f.slug) || (f.order !== undefined && f.order < 10),
        );
        return (filtered.length > 0 ? filtered : items).sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
      }
      throw new Error("No operation fields returned");
    },
  });
}
