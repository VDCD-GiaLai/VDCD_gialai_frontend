// ─── Hero Metadata ──────────────────────────────────────────
export type HeroPlacement = "above_title" | "between_title_desc" | "below_desc";

export interface HeroMeta {
  /** Vị trí khối ảnh bìa trong layout so với Tiêu đề & Mô tả */
  placement?: HeroPlacement;
  /** Căn chỉnh tiêu điểm ảnh CSS object-position ('top' | 'center' | 'bottom') */
  position?: "top" | "center" | "bottom";
  /** Chú thích ảnh bìa hiển thị trực tiếp dưới ảnh */
  caption?: string;
}

// ─── Block Spacing ──────────────────────────────────────────
export interface BlockSpacing {
  marginTop?: number; // Khoảng cách lề trên (px)
  marginBottom?: number; // Khoảng cách lề dưới (px)
}

// ─── Block Types ────────────────────────────────────────────
export interface HeadingBlock {
  id: string;
  type: "heading";
  level: 2 | 3;
  text: string;
  spacing?: BlockSpacing;
}

export interface ParagraphBlock {
  id: string;
  type: "paragraph";
  text: string; // HTML string (hỗ trợ <b>, <i>, <u>, <a>,...)
  spacing?: BlockSpacing;
}

export interface ImageBlock {
  id: string;
  type: "image";
  url: string;
  fileId?: string | null;
  alt: string;
  caption?: string | null; // Chú thích ảnh hiển thị dưới ảnh
  spacing?: BlockSpacing;
}

export interface ListItemObject {
  id?: string;
  content: string;
}

export interface ListBlock {
  id: string;
  type: "list";
  items: (string | ListItemObject)[];
  listType?: "bullet" | "ordered" | "checklist";
  spacing?: BlockSpacing;
}

export interface QuoteBlock {
  id: string;
  type: "quote";
  text: string;
  author?: string;
  spacing?: BlockSpacing;
}

export interface HighlightBlock {
  id: string;
  type: "highlight";
  text: string;
  title?: string;
  spacing?: BlockSpacing;
}

export interface CtaBlock {
  id: string;
  type: "cta";
  label: string;
  url: string;
  spacing?: BlockSpacing;
}

export interface SectionBlock {
  id: string;
  type: "section";
  number: string; // Ví dụ: "01", "02"
  title: string;
  children: SlideDetailBlogBlock[];
  spacing?: BlockSpacing;
}

export type SlideDetailBlogBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | SectionBlock
  | QuoteBlock
  | HighlightBlock
  | CtaBlock;

// ─── Content Payload ────────────────────────────────────────
export interface SlideDetailBlogContent {
  version: number;
  heroMeta?: HeroMeta;
  blocks: SlideDetailBlogBlock[];
}

// ─── Entity SlideDetailBlog ─────────────────────────────────
export interface SlideDetailBlog {
  id: string;
  slideId: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  excerpt?: string | null;
  heroImageUrl?: string | null;
  heroImageFileId?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  content: SlideDetailBlogContent;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SlideDetailBlogListParams {
  page?: number;
  limit?: number;
  isPublished?: boolean;
}
