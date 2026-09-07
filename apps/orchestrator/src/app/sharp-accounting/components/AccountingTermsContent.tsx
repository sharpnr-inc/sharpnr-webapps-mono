const LAST_UPDATED = "5 September 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of Sharp Accounting, the accounting service provided as part of Sharp Orchestrator. By activating it, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "Sharp Accounting provides double-entry books per legal entity: chart of accounts, journals, ledgers, fiscal years, purchase invoices and payments, and the reports built over them. Activating the service switches it on for the organisation; each legal entity's book is created separately as part of that entity's setup.",
      "We may add, change, or remove features over time. Where a change materially reduces the service, we will give reasonable notice before it takes effect.",
    ],
  },
  {
    title: "3. Your records, your responsibility",
    body: [
      "Your organisation is responsible for the accuracy and completeness of what it records. The service performs the arithmetic and enforces double-entry, but it does not verify that a transaction happened, that it is classified correctly, or that it is supported by a document.",
      "You are responsible for reconciling your books, for reviewing what the service produces before relying on it, and for keeping the underlying evidence.",
    ],
  },
  {
    title: "4. Not accounting, tax, or audit advice",
    body: [
      "Sharp Accounting is bookkeeping software. Nothing it produces — a report, a balance, a suggested classification — is accounting, tax, or audit advice, and it is not a substitute for a qualified accountant or auditor.",
      "Determining the accounting standards, tax treatment, and filing obligations that apply to your organisation is your responsibility, in every jurisdiction in which you operate.",
    ],
  },
  {
    title: "5. Statutory records and retention",
    body: [
      "Accounting records usually carry statutory retention periods, often measured in years after the period they relate to. Configuring retention to meet those obligations, and exporting what you are required to keep, is your organisation's responsibility.",
      "A closed fiscal year is closed deliberately: the service is designed so that posted entries are corrected by further entries rather than by silent edits, because that is what an audit trail requires.",
    ],
  },
  {
    title: "6. Accounts and access",
    body: [
      "Your organisation is responsible for the accounts it creates and for keeping access to financial records appropriately narrow. Access is governed by Sentinel policy and scoped per legal entity — administrators are responsible for reviewing who can post, approve, and close.",
      "You must keep credentials confidential and tell us promptly if you believe an account has been compromised.",
    ],
  },
  {
    title: "7. Your content",
    body: [
      "Your organisation retains ownership of the books, entries, invoices, and documents it creates through the service. You grant us the limited rights needed to host, transmit, back up, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "8. Data and privacy",
    body: [
      "Personal data processed through the service — supplier and customer contacts, employee expense claims — is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for that content.",
    ],
  },
  {
    title: "9. Availability and support",
    body: [
      "We aim to keep the service available at all times, but it is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "10. Suspension and termination",
    body: [
      "You may deactivate the service for your organisation at any time from the orchestrator. Deactivating switches it off — it does not delete a single ledger row, and reactivating brings the same account back. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Given the statutory retention that applies to accounting records, your organisation should export its books before deactivating.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use after that point means the updated terms apply.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      "Questions about these terms can be sent to your organisation's administrator, or to Sharp Orchestrator support.",
    ],
  },
];

/** Modal body only — the title and footer come from the modal that opens it. */
function AccountingTermsContent() {
  return (
    <div className="space-y-7">
      <p className="text-xs text-muted-foreground">
        Last updated {LAST_UPDATED}
      </p>

      {SECTIONS.map(({ title, body }) => (
        <section key={title} className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <p className="text-xs text-muted-foreground border-t border-border pt-5">
        These terms form part of your organisation's agreement for Sharp
        Orchestrator. Where they conflict with a signed master agreement, that
        agreement takes precedence.
      </p>
    </div>
  );
}

export default AccountingTermsContent;
