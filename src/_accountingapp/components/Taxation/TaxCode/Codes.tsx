import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search, Inbox } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormsModal } from "@/context/FormModalContext";
import { AddTaxCategoryForm } from "./AddTaxCategoryForm";
import { useLegalEntityAllTaxCategory } from "@/_orchestrator/legal_entity/api/legalEntity.api.queries";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";

export function Codes() {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const { showModal, closeModal } = useFormsModal();
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);
  const { data: taxCategory } = useLegalEntityAllTaxCategory(
    selectedLegalEntity?.id,
  );

  const handleAddTaxCategory = () => {
    showModal(
      "Add Tax Code/Category",
      "something",
      <AddTaxCategoryForm closeModal={closeModal} />,
    );
  };

  const categories = [
    {
      id: "1",
      code: "ROOM_RENT",
      desc: "Standard Room Revenue",
      status: "mapped",
    },
    {
      id: "2",
      code: "FOOD_BEV",
      desc: "Restaurant & Dining",
      status: "mapped",
    },
    {
      id: "3",
      code: "LIQUOR",
      desc: "Bar Sales (High Tax)",
      status: "unmapped",
    },
  ];

  const isEmpty = categories.length === 0;

  return (
    <div>
      <aside className=" border-r h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Tax Categories
          </span>

          <Button
            onClick={() => {
              (setIsAddingCategory(true), handleAddTaxCategory());
            }}
            variant={"secondary"}
            className=" border border-transparent transition-all"
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search size={14} className="absolute left-2 top-2.5 opacity-40" />
            <input
              type="text"
              placeholder="Filter codes..."
              className="w-full border p-2 pl-8 text-[11px] focus:ring-1 focus:ring-black outline-none"
            />
          </div>
        </div>

        <ScrollArea className="max-h-[70vh]">
          <nav className="flex flex-col overflow-y-auto p-3 gap-2">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-10 space-y-3">
                <Inbox className="h-8 w-8 opacity-40" />

                <div className="space-y-1">
                  <p className="text-sm font-medium">No Tax Codes</p>
                  <p className="text-xs text-muted-foreground">
                    Create your first tax category to get started.
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={() => setIsAddingCategory(true)}
                  className="gap-2"
                >
                  <Plus size={14} />
                  Add Category
                </Button>
              </div>
            ) : (
              categories.map((cat) => (
                <Card
                  key={cat.id}
                  className="text-sm p-3 transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
                >
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm">{cat.code}</CardTitle>
                    <CardDescription className="text-xs">
                      {cat.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))
            )}
          </nav>
        </ScrollArea>
      </aside>
    </div>
  );
}
