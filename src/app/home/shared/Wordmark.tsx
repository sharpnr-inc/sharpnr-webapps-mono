/*
 * The SHARPNR wordmark — the official lockup export, used as one image.
 *
 * This was previously set as live text with the logo standing in for the
 * "A". That could never be made to work: the mark is a thin triangle around
 * a large counter, so against a solid extrabold A it always read lighter
 * and narrower, and no combination of size, weight or baseline offset
 * closed a gap that was structural rather than a setting. The official
 * export has the A drawn as a real letterform at letter width, which is the
 * only thing that actually solves it.
 *
 * The PNG rather than the SVG export, deliberately. All three SVG lockups
 * (white/navy/black) share the same defective geometry: the artboard was
 * trimmed inside the outlines, so the S is flattened on the left and the
 * final R is sliced clean off on the right. That clip is baked into the
 * path data — widening the viewBox recovers nothing. This PNG is the only
 * export in the set with the letterforms intact.
 *
 * It carries 6.55% transparent bleed horizontally and 25.5% vertically, so
 * the visible word is smaller than the box it sits in; callers sizing this
 * have to allow for that. Replace with a corrected SVG when one exists.
 *
 * Sizing is by height — the caller sets it, and the width follows the
 * lockup's own aspect. Never set both, or the logo gets distorted, which
 * the brand guidelines forbid.
 */
interface WordmarkProps {
  className?: string;
  /** Expose the name to assistive tech (off when it is purely decorative). */
  label?: string;
}

export function Wordmark({ className = "", label }: WordmarkProps) {
  return (
    <img
      src="/sharpnr-wordmark-white.png"
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      /* The official export is #ECECEC, so lift it where it sits against
         pure-white type elsewhere in a lockup. */
      className={`hp-wordmark w-auto brightness-110 ${className}`}
    />
  );
}
