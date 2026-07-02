# Arthur Business Services — website redesign concept

A polished, single-page website concept for **Arthur Business Services LLC** — a virtual,
CPA-led bookkeeping, tax preparation, payroll, and advisory firm led by **Jamie Arthur,
CPA, CIA**. This is an **unsolicited concept pitch**, not the official site.

## Why a redesign

Their current site (a stock WordPress "Neve" theme at arthurbusinessservices.com) is
functional but generic and does the business no favors:

- **Templated and forgettable** — a default theme with no distinct brand identity for a
  premium, credential-heavy CPA practice.
- **Weak hierarchy & flow** — services, the owner's story, and the strong 6-review track
  record are buried on separate thin pages instead of building one persuasive narrative.
- **No real motion or polish** — static, dated, and not the "trustworthy and modern"
  first impression a financial professional deserves.
- **Buried call-to-action** — the free discovery call (the whole point) is easy to miss.

This concept keeps **100% of their real content** — every service, the full owner bio,
all six verified reviews, credentials, and the real call/text number — and reorganizes it
into a clear, credible, single-page story with an animated nav, editorial section layouts,
scroll-reveal motion, and a prominent inquiry form + click-to-call.

## What's real vs. placeholder

- **Real:** business name, owner (Jamie Arthur, CPA, CIA), all services & descriptions,
  credentials, the full owner story, all six client reviews, and the phone number
  **(479) 488-5991** — all sourced from their own site.
- **Placeholder (`<!-- IMG-NEEDED -->`):** photography. Their images are Facebook/token-
  blocked and unavailable elsewhere, so on-brand placeholders stand in. See
  `assets/photos/DROP-PHOTOS-HERE.md` to swap in real photos.
- The inquiry form is a **real, styled UI with client-side validation** but is not wired to
  a backend (concept piece) — it directs visitors to call/text.

## How to view

Just open **`index.html`** in any browser (double-click it). No build step, no
dependencies. Fully responsive from phones to widescreen; respects reduced-motion.

## Tech

Static `index.html` + `styles.css` + `script.js`. One Google Fonts link
(Fraunces + Inter). Vanilla JS for the nav, mobile menu, scroll reveals, and form.
