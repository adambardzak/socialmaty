import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import VslPlayer from "@/components/VslPlayer";
import FAQ from "@/components/FAQ";
import CaseStudiesCarousel from "@/components/CaseStudiesCarousel";
import { MembersVysledkyCarousel, MembersRecenzeCarousel } from "@/components/MembersResultsCarousel";
import StickyCta from "@/components/StickyCta";

export const metadata = {
  title: "Growmat Systém® · Projekt Organika",
  description:
    "3 dny. Konkrétní výstupy. Moje osobní zpětná vazba. Online trénink, který Tě posune z bodu „vím, že to funguje“ do bodu „mám systém, který funguje pro mě“.",
};

interface PageProps {
  searchParams?: { name?: string; email?: string };
}

const cases = [
  {
    handle: "@vermionekremy",
    before: "/img/case-studies/vermione-pred.webp",
    after: "/img/case-studies/vermione-po.webp",
    result: "Z 0 na 13K+ sledujících",
    niche: "kosmetika",
  },
  {
    handle: "@celiso.cz",
    before: "/img/case-studies/celiso-pred.webp",
    after: "/img/case-studies/celiso-po-1.webp",
    result: "10K+ sledujících · 20+ klientů za 40 dní",
    niche: "zdraví",
  },
  {
    handle: "@jidlosmartinem",
    before: "/img/case-studies/martin-pred.webp",
    after: "/img/case-studies/martin-po.webp",
    result: "Z 0 na 17K+ sledujících",
    niche: "jídlo",
  },
  {
    handle: "@zmenasgabi",
    before: "/img/case-studies/gabi-pred.webp",
    after: "/img/predapo/GABIPO.png",
    result: "Růst od nuly do 5K+",
    niche: "změna životního stylu",
  },
  {
    handle: "@mitolife_cz",
    before: "/img/case-studies/mitolife-pred.webp",
    after: "/img/case-studies/mito-po.webp",
    result: "Z 5 na 45K+ sledujících",
    niche: "energie a regenerace",
  },
  {
    handle: "@soberboys.podcast",
    before: "/img/case-studies/sober-pred-1-1.webp",
    after: "/img/case-studies/sober-boys-po.webp",
    result: "Podcast z 0 na 15k+ sledujících",
    niche: "podcast",
  },
  {
    handle: "@socialmaty",
    before: "/img/case-studies/socialmaty-pred-1.webp",
    after: "/img/case-studies/maty-po.webp",
    result: "Vlastní Matyášův účet",
    niche: "Instagram",
  },
  // {
  //   handle: "@zijulip",
  //   before: "/img/predapo/zijulip-pred.jpg",
  //   after: "/img/case-studies/marie-po.webp",
  //   result: "Růst sledujících od nuly",
  //   niche: "lifestyle",
  // },
  {
    handle: "@vasekjindrich",
    before: "/img/predapo/vasek-pred.jpg",
    after: "/img/case-studies/vasek-po.webp",
    result: "+70k sledujících za 3 měsíce",
    niche: "niche marketing",
  },
];

const reviews = [
  "/img/recenze/navrh-bez-nazvu-3.png",
  "/img/recenze/img-2755-1.webp",
  "/img/recenze/img-4563.webp",
  "/img/recenze/img-6931-1.webp",
  "/img/recenze/recenze-5.webp",
  "/img/recenze/recenze-6.webp",
  "/img/recenze/snimek-obrazovky-2026-04-05-v-23-44-20.webp",
];

export default function SystemPage({ searchParams }: PageProps) {
  const prefill = {
    name: searchParams?.name ?? "",
    email: searchParams?.email ?? "",
  };

  const bunny = process.env.NEXT_PUBLIC_TRAINING_BUNNY;
  const ytId = process.env.NEXT_PUBLIC_TRAINING_YT_ID;
  const videoSrc = process.env.NEXT_PUBLIC_TRAINING_VIDEO_URL || "/trenink_zdarma_720p.mp4";

  return (
    <>
      <StickyCta href="#nabidka" label="Vstoupit za 697 Kč" source="trenink" />

      {/* SECTION 1: HERO + VIDEO */}
      <section className="container-page pt-16 pb-12 text-center">
        <Image
          src="/growmat_logo.png"
          alt="Growmat Systém®"
          width={720}
          height={200}
          priority
          className="mx-auto h-12 sm:h-14 lg:h-16 w-auto object-contain"
          data-reveal
        />
        <h1
          className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight sr-only"
          data-reveal
        >
          Growmat Systém®
        </h1>
        <p
          className="mt-6 max-w-3xl mx-auto font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-center"
          data-reveal
          data-reveal-delay="1"
        >
          Získej <span className="text-accent">+10 000 sledujících</span> a{" "}
          <span className="text-accent">prvních 100 000</span> z Instagramu pomocí{" "}
          <span className="text-accent">5–8 sek. videí</span>
        </p>
        <p
          className="mt-4 max-w-3xl mx-auto font-display text-lg sm:text-2xl text-ink leading-snug text-center"
          data-reveal
          data-reveal-delay="1"
        >
          Bez agentury, reklamy, štěstí a jen s telefonem.
        </p>

        <div className="mt-10 max-w-4xl mx-auto" data-reveal data-reveal-delay="2">
          <p className="text-sm">↓pusť si trénink zdarma↓</p>
          <VslPlayer
            bunny={bunny}
            youtubeId={!bunny ? ytId : undefined}
            src={!bunny && !ytId ? videoSrc : undefined}
            poster="/video_cover.png"
            title="Growmat Systém®"
          />
          <p className="mt-4 text-sm text-muted">
            💡{" "}
            <span className="text-ink font-semibold">Pod videem na Tebe čeká jedinečná nabídka.</span>{" "}
            Sleduj video do konce.
          </p>
        </div>
      </section>

      {/* PS SEKCE */}
      <section className="container-page pb-16 max-w-2xl mx-auto">
        <div className="rounded-2xl border border-line bg-white p-8 space-y-5">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">
            🤫 PS: Mám pro Tebe jedinečnou nabídku{" "}
            <span className="text-muted font-semibold text-xl">(40/100 obsazeno)</span>
          </h2>

          <p className="text-ink">Můžeš teď udělat 2 věci:</p>

          <div className="space-y-4">
            <p className="text-ink">
              <strong>1.</strong> Zavřít tuhle stránku, vrátit se za týden a zjistit, že{" "}
              <strong>profil pořád stojí na místě</strong>.
            </p>
            <p className="text-ink">
              <strong>2.</strong> Připojit se k 40 lidem, kteří už jsou v{" "}
              <strong>Projekt Organika</strong> – a{" "}
              <strong>za 3 dny</strong> můžeš mít{" "}
              <strong>1 000 sledujících navíc</strong> a{" "}
              <strong>milion zhlédnutí</strong>.
            </p>
          </div>

          <p className="text-ink">
            <strong>Osobní zpětná vazba každý den.</strong>{" "}
            <strong>Konkrétní kroky. Jasný systém.</strong>
          </p>

          <p className="text-ink">
            100 míst. <strong>40 už je pryč.</strong>
          </p>

          <p className="text-ink">
            Až bude obsazeno, <strong>zavřu to</strong>. Zajisti si místo níže 👇
          </p>

          <div className="pt-2">
            <a
              href="https://projektorganika.cz"
              className="inline-block w-full text-center rounded-xl bg-accent px-8 py-4 font-display font-extrabold text-white text-lg hover:bg-accent/90 transition-colors"
            >
              CHCI VĚDĚT VÍC
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function PainItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-rose-500 text-white text-xs font-bold">
        ✕
      </span>
      <span>{children}</span>
    </li>
  );
}

function Member({
  tag,
  headline,
  body,
  note,
}: {
  tag: string;
  headline: string;
  body: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6" data-reveal>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-700">{tag}</p>
      <p className="mt-3 font-display text-xl font-bold leading-snug">{headline}</p>
      <p className="mt-3 text-ink">{body}</p>
      <p className="mt-3 text-sm italic text-muted">{note}</p>
    </div>
  );
}

function Day({
  num,
  title,
  tagline,
  bullets,
}: {
  num: string;
  title: string;
  tagline: string;
  bullets: string[];
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-6 border-l-2 border-accent pl-6">
      <p className="font-display text-5xl font-extrabold text-accent leading-none">{num}</p>
      <div>
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        <p className="mt-2 text-muted">{tagline}</p>
        <ul className="mt-4 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-ink">
              <span className="text-accent">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Bonus({
  n,
  title,
  value,
  body,
}: {
  n: string;
  title: string;
  value: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5" data-reveal>
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Bonus · {n}
        </p>
        <span className="font-mono text-xs whitespace-nowrap text-accent-700">{value}</span>
      </div>
      <p className="mt-2 font-display font-bold leading-snug">🎁 {title}</p>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
