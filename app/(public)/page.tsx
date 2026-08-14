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

      <Section title="Ultimele anunțuri" description={`${listings.length} active`}>
        <FeedList
          listings={listings}
          emptyMessage="Niciun anunț. Apasă 🎙️ sus sau publică la Mânzare."
        />
      </Section>
    </div>
  );
}
