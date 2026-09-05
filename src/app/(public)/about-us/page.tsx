"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Envelope,
  Cpu,
  MapTrifold,
  Pulse,
  Gear,
} from "@phosphor-icons/react";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";
import {
  fetchOperationFieldsFromApi,
  type OperationFieldItem,
} from "@/services/operation-field.service";
import { HeroRadar } from "@/components/about/hero-radar";
import { BentoIntro } from "@/components/about/bento-intro";
import { PhilosophyAccordion } from "@/components/about/philosophy-accordion";
import { CoreFunctions } from "@/components/about/core-functions";
import { CommonCtaSection } from "@/components/ui/common-cta-section";
import { EcosystemNetwork } from "@/components/about/ecosystem-network";
import { EcosystemSection } from "@/components/landing/ecosystem-section";
import { ExecutiveLeader } from "@/components/about/executive-leader";

export default function AboutPage() {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);
  const [operationFields, setOperationFields] = useState<OperationFieldItem[]>(
    [],
  );

  useEffect(() => {
    fetchOrganizationInfoFromApi().then(setOrgInfo);
    fetchOperationFieldsFromApi().then(setOperationFields);
  }, []);

  const defaultKeywords = [
    ["Digital Twin", "3DG Platform", "AI Analytics", "Cloud Infra"],
    ["UAV Mapping", "GIS Integration", "Remote Sensing", "Forest Digitization"],
    ["IOC/DOC", "AutoTimelapse", "Smart City", "Process Automation"],
    ["Robotics", "Industrial Drone", "AI Camera", "IoT Hardware"],
  ];

  const defaultImages = [
    "/images/home/hethongdothiso.webp",
    "/images/home/farm_area_drone_view.webp",
    "/images/home/data_center.webp",
    "/images/home/kientaotuonglai.webp",
  ];

  const defaultIcons = [Cpu, MapTrifold, Pulse, Gear];

  const displayFields =
    operationFields && operationFields.length > 0
      ? operationFields.map((field, idx) => {
          const iconMap: Record<string, any> = {
            FiCpu: Cpu,
            FiMap: MapTrifold,
            FiActivity: Pulse,
            FiSettings: Gear,
          };
          const icon =
            (field.icon && iconMap[field.icon]) ||
            defaultIcons[idx % defaultIcons.length];
          return {
            title: field.name,
            desc: field.shortDescription || "",
            icon,
            techKeywords: defaultKeywords[idx % defaultKeywords.length],
            image: defaultImages[idx % defaultImages.length],
          };
        })
      : undefined;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* 1. Hero Radar Grid Section */}
      <HeroRadar />

      {/* Main Layout Container with spatial rhythm */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-6 md:pb-8 space-y-14 md:space-y-20">
        {/* 2. Bento Intro Section & Executive Leader */}
        <div className="mb-16">
          <BentoIntro orgInfo={orgInfo} />
          <ExecutiveLeader />
        </div>

        {/* 3. Philosophy Accordion Section */}
        <PhilosophyAccordion
          missionText={orgInfo?.mission}
          visionText={orgInfo?.vision}
          coreValuesText={orgInfo?.coreValues}
        />

        {/* Core Functions Section */}
        <CoreFunctions />

        {/* 4. Ecosystem Network Section */}
        <EcosystemNetwork stats={orgInfo?.stats} />
      </div>

      {/* 5. Member Units Section (Sức mạnh từ Hệ sinh thái) - Tràn viền */}
      <div className="pt-0 -mt-4 md:-mt-8">
        <EcosystemSection />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-10 space-y-14 md:space-y-20">
        {/* 7. Unified CTA Section */}
        <CommonCtaSection
          badge="Tầm nhìn & Sứ mệnh"
          title="CHUYỂN ĐỔI SỐ TƯƠNG LAI CỦA BẠN"
          description="Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ tối ưu nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa bàn tỉnh."
          primaryButton={{
            label: "Liên hệ hợp tác",
            href: "/contact",
            icon: "envelope",
          }}
          secondaryButton={{
            label: "Khám phá giải pháp",
            onClick: () => {
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
