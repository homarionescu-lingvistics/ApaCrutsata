"use client";

import { useState, useTransition } from "react";
import { createWellCall } from "@/lib/apa/well-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WellCollectiveForm({ loggedIn }: { loggedIn: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!loggedIn) {
    return (
      <a
        href="/auth/login?next=/apa"
        className="block rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-semibold text-white"
      >
        Intră în cont ca să strângi vecini
      </a>
    );
  }

  return (
    <form
      className="space-y-3"
      action={(fd) => {
        setError(null);
        setOk(false);
        startTransition(async () => {
          const result = await createWellCall(fd);
          if (result?.error) setError(result.error);
          else setOk(true);
        });
      }}
    >
      <Input label="Sat / comună" name="village" required placeholder="Lazaret" />
      <Input label="Câți vecini (3–4)" name="neighbors" placeholder="3" />
      <Input label="Telefon" name="contact_phone" type="tel" placeholder="07xx xxx xxx" />
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
      ) : null}
      {ok ? (
        <p className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          Anunț publicat la Strungă-Transport.
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Se publică…" : "Caut vecini pentru puț"}
      </Button>
    </form>
  );
}
