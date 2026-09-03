import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import {
  MOCK_HERO_SLIDES,
  DEFAULT_ORGANIZATION_INFO,
  type HeroSlideItem,
  type OrganizationStats,
  type OrganizationInfo,
} from "@/data/hero.data";
import { fetchWithFallback, setClientCache } from "@/lib/client-cache";

export type { HeroSlideItem, OrganizationStats, OrganizationInfo };
export { MOCK_HERO_SLIDES, DEFAULT_ORGANIZATION_INFO };

let cachedHeroSlides: HeroSlideItem[] | null = null;
let heroSlidesPromise: Promise<HeroSlideItem[]> | null = null;

export function getCachedHeroSlides(): HeroSlideItem[] | null {
  return cachedHeroSlides;
}

export async function fetchHeroSlidesFromApi(): Promise<HeroSlideItem[]> {
  if (cachedHeroSlides) {
    return cachedHeroSlides;
  }
  if (heroSlidesPromise) {
    return heroSlidesPromise;
  }

  heroSlidesPromise = fetchWithFallback<HeroSlideItem[]>({
    key: "hero_slides",
    useMock: USE_MOCK_DATA,
    fallback: MOCK_HERO_SLIDES,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/slides`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        const mapped = items.map((slide, idx) => ({
          id: slide.id || String(idx + 1),
          title: slide.title,
          subtitle: slide.subtitle || "",
          description: slide.description || "",
          tag: slide.tag || "DỰ ÁN TRỌNG ĐIỂM",
          location: slide.subtitle || "",
          image: slide.imageUrl || slide.image || "",
          statValue: slide.statValue || "100%",
          statLabel: slide.statLabel || "Tiến độ",
          ctaText: slide.ctaText || "Tìm hiểu thêm",
          ctaUrl: slide.ctaUrl || "/#",
          order: slide.order ?? idx,
        }));
        mapped.sort((a, b) => Number(a.order) - Number(b.order));
        if (typeof window !== "undefined") {
          mapped.forEach((s) => {
            if (s.image) {
              const img = new Image();
              img.src = s.image;
            }
          });
        }
        return mapped;
      }
      throw new Error("No slides in response");
    },
  }).then((res) => {
    cachedHeroSlides = res;
    heroSlidesPromise = null;
    return res;
  });

  return heroSlidesPromise;
}

export async function fetchOrganizationInfoFromApi(): Promise<OrganizationInfo> {
  return fetchWithFallback<OrganizationInfo>({
    key: "organization_info",
    useMock: USE_MOCK_DATA,
    fallback: DEFAULT_ORGANIZATION_INFO,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/organization`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const apiData = body.data || body;
      if (apiData && typeof apiData === "object") {
        return {
          ...DEFAULT_ORGANIZATION_INFO,
          ...apiData,
          address: apiData.address || DEFAULT_ORGANIZATION_INFO.address,
          stats: {
            ...DEFAULT_ORGANIZATION_INFO.stats,
            ...(apiData.stats || {}),
          },
          socialLinks: {
            ...DEFAULT_ORGANIZATION_INFO.socialLinks,
            ...(apiData.socialLinks || {}),
          },
        };
      }
      throw new Error("Invalid organization data");
    },
  });
}
