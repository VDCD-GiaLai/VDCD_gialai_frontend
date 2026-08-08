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
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };
