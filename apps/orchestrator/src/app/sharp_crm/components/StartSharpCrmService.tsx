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
import { Contact, Building2, GitBranch, ListChecks, Zap } from "lucide-react";
import { useStartSharpCrmService } from "../api/mutation";
import SharpCrmTermsContent from "./SharpCrmTermsContent";

interface StartSharpCrmServiceProps {
  /**
   * Whether the org has provisioned SharpCRM before. A never-started org is
   * onboarding; a started-but-inactive org is resuming a paused service, and
   * its records are still there — the engine reactivates the same account
   * rather than creating a second one.
   */
  serviceStarted: boolean;
}

const INCLUDED = [
  { icon: Contact, label: "Customer records" },
  { icon: Building2, label: "Accounts" },
  { icon: GitBranch, label: "Pipelines" },
  { icon: ListChecks, label: "Activity tracking" },
];

function StartSharpCrmService({ serviceStarted }: StartSharpCrmServiceProps) {
  const { mutateAsync, isPending } = useStartSharpCrmService();
  const { openModal, closeModal } = useModal();
  const [agreed, setAgreed] = useState(false);

  const showTerms = () => {
    openModal({
      title: "SharpCRM Terms & Conditions",
      description:
        "The terms your organisation accepts when activating SharpCRM.",
      content: <SharpCrmTermsContent />,
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
        agreedTermsAndConditions: true,
        startService: true,
      });

      if (!response.success) {
        toast.error(
          response.message ?? "Couldn't start SharpCRM. Please try again.",
        );
        return;
      }

      toast.success(
        serviceStarted ? "SharpCRM reactivated" : "SharpCRM is now active",
      );
    } catch (error) {
      console.error("Failed to start the SharpCRM service:", error);
      toast.error("Couldn't start SharpCRM. Please try again.");
    }
  };

  return (
    // min-h-full rather than h-full: the card centres in the viewport at normal
    // sizes, but on a short window it grows past the container and the shell's
    // scroll area takes over instead of clipping the terms checkbox.
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="border-border/50 w-full max-w-2xl">
        <CardContent className="p-8 flex flex-col items-center text-center gap-5">
          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Contact size={24} className="text-violet-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold text-foreground">
              {serviceStarted
                ? "SharpCRM is paused"
                : "Start SharpCRM for your organisation"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {serviceStarted
                ? "Your organisation's SharpCRM service isn't running right now. Reactivating brings back the same account — none of your customer records were deleted."
                : "SharpCRM is the built-in customer layer for your organisation. Activate it once and every member gets customer records, accounts, and pipelines inside the orchestrator."}
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
              id="sharpcrm-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={isPending}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="sharpcrm-terms" className="cursor-pointer">
                I'm authorised to act for this organisation and accept the
                SharpCRM Terms &amp; Conditions.
              </label>{" "}
              <button
                type="button"
                onClick={showTerms}
                className="text-violet-500 underline underline-offset-2 hover:text-violet-400"
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
                ? "Reactivate SharpCRM"
                : "Activate SharpCRM"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartSharpCrmService;
