"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

interface Props {
  /** Show the urgency stripe at the very top */
  urgency?: boolean;
}

export default function Header({ urgency = true }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {urgency && (
        <div className="bg-ink text-white">
          <div className="container-page py-2 text-center text-[12px] sm:text-[13px] font-mono tracking-tight">
            <span className="text-accent-400">⏰ První vlna:</span>{" "}
            <span className="font-semibold">100 míst za 697 Kč.</span>{" "}
            <span className="text-white/70">Pak 997 Kč.</span>
          </div>
        </div>
      )}
      <div
        className={
          "transition-colors duration-200 " +
          (scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-line"
            : "bg-white/0 border-b border-transparent")
        }
      >
        <div className="container-page flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" aria-label="Domů">
            <Logo />
          </Link>
          <Link
            href="/system"
            className="hidden sm:inline-flex font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:text-accent-700"
          >
            Projekt Organika →
          </Link>
        </div>
      </div>
    </header>
  );
}
