"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ListingType } from "./types";

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function formNumber(formData: FormData, key: string) {
  const raw = formString(formData, key);
  if (!raw) return null;
  const n = Number(raw.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

export async function createListing(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/auth/login?next=${formString(formData, "next") || "/piata"}`);

  const title = formString(formData, "title");
  const type = formString(formData, "type") as ListingType;
  const city = formString(formData, "city");
  const neighborhood = formString(formData, "neighborhood");
  const description = formString(formData, "description");
  const contactPhone = formString(formData, "contact_phone");
  const photoUrl = formString(formData, "photo_url");
  const priceRon = formNumber(formData, "price_ron");
  const barterOk = formData.get("barter_ok") === "on";

  if (!title || title.length < 3) {
    return { error: "Titlul trebuie să aibă cel puțin 3 caractere." };
  }

  const validTypes: ListingType[] = ["product", "service", "asset", "request"];
  if (!validTypes.includes(type)) {
    return { error: "Tip anunț invalid." };
  }

  const { error } = await supabase.from("listings").insert({
    user_id: user.id,
    type,
    title,
    description: description || null,
    city: city || null,
    neighborhood: neighborhood || null,
    price_ron: priceRon,
    barter_ok: barterOk,
    contact_phone: contactPhone || null,
    photo_url: photoUrl || null,
    status: "active",
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/piata");
  revalidatePath("/logistica");
  revalidatePath("/apa");
  revalidatePath("/cont");
  return { success: true };
}

export async function closeListing(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Neautentificat." };

  const id = formString(formData, "id");
  const { error } = await supabase
    .from("listings")
    .update({ status: "closed" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/piata");
  revalidatePath("/logistica");
  revalidatePath("/apa");
  revalidatePath("/cont");
  return { success: true };
}
