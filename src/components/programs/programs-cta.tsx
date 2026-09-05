"use client";

import * as React from "react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

export const ProgramsCta = () => {
  return (
    <CommonCtaSection
      badge="Hợp tác cùng VDCD"
      title="ĐỒNG HÀNH ĐỔI MỚI SÁNG TẠO CÙNG TÂY NGUYÊN"
      description="Tham gia các chương trình ươm tạo, chuyển đổi số, kết nối chuyên gia và đào tạo nguồn nhân lực số chất lượng cao."
      primaryButton={{
        label: "Đăng ký tham gia",
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
      className="py-12 md:py-16"
    />
  );
};
