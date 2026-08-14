import { getCurrentProfile } from "@/lib/auth/session";
import { getUserListings } from "@/lib/listings/queries";
import { Section } from "@/components/ui/section";
import { ProfileForm } from "@/components/auth/profile-form";
import { MyListings } from "@/components/piata/my-listings";

export default async function DashboardPage() {
  const { user, profile } = await getCurrentProfile();
  const listings = user ? await getUserListings(user.id) : [];

  return (
    <div className="space-y-6">
      <Section title="Anunțurile mele" description="Status: Activ / Finalizat">
        <MyListings listings={listings} />
      </Section>

      <Section title="Contul tău" description={user?.email ?? "Sesiune activă"}>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-900/80 p-3">
            <p className="text-xs text-slate-500">Rol</p>
            <p className="mt-1 font-medium capitalize text-slate-100">
              {profile?.role ?? "—"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-900/80 p-3">
            <p className="text-xs text-slate-500">RON-Local</p>
            <p className="mt-1 font-medium text-emerald-400">
              {profile?.ron_local_balance ?? 0} pct
            </p>
          </div>
        </div>
      </Section>

      <Section title="Editează profilul">
        <ProfileForm profile={profile} />
      </Section>
    </div>
  );
}
