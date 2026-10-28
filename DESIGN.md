---
name: "Meet Mehta Portfolio"
description: "A shelf of working software. Every tile is a real screen, real source, or a real fact."
colors:
  canvas: "#fbfbfa"
  tile: "#f1f1ef"
  card: "#ffffff"
  ink: "#0e0e0d"
  soft: "#6a6863"
  accent: "#2d5bff"
  night: "#0e0e0d"
typography:
  family: "Geist 400 to 600; Geist Mono only inside real source code"
  small: "0.875rem"
  body: "1rem, leading 1.5"
  lead: "clamp(1.125rem, 1rem + 0.35vw, 1.3125rem)"
  head: "clamp(2.25rem, 1.6rem + 2.2vw, 3.5rem), weight 550, leading 1, tracking -0.045em"
  wordmark: "fitted to the footer with cqi, weight 600"
rounded:
  card: "20px"
  stage: "14px"
  controls: "999px"
spacing:
  margin: "clamp(16px, 2vw, 28px)"
  gap: "clamp(10px, 1vw, 14px)"
---

# Design system

## Idea

The page is a curated shelf, after the way vibrant.design presents crafted work. It opens on the work, not on a name. The introduction is the first tile of a masonry of tiles. Each tile is a live product's desktop screen with its scroll loop, its phone screen, a verbatim excerpt of Go source, a portrait, or one fact from the record. Opening a project tile shows the full story in a sheet.

`src/data/gallery.ts` is the shelf. A `Tile` is a discriminated union (`screen`, `code`, `portrait`, `fact`), and each tile names its `shelf` (`products`, `systems`, `me`). The filter in the top bar reads `shelf` and nothing else. Reorder or add tiles there. Project facts stay in `src/data/projects.ts` and profile facts in `src/data/profile.ts`.

## Layout

- **Top bar.** A floating white pill. The name sits on the left, the shelf filter in the middle, and Record, Contact and a Résumé menu on the right. On phones only the filter and Résumé remain.
- **Shelf.** `Showcase` deals tiles into 4, 3, 2 or 1 columns, shortest column first, in list order. Each tile kind has an estimated height in `heightOf`, so the columns stay level and the first row always reads left to right. The intro leads the first column from three columns up and sits above the shelf on narrower screens.
- **Tiles.** A white card with a 6px inset and a 1px hairline. Inside it sits a stage on the project's own field colour (`theme` in `projects.ts`), then a caption with a lettered mark, the name and the kind.
- **Project sheet.** A native `<dialog>`. Its top is the project's field with the screens or the code, and below it the summary, links, what was built and the stack. Arrow keys and the buttons step through projects. The URL hash follows the open project, so `/#harvest-relay` deep-links to it.
- **About and record.** About text stays sticky on the left. On the right a single white panel holds experience, education, certifications and stack.
- **Contact.** One accent-blue card with the email set as display type and copy buttons.
- **Footer.** Dark, four short columns, and the name at full width.

## Colour

The canvas is near white and the tiles are one step greyer. Ink is near black. A single blue accent marks the primary action, the Résumé button, inline links and the contact card. Project colour appears only inside stages and the project sheet.

## Motion

Tokens and recipes come from transitions.dev and live at the top of `globals.css`. Every one has a `prefers-reduced-motion` fallback.

- **Texts reveal.** The intro rises line by line on load. Lower sections reveal as they enter (`html.js` gates the hidden state).
- **Tiles.** They rise in staggered on load. On hover a tile lifts 3px, its screen zooms 3% and a phone screen slides up. A press scales it to 0.985.
- **Filter.** The sliding-tabs pill moves between options, and the shelf reflows inside a View Transition so tiles glide to their new columns.
- **Sheet.** The modal recipe runs through `@starting-style` on `dialog[open]`, opening in 250ms and closing in 150ms. Content cross-fades when you step between projects.
- **Menu.** The Résumé dropdown grows from its trigger's top right.
- **Text morph.** "Copy email" morphs to "Copied".
- **Footer.** The name rises into place as it scrolls in.

## Assets

`public/work/` holds each live project's `-desktop.jpg`, `-mobile.jpg` and `.webm` loop. Regenerate them from the live sites with:

```bash
node scripts/capture-work.mjs
```

Portraits live in `public/me/`, résumés in `public/resume/`.
