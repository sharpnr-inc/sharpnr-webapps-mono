import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateMenuStore } from "../stores/CreateMenu/create-menu_store";
import { useCreateMenuCtx } from "./create-menu.context";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon, PlusIcon } from "lucide-react";
import { createMenuAction } from "../stores/CreateMenu/actions";
import { useAppForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const CreateSubCategory = () => {
  const { dummyMenuData, prevStep, nextStep } = useCreateMenuCtx();
  const activeCategoryID = useCreateMenuStore((s) => s.activeCategoryID);
  const [open, setOpen] = useState(false);

  const categories = dummyMenuData.menuCategory;
  const activeCat = categories.find((c) => c.id === activeCategoryID);

  const subCategories = activeCat?.menuSubCategory || [];

  const form = useAppForm({
    defaultValues: {
      ownersID: "",
      category_id: activeCategoryID ? activeCategoryID : "",
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      setOpen(false);
      form.reset();
    },
  });

  return (
    <div className="p-4">
      <Card className="shadow-sm">
        {/* Header */}
        <CardHeader className="flex flex-row items-center gap-4">
          <Button variant="ghost" size="sm" onClick={prevStep}>
            <MoveLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div>
            <CardTitle className="text-xl">
              {activeCat ? activeCat.name : "Select Category"}
            </CardTitle>
            <CardDescription>{activeCat?.description}</CardDescription>
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
                      <CardTitle className="text-base">{sc.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {sc.description}
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
            {`Add Sub-Categories in ${activeCat?.name}`}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Sub Category in the {activeCat?.name}
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
              name="name"
              children={(f) => {
                return <f.TextField label="SubCategory Name" />;
              }}
            />
            <form.AppField
              name="description"
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
