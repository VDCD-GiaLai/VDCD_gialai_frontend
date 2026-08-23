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
      // "https://ik.imagekit.io/huy01040104/vdcd/slides/81B72404-9A7A-4E02-B5C6-4D8AA67AF50F.PNG",
      "https://ik.imagekit.io/huy01040104/vdcd/slides/9a6a2f5e-4b3a-45fc-8945-b6c29db8ebb5.png",
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
  businessLicenseNo: "4101443823",
  description:
    "<p>Trung tâm Đổi mới Sáng tạo Gia Lai được phát triển theo mô hình xã hội hóa, hướng đến thúc đẩy chuyển đổi số, ứng dụng công nghệ và phát triển hệ sinh thái đổi mới sáng tạo tại Gia Lai.</p>\n<p>1. Trung tâm tập trung phát triển Trung tâm dữ liệu vùng; triển khai các giải pháp UAV, AI, GIS, BIM và phần mềm quản trị, phục vụ số hóa, quản lý, điều hành và khai thác dữ liệu trong các lĩnh vực trọng điểm.</p>\n<p>\n<p>2. Trung tâm thực hiện vai trò kết nối cơ quan quản lý, doanh nghiệp, startup, chuyên gia, đơn vị công nghệ và nhà đầu tư, tạo môi trường hợp tác, thử nghiệm và đưa các giải pháp công nghệ vào ứng dụng thực tế.</p>\n<p>3. Trung tâm triển khai các hoạt động ươm tạo, đào tạo, tư vấn chuyển đổi số, hỗ trợ doanh nghiệp và phát triển nguồn nhân lực số, góp phần xây dựng hệ sinh thái đổi mới sáng tạo gắn với nhu cầu phát triển của Gia Lai.</p>",
  mission:
    "Đưa công nghệ đến gần hơn với thực tế, tạo ra những giá trị thiết thực cho người dân, doanh nghiệp và địa phương",
  vision:
    "Từ Gia Lai, kết nối những con người dám nghĩ, dám làm để cùng tạo nên những thay đổi tích cực bằng công nghệ",
  coreValues:
    "Bắt đầu từ thực tế, đổi mới bằng hành động và đồng hành đến khi tạo ra giá trị thật",
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
