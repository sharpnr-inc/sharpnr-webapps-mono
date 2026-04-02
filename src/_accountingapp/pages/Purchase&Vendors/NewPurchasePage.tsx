// Notes --> Inventory ID 

import { useLegalEntitySuppliers } from "@/_accountingapp/api/queries/suppliers";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";
import { useAppForm } from "@/components/forms";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

export function NewPurchasePage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data } = useLegalEntitySuppliers(selectedLegalEntity?.id);
  const supplierList = data?.data ?? [];

  const form = useAppForm({
    defaultValues: {
      suppliersID: "",
      AccountingBookID: "",
      InvoiceNumber: "",
      InvoiceDate: "",
    },
  });

  return (
    <div>
      <div className=" text-2xl">Purchases </div>
      <div className="flex flex-row gap-2">
        <div className="border">
          {/* Supplier Sections */}
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Supplier" />
              </SelectTrigger>

              <SelectContent>
                {supplierList.map((s: any) => {
                  return (
                    <SelectItem value={s.suppliers_id} key={s.suppliers_id}>
                      {s.suppliers_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div></div>
        </div>

        <div>{<div>{"Segment 1"}</div>}</div>
      </div>
    </div>
  );
}
