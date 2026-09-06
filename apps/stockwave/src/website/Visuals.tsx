import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** Stockwave's motif: a rhythm of vertical bars, like stock on a shelf. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 26px)"}
      opacity={0.07}
      className={className}
    />
  );
}

/**
 * The argument, drawn: four apps writing to one count, and the count writing
 * back to the books. What makes it hold is that there is no arrow labelled
 * "sync" anywhere in it -- the writes land on the same record.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="Four apps writing to one inventory record, which posts back to the books"
      viewBox="-6 -6 452 312"
      caption="No arrow here is labelled sync. Every writer is holding the same record."
    >
      <DArrowDefs id="stock-arw" />

      <DNode x={0} y={8} w={196} h={42} label="An invoice" sub="sharp-accounting" />
      <DNode x={0} y={62} w={196} h={42} label="A purchase" sub="sharp-accounting" />
      <DNode x={0} y={116} w={196} h={42} label="An order" sub="sharp-marketplace" />
      <DNode x={0} y={170} w={196} h={42} label="A service" sub="sharp-hospitality" />

      <g markerEnd="url(#stock-arw)">
        <DrawPath d="M200 29 C 250 29, 258 96, 296 108" className="stroke-current opacity-40" delay={0.1} />
        <DrawPath d="M200 83 C 250 83, 258 104, 296 114" className="stroke-current opacity-40" delay={0.18} />
        <DrawPath d="M200 137 C 250 137, 258 130, 296 126" className="stroke-current opacity-40" delay={0.26} />
        <DrawPath d="M200 191 C 250 191, 258 150, 296 134" className="stroke-current opacity-40" delay={0.34} />
      </g>

      <DLabel x={248} y={72}>
        writes
      </DLabel>

      <DNode x={296} y={96} w={144} h={54} label="On hand" sub="one record" accent />

      <DrawPath
        d="M368 152 L 368 206"
        className="stroke-primary"
        delay={0.5}
        markerEnd="url(#stock-arw)"
      />
      <DLabel x={368} y={176}>
        posts back
      </DLabel>

      <DNode x={252} y={210} w={188} h={48} label="The books" sub="sharp-accounting" />

      <DLabel x={98} y={252}>
        nobody re-keys anything
      </DLabel>
      <DrawPath
        d="M8 268 L 196 268"
        className="stroke-current opacity-20"
        delay={0.66}
        dashed
      />
    </Diagram>
  );
}
