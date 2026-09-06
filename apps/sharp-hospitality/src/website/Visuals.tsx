import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** sharp-hospitality's motif: a woven diagonal — service, in two directions. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(60deg, currentColor 0 1px, transparent 1px 20px)"}
      opacity={0.07}
      className={className}
    />
  );
}

/**
 * The argument, drawn: one order, and everything downstream of it. A five
 * vendor stack draws the same boxes and then bills you for the arrows.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="An order routing to a kitchen screen, drawing down stock and posting to the right entity"
      viewBox="-6 -6 452 312"
      caption="One order at the till, and everything below it happens without a second system being told."
    >
      <DArrowDefs id="hosp-arw" />

      <DNode x={140} y={4} w={160} h={46} label="An order" sub="at the POS" accent />

      <g markerEnd="url(#hosp-arw)">
        <DrawPath d="M200 52 C 170 74, 120 80, 92 92" className="stroke-current opacity-40" delay={0.12} />
        <DrawPath d="M240 52 C 270 74, 320 80, 348 92" className="stroke-current opacity-40" delay={0.2} />
      </g>

      <DLabel x={220} y={80}>
        routed to the right screen
      </DLabel>

      <DNode x={0} y={96} w={184} h={46} label="Kitchen screen" sub="the hotel's" />
      <DNode x={256} y={96} w={184} h={46} label="Kitchen screen" sub="the restaurant's" />

      <g markerEnd="url(#hosp-arw)">
        <DrawPath d="M92 144 C 120 170, 180 176, 210 184" className="stroke-current opacity-40" delay={0.34} />
        <DrawPath d="M348 144 C 320 170, 260 176, 230 184" className="stroke-current opacity-40" delay={0.4} />
      </g>

      <DNode x={132} y={188} w={176} h={46} label="One shared kitchen" sub="Stockwave draws down" />

      <g markerEnd="url(#hosp-arw)">
        <DrawPath d="M180 234 C 150 254, 110 258, 86 264" className="stroke-primary" delay={0.54} />
        <DrawPath d="M260 234 C 290 254, 330 258, 354 264" className="stroke-primary" delay={0.6} />
      </g>

      <DNode x={0} y={252} w={172} h={46} label="Hotel Ltd's books" />
      <DNode x={268} y={252} w={172} h={46} label="Restaurant Ltd's books" />
    </Diagram>
  );
}
