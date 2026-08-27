import { useEffect, useState } from "react";
import { initCedar, isCedarReady } from "../utils/cedar";

/**
 * Loads the Cedar wasm engine on mount and re-renders once it is usable, so
 * the generated policy gets validated as soon as the binary lands. Consumers
 * need no vite.config changes -- see utils/cedar.ts for why.
 */
export function useCedarReady(): boolean {
  const [ready, setReady] = useState(isCedarReady);

  useEffect(() => {
    if (ready) return;
    let alive = true;
    void initCedar().then(() => {
      if (alive) setReady(isCedarReady());
    });
    return () => {
      alive = false;
    };
  }, [ready]);

  return ready;
}
