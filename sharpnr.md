# Sharpnr

> **Sharpnr is a cloud platform with two halves: industry apps that run your business — hotels, restaurants, clinics — and the shared services every organization needs anyway — accounting, HR, CRM, communication, storage, documents. Connected out of the box, governed from one control center.**

Every business has two kinds of work: operations specific to its industry, and operations common to all organizations. A restaurant and a hospital run nothing alike day to day — but both need accounting, HR, a CRM, messaging, and file storage. Sharpnr provides both halves and, critically, the connection between them: a sale in the industry app becomes a journal entry in accounting automatically.

---

## The three tiers

Sharpnr is organized into three tiers. The first two are products. The third is the platform fabric that binds them.

| Tier                           | What it is                                                       | Who buys it           |
| ------------------------------ | ---------------------------------------------------------------- | --------------------- |
| **1. Business Operation Apps** | Industry-specific apps that face the customer                    | Chosen by industry    |
| **2. Core Services**           | Industry-agnostic apps every organization needs                  | Chosen by need        |
| **3. Platform**                | Identity, control, and the employee portal — not sold separately | Comes with everything |

---

## Tier 1 — Business Operation Apps

Apps built for a specific industry's daily operations. Each runs on its own domain and can operate standalone.

| App                   | Industry             | Domain                    | What it does                                                                                              |
| --------------------- | -------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Sharp-Hospitality** | Hotels & restaurants | `hospitality.sharpnr.com` | Manage single venues or chains: table management, order taking, kitchen routing (KDS), room reservations. |
| **Lifco**             | Healthcare           | `lifco.sharpnr.com`       | Clinical and patient operations. _(Coming soon.)_                                                         |

More industries will be added as the platform grows. Every Business Operation App follows the same contract: it runs independently, and it emits business events (sales, purchases, bookings) that Core Services consume automatically.

---

## Tier 2 — Core Services

The apps every organization needs regardless of industry. Each is a full product on its own domain, usable without any Business Operation App — and each is ambitious enough to stand alone in its category.

| Service              | Domain                   | Category          | What it does                                                               |
| -------------------- | ------------------------ | ----------------- | -------------------------------------------------------------------------- |
| **Sharp-Accounting** | `accounting.sharpnr.com` | Accounting        | Double-entry accounting with automatic journal entries from business apps. |
| **Sharp-HR**         | `hr.sharpnr.com`         | HRMS              | Employees, payroll, attendance, recruitment.                               |
| **Sharp-CRM**        | `sharpcrm.sharpnr.com`   | CRM               | Leads, campaigns, and long-term customer relationships.                    |
| **Cables**           | `cables.sharpnr.com`     | Communication     | Chat, calls, and conferencing.                                             |
| **Silo**             | `silo.sharpnr.com`       | Data & storage    | Object storage (S3-compatible), data warehouse, lakehouse.                 |
| **Folio**            | `folio.sharpnr.com`      | Productivity      | Docs, sheets, presentations, whiteboards — real-time collaboration.        |
| **Cortex**           | `cortex.sharpnr.com`     | IT administration | Access control, audit logs, security policies.                             |

No organization needs all seven — but every organization needs at least two or three. That is the adoption wedge for Core Services.

---

## Tier 3 — Platform

These are not products. They are the fabric that makes the tiers above work as one system.

| Component        | Domain                     | Role                                                                                                                                        |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Auth**         | `auth.sharpnr.com`         | Single identity for the entire platform. Every app authenticates here — one signup, one login, everywhere.                                  |
| **Orchestrator** | `orchestrator.sharpnr.com` | The command center. Enable or disable services per company, configure apps, control access, connect every service to every other. The glue. |
| **SharpIAM**     | `iam.sharpnr.com`          | The employee portal. Where every employee — manager or staff — finds their tasks, approvals, payslips, attendance, and training.            |

---

### Tier 4 — Network

| Component         | Domain                    | Role                                                                                             |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| Sharp-Marketplace | `marketplace.sharpnr.com` | B2B marketplace where organizations on Sharpnr sell to and buy from each other. Zero commission. |

**How it works.** Sharpnr is multi-tenant — organizations live on the platform — so
they can trade with each other directly. Example: an organization sells tomatoes; a
restaurant running Sharp-Hospitality buys them on Sharp-Marketplace. Because both are
on Sharpnr, the seller is automatically added as a supplier for the buyer and the
transaction entry is created in Sharp-Accounting — no manual bookkeeping.

**Payments: coming-soon.** Sharpnr does not process payments yet. Never claim that
organizations can pay each other on the platform; payments settle outside Sharpnr for
now. Safe claim: "payments coming soon."

---

## Why separate domains?

Two reasons, one for users and one for the product:

1. **Clarity of use.** Each app has one job and one address. Employees who only need chat go to Cables; accountants go to Sharp-Accounting. No monolithic dashboard to learn.
2. **Room to grow.** Each service can evolve into a category leader in its own right — Sharp-CRM competing head-to-head with Salesforce, Silo with cloud storage providers — without being constrained by the rest of the platform.

---

## Adoption paths

There is no single entry door. Organizations arrive three ways:

- **Industry-first.** A restaurant adopts Sharp-Hospitality for POS and kitchen routing, then discovers accounting entries are already being written for them.
- **Services-first.** An organization with no matching industry app simply uses Core Services — accounting, HR, and CRM — as its business suite.
- **Full stack.** A multi-company group runs industry apps and all Core Services across every entity, governed from Orchestrator.

---

## Platform capabilities

Cross-cutting features that apply across the platform (not tied to one app):

- **Multi-company / multi-entity.** One organization can hold multiple legal entities
  (e.g., XYZ Pvt Ltd and YZX Pvt Ltd), each with its own GST registration(s). Supports
  all Indian company types (Pvt Ltd, LLP, partnership, proprietorship, …).
  <!-- TODO: confirm exact list of supported company types -->
- **Cost centers.** Organizations can create multiple cost centers for their office
  branches. These are deliberately separate from operational branches (the hotels,
  restaurants, or hospitals run in Business Operation Apps) — corporate structure and
  venue structure are modeled independently.
- **Fine-grained authorization.** Access is granted per resource — users see and touch
  only what they are explicitly given, across every app.
  **Region note:** GST support and Indian company types mean Sharpnr is built
  India-first. <!-- TODO: confirm — India-only for now, or global with India focus? -->

---

## Why Sharpnr?

**The problem.** A typical business runs on 6–10 disconnected tools: a POS from one
vendor, accounting from another, HR in a third, chat in WhatsApp, files in Drive, a
CRM nobody updates. None of them talk to each other, so people become the
integration — re-entering every sale into the books, reconciling at month-end,
copying data between systems, and paying separate subscriptions for tools that
actively don't cooperate. For multi-company groups it's worse: every entity repeats
the whole mess, and nobody has one view of the business.

**Why Sharpnr instead:**

1. **The work connects itself.** A sale in Sharp-Hospitality becomes a journal entry
   in Sharp-Accounting automatically. A marketplace purchase creates the supplier and
   the transaction entry. The reconciliation work that eats evenings simply doesn't
   exist.
2. **Both halves of the business, one place.** Industry operations (tables, kitchen,
   rooms) and organizational operations (accounting, HR, CRM, chat, files, docs) on
   one platform — instead of an industry tool bolted to an office suite with duct
   tape.
3. **One identity, one control center.** Every employee gets one login for
   everything. Admins enable, disable, and configure every service per company from
   Orchestrator, with fine-grained access — people see only the resources they're
   given.
4. **Built for how businesses are actually structured.** Multiple legal entities
   under one organization, each with its own GST registrations; cost centers for
   office branches modeled separately from operational branches. Books can be kept
   independent or consolidated.
5. **Adopt one app, not a religion.** Every app runs standalone on its own domain.
   Start with the two or three services you need; grow into the rest when it makes
   sense. No forced migration of your whole company on day one.
6. **A network, not just software.** Organizations on Sharpnr buy and sell from each
   other on Sharp-Marketplace with zero commission — trade flows straight into the
   books. (Payments settle off-platform for now; on-platform payments coming soon.)
7. **Free during early access.** The whole platform, while it's in alpha.
   **The one-line answer:** other tools digitize your paperwork; Sharpnr removes it —
   because when everything runs on one platform, the connections you used to maintain
   by hand happen on their own.
