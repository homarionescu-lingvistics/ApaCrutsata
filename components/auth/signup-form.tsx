"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { signUp } from "@/lib/auth/actions";
import { ROLE_OPTIONS } from "@/lib/auth/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="space-y-4"
      action={(formData) => {
        setError(null);
        setMessage(null);
        startTransition(async () => {
          const result = await signUp(formData);
          if (result?.error) setError(result.error);
          else if (result?.message) setMessage(result.message);
        });
      }}
    >
      <Input
        label="Nume complet"
        name="full_name"
        autoComplete="name"
        placeholder="Ion Popescu"
      />
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
        autoComplete="new-password"
        required
        minLength={6}
      />
      <Select
        label="Rol"
        name="role"
        defaultValue="citizen"
        options={[...ROLE_OPTIONS]}
      />
      {error ? (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-xl bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          {message}
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Se creează…" : "Creează cont"}
      </Button>
      <p className="text-center text-sm text-slate-400">
        Ai deja cont?{" "}
        <Link href="/auth/login" className="text-emerald-400 hover:underline">
          Autentifică-te
        </Link>
      </p>
    </form>
  );
}
