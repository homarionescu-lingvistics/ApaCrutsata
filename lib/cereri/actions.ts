"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createNeighborhoodRequest(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te ca să ceri." };

  const category = String(formData.get("category") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const neighborhood = String(formData.get("neighborhood") ?? "").trim();
  if (category.length < 3 || city.length < 2) {
    return { error: "Scrie ce lipsește și orașul." };
  }

  const { error } = await supabase.from("business_requests").insert({
    category,
    city,
    neighborhood: neighborhood || city,
    created_by: user.id,
    upvotes_count: 1,
  });
  if (error) return { error: error.message };
  revalidatePath("/cereri");
  return { success: true };
}

export async function upvoteRequest(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te ca să votezi." };

  const id = String(formData.get("id") ?? "").trim();
  const { data } = await supabase
    .from("business_requests")
    .select("upvotes_count")
    .eq("id", id)
    .maybeSingle();
  if (!data) return { error: "Cerere inexistentă." };

  const { error } = await supabase
    .from("business_requests")
    .update({ upvotes_count: (data.upvotes_count ?? 0) + 1 })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/cereri");
  return { success: true };
}

export async function createPostMortem(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te." };

  const category = String(formData.get("category") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const failure = String(formData.get("failure_reasons") ?? "").trim();
  const pricing = String(formData.get("pricing_strategy_notes") ?? "").trim();
  const capital = Number(String(formData.get("min_capital_required") ?? "").replace(",", "."));
  if (category.length < 3 || city.length < 2 || failure.length < 10) {
    return { error: "Scrie categoria, orașul și de ce a picat (min. 10 caractere)." };
  }

  const { error } = await supabase.from("business_post_mortems").insert({
    category,
    city,
    failure_reasons: failure,
    pricing_strategy_notes: pricing || null,
    min_capital_required: Number.isFinite(capital) ? capital : null,
    created_by: user.id,
  });
  if (error) return { error: error.message };
  revalidatePath("/cereri");
  return { success: true };
}
