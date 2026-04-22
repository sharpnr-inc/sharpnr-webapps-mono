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
import {
  useAddMenuItemMutation,
  useAddPreferredKitchenToMenuSubCategoryMutation,
} from "../../infra/apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/app/property/api/queries";

const CreateItem = () => {
  const queryClient = useQueryClient();
  const { Menus, prevStep, nextStep, ownersID, propertyID } =
    useCreateMenuCtx();

  const activeSubCategoryID = useCreateMenuStore((s) => s.activeSubCategoryID);
  const activeMenu = useCreateMenuStore((s) => s.activeMenu?.id);

  const [open, setOpen] = useState(false);

  const { data: propertyData } = usePropertyDetails(propertyID!);
  const kitchens = propertyData?.data?.infra ?? [];

  const { mutateAsync, isPending } =
    useAddPreferredKitchenToMenuSubCategoryMutation();

  const activeSubCategory = Menus?.flatMap((m) => m.categories)
    .flatMap((c) => c.sub_categories)
    .find((sc) => sc.id === activeSubCategoryID);

  const preferredKitchen = kitchens.find(
    (k: any) => k.id === activeSubCategory?.preferred_kitchen,
  );

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
          ownersID,
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

  const handleAddPreferredKitchenToMenuSubCategory = async (
    kitchenID: string,
  ) => {
    await mutateAsync({
      ownersID,
      payload: {
        menu_sub_category_id: activeSubCategory?.id,
        kitchen_id: kitchenID,
      },
    });

    queryClient.invalidateQueries({
      queryKey: ["Menu", ownersID],
    });
  };

  return (
    <div>
      <Card className="rounded-2xl shadow-sm border">
        {/* HEADER */}
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

        {/* KITCHEN ROUTING */}
        <CardContent className="border-t pt-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Kitchen Routing
            </h3>

            {preferredKitchen ? (
              <div className="rounded-xl border bg-muted/30 p-3 text-sm flex items-center justify-between">
                <span>{preferredKitchen.name}</span>

                {!preferredKitchen.status && (
                  <span className="text-xs text-red-500">(Inactive)</span>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground">
                No preferred kitchen selected.
                <div className="text-xs mt-1">
                  If none is selected, items route to the restaurant default
                  kitchen.
                </div>
              </div>
            )}

            <Select
              value={activeSubCategory?.preferred_kitchen ?? ""}
              onValueChange={handleAddPreferredKitchenToMenuSubCategory}
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

        {/* ITEMS */}
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
                      className="cursor-pointer rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
                      onClick={() => {
                        createMenuAction.setActiveItem(item.id);
                        nextStep();
                      }}
                    >
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

                      <CardContent className="px-4 pb-4 space-y-3">
                        <div className="text-sm font-semibold">
                          ₹ {item.base_price}
                        </div>
                      </CardContent>

                      <CardFooter className="px-4 pb-4 text-xs">
                        <div className="border rounded-3xl px-2 py-1 text-muted-foreground">
                          Served by:{" "}
                          {preferredKitchen?.name ?? "Default Kitchen"}
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

      {/* CREATE ITEM DIALOG */}
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
            <form.AppField name="name">
              {(f) => <f.TextField label="Item Name" />}
            </form.AppField>

            <form.AppField name="description">
              {(f) => <f.TextAreaField label="Item Description" />}
            </form.AppField>

            <div className="grid grid-cols-2 gap-4">
              <form.AppField name="unit">
                {(f) => <f.TextField label="Item Unit" />}
              </form.AppField>

              <form.AppField name="base_price">
                {(f) => <f.NumberField label="Base Price" />}
              </form.AppField>
            </div>

            <form.AppField name="dietary_type">
              {(f) => (
                <f.SelectField
                  placeholder="Select Food Type"
                  options={DietaryTypeSelectOptions}
                />
              )}
            </form.AppField>

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
