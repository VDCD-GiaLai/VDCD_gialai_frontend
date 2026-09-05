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
  marginTop?: number; // pixel, min 0
  marginBottom?: number; // pixel, min 0
}

// ─── Heading Block ──────────────────────────────────────────
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingBlock {
  id: string;
  type: "heading";
  level: HeadingLevel;
  text: string;
  /** Kích thước font độc lập với semantic level (number: 10-96px) */
  fontSize?: number;
  spacing?: BlockSpacing;
}

// ─── Paragraph Block ────────────────────────────────────────
export interface ParagraphBlock {
  id: string;
  type: "paragraph";
  text: string; // HTML/rich text string
  fontSize?: number;
  spacing?: BlockSpacing;
}

// ─── Image Block ────────────────────────────────────────────
export interface ImageDataPayload {
  mediaId: string; // File ID trên ImageKit
  caption?: string | null;
  alt?: string;
  url?: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  url: string;
  fileId?: string | null;
  mediaId?: string | null; // Alias tương đương fileId
  alt?: string;
  caption?: string | null; // Chỉ thuộc Image Block
  data?: ImageDataPayload; // Hỗ trợ lồng container payload
  spacing?: BlockSpacing;
}

// ─── List & Nested List Block ───────────────────────────────
export type ListType = "bullet" | "ordered" | "checklist";

export type ListStyle =
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "lower-alpha"
  | "upper-alpha"
  | "lower-roman"
  | "upper-roman"
  | "checklist";

export type ListFontWeight = "normal" | "medium" | "semibold" | "bold";

export interface ListLevelStyle {
  marker?: ListStyle;
  fontSize?: number;
  fontWeight?: ListFontWeight;
  color?: string;
  itemSpacing?: number;
}

export interface ListStyleConfig {
  marker?: ListStyle;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: ListFontWeight;
  color?: string;
  lineHeight?: number;
  itemSpacing?: number;
  indentation?: number; // Mặc định: 24px
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  levelStyles?: Record<number, ListLevelStyle>;
}

export interface ListItem {
  id: string;
  content: string;
  children: ListItem[];
  checked?: boolean;
}

/** Tương thích ngược với định dạng cũ */
export type ListItemObject = ListItem;

export interface ListBlock {
  id: string;
  type: "list";
  items: (ListItem | string)[];
  listType?: ListType;
  listStyle?: ListStyle;
  fontSize?: number;
  lineHeight?: number;
  itemSpacing?: number;
  style?: ListStyleConfig;
  spacing?: BlockSpacing;
}

export interface OrderedListBlock extends Omit<ListBlock, "type"> {
  type: "ordered_list";
}

// ─── Quote & Highlight Block ────────────────────────────────
export interface QuoteBlock {
  id: string;
  type: "quote";
  text: string;
  author?: string | null;
  citation?: string | null;
  fontSize?: number;
  spacing?: BlockSpacing;
}

export interface HighlightBlock {
  id: string;
  type: "highlight";
  text: string;
  title?: string;
  style?: string;
  fontSize?: number;
  spacing?: BlockSpacing;
}

// ─── Section Block ──────────────────────────────────────────
export type SectionChildBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | OrderedListBlock
  | QuoteBlock
  | HighlightBlock;

export interface SectionBlock {
  id: string;
  type: "section";
  number: string; // Ví dụ: "01", "02"
  title: string;
  children: SectionChildBlock[];
  spacing?: BlockSpacing;
}

// ─── CTA Block ──────────────────────────────────────────────
export type CtaAlign = "center" | "between" | "start" | "end";
export type CtaShape = "square" | "pill";
export type CtaVariant = "solid" | "outline";
export type CtaLayout = "flex" | "between";

export interface CtaButtonItem {
  id: string;
  label: string;
  url: string;
  variant?: CtaVariant;
}

export interface CtaBlock {
  id: string;
  type: "cta";
  label?: string;
  url?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
  items?: CtaButtonItem[];
  layout?: CtaLayout;
  align?: CtaAlign;
  gap?: number;
  shape?: CtaShape;
  variant?: CtaVariant;
  fontSize?: number;
  spacing?: BlockSpacing;
}

// ─── Discriminated Union of Blocks ──────────────────────────
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | OrderedListBlock
  | SectionBlock
  | CtaBlock
  | QuoteBlock
  | HighlightBlock;

/** Alias duy trì tương thích các components hiện có */
export type SlideDetailBlogBlock = ContentBlock;

// ─── Document Root ──────────────────────────────────────────
export interface DocumentContent {
  version: 1;
  blocks: ContentBlock[];
  heroMeta?: HeroMeta;
}

/** Chuẩn danh tính hợp nhất theo đặc tả */
export type BlogDocument = DocumentContent;
export type SlideDetailBlogContent = DocumentContent;

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
