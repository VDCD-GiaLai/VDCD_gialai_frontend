import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category?: string;
}

export const MOCK_PARTNERS: PartnerItem[] = [
  {
    id: "1",
    name: "VTV",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/1.png",
  },
  {
    id: "2",
    name: "Lotte",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/3.png",
  },
  {
    id: "3",
    name: "Sungroup",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/1-1.png",
  },
  {
    id: "4",
    name: "Samsung",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/4.png",
  },
  {
    id: "5",
    name: "Petrolimex",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/5.png",
  },
  {
    id: "6",
    name: "VinGroup",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/6.png",
  },
  {
    id: "7",
    name: "Hòa Phát",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/7.png",
  },
  {
    id: "8",
    name: "FLC",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/8.png",
  },
  {
    id: "9",
    name: "Đường sắt Việt Nam",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/9.png",
  },
  {
    id: "10",
    name: "Phúc Lộc",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/2.png",
  },
  {
    id: "11",
    name: "Silk Path",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/10.png",
  },
  {
    id: "12",
    name: "Hòa Bình",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/12.png",
  },
  {
    id: "13",
    name: "Six Senses",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/13.png",
  },
  {
    id: "14",
    name: "DELTA",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/15.png",
  },
  {
    id: "15",
    name: "GIZA",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/17.png",
  },
  {
    id: "16",
    name: "Tân Á Đại Thành",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/18.png",
  },
  {
    id: "17",
    name: "Hoàng Thịnh Đạt",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/19.png",
  },
  {
    id: "18",
    name: "NOVA Land",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/20.png",
  },
  {
    id: "19",
    name: "NOVASIA Energy",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/21.png",
  },
  {
    id: "20",
    name: "Tuần Châu",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/22.png",
  },
  {
    id: "21",
    name: "CIENCO8",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/3-1.png",
  },
  {
    id: "22",
    name: "Flamingo",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/4-1.png",
  },
];

export async function fetchPartnersFromApi(): Promise<PartnerItem[]> {
  if (USE_MOCK_DATA) {
    return MOCK_PARTNERS;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/partners`, { cache: "no-store" });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.map((p) => ({
          id: p.id,
          name: p.name,
          logo: p.logo || "/images/placeholder-logo.webp",
          website: p.websiteUrl || p.website,
          category: p.category || "Đối tác chiến lược",
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to fetch partners from API, fallback to mock:", err);
  }
  return MOCK_PARTNERS;
}
