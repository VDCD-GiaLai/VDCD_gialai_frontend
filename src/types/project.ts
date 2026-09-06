import type { DocumentContent, HeroMeta } from "./slide-detail-blog";

/* ── Operation Fields & Categories ──────────────────────── */
export interface ProjectField {
  id: string;
  name: string;
  slug: string;
}

export interface ProjectProvince {
  id: string;
  name: string;
  code: string;
}

/* ── Project Canonical Contract (Shared Content Document Model) ── */
export interface ProjectEntityContract {
  id: string;
  title: string;
  slug: string;
  category?: string;
  location?: string;
  year?: string | number;
  description?: string;
  overview?: string;
  thumbnail: string | null;
  thumbnailFileId?: string | null;
  coverImage?: string;
  fieldId?: string | null;
  field?: ProjectField | null;
  province?: ProjectProvince | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  /** Document Model nhúng vào content */
  content?: DocumentContent | string | null;
  heroMeta?: HeroMeta;
}

export interface ProjectDetail extends ProjectEntityContract {
  services?: string[];
  challenge?: string;
  challengeImage?: string;
  discipline?: string;
  transformationBefore?: string;
  transformationAfter?: string;
  technicalHighlights?: Array<{ label: string; value: string }>;
  nextProjectSlug?: string | null;
  relatedArticles?: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail?: string | null;
    publishedAt?: string | null;
  }>;
  relatedProjects?: Array<{
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    year?: number;
    field?: ProjectField;
  }>;
}
