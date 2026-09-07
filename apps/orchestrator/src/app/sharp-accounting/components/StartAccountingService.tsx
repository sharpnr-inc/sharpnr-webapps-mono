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
import { Calculator, BookOpen, Scale, FileSpreadsheet, Zap } from "lucide-react";
import { useStartAccountingService } from "../api/mutations";
import AccountingTermsContent from "./AccountingTermsContent";

interface StartAccountingServiceProps {
  /**
   * Whether the org has taken accounting before. A never-started org is
   * onboarding; a started-but-inactive org is resuming a paused service, and
   * its ledgers are still there — the engine reactivates the same account
   * rather than creating a second one.
   */
  serviceStarted: boolean;
}

const INCLUDED = [
  { icon: BookOpen, label: "Books per legal entity" },
  { icon: Scale, label: "Double-entry ledgers" },
  { icon: FileSpreadsheet, label: "Invoices & payments" },
  { icon: Calculator, label: "Financial reports" },
];

function StartAccountingService({
  serviceStarted,
}: StartAccountingServiceProps) {
  const { mutateAsync, isPending } = useStartAccountingService();
  const { openModal, closeModal } = useModal();
  const [agreed, setAgreed] = useState(false);

  const showTerms = () => {
    openModal({
      title: "Sharp Accounting Terms & Conditions",
      description:
        "The terms your organisation accepts when activating accounting.",
      content: <AccountingTermsContent />,
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
          response.message ?? "Couldn't start accounting. Please try again.",
        );
        return;
      }

      toast.success(
        serviceStarted ? "Accounting reactivated" : "Accounting is now active",
      );
    } catch (error) {
      console.error("Failed to start the accounting service:", error);
      toast.error("Couldn't start accounting. Please try again.");
    }
  };

  return (
    // min-h-full rather than h-full: the card centres in the viewport at normal
    // sizes, but on a short window it grows past the container and the shell's
    // scroll area takes over instead of clipping the terms checkbox.
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="border-border/50 w-full max-w-2xl">
        <CardContent className="p-8 flex flex-col items-center text-center gap-5">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Calculator size={24} className="text-indigo-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold text-foreground">
              {serviceStarted
                ? "Accounting is paused"
                : "Start accounting for your organisation"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {serviceStarted
                ? "Your organisation's accounting service isn't running right now. Reactivating brings back the same account — not a single ledger row was deleted."
                : "Sharp Accounting is the double-entry ledger for your organisation. Activate it once, then each legal entity gets its own book, fed by the invoices and payments the rest of the orchestrator already records."}
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
              id="accounting-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={isPending}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="accounting-terms" className="cursor-pointer">
                I'm authorised to act for this organisation and accept the Sharp
                Accounting Terms &amp; Conditions.
              </label>{" "}
              <button
                type="button"
                onClick={showTerms}
                className="text-indigo-500 underline underline-offset-2 hover:text-indigo-400"
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
                ? "Reactivate Accounting"
                : "Activate Accounting"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartAccountingService;
