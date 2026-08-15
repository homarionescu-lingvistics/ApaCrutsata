import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ensureSupabaseConfig } from "./config";
import type { Database } from "./types";

export function createClient() {
  const { url, anonKey } = ensureSupabaseConfig();
  const cookieStore = cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          /* called from a Server Component — middleware refreshes sessions */
        }
      },
    },
  });
}
