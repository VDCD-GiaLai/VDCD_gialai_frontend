import { GsapHero } from "@/components/landing/gsap-hero/gsap-hero";
import { DigitalPioneerSection } from "@/components/landing/digital-pioneer-section";
import { LandingContactSection } from "@/components/landing/landing-contact-section";
import { ProgramsSolutionsSection } from "@/components/landing/programs-solutions-section";
import { FeaturedProjectsSection } from "@/components/landing/featured-projects-section";
import { EcosystemCollaborationSection } from "@/components/landing/ecosystem-collaboration-section";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { LatestNewsSection } from "@/components/landing/latest-news-section";
import { PartnersSection } from "@/components/landing/partners-section";
import {
  fetchHeroSlidesFromApi,
  fetchOrganizationInfoFromApi,
  MOCK_HERO_SLIDES,
  DEFAULT_ORGANIZATION_INFO,
} from "@/services/hero.service";
import { getOptimizedImageUrl } from "@/lib/image-utils";

export const revalidate = 60;

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
      {activeSlides[1]?.image && (
        <>
          <link
            rel="preload"
            as="image"
            href={getOptimizedImageUrl(activeSlides[1].image, {
              width: 320,
              quality: 85,
              isThumbnail: true,
            })}
            media="(max-width: 768px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href={getOptimizedImageUrl(activeSlides[1].image, {
              width: 480,
              quality: 85,
              isThumbnail: true,
            })}
            media="(min-width: 769px)"
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
      <ProgramsSolutionsSection />

      {/* Featured Projects */}
      <FeaturedProjectsSection />

      {/* Khối 6: Đồng hành cùng hệ sinh thái đổi mới sáng tạo */}
      <EcosystemCollaborationSection />

      {/* Hệ sinh thái VDCD Group — FR-HOME-05 */}
      <EcosystemSection />

      {/* Khối 8: Tin tức và sự kiện */}
      <LatestNewsSection />

      {/* Partners */}
      <PartnersSection />

      {/* Contact */}
      <LandingContactSection />
    </div>
  );
}
