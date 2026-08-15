import { createClient } from "@/lib/supabase/client";

export function subscribeToTable<T>(table: string, handler: (payload: T) => void) {
  const supabase = createClient();
  const channel = supabase.channel(`public:${table}`);

  const subscription = channel
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      (payload) => handler(payload.new as T)
    )
    .subscribe();

  return { channel, subscription };
}
