"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createWellCall(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login?next=/apa");

  const village = String(formData.get("village") ?? "").trim();
  const neighbors = String(formData.get("neighbors") ?? "").trim();
  const phone = String(formData.get("contact_phone") ?? "").trim();
  if (village.length < 2) return { error: "Scrie satul / comuna." };

  const { error } = await supabase.from("listings").insert({
    user_id: user.id,
    type: "request",
    title: `Foraj colectiv — ${village}`,
    description: `Caut ${neighbors || "3–4"} vecini cu teren lipit pentru un puț la comun. Apa se împarte, nu 4 foraje.`,
    city: village,
    contact_phone: phone || null,
    barter_ok: true,
    status: "active",
  });

  if (error) return { error: error.message };
  revalidatePath("/apa");
  revalidatePath("/logistica");
  revalidatePath("/");
  return { success: true };
}
