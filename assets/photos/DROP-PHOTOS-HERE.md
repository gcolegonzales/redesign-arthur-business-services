# Drop real photos here

Arthur Business Services' only public presence is Facebook + a WordPress site whose
images could not be downloaded (Facebook images are token-blocked; the site served no
usable photography). The redesign therefore ships with tasteful, on-brand placeholders
marked `<!-- IMG-NEEDED -->` in `index.html`.

To swap in real imagery, drop files here and update the matching spots in `index.html`
and `styles.css`:

| File to add            | Used for                                    | Where in code                          |
|------------------------|---------------------------------------------|----------------------------------------|
| `jamie.jpg`            | Jamie Arthur headshot (About section)       | `.portrait-ph` in the About block      |
| `client-1..4.jpg`      | "Who we help" tiles (trades/creatives/etc.) | `.who-photos .ph` list items           |
| `logo.svg` / `logo.png`| Real brand logo (replaces the SVG mark)     | `.brand-mark` in the nav / footer      |

Recommended: landscape ~1200px wide for the "who we help" tiles, portrait 4:5 for the
headshot. Once added, replace the placeholder `<div>`s with `<img src="assets/photos/…"
alt="…">` and delete the corresponding placeholder background rules if desired.
