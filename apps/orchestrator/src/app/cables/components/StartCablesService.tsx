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
import { MessageSquare, Hash, Video, Users, Zap } from "lucide-react";
import { useStartCablesService } from "../api/mutations";
import CablesTermsContent from "./CablesTermsContent";

interface StartCablesServiceProps {
  /**
   * Whether the org has provisioned Cables before. A never-started org is
   * onboarding; a started-but-inactive org is resuming a paused service.
   */
  isStarted: boolean;
}

const INCLUDED = [
  { icon: MessageSquare, label: "Org-wide chat" },
  { icon: Hash, label: "Channels" },
  { icon: Video, label: "Meetings" },
  { icon: Users, label: "Org directory" },
];

function StartCablesService({ isStarted }: StartCablesServiceProps) {
  const { mutateAsync, isPending } = useStartCablesService();
  const { openModal, closeModal } = useModal();
  const [agreed, setAgreed] = useState(false);

  const showTerms = () => {
    openModal({
      title: "Cables Terms & Conditions",
      description:
        "The terms your organisation accepts when activating Cables.",
      content: <CablesTermsContent />,
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
    // against the payload ever going out with agreement unset.
    if (!agreed) return;

    try {
      const response = await mutateAsync({
        agreeToTermsAndCondtions: true,
        startService: true,
      });

      if (!response.success) {
        toast.error(
          response.message ?? "Couldn't start Cables. Please try again.",
        );
        return;
      }

      toast.success(isStarted ? "Cables reactivated" : "Cables is now active");
    } catch (error) {
      console.error("Failed to start the cables service:", error);
      toast.error("Couldn't start Cables. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="border-border/50">
        <CardContent className="p-8 flex flex-col items-center text-center gap-5">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <MessageSquare size={24} className="text-blue-500" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-lg font-semibold text-foreground">
              {isStarted
                ? "Cables is paused"
                : "Start Cables for your organisation"}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              {isStarted
                ? "Your organisation's Cables service isn't running right now. Reactivate it to bring chat, channels, and meetings back online."
                : "Cables is the built-in communication layer for your organisation. Activate it once and every member gets chat, channels, and meetings inside the orchestrator."}
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
              id="cables-terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              disabled={isPending}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="cables-terms" className="cursor-pointer">
                I'm authorised to act for this organisation and accept the
                Cables Terms &amp; Conditions.
              </label>{" "}
              <button
                type="button"
                onClick={showTerms}
                className="text-blue-500 underline underline-offset-2 hover:text-blue-400"
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
              ? isStarted
                ? "Reactivating…"
                : "Activating…"
              : isStarted
                ? "Reactivate Cables"
                : "Activate Cables"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StartCablesService;
