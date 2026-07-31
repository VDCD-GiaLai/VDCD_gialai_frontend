/* ── Contact domain types ────────────────────────────── */

/** Payload for submitting a contact form */
export interface CreateContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  attachment?: string;
  website?: string; // honeypot — must be empty
}

/** Response from the contact submission API */
export interface ContactResponse {
  message: string;
}
