import { cn } from "@sharpnr/utils";
import { ecosystemApp, type EcosystemAppId } from "./ecosystem";

export type FlowStep = {
  /** Links the step to that app's site when given. */
  app?: EcosystemAppId;
  /** What happens at this step. Kept to a few words. */
  label: string;
};

export type FlowLineProps = {
  steps: FlowStep[];
  className?: string;
};

/**
 * A chain of steps that cross apps, set as one line of text.
 *
 * The brief for these sites bans rendering a flow as a row of cards, and it is
 * right to: three boxes say "three features", while `invoice → stock → books`
 * says the thing actually moves. Wraps to a column on narrow screens so the
 * arrows never push the page sideways.
 */
export function FlowLine({ steps, className }: FlowLineProps) {
  return (
    <ol
      className={cn(
        "flex flex-col items-start gap-x-3 gap-y-2 sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
    >
      {steps.map((step, i) => {
        const app = step.app ? ecosystemApp(step.app) : undefined;

        return (
          <li key={`${step.label}-${i}`} className="flex items-center gap-3">
            {i > 0 && (
              <span aria-hidden className="text-muted-foreground select-none">
                &rarr;
              </span>
            )}
            <span className="text-sm">
              {app ? (
                <a
                  href={app.href}
                  className="font-medium underline decoration-border decoration-1 underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  {app.name}
                </a>
              ) : null}
              {app && " "}
              <span className={cn(app && "text-muted-foreground")}>
                {step.label}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
