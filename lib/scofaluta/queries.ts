import { createClient } from "@/lib/supabase/server";
import { LISTING_TYPES } from "@/lib/listings/labels";
import type { ClearingOffer, LedgerEntry, PriceStat } from "@/lib/clearing/types";

export async function getOpenClearingOffers(): Promise<ClearingOffer[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("clearing_offers")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(40);
  return (data as ClearingOffer[]) ?? [];
}

export async function getUserLedger(userId: string): Promise<LedgerEntry[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("ron_local_ledger")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30);
  return (data as LedgerEntry[]) ?? [];
}

export async function getPriceStats(): Promise<PriceStat[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("listings")
    .select("type, price_ron")
    .gt("price_ron", 0)
    .eq("status", "active")
    .limit(200);

  const buckets = new Map<string, number[]>();
  for (const row of data ?? []) {
    if (row.price_ron == null) continue;
    const list = buckets.get(row.type) ?? [];
    list.push(Number(row.price_ron));
    buckets.set(row.type, list);
  }

  return LISTING_TYPES.flatMap((meta) => {
    const prices = buckets.get(meta.value);
    if (!prices?.length) return [];
    const sum = prices.reduce((a, b) => a + b, 0);
    return [
      {
        type: meta.value,
        label: meta.label,
        emoji: meta.emoji,
        count: prices.length,
        avg: Math.round(sum / prices.length),
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
    ];
  });
}

export function liveBalance(entries: LedgerEntry[]) {
  const now = Date.now();
  return entries
    .filter((e) => !e.expires_at || new Date(e.expires_at).getTime() > now)
    .reduce((s, e) => s + e.amount, 0);
}

export function nextExpiry(entries: LedgerEntry[]) {
  const now = Date.now();
  const future = entries
    .filter((e) => e.expires_at && new Date(e.expires_at).getTime() > now && e.amount > 0)
    .map((e) => new Date(e.expires_at!));
  if (!future.length) return null;
  return new Date(Math.min(...future.map((d) => d.getTime())));
}
