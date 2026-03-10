import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, MoveLeft, PlusIcon } from "lucide-react";

import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/create-menu_store";
import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useAddAddOnsOfMenuItem,
  useAddPreferredKitchenToMenuItemMutation,
  useAddVariantGroupMutation,
  useAddVariantsInVariantGroup,
} from "../apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/_orchestrator/properties/property/api/queries";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreateVariantsAndAddons = () => {
  const queryClient = useQueryClient();
  const { Menus, prevStep, ownersID, propertyID } = useCreateMenuCtx();
  const activeItemID = useCreateMenuStore((s) => s.activeItemID);

  const [open, setOpen] = useState(false);
  const [openVariantForm, setOpenVariantForm] = useState(false);
  const [openAddOnForm, setOpenAddOnForm] = useState(false);

  const { data: propertyData } = usePropertyDetails(propertyID!);
  const kitchens = propertyData?.data?.infra ?? [];

  const addVariants = useAddVariantsInVariantGroup();
  const { mutateAsync, isPending } = useAddPreferredKitchenToMenuItemMutation();

  const activeItem = useMemo(() => {
    return Menus?.flatMap((m) => m.categories)
      .flatMap((c) => c.sub_categories)
      .flatMap((sc) => sc.menu_items)
      .find((item) => item.id === activeItemID);
  }, [Menus, activeItemID]);

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
        { ownersID, request_payload: value },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Menu", ownersID] });
            addVariantGroupForm.reset();
            setOpen(false);
          },
        },
      );
    },
  });

  const addAddOns = useAddAddOnsOfMenuItem();

  const addAddonsForm = useAppForm({
    defaultValues: {
      menu_item_id: activeItemID,
      name: "",
      price: "",
    },
    onSubmit: ({ value }) => {
      const payload = { ...value, price: Number(value.price) };

      addAddOns.mutateAsync(
        { ownersID, payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Menu", ownersID] });
            setOpenAddOnForm(false);
          },
        },
      );
    },
  });

  const addVariantsForm = useAppForm({
    defaultValues: {
      variant_group_id: "",
      menu_item_id: activeItemID,
      name: "",
      price: "",
    },
    onSubmit: ({ value }) => {
      const payload = { ...value, price: Number(value.price) };

      addVariants.mutateAsync(
        { ownersID, request_payload: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Menu", ownersID] });
            setOpenVariantForm(false);
          },
        },
      );
    },
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

  const handleAddPreferredKitchentoMenuItem = async (
    activeItemID: string,
    kitchenID: string,
  ) => {
    await mutateAsync({
      ownersID: ownersID,
      payload: {
        menu_item_id: activeItemID,
        kitchen_id: kitchenID,
      },
    });
  };

  return (
    <Card className="">
      {/* HEADER */}
      <CardHeader className="space-y-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => prevStep()}
          className="w-fit"
        >
          <MoveLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {path && (
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">{path.categoryName}</span>
            {"  ›  "}
            <span className="font-medium">{path.subCategoryName}</span>
            {"  ›  "}
            <span className="text-foreground">{path.itemName}</span>
          </div>
        )}

        <CardTitle className="text-xl">{activeItem.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <div>Preferred Kitchen for this Menu Item</div>
          <div>Kitchen</div>
          <Select
            value={activeItem.served_by ?? ""}
            onValueChange={(kitchenID) =>
              handleAddPreferredKitchentoMenuItem(activeItem.id, kitchenID)
            }
            disabled={isPending}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Kitchen" />
            </SelectTrigger>

            <SelectContent>
              {kitchens.map((kitchen: any) => (
                <SelectItem key={kitchen.id} value={kitchen.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{kitchen.name}</span>

                    {!kitchen.status && (
                      <span className="text-xs text-red-500 ml-2">
                        (Inactive)
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardContent className="space-y-6 overflow-auto max-h-[75vh]">
        {/* ITEM INFO */}
        <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
          <div className="text-sm text-muted-foreground">Description</div>
          <div className="text-sm font-medium">
            {activeItem.description || "No description provided"}
          </div>

          <div className="text-sm font-semibold pt-1">
            Base Price: ₹ {activeItem.base_price}
          </div>

          <Alert variant="suggestion">
            <Lightbulb className="h-4 w-4" />

            <AlertTitle>Suggested Price Adjustment</AlertTitle>

            <AlertDescription className="space-y-3">
              Based on ingredient cost and tax configuration, this menu item may
              be underpriced.
              {/* Suggestion Card */}
              <div className="rounded-md border bg-background p-3 mt-2 w-full">
                <div className="grid grid-cols-3 gap-4 text-sm w-full">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      Current Price
                    </span>
                    <span className="font-semibold">₹180</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      Suggested Price
                    </span>
                    <span className="font-semibold text-blue-700">₹240</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      Reason
                    </span>
                    <span className="font-medium">Low margin (22%)</span>
                  </div>
                </div>

                <div className="mt-3 border-t pt-2 text-xs text-muted-foreground">
                  Note: This suggestion is automatically generated by the system
                  based on ingredient cost, tax configuration, and target profit
                  margins. Please review before applying.
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* VARIANT GROUPS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Variant Groups</h3>

            <Button size="sm" onClick={() => setOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Group
            </Button>
          </div>

          {!activeItem.variant_groups?.length && (
            <div className="text-sm text-muted-foreground border rounded-xl p-4 text-center">
              No variant groups available
            </div>
          )}

          {activeItem.variant_groups?.map((vg) => (
            <div key={vg.id} className="border rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{vg.variant_group_name}</div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    addVariantsForm.setFieldValue("variant_group_id", vg.id);
                    setOpenVariantForm(true);
                  }}
                >
                  + Add Variant
                </Button>
              </div>

              {!vg.variants?.length && (
                <div className="text-sm text-muted-foreground">
                  No variants available
                </div>
              )}

              <div className="space-y-2">
                {vg.variants?.map((variant) => (
                  <div
                    key={variant.id}
                    className="flex justify-between items-center border rounded-lg px-3 py-2"
                  >
                    <span className="text-sm">{variant.name}</span>

                    <span className="text-sm font-medium">
                      + ₹ {variant.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ADDONS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">AddOns</h3>

            <Button size="sm" onClick={() => setOpenAddOnForm(true)}>
              <PlusIcon className="h-4 w-4 mr-1" />
              Add AddOn
            </Button>
          </div>

          {!activeItem.add_ons?.length && (
            <div className="text-sm text-muted-foreground border rounded-xl p-4 text-center">
              No AddOns available
            </div>
          )}

          {activeItem.add_ons?.map((a) => (
            <div
              key={a.id}
              className="border rounded-lg px-3 py-2 flex justify-between"
            >
              <span className="text-sm font-medium">{a.name}</span>
              <span className="text-sm">+ ₹ {a.price}</span>
            </div>
          ))}
        </div>
      </CardContent>

      {/* ADD VARIANT GROUP */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Variant Group</DialogTitle>
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
              children={(f) => <f.TextField label="Variant Group Name" />}
            />

            <DialogFooter>
              <addVariantGroupForm.AppForm>
                <addVariantGroupForm.SubmitButton>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Group
                </addVariantGroupForm.SubmitButton>
              </addVariantGroupForm.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD VARIANT */}
      <Dialog open={openVariantForm} onOpenChange={setOpenVariantForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Variant</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addVariantsForm.handleSubmit();
            }}
          >
            <addVariantsForm.AppField
              name="name"
              children={(f) => <f.TextField label="Variant Name" />}
            />

            <addVariantsForm.AppField
              name="price"
              children={(f) => <f.TextField label="Variant Price" />}
            />

            <DialogFooter>
              <addVariantsForm.AppForm>
                <addVariantsForm.SubmitButton>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Variant
                </addVariantsForm.SubmitButton>
              </addVariantsForm.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD ADDON */}
      <Dialog open={openAddOnForm} onOpenChange={setOpenAddOnForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create AddOn</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addAddonsForm.handleSubmit();
            }}
          >
            <addAddonsForm.AppField
              name="name"
              children={(f) => <f.TextField label="AddOn Name" />}
            />

            <addAddonsForm.AppField
              name="price"
              children={(f) => <f.TextField label="AddOn Price" />}
            />

            <DialogFooter>
              <addAddonsForm.AppForm>
                <addAddonsForm.SubmitButton>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add AddOn
                </addAddonsForm.SubmitButton>
              </addAddonsForm.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CreateVariantsAndAddons;
