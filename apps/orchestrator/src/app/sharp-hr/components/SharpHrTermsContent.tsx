const LAST_UPDATED = "5 September 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of SharpHR, the human resources service provided as part of Sharp Orchestrator. By activating SharpHR, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "SharpHR provides organisation-scoped human resources management: the employee record, onboarding and offboarding, attendance and leave, payroll inputs, and recruitment, together with the reporting over them. The service operates within your organisation's context inside the orchestrator.",
      "We may add, change, or remove features over time. Where a change materially reduces the service, we will give reasonable notice before it takes effect.",
    ],
  },
  {
    title: "3. Employee data",
    body: [
      "SharpHR holds records about your own people, much of it sensitive: identity documents, contact details, pay, and in some configurations attendance and health-related absence. Your organisation is the controller of that data. You are responsible for having a lawful basis to hold it, for telling your employees what you hold and why, and for honouring their access, correction, and deletion rights.",
      "You must not store special category data beyond what your legal basis permits, and you are responsible for ensuring your use of SharpHR complies with the employment, payroll, and data protection laws that apply in every jurisdiction you employ people.",
    ],
  },
  {
    title: "4. Accounts and responsibility",
    body: [
      "Your organisation is responsible for the accounts it creates, for keeping HR access appropriately narrow, and for all activity that takes place under those accounts. HR data is among the most sensitive an organisation holds — administrators are responsible for reviewing who can reach it and for removing access when someone changes role or leaves.",
      "You must keep credentials confidential and tell us promptly if you believe an account has been compromised.",
    ],
  },
  {
    title: "5. Employment decisions are yours",
    body: [
      "SharpHR records and supports your HR processes; it does not make employment decisions. Hiring, discipline, pay, and termination decisions are your organisation's alone, and you remain responsible for their lawfulness and fairness.",
      "Any calculation, report, or suggestion the service produces is an input to your decision, not a substitute for it, and should be reviewed before it is acted on.",
    ],
  },
  {
    title: "6. Acceptable use",
    body: [
      "You agree not to use SharpHR to store unlawful content, to monitor employees in ways your local law does not permit, to attempt to gain unauthorised access to the service or to another organisation's data, or to interfere with the normal operation of the service.",
    ],
  },
  {
    title: "7. Your content",
    body: [
      "Your organisation retains ownership of the employee records, documents, and configuration it creates through SharpHR. You grant us the limited rights needed to host, transmit, back up, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "8. Data, privacy and retention",
    body: [
      "Personal data processed through SharpHR is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for the records your members store.",
      "Employment records often carry statutory retention periods that outlast the employment itself. Configuring retention to meet those obligations is your organisation's responsibility; content is retained for as long as the service is active, subject to the settings you configure.",
    ],
  },
  {
    title: "9. Availability and support",
    body: [
      "We aim to keep SharpHR available at all times, but the service is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "10. Suspension and termination",
    body: [
      "You may deactivate SharpHR for your organisation at any time from the orchestrator. Deactivating switches the service off — it does not delete your employee records, and reactivating brings the same account back. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Your organisation may export its records before deactivation; after the retention period, content may be permanently deleted.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use of SharpHR after that point means the updated terms apply.",
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
function SharpHrTermsContent() {
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

export default SharpHrTermsContent;
