import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** sharp-healthcare's motif: a dashed grid — drawn, but not built yet. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(to right, currentColor 0 6px, transparent 6px 14px), repeating-linear-gradient(to bottom, currentColor 0 6px, transparent 6px 14px)"}
      size={"48px 48px"}
      opacity={0.05}
      className={className}
    />
  );
}

/**
 * Drawn in two weights on purpose: the app in the centre is dashed because it
 * does not exist yet, and everything it will connect to is solid because it
 * does. The honest version of a coming-soon graphic.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="sharp-healthcare, still in development, and the four running apps it will connect to"
      viewBox="-6 -6 452 312"
      caption="Dashed is what is being built. Solid is what is already running today."
    >
      <DArrowDefs id="hc-arw" />

      <DNode
        x={126}
        y={118}
        w={188}
        h={60}
        label="sharp-healthcare"
        sub="in development"
        dashed
      />

      <g markerEnd="url(#hc-arw)" strokeDasharray="4 4">
        <DrawPath d="M180 118 C 150 82, 122 64, 98 56" className="stroke-current opacity-30" delay={0.12} dashed />
        <DrawPath d="M260 118 C 290 82, 318 64, 342 56" className="stroke-current opacity-30" delay={0.2} dashed />
        <DrawPath d="M180 178 C 150 214, 122 232, 98 240" className="stroke-current opacity-30" delay={0.28} dashed />
        <DrawPath d="M260 178 C 290 214, 318 232, 342 240" className="stroke-current opacity-30" delay={0.36} dashed />
      </g>

      <DNode x={0} y={10} w={148} h={48} label="Stockwave" sub="running today" />
      <DNode x={292} y={10} w={148} h={48} label="sharp-accounting" sub="running today" />
      <DNode x={0} y={236} w={148} h={48} label="sharp-crm" sub="running today" />
      <DNode x={292} y={236} w={148} h={48} label="Cables" sub="running today" />

      <DLabel x={220} y={204}>
        planned connections
      </DLabel>
    </Diagram>
  );
}
