# design.md — Sharpnr Website Design Specification

> HOW to build the site. Product facts live in [sharpnr.md](/sharpnr.md) — never
> claim a feature beyond its status there. Behaviour, page stories and working
> rules live in [claude.md](/claude.md).
>
> `website_instruction/` is the original brief. Where this file and those docs
> disagree, **this file wins** — it records decisions taken after the brief was
> written, with the reasoning that produced them.

---

## 1. What this site is

A typography-led product site for business software. Not a generic marketing
page with a headline and three columns of copy. The visitor should feel they are
looking at something **engineered**, not something merchandised.

Three principles, in priority order:

1. **Show, don't tell.** If a diagram can carry the point, build the diagram and
   delete the paragraph. A section needing three paragraphs is a section whose
   visual has not been designed yet.
2. **One idea per section.** If a section explains three things, it is three
   sections.
3. **Never claim what does not ship.** Vision language for anything in
   development — "designed for", never "built for".

---

## 2. Canvas and background

The whole site sits on **one continuous dark sheet**. No light theme, no
per-page background.

- `--color-canvas` `#00101f` is the page. `:root` carries it, so there is no
  white flash before paint and no white gutter behind the scrollbar.
- The **ink wash** (`CanvasWash`) lives once, at the root, wrapping `Outlet`
  *and* `Footer`. A per-page wash stops where the page stops, and the hand-over
  to the footer reads as the page ending abruptly.
- **No section paints its own background.** Solid fills over the wash flatten it
  and break the continuity that makes the site feel like one object.

The wash is generated, not photographed: soft pigment pools whose edges are torn
by fractal noise through `feDisplacementMap`. Paper grain is a **fixed 140px
tile at 1:1** — inside the SVG it scales with everything else, fine grain
becomes soft blobs, and the result reads as blur.

---

## 3. Colour

Tokens are `@theme` vars in `src/index.css`. Use the token, never a raw hex —
`#00b4d8` inside illustration code is the one exception.

| Token | Value | Use |
|---|---|---|
| `--color-canvas` | `#00101f` | the page |
| `--color-navy` | `#03045e` | dark text on light fills only |
| `--color-blue` | `#0077b6` | secondary action |
| `--color-cyan` | `#00b4d8` | the accent — actions, live signals, one meaning at a time |
| `--color-sky` | `#90e0ef` | hairlines, surfaces, illustration |
| `--color-ice` | `#caf0f8` | highlight, hover text |
| `--color-mute` | `#8a94a8` | body copy |
| `--color-twilight` | `#5c87b5` | second heading line, meta, quiet labels |

**Surfaces:** `bg-sky/[0.025]` with `border-sky/15`. In an architecture diagram
weight runs *applications → platform → foundation* as faintest → strongest →
middling, so the eye lands on the centre band.

**The accent means one thing at a time.** When cyan marks conflicts it marks
*only* conflicts. Fourteen cyan underlines mean nothing; seven mean something.

**Dark text survives only on fills that stay light** — `text-navy` on a cyan
button is correct and must never be "converted" to a dark-theme token.

---

## 4. Typography

Inter throughout; JetBrains Mono for labels, designators, keys and data.

**Scene headings** use `.hp-scene-title` — one size for every scene, so the page
speaks with one voice.

```tsx
<h2 className="hp-scene-title font-extrabold text-white">
  <span className="block"><Words text="First line," /></span>
  <span className="block text-twilight"><Words text="Second line." /></span>
</h2>
```

- Two lines. **The first ends with a comma**, never a period.
- Second line in `text-twilight` — dual colour is the site's signature.
- **Maximum six words.**
- Always the `Words` component, so headings animate through one shared reveal.

**Heroes collapse to one line at `lg`** via `lg:whitespace-nowrap` +
`lg:inline`, with the halves as `block` below that so the break lands **on the
comma**. Left to wrap naturally it splits mid-phrase and reads as a bug.

Mono is for things that are *data*: system labels, field keys, designators,
status chips, category kickers. Never for prose.

---

## 5. Layout

**Container:** `mx-auto max-w-7xl px-6 md:px-10`. Every scene starts on this
line, heroes included.

**Heroes are centred, on every page.** `text-center` container, `mx-auto` copy,
`justify-center` buttons.

**Every other section is either centred (full width) or a 50/50 split.** Nothing
in between.

- Consecutive splits **alternate** — visual-left/text-right, then the reverse.
  Two facing the same way reads as a template.
- Once a page turns centred it **stays** centred; the alternation ends rather
  than resuming, so the page settles.
- In a split, the text block sits against the **outer** edge of its column. Cap
  and push go on the wrapper around heading+copy — `lg:ml-auto lg:max-w-xl` in a
  right column — **never on the paragraph alone**, which gives heading and copy
  different left edges.
- **Mobile always stacks argument-first**, whichever side desktop uses, via
  `order-1 lg:order-2` on the copy. Without it, a visual-left section reads as
  an unexplained diagram on a phone.

---

## 6. Illustration — the benchmark

**Scene 06** (`src/app/home/why/`) is the agreed quality bar for a *set of
illustrations*. **The Industries page** (`src/app/industries/`) is the agreed bar
for a *whole page* — signed off 2026-07-29 — and every page built after it is
measured against it. What to take from it:

- Each section's figure has **its own topology, derived from how that subject
  actually works** — not one parameterised chart fed different labels. The eight
  sector shapes in claude.md are the worked example.
- Different structure, **identical vocabulary**: same hairlines, one accent, mono
  labels, one viewBox family, orthogonal routing throughout.
- **Motion follows the topology.** If two sections' timelines could be swapped
  unnoticed, they are the same visual wearing different words.
- **A changing number beats a highlight.** The figures that convince are the ones
  where a real quantity moves — the hospitality inventory decrementing, the
  retail stock count draining and refilling.
- Weight communicates status without a legend: the showcase is dense, previews
  get progressively lighter down the page.

- Thin blueprint linework. Single accent `#00b4d8`. Strokes, not fills.
- **No gradients. No glow. No drop shadows.** Only a signal *in motion* may
  glow; a lit static trace is the clearest signature of a generated image.
- All illustrations in a set share **one viewBox**, so a 1px line is 1px in
  every card.
- **Every illustration must prove its heading with the text removed.** A diagram
  that only decorates is worse than none — it costs attention and returns
  nothing.
- No stock icons, no charts, no dashboard mock-ups. A bar chart claims
  measurement; most sections here are about structure.

**Routing is orthogonal.** Right angles read as engineered, diagonals as a
network graph. Vary the weights — trunks heavier than signal runs; six identical
drops read as generated.

**What made earlier attempts read as AI-generated**, each fixed by removal:
glowing cyan tracework on dark navy; one extrusion repeated at different scales;
uniform lighting with no falloff; perfect symmetry and perfectly equal spacing.

Flat SVG beat both CSS-3D and WebGL here. The medium was the problem — a board
seen from above is an image however it is produced, and it sat *on* the page
rather than in it. Flat SVG is resolution-independent, weighs nothing, keeps
labels as real selectable text, and is built from the same hairlines as
everything else.

---

## 7. Components

| Source | Use for |
|---|---|
| shadcn/ui | base primitives |
| Aceternity UI | hero and marketing sections |
| Magic UI | cards, effects, interactions |

**All copy-paste into `src/components/ui/`, never `npx shadcn add`** — there is
no CLI config here and it scaffolds conflicting files.

**Retint on the way in.** Upstream components are light-first with a `dark:`
variant on every colour. This site is only ever dark, so **the dark values
become the base** — carrying both ships a light theme nobody can reach.
`bento-grid.tsx` is the worked example.

**Icons: Lucide only**, so optical weight stays consistent.
`@tabler/icons-react` exists but is confined to Scene 06. Where Lucide has no
suitable glyph, draw a small SVG in the blueprint language rather than importing
a second family.

**No cards on the homepage** except the Scene 06 bento. Bordered blocks with
their own headers read as support tickets.

---

## 8. Motion

**GSAP** for anything scroll-linked. **Motion** (`motion/react`) for hover only.
**Lenis** for smooth scrolling. anime.js and three.js were removed — do not
reintroduce them.

Shared vocabulary in `src/app/home/shared/choreography.ts`: one duration scale,
one easing family (`power3.out` arrivals, `power2.inOut` draws, `none` scrubbed),
one stagger, plus `sceneTimeline`, `armWords`/`revealWords`, `armDraw` and
`ambient`. **Reach for these before writing a bespoke tween** — they exist
because every scene used to invent its own timing and the page read as several
people's work.

- Entrances play once. Replaying on every scroll-past makes a page restless.
- Ambient loops live on **their own timeline**. An infinitely-repeating child
  leaves a timeline with no finite duration and silently breaks
  `toggleActions: "...reverse"`.
- Ambient loops **pause off screen** — `ambient()` handles this.
- Draw paths with `stroke-dashoffset` measured **per path** via
  `getTotalLength`, so every run draws at the same *rate*. One hardcoded dash
  makes short runs snap and long ones crawl.
- Honour `prefers-reduced-motion` via `prefersReduced()`. Reduced motion gets the
  finished frame immediately, and Lenis is not created at all.

**Programmatic scrolling goes through `scrollToId()`** in
`src/app/home/shared/smoothScroll.ts`. A raw `scrollIntoView` fights the running
Lenis animation and lands between the two.

---

## 9. Accessibility and SEO

- **Every product, industry and category name is real DOM text** — never inside
  an image, canvas or WebGL texture. These are brand names and search surfaces.
- **A seamless marquee renders its list twice.** Only the first copy may be real
  indexable text; the clone that makes the loop seamless is `aria-hidden` and
  presentational. Otherwise the page ships every name in it doubled — worse than
  not having the strip. Marquees also need a reduced-motion fallback that is a
  static *wrapped* row, never a paused track, which strands whatever sits off
  the edge.
- Decorative SVG gets `aria-hidden`; the adjacent label carries the meaning.
- Informational diagrams get `role="img"` and an `aria-label` stating what they
  show.
- Semantic markup: lists are lists, headings descend in order.
- **Never ship a dead link.** A product with no destination renders *unlinked*,
  with a quiet "Soon" where honest — never omitted, never a 404.

---

## 10. Content and voice

Structure, per `11_Content_Guidelines.md`:
**Question → Answer → Explanation → Proof → Action.**

- Plain and spoken, not written. Say what someone *gets*, not what the system
  *is*.
- **No infrastructure vocabulary** — "runs on its own domain", "shared data
  layer", "unified schema". A restaurant owner should read every line without
  translating it.
- **Never run product names together as prose.** Eight names in a sentence is a
  list pretending to be prose, and nobody reads any of them. It becomes a
  diagram or a set of cards.
- Currency is **rupees (₹)**, never dollars.
- **Never state a count of systems, products or apps.** No "seven systems", no
  "eight products". A count dates the moment the catalogue changes and invites
  the reader to audit it — and where a figure below already shows them, the
  number in the sentence is the diagram's job done worse. The count is allowed
  only where it *is* the argument and is verifiable on screen: Scene 02's "Five
  systems. Five identities. One customer." sits under five visible rows. Factual
  `aria-label` descriptions of a diagram stay accurate and are exempt.
- Names verbatim. Do not shorten "Sharp Accounting" to "Accounting" where a
  generic "Accounting" node already exists — two different things must not share
  a label.

---

## 11. Traps in this codebase

Each of these caused a real, shipped bug. None are hypothetical.

1. **Tailwind's bare `transition` covers opacity AND transform.** If GSAP
   animates either on the same element they fight and it settles at opacity 0 —
   a completely blank section. Use `transition-colors` / `transition-transform`.
   Aceternity and Magic UI ship bare `transition` constantly. *Blanked two
   sections.*
2. **Windows filename casing.** `Foo.tsx` and `foo.ts` in one folder collide and
   kill the dev server. Name data files distinctly — `mapGeometry.ts`, not
   `platformMap.ts` beside `PlatformMap.tsx`. *Killed the server twice.*
3. **`em` resolves against the ancestor, not the element.** Setting a font-size
   on an element and `0.75em` on that same element gives 0.75 × the *inherited*
   size. Put the base on the parent.
4. **Chrome ≥121 disables `::-webkit-scrollbar` when `scrollbar-width` is set.**
   Declaring both silently discards every webkit rule. Standard properties go
   inside `@supports not selector(::-webkit-scrollbar)`.
5. **A transparent scrollbar track shows `:root`.** With a light root on a dark
   page that paints a white stripe down the side.
6. **Hidden scrollbars strand content.** A wide table with `overflow-x: auto` and
   a hidden bar puts columns off-screen *and* unreachable on mobile. Drop columns
   instead.
7. **Tailwind preflight forces `img { display: block; vertical-align: middle }`**,
   centring an inline image on the line box instead of seating it on the
   baseline.
8. `position: fixed` **works again.** That restriction existed only because
   ScrollSmoother transformed an ancestor; Lenis does not.

---

## 12. Verification

Nothing is done until:

- `npx tsc -b` — clean apart from 3 known `TS1149` in `src/configs/gsap.tsx`
  (gsap's own types, Windows-only).
- `npx eslint src/` — 0 errors.
- `npx vite build` — succeeds. Typecheck alone misses unresolved imports.
- Screenshots at **1440×900, 1280×720, 375×667**: no horizontal overflow,
  nothing clipped on mobile, no console errors, no dead links.

**Measure, don't eyeball.** Claims about spacing, alignment, contrast or overlap
should come from a number — bounding-box deltas, computed opacity, sampled
luminance. Several bugs here survived visual inspection and were caught only by
measurement.

Delete every temp script and screenshot afterwards.
