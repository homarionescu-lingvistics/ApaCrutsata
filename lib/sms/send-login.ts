import { loginMessage } from "@/lib/auth/phone";

type SmsResult = { sent: true } | { sent: false; devLink: string };

export async function sendLoginSms(phone: string, verifyUrl: string): Promise<SmsResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  const body = loginMessage(verifyUrl);

  if (!sid || !token || !from) {
    return { sent: false, devLink: verifyUrl };
  }

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: phone, From: from, Body: body }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SMS eșuat: ${err}`);
  }

  return { sent: true };
}
