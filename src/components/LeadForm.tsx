"use client";

import { useState } from "react";

interface Props {
  source: string;
  buttonLabel?: string;
  redirectTo?: string;
  variant?: "default" | "compact";
}

export default function LeadForm({
  source,
  buttonLabel = "Chci trénink zdarma →",
  redirectTo = "/trenink",
  variant = "default",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Potvrď prosím souhlas se zpracováním údajů.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source, consent }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Něco se pokazilo, zkus to prosím znovu.");
      }
      const params = new URLSearchParams({ name, email });
      window.location.href = `${redirectTo}?${params.toString()}`;
    } catch (err: any) {
      setError(err?.message ?? "Nepodařilo se odeslat formulář.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        required
        placeholder="Tvoje jméno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
        autoComplete="given-name"
      />
      <input
        type="email"
        required
        placeholder="Tvůj email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
        autoComplete="email"
      />
      <label className="flex items-start gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-accent"
        />
        <span>
          Souhlasím se zpracováním osobních údajů a zasíláním tréninkových materiálů na uvedený
          email.
        </span>
      </label>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Odesílám…" : buttonLabel}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {variant === "default" && (
        <p className="text-xs text-muted text-center">🔒 Žádný spam. Odhlásit se můžeš kdykoliv.</p>
      )}
    </form>
  );
}
