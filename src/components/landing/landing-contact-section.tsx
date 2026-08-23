"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiMail } from "react-icons/fi";
import { ArrowUpRight, Envelope } from "@phosphor-icons/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";
import {
  fetchOrganizationInfoFromApi,
  DEFAULT_ORGANIZATION_INFO,
  type OrganizationInfo,
} from "@/services/hero.service";

export function LandingContactSection() {
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    fetchOrganizationInfoFromApi().then(setOrgInfo);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(
      orgInfo?.socialLinks?.email ||
        DEFAULT_ORGANIZATION_INFO.socialLinks.email,
    );
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  /* ── GSAP scroll-reveal for contact section ── */
  const contactRef = useScrollReveal({
    targets: ".contact-reveal",
    options: {
      y: 30,
      blur: 0,
      duration: 0.8,
      ease: "power3.out",
    },
  });

  return (
    <section
      id="contact"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
    >
      <div ref={contactRef} className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Contact Layout */}
        <div className="contact-reveal bg-canvas-white dark:bg-zinc-900/40 rounded-2xl p-8 border border-whisper-border dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-6">
              Sẵn sàng để đột phá?
            </h2>
            <p className="text-secondary dark:text-zinc-400 mb-8 max-w-sm text-sm">
              Hãy kết nối với chúng tôi để cùng lên kế hoạch và hiện thực hóa
              mục tiêu số hóa của tổ chức bạn.
            </p>
            <div className="space-y-4 font-mono-label text-xs text-secondary dark:text-zinc-300">
              <p className="flex items-center gap-3">
                <FiMapPin
                  className="text-accent-red text-base"
                  role="none"
                  aria-hidden="true"
                />{" "}
                {orgInfo?.address || DEFAULT_ORGANIZATION_INFO.address}
              </p>
              <button
                onClick={handleCopyEmail}
                aria-label="Sao chép địa chỉ email liên hệ"
                className="flex items-center gap-3 hover:text-accent-red transition-colors cursor-pointer"
              >
                <FiMail
                  className="text-accent-red text-base"
                  role="none"
                  aria-hidden="true"
                />
                {copiedEmail
                  ? "Đã sao chép!"
                  : orgInfo?.socialLinks?.email ||
                    DEFAULT_ORGANIZATION_INFO.socialLinks.email}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end w-full lg:w-auto relative z-10">
            <button
              type="button"
              onClick={() => {
                router.push("/about-us");
              }}
              className="inline-flex items-center justify-between sm:justify-start gap-3 pl-6 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 rounded-xl backdrop-blur-sm group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none cursor-pointer w-full sm:w-auto"
            >
              Về chúng tôi
              <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-inherit group-hover:bg-accent-red/10 transition-colors">
                <ArrowUpRight className="w-4 h-4" weight="thin" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("/contact");
              }}
              className="inline-flex items-center justify-between sm:justify-start gap-3 pl-6 pr-4 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300 rounded-xl shadow-lg group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none cursor-pointer w-full sm:w-auto"
            >
              Gửi yêu cầu liên hệ
              <span className="w-8 h-8 rounded-full bg-white/10 dark:bg-zinc-100 flex items-center justify-center text-inherit group-hover:bg-white/20 transition-colors">
                <Envelope className="w-4 h-4" weight="thin" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
