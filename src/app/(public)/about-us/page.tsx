"use client";

import React, { useState, useEffect } from "react";
import {
  fetchOrganizationInfoFromApi,
  DEFAULT_ORGANIZATION_INFO,
  type OrganizationInfo,
} from "@/services/hero.service";
import { HeroRadar } from "@/components/about/hero-radar";
import { BentoIntro } from "@/components/about/bento-intro";
import { PhilosophyAccordion } from "@/components/about/philosophy-accordion";
import { CoreFunctions } from "@/components/about/core-functions";
import { CommonCtaSection } from "@/components/ui/common-cta-section";
import { EcosystemNetwork } from "@/components/about/ecosystem-network";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { ExecutiveLeader } from "@/components/about/executive-leader";

export default function AboutPage() {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo>(
    DEFAULT_ORGANIZATION_INFO,
  );

  useEffect(() => {
    fetchOrganizationInfoFromApi()
      .then((data) => {
        if (data) setOrgInfo(data);
      })
      .catch(() => {
        setOrgInfo(DEFAULT_ORGANIZATION_INFO);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* 1. Hero Radar Grid Section */}
      <HeroRadar />

      {/* Main Layout Container with spatial rhythm */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-6 md:pb-8 space-y-14 md:space-y-20">
        {/* 2. Bento Intro Section & Executive Leader */}
        <div className="mb-16">
          <BentoIntro orgInfo={orgInfo} />
          <ExecutiveLeader leader={orgInfo?.leader} />
        </div>

        {/* 3. Philosophy Accordion Section */}
        <PhilosophyAccordion
          missionText={orgInfo?.mission}
          visionText={orgInfo?.vision}
          coreValuesText={orgInfo?.coreValues}
        />

        {/* Core Functions Section */}
        <CoreFunctions orientations={orgInfo?.developmentOrientations} />

        {/* 4. Ecosystem Network Section */}
        <EcosystemNetwork
          stats={orgInfo?.stats}
          statsList={orgInfo?.statsList}
        />
      </div>

      {/* 5. Member Units Section (Sức mạnh từ Hệ sinh thái) - Tràn viền */}
      <div className="pt-0 -mt-4 md:-mt-8">
        <EcosystemSection
          capabilitiesDescription={orgInfo?.ecosystemCapabilities}
          members={orgInfo?.ecosystemMembers}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-10 space-y-14 md:space-y-20">
        {/* 7. Unified CTA Section */}
        <CommonCtaSection
          badge={orgInfo?.ctaSection?.badge || "Tầm nhìn & Sứ mệnh"}
          title={
            orgInfo?.ctaSection?.title || "CHUYỂN ĐỔI SỐ TƯƠNG LAI CỦA BẠN"
          }
          description={
            orgInfo?.ctaSection?.description ||
            "Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ tối ưu nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa bàn tỉnh."
          }
          primaryButton={{
            label: orgInfo?.ctaSection?.buttonText || "Liên hệ hợp tác",
            href: orgInfo?.ctaSection?.buttonLink || "/contact",
            icon: "envelope",
          }}
          secondaryButton={{
            label:
              orgInfo?.ctaSection?.secondaryButtonText || "Khám phá giải pháp",
            href:
              orgInfo?.ctaSection?.secondaryButtonLink &&
              orgInfo?.ctaSection?.secondaryButtonLink !== "#"
                ? orgInfo?.ctaSection?.secondaryButtonLink
                : undefined,
            onClick:
              orgInfo?.ctaSection?.secondaryButtonLink &&
              orgInfo?.ctaSection?.secondaryButtonLink !== "#"
                ? undefined
                : () => {
                    window.dispatchEvent(new CustomEvent("open-mega-menu"));
                  },
            icon: "arrow-up-right",
          }}
          standalone={false}
        />
      </div>
    </div>
  );
}
