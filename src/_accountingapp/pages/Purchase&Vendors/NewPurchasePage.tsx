import NewPurchase from "@/_accountingapp/components/Purchase/Purchase";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export function AddPurchaseInvoicePage() {
  const router = useRouter();

  return (
    <TooltipProvider>
      <NewPurchase
        onBack={() => router.history.back()}
        onPosted={() => toast.success("Invoice posted")}
        onDraftSaved={() => toast.success("Draft saved")}
      >
        <NewPurchase.Header />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-5">
            <NewPurchase.Details />
            <NewPurchase.Lines />
            <NewPurchase.Narration />
            <NewPurchase.JournalPreview />
          </div>

          <NewPurchase.Summary />
        </div>
      </NewPurchase>
    </TooltipProvider>
  );
}

// So we need to Fix the Purchase Page for the Application