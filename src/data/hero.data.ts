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
  ctaText?: string;
  ctaUrl?: string;
  order?: number;
}

export interface OrganizationStats {
  staff?: number;
  partners?: number;
  projects?: number;
  provinces?: number;
  experts?: number;
  centers?: number;
  subsidiaries?: number;
}

export interface OrganizationInfo {
  id?: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export const MOCK_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "2609eb18-f74a-451d-a01c-bff702a8ada7",
    title: "ĐÔ THỊ THÔNG MINH",
    subtitle: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    description:
      "Tích hợp Camera AI, UAV, AutoTimelapse, nền tảng 3DGIS hoặc Autotimelaspe PRO để giám sát, phân tích dữ liệu và hỗ trợ điều hành đô thị theo thời gian thực.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/quynhon_herobanner.jpg",
    statValue: "100%",
    statLabel: "Tiến độ",
    ctaText: "Tìm hiểu thêm",
    ctaUrl: "/slides/so-hoa-du-lieu-dat-dai",
    order: 0,
  },
  {
    id: "86f80ccc-ce60-445a-a665-7f05dc7e444e",
    title: "XÂY DỰNG CƠ SỞ DỮ LIỆU",
    subtitle: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    description:
      "Ứng dụng UAV, AI và nền tảng 3DGIS để khảo sát, thành lập bản đồ 2D/3D, xây dựng cơ sở dữ liệu và quản lý đất đai phục vụ quy hoạch, quản lý và chuyển đổi số.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    image: "https://ik.imagekit.io/huy01040104/vdcd/slides/hethongdothiso.jpg",
    statValue: "100%",
    statLabel: "Tiến độ",
    ctaText: "Tìm hiểu thêm",
    ctaUrl: "/#",
    order: 1,
  },
  {
    id: "4ac78763-ec9a-4a9b-9e19-0068c7e443f5",
    title: "QUẢN LÝ TÀI NGUYÊN RỪNG",
    subtitle: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    description:
      "Ứng dụng UAV, AI và nền tảng 3DGIS dữ liệu không gian trong kiểm kê, giám sát, phân tích hiện trạng và theo dõi biến động tài nguyên rừng theo thời gian thực.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/24514AFA-9CB5-4DC3-98A5-EEA103201F96.png",
    statValue: "100%",
    statLabel: "Tiến độ",
    ctaText: "Tìm hiểu thêm",
    ctaUrl: "/#",
    order: 2,
  },
  {
    id: "4a6acd92-e307-49f6-830f-cac75f81af12",
    title: "PHÁT TRIỂN ĐỊA PHƯƠNG",
    subtitle: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    description:
      "Nghiên cứu, chuyển giao và ứng dụng công nghệ số nhằm hỗ trợ chính quyền, doanh nghiệp và cộng đồng trong hành trình chuyển đổi số và đổi mới sáng tạo.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    image:
      "https://ik.imagekit.io/huy01040104/vdcd/slides/9a6a2f5e-4b3a-45fc-8945-b6c29db8ebb5.png?updatedAt=1787471559762",
    statValue: "100%",
    statLabel: "Tiến độ",
    ctaText: "Tìm hiểu thêm",
    ctaUrl: "/#",
    order: 3,
  },
  {
    id: "cc549362-6ade-457a-9c5a-febab365fe05",
    title: "HẠ TẦNG DỮ LIỆU SỐ",
    subtitle: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    description:
      "Hạ tầng lưu trữ dữ liệu đám mây (Cloud Storage) và xử lý dữ liệu lớn (Big Data) chuẩn quốc tế, đảm bảo tính an toàn, bảo mật và khả năng mở rộng cho các tổ chức, doanh nghiệp.\nHạ tầng lưu trữ dữ liệu đám mây (Cloud Storage) và xử lý dữ liệu lớn (Big Data) chuẩn quốc tế, đảm bảo tính an toàn, bảo mật và khả năng mở rộng cho các tổ chức, doanh nghiệp.\n",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    image: "https://ik.imagekit.io/huy01040104/vdcd/slides/data_center.jpg",
    statValue: "100%",
    statLabel: "Tiến độ",
    ctaText: "Tìm hiểu thêm",
    ctaUrl: "/#",
    order: 4,
  },
];

export const DEFAULT_ORGANIZATION_INFO: OrganizationInfo = {
  id: "1acff113-58ee-42f4-89b7-452ee45c1967",
  name: "Trung tâm Đổi mới Sáng tạo Gia Lai",
  tagline: "Kết nối – Sáng tạo – Phát triển",
  businessLicenseNo: "4101443823",
  description:
    "Trung tâm Đổi mới Sáng tạo Gia Lai, là mô hình xã hội hóa do doanh nghiệp đầu tư và vận hành. Trung tâm được hình thành nhằm kết nối nguồn lực công nghệ, chuyên gia, doanh nghiệp và dữ liệu; thúc đẩy ứng dụng công nghệ, chuyển đổi số và phát triển hệ sinh thái khởi nghiệp sáng tạo tại địa phương.\n\nVới định hướng lấy nhu cầu thực tiễn làm trung tâm, Trung tâm không chỉ là không gian kết nối mà còn trực tiếp đồng hành trong quá trình tư vấn, thử nghiệm, đào tạo, chuyển giao và triển khai công nghệ.",
  mission:
    "Thúc đẩy đổi mới sáng tạo, chuyển đổi số và phát triển bền vững cho tỉnh Gia Lai và khu vực Tây Nguyên.",
  vision:
    "Trở thành trung tâm đổi mới sáng tạo hàng đầu khu vực Tây Nguyên vào năm 2030.",
  coreValues: "Sáng tạo – Chính trực – Hợp tác – Tác động",
  foundedYear: 2020,
  address: "Số 226 Đống Đa, Phường Quy Nhơn, Tỉnh Gia Lai",
  stats: {
    staff: 1500,
    experts: 250,
    projects: 100,
    provinces: 30,
  },
  socialLinks: {
    zalo: "https://zalo.me/0373600099",
    email: "dmstgialai@vdcd.vn",
    tiktok: "https://www.tiktok.com/@vdcdgialai",
    hotline: "0373600099",
    facebook: "https://www.facebook.com/VDCDGIALAI",
    messenger: "https://www.messenger.com/t/888742211000071",
  },
  operationFields: [
    {
      title: "Công nghệ số & Chuyển đổi số",
      description:
        "Nghiên cứu phát triển và tích hợp các giải pháp trí tuệ nhân tạo (AI), Internet vạn vật (IoT), dữ liệu lớn (Big Data), điện toán đám mây (Cloud) và mô hình hóa thông tin số (Digital Twin) phục vụ tối ưu hóa vận hành.",
    },
    {
      title: "Khảo sát, Đo đạc & Số hóa bản đồ",
      description:
        "Thành lập bản đồ địa hình và hiện trạng độ phân giải siêu cao sử dụng thiết bị bay không người lái (UAV/Drone). Số hóa cơ sở dữ liệu đất đai, lâm nghiệp và hạ tầng kỹ thuật chính xác.",
    },
    {
      title: "Giải pháp hạ tầng thông minh",
      description:
        "Thiết kế, xây dựng và tích hợp hệ thống trung tâm điều hành thông minh (IOC/DOC), giải pháp đô thị thông minh (Smart City) và hệ thống giám sát tự động AutoTimelapse.",
    },
    {
      title: "Sản xuất & Chế tạo thiết bị công nghệ",
      description:
        "Chế tạo các thiết bị robot công nghiệp, lắp ráp các hệ thống thiết bị bay không người lái (Drone/UAV) chuyên dụng, camera AI thông minh và phần cứng IoT phục vụ đa lĩnh vực.",
    },
  ],
  ecosystemCapabilities:
    "Trung tâm kế thừa năng lực công nghệ, đội ngũ chuyên gia và mạng lưới triển khai của hệ sinh thái VDCD Group trong các lĩnh vực khảo sát, dữ liệu không gian, trí tuệ nhân tạo, mô hình thông tin công trình, hạ tầng dữ liệu và phần mềm quản lý.",
  developmentOrientations: [
    {
      title: "Phát triển hạ tầng dữ liệu và công nghệ dùng chung",
      description: "",
    },
    {
      title: "Thúc đẩy ứng dụng công nghệ trong các ngành kinh tế chủ lực",
      description: "",
    },
    {
      title: "Hỗ trợ startup và doanh nghiệp đổi mới mô hình hoạt động",
      description: "",
    },
    {
      title:
        "Kết nối Gia Lai với mạng lưới chuyên gia, công nghệ và đầu tư trong nước",
      description: "",
    },
  ],
  updatedAt: "2026-08-31T20:04:50.107Z",
};
