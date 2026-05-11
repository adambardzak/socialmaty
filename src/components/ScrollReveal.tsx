"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mount this once in the page tree. It scans for `[data-reveal]` elements
 * and adds `.is-visible` when they enter the viewport. Re-scans on route
 * changes so client-side navigation works.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    // Fallback: any element already in viewport on mount becomes visible
    // even if IO is slow to fire (Safari quirk).
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
      }
      io.observe(el);
    });
    // Safety net: ensure everything becomes visible after 1.5s regardless.
    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        el.classList.add("is-visible");
      });
    }, 1500);
    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
