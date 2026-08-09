/* ── Mega Menu — Types & Data ─────────────────────────── */

/** A program item shown in Column 1 (fixed, informational) */
export interface MegaMenuProgram {
  label: string;
  href: string;
}

/** A section within a solution's detail panel (Column 3) */
export interface MegaMenuSolutionSection {
  title: string;
  items: string[];
}

/** A solution item for Column 2 (selector) + Column 3 (detail) */
export interface MegaMenuSolution {
  id: string;
  name: string;
  slug: string;
  sections: MegaMenuSolutionSection[];
  cta: {
    label: string;
    href: string;
  };
}

/* ── Column 1 — Chương trình (fixed) ─────────────────── */

export const MEGA_MENU_PROGRAMS: MegaMenuProgram[] = [
  { label: "Ươm tạo khởi nghiệp sáng tạo", href: "/programs" },
  { label: "Đào tạo và phát triển nguồn nhân lực", href: "/programs" },
  {
    label: "Kết nối chuyên gia – doanh nghiệp – nhà đầu tư",
    href: "/programs",
  },
  { label: "Tư vấn và chuyển đổi số", href: "/programs" },
  { label: "Hội thảo, sự kiện", href: "/programs" },
];

/* ── Column 2 + 3 — Giải pháp (selector + detail) ────── */

export const MEGA_MENU_SOLUTIONS: MegaMenuSolution[] = [
  {
    id: "uav",
    name: "UAV",
    slug: "uav",
    sections: [
      {
        title: "Khảo sát & bản đồ",
        items: ["Khảo sát địa hình", "Bản đồ 2D/3D", "LiDAR"],
      },
      {
        title: "Đo lường & kiểm kê",
        items: ["Đo diện tích", "Đo thể tích"],
      },
    ],
    cta: { label: "Xem giải pháp UAV", href: "/solution" },
  },
  {
    id: "ai",
    name: "AI",
    slug: "ai",
    sections: [
      {
        title: "Trí tuệ nhân tạo",
        items: ["Nhận diện hình ảnh", "Phân tích dữ liệu"],
      },
    ],
    cta: { label: "Xem giải pháp AI", href: "/solution" },
  },
  {
    id: "autotimelapse",
    name: "Autotimelapse",
    slug: "autotimelapse",
    sections: [
      {
        title: "Giám sát tự động",
        items: ["Camera thông minh", "Timelapse tiến độ"],
      },
    ],
    cta: { label: "Xem giải pháp Autotimelapse", href: "/solution" },
  },
  {
    id: "vr360",
    name: "VR360",
    slug: "vr360",
    sections: [
      {
        title: "Thực tế ảo",
        items: ["Tour 360°", "Mô hình 3D"],
      },
    ],
    cta: { label: "Xem giải pháp VR360", href: "/solution" },
  },
  {
    id: "smartscale",
    name: "SmartScale",
    slug: "smartscale",
    sections: [
      {
        title: "Trạm cân thông minh",
        items: ["Quản lý từ xa", "Chống gian lận"],
      },
    ],
    cta: { label: "Xem giải pháp SmartScale", href: "/solution" },
  },
  {
    id: "data-center",
    name: "Data Center",
    slug: "data-center",
    sections: [
      {
        title: "Trung tâm dữ liệu",
        items: ["Hạ tầng HPC", "Đào tạo AI"],
      },
    ],
    cta: { label: "Xem giải pháp Data Center", href: "/solution" },
  },
];

/** Default selected solution id */
export const MEGA_MENU_DEFAULT_SOLUTION_ID = "uav";
