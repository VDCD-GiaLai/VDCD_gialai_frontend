/* ── Mega Menu — Types & Data ─────────────────────────── */

export interface MegaMenuProgram {
  label: string;
  href: string;
}

export interface MegaMenuSolution {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  href: string;
}

/* ── Hoạt động (5 items) ──────────────────────────────── */

export const MEGA_MENU_PROGRAMS: MegaMenuProgram[] = [
  {
    label: "Ươm tạo khởi nghiệp sáng tạo",
    href: "/programs/uom-tao-khoi-nghiep-sang-tao",
  },
  {
    label: "Đào tạo và phát triển nguồn nhân lực",
    href: "/programs/dao-tao-cong-nghe-va-chuyen-doi-so",
  },
  {
    label: "Kết nối chuyên gia – doanh nghiệp – nhà đầu tư",
    href: "/programs/ket-noi-chuyen-gia-va-he-sinh-thai",
  },
  {
    label: "Tư vấn và chuyển đổi số",
    href: "/programs/tu-van-chuyen-doi-so-cap-tinh",
  },
  {
    label: "Hội thảo, sự kiện",
    href: "/programs/hoi-thao-su-kien",
  },
];

/* ── 6 Giải pháp chính ────────────────────────────────── */

export const MEGA_MENU_SOLUTIONS: MegaMenuSolution[] = [
  {
    id: "uav",
    name: "UAV",
    slug: "uav",
    tagline: "Khảo sát địa hình & trắc địa số",
    href: "/solution/uav",
  },
  {
    id: "ai",
    name: "AI",
    slug: "ai",
    tagline: "Trung tâm phát triển Robot & AI",
    href: "/solution/ai",
  },
  {
    id: "autotimelapse",
    name: "AutoTimelapse",
    slug: "autotimelapse",
    tagline: "Giám sát thông minh 24/7",
    href: "/solution/autotimelapse",
  },
  {
    id: "vr360",
    name: "VR360",
    slug: "vr360",
    tagline: "Không gian số trực quan & Scan 3D",
    href: "/solution/vr360",
  },
  {
    id: "smartscale",
    name: "SmartScale",
    slug: "smartscale",
    tagline: "Trạm cân thông minh",
    href: "/solution/smartscale",
  },
  {
    id: "data-center",
    name: "Data Center",
    slug: "data-center",
    tagline: "Siêu máy tính & Đào tạo AI",
    href: "/solution/data-center",
  },
];
