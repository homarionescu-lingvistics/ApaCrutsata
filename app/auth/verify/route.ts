import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  ensurePhoneUser,
  getValidToken,
  markTokenUsed,
  registerTrustedDevice,
} from "@/lib/auth/phone-actions";
import { ensureSupabaseConfig } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const next = request.nextUrl.searchParams.get("next") ?? "/cont";

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login?error=link-invalid", request.url));
  }

  const row = await getValidToken(token);
  if (!row) {
    return NextResponse.redirect(new URL("/auth/login?error=link-expirat", request.url));
  }

  const response = NextResponse.redirect(new URL(next, request.url));

  try {
    const { url, anonKey, isConfigured } = ensureSupabaseConfig();
    if (!isConfigured) {
      return NextResponse.redirect(new URL("/auth/login?error=config", request.url));
    }

    const { email, password, userId } = await ensurePhoneUser(row.phone);
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    await markTokenUsed(token);
    const deviceToken = await registerTrustedDevice(userId, row.phone);
    response.cookies.set("cr_device", deviceToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL("/auth/login?error=autentificare", request.url));
  }
}
