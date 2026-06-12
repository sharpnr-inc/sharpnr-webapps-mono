import { useRef } from "react";
import { useHeroAmbientCanvasAnimation } from "./animations/useHeroAmbientCanvasAnimation";

/**
 * Full-bleed ambient particle field behind the hero content.
 * Purely decorative — hidden from assistive tech.
 */
export function HeroAmbientCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useHeroAmbientCanvasAnimation({ wrapperRef, canvasRef });

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
