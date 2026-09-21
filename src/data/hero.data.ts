export interface HeroSlideItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  location: string;
  image: string;
  statValue: string;
  statLabel: string;
  ctaText: string;
  ctaUrl: string;
  order: number;
}

export interface OrganizationStats {
  staff?: number;
  experts?: number;
  provinces?: number;
  projects?: number;
  centers?: number;
  subsidiaries?: number;
}

export interface OrganizationStatItem {
  key?: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface OrganizationLeader {
  name?: string;
  role?: string;
  quote?: string;
  avatarUrl?: string;
  avatarFileId?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface OrganizationAnnouncement {
  text?: string;
  link?: string;
  isActive?: boolean;
  imageUrl?: string;
  imageFileId?: string;
}

export interface OrganizationEcosystemMember {
  id?: string;
  title: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  websiteUrl?: string;
  order?: number;
}

export interface OrganizationCtaSection {
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  subtext?: string;
}

export interface OrganizationInfo {
  id?: string;
  name: string;
  shortName?: string;
  abbreviation?: string;
  tagline: string;
  businessLicenseNo?: string;
  description: string;
  mission: string;
  vision: string;
  coreValues: string;
  coreValuesList?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;
  foundedYear?: number;
  address?: string;
  email?: string;
  hotline?: string;
  stats: OrganizationStats;
  statsList?: OrganizationStatItem[];
  socialLinks: Record<string, string>;
  announcement?: OrganizationAnnouncement;
  leader?: OrganizationLeader;
  operationFields?: Array<{
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
    order?: number;
  }>;
  ecosystemCapabilities?: string;
  ecosystemMembers?: OrganizationEcosystemMember[];
  developmentOrientations?: Array<{
    title: string;
    description: string;
    icon?: string;
    order?: number;
  }>;
  ctaSection?: OrganizationCtaSection;
  createdAt?: string;
  updatedAt?: string;
}

export const MOCK_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "3e5ee0d9-b226-4fa2-bf4f-e221d604e33e",
    title: "SỐ HÓA DỮ LIỆU ĐẤT ĐAI",
    subtitle: "UBND TỈNH GIA LAI",
    description:
      "Ứng dụng công nghệ bay chụp UAV, trắc địa số hóa và xây dựng cơ sở dữ liệu đất đai chính xác phục vụ công tác quản lý và quy hoạch trên toàn tỉnh.",
    tag: "DỰ ÁN TRỌNG ĐIỂM",
    location: "UBND TỈNH GIA LAI",
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
      "Hạ tầng lưu trữ dữ liệu đám mây (Cloud Storage) và xử lý dữ liệu lớn (Big Data) chuẩn quốc tế, đảm bảo tính an toàn, bảo mật và khả năng mở rộng cho các tổ chức, doanh nghiệp.",
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
  shortName: "VDCD Gia Lai",
  tagline: "Kết nối – Sáng tạo – Phát triển",
  businessLicenseNo: "4101443823",
  description:
    "Trung tâm Đổi mới Sáng tạo Gia Lai, là mô hình xã hội hóa do doanh nghiệp đầu tư và vận hành. Trung tâm được hình thành nhằm kết nối nguồn lực công nghệ, chuyên gia, doanh nghiệp và dữ liệu; thúc đẩy ứng dụng công nghệ, chuyển đổi số và phát triển hệ sinh thái khởi nghiệp sáng tạo tại địa phương.\n\nVới định hướng lấy nhu cầu thực tiễn làm trung tâm, Trung tâm không chỉ là không gian kết nối mà còn trực tiếp đồng hành trong quá trình tư vấn, thử nghiệm, đào tạo, chuyển giao và triển khai công nghệ.",
  mission:
    "Thúc đẩy đổi mới sáng tạo, chuyển đổi số và phát triển bền vững cho tỉnh Gia Lai và khu vực Tây Nguyên.",
  vision:
    "Trở thành trung tâm đổi mới sáng tạo hàng đầu khu vực Tây Nguyên vào năm 2030.",
  coreValues: "Sáng tạo — Chính trực — Hợp tác — Tác động",
  foundedYear: 2020,
  address: "Số 226 Đống Đa, Phường Quy Nhơn, Tỉnh Gia Lai",
  email: "dmstgialai@vdcd.vn",
  hotline: "0373600099",
  announcement: {
    text: "Hội nghị Xúc tiến đầu tư tỉnh Gia Lai năm 2026 diễn ra vào ngày 28/3/2026 tại Trung tâm Hội nghị tỉnh (số 01 Nguyễn Tất Thành, phường Quy Nhơn)",
    link: "",
    isActive: true,
    imageUrl: "/about-us/3A5A2610.webp",
  },
  leader: {
    name: "Ông Cao Quân Vũ",
    role: "Phó Chủ tịch HĐQT kiêm Tổng Giám đốc",
    quote:
      "Chúng tôi không bắt đầu từ những điều quá cao siêu. Chúng tôi bắt đầu từ những khó khăn thực tế của người dân, cơ quan quản lý và doanh nghiệp, để đưa công nghệ vào giải quyết những vấn đề thiết thực và góp phần nâng cao chất lượng cuộc sống.",
    avatarUrl: "/about-us/sep-cao-quan-vu.webp",
    ctaText: "Xem thông tin lãnh đạo",
    ctaLink: "/leadership",
  },
  stats: {
    staff: 1500,
    experts: 250,
    projects: 100,
    provinces: 30,
  },
  statsList: [
    {
      key: "staff",
      value: "1.500+",
      label: "Cán bộ, nhân sự",
      description:
        "Đội ngũ chuyên môn cao, đáp ứng triển khai dự án quy mô lớn",
      icon: "users",
    },
    {
      key: "experts",
      value: "250+",
      label: "Chuyên gia đa lĩnh vực",
      description: "Năng lực R&D phần cứng, GIS, AI và chuyển đổi số",
      icon: "award",
    },
    {
      key: "projects",
      value: "100+",
      label: "Dự án trọng điểm",
      description: "Tham gia trực tiếp triển khai các dự án quy mô toàn quốc",
      icon: "briefcase",
    },
    {
      key: "provinces",
      value: "30+",
      label: "Tỉnh, thành hiện diện",
      description:
        "Mạng lưới phục vụ thực địa rộng khắp các tỉnh thành toàn quốc",
      icon: "map-pin",
    },
  ],
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
  ecosystemMembers: [
    {
      id: "trung-tam-ban-do-so",
      title: "Trung tâm Bản đồ số",
      slug: "trung-tam-ban-do-so",
      description:
        "Cung cấp các dịch vụ bay quét 3D, trắc địa số hóa và thành lập bản đồ địa hình độ chính xác cao bằng máy bay không người lái.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ban_do_so.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-ban-do-so",
      order: 1,
    },
    {
      id: "trung-tam-ha-tang-du-lieu-so",
      title: "Trung tâm Hạ tầng Dữ liệu số",
      slug: "trung-tam-ha-tang-du-lieu-so",
      description:
        "Hạ tầng lưu trữ đám mây chuẩn Tier 3 và xử lý dữ liệu lớn Big Data phục vụ toàn diện các giải pháp số hóa của tỉnh.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ha_tang_du_lieu_so.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-ha-tang-du-lieu-so",
      order: 2,
    },
    {
      id: "trung-tam-do-thi-so",
      title: "Trung tâm Đô thị số",
      slug: "trung-tam-do-thi-so",
      description:
        "Tư vấn và phát triển các giải pháp thành phố thông minh (Smart City), trung tâm điều hành thông minh IOC/DOC.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/do_thi_so.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-do-thi-so",
      order: 3,
    },
    {
      id: "trung-tam-nong-nghiep-thong-minh",
      title: "Trung tâm Nông nghiệp Thông minh",
      slug: "trung-tam-nong-nghiep-thong-minh",
      description:
        "Ứng dụng IoT, cảm biến vi khí hậu và UAV giám sát mùa màng, tưới tiêu tự động và truy xuất nguồn gốc nông sản.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/nong_nghiep_so.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-nong-nghiep-thong-minh",
      order: 4,
    },
    {
      id: "trung-tam-dao-tao-nhan-luc-so",
      title: "Trung tâm Đào tạo Nhân lực số",
      slug: "trung-tam-dao-tao-nhan-luc-so",
      description:
        "Đào tạo kỹ năng số chuyên sâu cho cán bộ, doanh nghiệp và sinh viên trong các lĩnh vực AI, GIS, Drone và Big Data.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dao_tao_nhan_luc_so.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-dao-tao-nhan-luc-so",
      order: 5,
    },
    {
      id: "trung-tam-phan-mem-quan-ly",
      title: "Trung tâm Phần mềm Quản lý",
      slug: "trung-tam-phan-mem-quan-ly",
      description:
        "Phát triển các phần mềm quản lý doanh nghiệp, giải pháp chuyển đổi số chuyên sâu phục vụ hệ sinh thái kinh tế vùng và cả nước.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/phan_mem_quan_ly.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-phan-mem-quan-ly",
      order: 6,
    },
    {
      id: "trung-tam-doi-moi-sang-tao-tinh",
      title: "Trung Tâm Đổi Mới Sáng Tạo Tỉnh",
      slug: "trung-tam-doi-moi-sang-tao-tinh",
      description:
        "Hỗ trợ ươm tạo khởi nghiệp, phát triển ý tưởng sáng tạo và thúc đẩy chuyển giao công nghệ tại địa phương.",
      imageUrl: "https://vdcd.vn/wp-content/uploads/2025/11/S3-1-1-768x590.jpg",
      websiteUrl: "/solution/trung-tam-doi-moi-sang-tao-tinh",
      order: 7,
    },
    {
      id: "trung-tam-chuyen-giao-cong-nghe",
      title: "Trung Tâm Chuyển giao Công Nghệ",
      slug: "trung-tam-chuyen-giao-cong-nghe",
      description:
        "Cầu nối chuyển giao các công nghệ tiên tiến từ viện nghiên cứu, trường đại học đến các doanh nghiệp địa phương ứng dụng thực tiễn.",
      imageUrl:
        "https://vdcd.vn/wp-content/uploads/2025/10/BOT06612-768x512.jpg",
      websiteUrl: "/solution/trung-tam-chuyen-giao-cong-nghe",
      order: 8,
    },
    {
      id: "may-bay-viet",
      title: "Máy Bay Việt",
      slug: "may-bay-viet",
      description:
        "Đơn vị cung cấp giải pháp máy bay không người lái phục vụ nông nghiệp thông minh, khảo sát công nghiệp và quay chụp chuyên nghiệp.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_dich_vu_khao_sat_dia_hinh.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/may-bay-viet",
      order: 9,
    },
    {
      id: "trung-tam-phat-trien-robot-ai",
      title: "Trung tâm phát triển Robot & AI",
      slug: "trung-tam-phat-trien-robot-ai",
      description:
        "Nghiên cứu chế tạo các hệ thống cánh tay robot tự động hóa, xe tự hành (AGV) kết hợp trí tuệ nhân tạo nhận diện hình ảnh và tối ưu vận hành.",
      imageUrl:
        "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-800,q-85,f-auto",
      websiteUrl: "/solution/trung-tam-phat-trien-robot-ai",
      order: 10,
    },
    {
      id: "trung-tam-san-xuat-phim",
      title: "Trung Tâm Sản Xuất Phim",
      slug: "trung-tam-san-xuat-phim",
      description:
        "Sản xuất video clip giới thiệu dự án, quay phim khảo sát, flycam sự kiện chuyên nghiệp với trang thiết bị hiện đại hàng đầu.",
      imageUrl: "https://vdcd.vn/wp-content/uploads/2025/10/75474-768x576.jpg",
      websiteUrl: "/solution/trung-tam-san-xuat-phim",
      order: 11,
    },
    {
      id: "trung-tam-nghien-cuu-va-phat-trien-san-pham-rd",
      title: "Trung tâm nghiên cứu và phát triển sản phẩm R&D",
      slug: "trung-tam-nghien-cuu-va-phat-trien-san-pham-rd",
      description:
        "Đội ngũ chuyên gia chuyên nghiên cứu phát triển các sản phẩm phần cứng và giải pháp công nghệ mới bắt kịp xu hướng thế giới.",
      imageUrl:
        "https://vdcd.vn/wp-content/uploads/2024/03/64576458-768x512.jpg",
      websiteUrl: "/solution/trung-tam-nghien-cuu-va-phat-trien-san-pham",
      order: 12,
    },
  ],
  developmentOrientations: [
    {
      title: "Phát triển hạ tầng dữ liệu và công nghệ dùng chung",
      description:
        "Lập mô hình 3D số hóa không gian, chuẩn hóa hệ thống GIS và vận hành điện toán đám mây phục vụ dữ liệu số toàn tỉnh.",
      icon: "database",
      order: 1,
    },
    {
      title: "Thúc đẩy ứng dụng công nghệ trong các ngành kinh tế chủ lực",
      description:
        "Cung cấp hệ thống giám sát IOC/DOC, tự động hóa AutoTimelapse và nền tảng Digital Twin hỗ trợ quản trị và vận hành.",
      icon: "cpu",
      order: 2,
    },
    {
      title: "Hỗ trợ startup và doanh nghiệp đổi mới mô hình hoạt động",
      description:
        "Xây dựng mạng lưới liên kết giữa cơ quan quản lý, viện nghiên cứu, tập đoàn công nghệ và quỹ đầu tư trong nước.",
      icon: "rocket",
      order: 3,
    },
    {
      title:
        "Kết nối Gia Lai với mạng lưới chuyên gia, công nghệ và đầu tư trong nước",
      description:
        "Đào tạo nhân lực số chất lượng cao, tư vấn chuyển đổi số và chuyển giao giải pháp cho doanh nghiệp địa phương.",
      icon: "globe",
      order: 4,
    },
  ],
  ctaSection: {
    badge: "Tầm nhìn & Sứ mệnh",
    title: "CHUYỂN ĐỔI SỐ TƯƠNG LAI CỦA BẠN",
    description:
      "Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ tối ưu nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa bàn tỉnh.",
    buttonText: "Liên hệ hợp tác",
    buttonLink: "/contact",
    secondaryButtonText: "Khám phá giải pháp",
    secondaryButtonLink: "#",
    subtext: "Kiến tạo tương lai số bền vững cho doanh nghiệp và cộng đồng.",
  },
  updatedAt: "2026-08-31T20:04:50.107Z",
};
