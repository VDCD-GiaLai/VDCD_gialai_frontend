"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiMap,
  FiActivity,
  FiSettings,
  FiGlobe,
  FiLayers,
  FiDatabase,
} from "react-icons/fi";
import {
  fetchOperationFieldsFromApi,
  type OperationFieldItem,
} from "@/services/operation-field.service";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";

export function EditorialFieldsList() {
  const [operationFields, setOperationFields] = useState<OperationFieldItem[]>(
    [],
  );
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    fetchOperationFieldsFromApi()
      .then(setOperationFields)
      .catch(() => {});
    fetchOrganizationInfoFromApi()
      .then(setOrgInfo)
      .catch(() => {});
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const activities = [
    {
      title: "Công nghệ số & Chuyển đổi số",
      desc: "Lập mô hình dữ liệu không gian 3D thời gian thực thông qua nền tảng số 3DG Platform. Tích hợp phân tích dữ liệu lớn và AI để tối ưu hóa quản trị hạ tầng, vận hành đô thị thông minh.",
      icon: FiCpu,
    },
    {
      title: "Khảo sát, Đo đạc & Số hóa bản đồ",
      desc: "Bay quét LiDAR và khảo sát trắc địa chuyên sâu bằng UAV để thành lập bản đồ địa hình tỷ lệ lớn (1/500). Số hóa đồng bộ cơ sở dữ liệu địa chính, hạ tầng kỹ thuật và lâm nghiệp Tây Nguyên.",
      icon: FiMap,
    },
    {
      title: "Hạ tầng & Điều hành thông minh",
      desc: "Tích hợp và xây dựng trung tâm điều hành thông minh (IOC/DOC) hỗ trợ ra quyết định. Giám sát tự động tiến độ công trình xây dựng và biến động hiện trường thông qua hệ thống AutoTimelapse.",
      icon: FiActivity,
    },
    {
      title: "Nghiên cứu, Sản xuất & Chế tạo phần cứng",
      desc: "Nghiên cứu chế tạo robot công nghiệp, lắp ráp các hệ thống thiết bị bay không người lái chuyên dụng, camera thông minh tích hợp AI và phần cứng IoT điều khiển tự chủ công nghệ.",
      icon: FiSettings,
    },
  ];

  const defaultIcons = [
    FiCpu,
    FiMap,
    FiActivity,
    FiSettings,
    FiGlobe,
    FiLayers,
  ];

  const dynamicActivities =
    operationFields && operationFields.length > 0
      ? operationFields.map((field, idx) => {
          const iconMap: Record<string, any> = {
            FiCpu,
            FiMap,
            FiActivity,
            FiSettings,
            FiGlobe,
            FiLayers,
          };
          const icon =
            (field.icon && iconMap[field.icon]) ||
            defaultIcons[idx % defaultIcons.length];
          return {
            title: field.name,
            desc: field.shortDescription || "",
            icon,
          };
        })
      : activities;

  const dynamicEcosystemDesc =
    orgInfo?.ecosystemCapabilities ||
    "Trung tâm kế thừa năng lực công nghệ, đội ngũ chuyên gia và mạng lưới triển khai của hệ sinh thái VDCD Group trong các lĩnh vực khảo sát, dữ liệu không gian, trí tuệ nhân tạo, mô hình thông tin công trình, hạ tầng dữ liệu và phần mềm quản lý.";

  const inheritedCapacities = [
    {
      title: "Khảo sát chuyên sâu",
      desc: "Ứng dụng các thiết bị bay không người lái (UAV/Drone) và quét LiDAR để đo đạc bản đồ địa hình chuyên nghiệp.",
      icon: FiMap,
    },
    {
      title: "Dữ liệu không gian",
      desc: "Xây dựng hệ thống cơ sở dữ liệu GIS và mô hình bản đồ số 3D (Digital Twin/3DG Platform) trực quan.",
      icon: FiLayers,
    },
    {
      title: "Trí tuệ nhân tạo",
      desc: "Tích hợp phân tích dữ liệu lớn và AI để tự động hóa giám sát hiện trường (AutoTimelapse) thông minh.",
      icon: FiCpu,
    },
    {
      title: "Thông tin công trình",
      desc: "Nghiên cứu và triển khai mô hình thông tin công trình (BIM) hỗ trợ đắc lực cho quy hoạch hạ tầng.",
      icon: FiSettings,
    },
    {
      title: "Hạ tầng dữ liệu",
      desc: "Xây dựng nền tảng đám mây và hệ thống cơ sở dữ liệu lớn đáp ứng các yêu cầu bảo mật cao nhất.",
      icon: FiDatabase,
    },
    {
      title: "Phần mềm quản lý",
      desc: "Thiết kế và lập trình các ứng dụng SaaS chuyên dụng hỗ trợ quản trị và vận hành doanh nghiệp hiệu quả.",
      icon: FiActivity,
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 space-y-20">
      {/* Fields of Activity */}
      <section id="fields" className="scroll-mt-28 relative">
        <div className="mb-12">
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Năng lực công nghệ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
            Lĩnh vực hoạt động chủ chốt
          </h2>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800/60 mt-8 relative">
          {dynamicActivities.map((act, idx) => {
            const IconComp = act.icon;
            return (
              <motion.div
                key={idx}
                className="py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-all duration-300 relative cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
              >
                <div className="flex items-start gap-4 md:gap-6 max-w-4xl">
                  <span className="font-mono text-3xl md:text-4xl font-black text-zinc-300 dark:text-zinc-800 group-hover:text-accent-red transition-colors duration-300 leading-none shrink-0 pt-1">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 group-hover:text-accent-red group-hover:bg-accent-red/5 group-hover:border-accent-red/10 rounded-xl transition-all duration-300 shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base md:text-lg font-bold text-black dark:text-white group-hover:text-accent-red transition-colors duration-300 font-heading leading-snug">
                      {act.title}
                    </h3>
                    <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Inherited Capacity Section */}
      <section id="inheritance" className="scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block">
              Năng lực kế thừa
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Hệ sinh thái VDCD Group
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              {dynamicEcosystemDesc}
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[2px] bg-accent-red" />
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  06 lĩnh vực cốt lõi
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
            {inheritedCapacities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="group flex gap-4 items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 group-hover:text-accent-red group-hover:border-accent-red/20 transition-colors duration-300 shrink-0 mt-0.5">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm md:text-base font-bold text-black dark:text-white font-heading leading-snug group-hover:text-accent-red transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-secondary dark:text-zinc-400 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
