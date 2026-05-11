const ARMS = 24;

export function SpiralMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" />
      {Array.from({ length: ARMS }).map((_, i) => (
        <path
          key={i}
          d="M 50 50 A 32 32 0 0 1 50 4"
          transform={`rotate(${(i * 360) / ARMS} 50 50)`}
        />
      ))}
    </svg>
  );
}

export default function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const iconClass =
    size === "sm" ? "w-6 h-6 md:w-7 md:h-7" : "w-7 h-7 md:w-9 md:h-9";
  const textClass =
    size === "sm" ? "text-[13px] md:text-sm" : "text-base md:text-xl";

  return (
    <span className={`inline-flex items-center gap-2 md:gap-2.5 ${className}`}>
      <SpiralMark className={`${iconClass} text-ink shrink-0`} />
      <span
        className={`bg-gradient-to-t from-accent to-ink bg-clip-text text-transparent font-bold tracking-[0.06em] leading-none ${textClass}`}
      >
        PROJEKT ORGANIKA
      </span>
    </span>
  );
}
