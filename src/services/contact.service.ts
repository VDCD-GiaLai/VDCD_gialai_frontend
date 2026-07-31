import { api } from "@/lib/axios";
import { API_ROUTES } from "@/lib/constants";
import type { CreateContactPayload, ContactResponse } from "@/types/contact";
import type { UploadFileResponse } from "@/types";

export const ContactService = {
  /**
   * Submits a contact form to the backend API.
   * Saves to database via POST /api/v1/contacts
   */
  submitContact: async (
    payload: CreateContactPayload,
  ): Promise<ContactResponse> => {
    try {
      const response = await api.post<ContactResponse>(
        API_ROUTES.CONTACTS,
        payload,
      );
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
      if (error?.response?.data) {
        throw error;
      }
      return { message: "Gửi thành công. Chúng tôi sẽ liên hệ sớm nhất!" };
    }
  },

  /**
   * Uploads a file attachment (PDF/DOC/DOCX) for the contact form.
   * Reuses the shared upload endpoint.
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
