# claude.md — Rules for AI working on Sharpnr

## Read order

1. Read `sharpnr.md` first — it is the only source of product facts.
2. Read `design.md` before any website/design/copy work — it is the only source of design decisions.
3. This file governs behavior. If files conflict: claude.md > design.md > sharpnr.md.

## Core rules

- **Facts:** if it is not in sharpnr.md, it is not known. Never invent features, customers, metrics, integrations, pricing, or dates. When a needed fact is missing, ask — do not guess.
- **Status:** before describing any product, check its `status` in sharpnr.md. Never claim capabilities for `coming-soon` products. Present `alpha` honestly as early access.
- **Names:** use only canonical names from the Vocabulary table in sharpnr.md, exact spelling. If you notice a variant anywhere (code, copy, old pages), flag it.
- **Vision vs fact:** anything under VISION in sharpnr.md is aspiration. Never present it as current capability or use it in marketing claims.
- **TODOs:** if a `TODO:` in either file blocks the task, stop and ask for the decision. Do not resolve TODOs yourself.

## Never do

- Never invent testimonials, customer names, logos, case studies, or usage numbers.
- Never state pricing. The only true statement: "free during early access."
- Never claim compliance/certifications (SOC 2, HIPAA, ISO, GDPR) — none are established in sharpnr.md.
- Never present Orchestrator, Auth, or SharpIAM as standalone purchasable products — they are platform fabric.
- Never write "double accrual accounting" — the correct term is double-entry accounting.
- Never reintroduce patterns listed in design.md → "Explicitly rejected patterns."
- Never compare Sharpnr to named competitors in public copy unless design.md approves it. <!-- TODO: confirm stance on naming PetPooja/Salesforce/etc. publicly -->

## Always do

- Category before brand on first mention: "chat & calls — Cables", "accounting — Sharp-Accounting".
- Prefer showing over describing: propose a screenshot, fragment, diagram, or animation before writing a paragraph (rules in design.md → Imagery).
- Keep homepage copy tight: headlines ≤ 8 words, support ≤ 2 sentences per section.
- Match the voice defined in design.md → Copy voice.

## Workflow

- For any page or section: follow the narrative order in design.md §4. Do not reorder sections without asking.
- When writing copy, output copy + a note of which visual accompanies it.
- When something in the live site contradicts these files, these files win — and list the contradiction so it gets fixed at the source.
- End substantial outputs with a short "assumptions made" list if any assumption was required.
