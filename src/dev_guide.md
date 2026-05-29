# Sharpnr — Platform Intelligence Brief
> This document is the canonical reference for the Sharpnr platform and its product suite.
> Intended for: AI agents, designers, developers building the Sharpnr landing website.

---

## 1. The Platform — Sharpnr

### Tagline
**"One Platform. Every Business."**

### What is Sharpnr?
Sharpnr is a unified business management platform built for modern organizations that refuse to stitch together a dozen disconnected SaaS tools. It brings together HR, accounting, marketing, communication, document management, file storage, and identity — all under one ecosystem, all sharing the same data layer, all controlled from a single command plane called the Orchestrator.

Sharpnr is not a suite of tools that happen to share a logo. It is a deeply integrated platform where every product knows about every other — your HR data flows into Accounting, your Marketing campaigns connect to your CRM, your files in Silo are accessible inside Folio, and your team's identity is managed once in SharpIAM and respected everywhere.

### Core Philosophy
- **No silos** — data flows freely between products
- **One login** — SharpIAM governs access across the entire platform
- **Operator-first** — built for teams who want control, not hand-holding
- **Composable** — use one product or all nine; they work standalone or together

### Who is Sharpnr for?
- **SMBs to mid-market companies** (10 – 5,000 employees)
- Operations leaders, HR managers, finance teams, marketing departments
- Tech-forward businesses tired of context-switching between Slack, Google Drive, QuickBooks, Workday, and HubSpot
- Organizations that want one vendor, one contract, one support line

### Brand Tone
Precise. Confident. Operator-grade. Not flashy — reliable. The brand feels like a control room: clean lines, purposeful language, nothing wasted. Think: a Swiss watch built inside a command terminal.

### Platform Pillars
| Pillar | Description |
|---|---|
| **Unified Data Layer** | All apps share a common data backbone — no duplicate entries, no sync errors |
| **Single Identity** | SharpIAM provides one login, one permission model across all products |
| **Orchestrator HQ** | Central command plane to monitor, configure, and govern all products |
| **Open API** | Every product exposes a full REST + WebSocket API for custom integrations |
| **On-premise or Cloud** | Deploy on Sharpnr Cloud or self-host on your own infrastructure |

---

## 2. Products

---

### 2.1 Sharp-HR
**Tagline:** *"Your people, fully managed."*

**Category:** Human Resources Management

**What it does:**
Sharp-HR is the people operations backbone of Sharpnr. It handles the full employee lifecycle — from the moment a candidate applies to the day they offboard. Teams use it to run payroll, manage recruitment pipelines, automate onboarding workflows, track attendance, handle leave, and store employee records.

**Core Features:**
- **Payroll Engine** — automated salary calculation, tax compliance, payslip generation, multi-currency support
- **Recruitment Pipeline** — job posting, applicant tracking (ATS), interview scheduling, offer management
- **Onboarding Workflows** — automated task checklists, document collection, equipment assignment, day-one readiness tracking
- **Employee Directory** — rich profiles, org chart, role history, skills inventory
- **Leave & Attendance** — leave requests, approval flows, shift scheduling, time tracking
- **Performance Reviews** — goal setting, review cycles, 360° feedback
- **Compliance** — local labor law templates, contract management, audit logs

**Integrates with:** Sharp-Accounting (payroll → expenses), SharpIAM (employee → user provisioning), Sharp-Orchestrator (admin control)

**Key Value Prop:** When you hire someone in Sharp-HR, they are automatically provisioned in SharpIAM and their payroll flows directly into Sharp-Accounting. No manual handoffs.

---

### 2.2 Sharp-Marketing
**Tagline:** *"Campaigns that connect. Results that compound."*

**Category:** Marketing Operations & Campaign Management

**What it does:**
Sharp-Marketing is the growth engine of the Sharpnr platform. It gives marketing teams the tools to plan, execute, and measure campaigns — across email, social, content, and paid channels — without leaving the Sharpnr ecosystem. It includes a lightweight CRM, campaign builder, analytics dashboard, and audience segmentation engine.

**Core Features:**
- **Campaign Builder** — drag-and-drop multi-channel campaign creation (email, SMS, social, ads)
- **CRM** — contact management, pipeline tracking, deal stages, activity timeline
- **Audience Segmentation** — build dynamic segments from behavioral, demographic, and transactional data
- **Email Studio** — template builder, A/B testing, deliverability monitoring, send-time optimization
- **Analytics Dashboard** — campaign ROI, funnel performance, channel attribution, cohort analysis
- **Content Calendar** — plan and schedule content across channels with team collaboration
- **Lead Scoring** — rule-based and AI-assisted scoring to prioritize outreach
- **Landing Page Builder** — publish campaign pages without engineering support

**Integrates with:** Sharp-HR (employee as audience for internal comms), Sharp-Accounting (budget vs spend tracking), Sharp-Folio (marketing documents and brand assets), Sharp-Silo (asset storage)

---

### 2.3 Sharp-Accounting
**Tagline:** *"The numbers, always right."*

**Category:** Financial Management & Accounting

**What it does:**
Sharp-Accounting is the financial operating system of the platform. It handles bookkeeping, invoicing, expense management, financial reporting, and tax preparation — fully integrated with payroll from Sharp-HR and purchase data from across the platform. Built for finance teams who need accuracy, auditability, and speed.

**Core Features:**
- **General Ledger** — double-entry bookkeeping, chart of accounts, journal entries
- **Invoicing** — create, send, and track invoices; automated payment reminders; recurring billing
- **Expense Management** — expense submission, approval workflows, receipt capture, reimbursements
- **Bank Reconciliation** — connect bank accounts, auto-match transactions, flag discrepancies
- **Financial Reports** — P&L, balance sheet, cash flow statement, custom reports
- **Budgeting** — department-level budgets, variance tracking, forecasting
- **Tax Management** — VAT/GST tracking, tax filing preparation, compliance reports
- **Multi-currency** — real-time exchange rates, multi-currency invoices and books
- **Audit Trail** — every transaction is logged, timestamped, and attribution-tracked

**Integrates with:** Sharp-HR (payroll expenses), Sharp-Marketing (campaign budget tracking), Sharp-Orchestrator (financial health dashboard)

---

### 2.4 Sharp-Orchestrator
**Tagline:** *"Command everything. From one place."*

**Category:** Platform Control Plane / Admin HQ

**What it does:**
Sharp-Orchestrator is the headquarters of the entire Sharpnr platform. It is not an end-user app — it is the control plane for operators, IT administrators, and platform owners. From Orchestrator, you can monitor the health of every connected Sharpnr product, manage organization-wide settings, govern user access, view real-time telemetry, configure integrations, and deploy policies across the entire ecosystem.

Think of it as the mission control room for your business operating system.

**Core Features:**
- **Product Fleet Dashboard** — live status, uptime, and health metrics for every connected Sharpnr app
- **User Directory** — organization-wide user management, roles, product access, activity logs
- **Policy Engine** — define and enforce access policies, data retention rules, and security posture
- **Telemetry & Observability** — unified metrics, event logs, and alerts across all products
- **Integration Hub** — configure webhooks, API keys, and third-party connections in one place
- **Audit Center** — org-wide audit log, compliance exports, change history
- **Billing & Licensing** — manage subscriptions, seat counts, and product add-ons
- **Deployment Control** — configure environments (staging/prod), manage updates and rollbacks

**Integrates with:** Every Sharpnr product. Orchestrator is the connective layer.

---

### 2.5 Sharp-Cable
**Tagline:** *"Your team, always connected."*

**Category:** Team Communication & Collaboration

**What it does:**
Sharp-Cable is Sharpnr's real-time communication layer — a purpose-built messaging and collaboration platform that combines the channel-based structure of Slack with the community and voice/video capabilities of Discord. It is where teams talk, share, huddle, and coordinate — deeply wired into the rest of the Sharpnr ecosystem so that conversations have context.

Unlike standalone chat tools, Sharp-Cable knows who people are (from Sharp-HR), what projects they're working on, and can surface relevant documents from Sharp-Folio or files from Sharp-Silo directly in the conversation.

**Core Features:**
- **Channels** — public, private, and topic-based channels with threads
- **Direct Messages** — 1:1 and group DMs with rich media support
- **Voice & Video Huddles** — lightweight voice rooms, full video calls, screen sharing
- **Message Search** — full-text search across all channels and DMs
- **Notifications** — granular notification control per channel, @mentions, keyword alerts
- **Integrations** — receive alerts from Sharp-Orchestrator, HR notifications, accounting alerts directly in channels
- **File Sharing** — share files from Sharp-Silo directly in chat; preview without leaving
- **Bots & Automations** — no-code bots for standup reminders, approval notifications, and more
- **Org Directory** — see team member profiles (powered by Sharp-HR) from within chat

**Integrates with:** Sharp-HR (org directory, onboarding welcome), Sharp-Silo (file sharing), Sharp-Folio (document links with previews), Sharp-Orchestrator (system alerts as channel messages)

---

### 2.6 Sharp-Folio
**Tagline:** *"Write together. Think together."*

**Category:** Document Creation & Collaborative Editing

**What it does:**
Sharp-Folio is Sharpnr's collaborative document editor — the equivalent of Google Docs or Microsoft Word, built natively into the platform. Teams create, edit, review, and publish documents together in real time. From internal SOPs and meeting notes to client proposals and marketing briefs, Folio is where written work happens.

Because it lives inside Sharpnr, documents in Folio can pull live data — embed a payroll summary from Accounting, reference a campaign report from Marketing, or link to a file in Silo — without copy-pasting across tabs.

**Core Features:**
- **Rich Text Editor** — full formatting, headings, tables, callouts, code blocks, embeds
- **Real-time Collaboration** — multi-cursor editing, presence indicators, live comments
- **Version History** — full revision timeline, named versions, restore any point
- **Templates** — org-wide and personal templates for recurring document types
- **Comments & Review** — inline comments, suggestions mode, approval workflows
- **Publishing** — publish documents as internal wiki pages or external web pages
- **Data Embeds** — embed live charts, tables, and reports from Sharp-Accounting and Sharp-Marketing
- **Permissions** — granular view/comment/edit permissions per document or folder
- **Offline Mode** — continue editing without a connection; sync on reconnect

**Integrates with:** Sharp-Silo (file attachments), Sharp-Cable (share doc links with previews), Sharp-HR (org chart embeds), SharpIAM (document access control)

---

### 2.7 Sharp-Silo
**Tagline:** *"Every file. Always there."*

**Category:** File Storage & Asset Management

**What it does:**
Sharp-Silo is the secure, centralized file storage layer of the Sharpnr platform — the equivalent of Google Drive or Dropbox, but built as the file backbone for the entire ecosystem. Every file uploaded anywhere in Sharpnr lives in Silo. Marketing assets, HR contracts, accounting receipts, Folio document attachments — all stored, indexed, and retrievable from one place.

**Core Features:**
- **File Storage** — upload, organize, and manage files of any type up to enterprise scale
- **Folder Structure** — nested folders with team and department organization
- **Smart Search** — full-text search inside documents, image recognition tags, metadata search
- **Version Control** — every file versioned; restore previous versions at any time
- **Access Control** — per-file and per-folder permissions, link sharing with expiry
- **Media Preview** — in-browser preview for images, PDFs, videos, audio, Office files
- **Bulk Operations** — move, copy, tag, and share files in bulk
- **Storage Quotas** — department-level storage allocation and monitoring
- **CDN Delivery** — fast global delivery for assets (for marketing and public files)
- **Encryption** — at-rest and in-transit encryption; zero-knowledge option available

**Integrates with:** Every Sharpnr product. Silo is the file layer of the platform — when any product stores or retrieves a file, it goes through Silo.

---

### 2.8 Sharp-Marketplace
**Tagline:** *"Extend Sharpnr. Your way."*

**Category:** App Marketplace & Integration Hub

**What it does:**
Sharp-Marketplace is the ecosystem extension layer — an app store where businesses can discover, install, and manage third-party integrations, official Sharpnr add-ons, and community-built extensions. It is also where developers and vendors publish apps that connect to the Sharpnr platform.

From a Stripe payment integration to a custom Slack bot, from an industry-specific HR template pack to a legal e-signature connector — Marketplace is where the platform grows beyond its defaults.

**Core Features:**
- **App Discovery** — browse and search apps by category, product compatibility, and rating
- **One-click Install** — install and connect apps directly to relevant Sharpnr products
- **Developer Portal** — submit, publish, and manage your own apps and integrations
- **Official Add-ons** — Sharpnr-built extensions for advanced features (AI assistant, advanced analytics, etc.)
- **Template Library** — industry-specific templates for Folio documents, HR workflows, Accounting charts of accounts
- **Webhook Marketplace** — pre-built webhook connectors for popular external services
- **Review & Ratings** — community reviews, verified badges, install counts
- **License Management** — manage third-party app licenses and billing from one place

**Categories in Marketplace:**
Finance & Payments · HR & Recruiting · Marketing & CRM · Communication · Legal & Compliance · E-commerce · Developer Tools · Industry Packs

---

### 2.9 SharpIAM
**Tagline:** *"One identity. Every door."*

**Category:** Identity & Access Management

**What it does:**
SharpIAM is the identity and access management backbone of the entire Sharpnr platform. It is the single source of truth for who users are, what roles they hold, and what they are allowed to do — across every product in the ecosystem. When a new employee is added in Sharp-HR, SharpIAM automatically provisions their account, assigns product access based on their role, and enforces the organization's security policies.

SharpIAM is mostly invisible when it works — which is always. It is the reason you log in once and every Sharpnr product just works.

**Core Features:**
- **Single Sign-On (SSO)** — one login for the entire Sharpnr platform; supports SAML 2.0, OIDC
- **Multi-factor Authentication (MFA)** — TOTP, hardware keys, push notifications
- **Role-Based Access Control (RBAC)** — define roles and permissions at org, product, and resource level
- **Directory Sync** — sync with Active Directory, LDAP, Google Workspace, Azure AD
- **Automated Provisioning** — create, update, and deprovision users automatically based on HR events
- **Session Management** — session timeouts, device trust, concurrent session limits
- **Audit Logs** — every login, permission change, and access event logged and exportable
- **API Keys & Service Accounts** — manage machine identities and API credentials
- **Password Policies** — enforce complexity, rotation, and breach detection
- **Org Hierarchy** — model your org structure; inherit permissions through the hierarchy

**Integrates with:** Every Sharpnr product. SharpIAM is non-optional — it is the identity layer of the platform, not an add-on.

---

## 3. How Products Connect — Integration Map

```
SharpIAM ─────────────────────────────── governs identity for ALL products
Sharp-Orchestrator ───────────────────── monitors & controls ALL products
Sharp-Silo ───────────────────────────── stores files for ALL products

Sharp-HR ──────┬──► Sharp-Accounting    (payroll → expenses)
               ├──► SharpIAM            (hire → provision user)
               ├──► Sharp-Cable         (new hire → welcome message)
               └──► Sharp-Folio         (contracts, offer letters)

Sharp-Accounting ──► Sharp-Marketing    (budget tracking)
Sharp-Marketing ───► Sharp-Folio        (briefs, reports as docs)
Sharp-Folio ───────► Sharp-Silo         (file attachments)
Sharp-Cable ───────► Sharp-Silo         (file sharing in chat)
Sharp-Marketplace ─► ALL products       (extend any product)
```

---

## 4. Pricing Tiers (Reference)

| Tier | Target | Includes |
|---|---|---|
| **Starter** | Up to 25 users | Core products: HR, Accounting, Folio, Silo, Cable, SharpIAM |
| **Growth** | Up to 200 users | All Starter + Marketing, Marketplace, priority support |
| **Enterprise** | Unlimited | All products + Orchestrator, custom SLAs, on-premise option, dedicated CSM |

---

## 5. Key Differentiators vs Competition

| Vs. | Sharpnr Advantage |
|---|---|
| **Google Workspace** | Sharpnr adds HR, Accounting, and Marketing — not just productivity tools |
| **Microsoft 365** | Sharpnr is natively integrated — no Power Automate glue required |
| **Notion + Slack + QuickBooks** | One platform, one login, one data model — not three separate subscriptions |
| **Workday / SAP** | Sharpnr is modern, fast to deploy, and priced for mid-market |
| **HubSpot + Gusto + Xero** | Sharpnr replaces all three with native cross-product data flow |

---

## 6. Brand & Visual Language (For Website Generation)

- **Aesthetic:** Operator-grade precision. Clean. Technical. Confident. Not corporate-bland, not startup-bubbly.
- **Typography:** Serif display (DM Serif Display) for headlines. Monospace (JetBrains Mono or similar) for labels, tags, and system data. Clean sans for body text.
- **Color:** shadcn/ui CSS variable token system. Adapts to light and dark. Primary accent is sharp and singular — no gradients for gradients' sake.
- **Motion:** Purposeful. Entry animations, hover states, pulse indicators for live status. Nothing decorative without function.
- **UI Patterns:** Corner brackets on cards, monospace labels, live status dots, terminal-style command references, grid backgrounds with scanlines.
- **Voice:** Declarative. Short sentences. Active verbs. "One login. Every product." not "Experience the power of unified identity management."

---

*Document version: 1.0 · Sharpnr Internal · For AI agent use*