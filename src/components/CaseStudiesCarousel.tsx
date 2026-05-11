"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NavArrowDown } from "iconoir-react";

export interface CaseStudy {
  handle: string;
  before: string;
  after: string;
  result: string;
  niche?: string;
}

interface Props {
  cases: CaseStudy[];
}

export default function CaseStudiesCarousel({ cases }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardW = card.getBoundingClientRect().width + 20;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + cardW;
      el.scrollTo({ left: next > maxScroll - 4 ? 0 : next, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(id);
  }, [paused]);

  // Pause on user interaction
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onUser = () => {
      setPaused(true);
      setTimeout(() => setPaused(false), 6000);
    };
    el.addEventListener("pointerdown", onUser);
    el.addEventListener("wheel", onUser, { passive: true });
    el.addEventListener("touchstart", onUser, { passive: true });
    const onScroll = () => {
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      const cardW = card.getBoundingClientRect().width + 20;
      setActiveIdx(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onUser);
      el.removeEventListener("wheel", onUser);
      el.removeEventListener("touchstart", onUser);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div>
      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
        style={{ scrollPadding: "0 24px" }}
      >
        {cases.map((c, i) => (
          <article
            key={c.handle + i}
            className="snap-start shrink-0 w-[78vw] max-w-[300px] surface-card overflow-hidden"
          >
            <div className="relative aspect-[9/16] bg-surface">
              <Image src={c.before} alt={`${c.handle} – před`} fill className="object-cover object-top" sizes="300px" />
              <span className="absolute top-2 left-2 badge bg-white/90">PŘED</span>
            </div>
            <div className="flex justify-center py-2 bg-accent-50">
              <NavArrowDown className="h-5 w-5 text-accent-700" aria-hidden />
            </div>
            <div className="relative aspect-[9/16] bg-surface">
              <Image src={c.after} alt={`${c.handle} – po`} fill className="object-cover object-top" sizes="300px" />
              <span className="absolute top-2 left-2 badge-accent">PO</span>
            </div>
            <div className="p-4 border-t border-line">
              <p className="font-mono text-[11px] text-muted">{c.handle}</p>
              <p className="mt-1 font-display font-bold text-accent-700 leading-tight">
                {c.result}
              </p>
              {c.niche && <p className="mt-1 text-xs text-muted">{c.niche}</p>}
            </div>
          </article>
        ))}
      </div>
      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {cases.map((_, i) => (
          <span
            key={i}
            className={
              "h-1.5 transition-all " +
              (i === activeIdx ? "w-8 bg-accent" : "w-1.5 bg-line")
            }
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
