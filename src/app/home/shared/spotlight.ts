import type { MouseEvent } from "react";

/**
 * Tracks the pointer as `--mx` / `--my` percentage custom properties, so a
 * `.hp-spotlight` element's glow and glowing edge (pure CSS radial-gradient)
 * can follow the cursor with zero re-renders. Pair with `onMouseMove`.
 */
export function onSpotlightMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty(
    "--mx",
    `${((e.clientX - rect.left) / rect.width) * 100}%`,
  );
  e.currentTarget.style.setProperty(
    "--my",
    `${((e.clientY - rect.top) / rect.height) * 100}%`,
  );
}
