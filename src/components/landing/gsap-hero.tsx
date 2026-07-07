"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiArrowRight } from "react-icons/fi";

const slides = [
  {
    place: "TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
    title: "KIẾN TẠO",
    title2: "HỆ SINH THÁI SỐ",
    desc: "Cầu nối thúc đẩy khởi nghiệp sáng tạo, chuyển giao công nghệ lõi và xây dựng hạ tầng kỹ thuật số đồng bộ, đồng hành cùng sự phát triển kinh tế số của tỉnh Gia Lai.",
    image: "/innovation_center.png",
  },
  {
    place: "NÔNG NGHIỆP CÔNG NGHỆ CAO",
    title: "NÔNG NGHIỆP",
    title2: "THÔNG MINH",
    desc: "Ứng dụng các giải pháp số hóa IoT, tự động hóa và AI nhằm tối ưu hóa chuỗi giá trị, nâng cao năng suất và gia tăng giá trị bền vững cho nông sản chủ lực Gia Lai.",
    image: "/farm_area_drone_view.jpg",
  },
  {
    place: "QUẢN LÝ ĐÔ THỊ THÔNG MINH",
    title: "HỆ THỐNG",
    title2: "ĐÔ THỊ SỐ",
    desc: "Giải pháp quản lý, giám sát và điều hành đô thị thông minh IOC giúp tối ưu hóa dịch vụ công cộng và hỗ trợ ra quyết định kịp thời cho chính quyền và doanh nghiệp.",
    image: "/quynhon_citynightview.webp",
  },
  {
    place: "HẠ TẦNG KỸ THUẬT SỐ",
    title: "TRUNG TÂM",
    title2: "DỮ LIỆU VÙNG",
    desc: "Hạ tầng lưu trữ đám mây và xử lý dữ liệu lớn chuẩn quốc tế, đảm bảo tính an toàn, bảo mật tối đa và khả năng mở rộng không giới hạn cho các tổ chức, doanh nghiệp.",
    image: "/data_center.jpg",
  },
  {
    place: "HỆ SINH THÁI VDCD GROUP",
    title: "LIÊN KẾT",
    title2: "PHÁT TRIỂN",
    desc: "Hội tụ năng lực công nghệ lõi và nguồn lực tài chính bền vững trong hệ sinh thái, làm cầu nối vững chắc đưa các giải pháp hiện đại đi vào thực tiễn cuộc sống.",
    image: "/quynhon_herobanner.jpg",
  },
];

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep order and buffer state in refs so they are stable across clicks
  const orderRef = useRef([0, 1, 2, 3, 4]);
  const detailsEvenRef = useRef(true);
  const isAnimatingRef = useRef(false);
  const autoplayTweenRef = useRef<any>(null);

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

  const updateDimensions = () => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const height = window.innerHeight;
    const width = window.innerWidth;

    if (width < 768) {
      // Mobile offsets
      offsetTopVal.current = height - 260;
      offsetLeftVal.current = 24;
      cardWidthVal.current = 100;
      cardHeightVal.current = 140;
      gapVal.current = 12;
    } else if (width < 1024) {
      // Tablet offsets
      offsetTopVal.current = height - 320;
      offsetLeftVal.current = width - 420;
      cardWidthVal.current = 130;
      cardHeightVal.current = 180;
      gapVal.current = 16;
    } else {
      // Desktop offsets
      offsetTopVal.current = height - 420;
      offsetLeftVal.current = width - 820;
      cardWidthVal.current = 180;
      cardHeightVal.current = 260;
      gapVal.current = 32;
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

    // Rest of cards
    rest.forEach((i, index) => {
      const cardI = getCard(i);
      const contentI = getCardContent(i);
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
            zIndex: 30,
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
            zIndex: 30,
            borderRadius: 12,
          });
        }
      }

      if (contentI) {
        gsap.killTweensOf(contentI);
        if (animated) {
          gsap.to(contentI, {
            x: posX,
            y: offsetTopVal.current + cardHeightVal.current - 90,
            width: cardWidthVal.current,
            opacity: 1,
            zIndex: 40,
            duration: 0.8,
            ease: "sine.inOut",
          });
        } else {
          gsap.set(contentI, {
            x: posX,
            y: offsetTopVal.current + cardHeightVal.current - 90,
            width: cardWidthVal.current,
            opacity: 1,
            zIndex: 40,
          });
        }
      }
    });

    // Pagination placement
    const pagination = containerRef.current.querySelector("#pagination");
    if (pagination) {
      gsap.set(pagination, {
        top: offsetTopVal.current + cardHeightVal.current + 24,
        left: offsetLeftVal.current,
      });
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

      const activeIdx = order[0];
      const activeSlide = slides[activeIdx];

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
            if (cardPrv) {
              gsap.set(cardPrv, {
                x: xNew,
                y: offsetTopVal.current,
                width: cardWidthVal.current,
                height: cardHeightVal.current,
                zIndex: 30,
                borderRadius: 12,
                scale: 1,
              });
            }

            const contentPrv = getCardContent(prv);
            if (contentPrv) {
              gsap.set(contentPrv, {
                x: xNew,
                y: offsetTopVal.current + cardHeightVal.current - 90,
                width: cardWidthVal.current,
                opacity: 1,
                zIndex: 40,
              });
            }

            resolve();
          },
        });
      }

      // Animating the rest of the thumbnails leftward
      rest.forEach((i, index) => {
        if (i !== prv) {
          const xNew =
            offsetLeftVal.current +
            index * (cardWidthVal.current + gapVal.current);
          const cardI = getCard(i);
          const contentI = getCardContent(i);

          if (cardI) {
            gsap.killTweensOf(cardI);
            gsap.set(cardI, { zIndex: 30 });
            gsap.to(cardI, {
              x: xNew,
              y: offsetTopVal.current,
              width: cardWidthVal.current,
              height: cardHeightVal.current,
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * (index + 1),
            });
          }

          if (contentI) {
            gsap.killTweensOf(contentI);
            gsap.to(contentI, {
              x: xNew,
              y: offsetTopVal.current + cardHeightVal.current - 90,
              width: cardWidthVal.current,
              opacity: 1,
              zIndex: 40,
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

      const activeIdx = order[0];
      const activeSlide = slides[activeIdx];

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
                borderRadius: 12,
                scale: 1,
              });
            }

            const contentPrv = getCardContent(prv);
            if (contentPrv) {
              gsap.set(contentPrv, {
                x: xNew,
                y: offsetTopVal.current + cardHeightVal.current - 90,
                width: cardWidthVal.current,
                opacity: 1,
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
          const xNew =
            offsetLeftVal.current +
            index * (cardWidthVal.current + gapVal.current);
          const cardI = getCard(i);
          const contentI = getCardContent(i);

          if (cardI) {
            gsap.killTweensOf(cardI);
            gsap.set(cardI, { zIndex: 30 });
            gsap.to(cardI, {
              x: xNew,
              y: offsetTopVal.current,
              width: cardWidthVal.current,
              height: cardHeightVal.current,
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * index,
            });
          }

          if (contentI) {
            gsap.killTweensOf(contentI);
            gsap.to(contentI, {
              x: xNew,
              y: offsetTopVal.current + cardHeightVal.current - 90,
              width: cardWidthVal.current,
              opacity: 1,
              zIndex: 40,
              duration: 1.0,
              ease: "sine.inOut",
              delay: 0.05 * index,
            });
          }
        }
      });
    });
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
      const activeSlide = slides[orderRef.current[0]];

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
        const card = getCard(i);
        const content = getCardContent(i);
        if (card) {
          gsap.set(card, {
            x:
              offsetLeftVal.current +
              400 +
              index * (cardWidthVal.current + gapVal.current),
          });
        }
        if (content) {
          gsap.set(content, {
            x:
              offsetLeftVal.current +
              400 +
              index * (cardWidthVal.current + gapVal.current),
            width: cardWidthVal.current,
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
        const card = getCard(i);
        const content = getCardContent(i);
        const posX =
          offsetLeftVal.current +
          index * (cardWidthVal.current + gapVal.current);

        if (card) {
          gsap.to(card, {
            x: posX,
            duration: 1.0,
            ease: "sine.inOut",
            delay: startDelay + 0.05 * index,
          });
        }
        if (content) {
          gsap.to(content, {
            x: posX,
            width: cardWidthVal.current,
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

    // Window Resize handler
    const handleResize = () => {
      updateDimensions();
      setCardPositions(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      stopAutoplayLoop();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="gsap-hero-container w-full min-h-[100dvh] relative bg-zinc-950 text-white select-none overflow-hidden"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .gsap-hero-container .card {
          position: absolute;
          left: 0;
          top: 0;
          background-position: center;
          background-size: cover;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          transition: border-radius 0.3s ease;
        }
        .gsap-hero-container .card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(9, 9, 11, 0.85) 0%, rgba(9, 9, 11, 0.4) 50%, rgba(9, 9, 11, 0.1) 100%);
          z-index: 1;
        }
        .gsap-hero-container .card-content {
          position: absolute;
          left: 0;
          top: 0;
          color: #ffffff;
          padding-left: 16px;
          padding-right: 16px;
          pointer-events: none;
          z-index: 40;
        }
        .gsap-hero-container .content-place {
          margin-top: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .gsap-hero-container .content-title-1,
        .gsap-hero-container .content-title-2 {
          font-weight: 800;
          font-size: 16px;
          line-height: 1.1;
        }
        .gsap-hero-container .content-start {
          width: 20px;
          height: 3px;
          border-radius: 99px;
        }
        .gsap-hero-container .details {
          z-index: 22;
          position: absolute;
          top: 35%;
          left: 6%;
          max-width: 650px;
          transform-origin: left center;
          pointer-events: none;
        }
        .gsap-hero-container .details .place-box {
          height: 40px;
          overflow: hidden;
          position: relative;
        }
        .gsap-hero-container .details .place-box .text {
          padding-top: 14px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #e80002;
        }
        .gsap-hero-container .details .place-box .text:before {
          top: 0;
          left: 0;
          position: absolute;
          content: "";
          width: 24px;
          height: 3px;
          border-radius: 99px;
          background-color: #e80002;
        }
        .gsap-hero-container .details .title-1,
        .gsap-hero-container .details .title-2 {
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.15;
        }
        .gsap-hero-container .details .title-box-1,
        .gsap-hero-container .details .title-box-2 {
          margin-top: 4px;
          height: 1.3em;
          overflow: hidden;
        }
        .gsap-hero-container .details > .desc {
          margin-top: 20px;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }
        .gsap-hero-container .details > .cta {
          margin-top: 28px;
        }
        .gsap-hero-container .details > .cta > .discover {
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          height: 42px;
          border-radius: 99px;
          color: #ffffff;
          padding: 8px 32px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .gsap-hero-container .details > .cta > .discover:hover {
          border-color: #e80002;
          background-color: #e80002;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 0, 2, 0.3);
        }
        .gsap-hero-container .pagination {
          position: absolute;
          z-index: 45;
          display: inline-flex;
          align-items: center;
        }
        .gsap-hero-container .pagination > .arrow {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(9, 9, 11, 0.4);
          backdrop-filter: blur(8px);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .gsap-hero-container .pagination > .arrow:hover {
          border-color: #e80002;
          background-color: rgba(232, 0, 2, 0.1);
          transform: scale(1.05);
        }
        .gsap-hero-container .pagination > .arrow svg {
          width: 16px;
          height: 16px;
          color: #ffffff;
          transition: transform 0.2s ease;
        }
        .gsap-hero-container .pagination > .arrow-left:hover svg {
          transform: translateX(-3px);
        }
        .gsap-hero-container .pagination > .arrow-right:hover svg {
          transform: translateX(3px);
        }
        .gsap-hero-container .cover {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: #09090b;
          z-index: 100;
          pointer-events: none;
        }
        @media (max-width: 767px) {
          .gsap-hero-container .card:not(.active-bg) {
            opacity: 0 !important;
            pointer-events: none !important;
          }
          .gsap-hero-container .card-content {
            display: none !important;
          }
          .gsap-hero-container .details {
            top: 25%;
            left: 20px;
            right: 20px;
            max-width: 100%;
          }
          .gsap-hero-container .pagination {
            left: 20px !important;
            right: 20px !important;
          }
          .gsap-hero-container .pagination .progress-sub-container {
            width: 100px;
            margin-left: 12px;
          }
        }
      `,
        }}
      />

      {/* Slide Cards */}
      {slides.map((slide, idx) => (
        <React.Fragment key={idx}>
          <div
            className={`card cursor-pointer ${orderRef.current[0] === idx ? "active-bg" : ""}`}
            id={`card-${idx}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            onClick={() => {
              // If user clicks a thumbnail card, go to it!
              if (!isAnimatingRef.current && orderRef.current[0] !== idx) {
                const distance = orderRef.current.indexOf(idx);
                if (distance > 0) {
                  nextSlide(false);
                }
              }
            }}
          />
          {/* Card Content Overlay */}
          <div className="card-content" id={`card-content-${idx}`}>
            <div className="content-start bg-accent-red mb-2" />
            <div className="content-place text-zinc-300 font-mono text-[9px] font-bold tracking-widest">
              {slide.place}
            </div>
            <div className="content-title-1 font-bold text-white text-[12px] font-heading">
              {slide.title}
            </div>
            <div className="content-title-2 font-bold text-white text-[12px] font-heading">
              {slide.title2}
            </div>
          </div>
        </React.Fragment>
      ))}

      {/* Details Box - Twin Buffers for text animations */}
      <div className="details" id="details-even">
        <div className="place-box">
          <div className="text font-bold text-accent-red uppercase tracking-wider"></div>
        </div>
        <div className="title-box-1 text-3xl md:text-5xl lg:text-7xl">
          <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
        </div>
        <div className="title-box-2 text-3xl md:text-5xl lg:text-7xl">
          <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
        </div>
        <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
        <div className="cta flex gap-4 mt-6">
          <a href="#about" className="discover">
            Tìm hiểu thêm <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="details" id="details-odd" style={{ opacity: 0 }}>
        <div className="place-box">
          <div className="text font-bold text-accent-red uppercase tracking-wider"></div>
        </div>
        <div className="title-box-1 text-3xl md:text-5xl lg:text-7xl">
          <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
        </div>
        <div className="title-box-2 text-3xl md:text-5xl lg:text-7xl">
          <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
        </div>
        <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
        <div className="cta flex gap-4 mt-6">
          <a href="#about" className="discover">
            Tìm hiểu thêm <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination" id="pagination">
        <div
          className="arrow arrow-left"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div
          className="arrow arrow-right ml-4"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/* Cover Screen for page intro slide-wipe */}
      <div className="cover" />
    </div>
  );
}
