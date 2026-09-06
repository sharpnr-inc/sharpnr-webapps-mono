# Task: Rework the marketing websites across `apps/`

## Context

- This is a monorepo. Every app in `apps/` ships its own public marketing website,
  except `apps/docs/` and `apps/sharp-auth/`.
- All apps are part of the **sharpnr** platform. They are not standalone products
  that happen to share a logo — they share identity, storage, permissions, and
  communication.
- Reference implementation — read these first:
  - `apps/cables/src/routes/_website/index.tsx` — public (unprotected) route
  - `apps/cables/src/website/LandingPage.tsx` — the page component
  - `apps/cables/src/routes/_layout/route.tsx` — auth check pattern
- Shared packages:
  - `packages/ui/` — shared components (the new footer goes here)
  - `packages/env/` — canonical URLs for every app in the ecosystem

---

## The pitch, in one paragraph

Read this before writing a single line of copy. Every page is a variation on it.

> Most organizations run ten tools that don't know about each other. Someone sells
> something in one app, re-keys it into a second, adjusts stock in a third, and
> messages a colleague about it in a fourth. sharpnr is one platform where those are
> the same system. An order lands in inventory and in the books at the same moment.
> A project has a conversation attached to it. A file mentioned in a document is
> already shared. Nothing is integrated because nothing was ever separate.

**Integration is the product.** Feature lists are table stakes and every competitor
has one. What no competitor has is the app next door already holding the same data.
Lead every page with that, not with a feature grid.

---

## Step 1 — Explore before writing anything

1. List every app under `apps/` and note which have a `src/website/` directory.
2. Read the cables website + layout route end to end.
3. Read `packages/env/` and report exactly which env vars hold the other apps' URLs.
   If URLs for some apps are missing, say so — **do not invent them**.
4. Read `packages/ui/` to learn its export/barrel convention and styling setup.
5. Confirm which apps in the briefs below actually exist in `apps/` and which are
   named only as integration targets.

Report what you found and your plan. **Stop and wait for my approval before editing.**

## Step 2 — Build the shared components in `packages/ui/`

**`Footer`**

- Links to every other app in the ecosystem, sourced from `packages/env/`.
  Never hardcode a URL.
- Group links so the ecosystem is legible at a glance rather than one flat list.
  Suggested grouping — adjust to what actually exists:
  - **Platform** — Cables, Silo, Folio, Cortex, Orchestrator
  - **Business** — Stockwave, sharp-accounting, sharp-marketplace, sharp-crm
  - **People** — sharp-iam, sharp-hr
  - **Operations** — sharp-hospitality, sharp-healthcare
- Consistent across all sites; app-specific bits come in as props.

**`EcosystemSection`**

Every site gets the same section, near the bottom, above the footer. It names the
specific apps this app works with and what happens between them — one line each,
each line linking to that app's site via `packages/env/`.

This is the curiosity engine. Someone who arrived looking for inventory software
should leave knowing that the accounting and the marketplace are already there.
The per-app briefs below each list a **Works with** block — that's the content
for this section.

## Step 3 — Rework one app's website (cables first)

Apply the changes to **cables only**, then stop and let me review before
touching the rest.

## Step 4 — Roll out to remaining apps

Only after I approve cables. Same structure, same footer, same ecosystem section,
copy specific to each app.

---

## Requirements

### Content

- Rewrite all copy. Current copy is placeholder filler.
- Every capability named on a page must exist in the code. The briefs below say what
  each app does; **verify against the codebase before writing it**, and report
  anything you couldn't find rather than shipping it.
- Prefer plain, concrete descriptions over marketing language. "An invoice reduces
  stock in Stockwave" beats "seamless synergy across your operations stack."
- Name sibling apps directly and often. Cross-references are the point.
- Do not name competitors, and do not write "unlike X" or "replaces X" copy. The
  consolidation argument lands better stated positively.

### Do not claim — applies to every site, no exceptions

1. **Pricing.** No pricing page, section, link, tier, "starting at", "free", trial,
   seat cost, listing fee, commission, or take rate. There is no pricing model yet.
2. **Testimonials and social proof.** No customer names, quotes, logo clouds, user
   counts, org counts, transaction volumes, review scores, or "trusted by" banners.
3. **Certifications and compliance.** No SOC 2, ISO, HIPAA, GDPR, PCI, or any
   attestation, audit, or standards-conformance claim.

Plus one general rule: **no number you can't source.** No uptime percentages, no
durability figures, no latency, no "10x faster", no "saves N hours a week."

### Ease of use and onboarding — the second pitch

Every site needs this argument somewhere, in the app's own terms:

- **One account.** Sign in once, through sharp-auth. Every app in the platform
  already knows who you are.
- **One organization.** Set up your org once. Employees, teams, cost centers, and
  permissions are defined at the platform level, not re-entered per app.
- **Nothing to integrate.** No connectors to configure, no API keys to exchange, no
  sync jobs to monitor, no data migration between apps. Adding an app is turning it
  on, not a project.
- **Nothing to procure.** The apps come with the platform. You don't evaluate,
  purchase, and roll out an HR system — it's there, already holding your employees.
- **Familiar from the first screen.** Same navigation, same permissions model, same
  search, same Cables panel in every app. Learning one app is most of learning the
  next.

Adapt the wording per app. Do not paste the same five bullets onto eleven sites.

### Design / UX

- Clean and readable. Consistent structure and visual language across all apps.
- **Do not use**: feature-grid card walls, pill/capsule badges, gradient-mesh hero
  backgrounds, emoji bullets, decorative icon sets standing in for content.
- Use type hierarchy, spacing, and real content to carry the page instead of chrome.
- Where a page describes a flow between apps (invoice → stock → books), show the
  flow as text or a simple inline diagram. Do not render it as three cards.

### Navigation

- Every website needs working navigation into its own app (not dead anchors).
- Footer and ecosystem-section links to sibling apps must resolve via `packages/env/`.

### Auth-aware header

- Each app already checks auth in `_layout/route.tsx` (see cables). Use the same API.
- Signed in → show the user's name and a **"Continue to app"** action.
- Signed out → show login / signup.
- The marketing route stays public; do not turn it into a protected route.

## Out of scope

- `apps/docs/` and `apps/sharp-auth/`
- Any change to auth logic itself, app internals, or the `packages/env/` schema
  (flag it if a var is genuinely missing rather than adding one silently)

## Definition of done

- `Footer` and `EcosystemSection` live in `packages/ui/`, are consumed by every
  reworked site, and are driven entirely by `packages/env/`.
- Every site names at least three sibling apps with a concrete link.
- Every site makes the onboarding argument in its own words.
- Typecheck and build pass for every app you touched.
- No route that was public became protected, and vice versa.
- Grep confirms zero pricing references, zero competitor names, and zero hardcoded
  sibling-app URLs.
- Report per app: what you changed, which claims you verified in code, and anything
  from the brief you could not find.

---

# Per-app content briefs

## Cables

**One-line:** The communication layer for the sharpnr platform.

**What it does**

- Channels for team and org-wide conversation
- Direct messages across teams and between employees
- One-to-one calls and video calls
- Town halls
- Search across conversations
- Search and share files from Silo without leaving the conversation
- Context-aware of organization resources

**The angle**

Cables isn't a chat app you switch into. It's embedded in every other sharpnr app —
if you're working in Stockwave or sharp-accounting, Cables is right there, and a ping
reaches you wherever you are. The conversation about a thing lives attached to the
thing: a project has a channel, a warehouse has a channel, a document has a channel,
a marketplace negotiation is a conversation.

Lead with that. The feature list is second.

**Works with**

- **sharp-iam** — every project gets its own channel
- **Folio** — every document gets its own channel
- **Stockwave** — every warehouse gets its own channel
- **Silo** — find and share any org file from inside a conversation
- **Cortex** — employees request access here; IT approves it there
- **sharp-marketplace** — negotiate deals with other organizations
- **sharp-crm** — talk to customers directly

---

## Silo

**One-line:** Storage for everything your organization runs on.

**What it does**

- Cloud drive for organization files
- S3-compatible object storage
- Provisioned PostgreSQL databases your applications can connect to
- Data lake, with operations supported across each storage type
- Sharing within the org, with other organizations, or publicly
- Fine-grained authorization on every resource

**The angle**

One storage layer covering four shapes — drive, object, relational, lake — instead of
four vendors stitched together with four bills and four permission models. Permissions
are governed centrally through Cortex or Orchestrator, so access is decided once.

Silo works for the sharpnr apps and for your own applications outside the platform.
That second point matters: it's the piece an engineering team adopts directly.

**Works with**

- **Cortex** or **Orchestrator** — whichever your org uses to govern who can reach what
- **Folio** — documents, sheets, and canvases are stored here
- **Cables** — files are searchable and shareable from any conversation
- **sharp-iam** — employee and project documents
- **Stockwave** — operational records and documents

---

## sharp-iam

**One-line:** The employee portal for your organization.

**What it does**

- Projects, with a built-in project tracker
- Leave applications
- Reimbursement requests
- HR communication
- Cross-team collaboration
- Training and courses

**The angle**

Everything an employee needs from the company, in one place, on the account they
already have. Project tracking is included rather than bought separately — and because
it's part of the platform, each project carries its own Cables channel and its own
Silo documents. The work, the conversation about the work, and the files are the
same record.

Employee-facing. sharp-hr is the HR team's side of the same organization.

**Works with**

- **Cables** — a channel per project
- **Silo** — project and personal documents
- **sharp-hr** — the HR team's side: payroll and employee records
- **Cortex** — request access to systems and devices

---

## Cortex

**One-line:** The IT console for your organization's hardware and data.

**What it does**

- Device management for laptops and hardware issued to employees
- Device insights and reporting
- Access control over Silo resources — which employees reach which object storage,
  data lake objects, and databases
- Database health monitoring
- Access requests arriving from employees over Cables, approved here

**The angle**

Written for IT admins, not employees. The fleet and the data permissions are one
console, and requests arrive in the conversation the employee was already having
instead of a separate ticket queue. Cortex is one of the two systems that can govern
Silo authorization — Orchestrator is the other, and an org picks which one owns it.

**Works with**

- **Silo** — govern access to every storage resource
- **Cables** — access requests arrive as conversations
- **Orchestrator** — the alternative governance path, for owner-level control
- **sharp-iam** — the employees and devices are the same records

**Additional constraint:** describe device management as asset and fleet management —
which hardware is issued to whom, and its health. Do not write copy describing
surveillance of employees, covert monitoring, activity tracking, or productivity
scoring, regardless of what the code supports. That framing carries legal exposure
for customers in most jurisdictions and reads badly to the IT buyer you're selling to.

---

## Folio

**One-line:** Documents that can reach the rest of your organization's data.

**What it does**

- Documents, spreadsheets, whiteboard canvases, and PDFs
- Real-time collaboration
- Reference or mention Silo files directly inside a document
- Mentioning a file grants collaborators instant access to it

**The angle**

A standalone editor can hold text. Folio can hold a live reference to an object in
Silo, and mentioning it hands your collaborators access in the same motion — no
second permission request, no re-uploading a copy. Files live in Silo alongside
everything else the organization stores, and each file carries its own Cables channel,
so the discussion is attached to the document instead of scattered across DMs.

**Works with**

- **Silo** — every file is stored here, and any Silo object can be referenced inside a doc
- **Cables** — a channel per file
- **sharp-iam** — project documentation
- **Orchestrator** / **Cortex** — sharing follows the org's permission model

---

## Stockwave

**One-line:** Inventory and warehouse management for the whole organization.

**What it does**

- Inventory across multiple warehouses
- Warehouses organized by cost center and by location
- Order intake

**The angle**

Stock stays correct because every app that touches it writes to the same records.
An invoice in sharp-accounting reduces inventory. A purchase updates it. An order
from sharp-marketplace arrives directly. A restaurant in sharp-hospitality draws
down ingredients as it serves. Nobody re-keys anything, and there is no sync to
break.

Lead with the write-back story. The warehouse feature list is second.

**Works with**

- **sharp-accounting** — every inventory transaction posts to the books
- **sharp-marketplace** — orders arrive without re-entry
- **sharp-hospitality** and **sharp-healthcare** — operations draw on the same stock
- **Cables** — a channel per warehouse

---

## sharp-accounting

**One-line:** Double-entry accrual accounting for multi-entity organizations.

**What it does**

- Multiple legal entities
- Double-entry accrual accounting
- Invoicing
- Purchases

**The angle**

The books reconcile with inventory and operations because they are the same system.
Issue an invoice and stock moves in Stockwave. Record a purchase and inventory
updates. Sell on sharp-marketplace and the entry is already made. A hotel and a
restaurant under two different legal entities can share a kitchen and still have
the costs land correctly in each entity's books.

That last one is the strongest concrete example in the platform — use it.

**Works with**

- **Stockwave** — invoices and purchases move stock automatically
- **sharp-marketplace** — place purchase orders and sell, with entries recorded
- **sharp-hospitality** and **sharp-healthcare** — operational activity posts to the books
- **Orchestrator** — owner-level view across all entities

---

## sharp-marketplace

**One-line:** Where organizations buy and sell with each other.

**What it does**

- Organizations list and sell services
- Organizations purchase from other organizations
- Negotiation over Cables

**The angle**

B2B, org to org. The difference is what happens after "yes": a confirmed purchase is
already an entry in sharp-accounting and already reflected in Stockwave. The
negotiation happened in Cables, so the conversation and the transaction aren't in two
places. For the buyer, a purchase order raised in sharp-accounting goes straight out
to the market.

**Works with**

- **Cables** — negotiate directly with the other organization
- **sharp-accounting** — confirmed deals record themselves
- **Stockwave** — orders flow into inventory
- **sharp-crm** — the organizations you sell to

---

## Orchestrator

**One-line:** The super-admin console for owners and stakeholders.

**What it does**

- Organization-wide view across every app
- Controls who can do what, across the platform
- Can govern Silo resource authorization (Cortex is the alternative — an org picks one)

**The angle**

Above the individual apps, not inside one. Permissions for the whole organization are
decided in one console rather than administered eleven times. Written for owners and
stakeholders who want the top-down view.

Say plainly that this comes with the platform — it isn't a separate governance product
to evaluate and bolt on.

**Works with**

- **Silo** — govern storage authorization at the owner level
- **Cortex** — the IT-level console; Orchestrator sits above it
- **sharp-accounting** — visibility across every legal entity
- **Every app** — one permission model, applied everywhere

---

## sharp-hr

**One-line:** HR for your organization, in the same platform as the work.

**What it does**

- Payroll
- Employee records

**The angle**

Use the generic-app framing below. sharp-hr isn't competing on feature depth with a
dedicated HR vendor — it's already holding the same employees as every other app in
your platform, with nothing to import and nothing to connect. Payroll runs against
records that operations, projects, and accounting already share.

State the split with sharp-iam in one clear sentence: **sharp-hr is the HR team's
application; sharp-iam is the employee's portal.** Both sites need this line so a
reader isn't left wondering which one they need.

**Works with**

- **sharp-iam** — the employee-facing side of the same records
- **sharp-accounting** — payroll lands in the books
- **Cables** — HR communication
- **Orchestrator** — organization-level control

---

## sharp-crm

**One-line:** Customer relationships, connected to the operations that create them.

**What it does**

- Customer records
- Loyalty rewards
- Customer communication over Cables

**The angle**

Use the generic-app framing below. The differentiator isn't CRM feature depth — it's
that a guest checking into a hotel in sharp-hospitality is a customer record here
without anyone entering them twice. The loyalty program runs on operational data
because it's the same data.

**Works with**

- **sharp-hospitality** and **sharp-healthcare** — customers appear automatically
- **Cables** — reach customers directly
- **sharp-marketplace** — the organizations you sell to
- **sharp-accounting** — what each customer is worth

**Additional constraint:** do not write copy claiming that customer conversations are
recorded, analyzed, scored, or mined. Recording and analyzing customer communication
carries consent obligations in most jurisdictions, and advertising it publicly commits
your customers to compliance work they may not have done. Describe the channel, not
what's done with its contents.

---

## sharp-hospitality

**One-line:** Run hotels, restaurants, and bars on the platform your business
already runs on.

**What it does**

- Hotel reservations
- POS
- Kitchen display systems, with order routing across multiple KDS
- Table management

**The angle**

A hospitality business normally runs a reservation system, a POS, a KDS, an inventory
tool, and an accounting package from five vendors, then pays someone to keep them
talking. Here they're one system.

The concrete story to lead with: **a hotel and a restaurant under two different legal
entities can share one kitchen.** Orders route to the right KDS, ingredients draw down
from Stockwave as they're prepared, and the costs land correctly in each entity's
books in sharp-accounting. That is not something a five-vendor stack does.

Guests become customer records in sharp-crm without anyone typing them in twice.

**Works with**

- **Stockwave** — inventory draws down as you serve, and updates automatically
- **sharp-accounting** — multi-entity, with shared operations costed correctly
- **sharp-crm** — guests become customers, with loyalty attached
- **sharp-hr** and **sharp-iam** — staff, shifts, and the people running the floor
- **Cables** — front of house, kitchen, and management in one place

---

## sharp-healthcare

**Status: in development. Alpha release candidate coming.**

This site is a placeholder page, not a product page. It should:

- Say clearly that sharp-healthcare is in development, with an alpha release candidate
  coming. No launch date, no month, no countdown.
- Describe where it sits: a business-operations app for healthcare organizations,
  built into the sharpnr platform alongside sharp-hospitality.
- Say what it will connect to — Stockwave for supplies and inventory,
  sharp-accounting for the books, sharp-crm for patient records, Cables for
  communication — in the future tense, plainly.
- Point readers to the rest of the platform. The footer and ecosystem section carry
  this; someone landing here should leave with somewhere to go.
- Make no clinical, medical, regulatory, or patient-safety claims of any kind.
- Have no signup form, no waitlist, and no email capture unless one already exists
  in the code.

If `apps/sharp-healthcare/` has no website route yet, flag it in Step 1 rather than
scaffolding one unasked.

---

## Framing rule: generic apps

sharp-hr, sharp-crm, and Orchestrator cover categories the reader already has an
opinion about. They are not being sold as best-in-class standalone products against
dedicated vendors, and the copy should not invite that comparison.

The selling point is that they come with sharpnr. You don't evaluate, buy, integrate,
and migrate into an HR system — it's already there, already holding the same
employees, already connected to the apps your organization runs on. The CRM already
has your customers because your operations app created them.

Write these pages to that. Lead with belonging, not with feature depth.
