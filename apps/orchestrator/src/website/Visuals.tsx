import { DArrowDefs, DLabel, DNode, Diagram, DrawPath, TextureLayer } from "@sharpnr/ui";

/** Orchestrator's motif: concentric rings, widening from one centre. */
export function Texture({ className }: { className?: string }) {
  return (
    <TextureLayer
      pattern={"repeating-radial-gradient(circle at 82% 16%, currentColor 0 1px, transparent 1px 40px)"}
      opacity={0.08}
      className={className}
    />
  );
}

/**
 * The argument, drawn: the organization is described once at the top and every
 * app below reads it. The shape being argued against is the same drawing with
 * a copy of the top box inside each app.
 */
export function HeroDiagram() {
  return (
    <Diagram
      title="One organization definition, inherited by every app in the platform"
      viewBox="-6 -6 452 312"
      caption="Entities, cost centers, employees and permissions are described once. The apps below read them."
    >
      <DArrowDefs id="orch-arw" />

      <DNode
        x={64}
        y={6}
        w={312}
        h={54}
        label="Your organization"
        sub="entities · cost centers · employees · permissions"
        accent
      />

      <DrawPath
        d="M220 60 L 220 96"
        className="stroke-primary"
        delay={0.12}
      />
      <DLabel x={220} y={116}>
        inherited, not re-entered
      </DLabel>

      {/* One rail, from which every app hangs. */}
      <DrawPath
        d="M34 132 L 406 132"
        className="stroke-current opacity-30"
        delay={0.24}
      />
      <g markerEnd="url(#orch-arw)">
        {[34, 127, 220, 313, 406].map((x, i) => (
          <DrawPath
            key={x}
            d={`M${x} 132 L ${x} 176`}
            className="stroke-current opacity-35"
            delay={0.3 + i * 0.05}
          />
        ))}
      </g>

      <DNode x={0} y={180} w={72} h={44} label="Books" sub="accounting" />
      <DNode x={91} y={180} w={72} h={44} label="Stock" sub="Stockwave" />
      <DNode x={184} y={180} w={72} h={44} label="People" sub="sharp-hr" />
      <DNode x={277} y={180} w={72} h={44} label="Storage" sub="Silo" />
      <DNode x={370} y={180} w={70} h={44} label="Talk" sub="Cables" />

      <DLabel x={220} y={252}>
        and every other app in the platform
      </DLabel>

      <DrawPath
        d="M8 272 L 432 272"
        className="stroke-current opacity-20"
        delay={0.7}
        dashed
      />
      <DLabel x={220} y={292}>
        each one switched on here, not procured
      </DLabel>
    </Diagram>
  );
}
