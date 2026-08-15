import { createClient } from "@/lib/supabase/server";

export type Vital = { key: string; label: string; value: string; hint: string };

export async function getVitals(): Promise<Vital[]> {
  const supabase = createClient();
  const [{ count: listings }, { count: closed }, { count: handshakes }, { data: ledger }] =
    await Promise.all([
      supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("listings").select("*", { count: "exact", head: true }).eq("status", "closed"),
      supabase
        .from("handshakes")
        .select("*", { count: "exact", head: true })
        .not("confirmed_at", "is", null),
      supabase.from("ron_local_ledger").select("amount").limit(200),
    ]);

  const active = listings ?? 0;
  const done = closed ?? 0;
  const hs = handshakes ?? 0;
  const flow = (ledger ?? []).reduce((s, r) => s + Math.abs(r.amount ?? 0), 0);
  const localPct = active + done > 0 ? 100 : 0;

  return [
    {
      key: "local",
      label: "Scor localizare",
      value: `${localPct}%`,
      hint: "Anunțuri din rețeaua RO, nu import",
    },
    {
      key: "viteza",
      label: "Viteza circulație",
      value: `${flow} pct`,
      hint: "Puncte RON-Local mișcate (expiră 30 zile)",
    },
    {
      key: "isd",
      label: "Capital străin",
      value: "0 €",
      hint: "Micro-investiții — vezi /investors",
    },
    {
      key: "log",
      label: "Eficiență logistică",
      value: `${hs} curse`,
      hint: "Handshake-uri confirmate (km salvați la comun)",
    },
  ];
}
