import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/**
 * Silo's motif: the fixed -14° shear from the identity pack, repeated as a
 * band field. The same geometry as the mark, at a scale that reads as texture.
 */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(104deg, currentColor 0 1px, transparent 1px 22px)"}
      opacity={0.07}
      className={className}
    />
  );
}

/**
 * The argument, drawn: one authorization decision above four different shapes
 * of storage. The arrangement it replaces is four vendors each with their own
 * permission model -- which is this drawing, four times, side by side.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="One access decision governing a drive, object storage, databases and a data lake"
      viewBox="-6 -6 452 312"
      caption="Four shapes, one permission model — decided in Cortex or Orchestrator, not four times over."
    >
      <DArrowDefs id="silo-arw" />

      <DNode
        x={104}
        y={8}
        w={232}
        h={48}
        label="Access decided once"
        sub="Cortex or Orchestrator"
        accent
      />

      <g markerEnd="url(#silo-arw)">
        <DrawPath d="M178 58 L 66 116" className="stroke-current opacity-40" delay={0.1} />
        <DrawPath d="M202 58 L 172 116" className="stroke-current opacity-40" delay={0.18} />
        <DrawPath d="M238 58 L 276 116" className="stroke-current opacity-40" delay={0.26} />
        <DrawPath d="M262 58 L 382 116" className="stroke-current opacity-40" delay={0.34} />
      </g>

      <DNode x={0} y={122} w={104} h={54} label="Drive" sub="folders" />
      <DNode x={116} y={122} w={104} h={54} label="Objects" sub="S3-compatible" />
      <DNode x={232} y={122} w={104} h={54} label="Postgres" sub="provisioned" />
      <DNode x={336} y={122} w={104} h={54} label="Lake" sub="datasets" />

      {/* One account under all four, which is the part four vendors cannot do. */}
      <DrawPath
        d="M8 210 L 432 210"
        className="stroke-current opacity-25"
        delay={0.5}
        dashed
      />
      <DLabel x={220} y={230}>
        one account · one audit trail
      </DLabel>

      <DNode
        x={90}
        y={246}
        w={260}
        h={48}
        label="Your own applications"
        sub="connect directly, from outside the platform"
      />
    </Diagram>
  );
}
