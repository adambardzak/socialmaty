import Link from "next/link";
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

  return (
    <>
      <header className="container-page py-6">
        <Logo />
      </header>

      <section className="container-page py-16 max-w-3xl">
        <p className="badge-accent">— Platba přijata</p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight">
          Vítej v <span className="text-accent">Projektu Organika</span>.
        </h1>
        <p className="mt-5 text-lg text-muted">
          {data?.name ? `${data.name}, ` : ""}potvrzení a fakturu jsem ti poslal na{" "}
          <strong className="text-ink">{data?.email || "tvůj email"}</strong>. Přístupy do
          Circle dorazí do pár minut.
        </p>

        {/* Onboarding video placeholder */}
        <div className="mt-10 aspect-video bg-surface border border-line flex items-center justify-center text-muted font-mono text-xs">
          [60s onboarding video od Matyho]
        </div>

        <div className="mt-10 surface-card p-6 sm:p-8">
          <p className="eyebrow">— Co se teď stane</p>
          <ol className="mt-4 space-y-4">
            <Step
              n={1}
              title="Email s přístupy do Circle"
              body="Do 5 minut ti přijde email s pozvánkou do soukromé komunity. Zkontroluj i složku Promo akce."
            />
            <Step
              n={2}
              title="Klikneš na pozvánku a přihlásíš se"
              body="Vytvoříš si heslo a okamžitě se dostaneš dovnitř. Den 1 už čeká."
            />
            <Step
              n={3}
              title="Pustíš si Den 1 a začínáš"
              body="Návod krok za krokem, jak postavit profil, který prodává sám. Hotovo do hodiny."
            />
          </ol>
        </div>

        <div className="mt-8">
          <Link href={circleUrl} className="btn-primary w-full sm:w-auto">
            Vstoupit do Circle →
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted">
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
