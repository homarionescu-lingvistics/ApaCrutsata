import { createHmac, randomBytes } from "crypto";

const DOMAIN = "login.crutsanimiaron.ro";

export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) {
    return `+4${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("40")) {
    return `+${digits}`;
  }
  if (raw.startsWith("+") && digits.length >= 10) {
    return `+${digits}`;
  }
  return null;
}

export function phoneToEmail(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `p${digits}@${DOMAIN}`;
}

export function phoneToPassword(phone: string) {
  const secret = process.env.AUTH_PHONE_SECRET ?? "dev-change-me";
  return createHmac("sha256", secret).update(phone).digest("hex");
}

export function newLoginToken() {
  return randomBytes(24).toString("base64url");
}

export function newDeviceToken() {
  return randomBytes(32).toString("base64url");
}

export function loginMessage(link: string) {
  return (
    `CrutsanimiaRON — apasă linkul ca să intri în cont:\n${link}\n\n` +
    `Nu da acest mesaj la străini că te țepuiesc.`
  );
}
