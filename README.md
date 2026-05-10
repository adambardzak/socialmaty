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

## Video hosting (Cloudflare R2)

The training video (~27 min) is hosted on **Cloudflare R2** (10 GB free storage,
near-zero egress fees). The `<VslPlayer>` component reads the URL from
`NEXT_PUBLIC_TRAINING_VIDEO_URL`.

### 1. Compress the source video

Source ~3.25 GB → target ~200 MB at 720p. Use ffmpeg:

```bash
# H.264 / MP4 (best compatibility — Safari, iOS, all browsers)
ffmpeg -i source.mov \
  -vf "scale=-2:720" \
  -c:v libx264 -preset slow -crf 26 \
  -maxrate 1000k -bufsize 2000k \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  trenink-720p.mp4

# Optional: WebM / VP9 (smaller, but no Safari fallback needed since we have MP4)
ffmpeg -i source.mov \
  -vf "scale=-2:720" \
  -c:v libvpx-vp9 -b:v 1000k -crf 32 \
  -c:a libopus -b:a 96k \
  trenink-720p.webm
```

`-movflags +faststart` is **critical** — moves the MP4 metadata to the start so
the video starts playing before the full download finishes (essential for VSLs).

Expected output: ~180–250 MB MP4, ~150–200 MB WebM.

### 2. Upload to Cloudflare R2

1. Create a Cloudflare account → R2 → Create bucket (e.g. `socialmaty-video`).
2. Upload `trenink-720p.mp4` via dashboard (or `wrangler r2 object put`).
3. R2 bucket → Settings → **Public Access** → Connect Custom Domain
   (e.g. `video.socialmaty.cz`) OR enable the `r2.dev` public URL.
4. **CORS**: add rule allowing `GET` from `https://socialmaty.cz` (and localhost
   for dev). Without CORS the `<video>` element may fail to seek.

   ```json
   [{
     "AllowedOrigins": ["https://socialmaty.cz", "http://localhost:3000"],
     "AllowedMethods": ["GET", "HEAD"],
     "AllowedHeaders": ["*"],
     "MaxAgeSeconds": 3600
   }]
   ```

5. Copy the public URL → set in Vercel:

   ```
   NEXT_PUBLIC_TRAINING_VIDEO_URL=https://video.socialmaty.cz/trenink-720p.mp4
   ```

### 3. Cost estimate

R2 pricing (May 2026):
- Storage: $0.015/GB/month → 200 MB ≈ **$0.003/month**
- Class A ops (writes): $4.50 / million → negligible
- Class B ops (reads): $0.36 / million → negligible
- **Egress: $0** (Cloudflare's killer feature)

For 1000 views/month of a 200 MB video on Bunny: ~$1. On R2: **$0.003**.

## TODO before launch

- [x] Replace placeholder photos of Matyáš (`/public/img/maty.webp`)
- [x] Real before/after case studies & reviews
- [ ] Compress training video to 720p MP4 (~200 MB) — see above
- [ ] Upload to Cloudflare R2 + set `NEXT_PUBLIC_TRAINING_VIDEO_URL`
- [ ] Create Ecomail automations: `lead` → welcome with training, `buyer-organika` → access details
- [ ] Create Circle space "Projekt Organika" and grab `CIRCLE_SPACE_ID`
- [ ] Add legal pages `/obchodni-podminky` and `/ochrana-soukromi` (footer links)
- [ ] Wire DNS `socialmaty.cz` → Vercel
- [ ] Enable Vercel Analytics in dashboard (auto-tracks via `@vercel/analytics`)
