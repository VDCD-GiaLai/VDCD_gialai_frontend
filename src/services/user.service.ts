import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { User } from "@/types";

export const UserService = {
  /**
   * Retrieves a list of users (dashboard example)
   */
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>(API_ROUTES.USERS);
    return response.data;
  },
};
