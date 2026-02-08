import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveLeft, Pencil, Plus } from "lucide-react";

import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { DietaryType } from "@/lib/create_menu";

const DietaryColorMap = {
  [DietaryType.VEG]: "bg-green-600",
  [DietaryType.NON_VEG]: "bg-red-600",
  [DietaryType.VEGAN]: "bg-emerald-500",
  [DietaryType.EGG]: "bg-yellow-500",
};

const CreateVariantsAndAddons = () => {
  const { dummyMenuData, prevStep } = useCreateMenuCtx();
  const activeItemID = useCreateMenuStore((s) => s.activeItemID);

  const [editMode, setEditMode] = useState(false);

  // Find Active Item
  const activeItem = useMemo(() => {
    return dummyMenuData.menuCategory
      .flatMap((c) => c.menuSubCategory)
      .flatMap((sc) => sc.menu_item)
      .find((item) => item.id === activeItemID);
  }, [dummyMenuData, activeItemID]);

  // Build Trail Path
  const path = useMemo(() => {
    if (!activeItemID) return null;

    for (const cat of dummyMenuData.menuCategory) {
      for (const sub of cat.menuSubCategory) {
        const item = sub.menu_item.find((i) => i.id === activeItemID);
        if (item) {
          return {
            categoryName: cat.name,
            subCategoryName: sub.name,
            itemName: item.name,
          };
        }
      }
    }
    return null;
  }, [dummyMenuData, activeItemID]);

  if (!activeItem) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select Item</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row justify-between items-start">
        <Button variant="ghost" onClick={() => prevStep()}>
          <MoveLeft />
          Back
        </Button>

        <div className="flex-1">
          {/* Trail */}
          {path && (
            <div className="text-xs text-muted-foreground mb-1">
              <span className="font-medium">{path.categoryName}</span>
              {"  ›  "}
              <span className="font-medium">{path.subCategoryName}</span>
              {"  ›  "}
              <span className="text-foreground">{path.itemName}</span>
            </div>
          )}

          <CardTitle>{activeItem.name}</CardTitle>

          <div className="flex items-center gap-2 mt-1">
            <div
              className={`w-3 h-3 rounded-sm ${
                DietaryColorMap[activeItem.dietaryType]
              }`}
            />
            <span className="text-xs">{activeItem.dietaryType}</span>
          </div>
        </div>

        <Button
          variant={editMode ? "secondary" : "outline"}
          size="sm"
          onClick={() => setEditMode((p) => !p)}
        >
          <Pencil size={16} />
          {editMode ? "Editing" : "Edit"}
        </Button>
      </CardHeader>

      <CardContent className="space-y-4 overflow-auto max-h-[75vh]">
        {/* Item Details */}
        <div className="border rounded p-2">
          <div className="text-sm font-semibold">Description</div>
          <div className="text-sm text-muted-foreground">
            {activeItem.description}
          </div>

          <div className="mt-2 font-semibold">
            Base Price: ₹ {activeItem.base_price}
          </div>
        </div>

        {/* Variants */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">Variants</div>

            {editMode && (
              <Button size="sm">
                <Plus size={14} /> Add Variant
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {activeItem.menuItemVariants.variants.map((v) => (
              <div
                key={v.id}
                className="border rounded p-2 flex justify-between"
              >
                <div>
                  <div className="font-medium text-sm">{v.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {v.description}
                  </div>
                </div>

                <div className="text-sm">+ ₹ {v.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AddOns */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">AddOns</div>

            {editMode && (
              <Button size="sm">
                <Plus size={14} /> Add AddOn
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {activeItem.addOns.map((a) => (
              <div
                key={a.id}
                className="border rounded p-2 flex justify-between"
              >
                <div className="font-medium text-sm">{a.name}</div>
                <div className="text-sm">+ ₹ {a.price}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateVariantsAndAddons;
