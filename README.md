# lto-2 — Automated Booking Funnel Landing Page

Static landing page for the "Automated Booking Funnel in 48 Hours — Or You Don't Pay" offer.

Single HTML file: all CSS is inline in `<style>`, no build step. The only external
dependencies are the Wistia player scripts for the hero video and the remotely hosted
result images and testimonial videos.

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

## Theme

Colours are CSS custom properties on `:root` in `index.html` — `--bg`, `--bg-grad`,
`--card`, `--surface`, `--text`, `--muted`, `--line`, `--accent`, plus `--danger`
/`--danger-glow` for the crossed list and `--success`/`--success-glow`/`--glass` for
the numbered reason cards. The page is dark: a
muted-white-to-near-black gradient running left to right on the root element. It sits on
`html` rather than `body` with `background-attachment:fixed`, which iOS Safari ignores;
being horizontal, it needs no vertical sizing and renders the same at any page height. White text, muted grey for secondary copy, cards on their own
subtle dark gradient. Editing those eight
values reskins the whole page; nothing else hardcodes a colour.

## Layout

Every section shares one content width: the `.wrap` container is 920px, giving
880px of content once padding is subtracted. Video, process row, deliverables list,
results grid, FAQ and guarantee all line up on the same edges. The process steps stack
vertically; the results run two across, collapsing to one column under 768px.

Section order: hero and video, CTA, warning pill, process, what you get, pitch, stats,
CTA, social proof, CTA, FAQ, guarantee, closing CTA.

## Editing the page

Content lives in one file, `index.html`:

- **Eyebrow / headline** — `.eyebrow` qualifier above the `<h1>`, top of `.wrap`
- **Video** — the Wistia player (`media-id="9snpqwxxn9"`) inside `.video-embed`, which
  carries the accent glow; its two scripts sit at the top of `<head>`
- **Stats** — `.stats` (800+, $7m+, 8 years), between the pitch and the process section
- **Pitch** — the `.pitch` block under the hero CTA: warning pill, hook heading,
  the "tried everything" `.pain-list`, the three-reason `.why-list`, and the `$48`
  price lines
- **CTA** — the `.cta-block` (button + "Delivered in 48 hours" note) repeats after every
  section: hero, process, deliverables, results and the closing block. All five are the
  same markup, so edit them together. None have a link/handler yet.
- **Steps** — the three `.step-box` blocks stacked vertically, each an icon beside a
  `.step-label` / `.step-title` / `.step-text` body;
  the glass reads against the accent glow painted by `.steps::before`
- **Mockups** — `.mockups`, a two-by-two grid after the deliverables list: four niche
  examples, each a `.mockup-label` above a transparent PNG. One column under 768px.
  The CSS uses `drop-shadow`, which follows the alpha edge rather than boxing the
  image. Source files are cropped to their alpha bounds and capped at 1100px wide.
- **Social proof** — one `.wins` grid holding two card types: `.review` cards
  (avatar, name, industry, date, rating, headline, quote, media, category) for
  clients with a written testimonial, and `.win` cards (company, headline, image)
  for results with no quote. Two columns, one under 768px. Images use remote URLs,
  videos are YouTube iframes. Testimonial copy is verbatim from scalbl.io.
- **FAQ** — `<details>` elements in `.faq`
- **Guarantee** — `.guarantee` block after the FAQ
- **Checkout** — `.checkout` at `#checkout`: name and email fields, item row, the
  `.co-bump` order bump, order summary, a placeholder where the Whop embed goes, and
  the Complete Order button. The inline script at the end of `<body>` toggles the
  bump line and total. Visual only — nothing submits yet.

### Known TODOs


- The pitch block says "95% OFF our usual price of a $5000 funnel build", but $48 off
  $5000 is 99% off. Either the percentage or one of the prices needs correcting.

- The CTA buttons don't do anything yet — wire all five to the booking/checkout link.
- The checkout is a mock. It needs the Whop plan IDs, the embed swapped in for the
  placeholder, and the bump's real name, price and description (currently `[ADD-ON
  NAME]` at a stand-in $27).
- No Meta Pixel. The head has a TODO where the base code goes; without it Meta can't
  optimise for appointments and you can't retarget.
- `og:url` and `og:image` are still TODO in the head — sharing the link shows no card.
- Jordan appears twice: once as the home renovations testimonial, once as the roofing
  company result. Confirm these are different clients, or drop one.
- Pascal (plumbing) and Wilco Relining (pipe relining) may be the same client under a
  personal and a company name. Confirm before publishing.
- Result images are hot-linked from an external CDN; move them into `assets/` if you want them self-hosted.
