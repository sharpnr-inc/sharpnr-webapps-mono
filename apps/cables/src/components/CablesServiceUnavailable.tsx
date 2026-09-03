import { config } from "@sharpnr/env";
import { CircleSlash, ExternalLink, PowerOff } from "lucide-react";

type UnavailableReason = "NOT_STARTED" | "INACTIVE";

interface CablesServiceUnavailableProps {
  /**
   * "NOT_STARTED" — the org has never provisioned Cables.
   * "INACTIVE"    — it was provisioned but is switched off right now.
   */
  reason: UnavailableReason;
}

const COPY: Record<
  UnavailableReason,
  { icon: typeof PowerOff; title: string; body: string; hint: string }
> = {
  NOT_STARTED: {
    icon: PowerOff,
    title: "Cables hasn't been started for your organisation",
    body: "Your organisation hasn't activated Cables yet. An administrator needs to start the service from the orchestrator before anyone here can chat, call, or meet.",
    hint: "Only an organisation administrator can start the service.",
  },
  INACTIVE: {
    icon: CircleSlash,
    title: "Cables service is not active",
    body: "Your organisation's Cables service is currently switched off. Please contact your administrator to have it reactivated.",
    hint: "Once it's active again, this page will let you straight through.",
  },
};

export function CablesServiceUnavailable({
  reason,
}: CablesServiceUnavailableProps) {
  const { icon: Icon, title, body, hint } = COPY[reason];

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-ink p-6">
      <div className="w-full max-w-md rounded-xl border border-ink-line bg-ink-raised p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-patch/30 bg-patch/10">
          <Icon className="h-5 w-5 text-patch" />
        </div>

        <h1 className="mt-5 text-base font-semibold text-paper">{title}</h1>

        <p className="mt-2 text-sm leading-relaxed text-paper-dim">{body}</p>

        {reason === "NOT_STARTED" && (
          <a
            href={`${config.orchestratorAppUrl}/cables`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-patch/40 bg-patch/10 px-4 py-2 text-sm font-medium text-patch transition-colors hover:bg-patch/20"
          >
            Open the orchestrator
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}

        <p className="mt-6 border-t border-ink-line pt-5 text-xs text-paper-muted">
          {hint}
        </p>
      </div>
    </div>
  );
}
