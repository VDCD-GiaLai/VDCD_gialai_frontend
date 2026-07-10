export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
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
}

export interface GsapHeroSlide {
  place: string;
  title: string;
  title2: string;
  desc: string;
  image: string;
}
