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

Every section shares one content width: the `.wrap` container is 920px, giving
880px of content once padding is subtracted. Video, process row, deliverables list,
results grid, FAQ and guarantee all line up on the same edges. The process steps run
three across and the results two across, both collapsing to one column under 768px.

Section order follows a standard VSL offer page: hero and video, CTA, process, CTA,
who it's for, what you get, CTA, results, CTA, FAQ, guarantee, closing CTA.

## Editing the page

Content lives in one file, `index.html`:

- **Headline** — top of `.wrap`
- **Video** — replace the whole `<div class="video-placeholder">…</div>` block with your embed code
- **CTA** — the `.cta-block` (button + "Delivered in 48 hours" note) repeats after every
  section: hero, process, deliverables, results and the closing block. All five are the
  same markup, so edit them together. None have a link/handler yet.
- **Steps** — the three `.step-box` blocks still contain placeholder copy
- **Results** — `.win` cards in a two-column grid (`.wins`), collapsing to one column under 768px; images use remote URLs, videos are YouTube iframes
- **FAQ** — `<details>` elements in `.faq`
- **Guarantee** — `.guarantee` block after the FAQ
- **Closing** — "Get Started Today" heading and the final CTA

### Known TODOs

- Steps 1–3 are placeholder text.
- The CTA buttons don't do anything yet — wire all five to the booking/calendar link.
- The hero video is a placeholder.
- Result images are hot-linked from an external CDN; move them into `assets/` if you want them self-hosted.
