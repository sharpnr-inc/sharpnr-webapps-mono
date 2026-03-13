import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormsModal } from "@/context/FormModalContext";
import { AddTaxCategoryForm } from "./AddTaxCategoryForm";
import { useTaxCodeStore } from "./store/tax_code.store";

export function Codes() {
  const { showModal, closeModal } = useFormsModal();

  const categories = useTaxCodeStore((s) => s.taxCategories);
  const selectTaxCategory = useTaxCodeStore((s) => s.selectTaxCategory);

  const handleAddTaxCategory = () => {
    showModal(
      "Add Tax Code/Category",
      "something",
      <AddTaxCategoryForm closeModal={closeModal} />,
    );
  };

  const isEmpty = categories.length === 0;

  return (
    <aside className="border-r h-[90vh] flex flex-col">
      {/* Header */}
      <div className="p-3 border-b flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          Tax Categories
        </span>

        <Button onClick={handleAddTaxCategory} variant="secondary">
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
            className="w-full border p-2 pl-8 text-[11px] outline-none"
          />
        </div>
      </div>

      <ScrollArea className="max-h-[70vh]">
        <nav className="flex flex-col overflow-y-auto p-3 gap-2">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <Inbox className="h-8 w-8 opacity-40" />

              <p className="text-sm font-medium">No Tax Codes</p>

              <Button size="sm" onClick={handleAddTaxCategory}>
                <Plus size={14} />
                Add Category
              </Button>
            </div>
          ) : (
            categories.map((cat) => (
              <Card
                key={cat.id}
                onClick={() => selectTaxCategory(cat)}
                className="text-sm p-3 transition-transform duration-200 hover:scale-105 cursor-pointer"
              >
                <CardHeader className="p-0">
                  <CardTitle className="text-sm">{cat.code}</CardTitle>

                  <CardDescription className="text-xs">
                    {cat.category_name}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          )}
        </nav>
      </ScrollArea>
    </aside>
  );
}
