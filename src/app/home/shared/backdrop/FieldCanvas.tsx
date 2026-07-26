import { Canvas } from "@react-three/fiber";
import { Field } from "./Field";

/**
 * The WebGL surface. Kept deliberately cheap: no lights, no shadows, no
 * post-processing, DPR capped at 1.5 and the frame loop stopped entirely when
 * the visitor prefers reduced motion. Client-only — mounted from Backdrop.
 */
export default function FieldCanvas({ animate }: { animate: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Field animate={animate} />
    </Canvas>
  );
}
