"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
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
      <div
        ref={contactRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-12"
      >
        {/* Contact Layout */}
        <div className="contact-reveal bg-canvas-white dark:bg-zinc-900/40 rounded-2xl p-8 md:p-16 border border-whisper-border dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <div className="flex lg:justify-end">
            <Button
              color="primary"
              onClick={() => {
                router.push("/contact");
              }}
              className="bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs tracking-wider uppercase font-bold px-8 py-6 w-full md:w-auto"
              trailingIcon={<FiMail className="w-4 h-4" />}
            >
              GỬI YÊU CẦU LIÊN HỆ
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
