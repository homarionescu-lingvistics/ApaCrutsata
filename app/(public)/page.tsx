import Link from "next/link";
import { getActiveListings } from "@/lib/listings/queries";
import { FeedList } from "@/components/feed/feed-list";
import { ApaQuickLink } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default async function HomePage() {
  const listings = await getActiveListings(20);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">La Cătun</h1>
        <p className="text-sm text-slate-400">
          Ce e nou în zona ta — scroll simplu, buton verde Sună.
        </p>
        <Link href="/piata">
          <Button className="w-full">+ Publică la Mânzare</Button>
        </Link>
        <div className="flex gap-2">
          <Link href="/apa" className="flex-1">
            <Button variant="ghost" className="w-full">
              Apa Crutsată
            </Button>
          </Link>
          <Link href="/beta" className="flex-1">
            <Button variant="ghost" className="w-full">
              TikTok 15s
            </Button>
          </Link>
        </div>
      </header>

      <ApaQuickLink />
      <Link
        href="/cereri"
        className="block rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
      >
        Ce lipsește în cartier? Votează / lecții din faliment
      </Link>

      <div className="grid gap-2 sm:grid-cols-2">
        <Link href="/strunga" className="rounded-xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-100">
          Strungă transport
        </Link>
        <Link href="/investment" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
          Investment Hub
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">Website-uri locale</p>
        <h2 className="mt-2 text-lg font-semibold text-slate-100">Website-uri și soluții românești</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li><a className="text-emerald-300 underline" href="https://www.listafirme.ro" target="_blank" rel="noreferrer">ListaFirme.ro</a></li>
          <li><a className="text-emerald-300 underline" href="https://www.risco.ro" target="_blank" rel="noreferrer">RisCo</a></li>
          <li><a className="text-emerald-300 underline" href="https://www.onrc.ro" target="_blank" rel="noreferrer">ONRC</a></li>
          <li><a className="text-emerald-300 underline" href="https://www.anaf.ro" target="_blank" rel="noreferrer">ANAF</a></li>
        </ul>
      </div>

      <Section title="Ultimele anunțuri" description={`${listings.length} active`}>
        <FeedList
          listings={listings}
          emptyMessage="Niciun anunț. Apasă 🎙️ sus sau publică la Mânzare."
        />
      </Section>
    </div>
  );
}
