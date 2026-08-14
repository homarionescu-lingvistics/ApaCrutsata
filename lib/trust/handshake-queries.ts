import { createClient } from "@/lib/supabase/server";
import type { Handshake } from "./handshake";

export async function getOpenHandshakeForListing(
  listingId: string
): Promise<Handshake | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("handshakes")
    .select("*")
    .eq("listing_id", listingId)
    .is("confirmed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (data as Handshake | null) ?? null;
}

export async function getHandshakeByCode(code: string): Promise<Handshake | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from("handshakes")
    .select("*")
    .eq("code", code.trim())
    .is("confirmed_at", null)
    .maybeSingle();

  return (data as Handshake | null) ?? null;
}

export async function getUserHandshakes(userId: string): Promise<Handshake[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("handshakes")
    .select("*")
    .or(`owner_id.eq.${userId},partner_id.eq.${userId}`)
    .order("created_at", { ascending: false })
    .limit(20);

  return (data as Handshake[]) ?? [];
}
