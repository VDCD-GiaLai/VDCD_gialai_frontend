import type { SlideDetailBlogContent } from "./slide-detail-blog";

export interface User {
  id: string;
  username: string;
  email: string;
  role: "superadmin" | "editor" | "viewer";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  success: boolean;
}

/** Paginated response wrapper matching API pagination format */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface StatsItem {
  label: string;
  value: string;
  description?: string;
}

export interface SolutionItem {
  title: string;
  href: string;
  imageUrl: string;
  iconUrl: string;
  description: string;
  slug?: string;
}

export interface GsapHeroSlide {
  id?: string;
  place: string;
  title: string;
  title2: string;
  desc: string;
  image: string;
  ctaText?: string;
  ctaUrl?: string;
}

/* ── Careers / Recruitment ─────────────────────────────── */

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  salary?: string;
  postedDate: string;
  description: string;
  experience: string;
  tags: string[];
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface RecruitmentStep {
  step: number;
  title: string;
  description: string;
}

export interface EmployeeStory {
  id: string;
  name: string;
  department: string;
  avatar: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/* ── Lead (recruitment domain) ────────────────────────── */

/** Payload for submitting a recruitment/job application */
export interface CreateLeadPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  attachment?: string;
  dob?: string;
  address?: string;
  experienceYears?: string;
  expectedSalary?: string;
  portfolioUrl?: string;
  coverLetter?: string;
  source?: string;
  website?: string; // honeypot — must be empty
}

export interface LeadResponse {
  message: string;
}

export interface UploadFileResponse {
  url: string;
  fileId: string;
  name: string;
}

/* ── Articles / News ───────────────────────────────────── */

export interface Article {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  excerpt?: string | null;
  content?: string | SlideDetailBlogContent | null;
  thumbnail?: string | null;
  thumbnailFileId?: string | null;
  category?: string | null;
  tags?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  project?: { id: string; title: string; slug?: string } | null;
  program?: { id: string; title: string; slug?: string } | null;
  solution?: { id: string; title: string; slug?: string } | null;
}

export interface ArticleDetail extends Article {
  relatedArticles: Pick<
    Article,
    "id" | "title" | "slug" | "thumbnail" | "publishedAt"
  >[];
}

export interface ArticleListParams {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string;
}

/* ── Operation Fields ─────────────────────────────────── */

export interface OperationField {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  order: number;
}

/* ── Programs ─────────────────────────────────────────── */

export type ProgramDocumentContent = SlideDetailBlogContent;

export interface Program {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  content?: string | SlideDetailBlogContent | null;
  thumbnail?: string | null;
  thumbnailFileId?: string | null;
  field?: OperationField | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramDetail extends Program {
  relatedArticles?: Pick<
    Article,
    "id" | "title" | "slug" | "thumbnail" | "publishedAt"
  >[];
}

export interface ProgramListParams {
  page?: number;
  limit?: number;
  fieldId?: string;
}

/* ── Solutions (Canonical Contract) ─────────────────────── */

export interface SolutionEntityContract {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  thumbnail: string | null;
  thumbnailFileId: string | null;
  websiteUrl: string | null;
  fieldId: string | null;
  field?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  metaTitle: string | null;
  metaDescription: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  /** Document Model nhúng vào cột JSONB content */
  content: SlideDetailBlogContent;
}

export interface SolutionDetail extends SolutionEntityContract {
  relatedArticles?: Pick<
    Article,
    "id" | "title" | "slug" | "thumbnail" | "publishedAt"
  >[];
}

/* ── Slide Detail Blogs ──────────────────────────────── */

export * from "./slide-detail-blog";
