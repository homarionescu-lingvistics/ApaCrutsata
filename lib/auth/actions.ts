"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/supabase/types";

const ROLES: UserRole[] = [
  "citizen",
  "entrepreneur",
  "producer",
  "transporter",
];

function formString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function signUp(formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");
  const fullName = formString(formData, "full_name");
  const role = formString(formData, "role") as UserRole;

  if (!email || password.length < 6) {
    return { error: "Email și parolă (min. 6 caractere) sunt obligatorii." };
  }
  if (!ROLES.includes(role)) {
    return { error: "Rol invalid." };
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role } },
  });

  if (error) return { error: error.message };

  if (!data.session) {
    return {
      success: true,
      message: "Verifică emailul pentru confirmare, apoi autentifică-te.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/cont");
}

export async function signIn(formData: FormData) {
  const email = formString(formData, "email");
  const password = formString(formData, "password");

  if (!email || !password) {
    return { error: "Completează email și parola." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/cont");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  cookies().set("cr_device", "", { path: "/", maxAge: 0 });
  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfile(formData: FormData) {
  const fullName = formString(formData, "full_name");
  const companyName = formString(formData, "company_name");
  const role = formString(formData, "role") as UserRole;
  const cuiNumber = formString(formData, "cui_number") || null;

  if (!ROLES.includes(role)) {
    return { error: "Rol invalid." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Neautentificat." };

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName || null,
      company_name: companyName || null,
      role,
      cui_number: cuiNumber,
    })
    .eq("id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/cont");
  revalidatePath("/dashboard");
  return { success: true };
}
