# claude.md — Rules and page stories for AI working on Sharpnr

## Read order

1. [sharpnr.md](/sharpnr.md) — the only source of product facts.
2. [design.md](/design.md) — the only source of design decisions. Read before
   any design, layout or copy work.
3. This file — behaviour, and the story every page is telling.

If they conflict: **claude.md > design.md > sharpnr.md**.
`website_instruction/` is the original brief; where it disagrees with
`design.md`, `design.md` wins — it records decisions taken *after* the brief,
with the reasoning behind them.

**Keep this file current.** When a page's story, structure or section list
changes, update the relevant section here in the same piece of work. A stale
story file is worse than none, because the next person trusts it.

---

## How to work here

**Say what is true.** If something is unverified, say so. "Compiles" is not
"looks right" — report the two separately.

**Measure rather than eyeball.** Claims about alignment, spacing, contrast or
overlap come from a number. Several bugs here passed visual inspection and were
caught only by measurement — a 169px-clipped table, a 2.5× luminance swing, a
whole section sitting at opacity 0.

**Diagnose before rebuilding.** Four hero attempts failed because each treated a
symptom; the cause was that all four were diagrams answering a question nobody
asked. When a second attempt fails the same way, stop and re-examine the premise.

**Never invent product facts.** No feature, industry, figure or claim absent from
`sharpnr.md` or `website_instruction/`. If a capability doc describes something
with no shipping product behind it, say so rather than writing marketing copy for
it.

**Never imply unfinished products exist.** "Designed for", never "built for".

**Leave the tree committable.** Compile after every increment — half-wired
imports take the dev server down for *every* route, not just the one being
edited.

**Clean up.** Temp scripts as `.cjs` in the repo root, deleted afterwards.
Screenshots to the scratchpad, deleted afterwards.

**Verification gate** — design.md §12: `tsc -b`, `eslint`, `vite build`, plus
screenshots at three widths.

---

## Site architecture

One dark canvas and one ink wash live at the **root** (`src/routes/__root.tsx`),
wrapping `Outlet` and `Footer`. No page carries its own background.

Smooth scrolling is **Lenis**, driven by GSAP's ticker with
`lenis.on("scroll", ScrollTrigger.update)`. ScrollSmoother was removed because it
transforms a wrapper, and a transformed ancestor becomes the containing block for
`position: fixed` — which had forced workarounds throughout. **`fixed` works
normally now.**

The header is unified across all routes: transparent over the hero, canvas once
scrolled. There is no per-route variant.

---

## Homepage — the argument

Seven scenes. One continuous argument, not a feature list; each scene does one
job and hands to the next.

**Scene 01 — Hero.** *"What is Sharpnr?"* — and nothing else. Centred copy, and
behind it a still field of ~32 business terms at 6–10% opacity on three bands.
Every few seconds 4–5 words lift briefly and settle.

The point is **scope**: a visitor should notice Payroll, GST, Job cards and
Prescriptions are all in here and conclude it covers everything, before reading a
word. It is deliberately **not a diagram** — Scene 03 owns architecture, and four
earlier attempts (constellation, technical grid, emitter beam, bracket) each
failed by answering "how does it work?" here.

The beam version failed specifically because converge → core → radiate is the
canonical *inference* diagram. Sharpnr is an operating platform, not a model.

Field words never overlap each other or the copy, and never sit under the nav —
the field's box starts below it, so that holds by construction.

**Scene 02 — The problem.** *One customer, five systems.* A ledger: CRM, Billing,
Orders, Delivery, Support, each holding the same person differently. Four
spellings of one name, five phone formats, four key schemes, four absences each
in that system's own dialect ("Customer missing", "NULL", "—", "No phone").

Only *identity* fields carry the cyan mark, and only where they disagree.
Reference numbers are never marked however different they look — a challan number
is *supposed* to differ from an invoice number, and marking it would call the one
correct thing broken. Marking everything is what made the accent meaningless at
fourteen underlines.

Hovering a row dims the other four. Below `sm` the table drops to three columns
rather than scrolling — a hidden scrollbar had stranded 169px off-screen.

Closes on **"Five systems. Five identities. One customer."**

This replaced a severed-circuit diagram. That argued the tools aren't connected;
this shows what it costs. Nobody has ever been annoyed by an architecture
diagram; everybody has retyped a phone number into a second system.

**Scene 03 — The answer.** Flat SVG in three bands: applications → one slab →
foundation. Six apps route through three shared trunks (not six identical drops)
into a slab running edge to edge.

The slab reads **"System of record"**, not "Sharpnr Platform" — the site has
already said whose platform this is, and that label is better spent explaining
the architecture. Inside it sits **the same customer from Scene 02, recorded
once**, as a labelled engineering record. That pairing is why the scene exists: a
diagram alone claims things about software; the record claims something about the
visitor's business, and answers Scene 02 directly.

Foundation: Identity, Permissions, Storage, Events, Automation, Intelligence.
Hovering an app lights its own run and pulses the record it writes to.

Two 3D attempts came first — CSS-3D, then WebGL with real shadows. Both read as a
render sitting *on* the page. The medium was the problem, not the execution.

**Scene 04 — Ecosystem.** One event, weighted consequences firing as the charge
reaches each junction.

**Scene 05 — Industries.** One shared platform under many trades. Ends the
left/right alternation; everything after is centred.

**Scene 06 — Principles. The site's quality benchmark.** Bento grid, four
principles, all visible — no accordion. Each tile carries an SVG diagram that
proves its heading with the text removed: three parts becoming one base; blocks
on a single slab; modules that can be removed; one unit repeated at S/M/L on an
identical foundation. That last replaced a bar chart, which claimed measurement
when the principle is about structure.

**Scene 07 — Close.** One charge crosses the rail once and stops. It does not
loop: motion elsewhere means work happening, and repeating here would suggest the
story is still running when the point is that it has arrived.

---

## Products page

A premium catalogue in the spirit of Apple's product listing — generous space,
confident type, restraint. **Never the word "Catalogue."** Frame around
*capabilities*, not a list of applications.

Message: **Independent when needed. Connected by design. More valuable together.**

- Nine capability areas from `website_instruction/06_Capabilities/`, all
  represented — Operations, Communication, Finance, People, Marketplace,
  Automation, Storage, **Intelligence**, Developer Platform.
- **Intelligence sits between Operations and Communication**, same card design,
  same grid, same size — not a showcase or banner. Cards: IVA, Analytics,
  Recommendations, Automation, Knowledge.
- **IVA reaches the whole platform** — shown visually, never in a paragraph.
- **Tasks** lives inside **OpenSharp IAM**, which is the employee workspace
  (Tasks, Approvals, Attendance, Leave, Payslips, Training, self-service).
  **Lifco** is the healthcare product. **Stockwave** is inventory, warehouse and
  stock operations.
- **Hospitality is part of Sharp Operations**, not a standalone product — the
  hospitality edition, as Lifco is the healthcare one. Canonical form is
  **`Sharp Operations · Hospitality`** where the edition matters, `Sharp
  Operations` where the product family is named. **Never bare
  "Sharp-Hospitality" in visible copy.** `sharpnr.md` still lists it with no
  parent; the user stated the relationship directly and that outranks the spec.
  **On the Products page the card reads just `Hospitality`** — the group heading
  beside it already says Operations, so the full form repeated a word the eye
  had just read. The two cards in that group are the two editions. The full form
  stands wherever the parent is not already on screen: footer, Industries
  kicker, structured data.
- Products without a URL (Tasks, IVA, Lifco) render **unlinked**, never omitted.
- A **connected-platform section before the final CTA** — illustration plus short
  copy, showing Identity / Permissions / Data / Intelligence shared by
  everything. Not another product grid.
- One description voice throughout: **what the product enables for the
  business**. No mixing feature lists, implementation detail and marketing.

---

## Industries page

**The governing fact: only Hospitality exists.** Everything else is in
development, and the page must never imply otherwise.

```
Available today  →  Hospitality (complete experience)
Coming soon      →  Healthcare · Retail · Technology & Enterprise ·
                    Education · Manufacturing · Digital Commerce ·
                    Professional Services
```

**Naming decisions:** "Corporate" became **Technology & Enterprise** — the old
name describes a company *size*, not an industry. **Digital Commerce** is kept
separate from **Retail**, which is physical stores.

**Status is visible per industry** — a chip at the right edge of each section
header: `Available now` in cyan for Hospitality, `In design` in twilight for the
rest. A consistent position makes status scannable without reading.

**Hospitality is the showcase**: journey → ecosystem → product capabilities →
industry coverage. Everything else is a **preview** — roughly one viewport
containing only four things: a one-line intro, one operational journey
visualisation, a small capability overview, and a Coming Soon status. The page
gets visibly lighter as it scrolls, so hierarchy communicates itself without a
label explaining it.

**After Hospitality the previews alternate left/right** (design.md §5), at
**60/40 — the flow visual takes 60%, the text 40%** (`lg:grid-cols-[3fr_2fr]`,
flipped each time). At 50% the steps cramp, labels shrink and the meaning falls
back onto text, which is the opposite of the intent. These sections are
visual-first, and the width should say so. If the copy does not fit comfortably
in 40%, cut the copy rather than widen the column.

Each sector differs by its **own five-step flow** and its **own background
motif**; what is shared is the *format* — same construction, line weights and
step geometry — so the run reads as one system rather than five unrelated
diagrams. Two sectors rendering an identical-looking flow is a bug.

Hospitality is exempt: it is the showcase with its own internal structure. The
closing sections (multi-industry, future vision) return to centred and stay
there.

Page rhythm:

```
Hero                     centred, diagram in the hero
Hospitality              showcase, own structure
Healthcare               visual / copy      ┐
Retail                   copy / visual      │
Technology & Enterprise  visual / copy      ├ alternating previews
Education                copy / visual      │
Manufacturing            visual / copy      ┘
Multi-industry, Future   centred
```

**Operational flows are the primary visual** for each future industry:

| Industry | Flow |
|---|---|
| Healthcare | Appointment → Consultation → Diagnostics → Treatment → Follow-up |
| Retail | Supplier → Warehouse → Shelf → Checkout → Replenishment |
| Technology & Enterprise | Lead → Proposal → Project → Delivery → Invoice |
| Education | Application → Enrollment → Classes → Examinations → Graduation |
| Manufacturing | Raw Material → Production → Quality → Warehouse → Dispatch |

**Hospitality specifics.** The guest journey (Discover → Reserve → Dine → Pay →
Return) hands off to the systems behind it — POS → Inventory/Kitchen/Accounting →
Workforce/CRM → Analytics → IVA — animating as **one causal chain**: one guest
action, seven systems responding, nobody re-entering anything. The inventory
count genuinely decrements; a number changing convinces where a highlight does
not.

The headline is **"One order, nothing re-entered."** with at most one lead-in
line. It previously counted the systems; the count is gone under the no-counts
rule (design.md §10) and the headline is stronger for it — the chain beneath
already shows them responding. The paragraph that once followed named the
kitchen, stock count, books, guest history and manager's figures, which is that
same chain in prose: the reader was told the thing and then shown it. Where a
node's role is not obvious, **label the node**; a label sits where the eye
already is, a paragraph makes it look away and come back.

"Powering Every One Of Those Moments" is a **product browser, not another
explanation** — by then the ecosystem animation has already taught how the
platform works. Grouped cards on the bento grid: Operations / Business /
Customer / Intelligence.

**Sector motifs and the spine.** Each industry section carries a large, very
faint architectural line motif denoting its sector — a floor plan, a ward
corridor, a shelf run, a production line. Strokes on transparent at 6–10%, never
a background plate: a solid fill over the ink wash flattens it (design.md §2).

Running the length of the industries is **one continuous vertical spine** that
each sector's diagram attaches to, scrubbed to scroll and never breaking between
sections. It provides the hand-off from one sector to the next *and* restates the
page's argument — one foundation under every industry — geometrically rather than
in copy. Same device as the foundation slab in Scene 03. A per-section entry
transition would fire five times and read as repetition; one scrubbed element
does not.

Ten venue categories (Hotels & Resorts, Restaurants, Cafés & Coffee Chains, Bars
& Nightlife, Cloud Kitchens, QSR & Food Courts, Bakeries & Desserts, Catering,
Hospitality Groups, Franchises) as visual cards — **real DOM text**, since they
are SEO surfaces.

**Every sector's flow has its own topology.** One parameterised chart fed
different label arrays is a re-skin, not a different visual — and a left-to-right
chain of equal boxes asserts "these steps happen in order", which is false for
most of these industries. Retail is a cycle, an enterprise is a containment.

| Sector | Shape | Why not a chain |
|---|---|---|
| Hospitality | order chain through seven systems | a sequence is honest here |
| Healthcare | record spine, visits branching off it | a chain implies the patient is finished at step 05 |
| Retail | closed replenishment cycle | the loop closing *is* the point |
| Digital Commerce | channels fan in, returns run backwards | the reverse path is what makes it not manufacturing |
| Manufacturing | convergent tree — fan-in then fan-out | many inputs, one output, many orders |
| Education | calendar grid, cohorts across terms | an academic year is a grid, not a flow |
| Professional Services | parallel engagement bars over one resource pool | overlap is the industry's whole difficulty |
| Technology & Enterprise | nested entities on one identity layer | containment — no arrows at all |

Motion follows topology: a cycle completes its loop, a spine draws downward, a
convergence draws inward, bars extend rightward, containers settle outside-in.
**If two sectors' timelines could be swapped unnoticed, they are still the same
visual.**

The constraint that stops this fragmenting: different structure, *identical
vocabulary* — same hairline weights, one accent, mono labels, one viewBox family,
orthogonal routing. Eight drawing styles would fail worse than eight identical
diagrams.

**Every sector carries categories, at two weights.** Hospitality gets the full
card grid — it is the showcase. Every future sector gets a **running ticker
strip** in the language of the product marquee: mono caps, wide tracking,
full-bleed, hairline above and below, sitting between the capability overview and
the Coming Soon chip.

A ticker is one band tall however many names it carries, so a preview can hold
its whole category set without spending the vertical space that would undo the
progressive lightening. Each name is preceded by its **own Lucide glyph** rather
than a generic separator — the glyph is the meaning, the diamond was filler.

**Direction follows the section's layout.** Visual-left/text-right runs left to
right; visual-right/text-left runs right to left. The strip travels the way the
eye already crosses the section, and alternating it means two consecutive strips
never drift the same way — which is exactly what would make them read as one
repeated widget.

**The loop must never show a gap.** Rendering the list twice is not enough when
the list is short — once the track translates past its own width there is
nothing left to show and an empty stretch crosses the screen. Repeat the list
`ceil(containerWidth / listWidth) + 1` times so the track is always at least one
viewport wider than the distance it travels, translate by exactly one list-width
and reset, and recompute on resize. A hardcoded duplicate count is what produces
the gap.

**The loop duplicate is also a real SEO hazard.** Only the first copy may be
indexable text; every repeat must be `aria-hidden`, or category names ship
multiplied. Reduced motion gets a static wrapped row, not a paused marquee —
pausing strands whatever sits off the edge.

They read as intended market, not shipped support, because the section is already
marked *In design* — so the category row stays a plain list of segment names with
no verbs attached, under a "Designed for…" heading. Real DOM text throughout:
these are search surfaces for every segment named.

The hero carries **no CTAs** — this is a navigational page, not a conversion page
— and the connected-platform diagram sits *in* the hero, because it is the
page's argument.

---

## Platform · About · Services · Resources

Converted to the dark canvas. Centred heroes, alternating splits,
benchmark-grade illustrations. Content from `05_Platform.md`, `09_About.md`,
`08_Services.md`, `07_Industries.md`.

---

## Footer

A **utility, not storytelling** — "the story ends before the footer". Five
columns: Sharpnr (mark + wordmark + social), Platform, Developers, Resources,
Company. Hover only, no motion.

The product catalogue was removed from it: four columns of app links were
storytelling about the platform, which is exactly what a footer is not for.

**Known gap:** 13 spec links have no destination — API, SDKs, GitHub, Status,
Changelog, Blog, Guides, Help Center, Community, Careers, Contact, Privacy,
Terms. They are **omitted rather than pointed at 404s**. Add the route or the URL
and they belong there. The bottom bar's version, theme toggle and language switch
are likewise unsourced (`package.json` is still `0.0.0`), and a hardcoded value
would be false immediately.

---

## Decisions already taken — do not relitigate without new information

- **Scene 06 is the benchmark for a set of illustrations. The Industries page is
  the benchmark for a whole page** (signed off 2026-07-29). Every page built
  after it is measured against it — see design.md §6 for what to carry across.
  Match them rather than inventing a new language.
- **Scene 03 is flat SVG.** CSS-3D and WebGL were both tried; both read as
  renders.
- **The hero is not a diagram.** Four attempts confirmed it.
- **Lucide only.** Tabler is confined to Scene 06.
- **Lenis, not ScrollSmoother.**
- **GSAP only** — anime.js and three.js were removed deliberately.
- **No glow on static elements.** Only a signal in motion earns it.
