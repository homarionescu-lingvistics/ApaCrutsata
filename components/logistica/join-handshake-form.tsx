"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { joinHandshake } from "@/lib/trust/handshake-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JoinHandshakeForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4">
      <p className="text-sm font-semibold text-sky-200">Ai primit un cod de la vecin?</p>
      <p className="mt-1 text-xs text-slate-400">
        Introdu codul de 6 cifre — apoi confirmați amândoi pe telefon.
      </p>
      <form
        className="mt-3 space-y-3"
        action={(formData) => {
          setError(null);
          setOk(null);
          startTransition(async () => {
            const result = await joinHandshake(formData);
            if (result?.error) setError(result.error);
            else {
              setOk("Ești conectat! Apasă Confirmă mai jos.");
              router.refresh();
            }
          });
        }}
      >
        <Input
          label="Cod handshake"
          name="code"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          placeholder="123456"
        />
        {error ? (
          <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
        ) : null}
        {ok ? (
          <p className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{ok}</p>
        ) : null}
        <Button type="submit" variant="ghost" className="w-full" disabled={pending}>
          {pending ? "Verific…" : "Intră în handshake"}
        </Button>
      </form>
    </div>
  );
}
