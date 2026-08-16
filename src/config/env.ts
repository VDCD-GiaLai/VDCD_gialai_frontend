export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1"
).trim();

export const APP_ENV = (
  process.env.NEXT_PUBLIC_APP_ENV || "development"
).trim();

const rawUseMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA?.trim().toLowerCase();

// Dev mode (development / dev) = Dùng 100% Mock data local (không cần chạy Backend API)
// Prod mode (production / prod) = Gọi trực tiếp Backend API live (khi đã deploy server)
export const USE_MOCK_DATA =
  rawUseMock === "true" ||
  (rawUseMock !== "false" && (APP_ENV === "development" || APP_ENV === "dev"));
