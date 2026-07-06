export const API_ROUTES = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  USER_PROFILE: "/user/profile",
  USERS: "/users",
} as const;

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  SETTINGS: "/dashboard/settings",
} as const;

export const STORAGE_KEYS = {
  THEME: "theme",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const SYSTEM_CONSTANTS = {
  TOKEN_EXPIRY_THRESHOLD_MS: 30000, // 30 seconds before access token expires
} as const;
