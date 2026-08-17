/*
 * The operational figure — the shape of an industry, not a list of its
 * parts.
 *
 * This component is now a dispatcher. It owns the things every sector
 * shares — the kicker, the capability band, the stacked rendering for
 * small screens — and hands the drawing itself to whichever topology
 * belongs to that industry (`./topologies`). That split is the point: the
 * shared parts keep the run reading as one system, and the drawing is
 * free to be genuinely different.
 *
 * The band is ordinary HTML rather than more SVG. Its argument is one
 * unbroken rule with the capabilities sitting on it, and a rule is a
 * border — drawing it in SVG would only have made the names harder to
 * wrap and harder to select.
 *
 * Below md every topology is replaced by an ordinary list. An 800-unit
 * figure at 375px is illegible rather than small, and the stage names are
 * a search surface that must stay real text at every width. Both carry the
 * same `flow-*` hooks so one timeline drives whichever CSS has laid out.
 */
import { useId } from "react";
import {
  AscentFigure,
  ChainFigure,
  ConvergeFigure,
  CycleFigure,
  NestedFigure,
  ParallelFigure,
  ReverseFigure,
  SpineFigure,
} from "./topologies";
import { TOPOLOGY, type Topology } from "./topology-map";

export interface FlowDiagramProps {
  /** Industry id — decides the topology. */
  id: string;
  kicker: string;
  stages: readonly string[];
  capKicker: string;
  capabilities: readonly string[];
  /** Sentence for assistive technology — the figure's argument in words. */
  label: string;
}

/* How the stacked list should read. A numbered list is right for a chain
   and wrong for a cycle, which has no first step, and wrong for a spine,
   whose stages are episodes rather than a countdown. */
const STACK_NOTE: Record<Topology, string | null> = {
  chain: null,
  spine: "Every episode returns to the same patient record.",
  cycle: "…and back to the supplier. The loop does not end.",
  reverse: "And a return path running the other way.",
  converge: "Many inputs in, one batch through, many orders out.",
  ascent: "Each stage leaves a student a level higher than the last.",
  parallel: "Several engagements at once, over the same team.",
  nested: "Not a sequence — units, teams and one identity layer.",
};

const FIGURES: Record<Topology, typeof ChainFigure> = {
  chain: ChainFigure,
  spine: SpineFigure,
  cycle: CycleFigure,
  reverse: ReverseFigure,
  converge: ConvergeFigure,
  ascent: AscentFigure,
  parallel: ParallelFigure,
  nested: NestedFigure,
};

export function FlowDiagram({
  id,
  kicker,
  stages,
  capKicker,
  capabilities,
  label,
}: FlowDiagramProps) {
  /* One filter per instance. Seven copies of a figure share a page, and
     seven <filter id="flowCharge"> would all resolve to the first. React's
     id carries colons, which are legal in an id but hostile in a URL
     fragment, so they come out. */
  const chargeFilter = `flowCharge${useId().replace(/:/g, "")}`;
  const topology = TOPOLOGY[id] ?? "chain";
  const note = STACK_NOTE[topology];

  const Figure = FIGURES[topology];

  return (
    <figure className="m-0">
      <figcaption className="font-mono text-[0.625rem] uppercase tracking-[0.28em] text-cyan/55">
        {kicker}
      </figcaption>

      {/* Exactly one accessible copy at any width. The drawing is
          `aria-hidden` inside a container that carries the description, and
          the stacked list below is `display:none` at md and up — so a
          screen reader gets the sentence here on a desktop and the real
          list on a phone, never both and never neither. */}
      <div className="mt-4 hidden md:block" role="img" aria-label={label}>
        <Figure stages={stages} chargeFilter={chargeFilter} />
      </div>

      {/* The same names, as ordinary markup. This is the copy assistive
          technology reads — the drawing above is `aria-hidden`. */}
      <div className="mt-4 md:hidden">
        <p className="sr-only">{label}</p>
        <ol className="space-y-2">
          {stages.map((stage, i) => (
            <li
              key={stage}
              className="flow-node flex items-center gap-3 border border-sky/15 px-3 py-2"
            >
              <span className="font-mono text-[0.625rem] tracking-widest text-cyan/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-white/85">
                {stage}
              </span>
            </li>
          ))}
        </ol>
        {note && (
          <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-cyan/45">
            {note}
          </p>
        )}
      </div>

      {/* What the stages are made of. One rule, everything on it — five
          separate boxes would say the opposite. */}
      <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.28em] text-cyan/50">
        {capKicker}
      </p>
      <div className="flow-band-line mt-3 h-px w-full bg-cyan/35" />
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
        {capabilities.map((cap) => (
          <li
            key={cap}
            className="flow-cap font-mono text-[0.6875rem] tracking-[0.04em] text-white/60"
          >
            {cap}
          </li>
        ))}
      </ul>
    </figure>
  );
}
