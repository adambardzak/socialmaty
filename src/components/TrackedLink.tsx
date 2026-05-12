"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

interface Props {
  href: string;
  external?: boolean;
  source: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

export default function TrackedLink({
  href,
  external,
  source,
  label,
  className = "block",
  children,
}: Props) {
  const handleClick = () => {
    track("link_click", { source, label, href });
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
