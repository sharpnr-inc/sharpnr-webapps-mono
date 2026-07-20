# design.md — Website Design Specification

> This file specifies HOW to build the Sharpnr website. Product facts live in
> sharpnr.md — never claim features beyond a product's status there. Behavioral rules
> live in claude.md.

## 1. Goal & audience

- The homepage speaks to ONE audience: TODO (proposed: hotel & restaurant owners — see sharpnr.md → Audience).
- Job of the homepage: make that visitor feel their problem is understood within 10 seconds, show proof, get a signup. The full platform breadth lives on /products and /industries, not the hero.
- Test for every section: does it answer "who is this for / what pain does it kill / what do I get"? If not, cut or move it.

## 2. Tech stack

- Framework: TODO (current site: ?) — e.g., Next.js / Astro
- Styling: TODO — e.g., Tailwind
- Animation: TODO — e.g., Framer Motion for scroll/entrance, CSS for micro
- Hosting: TODO
- Constraints: TODO (performance budget, no heavy libs, etc.)

## 3. Visual system

### Color
- Primary navy: #03045e (existing brand)
- TODO: full palette — accent, surface, text, success/warning. Rule: ONE accent color for annotations and highlights across the whole site.

### Typography
- TODO: typeface(s). Rule: max 2 families. Big numerals for stats.

### Imagery rules (graphics-first principles)
1. Show, don't describe: prefer product screenshots and short silent loops over prose.
2. Crop UI fragments (one card, one row, one dropdown) instead of full screenshots; float on colored surface with soft shadow, consistent border-radius.
3. One screenshot treatment site-wide: same radius, shadow, chrome (or none).
4. Diagrams over paragraphs for anything with flow or connection: boxes + arrows.
5. Numbers as visuals: pull metrics out of sentences into large stat typography.
6. Progressive disclosure: long detail goes behind tabs/accordions, never inline.
7. No decorative stock imagery, no generic 3D illustrations.

### Layout rules
- Hierarchy over uniformity: never N identical cards in a row. Featured items get large tiles with UI fragments; minor items get a compact strip.
- Max ~1 eyebrow label per 3 sections. Headlines carry the message.
- Every section: headline ≤ 8 words, support text ≤ 2 sentences, then visual.

## 4. Homepage narrative (section order is the argument)

1. **Hero — the pain + the promise.**
   Headline speaks to the wedge audience and their disconnected-tools pain.
   Draft: "Run your restaurant or hotel — POS, kitchen, rooms, staff, and accounting — on one platform." Subline: free during early access.
   Visual: product in motion (8–15s silent loop) or hero screenshot composition. NOT an architecture diagram.
   CTAs: Get Started (auth.sharpnr.com/signup) + See it in action (TODO: demo video / sandbox — must actually exist).

2. **The magic moment — order → ledger.**
   The differentiator: a sale in Sharp-Hospitality becomes a journal entry in Sharp-Accounting automatically. Scroll-triggered or looping animation: POS order → event → ledger row appearing. Minimal text.

3. **The wedge product — Sharp-Hospitality.**
   Real screenshots: tables, KDS, rooms. 3 UI fragments max, one line each.

4. **"It's a whole platform."**
   The expansion story. Core Services as a bento grid: 2–3 large tiles with UI fragments (Sharp-Accounting, Cables, TODO third), remaining services as compact strip. Category-first naming: "Chat & calls — Cables", not "Cables — communication".
   Platform map/architecture appears HERE (interactive hover), not in the hero. Do not repeat the architecture as a second text section.

5. **The network — Sharp-Marketplace.**
   Org-to-org trading, zero commission, settles into your books. Simple two-org diagram.

6. **Built for scale.**
   Multi-entity, multi-company, modular — as 3–4 visual tiles (org-tree diagram, industry icons → one dashboard, service toggle mockup). No paragraph grid.

7. **Proof + final CTA.**
   Stats band (TODO: which numbers are true — services count, orgs onboarded, transactions?). Early-access framing: "free during early access" as invitation, not apology.

## 5. Other pages

- /products — full catalog by tier, with per-product deep links. TODO: spec.
- /industries — hospitality today, healthcare coming. TODO: spec.
- /about — TODO: spec.
- docs.sharpnr.com — out of scope for this rewrite? TODO.

## 6. Copy voice

- TODO: define in 3 lines. Proposed: direct, concrete, technical-friendly; short sentences; no corporate filler ("empower", "seamless", "leverage" banned); Indian-English fine; speak to "you" the operator.

## 7. Components inventory

TODO: list the reusable components to build (Hero, StatBand, BentoGrid, UIFragmentCard, FlowDiagram, SectionHeader, CTABlock, Footer...) with props and variants once design is settled.

## 8. Explicitly rejected patterns (do not reintroduce)

- Nine identical text cards in a grid.
- Architecture-first storytelling (layers before pain).
- Explaining the same four-layer model twice on one page.
- Eyebrow labels on every section.
- Invented proper nouns introduced before their category ("Cables" before "chat").
- Feature claims for coming-soon products (check status in sharpnr.md).
