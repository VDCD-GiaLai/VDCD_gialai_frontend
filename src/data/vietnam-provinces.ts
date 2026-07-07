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
