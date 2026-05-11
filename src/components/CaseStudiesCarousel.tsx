"use client";

import { useEffect, useRef, useState } from "react";
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
  const pauseUntilRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const getStep = () => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      if (!card) return 0;
      return card.offsetWidth + 20;
    };

    const advance = () => {
      if (Date.now() < pauseUntilRef.current) return;
      const step = getStep();
      if (!step) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + step;
      el.scrollTo({ left: next > maxScroll - 4 ? 0 : next, behavior: "smooth" });
    };

    const interval = setInterval(advance, 4000);

    const pause = () => {
      pauseUntilRef.current = Date.now() + 6000;
    };

    const onScroll = () => {
      const step = getStep();
      if (!step) return;
      const idx = Math.round(el.scrollLeft / step);
      setActiveIdx(Math.max(0, Math.min(cases.length - 1, idx)));
    };

    el.addEventListener("pointerdown", pause);
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearInterval(interval);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("scroll", onScroll);
    };
  }, [cases.length]);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const step = card.offsetWidth + 20;
    pauseUntilRef.current = Date.now() + 6000;
    el.scrollTo({ left: step * i, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        <div className="flex gap-5 pb-4">
          {cases.map((c, i) => (
            <article
              key={c.handle + i}
              data-card
              className="snap-center shrink-0 w-[78vw] max-w-[300px] md:w-[300px]"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-full relative">
                  <img
                    src={c.before}
                    alt={`${c.handle} – před`}
                    loading="lazy"
                    className="w-full block"
                  />
                  <span className="absolute top-2 left-2 badge bg-white/90">PŘED</span>
                </div>
                <NavArrowDown className="h-6 w-6 text-accent" aria-hidden />
                <div className="w-full relative">
                  <img
                    src={c.after}
                    alt={`${c.handle} – po`}
                    loading="lazy"
                    className="w-full block"
                  />
                  <span className="absolute top-2 left-2 badge-accent">PO</span>
                </div>
                <div className="w-full p-4 border border-line bg-white">
                  <p className="font-mono text-[11px] text-muted">{c.handle}</p>
                  <p className="mt-1 font-display font-bold text-accent-700 leading-tight">
                    {c.result}
                  </p>
                  {c.niche && <p className="mt-1 text-xs text-muted">{c.niche}</p>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {cases.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Přejít na slide ${i + 1}`}
            className={
              "h-1.5 transition-all " +
              (i === activeIdx ? "w-8 bg-accent" : "w-1.5 bg-line hover:bg-muted")
            }
          />
        ))}
      </div>
    </div>
  );
}
