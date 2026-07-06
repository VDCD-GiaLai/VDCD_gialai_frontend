import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth.store";
import { API_ROUTES, APP_ROUTES } from "@/lib/constants";

// Create custom axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  // If cookies are required for httpOnly session token
  withCredentials: true,
});

// Flag to track if refresh token request is ongoing
let isRefreshing = false;
// Queue to hold requests that are waiting for new token
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

// Helper to resolve all pending queued requests with new token
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach bearer token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle token refresh on 401 error
api.interceptors.response.use(
  (response) => response,
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
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        // Perform token refresh call
        // In real backend, refresh token is retrieved from httpOnly cookie on server
        const response = await axios.post<{ accessToken: string }>(
          `${process.env.NEXT_PUBLIC_API_URL || "/api"}${API_ROUTES.REFRESH_TOKEN}`,
          {},
          { withCredentials: true },
        );

        const { accessToken } = response.data;

        // Update Zustand store
        const user = useAuthStore.getState().user;
        if (user) {
          useAuthStore.getState().setAuth(user, accessToken);
        }

        // Retry the original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        processQueue(null, accessToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, sign out and redirect to login
        processQueue(refreshError, null);
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
