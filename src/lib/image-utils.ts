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

  // 1. Specific local optimization for known bloated 5.8MB ImageKit upload
  if (url.includes("1788429330513-c7068cbd16ee")) {
    if (options?.isThumbnail && w <= 828) {
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

    // eo8dcxsjx8 paths with subfolders or updatedAt query
    if (
      url.includes("eo8dcxsjx8") &&
      (url.includes("so-hoa-du-lieu-dat-dai") || url.includes("updatedAt"))
    ) {
      if (url.includes("/tr:")) {
        return url.replace(/\/tr:[^/]+\//, `/tr:w-${w},q-${q}/`);
      }
      return url.replace("/eo8dcxsjx8/", `/eo8dcxsjx8/tr:w-${w},q-${q}/`);
    }
  }

  return url;
}
