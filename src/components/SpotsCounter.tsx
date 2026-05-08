"use client";

import { useEffect, useState } from "react";

interface CounterData {
  sold: number;
  remaining: number;
  limit: number;
  priceCzk: number;
}

export default function SpotsCounter({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "inline";
}) {
  const [data, setData] = useState<CounterData | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/counter", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as CounterData;
        if (active) setData(json);
      } catch {
        // ignore
      }
    }
    load();
    const interval = setInterval(load, 30_000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (!data) {
    return (
      <div className={`text-sm text-muted ${className}`}>Načítám aktuální dostupnost…</div>
    );
  }

  const soldOut = data.remaining <= 0;
  const pct = Math.min(100, (data.sold / data.limit) * 100);

  if (variant === "inline") {
    return (
      <p className={`font-mono text-sm text-ink ${className}`}>
        {soldOut ? (
          <>První vlna vyprodána · Cena nyní {data.priceCzk} Kč</>
        ) : (
          <>
            Volno: <span className="font-semibold">{data.remaining}</span> / {data.limit} míst za{" "}
            {data.priceCzk} Kč
          </>
        )}
      </p>
    );
  }

  return (
    <div className={`border border-line bg-white p-5 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-700">
          Aktuální dostupnost
        </p>
        <p className="font-mono text-sm">
          {soldOut ? (
            <span className="text-red-600">První vlna vyprodána</span>
          ) : (
            <span>
              <span className="font-semibold text-ink">{data.remaining}</span>
              <span className="text-muted"> / {data.limit} míst</span>
            </span>
          )}
        </p>
      </div>
      <div className="mt-3 h-1.5 w-full bg-line">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
      <p className="mt-3 text-sm text-muted">
        Aktuální cena{" "}
        <span className="font-semibold text-ink">{data.priceCzk} Kč</span>
        {!soldOut && <> · Po naplnění první vlny zdražujeme na 997 Kč.</>}
      </p>
    </div>
  );
}
