# Socialmaty — Projekt Organika

Two-stage organic funnel for Matyáš Linda (socialmaty.cz):

1. **Page #1** (`/`) — Opt-in for free 20-min training (collects name + email).
2. **Page #2** (`/system`) — Free training video + sales page for Projekt Organika (697 Kč).
3. **Page #3** (`/dekuji`) — Thank-you page with Circle invite onboarding.
4. **`/start`** — Linktree-style hub with the value ladder.

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Stripe Checkout
- Ecomail (lead capture, tagging, automations)
- Circle.so API (community invite after purchase)
- Vercel KV (counter for "X / 100 spots")

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in the keys
npm run dev
```

Open http://localhost:3000.

## Funnel flow

```
Visitor → /  (opt-in) → POST /api/lead
                         → Ecomail subscribe (tag: lead, trenink-zdarma)
                         → redirect to /system?name=...&email=...

         /system (training video + sales)
                         → click CTA → POST /api/checkout
                         → Stripe Checkout (697 Kč or 997 Kč after 100 sold)

         Stripe → POST /api/stripe-webhook (checkout.session.completed)
                         → Ecomail re-tag (buyer-organika, triggers welcome)
                         → Circle invite (community + space)
                         → KV increment sold counter

         Stripe success_url → /dekuji?session_id=...
                         → verify session paid
                         → show onboarding + Circle button
```

## API routes

| Route | What it does |
| --- | --- |
| `POST /api/lead` | Validates name+email+consent, subscribes to Ecomail with `lead` tag. |
| `GET /api/counter` | Returns `{sold, remaining, limit, priceCzk}` — used by `<SpotsCounter>`. |
| `POST /api/checkout` | Creates Stripe Checkout Session at the current tier price. |
| `POST /api/stripe-webhook` | Verifies signature, retags Ecomail, invites to Circle, increments counter. |

## Stripe webhook setup

After deploy, in Stripe dashboard add a webhook endpoint:

- URL: `https://socialmaty.cz/api/stripe-webhook`
- Event: `checkout.session.completed`
- Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

For local testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Counter / pricing logic

- `0–99 sold` → 697 Kč, badge shows `X / 100 spots`
- `100+ sold` → 997 Kč, badge shows "First wave sold out"
- Stored in Vercel KV (`organika:sold_count`). Falls back gracefully when KV is not configured (always shows 100/100 in dev).

## Branding

- Background: white `#ffffff`
- Text: black `#0a0a0a`
- Accent: green `#16a34a`
- Fonts: Poppins (display), Inter (body), IBM Plex Mono (eyebrows/data)
- Sharp design system — 2px border-radius everywhere.

## TODO before launch

- [ ] Replace placeholder photos of Matyáš in `/public/`
- [ ] Replace `[screenshot]` placeholders on `/system` with real screenshots
- [ ] Set `NEXT_PUBLIC_TRAINING_YT_ID` or upload video to Bunny.net and set `NEXT_PUBLIC_TRAINING_VIDEO_URL`
- [ ] Create Ecomail automations: `lead` → welcome with training, `buyer-organika` → access details
- [ ] Create Circle space "Projekt Organika" and grab `CIRCLE_SPACE_ID`
- [ ] Add legal pages `/obchodni-podminky` and `/ochrana-soukromi` (footer links)
- [ ] Wire DNS `socialmaty.cz` → Vercel
