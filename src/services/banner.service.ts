import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import { MOCK_PAGE_BANNERS } from "@/data/banners.data";
import {
  fetchWithFallback,
  getClientCache,
  setClientCache,
} from "@/lib/client-cache";
import type { PageBannerData, PageKey } from "@/types/banner";

export { MOCK_PAGE_BANNERS };

/* ──────────────────────────────────────────────────────────
   In-memory Cache & Image Preload for Page Banners
   ────────────────────────────────────────────────────────── */

const pageBannerCache = new Map<PageKey, PageBannerData>();
const pageBannerPromises = new Map<PageKey, Promise<PageBannerData>>();

/** Synchronously retrieve cached banner data if available */
export const getCachedPageBanner = (
  pageKey: PageKey,
): PageBannerData | null => {
  const data =
    pageBannerCache.get(pageKey) ||
    getClientCache<PageBannerData>(`banner_${pageKey}`) ||
    null;

  if (data && data.image && data.image.includes("picsum.photos")) {
    return {
      ...data,
      image: MOCK_PAGE_BANNERS[pageKey]?.image || data.image,
    };
  }

  return data;
};

/** Preload image in browser memory for instant display */
const preloadBannerImage = (imageUrl: string) => {
  if (typeof window !== "undefined" && imageUrl) {
    const img = new Image();
    img.src = imageUrl;
  }
};

const ALL_PAGE_KEYS: PageKey[] = [
  "projects",
  "programs",
  "news",
  "contact",
  "careers",
  "about",
  "solutions",
];

/** Prefetch all page banners in background for instant navigation */
export const prefetchAllPageBanners = () => {
  if (typeof window === "undefined" || USE_MOCK_DATA) return;
  ALL_PAGE_KEYS.forEach((key) => {
    if (!pageBannerCache.has(key) && !pageBannerPromises.has(key)) {
      fetchPageBannerFromApi(key).catch(() => {});
    }
  });
};

/* ──────────────────────────────────────────────────────────
   Fetch page banner data with Tiered Fallback
   ────────────────────────────────────────────────────────── */

export const fetchPageBannerFromApi = async (
  pageKey: PageKey,
): Promise<PageBannerData> => {
  const fallback = MOCK_PAGE_BANNERS[pageKey];

  // Return memory cached result immediately if present
  if (pageBannerCache.has(pageKey)) {
    return pageBannerCache.get(pageKey)!;
  }

  // Deduplicate concurrent fetch requests for the same page
  if (pageBannerPromises.has(pageKey)) {
    return pageBannerPromises.get(pageKey)!;
  }

  const fetchPromise = fetchWithFallback<PageBannerData>({
    key: `banner_${pageKey}`,
    useMock: USE_MOCK_DATA,
    fallback,
    fetcher: async () => {
      const res = await fetch(`${API_BASE_URL}/page-banners/${pageKey}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const body = await res.json();
      const data = body.data || body;

      if (data) {
        const isPlaceholder = (url?: string) =>
          !url || url.includes("picsum.photos");

        const bannerData: PageBannerData = {
          image: !isPlaceholder(data.imageUrl) ? data.imageUrl : fallback.image,
          title: data.title || fallback.title,
          subtitle: data.subtitle || fallback.subtitle,
          tag: data.tag || fallback.tag,
          ctaButtons: data.ctaButtons || fallback.ctaButtons,
          businessLicense: data.businessLicense || fallback.businessLicense,
        };
        pageBannerCache.set(pageKey, bannerData);
        preloadBannerImage(bannerData.image);
        return bannerData;
      }
      throw new Error("Invalid banner data");
    },
  }).then((res) => {
    pageBannerCache.set(pageKey, res);
    pageBannerPromises.delete(pageKey);
    return res;
  });

  pageBannerPromises.set(pageKey, fetchPromise);
  return fetchPromise;
};
