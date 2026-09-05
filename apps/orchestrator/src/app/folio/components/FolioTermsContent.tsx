const LAST_UPDATED = "5 September 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of Folio, the documents service provided as part of Sharp Orchestrator. By activating Folio, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "Folio provides organisation-scoped documents, spreadsheets, presentations, whiteboards, notes and PDFs, together with the templates, sharing and version history over them. The service is available to members of your organisation and operates within your organisation's context inside the orchestrator.",
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
    title: "4. Collaboration and sharing",
    body: [
      "Folio lets your members share documents with each other and, where you enable it, with people outside the organisation. Deciding what may be shared and with whom is your organisation's call, and a link you create is only as private as the settings you give it.",
      "Administrators can review and revoke sharing. Content already downloaded by a recipient before revocation is outside our control.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "You agree not to use Folio to create or store unlawful, harassing, defamatory, or infringing content; to distribute malware; to attempt to gain unauthorised access to the service or to another organisation's documents; or to interfere with the normal operation of the service.",
      "You are responsible for ensuring your use of Folio complies with the laws and regulations that apply to your organisation, including any rules on record retention.",
    ],
  },
  {
    title: "6. Your content",
    body: [
      "Your organisation retains ownership of the documents, sheets, boards, and files it creates through Folio. You grant us the limited rights needed to host, transmit, back up, render, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "7. Version history and deletion",
    body: [
      "Folio keeps version history so a document can be restored to an earlier state. History is retained according to your configured settings, and a document deleted by a member with valid access is removed along with its versions once it leaves the trash.",
      "Restores are best-effort against the most recent recoverable version. We do not guarantee recovery of content deleted by your own retention rules.",
    ],
  },
  {
    title: "8. Data and privacy",
    body: [
      "Personal data processed through Folio is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for the content your members create.",
      "Content is retained for as long as the service is active for your organisation, subject to any retention settings you configure.",
    ],
  },
  {
    title: "9. Availability and support",
    body: [
      "We aim to keep Folio available at all times, but the service is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "10. Suspension and termination",
    body: [
      "You may deactivate Folio for your organisation at any time from the orchestrator. Deactivating switches the service off — it does not delete your documents, and reactivating brings the same account back. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Your organisation may export its documents before deactivation; after the retention period, content may be permanently deleted.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use of Folio after that point means the updated terms apply.",
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
function FolioTermsContent() {
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

export default FolioTermsContent;
