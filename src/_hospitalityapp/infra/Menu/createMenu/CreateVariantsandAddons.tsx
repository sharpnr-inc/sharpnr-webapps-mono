import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveLeft, PlusIcon } from "lucide-react";

import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { DietaryType } from "@/lib/create_menu";
import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddVariantGroupMutation } from "../apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";

export const DietaryColorMap = {
  [DietaryType.VEGETARIAN]: "bg-green-600",
  [DietaryType.NON_VEGETARIAN]: "bg-red-600",
  [DietaryType.VEGAN]: "bg-emerald-500",
  [DietaryType.EGG]: "bg-yellow-500",
  [DietaryType.JAIN]: "bg-lime-500",
  [DietaryType.GLUTEN_FREE]: "bg-blue-500",
} as const;

const CreateVariantsAndAddons = () => {
  const queryClient = useQueryClient();
  const { Menus, prevStep, ownersID } = useCreateMenuCtx();
  const activeItemID = useCreateMenuStore((s) => s.activeItemID);
  const [open, setOpen] = useState(false);

  // Find Active Item from Menus tree
  const activeItem = useMemo(() => {
    return Menus?.flatMap((m) => m.categories)
      .flatMap((c) => c.sub_categories)
      .flatMap((sc) => sc.menu_items)
      .find((item) => item.id === activeItemID);
  }, [Menus, activeItemID]);

  // Build breadcrumb path
  const path = useMemo(() => {
    if (!Menus || !activeItemID) return null;

    for (const m of Menus) {
      for (const c of m.categories) {
        for (const sc of c.sub_categories) {
          const item = sc.menu_items.find((i) => i.id === activeItemID);
          if (item) {
            return {
              categoryName: c.category_name,
              subCategoryName: sc.sub_cat_name,
              itemName: item.name,
            };
          }
        }
      }
    }
    return null;
  }, [Menus, activeItemID]);

  const addVariantGroup = useAddVariantGroupMutation();

  const addVariantGroupForm = useAppForm({
    defaultValues: {
      menu_item_id: activeItemID,
      variant_group_name: "",
    },

    onSubmit: ({ value }) => {
      addVariantGroup.mutateAsync(
        {
          ownersID: ownersID,
          request_payload: value,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["Menu", ownersID],
            });
            addVariantGroupForm.reset();
            setOpen(false);
          },
        },
      );
    },
  });

  const addAddonsForm = useAppForm({
    defaultValues: {
      variant_group_id: "",
      menu_item_id: "",
      name: "",
      price: "",
    },
  });

  const addVariantsForm = useAppForm({
    defaultValues:{
    
    }
  });

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
        </div>
      </CardHeader>

      <CardContent className="space-y-4 overflow-auto max-h-[75vh]">
        {/* Item Details */}
        <div>
          <div className="   text-sm text-muted-foreground">Description</div>
          <div className="text-sm font-semibold ">{activeItem.description}</div>

          <div className="mt-2 font-semibold">
            Base Price: ₹ {activeItem.base_price}
          </div>
        </div>

        {/* Variants */}
        <div>
          <div className="space-y-2">
            {activeItem.variant_groups?.length ? (
              activeItem.variant_groups.flatMap((vg) =>
                vg.variants.map((v) => (
                  <div
                    key={v.id}
                    className="border rounded p-2 flex justify-between"
                  >
                    <div className="font-medium text-sm">{v.name}</div>
                    <div className="text-sm">+ ₹ {v.price}</div>
                  </div>
                )),
              )
            ) : (
              <div className="text-xs text-muted-foreground">No Variants</div>
            )}
          </div>
          <Button onClick={() => setOpen(true)}>Add Variants</Button>
        </div>

        {/* AddOns */}
        <div>
          <div className="space-y-2">
            {activeItem.add_ons?.length ? (
              activeItem.add_ons.map((a) => (
                <div
                  key={a.id}
                  className="border rounded p-2 flex justify-between"
                >
                  <div className="font-medium text-sm">{a.name}</div>
                  <div className="text-sm">+ ₹ {a.price}</div>
                </div>
              ))
            ) : (
              <div className="text-xs text-muted-foreground">No AddOns</div>
            )}
          </div>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Variant group in the {activeItem.name}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addVariantGroupForm.handleSubmit();
            }}
          >
            <addVariantGroupForm.AppField
              name="variant_group_name"
              children={(f) => {
                return <f.TextField label="Variants Group Name" />;
              }}
            />

            <DialogFooter>
              <addVariantGroupForm.AppForm>
                <addVariantGroupForm.SubmitButton>
                  <PlusIcon />
                  Add Variant group
                </addVariantGroupForm.SubmitButton>
              </addVariantGroupForm.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CreateVariantsAndAddons;
