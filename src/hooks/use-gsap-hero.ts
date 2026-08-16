"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GsapHeroSlide } from "@/types";

export function useGsapHero(
  containerRef: React.RefObject<HTMLDivElement | null>,
  slides: GsapHeroSlide[],
) {
  // Keep order and buffer state in refs so they are stable across clicks
  const slidesRef = useRef(slides);
  const orderRef = useRef(slides.map((_, i) => i));
  const detailsEvenRef = useRef(true);
  const isAnimatingRef = useRef(false);
  const autoplayTweenRef = useRef<any>(null);

  // React state to reflect the active slide in the UI (specifically for class toggle like active-bg)
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    slidesRef.current = slides;
    if (orderRef.current.length !== slides.length) {
      orderRef.current = slides.map((_, i) => i);
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
      }
    }
  }, [slides, containerRef]);

  const getMaxVisibleThumbs = () => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 1280 ? 4 : 3;
  };

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

  const startAutoplayLoop = () => {
    if (autoplayTweenRef.current) {
      autoplayTweenRef.current.kill();
    }
    autoplayTweenRef.current = gsap.delayedCall(15, () => {
      nextSlide(true);
    });
  };

  const stopAutoplayLoop = () => {
    if (autoplayTweenRef.current) {
      autoplayTweenRef.current.kill();
      autoplayTweenRef.current = null;
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
            const xNew = offsetLeftVal.current;
            if (cardPrv) {
              gsap.set(cardPrv, {
                x: xNew,
                y: offsetTopVal.current,
                width: cardWidthVal.current,
                height: cardHeightVal.current,
                zIndex: 30,
                opacity: 1,
                pointerEvents: "auto",
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
                opacity: 1,
                pointerEvents: "auto",
                zIndex: 40,
              });
            }

            resolve();
          },
        });
      }

      // Animating the rest of the thumbnails rightward
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
    isAnimatingRef.current = true;

    stopAutoplayLoop();
    await jumpTo(targetIdx);
    isAnimatingRef.current = false;
    startAutoplayLoop();
  };

  const nextSlide = async (isAutoplay = false) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (!isAutoplay) {
      stopAutoplayLoop();
    }

    await stepNext();
    isAnimatingRef.current = false;
    startAutoplayLoop();
  };

  const prevSlide = async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    stopAutoplayLoop();
    await stepPrev();
    isAnimatingRef.current = false;
    startAutoplayLoop();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Set up responsive values and initial positioning
      updateDimensions();
      setCardPositions(false);

      // Initial load animations
      const activeEl = container.querySelector("#details-even");
      const activeSlide = slidesRef.current[orderRef.current[0]];

      if (activeEl) {
        const textEl = activeEl.querySelector(".text");
        const title1El = activeEl.querySelector(".title-1");
        const title2El = activeEl.querySelector(".title-2");
        const descEl = activeEl.querySelector(".desc");

        if (textEl) textEl.textContent = activeSlide.place;
        if (title1El) title1El.textContent = activeSlide.title;
        if (title2El) title2El.textContent = activeSlide.title2;
        if (descEl) descEl.textContent = activeSlide.desc;

        gsap.set(activeEl, {
          opacity: 0,
          x: -100,
          zIndex: 22,
          pointerEvents: "auto",
        });
        gsap.set([textEl, title1El, title2El], { yPercent: 100 });
        gsap.set(descEl, { yPercent: 50 });
        const inactiveEl = container.querySelector("#details-odd");
        if (inactiveEl) {
          gsap.set(inactiveEl, {
            opacity: 0,
            zIndex: 12,
            pointerEvents: "none",
          });
        }
      }

      const rest = orderRef.current.slice(1);
      rest.forEach((i, index) => {
        const isVisible = index < getMaxVisibleThumbs();
        const card = getCard(i);
        const content = getCardContent(i);
        if (card) {
          gsap.set(card, {
            x:
              offsetLeftVal.current +
              400 +
              index * (cardWidthVal.current + gapVal.current),
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
          });
        }
        if (content) {
          gsap.set(content, {
            x:
              offsetLeftVal.current +
              400 +
              index * (cardWidthVal.current + gapVal.current),
            width: cardWidthVal.current,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
          });
        }
      });

      // Animate details and cards in on load
      const startDelay = 0.5;

      gsap.to(".cover", {
        x: window.innerWidth + 400,
        duration: 1.2,
        ease: "sine.inOut",
        onComplete: () => {
          gsap.set(".cover", { display: "none" });
          startAutoplayLoop();
        },
      });

      rest.forEach((i, index) => {
        const isVisible = index < getMaxVisibleThumbs();
        const card = getCard(i);
        const content = getCardContent(i);
        const posX =
          offsetLeftVal.current +
          index * (cardWidthVal.current + gapVal.current);

        if (card) {
          gsap.to(card, {
            x: posX,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            duration: 1.0,
            ease: "sine.inOut",
            delay: startDelay + 0.05 * index,
          });
        }
        if (content) {
          gsap.to(content, {
            x: posX,
            width: cardWidthVal.current,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
            duration: 1.0,
            ease: "sine.inOut",
            delay: startDelay + 0.05 * index,
          });
        }
      });

      if (activeEl) {
        const textEl = activeEl.querySelector(".text");
        const title1El = activeEl.querySelector(".title-1");
        const title2El = activeEl.querySelector(".title-2");
        const descEl = activeEl.querySelector(".desc");

        gsap.to(activeEl, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "sine.inOut",
          delay: startDelay,
        });
        gsap.to(textEl, {
          yPercent: 0,
          duration: 0.8,
          ease: "sine.inOut",
          delay: startDelay + 0.1,
        });
        gsap.to(title1El, {
          yPercent: 0,
          duration: 0.8,
          ease: "sine.inOut",
          delay: startDelay + 0.15,
        });
        gsap.to(title2El, {
          yPercent: 0,
          duration: 0.8,
          ease: "sine.inOut",
          delay: startDelay + 0.15,
        });
        gsap.to(descEl, {
          yPercent: 0,
          duration: 0.7,
          ease: "sine.inOut",
          delay: startDelay + 0.3,
        });
      }

      gsap.fromTo(
        "#pagination",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "sine.inOut",
          delay: startDelay,
        },
      );
    }, containerRef);

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
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
      updateDimensions();
      setCardPositions(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      ctx.revert();
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
