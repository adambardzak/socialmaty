import Image from "next/image";
import { ArrowRight, CheckCircle, Star } from "@/components/Icons";
import TrackedLink from "@/components/TrackedLink";

export const metadata = {
  title: "Socialmaty — Začni tady",
  description: "Tréninky, komunita a systém pro růst na Instagramu.",
  robots: { index: false, follow: true },
};

interface Item {
  href: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  external?: boolean;
}

const items: Item[] = [
  {
    href: "/optin",
    badge: "Trénink zdarma",
    title: "Získej +10 000 sledujících a prvních 100 000 Kč z Instagramu pomocí 5–8 sek. videí",
    description:
      "20 min trénink. Konkrétní systém 5–8 sek. videí, který nasbíral 30M+ organických zhlédnutí.",
    price: "Zdarma",
  },
  {
    href: "https://projektorganika.cz/",
    badge: "Placený kurz",
    title: "Projekt Organika",
    subtitle: "3denní minikurz",
    description:
      "3 dny · 3 konkrétní výstupy · osobní zpětná vazba.",
    price: "697 Kč",
  },
];

export default function StartPage() {
  return (
    <div className="container-page max-w-md py-10">
      {/* Profile */}
      <div className="flex flex-col items-center text-center" data-reveal>
        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-line">
          <Image
            src="/img/maty.webp"
            alt="Matyáš Linda"
            fill
            className="object-cover"
            sizes="96px"
            priority
          />
        </div>
        <h1 className="mt-4 flex items-center gap-2 font-bold text-xl">
          Matyáš Linda
          <CheckCircle size={20} />
        </h1>
        <p className="mt-1 text-sm text-muted">Zakladatel Growmat Academy</p>
      </div>

      {/* Experts pill */}
      <div className="mt-6 flex justify-center" data-reveal data-reveal-delay="1">
        <div className="flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={13} />
            ))}
          </div>
          <div className="h-3.5 w-px bg-line" />
          <div className="flex -space-x-1.5">
            {[
              { src: "/img/experti/vermione.png", alt: "Vermione" },
              { src: "/img/experti/martin.png", alt: "Martin" },
              { src: "/img/experti/celiso.png", alt: "Celiso" },
            ].map((e) => (
              <div
                key={e.alt}
                className="relative h-6 w-6 overflow-hidden rounded-full border-[1.5px] border-white bg-line"
              >
                <Image src={e.src} alt={e.alt} width={24} height={24} className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-[13px] font-semibold text-ink">50+ expertů</span>
        </div>
      </div>

      {/* Value ladder */}
      <div className="mt-10 space-y-4" data-reveal data-reveal-delay="2">
        <p>Pro začínající</p>
        {items.map((item) => (
          <ItemCard key={item.href} item={item} />
        ))}
      </div>

      {/* Instagram pill */}
      <div className="mt-10 flex justify-center" data-reveal>
        <a
          href="https://instagram.com/socialmaty"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 transition-colors hover:border-accent/40"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00d141"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="text-[13px] font-semibold text-ink">@socialmaty</span>
          <span className="text-[12px] text-muted">· sleduj na Instagramu</span>
        </a>
      </div>

      {/* Secondary */}
      <div
        className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted"
        data-reveal
      >
        <a href="mailto:matyas@socialmaty.cz" className="hover:text-ink">
          Kontakt
        </a>
        <a href="/obchodni-podminky" className="hover:text-ink">
          Obchodní podmínky
        </a>
        <a href="/ochrana-soukromi" className="hover:text-ink">
          Ochrana soukromí
        </a>
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: Item }) {
  const inner = (
    <div className="surface-card group p-5 transition hover:border-accent/40 hover:shadow-[0_0_40px_rgba(0,209,65,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold tracking-widest text-accent uppercase">
          {item.badge}
        </span>
        <span className="text-xs font-semibold text-ink">{item.price}</span>
      </div>
      <p className="mt-3 font-bold text-lg leading-tight">{item.title}</p>
      {item.subtitle && (
        <p className="mt-1 text-sm font-medium text-accent">{item.subtitle}</p>
      )}
      <p className="mt-1.5 text-sm text-muted leading-snug">{item.description}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink">
        <span>Otevřít</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );

  if (item.external) {
    return (
      <TrackedLink
        href={item.href}
        external
        source="start_linktree"
        label={item.title}
      >
        {inner}
      </TrackedLink>
    );
  }
  return (
    <TrackedLink href={item.href} source="start_linktree" label={item.title}>
      {inner}
    </TrackedLink>
  );
}
