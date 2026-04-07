import { PurchaseContext } from "./PurchaseContext";
import { cn } from "@/lib/utils";
import { useReset, useSubmit } from "./store/PurchaseForm.selectors";

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
  const submit = useSubmit();
  const reset = useReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await submit(async (values) => {
      onPosted?.();
      reset();
    });
  };
  return (
    <PurchaseContext.Provider value={{ onBack, onPosted, onDraftSaved }}>
      <form onSubmit={handleSubmit} noValidate>
        <div className={cn("p-3", className)}>{children}</div>
      </form>
    </PurchaseContext.Provider>
  );
}
