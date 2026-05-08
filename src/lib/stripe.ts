import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY missing");
  stripeClient = new Stripe(key, { apiVersion: "2024-11-20.acacia" as Stripe.LatestApiVersion });
  return stripeClient;
}

export type ProductId = "organika" | "organika-late";

export const PRODUCTS: Record<
  ProductId,
  { name: string; description: string; priceCzk: number }
> = {
  organika: {
    name: "Projekt Organika",
    description: "3 dny + osobní zpětná vazba + komunita doživotně.",
    priceCzk: 697,
  },
  "organika-late": {
    name: "Projekt Organika (po vyprodání 100 míst)",
    description: "3 dny + osobní zpětná vazba + komunita doživotně.",
    priceCzk: 997,
  },
};

export function priceCzkForCurrentTier(spotsLeft: number): {
  product: ProductId;
  priceCzk: number;
} {
  if (spotsLeft > 0) return { product: "organika", priceCzk: PRODUCTS.organika.priceCzk };
  return { product: "organika-late", priceCzk: PRODUCTS["organika-late"].priceCzk };
}
