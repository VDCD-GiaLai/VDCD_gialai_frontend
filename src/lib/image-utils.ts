/**
 * Image optimization utilities for Next.js and CDN delivery.
 * Dynamically resizes images to match device viewports and optimizes formats
 * without sacrificing perceived visual sharpness or quality.
 */

export interface OptimizeImageOptions {
  width?: number;
  quality?: number;
  isThumbnail?: boolean;
}

export function getOptimizedImageUrl(
  rawUrl: string | undefined | null,
  options?: OptimizeImageOptions,
): string {
  if (!rawUrl) return "";

  // Sanitize trailing backslashes or spaces
  const url = rawUrl.trim().replace(/\\+$/, "");

  const w = options?.width ?? (options?.isThumbnail ? 400 : 1920);
  const q = options?.quality ?? (options?.isThumbnail ? 85 : 90);

  // 1. Fallback for broken/deleted ImageKit slide asset (Slide 0)
  if (url.includes("1788429211721-48490265ae67")) {
    return `https://ik.imagekit.io/huy01040104/vdcd/slides/quynhon_herobanner.jpg?tr=w-${w},q-${q},f-auto`;
  }

  // 2. Specific local optimization for known bloated 5.8MB ImageKit upload
  if (url.includes("1788429330513-c7068cbd16ee")) {
    if (w <= 828) {
      return "/images/slides/data-center-828.webp";
    }
    return "/images/slides/data-center-1920.webp";
  }

  // 2. ImageKit URLs with standard query transformation support
  if (url.includes("ik.imagekit.io")) {
    if (url.includes("po0s6zxoj") || url.includes("huy01040104")) {
      const baseUrl = url.split("?")[0];
      return `${baseUrl}?tr=w-${w},q-${q},f-auto`;
    }

    // Path-based transforms for all other ImageKit endpoints (e.g. eo8dcxsjx8)
    if (url.includes("/tr:")) {
      return url.replace(/\/tr:[^/]+\//, `/tr:w-${w},q-${q}/`);
    }

    const match = url.match(/(https?:\/\/ik\.imagekit\.io\/[^/]+\/)(.*)/);
    if (match) {
      return `${match[1]}tr:w-${w},q-${q}/${match[2]}`;
    }
  }

  return url;
}
