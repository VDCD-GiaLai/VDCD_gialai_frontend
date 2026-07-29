"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Projects page hero — editorial, minimal.
 * Large headline, short supporting copy, one authentic image.
 * All animations driven by the useProjectsGsap hook via class targets.
 */
export const ProjectsHero = () => {
  return (
    <section className="projects-hero" aria-label="Dự án tiêu biểu">
      {/* Background image */}
      <div className="projects-hero__image">
        <Image
          src="https://vdcd.vn/wp-content/uploads/2025/11/z6246976510436_a1885eca27bd88117afc251ceab774be-edited-768x576.jpg"
          alt="Khu kinh tế Vân Phong – Hệ thống giám sát công trình VDCD"
          fill
          priority
          sizes="100vw"
          className="gsap-hero-img object-cover"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Content */}
      <div className="projects-hero__content">
        <h1 className="gsap-hero-headline projects-hero__headline">
          Những công trình
          <br />
          kiến tạo giá trị
        </h1>
        <p className="gsap-hero-sub projects-hero__subtitle">
          Mỗi dự án là một hành trình đồng hành cùng khách hàng — từ khảo sát
          thực địa đến giám sát thi công, chuyển đổi số hóa và bàn giao giải
          pháp bền vững.
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="gsap-hero-scroll projects-hero__scroll-cue"
        aria-hidden="true"
      >
        <div className="projects-hero__scroll-line" />
      </div>
    </section>
  );
};
