"use client";

import { useState } from "react";

interface Props {
  label?: string;
  className?: string;
  /**
   * Optional name/email passed via URL params (from Page #1) — Stripe pre-fills email.
   */
  prefill?: { name?: string; email?: string };
}

export default function CheckoutButton({
  label = "Zajistit místo za 697 Kč →",
  className = "btn-primary w-full",
  prefill,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: prefill?.email, name: prefill?.name }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Checkout se nepodařilo otevřít.");
      }
      window.location.href = data.url;
    } catch (err: any) {
      setError(err?.message ?? "Něco se pokazilo.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={onClick} disabled={loading} className={className}>
        {loading ? "Otevírám platbu…" : label}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
