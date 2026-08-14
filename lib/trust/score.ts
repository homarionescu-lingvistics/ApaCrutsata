export function trustLabel(score: number) {
  if (score >= 80) return { name: "Stație totală", hint: "Dovezi, nu vorbe" };
  if (score >= 60) return { name: "Combinator cinstit", hint: "Handshake-uri ținute" };
  if (score >= 40) return { name: "În lucru", hint: "Mai confirmă predări" };
  return { name: "Nou venit", hint: "Pornești de la 50" };
}

export function clampScore(score: number) {
  return Math.min(100, Math.max(0, Math.round(score)));
}
