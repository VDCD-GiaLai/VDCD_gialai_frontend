"use client";

import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "@/lib/animations/register-gsap";
import { useTransitionStore } from "@/store/transition-store";

/* ─────────────────────────────────────────────────────────────
 *  Page Transition Overlay
 *
 *  Mounted at the public layout level.
 *  When a shared-element transition is triggered:
 *
 *  1. Creates a fixed-position image clone at the card's rect
 *  2. Fades out the page content beneath
 *  3. Animates the image to fill the viewport (hero position)
 *  4. Navigates to the detail page
 *  5. The detail page signals completion → overlay fades out
 *
 *  Uses manual FLIP — no additional plugins required.
 * ───────────────────────────────────────────────────────────── */

export const PageTransitionOverlay = () => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const { isTransitioning, sourceRect, imageSrc, projectId, endTransition } =
    useTransitionStore();

  const runTransition = useCallback(() => {
    if (!overlayRef.current || !imageRef.current || !sourceRect) return;

    const overlay = overlayRef.current;
    const imageEl = imageRef.current;

    /* Kill any running transition */
    tlRef.current?.kill();

    /* Set initial state — image clone at the card position */
    gsap.set(overlay, {
      display: "block",
      opacity: 1,
    });

    gsap.set(imageEl, {
      position: "fixed",
      top: sourceRect.top,
      left: sourceRect.left,
      width: sourceRect.width,
      height: sourceRect.height,
      zIndex: 9999,
      opacity: 1,
      borderRadius: "0px",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        /* Navigate after animation completes */
        router.push(`/projects/${projectId}`);
      },
    });

    tlRef.current = tl;

    /* Phase 1: Fade out page content behind */
    tl.to(
      overlay,
      {
        backgroundColor: "rgba(0, 0, 0, 1)",
        duration: 0.6,
      },
      0,
    );

    /* Phase 2: Expand image to viewport hero position */
    tl.to(
      imageEl,
      {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        duration: 0.9,
        ease: "power3.inOut",
      },
      0.1,
    );
  }, [sourceRect, imageSrc, projectId, router]);

  /* Trigger the transition when state changes */
  useEffect(() => {
    if (isTransitioning && sourceRect) {
      runTransition();
    }
  }, [isTransitioning, sourceRect, runTransition]);

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  /* Don't render the image element unless we have a source */
  if (!isTransitioning && !imageSrc) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        backgroundColor: "rgba(0, 0, 0, 0)",
        pointerEvents: isTransitioning ? "all" : "none",
        display: isTransitioning ? "block" : "none",
      }}
      aria-hidden="true"
    >
      {imageSrc && (
        <div
          ref={imageRef}
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}
        />
      )}
    </div>
  );
};
