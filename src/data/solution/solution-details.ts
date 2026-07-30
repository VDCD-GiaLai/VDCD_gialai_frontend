export interface SolutionDetailSection {
  title: string;
  description?: string;
  points?: string[];
}

export interface SolutionDetail {
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  introText: string;
  sections: SolutionDetailSection[];
}

export const SOLUTION_DETAILS: Record<string, SolutionDetail> = {
  "nong-nghiep-lam-nghiep": {
    slug: "nong-nghiep-lam-nghiep",
    title: "Nông nghiệp - Lâm nghiệp",
    subtitle: "Giải pháp nông nghiệp thông minh công nghệ cao",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/Ban-sao-cua-IMG_2462-1024x768.jpg",
    introText:
      "Trong kỷ nguyên số, việc chuyển đổi phương thức sản xuất nông nghiệp truyền thống sang mô hình nông nghiệp thông minh là yêu cầu thiết yếu để nâng cao năng suất, tối ưu chi phí và gia tăng năng lực cạnh tranh. VDCD Group mang đến hệ sinh thái công nghệ khép kín, kết hợp sức mạnh của Thiết bị bay không người lái (UAV/Drone), Nền tảng giám sát tự động AutoTimelapse và Hệ thống Trạm cân thông minh, giúp số hóa toàn diện quy trình sản xuất từ khâu khảo sát quy hoạch đến thu hoạch và phân phối.",
    sections: [
      {
        title:
          "1. Ứng dụng công nghệ UAV/Drone trong khảo sát, phân tích và chăm sóc",
        description:
          "Đây là bước nền tảng đầu tiên, sử dụng thiết bị bay để quản lý không gian và tự động hóa các khâu chăm sóc tốn nhiều sức lao động.",
        points: [
          "Thành lập bản đồ địa hình và hiện trạng: Khảo sát, dựng bản đồ Orthomosaic độ phân giải siêu cao giúp quản lý bao quát. Kiểm tra chính xác ranh giới các thửa ruộng trên thực tế và so sánh với hồ sơ trong sổ.",
          "Số hóa dữ liệu theo lô thửa: Tạo lập cơ sở dữ liệu số hóa chi tiết cho từng khu vực canh tác bao gồm: giống cây, loại đất, thời gian gieo trồng.",
          "Kiểm kê sinh khối và dự báo năng suất: Thu thập dữ liệu không gian để tự động đếm số lượng cây, phân loại cây, xác định tọa độ, đo lường chiều cao, chu vi tán, đường kính gốc và màu sắc lá. Từ đó ước tính sinh khối và dự báo chuẩn xác sản lượng.",
          "Phân tích sức khỏe cây trồng (Camera đa phổ): Sử dụng cảm biến Multispectral đo lường chỉ số NDVI, giúp phát hiện sớm các khu vực cây trồng bị stress do thiếu nước, thiếu dinh dưỡng hoặc sâu bệnh trước khi biểu hiện ra bên ngoài.",
          "Tự động hóa gieo hạt, rải phân và phun thuốc: Lắp đặt hệ thống bình chứa chuyên dụng, UAV có khả năng rải đa dạng các loại phân (dạng bột, dạng hạt… mà không bị vón cục), gieo hạt và phun thuốc bảo vệ thực vật nhanh chóng trên diện tích lớn. Thiết bị hoạt động hiệu quả ngay cả vào ban đêm hay thời tiết xấu. Qua đó, tiết kiệm tối đa sức lao động, phân bổ vật tư đồng đều, tránh lãng phí và đặc biệt giúp nông dân giảm thiểu việc tiếp xúc trực tiếp với hóa chất độc hại.",
        ],
      },
      {
        title:
          "2. Ứng dụng nền tảng AutoTimelapse trong giám sát và quan trắc môi trường",
        description:
          "Hệ thống AutoTimelapse bám sát vòng đời sinh trưởng của nông sản, kết nối chuỗi giá trị nông nghiệp thông minh.",
        points: [
          "Giám sát trực quan 24/7: Hệ thống camera độ phân giải cao ghi lại toàn cảnh liên tục mọi biến đổi của cây trồng, vật nuôi; hỗ trợ chủ trang trại giám sát sát sao thời gian, cách thức phun thuốc, bón phân để đảm bảo an toàn lao động.",
          "Quan trắc vi khí hậu đa chỉ số: Tích hợp hệ thống cảm biến đo lường liên tục các thông số môi trường. Tự động gửi thông báo về thiết bị di động khi các chỉ số vượt quá mức giới hạn an toàn.",
          "Nhật ký canh tác đa phương tiện: Cho phép cập nhật nhật ký đa phương thức (văn bản, hình ảnh, video…) ghi lại chi tiết quá trình hoạt động từ trồng trọt, chăn nuôi đến chế biến, đóng gói. Chuyển đổi kết quả đo lường thành biểu đồ để so sánh giữa các thời đoạn, vụ mùa.",
          "Quét mã QR truy xuất nguồn gốc: Chiết xuất chuỗi hình ảnh thành video Timelapse sinh động và tích hợp vào mã QR cho từng sản phẩm. Khách hàng chỉ cần quét mã để xem video nuôi trồng thực tế, mang lại thông tin khách quan, gia tăng niềm tin tuyệt đối vào nông sản sạch.",
        ],
      },
      {
        title: "3. Ứng dụng giải pháp Trạm cân thông minh SmartScale",
        description:
          "Giải pháp trọn gói hỗ trợ doanh nghiệp quản lý minh bạch khâu xuất/nhập nông sản, vật nuôi.",
        points: [
          "Quản lý tập trung từ xa: Bao gồm phần mềm cân và ứng dụng quản lý trên Web/App, giúp doanh nghiệp kiểm soát toàn bộ các trạm cân xe từ xa.",
          "Giám sát chống gian lận: Số liệu và hình ảnh cân của cây trồng, vật nuôi được cập nhật liên tục. Hệ thống tích hợp 4 camera giám sát đầy đủ các góc, tự động nhận diện, giám sát số cân và cảnh báo ngay lập tức nếu phát hiện lệch bì hoặc có hành vi gian lận.",
        ],
      },
      {
        title: "4. Lợi ích vượt trội cho Hệ sinh thái Nông nghiệp - Lâm nghiệp",
        points: [
          "Canh tác chính xác (Precision Agriculture): Chuyển từ quản lý cảm tính sang dữ liệu thực tế. Tối ưu hóa việc sử dụng tài nguyên (nước, phân bón, thuốc) đúng vị trí, đúng liều lượng.",
          "Tiết kiệm nguồn lực vận hành: Giảm thiểu chi phí nhân công đi lại tuần tra, đo đạc, phun tưới. Mọi công tác được thực hiện tự động và giám sát từ xa.",
          "Minh bạch hóa và gia tăng giá trị: Chuỗi số liệu môi trường, nhật ký hình ảnh Timelapse không thể chỉnh sửa là minh chứng đáng tin cậy nhất để đáp ứng các tiêu chuẩn khắt khe, đồng thời là công cụ truyền thông mạnh mẽ giúp nông sản Việt Nam dễ dàng chinh phục các thị trường khó tính.",
        ],
      },
    ],
  },
  "an-ninh-giam-sat-an-ninh": {
    slug: "an-ninh-giam-sat-an-ninh",
    title: "Giám sát an ninh",
    subtitle: "Hệ thống giám sát an ninh toàn diện AutoTimelapse",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7896992273679_a63ab25fd7af7b68be795587ac4a41fb-1-1024x683.jpg",
    introText:
      "Đảm bảo an ninh trật tự, bảo vệ tài sản tại các công trình trọng điểm, khu công nghiệp hay khu vực biên giới luôn là bài toán đòi hỏi sự giám sát liên tục và tính toàn vẹn của dữ liệu. Khắc phục những điểm mù và hạn chế của hệ thống camera quan sát (CCTV) truyền thống, VDCD Group mang đến nền tảng giám sát an ninh công nghệ cao AutoTimelapse. Hệ thống tích hợp công nghệ chụp ảnh độ phân giải siêu cao, truyền tải dữ liệu không dây và điện toán đám mây, tạo ra một rào chắn an ninh vững chắc cho mọi dự án vĩ mô.",
    sections: [
      {
        title:
          "1. Ứng dụng nền tảng AutoTimelapse trong giám sát an ninh toàn diện",
        description:
          "Hệ thống được thiết kế đặc thù để hoạt động bền bỉ, độc lập tại những môi trường phức tạp nhất, cung cấp tầm nhìn bao quát và liên tục cho trung tâm điều hành.",
        points: [
          "Giám sát trực quan 24/7: Thiết bị camera chuyên dụng ghi nhận hình ảnh liên tục với độ phân giải siêu nét (từ 8MP đến 61MP), vượt trội hoàn toàn so với camera an ninh thông thường. Hệ thống cho phép quan sát rõ nét biển số xe, nhận diện khuôn mặt và các chi tiết nhỏ nhất tại hiện trường ngay cả trong điều kiện ánh sáng yếu.",
          "Vận hành độc lập: Tích hợp hệ thống năng lượng mặt trời (Solar) và kết nối mạng không dây (3G/4G/5G). Giải pháp này đặc biệt hoàn hảo cho các đại công trường mới khởi công, các tuyến đường cao tốc, hồ thủy điện hay khu vực biên giới – nơi lưới điện và internet chưa được rải tới.",
          "Khả năng chống chịu thời tiết khắc nghiệt: Thiết bị được chế tạo với chuẩn chống nước, chống bụi cao cấp, hoạt động ổn định dưới điều kiện mưa bão, sương mù, nắng gắt hay môi trường khói bụi đặc thù của các khu khai thác khoáng sản.",
        ],
      },
      {
        title: "2. Tối ưu hóa hiệu suất quản trị và phản ứng nhanh",
        description:
          "Điểm khác biệt cốt lõi của giải pháp VDCD Group không chỉ nằm ở phần cứng, mà là khả năng xử lý dữ liệu thông minh trên phần mềm, giúp tối ưu hóa nguồn lực con người.",
        points: [
          "Công nghệ nén thời gian (Timelapse): Thay vì phải căng mắt xem lại hàng trăm giờ video CCTV lưu trữ để tìm kiếm một sự kiện bất thường, phần mềm tự động chiết xuất chuỗi hình ảnh thành video Timelapse. Người quản lý có thể tua nhanh, tóm tắt diễn biến an ninh của cả một ngày, một tuần chỉ trong vài phút, giúp phát hiện nhanh chóng các hoạt động khả nghi.",
          "Cảnh báo tức thời (Real-time Alerts): Hệ thống có khả năng kết nối với các cảm biến chuyển động hoặc tích hợp thuật toán phân tích AI. Khi có sự xâm nhập trái phép vào khu vực cấm hoặc ngoài giờ hành chính, hệ thống lập tức gửi cảnh báo động (thông báo đẩy, tin nhắn) về thiết bị di động của lực lượng bảo vệ.",
          "Lưu trữ đám mây (Cloud Storage) bảo mật tuyệt đối: Toàn bộ dữ liệu hình ảnh được mã hóa và đồng bộ liên tục lên máy chủ điện toán đám mây. Khác với việc lưu trữ bằng ổ cứng tại chỗ dễ bị kẻ gian phá hoại hoặc đánh cắp, dữ liệu an ninh của VDCD Group luôn được bảo toàn nguyên vẹn, sẵn sàng trích xuất làm bằng chứng pháp lý bất cứ lúc nào.",
        ],
      },
      {
        title: "3. Lợi ích vượt trội cho Hệ sinh thái An ninh",
        points: [
          "Tối ưu chi phí nhân sự: Cắt giảm đáng kể lực lượng tuần tra vật lý tại các khu vực rộng lớn. Một nhân sự tại phòng điều hành có thể giám sát đồng thời hàng chục điểm cầu, công trường khác nhau thông qua phần mềm tập trung.",
          "Minh bạch hóa công tác quản lý: Hệ thống phân quyền chặt chẽ, ghi lại toàn bộ lịch sử truy cập và tác động vào phần mềm, đảm bảo không một cá nhân nào có thể can thiệp, xóa bỏ hay chỉnh sửa dữ liệu hình ảnh hiện trường.",
          "Nâng tầm năng lực quản lý vĩ mô: Cung cấp cho các cơ quan chức năng (Công an, Ban quản lý khu công nghiệp, Chủ đầu tư) một nền tảng giám sát đồng bộ, trực quan, hỗ trợ đắc lực trong việc duy trì an ninh trật tự, phòng chống thất thoát tài sản và điều tra sự cố.",
        ],
      },
    ],
  },
  "dien-nang-luong": {
    slug: "dien-nang-luong",
    title: "Điện - Năng lượng",
    subtitle: "Giải pháp số hóa hạ tầng điện và năng lượng tái tạo",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/Dien-gio-Quang-Tri-1-1410x720.jpg",
    introText:
      "Đảm bảo an ninh năng lượng và vận hành an toàn hệ thống điện lưới, năng lượng tái tạo (điện gió, điện mặt trời) là bài toán vĩ mô mang tính chiến lược. VDCD Group cung cấp hệ sinh thái công nghệ lõi kết hợp giữa Thiết bị bay không người lái (UAV/Drone), Camera nhiệt (Thermal) và hệ thống giám sát tự động AutoTimelapse để số hóa toàn diện từ khâu quy hoạch, thi công cho đến kiểm tra, vận hành mạng lưới năng lượng.",
    sections: [
      {
        title:
          "1. Ứng dụng công nghệ UAV/Drone trong khảo sát và vận hành lưới điện",
        description:
          "Việc ứng dụng UAV thay thế phương pháp đo đạc, kiểm tra thủ công trong các môi trường nguy hiểm, địa hình đồi núi hiểm trở giúp mang lại độ chính xác cao và an toàn tuyệt đối cho người lao động.",
        points: [
          "Cải thiện quy hoạch tuyến đường dây năng lượng mới: Bay quét 3D khu vực dự kiến xây dựng tuyến điện, phân tích hiện trạng địa hình, chiều cao và vị trí các địa vật mà tuyến dây sẽ đi qua. Dữ liệu này giúp tối ưu hóa thiết kế hướng tuyến và hỗ trợ đắc lực cho công tác thống kê, đền bù giải phóng mặt bằng.",
          "Kiểm tra, đánh giá hệ thống đường dây điện hiện hữu: Scan 3D chi tiết để xác định vị trí không gian của hệ thống dây và cột điện. Đánh giá độ võng đường dây, khảo sát hành lang an toàn lưới điện, phát hiện rạn nứt cột và các vật thể/cây cối vướng vào đường dây. Đặc biệt, ứng dụng camera nhiệt (Thermal Camera) để quét dọc tuyến, phát hiện sớm các vị trí tỏa nhiệt bất thường, ngăn ngừa nguy cơ chập cháy lưới điện.",
          "Đánh giá hiện trạng và hiệu suất trang trại điện mặt trời: Thiết bị bay tích hợp camera nhiệt quét toàn bộ bề mặt các tấm pin năng lượng mặt trời trên diện rộng. Hệ thống định vị chính xác các cell pin bị lỗi, điểm nóng (hotspot) dựa trên sự khác biệt nhiệt độ, từ đó phân vùng các khu vực suy giảm hiệu suất để đội ngũ kỹ thuật tiến hành bảo trì, thay thế kịp thời.",
          "Khảo sát xây dựng dự án điện gió: Lập mô hình không gian 3D khu vực quy hoạch điện gió, thống kê chi tiết địa hình, nhà cửa và thực bì. Đánh giá địa hình bề mặt để phát hiện chướng ngại vật, tính toán tiềm năng gió và lập phương án bố trí tua-bin tối ưu, giảm thiểu tác động môi trường.",
        ],
      },
      {
        title:
          "2. Ứng dụng nền tảng AutoTimelapse trong giám sát dự án năng lượng",
        description:
          "Các dự án năng lượng như trạm biến áp, tháp điện gió hay cánh đồng pin mặt trời thường có quy mô rất lớn, triển khai tại vùng sâu vùng xa với thời gian thi công kéo dài.",
        points: [
          "Giám sát thi công tự động 24/7: Hệ thống AutoTimelapse ghi lại liên tục toàn bộ quá trình thi công xây dựng: từ san lấp mặt bằng, dựng trụ điện gió đến lắp ráp hàng ngàn tấm pin mặt trời mà không cần sự hiện diện liên tục của cán bộ giám sát tại công trường.",
          "Đồng bộ tiến độ trực tuyến: Dữ liệu hình ảnh được cập nhật tự động lên nền tảng đám mây (Cloud), giúp Chủ đầu tư, Tổng thầu dễ dàng theo dõi tiến độ, kiểm soát chất lượng và đánh giá năng lực của các nhà thầu phụ từ xa.",
          "Tư liệu báo cáo trực quan: Chiết xuất video Timelapse tua nhanh quá trình hình thành của dự án qua nhiều tháng/năm. Đây là tư liệu báo cáo tiến độ trực quan, thuyết phục nhất dành cho Ban Lãnh đạo, nhà đầu tư và các cơ quan quản lý nhà nước.",
        ],
      },
      {
        title: "3. Lợi ích vượt trội cho Hệ sinh thái Năng lượng",
        points: [
          "Đảm bảo an toàn tuyệt đối: Loại bỏ hoàn toàn các rủi ro nguy hiểm đến tính mạng khi công nhân phải trèo cao kiểm tra đường dây hoặc đi vào các khu vực địa hình rừng sâu, đồi dốc.",
          "Tiết kiệm thời gian và tối ưu chi phí vận hành: Rút ngắn thời gian khảo sát từ nhiều ngày xuống chỉ còn vài giờ bay. Quá trình kiểm tra bằng UAV có thể diễn ra ngay cả khi lưới điện đang hoạt động, giảm thiểu tối đa thời gian phải cắt điện để bảo trì.",
          "Bảo vệ tài sản và duy trì hiệu suất: Phát hiện sớm những sự cố siêu nhỏ trên lưới điện hay tấm pin mặt trời trước khi chúng lan rộng, đảm bảo nguồn cung cấp điện được duy trì ổn định, an toàn và tối đa hóa lợi nhuận cho nhà đầu tư.",
        ],
      },
    ],
  },
  "tai-nguyen-khai-thac-khoang-san": {
    slug: "tai-nguyen-khai-thac-khoang-san",
    title: "Khai thác khoáng sản",
    subtitle: "Số hóa toàn diện và kiểm soát minh bạch hoạt động khai thác mỏ",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7903688360376_37c98f8dadd2f5e6419362c107fe4ca4-1-1024x509.jpg",
    introText:
      "Quản lý, khai thác tài nguyên và khoáng sản là lĩnh vực đòi hỏi sự minh bạch cao độ về dữ liệu, tính chính xác trong đo đạc và đặc biệt là yêu cầu khắt khe về an toàn lao động. VDCD Group cung cấp giải pháp số hóa toàn diện khu vực mỏ bằng sự kết hợp giữa Thiết bị bay không người lái (UAV/Drone), Nền tảng giám sát tự động AutoTimelapse, Phần mềm xử lý dữ liệu không gian và Hệ thống Trạm cân thông minh SmartScale. Qua đó, giúp các doanh nghiệp khai khoáng và cơ quan quản lý nhà nước nắm bắt thực trạng, kiểm soát vận hành một cách chuẩn xác và minh bạch nhất.",
    sections: [
      {
        title:
          "1. Ứng dụng công nghệ UAV/Drone trong đo đạc và quản lý khai trường",
        description:
          "Thay thế hoàn toàn các phương pháp đo đạc trắc địa truyền thống vốn mất nhiều thời gian và tiềm ẩn rủi ro tại các địa hình mỏ phức tạp, công nghệ UAV mang lại dữ liệu không gian 3D chi tiết với sai số cực thấp.",
        points: [
          "Thành lập bản đồ số không gian mỏ: Sử dụng UAV bay quét để thiết lập bản đồ địa hình 2D (Orthomosaic) và mô hình không gian 3D của toàn bộ khu vực mỏ, bãi tập kết và các khu vực lân cận. Dữ liệu này là cơ sở quan trọng để lập bản đồ hiện trạng định kỳ.",
          "Tính toán khối lượng đào đắp và trữ lượng: Đây là ứng dụng giá trị nhất. Phần mềm tự động tính toán khối lượng đất đá bóc tầng, khối lượng khoáng sản đã khai thác và trữ lượng còn lại tại bãi tập kết thông qua việc so sánh các mô hình 3D ở các thời điểm bay quét khác nhau.",
          "Hỗ trợ quy hoạch thiết kế khai trường: Cung cấp dữ liệu địa hình chính xác giúp kỹ sư dễ dàng thiết kế mở rộng ranh giới khai thác, quy hoạch hệ thống đường vận chuyển nội bộ, bãi thải và hệ thống thoát nước an toàn, hiệu quả.",
          "Cảnh báo an toàn và đánh giá sạt lở: Phân tích mô hình số độ cao (DEM/DSM) để đo đạc độ dốc các sườn tầng khai thác, phát hiện sớm các vết nứt địa chất, các khu vực có nguy cơ sụt lún hoặc sạt lở đá để kịp thời đưa ra biện pháp gia cố.",
        ],
      },
      {
        title:
          "2. Ứng dụng nền tảng AutoTimelapse trong giám sát vận hành khai trường",
        description:
          "Các khu vực mỏ thường trải rộng, nằm ở những vị trí hẻo lánh và hoạt động liên tục với tần suất cao, đòi hỏi sự giám sát chặt chẽ từ xa.",
        points: [
          "Giám sát bao quát 24/7: Lắp đặt hệ thống AutoTimelapse tại các điểm cao để ghi hình toàn cảnh hoạt động của phương tiện, máy móc tại khai trường và bãi tập kết vật liệu, đảm bảo an ninh và chống thất thoát tài sản.",
          "Quản lý tiến độ trực quan: Dữ liệu hình ảnh được cập nhật liên tục về trung tâm điều hành, giúp Ban Giám đốc doanh nghiệp hoặc cán bộ Sở Tài nguyên và Môi trường dễ dàng kiểm tra, đối chiếu tiến độ khai thác thực tế so với giấy phép được cấp.",
          "Tích hợp quan trắc môi trường mỏ: Hệ thống có khả năng kết nối với các cảm biến IoT để theo dõi nồng độ bụi, tiếng ồn tại khu vực khai thác, đảm bảo tuân thủ các quy định về bảo vệ môi trường sinh thái xung quanh.",
        ],
      },
      {
        title:
          "3. Ứng dụng Hệ thống Trạm cân thông minh SmartScale trong kiểm soát xuất/nhập",
        description:
          "Việc kiểm soát chính xác khối lượng vật liệu, khoáng sản xuất bán ngày càng là yếu tố sống còn để tối ưu hóa doanh thu tại các mỏ đá, mỏ quặng. SmartScale là giải pháp toàn diện giúp số hóa quy trình cân và loại bỏ mọi rủi ro gian lận.",
        points: [
          "Nhận diện tự động & Giám sát toàn diện: Tích hợp công nghệ AI nhận diện tự động biển số xe. Hệ thống trang bị bộ camera giám sát đa góc (phía trước, phía sau, thùng xe, và cabin lái xe) trong suốt quá trình cân, ghi lại hình ảnh rõ nét để đối chiếu.",
          "Chống gian lận tuyệt đối: Tự động cảnh báo và ngăn chặn các hành vi bất thường như: xe đỗ sai vị trí trên bàn cân, lệch trọng lượng bì (tare weight), tài xế cố tình không xuống xe khi cân, hoặc xe có chở thêm các vật thể lạ nhằm gian lận tải trọng.",
          "Quản lý tập trung từ xa (Web/App): Toàn bộ dữ liệu cân (số liệu, hình ảnh, thời gian, loại hàng hóa) được đồng bộ theo thời gian thực lên Cloud. Ban lãnh đạo có thể theo dõi và quản lý trực tuyến nhiều trạm cân tại các mỏ khác nhau thông qua máy tính hoặc điện thoại mà không cần túc trực tại hiện trường.",
          "Tự động hóa báo cáo và liên thông dữ liệu: Hệ thống tự động lưu trữ, xuất phiếu cân, lập báo cáo thống kê chi tiết theo ngày/tháng và dễ dàng kết nối dữ liệu với phần mềm kế toán/ERP của doanh nghiệp. Qua đó, minh bạch hóa doanh thu và ngăn chặn tuyệt đối tình trạng thất thoát.",
        ],
      },
      {
        title: "4. Lợi ích vượt trội cho lĩnh vực Tài nguyên và Khoáng sản",
        points: [
          "Minh bạch hóa dữ liệu quản lý: Chấm dứt tình trạng ước lượng cảm tính hoặc ghi chép thủ công dễ sai sót. Số liệu tính toán từ mô hình 3D và dữ liệu SmartScale là bằng chứng chuẩn xác, khách quan nhất phục vụ công tác thanh tra, kiểm tra, nghiệm thu và đối soát nộp thuế tài nguyên (đặc biệt hữu ích cho các dự án B2G).",
          "Tối đa hóa an toàn lao động: Giữ nhân sự ở khoảng cách an toàn. Đội ngũ trắc địa không cần trực tiếp trèo lên các đống vật liệu rời rạc, trơn trượt hay đi sát các vách đá cheo leo nguy hiểm để đo đạc.",
          "Tiết kiệm nguồn lực vận hành: Rút ngắn thời gian đo đạc một khu mỏ rộng hàng trăm héc-ta từ vài ngày xuống chỉ còn vài giờ bay quét, đồng thời tự động hóa khâu cân đo xuất/nhập, giúp doanh nghiệp tiết kiệm chi phí nhân sự tối đa và không làm gián đoạn vận hành máy móc.",
          "Tư liệu báo cáo sinh động, trực quan: Video Timelapse bao quát sự thay đổi của khu mỏ qua từng giai đoạn cùng với hệ thống báo cáo số hóa chuẩn xác là tài liệu chuyên nghiệp phục vụ cho các kỳ họp cổ đông hoặc các buổi làm việc với cơ quan chức năng.",
        ],
      },
    ],
  },
  "quan-ly-tai-nguyen-quan-trac-moi-truong": {
    slug: "quan-ly-tai-nguyen-quan-trac-moi-truong",
    title: "Tài nguyên môi trường",
    subtitle: "Giám sát tài nguyên thiên nhiên và quan trắc môi trường tự động",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7913610376494_aabfc4669de386a5916480d8fb3f34cd-1024x490.jpg",
    introText:
      "Trước những diễn biến phức tạp của biến đổi khí hậu và yêu cầu khắt khe về phát triển bền vững, công tác giám sát môi trường đòi hỏi sự minh bạch tuyệt đối về dữ liệu. VDCD Group cung cấp hệ sinh thái giải pháp công nghệ toàn diện, kết hợp nền tảng quan trắc tự động AutoTimelapse, Thiết bị bay không người lái (UAV/Drone) và công nghệ vạn vật kết nối (IoT), trở thành công cụ đắc lực hỗ trợ các cơ quan quản lý và doanh nghiệp trong công tác đánh giá, bảo vệ môi trường sinh thái.",
    sections: [
      {
        title:
          "1. Ứng dụng nền tảng AutoTimelapse & IoT trong quan trắc môi trường tự động",
        description:
          "Đây là giải pháp cốt lõi giúp số hóa các chỉ số môi trường theo thời gian thực (Real-time), thay thế hoàn toàn con người túc trực tại các khu vực có điều kiện khắc nghiệt.",
        points: [
          "Thuập thông số chính xác: Hệ thống cảm biến độ nhạy cao liên tục đo lường và cập nhật các chỉ số vi khí hậu như nhiệt độ, độ ẩm, nồng độ bụi mịn, và các loại khí thải chuyên biệt.",
          "Hình ảnh hóa dữ liệu: Không chỉ hiển thị những con số khô khan, hệ thống tự động ghi hình và dựng video Timelapse 4K, giúp quan sát rõ nét quá trình phong hóa, xâm thực địa hình hoặc sự biến đổi của thảm thực vật.",
          "Tích hợp linh hoạt: Phần mềm có khả năng kết nối và đồng bộ số liệu với các thiết bị/trạm quan trắc sẵn có của địa phương, tối ưu hóa hạ tầng và tiết kiệm chi phí đầu tư.",
        ],
      },
      {
        title:
          "2. Ứng dụng công nghệ UAV/Drone trong giám sát không gian và tài nguyên",
        description:
          "Mở rộng tầm nhìn vi mô thành bức tranh vĩ mô trên diện rộng, giúp cơ quan quản lý nắm bắt toàn cảnh hiện trạng tài nguyên một cách nhanh chóng.",
        points: [
          "Khảo sát và đánh giá hiện trạng: Sử dụng UAV bay quét để thiết lập bản đồ 2D/3D khu vực rừng phòng hộ, lưu vực sông, hồ chứa hoặc các vùng sinh thái đặc thù.",
          "Quản lý biến động tài nguyên: Phân tích hình ảnh không gian để phát hiện nhanh chóng tình trạng khai thác trái phép (chặt phá rừng, khai thác cát) hoặc theo dõi mức độ bồi lắng của các hệ thống thủy lợi, đê điều.",
        ],
      },
      {
        title: "3. Ưu điểm vượt trội của hạ tầng thiết bị và lưu trữ đám mây",
        description:
          "Hệ thống thiết bị được VDCD Group thiết kế tối ưu để hoạt động độc lập, bền bỉ tại mọi điều kiện địa hình phức tạp nhất.",
        points: [
          "Vận hành độc lập (Off-grid): Tích hợp hệ thống pin năng lượng mặt trời, cho phép thiết bị hoạt động liên tục 24/7 mà không cần điện lưới hay sự can thiệp của con người.",
          "Chống chịu thời tiết cực đoan: Trang bị công nghệ chống sét lan truyền và chuẩn chống nước, bảo vệ thiết bị cốt lõi an toàn dưới điều kiện mưa bão, sương mù.",
          "Bảo mật và lưu trữ vĩnh viễn: Tích hợp cảm biến báo động khi có tác động vật lý. Toàn bộ dữ liệu số và video Timelapse được mã hóa, lưu trữ an toàn trên nền tảng Cloud, thuận tiện truy xuất mọi lúc.",
        ],
      },
      {
        title: "4. Lợi ích vĩ mô trong quản trị Tài nguyên và Môi trường",
        points: [
          "Tối ưu hóa năng lực quản lý: Giúp các Sở ban ngành sở hữu trung tâm điều hành dữ liệu tập trung, nhận báo cáo trực tuyến nhanh chóng để đưa ra các quyết sách kịp thời.",
          "Cảnh báo sớm rủi ro: Cung cấp dữ liệu thời gian thực để dự báo các hiện tượng ô nhiễm khí hậu, nguy cơ sạt lở hoặc chủ động ứng phó với thời tiết cực đoan.",
          "Minh bạch hóa hoạt động doanh nghiệp: Hỗ trợ các doanh nghiệp tự động hóa báo cáo Đánh giá tác động môi trường (ĐTM), củng cố uy tín và tuân thủ chặt chẽ các tiêu chuẩn sản xuất xanh.",
        ],
      },
    ],
  },
  "du-lich-thong-minh-so-hoa-di-san": {
    slug: "du-lich-thong-minh-so-hoa-di-san",
    title: "Du lịch thông minh - Số hóa di sản",
    subtitle: "Bảo tồn di sản số và phát triển bản đồ số du lịch thông minh",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/Phoenix-Ha-Long-1-1024x683.jpg",
    introText:
      "Việt Nam sở hữu hệ thống tài nguyên du lịch đồ sộ, tuy nhiên công tác quản lý và khai thác hiện đang vấp phải nhiều rào cản do dữ liệu phân tán và hồ sơ lưu trữ rời rạc. Để giải quyết triệt để bài toán này, VDCD Group kiến tạo Hệ sinh thái Du lịch thông minh và Số hóa di sản khép kín. Bằng việc tích hợp các nền tảng công nghệ lõi như UAV Mapping, 3D Laser Scanning, GIS, Trí tuệ nhân tạo (AI) và AutoTimelapse, chúng tôi cung cấp giải pháp toàn diện từ khâu bảo tồn di tích đến nâng tầm trải nghiệm du khách.",
    sections: [
      {
        title:
          "1. Ứng dụng công nghệ quét 3D trong số hóa di sản và bảo tồn di tích",
        description:
          "Thay thế hoàn toàn các hồ sơ giấy 2D rời rạc bằng công nghệ tạo lập “Bản sao số” (Digital Twin) nguyên trạng, tuân thủ tuyệt đối nguyên tắc không xâm lấn di tích.",
        points: [
          "Tái dựng không gian 3D: Ứng dụng thiết bị bay không người lái (UAV) và máy quét 3D Laser để thu thập dữ liệu, thiết lập mô hình số không gian 3D chính xác tuyệt đối của các công trình lịch sử, bảo tàng và hiện vật.",
          "Hỗ trợ trùng tu và phục dựng: Lưu trữ vĩnh viễn cấu trúc, tỷ lệ hình học và hiện trạng kiến trúc. Đây là nền tảng dữ liệu gốc vô giá phục vụ công tác nghiên cứu khoa học, trùng tu và tôn tạo khi di tích có dấu hiệu xuống cấp.",
        ],
      },
      {
        title: "2. Ứng dụng nền tảng GIS xây dựng Bản đồ số không gian du lịch",
        description:
          "Chuyển đổi từ các nguồn dữ liệu phân tán sang một cơ sở dữ liệu không gian (Spatial Database) tập trung, quy tụ mọi thông tin điểm đến lên một nền tảng bản đồ thống nhất của địa phương.",
        points: [
          "Thiết lập Bản đồ du lịch thông minh: Tích hợp toàn bộ vị trí di tích, danh thắng, cơ sở lưu trú, nhà hàng và các dịch vụ tiện ích lên nền tảng bản đồ số GIS trực quan.",
          "Hỗ trợ quy hoạch và định hướng: Giúp các cơ quan quản lý (Sở Du lịch, Ban Quản lý) dễ dàng quy hoạch tuyến tham quan, kết nối chuỗi dịch vụ và hiển thị đầy đủ thông tin văn hóa - lịch sử trên cùng một hệ thống đồng bộ.",
        ],
      },
      {
        title:
          "3. Nền tảng trải nghiệm Du lịch số và truyền thông AutoTimelapse",
        description:
          "Mang di sản và danh thắng Việt Nam vươn tầm quốc tế thông qua môi trường số hóa đa phương tiện, xóa bỏ mọi giới hạn về không gian và thời gian.",
        points: [
          "VR Tour Di sản thực tế ảo: Xây dựng không gian tham quan trực tuyến 360 độ (VR/AR) cho phép du khách toàn cầu tương tác với hiện vật 3D, kết hợp cùng công nghệ thuyết minh tự động (Audio guide AI) hỗ trợ đa ngôn ngữ.",
          "Truyền thông AutoTimelapse nghệ thuật: Lắp đặt hệ thống camera tự động ghi lại sự biến đổi tuyệt đẹp của tự nhiên (bình minh, mây luồn, hoàng hôn) tại các danh thắng. Chiết xuất thành video nghệ thuật phục vụ đắc lực cho các chiến dịch marketing, quảng bá hình ảnh điểm đến.",
        ],
      },
      {
        title: "4. Ứng dụng Big Data và AI trong điều hành du lịch vĩ mô",
        description:
          "Đóng vai trò là “bộ não” của toàn bộ hệ sinh thái, nơi mọi dữ liệu được tổng hợp, phân tích theo thời gian thực để phục vụ công tác quản trị cấp cao.",
        points: [
          "Hệ thống Dashboard phân tích thông minh: Tự động thống kê, theo dõi và phân tích các chỉ số cốt lõi: số lượng khách, luồng khách di chuyển, tuyến tham quan phổ biến, thời gian lưu trú và doanh thu dịch vụ.",
          "Điều hành chủ động và dự báo: Giúp Lãnh đạo địa phương quan sát trực quan, dự báo chính xác mùa cao điểm hoặc nhận diện sớm nguy cơ quá tải tại các điểm đến, từ đó có phương án phân luồng giao thông và điều phối nguồn lực kịp thời.",
        ],
      },
    ],
  },
  "cuu-ho-cuu-nan-phong-chong-thien-tai": {
    slug: "cuu-ho-cuu-nan-phong-chong-thien-tai",
    title: "Cứu hộ cứu nạn",
    subtitle:
      "Công nghệ phản ứng nhanh tìm kiếm cứu nạn và phòng chống thiên tai",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7896919187727_98d70d6fee3b5d5ed1d65405a3ad2c72-1024x768.jpg",
    introText:
      "Trong các tình huống khẩn cấp và thảm họa thiên nhiên, “thời gian vàng” là yếu tố quyết định đến sinh mạng con người và tài sản. VDCD Group cung cấp hệ sinh thái giải pháp công nghệ phản ứng nhanh, kết hợp Thiết bị bay không người lái (UAV/Drone), Trí tuệ nhân tạo (AI), hệ thống bản đồ 3D và trạm quan trắc AutoTimelapse, trở thành công cụ đắc lực hỗ trợ các lực lượng chức năng, Ban Chỉ huy Phòng chống thiên tai trong công tác tìm kiếm cứu nạn và quản lý rủi ro.",
    sections: [
      {
        title:
          "1. Ứng dụng công nghệ UAV/Drone trong phản ứng nhanh và tìm kiếm cứu nạn",
        description:
          "Khả năng cơ động tức thời của UAV giúp vượt qua mọi rào cản về địa hình, thời tiết khắc nghiệt để tiếp cận hiện trường nhanh nhất, cung cấp “con mắt trên không” cho sở chỉ huy.",
        points: [
          "Trinh sát và lập bản đồ hiện trường khẩn cấp: Ngay khi sự cố xảy ra (lũ quét, sạt lở đất, cháy rừng), UAV lập tức được triển khai bay quét để ghi nhận toàn cảnh hiện trường. Dữ liệu hình ảnh được truyền trực tiếp (livestream) hoặc dựng thành bản đồ 2D/3D nhanh chóng, giúp lực lượng cứu hộ đánh giá quy mô thảm họa và lên phương án tiếp cận an toàn.",
          "Tìm kiếm nạn nhân bằng Camera nhiệt (Thermal): Trong điều kiện tầm nhìn hạn chế như ban đêm, sương mù dày đặc hay khói lửa mù mịt, camera cảm biến nhiệt trên UAV sẽ dò tìm tia hồng ngoại từ thân nhiệt con người, giúp định vị chính xác vị trí nạn nhân đang mắc kẹt để tổ chức ứng cứu kịp thời.",
          "Vận chuyển và thả nhu yếu phẩm: UAV tải trọng lớn có thể mang theo các vật tư y tế khẩn cấp, bộ đàm, nước uống hoặc thả phao cứu sinh tự động tiếp cận nạn nhân ở những khu vực bị cô lập (giữa dòng nước lũ, vách núi cheo leo) mà lực lượng cứu hộ chưa thể lập tức tiếp cận.",
          "Hệ thống loa phát thanh cảnh báo: Tích hợp loa phóng thanh trên không để truyền đạt chỉ thị sơ tán, hướng dẫn đường đi an toàn hoặc động viên tinh thần nạn nhân trong lúc chờ lực lượng hỗ trợ.",
        ],
      },
      {
        title:
          "2. Ứng dụng nền tảng Bản đồ số và AI trong phòng ngừa, mô phỏng thảm họa",
        description:
          "Không chỉ dừng lại ở việc ứng phó khi sự cố đã xảy ra, giải pháp của VDCD Group tập trung mạnh vào khâu phòng ngừa và lập kế hoạch chiến lược.",
        points: [
          "Mô phỏng kịch bản rủi ro thiên tai: Sử dụng mô hình độ cao số (DEM) kết hợp thuật toán AI để mô phỏng các kịch bản ngập lụt theo từng mức nước biển dâng, hoặc đánh giá nguy cơ trượt lở tại các sườn đồi dốc.",
          "Thiết lập bản đồ sơ tán an toàn: Căn cứ trên dữ liệu không gian 3D, chính quyền địa phương có thể quy hoạch chính xác các tuyến đường lánh nạn, phân bổ vị trí các khu vực tập kết an toàn, phục vụ công tác diễn tập và chủ động ứng phó trước mùa mưa bão.",
        ],
      },
      {
        title: "3. Ứng dụng nền tảng AutoTimelapse & IoT trong cảnh báo sớm",
        description:
          "Tại các khu vực xung yếu, có nguy cơ cao xảy ra thiên tai, việc quan trắc tự động là giải pháp bảo vệ từ xa tối ưu nhất.",
        points: [
          "Giám sát tự động điểm nóng sạt lở, ngập lụt: Lắp đặt trạm AutoTimelapse tại các đập tràn, bờ đê, khu vực sườn dốc nguy hiểm để ghi hình và theo dõi liên tục diễn biến mực nước, độ biến dạng của địa hình.",
          "Cảnh báo thời gian thực: Kết nối với các cảm biến đo lượng mưa, đo mực nước và cảnh báo rung chấn. Khi có biến động vượt ngưỡng an toàn (ví dụ: mực nước dâng cao đột ngột, có dấu hiệu dịch chuyển đất đá), hệ thống tự động phát tín hiệu báo động đỏ về trung tâm điều hành để lập tức kích hoạt lệnh sơ tán.",
        ],
      },
      {
        title: "4. Lợi ích vĩ mô trong quản trị An ninh & Cứu hộ",
        points: [
          "Tận dụng tối đa “thời gian vàng”: Rút ngắn thời gian xác định vị trí và tình trạng nạn nhân, tăng tỷ lệ cứu sống thành công.",
          "Bảo vệ an toàn cho lực lượng cứu hộ: Cung cấp thông tin địa hình, hướng gió, khu vực nguy hiểm trước khi điều động nhân sự thực địa, giảm thiểu thương vong không đáng có cho đội ngũ làm nhiệm vụ.",
          "Tối ưu hóa nguồn lực chỉ huy: Truyền tải dữ liệu hiện trường theo thời gian thực về sở chỉ huy, giúp Lãnh đạo các cấp có cái nhìn toàn cảnh, ra quyết định điều động lực lượng, phương tiện cơ giới một cách chính xác, đúng lúc và đúng chỗ.",
        ],
      },
    ],
  },
  "trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai": {
    slug: "trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai",
    title: "Trung tâm dữ liệu siêu máy tính và đào tạo AI",
    subtitle: "Nền tảng công nghệ lõi cho hệ sinh thái chuyển đổi số",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2025/10/z7173282299491_651f9e392555944f94acd55dab050480-768x576.jpg",
    introText:
      "Trong kỷ nguyên số, dữ liệu trở thành “nguồn tài nguyên chiến lược” của mọi tổ chức. Để đảm bảo hạ tầng tính toán và lưu trữ dữ liệu phục vụ cho các giải pháp công nghệ quy mô lớn, VDCD Group đã đầu tư phát triển Trung tâm Dữ liệu, Siêu máy tính và Đào tạo AI. Trung tâm được xây dựng và vận hành tại các điểm công nghệ trọng yếu như Hà Nội, TP. Hồ Chí Minh, Ninh Bình và Quảng Ngãi, với tổng diện tích sử dụng hơn 4.000 m². Đây là nền tảng hạ tầng quan trọng trong hệ sinh thái số của VDCD Group, phục vụ nghiên cứu, phát triển và triển khai các công nghệ BIM, GIS, IoT và AI trên phạm vi toàn quốc.",
    sections: [
      {
        title: "1. Trung tâm Dữ liệu (VDCD DATA)",
        description:
          "Data Center của VDCD được thiết kế theo tiêu chuẩn hiện đại, đảm bảo khả năng lưu trữ, bảo mật và vận hành ổn định 24/7, phục vụ toàn bộ các hệ thống dữ liệu của GIS, BIM, hồ sơ kỹ thuật và dữ liệu IoT.",
        points: [
          "Lưu trữ tập trung toàn bộ cơ sở dữ liệu: Giúp đồng bộ thông tin trên các nền tảng công nghệ.",
          "Đảm bảo an toàn và bảo mật: Hệ thống dự phòng dữ liệu (Backup & DR) và các dịch vụ lưu trữ đám mây (Cloud Storage) giúp phục hồi nhanh chóng khi xảy ra sự cố.",
          "Giám sát vận hành thông minh: Hoạt động của trung tâm được quản lý qua NOC (Network Operation Center), cho phép kiểm soát truy cập, hiệu suất và tính toàn vẹn dữ liệu.",
          "Mở rộng linh hoạt: Thông qua cổng dữ liệu mở (Open Data Portal), hỗ trợ các tổ chức, đối tác khai thác, chia sẻ và tích hợp dữ liệu một cách an toàn và hiệu quả.",
        ],
      },
      {
        title: "2. Siêu máy tính (High Performance Computing – HPC)",
        description:
          "HPC & AI supercomputer được VDCD DATA xây dựng để phục vụ xử lý dữ liệu quy mô lớn và các ứng dụng công nghệ tiên tiến trong các lĩnh vực GIS, BIM, AI và Big Data.",
        points: [
          "Xử lý dữ liệu lớn: Xử lý dữ liệu bản đồ 2D/3D, ảnh vệ tinh, quét laser, UAV và mô hình địa hình số.",
          "Xây dựng mô phỏng mô hình BIM – GIS tích hợp: Phục vụ công tác quy hoạch, hạ tầng, đô thị thông minh và xây dựng số (Digital Construction).",
          "Tính toán song song (Parallel Computing): Phục vụ huấn luyện, dự báo và phân tích dữ liệu AI, Big Data.",
          "Hỗ trợ hiển thị, chia sẻ dữ liệu mô hình 3D: Trên các thiết bị đầu cuối, trình duyệt web và ứng dụng di động của khách hàng.",
        ],
      },
      {
        title: "3. Trung tâm Đào tạo và Ứng dụng AI",
        description:
          "Bên cạnh hạ tầng dữ liệu và tính toán, VDCD DATA còn phát triển Trung tâm Đào tạo và Ứng dụng AI, hướng tới mục tiêu hình thành nguồn nhân lực chất lượng cao trong lĩnh vực công nghệ số.",
        points: [
          "Đào tạo và huấn luyện chuyên sâu: Đào tạo kỹ sư, cán bộ vận hành trong các lĩnh vực AI, Machine Learning, Big Data, GIS, BIM.",
          "Xây dựng môi trường AI Sandbox: Cho phép thử nghiệm, huấn luyện và triển khai các mô hình AI thực tế.",
          "Kết nối nghiên cứu – đào tạo – ứng dụng: Hợp tác cùng các trường đại học, viện nghiên cứu và doanh nghiệp trong và ngoài nước để phát triển các giải pháp ứng dụng AI phục vụ quy hoạch, quản lý và sản xuất.",
        ],
      },
      {
        title: "4. Giá trị ứng dụng nổi bật",
        points: [
          "Nâng cao năng lực xử lý dữ liệu và AI: Cung cấp tài nguyên tính toán mạnh mẽ.",
          "Tối ưu chi phí bằng hạ tầng đám mây: Giảm thiểu đầu tư hạ tầng phần cứng ban đầu.",
          "Bảo mật, ổn định và tin cậy tuyệt đối: Vận hành theo tiêu chuẩn bảo mật ISO/IEC 27001.",
          "Hạ tầng vững chắc cho chuyển đổi số: Nền tảng cốt lõi liên kết dữ liệu toàn hệ sinh thái.",
        ],
      },
    ],
  },
  "trung-tam-doi-moi-sang-tao-tinh": {
    slug: "trung-tam-doi-moi-sang-tao-tinh",
    title: "Trung Tâm Đổi Mới Sáng Tạo Tỉnh",
    subtitle: "Cầu nối giữa dữ liệu, công nghệ và sáng tạo địa phương",
    imageUrl: "https://vdcd.vn/wp-content/uploads/2025/11/S3-1-1-768x590.jpg",
    introText:
      "Trong tiến trình chuyển đổi số toàn diện của Việt Nam, đổi mới sáng tạo không chỉ là mục tiêu mà còn là động lực giúp các địa phương phát triển bền vững. Với vai trò tiên phong trong hệ sinh thái công nghệ số của VDCD Group, Trung tâm Đổi mới Sáng tạo Tỉnh được thành lập nhằm thúc đẩy các chương trình chuyển đổi số, sáng tạo mô hình mới và phát triển công nghệ ứng dụng theo định hướng địa phương. Trung tâm đóng vai trò kết nối giữa con người – dữ liệu – công nghệ – tư duy sáng tạo, tạo nền tảng cho việc triển khai các chương trình đổi mới, đồng thời hỗ trợ cơ quan quản lý, doanh nghiệp và cộng đồng khai thác hiệu quả giá trị số trong mọi hoạt động kinh tế – xã hội.",
    sections: [
      {
        title: "1. Khối Chiến lược và Tư vấn Chuyển đổi số",
        description:
          "Khối này giữ vai trò trung tâm trong hoạch định chiến lược, tư vấn và triển khai các chương trình chuyển đổi số cấp tỉnh, ngành và doanh nghiệp.",
        points: [
          "Tư vấn hoạch định chiến lược số: Định hướng chiến lược, tư vấn, triển khai và quản trị các chương trình chuyển đổi số cấp tỉnh, bộ, ngành và doanh nghiệp.",
          "Xây dựng lộ trình tổng thể: Thiết lập lộ trình gắn với mục tiêu phát triển kinh tế – xã hội và quy hoạch hạ tầng số của địa phương.",
          "Vận hành thông minh (Data-driven Governance): Tư vấn tái cấu trúc quy trình, tổ chức và quản lý dữ liệu để ra quyết định dựa trên dữ liệu thực tế.",
          "Đào tạo và truyền thông số: Nâng cao nhận thức số, hỗ trợ các địa phương, doanh nghiệp làm chủ công nghệ và vận hành hệ thống số hóa.",
        ],
      },
      {
        title: "2. Khối Đổi mới Sáng tạo và Phát triển Mô hình mới",
        description:
          "Đây là trung tâm của các hoạt động nghiên cứu, thử nghiệm và triển khai mô hình đổi mới sáng tạo (Innovation Lab) trong hệ thống VDCD Group.",
        points: [
          "Điều phối các Trung tâm chuyên ngành: Gồm AI & Robot, R&D, Dữ liệu & AI, Phần mềm, Bản đồ số, Giám sát số tạo thành hệ sinh thái đổi mới mở.",
          "Phát triển các nền tảng và dịch vụ sáng tạo: Ứng dụng AI, IoT, Blockchain, Big Data, GIS và Cloud phục vụ quản lý đô thị và chính quyền điện tử.",
          "Thử nghiệm dự án thí điểm (Pilot Project): Đánh giá tính khả thi của công nghệ mới, mô hình vận hành và giải pháp chuyển đổi tại từng lĩnh vực.",
          "Ươm tạo khởi nghiệp công nghệ: Kết nối với doanh nghiệp, viện trường và cộng đồng sáng tạo để phát triển mô hình đổi mới.",
        ],
      },
      {
        title: "3. Khối Giám sát, Vận hành và Truyền thông số",
        description:
          "Khối này chịu trách nhiệm vận hành, giám sát và truyền thông số cho toàn hệ sinh thái VDCD Group.",
        points: [
          "Giám sát hệ sinh thái số: Vận hành trung tâm dữ liệu, nền tảng phần mềm, hệ thống giám sát số và cổng dữ liệu mở.",
          "Trung tâm điều hành và phân tích thông minh: Xây dựng Dashboard và phân tích dữ liệu trực quan bằng BI (Business Intelligence).",
          "Lan tỏa tinh thần đổi mới sáng tạo: Tổ chức hội thảo, triển lãm, diễn đàn công nghệ và xây dựng nền tảng Cộng đồng số VDCD.",
        ],
      },
      {
        title: "4. Khối hỗ trợ khởi nghiệp sáng tạo",
        description:
          "Khối hỗ trợ khởi nghiệp sáng tạo tỉnh được thành lập nhằm thúc đẩy đổi mới sáng tạo và phát triển hệ sinh thái khởi nghiệp sáng tạo tại địa phương.",
        points: [
          "Huy động và quản lý nguồn lực đầu tư: Hỗ trợ, khuyến khích phát triển và nâng cao năng lực cho các cơ sở ươm tạo công nghệ.",
          "Nghiên cứu và cung cấp dịch vụ hỗ trợ: Cung cấp dịch vụ khoa học, tư vấn, đào tạo kết nối mạng lưới đổi mới sáng tạo.",
          "Thúc đẩy liên kết doanh nghiệp: Xây dựng mạng lưới đối tác trong và ngoài nước, tổ chức sự kiện xúc tiến đầu tư.",
        ],
      },
    ],
  },
  "trung-tam-chuyen-giao-cong-nghe": {
    slug: "trung-tam-chuyen-giao-cong-nghe",
    title: "Trung Tâm Chuyển giao Công Nghệ",
    subtitle:
      "Tiên phong trong chuyển giao và ứng dụng công nghệ AI – BIM – Cloud – Giám sát số",
    imageUrl: "https://vdcd.vn/wp-content/uploads/2025/10/BOT06612-768x512.jpg",
    introText:
      "VDCD Group thành lập VDCD Academy – Trung tâm Chuyển giao Công nghệ, trực thuộc Viện Thiết kế Số VDCD BIM đóng vai trò kết nối giữa nghiên cứu – đào tạo – ứng dụng thực tế, giúp nhân sự trong ngành nhanh chóng tiếp cận công nghệ mới, làm chủ các nền tảng BIM, GIS, AI, Digital Twin và các công cụ thiết kế – quản lý hiện đại nhất.",
    sections: [
      {
        title: "1. Sứ mệnh và định hướng phát triển",
        description:
          "VDCD Academy được định hướng trở thành “Học viện Công nghệ Thiết kế” tiên phong trong lĩnh vực đào tạo và chuyển giao công nghệ số cho ngành xây dựng, quy hoạch và hạ tầng.",
        points: [
          "Đội ngũ nhân sự công nghệ cao: Tạo ra nhân sự có năng lực về AI Design, Generative Design, Digital Construction.",
          "Chuẩn hóa năng lực số quốc gia: Nâng tầm và chuẩn hóa kiến thức chuyên môn thiết kế số và xây dựng.",
          "Mở rộng hợp tác nghiên cứu: Kết hợp cùng đại học, viện nghiên cứu và doanh nghiệp công nghệ phát triển giải pháp số.",
        ],
      },
      {
        title: "2. Lĩnh vực hoạt động chính",
        points: [
          "Đào tạo chuyên sâu về công nghệ thiết kế: Tổ chức các khóa học chuyên sâu về BIM (Building Information Modeling), GIS (Geographic Information System).",
          "Tư vấn quy trình & phần mềm công nghệ: Tư vấn, triển khai và đồng bộ hóa quy trình làm việc thông qua BIM Collaboration và GIS Integration.",
          "Nghiên cứu & chuyển giao giải pháp thực tế: Phát triển các chương trình R&D phối hợp với doanh nghiệp nhằm chuyển giao công nghệ vào quy hoạch và xây dựng số.",
        ],
      },
      {
        title: "3. Giá trị cốt lõi mang lại",
        points: [
          "Khai thác tối đa tiềm năng con người: Giúp nhân sự ngành thiết kế làm việc hiệu quả, sáng tạo và tự động hóa quy trình.",
          "Tăng năng suất và giảm sai sót: Quản lý dữ liệu tập trung và phối hợp công việc theo thời gian thực.",
          "Xây dựng cộng đồng công nghệ thiết kế: Tạo mạng lưới kết nối các chuyên gia, kỹ sư và doanh nghiệp thiết kế số tại Việt Nam.",
        ],
      },
    ],
  },
  "trung-tam-phat-trien-robot-ai": {
    slug: "trung-tam-phat-trien-robot-ai",
    title: "Trung tâm phát triển Robot & AI",
    subtitle:
      "Tăng tốc chuyển đổi công nghệ bằng trí tuệ nhân tạo và tự động hóa",
    imageUrl:
      "https://vdcd.vn/wp-content/uploads/2024/03/ImageForArticle_702_172159750532-768x432.jpg",
    introText:
      "Trung tâm phát triển Robot & AI là đơn vị nghiên cứu, phát triển và triển khai công nghệ trí tuệ nhân tạo (AI) và robot bay (UAV – Drone) trong hệ sinh thái công nghệ của VDCD Group. Trung tâm đóng vai trò chủ đạo trong việc làm chủ công nghệ AI, điều khiển tự động, phân tích hình ảnh và vận hành UAV, phục vụ các lĩnh vực địa chính, xây dựng, giao thông, nông nghiệp, môi trường đô thị, đồng thời phát triển hạ tầng giám sát – điều hành tự động hóa trên không gian số 3D.",
    sections: [
      {
        title: "1. Khối Nghiên cứu và Phát triển AI (AI R&D)",
        points: [
          "Mô hình AI xử lý hình ảnh: Phát triển mô hình AI chuyên sâu phục vụ xử lý ảnh UAV, nhận dạng đối tượng, phân tích không gian 2D/3D.",
          "Thuật toán điều khiển UAV tự hành: Xây dựng Autonomous Flight AI định vị, tối ưu tuyến bay và phân tích dữ liệu giám sát tự động.",
          "Huấn luyện trên hạ tầng HPC: Sử dụng Siêu máy tính và Data Center của VDCD Group để tối ưu hóa hiệu suất mô hình.",
        ],
      },
      {
        title: "2. Khối Robot và Tự động hóa (Robotics & Automation)",
        points: [
          "Tích hợp hệ thống UAV tự động: Thiết kế drone giám sát, drone đo đạc và kiểm tra công trình chuyên nghiệp.",
          "Nền tảng quản lý UAV tập trung: Lập kế hoạch, giám sát và điều hành đội bay tự động từ xa.",
          "Thị giác máy tính & Edge Computing: Tích hợp công nghệ AI trên UAV để nhận dạng và phát hiện vi phạm thực địa.",
          "Hệ thống bay tự động toàn phần: Vận hành chu trình khép kín: cất cánh – bay khảo sát – hạ cánh – sạc tự động – truyền dữ liệu.",
        ],
      },
      {
        title: "3. Khối Ứng dụng và Chuyển giao Công nghệ",
        points: [
          "Giám sát địa chính và xây dựng: Ứng dụng UAV kết hợp AI tự động phát hiện và cảnh báo hành vi vi phạm hiện trạng.",
          "Lập mô hình 3D và GIS: Khảo sát số hóa, trắc địa tự động và tích hợp mô hình BIM–GIS cho xây dựng số.",
          "Nền tảng điều hành đa nhiệm vụ: Multi-UAV Command Platform hỗ trợ IOC lập đội bay tự động và cảnh báo khẩn cấp.",
        ],
      },
    ],
  },
  "trung-tam-nghien-cuu-va-phat-trien-san-pham": {
    slug: "trung-tam-nghien-cuu-va-phat-trien-san-pham",
    title: "Trung tâm nghiên cứu và phát triển sản phẩm R&D",
    subtitle: "Nghiên cứu, thiết kế và cải tiến sản phẩm công nghệ tiên phong",
    imageUrl: "https://vdcd.vn/wp-content/uploads/2024/03/64576458-768x512.jpg",
    introText:
      "Trung tâm Nghiên cứu và Phát triển là đơn vị nòng cốt của VDCD Group trong việc nghiên cứu, thiết kế, phát triển, thử nghiệm và hoàn thiện các sản phẩm – giải pháp công nghệ mới phục vụ chiến lược chuyển đổi số và đổi mới sáng tạo quốc gia. Trung tâm đảm nhận vai trò kết nối giữa nghiên cứu khoa học, công nghệ với ứng dụng thực tiễn, tạo ra các sản phẩm “Make in Vietnam” có tính ứng dụng cao, khả năng mở rộng và tích hợp linh hoạt.",
    sections: [
      {
        title: "1. Các hoạt động cốt lõi của Trung tâm R&D",
        points: [
          "Nghiên cứu & sáng tạo ý tưởng: Khảo sát nhu cầu thực tiễn, phát triển khái niệm và xây dựng nguyên mẫu sản phẩm.",
          "Thiết kế & thử nghiệm kỹ thuật: Lựa chọn vật liệu kỹ thuật cao, kiểm định chất lượng và tối ưu hóa hiệu suất.",
          "Cải tiến & tối ưu hóa sản phẩm: Nâng cấp thiết kế, bổ sung công năng hữu ích cho các sản phẩm hiện có.",
          "Chuyển giao và thương mại hóa: Kết nối R&D với doanh nghiệp để đưa kết quả nghiên cứu vào thị trường thực tế.",
        ],
      },
      {
        title: "2. Cơ cấu tổ chức hoạt động",
        points: [
          "Khối Nghiên cứu và Thiết kế: Nghiên cứu công nghệ nền tảng GIS, BIM, AI, IoT, Digital Twin và thiết kế hệ thống IOC.",
          "Khối Phát triển và Kiểm thử: Phát triển phần mềm Web/Mobile 3D WebGL và QA/QC toàn diện qua các hệ thống tự động.",
          "Khối Ứng dụng và Chuyển giao: Nội địa hóa sản phẩm, đào tạo vận hành và hỗ trợ ươm tạo khởi nghiệp Tech Incubator.",
        ],
      },
      {
        title: "3. Lợi ích vượt trội",
        points: [
          "Nâng cao giá trị sản phẩm: Biến ý tưởng thô sơ thành giải pháp hoàn chỉnh có chất lượng cao.",
          "Tối ưu hóa quy trình R&D: Rút ngắn thời gian đưa sản phẩm ra thị trường nhờ mô phỏng và kiểm thử chuyên nghiệp.",
          "Thúc đẩy tự chủ công nghệ: Phát triển các sản phẩm công nghệ 'Make in Vietnam' phục vụ vùng và cả nước.",
        ],
      },
    ],
  },
};
