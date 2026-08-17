import { PurchaseContext } from "./PurchaseContext";
import { cn } from "@/lib/utils";
import { useReset, useSubmit } from "./store/PurchaseForm.selectors";
import { useLegalEntitySuppliers } from "../../api/queries/suppliers";
import { useAccountingStore } from "@/store/accounting.store";
import { useLEAccountingBook } from "../../api/queries/books";
import { useLegalEntityInventories } from "../../api/queries/inventories";

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

    await submit(async () => {
      onPosted?.();
      reset();
    });
  };
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data } = useLegalEntitySuppliers(selectedLegalEntity?.id);
  const { data: legalEntities } = useLEAccountingBook(selectedLegalEntity?.id);
  const { data: inventory } = useLegalEntityInventories(
    selectedLegalEntity?.id,
  );

  return (
    <PurchaseContext.Provider
      value={{
        onBack,
        onPosted,
        onDraftSaved,
        suppliers: data?.data,
        accountingBooks: legalEntities?.data,
        inventories: inventory?.data,
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className={cn("p-3", className)}>{children}</div>
      </form>
    </PurchaseContext.Provider>
  );
}
