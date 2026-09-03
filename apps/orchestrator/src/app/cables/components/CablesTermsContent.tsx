const LAST_UPDATED = "3 September 2025";

const SECTIONS = [
  {
    title: "1. Acceptance of these terms",
    body: [
      "These terms govern your organisation's use of Cables, the communication service provided as part of Sharp Orchestrator. By activating Cables, the person doing so confirms they are authorised to accept these terms on behalf of the organisation, and the organisation agrees to be bound by them.",
      "If you do not agree to these terms, do not activate the service.",
    ],
  },
  {
    title: "2. The service",
    body: [
      "Cables provides organisation-scoped messaging, channels, voice and video calling, meetings, and a member directory. The service is available only to members of your organisation and operates within your organisation's context inside the orchestrator.",
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
    title: "4. Acceptable use",
    body: [
      "You agree not to use Cables to send unlawful, harassing, defamatory, or infringing content; to distribute malware; to attempt to gain unauthorised access to the service or to another organisation's data; or to interfere with the normal operation of the service.",
      "You are responsible for ensuring your use of Cables complies with the laws and regulations that apply to your organisation, including any rules on recording, retaining, or monitoring communications.",
    ],
  },
  {
    title: "5. Your content",
    body: [
      "Your organisation retains ownership of the messages, files, and recordings it creates through Cables. You grant us the limited rights needed to host, transmit, back up, and display that content in order to operate the service.",
      "We do not use your content to advertise to you, and we do not sell it.",
    ],
  },
  {
    title: "6. Data and privacy",
    body: [
      "Personal data processed through Cables is handled in line with our privacy policy and any data processing agreement in place with your organisation. We act as a processor for the content your members send through the service.",
      "Content is retained for as long as the service is active for your organisation, subject to any retention settings you configure.",
    ],
  },
  {
    title: "7. Availability and support",
    body: [
      "We aim to keep Cables available at all times, but the service is provided without a guarantee of uninterrupted availability unless a separate service level agreement applies to your organisation.",
      "Planned maintenance will be scheduled to minimise disruption, and we will give notice where it is likely to be noticeable.",
    ],
  },
  {
    title: "8. Suspension and termination",
    body: [
      "You may deactivate Cables for your organisation at any time from the orchestrator. We may suspend or terminate access where these terms are breached, where required by law, or where continued use presents a security risk.",
      "On termination, access to the service ends. Your organisation may export its content before deactivation; after the retention period, content may be permanently deleted.",
    ],
  },
  {
    title: "9. Changes to these terms",
    body: [
      "We may update these terms from time to time. Where a change is material, we will notify organisation administrators before it takes effect. Continued use of Cables after that point means the updated terms apply.",
    ],
  },
  {
    title: "10. Contact",
    body: [
      "Questions about these terms can be sent to your organisation's administrator, or to Sharp Orchestrator support.",
    ],
  },
];

/** Modal body only — the title and footer come from the modal that opens it. */
function CablesTermsContent() {
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

export default CablesTermsContent;
