export type ClearingOffer = {
  id: string;
  user_id: string;
  gives: string;
  wants: string;
  status: "open" | "matched" | "closed";
  created_at: string;
};

export type LedgerEntry = {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  expires_at: string | null;
  created_at: string;
};

export type PriceStat = {
  type: string;
  label: string;
  emoji: string;
  count: number;
  avg: number;
  min: number;
  max: number;
};

export function tokens(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/i)
    .filter((w) => w.length >= 3);
}

export function offersMatch(a: ClearingOffer, b: ClearingOffer) {
  if (a.user_id === b.user_id) return false;
  const aGives = tokens(a.gives);
  const aWants = tokens(a.wants);
  const bGives = tokens(b.gives);
  const bWants = tokens(b.wants);
  const hit = (need: string[], have: string[]) =>
    need.some((w) => have.includes(w));
  return hit(aWants, bGives) || hit(bWants, aGives);
}
