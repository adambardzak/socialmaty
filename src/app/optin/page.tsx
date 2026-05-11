import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import Header from "@/components/Header";

export const metadata = {
  title: "Growmat Systém® · Trénink zdarma",
  description:
    "Získej +10 000 sledujících a první prodeje z Instagramu pomocí 5–8 sekundových videí. Bez agentury, reklamy a štěstí.",
};

export default function OptinPage() {
  return (
    <>
      <Header />

      {/* HERO + OPTIN */}
      <section className="container-page pt-32 pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          <div data-reveal>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              <span className="text-accent">GROWMAT® SYSTÉM:</span> Získej +10 000
              sledujících a první prodeje z Instagramu pomocí 5–8 sek. videí
            </h1>
            <p className="mt-5 font-display text-xl sm:text-2xl text-ink leading-snug">
              Bez agentury, reklamy, štěstí a jen s telefonem.
            </p>
            <div className="rule mt-8" />
            <p className="mt-8 text-lg text-muted leading-relaxed">
              20minutový trénink, ve kterém ti ukážu přesný systém, který v roce 2026
              funguje pro podnikatele napříč obory.
            </p>
            <p className="mt-3 text-muted">
              Žádná teorie. Žádné triky. Konkrétní mechanika, která stojí za 30 000 000+
              organických zhlédnutí klientů.
            </p>

            <ul className="mt-4 space-y-3" data-reveal data-reveal-delay="1">
              {[
                <>
                  <strong>Přesný formát 5–8 sekundových videí</strong>, který algoritmus
                  tlačí v roce 2026
                </>,
                <>
                  <strong>Proč dlouhá videa už nefungují</strong> (a co je nahradilo)
                </>,
                <>
                  Ten <strong>JEDINÝ princip úspěchu</strong> na sociálních sítích
                </>,
              ].map((b, i) => (
                <li key={i} className="flex gap-3 text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center bg-accent text-white text-xs font-bold rounded-lg">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Experts pill */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  "/img/experti/celiso.png",
                  "/img/experti/martin.png",
                  "/img/experti/vermione.png",
                ].map((src) => (
                  <div
                    key={src}
                    className="h-9 w-9 rounded-full overflow-hidden border-2 border-white bg-line"
                  >
                    <Image
                      src={src}
                      alt="Expert"
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="text-accent-700 font-semibold">★★★★★</span> 50+ expertů
                a podnikatelů ve hře
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <div
            className="lg:sticky lg:top-28 surface-card p-6 sm:p-8"
            data-reveal
            data-reveal-delay="1"
          >
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
              Pošlu ti přístup okamžitě.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Vyplň jméno a email — odkaz na trénink ti přijde na email.
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

      {/* CO SE V TRENINKU NAUCIS — 3 bloky */}
      <section className="container-page py-20">
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
      </section>

      {/* KDO JE MATY */}
      <section className="border-t border-line bg-surface">
        <div className="container-page py-20">
          <div
            className="grid md:grid-cols-[260px_1fr] gap-10 items-center max-w-3xl mx-auto"
            data-reveal
          >
            <div className="rounded-2xl aspect-square w-full overflow-hidden border border-line bg-surface relative">
              <Image
                src="/img/maty.webp"
                alt="Matyáš Linda"
                fill
                className="object-cover"
                sizes="260px"
              />
            </div>
            <div>
              <h3 className="mt-2 font-display text-2xl font-bold">Matyáš Linda</h3>
              <p className="mt-3 text-muted leading-relaxed">
                Zakladatel Growmat Academy. Za poslední rok postavil 6 účtů z 0 na 10 000+
                sledujících. 30 milionů organických zhlédnutí. 0 Kč do reklamy.
              </p>
              <p className="mt-3 text-muted leading-relaxed">
                Stejný systém aplikuje teď s podnikateli napříč obory — od zdraví přes
                vztahy až po seberozvoj.
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
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Trénink je dostupný{" "}
            <span className="text-accent">ihned po přihlášení</span>.
          </h2>
        </div>
        <div
          className="max-w-md mx-auto mt-10 surface-card p-6 sm:p-8"
          data-reveal
          data-reveal-delay="1"
        >
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
