/*
 * The X mark.
 *
 * Lucide still ships this as `Twitter` — the bird — which the platform
 * retired in 2023. Drawn here rather than imported so the footer shows the
 * current mark, and typed to match a LucideIcon so it drops into the same
 * social list without a special case.
 *
 * Solid rather than stroked: X's mark has no stroked form, and outlining it
 * would produce a glyph that doesn't exist. It sits beside 1.8px stroke
 * icons at the same optical weight.
 */
interface XIconProps {
  className?: string;
  /** Accepted and ignored — the mark is a filled glyph, not a stroke. */
  strokeWidth?: number | string;
}

export function XIcon({ className }: XIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
