"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";
import { useTransitionStore } from "@/store/transition-store";

/* ────────────────────────────────────────────────────────
   Project Card — shared atomic component
   Now intercepts clicks for shared-element transition.
   ──────────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: ProjectEntry;
  aspectClass: string;
}

const ProjectCard = ({ project, aspectClass }: ProjectCardProps) => {
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.startTransition);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      /* Find the image wrapper to capture its rect */
      const card = e.currentTarget;
      const imageWrapper = card.querySelector(
        ".prj-card__image-wrapper",
      ) as HTMLElement | null;

      if (!imageWrapper) {
        /* Fallback: navigate without transition */
        router.push(`/projects/${project.id}`);
        return;
      }

      const rect = imageWrapper.getBoundingClientRect();

      startTransition({
        sourceRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        imageSrc: project.coverImage,
        projectId: project.id,
        projectTitle: project.title,
      });
    },
    [project, router, startTransition],
  );

  return (
    <div
      className="prj-card group block"
      role="link"
      tabIndex={0}
      aria-label={`Xem dự án ${project.title}`}
      data-project-id={project.id}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <div className={`prj-card__image-wrapper ${aspectClass}`}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Overlay */}
        <div className="prj-card__overlay">
          <span className="prj-card__category">{project.category}</span>
          <h3 className="prj-card__title">{project.title}</h3>
          <div className="prj-card__meta">
            <span>{project.location}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────
   Gallery Section — asymmetric editorial layout
   ──────────────────────────────────────────────────────── */

export const ProjectsGallery = () => {
  /* Ensure we have enough projects; fall back gracefully */
  const p = PROJECTS_DATA;

  return (
    <section className="gallery-section" aria-label="Bộ sưu tập dự án">
      {/* Section header */}
      <div className="gallery-header mb-16">
        <span className="gsap-reveal block font-heading text-[11px] font-bold tracking-[0.25em] uppercase text-accent-red mb-4">
          Dự án tiêu biểu
        </span>
        <h2 className="gsap-reveal font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface dark:text-white leading-tight max-w-3xl">
          Những công trình
          <br />
          chúng tôi tự hào
        </h2>
        <p className="gsap-reveal mt-4 text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
          Từ sân bay quốc tế đến khu kinh tế chiến lược — mỗi dự án là minh
          chứng cho năng lực triển khai quy mô lớn trên toàn quốc.
        </p>
      </div>

      <div className="gallery-grid">
        {/* ── Row 1: Full-width hero card ──────────────────────── */}
        {p[0] && (
          <div className="gallery-row--full">
            <ProjectCard
              project={p[0]}
              aspectClass="prj-card__image-wrapper--hero"
            />
          </div>
        )}

        {/* ── Row 2: Portrait + Landscape split ───────────────── */}
        {p[1] && p[2] && (
          <div className="gallery-row--split">
            <ProjectCard
              project={p[1]}
              aspectClass="prj-card__image-wrapper--portrait"
            />
            <ProjectCard
              project={p[2]}
              aspectClass="prj-card__image-wrapper--portrait"
            />
          </div>
        )}

        {/* ── Interlude text ──────────────────────────────────── */}
        <div className="gallery-interlude">
          <p className="gallery-interlude__text">
            Chúng tôi tin rằng mỗi công trình đều kể một câu chuyện — về con
            người, về kỹ thuật, và về tầm nhìn dài hạn.
          </p>
        </div>

        {/* ── Row 3: Full-width landscape ─────────────────────── */}
        {p[3] && (
          <div className="gallery-row--full">
            <ProjectCard
              project={p[3]}
              aspectClass="prj-card__image-wrapper--hero"
            />
          </div>
        )}

        {/* ── Row 4: Landscape + Portrait split (reversed) ───── */}
        {p[4] && p[5] && (
          <div className="gallery-row--split-reverse">
            <ProjectCard
              project={p[4]}
              aspectClass="prj-card__image-wrapper--portrait"
            />
            <ProjectCard
              project={p[5]}
              aspectClass="prj-card__image-wrapper--portrait"
            />
          </div>
        )}

        {/* ── Interlude text ──────────────────────────────────── */}
        <div className="gallery-interlude">
          <p className="gallery-interlude__text">
            Từ Bắc vào Nam — công nghệ giám sát VDCD đồng hành cùng những công
            trình trọng điểm quốc gia.
          </p>
        </div>

        {/* ── Row 5: Three-column ─────────────────────────────── */}
        {p[6] && p[7] && p[8] && (
          <div className="gallery-row--three">
            <ProjectCard
              project={p[6]}
              aspectClass="prj-card__image-wrapper--landscape"
            />
            <ProjectCard
              project={p[7]}
              aspectClass="prj-card__image-wrapper--landscape"
            />
            <ProjectCard
              project={p[8]}
              aspectClass="prj-card__image-wrapper--landscape"
            />
          </div>
        )}
      </div>
    </section>
  );
};
