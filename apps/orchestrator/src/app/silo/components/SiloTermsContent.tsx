const LAST_UPDATED = "5 September 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of Silo, the storage and data service provided as part of Sharp Orchestrator. By activating Silo, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "Silo provides organisation-scoped storage and data infrastructure: object buckets, managed databases, warehouses and datasets, a drive for the people in your organisation, and the backups, delivery and activity records over them.",
      "We may add, change, or remove features over time. Where a change materially reduces the service, we will give reasonable notice before it takes effect.",
    ],
  },
  {
    title: "3. Accounts and responsibility",
    body: [
      "Your organisation is responsible for the accounts it creates, for keeping member access up to date, and for all activity that takes place under those accounts. Access to Silo resources is governed in Cortex and enforced by Silo, so removing a member's access there removes it here.",
      "You must keep credentials confidential and tell us promptly if you believe an account or connection credential has been compromised.",
    ],
  },
  {
    title: "4. The data you store",
    body: [
      "Your organisation decides what goes into Silo. You are responsible for having the right to store and process that data, for classifying anything sensitive appropriately, and for honouring requests from the people your data describes.",
      "You must not store data you are not permitted to hold, and you are responsible for ensuring your use of Silo complies with the data protection, residency, and retention laws that apply to your organisation.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "You agree not to use Silo to store unlawful or infringing content, to distribute malware, to attempt to gain unauthorised access to the service or to another organisation's data, or to interfere with the normal operation of the service.",
      "Storage, transfer, and compute are subject to the quotas and fair-use limits that apply to your plan.",
    ],
  },
  {
    title: "6. Your content",
    body: [
      "Your organisation retains ownership of the files, records, and datasets it stores in Silo. You grant us the limited rights needed to host, transmit, replicate, back up, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "7. Backups, durability and retention",
    body: [
      "We take backups of the storage the service manages, but backups are not a substitute for your own retention policy. Where you configure retention or lifecycle rules, they apply as configured — including deletions they cause.",
      "Restores are performed against the most recent recoverable copy. We do not guarantee recovery of data deleted by your own rules or by a member acting with valid access.",
    ],
  },
  {
    title: "8. Data and privacy",
    body: [
      "Personal data stored in Silo is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for the content your members store.",
      "Content is retained for as long as the service is active for your organisation, subject to any retention settings you configure.",
    ],
  },
  {
    title: "9. Availability and support",
    body: [
      "We aim to keep Silo available at all times, but the service is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "10. Suspension and termination",
    body: [
      "You may deactivate Silo for your organisation at any time from the orchestrator. Deactivating switches the service off — it does not delete what you have stored, and reactivating brings the same account back. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Your organisation may export its data before deactivation; after the retention period, content may be permanently deleted.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use of Silo after that point means the updated terms apply.",
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
function SiloTermsContent() {
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

export default SiloTermsContent;
