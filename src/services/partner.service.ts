import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { MOCK_PARTNERS, type PartnerItem } from "@/data/partners.data";
import { fetchWithFallback } from "@/lib/client-cache";

export type { PartnerItem };
export { MOCK_PARTNERS };

export async function fetchPartnersFromApi(): Promise<PartnerItem[]> {
  return fetchWithFallback<PartnerItem[]>({
    key: "partners_list",
    useMock: USE_MOCK_DATA,
    fallback: MOCK_PARTNERS,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/partners`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          logo: p.logo || "/images/placeholder-logo.webp",
          website: p.websiteUrl || p.website,
          category: p.category || "Đối tác chiến lược",
        }));
      }
      throw new Error("No partners returned");
    },
  });
}
