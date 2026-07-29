const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface ProvinceItem {
  id: string;
  name: string;
  code: string;
  hasProject: boolean;
  centerCount: number;
}

export async function fetchProvincesFromApi(): Promise<ProvinceItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/provinces`, { cache: "no-store" });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch provinces from API:", err);
  }
  return [];
}
