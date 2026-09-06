import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** Accounting's motif: ledger rules — a heavy line paired with a hair line. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 5px, currentColor 5px 6px, transparent 6px 48px)"}
      opacity={0.06}
      className={className}
    />
  );
}

/**
 * The strongest case in the platform, drawn: two legal entities sharing one
 * operation, with the cost of it landing correctly in each entity's books.
 *
 * A stack assembled from separate products can draw the top row and the bottom
 * row. What it cannot draw is the middle box belonging to both columns at once
 * without somebody apportioning it by hand at the end of the month.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="Two legal entities sharing one kitchen, with costs landing in each entity's books"
      viewBox="-6 -6 452 312"
      caption="One operation, two sets of books, and no month-end apportionment by estimate."
    >
      <DArrowDefs id="acc-arw" />

      <DNode x={0} y={6} w={190} h={52} label="Hotel Ltd" sub="its own books" />
      <DNode x={250} y={6} w={190} h={52} label="Restaurant Ltd" sub="its own books" />

      <g markerEnd="url(#acc-arw)">
        <DrawPath d="M170 128 C 120 128, 96 92, 95 62" className="stroke-primary" delay={0.2} />
        <DrawPath d="M270 128 C 320 128, 344 92, 345 62" className="stroke-primary" delay={0.28} />
      </g>

      <DLabel x={40} y={100} anchor="start">
        its share
      </DLabel>
      <DLabel x={400} y={100} anchor="end">
        its share
      </DLabel>

      <DNode
        x={132}
        y={132}
        w={176}
        h={54}
        label="One shared kitchen"
        sub="a single operation"
        accent
      />

      <DrawPath
        d="M220 218 L 220 190"
        className="stroke-current opacity-40"
        delay={0.44}
        markerEnd="url(#acc-arw)"
      />
      <DLabel x={272} y={212}>
        ingredients
      </DLabel>

      <DNode x={132} y={222} w={176} h={48} label="Stock draws down" sub="Stockwave" />

      {/* The line that makes it work: the account is shared, the entries are not. */}
      <DLabel x={220} y={292}>
        the inventory account is shared — the entries stay scoped
      </DLabel>
    </Diagram>
  );
}
