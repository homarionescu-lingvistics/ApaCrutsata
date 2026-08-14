"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { requestPhoneLogin } from "@/lib/auth/phone-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = { errorHint?: string | null };

export function PhoneLoginForm({ errorHint }: Props) {
  const [error, setError] = useState<string | null>(errorHint ?? null);
  const [message, setMessage] = useState<string | null>(null);
  const [devLink, setDevLink] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
        <p className="font-semibold">Cum funcționează</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-amber-200/90">
          <li>Pui numărul de telefon</li>
          <li>Primești SMS cu link unic</li>
          <li>Apasă linkul — ești în cont</li>
        </ol>
        <p className="mt-3 text-xs text-amber-300/80">
          În SMS: „Nu da acest mesaj la străini că te țepuiesc.”
        </p>
      </div>

      <form
        className="space-y-4"
        action={(formData) => {
          setError(null);
          setMessage(null);
          setDevLink(null);
          startTransition(async () => {
            const result = await requestPhoneLogin(formData);
            if (result?.error) setError(result.error);
            else {
              setMessage(result.message ?? "Verifică telefonul.");
              if (result.devLink) setDevLink(result.devLink);
            }
          });
        }}
      >
        <Input
          label="Număr telefon"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="07xx xxx xxx"
        />
        {error ? (
          <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
        ) : null}
        {message ? (
          <p className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            {message}
          </p>
        ) : null}
        {devLink ? (
          <a
            href={devLink}
            className="block rounded-xl bg-emerald-500 px-3 py-3 text-center text-sm font-semibold text-slate-950"
          >
            Intră în cont (test local)
          </a>
        ) : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Se trimite SMS…" : "Trimite link pe SMS"}
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        După prima intrare, telefonul rămâne recunoscut — nu mai trebuie SMS de fiecare dată.
      </p>
      <p className="text-center text-xs text-slate-600">
        <Link href="/auth/signup" className="underline">
          Cont vechi cu email (dev)
        </Link>
      </p>
    </div>
  );
}
