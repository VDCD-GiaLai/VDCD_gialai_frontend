import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";

export interface HeroSlideItem {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  description: string;
  tag: string;
  location: string;
  image: string;
  statValue: string;
  statLabel: string;
}

export interface OrganizationStats {
  staff: number;
  partners: number;
  projects: number;
  provinces: number;
  experts?: number;
  centers?: number;
  subsidiaries?: number;
}

export interface OrganizationInfo {
  name: string;
  tagline: string;
  businessLicenseNo?: string;
  description: string;
  mission: string;
  vision: string;
  coreValues: string;
  foundedYear?: number;
  address?: string;
  stats: OrganizationStats;
  socialLinks: Record<string, string>;
  operationFields?: Array<{ title: string; description: string }>;
  ecosystemCapabilities?: string;
  developmentOrientations?: Array<{ title: string; description: string }>;
}

export const MOCK_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "1",
    title: "KIẾN TẠO HỆ SINH THÁI SỐ",
    subtitle: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    description:
      "Cầu nối thúc đẩy khởi nghiệp sáng tạo, chuyển giao công nghệ lõi và xây dựng hạ tầng kỹ thuật số đồng bộ, đồng hành cùng sự phát triển kinh tế số của tỉnh Gia Lai.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "Gia Lai",
    image: "/images/home/kientaotuonglai.webp",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "2",
    title: "NÔNG NGHIỆP THÔNG MINH",
    subtitle: "NÔNG NGHIỆP CÔNG NGHỆ CAO",
    description:
      "Ứng dụng các giải pháp số hóa IoT, tự động hóa và AI nhằm tối ưu hóa chuỗi giá trị, nâng cao năng suất và gia tăng giá trị bền vững cho nông sản chủ lực Gia Lai.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "Gia Lai",
    image: "/images/home/farm_area_drone_view.webp",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "3",
    title: "HỆ THỐNG ĐÔ THỊ SỐ",
    subtitle: "QUẢN LÝ ĐÔ THỊ THÔNG MINH",
    description:
      "Giải pháp quản lý, giám sát và điều hành đô thị thông minh IOC giúp tối ưu hóa dịch vụ công cộng và hỗ trợ ra quyết định kịp thời cho chính quyền và doanh nghiệp.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "Gia Lai",
    image: "/images/home/hethongdothiso.webp",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "4",
    title: "TRUNG TÂM DỮ LIỆU VÙNG",
    subtitle: "HẠ TẦNG KỸ THUẬT SỐ",
    description:
      "Hạ tầng lưu trữ đám mây và xử lý dữ liệu lớn chuẩn quốc tế, đảm bảo tính an toàn, bảo mật tối đa và khả năng mở rộng không giới hạn cho các tổ chức, doanh nghiệp.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "Gia Lai",
    image: "/images/home/data_center.webp",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "5",
    title: "LIÊN KẾT PHÁT TRIỂN",
    subtitle: "HỆ SINH THÁI VDCD GROUP",
    description:
      "Hội tụ năng lực công nghệ lõi và nguồn lực tài chính bền vững trong hệ sinh thái, làm cầu nối vững chắc đưa các giải pháp hiện đại đi vào thực tiễn cuộc sống.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "Gia Lai",
    image: "/images/home/quynhon_herobanner.webp",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
];

export async function fetchHeroSlidesFromApi(): Promise<HeroSlideItem[]> {
  if (USE_MOCK_DATA) {
    return MOCK_HERO_SLIDES;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/slides`, { cache: "no-store" });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((slide, idx) => ({
          id: slide.id || String(idx + 1),
          title: slide.title,
          subtitle: slide.subtitle || "Tập đoàn VDCD",
          description: slide.description || "",
          tag: slide.tag || "DỰ ÁN TRỌNG ĐIỂM",
          location: slide.subtitle || slide.location || "Việt Nam",
          image: slide.imageUrl || slide.image || "",
          statValue: slide.statValue || "100%",
          statLabel: slide.statLabel || "Tiến độ",
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to fetch slides from API, fallback to mock:", err);
  }
  return MOCK_HERO_SLIDES;
}

export async function fetchOrganizationInfoFromApi(): Promise<OrganizationInfo | null> {
  if (USE_MOCK_DATA) {
    return null;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/organization`, {
      cache: "no-store",
    });
    if (res.ok) {
      const body = await res.json();
      return body.data || body;
    }
  } catch (err) {
    console.warn("Failed to fetch organization from API:", err);
  }
  return null;
}
