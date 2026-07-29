const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category?: string;
}

export async function fetchPartnersFromApi(): Promise<PartnerItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/partners`, { cache: "no-store" });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          logo: p.logo || "/images/placeholder-logo.png",
          website: p.websiteUrl || p.website,
          category: p.category || "Đối tác chiến lược",
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to fetch partners from API:", err);
  }
  return [];
}
