"use client";

import { useEffect, useState } from "react";

interface Props {
  href?: string;
  label?: string;
  /**
   * If provided, click triggers a custom handler instead of href navigation.
   */
  onClick?: () => void;
}

export default function StickyCta({ href = "#nabidka", label = "Vstoupit za 697 Kč", onClick }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={
        "md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 " +
        (show ? "translate-y-0" : "translate-y-full")
      }
    >
      <div className="bg-gradient-to-t from-white via-white to-transparent pt-6 pb-3 px-4">
        {onClick ? (
          <button onClick={onClick} className="btn-primary btn-primary-shimmer w-full">
            {label} →
          </button>
        ) : (
          <a href={href} className="btn-primary btn-primary-shimmer w-full">
            {label} →
          </a>
        )}
      </div>
    </div>
  );
}
