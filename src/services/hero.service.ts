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
    title: "TRUNG TÂM ĐỔI MỚI \nSÁNG TẠO GIA LAI",
    subtitle: "",
    description:
      "Kết nối công nghệ, chuyên gia và doanh nghiệp, thúc đẩy chuyển đổi số và phát triển hệ sinh thái khởi nghiệp đổi mới sáng tạo tại địa phương.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/81B72404-9A7A-4E02-B5C6-4D8AA67AF50F.PNG",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "2",
    title: "SỐ HÓA\nDỮ LIỆU ĐẤT ĐAI",
    subtitle: "",
    description:
      "Ứng dụng UAV và AI xây dựng bản đồ số hiện trạng 2D/3D, nhận diện ranh thửa và tích hợp trên phần mềm 3DGIS phục vụ đối soát, quản lý dữ liệu đất đai.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/1787306535077_3700802451179916895_3700802451179916895_037ebe9d346999769ffc084ad20f5b11.jpg",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "3",
    title: "QUẢN LÍ TÀI NGUYÊN \nVÀ MÔI TRƯỜNG",
    subtitle: "",
    description:
      "Kết hợp UAV, AI, AutoTimelapse và phần mềm 3DGIS trong khảo sát, kiểm kê, giám sát biến động và hỗ trợ quản lý tài nguyên, môi trường.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/24514AFA-9CB5-4DC3-98A5-EEA103201F96.png",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "4",
    title: "ĐÔ THỊ\nTHÔNG MINH",
    subtitle: "",
    description:
      "Kết nối camera AI và AutoTimelapse để thu thập dữ liệu hiện trường, tích hợp trên phần mềm AutoTimelapse Pro, hỗ trợ giám sát, quản lý và nâng cao hiệu quả điều hành đô thị.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/1787299720814-0726f0dd007a.png?updatedAt=1787299723551",
    statValue: "100%",
    statLabel: "Tiến độ",
  },
  {
    id: "5",
    title: "TRUNG TÂM\nDỮ LIỆU VÙNG",
    subtitle: "",
    description:
      "Hạ tầng Data Center phục vụ lưu trữ, tích hợp và chia sẻ dữ liệu tập trung, kết nối các hệ thống và hỗ trợ khai thác dữ liệu phục vụ quản lý, điều hành.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "",
    image: "https://ik.imagekit.io/huy01040104/vdcd/slides/data_center.jpg",
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
            subtitle: slide.subtitle || "",
            description: slide.description || "",
            tag: slide.tag || "DỰ ÁN TRỌNG ĐIỂM",
            location: slide.subtitle || "",
            image: slide.imageUrl || slide.image || "",
            statValue: slide.statValue || "100%",
            statLabel: slide.statLabel || "Tiến độ",
            order: slide.order ?? idx,
          }));
          mapped.sort((a, b) => Number(a.order) - Number(b.order));
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
