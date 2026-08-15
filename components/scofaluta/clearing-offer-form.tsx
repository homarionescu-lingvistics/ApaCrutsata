"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClearingOffer } from "@/lib/clearing/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ClearingOfferForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-3"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await createClearingOffer(formData);
          if (result?.error) setError(result.error);
          else router.refresh();
        });
      }}
    >
      <Input label="Dau" name="gives" required placeholder="fân / 2 ore muncă / remorcă" />
      <Input label="Caut" name="wants" required placeholder="motorină / cartofi / transport" />
      <Input label="Telefon de contact" name="contact_phone" placeholder="07xx xxx xxx" />
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Se publică…" : "Pune în circuit"}
      </Button>
    </form>
  );
}
