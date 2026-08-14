const DOMAIN = "login.crutsanimiaron.ro";

export function phoneToEmail(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `p${digits}@${DOMAIN}`;
}

export async function phoneToPassword(phone: string) {
  const secret = process.env.AUTH_PHONE_SECRET ?? "dev-change-me";
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(phone));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
