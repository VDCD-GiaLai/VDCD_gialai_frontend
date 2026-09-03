export interface SolutionDetailSection {
  title: string;
  description?: string;
  points?: string[];
  imageUrl?: string;
  layout?:
    | "prose"
    | "split-image"
    | "numbered-steps"
    | "card-grid"
    | "icon-list"
    | "full-width-image"
    | "stats-bar";
}

export interface SolutionDetail {
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  introText: string;
  sections: SolutionDetailSection[];
  accentColor?: string;
  galleryImages?: string[];
}

export const SOLUTION_DETAILS: Record<string, SolutionDetail> = {
  uav: {
    slug: "uav",
    title: "Khảo Sát Địa Hình Bằng Flycam UAV Tại Gia Lai",
    subtitle: "Cùng VDCD Gia Lai tìm hiểu về khảo sát địa hình bằng Flycam UAV",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh_bang_flycam.png?tr=w-1600,q-85,f-auto",
    introText:
      "Khảo sát địa hình bằng flycam là phương pháp sử dụng máy bay không người lái (UAV) để thu thập hình ảnh và dữ liệu không gian của khu vực cần khảo sát. Dữ liệu sau đó được xử lý bằng phần mềm chuyên dụng để tạo ra các sản phẩm bản đồ hoặc mô hình phục vụ công việc. So với cách khảo sát chỉ dựa vào thiết bị đo đạc mặt đất, UAV có khả năng bao quát khu vực rộng trong thời gian tương đối ngắn. Đây là lợi thế đáng chú ý đối với những công trình có diện tích lớn hoặc địa hình phức tạp.",
    accentColor: "#ea580c",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh_bang_flycam.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_don_vi_khao_sat_dia_hinh.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_dich_vu_khao_sat_dia_hinh.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh_bang_uav.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/quet_3d.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_quet_3d.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Vai trò của công nghệ UAV trong đo đạc trắc địa",
        description:
          "Trắc địa là lĩnh vực liên quan đến việc xác định vị trí, tọa độ, độ cao, hình dạng, kích thước và hướng của địa hình cũng như các đối tượng trên bề mặt Trái đất. Dữ liệu trắc địa là cơ sở quan trọng cho nhiều hoạt động xây dựng và quản lý đất đai.",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_don_vi_khao_sat_dia_hinh.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Nguồn dữ liệu trực quan: Khi kết hợp UAV với quy trình xử lý dữ liệu số, việc khảo sát có thể tạo ra nguồn dữ liệu trực quan hơn về hiện trạng khu vực.",
          "Hỗ trợ nhiều bước của dự án: Doanh nghiệp có thể sử dụng kết quả khảo sát để hỗ trợ kiểm tra diện tích, lập bản đồ, thiết kế, quy hoạch hoặc chuẩn bị dữ liệu cho các bước tiếp theo.",
          "Năng lực chuyên môn cao: Một đơn vị khảo sát có chuyên môn không chỉ cần thiết bị bay mà còn phải có khả năng lập kế hoạch thu thập dữ liệu, kiểm soát chất lượng và xử lý kết quả chuẩn xác.",
        ],
      },
      {
        title: "2. Quy trình khảo sát địa hình bằng flycam 4 bước chuẩn hóa",
        description:
          "Một quy trình khảo sát hiệu quả cần được xây dựng dựa trên mục tiêu sử dụng dữ liệu ngay từ đầu. Việc xác định rõ yêu cầu giúp lựa chọn thiết bị, phương án thu thập và định dạng đầu ra phù hợp.",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_dich_vu_khao_sat_dia_hinh.png?tr=w-1000,q-85,f-auto",
        layout: "numbered-steps",
        points: [
          "Bước 1: Xác định mục đích và phạm vi khảo sát: Kỹ thuật viên trao đổi với chủ đầu tư để xác định mục tiêu dự án (khảo sát hiện trạng, thành lập bản đồ, thiết kế, quy hoạch hoặc xây dựng). Từ đó xác định phạm vi khu vực, loại dữ liệu cần thu thập và sản phẩm đầu ra để tối ưu chi phí.",
          "Bước 2: Thu thập tài liệu và thông tin khu vực: Tiếp nhận giấy tờ thửa đất, ranh giới, tài liệu thiết kế, yêu cầu tỷ lệ bản đồ và định dạng dữ liệu đầu vào trước khi triển khai.",
          "Bước 3: Tiến hành bay chụp và thu thập dữ liệu: Vận hành UAV theo phương án bay đã xây dựng nhằm thu thập hình ảnh và dữ liệu toàn bộ khu vực. Kỹ thuật viên kiểm soát nghiêm túc các mốc khống chế mặt đất GCP.",
          "Bước 4: Xử lý dữ liệu và xuất sản phẩm: Xử lý dữ liệu hình ảnh thành bản đồ số 2D, 3D, bản đồ địa hình theo tỷ lệ 1/500, 1/2.000, 1/5.000, dữ liệu ảnh VR 360 Panorama và nền tảng lưu trữ số hóa.",
        ],
      },
      {
        title: "3. Khi nào nên sử dụng dịch vụ khảo sát địa hình bằng flycam?",
        description:
          "Dịch vụ khảo sát bằng UAV phù hợp với những đơn vị cần thu thập dữ liệu địa hình nhưng chưa có đầy đủ thiết bị hoặc nhân sự chuyên môn. Thay vì đầu tư toàn bộ hệ thống, doanh nghiệp có thể thuê đơn vị chuyên nghiệp thực hiện theo từng dự án.",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh_bang_uav.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Khảo sát nhanh địa bàn rộng: Khảo sát các công trình có diện tích lớn hoặc địa hình phức tạp trong thời gian ngắn.",
          "Chuẩn bị dữ liệu thi công xây dựng: Hỗ trợ đắc lực công tác đánh giá mặt bằng, thiết kế san lấp và lập phương án thi công.",
          "Tối ưu chi phí đầu tư: Tiếp cận công nghệ đo đạc hiện đại nhất mà không cần chi phí mua sắm thiết bị tốn kém.",
          "Kết hợp đa thiết bị: Tích hợp máy thủy bình, máy toàn đạc điện tử, máy định vị vệ tinh GPS RTK để đáp ứng mọi yêu cầu đo đạc khắt khe.",
        ],
      },
      {
        title: "4. Ứng dụng của khảo sát địa hình bằng UAV tại Gia Lai",
        description:
          "Dữ liệu thu thập từ UAV được xử lý thành nhiều dạng sản phẩm phục vụ công tác thiết kế, quy hoạch và xây dựng:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/quet_3d.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Thành lập bản đồ địa hình: Biên tập theo các tỷ lệ 1/500, 1/2.000, 1/5.000 phục vụ nghiên cứu và đánh giá hiện trạng khu vực.",
          "Thành lập bản đồ số 2D: Thể hiện trực quan hiện trạng trên mặt bằng với độ phân giải siêu cao.",
          "Xây dựng dữ liệu không gian 3D: Tái hiện mô hình 3 chiều giúp người dùng có góc nhìn trực quan về địa hình và công trình hiện hữu.",
          "Hỗ trợ thiết kế và san lấp: Phân tích độ cao, tính toán khối lượng đào đắp cho các dự án san lấp và xây dựng dân dụng.",
          "Số hóa và lưu trữ dữ liệu: Lưu trữ trên nền tảng đám mây và xử lý hình ảnh VR 360 Panorama phục vụ tra cứu lâu dài.",
        ],
      },
      {
        title:
          "5. Trung tâm Đổi mới sáng tạo Gia Lai cung cấp những giải pháp nào?",
        description:
          "Trung tâm Đổi mới sáng tạo Gia Lai giới thiệu nhóm giải pháp máy bay không người lái phục vụ bay quét 3D, trắc địa số và thành lập bản đồ cho các lĩnh vực địa chính, thiết kế, san lấp, duyệt quy hoạch, xây dựng dân dụng và bảo tồn di sản.",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_quet_3d.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Quét 2D - 3D bằng UAV chuyên dụng độ chính xác centimet.",
          "Thành lập bản đồ số 2D và mô hình không gian 3D Mesh.",
          "Biên tập bản đồ địa hình chuẩn mực theo tọa độ VN-2000.",
          "Xử lý dữ liệu hình ảnh VR 360 Panorama và nền tảng lưu trữ hiển thị số.",
        ],
      },
      {
        title: "6. Những yếu tố cần lưu ý khi khảo sát địa hình bằng flycam",
        description:
          "Các lưu ý quan trọng để đảm bảo chất lượng sản phẩm khảo sát và kiểm soát chi phí:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_quet_3d.png?tr=w-1000,q-85,f-auto",
        layout: "card-grid",
        points: [
          "Xác định rõ mục đích sử dụng: Phục vụ quy hoạch sẽ có yêu cầu khác với thiết kế, san lấp hoặc quản lý hiện trạng.",
          "Lựa chọn đơn vị chuyên nghiệp: Đội ngũ có kinh nghiệm vận hành UAV, năng lực xử lý dữ liệu và cung cấp đúng định dạng đầu ra.",
          "Thống nhất phạm vi & Sản phẩm bàn giao: Trao đổi cụ thể từ đầu giúp chủ đầu tư dễ kiểm soát tiến độ cũng như chi phí dự án.",
        ],
      },
    ],
  },
  ai: {
    slug: "ai",
    title: "Trung Tâm Phát Triển Robot AI Tại Gia Lai",
    subtitle: "Cùng VDCD Gia Lai tìm hiểu về Trung Tâm Phát Triển Robot AI",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-1600,q-85,f-auto",
    introText:
      "Trung tâm Phát triển Robot AI là đơn vị chuyên môn tập trung vào nghiên cứu, chế tạo và ứng dụng các giải pháp tự động hóa thông minh kết hợp trí tuệ nhân tạo. Đơn vị hướng đến việc giải quyết các bài toán thực tế trong sản xuất, nông nghiệp công nghệ cao, logistics và đào tạo nhân lực công nghệ cho khu vực Tây Nguyên.",
    accentColor: "#6366f1",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_ai.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ung_dung_ai.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Mục tiêu và Định hướng phát triển Robot AI",
        description:
          "Trung tâm xây dựng lộ trình nghiên cứu và phát triển toàn diện:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_ai.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Nghiên cứu và phát triển robot thông minh tích hợp AI: Làm chủ thiết kế cơ khí chính xác và thuật toán điều khiển nhúng.",
          "Xây dựng các mô hình robot phục vụ nghiên cứu và đào tạo: Cung cấp nền tảng thực hành cho học viên, sinh viên và kỹ sư.",
          "Nghiên cứu khả năng tương tác giữa người và robot (HMI): Nâng cao tính an toàn và tiện lợi khi làm việc cùng robot.",
          "Ứng dụng AI vào điều khiển và tự động hóa robot: Điều hướng thông minh, tự tránh chướng ngại vật và tối ưu quỹ đạo di chuyển.",
          "Thử nghiệm các giải pháp robot trong môi trường thực tế: Đưa robot vào các nhà xưởng chế biến nông sản và kho bãi.",
        ],
      },
      {
        title: "2. Các nhóm giải pháp Robot và Tự động hóa thông minh",
        description:
          "Làm chủ từ khâu thiết kế phần cứng cơ khí, mạch điều khiển đến thuật toán phần mềm:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ung_dung_ai.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Xe tự hành AGV/AMR trong nhà xưởng: Định vị SLAM & LiDAR, nhận diện vật cản và tự động vận chuyển hàng hóa 24/7.",
          "Cánh tay robot công nghiệp: Tự động hóa các khâu gắp đặt, đóng gói, phân loại và hàn cơ khí chính xác.",
          "Hệ thống điều khiển tập trung Fleet Management: Giám sát lộ trình, trạng thái pin và điều phối nhiều robot cùng hoạt động tối ưu.",
        ],
      },
      {
        title: "3. Ứng dụng Thị giác máy tính AI và Không gian FPT AI Campus",
        description:
          "Môi trường kết nối đào tạo, nghiên cứu chuyên sâu và chuyển giao tri thức cho địa phương:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Camera AI phân loại nông sản: Nhận diện độ chín, kích thước và phát hiện khuyết tật trên băng chuyền tự động >99%.",
          "Hạ tầng máy chủ GPU phục vụ huấn luyện mô hình thị giác máy tính và robot.",
          "Kết nối đào tạo và nghiên cứu chuyên sâu với các trường đại học, viện công nghệ hàng đầu.",
        ],
      },
      {
        title: "4. Chuyển giao công nghệ và Đổi mới sản xuất cho doanh nghiệp",
        description:
          "Đồng hành cùng doanh nghiệp địa phương trong hành trình tự động hóa chuyển đổi số:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_ai.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Giải phóng sức lao động con người khỏi các khâu nặng nhọc, nguy hiểm.",
          "Tối ưu chi phí sản xuất và nâng cao năng lực cạnh tranh cho nông sản xuất khẩu.",
          "Đội ngũ kỹ sư hỗ trợ kỹ thuật tại chỗ và bảo trì dài hạn.",
        ],
      },
    ],
  },
  autotimelapse: {
    slug: "autotimelapse",
    title: "Giải Pháp Auto Timelapse Gia Lai Chuyên Nghiệp Hiện Đại",
    subtitle: "Cùng VDCD Gia Lai tìm hiểu về Auto Timelapse",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-1600,q-85,f-auto",
    introText:
      "AutoTimelapse cung cấp giải pháp giám sát thông minh tiến độ xây dựng công trình, nông nghiệp và môi trường một cách tự động, trực quan. Hình ảnh độ phân giải siêu nét từ 8MP đến 61MP được đồng bộ liên tục lên nền tảng đám mây, giúp theo dõi, quản lý và truyền thông dự án hiệu quả.",
    accentColor: "#f59e0b",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/camera_timelapse_tu_dong.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_auto_timelapse.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_timelapse_tu_dong.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/timelapse_tu_dong.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Thiết bị Camera AutoTimelapse chuyên dụng ngoài trời",
        description:
          "Được thiết kế đặc thù để ghi nhận mọi biến đổi của hiện trường liên tục theo chu kỳ:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/camera_timelapse_tu_dong.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Độ phân giải siêu nét từ 8MP đến 61MP: Đảm bảo hình ảnh sắc nét, phóng to không vỡ hạt, quan sát chi tiết biển số xe và từng hạng mục thi công.",
          "Chống chịu thời tiết khắc nghiệt: Chuẩn IP67 chống nước, chống bụi, chịu nhiệt độ cao và mưa bão dài ngày.",
        ],
      },
      {
        title: "2. Vận hành độc lập bằng Pin năng lượng mặt trời Solar & 4G/5G",
        description:
          "Hoàn hảo cho các dự án mới khởi công, vùng sâu vùng xa nơi chưa có lưới điện và internet:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_timelapse_tu_dong.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Không cần kéo dây nguồn hay cáp mạng: Tích hợp tấm pin Solar và ắc quy Lithium dung lượng lớn hoạt động bền bỉ nhiều ngày mưa.",
          "Truyền dữ liệu tự động lên Cloud: Dữ liệu ảnh được mã hóa và tải lên máy chủ ngay sau khi chụp.",
        ],
      },
      {
        title:
          "3. Tự động chiết xuất Video Timelapse 4K/8K & Nền tảng điều hành",
        description:
          "Tua nhanh quá trình thi công qua nhiều tháng/năm chỉ trong một thước phim ấn tượng vài phút:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_auto_timelapse.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Tư liệu truyền thông đắt giá: Phục vụ báo cáo ban lãnh đạo, nhà đầu tư và quảng bá dự án trên mạng xã hội.",
          "Theo dõi đa điểm cầu trên Web/App: Ban quản lý có thể xem trực tuyến nhiều dự án cùng lúc từ bất kỳ đâu.",
          "Lưu trữ dữ liệu lịch sử không thể thay đổi: Cung cấp bằng chứng khách quan giải quyết tranh chấp tiến độ.",
        ],
      },
      {
        title: "4. Ứng dụng đa lĩnh vực của hệ thống AutoTimelapse",
        description:
          "Giải pháp linh hoạt phục vụ nhiều nhu cầu giám sát chuyên sâu:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/timelapse_tu_dong.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Giám sát công trình xây dựng: Theo dõi tiến độ móng, cọc, kết cấu và an toàn lao động.",
          "Nông nghiệp thông minh: Ghi lại chu kỳ sinh trưởng cây trồng, tích hợp mã QR truy xuất nguồn gốc bằng video.",
          "Giám sát an ninh và trật tự công cộng: Kết hợp cảm biến chuyển động cảnh báo xâm nhập trái phép.",
        ],
      },
    ],
  },
  vr360: {
    slug: "vr360",
    title: "Dịch Vụ VR360 Gia Lai Chuyên Nghiệp & Scan Vật Thể 3D",
    subtitle: "Cùng VDCD Gia Lai tìm hiểu về VR360 và Scan 3D",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d.png?tr=w-1600,q-85,f-auto",
    introText:
      "Dịch vụ VR360 và Scan 3D của VDCD Gia Lai ứng dụng công nghệ chụp ảnh toàn cảnh 360 độ trên không và mặt đất kết hợp công nghệ quét laser 3D độ chính xác cao. Giải pháp giúp số hóa toàn diện hiện trạng công trình, di tích lịch sử, bảo tàng và danh lam thắng cảnh, phục vụ hiệu quả cho xúc tiến du lịch, quy hoạch không gian và bảo tồn di sản văn hóa dân tộc.",
    accentColor: "#ec4899",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_chinh_xac.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_cong_nghe_cao.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_scan_3d.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Tour thực tế ảo VR360 tương tác đa điểm",
        description:
          "Tái hiện không gian thực tế sống động, cho phép người dùng tự do tham quan khám phá từ xa:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_cong_nghe_cao.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Góc nhìn toàn cảnh 360 độ trên không bằng Flycam và mặt đất bằng máy ảnh chuyên dụng.",
          "Hotspot tương tác thông minh: Chèn văn bản thuyết minh, âm thanh hướng dẫn, video clip, hình ảnh lịch sử và liên kết đặt dịch vụ.",
          "Trải nghiệm mượt mà trên mọi thiết bị: Tương thích hoàn hảo với Smartphone, Tablet, PC và kính thực tế ảo VR.",
        ],
      },
      {
        title: "2. Dịch vụ Scan vật thể 3D chính xác & Bảo tồn di sản",
        description:
          "Quét 3D chi tiết từng milimet các cổ vật, hiện vật bảo tàng, tượng đài và công trình kiến trúc cổ:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_chinh_xac.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Tái hiện mô hình 3D chân thực: Xem cận cảnh từng hoa văn, chi tiết điêu khắc và cấu trúc vật liệu.",
          "Lưu trữ dữ liệu số vĩnh viễn: Phục vụ công tác nghiên cứu khoa học, trùng tu phục dựng khi có sự cố thiên tai.",
          "Xuất định dạng chuẩn 3D: Dễ dàng tích hợp vào nền tảng Web 3D, Metaverse và in 3D hiện vật.",
        ],
      },
      {
        title: "3. Bản đồ số du lịch thông minh và Xúc tiến điểm đến",
        description:
          "Số hóa hệ sinh thái du lịch Gia Lai, kết nối các điểm danh lam thắng cảnh và di tích lịch sử.",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_scan_3d.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Quảng bá du lịch Gia Lai trên phạm vi toàn cầu không giới hạn khoảng cách địa lý.",
          "Tăng cường thu hút du khách và tạo dấu ấn chuyển đổi số ngành văn hóa - du lịch.",
          "Tích hợp chỉ đường thông minh và thông tin ẩm thực, lưu trú địa phương.",
        ],
      },
      {
        title: "4. Trực quan hóa không gian quy hoạch kiến trúc 3D",
        description:
          "Trình chiếu các dự án bất động sản, khu đô thị và không gian triển lãm ảo:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/quet_3d.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Giúp các nhà đầu tư và người mua nhà hình dung rõ ràng không gian trước khi xây dựng.",
          "Tối ưu chi phí bán hàng và tiếp thị dự án bất động sản từ xa.",
        ],
      },
    ],
  },
  smartscale: {
    slug: "smartscale",
    title: "Dịch Vụ Smart Scale Gia Lai - Giải Pháp Đo Lường Thông Minh",
    subtitle: "Cùng VDCD Gia Lai tìm hiểu về Smart Scale",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_can_dien_tu.png?tr=w-1600,q-85,f-auto",
    introText:
      "SmartScale là giải pháp toàn diện giúp số hóa quy trình cân xe tại các mỏ khoáng sản, nhà máy chế biến nông sản, khu công nghiệp và trạm thu gom vật tư. Hệ thống vận hành dựa trên sự phối hợp giữa thiết bị cân, camera AI nhận diện biển số đa góc và phần mềm quản lý tập trung trên Web/App, loại bỏ hoàn toàn các rủi ro gian lận và sai sót thủ công.",
    accentColor: "#059669",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_can_dien_tu.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_doanh_nghiep.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_cong_nghiep.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_thong_minh.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title:
          "1. SmartScale hoạt động như thế nào? Quy trình cân tự động 5 bước",
        description:
          "Quy trình khép kín tự động hóa hoàn toàn chỉ trong vài giây:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_thong_minh.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Xe đi vào khu vực cân: Cảm biến phát hiện phương tiện tiếp cận bàn cân.",
          "Camera AI nhận diện biển số: Tự động quét và đọc chính xác biển số xe trong 1 giây.",
          "Hệ thống camera giám sát vị trí xe: 4 camera chụp đồng thời biển số trước, sau, thùng xe và cabin.",
          "Cân tải trọng và khóa số liệu: Tự động ghi nhận khối lượng khi xe đứng yên đúng tâm cân.",
          "Xuất phiếu điện tử và lưu trữ Cloud: Đồng bộ dữ liệu tức thì lên hệ thống quản lý tập trung.",
        ],
      },
      {
        title: "2. Bộ 4 Camera giám sát chống gian lận toàn diện",
        description:
          "Loại bỏ triệt để các hành vi gian lận tải trọng và thất thoát hàng hóa:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_cong_nghiep.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Cảnh báo xe đỗ sai vị trí trên bàn cân (chân bánh đè mép cân làm giảm số cân).",
          "Cảnh báo lệch trọng lượng bì (Tare weight) bất thường so với lịch sử.",
          "Kiểm tra hình ảnh thùng hàng và đảm bảo tài xế đúng quy định.",
        ],
      },
      {
        title: "3. Quản lý tập trung qua Web/App và Liên thông ERP",
        description:
          "Giám đốc và quản lý theo dõi doanh thu và sản lượng mọi lúc mọi nơi:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_doanh_nghiep.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Theo dõi sản lượng và doanh thu từng trạm cân trên điện thoại di động theo thời gian thực.",
          "Tự động xuất phiếu cân điện tử, xuất hóa đơn và đối soát dữ liệu với phần mềm kế toán.",
          "Minh bạch dữ liệu nộp thuế tài nguyên và thanh tra nhà nước.",
        ],
      },
      {
        title:
          "4. Kinh nghiệm lựa chọn giải pháp SmartScale tại Gia Lai phù hợp",
        description:
          "Tư vấn cấu hình tối ưu chi phí và đáp ứng đúng nhu cầu vận hành thực tế:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_can_dien_tu.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Xác định lưu lượng xe: Lựa chọn cấu hình tốc độ cao cho các mỏ hoặc trạm có mật độ xe lớn.",
          "Kiểm tra độ phù hợp của bàn cân: Tương thích với các kích thước xe tải, xe container và điều kiện môi trường mỏ.",
          "Khả năng mở rộng và dịch vụ bảo trì kỹ thuật tại chỗ 24/7.",
        ],
      },
    ],
  },
  "data-center": {
    slug: "data-center",
    title: "Data Center Gia Lai - Giải Pháp Trung Tâm Dữ Liệu Hiện Đại",
    subtitle: "Cùng VDCD Gia Lai tìm hiểu về Data Center",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1600,q-85,f-auto",
    introText:
      "Trung tâm Dữ liệu Siêu máy tính và Đào tạo AI VDCD tập trung phát triển nền tảng hạ tầng phục vụ các nhu cầu lưu trữ, xử lý dữ liệu lớn, tính toán hiệu năng cao (HPC) và đào tạo nguồn nhân lực công nghệ thông tin chuyên sâu. Đây là hạ tầng nền tảng quan trọng phục vụ chương trình chuyển đổi số của tỉnh Gia Lai và khu vực Tây Nguyên.",
    accentColor: "#8b5cf6",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu_data_center.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title:
          "1. Data Center là gì? Hạ tầng dữ liệu và Năng lực tính toán HPC",
        description:
          "Cơ sở hạ tầng chuyên biệt vận hành liên tục 24/7/365 với các tiêu chuẩn an toàn cao nhất:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Hệ thống tủ Rack máy chủ tiêu chuẩn quốc tế: Bố trí luồng khí lạnh/nóng tối ưu tản nhiệt cho các cụm máy chủ mật độ cao.",
          "Nguồn điện dự phòng kép UPS & Máy phát diesel: Đảm bảo độ sẵn sàng dịch vụ đạt 99.98%, không bị gián đoạn nguồn điện.",
          "An ninh bảo mật đa tầng: Kiểm soát ra vào bằng sinh trắc học, camera giám sát 24/7 và hệ thống PCCC khí sạch FM-200.",
        ],
      },
      {
        title:
          "2. Cụm Siêu máy tính phục vụ huấn luyện AI và Xử lý dữ liệu lớn",
        description:
          "Năng lực tính toán cực lớn phục vụ các bài toán phức tạp:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu_data_center.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Xây dựng mô hình học máy (Machine Learning) và học sâu (Deep Learning).",
          "Nhận diện và xử lý hình ảnh viễn thám, bản đồ không gian 3D GIS.",
          "Xử lý ngôn ngữ tự nhiên và phát triển các giải pháp đô thị thông minh.",
          "Dự báo xu hướng kinh tế - xã hội và hỗ trợ doanh nghiệp chuyển đổi số.",
        ],
      },
      {
        title: "3. Vai trò trong Hệ sinh thái Công nghệ số & Đào tạo Nhân lực",
        description:
          "Một trung tâm kết hợp giữa hạ tầng tính toán hiện đại và đào tạo nhân lực thực chiến:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Đào tạo kỹ sư Trí tuệ Nhân tạo, Khoa học Dữ liệu và Xử lý Không gian thực tế.",
          "Tạo môi trường thực hành trực tiếp trên cụm máy chủ GPU mạnh mẽ.",
          "Cầu nối cung ứng nguồn nhân lực công nghệ cao cho thị trường lao động.",
        ],
      },
      {
        title: "4. Dịch vụ Colocation & Trung tâm Điều phối Dữ liệu Vùng",
        description:
          "Cho thuê chỗ đặt máy chủ và lưu trữ đám mây an toàn cho doanh nghiệp:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Tiết kiệm chi phí đầu tư phòng máy chủ riêng cho các doanh nghiệp và tổ chức.",
          "Trung tâm liên thông và lưu trữ dữ liệu đất đai, đô thị thông minh, nông nghiệp và môi trường.",
        ],
      },
    ],
  },
  "so-hoa-du-lieu-dat-dai": {
    slug: "so-hoa-du-lieu-dat-dai",
    title: "Số Hóa Dữ Liệu Đất Đai Bằng UAV và AI",
    subtitle:
      "Giải pháp đo đạc hiện trạng, chuẩn hóa hồ sơ và lập cơ sở dữ liệu địa chính số",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image106.png?tr=w-1600,q-80,f-auto",
    introText:
      "Ứng dụng UAV, AI và GIS để đo đạc hiện trạng, lập bản đồ địa chính, chuẩn hóa hồ sơ và xây dựng cơ sở dữ liệu đất đai thống nhất. VDCD Gia Lai triển khai giải pháp tích hợp từ thực địa đến hệ thống quản lý, giúp giải quyết triệt để bài toán chồng lấn ranh giới và sai lệch diện tích.",
    accentColor: "#e11d48",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image106.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image82.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image51.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image113.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image23.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image108.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Ứng dụng UAV và AI để số hóa dữ liệu đất đai",
        description:
          "Sự kết hợp đồng bộ giữa UAV độ chính xác cao, AI nhận diện ranh giới và hệ thống GIS:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image106.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "UAV thu thập dữ liệu hiện trạng độ nét 1-3cm/pixel.",
          "AI nhận diện sơ bộ ranh giới bờ thửa, hàng rào và công trình.",
          "Chuẩn hóa dữ liệu không gian và thuộc tính vào hệ thống GIS.",
          "Liên kết bản đồ với hồ sơ pháp lý và tài liệu gốc.",
        ],
      },
      {
        title: "2. Thành lập Bản đồ số 2D và Bản đồ số 3D",
        description:
          "Dữ liệu không gian trực quan đa chiều phục vụ đối soát hiện trạng:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image82.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Bản đồ số 2D trực giao Orthomosaic thể hiện rõ ranh giới từng thửa.",
          "Bản đồ số 3D tái hiện trực quan công trình và độ dốc địa hình.",
          "Xuất định dạng chuẩn CAD/GIS tương thích cơ sở dữ liệu địa chính quốc gia.",
        ],
      },
      {
        title: "3. Quy trình số hóa dữ liệu đất đai chuẩn hóa 5 bước",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image113.png?tr=w-1000,q-80,f-auto",
        layout: "numbered-steps",
        points: [
          "01. Khảo sát và chuẩn bị: Thu thập hồ sơ hiện có, khảo sát địa bàn, kiểm tra điều kiện triển khai, xây dựng kế hoạch kỹ thuật và phương án bay.",
          "02. Bay chụp và xử lý dữ liệu: Thiết lập mốc khống chế mặt đất GCP, thiết kế tuyến bay UAV và thu thập dữ liệu ảnh hàng không độ phân giải cao.",
          "03. Nhận diện và đối soát: AI hỗ trợ nhận diện sơ bộ ranh giới. Cán bộ chuyên môn chồng lớp dữ liệu mới với bản đồ và hồ sơ địa chính để phát hiện sai lệch.",
          "04. Xây dựng cơ sở dữ liệu: Bản đồ được vector hóa, gắn thông tin thuộc tính và liên kết với hồ sơ đất đai đã số hóa.",
          "05. Kiểm tra và tích hợp: Dữ liệu được kiểm tra chất lượng, đối soát kỹ thuật và chuyển giao đồng bộ vào hệ thống quản lý đất đai địa phương.",
        ],
      },
      {
        title: "4. Nhận diện ranh giới & Đối soát cơ sở dữ liệu thực địa",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image23.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Phát hiện sai lệch ranh giới và lấn chiếm đất đai thực tế (chế độ hiện tường xanh).",
          "Kiểm kê hiện trạng sử dụng đất thực tế so với quy hoạch.",
          "Cung cấp bằng chứng khách quan gắn tọa độ chuẩn VN-2000.",
        ],
      },
      {
        title:
          "5. Giao diện bản đồ số với ranh giới thửa đất và bảng thông tin",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image108.png?tr=w-1400,q-80,f-auto",
        layout: "full-width-image",
        points: [
          "Minh bạch hóa quản lý nhà nước về đất đai.",
          "Rút ngắn thời gian xử lý hồ sơ hành chính cho người dân.",
          "Sẵn sàng kết nối liên ngành thuế, xây dựng, môi trường.",
        ],
      },
    ],
  },
  "do-thi-thong-minh": {
    slug: "do-thi-thong-minh",
    title: "Giải Pháp Đô Thị Thông Minh Bằng Camera AI",
    subtitle:
      "Camera AI, AutoTimelapse và nền tảng dữ liệu không gian hỗ trợ quản lý giao thông, bãi đỗ xe và hạ tầng",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image66.png?tr=w-1600,q-80,f-auto",
    introText:
      "Camera AI, AutoTimelapse và nền tảng dữ liệu không gian hỗ trợ quản lý giao thông, bãi đỗ xe công cộng, an ninh trật tự và theo dõi hạ tầng đô thị thông minh. Hệ thống kết nối đa tầng giúp các cơ quan quản lý đô thị chuyển đổi từ phản ứng thụ động sang điều hành chủ động và dự báo thông minh.",
    accentColor: "#0284c7",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image66.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image22.jpg?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image68.jpg?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image46.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image81.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image65.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image35.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image78.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image93.jpg?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image89.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Theo dõi lưu lượng giao thông tại các nút giao trọng điểm",
        description:
          "Camera AI được bố trí tại các nút giao để phân tích dòng phương tiện theo thời gian thực:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image22.jpg?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Xác định mật độ giao thông và chiều dài hàng xe chờ tại các vòng xuyến, ngã tư.",
          "Phát hiện phương tiện dừng đỗ sai quy định hoặc ùn ứ kéo dài.",
          "Bản đồ nhiệt và báo cáo theo khung giờ hỗ trợ tối ưu chu kỳ đèn tín hiệu giao thông.",
        ],
      },
      {
        title: "2. Quản lý bãi đỗ xe công cộng thông minh",
        description:
          "Hệ thống giám sát bãi đỗ xe tại các quảng trường và khu vực trung tâm:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image68.jpg?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Nhận diện vị trí trống và dẫn đường trên ứng dụng di động.",
          "Tự động đọc biển số xe, tính phí tự động không dừng.",
        ],
      },
      {
        title: "3. Phát hiện sự cố và Đảm bảo an toàn giao thông",
        description:
          "Phát hiện chướng ngại vật và hành vi vi phạm an toàn giao thông:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image46.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Nhận diện xe đi ngược chiều, vượt đèn đỏ, lấn làn.",
          "Cảnh báo chướng ngại vật rơi vãi trên đường, nắp cống hỏng, cây đổ sau giông bão.",
        ],
      },
      {
        title: "4. Ứng dụng AI nhận diện ổ gà & Quản lý hạ tầng đường bộ",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image81.png?tr=w-1400,q-80,f-auto",
        layout: "full-width-image",
        points: [
          "AI tự động quét và phát hiện ổ gà, rạn nứt mặt đường nhựa trên các tuyến quốc lộ.",
          "Định vị tọa độ GPS chính xác gửi về đơn vị duy tu bảo dưỡng xử lý kịp thời.",
        ],
      },
      {
        title: "5. Giám sát an ninh, đếm người & Cảnh báo hành vi xả rác",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image78.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Camera AI phát hiện xâm nhập khu vực cấm và người có hành vi xả rác bừa bãi.",
          "Đếm số lượng người tại các điểm công cộng và cảnh báo nguy cơ quá tải.",
          "Ứng dụng AutoTimelapse phát hiện và cảnh báo nguy cơ đuối nước tại các khu vực sông hồ.",
        ],
      },
      {
        title: "6. Dashboard điều hành toàn diện Đô Thị Thông Minh",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image89.png?tr=w-1000,q-80,f-auto",
        layout: "card-grid",
        points: [
          "Bản đồ số định vị sự việc trên nền 3DGIS toàn tỉnh.",
          "Dashboard chỉ huy điều hành phân quyền xử lý tức thời.",
          "Liên thông dữ liệu đa ngành phục vụ chỉ đạo điều hành đô thị.",
        ],
      },
    ],
  },
  "quan-ly-tai-nguyen-va-moi-truong": {
    slug: "quan-ly-tai-nguyen-va-moi-truong",
    title: "Quản Lý Tài Nguyên Và Môi Trường Số",
    subtitle:
      "Thấy rõ hiện trạng – Đo đúng biến động – Chủ động cảnh báo bằng UAV, LiDAR, AI và 3DGIS",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image30.png?tr=w-1600,q-80,f-auto",
    introText:
      "Ứng dụng UAV RTK, LiDAR, AI, AutoTimelapse và 3DGIS để thấy rõ hiện trạng, đo đúng biến động và chủ động cảnh báo sớm các nguy cơ sinh thái. VDCD Gia Lai cung cấp nền tảng quản trị tài nguyên số giúp chuyển đổi từ tuần tra thủ công sang giám sát tự động toàn diện.",
    accentColor: "#059669",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image30.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image16.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image50.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image24.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image10.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image25.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image92.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Ứng dụng UAV và AI phục vụ quản lý tài nguyên Rừng",
        description:
          "Sử dụng thiết bị bay chuyên dụng xuyên qua tán rừng để đo đạc sinh khối và theo dõi biến động diện tích rừng:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image30.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Ứng dụng AI đếm số lượng cây có đường kính trên 15cm tự động.",
          "Đo đường kính của cây trên mô hình 3D Textures Mesh chính xác.",
          "Giám sát mất rừng và xâm lấn: Tự động so sánh các đợt bay để khoanh vùng các điểm phá rừng trái phép.",
        ],
      },
      {
        title: "2. Quản lý mỏ và kiểm soát ranh giới khai thác khoáng sản",
        description:
          "Khảo sát toàn bộ bề mặt khai trường mỏ, kể cả những vách đá nguy hiểm:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image24.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Phát hiện mỏ đang lấn chiếm ra ngoài ranh giới cho phép (chế độ tường xanh).",
          "Tính toán thể tích đất đá đào đắp và trữ lượng bóc tầng tự động.",
          "Cảnh báo nguy cơ sạt lở và sụt lún vách mỏ.",
        ],
      },
      {
        title:
          "3. Mô phỏng ngập lụt xác định tuyến đường chia cắt & Cảnh báo thiên tai",
        description:
          "Kết hợp UAV, mô hình 3D địa hình và dữ liệu thủy văn để mô phỏng dòng chảy ngập lụt:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image10.png?tr=w-1400,q-80,f-auto",
        layout: "full-width-image",
        points: [
          "Mô phỏng mực nước dâng theo từng cấp báo động lũ.",
          "Xác định nhà ở, tuyến đường giao thông có nguy cơ bị chia cắt.",
          "Thiết lập vị trí an toàn và tuyến sơ tán dân cư khẩn cấp.",
        ],
      },
      {
        title: "4. Công cụ so sánh hiện trạng theo mốc thời gian",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image25.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Đo diện tích, thể tích và sức chứa còn lại của bãi thải.",
          "So sánh biến động địa hình giữa hai thời điểm khác nhau.",
          "Lưu trữ hình ảnh AutoTimelapse làm bằng chứng kiểm tra pháp lý.",
        ],
      },
      {
        title:
          "5. Dashboard Nền tảng tích hợp 3DGIS theo dõi dự án ngay tại Gia Lai",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image92.png?tr=w-1000,q-80,f-auto",
        layout: "numbered-steps",
        points: [
          "01. Xác định bài toán và khảo sát địa bàn thực tế.",
          "02. Thu thập dữ liệu thực địa bằng UAV, LiDAR, AutoTimelapse và cảm biến.",
          "03. Xử lý và phân tích AI, dựng bản đồ 3D kiểm đếm biến động.",
          "04. Tích hợp nền tảng 3DGIS và dashboard phân quyền quản lý.",
          "05. Theo dõi và cập nhật định kỳ hỗ trợ chỉ đạo điều hành.",
        ],
      },
    ],
  },
  "trung-tam-doi-moi-sang-tao-tinh": {
    slug: "trung-tam-doi-moi-sang-tao-tinh",
    title: "Trung Tâm Đổi Mới Sáng Tạo Tỉnh",
    subtitle:
      "Hệ sinh thái ươm tạo khởi nghiệp, phát triển công nghệ và kết nối 3 nhà",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1600,q-80,f-auto",
    introText:
      "Trung tâm Đổi mới Sáng tạo Gia Lai là cầu nối giữa Nhà nước - Nhà trường - Nhà doanh nghiệp, tạo môi trường ươm tạo các dự án công nghệ cao, thúc đẩy chuyển giao giải pháp số và xây dựng hệ sinh thái khởi nghiệp đổi mới sáng tạo vững mạnh.",
    accentColor: "#0284c7",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image115.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image57.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image62.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Ươm tạo và thúc đẩy các startup đổi mới sáng tạo",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Hạ tầng Co-working, phòng Lab và hạ tầng máy chủ GPU.",
          "Cố vấn chuyên môn từ các chuyên gia đầu ngành.",
          "Kết nối quỹ đầu tư mạo hiểm và chương trình hỗ trợ khởi nghiệp.",
        ],
      },
      {
        title: "2. Đào tạo BIM và chuyển giao công nghệ cho sở ban ngành",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image62.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Hơn 600+ học viên từ các sở ban ngành tham dự đào tạo BIM.",
          "Chuẩn hóa quy trình áp dụng BIM từ khâu thiết kế đến thi công.",
        ],
      },
      {
        title: "3. Ký kết hợp tác chiến lược với các trường đại học lớn",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1400,q-80,f-auto",
        layout: "full-width-image",
        points: [
          "Ký kết MOU với Trường Đại học Quy Nhơn và Đại học FPT Quy Nhơn.",
          "Hợp tác nghiên cứu, đào tạo và phát triển nguồn nhân lực công nghệ cao.",
        ],
      },
    ],
  },
  "nong-nghiep-lam-nghiep": {
    slug: "nong-nghiep-lam-nghiep",
    title: "Nông Nghiệp - Lâm Nghiệp Thông Minh",
    subtitle:
      "Giải pháp nông nghiệp công nghệ cao kết hợp Drone, AutoTimelapse và Trạm cân SmartScale",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/nong_lam_nghiep.png?tr=w-1600,q-85,f-auto",
    introText:
      "Trong kỷ nguyên số, việc chuyển đổi phương thức sản xuất nông nghiệp truyền thống sang mô hình nông nghiệp thông minh là yêu cầu thiết yếu để nâng cao năng suất, tối ưu chi phí và gia tăng năng lực cạnh tranh. VDCD Group mang đến hệ sinh thái công nghệ khép kín, kết hợp sức mạnh của Thiết bị bay không người lái (UAV/Drone), Nền tảng giám sát tự động AutoTimelapse và Hệ thống Trạm cân thông minh, giúp số hóa toàn diện quy trình sản xuất từ khâu khảo sát quy hoạch đến thu hoạch và phân phối.",
    accentColor: "#16a34a",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/nong_lam_nghiep.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/cong_nghe_cao_trong_nong_nghiep.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/cong_nghe_nong_lam_nghiep.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/giai_phap_nong_lam_nghiep.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ung_dung_cong_nghe_trong_nong_lam_nghiep.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title:
          "1. Ứng dụng Drone trong khảo sát, phân tích NDVI và chăm sóc cây trồng",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/cong_nghe_cao_trong_nong_nghiep.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Thành lập bản đồ địa hình và hiện trạng thửa ruộng chính xác.",
          "Phân tích sức khỏe cây trồng (Camera đa phổ đo chỉ số NDVI).",
          "Tự động hóa phun thuốc, rải phân và gieo hạt diện rộng an toàn.",
        ],
      },
      {
        title:
          "2. Nền tảng AutoTimelapse theo dõi chu kỳ sinh trưởng & Nhật ký canh tác",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/cong_nghe_nong_lam_nghiep.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Giám sát trực quan 24/7 quá trình phát triển của cây trồng, vật nuôi.",
          "Quan trắc vi khí hậu: nhiệt độ, độ ẩm, lượng mưa.",
          "Quét mã QR truy xuất nguồn gốc bằng video Timelapse thực tế sinh động.",
        ],
      },
      {
        title: "3. Trạm cân thông minh SmartScale quản lý xuất nhập nông sản",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/giai_phap_nong_lam_nghiep.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Quản lý tập trung toàn bộ trạm cân xe từ xa qua Web/App.",
          "Camera AI chống gian lận tải trọng và đối soát số liệu minh bạch.",
        ],
      },
    ],
  },
  "an-ninh-giam-sat-an-ninh": {
    slug: "an-ninh-giam-sat-an-ninh",
    title: "Giám Sát An Ninh Toàn Diện",
    subtitle: "Hệ thống giám sát an ninh công nghệ cao AutoTimelapse 24/7",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-1600,q-85,f-auto",
    introText:
      "Đảm bảo an ninh trật tự, bảo vệ tài sản tại các công trình trọng điểm, khu công nghiệp hay khu vực biên giới luôn là bài toán đòi hỏi sự giám sát liên tục và tính toàn vẹn của dữ liệu. Khắc phục những điểm mù của camera CCTV truyền thống, VDCD mang đến nền tảng giám sát an ninh AutoTimelapse tích hợp công nghệ chụp ảnh độ phân giải siêu cao, truyền tải không dây và điện toán đám mây.",
    accentColor: "#dc2626",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/camera_timelapse_tu_dong.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_timelapse_tu_dong.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Giám sát trực quan 24/7 với độ nét siêu cao",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/camera_timelapse_tu_dong.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Độ phân giải siêu nét từ 8MP đến 61MP, nhận diện rõ biển số xe và khuôn mặt.",
          "Vận hành độc lập bằng năng lượng mặt trời Solar và mạng 4G/5G.",
          "Chống chịu thời tiết mưa bão, sương mù và khói bụi công trường.",
        ],
      },
      {
        title: "2. Cảnh báo xâm nhập trái phép & Xử lý sự cố tức thời",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_timelapse_tu_dong.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Video Timelapse tóm tắt diễn biến cả ngày chỉ trong vài phút.",
          "Cảnh báo tức thời Real-time khi phát hiện xâm nhập khu vực cấm.",
          "Lưu trữ đám mây bảo mật tuyệt đối làm bằng chứng pháp lý.",
        ],
      },
    ],
  },
  "dien-nang-luong": {
    slug: "dien-nang-luong",
    title: "Điện - Năng Lượng Tái Tạo",
    subtitle: "Giải pháp số hóa hạ tầng điện lưới và năng lượng tái tạo",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image60.jpg?tr=w-1600,q-80,f-auto",
    introText:
      "Đảm bảo an ninh năng lượng và vận hành an toàn hệ thống điện lưới, năng lượng tái tạo (điện gió, điện mặt trời). VDCD Group cung cấp hệ sinh thái công nghệ lõi kết hợp giữa UAV, Camera nhiệt và AutoTimelapse để số hóa toàn diện từ quy hoạch, thi công đến kiểm tra, vận hành mạng lưới năng lượng.",
    accentColor: "#eab308",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image60.jpg?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image89.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image58.jpg?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Khảo sát & Kiểm tra đường dây điện bằng Camera nhiệt",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image89.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Bay quét 3D tối ưu hóa quy hoạch hướng tuyến đường dây mới.",
          "Camera nhiệt phát hiện điểm nóng (hotspot) bất thường ngăn ngừa chập cháy.",
          "Kiểm tra hiệu suất và định vị cell pin lỗi tại các trang trại điện mặt trời.",
        ],
      },
      {
        title: "2. AutoTimelapse giám sát công trường dự án năng lượng",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image58.jpg?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Giám sát thi công dựng trụ điện gió và lắp ráp pin mặt trời 24/7.",
          "Đồng bộ tiến độ trực tuyến lên Cloud cho chủ đầu tư và tổng thầu.",
        ],
      },
    ],
  },
  "tai-nguyen-khai-thac-khoang-san": {
    slug: "tai-nguyen-khai-thac-khoang-san",
    title: "Khai Thác Khoáng Sản & Quản Lý Mỏ",
    subtitle: "Số hóa toàn diện và kiểm soát minh bạch hoạt động khai thác mỏ",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/khoang_san_tai_nguyen.png?tr=w-1600,q-85,f-auto",
    introText:
      "Quản lý, khai thác tài nguyên và khoáng sản là lĩnh vực đòi hỏi sự minh bạch cao độ về dữ liệu, tính chính xác trong đo đạc và đặc biệt là an toàn lao động. VDCD cung cấp giải pháp số hóa toàn diện khu vực mỏ bằng sự kết hợp giữa UAV, AutoTimelapse và Hệ thống Trạm cân thông minh SmartScale.",
    accentColor: "#f97316",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/khoang_san_tai_nguyen.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/tai_nguyen_thien_nhien.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Đo đạc & Tính toán trữ lượng mỏ bằng UAV 3D",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/khoang_san_tai_nguyen.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Thành lập bản đồ 3D toàn bộ khu mỏ và bãi tập kết.",
          "Tính toán thể tích đất đá đã bóc và khoáng sản khai thác tự động.",
          "Cảnh báo an toàn và đánh giá sạt lở vách mỏ.",
        ],
      },
      {
        title: "2. Trạm cân thông minh SmartScale chống gian lận",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/tai_nguyen_thien_nhien.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Nhận diện biển số tự động và giám sát 4 camera đa góc.",
          "Cảnh báo xe đỗ sai vị trí, lệch bì hoặc gian lận tải trọng.",
          "Quản lý tập trung từ xa qua Web/App theo thời gian thực.",
        ],
      },
    ],
  },
  "du-lich-thong-minh-so-hoa-di-san": {
    slug: "du-lich-thong-minh-so-hoa-di-san",
    title: "Du Lịch Thông Minh - Số Hóa Di Sản",
    subtitle:
      "Số hóa không gian 3D, bảo tồn di sản văn hóa và trải nghiệm thực tế ảo VR360",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d.png?tr=w-1600,q-85,f-auto",
    introText:
      "Ứng dụng công nghệ bay quét 3D, thực tế ảo VR360 và GIS để số hóa các di tích lịch sử, danh lam thắng cảnh và hiện vật văn hóa tại Gia Lai, mở ra không gian trải nghiệm du lịch số tương tác sinh động cho du khách trong nước và quốc tế.",
    accentColor: "#ec4899",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_chinh_xac.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_cong_nghe_cao.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_scan_3d.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Tour thực tế ảo VR360",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/dich_vu_scan_3d.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Tương tác trực quan trên mọi thiết bị di động, máy tính, kính VR.",
          "Tích hợp thuyết minh đa ngôn ngữ và thông tin điểm đến.",
        ],
      },
      {
        title: "2. Scan 3D bảo tồn hiện vật lịch sử",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d_chinh_xac.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Mô hình 3D xoay 360 độ chi tiết từng hoa văn hiện vật.",
          "Lưu trữ dữ liệu phục vụ nghiên cứu và trùng tu.",
        ],
      },
    ],
  },
  "cuu-ho-cuu-nan-phong-chong-thien-tai": {
    slug: "cuu-ho-cuu-nan-phong-chong-thien-tai",
    title: "Cứu Hộ Cứu Nạn - Phòng Chống Thiên Tai",
    subtitle: "Giải pháp tìm kiếm cứu nạn và cảnh báo sớm thiên tai bằng UAV",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image10.png?tr=w-1600,q-80,f-auto",
    introText:
      "Ứng dụng thiết bị bay không người lái tầm xa tích hợp camera nhiệt, hệ thống truyền hình ảnh trực tiếp và mô hình số 3D để hỗ trợ công tác tìm kiếm cứu nạn, khảo sát vùng ngập lụt, sạt lở và chỉ huy ứng phó khẩn cấp.",
    accentColor: "#f43f5e",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image10.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image25.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image93.jpg?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Tìm kiếm cứu nạn bằng UAV Camera nhiệt ban đêm",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image10.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Định vị thân nhiệt nạn nhân trong đêm tối hoặc rừng rậm, vùng ngập lũ.",
          "Thả hàng cứu trợ thuốc men, phao cứu sinh đến vùng cô lập.",
        ],
      },
      {
        title: "2. Đánh giá sạt lở và lập tuyến tiếp cận an toàn",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image25.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Đo đạc sườn núi cảnh báo nguy cơ sụt lún tiếp diễn.",
          "Xác định tuyến đường tiếp cận an toàn cho lực lượng cứu hộ.",
        ],
      },
    ],
  },
  "trung-tam-chuyen-giao-cong-nghe": {
    slug: "trung-tam-chuyen-giao-cong-nghe",
    title: "Trung Tâm Chuyển Giao Công Nghệ",
    subtitle:
      "Cầu nối đưa thành tựu khoa học kỹ thuật vào thực tiễn sản xuất kinh doanh",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1600,q-80,f-auto",
    introText:
      "Trung tâm Chuyển giao Công nghệ đóng vai trò hạt nhân kết nối các sáng chế, nghiên cứu từ các Viện nghiên cứu, Trường đại học hàng đầu đến các doanh nghiệp và địa phương cần đổi mới công nghệ.",
    accentColor: "#0d9488",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image103.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Khảo sát bài toán & Tư vấn công nghệ phù hợp",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Đánh giá tính khả thi và bài toán kinh tế trước khi đầu tư.",
          "Lựa chọn công nghệ tự động hóa, cảm biến thông minh và AI phù hợp.",
        ],
      },
      {
        title:
          "2. Hợp tác chuyển giao cùng các trường đại học & viện nghiên cứu",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Ký kết hợp tác chuyển giao công nghệ cùng Trường ĐH Quy Nhơn và ĐH FPT.",
          "Huấn luyện vận hành, bàn giao công nghệ và hỗ trợ kỹ thuật dài hạn.",
        ],
      },
    ],
  },
  "trung-tam-nghien-cuu-va-phat-trien-san-pham": {
    slug: "trung-tam-nghien-cuu-va-phat-trien-san-pham",
    title: "Trung Tâm Nghiên Cứu Và Phát Triển Sản Phẩm R&D",
    subtitle:
      "Nghiên cứu phát triển phần cứng IoT, thiết bị bay chuyên dụng và nền tảng số",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1600,q-80,f-auto",
    introText:
      "Đội ngũ chuyên gia R&D giàu kinh nghiệm chuyên nghiên cứu, thiết kế phần cứng, bo mạch vi điều khiển và các giải pháp phần mềm chuyên sâu bắt kịp các xu hướng công nghệ tiên tiến nhất thế giới.",
    accentColor: "#0891b2",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image111.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Thiết kế và chế tạo thiết bị phần cứng IoT & Dashboard",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Trạm quan trắc vi khí hậu độc lập tiêu thụ năng lượng cực thấp.",
          "Dashboard quản lý toàn bộ dự án thuộc tỉnh Gia Lai thời gian thực.",
        ],
      },
      {
        title: "2. Tư vấn giải pháp chuyển đổi số cấp tỉnh",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Trực tiếp tham gia tư vấn chuyển đổi số tại UBND các cấp.",
          "Đề xuất các công nghệ chuyển đổi số thế hệ mới cho địa phương.",
        ],
      },
    ],
  },
  "trung-tam-du-lieu-vung": {
    slug: "trung-tam-du-lieu-vung",
    title: "Trung Tâm Dữ Liệu Vùng",
    subtitle: "Hạ tầng dữ liệu số tại Trung tâm Đổi mới Sáng tạo Gia Lai",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1600,q-85,f-auto",
    introText:
      "Trái tim số hóa cung cấp năng lực lưu trữ và tính toán hiệu năng cao phục vụ chuyển đổi số vùng Tây Nguyên.",
    accentColor: "#6366f1",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu_data_center.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Hạ tầng Data Center tiêu chuẩn quốc tế",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Độ sẵn sàng 99.98% với hệ thống nguồn điện kép.",
          "Bảo mật thông tin tối đa theo tiêu chuẩn khắt khe.",
        ],
      },
      {
        title: "2. Cụm siêu máy tính HPC & AI Vùng",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu_data_center.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Xử lý dữ liệu không gian 3D GIS và ảnh viễn thám.",
          "Điều phối dữ liệu đô thị thông minh thời gian thực.",
        ],
      },
    ],
  },
  "trung-tam-phat-trien-robot-ai": {
    slug: "trung-tam-phat-trien-robot-ai",
    title: "Trung tâm phát triển Robot & AI",
    subtitle:
      "Nghiên cứu chế tạo robot tự hành AGV, cánh tay robot và ứng dụng AI thông minh",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-1600,q-85,f-auto",
    introText:
      "Tập trung nghiên cứu, chế tạo và tích hợp các giải pháp robot tự động hóa kết hợp thị giác máy tính và trí tuệ nhân tạo.",
    accentColor: "#6366f1",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_ai.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ung_dung_ai.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Nghiên cứu & Chế tạo Robot tự động hóa",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/he_thong_ai.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Định vị SLAM & LiDAR tránh chướng ngại vật.",
          "Vận chuyển hàng hóa liên tục trong nhà xưởng.",
        ],
      },
      {
        title: "2. Thị giác máy tính AI",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ung_dung_ai.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Phân loại nông sản theo màu sắc, độ chín.",
          "Tốc độ xử lý hàng chục nghìn sản phẩm/giờ.",
        ],
      },
    ],
  },
  "trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai": {
    slug: "trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai",
    title: "Trung tâm dữ liệu siêu máy tính và đào tạo AI",
    subtitle: "Hạ tầng tính toán hiệu năng cao HPC và đào tạo AI",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1600,q-85,f-auto",
    introText:
      "Hạ tầng tính toán hiệu năng cao HPC và trung tâm đào tạo nhân lực trí tuệ nhân tạo chuyên sâu.",
    accentColor: "#8b5cf6",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu_data_center.png?tr=w-1200,q-85,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu.png?tr=w-1200,q-85,f-auto",
    ],
    sections: [
      {
        title: "1. Hạ tầng Siêu máy tính HPC",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center.png?tr=w-1000,q-85,f-auto",
        layout: "split-image",
        points: [
          "Cụm máy chủ GPU phục vụ đào tạo mô hình AI.",
          "Lưu trữ đám mây bảo mật cao.",
        ],
      },
      {
        title: "2. Không gian Đào tạo Nhân lực AI",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/trung_tam_du_lieu.png?tr=w-1400,q-85,f-auto",
        layout: "full-width-image",
        points: [
          "Phòng Lab thực hành trực tiếp trên máy chủ.",
          "Cung cấp kỹ sư cho các dự án công nghệ lớn.",
        ],
      },
    ],
  },
  "quan-ly-tai-nguyen-quan-trac-moi-truong": {
    slug: "quan-ly-tai-nguyen-quan-trac-moi-truong",
    title: "Tài nguyên môi trường",
    subtitle: "Giám sát tài nguyên thiên nhiên và quan trắc môi trường tự động",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image30.png?tr=w-1600,q-80,f-auto",
    introText:
      "Giải pháp quan trắc môi trường giúp theo dõi dữ liệu thời gian thực, cảnh báo sớm rủi ro sinh thái.",
    accentColor: "#059669",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image30.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image16.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image24.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Quan trắc môi trường tự động",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image25.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Cảm biến đo nồng độ bụi, khí thải theo thời gian thực.",
          "AutoTimelapse ghi lại quá trình biến đổi môi trường.",
        ],
      },
      {
        title: "2. Giám sát không gian bằng UAV",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image16.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Quản lý biến động diện tích rừng.",
          "Theo dõi bồi lắng sông suối, đê điều.",
        ],
      },
    ],
  },
  "uom-tao-khoi-nghiep-sang-tao": {
    slug: "uom-tao-khoi-nghiep-sang-tao",
    title: "Ươm Tạo Khởi Nghiệp Sáng Tạo",
    subtitle: "Từ ý tưởng đến mô hình có thể thử nghiệm và thương mại hóa",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1600,q-80,f-auto",
    introText:
      "Trung tâm Đổi mới Sáng tạo Gia Lai hỗ trợ cá nhân, nhóm dự án, startup, hợp tác xã và doanh nghiệp từng bước kiểm chứng ý tưởng, hoàn thiện mô hình kinh doanh, phát triển sản phẩm thử nghiệm và tiếp cận các nguồn lực phù hợp. Mục tiêu của chương trình không chỉ là hoàn thiện một bản kế hoạch, mà giúp dự án trả lời được những câu hỏi quan trọng: Sản phẩm giải quyết vấn đề gì? Ai sẵn sàng sử dụng? Mô hình có khả thi không? Và cần làm gì tiếp theo để đưa sản phẩm vào thực tế?",
    accentColor: "#ea580c",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image115.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Ý tưởng tốt vẫn cần một lộ trình đúng",
        description:
          "Nhiều ý tưởng khởi nghiệp được hình thành từ những vấn đề gần gũi trong đời sống, sản xuất và nhu cầu của địa phương. Tuy nhiên, để biến ý tưởng thành một dự án có khả năng phát triển, đội ngũ sáng lập thường gặp phải những điểm nghẽn:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Chưa xác định rõ khách hàng và nhu cầu thực tế.",
          "Chưa biết cách kiểm chứng tính khả thi của ý tưởng.",
          "Sản phẩm còn ở dạng khái niệm, chưa có phiên bản thử nghiệm.",
          "Mô hình kinh doanh và phương án tạo doanh thu chưa rõ ràng.",
          "Thiếu kinh nghiệm về quản trị, tài chính, pháp lý và thị trường.",
          "Chưa tiếp cận được công nghệ, chuyên gia và đối tác phù hợp.",
          "Chưa có hồ sơ đủ thuyết phục để giới thiệu dự án.",
        ],
      },
      {
        title: "2. Đối tượng tham gia chương trình",
        description:
          "Chương trình ươm tạo mở rộng cho nhiều nhóm đối tượng có khát vọng đổi mới sáng tạo:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image115.png?tr=w-1000,q-80,f-auto",
        layout: "card-grid",
        points: [
          "Cá nhân và nhóm có ý tưởng: Có ý tưởng giải quyết một vấn đề thực tế nhưng chưa biết bắt đầu hoặc chưa hình thành mô hình kinh doanh.",
          "Startup và dự án khởi nghiệp: Đã có sản phẩm ban đầu, cần kiểm chứng thị trường, hoàn thiện mô hình hoặc chuẩn bị cho giai đoạn phát triển tiếp theo.",
          "Sinh viên và nhóm nghiên cứu: Có sáng kiến, kết quả nghiên cứu hoặc sản phẩm công nghệ cần đánh giá khả năng ứng dụng và thương mại hóa.",
          "Hợp tác xã và doanh nghiệp: Muốn đổi mới sản phẩm, quy trình, phương thức vận hành hoặc phát triển mô hình kinh doanh mới trên nền tảng công nghệ.",
        ],
      },
      {
        title: "3. Hành trình ươm tạo 6 bước chuẩn hóa",
        description:
          "Một quy trình đồng hành sát sao từ kiểm chứng vấn đề đến gọi vốn thành công:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1400,q-80,f-auto",
        layout: "numbered-steps",
        points: [
          "01. Tiếp nhận và đánh giá: Tìm hiểu ý tưởng, đội ngũ, sản phẩm, thị trường dự kiến và những khó khăn dự án đang gặp phải. Kết quả đánh giá giúp xác định giai đoạn phát triển và nội dung cần ưu tiên.",
          "02. Kiểm chứng vấn đề và khách hàng: Làm rõ đối tượng khách hàng, nhu cầu cần giải quyết và giá trị mà sản phẩm mang lại. Dự án được định hướng khảo sát, phỏng vấn và thu thập phản hồi từ người dùng thực tế.",
          "03. Hoàn thiện mô hình kinh doanh: Xác định khách hàng mục tiêu, giá trị cốt lõi, nguồn doanh thu, cơ cấu chi phí, kênh tiếp cận thị trường và những nguồn lực cần thiết.",
          "04. Phát triển sản phẩm thử nghiệm: Hỗ trợ dự án xây dựng mô hình mẫu, phiên bản khả dụng tối thiểu (MVP) hoặc bản chứng minh tính khả thi của giải pháp (POC). Kết nối với AI, UAV, GIS, 3D và Data Center.",
          "05. Thử nghiệm và hoàn thiện: Đưa sản phẩm đến nhóm người dùng hoặc đối tác tiềm năng để thu thập phản hồi, đánh giá khả năng sử dụng và tiếp tục điều chỉnh sản phẩm, phương án vận hành.",
          "06. Trình bày và kết nối nguồn lực: Hoàn thiện hồ sơ giới thiệu, nội dung thuyết trình và kế hoạch phát triển. Giới thiệu đến chuyên gia, doanh nghiệp, quỹ hỗ trợ hoặc nguồn lực đầu tư.",
        ],
      },
      {
        title: "4. Dự án được hỗ trợ những gì?",
        description:
          "Mỗi dự án có một điểm xuất phát khác nhau. Sau bước đánh giá ban đầu, Trung tâm sẽ đề xuất lộ trình phù hợp:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image115.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Sản phẩm và mô hình kinh doanh: Làm rõ vấn đề, giá trị khác biệt, khách hàng mục tiêu, phương thức tạo doanh thu và khả năng mở rộng của dự án.",
          "Công nghệ và phát triển giải pháp: Kết nối đội ngũ kỹ thuật, công nghệ và hạ tầng phù hợp để hỗ trợ hoàn thiện sản phẩm mẫu hoặc phiên bản thử nghiệm.",
          "Thị trường và vận hành: Xây dựng cách tiếp cận khách hàng, kế hoạch truyền thông, phương án vận hành, tài chính và sử dụng nguồn lực.",
          "Chuyên gia và hệ sinh thái: Kết nối chuyên gia, cố vấn, doanh nghiệp, trường đại học, tổ chức nghiên cứu và đối tác hỗ trợ.",
        ],
      },
      {
        title: "5. Kết quả dự án hướng đến & Hệ sinh thái đồng hành",
        description:
          "Kết quả của chương trình được đánh giá bằng mức độ dự án hiểu thị trường rõ hơn, sản phẩm cụ thể hơn và xác định được bước đi tiếp theo:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Định vị và hồ sơ dự án rõ ràng, sản phẩm mẫu MVP / POC hoàn thiện.",
          "Kết quả kiểm chứng nhu cầu khách hàng và kế hoạch tiếp cận thị trường.",
          "Mô hình kinh doanh, phương án vận hành và tài chính ban đầu vững chắc.",
          "Mạng lưới chuyên gia, doanh nghiệp và đối tác đầu tư phù hợp.",
          "Kết nối hạ tầng UAV, AI, GIS, phần mềm và Data Center từ VDCD Group.",
        ],
      },
    ],
  },
  "dao-tao-cong-nghe-va-chuyen-doi-so": {
    slug: "dao-tao-cong-nghe-va-chuyen-doi-so",
    title: "Đào Tạo Công Nghệ Và Chuyển Đổi Số",
    subtitle:
      "Chương trình đào tạo theo nhu cầu thực tế về chuyển đổi số, UAV, AI, GIS, BIM và quản trị dữ liệu",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1600,q-80,f-auto",
    introText:
      "Trung tâm Đổi mới Sáng tạo Gia Lai tổ chức các chương trình đào tạo, bồi dưỡng và nâng cao năng lực theo nhu cầu thực tế của cơ quan quản lý nhà nước, doanh nghiệp, hợp tác xã và lực lượng lao động trẻ. Nội dung được xây dựng theo từng nhóm đối tượng, kết hợp kiến thức nền tảng, tình huống thực tế và hoạt động thực hành, giúp người học có thể áp dụng trực tiếp vào công việc.",
    accentColor: "#0284c7",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image57.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image62.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image107.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Đào tạo gắn với nhu cầu thực tế",
        description:
          "Nội dung đào tạo được xây dựng từ bài toán thực tế của địa phương, tổ chức theo nguyên tắc:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image57.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Đúng đối tượng: Nội dung phù hợp với vai trò và trình độ người học.",
          "Thực tế và ứng dụng được: Giảm lý thuyết chung chung, tăng ví dụ, tình huống và thao tác trực tiếp.",
          "Đồng hành sau đào tạo: Hướng dẫn áp dụng và kết nối giải pháp công nghệ khi đơn vị triển khai thực tế.",
        ],
      },
      {
        title: "2. Đối tượng đào tạo trọng tâm",
        description:
          "Các chương trình được tùy biến chuyên sâu cho từng nhóm học viên:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image62.png?tr=w-1000,q-80,f-auto",
        layout: "card-grid",
        points: [
          "Cán bộ, công chức, viên chức: Nâng cao nhận thức về chuyển đổi số, quản trị dữ liệu và khả năng ứng dụng công nghệ trong công tác quản lý, điều hành và cung cấp dịch vụ công.",
          "Lãnh đạo và quản lý doanh nghiệp: Hiểu đúng về chuyển đổi số, lựa chọn giải pháp phù hợp, xây dựng lộ trình và quản trị quá trình thay đổi trong doanh nghiệp.",
          "Nhân sự kỹ thuật và vận hành: Nâng cao kỹ năng sử dụng phần mềm, thiết bị, quy trình số hóa và an toàn thông tin.",
          "Hợp tác xã và hộ kinh doanh: Tiếp cận công nghệ số trong sản xuất nông nghiệp, quản lý bán hàng, truy xuất nguồn gốc và thương mại điện tử.",
          "Sinh viên và người trẻ: Trang bị kỹ năng số thực tế, kiến thức về UAV, AI, GIS, lập trình và tư duy đổi mới sáng tạo để gia tăng cơ hội việc làm.",
        ],
      },
      {
        title: "3. Các chuyên đề đào tạo chuyên sâu",
        description: "Các module đào tạo từ cơ bản đến nâng cao:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1400,q-80,f-auto",
        layout: "numbered-steps",
        points: [
          "Chuyển đổi số và Quản trị dữ liệu: Nhận thức đúng về chuyển đổi số, rà soát quy trình và chuẩn hóa dữ liệu, an toàn và khai thác dữ liệu trong hoạt động cơ quan, doanh nghiệp.",
          "Công nghệ UAV và Đo đạc trắc địa số: Kiến thức an toàn bay, quy trình thu thập dữ liệu bằng UAV, xử lý dữ liệu ảnh thành bản đồ 2D, 3D, ứng dụng trong địa chính, lâm nghiệp, nông nghiệp và giám sát công trình.",
          "Trí tuệ nhân tạo (AI) và Tự động hóa: Ứng dụng AI trong phân tích hình ảnh, video, camera AI giám sát thông minh, tự động hóa quy trình nghiệp vụ.",
          "Hệ thống Thông tin Địa lý (GIS) và Mô hình BIM: Quản trị dữ liệu không gian, xây dựng bản đồ số chuyên ngành, ứng dụng BIM trong quản lý dự án xây dựng và đô thị.",
          "Khởi nghiệp và Đổi mới sáng tạo: Phương pháp phát triển ý tưởng, xây dựng mô hình kinh doanh, hoàn thiện sản phẩm thử nghiệm MVP.",
        ],
      },
      {
        title: "4. Quy trình tổ chức đào tạo 5 bước",
        description:
          "Quy trình khép kín đảm bảo chất lượng chuyển giao tri thức:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image107.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "01. Khảo sát nhu cầu: Trao đổi với đơn vị để xác định mục tiêu, đối tượng, thời lượng và kết quả kỳ vọng.",
          "02. Xây dựng chương trình: Thiết kế nội dung, bài tập thực hành và tài liệu phù hợp với bài toán của người học.",
          "03. Tổ chức đào tạo: Giảng viên và chuyên gia trực tiếp hướng dẫn, kết hợp thảo luận và giải quyết tình huống thực tế.",
          "04. Thực hành và kiểm tra: Người học thực hành trên dữ liệu, phần mềm hoặc thiết bị thực tế để củng cố kỹ năng.",
          "05. Đánh giá và đề xuất áp dụng: Tổng kết khóa học, đánh giá kết quả và đề xuất các bước triển khai tiếp theo.",
        ],
      },
    ],
  },
  "ket-noi-chuyen-gia-va-he-sinh-thai": {
    slug: "ket-noi-chuyen-gia-va-he-sinh-thai",
    title: "Kết Nối Chuyên Gia Và Hệ Sinh Thái",
    subtitle:
      "Kết nối đúng chuyên môn – Tháo gỡ đúng nút thắt – Mở rộng cơ hội hợp tác",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1600,q-80,f-auto",
    introText:
      "Một vấn đề chỉ có thể được giải quyết hiệu quả khi đơn vị tiếp cận đúng người có chuyên môn phù hợp. Trung tâm Đổi mới Sáng tạo Gia Lai đóng vai trò đầu mối kết nối giữa cơ quan quản lý, doanh nghiệp, hợp tác xã, startup với mạng lưới chuyên gia, viện nghiên cứu, trường đại học và các tổ chức phát triển trong hệ sinh thái đổi mới sáng tạo.",
    accentColor: "#6366f1",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image103.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Khi nào cần kết nối chuyên gia?",
        description:
          "Nhiều đơn vị gặp những nhu cầu cấp thiết cần sự đồng hành của chuyên gia:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Gặp bài toán kỹ thuật phức tạp nhưng chưa có nhân sự chuyên sâu.",
          "Cần góc nhìn độc lập để đánh giá một giải pháp hoặc dự án.",
          "Muốn đổi mới quy trình nhưng chưa biết bắt đầu từ đâu.",
          "Cần đối tác có năng lực kỹ thuật để phối hợp triển khai.",
          "Tìm kiếm chuyên gia đào tạo, chia sẻ hoặc tư vấn chuyên đề.",
          "Muốn kết nối với các nguồn lực trong hệ sinh thái khởi nghiệp.",
        ],
      },
      {
        title: "2. Lĩnh vực chuyên gia kết nối trọng điểm",
        description: "Mạng lưới chuyên gia đa ngành sẵn sàng hỗ trợ:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1000,q-80,f-auto",
        layout: "card-grid",
        points: [
          "Công nghệ số và Chuyển đổi số: Hạ tầng công nghệ, trung tâm dữ liệu và an toàn thông tin; Phần mềm, ứng dụng và nền tảng quản lý; Tự động hóa, giám sát và cảnh báo thông minh; Trí tuệ nhân tạo (AI), thị giác máy tính và phân tích dữ liệu; UAV, GIS, trắc địa số và mô hình không gian 3D.",
          "Đổi mới sáng tạo và Khởi nghiệp: Đánh giá ý tưởng và mô hình kinh doanh; Phát triển sản phẩm và ứng dụng công nghệ; Sở hữu trí tuệ và tiêu chuẩn chất lượng; Hồ sơ dự án và định hướng tiếp cận nguồn lực.",
          "Chuyên ngành theo lĩnh vực: Đất đai, địa chính và tài nguyên môi trường; Nông nghiệp công nghệ cao và lâm nghiệp; Xây dựng, kiến trúc, quy hoạch và mô hình BIM; Đô thị thông minh, giao thông và chiếu sáng; Năng lượng tái tạo và quản lý hạ tầng.",
        ],
      },
      {
        title: "3. Hình thức kết nối linh hoạt",
        description: "Các phương thức tương tác hiệu quả:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image103.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Trao đổi trực tiếp với chuyên gia: Thảo luận 1-1 hoặc theo nhóm nhỏ để làm rõ bài toán và tìm kiếm định hướng.",
          "Hội đồng tư vấn chuyên môn: Tập hợp chuyên gia từ nhiều lĩnh vực để đánh giá một dự án, sản phẩm hoặc giải pháp phức tạp.",
          "Hội thảo và tọa đàm chuyên đề: Tạo không gian trao đổi giữa các bên có cùng mối quan tâm về một chủ đề cụ thể.",
          "Đồng hành theo dự án: Chuyên gia tham gia cố vấn kỹ thuật, đánh giá tiến độ hoặc chuyển giao công nghệ.",
        ],
      },
      {
        title: "4. Quy trình kết nối 5 bước",
        description: "Đảm bảo tính thực chất và bảo mật thông tin:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1400,q-80,f-auto",
        layout: "numbered-steps",
        points: [
          "01. Tiếp nhận nhu cầu: Tìm hiểu vấn đề, mục tiêu và kỳ vọng của đơn vị.",
          "02. Phân tích bài toán: Làm rõ phạm vi, mức độ chuyên sâu và năng lực chuyên gia cần thiết.",
          "03. Lựa chọn chuyên gia: Đề xuất chuyên gia hoặc tổ chức có kinh nghiệm phù hợp.",
          "04. Tổ chức kết nối: Sắp xếp buổi làm việc, trao đổi hoặc khảo sát thực tế.",
          "05. Theo dõi và mở rộng hợp tác: Hỗ trợ các bên duy trì liên lạc và triển khai các bước tiếp theo.",
        ],
      },
    ],
  },
  "tu-van-chuyen-doi-so-cap-tinh": {
    slug: "tu-van-chuyen-doi-so-cap-tinh",
    title: "Tư Vấn Chuyển Đổi Số Cấp Tỉnh",
    subtitle: "Tư vấn chuyển đổi số từ bài toán thực tế đến lộ trình khả thi",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1600,q-80,f-auto",
    introText:
      "Trung tâm Đổi mới Sáng tạo Gia Lai cung cấp dịch vụ tư vấn chuyển đổi số cho các sở, ban, ngành, ủy ban nhân dân các cấp, doanh nghiệp và tổ chức trên địa bàn tỉnh. Dịch vụ tập trung vào việc đánh giá đúng hiện trạng, xác định đúng bài toán ưu tiên, lựa chọn giải pháp công nghệ phù hợp và xây dựng lộ trình triển khai khả thi, giúp đơn vị tối ưu chi phí và tạo ra hiệu quả thực tế.",
    accentColor: "#0891b2",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image111.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Chuyển đổi số nên bắt đầu từ đâu?",
        description:
          "Nhiều đơn vị muốn chuyển đổi số nhưng gặp phải những vướng mắc phổ biến:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Quy trình còn phụ thuộc nhiều vào thao tác thủ công.",
          "Dữ liệu phân tán giữa hồ sơ, phần mềm và các phòng ban.",
          "Hệ thống hiện có chưa kết nối hoặc khó mở rộng.",
          "Việc tổng hợp báo cáo mất nhiều thời gian.",
          "Khó theo dõi tiến độ và hoạt động theo thời gian thực.",
          "Đã đầu tư công nghệ nhưng chưa khai thác hiệu quả.",
          "Nhân sự chưa sẵn sàng tiếp nhận quy trình và công cụ mới.",
          "Chưa có lộ trình và tiêu chí đánh giá rõ ràng.",
        ],
      },
      {
        title: "2. Tư vấn chuyển đổi số cấp tỉnh và liên ngành",
        description:
          "Chuyển đổi số cấp tỉnh đòi hỏi một lộ trình tổng thể và kết nối dữ liệu liên ngành:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1000,q-80,f-auto",
        layout: "card-grid",
        points: [
          "Khảo sát hiện trạng chuyển đổi số tại các sở, ban, ngành.",
          "Tổng hợp nhu cầu và mức độ sẵn sàng của từng đơn vị.",
          "Rà soát quy trình, phần mềm và nguồn dữ liệu hiện có.",
          "Xác định dữ liệu chuyên ngành và dữ liệu có thể chia sẻ.",
          "Xây dựng danh mục nhiệm vụ chuyển đổi số theo mức độ ưu tiên.",
          "Đề xuất kiến trúc tích hợp và nền tảng dữ liệu dùng chung.",
          "Xây dựng dashboard theo dõi tiến độ và hỗ trợ điều hành.",
          "Lựa chọn mô hình thí điểm trước khi triển khai diện rộng.",
          "Đào tạo và chuyển giao cho đội ngũ vận hành tại địa phương.",
        ],
      },
      {
        title: "3. Nội dung tư vấn cốt lõi",
        description: "Tập trung giải quyết bài toán thực chất:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image111.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Đánh giá hiện trạng và xác định ưu tiên: Khảo sát quy trình, dữ liệu, phần mềm, thiết bị, hạ tầng và nhân sự.",
          "Số hóa quy trình và quản trị dữ liệu: Rà soát thao tác trùng lặp, chuẩn hóa dữ liệu phục vụ báo cáo và hỗ trợ ra quyết định.",
          "Kiến trúc công nghệ và tích hợp hệ thống: Kết hợp UAV, AI, GIS, Camera AI, IoT, Dashboard và Data Center.",
          "Thí điểm và mở rộng giải pháp: Xây dựng mô hình POC thử nghiệm, đo lường và nhân rộng.",
        ],
      },
      {
        title: "4. Quy trình tư vấn 5 bước",
        description: "Lộ trình bài bản giúp kiểm soát rủi ro:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1400,q-80,f-auto",
        layout: "numbered-steps",
        points: [
          "01. Tiếp nhận nhu cầu: Trao đổi về hiện trạng, khó khăn, mục tiêu và phạm vi cần tư vấn.",
          "02. Khảo sát và phân tích: Đánh giá quy trình, dữ liệu, hệ thống, hạ tầng và nguồn lực liên quan.",
          "03. Xây dựng danh mục ưu tiên: Xác định những bài toán có tính cấp thiết, khả thi và giá trị rõ ràng.",
          "04. Đề xuất lộ trình và giải pháp: Xây dựng các giai đoạn triển khai, kiến trúc công nghệ và tiêu chí đánh giá.",
          "05. Thí điểm, đánh giá và mở rộng: Thử nghiệm trong phạm vi phù hợp, đo lường kết quả và nhân rộng.",
        ],
      },
    ],
  },
  "hoi-thao-su-kien": {
    slug: "hoi-thao-su-kien",
    title: "Hội Thảo & Sự Kiện Đổi Mới Sáng Tạo",
    subtitle:
      "Diễn đàn kết nối tri thức, chia sẻ xu hướng công nghệ mới và xúc tiến đổi mới sáng tạo",
    imageUrl:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1600,q-80,f-auto",
    introText:
      "Trung tâm Đổi mới Sáng tạo Gia Lai phối hợp cùng Sở Khoa học và Công nghệ tỉnh Gia Lai, các cơ quan ban ngành và đối tác công nghệ tổ chức các buổi hội thảo truyền thông chính sách, diễn đàn chia sẻ xu hướng công nghệ và sự kiện kết nối đầu tư nhằm thúc đẩy hệ sinh thái khởi nghiệp đổi mới sáng tạo trên địa bàn toàn tỉnh.",
    accentColor: "#f43f5e",
    galleryImages: [
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1200,q-80,f-auto",
    ],
    sections: [
      {
        title: "1. Hội thảo truyền thông chính sách khởi nghiệp sáng tạo",
        description:
          "Tạo không gian kết nối giữa cơ quan quản lý, trường đại học, doanh nghiệp và cộng đồng khởi nghiệp:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Thảo luận những vấn đề về tiếp cận công nghệ, thị trường và cơ chế hỗ trợ.",
          "Tăng cường mức độ liên kết giữa các thành phần trong hệ sinh thái số.",
          "Phát biểu khai mạc và định hướng phát triển từ lãnh đạo Sở KH&CN tỉnh Gia Lai.",
        ],
      },
      {
        title: "2. Ký kết hợp tác và Kết nối đa bên",
        description:
          "Các sự kiện đánh dấu nhiều hoạt động ký kết hợp tác giữa các thành phần của hệ sinh thái:",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1000,q-80,f-auto",
        layout: "split-image",
        points: [
          "Ký kết hợp tác giữa doanh nghiệp và các trường đại học, viện nghiên cứu.",
          "Tạo cơ hội để sinh viên, nhà nghiên cứu và startup tiếp cận bài toán thực tế.",
          "Xúc tiến nguồn lực đầu tư cho các dự án tiềm năng.",
        ],
      },
      {
        title: "3. Định hướng tổ chức sự kiện thực chất",
        description:
          "Số lượng sự kiện hay kết nối không phải là thước đo cuối cùng. Giá trị thực sự nằm ở những dự án được hình thành, những sản phẩm được ứng dụng và năng lực công nghệ được nâng cao cho địa phương.",
        imageUrl:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1400,q-80,f-auto",
        layout: "full-width-image",
        points: [
          "Diễn đàn công nghệ chuyên sâu theo ngành: Nông nghiệp, Đô thị, Tài nguyên môi trường, Năng lượng.",
          "TechFest Gia Lai & Ngày hội khởi nghiệp sáng tạo thường niên.",
          "Triển lãm Demo Day trải nghiệm thực tế giải pháp Drone, AI, Robot, VR360.",
        ],
      },
    ],
  },
};
