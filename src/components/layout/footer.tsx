import * as React from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-pure-surface dark:bg-zinc-900/50 text-secondary border-t border-whisper-border/50 py-16 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1">
          <div className="font-bold text-2xl tracking-tighter text-black dark:text-white mb-4">
            VDCD <span className="text-accent-red">Group</span>
          </div>
          <p className="text-secondary dark:text-zinc-400 font-body-md text-sm leading-relaxed max-w-xs">
            Kiến tạo tương lai số bền vững cho doanh nghiệp và cộng đồng tại Gia
            Lai & Tây Nguyên.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-black dark:text-white text-sm uppercase tracking-wider mb-2">
            Về chúng tôi
          </h4>
          <a
            href="#about"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Tầm nhìn & Sứ mệnh
          </a>
          <a
            href="#about"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Ban lãnh đạo
          </a>
          <a
            href="#about"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Mạng lưới đối tác
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-black dark:text-white text-sm uppercase tracking-wider mb-2">
            Giải pháp
          </h4>
          <a
            href="#solutions"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Chuyển đổi số
          </a>
          <a
            href="#solutions"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Nông nghiệp thông minh
          </a>
          <a
            href="#solutions"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Đô thị số
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-black dark:text-white text-sm uppercase tracking-wider mb-2">
            Thông tin
          </h4>
          <a
            href="#projects"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Dự án tiêu biểu
          </a>
          <a
            href="#contact"
            className="hover:text-accent-red text-sm transition-colors"
          >
            Liên hệ
          </a>
          <Link
            href={APP_ROUTES.LOGIN}
            className="hover:text-accent-red text-sm transition-colors"
          >
            Cổng thông tin đối tác
          </Link>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto border-t border-whisper-border/30 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-80">
        <p>© {new Date().getFullYear()} VDCD Group. All rights reserved.</p>
        <p className="mt-2 md:mt-0 font-mono-label text-[10px]">
          Thiết kế bởi Vanguard UI Architect
        </p>
      </div>
    </footer>
  );
}
