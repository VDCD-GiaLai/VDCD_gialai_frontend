# VDCD Group - Enterprise Next.js Starter Boilerplate

Hệ khung dự án Frontend chuẩn doanh nghiệp (Production-ready Boilerplate) được phát triển trên hệ sinh thái **Next.js 15 (App Router)** và thư viện thành phần **HeroUI** (trước đây là NextUI), tích hợp sẵn các công nghệ hiện đại phục vụ cho SaaS, CRM, Landing Page hoặc ứng dụng doanh nghiệp lớn.

---

## 🛠️ Công Nghệ Lõi (Tech Stack)

*   **Framework**: Next.js 15 (App Router, TypeScript)
*   **Component Library**: HeroUI v2 (NextUI) & Framer Motion
*   **Styling**: Tailwind CSS v4 & PostCSS
*   **State Management**: Zustand
*   **Data Fetching**: TanStack Query v5 (React Query)
*   **Forms & Validation**: React Hook Form & Zod
*   **HTTP Client**: Axios (Tích hợp tự động gắn Token & Refresh Token)
*   **Quality Gates**: ESLint, Prettier, Husky, lint-staged


## Quản lý trạng thái & Gọi API (State Management & Fetching)
React Query (v5.62.7 - @tanstack/react-query): Quản lý server state, fetching, caching và đồng bộ dữ liệu.
Zustand (v5.0.2): Quản lý client state (global state) gọn nhẹ và hiệu năng cao.
Axios (v1.7.9): HTTP client để gọi API.
4. Quản lý Form & Validation
React Hook Form (v7.54.2): Quản lý các trạng thái và xử lý form.
Zod (v3.24.1): Thư viện khai báo và kiểm tra cấu trúc dữ liệu (schema validation).
@hookform/resolvers (v3.10.0): Bộ điều phối để tích hợp Zod schema vào React Hook Form.
---

## 📂 Cơ Cấu Thư Mục (Folder Structure)

```text
src/
├── app/                  # App Router & Route Handlers
│   ├── (public)/         # Nhóm route công khai (Landing, Login, v.v.)
│   ├── (dashboard)/      # Nhóm route cần xác thực (Dashboard, Users)
│   ├── api/              # Mock API Route Handlers phục vụ phát triển
│   ├── globals.css       # Cấu hình Tailwind v4 & Biến giao diện
│   └── layout.tsx        # Cấu hình layout gốc & SEO Metadata
├── components/           # Component dùng chung
│   ├── ui/               # Thành phần UI cơ bản (Button, Card, Input, Table...)
│   ├── forms/            # Biểu mẫu & FormField điều khiển
│   ├── layout/           # Bố cục giao diện (Header, Footer)
│   └── providers/        # Tích hợp ngữ cảnh (HeroUI, QueryClient, Themes)
├── features/             # Module tính năng nghiệp vụ riêng biệt
├── hooks/                # Custom React Hooks dùng chung
├── lib/                  # Cấu hình thư viện lõi
│   ├── axios.ts          # Axios interceptors xử lý Token & Refresh Token
│   ├── query-client.ts   # Cấu hình React Query mặc định
│   └── utils.ts          # Hàm tiện ích (cn, formatDate, debounce...)
├── schemas/              # Lược đồ kiểm tra dữ liệu Zod
├── services/             # Lớp gọi API (AuthService, UserService)
├── store/                # Trạng thái toàn cục Zustand (auth, theme, sidebar)
├── types/                # Định nghĩa kiểu dữ liệu TypeScript
└── middleware.ts         # Bảo vệ route và phân quyền truy cập
```

---

## 🚀 Hướng Dẫn Cài Đặt (Installation)

### 1. Chuẩn bị
Yêu cầu hệ thống đã cài đặt **Node.js 18+** và trình quản lý gói **pnpm 8+**.

### 2. Cài đặt các gói phụ thuộc
```bash
pnpm install
```

### 3. Cấu hình biến môi trường
Tạo tệp `.env` dựa trên `.env.example`:
```bash
cp .env.example .env
```

### 4. Khởi chạy dự án ở chế độ phát triển
```bash
pnpm dev
```
Truy cập ứng dụng tại địa chỉ: `http://localhost:3000`

---

## 🖥️ Các Lệnh Dự Án (Scripts)

| Lệnh | Mô tả |
| :--- | :--- |
| `pnpm dev` | Chạy ứng dụng ở chế độ phát triển local |
| `pnpm build` | Biên dịch dự án thành mã nguồn tối ưu production |
| `pnpm start` | Khởi chạy máy chủ sản phẩm (sau khi build) |
| `pnpm lint` | Kiểm tra lỗi cú pháp và phong cách viết mã (ESLint) |
| `pnpm lint:fix` | Tự động sửa các lỗi ESLint có thể khắc phục |
| `pnpm format` | Định dạng lại mã nguồn theo chuẩn Prettier |

---

## 📝 Quy Ước Viết Mã (Code Standards & Conventions)

### 1. Quy tắc Đặt tên (Naming Conventions)
*   **Thư mục & Tệp tin**: Sử dụng `kebab-case` cho tất cả các tệp tin (ví dụ: `form-field.tsx`, `auth-store.ts`).
*   **Component**: Sử dụng `PascalCase` cho tên component React (ví dụ: `export function CustomCard()`).
*   **Hàm & Biến**: Sử dụng `camelCase` (ví dụ: `const handleLoginSubmit = ...`).
*   **Kiểu dữ liệu (TypeScript)**: Sử dụng `PascalCase` cho các interface và type (ví dụ: `interface UserProfile {}`).

### 2. Quy tắc Commit Git (Commit Lint Rules)
Dự án tuân thủ định dạng **Conventional Commits**:
*   `feat: ...` - Thêm một tính năng mới.
*   `fix: ...` - Sửa lỗi.
*   `docs: ...` - Cập nhật tài liệu.
*   `style: ...` - Thay đổi định dạng code (không ảnh hưởng logic).
*   `refactor: ...` - Tái cấu trúc mã nguồn.
*   `chore: ...` - Cập nhật cấu hình build, công cụ hỗ trợ (không thay đổi code).

---

## 💡 Các Điểm Nhấn Kiến Trúc (Architecture Best Practices)

1.  **Axios Interceptors**:
    *   Tự động đính kèm `Bearer token` vào header của mọi yêu cầu.
    *   Khi nhận phản hồi lỗi `401 Unauthorized`, Axios tự động kích hoạt tiến trình refresh token dưới nền, đưa các yêu cầu tiếp theo vào hàng đợi tạm thời và tự động thực thi lại sau khi nhận token mới mà không làm gián đoạn trải nghiệm người dùng.
2.  **Double-Bezel Design**:
    *   Các card UI sử dụng cấu trúc viền kép lồng nhau (`double-bezel-outer` và `double-bezel-inner`) để tạo hiệu ứng chiều sâu cao cấp theo ngôn ngữ thiết kế Apple/Linear.
3.  **React Hook Form & Zod**:
    *   Tích hợp chặt chẽ qua thành phần `FormField` tự động kết nối và hiển thị lỗi xác thực real-time giúp giảm mã boilerplate ở phía client.
