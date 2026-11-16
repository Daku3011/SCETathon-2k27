/**
 * Supabase Client Stub
 * Participant registration remains disabled until valid Supabase credentials
 * (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY) are provided.
 */

export const isSupabaseConfigured = Boolean(
  typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.trim() !== "" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() !== ""
);

export interface RegistrationPayload {
  teamName: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  college: string;
  track: string;
  teamSize: number;
}

export async function submitRegistration(data: RegistrationPayload) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured yet. Registration is pending.");
  }
  // When configured, client-side or API route insertion into 'registrations' table:
  return { success: true, data };
}
