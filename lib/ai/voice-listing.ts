import { generateJson } from "@/lib/ai/gemini";
import type { ListingDraft } from "@/lib/listings/types";

type VoiceParseResult = ListingDraft & {
  summary?: string;
};

export async function parseVoiceToListing(transcript: string): Promise<VoiceParseResult> {
  const prompt = `Ești asistent pentru CrutsanimiaRON, o piață locală românească.
Utilizatorul vorbește în română colocvială. Extrage un anunț structurat din textul de mai jos.

Text utilizator: """${transcript}"""

Returnează JSON cu câmpurile:
- type: "product" | "service" | "asset" | "request"
- title: titlu scurt max 60 caractere, română simplă
- description: descriere scurtă 1-2 propoziții
- city: oraș dacă e menționat, altfel null
- neighborhood: cartier/sat dacă e menționat, altfel null
- price_ron: număr RON dacă e menționat, altfel null
- barter_ok: true dacă acceptă schimb/troc, altfel false
- contact_phone: telefon dacă e menționat, altfel null
- summary: o propoziție ce ai înțeles`;

  return generateJson<VoiceParseResult>(prompt);
}
