import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Spinner,
  toast,
  useModal,
} from "@sharpnr/ui";
import { Brain, ShieldCheck, KeyRound, ScrollText, Zap } from "lucide-react";
import { useStartCortexService } from "../api/mutations";
import CortexTermsContent from "./CortexTermsContent";

interface StartCortexServiceProps {
  /**
   * Whether the org has provisioned Cortex before. A never-started org is
   * onboarding; a started-but-inactive org is resuming a paused service, and
   * its policies and audit history are still there — the engine reactivates the
   * same account rather than creating a second one.
   */
  serviceStarted: boolean;
}

const INCLUDED = [
  { icon: ShieldCheck, label: "Roles & policies" },
  { icon: KeyRound, label: "API keys & secrets" },
  { icon: Brain, label: "Service accounts" },
  { icon: ScrollText, label: "Access reviews" },
];

function StartCortexService({ serviceStarted }: StartCortexServiceProps) {
  const { mutateAsync, isPending } = useStartCortexService();
  const { openModal, closeModal } = useModal();
  const [agreed, setAgreed] = useState(false);

  const showTerms = () => {
    openModal({
      title: "Cortex Terms & Conditions",
      description:
        "The terms your organisation accepts when activating Cortex.",
      content: <CortexTermsContent />,
      footer: (
        <>
          <Button variant="ghost" onClick={closeModal}>
            Close
          </Button>
          <Button
            onClick={() => {
              setAgreed(true);
              closeModal();
            }}
          >
            I Agree
          </Button>
        </>
      ),
    });
  };

  const activate = async () => {
    // The button is disabled until the box is ticked, so this only guards
    // against the payload ever going out with agreement unset — the engine
    // rejects it with a 400 either way.
    if (!agreed) return;

    try {
      const response = await mutateAsync({
        agreeTermsAndConditions: true,
        startService: true,
      });

      if (!response.success) {
        toast.error(
          response.message ?? "Couldn't start Cortex. Please try again.",
        );
        return;
      }

      toast.success(
        serviceStarted ? "Cortex reactivated" : "Cortex is now active",
      );
    } catch (error) {
      console.error("Failed to start the Cortex service:", error);
      toast.error("Couldn't start Cortex. Please try again.");
    }
  };

  return (
    // min-h-full rather than h-full: the card centres in the viewport at normal
    // sizes, but on a short window it grows past the container and the shell's
    // scroll area takes over instead of clipping the terms checkbox.
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="border-border/50 w-full max-w-2xl">
        <CardContent className="p-8 flex flex-col items-center text-center gap-5">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Brain size={24} className="text-amber-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold text-foreground">
              {serviceStarted
                ? "Cortex is paused"
                : "Start Cortex for your organisation"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {serviceStarted
                ? "Your organisation's Cortex service isn't running right now. Reactivating brings back the same account — none of your policies or audit history were deleted."
                : "Cortex is the IT control plane for your organisation. Activate it once to govern roles, credentials, and access from a single place instead of app by app."}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {INCLUDED.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
              >
                <Icon size={12} />
                {label}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-2.5 text-left rounded-lg border border-border/50 bg-muted/30 px-3.5 py-3">
            <Checkbox
              id="cortex-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={isPending}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="cortex-terms" className="cursor-pointer">
                I'm authorised to act for this organisation and accept the
                Cortex Terms &amp; Conditions.
              </label>{" "}
              <button
                type="button"
                onClick={showTerms}
                className="text-amber-500 underline underline-offset-2 hover:text-amber-400"
              >
                Read terms
              </button>
            </p>
          </div>

          <Button
            onClick={activate}
            disabled={!agreed || isPending}
            className="gap-1.5"
          >
            {isPending ? <Spinner className="size-4" /> : <Zap size={14} />}
            {isPending
              ? serviceStarted
                ? "Reactivating…"
                : "Activating…"
              : serviceStarted
                ? "Reactivate Cortex"
                : "Activate Cortex"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartCortexService;
