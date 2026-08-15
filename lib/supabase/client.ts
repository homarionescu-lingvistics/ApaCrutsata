import { createBrowserClient } from "@supabase/ssr";
import { ensureSupabaseConfig } from "./config";
import type { Database } from "./types";

export function createClient() {
  const { url, anonKey } = ensureSupabaseConfig();
  return createBrowserClient<Database>(url, anonKey);
}
