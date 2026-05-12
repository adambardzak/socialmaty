"use client";

import { useRef, useState } from "react";

interface Props {
  /**
   * Bunny.net Stream library + video ID, format: "<libraryId>/<videoId>".
   * Highest priority — when set, renders Bunny iframe with custom player.
   */
  bunny?: string;
  /** YouTube video ID. */
  youtubeId?: string;
  /** Direct mp4/HLS URL fallback. */
  src?: string;
  poster?: string;
  title?: string;
}

function PlayBadge() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="absolute h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-accent/30" />
      <span className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-700 shadow-[0_0_60px_rgba(0,209,65,0.45)]">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          aria-hidden="true"
          className=""
        >
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      </span>
    </div>
  );
}

export default function VslPlayer({ bunny, youtubeId, src, poster, title = "Trénink zdarma" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  if (bunny) {
    return (
      <div className="rounded-2xl relative w-full aspect-video overflow-hidden border border-line bg-black shadow-[0_0_60px_rgba(0,209,65,0.12)]">
        <iframe
          src={`https://iframe.mediadelivery.net/embed/${bunny}?autoplay=false&muted=false&preload=true&responsive=true`}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  if (youtubeId) {
    return (
      <div className="rounded-2xl relative w-full aspect-video overflow-hidden border border-line bg-black">
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
      <div className="rounded-2xl relative w-full aspect-video overflow-hidden border border-line bg-black shadow-[0_0_60px_rgba(0,209,65,0.12)]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full"
          src={src}
          poster={poster}
          controls={started}
          preload="metadata"
          playsInline
          onPlay={() => { setStarted(true); setPlaying(true); }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        >
          Tvůj prohlížeč neumí přehrát video.
        </video>
        {!started && (
          <button
            type="button"
            aria-label="Přehrát video"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.play();
            }}
            className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none"
          >
            <PlayBadge />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl relative w-full aspect-video border border-line bg-surface flex items-center justify-center">
      <div className="text-center px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-700">
          Video placeholder
        </p>
        <p className="mt-2 font-display font-semibold text-ink">{title}</p>
        <p className="mt-2 text-sm text-muted">
          Nastav v <code className="font-mono">.env.local</code> proměnnou{" "}
          <code className="font-mono">NEXT_PUBLIC_TRAINING_BUNNY</code> (libraryId/videoId),{" "}
          <code className="font-mono">NEXT_PUBLIC_TRAINING_YT_ID</code> nebo{" "}
          <code className="font-mono">NEXT_PUBLIC_TRAINING_VIDEO_URL</code>.
        </p>
      </div>
    </div>
  );
}
