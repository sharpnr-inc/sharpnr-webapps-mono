import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Search, Inbox } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Codes() {
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Mock Data
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
    {
      id: "4",
      code: "SERVICE_CHG",
      desc: "Standard Service Fee",
      status: "mapped",
    },
  ];

  const isEmpty = categories.length === 0;

  return (
    <div>
      <aside className="w-80 border-r border-black flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-black flex items-center justify-between bg-black text-white">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Tax Categories
          </span>

          <button
            onClick={() => setIsAddingCategory(true)}
            className="p-1 hover:bg-zinc-800 border border-transparent active:border-white transition-all"
          >
            <Plus size={16} />
          </button>
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

        {/* Content */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
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
              <Card key={cat.id} className="text-sm p-3">
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
      </aside>
    </div>
  );
}
