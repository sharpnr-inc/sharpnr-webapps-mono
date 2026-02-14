import React, { useState } from "react";
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
import { createMenuAction } from "../stores/CreateMenu/actions";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePropertyDetails } from "@/_orchestrator/OrchestDashboard/api/queries/general";
import api from "@/middlewares/axios";

// Dummy data mimicking your Hospitality modules
const STATIONS = [
  { id: "uuid-1", name: "Main Kitchen", type: "KITCHEN" },
  { id: "uuid-2", name: "Poolside Bar", type: "BAR" },
  { id: "uuid-3", name: "Pastry Unit", type: "BAKERY" },
  { id: "uuid-4", name: "Service Bar 2", type: "BAR" },
];

const CreateCategory = () => {
  const { Menus, nextStep, ownersID, ownersType, propertyID } =
    useCreateMenuCtx();
  const [open, setOpen] = useState(false);
  const [openMenuForm, setOpenMenuForm] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: propertyDetails,
    isLoading,
    error,
  } = usePropertyDetails(propertyID || "");

  const createCategory = useAddCategoryInMenuMutation();
  const addMenu = useCreateMenuMutation();

  const [selectedId, setSelectedId] = React.useState<string>("");

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

  const handleStationSelect = async (kitchenID: string, menuId: string) => {
    const payload = {
      menu_id: menuId,
      kitchen_id: kitchenID,
    };

    const res = await api.post(
      `/sharp-hospitality/${ownersID}/menu/attchKitchen/menu`,
      payload,
    );

    return null;
  };

  return (
    <div className="">
      <Card className="">
        <CardHeader>
          <CardTitle>Menu</CardTitle>
          <CardDescription>
            Here are all the menu, you can create and Edit existing menu
          </CardDescription>
        </CardHeader>
        {!Menus || Menus.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">
            <EmptyMenu onCreateClick={() => setOpenMenuForm(true)} />
          </div>
        ) : (
          Menus.map((m) => {
            return (
              <CardContent key={m.id} className="">
                <Card>
                  <CardHeader>
                    <CardTitle>{m.menu_name}</CardTitle>
                    <CardDescription>{m?.menu_description}</CardDescription>

                    <div className="p-4 space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Assign Menu to Station
                      </label>

                      <Select
                        onValueChange={(value) => {
                          handleStationSelect(value, m.id);
                        }}
                      >
                        <SelectTrigger className="w-[240px]">
                          <SelectValue placeholder="Select a station" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Stations</SelectLabel>
                            {propertyDetails.data.infra.map((station: any) => (
                              <SelectItem key={station.id} value={station.id}>
                                <div className="flex items-center gap-2">
                                  <span>
                                    {station.type === "BAR"
                                      ? "🍷"
                                      : station.type === "BAKERY"
                                        ? "🍰"
                                        : "🍳"}
                                  </span>
                                  <span>{station.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {selectedId && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Selected UUID:{" "}
                          <span className="font-mono">{selectedId}</span>
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!m.categories || m.categories.length === 0 ? (
                      <div className="p-3 text-xs text-muted-foreground">
                        No categories yet
                      </div>
                    ) : (
                      <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-5 p-3 cursor-pointer">
                        {m.categories.map((c) => {
                          return (
                            <div
                              key={c.id}
                              onClick={() => {
                                createMenuAction.setActiveCategory(c.id);
                                createMenuAction.setModulesMenu(m);
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
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        form.setFieldValue("menu_id", m.id);
                        const test = form.getFieldValue("menu_id");
                        console.log(test);
                        setOpen(true);
                      }}
                    >
                      <PlusIcon />
                      {`Add Category in ${m.menu_name}`}
                    </Button>
                  </CardFooter>
                </Card>
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
