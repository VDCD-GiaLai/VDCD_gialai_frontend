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

let cachedHeroSlides: HeroSlideItem[] | null = null;
let heroSlidesPromise: Promise<HeroSlideItem[]> | null = null;

export function getCachedHeroSlides(): HeroSlideItem[] | null {
  return cachedHeroSlides;
}

export async function fetchHeroSlidesFromApi(): Promise<HeroSlideItem[]> {
  if (USE_MOCK_DATA) {
    cachedHeroSlides = MOCK_HERO_SLIDES;
    return MOCK_HERO_SLIDES;
  }
  if (cachedHeroSlides) {
    return cachedHeroSlides;
  }
  if (heroSlidesPromise) {
    return heroSlidesPromise;
  }

  heroSlidesPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/slides`, { cache: "no-store" });
      if (res.ok) {
        const body = await res.json();
        const items = body.data || body;
        if (Array.isArray(items) && items.length > 0) {
          const mapped = items.map((slide, idx) => ({
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
          cachedHeroSlides = mapped;
          if (typeof window !== "undefined") {
            mapped.forEach((s) => {
              if (s.image) {
                const img = new Image();
                img.src = s.image;
              }
            });
          }
          return mapped;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch slides from API, fallback to mock:", err);
    } finally {
      heroSlidesPromise = null;
    }
    cachedHeroSlides = MOCK_HERO_SLIDES;
    return MOCK_HERO_SLIDES;
  })();

  return heroSlidesPromise;
}

export const DEFAULT_ORGANIZATION_INFO: OrganizationInfo = {
  name: "Trung tâm Đổi mới Sáng tạo Gia Lai",
  tagline: "Kiến tạo tương lai số bền vững cho doanh nghiệp và cộng đồng.",
  description:
    "<p>Là cầu nối thúc đẩy khởi nghiệp sáng tạo, chuyển giao công nghệ lõi và xây dựng hạ tầng kỹ thuật số đồng bộ, Trung tâm Đổi mới Sáng tạo Gia Lai đồng hành cùng sự phát triển kinh tế số của tỉnh Gia Lai và khu vực Tây Nguyên.</p><p>Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực từ hệ sinh thái VDCD Group nhằm đưa các giải pháp số vào thực tiễn. Từ thu thập dữ liệu hiện trường, phân tích, quản lý đến hỗ trợ ra quyết định, Trung tâm đồng hành cùng cơ quan quản lý và doanh nghiệp trong quá trình đổi mới, chuyển đổi số và nâng cao hiệu quả hoạt động.</p>",
  mission:
    "Thúc đẩy đổi mới sáng tạo, hỗ trợ doanh nghiệp và chuyển đổi số cho tỉnh Gia Lai.",
  vision:
    "Trở thành trung tâm công nghệ và ươm tạo doanh nghiệp số hàng đầu khu vực Tây Nguyên.",
  coreValues: "Sáng tạo - Tin cậy - Hiệu quả - Bền vững",
  address: "62A Diên Hồng, Phường Quy Nhơn, Tỉnh Gia Lai",
  stats: {
    staff: 1500,
    partners: 250,
    provinces: 30,
    projects: 100,
    experts: 250,
    centers: 5,
    subsidiaries: 12,
  },
  socialLinks: {
    hotline: "0373600099",
    phone: "0373600099",
    email: "dmstgialai@vdcd.vn",
    facebook: "https://www.facebook.com/VDCDGIALAI",
    zalo: "https://zalo.me/0373600099",
    tiktok: "https://www.tiktok.com/@vdcdgialai",
    messenger: "https://www.messenger.com/t/888742211000071",
  },
};

export async function fetchOrganizationInfoFromApi(): Promise<OrganizationInfo> {
  if (USE_MOCK_DATA) {
    return DEFAULT_ORGANIZATION_INFO;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/organization`, {
      cache: "no-store",
    });
    if (res.ok) {
      const body = await res.json();
      const apiData = body.data || body;
      if (apiData && typeof apiData === "object") {
        return {
          ...DEFAULT_ORGANIZATION_INFO,
          ...apiData,
          address: apiData.address || DEFAULT_ORGANIZATION_INFO.address,
          stats: {
            ...DEFAULT_ORGANIZATION_INFO.stats,
            ...(apiData.stats || {}),
          },
          socialLinks: {
            ...DEFAULT_ORGANIZATION_INFO.socialLinks,
            ...(apiData.socialLinks || {}),
          },
        };
      }
    }
  } catch (err) {
    console.warn(
      "Failed to fetch organization from API, fallback to default:",
      err,
    );
  }
  return DEFAULT_ORGANIZATION_INFO;
}
