"use client";

import { create } from "zustand";

/* ─────────────────────────────────────────────────────────────
 *  Page Transition Store
 *
 *  Holds the shared-element transition state between the
 *  Projects gallery and Project Detail page.
 *  Used by:
 *    - ProjectsGallery (triggers transition)
 *    - PageTransitionOverlay (runs the animation)
 *    - ProjectDetailContent (signals completion)
 * ───────────────────────────────────────────────────────────── */

interface TransitionRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TransitionState {
  /** Whether a transition is currently in progress */
  isTransitioning: boolean;
  /** Bounding rect of the clicked card image */
  sourceRect: TransitionRect | null;
  /** URL of the project cover image */
  imageSrc: string;
  /** Target project slug */
  projectId: string;
  /** Project title for a11y during transition */
  projectTitle: string;

  /** Kick off a shared-element transition */
  startTransition: (payload: {
    sourceRect: TransitionRect;
    imageSrc: string;
    projectId: string;
    projectTitle: string;
  }) => void;

  /** Mark the transition as complete */
  endTransition: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
  isTransitioning: false,
  sourceRect: null,
  imageSrc: "",
  projectId: "",
  projectTitle: "",

  startTransition: (payload) =>
    set({
      isTransitioning: true,
      sourceRect: payload.sourceRect,
      imageSrc: payload.imageSrc,
      projectId: payload.projectId,
      projectTitle: payload.projectTitle,
    }),

  endTransition: () =>
    set({
      isTransitioning: false,
      sourceRect: null,
      imageSrc: "",
      projectId: "",
      projectTitle: "",
    }),
}));
