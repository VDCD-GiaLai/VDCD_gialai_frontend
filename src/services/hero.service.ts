const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

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
  centers: number;
  partners: number;
  projects: number;
  provinces: number;
}

export interface OrganizationInfo {
  name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  stats: OrganizationStats;
  socialLinks: Record<string, string>;
}

export async function fetchHeroSlidesFromApi(): Promise<HeroSlideItem[]> {
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
    console.warn("Failed to fetch slides from API:", err);
  }
  return [
    {
      id: "1",
      title: "Chuyển Đổi Số Công Trình & Hạ Tầng Quốc Gia",
      subtitle: "VDCD Group",
      description:
        "Tiên phong ứng dụng công nghệ AutoTimelapse, UAV trắc địa và mô hình BIM/GIS vào giám sát, điều hành công trình quy mô lớn.",
      tag: "DỰ ÁN TRỌNG ĐIỂM",
      location: "Việt Nam",
      image:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/projects/Lotte-Mall-1-1-1-scaled_jpg_a3c23efc8e99_qC7F0e2fQ.jpg",
      statValue: "50+",
      statLabel: "Công trình tiêu biểu",
    },
  ];
}

export async function fetchOrganizationInfoFromApi(): Promise<OrganizationInfo | null> {
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
