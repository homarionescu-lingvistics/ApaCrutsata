"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type PromptEvent = Event & { prompt: () => Promise<void> };

export function InstallBanner() {
  const [evt, setEvt] = useState<PromptEvent | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as PromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!evt || done) return null;

  return (
    <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2">
      <p className="flex-1 text-xs text-slate-300">Pune app-ul pe ecranul telefonului.</p>
      <Button
        type="button"
        className="shrink-0"
        onClick={async () => {
          await evt.prompt();
          setDone(true);
        }}
      >
        Instalează
      </Button>
    </div>
  );
}
