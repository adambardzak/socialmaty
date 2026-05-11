# Socialmaty — Projekt Organika

Two-stage organic funnel for Matyáš Linda (socialmaty.cz):

1. **`/`** — Redirects to `/start` (canonical landing for IG bio).
2. **`/start`** — Linktree-style hub: free training (`/optin`) + projektorganika.cz.
3. **`/optin`** — Opt-in for free 20-min training (collects name + email).
4. **`/trenink`** — Free training video + sales page for Projekt Organika (697 Kč).
5. **`/dekuji`** — Thank-you page (optional, not in primary flow — Circle paywall has its own).

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Ecomail (lead capture, tagging, automations)
- Circle.so admin v2 API (invite to Growmat Academy + paywall checkout)

## Setup

```bash
npm install
cp .env.example .env.local
# fill in the keys
npm run dev
```

Open http://localhost:3000.

## Funnel flow

```
Visitor → /optin (opt-in form)
       → POST /api/lead
           → Ecomail subscribe (tag: lead, trenink-zdarma) — socialmaty list
           → Circle invite to Growmat Academy (CIRCLE_SPACE_IDS)
       → redirect to /trenink?name=...&email=...
       → Ecomail automation also sends email with link as fallback

       /trenink (training video + full sales for Projekt Organika)
       → click CTA → opens Circle paywall in new tab:
           https://growmatacademy.circle.so/checkout/-projekt-organikar
       → Circle handles payment + access provisioning + welcome email
```

### Ecomail email template

After opt-in, Ecomail should send an automation email to the new subscriber with the
training link. Suggested template:

> **Subject**: Tady je tvůj trénink zdarma 🎬
>
> Ahoj {{ FNAME }},
>
> díky! Tady je odkaz na 27minutový trénink:
>
> 👉 https://socialmaty.cz/trenink
>
> Vezmi si tužku, papír a 30 minut klidu. Uvidíme se uvnitř.
>
> — Matyáš

Trigger: subscriber added to list with tag `lead`.

## API routes

| Route | What it does |
| --- | --- |
| `POST /api/lead` | Validates name+email+consent, subscribes to Ecomail with `lead` tag, invites to Circle space. |

## Environment variables

| Var | Description |
| --- | --- |
| `ECOMAIL_API_KEY` | Ecomail API key |
| `ECOMAIL_LIST_ID` | Ecomail list ID for socialmaty.cz leads |
| `CIRCLE_API_TOKEN` | Circle.so admin API token (Growmat Academy) |
| `CIRCLE_COMMUNITY_URL` | Defaults to `https://growmatacademy.circle.so` |
| `CIRCLE_SPACE_IDS` | Comma-separated Circle space IDs to add new members to |
| `NEXT_PUBLIC_CIRCLE_CHECKOUT_URL` | Defaults to `https://growmatacademy.circle.so/checkout/-projekt-organikar` |
| `NEXT_PUBLIC_CIRCLE_URL` | Used on `/dekuji` button. Defaults to `https://growmatacademy.circle.so` |
| `NEXT_PUBLIC_TRAINING_BUNNY` / `NEXT_PUBLIC_TRAINING_YT_ID` / `NEXT_PUBLIC_TRAINING_VIDEO_URL` | Video sources (fallback chain). Defaults to self-hosted `/trenink_zdarma_720p.mp4`. |
| `NEXT_PUBLIC_BASE_URL` | e.g. `https://socialmaty.cz` |

## Branding

- Background: white `#ffffff`
- Text: black `#0a0a0a`
- Accent: green `#16a34a`
- Fonts: Poppins (display), Inter (body), IBM Plex Mono (eyebrows/data)
- Sharp design system — 2px border-radius everywhere.

## Video hosting

Self-hosted in `public/trenink_zdarma_720p.mp4` (66 MB, 720p H.264, fast-start).
Vercel Pro plan covers bandwidth.

To re-compress source:

```bash
ffmpeg -i source.mov \
  -vf "scale=-2:720" \
  -c:v libx264 -preset slow -crf 26 \
  -maxrate 1000k -bufsize 2000k \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  public/trenink_zdarma_720p.mp4
```

`-movflags +faststart` is critical — enables streaming playback before full download.

## TODO before launch

- [x] Compressed training video committed
- [x] Replace placeholder photos of Matyáš
- [x] Real before/after case studies & reviews
- [ ] Verify `CIRCLE_SPACE_IDS` env var on Vercel (same Circle space as projektorganika)
- [ ] Create Ecomail automation: `lead` → welcome email with training link
- [ ] Add legal pages `/obchodni-podminky` and `/ochrana-soukromi` (footer links)
- [ ] Wire DNS `socialmaty.cz` → Vercel
