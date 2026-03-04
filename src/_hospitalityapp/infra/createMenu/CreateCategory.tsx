import { useState } from "react";
import { useCreateMenuCtx } from "./create-menu.context";
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
import { createMenuAction } from "../stores/actions";
import EmptyMenu from "../components/EmptyMenu";
import {
  useAddCategoryInMenuMutation,
  useCreateMenuMutation,
} from "../apis/api.Mutations";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/_orchestrator/api/general";

const CreateCategory = () => {
  const { Menus, nextStep, ownersID, ownersType, propertyID } =
    useCreateMenuCtx();
  const [open, setOpen] = useState(false);
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: propertyData, isLoading } = usePropertyDetails(propertyID!);
  const kitchens = propertyData?.data?.infra ?? [];

  const createCategory = useAddCategoryInMenuMutation();
  const addMenu = useCreateMenuMutation();

  const form = useAppForm({
    defaultValues: {
      menu_id: "",
      category_name: "",
      category_description: "",
    },
    onSubmit: ({ value }) => {
      createCategory.mutateAsync(
        {
          OwnersID: ownersID,
          request_payload: value,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["Menu", ownersID],
            });

            setOpen(false);
          },
        },
      );
    },
  });

  const menuForm = useAppForm({
    defaultValues: {
      owner_id: ownersID,
      menu_name: "",
      menu_description: "",
      organization_id: "",
      owner_module_type: ownersType,
    },
    onSubmit: ({ value }) => {
      addMenu.mutateAsync(
        {
          ownersID: ownersID,
          request_payload: value,
        },
        {
          onSuccess: () => {},
        },
      );
    },
  });
  return (
    <div className="">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg">Menu</CardTitle>
          <CardDescription className="text-sm">
            Manage your menus, categories and structure.
          </CardDescription>
        </CardHeader>

        {!Menus || Menus.length === 0 ? (
          <div className="px-6 pb-6">
            <EmptyMenu onCreateClick={() => setOpenMenuForm(true)} />
          </div>
        ) : (
          <CardContent className="space-y-8">
            {Menus.map((m) => (
              <Card
                key={m.id}
                className="rounded-xl border bg-muted/30 shadow-sm"
              >
                {/* ================= Menu Header ================= */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 max-w-[75%]">
                      <CardTitle className="text-base">{m.menu_name}</CardTitle>

                      <CardDescription className="text-sm line-clamp-2">
                        {m?.menu_description || "No description provided"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 border-t pt-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      Preferred Kitchen
                    </h3>

                    {m?.preferred_kitchen ? (
                      <div className="rounded-xl border bg-muted/30 p-3 text-sm">
                        This category is linked to a specific kitchen.
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed bg-muted/20 p-3 text-sm text-muted-foreground">
                        No preferred kitchen selected.
                        <div className="mt-1 text-xs">
                          Note: If no preferred kitchen is selected, menu items
                          will automatically route to the restaurant’s default
                          preferred kitchen.
                        </div>
                      </div>
                    )}

                    {/* Dummy Select */}
                    <Select
                      value={m.preferred_kitchen ?? undefined}
                      // onValueChange={handleChange}
                      // disabled={isPending}
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

                {/* ================= Categories ================= */}
                <CardContent>
                  {!m.categories || m.categories.length === 0 ? (
                    <div className="text-xs text-muted-foreground py-2">
                      No categories added yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {m.categories.map((c) => (
                        <Card
                          key={c.id}
                          onClick={() => {
                            createMenuAction.setActiveCategory(c.id);
                            createMenuAction.setModulesMenu(m);
                            nextStep();
                          }}
                          className="cursor-pointer rounded-lg transition-all hover:shadow-md hover:-translate-y-1"
                        >
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm truncate">
                              {c.category_name}
                            </CardTitle>

                            <CardDescription className="text-xs line-clamp-2">
                              {c.category_description || "No description"}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>

                {/* ================= Footer ================= */}
                <CardFooter className="pt-4 flex flex-col gap-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      form.setFieldValue("menu_id", m.id);
                      setOpen(true);
                    }}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Category in {m.menu_name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        )}
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              setOpenMenuForm(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Menu
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
