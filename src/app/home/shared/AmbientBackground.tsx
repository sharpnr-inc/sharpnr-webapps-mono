import { Suspense, lazy, useEffect, useState } from "react";
import { prefersReduced } from "./motion";

/*
 * The stage the whole page stands on.
 *
 * A WebGL field carries the depth and the slow movement of light; the flat
 * navy underneath it is the fallback, so nothing ever flashes and the page is
 * fully legible before — or without — WebGL. The layer is decorative: it holds
 * no meaning and is hidden from assistive technology.
 */
const FieldCanvas = lazy(() => import("./backdrop/FieldCanvas"));

export function AmbientBackground() {
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    // WebGL cannot render on the server, and a weak device should not try.
    const canWebGL = (() => {
      try {
        const c = document.createElement("canvas");
        return Boolean(
          c.getContext("webgl2") ?? c.getContext("webgl"),
        );
      } catch {
        return false;
      }
    })();

    setAnimate(!prefersReduced());
    if (canWebGL) setReady(true);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-canvas"
    >
      {/*
       * Sticky, not fixed. The smooth-scroll wrapper is transformed, and a
       * transformed ancestor becomes the containing block for `fixed` — which
       * silently stretched the canvas to the full document height. Sticky
       * keeps the drawing surface exactly one viewport tall while still
       * travelling with the reader.
       */}
      <div className="sticky top-0 h-svh w-full">
        {ready && (
          <Suspense fallback={null}>
            <FieldCanvas animate={animate} />
          </Suspense>
        )}
      </div>
      {/* Grain over the top ties the WebGL layer to the flat sections. */}
      <div className="hp-noise absolute inset-0" />
    </div>
  );
}
