import { simulateRisk } from "@/lib/ai/risk";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idea?: string };
    const idea = String(body.idea ?? "").trim();
    if (idea.length < 8) {
      return Response.json({ ok: false, message: "Descrie ideea (min. 8 caractere)." }, { status: 400 });
    }
    const report = await simulateRisk(idea);
    return Response.json({ ok: true, report });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Eroare Gemini";
    return Response.json({ ok: false, message }, { status: 500 });
  }
}
