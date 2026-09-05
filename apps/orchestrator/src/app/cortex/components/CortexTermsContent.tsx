const LAST_UPDATED = "5 September 2026";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of Cortex, the IT controls and access management service provided as part of Sharp Orchestrator. By activating Cortex, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "Cortex provides organisation-scoped IT governance: role and policy definitions, API keys and secrets, service accounts, device and asset records, access requests, and the audit and compliance reporting over them. The service operates within your organisation's context inside the orchestrator.",
      "We may add, change, or remove features over time. Where a change materially reduces the service, we will give reasonable notice before it takes effect.",
    ],
  },
  {
    title: "3. Your responsibility for access decisions",
    body: [
      "Cortex is the place your organisation expresses who may reach what. The roles, policies, and grants your administrators configure here are your decisions, and you are responsible for them — including reviewing them periodically and removing access when a member leaves the organisation.",
      "We do not set your access policy, and activating Cortex does not make your organisation compliant with any framework on its own.",
    ],
  },
  {
    title: "4. Credentials and secrets",
    body: [
      "API keys, secrets, and service account credentials stored in Cortex are sensitive by definition. Your organisation is responsible for scoping them narrowly, rotating them, and revoking them when they are no longer needed.",
      "You must tell us promptly if you believe a credential held in Cortex has been exposed.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "You agree not to use Cortex to attempt to gain unauthorised access to the service or to another organisation's data, to store credentials you are not entitled to hold, or to interfere with the normal operation of the service.",
      "You are responsible for ensuring your use of Cortex complies with the laws, regulations, and contractual obligations that apply to your organisation.",
    ],
  },
  {
    title: "6. Your content",
    body: [
      "Your organisation retains ownership of the policies, records, and configuration it creates through Cortex. You grant us the limited rights needed to host, transmit, back up, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "7. Data and privacy",
    body: [
      "Personal data processed through Cortex — the people your access records describe — is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for that content.",
      "Audit and access records are retained for as long as the service is active for your organisation, subject to any retention settings you configure.",
    ],
  },
  {
    title: "8. Availability and support",
    body: [
      "We aim to keep Cortex available at all times, but the service is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "9. Suspension and termination",
    body: [
      "You may deactivate Cortex for your organisation at any time from the orchestrator. Deactivating switches the service off — it does not delete your policies or audit history, and reactivating brings the same account back. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Your organisation may export its records before deactivation; after the retention period, content may be permanently deleted.",
    ],
  },
  {
    title: "10. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use of Cortex after that point means the updated terms apply.",
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
function CortexTermsContent() {
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

export default CortexTermsContent;
