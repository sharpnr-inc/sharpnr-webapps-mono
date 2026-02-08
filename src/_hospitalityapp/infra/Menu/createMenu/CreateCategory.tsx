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
import { Textarea } from "@/components/ui/textarea";
import { createMenuAction } from "../stores/CreateMenu/actions";

const CreateCategory = () => {
  const { dummyMenuData, nextStep } = useCreateMenuCtx();
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    defaultValues: {
      owners_id: "",
      category_name: "",
      category_description: "",
    },
  });

  return (
    <div>
      <Card className="relative">
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

        <Button
          className="absolute top-5 right-5"
          onClick={() => console.log("Clicked")}
        >
          <PlusCircle /> Add Category
        </Button>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input placeholder="Category Name" />
          </div>
          <div className="space-y-3">
            <Textarea placeholder="Category Description" />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
