import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** Cortex's motif: a fine administrative grid. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)"}
      size={"44px 44px"}
      opacity={0.06}
      className={className}
    />
  );
}

/**
 * The argument, drawn: the request arrives from the conversation the employee
 * was already having, and is approved against the actual resource. Two
 * separate products would put a ticket queue where the middle box is, and the
 * fleet in a different drawing entirely.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="An access request travelling from Cables into Cortex and onto a Silo resource"
      viewBox="-6 -6 452 312"
      caption="No ticket queue in between: the request names a real resource, and approving it is the grant."
    >
      <DArrowDefs id="cortex-arw" />

      <DNode x={0} y={14} w={152} h={50} label="An employee asks" sub="in Cables" />

      <g markerEnd="url(#cortex-arw)">
        <DrawPath d="M156 39 L 284 39" className="stroke-current opacity-45" delay={0.1} />
        <DrawPath d="M364 64 L 364 114" className="stroke-primary" delay={0.3} />
        <DrawPath d="M340 172 L 300 208" className="stroke-current opacity-40" delay={0.5} />
        <DrawPath d="M388 172 L 412 208" className="stroke-current opacity-40" delay={0.56} />
      </g>

      <DLabel x={220} y={28}>
        a request
      </DLabel>

      <DNode x={288} y={14} w={152} h={50} label="IT approves" sub="Cortex" accent />
      <DNode x={288} y={120} w={152} h={52} label="The grant" sub="on the resource" />

      <DLabel x={364} y={228}>
        buckets · databases · datasets
      </DLabel>

      {/* The other half of the console: the fleet, over the same employees. */}
      <rect
        x="0"
        y="112"
        width="248"
        height="140"
        rx="8"
        className="fill-transparent stroke-current opacity-20"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      <DLabel x={16} y={134} anchor="start">
        the same employees
      </DLabel>
      <DNode x={16} y={146} w={104} h={48} label="Devices" sub="issued to" />
      <DNode x={132} y={146} w={104} h={48} label="Assets" sub="and health" />
      <DLabel x={16} y={222} anchor="start">
        one console, not two products
      </DLabel>
    </Diagram>
  );
}
