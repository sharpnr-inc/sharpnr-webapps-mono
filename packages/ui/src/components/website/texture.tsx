import { cn } from "@sharpnr/utils";

export type TextureLayerProps = {
  /** A CSS `background-image` value. Each app supplies its own motif. */
  pattern: string;
  /** A CSS `background-size` value, when the pattern needs one. */
  size?: string;
  /** Kept low: this sits behind type and must never compete with it. */
  opacity?: number;
  /**
   * Where the motif is allowed to show. Defaults to the upper right -- behind
   * the hero's diagram and away from the headline, because a repeating pattern
   * running under a line of text reads as a rendering fault rather than as a
   * texture.
   */
  mask?: string;
  className?: string;
};

/**
 * The background motif behind a hero or a closing block.
 *
 * Shared so all thirteen sites fade their motif the same way and none of them
 * can accidentally run one across a headline. The pattern itself is the part
 * that differs per app -- ports for Cables, ledger rules for accounting,
 * sheared bands for Silo -- and it stays in each app's own Visuals file.
 */
export function TextureLayer({
  pattern,
  size,
  opacity = 0.05,
  mask = "radial-gradient(46% 42% at 92% 2%, black, transparent 72%)",
  className,
}: TextureLayerProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: pattern,
        ...(size ? { backgroundSize: size } : {}),
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
