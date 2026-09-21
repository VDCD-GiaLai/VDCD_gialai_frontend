import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import {
  MOCK_HERO_SLIDES,
  DEFAULT_ORGANIZATION_INFO,
  type HeroSlideItem,
  type OrganizationStats,
  type OrganizationInfo,
  type OrganizationLeader,
  type OrganizationAnnouncement,
  type OrganizationStatItem,
  type OrganizationEcosystemMember,
  type OrganizationCtaSection,
} from "@/data/hero.data";
import { fetchWithFallback } from "@/lib/client-cache";

export type {
  HeroSlideItem,
  OrganizationStats,
  OrganizationInfo,
  OrganizationLeader,
  OrganizationAnnouncement,
  OrganizationStatItem,
  OrganizationEcosystemMember,
  OrganizationCtaSection,
};
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
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const body = await res.json();
      const apiData = body.data || body;
      if (apiData && typeof apiData === "object") {
        return {
          ...DEFAULT_ORGANIZATION_INFO,
          ...apiData,
          name: apiData.name?.trim() || DEFAULT_ORGANIZATION_INFO.name,
          shortName:
            apiData.shortName?.trim() || DEFAULT_ORGANIZATION_INFO.shortName,
          tagline: apiData.tagline?.trim() || DEFAULT_ORGANIZATION_INFO.tagline,
          businessLicenseNo:
            apiData.businessLicenseNo?.trim() ||
            DEFAULT_ORGANIZATION_INFO.businessLicenseNo,
          description:
            apiData.description?.trim() ||
            DEFAULT_ORGANIZATION_INFO.description,
          mission: apiData.mission?.trim() || DEFAULT_ORGANIZATION_INFO.mission,
          vision: apiData.vision?.trim() || DEFAULT_ORGANIZATION_INFO.vision,
          coreValues:
            apiData.coreValues?.trim() || DEFAULT_ORGANIZATION_INFO.coreValues,
          address: apiData.address?.trim() || DEFAULT_ORGANIZATION_INFO.address,
          email: apiData.email?.trim() || DEFAULT_ORGANIZATION_INFO.email,
          hotline: apiData.hotline?.trim() || DEFAULT_ORGANIZATION_INFO.hotline,
          ecosystemCapabilities:
            apiData.ecosystemCapabilities?.trim() ||
            DEFAULT_ORGANIZATION_INFO.ecosystemCapabilities,
          stats: {
            ...DEFAULT_ORGANIZATION_INFO.stats,
            ...(apiData.stats || {}),
          },
          socialLinks: {
            ...DEFAULT_ORGANIZATION_INFO.socialLinks,
            ...(apiData.socialLinks || {}),
          },
          announcement: {
            ...DEFAULT_ORGANIZATION_INFO.announcement,
            ...(apiData.announcement || {}),
            text:
              apiData.announcement?.text?.trim() ||
              DEFAULT_ORGANIZATION_INFO.announcement?.text,
            imageUrl:
              apiData.announcement?.imageUrl?.trim() ||
              DEFAULT_ORGANIZATION_INFO.announcement?.imageUrl,
          },
          leader: {
            ...DEFAULT_ORGANIZATION_INFO.leader,
            ...(apiData.leader || {}),
            name:
              apiData.leader?.name?.trim() ||
              DEFAULT_ORGANIZATION_INFO.leader?.name,
            role:
              apiData.leader?.role?.trim() ||
              DEFAULT_ORGANIZATION_INFO.leader?.role,
            quote:
              apiData.leader?.quote?.trim() ||
              DEFAULT_ORGANIZATION_INFO.leader?.quote,
            avatarUrl:
              apiData.leader?.avatarUrl?.trim() ||
              DEFAULT_ORGANIZATION_INFO.leader?.avatarUrl,
            ctaText:
              apiData.leader?.ctaText?.trim() ||
              DEFAULT_ORGANIZATION_INFO.leader?.ctaText,
            ctaLink:
              apiData.leader?.ctaLink?.trim() ||
              DEFAULT_ORGANIZATION_INFO.leader?.ctaLink,
          },
          ctaSection: {
            ...DEFAULT_ORGANIZATION_INFO.ctaSection,
            ...(apiData.ctaSection || {}),
            badge:
              apiData.ctaSection?.badge?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.badge,
            title:
              apiData.ctaSection?.title?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.title,
            description:
              apiData.ctaSection?.description?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.description,
            buttonText:
              apiData.ctaSection?.buttonText?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.buttonText,
            buttonLink:
              apiData.ctaSection?.buttonLink?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.buttonLink,
            secondaryButtonText:
              apiData.ctaSection?.secondaryButtonText?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.secondaryButtonText,
            secondaryButtonLink:
              apiData.ctaSection?.secondaryButtonLink?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.secondaryButtonLink,
            subtext:
              apiData.ctaSection?.subtext?.trim() ||
              DEFAULT_ORGANIZATION_INFO.ctaSection?.subtext,
          },
          statsList:
            Array.isArray(apiData.statsList) &&
            apiData.statsList.length > 0 &&
            apiData.statsList.some((s: OrganizationStatItem) => s.label?.trim())
              ? apiData.statsList
              : DEFAULT_ORGANIZATION_INFO.statsList,
          ecosystemMembers:
            Array.isArray(apiData.ecosystemMembers) &&
            apiData.ecosystemMembers.length > 0 &&
            apiData.ecosystemMembers.some((m: OrganizationEcosystemMember) =>
              m.title?.trim(),
            )
              ? apiData.ecosystemMembers
              : DEFAULT_ORGANIZATION_INFO.ecosystemMembers,
          developmentOrientations:
            Array.isArray(apiData.developmentOrientations) &&
            apiData.developmentOrientations.length > 0 &&
            apiData.developmentOrientations.some((d: { title?: string }) =>
              d.title?.trim(),
            )
              ? apiData.developmentOrientations
              : DEFAULT_ORGANIZATION_INFO.developmentOrientations,
        };
      }
      throw new Error("Invalid organization data");
    },
  });
}
