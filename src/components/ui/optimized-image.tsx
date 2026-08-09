"use client";

import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { buildSrc, buildTransformationString } from "@imagekit/next";
import type { Transformation } from "@imagekit/next";

/* ─────────────────────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────────────────────── */
const IMAGEKIT_URL_ENDPOINT =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ?? "";

/**
 * Regex to extract the endpoint and path portion from a full ImageKit URL.
 * Example: "https://ik.imagekit.io/po0s6zxoj/vdcd/slides/img.jpg"
 *       →  [1]: "https://ik.imagekit.io/po0s6zxoj"
 *       →  [2]: "/vdcd/slides/img.jpg"
 */
const IK_URL_RE = /(https:\/\/ik\.imagekit\.io\/[^/]+)(.+)/;

/* ─────────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────────── */
export interface OptimizedImageProps extends Omit<
  NextImageProps,
  "src" | "loader"
> {
  /** Full ImageKit URL, relative ImageKit path, or local/external URL */
  src: string;
  /** ImageKit transformations (only applied when src is an ImageKit path/URL) */
  transformation?: Transformation[];
}

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */

/** Returns true if the URL points to ImageKit CDN */
function isImageKitUrl(url: string): boolean {
  return url.includes("ik.imagekit.io");
}

/** Extract ImageKit endpoint and path from a full URL */
export function parseImageKitUrl(
  url: string,
): { endpoint: string; path: string } | null {
  const match = url.match(IK_URL_RE);
  return match ? { endpoint: match[1], path: match[2] } : null;
}

/** Extract ImageKit path from a full URL, or return null */
export function extractImageKitPath(url: string): string | null {
  const parsed = parseImageKitUrl(url);
  return parsed ? parsed.path : null;
}

/**
 * Build a fully-transformed ImageKit URL using the `buildSrc` utility.
 */
function buildImageKitUrl(
  path: string,
  transforms: Transformation[],
  endpoint?: string,
): string {
  const ep = endpoint || IMAGEKIT_URL_ENDPOINT;
  if (!ep) return path; // no endpoint configured — return raw path
  try {
    return buildSrc({
      urlEndpoint: ep,
      src: path,
      transformation: transforms,
      transformationPosition: "query",
    });
  } catch {
    // buildSrc internally constructs a URL; if input is malformed, fall back
    return path;
  }
}

/**
 * Build default transformations based on context.
 */
function buildDefaultTransformation(
  width: number | string | undefined,
  quality?: number,
): Transformation[] {
  const tr: Record<string, string | number> = {
    format: "auto", // AVIF/WebP auto-negotiation
    quality: quality ?? 90,
  };

  if (width) {
    tr.width = typeof width === "string" ? parseInt(width, 10) : width;
  }

  return [tr];
}

/* ─────────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────────── */

/**
 * Smart image component that:
 *  - For ImageKit URLs → builds a transformed CDN URL via `buildSrc`,
 *    then renders it with standard `next/image` + `unoptimized` flag
 *    (ImageKit already handles optimization, skip Next.js double-proxy)
 *  - For local/external URLs → standard `next/image`
 *
 * Drop-in replacement for `next/image` with the same API.
 */
export function OptimizedImage({
  src,
  transformation,
  alt,
  ...rest
}: OptimizedImageProps) {
  if (!src) {
    return null;
  }

  // ── Route 1: ImageKit URL (full URL or relative path) ─────────
  const parsedIk = isImageKitUrl(src) ? parseImageKitUrl(src) : null;
  const ikPath = parsedIk
    ? parsedIk.path
    : src.startsWith("/vdcd/")
      ? src
      : null;
  const ikEndpoint = parsedIk ? parsedIk.endpoint : undefined;

  if (ikPath) {
    // Build transformation: prefer explicit, otherwise auto defaults
    const transforms =
      transformation ??
      buildDefaultTransformation(
        "width" in rest && rest.width ? rest.width : undefined,
      );

    // Build the final CDN URL with transformations baked in
    const optimizedUrl = buildImageKitUrl(ikPath, transforms, ikEndpoint);

    // Render via next/image with `unoptimized` since ImageKit already
    // handles format conversion, quality, and resize. This avoids the
    // Next.js /_next/image double-proxy hop.
    return <NextImage src={optimizedUrl} alt={alt} unoptimized {...rest} />;
  }

  // ── Route 2: Local or external URL → standard next/image ──────
  return <NextImage src={src} alt={alt} {...rest} />;
}
