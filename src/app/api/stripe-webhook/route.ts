import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { incrementSold } from "@/lib/counter";
import { ecomailSubscribe } from "@/lib/ecomail";
import { circleInviteToOrganika } from "@/lib/circle";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    console.error("[webhook] signature verify failed", err?.message);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email =
      session.customer_details?.email ||
      session.customer_email ||
      (session.metadata as any)?.email ||
      "";
    const name =
      session.customer_details?.name ||
      (session.metadata as any)?.leadName ||
      "";

    if (email) {
      // Tag in Ecomail as buyer + trigger welcome flow
      await ecomailSubscribe({
        email,
        name,
        tags: ["buyer-organika", "lead-converted"],
        triggerAutoresponders: true,
      });

      // Invite to Circle
      await circleInviteToOrganika({ email, name });
    } else {
      console.warn("[webhook] no email on session", session.id);
    }

    // Decrement counter (increment sold count)
    await incrementSold();
  }

  return NextResponse.json({ received: true });
}
