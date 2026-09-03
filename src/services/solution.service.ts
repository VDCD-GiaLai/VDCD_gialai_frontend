import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { ALL_MOCK_SOLUTIONS, type SolutionItem } from "@/data/solutions.data";
import { fetchWithFallback } from "@/lib/client-cache";

export type { SolutionItem };
export { ALL_MOCK_SOLUTIONS };

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
): Promise<SolutionItem | null> {
  return fetchWithFallback<SolutionItem | null>({
    key: `solution_${slug}`,
    useMock: USE_MOCK_DATA,
    fallback: () => ALL_MOCK_SOLUTIONS.find((s) => s.slug === slug) || null,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/solutions/${slug}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const data = body.data || body;
      if (data && data.slug) {
        return data;
      }
      throw new Error(`Solution ${slug} not found`);
    },
  });
}
