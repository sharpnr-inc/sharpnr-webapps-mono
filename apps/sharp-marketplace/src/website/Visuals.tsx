import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** Marketplace's motif: two hatches leaning toward each other — an exchange. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 24px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 24px)"}
      opacity={0.05}
      className={className}
    />
  );
}

/**
 * The argument, drawn: the deal is the small part. What follows it is three
 * apps' worth of work, and the drawing exists to show that none of it is
 * anybody's data entry.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="A negotiation between two organizations, and the entries a confirmed deal produces"
      viewBox="-6 -6 452 312"
      caption="The conversation and the transaction are not in two places, and the aftermath is not typed in."
    >
      <DArrowDefs id="mkt-arw" />

      <DNode x={0} y={10} w={160} h={50} label="Your organization" />
      <DNode x={280} y={10} w={160} h={50} label="Theirs" />

      {/* The negotiation: one conversation, running both ways. */}
      <DrawPath d="M166 28 L 274 28" className="stroke-current opacity-45" delay={0.1} markerEnd="url(#mkt-arw)" />
      <DrawPath d="M274 44 L 166 44" className="stroke-current opacity-45" delay={0.18} markerEnd="url(#mkt-arw)" />
      <DLabel x={220} y={76}>
        negotiated in Cables
      </DLabel>

      <DrawPath d="M220 88 L 220 118" className="stroke-primary" delay={0.32} markerEnd="url(#mkt-arw)" />

      <DNode x={132} y={122} w={176} h={50} label="Confirmed" sub="one deal" accent />

      <g markerEnd="url(#mkt-arw)">
        <DrawPath d="M180 176 C 150 200, 110 206, 84 214" className="stroke-current opacity-40" delay={0.46} />
        <DrawPath d="M220 176 L 220 214" className="stroke-current opacity-40" delay={0.52} />
        <DrawPath d="M260 176 C 290 200, 330 206, 356 214" className="stroke-current opacity-40" delay={0.58} />
      </g>

      <DNode x={0} y={218} w={132} h={52} label="The entry" sub="sharp-accounting" />
      <DNode x={154} y={218} w={132} h={52} label="The order" sub="Stockwave" />
      <DNode x={308} y={218} w={132} h={52} label="The customer" sub="sharp-crm" />

      <DLabel x={220} y={292}>
        none of this is re-entered
      </DLabel>
    </Diagram>
  );
}
