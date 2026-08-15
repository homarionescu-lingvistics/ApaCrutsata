import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import { getUserListings } from "@/lib/listings/queries";
import { Section } from "@/components/ui/section";
import { ProfileForm } from "@/components/auth/profile-form";
import { MyListings } from "@/components/piata/my-listings";
import { CuiCheck } from "@/components/kyb/cui-check";
import { TrustMeter } from "@/components/trust/trust-meter";

export default async function DashboardPage() {
  const { user, profile } = await getCurrentProfile();
  const listings = user ? await getUserListings(user.id) : [];
  const counts = {
    active: listings.filter((l) => l.status === "active").length,
    pending: listings.filter((l) => l.status === "pending").length,
    closed: listings.filter((l) => l.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400">Profil</p>
        <h1 className="text-2xl font-bold">{profile?.full_name ?? user?.email ?? "Utilizator"}</h1>
        <p className="text-sm text-slate-300">
          {profile?.company_name ?? "Fără firmă înregistrată"}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1">
            {profile?.role ?? "citizen"}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1">
            {profile?.phone ?? user?.email ?? "Sesiune activă"}
          </span>
        </div>
      </header>

      <TrustMeter score={profile?.trust_score ?? 50} />

      <div className="grid grid-cols-2 gap-2 text-center text-sm">
        <Link href="/scofaluta" className="rounded-xl bg-slate-900/80 p-3">
          <p className="text-xs text-slate-500">RON-Local</p>
          <p className="mt-1 text-lg font-bold text-amber-300">
            {profile?.ron_local_balance ?? 0}
          </p>
        </Link>
        <div className="rounded-xl bg-slate-900/80 p-3">
          <p className="text-xs text-slate-500">Anunțuri</p>
          <p className="mt-1 text-lg font-bold text-slate-100">{listings.length}</p>
        </div>
      </div>

      <Section
        title="Anunțurile mele"
        description={`${counts.active} active · ${counts.pending} în derulare · ${counts.closed} finalizate`}
      >
        <MyListings listings={listings} />
      </Section>

      <Section title="Firmă (KYB ANAF)" description="CUI public, fără CNP">
        <CuiCheck
          cui={profile?.cui_number ?? null}
          verified={Boolean(profile?.is_verified_sme)}
        />
      </Section>

      <Section title="Editează profilul">
        <ProfileForm profile={profile} />
      </Section>
    </div>
  );
}
