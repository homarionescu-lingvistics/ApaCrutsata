"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await signIn(formData);
          if (result?.error) setError(result.error);
        });
      }}
    >
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="tu@email.com"
      />
      <Input
        label="Parolă"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        minLength={6}
      />
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Se conectează…" : "Intră în cont"}
      </Button>
      <p className="text-center text-sm text-slate-400">
        Nu ai cont?{" "}
        <Link href="/auth/signup" className="text-emerald-400 hover:underline">
          Creează unul
        </Link>
      </p>
    </form>
  );
}
