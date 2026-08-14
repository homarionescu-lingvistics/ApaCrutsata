"use server";

import { createAdminClient } from "@/lib/supabase/admin";

const DAYS = 30;

async function syncBalance(userId: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("ron_local_ledger")
    .select("amount, expires_at")
    .eq("user_id", userId);

  const now = Date.now();
  const balance = (data ?? []).reduce((sum, row) => {
    if (row.expires_at && new Date(row.expires_at).getTime() < now) return sum;
    return sum + row.amount;
  }, 0);

  await admin.from("profiles").update({ ron_local_balance: balance }).eq("id", userId);
}

export async function creditRonLocal(
  userId: string,
  amount: number,
  reason: string
) {
  try {
    const admin = createAdminClient();
    const expires = new Date(Date.now() + DAYS * 24 * 60 * 60 * 1000).toISOString();
    const { error } = await admin.from("ron_local_ledger").insert({
      user_id: userId,
      amount,
      reason,
      expires_at: expires,
    });
    if (error) return;
    await syncBalance(userId);
  } catch {
    /* SQL Day 4 încă nerulat */
  }
}

export async function bumpTrust(userId: string, delta: number) {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("profiles")
      .select("trust_score")
      .eq("id", userId)
      .maybeSingle();
    const next = Math.min(100, Math.max(0, (data?.trust_score ?? 50) + delta));
    await admin.from("profiles").update({ trust_score: next }).eq("id", userId);
  } catch {
    /* SQL Day 4 încă nerulat */
  }
}
