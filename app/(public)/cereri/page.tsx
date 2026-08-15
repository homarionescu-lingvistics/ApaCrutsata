import { getSessionUser } from "@/lib/auth/session";
import { getNeighborhoodRequests, getPostMortems } from "@/lib/cereri/queries";
import { RequestForm } from "@/components/cereri/request-form";
import { RequestList } from "@/components/cereri/request-list";
import { PostMortemBlock } from "@/components/cereri/postmortem-block";
import { RiskBox } from "@/components/cereri/risk-box";
import { Section } from "@/components/ui/section";

export default async function CereriPage() {
  const [user, requests, lessons] = await Promise.all([
    getSessionUser(),
    getNeighborhoodRequests(),
    getPostMortems(),
  ]);
  const loggedIn = Boolean(user);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Ce lipsește în cartier</h1>
        <p className="text-sm text-slate-400">
          Votează magazinul care lipsește. Antreprenorul vede date, nu vorbe.
        </p>
      </header>

      <RequestForm loggedIn={loggedIn} />
      <RequestList requests={requests} loggedIn={loggedIn} />

      <Section title="Simulator risc" description="Înainte să deschizi — Gemini citește capcanele">
        <RiskBox />
      </Section>

      <Section title="Lecții din faliment" description="Post-mortem de la cine a închis">
        <PostMortemBlock items={lessons} loggedIn={loggedIn} />
      </Section>
    </div>
  );
}
