import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/create-menu_store";
import { Button } from "@/components/ui/button";
import { MoveLeft, PlusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createMenuAction } from "../stores/actions";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAppForm } from "@/components/forms";
import {
  DietaryType,
  type DietaryType as DietaryTypeUnion,
} from "@/lib/create_menu";
import { useAddMenuItemMutation } from "../apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateItem = () => {
  const queryClient = useQueryClient();
  const { Menus, prevStep, nextStep, ownersID } = useCreateMenuCtx();
  const activeSubCategoryID = useCreateMenuStore((s) => s.activeSubCategoryID);
  const activeMenu = useCreateMenuStore((s) => s.activeMenu?.id);
  const [open, setOpen] = useState(false);

  const activeSubCategory = Menus?.flatMap((m) => m.categories)
    .flatMap((c) => c.sub_categories)
    .find((sc) => sc.id === activeSubCategoryID);

  const items = activeSubCategory?.menu_items ?? [];

  const DietaryTypeSelectOptions = [
    { label: "Vegetarian", value: DietaryType.VEGETARIAN },
    { label: "Non-Vegetarian", value: DietaryType.NON_VEGETARIAN },
    { label: "Vegan", value: DietaryType.VEGAN },
    { label: "Contains Egg", value: DietaryType.EGG },
    { label: "Jain", value: DietaryType.JAIN },
    { label: "Gluten Free", value: DietaryType.GLUTEN_FREE },
  ];

  const addMenuItem = useAddMenuItemMutation();

  const form = useAppForm({
    defaultValues: {
      menu_id: activeMenu,
      menu_sub_category_id: activeSubCategoryID,
      name: "",
      description: "",
      unit: "",
      base_price: 0,
      dietary_type: "" as DietaryTypeUnion | "",
    },
    onSubmit: ({ value }) => {
      addMenuItem.mutateAsync(
        {
          ownersID: ownersID,
          request_payload: {
            ...value,
            base_price: Number(value.base_price),
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["Menu", ownersID],
            });
            form.reset();
            setOpen(false);
          },
        },
      );
    },
  });

  return (
    <div>
      <Card className="rounded-2xl shadow-sm border">
        {/* ================= HEADER ================= */}
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={prevStep}>
              <MoveLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div>
              <CardTitle className="text-2xl font-semibold">
                {activeSubCategory
                  ? activeSubCategory.sub_cat_name
                  : "Select SubCategory"}
              </CardTitle>
              <CardDescription className="mt-1">
                {activeSubCategory?.sub_cat_description || "Select SubCategory"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* ================= KITCHEN SECTION ================= */}
        <CardContent className="border-t pt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Kitchen Routing
            </h3>

            {activeSubCategory?.preferred_kitchen ? (
              <div className="rounded-xl border bg-muted/30 p-3 text-sm">
                This sub-category is linked to a preferred kitchen.
              </div>
            ) : (
              <div className="rounded-xl border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground">
                No preferred kitchen selected.
                <div className="text-xs mt-1">
                  Note: If no preferred kitchen is selected, menu items will
                  automatically route to the restaurant’s default preferred
                  kitchen.
                </div>
              </div>
            )}

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Kitchen (Optional)" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="kitchen-1">Main Kitchen</SelectItem>
                <SelectItem value="kitchen-2">Bar Kitchen</SelectItem>
                <SelectItem value="kitchen-3">Outdoor Kitchen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        {/* ================= ITEMS SECTION ================= */}
        <CardContent className="space-y-6">
          {items.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No Items Found
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Add items to start building your menu.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {items.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card
                      className="
                      cursor-pointer rounded-xl
                      transition-all duration-200
                      hover:shadow-lg hover:-translate-y-1
                      hover:border-primary/50
                    "
                      onClick={() => {
                        createMenuAction.setActiveItem(item.id);
                        nextStep();
                      }}
                    >
                      {/* ITEM HEADER */}
                      <CardHeader className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold truncate">
                            {item.name}
                          </CardTitle>

                          <span className="text-xs text-muted-foreground">
                            {item.dietary_type}
                          </span>
                        </div>

                        <CardDescription className="text-xs line-clamp-2">
                          {item.description || "No description provided"}
                        </CardDescription>
                      </CardHeader>

                      {/* ITEM BODY */}
                      <CardContent className="px-4 pb-4 space-y-3">
                        <div className="text-sm font-semibold">
                          ₹ {item.base_price}
                        </div>

                        {/* Variants */}
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">
                            Variants
                          </div>

                          <div className="space-y-1 max-h-24 overflow-auto">
                            {item.variant_groups?.length ? (
                              item.variant_groups.flatMap((vg) =>
                                vg.variants.map((v) => (
                                  <div
                                    key={v.id}
                                    className="flex justify-between text-xs border rounded-md px-2 py-1"
                                  >
                                    <span>{v.name}</span>
                                    <span>+ ₹ {v.price}</span>
                                  </div>
                                )),
                              )
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                No Variants
                              </div>
                            )}
                          </div>
                        </div>

                        {/* AddOns */}
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">
                            AddOns
                          </div>

                          <div className="space-y-1 max-h-24 overflow-auto">
                            {item.add_ons?.length ? (
                              item.add_ons.map((a) => (
                                <div
                                  key={a.id}
                                  className="flex justify-between text-xs border rounded-md px-2 py-1"
                                >
                                  <span>{a.name}</span>
                                  <span>+ ₹ {a.price}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-muted-foreground">
                                No AddOns
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>

                      {/* ITEM FOOTER */}
                      <CardFooter className="px-4 pb-4 text-xs">
                        <div className="border rounded-3xl px-2 py-1 text-muted-foreground">
                          Served by: Main Kitchen
                        </div>
                      </CardFooter>
                    </Card>
                  </TooltipTrigger>

                  <TooltipContent>
                    Click to edit Item, Variants or AddOns
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </CardContent>

        {/* ================= FOOTER ================= */}
        <CardFooter className="border-t pt-6">
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Item in {activeSubCategory?.sub_cat_name}
          </Button>
        </CardFooter>
      </Card>

      {/* ================= DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Item In Menu</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.AppField
              name="name"
              children={(f) => <f.TextField label="Item Name" />}
            />

            <form.AppField
              name="description"
              children={(f) => <f.TextAreaField label="Item Description" />}
            />

            <div className="grid grid-cols-2 gap-4">
              <form.AppField
                name="unit"
                children={(f) => <f.TextField label="Item Unit" />}
              />

              <form.AppField
                name="base_price"
                children={(f) => <f.NumberField label="Base Price" />}
              />
            </div>

            <form.AppField
              name="dietary_type"
              children={(f) => (
                <f.SelectField
                  placeholder="Select Food Type"
                  options={DietaryTypeSelectOptions}
                />
              )}
            />

            <DialogFooter>
              <form.AppForm>
                <form.SubmitButton>Create Item</form.SubmitButton>
              </form.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateItem;
