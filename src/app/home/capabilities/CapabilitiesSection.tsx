import { Fragment, useRef } from "react";
import { Contact, Calculator, FileSpreadsheet } from "lucide-react";
import { Words } from "@/app/home/shared/Words";
import { useCapabilitiesAnimation } from "./animations/useCapabilitiesAnimation";

/*
 * The infrastructure, shown working.
 *
 * A real example, not a diagram of the whole platform — and a generic one,
 * true of any business rather than one industry: a deal closes, the ledger
 * updates itself, the books stay current. One event travelling left to
 * right through the products that actually handle it.
 *
 * Full-width: the one scene that breaks the alternating L/R rhythm on
 * purpose, the same way it has broken the rhythm at every stage of this
 * scene's own history.
 */
interface FlowNode {
  title: string;
  icon?: typeof Contact;
  tags?: string[];
}

const NODES: FlowNode[] = [
  { title: "Sharp-CRM", icon: Contact, tags: ["LEADS", "DEALS", "PIPELINE"] },
  { title: "Sharp-Accounting", icon: Calculator, tags: ["GENERAL LEDGER", "AP", "AR"] },
  { title: "Financial Statements", icon: FileSpreadsheet },
];

const BADGES = ["Sale", "Entry"];

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useCapabilitiesAnimation({ sectionRef, headingRef, copyRef, flowRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec relative overflow-hidden px-6 text-center md:px-10"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          ref={headingRef}
          className="hp-scene-title font-extrabold text-white"
        >
          <span className="block">
            <Words text="Everything connects," />
          </span>
          <span className="block text-twilight">
            <Words text="Automatically." />
          </span>
        </h2>
        <p ref={copyRef} className="hp-hero-copy mx-auto mt-6 max-w-lg text-mute">
          A deal closes. The books are already current.
        </p>
      </div>

      <div className="mt-14 md:mt-16">
        <div
          ref={flowRef}
          className="hp-flow mx-auto max-w-3xl items-center"
          style={{ "--flow-cols": NODES.map(() => "minmax(0, 1fr)").join(" 40px ") } as React.CSSProperties}
          aria-hidden="true"
        >
          {NODES.map((node, i) => (
            <Fragment key={node.title}>
              <div data-node={node.title} className="hp-flow-node p-5 text-left">
                {node.icon && (
                  <span className="hp-flow-icon">
                    <node.icon className="size-4.5" strokeWidth={1.75} />
                  </span>
                )}
                <h3 className="mt-3 text-[0.9375rem] font-semibold tracking-tight text-white">
                  {node.title}
                </h3>
                {node.tags ? (
                  <p className="hp-flow-tag mt-2">{node.tags.join(" · ")}</p>
                ) : (
                  <div className="mt-3 flex flex-col gap-1.5">
                    <span className="hp-flow-skel w-full" />
                    <span className="hp-flow-skel w-3/4" />
                    <span className="hp-flow-skel w-1/2" />
                  </div>
                )}
              </div>
              {i < NODES.length - 1 && (
                <div className="hp-flow-connector">
                  <span className="hp-flow-badge" data-badge={BADGES[i]}>
                    {BADGES[i]}
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <span className="sr-only">
        {NODES.map((n) => n.title).join(" → ")}
      </span>
    </section>
  );
}
