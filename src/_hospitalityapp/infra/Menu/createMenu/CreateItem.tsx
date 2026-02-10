import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuCtx } from "./create-menu.context";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { Button } from "@/components/ui/button";
import { MoveLeft, PlusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createMenuAction } from "../stores/CreateMenu/actions";
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

const CreateItem = () => {
  const { Menus, prevStep, nextStep } = useCreateMenuCtx();
  const activeSubCategoryID = useCreateMenuStore((s) => s.activeSubCategoryID);
  const [open, setOpen] = useState(false);

  const activeSubCategory = Menus?.flatMap((m) => m.categories)
    .flatMap((c) => c.sub_categories)
    .find((sc) => sc.id === activeSubCategoryID);

  const items = activeSubCategory?.menu_items ?? [];

  const DietaryTypeSelectOptions = [
    { label: "Vegetarian", value: DietaryType.VEG },
    { label: "Non-Vegetarian", value: DietaryType.NON_VEG },
    { label: "Vegan", value: DietaryType.VEGAN },
    { label: "Contains Egg", value: DietaryType.EGG },
  ];

  const form = useAppForm({
    defaultValues: {
      category_id: "",
      subCategoryID: "",
      item_name: "",
      item_description: "",
      base_price: 0,
      dietary_type: "" as DietaryTypeUnion | "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="border p-2">
      <Card>
        <CardHeader className="flex gap-5">
          <Button variant={"ghost"} onClick={() => prevStep()}>
            <MoveLeft />
            Back
          </Button>
          <div>
            <CardTitle>
              {activeSubCategory
                ? activeSubCategory.sub_cat_name
                : "Select SubCategory"}
            </CardTitle>
            <CardDescription>
              This is the Card for the Item Display of Selected Field
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {items.length === 0 && (
            <div className="text-sm text-muted-foreground">No Items Found</div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {items.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card
                      className="
            cursor-pointer
            transition-all
            hover:border-primary
            hover:bg-muted/40
          "
                      onClick={() => {
                        // later you can open edit modal here
                        console.log("Edit Item", item.id);
                        createMenuAction.setActiveItem(item.id);
                        nextStep();
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {item.name}
                          </CardTitle>

                          {/* <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-sm ${DietaryBadgeColor[item.dietaryType]}`}
                            />
                            <span className="text-xs text-muted-foreground">
                              {item.dietaryType}
                            </span>
                          </div> */}
                        </div>

                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="text-sm font-semibold">
                          Base Price: ₹ {item.base_price}
                        </div>

                        {/* Variants */}
                        <div>
                          <div className="text-xs font-medium text-muted-foreground mb-1">
                            Variants
                          </div>

                          <div className="space-y-1 max-h-28 overflow-auto">
                            {item.variant_groups?.length ? (
                              item.variant_groups.flatMap((vg) =>
                                vg.variants.map((v) => (
                                  <div
                                    key={v.id}
                                    className="flex justify-between text-sm border rounded-md px-2 py-1"
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

                          <div className="space-y-1 max-h-28 overflow-auto">
                            {item.add_ons?.length ? (
                              item.add_ons.map((a) => (
                                <div
                                  key={a.id}
                                  className="flex justify-between text-sm border rounded-md px-2 py-1"
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
                      <CardFooter className="text-xs ">
                        <div className="border rounded-3xl w-fit p-1 px-2">
                          Server by: Main Kitchen
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

        <Button className="m-3" onClick={() => setOpen(true)}>
          <PlusIcon /> {`Add Item in ${activeSubCategory?.sub_cat_name}`}
        </Button>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-6xl">
          <DialogHeader>
            <DialogTitle>Add Item In Menu</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppField
              name="item_name"
              children={(f) => {
                return <f.TextField label="Item Name" />;
              }}
            />
            <form.AppField
              name="item_description"
              children={(f) => {
                return <f.TextAreaField label="Item Description" />;
              }}
            />
            <form.AppField
              name="base_price"
              children={(f) => {
                return <f.NumberField label="Base Price" />;
              }}
            />

            <form.AppField
              name="dietary_type"
              children={(f) => {
                return (
                  <f.SelectField
                    placeholder="Select Food Type"
                    options={DietaryTypeSelectOptions}
                  />
                );
              }}
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
