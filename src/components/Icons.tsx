// Shared SVG icons — matches projektorganika.cz visual language.

interface IconProps {
  size?: number;
  className?: string;
  stroke?: string;
}

export function ArrowRight({ size = 20, className, stroke = "#00d141" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface CheckCircleProps {
  size?: number;
  className?: string;
}

export function CheckCircle({ size = 20, className }: CheckCircleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="11" fill="#00d141" />
      <path
        d="M7.5 12.5l3 3 6-6.5"
        stroke="#0a120b"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StarProps {
  size?: number;
  className?: string;
  fill?: string;
}

export function Star({ size = 14, className, fill = "#e2a84b" }: StarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
