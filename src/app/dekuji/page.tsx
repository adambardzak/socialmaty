import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { getStripe } from "@/lib/stripe";

export const metadata = {
  title: "Děkuji za platbu — Projekt Organika",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams?: { session_id?: string };
}

async function verifySession(sessionId: string | undefined) {
  if (!sessionId) return null;
  if (!process.env.STRIPE_SECRET_KEY) {
    // dev fallback so the page works without keys
    return { email: "test@example.com", name: "Test" };
  }
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    return {
      email: session.customer_details?.email ?? session.customer_email ?? "",
      name: session.customer_details?.name ?? "",
    };
  } catch (err) {
    console.error("[dekuji] failed to retrieve session", err);
    return null;
  }
}

export default async function DekujiPage({ searchParams }: PageProps) {
  const data = await verifySession(searchParams?.session_id);
  if (!data && process.env.NODE_ENV === "production") {
    redirect("/");
  }

  const circleUrl = process.env.NEXT_PUBLIC_CIRCLE_URL || "https://growmat.circle.so";
  const firstName = (data?.name || "").split(" ")[0];

  return (
    <>
      <header className="container-page py-6">
        <Logo />
      </header>

      <section className="container-page py-16 max-w-4xl">
        <div data-reveal>
          <p className="badge-accent">— Platba přijata · Vítej uvnitř</p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            {firstName ? `${firstName}, ` : ""}vítej v{" "}
            <span className="text-accent">Projektu Organika</span>.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-2xl">
            Právě jsi udělal/a největší krok pro svůj Instagram v roce 2026. Potvrzení
            a fakturu jsem ti poslal na{" "}
            <strong className="text-ink">{data?.email || "tvůj email"}</strong>.
            Přístupy do Circle dorazí do pár minut.
          </p>
        </div>

        {/* Mockup + Maty foto */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center" data-reveal>
          <div className="relative aspect-[4/5] surface-card overflow-hidden">
            <Image
              src="/img/grafika/mockup.webp"
              alt="Projekt Organika — co tě čeká uvnitř"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow">— Krátká zpráva od Matyho</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden border-2 border-ink shrink-0">
                <Image
                  src="/img/maty.webp"
                  alt="Matyáš Linda"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-display font-bold">Matyáš Linda</p>
                <p className="text-sm text-muted">Tvůj průvodce systémem</p>
              </div>
            </div>
            <p className="mt-5 text-base text-ink leading-relaxed">
              „Děkuju ti za důvěru. Příští 3 dny budou intenzivní — ale na konci budeš
              mít profil, který prodává sám. Uvidíme se uvnitř.“
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div className="mt-12 surface-card p-6 sm:p-8" data-reveal>
          <p className="eyebrow">— Co se teď stane</p>
          <ol className="mt-4 space-y-4">
            <Step
              n={1}
              title="Email s přístupy do Circle (do 5 minut)"
              body="Zkontroluj i složku Promo akce / Spam. Kliknutím na pozvánku se dostaneš dovnitř."
            />
            <Step
              n={2}
              title="Vytvoříš si heslo a vstoupíš do komunity"
              body="Den 1 už na tebe čeká. Najdeš tam i ostatní členy a moji osobní zpětnou vazbu."
            />
            <Step
              n={3}
              title="Pustíš si Den 1 a začínáš"
              body="Návod krok za krokem, jak postavit profil, který prodává sám. Hotovo do hodiny."
            />
          </ol>
        </div>

        <div className="mt-8" data-reveal>
          <Link href={circleUrl} className="btn-primary w-full sm:w-auto">
            Vstoupit do Circle →
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted" data-reveal>
          🔒 Pokud do 15 minut email nedorazí, napiš mi na{" "}
          <a href="mailto:matyas@socialmaty.cz" className="text-ink underline">
            matyas@socialmaty.cz
          </a>{" "}
          a okamžitě to vyřeším.
        </p>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-white font-display font-bold text-sm">
        {n}
      </span>
      <div>
        <p className="font-display font-semibold leading-tight">{title}</p>
        <p className="mt-1 text-sm text-muted">{body}</p>
      </div>
    </li>
  );
}
