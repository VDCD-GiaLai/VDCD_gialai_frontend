import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";

export interface ProvinceItem {
  id: string;
  name: string;
  code: string;
  hasProject: boolean;
  centerCount: number;
}

export const MOCK_PROVINCES: ProvinceItem[] = [
  { id: "1", name: "Hà Nội", code: "HN", hasProject: true, centerCount: 3 },
  {
    id: "2",
    name: "Hồ Chí Minh",
    code: "SG",
    hasProject: true,
    centerCount: 4,
  },
  { id: "3", name: "Gia Lai", code: "GL", hasProject: true, centerCount: 2 },
  { id: "4", name: "Đắk Lắk", code: "DL", hasProject: true, centerCount: 1 },
  { id: "5", name: "Lâm Đồng", code: "LD", hasProject: true, centerCount: 1 },
  { id: "6", name: "Quảng Ninh", code: "QN", hasProject: true, centerCount: 2 },
  { id: "7", name: "Đà Nẵng", code: "DN", hasProject: true, centerCount: 2 },
  { id: "8", name: "Khánh Hòa", code: "KH", hasProject: true, centerCount: 1 },
  { id: "9", name: "Cần Thơ", code: "CT", hasProject: true, centerCount: 1 },
  { id: "10", name: "Hải Phòng", code: "HP", hasProject: true, centerCount: 1 },
  {
    id: "11",
    name: "Bình Dương",
    code: "BD",
    hasProject: true,
    centerCount: 1,
  },
  { id: "12", name: "Đồng Nai", code: "DN2", hasProject: true, centerCount: 1 },
  {
    id: "13",
    name: "Bà Rịa - Vũng Tàu",
    code: "VT",
    hasProject: true,
    centerCount: 1,
  },
  {
    id: "14",
    name: "Thừa Thiên Huế",
    code: "TTH",
    hasProject: true,
    centerCount: 1,
  },
  { id: "15", name: "Nghệ An", code: "NA", hasProject: true, centerCount: 1 },
  { id: "16", name: "Thanh Hóa", code: "TH", hasProject: true, centerCount: 1 },
  {
    id: "17",
    name: "Kiên Giang",
    code: "KG",
    hasProject: true,
    centerCount: 1,
  },
  { id: "18", name: "Phú Yên", code: "PY", hasProject: true, centerCount: 1 },
];

export async function fetchProvincesFromApi(): Promise<ProvinceItem[]> {
  if (USE_MOCK_DATA) {
    return MOCK_PROVINCES;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/provinces`, { cache: "no-store" });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch provinces from API, fallback to mock:", err);
  }
  return MOCK_PROVINCES;
}
