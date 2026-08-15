import { generateJson } from "@/lib/ai/gemini";

export type RiskReport = {
  level: "green" | "yellow" | "red";
  summary: string;
  tips: string[];
};

export async function simulateRisk(idea: string): Promise<RiskReport> {
  return generateJson<RiskReport>(
    `Consultant IMM România. Idee: """${idea}"""
Evaluează riscul de faliment din sondaje incomplete (oamenii zic da dar nu cumpără).
JSON: { "level": "green"|"yellow"|"red", "summary": "1-2 propoziții RO", "tips": ["...", "..."] }
Max 3 tips, română simplă.`
  );
}
