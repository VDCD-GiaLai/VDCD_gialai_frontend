import type { Metadata, Viewport } from "next";
import { Montserrat, Be_Vietnam_Pro } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "VDCD Group - Chuyển đổi số & Đổi mới sáng tạo tại Gia Lai",
  description:
    "VDCD Group là hạt nhân thúc đẩy hệ sinh thái khởi nghiệp sáng tạo, ứng dụng công nghệ lõi và xây dựng hạ tầng kỹ thuật số đồng bộ tại Gia Lai và khu vực Tây Nguyên.",
  keywords: [
    "VDCD Group",
    "Chuyển đổi số",
    "Khởi nghiệp Gia Lai",
    "Đô thị số",
    "Nông nghiệp thông minh",
    "Gia Lai",
  ],
  authors: [{ name: "VDCD Group", url: "https://vdcdgroup.vn" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${montserrat.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
