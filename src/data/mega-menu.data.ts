/* ── Mega Menu — Types & Data ─────────────────────────── */

/** A program item shown in Column 1 (fixed, informational) */
export interface MegaMenuProgram {
  label: string;
  href: string;
}

/** A solution item for Column 2 (selector) + Column 3 (detail) */
export interface MegaMenuSolution {
  id: string;
  name: string;
  slug: string;
  items: string[];
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
    items: [
      "Bay quét 3D, trắc địa số và thành lập bản đồ",
      "Scan vật thể",
      "Tài nguyên và khoáng sản",
      "Lâm nghiệp và nông nghiệp",
      "Công trình và hạ tầng",
      "Điện và năng lượng",
      "Phòng, chống thiên tai",
    ],
    cta: { label: "Xem giải pháp UAV", href: "/solution/uav" },
  },
  {
    id: "ai",
    name: "AI",
    slug: "ai",
    items: [
      "Nhận diện và số hóa ranh giới thửa đất",
      "Nhận diện, đếm và phân loại đối tượng",
      "Giám sát giao thông và đô thị thông minh",
      "Phát hiện biến động và cảnh báo bất thường",
      "Kiểm kê tài nguyên, rừng và cây trồng",
    ],
    cta: { label: "Xem giải pháp AI", href: "/solution/ai" },
  },
  {
    id: "autotimelapse",
    name: "Autotimelapse",
    slug: "autotimelapse",
    items: [
      "Công trình xây dựng",
      "Nông nghiệp",
      "Môi trường và khí hậu",
      "Du lịch và trải nghiệm",
      "Giám sát an ninh",
    ],
    cta: {
      label: "Xem giải pháp Autotimelapse",
      href: "/solution/autotimelapse",
    },
  },
  {
    id: "vr360",
    name: "VR360",
    slug: "vr360",
    items: [
      "Bất động sản, kiến trúc và xây dựng",
      "Du lịch, khách sạn và khu nghỉ dưỡng",
      "Di tích, bảo tàng và không gian văn hóa",
      "Showroom, cửa hàng và triển lãm",
      "Giáo dục, đào tạo và văn phòng",
      "Nhà máy và khu công nghiệp",
    ],
    cta: { label: "Xem giải pháp VR360", href: "/solution/vr360" },
  },
  {
    id: "smartscale",
    name: "SmartScale",
    slug: "smartscale",
    items: [
      "Khai thác khoáng sản và vật liệu xây dựng",
      "Nhà máy sản xuất và khu công nghiệp",
      "Vận tải, logistics, cảng và kho bãi",
      "Nông nghiệp, chăn nuôi và nông sản",
      "Năng lượng và sinh khối",
    ],
    cta: { label: "Xem giải pháp SmartScale", href: "/solution/smartscale" },
  },
  {
    id: "data-center",
    name: "Data Center",
    slug: "data-center",
    items: [
      "Hạ tầng lưu trữ, xử lý, tích hợp và chia sẻ dữ liệu tập trung, phục vụ vận hành các hệ thống và nền tảng công nghệ.",
    ],
    cta: { label: "Xem giải pháp Data Center", href: "/solution/data-center" },
  },
];

/** Default selected solution id */
export const MEGA_MENU_DEFAULT_SOLUTION_ID = "uav";
