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
        <div className="space-y-6 md:space-y-8">
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

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-14 md:space-y-20">
        {/* 7. Slate Dark CTA block */}
        <motion.section
          className="relative text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-8 md:p-16 space-y-6 relative overflow-hidden transition-all duration-300">
            <h3 className="text-2xl md:text-4xl font-bold font-heading tracking-tight uppercase max-w-4xl mx-auto leading-tight text-zinc-950 dark:text-white transition-colors duration-300 whitespace-nowrap">
              Chuyển đổi số tương lai của bạn
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed pb-4 transition-colors duration-300">
              Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ tối
              ưu nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa bàn
              tỉnh.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4 relative z-10">
              <a
                href="mailto:dmstgialai@vdcd.vn"
                className="inline-flex items-center gap-3 pl-6 pr-4 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300 shadow-lg group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none"
              >
                Gửi email liên hệ
                <span className="w-8 h-8 bg-white/10 dark:bg-zinc-100 flex items-center justify-center text-inherit group-hover:bg-white/20 transition-colors">
                  <Envelope className="w-4 h-4" weight="thin" />
                </span>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-mega-menu"));
                }}
                className="inline-flex items-center gap-3 pl-6 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 backdrop-blur-sm group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none cursor-pointer"
              >
                Khám phá giải pháp
                <span className="w-8 h-8 bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-inherit group-hover:bg-accent-red/10 transition-colors">
                  <ArrowUpRight className="w-4 h-4" weight="thin" />
                </span>
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
