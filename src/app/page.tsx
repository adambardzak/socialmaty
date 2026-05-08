import LeadForm from "@/components/LeadForm";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Growmat Systém® · Trénink zdarma",
  description:
    "Získej +10 000 sledujících a první prodeje z Instagramu pomocí 5–8 sekundových videí. Bez agentury, reklamy a štěstí.",
};

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <header className="container-page py-6">
        <Logo />
      </header>

      {/* HERO */}
      <section className="container-page pt-6 pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
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
              20 minutový trénink, ve kterém ti ukážu přesný systém, který v roce 2026 funguje
              pro podnikatele napříč obory.
            </p>
            <p className="mt-3 text-muted">
              Žádná teorie. Žádné triky. Konkrétní mechanika, která stojí za 30 000 000+
              organickými zhlédnutími klientů.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Přesný formát 5–8 sekundových videí, který algoritmus tlačí v 2026",
                "Proč dlouhá videa už nefungují (a co je nahradilo)",
                "3 typy hooků, které zastaví scroll v prvních 2 sekundách",
                "Případové studie reálných klientů s konkrétními čísly",
              ].map((b) => (
                <li key={b} className="flex gap-3 text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center bg-accent text-white text-xs font-bold">
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FORM CARD */}
          <div className="lg:sticky lg:top-8 surface-card p-6 sm:p-8">
            <p className="eyebrow">— Vstup do tréninku zdarma</p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
              Pošlu ti přístup okamžitě.
            </h2>
            <p className="mt-2 text-sm text-muted">
              Vyplň jméno a email, klikneš a video se ti otevře.
            </p>
            <div className="mt-6">
              <LeadForm source="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-12">
          <p className="eyebrow text-center">— Systém Growmat stojí za výsledky:</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
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

      {/* CO SE NAUCIS */}
      <section className="container-page py-20">
        <p className="eyebrow text-center">— Co odneseš za 20 minut</p>
        <h2 className="mt-3 text-center font-display text-3xl sm:text-4xl font-bold tracking-tight">
          Co se v tréninku <span className="text-accent">naučíš</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <ValueBlock
            icon="🎯"
            title="Mechaniku, proč krátká videa vyhrávají v 2026"
            body="Pochopíš, co se změnilo na Instagramu za poslední rok. Proč 90 % tvůrců dělá videa špatně, i když to dělají správně podle starých pravidel."
          />
          <ValueBlock
            icon="🎯"
            title="Reálné případové studie s čísly"
            body="Ukážu ti konkrétní účty, konkrétní videa, konkrétní výsledky. Žádné grafy. Reálná čísla od reálných lidí, kteří aplikovali stejný systém."
          />
          <ValueBlock
            icon="🎯"
            title="Co dělat hned po skončení tréninku"
            body="Trénink není teorie. Ke konci ti dám konkrétní akční krok, který můžeš udělat ještě dnes — i kdybys nikdy nenatočil video."
          />
        </div>
      </section>

      {/* KDO ZA TIM STOJI */}
      <section className="border-t border-line bg-surface">
        <div className="container-page py-20">
          <div className="grid md:grid-cols-[260px_1fr] gap-10 items-center max-w-3xl mx-auto">
            <div className="aspect-square w-full bg-line border border-line flex items-center justify-center text-muted font-mono text-xs">
              [foto Matyho]
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
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-page py-20">
        <div className="max-w-xl mx-auto text-center">
          <p className="eyebrow">— Připraven začít?</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold leading-tight">
            Trénink je dostupný{" "}
            <span className="text-accent">ihned po přihlášení</span>.
          </h2>
        </div>
        <div className="max-w-md mx-auto mt-10 surface-card p-6 sm:p-8">
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

function ValueBlock({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="surface-card p-6 sm:p-7">
      <p className="text-2xl">{icon}</p>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug">{title}</h3>
      <p className="mt-2 text-muted leading-relaxed">{body}</p>
    </div>
  );
}
