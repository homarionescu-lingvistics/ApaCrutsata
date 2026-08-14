import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { phoneToEmail, phoneToPassword } from "@/lib/auth/phone-edge";

export async function restoreSessionFromDevice(
  request: NextRequest,
  response: NextResponse
): Promise<boolean> {
  const deviceToken = request.cookies.get("cr_device")?.value;
  if (!deviceToken) return false;

  const admin = createAdminClient();
  const { data: device } = await admin
    .from("trusted_devices")
    .select("user_id, phone")
    .eq("device_token", deviceToken)
    .maybeSingle();

  if (!device?.phone) return false;

  const email = phoneToEmail(device.phone);
  const password = await phoneToPassword(device.phone);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return false;

  await admin
    .from("trusted_devices")
    .update({ last_seen: new Date().toISOString() })
    .eq("device_token", deviceToken);

  return true;
}
