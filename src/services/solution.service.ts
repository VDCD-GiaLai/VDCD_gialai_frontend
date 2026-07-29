import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { SOLUTIONS, CAPABILITY_SOLUTIONS } from "@/data/solution/solutions";

export interface SolutionItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  thumbnail?: string;
  websiteUrl?: string;
  isPublished?: boolean;
}

export const ALL_MOCK_SOLUTIONS: SolutionItem[] = [
  ...SOLUTIONS.map((s) => ({
    id: s.href || s.title,
    title: s.title,
    slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: s.description,
    thumbnail: s.imageUrl,
    websiteUrl: s.href,
    isPublished: true,
  })),
  ...CAPABILITY_SOLUTIONS.map((cs) => ({
    id: cs.href,
    title: cs.title,
    slug: cs.href.replace("/solution/", ""),
    description: cs.description,
    thumbnail: cs.imageUrl,
    websiteUrl: cs.href,
    isPublished: true,
  })),
];

export async function fetchSolutionsFromApi(
  limit = 50,
): Promise<SolutionItem[]> {
  if (USE_MOCK_DATA) {
    return ALL_MOCK_SOLUTIONS.slice(0, limit);
  }
  try {
    const res = await fetch(`${API_BASE_URL}/solutions?limit=${limit}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const body = await res.json();
      const items = body.data?.data || body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch solutions from API, fallback to mock:", err);
  }
  return ALL_MOCK_SOLUTIONS.slice(0, limit);
}

export async function fetchSolutionBySlugFromApi(
  slug: string,
): Promise<SolutionItem | null> {
  if (USE_MOCK_DATA) {
    return ALL_MOCK_SOLUTIONS.find((s) => s.slug === slug) || null;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/solutions/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const body = await res.json();
      return body.data || body;
    }
  } catch (err) {
    console.warn(`Failed to fetch solution '${slug}' from API:`, err);
  }
  return ALL_MOCK_SOLUTIONS.find((s) => s.slug === slug) || null;
}
