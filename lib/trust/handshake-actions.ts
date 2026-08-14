"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isHandshakeComplete, newHandshakeCode } from "./handshake";

async function finishHandshake(handshakeId: string, listingId: string) {
  const supabase = createClient();
  const now = new Date().toISOString();

  await supabase
    .from("handshakes")
    .update({ confirmed_at: now })
    .eq("id", handshakeId);

  await supabase
    .from("listings")
    .update({ status: "closed" })
    .eq("id", listingId);
}

export async function startHandshake(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te mai întâi." };

  const listingId = String(formData.get("listing_id") ?? "").trim();
  const { data: listing } = await supabase
    .from("listings")
    .select("id, user_id, status")
    .eq("id", listingId)
    .maybeSingle();

  if (!listing || listing.user_id !== user.id) {
    return { error: "Anunț invalid." };
  }
  if (listing.status !== "active") {
    return { error: "Anunțul nu mai e activ." };
  }

  const code = newHandshakeCode();
  const { data, error } = await supabase
    .from("handshakes")
    .insert({
      listing_id: listingId,
      owner_id: user.id,
      code,
    })
    .select("code")
    .single();

  if (error) return { error: error.message };

  await supabase.from("listings").update({ status: "pending" }).eq("id", listingId);

  revalidatePath("/logistica");
  revalidatePath("/cont");
  return { success: true, code: data.code };
}

export async function joinHandshake(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te ca să confirmi." };

  const code = String(formData.get("code") ?? "").trim();
  const { data: handshake } = await supabase
    .from("handshakes")
    .select("*")
    .eq("code", code)
    .is("confirmed_at", null)
    .maybeSingle();

  if (!handshake) return { error: "Cod invalid sau deja folosit." };
  if (handshake.owner_id === user.id) {
    return { error: "Ești deja proprietarul — așteaptă partenerul." };
  }
  if (handshake.partner_id && handshake.partner_id !== user.id) {
    return { error: "Codul e legat de alt utilizator." };
  }

  const { error } = await supabase
    .from("handshakes")
    .update({ partner_id: user.id })
    .eq("id", handshake.id);

  if (error) return { error: error.message };

  revalidatePath("/logistica");
  revalidatePath("/cont");
  return { success: true, handshakeId: handshake.id };
}

export async function confirmHandshake(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Neautentificat." };

  const handshakeId = String(formData.get("handshake_id") ?? "").trim();
  const { data: handshake } = await supabase
    .from("handshakes")
    .select("*")
    .eq("id", handshakeId)
    .is("confirmed_at", null)
    .maybeSingle();

  if (!handshake) return { error: "Handshake inexistent." };

  const isOwner = handshake.owner_id === user.id;
  const isPartner = handshake.partner_id === user.id;
  if (!isOwner && !isPartner) return { error: "Nu ești participant." };
  if (isPartner && !handshake.partner_id) {
    return { error: "Partenerul trebuie să introducă codul mai întâi." };
  }

  const now = new Date().toISOString();
  const patch = isOwner
    ? { owner_confirmed_at: handshake.owner_confirmed_at ?? now }
    : { partner_confirmed_at: handshake.partner_confirmed_at ?? now };

  const { data: updated, error } = await supabase
    .from("handshakes")
    .update(patch)
    .eq("id", handshakeId)
    .select("*")
    .single();

  if (error || !updated) return { error: error?.message ?? "Eroare confirmare." };

  if (isHandshakeComplete(updated)) {
    await finishHandshake(handshakeId, handshake.listing_id);
    const { creditRonLocal, bumpTrust } = await import("@/lib/scofaluta/points");
    await creditRonLocal(handshake.owner_id, 10, "Handshake transport");
    if (handshake.partner_id) {
      await creditRonLocal(handshake.partner_id, 10, "Handshake transport");
      await bumpTrust(handshake.partner_id, 2);
    }
    await bumpTrust(handshake.owner_id, 2);
  }

  revalidatePath("/logistica");
  revalidatePath("/cont");
  revalidatePath("/scofaluta");
  return { success: true, complete: isHandshakeComplete(updated) };
}
