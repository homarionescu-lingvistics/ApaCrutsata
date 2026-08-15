import { generateJson } from "@/lib/ai/gemini";

export type SurveyFollowup = {
  questions: string[];
  warning: string | null;
};

export async function followUpSurvey(wish: string, city: string): Promise<SurveyFollowup> {
  return generateJson<SurveyFollowup>(
    `Ești consultant hiperlocal RO. Dorință: "${wish}" în ${city || "România"}.
Pune EXACT 2 întrebări scurte (preț + obicei de cumpărare) ca să nu rămână un vot gol.
Dacă e risc clasic (petshop vrac, magazin lângă lanț), pune warning o propoziție, altfel null.
JSON: { "questions": ["...", "..."], "warning": string|null }`
  );
}
