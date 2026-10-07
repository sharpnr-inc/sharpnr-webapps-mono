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
import { Warehouse, Boxes, ArrowLeftRight, PackageSearch, Zap } from "lucide-react";
import { useStartStockwaveService } from "../api/mutations";
import StockwaveTermsContent from "./StockwaveTermsContent";

interface StartStockwaveServiceProps {
  /**
   * Whether the org has taken stockwave before. A never-started org is
   * onboarding; a started-but-inactive org is resuming a paused service, and
   * its stock records are still there — the engine reactivates the same account
   * rather than creating a second one.
   */
  serviceStarted: boolean;
}

const INCLUDED = [
  { icon: Warehouse, label: "Warehouses" },
  { icon: Boxes, label: "Items & SKUs" },
  { icon: ArrowLeftRight, label: "Stock movements" },
  { icon: PackageSearch, label: "Stock reporting" },
];

function StartStockwaveService({ serviceStarted }: StartStockwaveServiceProps) {
  const { mutateAsync, isPending } = useStartStockwaveService();
  const { openModal, closeModal } = useModal();
  const [agreed, setAgreed] = useState(false);

  const showTerms = () => {
    openModal({
      title: "Stockwave Terms & Conditions",
      description:
        "The terms your organisation accepts when activating Stockwave.",
      content: <StockwaveTermsContent />,
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
          response.message ?? "Couldn't start Stockwave. Please try again.",
        );
        return;
      }

      toast.success(
        serviceStarted ? "Stockwave reactivated" : "Stockwave is now active",
      );
    } catch (error) {
      console.error("Failed to start the Stockwave service:", error);
      toast.error("Couldn't start Stockwave. Please try again.");
    }
  };

  return (
    // min-h-full rather than h-full: the card centres in the viewport at normal
    // sizes, but on a short window it grows past the container and the shell's
    // scroll area takes over instead of clipping the terms checkbox.
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="border-border/50 w-full max-w-2xl">
        <CardContent className="p-8 flex flex-col items-center text-center gap-5">
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Warehouse size={24} className="text-orange-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold text-foreground">
              {serviceStarted
                ? "Stockwave is paused"
                : "Start Stockwave for your organisation"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {serviceStarted
                ? "Your organisation's Stockwave service isn't running right now. Reactivating brings back the same account — not a single stock row was deleted."
                : "Stockwave is the stock layer for your organisation. Activate it once to track warehouses, items, and movements against the suppliers and purchases the rest of the orchestrator already records."}
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
              id="stockwave-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={isPending}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="stockwave-terms" className="cursor-pointer">
                I'm authorised to act for this organisation and accept the
                Stockwave Terms &amp; Conditions.
              </label>{" "}
              <button
                type="button"
                onClick={showTerms}
                className="text-orange-500 underline underline-offset-2 hover:text-orange-400"
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
                ? "Reactivate Stockwave"
                : "Activate Stockwave"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartStockwaveService;
