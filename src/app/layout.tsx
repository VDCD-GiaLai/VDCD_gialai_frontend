import type { Metadata, Viewport } from "next";
import ReactDOM from "react-dom";
import { Montserrat, Be_Vietnam_Pro } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import {
  GoogleTrackingScripts,
  GoogleTagManagerNoscript,
} from "@/components/analytics/google-tracking";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  display: "swap",
  preload: true,
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://doimoisangtaogialai.vn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  title: {
    default: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai – Tiên Phong Công Nghệ Số",
    template: "%s",
  },
  description:
    "Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực, đồng hành cùng doanh nghiệp, startup và cơ quan quản lý trong đổi mới sáng tạo và chuyển đổi số.",
  keywords: [
    "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
    "Đổi mới sáng tạo Gia Lai",
    "Chuyển đổi số Gia Lai",
    "VDCD Gia Lai",
    "Khởi nghiệp Gia Lai",
    "Công nghệ số Tây Nguyên",
  ],
  authors: [{ name: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai", url: SITE_URL }],
  creator: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
  publisher: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/favicons/manifest.json",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${SITE_URL}/`,
    siteName: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
    title: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
    description:
      "Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực, đồng hành cùng doanh nghiệp, startup và cơ quan quản lý trong đổi mới sáng tạo và chuyển đổi số.",
    images: [
      {
        url: "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9666.JPG?tr=w-1200,h-630,fo-auto",
        width: 1200,
        height: 630,
        alt: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
    description:
      "Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực, đồng hành cùng doanh nghiệp, startup và cơ quan quản lý trong đổi mới sáng tạo và chuyển đổi số.",
    images: [
      "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9666.JPG?tr=w-1200,h-630,fo-auto",
    ],
  },
  verification: {
    google: [
      "ExpqV1anfeq31VR4P_Sy7ZOaIP3qFTGSkzQvHWSc-OA",
      "OHDk64-l82grYN7qxgpHNqvavI8LupO3hDA6gd-zeeA",
    ],
  },
  other: {
    "webmcp:search": "https://doimoisangtaogialai.vn/news?search={query}",
    "mcp-server": "https://doimoisangtaogialai.vn/api/mcp",
    "msapplication-TileColor": "#C8102E",
    "msapplication-TileImage": "/favicons/ms-icon-144x144.png",
  },
};

/* ─────────────────────────────────────────────────────────────
   Organization & WebSite JSON-LD Schema for Google Search
   ───────────────────────────────────────────────────────────── */
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.svg`,
      image: `${SITE_URL}/logo.svg`,
      description:
        "Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực, đồng hành cùng doanh nghiệp, startup và cơ quan quản lý trong đổi mới sáng tạo và chuyển đổi số.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pleiku",
        addressRegion: "Gia Lai",
        addressCountry: "VN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "dmstgialai@vdcd.vn",
        availableLanguage: ["Vietnamese", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
      description:
        "Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực, đồng hành cùng doanh nghiệp, startup và cơ quan quản lý trong đổi mới sáng tạo và chuyển đổi số.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "vi-VN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/news?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ReactDOM.prefetchDNS("//ik.imagekit.io");
  ReactDOM.preconnect("https://ik.imagekit.io", { crossOrigin: "anonymous" });

  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Organization & WebSite Structured Data */}
        <script
          id="organization-schema"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <GoogleTagManagerNoscript />
        <AppProviders>{children}</AppProviders>
        <GoogleTrackingScripts />
      </body>
    </html>
  );
}
