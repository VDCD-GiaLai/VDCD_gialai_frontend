export type Region = "Bắc" | "Trung" | "Nam";

export interface ProvinceCenter {
  name: string;
  address?: string;
}

export interface Province {
  id: string;
  name: string;
  region: Region;
  projectCount: number;
  centerCount: number;
  studentCount: number;
  centers: ProvinceCenter[];
  lat: number;
  lng: number;
}

export const PROVINCES: Province[] = [
  // ─── MIỀN BẮC (15 đơn vị) ───
  {
    id: "ha-noi",
    name: "TP. Hà Nội",
    region: "Bắc",
    projectCount: 48,
    centerCount: 12,
    studentCount: 18500,
    lat: 21.0285,
    lng: 105.8542,
    centers: [
      { name: "Trung tâm Đổi mới Sáng tạo Hà Nội" },
      { name: "Hub Công nghệ Cầu Giấy" },
      { name: "Trung tâm AI & Dữ liệu" },
    ],
  },
  {
    id: "cao-bang",
    name: "Cao Bằng",
    region: "Bắc",
    projectCount: 5,
    centerCount: 1,
    studentCount: 1200,
    lat: 22.6789,
    lng: 106.2625,
    centers: [{ name: "Trung tâm Số hóa Cao Bằng" }],
  },
  {
    id: "dien-bien",
    name: "Điện Biên",
    region: "Bắc",
    projectCount: 4,
    centerCount: 1,
    studentCount: 1000,
    lat: 21.3892,
    lng: 103.0182,
    centers: [{ name: "Hub Công nghệ Điện Biên" }],
  },
  {
    id: "lai-chau",
    name: "Lai Châu",
    region: "Bắc",
    projectCount: 3,
    centerCount: 1,
    studentCount: 800,
    lat: 22.3959,
    lng: 103.4682,
    centers: [{ name: "VDCD Center Lai Châu" }],
  },
  {
    id: "lang-son",
    name: "Lạng Sơn",
    region: "Bắc",
    projectCount: 6,
    centerCount: 2,
    studentCount: 1600,
    lat: 21.853,
    lng: 106.7615,
    centers: [{ name: "Trung tâm Thương mại Điện tử Biên giới" }],
  },
  {
    id: "quang-ninh",
    name: "Quảng Ninh",
    region: "Bắc",
    projectCount: 18,
    centerCount: 4,
    studentCount: 4800,
    lat: 21.006,
    lng: 107.2925,
    centers: [
      { name: "Trung tâm Du lịch Thông minh Hạ Long" },
      { name: "Hub Logistics Cảng Quảng Ninh" },
    ],
  },
  {
    id: "son-la",
    name: "Sơn La",
    region: "Bắc",
    projectCount: 8,
    centerCount: 2,
    studentCount: 1900,
    lat: 21.3259,
    lng: 103.9102,
    centers: [{ name: "Hub Nông sản Số Sơn La" }],
  },
  {
    id: "tuyen-quang",
    name: "Tuyên Quang", // Hợp nhất Hà Giang & Tuyên Quang
    region: "Bắc",
    projectCount: 12,
    centerCount: 3,
    studentCount: 3100,
    lat: 22.131,
    lng: 105.229,
    centers: [
      { name: "Trung tâm Du lịch Hà Giang" },
      { name: "Hub Phát triển Bền vững Tuyên Quang" },
    ],
  },
  {
    id: "lao-cai",
    name: "Lào Cai", // Hợp nhất Lào Cai & Yên Bái
    region: "Bắc",
    projectCount: 14,
    centerCount: 4,
    studentCount: 3900,
    lat: 22.3559,
    lng: 104.096,
    centers: [
      { name: "Hub Thương mại Quốc tế Lào Cai" },
      { name: "Trung tâm Giáo dục Số Yên Bái" },
    ],
  },
  {
    id: "thai-nguyen",
    name: "Thái Nguyên", // Hợp nhất Bắc Kạn & Thái Nguyên
    region: "Bắc",
    projectCount: 15,
    centerCount: 4,
    studentCount: 4200,
    lat: 21.5812,
    lng: 105.887,
    centers: [
      { name: "Hub Khởi nghiệp Công nghệ Thái Nguyên" },
      { name: "Trung tâm Nông lâm nghiệp Bắc Kạn" },
    ],
  },
  {
    id: "phu-tho",
    name: "Phú Thọ", // Hợp nhất Vĩnh Phúc, Hòa Bình & Phú Thọ
    region: "Bắc",
    projectCount: 18,
    centerCount: 5,
    studentCount: 5100,
    lat: 21.3127,
    lng: 105.143,
    centers: [
      { name: "Trung tâm Đổi mới Phú Thọ" },
      { name: "Hub Công nghiệp Vĩnh Phúc" },
      { name: "Hub Văn hóa Số Hòa Bình" },
    ],
  },
  {
    id: "bac-ninh",
    name: "Bắc Ninh", // Hợp nhất Bắc Giang & Bắc Ninh
    region: "Bắc",
    projectCount: 24,
    centerCount: 6,
    studentCount: 6800,
    lat: 21.098,
    lng: 106.117,
    centers: [
      { name: "Trung tâm Công nghệ 4.0 Bắc Ninh" },
      { name: "Hub Nông nghiệp Lục Ngạn (Bắc Giang)" },
    ],
  },
  {
    id: "hung-yen",
    name: "Hưng Yên", // Hợp nhất Thái Bình & Hưng Yên
    region: "Bắc",
    projectCount: 16,
    centerCount: 4,
    studentCount: 4500,
    lat: 20.8085,
    lng: 106.076,
    centers: [
      { name: "Hub Đô thị Thông minh Hưng Yên" },
      { name: "Trung tâm Dịch vụ Số Thái Bình" },
    ],
  },
  {
    id: "hai-phong",
    name: "TP. Hải Phòng", // Hợp nhất Hải Dương & Hải Phòng
    region: "Bắc",
    projectCount: 28,
    centerCount: 7,
    studentCount: 8200,
    lat: 20.79,
    lng: 106.635,
    centers: [
      { name: "Hub Cảng biển Thông minh Hải Phòng" },
      { name: "Trung tâm Đổi mới Sáng tạo Hải Dương" },
    ],
  },
  {
    id: "ninh-binh",
    name: "Ninh Bình", // Hợp nhất Hà Nam, Nam Định & Ninh Bình
    region: "Bắc",
    projectCount: 20,
    centerCount: 5,
    studentCount: 5600,
    lat: 20.2722,
    lng: 105.852,
    centers: [
      { name: "Hub Du lịch Di sản Ninh Bình" },
      { name: "Trung tâm Dệt may Số Nam Định" },
      { name: "Hub Công nghiệp Hà Nam" },
    ],
  },

  // ─── MIỀN TRUNG (11 đơn vị) ───
  {
    id: "thanh-hoa",
    name: "Thanh Hóa",
    region: "Trung",
    projectCount: 16,
    centerCount: 4,
    studentCount: 4500,
    lat: 20.0917,
    lng: 105.215,
    centers: [
      { name: "Hub Nông nghiệp CNC Thanh Hóa" },
      { name: "Trung tâm Số hóa Nghi Sơn" },
    ],
  },
  {
    id: "nghe-an",
    name: "Nghệ An",
    region: "Trung",
    projectCount: 15,
    centerCount: 4,
    studentCount: 4200,
    lat: 19.3548,
    lng: 104.827,
    centers: [
      { name: "Trung tâm Khởi nghiệp Nghệ An" },
      { name: "Hub Giáo dục Số Vinh" },
    ],
  },
  {
    id: "ha-tinh",
    name: "Hà Tĩnh",
    region: "Trung",
    projectCount: 7,
    centerCount: 2,
    studentCount: 2000,
    lat: 18.3563,
    lng: 105.799,
    centers: [{ name: "Hub Công nghiệp Vũng Áng" }],
  },
  {
    id: "thua-thien-hue",
    name: "Thừa Thiên Huế",
    region: "Trung",
    projectCount: 11,
    centerCount: 3,
    studentCount: 3100,
    lat: 16.4637,
    lng: 107.5909,
    centers: [
      { name: "Trung tâm Đô thị Thông minh Huế" },
      { name: "Hub Công nghệ Huế" },
    ],
  },
  {
    id: "quang-tri",
    name: "Quảng Trị", // Hợp nhất Quảng Bình & Quảng Trị
    region: "Trung",
    projectCount: 12,
    centerCount: 3,
    studentCount: 3200,
    lat: 16.7204,
    lng: 106.973,
    centers: [
      { name: "Hub Nông nghiệp Quảng Trị" },
      { name: "Trung tâm Du lịch Phong Nha (Quảng Bình)" },
    ],
  },
  {
    id: "da-nang",
    name: "TP. Đà Nẵng", // Hợp nhất Quảng Nam & Đà Nẵng
    region: "Trung",
    projectCount: 36,
    centerCount: 9,
    studentCount: 11200,
    lat: 16.0544,
    lng: 108.2022,
    centers: [
      { name: "Trung tâm Khởi nghiệp Đà Nẵng" },
      { name: "Hub AI & Blockchain Đà Nẵng" },
      { name: "Hub Du lịch Di sản Hội An" },
    ],
  },
  {
    id: "quang-ngai",
    name: "Quảng Ngãi", // Hợp nhất Kon Tum & Quảng Ngãi
    region: "Trung",
    projectCount: 14,
    centerCount: 3,
    studentCount: 3800,
    lat: 14.9971,
    lng: 108.686,
    centers: [
      { name: "Trung tâm Lọc hóa dầu Dung Quất" },
      { name: "Hub Dược liệu Sâm Ngọc Linh (Kon Tum)" },
    ],
  },
  {
    id: "gia-lai",
    name: "Gia Lai", // Hợp nhất Bình Định & Gia Lai
    region: "Trung",
    projectCount: 32,
    centerCount: 8,
    studentCount: 9600,
    lat: 13.9825,
    lng: 108.0022,
    centers: [
      { name: "VDCD Center Pleiku" },
      { name: "Hub Nông nghiệp CNC Gia Lai" },
      { name: "Trung tâm Đổi mới Quy Nhơn" },
      { name: "Hub Công nghệ AI Quy Nhơn" },
    ],
  },
  {
    id: "khanh-hoa",
    name: "Khánh Hòa", // Hợp nhất Ninh Thuận & Khánh Hòa
    region: "Trung",
    projectCount: 22,
    centerCount: 5,
    studentCount: 6000,
    lat: 12.2585,
    lng: 109.0526,
    centers: [
      { name: "Hub Du lịch Nha Trang" },
      { name: "Trung tâm Công nghệ Khánh Hòa" },
      { name: "Hub Năng lượng Ninh Thuận" },
    ],
  },
  {
    id: "lam-dong",
    name: "Lâm Đồng", // Hợp nhất Đắk Nông, Bình Thuận & Lâm Đồng
    region: "Trung",
    projectCount: 25,
    centerCount: 6,
    studentCount: 7100,
    lat: 11.9465,
    lng: 108.4419,
    centers: [
      { name: "Hub Nông nghiệp CNC Đà Lạt" },
      { name: "Trung tâm Chuyển đổi số Lâm Đồng" },
      { name: "Hub Bauxite Đắk Nông" },
      { name: "Hub Du lịch Mũi Né" },
    ],
  },
  {
    id: "dak-lak",
    name: "Đắk Lắk", // Hợp nhất Phú Yên & Đắk Lắk
    region: "Trung",
    projectCount: 20,
    centerCount: 5,
    studentCount: 5500,
    lat: 12.6666,
    lng: 108.0378,
    centers: [
      { name: "Hub Cà phê Buôn Ma Thuột" },
      { name: "Trung tâm Thủy sản Tuy Hòa (Phú Yên)" },
    ],
  },

  // ─── MIỀN NAM (8 đơn vị) ───
  {
    id: "ho-chi-minh",
    name: "TP. Hồ Chí Minh", // Hợp nhất Bà Rịa - Vũng Tàu, Bình Dương & TP.HCM
    region: "Nam",
    projectCount: 64,
    centerCount: 16,
    studentCount: 29500,
    lat: 10.8231,
    lng: 106.6297,
    centers: [
      { name: "VDCD Innovation Hub HCM" },
      { name: "Hub Công nghiệp 4.0 Bình Dương" },
      { name: "Hub Dầu khí & Logistics Vũng Tàu" },
      { name: "Trung tâm AI & Fintech" },
    ],
  },
  {
    id: "dong-nai",
    name: "Đồng Nai", // Hợp nhất Bình Phước & Đồng Nai
    region: "Nam",
    projectCount: 22,
    centerCount: 5,
    studentCount: 6300,
    lat: 11.0686,
    lng: 107.1676,
    centers: [
      { name: "Hub Công nghiệp Biên Hòa" },
      { name: "Trung tâm Cao su Bình Phước" },
    ],
  },
  {
    id: "tay-ninh",
    name: "Tây Ninh", // Hợp nhất Long An & Tây Ninh
    region: "Nam",
    projectCount: 16,
    centerCount: 4,
    studentCount: 4400,
    lat: 11.4121,
    lng: 106.14,
    centers: [
      { name: "Hub Logistics Long An" },
      { name: "Trung tâm Thương mại Số Tây Ninh" },
    ],
  },
  {
    id: "can-tho",
    name: "TP. Cần Thơ", // Hợp nhất Sóc Trăng, Hậu Giang & Cần Thơ
    region: "Nam",
    projectCount: 32,
    centerCount: 8,
    studentCount: 9200,
    lat: 10.0452,
    lng: 105.7469,
    centers: [
      { name: "Hub Nông nghiệp CNC Cần Thơ" },
      { name: "Trung tâm Lúa gạo Hậu Giang" },
      { name: "Hub Thủy sản Sóc Trăng" },
    ],
  },
  {
    id: "vinh-long",
    name: "Vĩnh Long", // Hợp nhất Bến Tre, Vĩnh Long & Trà Vinh
    region: "Nam",
    projectCount: 18,
    centerCount: 4,
    studentCount: 4100,
    lat: 10.2537,
    lng: 105.9722,
    centers: [
      { name: "Hub Dừa Bến Tre" },
      { name: "Trung tâm Thủy sản Trà Vinh" },
      { name: "Hub Nông nghiệp Vĩnh Long" },
    ],
  },
  {
    id: "dong-thap",
    name: "Đồng Tháp", // Hợp nhất Tiền Giang & Đồng Tháp
    region: "Nam",
    projectCount: 14,
    centerCount: 3,
    studentCount: 3800,
    lat: 10.6644,
    lng: 105.586,
    centers: [
      { name: "Hub Nông sản Đồng Tháp" },
      { name: "Trung tâm Trái cây Tiền Giang" },
    ],
  },
  {
    id: "ca-mau",
    name: "Cà Mau", // Hợp nhất Bạc Liêu & Cà Mau
    region: "Nam",
    projectCount: 12,
    centerCount: 3,
    studentCount: 3300,
    lat: 9.05545,
    lng: 105.073,
    centers: [
      { name: "Hub Thủy sản Cà Mau" },
      { name: "Trung tâm Năng lượng Gió Bạc Liêu" },
    ],
  },
  {
    id: "an-giang",
    name: "An Giang", // Hợp nhất Kiên Giang & An Giang
    region: "Nam",
    projectCount: 15,
    centerCount: 4,
    studentCount: 4300,
    lat: 10.5216,
    lng: 105.1259,
    centers: [
      { name: "Hub Lúa gạo An Giang" },
      { name: "Trung tâm Du lịch Phú Quốc (Kiên Giang)" },
    ],
  },
];

export const TOTAL_STATS = {
  provinces: PROVINCES.length,
  centers: PROVINCES.reduce((s, p) => s + p.centerCount, 0),
  projects: PROVINCES.reduce((s, p) => s + p.projectCount, 0),
  students: PROVINCES.reduce((s, p) => s + p.studentCount, 0),
};

export const REGION_STATS = {
  Bắc: PROVINCES.filter((p) => p.region === "Bắc"),
  Trung: PROVINCES.filter((p) => p.region === "Trung"),
  Nam: PROVINCES.filter((p) => p.region === "Nam"),
};

export interface ProvinceDetail {
  image: string;
  description: string;
  population: string;
  area: string;
}

export const GEONAME_TO_PROVINCE_ID: Record<string, string> = {
  "An Giang": "an-giang",
  "Ba Ria - Vung Tau": "ho-chi-minh",
  "Bac Giang": "bac-ninh",
  "Bac Kan": "thai-nguyen",
  "Bac Lieu": "ca-mau",
  "Bac Ninh": "bac-ninh",
  "Ben Tre": "vinh-long",
  "Binh Dinh": "gia-lai",
  "Binh Duong": "ho-chi-minh",
  "Binh Phuoc": "dong-nai",
  "Binh Thuan": "lam-dong",
  "Ca Mau": "ca-mau",
  "Can Tho city": "can-tho",
  "Cao Bang": "cao-bang",
  "Dak Lak": "dak-lak",
  "Dak Nong": "lam-dong",
  "Dien Bien": "dien-bien",
  "Dong Nai": "dong-nai",
  "Dong Thap": "dong-thap",
  "Gia Lai": "gia-lai",
  "Ha Giang": "tuyen-quang",
  "Ha Nam": "ninh-binh",
  "Ha Noi city": "ha-noi",
  "Ha Tinh": "ha-tinh",
  "Hai Duong": "hai-phong",
  "Hai Phong city": "hai-phong",
  "Hau Giang": "can-tho",
  "Hoa Binh": "phu-tho",
  "Hung Yen": "hung-yen",
  "Kien Giang": "an-giang",
  "Kon Tum": "quang-ngai",
  "Lai Chau": "lai-chau",
  "Lam Dong": "lam-dong",
  "Lang Son": "lang-son",
  "Lao Cai": "lao-cai",
  "Long An": "tay-ninh",
  "Nam Dinh": "ninh-binh",
  "Nghe An": "nghe-an",
  "Ninh Binh": "ninh-binh",
  "Ninh Thuan": "khanh-hoa",
  "Phu Tho": "phu-tho",
  "Phu Yen": "dak-lak",
  "Quang Binh": "quang-tri",
  "Quang Nam": "da-nang",
  "Quang Ngai": "quang-ngai",
  "Quang Ninh": "quang-ninh",
  "Quang Tri": "quang-tri",
  "Soc Trang": "can-tho",
  "Son La": "son-la",
  "Tay Ninh": "tay-ninh",
  "Thai Binh": "hung-yen",
  "Thai Nguyen": "thai-nguyen",
  "Thanh Hoa": "thanh-hoa",
  "Thua Thien - Hue": "thua-thien-hue",
  "Tien Giang": "dong-thap",
  "Ho Chi Minh city": "ho-chi-minh",
  "Tra Vinh": "vinh-long",
  "Tuyen Quang": "tuyen-quang",
  "Vinh Long": "vinh-long",
  "Vinh Phuc": "phu-tho",
  "Yen Bai": "lao-cai",
  "Da Nang city": "da-nang",
  "Khanh Hoa": "khanh-hoa",
};

export const PROVINCE_DETAILS: Record<string, ProvinceDetail> = {
  "ha-noi": {
    image:
      "https://images.unsplash.com/photo-1509060464153-4466739f78d0?auto=format&fit=crop&w=600&q=80",
    description:
      "Thủ đô ngàn năm văn hiến với nét đẹp cổ kính của Hồ Gươm và 36 phố phường nhộn nhịp.",
    population: "8.5 triệu người",
    area: "3,359 km²",
  },
  "cao-bang": {
    image:
      "https://images.unsplash.com/photo-1627626775846-122b778965ae?auto=format&fit=crop&w=600&q=80",
    description:
      "Mảnh đất biên cương địa đầu Tổ quốc sở hữu Thác Bản Giốc hùng vĩ và di tích lịch sử Pác Bó.",
    population: "540,000 người",
    area: "6,700 km²",
  },
  "dien-bien": {
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
    description:
      "Vùng đất lịch sử oai hùng gắn liền với chiến thắng Điện Biên Phủ lừng lẫy năm châu.",
    population: "620,000 người",
    area: "9,541 km²",
  },
  "lai-chau": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Địa đầu Tây Bắc hùng vĩ với đỉnh Putaleng kỳ vĩ và những cung đường đèo quanh co.",
    population: "480,000 người",
    area: "9,068 km²",
  },
  "lang-son": {
    image:
      "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?auto=format&fit=crop&w=600&q=80",
    description:
      "Cửa ngõ biên mậu phía Bắc sầm uất với danh thắng Động Nhị Thanh và Ải Chi Lăng.",
    population: "790,000 người",
    area: "8,310 km²",
  },
  "quang-ninh": {
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80",
    description:
      "Di sản Thiên nhiên Thế giới Vịnh Hạ Long huyền ảo và quần thể tâm linh Yên Tử uy nghiêm.",
    population: "1.4 triệu người",
    area: "6,178 km²",
  },
  "son-la": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Thảo nguyên Mộc Châu bốn mùa hoa nở và Nhà máy Thủy điện Sơn La lớn nhất Đông Nam Á.",
    population: "1.3 triệu người",
    area: "14,125 km²",
  },
  "tuyen-quang": {
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    description:
      "Thủ đô kháng chiến xưa hòa cùng Cao nguyên đá Đồng Văn hùng vĩ và đèo Mã Pí Lèng.",
    population: "1.7 triệu người",
    area: "13,700 km²",
  },
  "lao-cai": {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    description:
      "Sa Pa sương mù bồng bềnh và ruộng bậc thang vàng óng kỳ vĩ của Yên Bái.",
    population: "1.6 triệu người",
    area: "13,200 km²",
  },
  "thai-nguyen": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Đất trà đệ nhất danh trà Thái Nguyên hòa cùng danh lam Hồ Ba Bể hoang sơ của Bắc Kạn.",
    population: "1.6 triệu người",
    area: "8,400 km²",
  },
  "phu-tho": {
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
    description:
      "Vùng đất Tổ linh thiêng, thị trấn mờ sương Tam Đảo và thung lũng Mai Châu thơ mộng.",
    population: "3.4 triệu người",
    area: "10,700 km²",
  },
  "bac-ninh": {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    description:
      "Cội nguồn văn hóa Kinh Bắc đặc sắc với những làn điệu Quan họ đằm thắm và chùa Dâu cổ kính.",
    population: "3.3 triệu người",
    area: "4,700 km²",
  },
  "hung-yen": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Thương cảng Phố Hiến sầm uất xưa kia kết hợp với vựa lúa trĩu hạt quê hương Thái Bình.",
    population: "3.2 triệu người",
    area: "2,500 km²",
  },
  "hai-phong": {
    image:
      "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?auto=format&fit=crop&w=600&q=80",
    description:
      "Thành phố cảng hoa phượng đỏ hiện đại kết hợp quần đảo Cát Bà hoang sơ, thơ mộng.",
    population: "4.1 triệu người",
    area: "3,200 km²",
  },
  "ninh-binh": {
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
    description:
      "Quần thể danh thắng Tràng An non nước hữu tình được UNESCO công nhận là di sản kép thế giới.",
    population: "3.0 triệu người",
    area: "4,600 km²",
  },
  "thanh-hoa": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Bãi biển Sầm Sơn cát mịn sóng vỗ dạt dào và Di sản Văn hóa Thế giới Thành nhà Hồ độc đáo.",
    population: "3.7 triệu người",
    area: "11,116 km²",
  },
  "nghe-an": {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    description:
      "Quê hương Chủ tịch Hồ Chí Minh kính yêu, mảnh đất hiếu học và bãi biển Cửa Lò rộng lớn.",
    population: "3.4 triệu người",
    area: "16,481 km²",
  },
  "ha-tinh": {
    image:
      "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?auto=format&fit=crop&w=600&q=80",
    description:
      "Danh thắng Hồ Kẻ Gỗ thơ mộng, bãi biển Thiên Cầm xanh ngắt và di tích Ngã ba Đồng Lộc lịch sử.",
    population: "1.3 triệu người",
    area: "5,998 km²",
  },
  "thua-thien-hue": {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    description:
      "Cố đô Huế trầm mặc, thơ mộng với những di sản cung đình cổ kính bên bờ sông Hương.",
    population: "1.2 triệu người",
    area: "5,033 km²",
  },
  "quang-tri": {
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80",
    description:
      "Mảnh đất vĩ tuyến 17 chia cắt xưa kết hợp kỳ quan động Phong Nha - Kẻ Bàng kỳ vĩ của Quảng Bình.",
    population: "1.6 triệu người",
    area: "12,700 km²",
  },
  "da-nang": {
    image:
      "https://images.unsplash.com/photo-1559592442-7484a223a3c2?auto=format&fit=crop&w=600&q=80",
    description:
      "Thành phố đáng sống với Cầu Rồng biểu tượng hòa cùng nét cổ kính rêu phong của phố cổ Hội An.",
    population: "2.8 triệu người",
    area: "11,800 km²",
  },
  "quang-ngai": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Đảo ngọc Lý Sơn được bao bọc bởi đại dương xanh ngắt và cao nguyên Măng Đen mát mẻ ôn hòa.",
    population: "1.8 triệu người",
    area: "14,800 km²",
  },
  "gia-lai": {
    image: "/images/home/quynhon_herobanner.jpg",
    description:
      "Biển Quy Nhơn lộng gió hòa cùng đất đỏ đại ngàn Gia Lai, tạo nên nét đẹp hùng vĩ độc đáo.",
    population: "3.2 triệu người",
    area: "21,600 km²",
  },
  "khanh-hoa": {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    description:
      "Vịnh Nha Trang lộng lẫy cát trắng nắng vàng hòa cùng vẻ đẹp đồi cát đầy gió Nam Cương Ninh Thuận.",
    population: "1.9 triệu người",
    area: "8,500 km²",
  },
  "lam-dong": {
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
    description:
      "Đà Lạt mộng mơ ngập tràn sương khói kết hợp đồi cát Mũi Né lộng gió và hồ Tà Đùng hoang sơ.",
    population: "3.3 triệu người",
    area: "24,300 km²",
  },
  "dak-lak": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Thủ phủ cà phê Buôn Ma Thuột đại ngàn kết hợp Ghềnh Đá Đĩa độc nhất vô nhị xứ Nẫu Phú Yên.",
    population: "3.0 triệu người",
    area: "18,100 km²",
  },
  "ho-chi-minh": {
    image:
      "https://images.unsplash.com/photo-1546874177-9e664107314e?auto=format&fit=crop&w=600&q=80",
    description:
      "Siêu đô thị sôi động nhất nước với Landmark 81 sừng sững, phố biển Vũng Tàu và KCN Bình Dương sầm uất.",
    population: "12.5 triệu người",
    area: "5,100 km²",
  },
  "dong-nai": {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    description:
      "Trung tâm công nghiệp Biên Hòa hiện đại cùng rừng cao su bạt ngàn của đất đỏ Bình Phước.",
    population: "4.2 triệu người",
    area: "12,700 km²",
  },
  "tay-ninh": {
    image:
      "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?auto=format&fit=crop&w=600&q=80",
    description:
      "Tòa thánh Cao Đài uy nghiêm, núi Bà Đen linh thiêng và cảnh đẹp sông nước thanh bình Long An.",
    population: "2.7 triệu người",
    area: "8,500 km²",
  },
  "can-tho": {
    image:
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=600&q=80",
    description:
      "Thủ phủ miền Tây với chợ nổi Cái Răng tấp nập, những miệt vườn cây trái sum suê trĩu quả.",
    population: "3.2 triệu người",
    area: "9,600 km²",
  },
  "vinh-long": {
    image:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80",
    description:
      "Xứ sở dừa Bến Tre xanh ngát trải dài dọc bờ sông Tiền hiền hòa và văn hóa Trà Vinh đa dạng.",
    population: "3.1 triệu người",
    area: "5,800 km²",
  },
  "dong-thap": {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
    description:
      "Vương quốc hoa Sa Đéc và những cánh đồng sen hồng tỏa hương thơm ngát đặc trưng của miền Tây.",
    population: "2.7 triệu người",
    area: "5,900 km²",
  },
  "ca-mau": {
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
    description:
      "Mảnh đất cực Nam thiêng liêng rợp bóng rừng ngập mặn cùng cánh đồng điện gió Bạc Liêu ven biển.",
    population: "2.2 triệu người",
    area: "7,800 km²",
  },
  "an-giang": {
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
    description:
      "Rừng tràm Trà Sư thanh bình yên ả, đất Thất Sơn kỳ vĩ kết hợp thiên đường đảo ngọc Phú Quốc.",
    population: "3.6 triệu người",
    area: "8,400 km²",
  },
};
