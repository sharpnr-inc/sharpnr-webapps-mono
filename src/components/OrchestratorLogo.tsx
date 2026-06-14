/*
 * OrchestratorLogo
 * The orchestrator hub-and-spoke mark, available in two variants:
 * - OrchestratorLogoDark  → dark mark, for use on light backgrounds
 * - OrchestratorLogoLight → light (white) mark, for use on dark backgrounds
 *
 * Both accept all native <svg> props (className, width, height, onClick, …).
 * Pass `color` to override the stroke/fill (e.g. "currentColor").
 */

import type { SVGProps } from "react";

type OrchestratorLogoProps = SVGProps<SVGSVGElement> & {
  /** Stroke & fill color. Defaults to the variant color. */
  color?: string;
};

function OrchestratorLogo({
  color = "currentColor",
  width = 100,
  height = 100,
  ...props
}: OrchestratorLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      fill="none"
      role="img"
      aria-label="Orchestrator"
      {...props}
    >
      <g stroke={color} strokeWidth={3.4} strokeLinecap="round">
        <line x1="50" y1="50" x2="50" y2="16.5" />
        <line x1="50" y1="50" x2="79.04" y2="33.25" />
        <line x1="50" y1="50" x2="79.04" y2="66.75" />
        <line x1="50" y1="50" x2="50" y2="83.5" />
        <line x1="50" y1="50" x2="20.96" y2="66.75" />
        <line x1="50" y1="50" x2="20.96" y2="33.25" />
      </g>
      <g fill={color}>
        <circle cx="50" cy="16.5" r="6" />
        <circle cx="79.04" cy="33.25" r="6" />
        <circle cx="79.04" cy="66.75" r="6" />
        <circle cx="50" cy="83.5" r="6" />
        <circle cx="20.96" cy="66.75" r="6" />
        <circle cx="20.96" cy="33.25" r="6" />
        <circle cx="50" cy="50" r="10.5" />
      </g>
    </svg>
  );
}

/** Dark mark — use on light backgrounds. */
export function OrchestratorLogoDark({
  color = "#000000",
  ...props
}: OrchestratorLogoProps) {
  return <OrchestratorLogo color={color} {...props} />;
}

/** Light (white) mark — use on dark backgrounds. */
export function OrchestratorLogoLight({
  color = "#FFFFFF",
  ...props
}: OrchestratorLogoProps) {
  return <OrchestratorLogo color={color} {...props} />;
}

export default OrchestratorLogo;
