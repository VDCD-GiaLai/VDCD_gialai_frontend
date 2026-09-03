export interface WorkflowStage {
  number: string;
  title: string;
  titleEn: string;
  description: string;
  image: string;
}

export interface ProjectGalleryImage {
  src: string;
  caption: string;
  size: "large" | "small";
}

export interface ProjectTechnicalHighlight {
  label: string;
  value: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  publishedAt: string;
}

export interface RelatedProject {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  year?: number;
  field?: { id: string; name: string; slug: string };
}

export interface ProjectEntry {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  coverImage: string;
  layout: "landscape-full" | "landscape-half" | "portrait";
  overview?: string;
  challenge?: string;
  challengeImage?: string;
  services?: string[];
  discipline?: string;
  galleryImages: ProjectGalleryImage[];
  technicalHighlights?: ProjectTechnicalHighlight[];
  transformationBefore?: string;
  transformationAfter?: string;
  nextProjectSlug?: string | null;
  relatedArticles?: RelatedArticle[];
  relatedProjects?: RelatedProject[];
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    number: "01",
    title: "Khảo Sát & Đo Đạc",
    titleEn: "Survey & Measurement",
    description:
      "Ứng dụng UAV bay quét độ cao và LiDAR để thu thập dữ liệu không gian địa hình chuẩn xác.",
    image: "/images/home/hethongdothiso.jpg",
  },
  {
    number: "02",
    title: "Xử Lý Dữ Liệu",
    titleEn: "Data Processing",
    description:
      "Tái tạo mô hình 3D Mesh, đám mây điểm Point Cloud và xây dựng bản đồ địa hình số 1/500.",
    image: "/images/home/farm_area_drone_view.jpg",
  },
  {
    number: "03",
    title: "Tích Hợp Hệ Thống",
    titleEn: "System Integration",
    description:
      "Đưa dữ liệu lên nền tảng 3DGIS, liên kết các cảm biến IoT và camera giám sát thời gian thực.",
    image: "/images/home/data_center.jpg",
  },
  {
    number: "04",
    title: "Bàn Giao & Vận Hành",
    titleEn: "Handover & Operation",
    description:
      "Chuyển giao nền tảng số, đào tạo vận hành và hỗ trợ bảo trì liên tục cho các đối tác.",
    image: "/images/home/kientaotuonglai.jpeg",
  },
];

export const PROJECTS_DATA: ProjectEntry[] = [
  {
    id: "becamex-binh-duong",
    title: "Tòa nhà Becamex Bình Dương",
    category: "Nông nghiệp công nghệ cao",
    location: "Gia Lai",
    year: "2023",
    description:
      "AutoTimelapse đồng hành cùng Becamex Tower Bình Dương – giải pháp giám sát công trình cao tầng hiện đại, nền tảng cho đô thị thông minh.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2024/03/hinh-anh-du-an-becamex2-atl-1024x683-1.jpeg",
    layout: "landscape-full",
    overview:
      "AutoTimelapse đồng hành cùng Becamex Tower Bình Dương – giải pháp giám sát công trình cao tầng hiện đại, nền tảng cho đô thị thông minh.",
    challenge:
      "Becamex Tower là tòa nhà biểu tượng của thành phố mới Bình Dương. Thách thức thi công cao tầng đòi hỏi giải pháp AutoTimelapse – công nghệ điều hành công trình hiện đại, giám sát toàn diện từ móng đến hoàn thiện.",
    services: [
      "AutoTimelapse cao tầng",
      "Giám sát thi công 24/7",
      "Phân tích tiến độ AI",
      "Báo cáo so sánh kế hoạch – thực tế",
    ],
    discipline: "Giám sát cao tầng",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/hinh-anh-du-an-becamex2-atl-1024x683-1.jpeg",
        caption: "Tòa nhà Becamex Bình Dương",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "TP. Bình Dương",
      },
      {
        label: "Loại hình",
        value: "Văn phòng TM–DV",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Giám sát",
        value: "24/7",
      },
      {
        label: "Ứng dụng",
        value: "Đô thị thông minh",
      },
      {
        label: "Chủ đầu tư",
        value: "Becamex IDC",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/hinh-anh-du-an-becamex2-atl-1024x683-1.jpeg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/hinh-anh-du-an-becamex2-atl-1024x683-1.jpeg",
    nextProjectSlug: "the-terra-an-hung",
  },
  {
    id: "sun-marina-ha-long",
    title: "Sun Marina Hạ Long",
    category: "Nông nghiệp công nghệ cao",
    location: "Gia Lai",
    year: "2024",
    description:
      "AutoTimelapse triển khai tại khu đô thị Sun Marina Hạ Long – giải pháp giám sát toàn diện cho đô thị ven biển hiện đại.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2024/03/13632_12-11-2025-11-30-00-1-1-scaled.jpg",
    layout: "landscape-full",
    overview:
      "AutoTimelapse triển khai tại khu đô thị Sun Marina Hạ Long – giải pháp giám sát toàn diện cho đô thị ven biển hiện đại.",
    challenge:
      "Sun Marina Hạ Long nằm trong vịnh Hạ Long — di sản thiên nhiên thế giới. Công trình xây dựng phải tuân thủ nghiêm ngặt các quy định bảo vệ môi trường, đồng thời đảm bảo tiến độ thi công trong điều kiện khí hậu biển.",
    services: [
      "AutoTimelapse ven biển",
      "Giám sát môi trường xung quanh",
      "Video marketing timelapse",
      "Báo cáo tiến độ trực tuyến",
    ],
    discipline: "Giám sát công trình ven biển",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/13632_12-11-2025-11-30-00-1-1-scaled.jpg",
        caption: "Sun Marina Hạ Long",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Vịnh Hạ Long",
      },
      {
        label: "Chủ đầu tư",
        value: "Sun Group",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Giám sát",
        value: "24/7",
      },
      {
        label: "Loại hình",
        value: "Khu đô thị",
      },
      {
        label: "Đặc thù",
        value: "Ven biển",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/13632_12-11-2025-11-30-00-1-1-scaled.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/13632_12-11-2025-11-30-00-1-1-scaled.jpg",
    nextProjectSlug: "son-tra-da-nang",
  },
  {
    id: "san-bay-van-don",
    title: "Sân bay Vân Đồn",
    category: "Nông nghiệp công nghệ cao",
    location: "Gia Lai",
    year: "2023",
    description:
      "Khảo sát địa hình và ứng dụng công nghệ LiDAR Scan tại Sân bay Vân Đồn. Trọn gói sản phẩm trắc địa gồm bản vẽ 2D, 3D, VR360.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/467741379_1104256805040992_4651998732288142886_n-1024x512-1.jpg",
    layout: "landscape-full",
    overview:
      "Khảo sát địa hình và ứng dụng công nghệ LiDAR Scan tại Sân bay Vân Đồn. Trọn gói sản phẩm trắc địa gồm bản vẽ 2D, 3D, VR360.",
    challenge:
      "Sân bay Vân Đồn là sân bay tư nhân đầu tiên tại Việt Nam. Quy mô xây dựng rộng lớn yêu cầu khảo sát đa điểm với ứng dụng công nghệ LiDAR Scan, bao phủ toàn bộ khu vực đường băng, nhà ga và hạ tầng phụ trợ.",
    services: [
      "Khảo sát thành lập bản vẽ 2D",
      "Khảo sát thành lập bản vẽ 3D",
      "Bản vẽ địa hình 1/500",
      "VR360 toàn cảnh",
      "Ứng dụng LiDAR Scan",
    ],
    discipline: "Trắc địa hạ tầng hàng không",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/467741379_1104256805040992_4651998732288142886_n-1024x512-1.jpg",
        caption: "Sân bay Vân Đồn",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Diện tích",
        value: "325 ha",
      },
      {
        label: "Công nghệ",
        value: "LiDAR Scan",
      },
      {
        label: "Sản phẩm",
        value: "2D, 3D, VR360",
      },
      {
        label: "Tỷ lệ bản đồ",
        value: "1/500",
      },
      {
        label: "Chủ đầu tư",
        value: "Sun Group",
      },
      {
        label: "Hình ảnh",
        value: "10 bộ",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/467321399_1099508478849158_37644.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/Screenshot_3-edited.png",
    nextProjectSlug: "san-bay-quoc-te-phu-quoc",
  },
  {
    id: "san-bay-quoc-te-phu-quoc",
    title: "Sân Bay Quốc Tế Phú Quốc",
    category: "Nông nghiệp công nghệ cao",
    location: "Gia Lai",
    year: "2023",
    description:
      "VDCD triển khai giải pháp AutoTimelapse giám sát công trình tại cảng hàng không quốc tế Phú Quốc – cửa ngõ du lịch hàng đầu Việt Nam.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2024/03/cang-hkqt-phu-quoc-1750338379-62.jpg",
    layout: "landscape-full",
    overview:
      "VDCD triển khai giải pháp AutoTimelapse giám sát công trình tại cảng hàng không quốc tế Phú Quốc – cửa ngõ du lịch hàng đầu Việt Nam.",
    challenge:
      "Cảng hàng không quốc tế Phú Quốc vận hành song song với giai đoạn mở rộng. Hệ thống giám sát phải đảm bảo an toàn hàng không tuyệt đối, không gây ảnh hưởng đến hoạt động bay. Công nghệ tiên tiến cho giám sát công trình hiệu quả.",
    services: [
      "AutoTimelapse an toàn hàng không",
      "Giám sát mở rộng nhà ga",
      "Video timelapse quảng bá",
      "Hỗ trợ chuyên nghiệp",
    ],
    discipline: "Giám sát hạ tầng hàng không",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/cang-hkqt-phu-quoc-1750338379-62.jpg",
        caption: "Sân Bay Quốc Tế Phú Quốc",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Phú Quốc",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "An toàn",
        value: "ICAO cấp 4E",
      },
      {
        label: "Giám sát",
        value: "24/7",
      },
      {
        label: "Loại hình",
        value: "Sân bay quốc tế",
      },
      {
        label: "Chất lượng",
        value: "Cam kết chuyên nghiệp",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/cang-hkqt-phu-quoc-1750338379-62.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/cang-hkqt-phu-quoc-1750338379-62.jpg",
    nextProjectSlug: "nha-hat-ho-tay",
  },
  {
    id: "dien-gio-phong-nguyen-phong-huy-quang-tri",
    title: "Điện gió Phong Nguyên Quảng Trị",
    category: "Nông nghiệp công nghệ cao",
    location: "Gia Lai",
    year: "2023",
    description:
      "AutoTimelapse tối ưu giám sát công trình điện gió Phong Nguyên Phong Huy Quảng Trị – theo dõi tiến độ xây dựng turbine gió quy mô lớn.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/hinh-anh-dien-gio-quang-tri-atl.webp",
    layout: "landscape-full",
    overview:
      "AutoTimelapse tối ưu giám sát công trình điện gió Phong Nguyên Phong Huy Quảng Trị – theo dõi tiến độ xây dựng turbine gió quy mô lớn.",
    challenge:
      "Dự án điện gió Phong Nguyên Phong Huy tại Quảng Trị triển khai trên địa hình đồi núi rộng lớn. Giám sát xây dựng turbine gió ở độ cao lớn đòi hỏi hệ thống camera chịu gió mạnh và truyền dữ liệu ổn định.",
    services: [
      "AutoTimelapse công trình điện gió",
      "Giám sát tiến độ xây lắp turbine",
      "Video timelapse dự án năng lượng",
      "Báo cáo tiến độ",
    ],
    discipline: "Giám sát năng lượng tái tạo",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/hinh-anh-dien-gio-quang-tri-atl.webp",
        caption: "Điện gió Phong Nguyên Quảng Trị",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Quảng Trị",
      },
      {
        label: "Loại hình",
        value: "Điện gió",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Đặc thù",
        value: "Chịu gió mạnh",
      },
      {
        label: "Giám sát",
        value: "24/7",
      },
      {
        label: "Năng lượng",
        value: "Tái tạo",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/11/chi-phi-quay-timelapse-1-e1665396002939.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2025/11/hinh-anh-dien-gio-quang-tri-atl.webp",
    nextProjectSlug: "cao-oc-thuong-mai-hai-phong",
  },
  {
    id: "cao-oc-thuong-mai-hai-phong",
    title: "Cao Ốc Thương Mại Hải Phòng",
    category: "Nông nghiệp công nghệ cao",
    location: "Gia Lai",
    year: "2024",
    description:
      "Thiết kế cao ốc thương mại Hải Phòng – dự án thiết kế kiến trúc số với phối cảnh ban ngày và ban đêm ấn tượng.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/10/bandem02_dd69a81dbb584714a217e6e18854faf2_master-1-1.jpg",
    layout: "landscape-full",
    overview:
      "Thiết kế cao ốc thương mại Hải Phòng – dự án thiết kế kiến trúc số với phối cảnh ban ngày và ban đêm ấn tượng.",
    challenge:
      "Thiết kế cao ốc thương mại tại Hải Phòng yêu cầu phối cảnh kiến trúc 3D chất lượng cao cho cả ban ngày và ban đêm, phục vụ trình bày với nhà đầu tư và xin giấy phép xây dựng.",
    services: [
      "Thiết kế kiến trúc 3D",
      "Phối cảnh ban ngày",
      "Phối cảnh ban đêm",
      "Render chất lượng cao",
    ],
    discipline: "Thiết kế kiến trúc số",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/10/bandem02_dd69a81dbb584714a217e6e18854faf2_master-1-1.jpg",
        caption: "Cao Ốc Thương Mại Hải Phòng",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Hải Phòng",
      },
      {
        label: "Loại hình",
        value: "Cao ốc TM",
      },
      {
        label: "Sản phẩm",
        value: "3D Render",
      },
      {
        label: "Phối cảnh",
        value: "Ngày + Đêm",
      },
      {
        label: "Chất lượng",
        value: "8K Render",
      },
      {
        label: "Lĩnh vực",
        value: "Thiết kế số",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/10/banngay01_1f0f4785d29046d19e06af1ef0ef7f19_master-1.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2025/10/bandem02_dd69a81dbb584714a217e6e18854faf2_master-1-1.jpg",
    nextProjectSlug: "benh-vien-da-chien-ha-noi",
  },
  {
    id: "bai-xep-phu-yen",
    title: "Bãi Xép – Phú Yên",
    category: "Nông nghiệp công nghệ cao",
    location: "Phú Yên",
    year: "2024",
    description:
      "Khảo sát địa hình 1/500 chi tiết dự án Bãi Xép – Phú Yên. Trọn gói sản phẩm trắc địa phục vụ thiết kế xây dựng khu du lịch ven biển.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_1-copy1-1024x722-1.jpg",
    layout: "landscape-full",
    overview:
      "Khảo sát địa hình 1/500 chi tiết dự án Bãi Xép – Phú Yên. Trọn gói sản phẩm trắc địa phục vụ thiết kế xây dựng khu du lịch ven biển.",
    challenge:
      "Bãi Xép là điểm du lịch nổi tiếng tại Phú Yên với bờ biển hoang sơ. Khảo sát địa hình phục vụ thiết kế xây dựng khu du lịch đòi hỏi độ chính xác cao trên địa hình ven biển đá ghềnh phức tạp.",
    services: [
      "Sản phẩm bản vẽ 2D",
      "Bản vẽ 1/500 chi tiết",
      "Mô hình 3D",
      "VR 360 toàn cảnh",
    ],
    discipline: "Trắc địa & Khảo sát ven biển",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_1-copy1-1024x722-1.jpg",
        caption: "Bãi Xép – Phú Yên",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Bãi Xép, Phú Yên",
      },
      {
        label: "Sản phẩm",
        value: "2D, 3D, VR360",
      },
      {
        label: "Tỷ lệ",
        value: "1/500",
      },
      {
        label: "Công nghệ",
        value: "Flycam",
      },
      {
        label: "Mục đích",
        value: "Thiết kế XD",
      },
      {
        label: "Địa hình",
        value: "Ven biển đá",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_1-copy1-1024x722-1.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/Screenshot_3-min-1024x537-1.png",
    nextProjectSlug: "van-phong-khanh-hoa",
  },
  {
    id: "van-phong-khanh-hoa",
    title: "Vân Phong – Khánh Hòa",
    category: "Nông nghiệp công nghệ cao",
    location: "Khánh Hòa",
    year: "2024",
    description:
      "Khảo sát địa hình dự án Vân Phong – Khánh Hòa. Trọn gói sản phẩm trắc địa toàn diện phục vụ quy hoạch khu kinh tế chiến lược.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/L1003913-1-1024x683-1.jpg",
    layout: "landscape-full",
    overview:
      "Khảo sát địa hình dự án Vân Phong – Khánh Hòa. Trọn gói sản phẩm trắc địa toàn diện phục vụ quy hoạch khu kinh tế chiến lược.",
    challenge:
      "Khu kinh tế Vân Phong nằm ở phía Bắc tỉnh Khánh Hòa, với tổng quy mô các dự án lên đến hàng nghìn hecta. Bay quét địa hình được tiến hành với mục đích thu hình ảnh tổng quan về khu vực, phục vụ việc định hướng quy hoạch và lên concept cho các mục tiêu thiết kế về sau.",
    services: [
      "Khảo sát thành lập bản vẽ 2D",
      "Khảo sát thành lập bản vẽ 3D",
      "Bản vẽ địa hình 1/500",
      "Bay quét Drone chuyên nghiệp",
    ],
    discipline: "Khảo sát địa hình & Trắc địa",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/L1003913-1-1024x683-1.jpg",
        caption: "Vân Phong – Khánh Hòa",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Diện tích khảo sát",
        value: "Hàng nghìn ha",
      },
      {
        label: "Địa hình cấp 1",
        value: "600 ha/ngày",
      },
      {
        label: "Địa hình cấp 6",
        value: "100 ha/ngày",
      },
      {
        label: "Sản phẩm bàn giao",
        value: "2D, 3D, 1/500",
      },
      {
        label: "Công nghệ",
        value: "Drone + LiDAR",
      },
      {
        label: "Chủ đầu tư",
        value: "Sun Group",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/11/L1003913-1-1024x683-1.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2025/11/z6246996465902_d2b58a023e87326b3d6b828d09049fa4-1024x618-1.jpg",
    nextProjectSlug: "lotte-mall-vo-chi-cong",
  },
  {
    id: "thap-ba-ponagar",
    title: "Tháp Bà Ponagar",
    category: "Nông nghiệp công nghệ cao",
    location: "Khánh Hòa",
    year: "2024",
    description:
      "Khảo sát địa hình khu di tích Tháp Bà Ponagar – Nha Trang. Trọn gói sản phẩm trắc địa gồm bản vẽ 2D, mô hình 3D, bản đồ 1/500 và VR360.",
    coverImage: "https://vdcd.vn/wp-content/uploads/2025/11/11-1024x680-1.png",
    layout: "landscape-full",
    overview:
      "Khảo sát địa hình khu di tích Tháp Bà Ponagar – Nha Trang. Trọn gói sản phẩm trắc địa gồm bản vẽ 2D, mô hình 3D, bản đồ 1/500 và VR360.",
    challenge:
      "Tháp Bà Ponagar là di tích lịch sử cấp quốc gia với hơn 1.000 năm tuổi. Việc khảo sát và số hóa phải đảm bảo không gây ảnh hưởng đến kiến trúc cổ, đồng thời cung cấp dữ liệu chính xác về hiện trạng công trình.",
    services: [
      "Khảo sát thành lập bản vẽ 2D",
      "Khảo sát thành lập bản vẽ 3D",
      "Bản vẽ địa hình 1/500",
      "VR360 toàn cảnh",
    ],
    discipline: "Bảo tồn di sản & Trắc địa",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/11-1024x680-1.png",
        caption: "Tháp Bà Ponagar",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Niên đại di tích",
        value: "1.000+ năm",
      },
      {
        label: "Sản phẩm",
        value: "2D, 3D, VR360",
      },
      {
        label: "Tỷ lệ bản đồ",
        value: "1/500",
      },
      {
        label: "Mô hình 3D",
        value: "Point Cloud HD",
      },
      {
        label: "VR360",
        value: "12K",
      },
      {
        label: "Công nghệ",
        value: "LiDAR + Drone",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/11/11-1024x680-1.png",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/3d-thap-ba-ponagar.png",
    nextProjectSlug: "sun-marina-ha-long",
  },
  {
    id: "lotte-mall-vo-chi-cong",
    title: "Trung tâm thương mại Lotte Mall",
    category: "Nông nghiệp công nghệ cao",
    location: "Hà Nội",
    year: "2024",
    description:
      "Giám sát, quản lý công trình xây dựng Lotte Mall Võ Chí Công ứng dụng công nghệ cao. Theo dõi tiến độ thi công toàn diện.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2024/03/Lotte-Mall-1-1-1-scaled.jpg",
    layout: "landscape-full",
    overview:
      "Giám sát, quản lý công trình xây dựng Lotte Mall Võ Chí Công ứng dụng công nghệ cao. Theo dõi tiến độ thi công toàn diện.",
    challenge:
      "Lotte Mall Võ Chí Công là tổ hợp thương mại – dịch vụ – căn hộ quy mô lớn tại Tây Hồ, Hà Nội. Dự án yêu cầu giám sát liên tục 24/7 trên nhiều góc quay khác nhau, ghi nhận chính xác tiến độ từng hạng mục.",
    services: [
      "AutoTimelapse đa góc",
      "Video timelapse 4K",
      "Báo cáo tiến độ tự động",
      "Giám sát quản lý công trình",
    ],
    discipline: "Giám sát xây dựng",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/Lotte-Mall-1-1-1-scaled.jpg",
        caption: "Trung tâm thương mại Lotte Mall",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Tây Hồ, Hà Nội",
      },
      {
        label: "Loại hình",
        value: "Tổ hợp TM–DV",
      },
      {
        label: "Giám sát",
        value: "24/7",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Video",
        value: "4K UHD",
      },
      {
        label: "Chủ đầu tư",
        value: "Lotte Group",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/Lotte-Mall-1-1-1-scaled.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/481910989_2375973832761147_7242746415740845603_n-1.jpg",
    nextProjectSlug: "becamex-binh-duong",
  },
  {
    id: "the-terra-an-hung",
    title: "The Terra An Hưng",
    category: "Nông nghiệp công nghệ cao",
    location: "Hà Nội",
    year: "2023",
    description:
      "VDCD triển khai giám sát tự động tại The Terra An Hưng, giúp Văn Phú – Invest quản lý tiến độ số hóa và xây dựng đô thị thông minh.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/Thiet-ke-chua-co-ten-5-1.jpg",
    layout: "landscape-full",
    overview:
      "VDCD triển khai giám sát tự động tại The Terra An Hưng, giúp Văn Phú – Invest quản lý tiến độ số hóa và xây dựng đô thị thông minh.",
    challenge:
      "Dự án The Terra An Hưng là khu đô thị phức hợp với nhiều tòa nhà xây dựng song song. Thách thức lớn nhất là giám sát đồng thời nhiều hạng mục trên diện rộng và tích hợp dữ liệu vào hệ thống quản lý dự án.",
    services: [
      "AutoTimelapse đa điểm",
      "Tích hợp hệ thống quản lý",
      "Video timelapse quảng bá",
      "Báo cáo định kỳ tự động",
    ],
    discipline: "Giám sát đô thị thông minh",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/Thiet-ke-chua-co-ten-5-1.jpg",
        caption: "The Terra An Hưng",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Hà Đông, Hà Nội",
      },
      {
        label: "Chủ đầu tư",
        value: "Văn Phú – Invest",
      },
      {
        label: "Giám sát",
        value: "Đa điểm 24/7",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Tích hợp",
        value: "Quản lý dự án",
      },
      {
        label: "Loại hình",
        value: "Khu đô thị",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/the-terra-an-hung-1-1-1.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2025/11/Thiet-ke-chua-co-ten-5-1.jpg",
    nextProjectSlug: "thap-ba-ponagar",
  },
  {
    id: "nha-hat-ho-tay",
    title: "Nhà hát Hồ Tây",
    category: "Nông nghiệp công nghệ cao",
    location: "Hà Nội",
    year: "2024",
    description:
      "Lắp đặt hệ thống giám sát công trình AutoTimelapse cho dự án Nhà hát Hồ Tây – công trình văn hóa biểu tượng Hà Nội.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2024/03/Nha-Hat-Opera-Ha-Noi-1.jpeg",
    layout: "landscape-full",
    overview:
      "Lắp đặt hệ thống giám sát công trình AutoTimelapse cho dự án Nhà hát Hồ Tây – công trình văn hóa biểu tượng Hà Nội.",
    challenge:
      "Nhà hát Hồ Tây là dự án văn hóa biểu tượng của Hà Nội với kiến trúc phức tạp. Hệ thống AutoTimelapse cần ghi lại toàn bộ quá trình xây dựng với chất lượng hình ảnh cao nhất, phục vụ quản lý tiến độ và truyền thông.",
    services: [
      "AutoTimelapse giám sát công trình",
      "Ghi hình 24/7 chất lượng cao",
      "Báo cáo tiến độ tự động",
      "Video timelapse truyền thông",
    ],
    discipline: "Giám sát công trình văn hóa",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/Nha-Hat-Opera-Ha-Noi-1.jpeg",
        caption: "Nhà hát Hồ Tây",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Vị trí",
        value: "Hồ Tây, Hà Nội",
      },
      {
        label: "Loại hình",
        value: "Công trình văn hóa",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Giám sát",
        value: "24/7",
      },
      {
        label: "Chất lượng",
        value: "Video HD",
      },
      {
        label: "Ý nghĩa",
        value: "Biểu tượng Hà Nội",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/nha-hat-ho-tay.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/Nha-Hat-Opera-Ha-Noi-1.jpeg",
    nextProjectSlug: "le-dieu-binh-ky-niem-80-nam-quoc-khanh-viet-nam",
  },
  {
    id: "le-dieu-binh-ky-niem-80-nam-quoc-khanh-viet-nam",
    title: "Lễ Diễu binh 80 năm Quốc khánh",
    category: "Nông nghiệp công nghệ cao",
    location: "Hà Nội",
    year: "2025",
    description:
      "Việt-Flycam tự hào ghi dấu ấn bằng những thước phim trên cao cùng Đại lễ A80 – Lễ Diễu binh kỷ niệm 80 năm Quốc khánh Việt Nam.",
    coverImage: "https://vdcd.vn/wp-content/uploads/2024/03/Anh-40-1.jpg",
    layout: "landscape-full",
    overview:
      "Việt-Flycam tự hào ghi dấu ấn bằng những thước phim trên cao cùng Đại lễ A80 – Lễ Diễu binh kỷ niệm 80 năm Quốc khánh Việt Nam.",
    challenge:
      "Ghi hình đại lễ diễu binh kỷ niệm 80 năm Quốc khánh đòi hỏi bay drone chính xác trong không phận được kiểm soát nghiêm ngặt, với yêu cầu an ninh tuyệt đối và chất lượng hình ảnh điện ảnh.",
    services: [
      "Bay quay phim drone chuyên nghiệp",
      "Ghi hình sự kiện trên cao",
      "Hậu kỳ video điện ảnh",
      "Sản xuất phim tài liệu",
    ],
    discipline: "Sản xuất phim & Sự kiện",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/Anh-40-1.jpg",
        caption: "Lễ Diễu binh 80 năm Quốc khánh",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Sự kiện",
        value: "Đại lễ A80",
      },
      {
        label: "Địa điểm",
        value: "Quảng trường BĐ",
      },
      {
        label: "Công nghệ",
        value: "Drone cinema",
      },
      {
        label: "An ninh",
        value: "Cấp quốc gia",
      },
      {
        label: "Chất lượng",
        value: "4K Cinema",
      },
      {
        label: "Đơn vị",
        value: "Việt-Flycam",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/Anh-40-1.jpg",
    transformationAfter: "https://vdcd.vn/wp-content/uploads/2025/10/75474.jpg",
    nextProjectSlug: "sun-world-ba-na-hills",
  },
  {
    id: "benh-vien-da-chien-ha-noi",
    title: "Bệnh viện dã chiến Hà Nội",
    category: "Nông nghiệp công nghệ cao",
    location: "Hà Nội",
    year: "2021",
    description:
      "Thần tốc hoàn thiện bệnh viện dã chiến Hà Nội – VDCD là đơn vị cập nhật tiến độ thi công bệnh viện dã chiến phục vụ chống dịch COVID-19.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot-2025-11-12-161452-1.png",
    layout: "landscape-full",
    overview:
      "Thần tốc hoàn thiện bệnh viện dã chiến Hà Nội – VDCD là đơn vị cập nhật tiến độ thi công bệnh viện dã chiến phục vụ chống dịch COVID-19.",
    challenge:
      "Bệnh viện dã chiến Hà Nội được xây dựng thần tốc trong bối cảnh dịch COVID-19. VDCD cần triển khai hệ thống giám sát ngay lập tức để ghi lại toàn bộ quá trình xây dựng với tiến độ chạy đua thời gian.",
    services: [
      "AutoTimelapse giám sát thần tốc",
      "Cập nhật tiến độ real-time",
      "Video timelapse tài liệu",
      "Báo cáo tiến độ cho chính quyền",
    ],
    discipline: "Giám sát công trình khẩn cấp",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot-2025-11-12-161452-1.png",
        caption: "Bệnh viện dã chiến Hà Nội",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Bối cảnh",
        value: "COVID-19",
      },
      {
        label: "Tiến độ",
        value: "Thần tốc",
      },
      {
        label: "Giám sát",
        value: "Real-time",
      },
      {
        label: "Công nghệ",
        value: "AutoTimelapse",
      },
      {
        label: "Ý nghĩa",
        value: "Chống dịch",
      },
      {
        label: "Vị trí",
        value: "Hà Nội",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot-2025-11-12-161452-1.png",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot-2025-11-12-161452-1.png",
    nextProjectSlug: "bai-xep-phu-yen",
  },
  {
    id: "son-tra-da-nang",
    title: "Sơn Trà – Đà Nẵng",
    category: "Nông nghiệp công nghệ cao",
    location: "Đà Nẵng",
    year: "2025",
    description:
      "Trọn gói sản phẩm trắc địa toàn diện phục vụ xây dựng quy hoạch bán đảo Sơn Trà. Sản phẩm 2D, bản vẽ 1/500, mô hình 3D.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_76-min-1024x609-1.png",
    layout: "landscape-full",
    overview:
      "Trọn gói sản phẩm trắc địa toàn diện phục vụ xây dựng quy hoạch bán đảo Sơn Trà. Sản phẩm 2D, bản vẽ 1/500, mô hình 3D.",
    challenge:
      "Bán đảo Sơn Trà có địa hình phức tạp với rừng nguyên sinh và hệ sinh thái nhạy cảm. Việc khảo sát đòi hỏi bay quét drone chính xác trên địa hình đồi núi ven biển và xử lý dữ liệu lớn thành sản phẩm trắc địa phục vụ quy hoạch.",
    services: [
      "Sản phẩm bản vẽ 2D",
      "Bản vẽ 1/500 chi tiết",
      "Mô hình 3D",
      "Giải pháp trắc địa toàn diện",
    ],
    discipline: "Trắc địa & Quy hoạch",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_76-min-1024x609-1.png",
        caption: "Sơn Trà – Đà Nẵng",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Diện tích",
        value: "4,439 ha",
      },
      {
        label: "Sản phẩm",
        value: "2D, 3D, 1/500",
      },
      {
        label: "Công nghệ",
        value: "Drone + GNSS",
      },
      {
        label: "Địa hình",
        value: "Đồi núi ven biển",
      },
      {
        label: "Tỷ lệ",
        value: "1/500",
      },
      {
        label: "Mục đích",
        value: "Quy hoạch",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_76-min-1024x609-1.png",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/467126771_1099508525515820_4642314407752063642_n-1024x683-1.jpg",
    nextProjectSlug: "san-bay-van-don",
  },
  {
    id: "sun-world-ba-na-hills",
    title: "Sun World Bà Nà Hills",
    category: "Nông nghiệp công nghệ cao",
    location: "Đà Nẵng",
    year: "2024",
    description:
      "Scan 3D hiện trạng Khu du lịch Sun World Bà Nà Hills – Đà Nẵng. Trọn gói sản phẩm trắc địa gồm bản vẽ 2D, 3D và bản vẽ 1/500.",
    coverImage:
      "https://vdcd.vn/wp-content/uploads/2024/03/Screenshot-2024-07-04-100854-min.jpg",
    layout: "landscape-full",
    overview:
      "Scan 3D hiện trạng Khu du lịch Sun World Bà Nà Hills – Đà Nẵng. Trọn gói sản phẩm trắc địa gồm bản vẽ 2D, 3D và bản vẽ 1/500.",
    challenge:
      "Khu du lịch Sun World Bà Nà Hills nằm trên đỉnh núi Bà Nà ở độ cao 1.489m. Việc scan 3D toàn bộ khu vực đòi hỏi bay drone trong điều kiện thời tiết núi cao với gió mạnh, sương mù và mưa bất chợt.",
    services: [
      "Scan 3D hiện trạng",
      "Sản phẩm bản vẽ 2D",
      "Bản vẽ 1/500 chi tiết",
      "Mô hình 3D toàn khu vực",
    ],
    discipline: "Trắc địa & Scan 3D",
    galleryImages: [
      {
        src: "https://vdcd.vn/wp-content/uploads/2024/03/Screenshot-2024-07-04-100854-min.jpg",
        caption: "Sun World Bà Nà Hills",
        size: "large",
      },
    ],
    technicalHighlights: [
      {
        label: "Độ cao",
        value: "1,489 m",
      },
      {
        label: "Công nghệ",
        value: "Scan 3D",
      },
      {
        label: "Sản phẩm",
        value: "2D, 3D, 1/500",
      },
      {
        label: "Chủ đầu tư",
        value: "Sun Group",
      },
      {
        label: "Hình ảnh",
        value: "7 bộ",
      },
      {
        label: "Đặc thù",
        value: "Địa hình núi cao",
      },
    ],
    transformationBefore:
      "https://vdcd.vn/wp-content/uploads/2024/03/Screenshot-2024-07-04-100854-min.jpg",
    transformationAfter:
      "https://vdcd.vn/wp-content/uploads/2024/03/Screenshot_72-min-1024x593-1.png",
    nextProjectSlug: "dien-gio-phong-nguyen-phong-huy-quang-tri",
  },
];

export function getProjectById(id: string): ProjectEntry | undefined {
  return PROJECTS_DATA.find((p) => p.id === id);
}

export function getNextProject(currentId: string): ProjectEntry | undefined {
  const current = getProjectById(currentId);
  if (!current?.nextProjectSlug) return undefined;
  return getProjectById(current.nextProjectSlug);
}
