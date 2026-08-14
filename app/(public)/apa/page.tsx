import { getSessionUser } from "@/lib/auth/session";
import { ApaGuides } from "@/components/apa/apa-guides";
import { NightIrrigation } from "@/components/apa/night-irrigation";
import { WellCollectiveForm } from "@/components/apa/well-form";
import { AparahovaCta } from "@/components/apa/aparahova-cta";
import { Section } from "@/components/ui/section";

export default async function ApaPage() {
  const user = await getSessionUser();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Apa Crutsată 💧</h1>
        <p className="text-sm text-slate-400">
          Irigație pentru gospodărie — fără facturi uriașe, fără vorbe.
        </p>
      </header>

      <NightIrrigation />
      <ApaGuides />

      <Section
        title="Strânge 3–4 vecini"
        description="Un puț la comun. Apa se împarte prin anunț, nu din gură."
      >
        <WellCollectiveForm loggedIn={Boolean(user)} />
      </Section>

      <AparahovaCta />
    </div>
  );
}
