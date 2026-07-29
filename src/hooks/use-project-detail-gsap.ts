"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralised GSAP animations for the Project Detail page.
 * Scoped via gsap.context() for clean unmount.
 * Responsive via gsap.matchMedia().
 * Reduced-motion safe.
 *
 * Follows the exact same pattern as use-projects-gsap.ts.
 */
export const useProjectDetailGsap = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    /* Small delay to let Next.js images settle / layout paint */
    const frameId = requestAnimationFrame(() => {
      ctxRef.current = gsap.context(() => {
        const mm = gsap.matchMedia();

        /* ─────────────────────── Reduced motion ─────────────────────── */
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(
            root.querySelectorAll(
              ".pd-hero__meta-top, .pd-hero__title, .pd-hero__meta-bottom, .pd-hero__scroll-cue, .pd-info, .pd-challenge, .pd-transform__after, .pd-highlights__item, .pd-gallery__item, .pd-next__content",
            ),
            {
              opacity: 1,
              y: 0,
              x: 0,
              clipPath: "none",
              visibility: "visible",
            },
          );
        });

        /* ─────────────────────── Full motion ────────────────────────── */
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /* ── HERO ──────────────────────────────────────────────────── */
          const heroTl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1 },
            delay: 0.3,
          });

          heroTl
            .to(
              root.querySelector(".pd-hero__meta-top"),
              { opacity: 1, y: 0, duration: 0.7 },
              0,
            )
            .fromTo(
              root.querySelector(".pd-hero__title"),
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.2 },
              0.15,
            )
            .to(
              root.querySelector(".pd-hero__meta-bottom"),
              { opacity: 1, y: 0, duration: 0.8 },
              0.5,
            )
            .to(
              root.querySelector(".pd-hero__scroll-cue"),
              { opacity: 1, duration: 0.6 },
              0.7,
            );

          /* Hero image parallax */
          const heroImg = root.querySelector(".pd-hero__img");
          if (heroImg) {
            gsap.to(heroImg, {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: root.querySelector(".pd-hero"),
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          /* ── INFO ──────────────────────────────────────────────────── */
          const infoSection = root.querySelector(".pd-info");
          if (infoSection) {
            const infoDescription = infoSection.querySelector(
              ".pd-info__description",
            );
            const infoMetadata =
              infoSection.querySelector(".pd-info__metadata");

            if (infoDescription) {
              gsap.fromTo(
                infoDescription,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: infoSection,
                    start: "top 75%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }

            if (infoMetadata) {
              const metaGroups = infoMetadata.querySelectorAll(
                ".pd-info__meta-group",
              );
              gsap.fromTo(
                metaGroups,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.08,
                  scrollTrigger: {
                    trigger: infoSection,
                    start: "top 70%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }
          }

          /* ── CHALLENGE ─────────────────────────────────────────────── */
          const challengeContainer = root.querySelector(
            ".pd-challenge__container",
          );
          if (challengeContainer) {
            const challengeHeader = challengeContainer.querySelector(
              ".pd-challenge__header",
            );
            const challengeBody = challengeContainer.querySelector(
              ".pd-challenge__body",
            );

            if (challengeHeader) {
              gsap.fromTo(
                challengeHeader,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: challengeContainer,
                    start: "top 75%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }

            if (challengeBody) {
              gsap.fromTo(
                challengeBody,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: challengeContainer,
                    start: "top 65%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }
          }

          /* Challenge image clip-path reveal */
          const challengeImage = root.querySelector(".pd-challenge__image");
          if (challengeImage) {
            gsap.fromTo(
              challengeImage,
              { clipPath: "inset(100% 0 0 0)" },
              {
                clipPath: "inset(0% 0 0 0)",
                duration: 1.2,
                ease: "power3.inOut",
                scrollTrigger: {
                  trigger: challengeImage,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          }

          /* ── TRANSFORMATION — clip-path reveal on scroll ──────────── */
          const transformAfter = root.querySelector(".pd-transform__after");
          if (transformAfter) {
            gsap.to(transformAfter, {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: root.querySelector(".pd-transform__comparison"),
                start: "top 60%",
                end: "bottom 40%",
                scrub: 1,
              },
            });
          }

          /* ── HIGHLIGHTS — stagger reveal ──────────────────────────── */
          const highlightsSection = root.querySelector(".pd-highlights");
          if (highlightsSection) {
            /* Header */
            const hlHeader = highlightsSection.querySelector(
              ".pd-highlights__header",
            );
            if (hlHeader) {
              gsap.fromTo(
                hlHeader,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: highlightsSection,
                    start: "top 80%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }

            /* Items */
            const hlItems = highlightsSection.querySelectorAll(
              ".pd-highlights__item",
            );
            if (hlItems.length > 0) {
              gsap.fromTo(
                hlItems,
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.08,
                  scrollTrigger: {
                    trigger: highlightsSection,
                    start: "top 70%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }
          }

          /* ── GALLERY — clip-path reveals ──────────────────────────── */
          const galleryItems = root.querySelectorAll(".pd-gallery__item");
          galleryItems.forEach((item) => {
            const imgWrap = item.querySelector(".pd-gallery__image-wrapper");
            if (imgWrap) {
              gsap.fromTo(
                imgWrap,
                { clipPath: "inset(100% 0 0 0)" },
                {
                  clipPath: "inset(0% 0 0 0)",
                  duration: 1,
                  ease: "power3.inOut",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }

            const caption = item.querySelector(".pd-gallery__caption");
            if (caption) {
              gsap.fromTo(
                caption,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: 0.3,
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }
          });

          /* ── NEXT PROJECT — parallax + content reveal ─────────────── */
          const nextSection = root.querySelector(".pd-next");
          if (nextSection) {
            const nextImg = nextSection.querySelector(
              ".pd-next__image-wrapper img",
            );
            if (nextImg) {
              gsap.fromTo(
                nextImg,
                { scale: 1.1 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: nextSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }

            const nextContent = nextSection.querySelector(".pd-next__content");
            if (nextContent) {
              gsap.fromTo(
                nextContent,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: nextSection,
                    start: "top 60%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }

            const nextHeader = nextSection.querySelector(".pd-next__header");
            if (nextHeader) {
              gsap.fromTo(
                nextHeader,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: nextSection,
                    start: "top 75%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }
          }
        }); /* end full-motion */
      }, root); /* end gsap.context */
    }); /* end rAF */

    return () => {
      cancelAnimationFrame(frameId);
      ctxRef.current?.revert();
    };
  }, [containerRef]);
};
