---
name: "Meet Mehta Portfolio"
description: "A precise submission folio for software work that has to move."
colors:
  burnt-folio-orange: "#b74818"
  warm-ivory-stock: "#f5e9dc"
  registration-ink: "#171716"
  graphite-annotation: "#5f5b55"
  hairline-rule: "color-mix(in srgb, var(--ink) 28%, transparent)"
typography:
  proposition:
    fontFamily: "Stack Sans Text, Source Sans 3, Arial, sans-serif"
    fontSize: "clamp(68px, 6.64vw, 102px)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  section-heading:
    fontFamily: "Stack Sans Text, Source Sans 3, Arial, sans-serif"
    fontSize: "clamp(3.25rem, 6.5vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  register-title:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "clamp(20px, 2.02vw, 31px)"
    fontWeight: 620
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Source Sans 3, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "0.06em"
rounded:
  square: "0"
spacing:
  compact: "0.75rem"
  base: "1rem"
  measured: "1.25rem"
  open: "2rem"
components:
  ruled-navigation:
    backgroundColor: "transparent"
    textColor: "{colors.registration-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 0.5rem 14px"
  ruled-navigation-hover:
    backgroundColor: "{colors.registration-ink}"
    textColor: "{colors.warm-ivory-stock}"
    rounded: "{rounded.square}"
  project-register-row:
    backgroundColor: "transparent"
    textColor: "{colors.registration-ink}"
    rounded: "{rounded.square}"
    height: "25%"
    width: "100%"
  project-register-row-hover:
    backgroundColor: "{colors.registration-ink}"
    textColor: "{colors.warm-ivory-stock}"
    rounded: "{rounded.square}"
  square-action:
    backgroundColor: "transparent"
    textColor: "{colors.registration-ink}"
    rounded: "{rounded.square}"
    padding: "0.6rem 0.9rem"
    height: "2.8rem"
  section-label:
    backgroundColor: "{colors.warm-ivory-stock}"
    textColor: "{colors.registration-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "2rem clamp(1.5rem, 3vw, 3.5rem)"
  inspector-panel:
    backgroundColor: "{colors.warm-ivory-stock}"
    textColor: "{colors.registration-ink}"
    rounded: "{rounded.square}"
    width: "min(48rem, 100%)"
  inspector-tab:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-annotation}"
    rounded: "{rounded.square}"
    padding: "0 0.75rem"
    height: "2.75rem"
  inspector-tab-active:
    backgroundColor: "transparent"
    textColor: "{colors.burnt-folio-orange}"
    rounded: "{rounded.square}"
  contact-row:
    backgroundColor: "transparent"
    textColor: "{colors.warm-ivory-stock}"
    rounded: "{rounded.square}"
    height: "3.5rem"
    width: "100%"
  registration-mark:
    backgroundColor: "{colors.registration-ink}"
    rounded: "{rounded.square}"
    size: "20px"
---

# Design System: Meet Mehta Portfolio

## Overview

**Creative North Star: "The Architect’s Submission Folio"**

The portfolio behaves like a carefully assembled candidate submission: measured, legible, and confident without becoming corporate. Warm stock, near-black type, grayscale photography, burnt-orange indexing marks, and thin rules create an editorial document world whose precision supports fast evaluation.

The mood is simple, elegant, precise, editorial, and quietly technical. Density comes from registers and annotations rather than floating containers; personality comes from composition, proportion, and typographic scale rather than glossy gradients or decorative technology imagery.

**Key Characteristics:**

- Warm, lightly textured folio stock under a near-black typographic field.
- Square geometry, hairline rules, numbered registers, and measured captions.
- Oversized sans-serif propositions paired with compact operational annotations.
- Burnt orange used as an indexing and action signal, never as ambient decoration.
- Grayscale photography framed as a measured image window.

## Colors

The palette resembles a printed submission folio: warm paper and dense registration ink, with restrained graphite notes and one oxidized-orange signal.

### Primary

- **Burnt Folio Orange** (`#b74818`): Marks folio indices, categories, active inspector tabs, focus outlines, selections, and small high-priority actions.

### Neutral

- **Warm Ivory Stock** (`#f5e9dc`): The page and inspector surface; a subtle repeating paper texture may sit over it.
- **Registration Ink** (`#171716`): Primary text, structural borders, inverted hover fields, and the dark contact sheet.
- **Graphite Annotation** (`#5f5b55`): Secondary explanations, dates, evidence, captions, and subdued controls.
- **Hairline Rule** (`color-mix(in srgb, var(--ink) 28%, transparent)`): Default dividers; stronger rules use the same ink at locally observed higher mixes.

### Named Rules

**The Folio Signal Rule.** Burnt Folio Orange identifies position, state, or action; it does not become a gradient, glow, or decorative wash.

**The Ink-and-Stock Rule.** Build the page from Registration Ink, Warm Ivory Stock, and rules first; introduce color only after the document hierarchy works without it.

## Typography

**Display Font:** Stack Sans Text (with Source Sans 3, Arial, and sans-serif fallbacks)
**Body Font:** Source Sans 3 (with Arial and sans-serif fallbacks)

**Character:** Both families are sans-serif. Stack Sans Text carries the architectural proposition and major section headings; Source Sans 3 keeps annotations, evidence, labels, and controls compact and highly readable.

### Hierarchy

- **Proposition** (400, `clamp(68px, 6.64vw, 102px)`, 0.88): Five tightly stacked uppercase lines in the opening folio; mobile uses `clamp(2.85rem, 13vw, 3.35rem)` at 0.9.
- **Section Heading** (400, `clamp(3.25rem, 6.5vw, 6rem)`, 0.95): Large declarative section openings, balanced within a roughly 16-character measure.
- **Register Title** (620, `clamp(20px, 2.02vw, 31px)`, 1.05): Project titles inside the opening ruled register.
- **Body** (400, `1.05rem`, 1.65): Explanations and project summaries, generally constrained to 64–66 characters.
- **Label** (650, `0.82rem`, `0.06em`, uppercase): Section rails, categories, dates, captions, and small document metadata.

### Named Rules

**The Sans-Only Rule.** Use Stack Sans Text for display and Source Sans 3 for body and interface copy; do not introduce serif or monospace identity typography.

**The Scale-Then-Rule Rule.** Create hierarchy through size, weight, case, and measured dividers before adding color or containers.

## Layout

The opening desktop sheet is a fixed-proportion 3:2 folio with a minimum width of 1024px. Its primary alignment begins at 7.03% from the left and spans 89.27%; the portrait occupies the upper-right field while the proposition and ruled project register occupy the left and lower fields.

Long-form sections use a narrow label rail beside a generous content field. Content padding scales from 5–9rem vertically and 2–7rem horizontally, while project, capability, fact, certification, and contact information is organized as ruled registers rather than detached cards.

At 1023px and below, the opening becomes a vertical document: identity and navigation, full-width portrait, caption, proposition, summary, credential, then project register. Section rails become horizontal headers, multi-column content collapses, and capabilities move from four columns to two. At 639px and below, capabilities become one column, project actions stack, and the inspector docks to the bottom edge.

**The Measured Field Rule.** Align unrelated elements through shared percentage lines, rule edges, and register columns; avoid arbitrary centered stacks.

## Elevation & Depth

The system is flat and ruled by default. Paper texture, grayscale image contrast, dark inversions, and border weight establish layers without cards or ambient shadows. The modal project inspector is the single elevated surface: on desktop it uses a restrained neutral shadow (`0 24px 80px rgb(0 0 0 / 28%)`) over an 82%-ink backdrop; on mobile the shadow becomes a six-pixel Burnt Folio Orange folio edge (`0 -6px 0 var(--accent)`).

### Shadow Vocabulary

- **Inspector Lift** (`0 24px 80px rgb(0 0 0 / 28%)`): Separates the centered project inspector from the dimmed folio.
- **Mobile Folio Edge** (`0 -6px 0 var(--accent)`): Marks the top edge of the bottom-docked mobile inspector.

### Named Rules

**The Flat-by-Default Rule.** Use rules, inversion, paper texture, and tonal contrast for ordinary hierarchy; reserve elevation for the modal inspector.

## Shapes

Corners are square (`0`) across navigation cells, actions, registers, tabs, fields, and the inspector. One-pixel rules define most silhouettes. Image windows and large fields are clipped rectangles, while registration crosses and arrow strokes supply the only recurring drawn geometry.

**The Document Edge Rule.** Components meet the grid with square edges and hairline borders; do not soften them into pills, rounded cards, or floating dashboard tiles.

## Components

### Ruled Navigation

Four equal uppercase cells sit inside the identity rule. Each cell has a left divider and an index; hover inverts Registration Ink and Warm Ivory Stock over 180ms. On mobile the cells remain ruled, and at the narrowest breakpoint the index stacks above the label.

### Project Register Row

A full-width square button is divided into number, title, and arrow columns. Hairlines separate rows and the number cell. Hover and focus invert the row; the arrow advances eight pixels on desktop and four pixels on compact layouts with a restrained 220ms ease.

### Square Action

Project actions are transparent, ink-bordered controls with a minimum 2.8rem height and compact `0.6rem 0.9rem` padding. Hover inverts ink and stock over 160ms; visible focus uses the global two-pixel orange outline with a four-pixel offset.

### Section Label

The section label is an uppercase, tracked annotation occupying the narrow left rail. It uses Warm Ivory Stock, Registration Ink, a right-hand hairline, and measured padding; below 1024px it becomes a full-width top rule with a bottom divider.

### Inspector Panel

The inspector is a square Warm Ivory Stock panel with paper texture, a one-pixel Registration Ink border, and a restrained neutral lift. Its header, tab strip, metrics note, body, and footer are divided by ink rules. Desktop centers the panel at a maximum 48rem width; mobile removes three borders, docks the panel, limits it to 94dvh, and adds the orange folio edge.

### Inspector Tab

Tabs use compact Source Sans 3 labels, inline line icons, a 2px bottom state rule, and at least 2.75rem touch height. Active tabs use Burnt Folio Orange with stronger weight; inactive tabs use Graphite Annotation and become Registration Ink on hover.

### Contact Row

Contact actions sit directly on the Registration Ink sheet. Each row uses a three-column icon-label-action register, a 3.5rem minimum height, and a low-contrast stock divider; hover shifts the label toward a brighter orange without adding a container.

### Registration Mark

Twenty-pixel crosses sit near the outer folio edges and are drawn from one-pixel Registration Ink mixes. They behave as print-registration annotations, disappear below 1024px, and must not multiply into a decorative background motif.

## Do's and Don'ts

### Do:

- **Do** establish hierarchy with oversized sans type, measured whitespace, and hairline rules.
- **Do** organize repeated evidence as numbered or labeled registers with shared columns.
- **Do** use Burnt Folio Orange sparingly for indices, active state, focus, and action.
- **Do** preserve square controls, visible focus, readable contrast, keyboard access, and reduced-motion behavior.
- **Do** treat grayscale photography as a measured image window with a caption or dimension annotation.

### Don't:

- **Don't** return to a generic developer hero followed by rounded project cards.
- **Don't** use glossy gradients, glow effects, floating dashboards, or decorative technology tropes.
- **Don't** introduce pill shapes, soft card radii, or shadows outside the inspector hierarchy.
- **Don't** use serif or monospace typography as part of the identity system.
- **Don't** fabricate visual variety when rules, scale, inversion, and one accent already communicate the hierarchy.
