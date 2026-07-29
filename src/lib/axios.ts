import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";
import { API_ROUTES, APP_ROUTES } from "@/lib/constants";

// Create custom axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  // HttpOnly cookies are sent automatically with credentials
  withCredentials: true,
});

// Flag to track if refresh token request is ongoing
let isRefreshing = false;
// Queue to hold requests that are waiting for token refresh
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (err: any) => void;
}> = [];

// Helper to resolve all pending queued requests after refresh
const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response Interceptor: Unwrap API envelope { statusCode, data } → data
api.interceptors.response.use(
  (response) => {
    // API wraps all success responses in { statusCode, data }
    // Unwrap so callers get the actual payload from response.data
    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If request failed with 401 and hasn't been retried yet
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Avoid infinite loop by flagging request as retried
      originalRequest._retry = true;

      // If token refresh is already ongoing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              resolve(api(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        // Perform token refresh call
        // Server reads refreshToken from HttpOnly cookie and sets new accessToken cookie
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "/api"}${API_ROUTES.REFRESH_TOKEN}`,
          {},
          { withCredentials: true },
        );

        // Retry the original request (new cookie is set automatically)
        processQueue(null);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, sign out and redirect to login
        processQueue(refreshError);
        isRefreshing = false;

        useAuthStore.getState().clearAuth();

        // Redirect on browser client side
        if (typeof window !== "undefined") {
          window.location.href = APP_ROUTES.LOGIN;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
