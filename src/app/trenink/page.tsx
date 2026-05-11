import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";
import VslPlayer from "@/components/VslPlayer";
import FAQ from "@/components/FAQ";
import Header from "@/components/Header";
import CaseStudiesCarousel from "@/components/CaseStudiesCarousel";
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
    result: "Z 0 na 10K+ sledujících",
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
    result: "Z 0 na 10K+ sledujících",
    niche: "energie a regenerace",
  },
  {
    handle: "@soberboys.podcast",
    before: "/img/case-studies/sober-pred-1-1.webp",
    after: "/img/case-studies/sober-boys-po.webp",
    result: "Růst podcastového účtu",
    niche: "podcast",
  },
  {
    handle: "@socialmaty",
    before: "/img/case-studies/socialmaty-pred-1.webp",
    after: "/img/case-studies/maty-po.webp",
    result: "Vlastní Matyášův účet",
    niche: "Instagram",
  },
  {
    handle: "@zijulip",
    before: "/img/predapo/zijulip-pred.jpg",
    after: "/img/case-studies/marie-po.webp",
    result: "Růst sledujících od nuly",
    niche: "lifestyle",
  },
  {
    handle: "@vasekjindrich",
    before: "/img/predapo/vasek-pred.jpg",
    after: "/img/case-studies/vasek-po.webp",
    result: "Růst osobního brandu",
    niche: "byznys",
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
      <Header />
      <StickyCta href="#nabidka" label="Vstoupit za 697 Kč" />

      {/* SECTION 1: HERO + VIDEO */}
      <section className="container-page pt-32 pb-12">
        <p className="badge-accent" data-reveal>— Trénink zdarma · 20 minut</p>
        <h1
          className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
          data-reveal
        >
          Growmat <span className="text-accent">Systém®</span>
        </h1>
        <p
          className="mt-4 max-w-3xl font-display text-xl sm:text-2xl text-ink leading-snug"
          data-reveal
          data-reveal-delay="1"
        >
          Jak podnikatelé získali +10 000 sledujících pomocí 5–8 sekundových videí — bez
          agentury, štěstí a jen pomocí telefonu.
        </p>

        <div className="mt-10 max-w-4xl" data-reveal data-reveal-delay="2">
          <VslPlayer
            bunny={bunny}
            youtubeId={!bunny ? ytId : undefined}
            src={!bunny && !ytId ? videoSrc : undefined}
            poster="/vsl-poster.webp"
            title="Growmat Systém®"
          />
          <p className="mt-4 text-sm text-muted">
            💡{" "}
            <span className="text-ink font-semibold">Pod videem na Tebe čeká jedinečná nabídka.</span>{" "}
            Sleduj video do konce.
          </p>
        </div>
      </section>

      {/* SECTION 2: BRIDGE */}
      <section className="border-t border-line bg-surface">
        <div className="container-page py-16 max-w-3xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight" data-reveal>
            P.S. Mám pro Tebe <span className="text-accent">jedinečnou nabídku.</span>
          </h2>
          <div className="mt-6 space-y-4 text-lg text-ink leading-relaxed" data-reveal data-reveal-delay="1">
            <p>
              Před chvílí jsi viděl, <strong>proč</strong> 5–8 sekundové video formáty fungují
              lépe než cokoli jiného.
            </p>
            <p>
              Viděl jsi, <strong>co</strong> dělají podnikatelé, kteří touhle cestou rostou.
            </p>
            <p>
              Jednu věc jsem ti ale <strong>záměrně neukázal</strong>.
            </p>
            <p className="font-display text-2xl font-bold">Jak přesně.</p>
            <p>
              Ne proto, že bych ti to nechtěl říct. Ale protože „jak“ se nedá vysvětlit za 20
              minut. <strong>„Jak“ potřebuje 3 dny</strong> — a moji přímou zpětnou vazbu na{" "}
              <strong>tvůj</strong> profil, <strong>tvůj</strong> obsah, <strong>tvoji</strong>{" "}
              situaci.
            </p>
            <p>
              A přesně to je důvod, proč existuje{" "}
              <span className="text-accent font-semibold">Projekt Organika.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: HEADLINE NABIDKY */}
      <section id="nabidka" className="container-page py-20">
        <div className="max-w-3xl" data-reveal>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
            Projekt <span className="text-accent">Organika</span>
          </h2>
          <p className="mt-5 font-display text-xl text-ink">
            3 dny. Konkrétní výstupy. Moje osobní zpětná vazba.
          </p>
          <p className="mt-3 text-muted text-lg">
            Online trénink, který Tě posune z bodu <em>„vím, že to funguje“</em> do bodu{" "}
            <em>„mám systém, který funguje pro mě“</em>.
          </p>
          <div className="mt-8 max-w-md">
            <CheckoutButton prefill={prefill} className="btn-primary btn-primary-shimmer w-full" />
            <p className="mt-3 text-xs text-muted">
              🔒 Okamžitý přístup po platbě · Doživotně tvé
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TIER 2 SOCIAL PROOF — CASE STUDIES CAROUSEL */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2
            className="mt-3 text-center font-display text-3xl sm:text-4xl font-bold tracking-tight"
            data-reveal
          >
            Tohle nejsou sliby. <span className="text-accent">Tohle jsou výsledky.</span>
          </h2>
          <p
            className="mt-4 text-center text-muted max-w-2xl mx-auto"
            data-reveal
            data-reveal-delay="1"
          >
            Členové Projektu Organika napříč obory. Společně přes{" "}
            <strong className="text-ink">700 000 organických zhlédnutí</strong> za pár týdnů.
          </p>

          <div className="mt-10" data-reveal data-reveal-delay="1">
            <CaseStudiesCarousel cases={cases} />
          </div>

          {/* Highlight stories */}
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <Member
              tag="Member 1 · zdraví střev"
              headline="500 000 zhlédnutí z jediného videa"
              body="Aplikovala systém v Organice. Jedno video. Půl miliónu lidí."
              note="Tohle není pravidlo. Tohle je strop toho, co je možné, když máš správný systém a moji zpětnou vazbu."
            />
            <Member
              tag="Member 2 · zánět v těle"
              headline="700 → 50 000+ zhlédnutí na video"
              body="Stejný profil. Stejný obsah. Jiný systém."
              note="Změna nepřišla zvenku. Přišla z toho, jak začínat videa, aby je lidi dosledovali."
            />
            <Member
              tag="Member 3 · seberozvoj"
              headline="2 videa. 100 000+ zhlédnutí."
              body="První video není štěstí. Druhé video to potvrzuje."
              note="Systém funguje opakovaně, ne jednou za rok."
            />
            <Member
              tag="Member 4 · weby a digitální produkty"
              headline="3 videa, 40 000+ zhlédnutí + první prodej při 1 000 sledujících"
              body={`„Můj obor není sexy. Tvořím weby. To si nikdo neukládá.“ To si myslel před Organikou. Pak optimalizoval profil podle systému, natočil 3 videa — a prodal první digitální produkt.`}
              note="Algoritmus nezajímá, jestli je tvůj obor sexy. Zajímá ho, jestli umíš zaujmout v prvních 5 sekundách."
            />
          </div>

          <div className="mt-10 max-w-2xl mx-auto border border-line bg-white p-6">
            <p className="text-sm text-muted">
              🔒{" "}
              <strong className="text-ink">
                Všechny screenshoty si můžeš ověřit přímo v Circle komunitě.
              </strong>{" "}
              Členové je tam sami sdíleli — nejde o stock fotky ani inscenované recenze.
            </p>
          </div>

          <div className="mt-10 max-w-md mx-auto">
            <CheckoutButton
              prefill={prefill}
              className="btn-primary btn-primary-shimmer w-full"
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: PAIN AGITATION */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-[280px_1fr] gap-10 max-w-4xl items-start">
          <div className="aspect-[4/5] relative w-full overflow-hidden border border-line bg-surface" data-reveal>
            <Image src="/sad.webp" alt="Pain" fill className="object-cover" sizes="280px" />
          </div>
          <div data-reveal data-reveal-delay="1">
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">Tohle znáš, že?</h2>
            <ul className="mt-6 space-y-4 text-lg text-ink">
              <PainItem>
                <strong>Máš co říct</strong> — ale když máš natočit video, mozek se zasekne.
              </PainItem>
              <PainItem>
                <strong>Algoritmus Tě ignoruje</strong> — přestože tvoříš obsah pravidelně.
              </PainItem>
              <PainItem>
                <strong>Sleduješ ostatní podnikatele</strong>, jak rostou, a říkáš si: „Co
                dělají, co já ne?“
              </PainItem>
              <PainItem>
                <strong>Zkoušel jsi všechno</strong> — kurzy, návody, šablony. A pořád
                stagnuješ.
              </PainItem>
            </ul>
            <p className="mt-8 text-lg text-muted">
              A nejvíc Tě štve, že <strong className="text-ink">víš</strong>, že máš expertízu.
              Víš, že máš co předat. Jen nemáš{" "}
              <strong className="text-ink">systém</strong>, jak to dostat ven.
            </p>
          </div>
        </div>
      </section>

      {/* PULL-QUOTE */}
      <section className="border-y border-line">
        <div className="container-page py-12 max-w-3xl mx-auto text-center">
          <p
            className="font-display text-2xl sm:text-3xl text-ink leading-snug"
            data-reveal
          >
            Problém nikdy nebyl v tom, co víš. Chyběl ti{" "}
            <span className="text-accent">systém, JAK</span> to sdílet.
          </p>
        </div>
      </section>

      {/* SECTION 6: IDENTITY SHIFT */}
      <section className="bg-surface">
        <div className="container-page py-20">
          <div className="grid md:grid-cols-[1fr_280px] gap-10 max-w-4xl items-start">
            <div data-reveal>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                Identita, na kterou jsi <span className="text-accent">čekal</span>
              </h2>
              <ul className="mt-6 space-y-4 text-lg text-ink">
                {[
                  "Víš přesně, co tvořit — a proč to funguje.",
                  "Máš systém na 5–8 sekundové formáty, které algoritmus tlačí.",
                  "Vytvoříš první video už během prvního dne — s mojí osobní zpětnou vazbou.",
                  "Přestaneš tipovat a začneš tvořit s jistotou.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center bg-accent text-white text-xs font-bold">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/5] relative w-full overflow-hidden border border-line bg-white order-first md:order-last" data-reveal data-reveal-delay="1">
              <Image src="/happy.webp" alt="Transformace" fill className="object-cover" sizes="280px" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: 3 DNY 3 VYSTUPY */}
      <section className="container-page py-20">
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight" data-reveal>
          3 dny. <span className="text-accent">3 výstupy.</span>
        </h2>

        <div className="mt-10 grid md:grid-cols-[300px_1fr] gap-12 items-start">
          <div className="relative aspect-[4/5] border border-line bg-surface overflow-hidden" data-reveal>
            <Image
              src="/img/grafika/mockup.webp"
              alt="Projekt Organika mockup"
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
          <div className="space-y-8" data-reveal data-reveal-delay="1">
            <Day
              num="01"
              title="Profil, který prodává sám"
              tagline="Návštěvník do 3 sekund ví: „Tohle je ten, koho hledám.“"
              bullets={[
                "Bio, popisek a vizuální identita podle struktury 10K+ účtů",
                "Highlights a úvodní příspěvky, které budují autoritu od první vteřiny",
                "Hotový profil připravený k růstu — na konci 1. dne",
              ]}
            />
            <Day
              num="02"
              title="První 5–8 sekundové video, které funguje"
              tagline="Natočíš svoje první video podle systému — a pošleš mi ho na zpětnou vazbu."
              bullets={[
                "Ověřený systém tvorby krátkých videí, který přivádí klienty",
                "3 formáty co fungují napříč obory — bez tance a šaškování",
                "První hotové video připravené k publikaci",
              ]}
            />
            <Day
              num="03"
              title="Kompletní systém na 14 dní obsahu dopředu"
              tagline="Hotový plán, jak tvořit konzistentně bez stresu a bez nekonečného vymýšlení."
              bullets={[
                "Kompletní Growmat systém „od příspěvku po delegaci“",
                "Plán obsahu na 14 dní — přesně víš, co tvořit a proč",
                "4 reálné case studies s rozborem co fungovalo a proč",
              ]}
            />
          </div>
        </div>

        <div className="mt-12 max-w-md">
          <CheckoutButton prefill={prefill} className="btn-primary btn-primary-shimmer w-full" />
        </div>
      </section>

      {/* SECTION 8: BONUSY */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20">
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight" data-reveal>
            Bonusy v hodnotě <span className="text-accent">33 920 Kč</span>
          </h2>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            <Bonus
              n="01"
              title="5 ověřených šablon příspěvků"
              value="1 990 Kč"
              body="Od hooku po CTA. Tvůj první úspěch za 15 minut."
            />
            <Bonus
              n="02"
              title="Algoritmický hack (VIP tip od CEO Instagramu)"
              value="2 990 Kč"
              body="Získej nekonečný přísun nápadů pro obsah přehlíženou metodou."
            />
            <Bonus
              n="03"
              title="Uzavřená komunita Growmat na Circle, doživotně"
              value="4 990 Kč"
              body="Ptej se na cokoli. Vidíš ostatní, oni vidí Tebe. Nikdy nejsi sám."
            />
            <Bonus
              n="04"
              title="Šance na 1:1 mentoring"
              value="5 000 Kč"
              body="60 minut osobně se mnou. Dokonči úkoly a kvalifikuješ se."
            />
            <Bonus
              n="05"
              title="Zvýhodněný vstup do Growmat Academy"
              value="9 990 Kč"
              body="Po dokončení Organiky máš jako jediný přístup ke zvýhodněné nabídce."
            />
          </div>
        </div>
      </section>

      {/* SECTION 9: STACK UP */}
      <section className="container-page py-20">
        <div className="max-w-2xl mx-auto" data-reveal>
          <div className="mt-6 border border-line bg-white p-6 sm:p-8 font-mono text-sm">
            {[
              ["Den 1 obsah", "2 990 Kč"],
              ["Den 2 obsah", "2 990 Kč"],
              ["Den 3 obsah", "2 990 Kč"],
              ["5 šablon příspěvků", "1 990 Kč"],
              ["Rozbor virálních videí", "1 490 Kč"],
              ["Komunita doživotně", "4 990 Kč"],
              ["Šance na 1:1 mentoring", "9 990 Kč"],
              ["Zvýhodněný vstup do Academy", "9 990 Kč"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between py-1.5 border-b border-line last:border-0"
              >
                <span className="text-muted">{k}</span>
                <span className="text-ink">{v}</span>
              </div>
            ))}
            <div className="flex justify-between mt-4 pt-3 border-t-2 border-ink font-bold">
              <span>Celková hodnota</span>
              <span>37 420 Kč</span>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="mt-3 font-display text-6xl sm:text-7xl font-extrabold text-accent">
              697 Kč
            </p>
            <p className="mt-3 text-muted">
              Pouze pro prvních 100 míst. Po vyprodání cena 997 Kč.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <CheckoutButton
                prefill={prefill}
                className="btn-primary btn-primary-shimmer w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: URGENCY (osobní feedback) */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 max-w-2xl">
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight" data-reveal>
            Proč prvních 100 míst <span className="text-accent">za 697 Kč?</span>
          </h2>
          <p className="mt-5 text-lg text-ink" data-reveal>
            Protože každému z prvních 100 dávám{" "}
            <strong>osobní zpětnou vazbu na úkoly</strong>.
          </p>
          <p className="mt-3 text-muted" data-reveal>
            Ne automatizovaný bot. Ne šablonové odpovědi.{" "}
            <strong className="text-ink">Já</strong>, na tvůj konkrétní profil a tvůj
            konkrétní obsah. Při větším objemu to fyzicky nezvládnu udržet v kvalitě, kterou
            považuji za standard.
          </p>
          <div className="mt-8 max-w-md">
            <CheckoutButton
              prefill={prefill}
              label="Chci jedno z posledních míst →"
              className="btn-primary btn-primary-shimmer w-full"
            />
          </div>
        </div>
      </section>

      {/* SECTION 11: TIER 1 SOCIAL PROOF — RECENZE MASONRY */}
      <section className="container-page py-20">
        <h2
          className="mt-3 text-center font-display text-3xl sm:text-4xl font-bold tracking-tight"
          data-reveal
        >
          Tohle nejsou sliby. <span className="text-accent">Tohle jsou čísla.</span>
        </h2>
        <div className="mt-10 columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]" data-reveal>
          {reviews.map((src) => (
            <div key={src} className="mb-4 break-inside-avoid border border-line bg-white">
              <Image
                src={src}
                alt="Recenze člena"
                width={500}
                height={700}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11b: ORIGIN STORY */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 max-w-3xl">
          <div className="mt-6 grid sm:grid-cols-[200px_1fr] gap-8 items-start" data-reveal data-reveal-delay="1">
            <div className="aspect-square w-full overflow-hidden border border-line bg-white relative">
              <Image src="/img/maty.webp" alt="Matyáš Linda" fill className="object-cover" sizes="200px" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">Matyáš Linda</h3>
              <p className="mt-2 text-sm text-muted">Expert na sociální sítě a organický růst</p>
              <p className="mt-4 text-ink leading-relaxed">
                Před dvěma lety mi obchodní partner vzal podcastové účty s 30 000 sledujícími.
                Ze dne na den jsem stál na nule. S dluhy. Bez příjmu.
              </p>
              <p className="mt-3 text-ink leading-relaxed">
                Začal jsem znovu. Vzal všechno, co jsem věděl o sociálních sítích, a začal
                stavět systém pro podnikatele napříč obory.
              </p>
            </div>
          </div>

          <div className="mt-10 border border-line bg-white p-6 font-mono text-sm">
            {[
              ["6 účtů", "z 0 na 10 000+ sledujících"],
              ["30 000 000+", "organických zhlédnutí"],
              ["4 členové Organiky", "700 000+ zhlédnutí společně"],
              ["0 Kč", "investovaných do reklamy"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between py-1.5 border-b border-line last:border-0"
              >
                <span className="text-ink font-semibold">{k}</span>
                <span className="text-muted">{v}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 font-display text-xl text-ink italic border-l-4 border-accent pl-5">
            Tvoje znalosti mohou měnit životy. Chybí ti jen{" "}
            <span className="text-accent not-italic">systém, jak je dostat ven</span>.
          </p>

          <div className="mt-8 max-w-md">
            <CheckoutButton prefill={prefill} className="btn-primary btn-primary-shimmer w-full" />
          </div>
        </div>
      </section>

      {/* SECTION 12: GARANCE */}
      <section className="container-page py-20 max-w-3xl">
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight" data-reveal>
          Co když u mě <span className="text-accent">nezafunguje?</span>
        </h2>
        <p className="mt-5 text-lg text-ink" data-reveal>
          Systém fungoval u 6 účtů napříč obory. Fungoval u 4 členů Projektu Organika.
        </p>
        <p className="mt-3 text-muted" data-reveal>
          A přesto — pokud do konce 3. dne{" "}
          <strong>necítíš alespoň 3 konkrétní „aha momenty“</strong>, pošlu Ti{" "}
          <strong className="text-ink">osobní rozbor tvého profilu</strong> a strategie, co
          dál. Bez podmínek. Bez upsellu.
        </p>
        <p className="mt-5 font-display text-xl text-ink" data-reveal>
          Riziko nese moje strana. <span className="text-accent">Ne tvoje.</span>
        </p>
        <div className="mt-8 max-w-md">
          <CheckoutButton
            prefill={prefill}
            label="Jdu do toho →"
            className="btn-primary btn-primary-shimmer w-full"
          />
        </div>
      </section>

      {/* SECTION 13: PRO KOHO TO NENI */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-20 max-w-3xl">
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight" data-reveal>
            Tohle není pro každého
          </h2>
          <ul className="mt-8 space-y-4 text-lg text-ink" data-reveal>
            {[
              "Pokud hledáš rychlé hacky bez dlouhodobé strategie — nech to být.",
              "Pokud nemáš co nabídnout (produkt, službu, expertízu) — tohle ti nepomůže.",
              "Pokud nejsi ochotný/á investovat 1 hodinu denně do vlastního růstu — Organika Tě bude stresovat.",
              "Pokud čekáš, že to za Tebe udělá někdo jiný — tady to nedostaneš.",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center bg-ink text-white text-xs font-bold">
                  ✕
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-xl text-ink" data-reveal>
            Tohle je pro lidi, kteří mají expertízu, mají co předat a chtějí{" "}
            <span className="text-accent">konkrétní systém</span>, ne další kurz, který skončí
            v zásuvce.
          </p>
        </div>
      </section>

      {/* SECTION 14: FAQ */}
      <section id="faq" className="container-page py-20 max-w-3xl">
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight" data-reveal>
          Nejčastější otázky
        </h2>
        <div className="mt-8" data-reveal>
          <FAQ
            items={[
              {
                q: "Co se stane po platbě?",
                a: "Okamžitě dostaneš přístupy do Circle komunity, kde najdeš Den 1. Pustíš si ho kdykoli. Žádné čekání.",
              },
              {
                q: "Pro koho přesně Projekt Organika je?",
                a: "Pro podnikatele napříč obory, kteří mají co nabídnout (produkt, službu, expertízu) a chtějí systém pro růst na Instagramu. Funguje pro health, fitness, finance, vzdělávání, B2B služby, e-commerce, weby.",
              },
              {
                q: "Kolik času denně potřebuju?",
                a: "Minimum 1 hodina denně po dobu 3 dnů. Pak 30–60 minut denně na tvorbu obsahu.",
              },
              {
                q: "Mám už několik tisíc sledujících. Je to pro mě?",
                a: "Ano. Systém funguje od 0 i pro účty, které stagnují. Je to o mechanice, ne o startovací pozici.",
              },
              {
                q: "Co když nemám zkušenosti s natáčením?",
                a: "Systém funguje i bez mluvení na kameru. 5–8 sekundové formáty fungují bez „tváře“ — ukážu ti přesně jak.",
              },
              {
                q: "Jak rychle uvidím první výsledky?",
                a: "První video produkuješ na konci 2. dne. První signály v reach typicky vidíš během 7–14 dní.",
              },
              {
                q: "Co se stane po 3 dnech?",
                a: "Zůstáváš v komunitě doživotně. Pokračuješ s feedbackem, vidíš růst ostatních, máš přístup k pokročilejším strategiím.",
              },
              {
                q: "Mohu dostat fakturu na firmu?",
                a: "Ano. Po platbě ti automaticky přijde faktura na e-mail.",
              },
              {
                q: "Co když to není pro mě?",
                a: "Pokud necítíš 3 aha momenty do konce 3. dne, pošlu Ti osobní rozbor tvého profilu zdarma.",
              },
            ]}
          />
        </div>
      </section>

      {/* SECTION 15: 2 MOZNOSTI */}
      <section className="border-t border-line bg-surface">
        <div className="container-page py-20 max-w-3xl">
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight" data-reveal>
            Máš <span className="text-accent">2 možnosti</span>:
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="border border-line bg-white p-6" data-reveal>
              <p className="mt-3 text-muted leading-relaxed">
                Zavřeš stránku. Za měsíc tu budeš zase. Hledat další kurz, další strategii. A
                pořád si říkat: <em>„Co dělám špatně?“</em>
              </p>
            </div>
            <div className="border border-accent bg-accent-50 p-6" data-reveal data-reveal-delay="1">
              <p className="mt-3 text-ink leading-relaxed">
                Vstoupíš teď. Za 3 dny máš profil. Máš první video. Máš systém na 14 dní
                obsahu. A přístup ke mně, na celý život.
              </p>
            </div>
          </div>
          <p className="mt-10 font-display text-xl text-ink">
            Rozdíl mezi tebou a 4 členy s 700 000 zhlédnutí?{" "}
            <span className="text-accent">Oni rozhodli teď.</span>
          </p>
          <div className="mt-8 max-w-md">
            <CheckoutButton prefill={prefill} className="btn-primary btn-primary-shimmer w-full" />
            <p className="mt-3 text-xs text-muted">
              🔒 Okamžitý přístup po platbě · Doživotně tvé
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 16: P.S. */}
      <section className="container-page py-20 max-w-3xl">
        <p className="mt-5 text-lg text-ink leading-relaxed" data-reveal>
          Většina lidí, co dosledovala video až sem, zavře stránku. Přečtou ještě pár recenzí.
          Možná otevřou konkurenční kurz. A za týden zapomenou, že tu kdy byli.
        </p>
        <p className="mt-4 text-lg text-ink leading-relaxed" data-reveal>
          A pak tu jsou ti, kteří <strong>rozhodli teď</strong>. Ti, kteří za 3 dny mají
          hotový profil, první video a jasný plán na 14 dní.
        </p>
        <p className="mt-4 text-lg text-ink leading-relaxed" data-reveal>
          Member 1 dnes má <strong>500 000 zhlédnutí z jednoho videa</strong>. Před Organikou
          byla ve stejné pozici jako ty teď.
        </p>
        <p className="mt-6 font-display text-2xl" data-reveal>
          Jediný rozdíl: <span className="text-accent">rozhodla se.</span>
        </p>
        <div className="mt-8 max-w-md" data-reveal>
          <CheckoutButton prefill={prefill} className="btn-primary btn-primary-shimmer w-full" />
        </div>
      </section>
    </>
  );
}

function PainItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center bg-ink text-white text-xs font-bold">
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
    <div className="border border-line bg-white p-6" data-reveal>
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
    <div className="border border-line bg-white p-5" data-reveal>
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
