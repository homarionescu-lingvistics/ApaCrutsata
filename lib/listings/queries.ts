import { createClient } from "@/lib/supabase/server";
import type { Listing } from "./types";

export async function getActiveListings(limit = 30): Promise<Listing[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as Listing[];
}

export async function getLogisticsListings(limit = 30): Promise<Listing[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .in("type", ["asset", "service", "request"])
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as Listing[];
}

export async function getUserListings(userId: string): Promise<Listing[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data as Listing[]) ?? [];
}
