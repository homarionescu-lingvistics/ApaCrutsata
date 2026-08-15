"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Loader2, Send } from "lucide-react";
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
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function sendTranscript(transcript: string) {
    const t = transcript.trim();
    if (t.length < 5) {
      setStatus("Scrie sau spune ceva mai concret.");
      return;
    }
    setProcessing(true);
    setStatus("Gemini procesează…");
    try {
      const res = await fetch("/api/ai/voice-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: t }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Eroare");
      const draft = data.draft as ListingDraft;
      saveListingDraft(draft);
      setText("");
      setStatus("Gata! Completează și publică.");
      const blob = `${draft.title ?? ""} ${draft.description ?? ""}`;
      const logistics =
        draft.type === "asset" ||
        draft.type === "request" ||
        (draft.type === "service" && /transport|remorc|tractor|mutat|livrat/i.test(blob));
      router.push(logistics ? "/logistica" : "/piata");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Eroare voce");
    } finally {
      setProcessing(false);
      setListening(false);
    }
  }

  function startListening() {
    const SR = getSpeechRecognition();
    if (!SR) {
      setStatus("Microfonul funcționează în Chrome/Safari pe telefon. Până atunci poți scrie în câmp.");
      return;
    }
    const rec = new SR();
    rec.lang = "ro-RO";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setListening(true);
    setStatus("Ascult… vorbește acum");
    rec.onresult = (ev) => {
      const transcript = ev.results[0][0].transcript;
      setText(transcript);
      void sendTranscript(transcript);
    };
    rec.onerror = () => {
      setListening(false);
      setStatus("Nu am auzit. Scrie în câmp sau încearcă din nou.");
    };
    rec.onend = () => setListening(false);
    rec.start();
  }

  const busy = listening || processing;

  return (
    <form
      className="mt-3 space-y-1"
      onSubmit={(e) => {
        e.preventDefault();
        void sendTranscript(text);
      }}
    >
      <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-2 py-1.5">
        <button
          type="button"
          onClick={startListening}
          disabled={busy}
          aria-label="Microfon"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Scrie aici ce cauți…"
          aria-label="Caută sau descrie oferta"
          autoComplete="off"
          disabled={busy}
          className="h-11 min-w-0 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || text.trim().length < 5}
          aria-label="Trimite"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      {status ? <p className="px-1 text-[11px] text-slate-500">{status}</p> : null}
    </form>
  );
}
