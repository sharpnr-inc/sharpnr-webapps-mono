import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** Folio's motif: ruled paper, at a writing measure. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 30px)"}
      opacity={0.07}
      className={className}
    />
  );
}

/**
 * The argument, drawn: a mention inside a document is a live edge to an object
 * in Silo, and that same edge is what grants the reader access. A standalone
 * editor can draw the page but neither of the two arrows leaving it.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="A document mentioning a Silo object, which grants a collaborator access to it"
      viewBox="-6 -6 452 312"
      caption="Mentioning the file is the same action as sharing it — no second permission request."
    >
      <DArrowDefs id="folio-arw" />

      <rect
        x="0"
        y="12"
        width="228"
        height="148"
        rx="8"
        className="fill-transparent stroke-current opacity-25"
        strokeWidth={1.5}
      />
      <g className="stroke-current opacity-20" strokeWidth="4" strokeLinecap="round">
        <path d="M20 46 L 176 46" />
        <path d="M20 64 L 206 64" />
        <path d="M20 106 L 148 106" />
        <path d="M20 124 L 192 124" />
      </g>
      <DLabel x={20} y={32} anchor="start">
        a document
      </DLabel>

      {/* The mention, sitting in the run of text as a live reference. */}
      <rect
        x="20"
        y="76"
        width="122"
        height="18"
        rx="4"
        className="fill-primary/15 stroke-primary"
        strokeWidth={1.25}
      />
      <text x="30" y="89" className="fill-primary text-[10px] font-semibold">
        @quarterly-data
      </text>

      <g markerEnd="url(#folio-arw)">
        <DrawPath
          d="M144 84 C 210 84, 232 96, 292 104"
          className="stroke-primary"
          delay={0.15}
        />
        <DrawPath
          d="M144 94 C 206 132, 214 214, 292 226"
          className="stroke-primary"
          delay={0.32}
        />
      </g>

      <DLabel x={236} y={80}>
        references
      </DLabel>
      <DLabel x={214} y={198}>
        grants access
      </DLabel>

      <DNode x={292} y={80} w={148} h={50} label="The object" sub="Silo" accent />
      <DNode x={292} y={202} w={148} h={50} label="Your collaborator" sub="can open it" />

      {/* The channel the file carries, hanging off the document. */}
      <DrawPath
        d="M114 160 L 114 200"
        className="stroke-current opacity-30"
        delay={0.5}
        dashed
      />
      <DNode x={40} y={202} w={148} h={50} label="Its channel" sub="Cables" />
    </Diagram>
  );
}
