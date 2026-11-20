---
name: "Meet Mehta Portfolio"
description: "A quiet gallery modelled on Adobe Portfolio's Mercedes theme: grey header band, centred logo, a two-up grid of covers, centred pages."
colors:
  bg: "#ffffff"
  band: "#f9f9f9"
  ink: "#222222"
  title: "#444444"
  soft: "#6b6b6b"
  faint: "#8a8a8a"
  line: "#e8e8e8"
  button: "#ececec"
typography:
  family: "Hanken Grotesk 300, 400 and 500, Helvetica Neue and Arial fallbacks; system monospace for real source code only"
  body: "17px, weight 300, leading 1.5"
  caption: "18px, weight 300 (cover titles)"
  page-title: "clamp(32px, 4vw, 40px), weight 300"
  menu: "clamp(32px, 6vw, 40px), weight 300"
rounded:
  all: "0, except the round logo portrait and phone screenshots"
spacing:
  side: "clamp(16px, 5vw, 42px)"
  gap: "clamp(20px, 4.5vw, 38px)"
  max: "1280px grid, 1100px project modules, 680px reading column"
---

# Design system

## Idea

The site follows the structure of Adobe Portfolio's Mercedes theme. Typography stays sans-serif (the theme's slab captions are replaced by Hanken Grotesk Light) per the brand commitment in `PRODUCT.md`.

- **Header.** A light grey band with a round portrait and the name centred, and a hamburger on the right. The hamburger opens a full-screen white menu with large light links (Work, About, Contact) and three icons.
- **Work (`/`).** One short centred line, then a two-column grid of covers (one column under 640px). Each cover is a 4:3 tile in the project's own field colour with its desktop screen bleeding off the right edge and its phone screen overlapping. Code projects show their source excerpt in the same position. A light centred caption sits below.
- **Project (`/work/[slug]`).** A centred title, kind, and grey summary, then full-width modules: the desktop screen with its scroll loop fading in over it, and the phone screen on the project's field colour. Code projects show the excerpt, caption, and source link on their field colour. Then "What I built", the stack, buttons, previous and next, and "↑ Back to Top".
- **About.** Centred bio, two portraits, then Experience, Education, Certifications, Stack, and Résumé.
- **Contact.** The theme's form (Name, Email Address, Message, Submit). With no mail server, Submit opens the visitor's email app with the message filled in. Direct email, phone with Copy, and links sit below.

`evidence` in `src/data/projects.ts` decides which a project shows: `"live"` projects need captures in `public/work/`, `"code"` projects need an `excerpt` copied from the repository.

## Colour

White page, grey band, greys for text. The only strong colour comes from each project's `theme` (field, ink, soft, accent), used on its cover and its field modules, matched to that project's own interface.

## Motion

Each page fades up 8px on load. The menu fades and its links rise in a short stagger. Covers drift their screens on hover. The logo portrait scales slightly on hover. The loop video plays only while on screen and never under reduced motion. Reduced motion collapses every transition.

## Assets

`public/work/` holds each project's `-desktop.jpg` (2880×1800), `-mobile.jpg` (1170×2532), and `.webm` loop. Regenerate them from the live sites with:

```bash
node scripts/capture-work.mjs
```

Pass slugs to refresh only some projects. Portraits live in `public/me/`. `avatar.jpg` is a 192px square crop of `booth.jpg` used as the logo.
