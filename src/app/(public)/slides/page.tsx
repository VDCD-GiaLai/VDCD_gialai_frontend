import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { fetchSlideDetailBlogsFromApi } from "@/services/slide-detail-blog.service";

export const metadata: Metadata = {
  title: "Dự án & Chuyên đề Slide | VDCD Group",
  description:
    "Danh sách các bài viết chi tiết, chuyên đề công nghệ và dự án trọng điểm tại VDCD Group.",
};

export default async function SlidesIndexPage() {
  const allBlogs = await fetchSlideDetailBlogsFromApi({ isPublished: true });
  const blogs = allBlogs.filter((b) => b.isPublished);

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-[#ca2a30] transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Trang chủ
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ca2a30] mb-2">
            <Sparkle className="w-4 h-4" weight="fill" />
            <span>Hệ sinh thái & Chuyên đề trọng điểm</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#011A42] dark:text-white tracking-tight">
            Dự án & Slide Công Nghệ
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#6C7E96] dark:text-zinc-400 max-w-2xl leading-relaxed">
            Tổng hợp các bài phân tích sâu về giải pháp giám sát thông minh, cơ
            sở dữ liệu số và ứng dụng chuyển đổi số địa phương.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="flex flex-col rounded-2xl border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden shadow-sm hover:shadow-md hover:border-[#ca2a30]/40 transition-all duration-300 group"
            >
              {blog.heroImageUrl && (
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.heroImageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    style={{
                      objectPosition:
                        blog.content?.heroMeta?.position ?? "center",
                    }}
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {blog.subtitle && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ca2a30] block mb-2">
                      {blog.subtitle}
                    </span>
                  )}
                  <h2 className="text-lg font-bold font-heading text-[#011A42] dark:text-white group-hover:text-[#ca2a30] transition-colors duration-200 line-clamp-2 leading-snug mb-3">
                    <Link href={`/slides/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  {blog.excerpt && (
                    <p className="text-xs text-[#6C7E96] dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {blog.excerpt}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-whisper-border dark:border-zinc-800 flex items-center justify-between">
                  <Link
                    href={`/slides/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono-label font-bold text-[#ca2a30] uppercase tracking-wider group-hover:gap-2.5 transition-all duration-200"
                  >
                    Đọc chi tiết
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
