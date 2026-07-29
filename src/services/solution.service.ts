const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

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

export async function fetchSolutionsFromApi(
  limit = 50,
): Promise<SolutionItem[]> {
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
    console.warn("Failed to fetch solutions from API:", err);
  }
  return [];
}

export async function fetchSolutionBySlugFromApi(
  slug: string,
): Promise<SolutionItem | null> {
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
  return null;
}
