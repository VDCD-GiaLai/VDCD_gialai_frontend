"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiMail,
  FiCpu,
  FiMap,
  FiActivity,
  FiSettings,
} from "react-icons/fi";
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
import { EditorialFieldsList } from "@/components/about/editorial-fields-list";
import { HorizontalRoadmap } from "@/components/about/horizontal-roadmap";
import { Card } from "@/components/ui/card";

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

  const defaultIcons = [FiCpu, FiMap, FiActivity, FiSettings];

  const displayFields =
    operationFields && operationFields.length > 0
      ? operationFields.map((field, idx) => {
          const iconMap: Record<string, any> = {
            FiCpu,
            FiMap,
            FiActivity,
            FiSettings,
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

      {/* Main Layout Container with Spatial rhythm */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 space-y-28 md:space-y-36">
        {/* 2. Bento Intro Section */}
        <BentoIntro orgInfo={orgInfo} />

        {/* 3. Philosophy Accordion Section */}
        <PhilosophyAccordion
          missionText={orgInfo?.mission}
          visionText={orgInfo?.vision}
          coreValuesText={orgInfo?.coreValues}
        />

        {/* 4. Editorial Fields List Section */}
        <EditorialFieldsList fields={displayFields} />

        {/* 5. Horizontal Roadmap Timeline Section */}
        {/* Full-width container breakout for Horizontal Scroll pinning */}
      </div>

      <HorizontalRoadmap />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24 pt-12">
        {/* 6. Slate Dark CTA block */}
        <motion.section
          className="relative text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className="hover:border-accent-red/20 transition-all duration-500 overflow-hidden"
            innerClassName="p-0"
          >
            <div className="p-8 md:p-16 space-y-6 relative overflow-hidden">
              <h3 className="text-2xl md:text-4xl font-bold font-heading tracking-tight uppercase max-w-2xl mx-auto leading-tight text-zinc-950 dark:text-white transition-colors duration-300">
                Cùng VDCD Group chuyển đổi số tương lai của bạn
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed pb-4 transition-colors duration-300">
                Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ
                tối ưu nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa
                bàn tỉnh Gia Lai và Tây Nguyên.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4 relative z-10">
                <a
                  href="mailto:contact@vdcdgroup.vn"
                  className="inline-flex items-center gap-3 pl-6 pr-4 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300 rounded-xl shadow-lg group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none"
                >
                  Gửi email liên hệ
                  <span className="w-8 h-8 rounded-full bg-white/10 dark:bg-zinc-100 flex items-center justify-center text-inherit group-hover:bg-white/20 transition-colors">
                    <FiMail className="w-4 h-4" />
                  </span>
                </a>

                <Link
                  href="/solution"
                  className="inline-flex items-center gap-3 pl-6 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 rounded-xl backdrop-blur-sm group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none"
                >
                  Khám phá giải pháp
                  <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-inherit group-hover:bg-accent-red/10 transition-colors">
                    <FiArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
