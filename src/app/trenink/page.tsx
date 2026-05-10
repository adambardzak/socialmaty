import Image from "next/image";
import Logo from "@/components/Logo";
import VslPlayer from "@/components/VslPlayer";

export const metadata = {
  title: "Trénink zdarma · Jak získat +10K sledujících na Instagramu",
  description:
    "27 minut tréninku od Matyáše Lindy. Konkrétní systém 5–8 sek. videí, který nasbíral 30M+ organických zhlédnutí.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams?: { name?: string; email?: string };
}

export default function TreninkPage({ searchParams }: PageProps) {
  const firstName = (searchParams?.name || "").trim().split(" ")[0];

  const bunny = process.env.NEXT_PUBLIC_TRAINING_BUNNY;
  const ytId = process.env.NEXT_PUBLIC_TRAINING_YT_ID;
  const videoSrc = process.env.NEXT_PUBLIC_TRAINING_VIDEO_URL || "/trenink_zdarma_720p.mp4";

  return (
    <>
      <header className="container-page py-6 border-b border-line">
        <Logo />
      </header>

      <section className="container-page py-12 sm:py-16 max-w-5xl">
        <div data-reveal>
          <p className="badge-accent">— Trénink zdarma · 27 minut</p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {firstName ? `${firstName}, ` : ""}vítej. Pusť si{" "}
            <span className="text-accent">trénink</span>.
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted">
            Tohle je kompletní 27minutový trénink. Ukážu ti přesný systém 5–8 sekundových
            videí, který jsem použil k 30M+ organickým zhlédnutím. Vezmi si tužku a papír —
            půjdeme do hloubky.
          </p>
        </div>

        {/* VIDEO */}
        <div className="mt-10" data-reveal data-reveal-delay="1">
          <VslPlayer
            bunny={bunny}
            youtubeId={!bunny ? ytId : undefined}
            src={!bunny && !ytId ? videoSrc : undefined}
            poster="/vsl-poster.webp"
            title="Trénink zdarma — Jak získat +10K sledujících"
          />
        </div>

        {/* MATY note */}
        <div
          className="mt-12 surface-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
          data-reveal
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-ink">
            <Image
              src="/img/maty.webp"
              alt="Matyáš Linda"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <p className="eyebrow">— Krátká zpráva</p>
            <p className="mt-3 text-base text-ink leading-relaxed">
              „Děkuju, že sis udělal/a čas. Pokud ti trénink dal hodnotu, pošli mi zprávu na
              Instagram{" "}
              <a
                href="https://instagram.com/socialmaty"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                @socialmaty
              </a>{" "}
              — odpovím osobně. Brzo ti pošlu pár dalších tipů emailem.“
            </p>
            <p className="mt-3 font-display font-bold">— Matyáš Linda</p>
          </div>
        </div>

        {/* Tech help */}
        <p className="mt-10 text-sm text-muted text-center" data-reveal>
          🔒 Pokud video nejede, napiš na{" "}
          <a href="mailto:matyas@socialmaty.cz" className="text-ink underline">
            matyas@socialmaty.cz
          </a>{" "}
          a hned to vyřeším.
        </p>
      </section>
    </>
  );
}
