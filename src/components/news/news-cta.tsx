"use client";

import * as React from "react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

export const NewsCta = () => {
  return (
    <CommonCtaSection
      badge="Kết nối & Lan tỏa"
      title="ĐỒNG HÀNH CÙNG HỆ SINH THÁI ĐỔI MỚI SÁNG TẠO"
      description="Theo dõi tin tức mới nhất hoặc liên hệ với chúng tôi để hợp tác truyền thông, chia sẻ câu chuyện đổi mới sáng tạo."
      primaryButton={{
        label: "Liên hệ truyền thông",
        href: "/contact",
        icon: "envelope",
      }}
      secondaryButton={{
        label: "Về chúng tôi",
        href: "/about-us",
        icon: "arrow-right",
      }}
      className="pt-4 pb-16"
    />
  );
};
