import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { LoginResponse, RefreshTokenResponse, User } from "@/types";
import { LoginInput } from "@/schemas/auth.schema";

export const AuthService = {
  /**
   * Logs in a user with credentials.
   * Sets accessToken and refreshToken via HttpOnly cookies.
   */
  login: async (credentials: LoginInput): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      API_ROUTES.LOGIN,
      credentials,
    );
    return response.data;
  },

  /**
   * Logs out the user on backend (clears httpOnly cookies)
   */
  logout: async (): Promise<void> => {
    await api.post(API_ROUTES.LOGOUT);
  },

  /**
   * Fetches the user profile based on active session cookie
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>(API_ROUTES.USER_PROFILE);
    return response.data;
  },

  /**
   * Refreshes the session via HttpOnly cookie.
   * Server reads refreshToken cookie and sets new accessToken cookie.
   */
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>(
      API_ROUTES.REFRESH_TOKEN,
    );
    return response.data;
  },
};
