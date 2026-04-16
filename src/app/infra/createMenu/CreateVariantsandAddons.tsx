import { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MoveLeft,
  PlusIcon,
  ChefHat,
  Layers,
  Puzzle,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Receipt,
  PackagePlus,
} from "lucide-react";
import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/create-menu_store";
import { useAddPreferredKitchenToMenuItemMutation } from "../apis/api.Mutations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/_orchestrator/properties/property/api/queries";
import { AddAddOnFormInMenuItem } from "./forms/AddAddon";
import { AddVariantForm } from "./forms/AddVariant";
import { AddVariantGroupForm } from "./forms/AddVariantGroup";
import type {
  AddOnResponse,
  MenuItemResponse,
  VariantGroupResponse,
} from "../apis/api.service";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateVariantsAndAddons = () => {
  const { Menus, prevStep, ownersID, propertyID } = useCreateMenuCtx();
  const activeItemID = useCreateMenuStore((s) => s.activeItemID);
  const [open, setOpen] = useState(false);
  const [openVariantForm, setOpenVariantForm] = useState(false);
  const [openAddOnForm, setOpenAddOnForm] = useState(false);
  const [variantGroupID, setVariantGroupID] = useState<string | null>(null);

  const { data: propertyData } = usePropertyDetails(propertyID!);
  const kitchens = propertyData?.data?.infra ?? [];

  const { mutateAsync, isPending } = useAddPreferredKitchenToMenuItemMutation();

  const activeItem = useMemo(() => {
    return Menus?.flatMap((m) => m.categories)
      .flatMap((c) => c.sub_categories)
      .flatMap((sc) => sc.menu_items)
      .find((item: any) => item.id === activeItemID);
  }, [Menus, activeItemID]);

  const path = useMemo(() => {
    if (!Menus || !activeItemID) return null;
    for (const m of Menus) {
      for (const c of m.categories) {
        for (const sc of c.sub_categories) {
          const item = sc.menu_items.find(
            (i: MenuItemResponse) => i.id === activeItemID,
          );
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

  if (!activeItem) {
    return (
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-col items-center justify-center py-16 gap-3">
          <PackagePlus className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No item selected.</p>
        </CardHeader>
      </Card>
    );
  }

  const handleAddPreferredKitchentoMenuItem = async (
    activeItemID: string,
    kitchenID: string,
  ) => {
    await mutateAsync({
      ownersID,
      payload: {
        menu_item_id: activeItemID,
        kitchen_id: kitchenID,
      },
    });
  };

  const taxList = activeItem.tax_details || activeItem.tax_category || [];
  const hasTaxes = taxList.length > 0;

  const totalTax = taxList.reduce(
    (sum: number, tax: any) =>
      sum + (activeItem.base_price * tax.tax_rate) / 100,
    0,
  );
  const totalPrice = activeItem.base_price + totalTax;

  const assignedKitchen = kitchens.find(
    (k: any) => k.id === activeItem.served_by,
  );

  return (
    <>
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        {/* ── Top Header ─────────────────────────────────── */}
        <div className="bg-muted/40 border-b px-5 py-4 space-y-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => prevStep()}
            className="h-7 gap-1.5 text-xs px-2 -ml-1 text-muted-foreground hover:text-foreground"
          >
            <MoveLeft className="h-3.5 w-3.5" />
            Back
          </Button>

          {path && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
              <span className="font-medium text-foreground/70">
                {path.categoryName}
              </span>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="font-medium text-foreground/70">
                {path.subCategoryName}
              </span>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="font-semibold text-foreground">
                {path.itemName}
              </span>
            </div>
          )}

          <div className="flex items-start justify-between gap-3">
            <h1 className="text-lg font-bold text-foreground leading-tight">
              {activeItem.name}
            </h1>
            <Badge variant="outline" className="shrink-0 text-xs font-mono">
              ₹{activeItem.base_price.toFixed(2)}
            </Badge>
          </div>
        </div>

        <ScrollArea className="h-[75vh]">
          {/* ── Item Info + Pricing ─────────────────────── */}
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-blue-50 p-1.5">
                <Receipt className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <h3 className="text-sm font-semibold">Item Details</h3>
            </div>

            {activeItem.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeItem.description}
              </p>
            )}

            {/* Pricing breakdown card */}
            <div className="rounded-xl border bg-muted/20 overflow-hidden">
              <div className="flex justify-between items-center px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">Base Price</span>
                <span className="font-semibold">
                  ₹{activeItem.base_price.toFixed(2)}
                </span>
              </div>

              {hasTaxes ? (
                <>
                  <Separator />
                  {taxList.map((tax: any, index: number) => {
                    const taxAmount =
                      (activeItem.base_price * tax.tax_rate) / 100;
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center px-4 py-2 text-xs text-muted-foreground"
                      >
                        <span>
                          {tax.tax_component_name} ({tax.tax_rate}%)
                        </span>
                        <span>+ ₹{taxAmount.toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <Separator />
                  <div className="flex justify-between items-center px-4 py-2.5 bg-primary/5">
                    <span className="text-sm font-bold">Total (incl. tax)</span>
                    <span className="text-sm font-bold text-primary">
                      ₹{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Separator />
                  <div className="flex justify-between items-center px-4 py-2.5 text-xs text-muted-foreground italic">
                    <span>Tax</span>
                    <span>No tax applicable</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Preferred Kitchen ──────────────────────── */}
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-orange-50 p-1.5">
                <ChefHat className="h-3.5 w-3.5 text-orange-500" />
              </div>
              <h3 className="text-sm font-semibold">Preferred Kitchen</h3>
            </div>

            {assignedKitchen ? (
              <div className="flex items-center justify-between rounded-xl border bg-emerald-50/50 border-emerald-100 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium">
                    {assignedKitchen.name}
                  </span>
                </div>
                {!assignedKitchen.status && (
                  <span className="inline-flex items-center gap-1 text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                    <AlertCircle className="h-3 w-3" />
                    Inactive
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-amber-200 bg-amber-50/50 px-3.5 py-2.5">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-xs text-amber-700">
                  No kitchen assigned — using the menu group's default.
                </span>
              </div>
            )}

            <Select
              value={activeItem.served_by ?? ""}
              onValueChange={(kitchenID) =>
                handleAddPreferredKitchentoMenuItem(activeItem.id, kitchenID)
              }
              disabled={isPending}
            >
              <SelectTrigger className="w-full h-9 text-sm">
                <SelectValue placeholder="Change kitchen…" />
              </SelectTrigger>

              <SelectContent>
                {kitchens.map((kitchen: any) => (
                  <SelectItem key={kitchen.id} value={kitchen.id}>
                    <div className="flex items-center justify-between w-full gap-3">
                      <span>{kitchen.name}</span>
                      {!kitchen.status && (
                        <span className="text-xs text-red-400">Inactive</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ── Variant Groups ─────────────────────────── */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-violet-50 p-1.5">
                  <Layers className="h-3.5 w-3.5 text-violet-500" />
                </div>
                <h3 className="text-sm font-semibold">Variant Groups</h3>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-xs"
                onClick={() => setOpen(true)}
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add Group
              </Button>
            </div>

            {!activeItem.variant_groups?.length ? (
              <div className="rounded-xl border border-dashed bg-muted/20 py-7 flex flex-col items-center text-center gap-2">
                <Layers className="h-5 w-5 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">
                  No variant groups yet.
                </p>
                <button
                  className="text-xs text-primary font-medium hover:underline underline-offset-2"
                  onClick={() => setOpen(true)}
                >
                  Add the first group
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeItem.variant_groups.map((vg: VariantGroupResponse) => (
                  <div
                    key={vg.id}
                    className="rounded-xl border overflow-hidden"
                  >
                    {/* Group header */}
                    <div className="flex items-center justify-between bg-muted/30 border-b px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {vg.variant_group_name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs px-1.5 py-0"
                        >
                          {vg.variants?.length ?? 0}
                        </Badge>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1 text-xs"
                        onClick={() => {
                          setVariantGroupID(vg.id);
                          setOpenVariantForm(true);
                        }}
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                        Add Variant
                      </Button>
                    </div>

                    {/* Variants list */}
                    {!vg.variants?.length ? (
                      <div className="px-4 py-3 text-xs text-muted-foreground italic">
                        No variants yet — add one above.
                      </div>
                    ) : (
                      <div className="divide-y">
                        {vg.variants.map((variant) => (
                          <div
                            key={variant.id}
                            className="flex justify-between items-center px-4 py-2.5"
                          >
                            <span className="text-sm">{variant.name}</span>
                            <span className="text-sm font-semibold text-primary">
                              + ₹{variant.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Add-Ons ────────────────────────────────── */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-sky-50 p-1.5">
                  <Puzzle className="h-3.5 w-3.5 text-sky-500" />
                </div>
                <h3 className="text-sm font-semibold">Add-Ons</h3>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-xs"
                onClick={() => setOpenAddOnForm(true)}
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add Add-On
              </Button>
            </div>

            {!activeItem.add_ons?.length ? (
              <div className="rounded-xl border border-dashed bg-muted/20 py-7 flex flex-col items-center text-center gap-2">
                <Puzzle className="h-5 w-5 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">No add-ons yet.</p>
                <button
                  className="text-xs text-primary font-medium hover:underline underline-offset-2"
                  onClick={() => setOpenAddOnForm(true)}
                >
                  Add the first add-on
                </button>
              </div>
            ) : (
              <div className="rounded-xl border overflow-hidden divide-y">
                {activeItem.add_ons.map((a: AddOnResponse) => (
                  <div
                    key={a.id}
                    className="flex justify-between items-center px-4 py-2.5"
                  >
                    <span className="text-sm font-medium">{a.name}</span>
                    <span className="text-sm font-semibold text-primary">
                      + ₹{a.price}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* ── Dialogs ─────────────────────────────────────── */}
      <AddVariantGroupForm
        open={open}
        setOpen={setOpen}
        ownersID={ownersID}
        menuItemID={activeItem.id}
      />

      <AddVariantForm
        open={openVariantForm}
        setOpen={setOpenVariantForm}
        ownersID={ownersID}
        menuItemID={activeItem.id}
        variantGroupID={variantGroupID ?? ""}
      />

      <AddAddOnFormInMenuItem
        open={openAddOnForm}
        setOpen={setOpenAddOnForm}
        ownersID={ownersID}
        menuItemID={activeItem.id}
      />
    </>
  );
};

export default CreateVariantsAndAddons;
