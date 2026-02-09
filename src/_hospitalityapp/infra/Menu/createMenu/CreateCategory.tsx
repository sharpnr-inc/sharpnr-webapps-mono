import { useState } from "react";
import { useCreateMenuCtx } from "./create-menu.context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAppForm } from "@/components/forms";
import { PlusCircle } from "lucide-react";
import { createMenuAction } from "../stores/CreateMenu/actions";

const CreateCategory = () => {
  const { dummyMenuData, nextStep } = useCreateMenuCtx();
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    defaultValues: {
      owners_id: "",
      menu_id:"",
      category_name: "",
      category_description: "",
    },
    onSubmit: ({ value }) => {
      console.log(value)
    },
  });

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Menu Categories</CardTitle>
          <CardDescription>
            Here are all the Categories of the menu you can create and Edit
            existing menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-5 p-3 cursor-pointer">
            {dummyMenuData.menuCategory.map((m) => {
              return (
                <div
                  key={m.id}
                  className=""
                  onClick={() => {
                    createMenuAction.setActiveCategory(m.id);
                    nextStep();
                  }}
                >
                  <Card className="hover:border hover:border-accent-foreground">
                    <CardHeader>
                      <CardTitle>{m.name}</CardTitle>
                      <CardDescription>{m.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setOpen(true)}>
            <PlusCircle /> Add Category
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppField
              name="category_name"
              children={(f) => {
                return <f.TextField label="Category Name" />;
              }}
            />
            <form.AppField
              name="category_description"
              children={(f) => {
                return <f.TextAreaField label="Category Description" />;
              }}
            />
            <DialogFooter>
              <form.AppForm>
                <form.SubmitButton>Add Category</form.SubmitButton>
              </form.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
