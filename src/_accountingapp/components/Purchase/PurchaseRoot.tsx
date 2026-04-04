import { PurchaseContext } from "./PurchaseContext";
import { cn } from "@/lib/utils";

interface PurchaseRootProps {
  children: React.ReactNode;
  className?: string;
  onBack?: () => void;
  onPosted?: () => void;
  onDraftSaved?: () => void;
}

export function PurchaseRoot({
  children,
  className,
  onBack,
  onPosted,
  onDraftSaved,
}: PurchaseRootProps) {
  return (
    <PurchaseContext.Provider value={{ onBack, onPosted, onDraftSaved }}>
      <div className={cn("min-h-screen bg-muted/30 p-6", className)}>
        {children}
      </div>
    </PurchaseContext.Provider>
  );
}
