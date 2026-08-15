"use client";

import { useState, useTransition } from "react";
import { createNeighborhoodRequest } from "@/lib/cereri/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RequestForm({ loggedIn }: { loggedIn: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!loggedIn) {
    return (
      <a
        href="/auth/login?next=/cereri"
        className="block rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950"
      >
        Intră ca să ceri un magazin în cartier
      </a>
    );
  }

  return (
    <form
      className="space-y-3"
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          const r = await createNeighborhoodRequest(fd);
          if (r?.error) setError(r.error);
        });
      }}
    >
      <Input label="Ce lipsește?" name="category" required placeholder="petshop / brutărie / sală femei" />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Oraș" name="city" required placeholder="Sibiu" />
        <Input label="Cartier" name="neighborhood" placeholder="Lazaret" />
      </div>
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Se trimite…" : "Cere în cartier"}
      </Button>
    </form>
  );
}
