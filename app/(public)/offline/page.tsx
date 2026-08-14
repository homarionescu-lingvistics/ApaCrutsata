import { Section } from "@/components/ui/section";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg items-center px-4">
      <Section title="Ești offline" description="App-ul rămâne pe telefon. Rețeaua lipsește.">
        <p className="text-sm text-slate-400">
          Când revine netul, anunțurile și handshake-ul se actualizează singure.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-slate-950"
        >
          Reîncearcă
        </Link>
      </Section>
    </div>
  );
}
