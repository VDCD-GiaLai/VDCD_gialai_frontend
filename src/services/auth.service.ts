import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { LoginResponse, User } from "@/types";
import { LoginInput } from "@/schemas/auth.schema";

export const AuthService = {
  /**
   * Logs in a user with credentials.
   * On success, updates Zustand auth state.
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
   * Fetches the user profile based on active accessToken
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get<User>(API_ROUTES.USER_PROFILE);
    return response.data;
  },

  /**
   * Refreshes the session access token manually
   */
  refreshToken: async (): Promise<{ accessToken: string }> => {
    const response = await api.post<{ accessToken: string }>(
      API_ROUTES.REFRESH_TOKEN,
    );
    return response.data;
  },
};
