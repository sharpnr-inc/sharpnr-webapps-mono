import { useState } from "react";
import { useCreateMenuCtx } from "./create-menu.context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { createMenuAction } from "../stores/CreateMenu/actions";
import EmptyMenu from "../components/EmptyMenu";
import { useCreateMenuMutation } from "../apis/api.Mutations";

const CreateCategory = () => {
  const { Menus, nextStep, ownersID, ownersType } = useCreateMenuCtx();
  const [open, setOpen] = useState(false);
  const [openMenuForm, setOpenMenuForm] = useState(false);

  const form = useAppForm({
    defaultValues: {
      owners_id: "",
      menu_id: "",
      category_name: "",
      category_description: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  const addMenu = useCreateMenuMutation();
  const menuForm = useAppForm({
    defaultValues: {
      owner_id: ownersID,
      menu_name: "",
      menu_description: "",
      organization_id: "",
      owner_module_type: ownersType,
    },
    onSubmit: ({ value }) => {
      console.log(value);
      addMenu.mutateAsync({
        ownersID: ownersID,
        request_payload: value,
      });
    },
  });

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Menu</CardTitle>
          <CardDescription>
            Here are all the menu, you can create and Edit existing menu
          </CardDescription>
        </CardHeader>
        {!Menus || Menus.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            <EmptyMenu onCreateClick={() => setOpenMenuForm(true)} />
          </div>
        ) : (
          Menus.map((m) => {
            return (
              <CardContent key={m.id}>
                <div className="border rounded-xl p-4 shadow-sm ">
                  <div className="text-lg font-semibold">{m.menu_name}</div>

                  <div className="text-sm text-muted-foreground mt-1">
                    {m.menu_description || "No description"}
                  </div>

                  <div className="mt-3 text-xs text-gray-400">{m.id}</div>
                </div>

                {!m.categories || m.categories.length === 0 ? (
                  <div className="p-3 text-xs text-muted-foreground">
                    No categories yet
                  </div>
                ) : (
                  <div className="grid grid-cols-6 gap-5 p-3 cursor-pointer">
                    {m.categories.map((c) => {
                      return (
                        <div
                          key={c.id}
                          onClick={() => {
                            createMenuAction.setActiveCategory(c.id);
                            nextStep();
                          }}
                        >
                          <Card className="hover:border hover:border-accent-foreground h-full">
                            <CardHeader>
                              <CardTitle>{c.category_name}</CardTitle>
                              <CardDescription>
                                {c.category_description || "No description"}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </div>
                      );
                    })}

                    <Button>Add Category</Button>
                  </div>
                )}
              </CardContent>
            );
          })
        )}
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
      <Dialog open={openMenuForm} onOpenChange={setOpenMenuForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Menu</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              menuForm.handleSubmit();
            }}
          >
            <menuForm.AppField
              name="menu_name"
              children={(f) => {
                return <f.TextField label="Menu Name" />;
              }}
            />
            <menuForm.AppField
              name="menu_description"
              children={(f) => {
                return <f.TextAreaField label="A Short Description" />;
              }}
            />
            <DialogFooter>
              <menuForm.AppForm>
                <form.SubmitButton>Create Menu</form.SubmitButton>
              </menuForm.AppForm>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
