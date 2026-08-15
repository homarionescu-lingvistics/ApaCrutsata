"use client";

import { useState, useTransition } from "react";
import { updateProfile, signOut } from "@/lib/auth/actions";
import { ROLE_OPTIONS } from "@/lib/auth/roles";
import type { Profile } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      <form
        className="space-y-4"
        action={(formData) => {
          setError(null);
          setMessage(null);
          startTransition(async () => {
            const result = await updateProfile(formData);
            if (result?.error) setError(result.error);
            else setMessage("Profil salvat.");
          });
        }}
      >
        <Input
          label="Nume complet"
          name="full_name"
          defaultValue={profile?.full_name ?? ""}
        />
        <Input
          label="Numele firmei / brandului"
          name="company_name"
          defaultValue={profile?.company_name ?? ""}
          placeholder="Nume firmă sau brand"
        />
        <Select
          label="Rol"
          name="role"
          defaultValue={profile?.role ?? "citizen"}
          options={[...ROLE_OPTIONS]}
        />
        <Input
          label="CUI (opțional, pentru KYB)"
          name="cui_number"
          defaultValue={profile?.cui_number ?? ""}
          placeholder="RO12345678"
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
          {pending ? "Se salvează…" : "Salvează profilul"}
        </Button>
      </form>
      <form action={signOut}>
        <Button type="submit" variant="ghost" className="w-full">
          Deconectare
        </Button>
      </form>
    </div>
  );
}
