import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  getOpenClearingOffers,
  getPriceStats,
  getUserLedger,
  liveBalance,
  nextExpiry,
} from "@/lib/scofaluta/queries";
import { offersMatch } from "@/lib/clearing/types";
import { ClearingOfferForm } from "@/components/scofaluta/clearing-offer-form";
import { ClearingList } from "@/components/scofaluta/clearing-list";
import { PointsCard } from "@/components/scofaluta/points-card";
import { PriceStats } from "@/components/scofaluta/price-stats";
import { VitalsGrid } from "@/components/scofaluta/vitals-grid";
import { getVitals } from "@/lib/scofaluta/vitals";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default async function ScofalutaPage() {
  const [{ user, profile }, stats, offers, vitals] = await Promise.all([
    getCurrentProfile(),
    getPriceStats(),
    getOpenClearingOffers(),
    getVitals(),
  ]);
  const ledger = user ? await getUserLedger(user.id) : [];
  const balance = user ? liveBalance(ledger) : profile?.ron_local_balance ?? 0;

  const myOffers = offers.filter((o) => o.user_id === user?.id);
  const matchIds = new Set<string>();
  for (const mine of myOffers) {
    for (const other of offers) {
      if (offersMatch(mine, other)) {
        matchIds.add(mine.id);
        matchIds.add(other.id);
      }
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Scofalută 🪙</h1>
        <p className="text-sm text-slate-400">Prețuri locale, puncte, schimb circular.</p>
      </header>

      {user ? (
        <PointsCard balance={balance} expiry={nextExpiry(ledger)} entries={ledger} />
      ) : (
        <Link href="/auth/login?next=/scofaluta">
          <Button className="w-full">Intră în cont ca să vezi punctele</Button>
        </Link>
      )}

      <Section title="Prețuri în zonă" description="Medie din anunțuri active">
        <PriceStats stats={stats} />
      </Section>

      <Section title="Vitale economice" description="Indicatori de circulație și localizare">
        <VitalsGrid vitals={vitals} />
      </Section>

      <Section title="Circuit P2P" description="Eu dau — tu dai. Fără cash.">
        {user ? <ClearingOfferForm /> : (
          <p className="text-sm text-slate-400">Autentifică-te ca să oferi schimb.</p>
        )}
        <div className="mt-4">
          <ClearingList offers={offers} userId={user?.id ?? null} matchIds={matchIds} />
        </div>
      </Section>

      <Link
        href="/investment"
        className="block rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-200"
      >
        Investiții & Micro-Capital → vezi hub-ul de finanțare
      </Link>
    </div>
  );
}
