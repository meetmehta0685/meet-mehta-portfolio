---
name: "Meet Mehta Portfolio"
description: "Type and colour fields, with the four live products as the pictures."
colors:
  paper: "#f0f0ee"
  ink: "#101010"
  soft: "#57544e"
  accent: "#ff5b14"
  night: "#121212"
  night-ink: "#f1f1ef"
  night-soft: "#a9a59d"
  tone-blue: "#c9d4ff"
  tone-mint: "#bfe8d4"
  tone-sun: "#ffd977"
  tone-coral: "#ffc3ae"
typography:
  family: "Hanken Grotesk 400 and 500, Helvetica Neue and Arial fallbacks"
  small: "0.875rem"
  body: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem), leading 1.5"
  lead: "clamp(1.25rem, 1.05rem + 0.75vw, 1.75rem), leading 1.3"
  statement: "clamp(2rem, 1rem + 3.6vw, 4.25rem), leading 1.04"
  head: "clamp(2.5rem, 1.2rem + 4.2vw, 5.5rem), weight 500, leading 0.95, tracking -0.045em"
  wordmark: "fitted to its container with cqi, weight 500, tracking -0.06em"
rounded:
  all: "0"
spacing:
  margin: "clamp(16px, 2.2vw, 32px)"
  gutter: "clamp(16px, 1.8vw, 28px)"
  section-gap: "clamp(96px, 12vw, 200px)"
---

# Design system

## Idea

The first screen is the name and one sentence. The pictures are the work itself. Each of the four products has its own chapter, coloured with that product's own palette and showing its real desktop screen, phone screen, and a scroll loop of the live site. The page reads like a showreel of products that are running today.

## Colour

Paper, ink, and one orange accent. The accent marks the primary action on hover, the second half of the staircase statement, the closing link in About, and the whole contact sheet. Nothing else is orange.

Project chapters take their colours from `theme` in `src/data/projects.ts` (field, ink, soft, accent), matched to each live interface. Keep a tone step between a chapter's field and its screenshot's own background so the screen never dissolves into the field. Harvest Relay's field is darker than its site for that reason.

The four highlight tones in About are the only tints on the page.

## Type

One family, Hanken Grotesk, in two weights. Five steps do the work: small, body, lead, statement, head. The hero name and the footer sign-off use a seventh, fitted size so "Meet Mehta" spans its container on one line at every width. The contact email is fitted the same way. Running text is full ink at 16px or more. Grey is for secondary notes.

Headings stay within two lines at every width. Sentence case everywhere. No tracked uppercase labels, no monospace, no index numbers.

## Layout

A 12-column grid inside equal outer margins. Neighbouring sections never share a composition:

- **Hero.** Corners carry the sentence and button, the navigation, the city and degree, and three links. The name runs across the middle. On phones the name moves up and the first product's phone screen fills the bottom, cropped by the screen edge.
- **Statement.** A dark field with a stepped list of what goes wrong in operational work, answered by an orange heading. Two portraits fill the right quarter.
- **Work.** A ledger of the four product names at heading size. Hovering or focusing a row dims the others and cross-fades its screen into the sticky preview frame.
- **Chapters.** One per project, on its own field. Name, kind, and summary; desktop and phone screens (mirrored on alternate chapters); then achievements, stack, and links.
- **About.** Two columns of large text with four highlighted facts and a highlighted closing link.
- **Record.** Experience, education, and certifications as two-ended rows, with the stack in a second column.
- **Contact.** An orange field with the email set as display type.
- **Footer.** A dark close with four short columns and the name at full width.

No rules, no cards, no shadows, no gradients, no rounded corners. Surfaces separate by a change of field colour.

## Motion

Motion tokens and recipes come from transitions.dev and live at the top of `globals.css`.

- **Texts reveal.** Every section's parts rise 12px out of a 3px blur as they enter, staggered 80ms per line and capped at three steps. The hidden state only applies once script has run (`html.js`), so the page reads in full without JavaScript. The first screen uses a CSS-only version so the title paints immediately.
- **Signature move.** The hero name recedes (scale 0.93, fading) as the first screen scrolls away. The footer name grows into place as it arrives. Both use scroll-driven animations with a static fallback.
- **Moving pictures.** Each chapter's desktop screen carries a muted loop that plays only while on screen and cross-fades in over its screenshot once playing. Phone screens drift 8% against the scroll.
- **Feedback.** Learn-more chevrons spread on hover. The ledger preview cross-fades with blur. The phone number's Copy button morphs to "Copied" through the text-morph recipe. Buttons press to 0.98.

Every move has a `prefers-reduced-motion` fallback that keeps the content and drops the travel. Loops do not autoplay under reduced motion.

## Assets

`public/work/` holds each project's `-desktop.jpg` (2880×1800), `-mobile.jpg` (1170×2532), and `.webm` loop. Regenerate them from the live sites with:

```bash
node scripts/capture-work.mjs
```

Pass slugs to refresh only some projects. Portraits live in `public/me/`.
