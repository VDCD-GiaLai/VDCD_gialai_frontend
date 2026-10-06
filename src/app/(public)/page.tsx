import { Suspense, lazy } from "react";
import { GsapHero } from "@/components/landing/gsap-hero/gsap-hero";
import { DigitalPioneerSection } from "@/components/landing/digital-pioneer-section";
import { LandingContactSection } from "@/components/landing/landing-contact-section";
import {
  fetchHeroSlidesFromApi,
  fetchOrganizationInfoFromApi,
  MOCK_HERO_SLIDES,
  DEFAULT_ORGANIZATION_INFO,
} from "@/services/hero.service";
import { getOptimizedImageUrl } from "@/lib/image-utils";

export const revalidate = 60;

/* ── Lazy-loaded below-fold sections (code-split) ── */
const ProgramsSolutionsSection = lazy(() =>
  import("@/components/landing/programs-solutions-section").then((m) => ({
    default: m.ProgramsSolutionsSection,
  })),
);
const FeaturedProjectsSection = lazy(() =>
  import("@/components/landing/featured-projects-section").then((m) => ({
    default: m.FeaturedProjectsSection,
  })),
);
const EcosystemCollaborationSection = lazy(() =>
  import("@/components/landing/ecosystem-collaboration-section").then((m) => ({
    default: m.EcosystemCollaborationSection,
  })),
);
const EcosystemSection = lazy(() =>
  import("@/components/landing/ecosystem-section").then((m) => ({
    default: m.EcosystemSection,
  })),
);
const LatestNewsSection = lazy(() =>
  import("@/components/landing/latest-news-section").then((m) => ({
    default: m.LatestNewsSection,
  })),
);
const PartnersSection = lazy(() =>
  import("@/components/landing/partners-section").then((m) => ({
    default: m.PartnersSection,
  })),
);

export default async function LandingPage() {
  const [heroSlides, orgInfo] = await Promise.all([
    fetchHeroSlidesFromApi().catch(() => null),
    fetchOrganizationInfoFromApi().catch(() => null),
  ]);

  const activeSlides = heroSlides?.length ? heroSlides : MOCK_HERO_SLIDES;
  const activeOrgInfo = orgInfo || DEFAULT_ORGANIZATION_INFO;
  const firstSlideImage = activeSlides[0]?.image;

  return (
    <div className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {firstSlideImage && (
        <>
          <link
            rel="preload"
            as="image"
            href={getOptimizedImageUrl(firstSlideImage, {
              width: 828,
              quality: 90,
            })}
            media="(max-width: 768px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href={getOptimizedImageUrl(firstSlideImage, {
              width: 1280,
              quality: 90,
            })}
            media="(min-width: 769px) and (max-width: 1280px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href={getOptimizedImageUrl(firstSlideImage, {
              width: 1920,
              quality: 90,
            })}
            media="(min-width: 1281px)"
            fetchPriority="high"
          />
        </>
      )}
      <GsapHero initialSlides={activeSlides} />

      {/* Khối 2: Tiên phong công nghệ số - Làm chủ hiện trường trong tầm tay */}
      <DigitalPioneerSection initialOrgInfo={activeOrgInfo} />

      {/* Anchor for About section */}
      <div id="about" />

      {/* Khối 4: Hoạt động và giải pháp */}
      <Suspense>
        <ProgramsSolutionsSection />
      </Suspense>

      {/* Featured Projects */}
      <Suspense>
        <FeaturedProjectsSection />
      </Suspense>

      {/* Khối 6: Đồng hành cùng hệ sinh thái đổi mới sáng tạo */}
      <Suspense>
        <EcosystemCollaborationSection />
      </Suspense>

      {/* Hệ sinh thái VDCD Group — FR-HOME-05 */}
      <Suspense>
        <EcosystemSection />
      </Suspense>

      {/* Khối 8: Tin tức và sự kiện */}
      <Suspense>
        <LatestNewsSection />
      </Suspense>

      {/* Partners */}
      <Suspense>
        <PartnersSection />
      </Suspense>

      {/* Contact */}
      <LandingContactSection />
    </div>
  );
}
