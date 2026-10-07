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

  // 1. Local high-speed, zero-latency WebP caching for Slide 0
  if (
    url.includes("1788429211721-48490265ae67") ||
    url.includes("quynhon_herobanner")
  ) {
    if (w <= 640) {
      return "/images/slides/quynhon-640.webp";
    }
    if (w <= 828) {
      return "/images/slides/quynhon-828.webp";
    }
    if (w <= 1280) {
      return "/images/slides/quynhon-1280.webp";
    }
    return "/images/slides/quynhon-1920.webp";
  }

  // 2. Local thumbnail previews for slides 1, 2, 3, 4 (eliminates third-party connection delay)
  if (options?.isThumbnail || w <= 320) {
    if (url.includes("hethongdothiso"))
      return "/images/slides/slide-1-thumb.webp";
    if (url.includes("24514AFA-9CB5-4DC3-98A5-EEA103201F96"))
      return "/images/slides/slide-2-thumb.webp";
    if (url.includes("9a6a2f5e-4b3a-45fc-8945-b6c29db8ebb5"))
      return "/images/slides/slide-3-thumb.webp";
    if (
      url.includes("data_center") ||
      url.includes("1788429330513-c7068cbd16ee")
    )
      return "/images/slides/data-center-320.webp";
  }

  // 3. Specific local optimization for known bloated 5.8MB ImageKit upload
  if (
    url.includes("1788429330513-c7068cbd16ee") ||
    url.includes("data_center")
  ) {
    if (w <= 320) {
      return "/images/slides/data-center-320.webp";
    }
    if (w <= 480) {
      return "/images/slides/data-center-480.webp";
    }
    if (w <= 828) {
      return "/images/slides/data-center-828.webp";
    }
    if (w <= 1280) {
      return "/images/slides/data-center-1200.webp";
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
      return url.replace(/\/tr:[^/]+\//, `/tr:w-${w},q-${q},f-auto/`);
    }

    const match = url.match(/(https?:\/\/ik\.imagekit\.io\/[^/]+\/)(.*)/);
    if (match) {
      return `${match[1]}tr:w-${w},q-${q},f-auto/${match[2]}`;
    }
  }

  return url;
}
