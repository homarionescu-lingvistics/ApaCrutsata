"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Loader2 } from "lucide-react";
import { saveListingDraft } from "@/components/piata/create-listing-form";
import type { ListingDraft } from "@/lib/listings/types";

type SpeechRecognitionCtor = new () => {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((ev: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function VoiceBar() {
  const router = useRouter();
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [hint, setHint] = useState("Spune ce vinzi sau ce cauți");

  async function sendTranscript(transcript: string) {
    setProcessing(true);
    setHint("Gemini procesează…");
    try {
      const res = await fetch("/api/ai/voice-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Eroare");
      saveListingDraft(data.draft as ListingDraft);
      setHint("Gata! Completează și publică.");
      router.push("/piata");
    } catch (e) {
      setHint(e instanceof Error ? e.message : "Eroare voce");
    } finally {
      setProcessing(false);
      setListening(false);
    }
  }

  function startListening() {
    const SR = getSpeechRecognition();
    if (!SR) {
      const text = window.prompt("Scrie anunțul (microfon indisponibil):");
      if (text?.trim()) void sendTranscript(text.trim());
      return;
    }

    const rec = new SR();
    rec.lang = "ro-RO";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setListening(true);
    setHint("Ascult… vorbește acum");

    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript;
      void sendTranscript(transcript);
    };
    rec.onerror = () => {
      setListening(false);
      setHint("Nu am auzit. Încearcă din nou.");
    };
    rec.onend = () => setListening(false);
    rec.start();
  }

  const busy = listening || processing;

  return (
    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
      <button
        type="button"
        onClick={startListening}
        disabled={busy}
        aria-label="Microfon Gemini"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <Mic className="h-5 w-5" aria-hidden />
        )}
      </button>
      <p className="text-xs leading-snug text-slate-400">{hint}</p>
    </div>
  );
}
