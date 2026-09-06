import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** sharp-iam's motif: a soft dot field — the portal's quiet ground. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"radial-gradient(circle at center, currentColor 1px, transparent 1.2px)"}
      size={"26px 26px"}
      opacity={0.08}
      className={className}
    />
  );
}

/**
 * The argument, drawn: a project is not a list of tasks in a tool that knows
 * nothing else about the organization. It is one record with the tracker, the
 * conversation and the files all hanging off it.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="One project record carrying its tracker, its channel and its documents"
      viewBox="-6 -6 452 312"
      caption="The work, the conversation about the work, and the files are one record — not three tools."
    >
      <DArrowDefs id="iam-arw" />

      <DNode x={132} y={8} w={176} h={54} label="A project" sub="sharp-iam" accent />

      <g markerEnd="url(#iam-arw)">
        <DrawPath d="M180 66 C 140 96, 96 104, 74 118" className="stroke-current opacity-40" delay={0.12} />
        <DrawPath d="M220 66 L 220 118" className="stroke-current opacity-40" delay={0.2} />
        <DrawPath d="M260 66 C 300 96, 344 104, 366 118" className="stroke-current opacity-40" delay={0.28} />
      </g>

      <DNode x={0} y={122} w={148} h={52} label="Its tracker" sub="built in" />
      <DNode x={146} y={122} w={148} h={52} label="Its channel" sub="Cables" />
      <DNode x={292} y={122} w={148} h={52} label="Its documents" sub="Silo" />

      <DrawPath
        d="M8 206 L 432 206"
        className="stroke-current opacity-25"
        delay={0.46}
        dashed
      />
      <DLabel x={220} y={226}>
        and the rest of what you need from the company
      </DLabel>

      <DNode x={0} y={238} w={104} h={44} label="Leave" />
      <DNode x={112} y={238} w={104} h={44} label="Claims" />
      <DNode x={224} y={238} w={104} h={44} label="Payslips" />
      <DNode x={336} y={238} w={104} h={44} label="Training" />
    </Diagram>
  );
}
