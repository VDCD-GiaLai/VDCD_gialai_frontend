/* ── Mega Menu — Types & Data ─────────────────────────── */

/** A program item shown in Column 1 (fixed, informational) */
export interface MegaMenuProgram {
  label: string;
  href: string;
}

/** A child navigation item under a solution in Column 3 */
export interface MegaMenuChildItem {
  label: string;
  href?: string;
}

/** A solution item for Column 2 (selector) + Column 3 (detail) */
export interface MegaMenuSolution {
  id: string;
  name: string;
  slug: string;
  items: MegaMenuChildItem[];
  cta: {
    label: string;
    href: string;
  };
}

/* ── Column 1 — Chương trình (fixed) ─────────────────── */

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
  { label: "Hội thảo, sự kiện", href: "/programs/hoi-thao-su-kien" },
];

/* ── Column 2 + 3 — Giải pháp (selector + detail) ────── */

export const MEGA_MENU_SOLUTIONS: MegaMenuSolution[] = [
  {
    id: "uav",
    name: "UAV",
    slug: "uav",
    items: [
      {
        label: "Bay quét 3D, trắc địa số và thành lập bản đồ",
        href: "/solution/bay-quet-3d",
      },
      {
        label: "Scan vật thể",
        href: "/solution/scan-vat-the",
      },
      {
        label: "Tài nguyên và khoáng sản",
        href: "/solution/tai-nguyen-khoang-san",
      },
      {
        label: "Lâm nghiệp và nông nghiệp",
        href: "/solution/lam-nghiep-nong-nghiep",
      },
      {
        label: "Công trình và hạ tầng",
        href: "/solution/cong-trinh",
      },
      {
        label: "Điện và năng lượng",
        href: "/solution/nang-luong",
      },
      {
        label: "Phòng, chống thiên tai",
        href: "/solution/phong-chong-thien-tai",
      },
    ],
    cta: { label: "Xem giải pháp UAV", href: "/solution/uav" },
  },
  {
    id: "ai",
    name: "AI",
    slug: "ai",
    items: [
      {
        label: "Nhận diện và số hóa ranh giới thửa đất",
        href: "/solution/ai",
      },
      {
        label: "Nhận diện, đếm và phân loại đối tượng",
        href: "/solution/ai",
      },
      {
        label: "Giám sát giao thông và đô thị thông minh",
        href: "/solution/ai",
      },
      {
        label: "Phát hiện biến động và cảnh báo bất thường",
        href: "/solution/ai",
      },
      {
        label: "Kiểm kê tài nguyên, rừng và cây trồng",
        href: "/solution/ai",
      },
    ],
    cta: { label: "Xem giải pháp AI", href: "/solution/ai" },
  },
  {
    id: "autotimelapse",
    name: "Autotimelapse",
    slug: "autotimelapse",
    items: [
      {
        label: "Công trình xây dựng",
        href: "/solution/xay-dung",
      },
      {
        label: "Nông nghiệp",
        href: "/solution/nong-nghiep",
      },
      {
        label: "Môi trường và khí hậu",
        href: "/solution/moi-truong-khi-hau",
      },
      {
        label: "Du lịch và trải nghiệm",
        href: "/solution/du-lich",
      },
      {
        label: "Giám sát an ninh",
        href: "/solution/an-ninh",
      },
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
      {
        label: "Bất động sản, kiến trúc và xây dựng",
        href: "/solution/vr360",
      },
      {
        label: "Du lịch, khách sạn và khu nghỉ dưỡng",
        href: "/solution/vr360",
      },
      {
        label: "Di tích, bảo tàng và không gian văn hóa",
        href: "/solution/vr360",
      },
      {
        label: "Showroom, cửa hàng và triển lãm",
        href: "/solution/vr360",
      },
      {
        label: "Giáo dục, đào tạo và văn phòng",
        href: "/solution/vr360",
      },
      {
        label: "Nhà máy và khu công nghiệp",
        href: "/solution/vr360",
      },
    ],
    cta: { label: "Xem giải pháp VR360", href: "/solution/vr360" },
  },
  {
    id: "smartscale",
    name: "SmartScale",
    slug: "smartscale",
    items: [
      {
        label: "Khai thác khoáng sản và vật liệu xây dựng",
        href: "/solution/smartscale",
      },
      {
        label: "Nhà máy sản xuất và khu công nghiệp",
        href: "/solution/smartscale",
      },
      {
        label: "Vận tải, logistics, cảng và kho bãi",
        href: "/solution/smartscale",
      },
      {
        label: "Nông nghiệp, chăn nuôi và nông sản",
        href: "/solution/smartscale",
      },
      {
        label: "Năng lượng và sinh khối",
        href: "/solution/smartscale",
      },
    ],
    cta: { label: "Xem giải pháp SmartScale", href: "/solution/smartscale" },
  },
  {
    id: "data-center",
    name: "Data Center",
    slug: "data-center",
    items: [
      {
        label:
          "Hạ tầng lưu trữ, xử lý, tích hợp và chia sẻ dữ liệu tập trung, phục vụ vận hành các hệ thống và nền tảng công nghệ.",
        href: "/solution/data-center",
      },
    ],
    cta: { label: "Xem giải pháp Data Center", href: "/solution/data-center" },
  },
];

/** Default selected solution id */
export const MEGA_MENU_DEFAULT_SOLUTION_ID = "uav";
