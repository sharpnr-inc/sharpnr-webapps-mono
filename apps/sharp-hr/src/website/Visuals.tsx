import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** sharp-hr's motif: widely spaced rules, like a personnel file. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 52px)"}
      opacity={0.07}
      className={className}
    />
  );
}

/**
 * The argument, drawn: one employee record with four apps reading it. The
 * arrangement it replaces is the same four apps around four copies, joined by
 * an import, an identity integration and a payroll export -- which is where
 * the cost of an HR system actually goes.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="One employee record, read by HR, the employee portal, the books and operations"
      viewBox="-6 -6 452 312"
      caption="No import, no directory sync, no payroll export. Everything here is reading one record."
    >
      <DArrowDefs id="hr-arw" />

      <DNode
        x={126}
        y={116}
        w={188}
        h={62}
        label="One employee"
        sub="defined in Orchestrator"
        accent
      />

      <g markerEnd="url(#hr-arw)">
        <DrawPath d="M180 116 C 150 80, 120 62, 96 54" className="stroke-current opacity-40" delay={0.12} />
        <DrawPath d="M260 116 C 290 80, 320 62, 344 54" className="stroke-current opacity-40" delay={0.2} />
        <DrawPath d="M180 178 C 150 214, 120 232, 96 240" className="stroke-current opacity-40" delay={0.28} />
        <DrawPath d="M260 178 C 290 214, 320 232, 344 240" className="stroke-current opacity-40" delay={0.36} />
      </g>

      <DNode x={0} y={10} w={148} h={48} label="Payroll" sub="sharp-hr" />
      <DNode x={292} y={10} w={148} h={48} label="Their portal" sub="sharp-iam" />
      <DNode x={0} y={236} w={148} h={48} label="The books" sub="sharp-accounting" />
      <DNode x={292} y={236} w={148} h={48} label="Operations" sub="the work itself" />

      <DLabel x={220} y={202}>
        one record, four readers
      </DLabel>
    </Diagram>
  );
}
