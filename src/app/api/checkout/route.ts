import { NextResponse } from "next/server";
import { getStripe, PRODUCTS, priceCzkForCurrentTier } from "@/lib/stripe";
import { getSpotsLeft } from "@/lib/counter";

export const runtime = "nodejs";

interface Body {
  email?: string;
  name?: string;
}

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    // empty body OK
  }

  const { remaining } = await getSpotsLeft();
  const { product, priceCzk } = priceCzkForCurrentTier(remaining);
  const productInfo = PRODUCTS[product];

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    `https://${req.headers.get("host") ?? "socialmaty.cz"}`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      locale: "cs",
      allow_promotion_codes: true,
      customer_email: body.email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "czk",
            unit_amount: priceCzk * 100,
            product_data: {
              name: productInfo.name,
              description: productInfo.description,
            },
          },
        },
      ],
      metadata: {
        product,
        priceCzk: String(priceCzk),
        leadName: body.name ?? "",
      },
      success_url: `${baseUrl}/dekuji?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/system`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[checkout] failed", err);
    return NextResponse.json(
      { error: err?.message || "Stripe checkout selhal." },
      { status: 500 },
    );
  }
}
