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
import { Users, UserPlus, CalendarCheck, Wallet, Zap } from "lucide-react";
import { useStartHrmsService } from "../api/mutations";
import SharpHrTermsContent from "./SharpHrTermsContent";

interface StartSharpHrServiceProps {
  /**
   * Whether the org has provisioned SharpHR before. A never-started org is
   * onboarding; a started-but-inactive org is resuming a paused service, and
   * its employee records are still there — the engine reactivates the same
   * account rather than creating a second one.
   */
  serviceStarted: boolean;
}

const INCLUDED = [
  { icon: Users, label: "Employee records" },
  { icon: UserPlus, label: "Onboarding" },
  { icon: CalendarCheck, label: "Attendance & leave" },
  { icon: Wallet, label: "Payroll inputs" },
];

function StartSharpHrService({ serviceStarted }: StartSharpHrServiceProps) {
  const { mutateAsync, isPending } = useStartHrmsService();
  const { openModal, closeModal } = useModal();
  const [agreed, setAgreed] = useState(false);

  const showTerms = () => {
    openModal({
      title: "SharpHR Terms & Conditions",
      description:
        "The terms your organisation accepts when activating SharpHR.",
      content: <SharpHrTermsContent />,
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
          response.message ?? "Couldn't start SharpHR. Please try again.",
        );
        return;
      }

      toast.success(
        serviceStarted ? "SharpHR reactivated" : "SharpHR is now active",
      );
    } catch (error) {
      console.error("Failed to start the SharpHR service:", error);
      toast.error("Couldn't start SharpHR. Please try again.");
    }
  };

  return (
    // min-h-full rather than h-full: the card centres in the viewport at normal
    // sizes, but on a short window it grows past the container and the shell's
    // scroll area takes over instead of clipping the terms checkbox.
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="border-border/50 w-full max-w-2xl">
        <CardContent className="p-8 flex flex-col items-center text-center gap-5">
          <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
            <Users size={24} className="text-teal-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold text-foreground">
              {serviceStarted
                ? "SharpHR is paused"
                : "Start SharpHR for your organisation"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {serviceStarted
                ? "Your organisation's SharpHR service isn't running right now. Reactivating brings back the same account — none of your employee records were deleted."
                : "SharpHR is the people layer for your organisation. Activate it once to run onboarding, attendance, and payroll against the same employee records the rest of the orchestrator already uses."}
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
              id="sharphr-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={isPending}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="sharphr-terms" className="cursor-pointer">
                I'm authorised to act for this organisation and accept the
                SharpHR Terms &amp; Conditions.
              </label>{" "}
              <button
                type="button"
                onClick={showTerms}
                className="text-teal-500 underline underline-offset-2 hover:text-teal-400"
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
                ? "Reactivate SharpHR"
                : "Activate SharpHR"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartSharpHrService;
