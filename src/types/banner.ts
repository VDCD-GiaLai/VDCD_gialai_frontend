/* ── Page Banner ──────────────────────────────────────── */

/** CTA button displayed inside the hero banner */
export interface PageBannerCta {
  label: string;
  href: string;
  /** "primary" = filled black/white, "secondary" = outlined */
  variant: "primary" | "secondary";
  ariaLabel?: string;
}

/** Single slide item for multi-slide page hero banners (e.g. Careers) */
export interface PageBannerSlide {
  id: string;
  title: string;
  subtitle: string;
  tag?: string;
  image: string;
}

/** Data shape for a page hero banner */
export interface PageBannerData {
  /** Background image URL (absolute or relative) */
  image: string;
  /** Primary heading displayed on the hero */
  title: string;
  /** Supporting copy below the heading */
  subtitle: string;
  /** Small tag/label above the title (e.g. "Dự án", "Chương trình") */
  tag?: string;
  /** Optional CTA buttons rendered inside the hero */
  ctaButtons?: PageBannerCta[];
  /** Optional multi-slide items for carousel banners */
  slides?: PageBannerSlide[];
  /** Optional business license information */
  businessLicense?: string;
}

/**
 * Page keys used to resolve banner data from the service.
 * Each key maps to a specific public page in the application.
 */
export type PageKey =
  | "projects"
  | "programs"
  | "news"
  | "contact"
  | "careers"
  | "about"
  | "solutions";
