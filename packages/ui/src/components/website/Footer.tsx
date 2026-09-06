import type { ReactNode } from "react";
import { config } from "@sharpnr/env";
import { cn } from "@sharpnr/utils";
import {
  ECOSYSTEM_GROUPS,
  ecosystemGroup,
  type EcosystemAppId,
} from "./ecosystem";

export type WebsiteFooterProps = {
  /**
   * The app rendering the footer. It is dropped from the link columns -- a
   * site does not need to link to itself -- and named in the closing line.
   */
  appId: EcosystemAppId;
  /** How the app is written in prose, e.g. "Cables". */
  appName: string;
  /** The app's own mark or lockup. Sites pass their brand component. */
  brand?: ReactNode;
  /** One sentence on what this app is, under the brand. */
  tagline?: string;
  className?: string;
};

/**
 * The footer every sharpnr marketing site ends on.
 *
 * Its entire link list comes from `ecosystem.ts`, which reads `@sharpnr/env`,
 * so the footer is identical everywhere and no site can drift out of sync with
 * the others or hardcode a sibling's URL. Only the brand block and the tagline
 * are per-app.
 *
 * Grouped rather than flat: the point of the footer is that a visitor who came
 * for one app leaves knowing the shape of the platform, and thirteen unsorted
 * links do not convey a shape.
 */
export function WebsiteFooter({
  appId,
  appName,
  brand,
  tagline,
  className,
}: WebsiteFooterProps) {
  return (
    <footer className={cn("border-t border-border", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-6">
          {/* Brand block — the only per-app part of the footer. */}
          <div className="col-span-2">
            {brand}
            {tagline && (
              <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-muted-foreground text-pretty">
                {tagline}
              </p>
            )}
            <a
              href={config.authAppUrl}
              className="mt-6 inline-block text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Sign in to {appName}
            </a>
          </div>

          {ECOSYSTEM_GROUPS.map(({ id, title }) => {
            const apps = ecosystemGroup(id, appId);
            if (apps.length === 0) return null;

            return (
              <div key={id} className="col-span-1">
                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  {title}
                </p>
                <ul className="mt-4 space-y-3">
                  {apps.map((app) => (
                    <li key={app.id}>
                      <a
                        href={app.href}
                        className="group block text-sm transition-colors hover:text-foreground"
                      >
                        <span className="font-medium">{app.name}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                          {app.role}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} sharpnr</p>
          <p className="text-pretty">
            {appName} is part of the sharpnr platform. One account, one
            organization, every app.
          </p>
        </div>
      </div>
    </footer>
  );
}
