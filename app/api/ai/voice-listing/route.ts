import { NextResponse } from "next/server";
import { parseVoiceToListing } from "@/lib/ai/voice-listing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const transcript = String(body.transcript ?? "").trim();

    if (transcript.length < 5) {
      return NextResponse.json(
        { error: "Spune ceva mai concret (min. 5 caractere)." },
        { status: 400 }
      );
    }

    const draft = await parseVoiceToListing(transcript);
    return NextResponse.json({ ok: true, draft });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare Gemini";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
