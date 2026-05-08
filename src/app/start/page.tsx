import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Socialmaty — Začni tady",
  description: "Tréninky, komunita a systém pro růst na Instagramu.",
  robots: { index: false, follow: true },
};

interface Item {
  href: string;
  badge?: string;
  title: string;
  price?: string;
  description: string;
  external?: boolean;
}

const items: Item[] = [
  {
    href: "/",
    badge: "ZDARMA",
    title: "Trénink: Jak získat +10K sledujících",
    price: "Zdarma",
    description: "20 min · 5–8 sek. video formát · Okamžitý přístup po přihlášení.",
  },
  {
    href: "/system",
    badge: "697 KČ",
    title: "Projekt Organika",
    price: "697 Kč",
    description:
      "3 dny · konkrétní výstupy · moje osobní zpětná vazba. Pro prvních 100 míst.",
  },
  {
    href: "/system#faq",
    badge: "KOMUNITA",
    title: "Growmat komunita (Circle)",
    price: "Doživotně",
    description: "Soukromá komunita členů Organiky. Po koupi automaticky.",
  },
  {
    href: "https://instagram.com/socialmaty",
    badge: "INSTAGRAM",
    title: "@socialmaty — denně nové insighty",
    description: "Krátké video tipy, jak růst na IG v roce 2026.",
    external: true,
  },
];

export default function StartPage() {
  return (
    <div className="container-page max-w-md py-10">
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 bg-line border border-line flex items-center justify-center text-muted font-mono text-xs">
          [foto]
        </div>
        <h1 className="mt-4 font-display text-xl font-bold">Matyáš Linda</h1>
        <p className="mt-1 text-sm text-muted">
          Zakladatel <span className="text-ink font-semibold">Growmat Systém®</span> · 30M+
          organických zhlédnutí
        </p>
      </div>

      {/* Heading */}
      <h2 className="mt-10 font-display text-2xl font-bold leading-tight text-center">
        Naučím Tě růst na Instagramu pomocí{" "}
        <span className="text-accent">5–8 sek. videí.</span>
      </h2>

      {/* Value ladder */}
      <ul className="mt-10 border-t border-line">
        {items.map((item) => (
          <li key={item.href} className="border-b border-line">
            <ItemLink item={item} />
          </li>
        ))}
      </ul>

      {/* Secondary */}
      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-[0.16em]">
        <a href="mailto:matyas@socialmaty.cz" className="border-b border-ink text-ink">
          Kontakt
        </a>
        <a
          href="https://instagram.com/socialmaty"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-ink text-ink"
        >
          Instagram
        </a>
      </div>

      <div className="mt-10 surface-card p-5">
        <Logo className="mb-3" />
        <p className="text-sm text-muted">
          Growmat Systém® je tréninkový program pro podnikatele, kteří chtějí růst na
          Instagramu organicky — bez reklamy a bez agentury.
        </p>
      </div>
    </div>
  );
}

function ItemLink({ item }: { item: Item }) {
  const inner = (
    <div className="flex items-center justify-between gap-4 py-5">
      <div className="flex-1 min-w-0">
        {item.badge && (
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-accent-700 mb-1.5">
            {item.badge}
          </span>
        )}
        <p className="font-display font-semibold leading-tight">{item.title}</p>
        <p className="mt-1 text-sm text-muted leading-snug">{item.description}</p>
      </div>
      <span className="font-mono text-sm text-ink whitespace-nowrap">
        {item.price ?? "→"}
      </span>
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group hover:bg-accent-50 -mx-2 px-2 transition"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href} className="block group hover:bg-accent-50 -mx-2 px-2 transition">
      {inner}
    </Link>
  );
}
