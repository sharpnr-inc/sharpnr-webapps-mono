import { forwardRef } from "react";
import { ORGS, HUB } from "./networkScene";

/**
 * Static illustration of the O2O network for mobile —
 * the Three.js scene is desktop only.
 */
export const MobileNetwork = forwardRef<HTMLDivElement>(
  function MobileNetwork(_props, ref) {
    return (
      <div ref={ref} className="mx-auto mt-10 flex max-w-sm flex-col">
        {/* Hub */}
        <div className="rounded-xl border-2 border-accent/60 bg-ink p-4 text-center shadow-md">
          <p className="font-display text-lg font-bold text-text-light">
            {HUB.name}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-glow">
            {HUB.sub}
          </p>
        </div>

        {/* Connectors */}
        <div className="flex justify-center gap-10 py-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex flex-col items-center gap-1 py-1">
              <span className="size-1 rounded-full bg-accent/70" />
              <span className="size-1 rounded-full bg-accent/50" />
              <span className="size-1 rounded-full bg-accent/30" />
            </span>
          ))}
        </div>

        {/* Orgs */}
        <div className="flex flex-col gap-3">
          {ORGS.map((org) => (
            <div
              key={org.name}
              className="rounded-xl border border-ink-border bg-ink-soft/70 p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-base font-semibold text-text-light">
                  {org.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent-glow">
                  {org.industry}
                </p>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {org.apps.map((app) => (
                  <span
                    key={app}
                    className="rounded-md border border-ink-border bg-ink px-2 py-1 font-mono text-[10px] text-ink-muted"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
