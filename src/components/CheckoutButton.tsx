"use client";

import { track } from "@vercel/analytics";
import { ArrowRight } from "./Icons";

interface Props {
  label?: string;
  className?: string;
  /**
   * Optional prefill — kept for API compatibility with old call sites.
   * Not used: Circle paywall handles checkout (email collected on its page).
   */
  prefill?: { name?: string; email?: string };
  /**
   * Where on the page/site this button is rendered. Used for analytics.
   */
  source?: string;
}

export const CIRCLE_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_CIRCLE_CHECKOUT_URL ||
  "https://growmatacademy.circle.so/checkout/-projekt-organikar";

export default function CheckoutButton({
  label = "Zajistit místo za 697 Kč",
  className = "btn-primary w-full",
  source = "unknown",
}: Props) {
  return (
    <a
      href={CIRCLE_CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        track("checkout_click", { source, label });
      }}
    >
      {label}
      <ArrowRight />
    </a>
  );
}
