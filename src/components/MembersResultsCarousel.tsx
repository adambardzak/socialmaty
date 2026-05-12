"use client";

import { useEffect, useRef, useState } from "react";

interface Member {
  name: string;
  predapo?: string;
  views?: string[];
  recenze?: string[];
}

const members: Member[] = [
  {
    name: "Adam",
    predapo: "/members-results/adampredapo.png",
    views: ["/members-results/VIEWS/adamviews.jpeg"],
    recenze: [
      "/members-results/RECENZE/adamcash.jpeg",
      "/members-results/RECENZE/adamuspech.jpeg",
    ],
  },
  {
    name: "Tommy",
    predapo: "/members-results/tommypredapo.png",
    views: ["/members-results/VIEWS/tommyviews.jpeg"],
    recenze: ["/members-results/RECENZE/tommyuspech.jpg"],
  },
  {
    name: "Střeva",
    predapo: "/members-results/strevapredapo.png",
    views: ["/members-results/VIEWS/strevaviews.jpeg"],
    recenze: ["/members-results/RECENZE/strevauspech.jpeg"],
  },
  {
    name: "Lukáš",
    recenze: ["/members-results/RECENZE/lukasuspech.png"],
  },
];

function Carousel({ items }: { items: { srcs: string[]; key: string }[] }) {
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
    const pause = () => { pauseUntilRef.current = Date.now() + 6000; };

    const onScroll = () => {
      const step = getStep();
      if (!step) return;
      const idx = Math.round(el.scrollLeft / step);
      setActiveIdx(Math.max(0, Math.min(items.length - 1, idx)));
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
  }, [items.length]);

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
          {items.map((item, i) => (
            <article
              key={item.key}
              data-card
              className="snap-center shrink-0 w-[80vw] max-w-[340px] md:w-[340px]"
            >
              <div className="rounded-2xl border border-line bg-white overflow-hidden flex flex-col">
                {item.srcs.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-auto object-cover block"
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Přejít na slide ${i + 1}`}
            className={
              "h-1.5 rounded-full transition-all " +
              (i === activeIdx ? "w-8 bg-accent" : "w-1.5 bg-line hover:bg-muted")
            }
          />
        ))}
      </div>
    </div>
  );
}

// Carousel 1: výsledky (predapo + views), pouze členové kteří mají alespoň jedno
const vysledkyItems = members
  .filter((m) => m.predapo || (m.views && m.views.length > 0))
  .map((m) => ({
    key: m.name,
    srcs: [...(m.predapo ? [m.predapo] : []), ...(m.views ?? [])],
  }));

// Carousel 2: recenze, pouze členové kteří mají recenze
const recenzeItems = members
  .filter((m) => m.recenze && m.recenze.length > 0)
  .map((m) => ({
    key: m.name,
    srcs: m.recenze!,
  }));

export function MembersVysledkyCarousel() {
  return <Carousel items={vysledkyItems} />;
}

export function MembersRecenzeCarousel() {
  return <Carousel items={recenzeItems} />;
}
