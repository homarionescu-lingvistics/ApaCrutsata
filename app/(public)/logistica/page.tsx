import Link from "next/link";
import { getLogisticsListings } from "@/lib/listings/queries";
import { getSessionUser } from "@/lib/auth/session";
import { getUserListings } from "@/lib/listings/queries";
import { getOpenHandshakeForListing, getUserHandshakes } from "@/lib/trust/handshake-queries";
import { FeedList } from "@/components/feed/feed-list";
import { CreateLogisticsForm } from "@/components/logistica/create-logistics-form";
import { JoinHandshakeForm } from "@/components/logistica/join-handshake-form";
import { HandshakePanel } from "@/components/logistica/handshake-panel";
import { MyLogisticsHandshakes } from "@/components/logistica/my-logistics-handshakes";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { isLogisticsType } from "@/lib/listings/labels";

export default async function LogisticaPage() {
  const [listings, user] = await Promise.all([
    getLogisticsListings(50),
    getSessionUser(),
  ]);

  const myListings = user ? await getUserListings(user.id) : [];
  const myLogistics = myListings.filter((l) => isLogisticsType(l.type));
  const userHandshakes = user ? await getUserHandshakes(user.id) : [];

  const openByListing: Record<string, Awaited<ReturnType<typeof getOpenHandshakeForListing>>> = {};
  for (const l of myLogistics) {
    if (l.status !== "closed") {
      openByListing[l.id] = await getOpenHandshakeForListing(l.id);
    }
  }

  const activePanels = userHandshakes.filter((h) => !h.confirmed_at);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Strungă-Transport 🚚</h1>
        <p className="text-sm text-slate-400">
          Utilaje, transport marfă, inter-ajutor — confirmare pe ambele telefoane.
        </p>
        {!user ? (
          <Link href="/auth/login?next=/logistica">
            <Button variant="ghost" className="w-full">
              Autentifică-te ca să publici
            </Button>
          </Link>
        ) : (
          <CreateLogisticsForm />
        )}
      </header>

      <JoinHandshakeForm />

      {user && activePanels.length > 0 ? (
        <Section title="Confirmări active" description="Dual handshake">
          {activePanels.map((hs) => {
            const listing = myListings.find((l) => l.id === hs.listing_id);
            return (
              <HandshakePanel
                key={hs.id}
                handshake={hs}
                userId={user.id}
                listingTitle={listing?.title ?? "Anunț"}
              />
            );
          })}
        </Section>
      ) : null}

      {user ? (
        <Section title="Anunțurile tale" description="Transport & utilaje">
          <MyLogisticsHandshakes
            listings={myListings}
            handshakes={openByListing}
            userId={user.id}
          />
        </Section>
      ) : null}

      <Section title="Rute active" description="Coordonare logistică pe hartă">
        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">Hartă rutelor</p>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[11px] text-slate-300">
              {[
                "Cluj",
                "Brașov",
                "Timișoara",
                "Iași",
                "București",
                "Constanța",
                "Craiova",
                "Sibiu",
              ].map((city) => (
                <span key={city} className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1">
                  {city}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
              <span>Flux principal</span>
              <span>Cluj → București</span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { from: "Cluj", to: "București", eta: "36h", cargo: "Utilaje agricole" },
              { from: "Iași", to: "Constanța", eta: "18h", cargo: "Marfă frigorifică" },
              { from: "Sibiu", to: "Craiova", eta: "24h", cargo: "Piese / materiale" },
            ].map((route) => (
              <div key={`${route.from}-${route.to}`} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between gap-2 text-sm font-medium text-slate-100">
                  <span>{route.from}</span>
                  <span className="text-emerald-300">→</span>
                  <span>{route.to}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{route.cargo}</span>
                  <span>{route.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Disponibil în zonă" description={`${listings.length} anunțuri`}>
        <FeedList
          listings={listings}
          emptyMessage="Niciun transport sau utilaj. Apasă 🎙️ sus sau publică un anunț."
          detailBase="/logistica"
        />
      </Section>
    </div>
  );
}
