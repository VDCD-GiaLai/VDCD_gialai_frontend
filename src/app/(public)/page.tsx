"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FiMapPin, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { GsapHero } from "@/components/landing/gsap-hero/gsap-hero";
import { DigitalPioneerSection } from "@/components/landing/digital-pioneer-section";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";
import {
  fetchOrganizationInfoFromApi,
  DEFAULT_ORGANIZATION_INFO,
  type OrganizationInfo,
} from "@/services/hero.service";

/* ── Lazy-loaded below-fold sections ── */
const ProgramsSolutionsSection = dynamic(
  () =>
    import("@/components/landing/programs-solutions-section").then((m) => ({
      default: m.ProgramsSolutionsSection,
    })),
  { ssr: false },
);
const FeaturedProjectsSection = dynamic(
  () =>
    import("@/components/landing/featured-projects-section").then((m) => ({
      default: m.FeaturedProjectsSection,
    })),
  { ssr: false },
);
const PartnersSection = dynamic(
  () =>
    import("@/components/landing/partners-section").then((m) => ({
      default: m.PartnersSection,
    })),
  { ssr: false },
);
const EcosystemCollaborationSection = dynamic(
  () =>
    import("@/components/landing/ecosystem-collaboration-section").then(
      (m) => ({
        default: m.EcosystemCollaborationSection,
      }),
    ),
  { ssr: false },
);
const EcosystemSection = dynamic(
  () =>
    import("@/components/landing/ecosystem-section").then((m) => ({
      default: m.EcosystemSection,
    })),
  { ssr: false },
);
const LatestNewsSection = dynamic(
  () =>
    import("@/components/landing/latest-news-section").then((m) => ({
      default: m.LatestNewsSection,
    })),
  { ssr: false },
);

export default function LandingPage() {
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    fetchOrganizationInfoFromApi().then(setOrgInfo);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(
      orgInfo?.socialLinks?.email ||
        DEFAULT_ORGANIZATION_INFO.socialLinks.email,
    );
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  /* ── GSAP scroll-reveal for about section header ── */
  const aboutRef = useScrollReveal({
    targets: ".about-reveal",
    options: {
      y: 24,
      blur: 4,
      duration: 0.8,
      ease: "power3.out",
    },
  });

  /* ── GSAP scroll-reveal for feature cards ── */
  const featuresRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!featuresRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".feature-card", { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".feature-card", { autoAlpha: 0, y: 30 });

        ScrollTrigger.batch(".feature-card", {
          start: "top 85%",
          once: true,
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            }),
        });
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  /* ── GSAP scroll-reveal for contact section ── */
  const contactRef = useScrollReveal({
    targets: ".contact-reveal",
    options: {
      y: 30,
      blur: 0,
      duration: 0.8,
      ease: "power3.out",
    },
  });

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
      <section
        id="contact"
        className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
      >
        <div
          ref={contactRef}
          className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-12"
        >
          {/* Contact Layout */}
          <div className="contact-reveal bg-canvas-white dark:bg-zinc-900/40 rounded-2xl p-8 md:p-16 border border-whisper-border dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-6">
                Sẵn sàng để đột phá?
              </h2>
              <p className="text-secondary dark:text-zinc-400 mb-8 max-w-sm text-sm">
                Hãy kết nối với chúng tôi để cùng lên kế hoạch và hiện thực hóa
                mục tiêu số hóa của tổ chức bạn.
              </p>
              <div className="space-y-4 font-mono-label text-xs text-secondary dark:text-zinc-300">
                <p className="flex items-center gap-3">
                  <FiMapPin
                    className="text-accent-red text-base"
                    role="none"
                    aria-hidden="true"
                  />{" "}
                  {orgInfo?.address || DEFAULT_ORGANIZATION_INFO.address}
                </p>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Sao chép địa chỉ email liên hệ"
                  className="flex items-center gap-3 hover:text-accent-red transition-colors cursor-pointer"
                >
                  <FiMail
                    className="text-accent-red text-base"
                    role="none"
                    aria-hidden="true"
                  />
                  {copiedEmail
                    ? "Đã sao chép!"
                    : orgInfo?.socialLinks?.email ||
                      DEFAULT_ORGANIZATION_INFO.socialLinks.email}
                </button>
              </div>
            </div>

            <div className="flex lg:justify-end">
              <Button
                color="primary"
                onClick={() => {
                  router.push("/contact");
                }}
                className="bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs tracking-wider uppercase font-bold px-8 py-6 w-full md:w-auto"
                trailingIcon={<FiMail className="w-4 h-4" />}
              >
                GỬI YÊU CẦU LIÊN HỆ
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
