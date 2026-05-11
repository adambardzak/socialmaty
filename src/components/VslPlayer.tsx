"use client";

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

export default function VslPlayer({ bunny, youtubeId, src, poster, title = "Trénink zdarma" }: Props) {
  if (bunny) {
    return (
      <div className="rounded-2xl relative w-full aspect-video overflow-hidden border border-line bg-black shadow-[0_0_60px_rgba(22,163,74,0.08)]">
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
      <div className="rounded-2xl relative w-full aspect-video overflow-hidden border border-line bg-black">
        <video
          className="absolute inset-0 h-full w-full"
          src={src}
          poster={poster}
          controls
          preload="metadata"
          playsInline
        >
          Tvůj prohlížeč neumí přehrát video.
        </video>
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
