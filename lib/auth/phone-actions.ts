"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  newDeviceToken,
  newLoginToken,
  normalizePhone,
  phoneToEmail,
  phoneToPassword,
} from "@/lib/auth/phone";
import { sendLoginSms } from "@/lib/sms/send-login";
import type { UserRole } from "@/lib/supabase/types";

export async function requestPhoneLogin(formData: FormData) {
  const raw = String(formData.get("phone") ?? "").trim();
  const phone = normalizePhone(raw);

  if (!phone) {
    return { error: "Număr invalid. Ex: 0722 123 456" };
  }

  const token = newLoginToken();
  const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const admin = createAdminClient();

  const { error } = await admin.from("phone_login_tokens").insert({
    phone,
    token,
    expires_at: expires,
  });

  if (error) return { error: error.message };

  const verifyPath = `/auth/verify?token=${encodeURIComponent(token)}`;
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );
  const link = `${base}${verifyPath}`;

  try {
    const result = await sendLoginSms(phone, link);
    if (result.sent) {
      return { success: true, message: "Ți-am trimis SMS cu linkul. Apasă pe el." };
    }
    return {
      success: true,
      devLink: verifyPath,
      message: "SMS (Twilio) nu e configurat — apasă butonul ca să intri (doar test local):",
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Nu am putut trimite SMS." };
  }
}

export async function ensurePhoneUser(phone: string) {
  const admin = createAdminClient();
  const email = phoneToEmail(phone);
  const password = phoneToPassword(phone);

  const { data: list } = await admin.auth.admin.listUsers();
  const existing = list.users.find(
    (u) => u.email === email || u.user_metadata?.phone === phone
  );

  if (existing) {
    await admin.from("profiles").upsert({
      id: existing.id,
      phone,
      role: ((existing.user_metadata?.role as UserRole) ?? "citizen"),
    });
    return { userId: existing.id, email, password };
  }

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { phone, auth_method: "phone_sms" },
  });

  if (error || !data.user) throw new Error(error?.message ?? "User create failed");

  await admin.from("profiles").upsert({
    id: data.user.id,
    phone,
    role: "citizen",
  });

  return { userId: data.user.id, email, password };
}

export async function registerTrustedDevice(userId: string, phone: string) {
  const admin = createAdminClient();
  const deviceToken = newDeviceToken();
  await admin.from("trusted_devices").insert({
    user_id: userId,
    phone,
    device_token: deviceToken,
  });
  return deviceToken;
}

export async function markTokenUsed(token: string) {
  const admin = createAdminClient();
  await admin
    .from("phone_login_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("token", token);
}

export async function getValidToken(token: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("phone_login_tokens")
    .select("*")
    .eq("token", token)
    .is("used_at", null)
    .maybeSingle();

  if (!data) return null;
  if (new Date(data.expires_at) < new Date()) return null;
  return data;
}

export async function getProfilePhone() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("phone")
    .eq("id", user.id)
    .maybeSingle();

  return data?.phone ?? (user.user_metadata?.phone as string | undefined) ?? null;
}
