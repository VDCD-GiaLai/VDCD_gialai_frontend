"use client";

import { Bank, Buildings, RocketLaunch, GraduationCap } from "@phosphor-icons/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/* ────────────────────────────────────────────────────────
   DATA — Khối 6: Đồng hành cùng hệ sinh thái đổi mới sáng tạo
   ──────────────────────────────────────────────────────── */

const ECOSYSTEM_ITEMS = [
  {
    icon: Bank,
    title: "Cơ quan quản lý",
    body: "Hỗ trợ số hóa quy trình hành chính, giám sát dữ liệu hiện trường và ra quyết định dựa trên dữ liệu cho các sở ban ngành và cơ quan chính quyền.",
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
    body: "Hợp tác nghiên cứu ứng dụng, chuyển giao công nghệ và phát triển nguồn nhân lực chất lượng cao cho khu vực.",
  },
] as const;

/* ────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────── */

export function EcosystemCollaborationSection() {
  const containerRef = useScrollReveal({
    targets: ".eco-collab-reveal",
    options: {
      y: 24,
      blur: 4,
      duration: 0.8,
      ease: "power3.out",
    },
  });

  return (
    <section
      id="ecosystem-collaboration"
      className="border-t border-whisper-border/30 bg-[#f6f9fc] dark:bg-zinc-950 transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16"
      >
        {/* ── Section Header ── */}
        <div className="eco-collab-reveal mb-14 md:mb-20 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0a2540] dark:text-white font-heading leading-tight">
            Đồng hành cùng hệ sinh thái đổi mới sáng tạo
          </h2>
          <p className="text-[#425466] dark:text-zinc-400 text-sm md:text-base mt-4 leading-relaxed max-w-xl font-light">
            Trung tâm kết nối và đồng hành cùng bốn nhóm đối tượng trọng tâm
            trong hệ sinh thái đổi mới sáng tạo tại Gia Lai và khu vực Tây
            Nguyên.
          </p>
        </div>

        {/* ── 4-Column Detail Grid (Stripe Connect style) ── */}
        <div className="eco-collab-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {ECOSYSTEM_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isNotFirst = idx > 0;

            return (
              <div
                key={item.title}
                className="relative flex flex-col gap-5 px-5 md:px-6 py-6 lg:py-0 border-t sm:border-t-0 sm:border-l border-dashed border-[#cbd6e0] dark:border-zinc-800"
              >
                {/* Icon — large, clean, accent-colored */}
                <div className="w-10 h-10 flex items-center justify-center text-accent-red">
                  <Icon className="w-8 h-8" weight="thin" />
                </div>

                {/* Title with left accent bar at column edge */}
                <h3 className="relative text-base font-semibold text-[#0a2540] dark:text-white font-heading leading-snug tracking-tight">
                  <span className="absolute -left-5 md:-left-6 top-0 w-[1px] h-5 bg-accent-red rounded-full" />
                  {item.title}
                </h3>

                {/* Body — lighter weight, muted color */}
                <p className="text-[15px] text-[#425466] dark:text-zinc-400 leading-relaxed font-light">
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
