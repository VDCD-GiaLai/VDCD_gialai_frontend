"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { GsapHeroSlide } from "@/types";

let gsapInstance: any = null;
const loadGsap = async () => {
  if (gsapInstance) return gsapInstance;
  const mod = await import("gsap");
  gsapInstance = mod.default || mod;
  return gsapInstance;
};

// Safe proxy forwarding to dynamic gsap instance once loaded
const gsap = new Proxy({} as any, {
  get: (_, prop) => {
    if (gsapInstance && gsapInstance[prop]) {
      return gsapInstance[prop];
    }
    return () => {};
  },
});

export function useGsapHero(
  containerRef: React.RefObject<HTMLDivElement | null>,
  slides: GsapHeroSlide[],
) {
  // Keep order and buffer state in refs so they are stable across clicks
  const slidesRef = useRef(slides);
  const orderRef = useRef(slides.map((_, i) => i));
  const detailsEvenRef = useRef(true);
  const isAnimatingRef = useRef(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(false);

  // React state to reflect the active slide in the UI (specifically for class toggle like active-bg)
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    slidesRef.current = slides;
    if (orderRef.current.length !== slides.length) {
      orderRef.current = slides.map((_, i) => i);
    }
    // Skip mutating text on initial mount: SSR already rendered slide 0 text perfectly.
    // Mutating on mount triggers Chrome LCP re-paint invalidation.
    if (!isMountedRef.current) {
      return;
    }

    const currentActiveSlide = slides[orderRef.current[0]];
    if (currentActiveSlide && containerRef.current) {
      const detailsActive = detailsEvenRef.current
        ? "#details-even"
        : "#details-odd";
      const activeEl = containerRef.current.querySelector(detailsActive);
      if (activeEl) {
        const textEl = activeEl.querySelector(".text");
        const title1El = activeEl.querySelector(".title-1");
        const title2El = activeEl.querySelector(".title-2");
        const descEl = activeEl.querySelector(".desc");

        if (textEl && textEl.textContent !== currentActiveSlide.place) {
          textEl.textContent = currentActiveSlide.place;
        }
        if (title1El && title1El.textContent !== currentActiveSlide.title) {
          title1El.textContent = currentActiveSlide.title;
        }
        if (title2El && title2El.textContent !== currentActiveSlide.title2) {
          title2El.textContent = currentActiveSlide.title2;
        }
        if (descEl && descEl.textContent !== currentActiveSlide.desc) {
          descEl.textContent = currentActiveSlide.desc;
        }
        const ctaEl = activeEl.querySelector(
          ".discover",
        ) as HTMLAnchorElement | null;
        if (ctaEl) {
          ctaEl.href = currentActiveSlide.ctaUrl || "/#";
          if (currentActiveSlide.ctaText && ctaEl.childNodes[0]) {
            ctaEl.childNodes[0].nodeValue = currentActiveSlide.ctaText + " ";
          }
        }
      }
    }
  }, [slides, containerRef]);

  const getMaxVisibleThumbs = () => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 1280 ? 4 : 3;
  };

  const isGsapReadyRef = useRef(false);

  // Layout parameters refs for resize handling
  const offsetTopVal = useRef(200);
  const offsetLeftVal = useRef(700);
  const cardWidthVal = useRef(200);
  const cardHeightVal = useRef(300);
  const gapVal = useRef(40);

  const getCard = (index: number) =>
    containerRef.current?.querySelector(`#card-${index}`);
  const getCardContent = (index: number) =>
    containerRef.current?.querySelector(`#card-content-${index}`);

  const getContentYOffset = () => {
    if (typeof window === "undefined") return 70;
    const w = window.innerWidth;
    if (w < 768) return 70; // larger cards on mobile, text covers bottom ~40%
    if (w < 1280) return 60;
    return 75;
  };

  const updateDimensions = () => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const height = window.innerHeight;
    const width = window.innerWidth;

    if (width < 768) {
      // Mobile: no arrows, cards from left edge, bigger
      offsetTopVal.current = height - 195;
      offsetLeftVal.current = 16;
      cardWidthVal.current = width < 360 ? 130 : 145;
      cardHeightVal.current = 170;
      gapVal.current = 10;
    } else if (width < 1280) {
      // Tablet: arrows split LEFT/RIGHT, cards after left arrow
      offsetTopVal.current = height - 210;
      offsetLeftVal.current = 20 + 44 + 12; // leftMargin + oneArrow + gap = 76
      cardWidthVal.current = width < 850 ? 145 : 160;
      cardHeightVal.current = 175;
      gapVal.current = 12;
    } else {
      // Desktop: 3 cards on the right side, pagination below cards
      offsetTopVal.current = height - 390;
      offsetLeftVal.current = Math.max(width - 640, 500);
      cardWidthVal.current = 175;
      cardHeightVal.current = 255;
      gapVal.current = 28;
    }
  };

  const setCardPositions = (animated = false) => {
    if (!containerRef.current) return;
    const order = orderRef.current;
    const [active, ...rest] = order;

    // Active Card background
    const cardActive = getCard(active);
    if (cardActive) {
      gsap.killTweensOf(cardActive);
      gsap.set(cardActive, {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        zIndex: 20,
        borderRadius: 0,
        scale: 1,
      });
    }

    // Active Card content overlay hidden
    const contentActive = getCardContent(active);
    if (contentActive) {
      gsap.killTweensOf(contentActive);
      gsap.set(contentActive, { x: 0, y: 0, opacity: 0 });
    }

    // Rest of cards positioned normally (only first 3 visible)
    rest.forEach((i, index) => {
      const cardI = getCard(i);
      const contentI = getCardContent(i);
      const isVisible = index < getMaxVisibleThumbs();
      const posX =
        offsetLeftVal.current + index * (cardWidthVal.current + gapVal.current);

      if (cardI) {
        gsap.killTweensOf(cardI);
        if (animated) {
          gsap.to(cardI, {
            x: posX,
            y: offsetTopVal.current,
            width: cardWidthVal.current,
            height: cardHeightVal.current,
            zIndex: isVisible ? 30 : 5,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            borderRadius: 12,
            duration: 0.8,
            ease: "sine.inOut",
          });
        } else {
          gsap.set(cardI, {
            x: posX,
            y: offsetTopVal.current,
            width: cardWidthVal.current,
            height: cardHeightVal.current,
            zIndex: isVisible ? 30 : 5,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            borderRadius: 12,
          });
        }
      }

      if (contentI) {
        gsap.killTweensOf(contentI);
        if (animated) {
          gsap.to(contentI, {
            x: posX,
            y:
              offsetTopVal.current +
              cardHeightVal.current -
              getContentYOffset(),
            width: cardWidthVal.current,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            zIndex: isVisible ? 40 : 5,
            duration: 0.8,
            ease: "sine.inOut",
          });
        } else {
          gsap.set(contentI, {
            x: posX,
            y:
              offsetTopVal.current +
              cardHeightVal.current -
              getContentYOffset(),
            width: cardWidthVal.current,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            zIndex: isVisible ? 40 : 5,
          });
        }
      }
    });

    // Pagination placement
    const pagination = containerRef.current.querySelector("#pagination");
    if (pagination) {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile: hide arrows entirely
        gsap.set(pagination, {
          display: "none",
          opacity: 0,
          pointerEvents: "none",
        });
      } else if (width < 1280) {
        // Tablet: full-width, arrows split LEFT/RIGHT via CSS flex
        gsap.set(pagination, {
          top: offsetTopVal.current + (cardHeightVal.current - 44) / 2,
          left: 20,
          width: width - 40,
          opacity: 1,
          pointerEvents: "auto",
        });
      } else {
        // Desktop: arrows BELOW cards
        gsap.set(pagination, {
          top: offsetTopVal.current + cardHeightVal.current + 24,
          left: offsetLeftVal.current,
          width: "auto",
          opacity: 1,
          pointerEvents: "auto",
        });
      }
    }
  };

  const ensureGsapReady = async () => {
    if (isGsapReadyRef.current) return;
    await loadGsap();
    isGsapReadyRef.current = true;
    if (containerRef.current) {
      containerRef.current.classList.add("gsap-ready");
      updateDimensions();
      setCardPositions(false);
    }
  };

  const startAutoplayLoop = (delay = 25) => {
    stopAutoplayLoop();
    autoplayTimerRef.current = setTimeout(() => {
      nextSlide(true);
    }, delay * 1000);
  };

  const stopAutoplayLoop = () => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  const stepNext = () => {
    return new Promise<void>((resolve) => {
      if (!containerRef.current) return resolve();

      const order = orderRef.current;
      const first = order.shift()!;
      order.push(first);

      detailsEvenRef.current = !detailsEvenRef.current;
      const detailsActive = detailsEvenRef.current
        ? "#details-even"
        : "#details-odd";
      const detailsInactive = detailsEvenRef.current
        ? "#details-odd"
        : "#details-even";

      const activeIdxVal = order[0];
      const activeSlide = slidesRef.current[activeIdxVal];

      // Update React state for index (affects active-bg class)
      setActiveIdx(activeIdxVal);

      const activeEl = containerRef.current.querySelector(detailsActive);
      const inactiveEl = containerRef.current.querySelector(detailsInactive);

      if (activeEl) {
        const textEl = activeEl.querySelector(".text");
        const title1El = activeEl.querySelector(".title-1");
        const title2El = activeEl.querySelector(".title-2");
        const descEl = activeEl.querySelector(".desc");

        if (textEl) textEl.textContent = activeSlide.place;
        if (title1El) title1El.textContent = activeSlide.title;
        if (title2El) title2El.textContent = activeSlide.title2;
        if (descEl) descEl.textContent = activeSlide.desc;
        const ctaEl = activeEl.querySelector(
          ".discover",
        ) as HTMLAnchorElement | null;
        if (ctaEl) {
          ctaEl.href = activeSlide.ctaUrl || "/#";
          if (activeSlide.ctaText && ctaEl.childNodes[0]) {
            ctaEl.childNodes[0].nodeValue = activeSlide.ctaText + " ";
          }
        }

        gsap.killTweensOf([activeEl, textEl, title1El, title2El, descEl]);

        gsap.set(activeEl, { zIndex: 22, opacity: 0, pointerEvents: "auto" });
        gsap.set([textEl, title1El, title2El], { yPercent: 100 });
        gsap.set(descEl, { yPercent: 50 });

        gsap.to(activeEl, {
          opacity: 1,
          duration: 0.6,
          ease: "sine.inOut",
          delay: 0.2,
        });
        gsap.to(textEl, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.1,
        });
        gsap.to(title1El, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.15,
        });
        gsap.to(title2El, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.15,
        });
        gsap.to(descEl, {
          yPercent: 0,
          duration: 0.6,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      if (inactiveEl) {
        gsap.killTweensOf(inactiveEl);
        gsap.set(inactiveEl, { zIndex: 12, pointerEvents: "none" });
        gsap.to(inactiveEl, { opacity: 0, duration: 0.4, ease: "sine.inOut" });
      }

      const [active, ...rest] = order;
      const prv = rest[rest.length - 1]; // Old active

      const cardPrv = getCard(prv);
      const cardActive = getCard(active);

      if (cardPrv) {
        gsap.killTweensOf(cardPrv);
        gsap.set(cardPrv, { zIndex: 10 });
        gsap.to(cardPrv, { scale: 1.3, duration: 1.2, ease: "sine.inOut" });
      }

      if (cardActive) {
        gsap.killTweensOf(cardActive);
        gsap.set(cardActive, { zIndex: 20 });
      }

      const activeContent = getCardContent(active);
      if (activeContent) {
        gsap.killTweensOf(activeContent);
        gsap.to(activeContent, {
          opacity: 0,
          y: offsetTopVal.current + cardHeightVal.current - 10,
          duration: 0.3,
          ease: "sine.inOut",
        });
      }

      if (cardActive) {
        gsap.to(cardActive, {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          duration: 1.2,
          ease: "sine.inOut",
          onComplete: () => {
            const xNew =
              offsetLeftVal.current +
              (rest.length - 1) * (cardWidthVal.current + gapVal.current);
            const isVisible = rest.length - 1 < getMaxVisibleThumbs();
            if (cardPrv) {
              gsap.set(cardPrv, {
                x: xNew,
                y: offsetTopVal.current,
                width: cardWidthVal.current,
                height: cardHeightVal.current,
                zIndex: isVisible ? 30 : 5,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
                borderRadius: 12,
                scale: 1,
              });
            }

            const contentPrv = getCardContent(prv);
            if (contentPrv) {
              gsap.set(contentPrv, {
                x: xNew,
                y:
                  offsetTopVal.current +
                  cardHeightVal.current -
                  getContentYOffset(),
                width: cardWidthVal.current,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
                zIndex: isVisible ? 40 : 5,
              });
            }

            resolve();
          },
        });
      }

      // Animating the rest of the thumbnails leftward
      rest.forEach((i, index) => {
        if (i !== prv) {
          const isVisible = index < getMaxVisibleThumbs();
          const xNew =
            offsetLeftVal.current +
            index * (cardWidthVal.current + gapVal.current);
          const cardI = getCard(i);
          const contentI = getCardContent(i);

          if (cardI) {
            gsap.killTweensOf(cardI);
            gsap.set(cardI, { zIndex: isVisible ? 30 : 5 });
            gsap.to(cardI, {
              x: xNew,
              y: offsetTopVal.current,
              width: cardWidthVal.current,
              height: cardHeightVal.current,
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? "auto" : "none",
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * (index + 1),
            });
          }

          if (contentI) {
            gsap.killTweensOf(contentI);
            gsap.to(contentI, {
              x: xNew,
              y:
                offsetTopVal.current +
                cardHeightVal.current -
                getContentYOffset(),
              width: cardWidthVal.current,
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? "auto" : "none",
              zIndex: isVisible ? 40 : 5,
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * (index + 1),
            });
          }
        }
      });
    });
  };

  const stepPrev = () => {
    return new Promise<void>((resolve) => {
      if (!containerRef.current) return resolve();

      const order = orderRef.current;
      const last = order.pop()!;
      order.unshift(last);

      detailsEvenRef.current = !detailsEvenRef.current;
      const detailsActive = detailsEvenRef.current
        ? "#details-even"
        : "#details-odd";
      const detailsInactive = detailsEvenRef.current
        ? "#details-odd"
        : "#details-even";

      const activeIdxVal = order[0];
      const activeSlide = slidesRef.current[activeIdxVal];

      // Update React state for index (affects active-bg class)
      setActiveIdx(activeIdxVal);

      const activeEl = containerRef.current.querySelector(detailsActive);
      const inactiveEl = containerRef.current.querySelector(detailsInactive);

      if (activeEl) {
        const textEl = activeEl.querySelector(".text");
        const title1El = activeEl.querySelector(".title-1");
        const title2El = activeEl.querySelector(".title-2");
        const descEl = activeEl.querySelector(".desc");

        if (textEl) textEl.textContent = activeSlide.place;
        if (title1El) title1El.textContent = activeSlide.title;
        if (title2El) title2El.textContent = activeSlide.title2;
        if (descEl) descEl.textContent = activeSlide.desc;
        const ctaEl = activeEl.querySelector(
          ".discover",
        ) as HTMLAnchorElement | null;
        if (ctaEl) {
          ctaEl.href = activeSlide.ctaUrl || "/#";
          if (activeSlide.ctaText && ctaEl.childNodes[0]) {
            ctaEl.childNodes[0].nodeValue = activeSlide.ctaText + " ";
          }
        }

        gsap.killTweensOf([activeEl, textEl, title1El, title2El, descEl]);

        gsap.set(activeEl, { zIndex: 22, opacity: 0, pointerEvents: "auto" });
        gsap.set([textEl, title1El, title2El], { yPercent: 100 });
        gsap.set(descEl, { yPercent: 50 });

        gsap.to(activeEl, {
          opacity: 1,
          duration: 0.6,
          ease: "sine.inOut",
          delay: 0.2,
        });
        gsap.to(textEl, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.1,
        });
        gsap.to(title1El, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.15,
        });
        gsap.to(title2El, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.15,
        });
        gsap.to(descEl, {
          yPercent: 0,
          duration: 0.6,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      if (inactiveEl) {
        gsap.killTweensOf(inactiveEl);
        gsap.set(inactiveEl, { zIndex: 12, pointerEvents: "none" });
        gsap.to(inactiveEl, { opacity: 0, duration: 0.4, ease: "sine.inOut" });
      }

      const [active, ...rest] = order;
      const prv = rest[0]; // Old active index is now the first thumbnail

      const cardPrv = getCard(prv);
      const cardActive = getCard(active);

      // cardActive (new active) is positioned at fullscreen (0,0), scale 1.2, zIndex 10
      if (cardActive) {
        gsap.killTweensOf(cardActive);
        gsap.set(cardActive, {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          zIndex: 10,
          opacity: 1,
          scale: 1.2,
          borderRadius: 0,
        });
        gsap.to(cardActive, {
          scale: 1,
          duration: 1.2,
          ease: "sine.inOut",
        });
      }

      const activeContent = getCardContent(active);
      if (activeContent) {
        gsap.killTweensOf(activeContent);
        gsap.set(activeContent, { opacity: 0 });
      }

      const xSlot0 = offsetLeftVal.current;

      // cardPrv (old active) shrinks from fullscreen into slot 0
      if (cardPrv) {
        gsap.killTweensOf(cardPrv);
        gsap.set(cardPrv, { zIndex: 20 });
        gsap.to(cardPrv, {
          x: xSlot0,
          y: offsetTopVal.current,
          width: cardWidthVal.current,
          height: cardHeightVal.current,
          borderRadius: 12,
          scale: 1,
          duration: 1.2,
          ease: "sine.inOut",
          onComplete: () => {
            gsap.set(cardPrv, { zIndex: 30, pointerEvents: "auto" });
            resolve();
          },
        });
      } else {
        resolve();
      }

      // contentPrv fades in at slot 0
      const contentPrv = getCardContent(prv);
      if (contentPrv) {
        gsap.killTweensOf(contentPrv);
        gsap.set(contentPrv, {
          x: xSlot0,
          y: offsetTopVal.current + cardHeightVal.current - getContentYOffset(),
          width: cardWidthVal.current,
          opacity: 0,
          zIndex: 40,
        });
        gsap.to(contentPrv, {
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "sine.inOut",
          pointerEvents: "auto",
        });
      }

      // The rest of the thumbnails (rest.slice(1)) animate rightward
      rest.slice(1).forEach((i, index) => {
        const targetSlot = index + 1;
        const isVisible = targetSlot < getMaxVisibleThumbs();
        const xNew =
          offsetLeftVal.current +
          targetSlot * (cardWidthVal.current + gapVal.current);
        const cardI = getCard(i);
        const contentI = getCardContent(i);

        if (cardI) {
          gsap.killTweensOf(cardI);
          gsap.set(cardI, { zIndex: isVisible ? 30 : 5 });
          gsap.to(cardI, {
            x: xNew,
            y: offsetTopVal.current,
            width: cardWidthVal.current,
            height: cardHeightVal.current,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            duration: 1.0,
            ease: "sine.inOut",
            delay: 0.05 * index,
          });
        }

        if (contentI) {
          gsap.killTweensOf(contentI);
          gsap.to(contentI, {
            x: xNew,
            y:
              offsetTopVal.current +
              cardHeightVal.current -
              getContentYOffset(),
            width: cardWidthVal.current,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            zIndex: isVisible ? 40 : 5,
            duration: 1.0,
            ease: "sine.inOut",
            delay: 0.05 * index,
          });
        }
      });
    });
  };

  const jumpTo = (targetIdx: number) => {
    return new Promise<void>((resolve) => {
      if (!containerRef.current) return resolve();

      const oldOrder = [...orderRef.current];
      const oldActive = oldOrder[0];
      const clicked = targetIdx;

      const remaining = oldOrder.filter(
        (x) => x !== oldActive && x !== clicked,
      );
      const newOrder = [clicked, ...remaining, oldActive];
      orderRef.current = newOrder;

      detailsEvenRef.current = !detailsEvenRef.current;
      const detailsActive = detailsEvenRef.current
        ? "#details-even"
        : "#details-odd";
      const detailsInactive = detailsEvenRef.current
        ? "#details-odd"
        : "#details-even";

      const activeSlide = slides[clicked];

      // Update React state for index (affects active-bg class)
      setActiveIdx(clicked);

      const activeEl = containerRef.current.querySelector(detailsActive);
      const inactiveEl = containerRef.current.querySelector(detailsInactive);

      if (activeEl) {
        const textEl = activeEl.querySelector(".text");
        const title1El = activeEl.querySelector(".title-1");
        const title2El = activeEl.querySelector(".title-2");
        const descEl = activeEl.querySelector(".desc");

        if (textEl) textEl.textContent = activeSlide.place;
        if (title1El) title1El.textContent = activeSlide.title;
        if (title2El) title2El.textContent = activeSlide.title2;
        if (descEl) descEl.textContent = activeSlide.desc;
        const ctaEl = activeEl.querySelector(
          ".discover",
        ) as HTMLAnchorElement | null;
        if (ctaEl) {
          ctaEl.href = activeSlide.ctaUrl || "/#";
          if (activeSlide.ctaText && ctaEl.childNodes[0]) {
            ctaEl.childNodes[0].nodeValue = activeSlide.ctaText + " ";
          }
        }

        gsap.killTweensOf([activeEl, textEl, title1El, title2El, descEl]);

        gsap.set(activeEl, { zIndex: 22, opacity: 0, pointerEvents: "auto" });
        gsap.set([textEl, title1El, title2El], { yPercent: 100 });
        gsap.set(descEl, { yPercent: 50 });

        gsap.to(activeEl, {
          opacity: 1,
          duration: 0.6,
          ease: "sine.inOut",
          delay: 0.2,
        });
        gsap.to(textEl, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.1,
        });
        gsap.to(title1El, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.15,
        });
        gsap.to(title2El, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: 0.15,
        });
        gsap.to(descEl, {
          yPercent: 0,
          duration: 0.6,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      if (inactiveEl) {
        gsap.killTweensOf(inactiveEl);
        gsap.set(inactiveEl, { zIndex: 12, pointerEvents: "none" });
        gsap.to(inactiveEl, { opacity: 0, duration: 0.4, ease: "sine.inOut" });
      }

      const cardPrv = getCard(oldActive);
      const cardActive = getCard(clicked);

      if (cardPrv) {
        gsap.killTweensOf(cardPrv);
        gsap.set(cardPrv, { zIndex: 10 });
        gsap.to(cardPrv, { scale: 1.3, duration: 1.2, ease: "sine.inOut" });
      }

      if (cardActive) {
        gsap.killTweensOf(cardActive);
        gsap.set(cardActive, { zIndex: 20 });
      }

      const activeContent = getCardContent(clicked);
      if (activeContent) {
        gsap.killTweensOf(activeContent);
        gsap.to(activeContent, {
          opacity: 0,
          y: offsetTopVal.current + cardHeightVal.current - 10,
          duration: 0.3,
          ease: "sine.inOut",
        });
      }

      if (cardActive) {
        gsap.to(cardActive, {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          duration: 1.2,
          ease: "sine.inOut",
          onComplete: () => {
            const xNew =
              offsetLeftVal.current +
              (newOrder.length - 2) * (cardWidthVal.current + gapVal.current);
            const isVisible = newOrder.length - 2 < getMaxVisibleThumbs();
            if (cardPrv) {
              gsap.set(cardPrv, {
                x: xNew,
                y: offsetTopVal.current,
                width: cardWidthVal.current,
                height: cardHeightVal.current,
                zIndex: isVisible ? 30 : 5,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
                borderRadius: 12,
                scale: 1,
              });
            }

            const contentPrv = getCardContent(oldActive);
            if (contentPrv) {
              gsap.set(contentPrv, {
                x: xNew,
                y:
                  offsetTopVal.current +
                  cardHeightVal.current -
                  getContentYOffset(),
                width: cardWidthVal.current,
                opacity: isVisible ? 1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
                zIndex: isVisible ? 40 : 5,
              });
            }

            resolve();
          },
        });
      }

      // Animating the rest of the thumbnails leftward
      const rest = newOrder.slice(1);
      rest.forEach((i, index) => {
        if (i !== oldActive) {
          const isVisible = index < getMaxVisibleThumbs();
          const xNew =
            offsetLeftVal.current +
            index * (cardWidthVal.current + gapVal.current);
          const cardI = getCard(i);
          const contentI = getCardContent(i);

          if (cardI) {
            gsap.killTweensOf(cardI);
            gsap.set(cardI, { zIndex: isVisible ? 30 : 5 });
            gsap.to(cardI, {
              x: xNew,
              y: offsetTopVal.current,
              width: cardWidthVal.current,
              height: cardHeightVal.current,
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? "auto" : "none",
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * (index + 1),
            });
          }

          if (contentI) {
            gsap.killTweensOf(contentI);
            gsap.to(contentI, {
              x: xNew,
              y:
                offsetTopVal.current +
                cardHeightVal.current -
                getContentYOffset(),
              width: cardWidthVal.current,
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? "auto" : "none",
              zIndex: isVisible ? 40 : 5,
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * (index + 1),
            });
          }
        }
      });
    });
  };

  const selectSlide = async (targetIdx: number) => {
    if (isAnimatingRef.current) return;
    if (orderRef.current[0] === targetIdx) return;
    await ensureGsapReady();
    isAnimatingRef.current = true;

    stopAutoplayLoop();
    try {
      await jumpTo(targetIdx);
    } finally {
      isAnimatingRef.current = false;
      startAutoplayLoop(15);
    }
  };

  const nextSlide = async (isAutoplay = false) => {
    if (isAnimatingRef.current) return;
    await ensureGsapReady();
    isAnimatingRef.current = true;

    if (!isAutoplay) {
      stopAutoplayLoop();
    }

    try {
      await stepNext();
    } finally {
      isAnimatingRef.current = false;
      startAutoplayLoop(15);
    }
  };

  const prevSlide = async () => {
    if (isAnimatingRef.current) return;
    await ensureGsapReady();
    isAnimatingRef.current = true;

    stopAutoplayLoop();
    try {
      await stepPrev();
    } finally {
      isAnimatingRef.current = false;
      startAutoplayLoop(15);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    isMountedRef.current = true;
    startAutoplayLoop(25);

    // Pre-cache GSAP after initial paint or on early user interaction
    const triggerEarlyGsap = () => {
      loadGsap();
      window.removeEventListener("pointerdown", triggerEarlyGsap);
      window.removeEventListener("keydown", triggerEarlyGsap);
    };
    window.addEventListener("pointerdown", triggerEarlyGsap, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", triggerEarlyGsap, {
      once: true,
      passive: true,
    });

    const idleTimer = setTimeout(() => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          loadGsap();
        });
      } else {
        loadGsap();
      }
    }, 4000);

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      ensureGsapReady();
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          prevSlide();
        } else {
          nextSlide(false);
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Window Resize handler
    const handleResize = () => {
      if (isGsapReadyRef.current) {
        updateDimensions();
        setCardPositions(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("pointerdown", triggerEarlyGsap);
      window.removeEventListener("keydown", triggerEarlyGsap);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.classList.remove("gsap-ready");
      stopAutoplayLoop();
    };
  }, []);

  /* eslint-disable react-hooks/refs */
  return {
    order: orderRef.current,
    activeIdx,
    isAnimating: isAnimatingRef.current,
    nextSlide,
    prevSlide,
    selectSlide,
  };
  /* eslint-enable react-hooks/refs */
}
