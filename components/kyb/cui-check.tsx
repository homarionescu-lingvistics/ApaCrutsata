"use client";

import { useState, useTransition } from "react";
import { verifyCui } from "@/lib/kyb/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = { cui: string | null; verified: boolean };

export function CuiCheck({ cui, verified }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(
    verified ? "Firmă verificată ANAF." : null
  );
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-3"
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          const result = await verifyCui(fd);
          if (result?.error) setError(result.error);
          else {
            setInfo(`${result.name}${result.vatPayer ? " · plătitor TVA" : ""}`);
          }
        });
      }}
    >
      <Input
        label="CUI firmă"
        name="cui"
        defaultValue={cui ?? ""}
        placeholder="RO14399840"
      />
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>
      ) : null}
      {info ? (
        <p className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          {info}
        </p>
      ) : null}
      <Button type="submit" variant="ghost" className="w-full" disabled={pending}>
        {pending ? "Verific ANAF…" : verified ? "Reverifică CUI" : "Verifică la ANAF"}
      </Button>
    </form>
  );
}
