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
  place: string;
  title: string;
  title2: string;
  desc: string;
  image: string;
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
