import { Band, Panel, SectionLabel, SectionTitle } from "./brand";
import { faqs } from "./faq-data";

/**
 * Comparison + FAQ.
 *
 * Claims about Silo are marked with the roadmap phase that delivers them —
 * nothing here should read as shipped when it is not. Claims about other
 * approaches are kept at category level (things true of the category as a
 * whole) rather than vendor-specific feature assertions that go stale.
 *
 * The Q&A content lives in ./faq-data so the prerender step can emit matching
 * FAQPage JSON-LD from the same source.
 */

type Cell = {
  /** yes = delivered or committed · part = partial/conditional · no = absent */
  kind: "yes" | "part" | "no";
  text: string;
};

const approaches = [
  { key: "silo", name: "Silo Engine", note: "Self-hosted, one Rust service" },
  { key: "cloud", name: "Hyperscaler", note: "e.g. S3 + managed Postgres" },
  { key: "platform", name: "Backend platform", note: "e.g. Supabase-style" },
  { key: "diy", name: "Self-assembled", note: "e.g. MinIO + Postgres + glue" },
];

const rows: { capability: string; cells: Cell[] }[] = [
  {
    capability: "Where the bytes live",
    cells: [
      { kind: "yes", text: "Your hardware" },
      { kind: "no", text: "Vendor region" },
      { kind: "part", text: "Vendor or self-host" },
      { kind: "yes", text: "Your hardware" },
    ],
  },
  {
    capability: "Object storage + CDN delivery",
    cells: [
      { kind: "yes", text: "Phase 2–3" },
      { kind: "yes", text: "Mature" },
      { kind: "yes", text: "Included" },
      { kind: "part", text: "Assemble yourself" },
    ],
  },
  {
    capability: "PostgreSQL provisioned via API",
    cells: [
      { kind: "yes", text: "Phase 4" },
      { kind: "yes", text: "Mature" },
      { kind: "yes", text: "Included" },
      { kind: "no", text: "Manual" },
    ],
  },
  {
    capability: "Controlled explorer, no raw SQL",
    cells: [
      { kind: "yes", text: "Phase 4, by design" },
      { kind: "no", text: "Not the model" },
      { kind: "part", text: "Raw SQL editor" },
      { kind: "no", text: "Bring your own client" },
    ],
  },
  {
    capability: "Org + per-employee storage quotas",
    cells: [
      { kind: "yes", text: "Phase 2, first-class" },
      { kind: "part", text: "Bucket policy, not per-person" },
      { kind: "no", text: "Not modelled" },
      { kind: "no", text: "Build it" },
    ],
  },
  {
    capability: "Data lake + warehouse on same storage",
    cells: [
      { kind: "part", text: "Phase 5–6" },
      { kind: "part", text: "Separate products" },
      { kind: "no", text: "Out of scope" },
      { kind: "no", text: "Build it" },
    ],
  },
  {
    capability: "One audit trail across storage + DB",
    cells: [
      { kind: "yes", text: "Phase 3" },
      { kind: "part", text: "Split per service" },
      { kind: "part", text: "Partial" },
      { kind: "no", text: "Build it" },
    ],
  },
  {
    capability: "Egress billing",
    cells: [
      { kind: "yes", text: "None — your network" },
      { kind: "no", text: "Metered" },
      { kind: "part", text: "Metered when hosted" },
      { kind: "yes", text: "None" },
    ],
  },
  {
    capability: "Kubernetes required",
    cells: [
      { kind: "yes", text: "No — systemd + Nginx" },
      { kind: "yes", text: "N/A, vendor-run" },
      { kind: "yes", text: "No" },
      { kind: "part", text: "Often, at scale" },
    ],
  },
  {
    capability: "Who carries the operational load",
    cells: [
      { kind: "part", text: "You run one binary" },
      { kind: "yes", text: "Vendor" },
      { kind: "part", text: "Vendor or you" },
      { kind: "no", text: "You run every part" },
    ],
  },
];

const toneFor = (kind: Cell["kind"]) =>
  kind === "yes"
    ? "text-chalk"
    : kind === "part"
      ? "text-chalk-muted"
      : "text-chalk-dim";

const markFor = (kind: Cell["kind"]) =>
  kind === "yes"
    ? "bg-accent-dark"
    : kind === "part"
      ? "bg-chalk-dim"
      : "bg-chalk-faint";

const guidance = [
  {
    title: "Choose Silo when",
    accent: true,
    points: [
      "You already own the hardware and want the storage bill to stop being a line item.",
      "Quotas need to exist per organization and per employee, not per bucket.",
      "One audit trail should cover file access and database changes together.",
      "Business applications should provision infrastructure, not reimplement it.",
    ],
  },
  {
    title: "Choose a hyperscaler when",
    accent: false,
    points: [
      "You need multi-region replication and elastic burst capacity today.",
      "There is no hardware and no team to operate it.",
      "Compliance requires certifications a self-hosted deployment cannot inherit.",
    ],
  },
  {
    title: "Be honest: not yet Silo when",
    accent: false,
    points: [
      "You need a production data lake or warehouse this quarter — those are Phase 5 and 6.",
      "You want an arbitrary SQL workspace on day one; v1 is deliberately a controlled explorer.",
      "You only need one piece, and a single component you already run would do.",
    ],
  },
];

export function Comparison() {
  return (
    <section id="compare" className="border-b border-rule px-6 py-24">
      <div className="mx-auto max-w-screen-xl">
        <SectionLabel>Comparison</SectionLabel>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle>
            Where Silo fits —
            <br />
            and where it doesn't.
          </SectionTitle>
          <p className="max-w-sm text-sm leading-relaxed text-chalk-muted">
            Silo is not trying to out-scale a hyperscaler. It is trying to make
            the infrastructure an organization already owns behave like a
            product. Phases mark what is built versus committed.
          </p>
        </div>

        {/* Table — scrolls horizontally on narrow screens rather than
            forcing the page to scroll. */}
        <div className="mt-14 overflow-x-auto border border-rule">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <caption className="sr-only">
              Comparison of Silo Engine against hyperscaler, backend platform,
              and self-assembled approaches to storage and database
              infrastructure
            </caption>
            <thead>
              <tr className="bg-ink-high">
                <th
                  scope="col"
                  className="border-b border-rule px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-chalk-dim"
                >
                  Capability
                </th>
                {approaches.map((a) => (
                  <th
                    key={a.key}
                    scope="col"
                    className="border-b border-l border-rule px-5 py-4 align-top"
                  >
                    <span className="flex items-center gap-2.5">
                      <Band
                        w={12}
                        h={3}
                        className={
                          a.key === "silo" ? "bg-accent-dark" : "bg-chalk-faint"
                        }
                      />
                      <span
                        className={`brand-title text-[15px] ${
                          a.key === "silo" ? "text-chalk" : "text-chalk-muted"
                        }`}
                      >
                        {a.name}
                      </span>
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] font-normal tracking-wide text-chalk-dim">
                      {a.note}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.capability} className="align-top">
                  <th
                    scope="row"
                    className="border-b border-rule px-5 py-4 text-[13px] font-normal text-chalk-muted"
                  >
                    {row.capability}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={approaches[i].key}
                      className={`border-b border-l border-rule px-5 py-4 text-[13px] ${
                        approaches[i].key === "silo" ? "bg-ink-raised" : ""
                      }`}
                    >
                      <span className="flex items-start gap-2.5">
                        <Band
                          w={8}
                          h={2}
                          className={`mt-[7px] ${markFor(cell.kind)}`}
                        />
                        <span className={toneFor(cell.kind)}>{cell.text}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-mono text-[10px] tracking-wide text-chalk-dim">
          Phase labels refer to the Silo roadmap. Other columns describe
          categories of approach, not specific vendor SKUs.
        </p>

        {/* Guidance cards */}
        <div className="mt-14 grid grid-cols-1 gap-px border border-rule bg-rule lg:grid-cols-3">
          {guidance.map((g) => (
            <div
              key={g.title}
              className={g.accent ? "bg-ink-raised p-8" : "bg-ink p-8"}
            >
              <div className="mb-5 flex items-center gap-3">
                <Band
                  w={16}
                  h={4}
                  className={g.accent ? "bg-accent-dark" : "bg-chalk-faint"}
                />
                <h3 className="brand-title text-[15px] text-chalk">
                  {g.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {g.points.map((p) => (
                  <li
                    key={p}
                    className="text-[13px] leading-relaxed text-chalk-muted"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-b border-rule bg-ink-raised px-6 py-24">
      <div className="mx-auto max-w-screen-xl">
        <SectionLabel>Questions</SectionLabel>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionTitle>
              Frequently
              <br />
              asked.
            </SectionTitle>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-chalk-muted">
              Answers are drawn from the Silo Engine architecture document. If
              something here is out of date, the document is the source of
              truth.
            </p>
            <div className="mt-8">
              <Panel title="Machine-readable" meta="for AI crawlers">
                <div className="p-5 font-mono text-[12px]">
                  {[
                    ["/llms.txt", "Concise index"],
                    ["/llms-full.txt", "Full architecture"],
                    ["/sitemap.xml", "URL set"],
                  ].map(([path, note]) => (
                    <div
                      key={path}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule-soft py-2.5 last:border-0"
                    >
                      <a
                        href={path}
                        className="text-accent-hi transition-colors hover:text-chalk"
                      >
                        {path}
                      </a>
                      <span className="text-[11px] text-chalk-dim">{note}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          <div className="border-t border-rule">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group border-b border-rule"
                // First entry open so the section never reads as empty,
                // and so the answer text is present for crawlers.
                open={item === faqs[0]}
              >
                <summary className="flex cursor-pointer list-none items-start gap-4 py-5 marker:content-none">
                  <Band
                    w={12}
                    h={3}
                    className="mt-[9px] bg-chalk-faint transition-colors group-open:bg-accent-dark"
                  />
                  <h3 className="brand-title flex-1 text-[15px] leading-snug text-chalk">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-1 font-mono text-[13px] text-chalk-dim transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pl-8 pr-8 text-[13px] leading-relaxed text-chalk-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
