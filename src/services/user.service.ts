import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { PaginatedResponse, User } from "@/types";

export const UserService = {
  /**
   * Retrieves a paginated list of admin users (superadmin only)
   */
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
  }): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>(
      API_ROUTES.ADMIN_USERS,
      { params },
    );
    return response.data;
  },
};
