import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** sharp-crm's motif: a field of soft rings — people, loosely arranged. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"radial-gradient(circle at center, transparent 0 5px, currentColor 5px 6px, transparent 6px)"}
      size={"34px 34px"}
      opacity={0.07}
      className={className}
    />
  );
}

/**
 * The argument, drawn: the record is created by the operation that served the
 * customer, which is the one moment the details are certainly right. What is
 * deliberately missing from this drawing is a person typing.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="A served guest becoming a customer record, with loyalty and value following from it"
      viewBox="-6 -6 452 312"
      caption="Nobody types the customer in. The operation that served them created the record."
    >
      <DArrowDefs id="crm-arw" />

      <DNode x={0} y={16} w={168} h={52} label="A guest checks in" sub="sharp-hospitality" />
      <DNode x={0} y={92} w={168} h={52} label="An order is placed" sub="sharp-marketplace" />

      <g markerEnd="url(#crm-arw)">
        <DrawPath d="M172 42 C 220 42, 240 104, 288 116" className="stroke-current opacity-40" delay={0.12} />
        <DrawPath d="M172 118 C 220 118, 240 124, 288 126" className="stroke-current opacity-40" delay={0.2} />
      </g>

      <DLabel x={230} y={86}>
        becomes
      </DLabel>

      <DNode x={288} y={96} w={152} h={54} label="A customer" sub="sharp-crm" accent />

      <g markerEnd="url(#crm-arw)">
        <DrawPath d="M340 152 C 330 190, 300 204, 268 216" className="stroke-primary" delay={0.4} />
        <DrawPath d="M388 152 L 388 216" className="stroke-primary" delay={0.48} />
      </g>

      <DNode x={140} y={220} w={140} h={50} label="Loyalty" sub="on real activity" />
      <DNode x={300} y={220} w={140} h={50} label="What they're worth" sub="from the books" />

      <DrawPath
        d="M8 250 L 128 250"
        className="stroke-current opacity-20"
        delay={0.6}
        dashed
      />
      <DLabel x={68} y={272}>
        no import step
      </DLabel>
    </Diagram>
  );
}
