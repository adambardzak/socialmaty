import { NextResponse } from "next/server";
import { ecomailSubscribe } from "@/lib/ecomail";

export const runtime = "nodejs";

interface Body {
  name?: string;
  email?: string;
  source?: string;
  consent?: boolean;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "unknown").slice(0, 64);

  if (!name) return NextResponse.json({ error: "Vyplň prosím jméno." }, { status: 400 });
  if (!isValidEmail(email))
    return NextResponse.json({ error: "Email nemá správný formát." }, { status: 400 });
  if (!body.consent)
    return NextResponse.json({ error: "Bez souhlasu nemůžeme kontakt uložit." }, { status: 400 });

  await ecomailSubscribe({
    email,
    name,
    tags: ["lead", "trenink-zdarma", `source-${source}`],
    triggerAutoresponders: true,
  });

  return NextResponse.json({ ok: true });
}
