import { Suspense, lazy } from "react";
import { GsapHero } from "@/components/landing/gsap-hero/gsap-hero";
import { DigitalPioneerSection } from "@/components/landing/digital-pioneer-section";
import { LandingContactSection } from "@/components/landing/landing-contact-section";

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
const PartnersSection = lazy(() =>
  import("@/components/landing/partners-section").then((m) => ({
    default: m.PartnersSection,
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

export default function LandingPage() {
  return (
    <div className="w-full bg-canvas-white dark:bg-zinc-100 transition-colors duration-300">
      <GsapHero />

      {/* Khối 2: Tiên phong công nghệ số - Làm chủ hiện trường trong tầm tay */}
      <DigitalPioneerSection />

      {/* Introduction Section - Redesigned based on Taito.ai layout */}
      <section
        id="about"
        className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
      ></section>

      {/* Khối 4: Chương trình và giải pháp */}
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
