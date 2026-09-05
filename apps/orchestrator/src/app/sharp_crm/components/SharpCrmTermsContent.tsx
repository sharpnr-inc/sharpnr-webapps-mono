const LAST_UPDATED = "5 September 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of SharpCRM, the customer relationship service provided as part of Sharp Orchestrator. By activating SharpCRM, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "SharpCRM provides organisation-scoped customer records, contact and account management, and the pipeline and activity tracking built on top of them. The service is available only to members of your organisation and operates within your organisation's context inside the orchestrator.",
      "We may add, change, or remove features over time. Where a change materially reduces the service, we will give reasonable notice before it takes effect.",
    ],
  },
  {
    title: "3. Accounts and responsibility",
    body: [
      "Your organisation is responsible for the accounts it creates, for keeping member access up to date, and for all activity that takes place under those accounts. Administrators are responsible for removing access when a member leaves the organisation.",
      "You must keep credentials confidential and tell us promptly if you believe an account has been compromised.",
    ],
  },
  {
    title: "4. Customer data you bring",
    body: [
      "SharpCRM holds records about people outside your organisation. Your organisation is the controller of that data: you are responsible for having a lawful basis to collect it, for honouring access, correction, and deletion requests from the people it describes, and for keeping it accurate.",
      "You must not upload customer data you are not permitted to process, and you are responsible for ensuring your use of SharpCRM complies with the marketing, privacy, and data protection laws that apply to your organisation.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "You agree not to use SharpCRM to store unlawful or infringing content, to send unsolicited communications in breach of applicable law, to attempt to gain unauthorised access to the service or to another organisation's data, or to interfere with the normal operation of the service.",
    ],
  },
  {
    title: "6. Your content",
    body: [
      "Your organisation retains ownership of the customer records, notes, and documents it creates through SharpCRM. You grant us the limited rights needed to host, transmit, back up, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "7. Data and privacy",
    body: [
      "Personal data processed through SharpCRM is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for the records your members store in the service.",
      "Content is retained for as long as the service is active for your organisation, subject to any retention settings you configure.",
    ],
  },
  {
    title: "8. Availability and support",
    body: [
      "We aim to keep SharpCRM available at all times, but the service is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "9. Suspension and termination",
    body: [
      "You may deactivate SharpCRM for your organisation at any time from the orchestrator. Deactivating the service switches it off — it does not delete your records, and reactivating brings the same account back. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Your organisation may export its records before deactivation; after the retention period, content may be permanently deleted.",
    ],
  },
  {
    title: "10. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use of SharpCRM after that point means the updated terms apply.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "Questions about these terms can be sent to your organisation's administrator, or to Sharp Orchestrator support.",
    ],
  },
];

/** Modal body only — the title and footer come from the modal that opens it. */
function SharpCrmTermsContent() {
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

export default SharpCrmTermsContent;
