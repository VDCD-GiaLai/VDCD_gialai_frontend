import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";

export interface OperationFieldItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  order: number;
}

export const MOCK_OPERATION_FIELDS: OperationFieldItem[] = [
  {
    id: "1",
    name: "Công nghệ số & Chuyển đổi số",
    slug: "cong-nghe-so-chuyen-doi-so",
    shortDescription:
      "Lập mô hình dữ liệu không gian 3D thời gian thực thông qua nền tảng số 3DG Platform. Tích hợp phân tích dữ liệu lớn và AI để tối ưu hóa quản trị hạ tầng, vận hành đô thị thông minh.",
    icon: "FiCpu",
    order: 1,
  },
  {
    id: "2",
    name: "Khảo sát, Đo đạc & Số hóa bản đồ",
    slug: "khao-sat-do-dac-so-hoa-ban-do",
    shortDescription:
      "Bay quét LiDAR và khảo sát trắc địa chuyên sâu bằng UAV để thành lập bản đồ địa hình tỷ lệ lớn (1/500). Số hóa đồng bộ cơ sở dữ liệu địa chính, hạ tầng kỹ thuật và lâm nghiệp Tây Nguyên.",
    icon: "FiMap",
    order: 2,
  },
  {
    id: "3",
    name: "Hạ tầng & Điều hành thông minh",
    slug: "ha-tang-dieu-hanh-thong-minh",
    shortDescription:
      "Tích hợp và xây dựng trung tâm điều hành thông minh (IOC/DOC) hỗ trợ ra quyết định. Giám sát tự động tiến độ công trình xây dựng và biến động hiện trường thông qua hệ thống AutoTimelapse.",
    icon: "FiActivity",
    order: 3,
  },
  {
    id: "4",
    name: "Nghiên cứu, Sản xuất & Chế tạo phần cứng",
    slug: "nghien-cuu-san-xuat-che-tao-phan-cung",
    shortDescription:
      "Nghiên cứu chế tạo robot công nghiệp, lắp ráp các hệ thống thiết bị bay không người lái chuyên dụng, camera thông minh tích hợp AI và phần cứng IoT điều khiển tự chủ công nghệ.",
    icon: "FiSettings",
    order: 4,
  },
];

export async function fetchOperationFieldsFromApi(): Promise<
  OperationFieldItem[]
> {
  if (USE_MOCK_DATA) {
    return MOCK_OPERATION_FIELDS;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/operation-fields`, {
      cache: "no-store",
    });
    if (res.ok) {
      const body = await res.json();
      const items = body.data || body;
      if (Array.isArray(items) && items.length > 0) {
        return items.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    }
  } catch (err) {
    console.warn(
      "Failed to fetch operation fields from API, fallback to mock:",
      err,
    );
  }
  return MOCK_OPERATION_FIELDS;
}
