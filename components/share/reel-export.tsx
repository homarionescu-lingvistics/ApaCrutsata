"use client";

import { useRef, useState } from "react";
import { drawReel, type ReelPayload } from "@/lib/share/draw-reel";
import { Button } from "@/components/ui/button";

export function ReelExport({ payload }: { payload: ReelPayload }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [chroma, setChroma] = useState(false);

  function render(green: boolean) {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawReel(ctx, canvas.width, canvas.height, payload, green);
  }

  function download() {
    render(chroma);
    const canvas = ref.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `crutsanimia-${chroma ? "green" : "story"}.png`;
    a.click();
  }

  return (
    <div className="space-y-2">
      <canvas ref={ref} width={1080} height={1920} className="hidden" />
      <label className="flex items-center gap-2 text-xs text-slate-400">
        <input
          type="checkbox"
          checked={chroma}
          onChange={(e) => setChroma(e.target.checked)}
        />
        Fundal verde (Instagram Reels)
      </label>
      <Button type="button" variant="ghost" className="w-full" onClick={download}>
        Descarcă story 9:16
      </Button>
    </div>
  );
}
