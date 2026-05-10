import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";
import CaseStudiesCarousel from "@/components/CaseStudiesCarousel";

export const metadata = {
  title: "Growmat Systém® · Trénink zdarma",
  description:
    "Získej +10 000 sledujících a první prodeje z Instagramu pomocí 5–8 sekundových videí. Bez agentury, reklamy a štěstí.",
};

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
    result: "10K+ sledujících · 20+ klientů",
    niche: "zdraví",
  },
  {
    handle: "@jidlosmartinem",
    before: "/img/case-studies/martin-pred.webp",
    after: "/img/case-studies/martin-po.webp",
    result: "Z 0 na 10K+ sledujících",
    niche: "jídlo",
  },
  {
    handle: "@mitolife_cz",
    before: "/img/case-studies/mitolife-pred.webp",
    after: "/img/case-studies/mito-po.webp",
    result: "Z 0 na 10K+ sledujících",
    niche: "energie a regenerace",
  },
  {
    handle: "@socialmaty",
    before: "/img/case-studies/socialmaty-pred-1.webp",
    after: "/img/case-studies/maty-po.webp",
    result: "Růst Matyášova vlastního účtu",
    niche: "Instagram",
  },
];

const reviews = [
  "/img/recenze/img-2755-1.webp",
  "/img/recenze/img-4563.webp",
  "/img/recenze/img-6931-1.webp",
  "/img/recenze/navrh-bez-nazvu-3.png",
  "/img/recenze/recenze-5.webp",
  "/img/recenze/recenze-6.webp",
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="container-page pt-32 pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          <div data-reveal>
            <p className="badge-accent mb-6">⏰ Trénink zdarma · Dostupný okamžitě</p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Získej{" "}
              <span className="text-accent">+10 000 sledujících a první prodeje</span> z
              Instagramu pomocí 5–8 sek. videí
            </h1>
            <p className="mt-5 text-lg text-muted">
              Bez agentury, reklamy, štěstí — a jen s telefonem.
            </p>
            <div className="rule mt-8" />
            <p className="mt-8 font-display text-xl text-ink leading-snug">
              20 minutový trénink, ve kterém ti ukážu přesný systém, který v roce 2026
              funguje pro podnikatele napříč obory.
            </p>
            <p className="mt-3 text-muted">
              Žádná teorie. Žádné triky. Konkrétní mechanika, která stojí za 30 000 000+
              organickými zhlédnutími klientů.
            </p>

            {/* 3 bullets per new copy */}
            <ul className="mt-8 space-y-3" data-reveal data-reveal-delay="1">
              {[
                <>
                  <strong>Přesný formát 5–8 sekundových videí</strong>, který algoritmus tlačí
                  v roce 2026
                </>,
                <>
                  <strong>Proč dlouhá videa už nefungují</strong> (a co je nahradilo)
                </>,
                <>
                  Ten <strong>JEDINÝ princip úspěchu</strong> na sociálních sítích
                </>,
              ].map((b, i) => (
                <li key={i} className="flex gap-3 text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center bg-accent text-white text-xs font-bold">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Experts pill */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["/img/experti/celiso.png", "/img/experti/martin.png", "/img/experti/vermione.png"].map(
                  (src) => (
                    <div
                      key={src}
                      className="h-9 w-9 rounded-full overflow-hidden border-2 border-white bg-line"
                    >
                      <Image src={src} alt="Expert" width={36} height={36} className="object-cover" />
                    </div>
                  ),
                )}
              </div>
              <p className="text-sm text-muted">
                <span className="text-accent-700 font-semibold">★★★★★</span> 50+ expertů a
                podnikatelů ve hře
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="lg:sticky lg:top-28 surface-card p-6 sm:p-8" data-reveal data-reveal-delay="1">
            <p className="eyebrow">— Vstup do tréninku zdarma</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
              Pošlu ti přístup okamžitě.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Vyplň jméno a email — video se otevře hned po kliknutí.
            </p>
            <div className="mt-6">
              <LeadForm source="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-12">
          <p className="eyebrow text-center" data-reveal>
            — Systém Growmat stojí za výsledky
          </p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center" data-reveal>
            <Stat value="6" label="účtů z 0 na 10 000+ sledujících" />
            <Stat value="30M+" label="organických zhlédnutí" />
            <Stat value="0 Kč" label="investovaných do reklamy" />
            <Stat value="700K+" label="zhlédnutí členů Organiky" />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
            {[
              "@celiso.cz",
              "@vermione",
              "@jidlosmartinem",
              "@mitolife_cz",
              "@vasekjindrich",
              "@socialmaty",
            ].map((h) => (
              <span key={h} className="font-mono">
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES PEEK */}
      <section className="container-page py-20">
        <p className="eyebrow text-center" data-reveal>
          — Ochutnávka výsledků
        </p>
        <h2
          className="mt-3 text-center font-display text-3xl sm:text-4xl font-bold tracking-tight"
          data-reveal
        >
          Reálné účty. <span className="text-accent">Reálná čísla.</span>
        </h2>
        <p className="mt-3 text-center text-muted max-w-xl mx-auto" data-reveal>
          V tréninku najdeš všechny rozbory s konkrétními kroky.
        </p>
        <div className="mt-10" data-reveal data-reveal-delay="1">
          <CaseStudiesCarousel cases={cases} />
        </div>
      </section>

      {/* CO SE NAUCIS — 3 bloky */}
      <section className="border-t border-line bg-surface">
        <div className="container-page py-20">
          <p className="eyebrow text-center" data-reveal>— Co odneseš za 20 minut</p>
          <h2
            className="mt-3 text-center font-display text-3xl sm:text-4xl font-bold tracking-tight"
            data-reveal
          >
            Co se v tréninku <span className="text-accent">naučíš</span>
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <ValueBlock
              delay={1}
              icon="🎯"
              title="Mechaniku, proč krátká videa vyhrávají v 2026"
              body="Pochopíš, co se změnilo na Instagramu za poslední rok. Proč 90 % tvůrců dělá videa špatně, i když to dělají správně podle starých pravidel."
            />
            <ValueBlock
              delay={2}
              icon="🎯"
              title="Reálné případové studie s čísly"
              body="Ukážu ti konkrétní účty, konkrétní videa, konkrétní výsledky. Žádné grafy. Reálná čísla od reálných lidí, kteří aplikovali stejný systém."
            />
            <ValueBlock
              delay={3}
              icon="🎯"
              title="Co dělat hned po skončení tréninku"
              body="Trénink není teorie. Ke konci ti dám konkrétní akční krok, který můžeš udělat ještě dnes — i kdybys nikdy nenatočil video."
            />
          </div>
        </div>
      </section>

      {/* RECENZE STRIP */}
      <section className="container-page py-20">
        <p className="eyebrow text-center" data-reveal>— Tohle nejsou sliby</p>
        <h2
          className="mt-3 text-center font-display text-3xl sm:text-4xl font-bold tracking-tight"
          data-reveal
        >
          Co o tréninku <span className="text-accent">říkají členové</span>
        </h2>
        <div className="mt-10 columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]" data-reveal>
          {reviews.map((src) => (
            <div key={src} className="mb-4 break-inside-avoid border border-line bg-white">
              <Image
                src={src}
                alt="Recenze"
                width={500}
                height={700}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* KDO ZA TIM STOJI */}
      <section className="border-t border-line bg-surface">
        <div className="container-page py-20">
          <div
            className="grid md:grid-cols-[260px_1fr] gap-10 items-center max-w-3xl mx-auto"
            data-reveal
          >
            <div className="aspect-square w-full overflow-hidden border border-line bg-surface relative">
              <Image src="/img/maty.webp" alt="Matyáš Linda" fill className="object-cover" sizes="260px" />
            </div>
            <div>
              <p className="eyebrow">— Kdo Ti to bude předávat</p>
              <h3 className="mt-2 font-display text-2xl font-bold">Matyáš Linda</h3>
              <p className="mt-3 text-muted leading-relaxed">
                Zakladatel Growmat Academy. Za poslední rok postavil 6 účtů z 0 na 10 000+
                sledujících. 30 milionů organických zhlédnutí. 0 Kč do reklamy.
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                Stejný systém aplikuje teď s podnikateli napříč obory — od zdraví přes vztahy
                až po seberozvoj.
              </p>
              <p className="mt-4">
                <Link
                  href="https://instagram.com/socialmaty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-accent-700 hover:text-accent-800 underline underline-offset-4"
                >
                  @socialmaty
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-page py-20">
        <div className="max-w-xl mx-auto text-center" data-reveal>
          <p className="eyebrow">— Připraven začít?</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Trénink je dostupný{" "}
            <span className="text-accent">ihned po přihlášení</span>.
          </h2>
        </div>
        <div className="max-w-md mx-auto mt-10 surface-card p-6 sm:p-8" data-reveal data-reveal-delay="1">
          <LeadForm source="footer" />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          🔒 Okamžitý přístup · Žádný spam · Odhlásit kdykoliv
        </p>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

function ValueBlock({
  icon,
  title,
  body,
  delay,
}: {
  icon: string;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <div className="surface-card p-6 sm:p-7" data-reveal data-reveal-delay={delay}>
      <p className="text-2xl">{icon}</p>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug">{title}</h3>
      <p className="mt-2 text-muted leading-relaxed">{body}</p>
    </div>
  );
}
