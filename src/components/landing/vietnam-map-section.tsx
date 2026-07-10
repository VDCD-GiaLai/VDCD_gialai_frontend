"use client";

import * as React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  FiMapPin,
  FiUsers,
  FiBriefcase,
  FiHome,
  FiArrowRight,
  FiX,
  FiAward,
  FiActivity,
} from "react-icons/fi";
import {
  PROVINCES,
  TOTAL_STATS,
  REGION_STATS,
  Province,
} from "@/data/vietnam-provinces";

const GEO_URL = "/data/vietnam-provinces.json";

// ─── GeoJSON Name → Province id map (Post-2025 restructured 38 active region database) ───
const GEONAME_TO_PROVINCE_ID: Record<string, string> = {
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

// ─── Pre-compute province lookup map for O(1) access ───
const PROVINCE_BY_ID = new Map(PROVINCES.map((p) => [p.id, p]));

// ─── Province Extra Details Mapping ───
interface ProvinceDetail {
  image: string;
  description: string;
  population: string;
  area: string;
}

const PROVINCE_DETAILS: Record<string, ProvinceDetail> = {
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

const DEFAULT_DETAIL: ProvinceDetail = {
  image:
    "https://images.unsplash.com/photo-1509060464153-4466739f78d0?auto=format&fit=crop&w=600&q=80",
  description: "Đối tác hoạt động phát triển công nghệ đổi mới.",
  population: "Đang cập nhật",
  area: "Đang cập nhật",
};

// ─── Heatmap colors: light gray → deep red ───
function getProvinceColor(
  projectCount: number,
  maxProjects: number,
  isActive: boolean,
  isHovered: boolean,
  isSelected: boolean,
): string {
  if (!isActive) return "#e5e7eb";
  if (isSelected) return "#991b1b";
  if (isHovered) return "#ef4444";

  const ratio = Math.min(projectCount / maxProjects, 1);
  if (ratio < 0.15) return "#fecaca";
  if (ratio < 0.3) return "#fca5a5";
  if (ratio < 0.5) return "#f87171";
  if (ratio < 0.7) return "#ef4444";
  return "#dc2626";
}

// ─── Animated Counter ───
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    v >= 1000
      ? Math.round(v).toLocaleString("vi-VN")
      : Math.round(v).toString(),
  );
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return ctrl.stop;
  }, [inView, target, duration, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ─── CSS-only Tooltip (positioned via ref, no state re-renders) ───
interface TooltipPortalProps {
  province: Province | null;
  visible: boolean;
  posRef: React.RefObject<{ x: number; y: number } | null>;
}

const TooltipPortal = React.memo(
  ({ province, visible, posRef }: TooltipPortalProps) => {
    const tooltipRef = React.useRef<HTMLDivElement>(null);

    // Use rAF to position tooltip without state updates
    React.useEffect(() => {
      if (!visible || !tooltipRef.current || !posRef.current) return;

      let rafId: number;
      const update = () => {
        if (!tooltipRef.current || !posRef.current) return;
        const { x, y } = posRef.current;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const adjustedX = x + 330 > w ? x - 330 : x + 20;
        const adjustedY = y + 350 > h ? y - 350 : y + 20;
        tooltipRef.current.style.left = `${adjustedX}px`;
        tooltipRef.current.style.top = `${adjustedY}px`;
        rafId = requestAnimationFrame(update);
      };
      rafId = requestAnimationFrame(update);
      return () => cancelAnimationFrame(rafId);
    }, [visible, posRef]);

    if (!province) return null;

    const details = PROVINCE_DETAILS[province.id] || DEFAULT_DETAIL;

    return (
      <div
        ref={tooltipRef}
        className="pointer-events-none fixed z-[9999] w-[310px] transition-opacity duration-200"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(10px) scale(0.97)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80 p-1 shadow-2xl transition-colors duration-300">
          <div className="rounded-[calc(1rem-3px)] overflow-hidden bg-white/50 dark:bg-zinc-900/50 p-3">
            {/* Province Image */}
            <div className="relative h-28 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3">
              {visible && (
                <img
                  src={details.image}
                  alt={province.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
              {/* Region Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-black/60 text-white backdrop-blur-sm">
                {province.region === "Bắc"
                  ? "Miền Bắc"
                  : province.region === "Trung"
                    ? "Miền Trung"
                    : "Miền Nam"}
              </div>
            </div>

            {/* Card Info */}
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                  <FiMapPin className="text-accent-red text-xs shrink-0" />
                  {province.name}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {details.description}
                </p>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40 text-[10px]">
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-1.5 rounded-md border border-zinc-100 dark:border-zinc-800/20">
                  <p className="text-zinc-400 font-medium">Diện tích</p>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {details.area}
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/40 p-1.5 rounded-md border border-zinc-100 dark:border-zinc-800/20">
                  <p className="text-zinc-400 font-medium">Dân số</p>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {details.population}
                  </p>
                </div>
              </div>

              {/* Existing interactive metrics */}
              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40 text-[10px] text-center">
                <div>
                  <p className="text-zinc-400 font-medium">Dự án</p>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {province.projectCount}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400 font-medium">TT</p>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {province.centerCount}
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400 font-medium">Học viên</p>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {province.studentCount >= 1000
                      ? `${(province.studentCount / 1000).toFixed(1)}K`
                      : province.studentCount}
                  </p>
                </div>
              </div>

              <div className="pt-1.5 text-[9px] text-accent-red font-semibold flex items-center justify-end gap-0.5">
                Click để xem chi tiết <FiArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
TooltipPortal.displayName = "TooltipPortal";

// ─── Lightweight SVG Province Path (pure CSS transitions, no framer-motion) ───
interface ProvincePathProps {
  pathData: string;
  isActive: boolean;
  isHovered: boolean;
  isSelected: boolean;
  fill: string;
  provinceId: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onClick: (id: string) => void;
}

const ProvincePath = React.memo(
  ({
    pathData,
    isActive,
    isHovered,
    isSelected,
    fill,
    provinceId,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: ProvincePathProps) => {
    const handleMouseEnter = React.useCallback(() => {
      if (isActive) onMouseEnter(provinceId);
    }, [isActive, onMouseEnter, provinceId]);

    const handleClick = React.useCallback(() => {
      if (isActive) onClick(provinceId);
    }, [isActive, onClick, provinceId]);

    // Use CSS transform for hover lift instead of framer-motion spring
    const transform = isHovered
      ? "translateY(-8px) scale(1.04)"
      : "translateY(0) scale(1)";

    const filter = isSelected
      ? "drop-shadow(0 0 10px rgba(185,28,28,0.65))"
      : isHovered
        ? "drop-shadow(0 12px 24px rgba(0,0,0,0.12)) drop-shadow(0 0 8px rgba(239,68,68,0.4))"
        : "none";

    return (
      <g
        style={{
          transform,
          filter,
          transformOrigin: "center",
          transition:
            "transform 0.25s cubic-bezier(0.16,1,0.3,1), filter 0.25s ease",
          cursor: isActive ? "pointer" : "default",
        }}
      >
        {/* Hover glow — only rendered when hovered, pure SVG, no motion */}
        {isHovered && (
          <path
            d={pathData}
            fill="none"
            stroke="#ef4444"
            strokeWidth={4}
            opacity={0.3}
            style={{
              filter: "blur(5px)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Main Province path */}
        <path
          d={pathData}
          fill={fill}
          fillOpacity={isActive ? 1.0 : 0.6}
          stroke={isHovered ? "#fca5a5" : fill}
          strokeWidth={isHovered ? 1.5 : 1.2}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
          style={{
            outline: "none",
            transition: "fill 0.3s ease, stroke 0.3s ease",
          }}
        />
      </g>
    );
  },
);
ProvincePath.displayName = "ProvincePath";

// ─── CSS-animated Marker Dot (replaces framer-motion infinite animations) ───
const markerDotStyles = `
  @keyframes marker-pulse {
    0%, 100% { transform: scale(1); opacity: 0.35; }
    50% { transform: scale(1.8); opacity: 0; }
  }
  @keyframes marker-pulse-active {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(2.2); opacity: 0; }
  }
  .marker-ripple {
    animation: marker-pulse 2.5s ease-out infinite;
    transform-origin: center;
  }
  .marker-ripple-active {
    animation: marker-pulse-active 1.8s ease-out infinite;
    transform-origin: center;
  }
`;

interface MarkerDotProps {
  province: Province;
  isHovered: boolean;
  isSelected: boolean;
  isFlashing: boolean;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  onClick: (id: string) => void;
}

const MarkerDot = React.memo(
  ({
    province,
    isHovered,
    isSelected,
    isFlashing,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: MarkerDotProps) => {
    const highlight = isSelected || isFlashing || isHovered;

    const handleMouseEnter = React.useCallback(() => {
      onMouseEnter(province.id);
    }, [onMouseEnter, province.id]);

    const handleClick = React.useCallback(() => {
      onClick(province.id);
    }, [onClick, province.id]);

    return (
      <Marker coordinates={[province.lng, province.lat]}>
        <g
          style={{ cursor: "pointer" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
        >
          {/* Center dot */}
          <circle
            r={isSelected ? 4.5 : isHovered ? 4 : 2.5}
            fill={isSelected ? "#991b1b" : "#ef4444"}
            stroke="#ffffff"
            strokeWidth={1}
            style={{ transition: "r 0.2s ease" }}
          />
        </g>
      </Marker>
    );
  },
);
MarkerDot.displayName = "MarkerDot";

// ─── Province Card (right panel on click) ───
function ProvinceCard({
  province,
  onClose,
}: {
  province: Province;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={province.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-accent-red/20 overflow-hidden shadow-xl bg-white dark:bg-zinc-900"
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-start justify-between"
        style={{
          background:
            "linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(220,38,38,0.02) 100%)",
        }}
      >
        <div>
          <span className="text-[10px] font-mono font-bold text-accent-red uppercase tracking-widest block mb-1">
            {province.region === "Bắc"
              ? "Miền Bắc"
              : province.region === "Trung"
                ? "Miền Trung"
                : "Miền Nam"}
          </span>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            {province.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-accent-red hover:bg-accent-red/10 transition-all"
          aria-label="Đóng"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
        {[
          {
            label: "Dự án",
            value: province.projectCount,
            icon: <FiBriefcase className="w-4 h-4" />,
          },
          {
            label: "TT",
            value: province.centerCount,
            icon: <FiHome className="w-4 h-4" />,
          },
          {
            label: "Học viên",
            value:
              province.studentCount >= 1000
                ? `${(province.studentCount / 1000).toFixed(1)}K`
                : province.studentCount,
            icon: <FiUsers className="w-4 h-4" />,
          },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-4 gap-1">
            <span className="text-accent-red">{s.icon}</span>
            <span className="text-xl font-bold text-zinc-900 dark:text-white leading-none">
              {s.value}
            </span>
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-mono">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Centers */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Các trung tâm
        </p>
        <ul className="space-y-2">
          {province.centers.map((c, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
              style={{
                opacity: 0,
                animation: `fadeSlideIn 0.3s ease forwards ${i * 0.05 + 0.1}s`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pb-5">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-red uppercase tracking-widest hover:gap-2.5 transition-all"
        >
          Xem tất cả dự án <FiArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Representative landmark photo */}
      {(() => {
        const details = PROVINCE_DETAILS[province.id];
        if (!details) return null;
        return (
          <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-inner">
              <img
                src={details.image}
                alt={province.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        );
      })()}
    </motion.div>
  );
}

// ─── Stats Panel ───
const StatsPanel = React.memo(function StatsPanel() {
  const statItems = [
    {
      value: TOTAL_STATS.provinces,
      label: "Tỉnh thành",
      icon: <FiMapPin />,
      suffix: "",
    },
    {
      value: TOTAL_STATS.centers,
      label: "Trung tâm",
      icon: <FiHome />,
      suffix: "",
    },
    {
      value: TOTAL_STATS.projects,
      label: "Dự án",
      icon: <FiBriefcase />,
      suffix: "",
    },
    {
      value: TOTAL_STATS.students,
      label: "Người dùng",
      icon: <FiUsers />,
      suffix: "+",
    },
  ];

  return (
    <div className="space-y-3">
      {statItems.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group"
        >
          <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-accent-red/25 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-accent-red/5 flex items-center justify-center text-accent-red text-lg group-hover:bg-accent-red/10 transition-colors shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-none">
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  duration={2 + i * 0.25}
                />
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mt-0.5">
                {s.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Regional breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3"
      >
        <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
          Phân bổ vùng
        </p>
        {[
          {
            label: "Miền Bắc",
            key: "Bắc" as const,
            gradient: "from-sky-400 to-blue-500",
          },
          {
            label: "Miền Trung",
            key: "Trung" as const,
            gradient: "from-amber-400 to-orange-500",
          },
          {
            label: "Miền Nam",
            key: "Nam" as const,
            gradient: "from-emerald-400 to-teal-500",
          },
        ].map((r) => {
          const count = REGION_STATS[r.key].length;
          const pct = Math.round((count / TOTAL_STATS.provinces) * 100);
          return (
            <div key={r.key}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300">
                  <FiAward className="text-accent-red w-3 h-3" />
                  {r.label}
                </span>
                <span className="font-bold text-zinc-900 dark:text-white text-[11px]">
                  {count} tỉnh
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${r.gradient}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
});

// ─── Memoized Map Core (isolates geography rendering from parent state) ───
interface MapCoreProps {
  hoveredId: string | null;
  selectedId: string | null;
  activeIds: Set<string>;
  liveFlashId: string | null;
  maxProjects: number;
  onHoverProvince: (id: string) => void;
  onLeaveProvince: () => void;
  onClickProvince: (id: string) => void;
}

const MapCore = React.memo(
  ({
    hoveredId,
    selectedId,
    activeIds,
    liveFlashId,
    maxProjects,
    onHoverProvince,
    onLeaveProvince,
    onClickProvince,
  }: MapCoreProps) => {
    // Pre-compute active provinces array once
    const activeProvinces = React.useMemo(
      () =>
        Array.from(activeIds)
          .map((id) => PROVINCE_BY_ID.get(id))
          .filter(Boolean) as Province[],
      [activeIds],
    );

    return (
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [108.4, 15.6],
          scale: 2550,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoName = (geo.properties as Record<string, unknown>)[
                "Name"
              ] as string;
              const provinceId = GEONAME_TO_PROVINCE_ID[geoName];

              if (!provinceId) {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#e5e7eb",
                        fillOpacity: 0.5,
                        stroke: "#e5e7eb",
                        strokeWidth: 1.2,
                        outline: "none",
                      },
                      hover: {
                        fill: "#e5e7eb",
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              }

              const province = PROVINCE_BY_ID.get(provinceId);
              if (!province) return null;

              const isActive = activeIds.has(provinceId);
              const isHovered = hoveredId === provinceId;
              const isSelected = selectedId === provinceId;

              const fill = getProvinceColor(
                province.projectCount,
                maxProjects,
                isActive,
                isHovered,
                isSelected,
              );

              return (
                <ProvincePath
                  key={geo.rsmKey}
                  pathData={geo.svgPath}
                  isActive={isActive}
                  isHovered={isActive && isHovered}
                  isSelected={isSelected}
                  fill={fill}
                  provinceId={provinceId}
                  onMouseEnter={onHoverProvince}
                  onMouseLeave={onLeaveProvince}
                  onClick={onClickProvince}
                />
              );
            })
          }
        </Geographies>

        {/* Province center dots — CSS animations instead of framer-motion */}
        {activeProvinces.map((p) => (
          <MarkerDot
            key={p.id}
            province={p}
            isHovered={hoveredId === p.id}
            isSelected={selectedId === p.id}
            isFlashing={liveFlashId === p.id}
            onMouseEnter={onHoverProvince}
            onMouseLeave={onLeaveProvince}
            onClick={onClickProvince}
          />
        ))}

        {/* Quần đảo Hoàng Sa (Paracel Islands) */}
        <Marker coordinates={[112.2, 16.2]}>
          <g className="opacity-90">
            <text
              x={14}
              y={2}
              fill="#4b5563"
              className="dark:fill-zinc-300 font-sans font-bold text-[7px] tracking-wider select-none pointer-events-none"
            >
              Q.Đ Hoàng Sa
            </text>
            <text
              x={14}
              y={8}
              fill="#9ca3af"
              className="font-sans text-[5.5px] select-none pointer-events-none"
            >
              (TP. Đà Nẵng)
            </text>
          </g>
        </Marker>

        {/* Quần đảo Trường Sa (Spratly Islands) */}
        <Marker coordinates={[114.0, 8.8]}>
          <g className="opacity-90">
            <text
              x={18}
              y={2}
              fill="#4b5563"
              className="dark:fill-zinc-300 font-sans font-bold text-[7px] tracking-wider select-none pointer-events-none"
            >
              Q.Đ Trường Sa
            </text>
            <text
              x={18}
              y={8}
              fill="#9ca3af"
              className="font-sans text-[5.5px] select-none pointer-events-none"
            >
              (T. Khánh Hòa)
            </text>
          </g>
        </Marker>
      </ComposableMap>
    );
  },
);
MapCore.displayName = "MapCore";

// ─── Main Export ───
export function VietnamMapSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const mapInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] =
    React.useState<Province | null>(null);
  const [activeIds, setActiveIds] = React.useState<Set<string>>(new Set());
  const [liveFlashId, setLiveFlashId] = React.useState<string | null>(null);
  const [liveProvince, setLiveProvince] = React.useState<Province | null>(null);

  // Tooltip position tracked via ref (no re-renders on mousemove!)
  const tooltipPosRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const maxProjects = React.useMemo(
    () => Math.max(...PROVINCES.map((p) => p.projectCount)),
    [],
  );

  // Derive hovered Province from hoveredId (avoid storing full object in state)
  const hoveredProvince = React.useMemo(
    () => (hoveredId ? PROVINCE_BY_ID.get(hoveredId) || null : null),
    [hoveredId],
  );

  // Wave animation: provinces light up in 4 batches
  React.useEffect(() => {
    if (!mapInView) return;
    const allIds = PROVINCES.map((p) => p.id);
    const batches = [
      new Set(allIds.slice(0, 3)),
      new Set(allIds.slice(0, 10)),
      new Set(allIds.slice(0, 22)),
      new Set(allIds),
    ];
    const delays = [300, 800, 1400, 2100];
    const timers = batches.map((batch, i) =>
      setTimeout(() => setActiveIds(batch), delays[i]),
    );
    return () => timers.forEach(clearTimeout);
  }, [mapInView]);

  // Live pulse: random province flashes every 4s
  React.useEffect(() => {
    if (activeIds.size < 5) return;
    const ids = Array.from(activeIds);
    const interval = setInterval(() => {
      const id = ids[Math.floor(Math.random() * ids.length)];
      const p = PROVINCE_BY_ID.get(id) || null;
      setLiveFlashId(id);
      setLiveProvince(p);
      setTimeout(() => {
        setLiveFlashId(null);
        setLiveProvince(null);
      }, 1800);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIds]);

  // Mousemove handler writes to ref — zero state updates
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    tooltipPosRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Debounced hover to avoid rapid state cycling
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const onHoverProvince = React.useCallback((id: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredId(id);
  }, []);

  const onLeaveProvince = React.useCallback(() => {
    // Small delay before clearing hover to avoid flicker between adjacent paths
    hoverTimerRef.current = setTimeout(() => {
      setHoveredId(null);
    }, 50);
  }, []);

  const onClickProvince = React.useCallback((id: string) => {
    const province = PROVINCE_BY_ID.get(id) || null;
    setSelectedProvince((prev) => (prev?.id === id ? null : province));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Inject CSS keyframes for marker animations */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            markerDotStyles +
            `
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `,
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Dấu ấn hoạt động trên toàn quốc
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-4 max-w-2xl">
            Đồng hành cùng các trung tâm trên khắp Việt Nam
          </h2>
          <p className="text-secondary dark:text-zinc-400 max-w-xl text-sm leading-relaxed">
            Mạng lưới đối tác phủ sóng từ Bắc đến Nam — từ các trung tâm đổi mới
            sáng tạo đến hub nông nghiệp công nghệ cao tại từng địa phương.
          </p>
        </motion.div>

        {/* Layout: Map (65%) | Panel (35%) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 items-start"
          onMouseMove={handleMouseMove}
        >
          {/* ─── Map ─── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative rounded-2xl border border-whisper-border dark:border-zinc-800 shadow-inner overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)",
              }}
            >
              {/* Legend */}
              <div className="absolute top-3 left-3 z-10 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-zinc-100 dark:border-zinc-800">
                <p className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Mật độ dự án
                </p>
                <div className="flex items-center gap-1">
                  {["#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="w-4 h-2 rounded-sm first:rounded-l last:rounded-r"
                        style={{ backgroundColor: c }}
                      />
                    ),
                  )}
                </div>
                <div className="flex justify-between text-[7px] text-zinc-400 mt-0.5 font-mono">
                  <span>Ít</span>
                  <span>Nhiều</span>
                </div>
              </div>

              {/* ComposableMap — isolated in MapCore */}
              <div className="aspect-[9/13] sm:aspect-[3/4] md:aspect-[9/13]">
                <MapCore
                  hoveredId={hoveredId}
                  selectedId={selectedProvince?.id || null}
                  activeIds={activeIds}
                  liveFlashId={liveFlashId}
                  maxProjects={maxProjects}
                  onHoverProvince={onHoverProvince}
                  onLeaveProvince={onLeaveProvince}
                  onClickProvince={onClickProvince}
                />
              </div>

              {/* Live activity toast */}
              <AnimatePresence>
                {liveProvince && (
                  <motion.div
                    key={liveProvince.id}
                    initial={{ opacity: 0, y: 8, x: -8 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/92 dark:bg-zinc-900/92 backdrop-blur-md rounded-xl px-3.5 py-2.5 shadow-xl border border-accent-red/10"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse shrink-0" />
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span className="text-accent-red font-bold">
                        {liveProvince.name}
                      </span>{" "}
                      — Đang hoạt động
                    </span>
                    <FiActivity className="w-3 h-3 text-accent-red" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Guide Widget */}
              <div className="absolute bottom-4 right-4 z-10 max-w-[200px] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-3 shadow-md border border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400 space-y-1.5 transition-colors duration-300">
                <p className="font-bold text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono mb-1">
                  Hướng dẫn bản đồ
                </p>
                <div className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1 shrink-0" />
                  <span>Di chuột để xem nhanh thông tin dự án</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-800 mt-1 shrink-0" />
                  <span>Nhấp để cố định bảng hiển thị trung tâm</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <span>Chấm tròn đỏ thể hiện vị trí các trung tâm</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right panel ─── */}
          <div>
            <AnimatePresence mode="wait">
              {selectedProvince ? (
                <ProvinceCard
                  key="province"
                  province={selectedProvince}
                  onClose={() => setSelectedProvince(null)}
                />
              ) : (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatsPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating tooltip — positioned via ref, no re-renders */}
      <TooltipPortal
        province={hoveredProvince}
        visible={!!hoveredProvince && !selectedProvince}
        posRef={tooltipPosRef}
      />
    </section>
  );
}
