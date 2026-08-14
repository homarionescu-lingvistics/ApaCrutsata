"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { lookupAnaf } from "@/lib/kyb/anaf";

export async function verifyCui(formData: FormData) {
  const cui = String(formData.get("cui") ?? "").trim();
  const result = await lookupAnaf(cui);
  if ("error" in result) return { error: result.error };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Autentifică-te." };

  const { error } = await supabase
    .from("profiles")
    .update({
      cui_number: result.cui,
      is_verified_sme: true,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };
  revalidatePath("/cont");
  return {
    success: true,
    name: result.name,
    address: result.address,
    vatPayer: result.vatPayer,
  };
}
