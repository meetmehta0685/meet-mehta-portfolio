---
name: "Meet Mehta Portfolio"
description: "Modelled on Adobe Portfolio's Marta theme: a fixed coral bar, a full-screen photo greeting, a tight three-up grid named on hover, centred bold project pages."
colors:
  coral: "#f75a56"
  coral-deep: "#c43c38 (buttons and coral text on white, for contrast)"
  ink: "#111111"
  soft: "#6e6e6e"
  faint: "#8f8f8f"
  line: "#ececec"
typography:
  family: "Jost 400, 500 and 700 (a Futura-style geometric sans); system monospace for real source code only"
  nav: "20px, lowercase; the current page in 700"
  logo: "27px, 700, lowercase"
  masthead: "clamp(38px, 7.4vw, 86px), 700"
  page-title: "clamp(34px, 4.6vw, 46px), 700"
  labels: "18px, 700, uppercase"
rounded:
  all: "0, except pill buttons, the round back-to-top button and phone screenshots"
---

# Design system

Project, biography and contact facts live in `src/data/`. Pages only lay them out.

## Idea

- **Coral bar.** Fixed, 70px. Lowercase work, about and contact on the left, "meet mehta" centred, GitHub, LinkedIn and email on the right. Under 760px it becomes the name and a hamburger that opens a full-screen coral menu.
- **Work (`/`).** A full-screen greeting: the booth portrait in grayscale, multiplied into coral, under "Hi! I'm Meet Mehta. I'm a full-stack developer based in Ahmedabad." and a nudging chevron. Then a gapless grid of covers, three across (two under 1000px, one under 640px). Hovering a cover fills it with coral and names the project. Touch screens show the name on a dark fade instead.
- **Project (`/work/[slug]`).** Bold centred title, grey summary, small uppercase labels above full-width modules (desktop screen with its loop, phone screen on the project's field colour, or the code excerpt). Then uppercase "What I built" and "Built with", pill buttons, and previous and next.
- **About.** Two portraits side by side as a banner, then left-aligned uppercase sections: About, Experience, Education, What I use, Certifications, Résumé, and a coral "get in touch" line.
- **Contact.** "Say hello!", an underlined form whose send button opens the visitor's email app, then email, phone with Copy, and links.
- **Back to top.** A round translucent button, bottom right, appears after 400px of scroll and turns coral on hover.

## Motion

Pages fade in. The greeting rises in. Cover overlays fade and lift on hover. The loop video plays only while on screen. Reduced motion collapses all of it.

## Assets

`public/work/` holds each project's `-desktop.jpg` (2880×1800), `-mobile.jpg` (1170×2532), and `.webm` loop. Regenerate them from the live sites with:

```bash
node scripts/capture-work.mjs
```

Pass slugs to refresh only some projects. Portraits live in `public/me/`. `avatar.jpg` is a 192px square crop of `booth.jpg` used as the logo.
