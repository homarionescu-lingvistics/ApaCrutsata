"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createClearingOffer(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te ca să oferi schimb." };

  const gives = String(formData.get("gives") ?? "").trim();
  const wants = String(formData.get("wants") ?? "").trim();
  const contactPhone = String(formData.get("contact_phone") ?? "").trim();
  if (gives.length < 2 || wants.length < 2) {
    return { error: "Scrie ce dai și ce cauți (min. 2 caractere)." };
  }

  const { error } = await supabase.from("clearing_offers").insert({
    user_id: user.id,
    gives,
    wants,
    contact_phone: contactPhone || null,
    status: "open",
  });
  if (error) return { error: error.message };

  revalidatePath("/scofaluta");
  return { success: true };
}

export async function closeClearingOffer(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Neautentificat." };

  const id = String(formData.get("id") ?? "").trim();
  const { error } = await supabase
    .from("clearing_offers")
    .update({ status: "closed" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/scofaluta");
  return { success: true };
}
