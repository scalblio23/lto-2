# lto-2 — Automated Booking Funnel Landing Page

Static landing page for the "Automated Booking Funnel in 48 Hours — Or You Don't Pay" offer.

Single self-contained HTML file: all CSS is inline in `<style>`, no build step, no dependencies.

## Structure

```
.
├── index.html      # the landing page (entry point)
├── assets/         # local images / video / files referenced by the page
├── .nojekyll       # tells GitHub Pages to serve files as-is
├── .gitignore
└── README.md
```

## Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` in a browser.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3).

For GitHub Pages: Settings → Pages → deploy from branch, root (`/`) of the chosen branch.

## Layout

The page wrapper is 1080px wide. Text sections (hero, steps, "who is this for",
the deliverables list, FAQ) sit in a 720px `.narrow` reading column; the results
grid uses the full width so the cards can run two across.

## Editing the page

Content lives in one file, `index.html`:

- **Headline / subhead** — top of `.wrap`
- **Video** — replace the whole `<div class="video-placeholder">…</div>` block with your embed code
- **CTA** — the `<button class="cta">` (currently has no link/handler; point it at your booking URL)
- **Steps** — the three `.step-box` blocks still contain placeholder copy
- **Results** — `.win` cards in a two-column grid (`.wins`), collapsing to one column under 768px; images use remote URLs, videos are YouTube iframes
- **FAQ** — `<details>` elements in `.faq`

### Known TODOs

- Steps 1–3 are placeholder text.
- The CTA button doesn't do anything yet — wire it to the booking/calendar link.
- The hero video is a placeholder.
- Result images are hot-linked from an external CDN; move them into `assets/` if you want them self-hosted.
