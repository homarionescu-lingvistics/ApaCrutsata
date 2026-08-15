"use client";

import { useState, useTransition } from "react";
import { createPostMortem } from "@/lib/cereri/actions";
import type { BusinessPostMortem } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PostMortemBlock({
  items,
  loggedIn,
}: {
  items: BusinessPostMortem[];
  loggedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <article key={p.id} className="rounded-2xl border border-amber-500/20 bg-slate-900/80 p-4">
          <p className="text-sm font-semibold text-amber-200">
            {p.category} · {p.city}
          </p>
          <p className="mt-1 text-sm text-slate-300">{p.failure_reasons}</p>
          {p.min_capital_required ? (
            <p className="mt-2 text-xs text-slate-500">Capital minim: {p.min_capital_required} €</p>
          ) : null}
        </article>
      ))}

      {loggedIn ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm text-amber-300 underline"
        >
          {open ? "Ascunde" : "+ Adaugă lecție din faliment"}
        </button>
      ) : null}

      {open ? (
        <form
          className="space-y-3"
          action={(fd) => {
            setError(null);
            startTransition(async () => {
              const r = await createPostMortem(fd);
              if (r?.error) setError(r.error);
              else setOpen(false);
            });
          }}
        >
          <Input label="Tip afacere" name="category" required placeholder="petshop" />
          <Input label="Oraș" name="city" required placeholder="Sibiu" />
          <Input
            label="De ce a picat / ce să evite următorul"
            name="failure_reasons"
            required
            placeholder="Oamenii vor sac, nu vrac; capital 6 luni…"
          />
          <Input label="Capital minim €" name="min_capital_required" type="number" />
          {error ? (
            <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Se salvează…" : "Publică lecția"}
          </Button>
        </form>
      ) : null}
    </div>
  );
}
