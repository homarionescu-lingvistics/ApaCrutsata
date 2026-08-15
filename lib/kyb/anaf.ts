export type AnafFirm = {
  cui: string;
  name: string;
  address: string | null;
  vatPayer: boolean;
};

const ANAF_URL = "https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva";

function digitsCui(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length < 2 || d.length > 10) return null;
  return d;
}

export async function lookupAnaf(rawCui: string): Promise<AnafFirm | { error: string }> {
  const cui = digitsCui(rawCui);
  if (!cui) return { error: "CUI invalid. Ex: RO14399840" };

  const today = new Date().toISOString().slice(0, 10);

  try {
    const res = await fetch(ANAF_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "CrutsanimiaRON/1.0 (KYB IMM)",
      },
      body: JSON.stringify([{ cui: Number(cui), data: today }]),
      cache: "no-store",
    });

    const json = (await res.json()) as {
      found?: Array<{
        date_generale?: { cui?: number; denumire?: string; adresa?: string };
        inregistrare_scop_Tva?: { scpTVA?: boolean };
      }>;
      notFound?: number[];
    };

    const g = json.found?.[0]?.date_generale;
    if (g?.denumire) {
      return {
        cui,
        name: g.denumire,
        address: g.adresa ?? null,
        vatPayer: Boolean(json.found?.[0]?.inregistrare_scop_Tva?.scpTVA),
      };
    }

    if (res.status === 404 || json.notFound?.length) {
      return { error: "CUI-ul nu e în registrul ANAF (verifică cifrele)." };
    }
    return { error: `ANAF a răspuns ${res.status}. Reîncearcă.` };
  } catch {
    return { error: "Nu am putut contacta ANAF (rețea)." };
  }
}
