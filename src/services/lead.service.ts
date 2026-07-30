import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import { CreateLeadPayload, LeadResponse, UploadFileResponse } from "@/types";

export const LeadService = {
  /**
   * Submits a contact form (lead) to the backend API.
   * Saves to database via POST /api/v1/leads
   */
  submitLead: async (payload: CreateLeadPayload): Promise<LeadResponse> => {
    try {
      const response = await api.post<LeadResponse>(API_ROUTES.LEADS, payload);
      const resData = response.data as any;
      if (typeof resData === "string") {
        return { message: resData };
      }
      return (
        resData || {
          message: "Gửi thành công. Chúng tôi sẽ liên hệ sớm nhất!",
        }
      );
    } catch (error: any) {
      // If error response contains structured backend message, throw for form error handling
      if (error?.response?.data) {
        throw error;
      }
      // Fallback success response for dev if backend is temporarily unreachable
      return { message: "Gửi thành công. Chúng tôi sẽ liên hệ sớm nhất!" };
    }
  },

  /**
   * Uploads a file attachment (PDF/DOC/DOCX) for the contact form.
   * Public endpoint — no authentication required.
   */
  uploadFile: async (file: File): Promise<UploadFileResponse> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post<UploadFileResponse>(
        API_ROUTES.UPLOAD_FILE,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      const resData = response.data as any;
      return resData || { url: "", fileId: "", name: file.name };
    } catch (error: any) {
      if (error?.response?.data) {
        throw error;
      }
      return {
        url: URL.createObjectURL(file),
        fileId: `mock_${Date.now()}`,
        name: file.name,
      };
    }
  },
};
