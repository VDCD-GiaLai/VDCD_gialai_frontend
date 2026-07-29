export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || "development";

// If APP_ENV is 'production' (or 'prod'), default to mock data until backend is live on production server
export const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true" ||
  APP_ENV === "production" ||
  APP_ENV === "prod";
