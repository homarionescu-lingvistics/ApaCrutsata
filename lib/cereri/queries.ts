import { createClient } from "@/lib/supabase/server";
import type { BusinessPostMortem, BusinessRequest } from "@/lib/supabase/types";

export async function getNeighborhoodRequests(): Promise<BusinessRequest[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("business_requests")
    .select("*")
    .order("upvotes_count", { ascending: false })
    .limit(40);
  return (data as BusinessRequest[]) ?? [];
}

export async function getPostMortems(): Promise<BusinessPostMortem[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("business_post_mortems")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);
  return (data as BusinessPostMortem[]) ?? [];
}
