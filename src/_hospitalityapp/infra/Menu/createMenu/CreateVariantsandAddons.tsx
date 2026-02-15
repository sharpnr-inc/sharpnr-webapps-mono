import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveLeft, PlusIcon } from "lucide-react";

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
  useAddVariantGroupMutation,
  useAddVariantsInVariantGroup,
} from "../apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";

const CreateVariantsAndAddons = () => {
  const queryClient = useQueryClient();
  const { Menus, prevStep, ownersID } = useCreateMenuCtx();
  const activeItemID = useCreateMenuStore((s) => s.activeItemID);
  const [open, setOpen] = useState(false);
  const [openVariantForm, setOpenVariantForm] = useState(false);
  const addVariants = useAddVariantsInVariantGroup();

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
    defaultValues: {
      variant_group_id: "",
      menu_item_id: activeItemID,
      name: "",
      price: "",
    },

    onSubmit: ({ value }) => {
      const payload = {
        ...value,
        price: Number(value.price), // explicit conversion
      };

      console.log(payload);

      addVariants.mutateAsync(
        {
          ownersID: ownersID,
          request_payload: payload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["Menu", ownersID],
            });
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
        <div className="border p-4 rounded-2xl space-y-4">
          {/* Add Variant Group Button */}
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={() => {
                setOpen(true)
              }}
            >
              + Add Variant Group
            </Button>
          </div>

          {(() => {
            if (!activeItem) {
              return null;
            }

            if (
              !activeItem.variant_groups ||
              activeItem.variant_groups.length === 0
            ) {
              return (
                <div className="text-sm text-muted-foreground">
                  No variant groups available
                </div>
              );
            }

            return activeItem.variant_groups.map((vg) => {
              return (
                <div key={vg.id} className="border rounded-xl p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{vg.variant_group_name}</div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        addVariantsForm.setFieldValue(
                          "variant_group_id",
                          vg.id,
                        );
                        setOpenVariantForm(true);
                      }}
                    >
                      + Add Variant
                    </Button>
                  </div>

                  {/* Variants */}
                  {(() => {
                    if (!vg.variants || vg.variants.length === 0) {
                      return (
                        <div className="text-sm text-muted-foreground">
                          No variants available
                        </div>
                      );
                    }

                    return (
                      <div className="pl-2 space-y-2">
                        {vg.variants.map((variant) => {
                          return (
                            <div
                              key={variant.id}
                              className="flex justify-between items-center border rounded-lg p-2"
                            >
                              <div>{variant.name}</div>

                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  // handleEditVariant(variant.id)
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              );
            });
          })()}
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

      <Dialog open={openVariantForm} onOpenChange={setOpenVariantForm}>
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
              addVariantsForm.handleSubmit();
            }}
          >
            <addVariantsForm.AppField
              name="name"
              children={(f) => {
                return <f.TextField label="Variants Name" />;
              }}
            />

            <addVariantsForm.AppField
              name="price"
              children={(f) => {
                return <f.TextField label="Variants Price" />;
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
