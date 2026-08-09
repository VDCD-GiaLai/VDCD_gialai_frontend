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

const SITE_URL = "https://trungtamdoimoisangtao.com";

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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
        url: `${SITE_URL}/logo.svg`,
        width: 1200,
        height: 630,
        alt: "Logo Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
    description:
      "Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia và nguồn lực, đồng hành cùng doanh nghiệp, startup và cơ quan quản lý trong đổi mới sáng tạo và chuyển đổi số.",
    images: [`${SITE_URL}/logo.svg`],
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
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${montserrat.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Favicon Declarations */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/favicon-48x48.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Canonical Link */}
        <link rel="canonical" href="https://trungtamdoimoisangtao.com/" />

        {/* WebMCP & AI Agent Search Integration */}
        <meta
          name="webmcp:search"
          content="https://trungtamdoimoisangtao.com/news?search={query}"
        />
        <meta
          name="mcp-server"
          content="https://trungtamdoimoisangtao.com/api/mcp"
        />

        {/* Preconnect & DNS Prefetch */}
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <link
          rel="preconnect"
          href="https://ik.imagekit.io"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Organization & WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
