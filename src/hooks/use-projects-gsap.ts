"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Centralised GSAP animations for the Projects page.
 * Scoped via gsap.context() for clean unmount.
 * Responsive via gsap.matchMedia().
 * Reduced-motion safe.
 */
export const useProjectsGsap = (
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

        /* ----------------------- Reduced motion ----------------------- */
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(
            root.querySelectorAll(".gsap-reveal, .workflow-panel, .prj-card"),
            { opacity: 1, y: 0, clipPath: "none", visibility: "visible" },
          );
        });

        /* ----------------------- Full motion ------------------------- */
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          /* -- WORKFLOW - Desktop: pinned horizontal scroll ----------- */
          const workflowPinContainer = root.querySelector(
            ".workflow-pin-container",
          );
          const workflowTrack = root.querySelector(
            ".workflow-track:not(.workflow-track--mobile)",
          );

          if (workflowPinContainer && workflowTrack) {
            const panels = gsap.utils.toArray<HTMLElement>(
              workflowTrack.querySelectorAll(".workflow-panel"),
            );

            if (panels.length > 1) {
              const workflowTl = gsap.timeline({
                scrollTrigger: {
                  trigger: workflowPinContainer,
                  start: "top top",
                  end: () =>
                    "+=" +
                    ((workflowTrack as HTMLElement).scrollWidth -
                      window.innerWidth),
                  scrub: 1,
                  pin: true,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });

              workflowTl.to(workflowTrack, {
                x: () =>
                  -(
                    (workflowTrack as HTMLElement).scrollWidth -
                    window.innerWidth
                  ),
                ease: "none",
              });

              /* Per-panel content reveals */
              panels.forEach((panel, i) => {
                if (i === 0) return; /* first panel already visible */
                const content = panel.querySelector(".workflow-panel__content");
                const img = panel.querySelector(
                  ".workflow-panel__image-wrapper",
                );

                if (content) {
                  gsap.fromTo(
                    content,
                    { opacity: 0, x: 60 },
                    {
                      opacity: 1,
                      x: 0,
                      duration: 0.6,
                      ease: "power2.out",
                      scrollTrigger: {
                        trigger: panel,
                        containerAnimation: workflowTl,
                        start: "left 70%",
                        toggleActions: "play none none reverse",
                      },
                    },
                  );
                }

                if (img) {
                  gsap.fromTo(
                    img,
                    { clipPath: "inset(0 100% 0 0)" },
                    {
                      clipPath: "inset(0 0% 0 0)",
                      duration: 0.8,
                      ease: "power2.inOut",
                      scrollTrigger: {
                        trigger: panel,
                        containerAnimation: workflowTl,
                        start: "left 75%",
                        toggleActions: "play none none reverse",
                      },
                    },
                  );
                }
              });
            }
          }

          /* -- WORKFLOW - Mobile: stacked vertical reveals ------------ */
          const mobilePanels = root.querySelectorAll(
            ".workflow-track--mobile .workflow-panel",
          );
          if (mobilePanels.length > 0) {
            mobilePanels.forEach((panel) => {
              gsap.fromTo(
                panel,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
          }

          /* -- TRANSITION ------------------------------------------- */
          const transitionEl = root.querySelector(".projects-transition");
          if (transitionEl) {
            gsap.fromTo(
              transitionEl.querySelectorAll(".gsap-reveal"),
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: transitionEl,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          /* -- GALLERY HEADER ---------------------------------------- */
          const galleryHeader = root.querySelector(".gallery-header");
          if (galleryHeader) {
            gsap.fromTo(
              galleryHeader.querySelectorAll(".gsap-reveal"),
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: galleryHeader,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          /* -- GALLERY CARDS - clip-path reveal ---------------------- */
          const cards = root.querySelectorAll(".prj-card");
          cards.forEach((card) => {
            const imgWrap = card.querySelector(".prj-card__image-wrapper");
            if (imgWrap) {
              gsap.fromTo(
                imgWrap,
                { clipPath: "inset(100% 0 0 0)" },
                {
                  clipPath: "inset(0% 0 0 0)",
                  duration: 1,
                  ease: "power3.inOut",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }

            const overlay = card.querySelector(".prj-card__overlay");
            if (overlay) {
              gsap.fromTo(
                overlay,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  delay: 0.3,
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  },
                },
              );
            }
          });

          /* -- GALLERY INTERLUDE -------------------------------------- */
          const interludes = root.querySelectorAll(".gallery-interlude");
          interludes.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
        }); /* end full-motion */
      }, root); /* end gsap.context */
    }); /* end rAF */

    return () => {
      cancelAnimationFrame(frameId);
      ctxRef.current?.revert();
    };
  }, [containerRef]);
};
