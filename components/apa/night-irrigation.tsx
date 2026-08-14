"use client";

import { useEffect, useState } from "react";

function bucharestHour() {
  const h = new Intl.DateTimeFormat("ro-RO", {
    timeZone: "Europe/Bucharest",
    hour: "numeric",
    hour12: false,
  }).format(new Date());
  return Number(h);
}

function isNightWindow(hour: number) {
  return hour >= 22 || hour < 5;
}

export function NightIrrigation() {
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    setHour(bucharestHour());
    const id = setInterval(() => setHour(bucharestHour()), 60_000);
    return () => clearInterval(id);
  }, []);

  const night = hour != null && isNightWindow(hour);

  return (
    <div
      className={`rounded-2xl border p-4 ${
        night
          ? "border-emerald-500/40 bg-emerald-500/10"
          : "border-amber-500/30 bg-amber-500/10"
      }`}
    >
      <p className="text-sm font-semibold text-slate-100">Irigație nocturnă</p>
      <p className="mt-1 text-2xl font-bold">
        {hour == null ? "…" : night ? "Uda ACUM" : "Așteaptă noaptea"}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {night
          ? "E între 22:00 și 05:00. Evaporare mică."
          : "Ziua pierzi ~60% din apă pe căldură. Revino după 22:00."}
      </p>
    </div>
  );
}
