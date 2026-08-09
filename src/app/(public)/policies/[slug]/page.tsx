import * as React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POLICIES } from "@/data/policy-data";
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";

interface PolicyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = POLICIES[slug];

  if (!doc) {
    return {
      title: "Trang không tìm thấy – VDCD Gia Lai",
    };
  }

  return {
    title: `${doc.title} – Trung Tâm Đổi Mới Sáng Tạo Gia Lai`,
    description: doc.subtitle,
  };
}

export default async function PolicyDetailPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const doc = POLICIES[slug];

  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-canvas-white dark:bg-[#09090b] text-secondary transition-colors duration-300 pt-32 pb-24">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono-label font-semibold text-secondary/60 dark:text-zinc-400 hover:text-accent-red transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Quay lại Trang chủ
        </Link>

        {/* Header Block */}
        <div className="border-b border-whisper-border/40 dark:border-zinc-800/80 pb-10 mb-12">
          <div className="flex items-center gap-3 text-accent-red text-xs font-mono-label font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-5 h-5 text-accent-red" />
            Văn bản chính thức & Pháp lý
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white font-heading leading-tight mb-4">
            {doc.title}
          </h1>
          <p className="text-base text-slate-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-6">
            {doc.subtitle}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 font-mono-label">
            <Clock className="w-4 h-4" />
            Cập nhật lần cuối:{" "}
            <span className="font-semibold">{doc.lastUpdated}</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-10">
          {doc.content.map((sec, idx) => (
            <section
              key={idx}
              className="bg-white dark:bg-zinc-900/30 rounded-2xl p-6 sm:p-8 border border-whisper-border/30 dark:border-zinc-800/50 shadow-xs"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white font-heading mb-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-accent-red shrink-0" />
                {sec.heading}
              </h2>
              <div className="space-y-3 text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed pl-8">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Support Note */}
        <div className="mt-16 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl p-8 border border-whisper-border/40 dark:border-zinc-800 text-center">
          <h3 className="text-lg font-bold text-black dark:text-white mb-2">
            Bạn có thắc mắc cần giải đáp về chính sách?
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6 max-w-xl mx-auto">
            Bộ phận pháp lý và hỗ trợ khách hàng của VDCD Gia Lai sẵn sàng giải
            đáp 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono-label font-bold">
            <a
              href="tel:0373600099"
              className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white transition-colors"
            >
              Hotline: 0373 600 099
            </a>
            <a
              href="mailto:dmstgialai@vdcd.vn"
              className="px-6 py-3 rounded-full border border-slate-300 dark:border-zinc-700 hover:border-accent-red hover:text-accent-red transition-colors"
            >
              Email: dmstgialai@vdcd.vn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
