import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuStore } from "../stores/create-menu_store";
import { useCreateMenuCtx } from "./create-menu.context";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PlusIcon } from "lucide-react";
import { createMenuAction } from "../stores/actions";
import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAddSubCategoryInCategoryMutation } from "../apis/api.Mutations";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateSubCategory = () => {
  const queryClient = useQueryClient();
  const { Menus, prevStep, nextStep, ownersID } = useCreateMenuCtx();
  const activeCategoryID = useCreateMenuStore((s) => s.activeCategoryID);
  const [open, setOpen] = useState(false);

  // Find the active category from all menus
  const activeCat = Menus?.flatMap((m) => m.categories).find(
    (c) => c.id === activeCategoryID,
  );

  // Get its sub categories safely
  const subCategories = activeCat?.sub_categories ?? [];
  const addSubCategory = useAddSubCategoryInCategoryMutation();

  const form = useAppForm({
    defaultValues: {
      menu_category_id: activeCat?.id,
      sub_cat_name: "",
      sub_cat_description: "",
    },
    onSubmit: async ({ value }) => {
      addSubCategory.mutateAsync(
        {
          ownersID: ownersID,
          request_payload: value,
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
      <Card className="shadow-sm border rounded-2xl">
        {/* ================= HEADER ================= */}
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={prevStep}>
              <MoveLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div>
              <CardTitle className="text-2xl font-semibold">
                {activeCat ? activeCat.category_name : "Select Category"}
              </CardTitle>
              <CardDescription className="mt-1">
                {activeCat?.category_description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* ================= KITCHEN SECTION ================= */}
        <CardContent className="space-y-4 border-t pt-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Preferred Kitchen
            </h3>

            {activeCat?.preferred_kitchen ? (
              <div className="rounded-xl border bg-muted/30 p-3 text-sm">
                This category is linked to a specific kitchen.
              </div>
            ) : (
              <div className="rounded-xl border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground">
                No preferred kitchen selected.
                <div className="mt-1 text-xs">
                  Note: If no preferred kitchen is selected, menu items will
                  automatically route to the restaurant’s default preferred
                  kitchen.
                </div>
              </div>
            )}

            {/* Dummy Select */}
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

        {/* ================= SUB CATEGORY SECTION ================= */}
        <CardContent className="space-y-6">
          {subCategories.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No Sub-Categories Found
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Create a sub-category to organize your menu items.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Subcategories of {activeCat?.category_name}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {subCategories.map((sc) => (
                  <Card
                    key={sc.id}
                    onClick={() => {
                      createMenuAction.setActiveSubCategory(sc.id);
                      nextStep();
                    }}
                    className="
                    group cursor-pointer rounded-xl 
                    border bg-background 
                    transition-all duration-200 
                    hover:shadow-lg hover:-translate-y-1
                    hover:border-primary/50
                  "
                  >
                    <CardHeader className="p-4 space-y-1">
                      <CardTitle className="text-sm font-semibold truncate">
                        {sc.sub_cat_name}
                      </CardTitle>

                      <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                        {sc.sub_cat_description || "No description provided"}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>

        {/* ================= FOOTER ================= */}
        <CardFooter className="border-t pt-6">
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {`Add Sub-Categories in ${activeCat?.category_name}`}
          </Button>
        </CardFooter>
      </Card>

      {/* ================= DIALOG ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Sub Category in the {activeCat?.category_name}
            </DialogTitle>
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
              name="sub_cat_name"
              children={(f) => <f.TextField label="SubCategory Name" />}
            />

            <form.AppField
              name="sub_cat_description"
              children={(f) => (
                <f.TextAreaField label="SubCategory Description" />
              )}
            />

            <DialogFooter>
              <form.AppForm>
                <form.SubmitButton>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add SubCategory
                </form.SubmitButton>
              </form.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSubCategory;
