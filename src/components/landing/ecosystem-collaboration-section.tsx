"use client";

import {
  Bank,
  Buildings,
  RocketLaunch,
  GraduationCap,
} from "@phosphor-icons/react";

/* ────────────────────────────────────────────────────────
   DATA — Khối 6: Đồng hành cùng hệ sinh thái đổi mới sáng tạo
   ──────────────────────────────────────────────────────── */

const ECOSYSTEM_ITEMS = [
  {
    icon: Bank,
    title: "Cơ quan quản lý",
    body: "Hỗ trợ số hóa quy trình hành chính, giám sát dữ liệu hiện trường và ra quyết định cho các sở ban ngành địa phương.",
  },
  {
    icon: Buildings,
    title: "Doanh nghiệp",
    body: "Tư vấn chiến lược chuyển đổi số, tích hợp giải pháp công nghệ vào vận hành và mở rộng năng lực cạnh tranh trên thị trường.",
  },
  {
    icon: RocketLaunch,
    title: "Startup & dự án khởi nghiệp",
    body: "Ươm tạo ý tưởng, kết nối nguồn lực đầu tư và cung cấp hạ tầng kỹ thuật để đưa sản phẩm ra thị trường nhanh hơn.",
  },
  {
    icon: GraduationCap,
    title: "Trường đại học & tổ chức nghiên cứu",
    body: "Hợp tác nghiên cứu ứng dụng, chuyển giao công nghệ và phát triển nguồn nhân lực chất lượng cao cho toàn khu vực.",
  },
] as const;

/* ────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────── */

export function EcosystemCollaborationSection() {
  return (
    <section
      id="ecosystem-collaboration"
      className="border-t border-whisper-border/30 bg-[#f6f9fc] dark:bg-zinc-950 transition-colors duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-8">
        {/* ── Section Header ── */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold tracking-tighter uppercase text-[#0a2540] dark:text-white font-heading leading-[1.1]">
            Đồng hành cùng Trung tâm Đổi mới Sáng tạo
          </h2>
          <p className="text-[#425466] dark:text-zinc-400 text-sm md:text-base mt-4 leading-relaxed max-w-xl font-normal">
            Trung tâm kết nối và đồng hành cùng bốn nhóm đối tượng trọng tâm
            trong hệ sinh thái đổi mới sáng tạo tại Gia Lai
          </p>
        </div>

        {/* ── 4-Column Detail Grid (Equal 4 columns, perfectly balanced 3-line heights) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {ECOSYSTEM_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="relative flex flex-col gap-4 px-4 md:px-5 xl:px-6 py-6 lg:py-0 border-t sm:border-t-0 sm:border-l border-dashed border-[#cbd6e0] dark:border-zinc-800"
              >
                {/* Icon — large, clean, accent-colored */}
                <div className="w-10 h-10 flex items-center justify-center text-accent-red">
                  <Icon className="w-8 h-8" weight="thin" />
                </div>

                {/* Title with thin, uniform red accent bar */}
                <h3 className="relative text-[15px] xl:text-base font-bold text-[#0a2540] dark:text-white font-heading leading-snug tracking-tight flex items-center">
                  <span className="absolute -left-4 md:-left-5 xl:-left-6 top-1/2 -translate-y-1/2 w-[1.5px] h-4 bg-accent-red" />
                  <span>{item.title}</span>
                </h3>

                {/* Body — lighter weight, muted color, balanced 3 lines */}
                <p className="text-sm text-[#425466] dark:text-zinc-400 leading-relaxed font-normal">
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
