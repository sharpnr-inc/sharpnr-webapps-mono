import { DArrowDefs, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/**
 * Cables' motif: the patch bay. A field of unused ports, which is what the
 * logo is drawn from, faded out before the fold so it stays behind the type
 * rather than competing with it.
 */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"radial-gradient(circle at center, rgba(63,58,52,0.75) 1.5px, transparent 1.6px)"}
      size={"28px 28px"}
      opacity={0.5}
      className={className}
    />
  );
}

/**
 * The argument, drawn: three records in three different apps, each with a
 * cable running to the conversation it carries. The conversation is not a
 * fourth place you go to -- it hangs off the record.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="A project, a warehouse and a document, each with its own Cables channel attached"
      viewBox="-6 -6 452 312"
      caption="A record in another app does not link out to a chat somewhere else. It carries the channel."
    >
      <DArrowDefs id="cables-arw" />

      <DNode x={0} y={16} w={150} h={50} label="A project" sub="sharp-iam" />
      <DNode x={0} y={124} w={150} h={50} label="A warehouse" sub="Stockwave" />
      <DNode x={0} y={232} w={150} h={50} label="A document" sub="Folio" />

      {/* The cables. Patch orange, always -- the one brand rule. */}
      <g markerEnd="url(#cables-arw)" stroke="#d9762f">
        <DrawPath
          d="M154 41 C 220 41, 230 118, 288 140"
          className="stroke-[#d9762f]"
          strokeWidth={1.75}
          delay={0.1}
        />
        <DrawPath
          d="M154 149 C 220 149, 230 149, 288 149"
          className="stroke-[#d9762f]"
          strokeWidth={1.75}
          delay={0.25}
        />
        <DrawPath
          d="M154 257 C 220 257, 230 180, 288 159"
          className="stroke-[#d9762f]"
          strokeWidth={1.75}
          delay={0.4}
        />
      </g>

      <DNode
        x={292}
        y={124}
        w={148}
        h={50}
        label="One conversation"
        sub="Cables"
        accent
      />

      {/* The logo's port geometry, reused as a rest for the eye. */}
      <circle cx="350" cy="206" r="4" className="fill-current opacity-20" />
      <circle cx="366" cy="206" r="4" className="fill-current opacity-20" />
      <circle cx="382" cy="206" r="4" fill="#d9762f" />
    </Diagram>
  );
}
