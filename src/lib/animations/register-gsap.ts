"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Centralized GSAP plugin registration.
 * Import this module once at the app level to ensure plugins
 * are registered before any component mounts.
 *
 * Adding new plugins? Register them here, not in individual components.
 */
gsap.registerPlugin(ScrollTrigger);

// Prevent forced reflows on mobile resize and batch refresh events
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});

export { gsap, ScrollTrigger };
