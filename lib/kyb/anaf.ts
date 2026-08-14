export type AnafFirm = {
  cui: string;
  name: string;
  address: string | null;
  vatPayer: boolean;
};

function digitsCui(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.length < 2 || d.length > 10) return null;
  return d;
}

export async function lookupAnaf(rawCui: string): Promise<AnafFirm | { error: string }> {
  const cui = digitsCui(rawCui);
  if (!cui) return { error: "CUI invalid. Ex: RO12345678" };

  const today = new Date().toISOString().slice(0, 10);
  const url = "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ cui: Number(cui), data: today }]),
      next: { revalidate: 0 },
    });
    if (!res.ok) return { error: "ANAF nu a răspuns. Încearcă mai târziu." };

    const json = (await res.json()) as {
      found?: Array<{
        date_generale?: { cui?: number; denumire?: string; adresa?: string };
        inregistrare_scop_Tva?: { scpTVA?: boolean };
      }>;
    };
    const row = json.found?.[0];
    const g = row?.date_generale;
    if (!g?.denumire) return { error: "CUI-ul nu e în registrul ANAF." };

    return {
      cui,
      name: g.denumire,
      address: g.adresa ?? null,
      vatPayer: Boolean(row?.inregistrare_scop_Tva?.scpTVA),
    };
  } catch {
    return { error: "Nu am putut contacta ANAF." };
  }
}
