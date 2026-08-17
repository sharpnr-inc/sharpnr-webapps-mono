import { useRef } from "react";
import { Words } from "@/app/home/shared/Words";
import { COLUMNS, ROWS, VERDICT } from "./records";
import { useChaosAnimation } from "./animations/useChaosAnimation";

/*
 * The problem.
 *
 * One customer, held five times by five systems that have never spoken to
 * each other. The name is spelled four ways, every system minted its own
 * customer id, and two never captured one at all.
 *
 * One table, not five cards. Bordered blocks with headers read as support
 * tickets and ran past the bottom of the section; a ledger is both the
 * truer form and a third of the height. Comparison is the entire point,
 * and in a table the disagreements stack into a column where the eye finds
 * them at a glance.
 *
 * This replaced a severed-circuit diagram. The diagram argued that the
 * tools aren't connected; this shows what that costs. Nobody has ever been
 * annoyed by an architecture diagram. Everybody has retyped a customer's
 * phone number into a second system.
 *
 * Visual-left, argument-right. Mobile always shows the argument first.
 */
export function ChaosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useChaosAnimation({ sectionRef, headingRef, copyRef, fieldRef });

  return (
    <section
      ref={sectionRef}
      className="hp-section hp-sec hp-flex-section relative flex min-h-svh items-center overflow-x-clip px-6 md:px-10"
    >
      {/* The ledger gets the wider column — five columns of mono need the
          room, and the argument opposite is three lines long. */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <div ref={fieldRef} className="order-2 w-full lg:order-1">
          {/* Below sm this drops to three columns rather than scrolling —
              see index.css. A hidden scrollbar made two columns both
              unreachable and undiscoverable on a phone. */}
          <div className="hp-ledger-scroll">
            <table className="hp-ledger">
              {/* Explicit, unequal column widths — Reference narrowest,
                  Identity widest — so the table doesn't rule up into a
                  perfectly machined block. */}
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">Source</th>
                  {COLUMNS.map((c) => (
                    <th key={c} scope="col" data-col={c}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.system}
                    className="hp-ledger-row"
                    /* Drives a slightly different rule length per row, so
                       the block doesn't read as machine-generated. */
                    data-rule={i % 5}
                  >
                    <th scope="row">
                      <span className="hp-ledger-sys">{r.system}</span>
                      <span className="hp-ledger-doc">{r.doc}</span>
                    </th>
                    {r.cells.map((c, i) => (
                      <td
                        key={COLUMNS[i]}
                        data-col={COLUMNS[i]}
                        className="hp-ledger-val"
                        data-off={c.off ? "true" : undefined}
                        data-missing={c.missing ? "true" : undefined}
                      >
                        {c.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="hp-rec-verdict">{VERDICT}</p>
        </div>

        {/* The argument — first in the markup, right column on desktop */}
        <div className="order-1 lg:order-2 lg:ml-auto lg:max-w-xl">
          <h2
            ref={headingRef}
            className="hp-scene-title font-extrabold text-white"
          >
            <span className="block">
              <Words text="Business shouldn't," />
            </span>
            <span className="block text-twilight">
              <Words text="Feel fragmented." />
            </span>
          </h2>

          <p ref={copyRef} className="hp-hero-copy mt-6 text-mute">
            Every tool works. None of them talk. So your staff retype the same
            customer into each one.
          </p>
        </div>
      </div>
    </section>
  );
}
