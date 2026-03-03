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
    <div className="">
      <Card className="shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-row items-center gap-4">
          <Button variant="ghost" size="sm" onClick={prevStep}>
            <MoveLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <CardTitle className="text-xl">
              {activeCat ? activeCat.category_name : "Select Category"}
            </CardTitle>
            <CardDescription>{activeCat?.category_description}</CardDescription>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent>
          {subCategories.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              No Sub-Categories Found
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {subCategories.map((sc) => {
                return (
                  <Card
                    key={sc.id}
                    className="cursor-pointer transition-all hover:shadow-md hover:border-primary"
                    onClick={() => {
                      createMenuAction.setActiveSubCategory(sc.id);
                      nextStep();
                    }}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        {sc.sub_cat_name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {sc.sub_cat_description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        <CardFooter>
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
          >
            <form.AppField
              name="sub_cat_name"
              children={(f) => {
                return <f.TextField label="SubCategory Name" />;
              }}
            />
            <form.AppField
              name="sub_cat_description"
              children={(f) => {
                return <f.TextAreaField label="SubCategory Description" />;
              }}
            />

            <DialogFooter>
              <form.AppForm>
                <form.SubmitButton>
                  <PlusIcon />
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
