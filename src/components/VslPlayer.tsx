"use client";

import { useState } from "react";

interface Props {
  /** YouTube ID, Vimeo ID via src prop, or direct mp4 URL */
  src?: string;
  youtubeId?: string;
  poster?: string;
  title?: string;
}

export default function VslPlayer({ src, youtubeId, poster, title = "Trénink zdarma" }: Props) {
  const [started, setStarted] = useState(false);

  if (youtubeId) {
    return (
      <div className="relative w-full aspect-video bg-black border border-line">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (src) {
    return (
      <div className="relative w-full aspect-video bg-black border border-line">
        <video
          className="absolute inset-0 h-full w-full"
          src={src}
          poster={poster}
          controls
          preload="metadata"
          onPlay={() => setStarted(true)}
        >
          Tvůj prohlížeč neumí přehrát video.
        </video>
        {!started && (
          <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">
            ▶ {title}
          </div>
        )}
      </div>
    );
  }

  // Placeholder — when no video URL configured yet
  return (
    <div className="relative w-full aspect-video border border-line bg-surface flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-700">
          Video placeholder
        </p>
        <p className="mt-2 font-display font-semibold text-ink">{title}</p>
        <p className="mt-2 text-sm text-muted">
          Nastav <code className="font-mono">NEXT_PUBLIC_TRAINING_VIDEO_URL</code> nebo{" "}
          <code className="font-mono">NEXT_PUBLIC_TRAINING_YT_ID</code> v env.
        </p>
      </div>
    </div>
  );
}
